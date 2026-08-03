/**
 * Tile expansion: turn an abstract (graph) dungeon into a concrete tile grid the
 * scene can render, plus the (x, y) room regions the scene reasons about.
 *
 * Each macro-cell becomes a fixed CELL_W x CELL_H block. Room cells are carved out
 * of solid rock as chambers with a floor; connectors are carved along the
 * macro path of each graph edge — a doorway for horizontal (beside) links, and a
 * staggered one-way-ledge shaft for vertical (above/below) links. The ledge
 * spacing (3 tiles) sits inside the jump height (~3.16 tiles) and the safe-fall
 * allowance (4 tiles), so every vertical connector is traversable up and down by
 * any class without fall damage.
 *
 * Two things break the old flat-box grid. Floors come from the relief height
 * field (`relief.ts`) rather than one constant row per cell, so chambers and the
 * corridors joining them ramp, terrace and dip, and a vault may lean end to end.
 * And `ExpandOptions.openSky` carves each band up to the terrace above instead
 * of to a fixed headroom, which is what makes a roofless subzone roofless — the
 * one difference it may make to the grid is turning ceiling rock into air.
 *
 * The result is shaped as a DungeonDefinition so the existing renderer consumes it
 * unchanged. This is the Milestone 2 bridge from the M1 pipeline to the screen.
 */

import type { AbstractDungeon, Beat, DungeonConnection, DungeonRoomNode, MacroPoint } from "./model";
import {
  DUNGEONS,
  type DungeonDefinition,
  type ExpandedConnector,
  type ExpandedJunction,
  type ExpandedRoomContent,
  type TalkableNpcOutcome,
  type TalkableNpcSpec,
  type VariantPools,
} from "./dungeons";
import type { RoomRegion } from "./geometry";
import { chooseRoomTemplate, stampRoom, templateHash, type RoomStamp } from "./templates";
import { validatePhysicalDungeon } from "./physical";
import { buildRelief, HEADROOM_ROWS, type ReliefField } from "./relief";
import { CELL_H, CELL_W } from "./cellSize";

export { CELL_H, CELL_W };

const NPC_NAMES = ["Aster Vale", "Brother Senn", "Mara Quill", "Old Kest", "Veyra Ash"] as const;
const NPC_ROLES = ["lost cartographer", "oathbound pilgrim", "rival delver", "ruin keeper"] as const;

function npcDialogue(outcome: TalkableNpcOutcome): { introduction: string; resolution: string } {
  switch (outcome) {
    case "give-torch": return {
      introduction: "Keep your voice down. The dark here listens.",
      resolution: "Take this torch. I would rather owe you light than a grave.",
    };
    case "reveal-route": return {
      introduction: "I found a seam in the stone, but dared not test it alone.",
      resolution: "There—the hidden catch. That route is open now.",
    };
    case "warning": return {
      introduction: "Steel carries farther than footsteps in these halls.",
      resolution: "Open doors carry noise. A closed gate may be the safer road.",
    };
    case "trade": return {
      introduction: "I have a jewel, but no food left for the road.",
      resolution: "A fair exchange: your ration for my gem.",
    };
    case "betrayal": return {
      introduction: "You took your time. My friends were beginning to doubt me.",
      resolution: "Fine. No signal tonight—but leave before I reconsider.",
    };
    case "revelation": return {
      introduction: "The old mechanisms still answer the keeper's phrase.",
      resolution: "Hear it turn? A sealed route has yielded elsewhere.",
    };
    case "companion-eligible": return {
      introduction: "Reach the vault and prove this expedition has a future.",
      resolution: "Do that, and I will join you when the prize is claimed.",
    };
  }
}

/**
 * The role glyphs a stamped room may place. Which creature fills one is not
 * decided here: the scene resolves the glyph against the active zone's roster
 * at the party's level (see `systems/monsterRoster.ts`), so the same layout
 * reads as quillboar in one scroll and draugr in another.
 */
const MONSTER_GLYPHS = ["g", "s", "r"] as const;

/**
 * The role glyph a room stamps: the climax room fields the level's champion,
 * every other room draws a stable role from its id and the run seed. Never
 * consumes rules RNG.
 */
function glyphForRoom(seed: number, roomId: string, beat: Beat): string {
  if (beat === "climax") return "O";
  let hash = (seed ^ 0x9e3779b9) >>> 0;
  for (let i = 0; i < roomId.length; i++) {
    hash = Math.imul(hash ^ roomId.charCodeAt(i), 0x85ebca6b) >>> 0;
  }
  // Finalizer: without it the ids differ only in their last character and the
  // high bits this indexes on come out identical for every room.
  // Each step re-coerces to unsigned: `^=` yields a signed int32, and a
  // negative remainder would index off the front of the glyph list.
  hash = (hash ^ (hash >>> 16)) >>> 0;
  hash = Math.imul(hash, 0x7feb352d) >>> 0;
  hash = (hash ^ (hash >>> 15)) >>> 0;
  return MONSTER_GLYPHS[hash % MONSTER_GLYPHS.length]!;
}

const BEAT_LABEL: Record<Beat, { title: string }> = {
  entrance: { title: "THE GATE" },
  challenge: { title: "THE TEST" },
  setback: { title: "THE SETBACK" },
  climax: { title: "THE CLIMAX" },
  reward: { title: "THE VAULT" },
};

const SOLID = new Set(["#", "%", "="]);

type Grid = string[][];

function makeGrid(width: number, height: number): Grid {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
}

function set(grid: Grid, x: number, y: number, ch: string): void {
  const row = grid[y];
  if (!row || x < 0 || x >= row.length) return;
  row[x] = ch;
}

function get(grid: Grid, x: number, y: number): string | undefined {
  return grid[y]?.[x];
}

const cellOx = (col: number): number => col * CELL_W;
const cellCenterX = (col: number): number => col * CELL_W + Math.floor(CELL_W / 2);

/**
 * Rock left under a terrace on an open-sky level: the thickness of the cliff
 * shelf the band above stands on. Two rows reads as ground seen from below
 * rather than as a floating slab.
 */
const OPEN_SKY_SHELF_ROWS = 2;

/**
 * Every carving helper samples the same relief height field, so a room's floor,
 * the corridor that enters it and the content stamped on it can never disagree
 * about where the ground is. `standingY` is now a function of x as well as of
 * the macro row: that single change is what turns flat boxes into terrain.
 */
interface Carver {
  relief: ReliefField;
  /** Feet row for a macro row at global tile x. */
  standingY(row: number, x: number): number;
  /** Top row of a cell's carved void at global tile x. */
  cellTopY(row: number, x: number): number;
  /**
   * Highest ground among this column and its two neighbours. Carving up to it
   * (plus clearance) is what keeps neighbouring columns four-connected across a
   * step: without it a two-row drop leaves the two voids touching only at a
   * diagonal, which is a wall to the party and to the flood-fill proofs.
   */
  crestY(row: number, x: number): number;
}

/**
 * `openSky` is what makes a roofless level actually roofless. Enclosed vaults
 * carve a fixed headroom and leave the rock above it as ceiling; an open-sky
 * level instead carves each band all the way up until it meets the underside of
 * the terrace above, and the topmost band all the way to the sky. Without this,
 * an "open world" subzone still renders a lid over every walkable strip — and
 * the enclosed-rock fill hides the horizon behind it.
 */
function makeCarver(relief: ReliefField, openSky: boolean): Carver {
  const crestY = (row: number, x: number): number => Math.min(
    relief.surfaceY(row, x - 1),
    relief.surfaceY(row, x),
    relief.surfaceY(row, x + 1),
  );
  const cellTopY = (row: number, x: number): number => {
    const enclosed = crestY(row, x) - HEADROOM_ROWS;
    if (!openSky) return enclosed;
    // Open to the sky above the top band; below it, open to the shelf overhead.
    const above = row === 0 ? 0 : relief.surfaceY(row - 1, x) + 1 + OPEN_SKY_SHELF_ROWS;
    return Math.min(enclosed, above);
  };
  return {
    relief,
    standingY: (row, x) => relief.surfaceY(row, x),
    cellTopY,
    crestY,
  };
}

/**
 * Carve a chamber out of the solid rock, following the cell's relief profile
 * column by column. Under a roof, headroom is constant, so a crest lifts the
 * ceiling with the floor and a basin drops it — the chamber shears rather than
 * stretches. Under open sky the ceiling is gone and the carve runs up to the
 * terrace above (see `makeCarver`).
 *
 * The cell's two edge columns are deliberately left solid. They are the walls
 * that keep rooms separate, and on an open-sky level they become the standing
 * walls of the landscape: hedge rows in the Rot-Bramble, serac walls on the Fell
 * Glacier, parapets on the rooftops. Carving them would silently connect rooms
 * that the layout's locks and secrets assume are apart.
 */
function carveRoom(grid: Grid, carver: Carver, col: number, row: number): void {
  const ox = cellOx(col);
  for (let x = ox + 1; x <= ox + CELL_W - 2; x++) {
    const floor = carver.standingY(row, x);
    for (let y = carver.cellTopY(row, x); y <= floor; y++) set(grid, x, y, ".");
    set(grid, x, floor + 1, "#");
  }
}

/**
 * A handhold on the face of a relief step. `|` is non-solid to collision and
 * drives the scene's climb zone, so it reads as a rope or root on the drop and
 * guarantees followers (who refuse blind ledges) can still get back up.
 *
 * Carved after every corridor: a corridor lays solid floor rock under its span
 * and would otherwise cap the top of the handhold it crosses.
 */
function carveReliefClimb(grid: Grid, carver: Carver, row: number, x: number): void {
  const levels = [carver.standingY(row, x), carver.standingY(row, x - 1), carver.standingY(row, x + 1)];
  for (let y = Math.min(...levels); y <= Math.max(...levels); y++) set(grid, x, y, "|");
}

/**
 * A walkable corridor between two cell centres, following the height field the
 * whole way. On a tilted vault this is the long ramp that sells the lean; on a
 * level one it is the old flat doorway. Three rows of headroom keep a mover from
 * clipping their head on the step where the floor rises a row.
 */
function carveHorizontalCorridor(grid: Grid, carver: Carver, row: number, xA: number, xB: number): void {
  const lo = Math.min(xA, xB);
  const hi = Math.max(xA, xB);
  for (let x = lo; x <= hi; x++) {
    const y = carver.standingY(row, x);
    // Open the same column the room carve would, so a corridor threading an
    // open-sky level is a ledge under the sky rather than a covered tunnel.
    const top = Math.min(carver.cellTopY(row, x), carver.crestY(row, x) - 2);
    for (let cy = top; cy <= y; cy++) set(grid, x, cy, ".");
    set(grid, x, y + 1, "#"); // floor to walk on
  }
}

/**
 * A vertical shaft between two same-column cells: a ladder column with an open
 * climb lane beside it. Ladders are universal two-way traversal — the party climbs
 * up by holding up, and descending onto the ladder arrests the fall into a safe
 * controlled climb (see the scene's climb handling), so no vertical connector ever
 * inflicts fall damage.
 */
function carveVerticalShaft(grid: Grid, cx: number, yTop: number, yBot: number): void {
  for (let y = yTop; y <= yBot; y++) {
    set(grid, cx, y, "|"); // ladder: solid + climbable
    set(grid, cx - 1, y, "."); // climb/access lane beside the ladder
  }
}

type Phase = "horizontal" | "vertical";

/**
 * Carve one graph edge's connectors along its macro path. Horizontal corridors are
 * carved in a first pass and vertical ladders in a second, so at a routed corner
 * the ladder is laid last and stays intact where a corridor crosses it.
 */
function carveConnection(grid: Grid, carver: Carver, path: readonly MacroPoint[], phase: Phase): void {
  const shaft = (col: number, upper: number, lower: number): void => {
    const cx = cellCenterX(col);
    carveVerticalShaft(grid, cx, carver.standingY(upper, cx), carver.standingY(lower, cx));
  };
  for (let i = 0; i + 1 < path.length; i++) {
    const a = path[i]!;
    const b = path[i + 1]!;
    if (a.row === b.row) {
      if (phase === "horizontal") {
        carveHorizontalCorridor(grid, carver, a.row, cellCenterX(a.column), cellCenterX(b.column));
      }
    } else if (a.column === b.column) {
      if (phase === "vertical") shaft(a.column, Math.min(a.row, b.row), Math.max(a.row, b.row));
    } else {
      const cornerCol = b.column;
      const cornerRow = a.row;
      if (phase === "horizontal") {
        carveHorizontalCorridor(grid, carver, a.row, cellCenterX(a.column), cellCenterX(cornerCol));
      } else if (phase === "vertical") {
        shaft(cornerCol, Math.min(cornerRow, b.row), Math.max(cornerRow, b.row));
      }
    }
  }
}

function endpointTile(carver: Carver, point: MacroPoint): { x: number; y: number } {
  const x = cellCenterX(point.column);
  return { x, y: carver.standingY(point.row, x) };
}

/** First connector tile outside the source room, used for gates and secret doors. */
function blockerTile(carver: Carver, path: readonly MacroPoint[]): { x: number; y: number } {
  const from = path[0]!;
  const next = path[1]!;
  if (from.row === next.row) {
    const x = next.column > from.column ? cellOx(from.column) + CELL_W : cellOx(from.column);
    return { x, y: carver.standingY(from.row, x) };
  }
  const x = cellCenterX(from.column);
  const y = carver.standingY(from.row, x);
  return { x, y: next.row > from.row ? y + 1 : y - 1 };
}

function expandedConnector(
  carver: Carver,
  conn: DungeonConnection,
  path: readonly MacroPoint[],
  requirement: AbstractDungeon["requirements"][number] | undefined,
): ExpandedConnector {
  const vertical = path.some((p, i) => i > 0 && p.column === path[i - 1]!.column && p.row !== path[i - 1]!.row);
  const closed = conn.state === "locked" || conn.state === "switched" || conn.state === "secret" || conn.state === "breakable";
  // A junction edge shares its arm with every sibling crossing the same hub cell, so
  // a physical blocker on it would wall off nominally-open routes. Generation must
  // never close one; fail loudly rather than emit a self-contradicting layout.
  if (conn.kind === "junction" && closed) {
    throw new Error(`Junction connector ${conn.id} is ${conn.state}; junction edges must stay open`);
  }
  return {
    id: conn.id,
    fromRoomId: conn.fromRoomId,
    toRoomId: conn.toRoomId,
    kind: conn.kind,
    state: conn.state,
    direction: conn.direction,
    requirement,
    entry: endpointTile(carver, path[0]!),
    landing: endpointTile(carver, path[path.length - 1]!),
    waypoints: path.map((point) => endpointTile(carver, point)),
    blocker: closed ? blockerTile(carver, path) : undefined,
    vertical,
  };
}

function stampBlocker(grid: Grid, connector: ExpandedConnector): void {
  if (!connector.blocker) return;
  const { x, y } = connector.blocker;
  if (connector.state === "breakable") set(grid, x, y, "%");
  else set(grid, x, y, "+");
}

function themeBase(themeId: string): DungeonDefinition {
  const base = DUNGEONS.find((d) => d.id === themeId);
  if (!base) throw new Error(`Unknown theme id "${themeId}" for expansion`);
  return base;
}

const EMPTY_POOLS: VariantPools = {
  room1: [0],
  room2: [0],
  room3: [0],
  room4: [0],
  room5: [0],
  sanctuary: [0],
};

export interface ExpandOptions {
  /**
   * The level is roofless. Bands carve upward to the terrace above instead of to
   * a fixed headroom, so nothing renders a lid over walkable ground.
   */
  openSky?: boolean;
}

/** Expand an abstract dungeon into a renderable, region-annotated definition. */
export function expandDungeon(abstract: AbstractDungeon, options: ExpandOptions = {}): DungeonDefinition {
  const relief = buildRelief({
    seed: abstract.seed,
    macroWidth: abstract.macroWidth,
    macroHeight: abstract.macroHeight,
    roomCells: new Set(abstract.rooms.map((room) => `${room.position.column},${room.position.row}`)),
  });
  const carver = makeCarver(relief, options.openSky === true);
  const width = abstract.macroWidth * CELL_W;
  // A tilted vault is a parallelogram, so the grid grows by the total lean.
  const height = abstract.macroHeight * CELL_H + relief.extraRows;
  const grid = makeGrid(width, height);

  const base = themeBase(abstract.themeId);

  const roomByNode = new Map<string, DungeonRoomNode>();
  for (const room of abstract.rooms) roomByNode.set(room.id, room);

  // 1. Carve every room chamber, following the cell's relief profile.
  for (const room of abstract.rooms) carveRoom(grid, carver, room.position.column, room.position.row);

  // 2. Carve connectors in global phases. Vertical shafts must be applied after
  // every horizontal corridor, otherwise a later corridor can refill a shaft's
  // access lane with floor rock at a routed crossing.
  const paths = abstract.connections.map((conn) => {
    const from = roomByNode.get(conn.fromRoomId)!;
    const to = roomByNode.get(conn.toRoomId)!;
    return [from.position, ...conn.routedCells, to.position] satisfies MacroPoint[];
  });
  for (const path of paths) carveConnection(grid, carver, path, "horizontal");
  for (const path of paths) carveConnection(grid, carver, path, "vertical");

  // 3. Relief handholds last: a corridor lays floor rock across its whole span
  // and would cap any handhold carved before it.
  for (const room of abstract.rooms) {
    const { column, row } = room.position;
    for (const localX of relief.cell(column, row).climbColumns) {
      carveReliefClimb(grid, carver, row, cellOx(column) + localX);
    }
  }

  const requirements = new Map(abstract.requirements.map((r) => [r.id, r]));
  const connectors = abstract.connections.map((conn, i) =>
    expandedConnector(carver, conn, paths[i]!, conn.requirementId ? requirements.get(conn.requirementId) : undefined),
  );
  const routedUses = new Map<string, { point: MacroPoint; roomIds: Set<string>; count: number }>();
  for (const connection of abstract.connections) for (const point of connection.routedCells) {
    const key = `${point.column},${point.row}`;
    const use = routedUses.get(key) ?? { point, roomIds: new Set<string>(), count: 0 };
    use.count++;
    use.roomIds.add(connection.fromRoomId);
    use.roomIds.add(connection.toRoomId);
    routedUses.set(key, use);
  }
  const junctions: ExpandedJunction[] = [...routedUses.values()]
    .filter((use) => use.count > 1)
    .map((use, index) => ({
      id: `junction-${index}`,
      tile: endpointTile(carver, use.point),
      roomIds: [...use.roomIds].sort(),
    }));

  // A separate deterministic stream controls social content, so changing a room
  // template never perturbs topology or connector selection. Standard runs get
  // zero or one talkable NPC, targeting half of seeds.
  const npcEligible = abstract.rooms.filter((room) =>
    (room.contentRoll ?? 3) > 2 && (room.contentFamily === "discovery" || room.contentFamily === "twist"),
  );
  const npcRoom = npcEligible.length > 0 && templateHash(abstract.seed, "talkable-npc") % 2 === 0
    ? npcEligible[templateHash(abstract.seed, "talkable-npc-room") % npcEligible.length]
    : undefined;
  const roomContents: ExpandedRoomContent[] = [];
  const talkableNpcs: TalkableNpcSpec[] = [];

  // 4. Stamp room contents after all carving, so nothing floats over a shaft.
  for (const room of abstract.rooms) {
    const ox = cellOx(room.position.column);
    // Content follows the relief: `canStand` resolves the standing row for the
    // column being probed, so a brazier on a terrace sits on that terrace rather
    // than hanging in the air where the old single floor row used to be.
    const floorAt = (localX: number): number => carver.standingY(room.position.row, ox + localX);
    const stamp: RoomStamp = {
      width: CELL_W,
      // Which role a room's monsters take is stable per room and per seed, so
      // a reloaded layout stages the same kind of fight it did before.
      monsterGlyph: glyphForRoom(abstract.seed, room.id, room.beat),
      put: (localX, ch) => set(grid, ox + localX, floorAt(localX), ch),
      canStand: (localX) => {
        const x = ox + localX;
        const y = floorAt(localX);
        return (
          get(grid, x, y) === "." &&
          get(grid, x, y - 1) === "." &&
          SOLID.has(get(grid, x, y + 1) ?? "")
        );
      },
    };
    const incident = abstract.connections.filter((connection) =>
      connection.fromRoomId === room.id || connection.toRoomId === room.id,
    );
    const selectedTemplate = chooseRoomTemplate(
      room,
      abstract.seed,
      incident.length,
      incident.map((connection) => connection.kind),
      room.id === npcRoom?.id ? "required" : "forbidden",
    );
    const stamped = stampRoom(
      room,
      {
        isEntrance: room.id === abstract.entranceRoomId,
        isReward: room.id === abstract.rewardRoomId,
        isExit: room.id === abstract.exitRoomId,
        allowNpc: room.id === npcRoom?.id,
      },
      stamp,
      selectedTemplate,
    );
    roomContents.push({
      roomId: room.id,
      family: room.contentFamily,
      templateId: stamped.templateId,
      pressures: [...new Set([
        ...stamped.pressures,
        ...(room.id === abstract.entranceRoomId ? (["light"] as const) : []),
        ...(room.id === abstract.climaxRoomId ? (["hp"] as const) : []),
        ...(room.id === abstract.rewardRoomId ? (["inventory"] as const) : []),
      ])],
    });
    if (stamped.npcLocalX !== undefined) {
      const npcHash = templateHash(abstract.seed, `npc:${room.id}`);
      const secret = connectors.find((connector) =>
        connector.state === "secret" &&
        (connector.fromRoomId === room.id || connector.toRoomId === room.id),
      );
      const gate = connectors.find((connector) =>
        (connector.state === "locked" || connector.state === "switched") && connector.requirement,
      );
      const outcomes: TalkableNpcOutcome[] = [
        "give-torch", "warning", "trade", "betrayal", "companion-eligible",
      ];
      if (secret) outcomes.push("reveal-route");
      if (gate) outcomes.push("revelation");
      const outcome = outcomes[npcHash % outcomes.length]!;
      const dialogue = npcDialogue(outcome);
      const alignmentRoll = (npcHash >>> 12) % 6;
      talkableNpcs.push({
        id: `npc-${room.node}`,
        roomId: room.id,
        tile: { x: ox + stamped.npcLocalX, y: floorAt(stamped.npcLocalX) },
        name: NPC_NAMES[npcHash % NPC_NAMES.length]!,
        role: NPC_ROLES[(npcHash >>> 4) % NPC_ROLES.length]!,
        alignment: alignmentRoll < 3 ? "law" : alignmentRoll < 5 ? "neutral" : "chaos",
        introduction: dialogue.introduction,
        resolution: dialogue.resolution,
        outcome,
        targetConnectorId: outcome === "reveal-route" ? secret?.id : outcome === "revelation" ? gate?.id : undefined,
        companionClass: outcome === "companion-eligible"
          ? (["thief", "priest", "wizard"] as const)[(npcHash >>> 8) % 3]
          : undefined,
      });
    }
  }

  // 5. Closed connector states sit above room decoration and retain stable tile
  // coordinates for the scene's interaction/persistence layer.
  for (const connector of connectors) stampBlocker(grid, connector);

  // Regions stay CELL_H tall and are stated at their left edge; on a tilted
  // vault they are parallelograms, and `shearRows` tells `roomAt` how far the
  // box slides down as x advances. Keeping the box height fixed is what stops
  // vertically-adjacent rooms from overlapping once the vault leans.
  const regions: RoomRegion[] = abstract.rooms.map((room, index) => {
    const ox = cellOx(room.position.column);
    const oy = relief.surfaceY(room.position.row, ox) - (CELL_H - 3);
    const label = BEAT_LABEL[room.beat];
    return {
      id: room.id,
      title: label.title,
      hud: `ROOM ${index + 1}  |  ${label.title}`,
      x1: ox,
      y1: oy,
      x2: ox + CELL_W - 1,
      y2: oy + CELL_H - 1,
      labelX: cellCenterX(room.position.column),
      beat: room.beat,
      shearRows: relief.shearRows,
      macro: { column: room.position.column, row: room.position.row },
    };
  });

  const expanded: DungeonDefinition = {
    id: `nl-${abstract.topologyId}-${abstract.seed}`,
    name: base.name,
    tagline: base.tagline,
    objective: "Reach the vault, then the exit",
    grid: grid.map((row) => row.join("")),
    width,
    height,
    regions,
    groundProfile: {
      bands: Array.from({ length: abstract.macroHeight }, (_, band) =>
        Array.from({ length: width }, (_unused, x) => relief.surfaceYExact(band, x)),
      ),
    },
    connectors,
    roomContents,
    talkableNpcs,
    junctions,
    theme: base.theme,
    pools: EMPTY_POOLS,
    traps: [],
    trapKinds: [],
    danger: base.danger,
  };
  const physical = validatePhysicalDungeon(expanded);
  if (!physical.ok) throw new Error(`Invalid physical dungeon: ${physical.diagnostics.join(",")}`);
  return expanded;
}
