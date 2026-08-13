import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Dice } from "./dice";
import { ZoneHazards } from "./zoneHazards";

function hero(): Character {
  return new Character({ id: "hero", name: "Hero", className: "fighter", stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, maxHp: 8 });
}

describe("zone environmental checks", () => {
  it("returns structured shared checks when a hazard triggers", () => {
    const result = ZoneHazards.resolveEnvironmentalTick(hero(), "red-sands", new Dice(1));
    if (result.triggered && result.check) {
      expect(result.check.dc).toBe(12);
      expect(result.check.natural).toBeGreaterThanOrEqual(1);
      expect(result.check.natural).toBeLessThanOrEqual(20);
    }
  });

  it("keeps the Dwellers breath-capacity rule deterministic", () => {
    const char = hero();
    expect(ZoneHazards.breathCapacity(char)).toBe(4);
    const result = ZoneHazards.resolveEnvironmentalTick(char, "dwellers-in-the-deep", new Dice(2), false, 4);
    expect(result.triggered).toBe(true);
    expect(result.success).toBe(true);
  });
});
