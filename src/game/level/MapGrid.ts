/**
 * MapGrid represents a 2D tile-based dungeon map for DuskUltima.
 * Dynamically carves rooms from a `SitePlan` (see roomGeneration.ts): 5 "beat"
 * rooms wired together by one of 21 topologies, plus a size-dependent number
 * of filler rooms, all monster-scaled in size and corridor width/length.
 */

import { TileType } from "../renderer/TileSet";
import { SiteDef } from "./Adventure";
import type { MonsterDef, MonsterSize } from "../../engine/monster";
import type { ClassName } from "../../engine/character";
import type { HazardDef } from "../../engine/trapsHazards";
import { Dice } from "../../engine/dice";
import {
  buildSitePlan,
  type RoomContent,
  type RoomPlan,
  type RoomRect,
  type TravelSegment,
} from "./roomGeneration";

export interface MapEntity {
  id: string;
  name: string;
  x: number;
  y: number;
  tileType: TileType;
  monsterId?: string;
  monsterDef?: MonsterDef;
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
  rescueClass?: ClassName;
  rescueHeroName?: string;
  goalInteraction?: "rescue-companion" | "hostage" | "objective";
  isGoalTarget?: boolean;
  monsterSize?: MonsterSize;
  /** A hidden goal is spawned but not drawn until a search reveals it. */
  isHiddenGoal?: boolean;
}

export interface CorridorTrapMarker {
  x: number;
  y: number;
  trapId: number;
  /** Spotted by a search, which allows a disarm attempt and eases the save. */
  found: boolean;
  disabled: boolean;
  triggered: boolean;
}

export interface TreasureChestMarker {
  x: number;
  y: number;
  isGoal: boolean;
  /** A hidden goal chest carves no tile until a search reveals it. */
  hidden: boolean;
}

export interface HazardMarker {
  x: number;
  y: number;
  hazard: HazardDef;
  /** Major hazards cover a plus-shaped field; minor ones a single tile. */
  major: boolean;
}

export class MapGrid {
  width: number;
  height: number;
  tiles: TileType[][];
  visited: boolean[][];
  visible: boolean[][];

  public entities: MapEntity[] = [];
  public playerPos = { x: 4, y: 4 };
  public stairsDownPos = { x: 18, y: 18 };
  public siteDef: SiteDef | null = null;
  public partyPositions = new Map<string, { x: number; y: number }>();
  public roomPlans: readonly RoomPlan[] = [];
  public travelSegments: readonly TravelSegment[] = [];
  public corridorTraps: CorridorTrapMarker[] = [];
  public treasureChests: TreasureChestMarker[] = [];
  public hazards: HazardMarker[] = [];

  constructor(width = 28, height = 28) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.visited = [];
    this.visible = [];
    this.allocate(width, height);
  }

  private allocate(width: number, height: number): void {
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

  /** Reallocates the tile grid to a new size, discarding prior contents. */
  private resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.allocate(width, height);
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

  public generateSite(siteDef: SiteDef, dice: Dice = new Dice()): void {
    this.siteDef = siteDef;

    // The 5 beat rooms are mandatory; everything above them is filler the site
    // definition already committed to when it advertised its room count.
    const fillerCount = siteDef.roomCount - 5;
    if (fillerCount < 0) {
      throw new Error(`Site ${siteDef.id} declares ${siteDef.roomCount} rooms, fewer than the 5 mandatory beat rooms`);
    }

    const plan = buildSitePlan(dice, fillerCount, siteDef.goal, siteDef.biome);
    this.resize(plan.width, plan.height);
    this.roomPlans = plan.rooms;
    this.travelSegments = plan.edges;
    this.corridorTraps = [];
    this.treasureChests = [];
    this.hazards = [];
    this.entities = [];

    const roomById = new Map(plan.rooms.map((r) => [r.id, r]));

    // Carve floors for rooms
    for (const room of plan.rooms) {
      const r = room.rect;
      for (let y = r.y; y < r.y + r.h; y++) {
        const row = this.tiles[y];
        if (row) {
          for (let x = r.x; x < r.x + r.w; x++) {
            row[x] = TileType.FLOOR;
          }
        }
      }
    }

    // Connect travel segments. Width comes from the largest monster in the
    // site; length band (door/near/far) only shaped the layout positions
    // already baked into each room's rect. Every corridor is carved before any
    // fixture is stamped, so a later corridor cannot floor over an earlier
    // segment's door or trap.
    const fixtures: { x: number; y: number; tile: TileType; trapId?: number }[] = [];
    for (const segment of plan.edges) {
      const r1 = roomById.get(segment.fromRoom)!.rect;
      const r2 = roomById.get(segment.toRoom)!.rect;
      const cx1 = Math.floor(r1.x + r1.w / 2);
      const cy1 = Math.floor(r1.y + r1.h / 2);
      const cx2 = Math.floor(r2.x + r2.w / 2);
      const cy2 = Math.floor(r2.y + r2.h / 2);
      this.carveCorridor(cx1, cy1, cx2, cy2, segment.width);

      // Place door at corridor midpoint
      const midX = Math.floor((cx1 + cx2) / 2);
      const midY = Math.floor((cy1 + cy2) / 2);
      fixtures.push({ x: midX, y: midY, tile: TileType.DOOR_CLOSED });
      if (segment.kind === "ramp") fixtures.push({ x: midX, y: midY + 1, tile: TileType.RAMP });
      if (segment.kind === "shaft") fixtures.push({ x: midX, y: midY + 1, tile: TileType.SHAFT });
      if (segment.trapId !== undefined) {
        fixtures.push({
          x: Math.floor((cx1 + midX) / 2),
          y: Math.floor((cy1 + midY) / 2),
          tile: TileType.TRAP,
          trapId: segment.trapId,
        });
      }
    }

    const inAnyRoom = (x: number, y: number): boolean =>
      plan.rooms.some((r) => x >= r.rect.x && x < r.rect.x + r.rect.w && y >= r.rect.y && y < r.rect.y + r.rect.h);
    const stamped = new Set<string>();
    for (const fixture of fixtures) {
      // Fixtures belong to the corridor network; one that falls inside a room
      // would be overwritten by that room's own content anyway.
      const key = `${fixture.x},${fixture.y}`;
      if (stamped.has(key) || inAnyRoom(fixture.x, fixture.y)) continue;
      stamped.add(key);
      this.setTile(fixture.x, fixture.y, fixture.tile);
      if (fixture.trapId !== undefined) {
        this.corridorTraps.push({ x: fixture.x, y: fixture.y, trapId: fixture.trapId, found: false, disabled: false, triggered: false });
      }
    }

    const entranceRoom = plan.rooms.find((r) => r.beatRole === "entrance")!;
    const rewardRoom = plan.rooms.find((r) => r.beatRole === "reward")!;
    const climaxRoom = plan.rooms.find((r) => r.beatRole === "climax")!;

    this.playerPos = rectCenter(entranceRoom.rect);

    // Reward beat: vault & rest spot, at opposite corners of the room from
    // each other so its own d10-rolled content (which may include a
    // guardian) has room to stand at the center.
    this.setTile(rewardRoom.rect.x, rewardRoom.rect.y, TileType.CAMPFIRE);
    const stairs = { x: rewardRoom.rect.x + rewardRoom.rect.w - 1, y: rewardRoom.rect.y + rewardRoom.rect.h - 1 };
    this.setTile(stairs.x, stairs.y, TileType.STAIRS_DOWN);
    this.stairsDownPos = stairs;

    this.spawnClimaxEntity(climaxRoom, siteDef.goal.target, siteDef.goal.guardianName);

    for (const room of plan.rooms) {
      if (room.id === climaxRoom.id) continue;
      const spawnAt = room.id === entranceRoom.id ? offsetWithin(room.rect, 1, 0) : rectCenter(room.rect);
      this.spawnRoomContent(room, spawnAt);
    }
  }

  /**
   * Reveals a goal that was spawned hidden — carving the chest tile, or letting
   * the goal entity draw — in whichever room the generator actually put it.
   * Returns true when something was revealed.
   */
  public revealHiddenGoal(): boolean {
    let revealed = false;
    for (const chest of this.treasureChests) {
      if (!chest.isGoal || !chest.hidden) continue;
      chest.hidden = false;
      this.setTile(chest.x, chest.y, TileType.CHEST_CLOSED);
      revealed = true;
    }
    for (const entity of this.entities) {
      if (!entity.isHiddenGoal) continue;
      entity.isHiddenGoal = false;
      revealed = true;
    }
    return revealed;
  }

  /** The live (not yet sprung or disarmed) trap on a tile, if any. */
  public liveTrapAt(x: number, y: number): CorridorTrapMarker | undefined {
    return this.corridorTraps.find((trap) => trap.x === x && trap.y === y && !trap.triggered && !trap.disabled);
  }

  public hazardAt(x: number, y: number): HazardMarker | undefined {
    return this.hazards.find((hazard) => hazard.x === x && hazard.y === y);
  }

  private spawnClimaxEntity(room: RoomPlan, target: string, guardianName: string | undefined): void {
    const pos = rectCenter(room.rect);
    const climax = room.content.climax;
    if (!climax) return;
    const isHiddenGoal = Boolean(this.siteDef?.goal.isHidden);
    if (climax.kind === "rescue-companion") {
      this.entities.push({
        id: "rescue-npc",
        name: target,
        ...pos,
        tileType: TileType.RESCUE_NPC,
        hp: 1,
        maxHp: 1,
        ac: 10,
        isHostile: false,
        rescueClass: this.siteDef?.goal.rescueClass,
        rescueHeroName: this.siteDef?.goal.rescueHeroName,
        goalInteraction: "rescue-companion",
        isHiddenGoal,
      });
      return;
    }
    if (climax.kind === "rescue-hostage") {
      this.entities.push({
        id: "hostage",
        name: target,
        ...pos,
        tileType: TileType.RESCUE_NPC,
        hp: 1,
        maxHp: 1,
        ac: 10,
        isHostile: false,
        goalInteraction: "hostage",
        isHiddenGoal,
      });
      return;
    }
    if (climax.kind === "boss") {
      const bossDef = climax.monster;
      this.entities.push({
        id: "boss-monster",
        name: target,
        ...pos,
        tileType: TileType.GLOOM_OGRE,
        monsterId: bossDef?.id,
        monsterDef: bossDef,
        hp: bossDef ? Math.max(24, bossDef.level * 4) : 24,
        maxHp: bossDef ? Math.max(24, bossDef.level * 4) : 24,
        ac: bossDef?.ac ?? 14,
        isHostile: true,
        attackBonus: bossDef?.attackBonus ?? 4,
        initiativeDexModifier: 0,
        damage: bossDef?.damage ?? "1d10",
        specialAbility: bossDef?.specialAbility,
        isGoalTarget: true,
        monsterSize: bossDef?.size ?? "large",
      });
      return;
    }
    if (climax.kind === "chest") {
      if (!isHiddenGoal) this.setTile(pos.x, pos.y, TileType.CHEST_CLOSED);
      this.treasureChests.push({ x: pos.x, y: pos.y, isGoal: true, hidden: isHiddenGoal });
      this.spawnGuardianIfAny(room, climax.monster, guardianName, pos);
      return;
    }
    // objective
    this.entities.push({
      id: "goal-objective",
      name: target,
      ...pos,
      tileType: TileType.RESCUE_NPC,
      hp: 1,
      maxHp: 1,
      ac: 10,
      isHostile: false,
      goalInteraction: "objective",
      isHiddenGoal,
    });
    this.spawnGuardianIfAny(room, climax.monster, guardianName, pos);
  }

  private spawnGuardianIfAny(
    room: RoomPlan,
    guardian: MonsterDef | undefined,
    guardianName: string | undefined,
    goalPos: { x: number; y: number },
  ): void {
    if (!guardian) return;
    const pos = offsetWithin(room.rect, 2, 0, goalPos);
    this.entities.push({
      id: "goal-guardian",
      name: guardianName ?? guardian.name,
      ...pos,
      tileType: TileType.GLOOM_OGRE,
      monsterId: guardian.id,
      monsterDef: guardian,
      hp: Math.max(24, guardian.level * 4),
      maxHp: Math.max(24, guardian.level * 4),
      ac: guardian.ac,
      isHostile: true,
      attackBonus: guardian.attackBonus,
      initiativeDexModifier: Math.floor(guardian.level / 2),
      damage: guardian.damage,
      specialAbility: guardian.specialAbility,
      monsterSize: guardian.size,
    });
  }

  private spawnRoomContent(room: RoomPlan, at: { x: number; y: number }): void {
    const content: RoomContent = room.content;
    switch (content.feature) {
      case "empty":
        return;
      case "minor-hazard":
      case "major-hazard": {
        if (!content.hazard) return;
        const major = content.feature === "major-hazard";
        // A minor hazard is one tile underfoot; a major one spreads over a
        // plus-shaped field that is far harder to skirt around.
        const spread = major
          ? [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]
          : [{ x: 0, y: 0 }];
        for (const offset of spread) {
          const tile = offsetWithin(room.rect, offset.x, offset.y, at);
          if (this.hazards.some((h) => h.x === tile.x && h.y === tile.y)) continue;
          this.setTile(tile.x, tile.y, TileType.HAZARD);
          this.hazards.push({ x: tile.x, y: tile.y, hazard: content.hazard, major });
        }
        return;
      }
      case "trap": {
        if (!content.trap) return;
        this.setTile(at.x, at.y, TileType.TRAP);
        this.corridorTraps.push({ x: at.x, y: at.y, trapId: content.trap.id, found: false, disabled: false, triggered: false });
        return;
      }
      case "treasure": {
        this.setTile(at.x, at.y, TileType.CHEST_CLOSED);
        this.treasureChests.push({ x: at.x, y: at.y, isGoal: false, hidden: false });
        return;
      }
      case "npc": {
        this.entities.push({
          id: `npc-${room.id}`,
          name: "a stranger",
          ...at,
          tileType: TileType.RESCUE_NPC,
          hp: 1,
          maxHp: 1,
          ac: 10,
          isHostile: false,
        });
        return;
      }
      case "solo-monster":
      case "monster-mob":
      case "boss-monster": {
        const isBoss = content.feature === "boss-monster";
        const points = roomInteriorPoints(room.rect, content.monsters.length);
        content.monsters.forEach((mDef, index) => {
          const p = points[index] ?? at;
          this.entities.push({
            id: `m-${room.id}-${index}`,
            name: isBoss ? `Elite ${mDef.name}` : mDef.name,
            ...p,
            tileType: isBoss ? TileType.ORC : TileType.GOBLIN,
            monsterId: mDef.id,
            monsterDef: mDef,
            hp: isBoss ? Math.max(10, mDef.level * 3) : Math.max(6, mDef.level * 2),
            maxHp: isBoss ? Math.max(10, mDef.level * 3) : Math.max(6, mDef.level * 2),
            ac: mDef.ac,
            isHostile: true,
            attackBonus: mDef.attackBonus,
            initiativeDexModifier: 2,
            damage: mDef.damage,
            specialAbility: mDef.specialAbility,
            monsterSize: mDef.size,
          });
        });
        return;
      }
      default:
        return;
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

function rectCenter(rect: RoomRect): { x: number; y: number } {
  return { x: rect.x + Math.floor(rect.w / 2), y: rect.y + Math.floor(rect.h / 2) };
}

/** A point within `rect`, offset from its center (or `from`) and clamped in bounds. */
function offsetWithin(rect: RoomRect, dx: number, dy: number, from?: { x: number; y: number }): { x: number; y: number } {
  const base = from ?? rectCenter(rect);
  const x = Math.min(rect.x + rect.w - 1, Math.max(rect.x, base.x + dx));
  const y = Math.min(rect.y + rect.h - 1, Math.max(rect.y, base.y + dy));
  return { x, y };
}

/** Up to `count` distinct in-bounds points spread around a room's center. */
function roomInteriorPoints(rect: RoomRect, count: number): { x: number; y: number }[] {
  const center = rectCenter(rect);
  const ring = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
  ];
  return ring.slice(0, Math.max(1, count)).map((o) => offsetWithin(rect, o.x, o.y, center));
}
