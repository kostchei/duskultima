import { describe, expect, it } from "vitest";
import { AdventureGenerator, EGG_GUARDIANS_BY_BIOME, GOAL_TEMPLATES } from "./AdventureGenerator";
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

  it("models egg goals as species-specific nests with appropriately scaled guardians", () => {
    expect(EGG_GUARDIANS_BY_BIOME["red-sands"].map((profile) => profile.speciesId)).toEqual([
      "kobold",
      "scrag",
      "wyvern",
      "desert-dragon",
      "fire-dragon",
      "purple-worm",
    ]);
    const eggProfiles = Object.values(EGG_GUARDIANS_BY_BIOME).flat();
    const purpleWorm = EGG_GUARDIANS_BY_BIOME["red-sands"].find((profile) => profile.speciesId === "purple-worm");
    expect(purpleWorm?.guardianSize).toBe("gargantuan");
    expect(purpleWorm?.treasureQuality).toBe("legendary");
    expect(EGG_GUARDIANS_BY_BIOME["midnight-sun"].map((profile) => profile.speciesId)).toContain("hippogriff");
    for (const dragonId of ["desert-dragon", "fire-dragon", "forest-dragon", "frost-dragon", "sea-dragon", "swamp-dragon"]) {
      expect(eggProfiles.some((profile) => profile.speciesId === dragonId)).toBe(true);
    }

    expect(eggProfiles.find((profile) => profile.speciesId === "purple-worm")?.guardianMonsterId).toBe("purple-worm");
    expect(eggProfiles.find((profile) => profile.speciesId === "purple-worm")?.speciesName).toBe("Purple Worm");
  });
});
