import { describe, expect, it } from "vitest";
import { treasureItemXp, treasureQualityXp } from "./treasureXp";
import { item } from "../data/items";

describe("Shadowdark treasure XP", () => {
  it("maps treasure quality to the published XP awards", () => {
    expect(treasureQualityXp("poor")).toBe(0);
    expect(treasureQualityXp("normal")).toBe(2);
    expect(treasureQualityXp("fabulous")).toBe(3);
    expect(treasureQualityXp("legendary")).toBe(4);
  });

  it("does not turn ordinary gear prices into XP", () => {
    expect(treasureItemXp(item("longsword"))).toBe(0);
    expect(treasureItemXp(item("coins"))).toBe(2);
    expect(treasureItemXp(item("crown-of-the-deep"))).toBe(4);
  });
});
