import { describe, expect, it } from "vitest";
import { AdventureGenerator, EGG_GUARDIANS_BY_BIOME, GOAL_TEMPLATES } from "./AdventureGenerator";
import type { GoalKind } from "./Adventure";
import { isPlebName } from "../../data/names";

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

  it("uses the database-backed name pool for generated companions", () => {
    const generatedNames: string[] = [];
    for (let seed = 1; seed <= 24; seed += 1) {
      const adventure = new AdventureGenerator(seed).generateAdventure(1, ["thief"]);
      for (const site of adventure.sites) {
        if (site.goal.kind === "rescue-companion" && site.goal.rescueHeroName) {
          generatedNames.push(site.goal.rescueHeroName);
        }
      }
    }

    expect(generatedNames.length).toBeGreaterThan(0);
    expect(generatedNames.every((name) => isPlebName(name))).toBe(true);
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

  describe("Natural Language Prompt Parsing", () => {
    it("parses rescue prompt 'rescue the thief <name> from the small rimesea caves'", () => {
      const generator = new AdventureGenerator(42);
      const site = generator.parseSiteFromPrompt("rescue the thief <name> from the small rimesea caves");

      expect(site.sizeCategory).toBe("small");
      // 5 beat rooms, no filler rooms on small sites.
      expect(site.roomCount).toBe(5);
      expect(site.biome).toBe("midnight-sun");
      expect(site.goal.kind).toBe("rescue-companion");
      expect(site.goal.rescueClass).toBe("thief");
      expect(site.goal.target).toBe("Lyra the THIEF");
    });

    it("parses rescue prompt with explicit hero name 'rescue the thief Lyra from the small rimesea caves'", () => {
      const generator = new AdventureGenerator(42);
      const site = generator.parseSiteFromPrompt("rescue the thief Lyra from the small rimesea caves");

      expect(site.sizeCategory).toBe("small");
      expect(site.biome).toBe("midnight-sun");
      expect(site.goal.kind).toBe("rescue-companion");
      expect(site.goal.rescueClass).toBe("thief");
      expect(site.goal.target).toBe("Lyra the THIEF");
    });

    it("parses egg prompt with typo 'gather the dargon eggs from the medium hazardous approach'", () => {
      const generator = new AdventureGenerator(42);
      const site = generator.parseSiteFromPrompt("gather the dargon eggs from the medium hazardous approach");

      expect(site.sizeCategory).toBe("medium");
      // 5 beat rooms plus 0-2 filler rooms on medium sites.
      expect(site.roomCount).toBeGreaterThanOrEqual(5);
      expect(site.roomCount).toBeLessThanOrEqual(7);
      expect(site.biome).toBe("red-sands");
      expect(site.goal.kind).toBe("monster-eggs");
      expect(site.goal.target).toContain("Dragon eggs");
      expect(site.goal.eggSpeciesName).toContain("Dragon");
    });

    it("generates a multi-site adventure from a composite prompt string", () => {
      const generator = new AdventureGenerator(42);
      const prompt = "rescue the thief Lyra from the small rimesea caves or gather the dargon eggs from the medium hazardous approach";
      const adventure = generator.generateFromPrompt(prompt);

      expect(adventure.sites.length).toBe(2);

      const site1 = adventure.sites[0]!;
      expect(site1.sizeCategory).toBe("small");
      expect(site1.biome).toBe("midnight-sun");
      expect(site1.goal.kind).toBe("rescue-companion");

      const site2 = adventure.sites[1]!;
      expect(site2.sizeCategory).toBe("medium");
      expect(site2.biome).toBe("red-sands");
      expect(site2.goal.kind).toBe("monster-eggs");
    });
  });
});
