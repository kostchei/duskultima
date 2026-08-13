import { describe, expect, it } from "vitest";
import { Dice } from "../engine";
import { bestTreasureQuality, rollFabledItem, rollTreasureCache } from "./treasureGeneration";

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

  it("does not require a cache to contain magic", () => {
    const cache = rollTreasureCache(new Dice(7), 1);
    expect(cache.some((finding) => finding.def.tags.includes("magic"))).toBe(false);
  });
});
