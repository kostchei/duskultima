import { describe, expect, it } from "vitest";
import { encounterTreasureTableId, treasureItemXp, treasureQualityXp } from "../src/engine";
import { item } from "../src/data";

describe("treasure-find XP", () => {
  it("uses Shadowdark's four treasure qualities", () => {
    expect(treasureQualityXp("poor")).toBe(0);
    expect(treasureQualityXp("normal")).toBe(1);
    expect(treasureQualityXp("fabulous")).toBe(3);
    expect(treasureQualityXp("legendary")).toBe(10);
  });

  it("rates the find once, not once per coin, gem, or item in the stack", () => {
    expect(treasureItemXp(item("coins"))).toBe(1);
    expect(treasureItemXp(item("gem"))).toBe(1);
    expect(treasureItemXp(item("potion-invisibility"))).toBe(1);
    expect(treasureItemXp(item("jeweled-idol"))).toBe(3);
    expect(treasureItemXp(item("longsword"))).toBe(0);
  });

  it("selects the encounter's level-banded core treasure table", () => {
    expect(encounterTreasureTableId(2)).toBe("treasure-0-3");
    expect(encounterTreasureTableId(4)).toBe("treasure-4-6");
    expect(encounterTreasureTableId(8)).toBe("treasure-7-9");
    expect(encounterTreasureTableId(10)).toBe("treasure-10-plus");
  });
});
