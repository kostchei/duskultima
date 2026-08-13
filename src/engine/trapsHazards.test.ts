import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Dice } from "./dice";
import { applyCondition, hasCondition } from "./conditions";
import { fallingDamage, hazardById, searchSpecificArea, trapById, triggerTrap } from "./trapsHazards";

function hero(): Character {
  return new Character({ id: "hero", name: "Hero", className: "thief", stats: { STR: 10, DEX: 15, CON: 10, INT: 10, WIS: 10, CHA: 10 }, maxHp: 8 });
}

describe("Shadowdark traps and hazards", () => {
  it("exposes the complete d12 trap and hazard catalogs", () => {
    expect(trapById(12).name).toBe("Cursed Statue");
    expect(hazardById("movement", 8).name).toBe("Rushing water");
    expect(hazardById("damage", 4).name).toBe("Lava");
    expect(hazardById("weaken", 7).name).toBe("Magical silence");
  });

  it("finds traps on a specific search and avoids disabled traps automatically", () => {
    const char = hero();
    const trap = trapById(1);
    const state = searchSpecificArea({ found: false, disabled: false }, "the loose flagstone", trap);
    expect(state.found).toBe(true);
    const result = triggerTrap(new Dice(4), char, trap, { found: true, disabled: true });
    expect(result.avoided).toBe(true);
    expect(result.damage).toBe(0);
  });

  it("uses shared conditions for triggered effects", () => {
    const char = hero();
    const trap = trapById(3);
    const result = triggerTrap(new Dice(1), char, trap, { found: true, disabled: false });
    expect(result.damage).toBeGreaterThanOrEqual(0);
    if (result.conditionApplied) expect(hasCondition(char, result.conditionApplied)).toBe(true);
  });

  it("keeps the first four platformer fall tiles safe", () => {
    expect(fallingDamage(new Dice(3), 4)).toBe(0);
    expect(fallingDamage(new Dice(3), 5)).toBeGreaterThanOrEqual(1);
    const char = hero();
    applyCondition(char, "blinded", { unit: "rounds", remaining: 1 });
    expect(hasCondition(char, "blinded")).toBe(true);
  });
});
