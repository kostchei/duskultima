import { describe, expect, it } from "vitest";
import { AdventureGenerator, GOAL_TEMPLATES } from "./AdventureGenerator";
import type { GoalKind } from "./Adventure";

const STANDARD_GOALS: readonly GoalKind[] = [
  "fabled-item",
  "lift-hex",
  "harvest-components",
  "treasure-cache",
  "exotic-materials",
  "rescue-hostage",
  "monster-eggs",
  "assassinate-leader",
  "secure-chokepoint",
  "kill-boss",
  "clear-border",
];

describe("AdventureGenerator goals", () => {
  it("defines every standard objective exactly once", () => {
    expect(GOAL_TEMPLATES.map((template) => template.kind)).toEqual(STANDARD_GOALS);
  });

  it("marks generated objectives as non-extermination goals", () => {
    for (let seed = 1; seed <= 24; seed += 1) {
      const adventure = new AdventureGenerator(seed).generateAdventure(4, []);
      for (const site of adventure.sites) {
        expect(site.goal.requiresAllHostilesDefeated).toBe(false);
        expect(site.goal.approaches.length).toBeGreaterThan(0);
        expect([...STANDARD_GOALS, "rescue-companion"]).toContain(site.goal.kind);
      }
    }
  });

  it("keeps the rescue-companion rule available while the party is incomplete", () => {
    const generatedKinds = new Set<GoalKind>();
    for (let seed = 1; seed <= 24; seed += 1) {
      const adventure = new AdventureGenerator(seed).generateAdventure(1, ["thief"]);
      for (const site of adventure.sites) generatedKinds.add(site.goal.kind);
    }
    expect(generatedKinds).toContain("rescue-companion");
  });
});
