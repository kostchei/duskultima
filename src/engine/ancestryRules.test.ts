import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Dice } from "./dice";
import { canBeSurprised, halfOrcMeleeBonus, humanTalentRolls, rollHitDieGain } from "./ancestryRules";
import { validatePatronSelection, warlockPatronOptions } from "./patrons";

function hero(ancestry: "human" | "dwarf" | "elf" | "half-orc" | "gnome" | "tiefling-deva", alignment: "law" | "neutral" | "chaos" = "neutral"): Character {
  return new Character({ id: ancestry, name: ancestry, className: "fighter", ancestry, alignment, stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, maxHp: 8 });
}

describe("ancestry and patron rules", () => {
  it("implements the six project ancestry features", () => {
    expect(canBeSurprised(hero("gnome"))).toBe(false);
    expect(canBeSurprised(hero("human"))).toBe(true);
    expect(humanTalentRolls("human")).toBe(2);
    expect(halfOrcMeleeBonus("half-orc", false)).toBe(1);
    expect(halfOrcMeleeBonus("half-orc", true)).toBe(0);
  });

  it("gives dwarves the Stout hit-die rule", () => {
    const normal = rollHitDieGain(new Dice(1), "1d8", "human");
    const stout = rollHitDieGain(new Dice(1), "1d8", "dwarf");
    expect(stout).toBeGreaterThanOrEqual(normal);
  });

  it("limits patrons to the matching lawful or chaotic alignment", () => {
    expect(warlockPatronOptions("law").map((p) => p.id)).toEqual(["freya"]);
    expect(validatePatronSelection("freya", { alignment: "law", className: "warlock" }).name).toBe("Freya");
    expect(validatePatronSelection("shune-the-vile", { alignment: "chaos", ancestry: "tiefling-deva" }).name).toBe("Shune the Vile");
    expect(() => validatePatronSelection("freya", { alignment: "neutral", className: "warlock" })).toThrow();
  });
});
