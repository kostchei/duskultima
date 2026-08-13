/**
 * MapGrid represents a 2D tile-based dungeon map for DuskUltima.
 * Dynamically carves rooms based on SiteDef room counts (Small: 1d4+2, Medium: 2d4+1, Large: 3d4).
 */

import { TileType } from "../renderer/TileSet";
import { goalUsesChest, SiteDef } from "./Adventure";
import {
  buildRoomPlans,
  buildTravelSegments,
  type RoomPlan,
  type TravelSegment,
} from "./roomGeneration";

export interface MapEntity {
  id: string;
  name: string;
  x: number;
  y: number;
  tileType: TileType;
  hp: number;
  maxHp: number;
  ac: number;
  isHostile: boolean;
  /** Shadowdark monster combat values used by the live game loop. */
  attackBonus?: number;
  initiativeDexModifier?: number;
  damage?: string;
  specialAbility?: "web" | "poison" | "engulf" | "shadow-extinct" | "split" | "corrode" | "thorns";
  isParty?: boolean;
  rescueClass?: "thief" | "priest" | "wizard";
  goalInteraction?: "rescue-companion" | "hostage" | "objective";
  isGoalTarget?: boolean;
  monsterSize?: "medium" | "large" | "huge" | "gargantuan";
}

export interface CorridorTrapMarker {
  x: number;
  y: number;
  trapId: number;
  triggered: boolean;
}

export class MapGrid {
  readonly width: number;
  readonly height: number;
  readonly tiles: TileType[][];
  readonly visited: boolean[][];
  readonly visible: boolean[][];

  public entities: MapEntity[] = [];
  public playerPos = { x: 4, y: 4 };
  public stairsDownPos = { x: 18, y: 18 };
  public siteDef: SiteDef | null = null;
  public partyPositions = new Map<string, { x: number; y: number }>();
  public roomPlans: readonly RoomPlan[] = [];
  public travelSegments: readonly TravelSegment[] = [];
  public corridorTraps: CorridorTrapMarker[] = [];

  constructor(width = 28, height = 28) {
    this.width = width;
    this.height = height;
    this.tiles = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => TileType.WALL)
    );
    this.visited = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );
    this.visible = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );
  }

  public getTile(x: number, y: number): TileType {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return TileType.WALL;
    }
    return this.tiles[y]?.[x] ?? TileType.WALL;
  }

  public setTile(x: number, y: number, type: TileType): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      const row = this.tiles[y];
      if (row) row[x] = type;
    }
  }

  public isWalkable(x: number, y: number): boolean {
    const tile = this.getTile(x, y);
    if (
      tile === TileType.WALL ||
      tile === TileType.VINE_WALL ||
      tile === TileType.DOOR_CLOSED ||
      tile === TileType.WATER
    ) {
      return false;
    }
    // Check monster blocking
    const entity = this.getEntityAt(x, y);
    if (entity && entity.isHostile && entity.hp > 0) {
      return false;
    }
    return true;
  }

  public getEntityAt(x: number, y: number): MapEntity | undefined {
    return this.entities.find((e) => e.x === x && e.y === y && e.hp > 0);
  }

  public setPartyMembers(ids: readonly string[]): void {
    const keep = new Set(ids.slice(1));
    for (const id of [...this.partyPositions.keys()]) if (!keep.has(id)) this.partyPositions.delete(id);
    const offsets = [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }];
    ids.slice(1).forEach((id, index) => {
      if (this.partyPositions.has(id)) return;
      const offset = offsets[index % offsets.length]!;
      const candidate = { x: this.playerPos.x + offset.x, y: this.playerPos.y + offset.y };
      this.partyPositions.set(id, this.isWalkable(candidate.x, candidate.y) ? candidate : { ...this.playerPos });
    });
  }

  public moveAutoFollowers(autoIds: readonly string[]): void {
    const previousLeader = { ...this.playerPos };
    let previous = previousLeader;
    for (const id of autoIds) {
      const current = this.partyPositions.get(id) ?? previous;
      this.partyPositions.set(id, { ...previous });
      previous = current;
    }
  }

  public generateSite(siteDef: SiteDef): void {
    this.siteDef = siteDef;
    const roomCount = siteDef.roomCount;

    // Reset grid to walls
    for (let y = 0; y < this.height; y++) {
      const row = this.tiles[y];
      if (row) {
        for (let x = 0; x < this.width; x++) {
          row[x] = TileType.WALL;
          this.visited[y]![x] = false;
          this.visible[y]![x] = false;
        }
      }
    }

    this.roomPlans = buildRoomPlans(roomCount, siteDef.goal);
    this.travelSegments = buildTravelSegments(this.roomPlans);
    this.corridorTraps = [];
    const roomRects = this.roomPlans.map((room) => room.rect);

    // Carve floors for rooms
    for (const r of roomRects) {
      for (let y = r.y; y < r.y + r.h; y++) {
        const row = this.tiles[y];
        if (row) {
          for (let x = r.x; x < r.x + r.w; x++) {
            row[x] = TileType.FLOOR;
          }
        }
      }
    }

    // Connect explicit travel segments between consecutive rooms. The width
    // is intentionally independent of room count: some routes must admit the
    // largest creature the site can roll, while others may later become
    // narrow squeeze routes as a deliberate hazard.
    for (const segment of this.travelSegments) {
      const i = segment.fromRoom;
      const r1 = roomRects[i]!;
      const r2 = roomRects[i + 1]!;
      const cx1 = Math.floor(r1.x + r1.w / 2);
      const cy1 = Math.floor(r1.y + r1.h / 2);
      const cx2 = Math.floor(r2.x + r2.w / 2);
      const cy2 = Math.floor(r2.y + r2.h / 2);
      this.carveCorridor(cx1, cy1, cx2, cy2, segment.width);

      // Place door at corridor midpoint
      const midX = Math.floor((cx1 + cx2) / 2);
      const midY = Math.floor((cy1 + cy2) / 2);
      this.setTile(midX, midY, TileType.DOOR_CLOSED);
      if (segment.kind === "ramp") this.setTile(midX, midY + 1, TileType.RAMP);
      if (segment.kind === "shaft") this.setTile(midX, midY + 1, TileType.SHAFT);
      if (segment.trapId !== undefined) {
        const trapX = Math.floor((cx1 + midX) / 2);
        const trapY = Math.floor((cy1 + midY) / 2);
        this.setTile(trapX, trapY, TileType.TRAP);
        this.corridorTraps.push({ x: trapX, y: trapY, trapId: segment.trapId, triggered: false });
      }
    }

    // Room 1: Entrance -> Player spawn
    const room1 = roomRects[0]!;
    this.playerPos = { x: room1.x + 2, y: room1.y + 2 };

    // Last Room: Vault & Rest Spot
    const lastRoom = roomRects[roomRects.length - 1]!;
    this.setTile(lastRoom.x + 1, lastRoom.y + 1, TileType.CAMPFIRE);
    this.setTile(lastRoom.x + 3, lastRoom.y + 3, TileType.STAIRS_DOWN);
    this.stairsDownPos = { x: lastRoom.x + 3, y: lastRoom.y + 3 };

    // Goal Chamber: Room N-1 (or room 2 if small)
    const goalRoomIndex = Math.max(1, roomRects.length - 2);
    const goalRoom = roomRects[goalRoomIndex]!;
    const goalX = goalRoom.x + 2;
    const goalY = goalRoom.y + 2;

    this.entities = [];

    // Spawn Goal Entity
    if (siteDef.goal.kind === "rescue-companion") {
      this.entities.push({
        id: "rescue-npc",
        name: siteDef.goal.target,
        x: goalX,
        y: goalY,
        tileType: TileType.RESCUE_NPC,
        hp: 1,
        maxHp: 1,
        ac: 10,
        isHostile: false,
        rescueClass: siteDef.goal.rescueClass,
        goalInteraction: "rescue-companion",
      });
    } else if (siteDef.goal.kind === "rescue-hostage") {
      this.entities.push({
        id: "hostage",
        name: siteDef.goal.target,
        x: goalX,
        y: goalY,
        tileType: TileType.RESCUE_NPC,
        hp: 1,
        maxHp: 1,
        ac: 10,
        isHostile: false,
        goalInteraction: "hostage",
      });
    } else if (siteDef.goal.kind === "assassinate-leader" || siteDef.goal.kind === "kill-boss") {
      this.entities.push({
        id: "boss-monster",
        name: siteDef.goal.target,
        x: goalX,
        y: goalY,
        tileType: TileType.GLOOM_OGRE,
        hp: 24,
        maxHp: 24,
        ac: 14,
        isHostile: true,
        attackBonus: 4,
        initiativeDexModifier: 0,
        damage: "1d10",
        isGoalTarget: true,
        monsterSize: "large",
      });
    } else if (goalUsesChest(siteDef.goal)) {
      this.setTile(goalX, goalY, TileType.CHEST_CLOSED);
      if (siteDef.goal.kind === "monster-eggs") {
        this.entities.push({
          id: "nesting-mother",
          name: siteDef.goal.guardianName ?? "nesting mother",
          x: goalX + 2,
          y: goalY,
          tileType: TileType.GLOOM_OGRE,
          hp: 30,
          maxHp: 30,
          ac: 15,
          isHostile: true,
          attackBonus: 5,
          initiativeDexModifier: 1,
          damage: "2d8",
          monsterSize: "huge",
        });
      }
    } else {
      this.entities.push({
        id: "goal-objective",
        name: siteDef.goal.target,
        x: goalX,
        y: goalY,
        tileType: TileType.RESCUE_NPC,
        hp: 1,
        maxHp: 1,
        ac: 10,
        isHostile: false,
        goalInteraction: "objective",
      });
    }

    // Spawn 1-3 wandering monsters in intermediate rooms
    for (let i = 1; i < roomRects.length - 1; i++) {
      if (i === goalRoomIndex) continue;
      const r = roomRects[i]!;
      const archetype = this.roomPlans[i]?.archetype;
      this.entities.push({
        id: `m-${i}`,
        name: archetype === "elite" ? "Elite Goblin Guard" : "Goblin Scout",
        x: r.x + 2,
        y: r.y + 2,
        tileType: archetype === "elite" ? TileType.ORC : TileType.GOBLIN,
        hp: archetype === "elite" ? 10 : 6,
        maxHp: archetype === "elite" ? 10 : 6,
        ac: archetype === "elite" ? 13 : 11,
        isHostile: true,
        attackBonus: archetype === "elite" ? 3 : 1,
        initiativeDexModifier: 2,
        damage: "1d6",
        monsterSize: archetype === "elite" ? "large" : "medium",
      });
    }
  }

  private carveCorridor(x1: number, y1: number, x2: number, y2: number, width: number): void {
    const half = Math.floor(width / 2);
    const carve = (x: number, y: number): void => {
      for (let offset = -half; offset <= half; offset++) {
        if (x1 === x2) this.setTile(x + offset, y, TileType.FLOOR);
        else this.setTile(x, y + offset, TileType.FLOOR);
      }
    };
    let currX = x1;
    let currY = y1;
    while (currX !== x2) {
      carve(currX, currY);
      currX += currX < x2 ? 1 : -1;
    }
    while (currY !== y2) {
      carve(currX, currY);
      currY += currY < y2 ? 1 : -1;
    }
    carve(x2, y2);
  }

  /**
   * Recalculates Field of View & Torch Light field.
   */
  public updateFov(lightRadius = 4): void {
    for (let y = 0; y < this.height; y++) {
      const visRow = this.visible[y];
      if (visRow) {
        for (let x = 0; x < this.width; x++) {
          visRow[x] = false;
        }
      }
    }

    const px = this.playerPos.x;
    const py = this.playerPos.y;

    for (let y = Math.max(0, py - lightRadius); y <= Math.min(this.height - 1, py + lightRadius); y++) {
      const visRow = this.visible[y];
      const visRowVisited = this.visited[y];
      if (visRow && visRowVisited) {
        for (let x = Math.max(0, px - lightRadius); x <= Math.min(this.width - 1, px + lightRadius); x++) {
          const dx = x - px;
          const dy = y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= lightRadius) {
            visRow[x] = true;
            visRowVisited[x] = true;
          }
        }
      }
    }
  }
}
