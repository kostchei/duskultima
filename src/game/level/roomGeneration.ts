import type { MonsterBiome, MonsterDef, MonsterSize } from "../../engine";
import { MONSTER_SIZE_TILES } from "../../engine/monster";
import { Dice } from "../../engine/dice";
import { HAZARDS, TRAPS, type HazardDef, type TrapDef } from "../../engine/trapsHazards";
import { monster, monstersForBiome } from "../../data/monsters";
import { goalUsesChest, type SiteGoal, type SiteSize } from "./Adventure";

export type TravelKind = "corridor" | "ramp" | "shaft";
export type CorridorLengthBand = "door" | "near" | "far";
export type BeatRole = "entrance" | "explore" | "trick" | "climax" | "reward";
export type RoomFeature =
  | "empty"
  | "trap"
  | "minor-hazard"
  | "solo-monster"
  | "npc"
  | "monster-mob"
  | "major-hazard"
  | "treasure"
  | "boss-monster"
  | "climax";

/** 5ft per tile: door = rooms flush, near = 30ft, far = 90ft. */
export const CORRIDOR_LENGTH_TILES: Record<CorridorLengthBand, number> = {
  door: 1,
  near: 6,
  far: 18,
};

export interface RoomRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** What the goal-driven climax room actually holds, mirroring `SiteGoal.kind`. */
export interface ClimaxContent {
  kind: "rescue-companion" | "rescue-hostage" | "boss" | "chest" | "objective";
  monster?: MonsterDef;
}

export interface RoomContent {
  feature: RoomFeature;
  monsters: readonly MonsterDef[];
  trap?: TrapDef;
  hazard?: HazardDef;
  climax?: ClimaxContent;
}

export interface RoomPlan {
  id: number;
  /** Undefined for filler rooms — only the 5 beat rooms carry a role. */
  beatRole?: BeatRole;
  rect: RoomRect;
  content: RoomContent;
  largestMonsterSize: MonsterSize;
}

export interface TravelSegment {
  fromRoom: number;
  toRoom: number;
  kind: TravelKind;
  lengthBand: CorridorLengthBand;
  /** Tiles wide, uniform across the site (largest monster in the site). */
  width: number;
  trapId?: number;
}

export interface SitePlan {
  rooms: readonly RoomPlan[];
  edges: readonly TravelSegment[];
  width: number;
  height: number;
}

export interface BeatTopology {
  name: string;
  edges: readonly (readonly [number, number])[];
}

/**
 * The 21 topologically distinct connected graphs on 5 nodes (see
 * docs/raw_source/The-21-Forms.png), reused here as 21 ways to wire 5 "beat"
 * rooms together. Named after the reference table and grouped by the correct
 * edge-count distribution (3 trees at 4 edges through K5 at 10 edges), but
 * not guaranteed to be byte-exact matches of the formal graph atlas — that
 * precision doesn't change gameplay, only shape-name fidelity.
 */
export const BEAT_TOPOLOGIES: readonly BeatTopology[] = [
  { name: "5-star", edges: [[0, 1], [0, 2], [0, 3], [0, 4]] },
  { name: "5-arrow", edges: [[0, 1], [0, 2], [0, 3], [3, 4]] },
  { name: "5-path", edges: [[0, 1], [1, 2], [2, 3], [3, 4]] },
  { name: "cricket", edges: [[0, 1], [1, 2], [2, 0], [0, 3], [0, 4]] },
  { name: "bull", edges: [[0, 1], [1, 2], [2, 0], [1, 3], [2, 4]] },
  { name: "banner", edges: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4]] },
  { name: "lollipop", edges: [[0, 1], [1, 2], [2, 0], [2, 3], [3, 4]] },
  { name: "5-circle", edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { name: "stingray", edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]] },
  { name: "spinning-top", edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]] },
  { name: "kite", edges: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [3, 4]] },
  { name: "ufo", edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 4]] },
  { name: "chevron", edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 4]] },
  { name: "hourglass", edges: [[0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 4], [0, 3]] },
  { name: "house", edges: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [0, 2]] },
  { name: "crown", edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3]] },
  { name: "envelope", edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4]] },
  { name: "lamp", edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 4], [2, 3], [3, 4]] },
  { name: "arrowhead", edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 4], [2, 3], [2, 4], [3, 4]] },
  { name: "cat's-cradle", edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4]] },
  { name: "5-complete", edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
];

export function pickTopology(dice: Dice): BeatTopology {
  return BEAT_TOPOLOGIES[dice.die(BEAT_TOPOLOGIES.length) - 1]!;
}

interface BeatAssignment {
  entrance: number;
  explore: number;
  trick: number;
  climax: number;
  reward: number;
}

function buildAdjacency(edges: readonly (readonly [number, number])[], nodeCount: number): number[][] {
  const adjacency: number[][] = Array.from({ length: nodeCount }, () => []);
  for (const [a, b] of edges) {
    adjacency[a]!.push(b);
    adjacency[b]!.push(a);
  }
  return adjacency;
}

function bfsDistances(adjacency: number[][], start: number): number[] {
  const dist = new Array(adjacency.length).fill(-1);
  dist[start] = 0;
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const next of adjacency[current]!) {
      if (dist[next] === -1) {
        dist[next] = dist[current]! + 1;
        queue.push(next);
      }
    }
  }
  return dist;
}

/**
 * Entrance and climax are always placed at the graph-diameter (maximally
 * separated) pair of nodes for the rolled topology, so the "goal" room can
 * never coincidentally land next to the entrance the way the old fixed-grid
 * layout did.
 */
export function assignBeatRoles(dice: Dice, topology: BeatTopology): BeatAssignment {
  const nodeCount = 5;
  const adjacency = buildAdjacency(topology.edges, nodeCount);
  const distances = Array.from({ length: nodeCount }, (_, n) => bfsDistances(adjacency, n));

  let maxDist = -1;
  const diameterPairs: [number, number][] = [];
  for (let a = 0; a < nodeCount; a++) {
    for (let b = a + 1; b < nodeCount; b++) {
      const d = distances[a]![b]!;
      if (d > maxDist) {
        maxDist = d;
        diameterPairs.length = 0;
      }
      if (d === maxDist) diameterPairs.push([a, b]);
    }
  }
  const [pa, pb] = diameterPairs[dice.die(diameterPairs.length) - 1]!;
  const entrance = dice.die(2) === 1 ? pa : pb;
  const climax = entrance === pa ? pb : pa;
  const entranceDist = distances[entrance]!;
  const climaxAdjacency = new Set(adjacency[climax]);

  const remaining = [0, 1, 2, 3, 4].filter((n) => n !== entrance && n !== climax);
  const rewardCandidates = remaining.filter((n) => climaxAdjacency.has(n));
  const pickFarthest = (candidates: number[]): number =>
    candidates.reduce((best, n) => (entranceDist[n]! > entranceDist[best]! ? n : best), candidates[0]!);
  const reward = pickFarthest(rewardCandidates.length > 0 ? rewardCandidates : remaining);
  const rest = remaining.filter((n) => n !== reward);
  const explore = rest[0]!;
  const trick = rest[1]!;

  return { entrance, explore, trick, climax, reward };
}

export function rollFillerCount(dice: Dice, size: SiteSize): number {
  if (size === "small") return 0;
  if (size === "medium") return dice.die(3) - 1;
  return dice.die(4);
}

const ROOM_FEATURE_TABLE: readonly RoomFeature[] = [
  "empty", "empty", "trap", "minor-hazard", "solo-monster",
  "npc", "monster-mob", "major-hazard", "treasure", "boss-monster",
];

function rollRoomFeature(dice: Dice): RoomFeature {
  return ROOM_FEATURE_TABLE[dice.die(10) - 1]!;
}

function pickRegularMonster(dice: Dice, pool: readonly MonsterDef[], role: string, fallbackRole: string): MonsterDef {
  return pool.find((m) => m.role === role)
    ?? pool.find((m) => m.role === fallbackRole)
    ?? pool[dice.die(pool.length) - 1]!;
}

function pickEliteMonster(dice: Dice, pool: readonly MonsterDef[]): MonsterDef {
  return pool.find((m) => m.role === "champion" || m.role === "brute")
    ?? pool[dice.die(pool.length) - 1]!;
}

function resolveRoomContent(dice: Dice, biome: MonsterBiome, feature: RoomFeature): RoomContent {
  const pool = monstersForBiome(biome);
  switch (feature) {
    case "empty":
      return { feature, monsters: [] };
    case "trap":
      return { feature, monsters: [], trap: TRAPS[dice.die(TRAPS.length) - 1]! };
    case "minor-hazard":
    case "major-hazard":
      return { feature, monsters: [], hazard: HAZARDS[dice.die(HAZARDS.length) - 1]! };
    case "npc":
      return { feature, monsters: [] };
    case "treasure":
      return { feature, monsters: [] };
    case "solo-monster":
      return { feature, monsters: [pickRegularMonster(dice, pool, "skirmisher", "vermin")] };
    case "monster-mob": {
      const count = dice.die(3) + 1; // 2-4
      return { feature, monsters: Array.from({ length: count }, () => pickRegularMonster(dice, pool, "skirmisher", "vermin")) };
    }
    case "boss-monster":
      return { feature, monsters: [pickEliteMonster(dice, pool)] };
    default:
      return { feature, monsters: [] };
  }
}

function resolveClimaxContent(biome: MonsterBiome, goal: SiteGoal): RoomContent {
  const pool = monstersForBiome(biome);
  if (goal.kind === "rescue-companion") {
    return { feature: "climax", monsters: [], climax: { kind: "rescue-companion" } };
  }
  if (goal.kind === "rescue-hostage") {
    return { feature: "climax", monsters: [], climax: { kind: "rescue-hostage" } };
  }
  if (goal.kind === "assassinate-leader" || goal.kind === "kill-boss") {
    const bossDef = goal.guardianMonsterId
      ? monster(goal.guardianMonsterId)
      : pool.find((m) => m.role === "champion" || m.role === "brute") ?? pool[0]!;
    return { feature: "climax", monsters: bossDef ? [bossDef] : [], climax: { kind: "boss", monster: bossDef } };
  }
  const guardian = goal.guardianMonsterId
    ? monster(goal.guardianMonsterId) ?? pool.find((m) => m.role === "brute") ?? pool[0]!
    : undefined;
  const kind = goalUsesChest(goal) ? "chest" : "objective";
  return { feature: "climax", monsters: guardian ? [guardian] : [], climax: { kind, monster: guardian } };
}

function largestSize(sizes: readonly MonsterSize[]): MonsterSize {
  const order: readonly MonsterSize[] = ["tiny", "small", "medium", "large", "huge", "gargantuan"];
  return sizes.reduce((best, s) => (order.indexOf(s) > order.indexOf(best) ? s : best), "medium" as MonsterSize);
}

function roomLargestSize(content: RoomContent): MonsterSize {
  const sizes = content.monsters.map((m) => m.size);
  return sizes.length > 0 ? largestSize(sizes) : "medium";
}

interface PlacedRoom {
  id: number;
  beatRole?: BeatRole;
  content: RoomContent;
  largestMonsterSize: MonsterSize;
  dim: number;
  cx: number;
  cy: number;
}

interface PendingEdge {
  from: number;
  to: number;
  lengthBand: CorridorLengthBand;
}

const CARDINAL_DIRECTIONS: readonly { dx: number; dy: number }[] = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
];

const LENGTH_BANDS: readonly CorridorLengthBand[] = ["door", "near", "far"];

/** Runaway guard on the generated grid; a normal site lands far below this. */
const MAX_LAYOUT_TILES = 512;

/** How far a room may be shoved along its ray before we call the layout broken. */
const MAX_PLACEMENT_PUSH = 256;

/** True when two centered square rooms would touch or overlap (1-tile wall between). */
function roomsCollide(
  a: { cx: number; cy: number },
  aDim: number,
  b: { cx: number; cy: number; dim: number },
): boolean {
  const ax0 = a.cx - Math.floor(aDim / 2);
  const ay0 = a.cy - Math.floor(aDim / 2);
  const bx0 = b.cx - Math.floor(b.dim / 2);
  const by0 = b.cy - Math.floor(b.dim / 2);
  return ax0 - 1 < bx0 + b.dim
    && bx0 - 1 < ax0 + aDim
    && ay0 - 1 < by0 + b.dim
    && by0 - 1 < ay0 + aDim;
}

/**
 * `fillerCount` is supplied by the caller (from `SiteDef.roomCount`) rather than
 * rerolled here, so the room count the UI advertises is the count that gets carved.
 */
export function buildSitePlan(dice: Dice, fillerCount: number, goal: SiteGoal, biome: MonsterBiome): SitePlan {
  if (!Number.isInteger(fillerCount) || fillerCount < 0) {
    throw new Error(`Filler room count must be a non-negative integer, got ${fillerCount}`);
  }
  const topology = pickTopology(dice);
  const roles = assignBeatRoles(dice, topology);
  const roleByNode = new Map<number, BeatRole>([
    [roles.entrance, "entrance"],
    [roles.explore, "explore"],
    [roles.trick, "trick"],
    [roles.climax, "climax"],
    [roles.reward, "reward"],
  ]);

  const rooms: PendingRoom[] = [0, 1, 2, 3, 4].map((node) => {
    const role = roleByNode.get(node)!;
    const content = role === "climax" ? resolveClimaxContent(biome, goal) : resolveRoomContent(dice, biome, rollRoomFeature(dice));
    return { id: node, beatRole: role, content };
  });

  const adjacency: number[][] = Array.from({ length: 5 }, () => []);
  const edges: PendingEdge[] = topology.edges.map(([a, b]) => {
    adjacency[a]!.push(b);
    adjacency[b]!.push(a);
    return { from: a, to: b, lengthBand: LENGTH_BANDS[dice.die(3) - 1]! };
  });

  let nextId = 5;
  for (let i = 0; i < fillerCount; i++) {
    const id = nextId++;
    const attachTo = dice.die(rooms.length) - 1;
    const content = resolveRoomContent(dice, biome, rollRoomFeature(dice));
    rooms.push({ id, content });
    adjacency.push([]);
    adjacency[attachTo]!.push(id);
    adjacency[id]!.push(attachTo);
    edges.push({ from: attachTo, to: id, lengthBand: LENGTH_BANDS[dice.die(3) - 1]! });
  }

  const largestMonsterSizeInSite = largestSize(rooms.map((r) => roomLargestSize(r.content)));
  const corridorWidthTiles = MONSTER_SIZE_TILES[largestMonsterSizeInSite] + (dice.die(2) === 1 ? 1 : 0);

  const dims = new Map<number, number>();
  for (const room of rooms) {
    const size2 = roomLargestSize(room.content);
    dims.set(room.id, Math.max(3, MONSTER_SIZE_TILES[size2] * dice.between(2, 4)));
  }

  // Spanning-tree layout rooted at the entrance; extra edges just connect
  // already-placed centers afterward.
  const treeParent = new Map<number, { parent: number; lengthBand: CorridorLengthBand }>();
  const visited = new Set<number>([roles.entrance]);
  const queue = [roles.entrance];
  const edgeKey = (a: number, b: number): string => `${Math.min(a, b)}-${Math.max(a, b)}`;
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const next of adjacency[current]!) {
      if (visited.has(next)) continue;
      visited.add(next);
      const band = edges.find((e) => edgeKey(e.from, e.to) === edgeKey(current, next))!.lengthBand;
      treeParent.set(next, { parent: current, lengthBand: band });
      queue.push(next);
    }
  }

  const positions = new Map<number, { cx: number; cy: number }>();
  positions.set(roles.entrance, { cx: 0, cy: 0 });
  const directionIndexByParent = new Map<number, number>();
  // Branches from different parents can aim into the same patch of the plane, so
  // each child is pushed further along its ray until it clears every room placed
  // so far. Without this, two rooms can land on the same tiles and one room's
  // content silently overwrites the other's — including the goal.
  const settled: { cx: number; cy: number; dim: number }[] = [{ cx: 0, cy: 0, dim: dims.get(roles.entrance)! }];
  // `visited` was populated in BFS discovery order, so every node's parent is
  // already positioned by the time we reach it here.
  const placementOrder = [...visited].filter((n) => n !== roles.entrance);
  for (const node of placementOrder) {
    const { parent, lengthBand } = treeParent.get(node)!;
    const dirIndex = directionIndexByParent.get(parent) ?? 0;
    directionIndexByParent.set(parent, dirIndex + 1);
    const lap = Math.floor(dirIndex / CARDINAL_DIRECTIONS.length);
    const dir = CARDINAL_DIRECTIONS[dirIndex % CARDINAL_DIRECTIONS.length]!;
    const parentPos = positions.get(parent)!;
    const parentDim = dims.get(parent)!;
    const childDim = dims.get(node)!;
    const gap = CORRIDOR_LENGTH_TILES[lengthBand] + lap * 4;
    const baseOffset = Math.ceil(parentDim / 2) + gap + Math.ceil(childDim / 2);

    let push = 0;
    let candidate = { cx: parentPos.cx + dir.dx * baseOffset, cy: parentPos.cy + dir.dy * baseOffset };
    while (settled.some((other) => roomsCollide(candidate, childDim, other))) {
      push++;
      if (push > MAX_PLACEMENT_PUSH) {
        throw new Error(`Could not place room ${node} clear of the ${settled.length} rooms already laid out`);
      }
      const offset = baseOffset + push;
      candidate = { cx: parentPos.cx + dir.dx * offset, cy: parentPos.cy + dir.dy * offset };
    }
    positions.set(node, candidate);
    settled.push({ ...candidate, dim: childDim });
  }

  const placed: PlacedRoom[] = rooms.map((room) => {
    const pos = positions.get(room.id) ?? { cx: 0, cy: 0 };
    return {
      id: room.id,
      beatRole: room.beatRole,
      content: room.content,
      largestMonsterSize: roomLargestSize(room.content),
      dim: dims.get(room.id)!,
      cx: pos.cx,
      cy: pos.cy,
    };
  });

  const minX = Math.min(...placed.map((r) => r.cx - Math.ceil(r.dim / 2)));
  const minY = Math.min(...placed.map((r) => r.cy - Math.ceil(r.dim / 2)));
  const maxX = Math.max(...placed.map((r) => r.cx + Math.ceil(r.dim / 2)));
  const maxY = Math.max(...placed.map((r) => r.cy + Math.ceil(r.dim / 2)));
  const margin = 3;
  const shiftX = margin - minX;
  const shiftY = margin - minY;
  // Rooms are laid out on an unbounded plane, so the grid is sized to the layout
  // instead of the layout being truncated to a fixed grid — clamping here would
  // slice rooms and corridors off the far edge. The ceiling is a runaway guard
  // well above any layout the topology/gap rolls can actually produce.
  const width = maxX - minX + margin * 2;
  const height = maxY - minY + margin * 2;
  if (width > MAX_LAYOUT_TILES || height > MAX_LAYOUT_TILES) {
    throw new Error(`Site layout ${width}x${height} exceeds the ${MAX_LAYOUT_TILES}-tile limit`);
  }

  const roomPlans: RoomPlan[] = placed.map((r) => ({
    id: r.id,
    beatRole: r.beatRole,
    rect: {
      x: r.cx + shiftX - Math.floor(r.dim / 2),
      y: r.cy + shiftY - Math.floor(r.dim / 2),
      w: r.dim,
      h: r.dim,
    },
    content: r.content,
    largestMonsterSize: r.largestMonsterSize,
  }));

  const travelSegments: TravelSegment[] = edges.map((e, index) => ({
    fromRoom: e.from,
    toRoom: e.to,
    kind: index % 3 === 0 ? "corridor" : index % 3 === 1 ? "ramp" : "shaft",
    lengthBand: e.lengthBand,
    width: corridorWidthTiles,
    trapId: index % 4 === 1 ? (index % 12) + 1 : undefined,
  }));

  return { rooms: roomPlans, edges: travelSegments, width, height };
}

interface PendingRoom {
  id: number;
  beatRole?: BeatRole;
  content: RoomContent;
}
