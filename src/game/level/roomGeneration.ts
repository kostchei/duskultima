import { goalUsesChest, type GoalEntityKind, type SiteGoal } from "./Adventure";

export type RoomArchetype =
  | "entrance"
  | "empty"
  | "monster"
  | "elite"
  | "trap"
  | "hazard"
  | "puzzle"
  | "shrine"
  | "rescue"
  | "treasure-cache"
  | "goal-vault"
  | "exit-rest";

export const ROOM_ARCHETYPES: readonly RoomArchetype[] = [
  "entrance",
  "empty",
  "monster",
  "elite",
  "trap",
  "hazard",
  "puzzle",
  "shrine",
  "rescue",
  "treasure-cache",
  "goal-vault",
  "exit-rest",
];

export type TravelKind = "corridor" | "ramp" | "shaft";

export interface RoomRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomPlan {
  index: number;
  rect: RoomRect;
  archetype: RoomArchetype;
  isGoalRoom: boolean;
}

export interface TravelSegment {
  fromRoom: number;
  toRoom: number;
  kind: TravelKind;
  /** Three tiles leaves space for the largest ordinary monster footprints. */
  width: 3;
  trapId?: number;
}

const REPEATABLE_ARCHETYPES: readonly RoomArchetype[] = [
  "empty",
  "monster",
  "elite",
  "trap",
  "hazard",
  "puzzle",
  "shrine",
  "treasure-cache",
];

function goalRoomArchetype(goal: SiteGoal): RoomArchetype {
  if (goal.objectiveEntity === "rescue-companion" || goal.objectiveEntity === "hostage") return "rescue";
  if (goalUsesChest(goal)) return "goal-vault";
  return "goal-vault";
}

export function roomGoalIndex(roomCount: number): number {
  if (!Number.isInteger(roomCount) || roomCount < 3) throw new Error(`Room count must be at least 3, got ${roomCount}`);
  return Math.max(1, roomCount - 2);
}

export function buildRoomPlans(roomCount: number, goal: SiteGoal): readonly RoomPlan[] {
  if (!Number.isInteger(roomCount) || roomCount < 3 || roomCount > 12) {
    throw new Error(`Room count must be between 3 and 12, got ${roomCount}`);
  }
  const gridCols = Math.ceil(Math.sqrt(roomCount));
  const goalIndex = roomGoalIndex(roomCount);
  return Array.from({ length: roomCount }, (_, index) => {
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    const archetype = index === 0
      ? "entrance"
      : index === roomCount - 1
        ? "exit-rest"
        : index === goalIndex
          ? goalRoomArchetype(goal)
          : REPEATABLE_ARCHETYPES[(index - 1) % REPEATABLE_ARCHETYPES.length]!;
    return {
      index,
      rect: { x: 2 + col * 7, y: 2 + row * 7, w: 5, h: 5 },
      archetype,
      isGoalRoom: index === goalIndex,
    };
  });
}

export function buildTravelSegments(roomPlans: readonly RoomPlan[]): readonly TravelSegment[] {
  return roomPlans.slice(0, -1).map((_, index) => ({
    fromRoom: index,
    toRoom: index + 1,
    kind: (index % 3 === 0 ? "corridor" : index % 3 === 1 ? "ramp" : "shaft") as TravelKind,
    width: 3,
    // Corridor traps are data on the travel segment, not room contents.
    trapId: index % 4 === 1 ? (index % 12) + 1 : undefined,
  }));
}

export function isObjectiveEntityKind(kind: GoalEntityKind | undefined): boolean {
  return kind === "hostage" || kind === "objective";
}
