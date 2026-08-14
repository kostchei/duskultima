import { describe, expect, it } from "vitest";
import { Dice } from "../engine";
import {
  bestTreasureQuality,
  rollFabledItem,
  rollGemstoneFind,
  rollLuxuryItem,
  rollTreasureCache,
} from "./treasureGeneration";

describe("treasure generation", () => {
  it("rolls fabled items from magical treasure with at least one benefit", () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const found = rollFabledItem(new Dice(seed));
      expect(found.def.tags).toContain("magic");
      expect(["fabulous", "legendary"]).toContain(found.quality);
      expect(found.def.benefits?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("rolls a cache containing two to five independent finds", () => {
    const cache = rollTreasureCache(new Dice(42), 1);
    expect(cache.length).toBeGreaterThanOrEqual(2);
    expect(cache.length).toBeLessThanOrEqual(5);
    expect(cache.every((finding) => finding.qty >= 1 && finding.def.name.length > 0)).toBe(true);
    expect(bestTreasureQuality([{ quality: "normal" }, { quality: "legendary" }])).toBe("legendary");
  });

  it("draws cache finds from core, gemstone, and luxury source families", () => {
    const kinds = new Set<string>();
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const finding of rollTreasureCache(new Dice(seed), 1)) kinds.add(finding.kind ?? "unknown");
    }
    expect(kinds).toEqual(new Set(["core", "gemstone", "luxury"]));
  });

  it("does not require a cache to contain magic", () => {
    const mundaneOnlyCache = Array.from({ length: 100 }, (_, index) => rollTreasureCache(new Dice(index + 1), 1))
      .find((cache) => !cache.some((finding) => finding.def.tags.includes("magic")));
    expect(mundaneOnlyCache).toBeDefined();
  });

  it("rolls the page 222 gemstone values and applies giant gem x2", () => {
    const normal = rollGemstoneFind(new Dice(11));
    const giant = rollGemstoneFind(new Dice(11), true);
    expect(normal.def.tags).toContain("gem");
    expect([40, 120, 200, 280, 360]).toContain(normal.def.valueGp);
    expect(giant.def.name).toMatch(/^Giant /);
    expect(giant.def.valueGp).toBe((normal.def.valueGp ?? 0) * 2);
  });

  it("rolls luxury items in two stages instead of summing 2d20", () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const found = rollLuxuryItem(new Dice(seed));
      expect(found.kind).toBe("luxury");
      expect(found.roll).toBeGreaterThanOrEqual(1);
      expect(found.roll).toBeLessThanOrEqual(20);
      expect(found.secondaryRoll).toBeGreaterThanOrEqual(1);
      expect(found.secondaryRoll).toBeLessThanOrEqual(4);
      expect(found.def.tags).toContain("luxury");
      expect(found.def.description).toContain("page 223");
    }
  });
});
