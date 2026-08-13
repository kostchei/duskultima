import { describe, expect, it } from "vitest";
import { ROOM_ARCHETYPES, buildRoomPlans, buildTravelSegments } from "./roomGeneration";
import type { SiteGoal } from "./Adventure";

const GOAL: SiteGoal = {
  kind: "monster-eggs",
  verb: "Retrieve",
  target: "monster eggs",
  isRescue: false,
  completion: "acquire",
  approaches: ["combat", "stealth", "evasion"],
  requiresAllHostilesDefeated: false,
  requiredQuantity: 1,
  guardianName: "the nesting mother",
  isCompleted: false,
  description: "Recover the monster eggs without waking the nesting mother",
};

describe("room and travel generation", () => {
  it("exposes twelve room archetypes and reserves the final two rooms", () => {
    expect(ROOM_ARCHETYPES).toHaveLength(12);
    expect(new Set(ROOM_ARCHETYPES).size).toBe(12);

    const plans = buildRoomPlans(12, GOAL);
    expect(plans).toHaveLength(12);
    expect(plans[0]?.archetype).toBe("entrance");
    expect(plans[10]?.archetype).toBe("goal-vault");
    expect(plans[10]?.isGoalRoom).toBe(true);
    expect(plans[11]?.archetype).toBe("exit-rest");
  });

  it("connects every room with three-wide travel and can place corridor traps", () => {
    const segments = buildTravelSegments(buildRoomPlans(12, GOAL));
    expect(segments).toHaveLength(11);
    expect(segments.every((segment) => segment.width === 3)).toBe(true);
    expect(new Set(segments.map((segment) => segment.kind)).size).toBe(3);
    expect(segments.some((segment) => segment.trapId !== undefined)).toBe(true);
  });
});
