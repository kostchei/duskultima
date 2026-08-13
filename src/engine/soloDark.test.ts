import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Dice } from "./dice";
import { awardNaturalTwentyLuck, ChaosInitiative, groupInitiative, oracleCheck, prompt } from "./soloDark";

function character(id: string, dex = 10): Character {
  return new Character({
    id,
    name: id,
    className: "fighter",
    stats: { STR: 10, DEX: dex, CON: 10, INT: 10, WIS: 10, CHA: 10 },
    maxHp: 8,
  });
}

describe("SoloDark rules", () => {
  it("keeps oracle answers in the source table and rejects blank questions", () => {
    const result = oracleCheck(new Dice(7), "Are there orcs?", "even");
    expect(["yes", "no"]).toContain(result.outcome);
    expect(() => oracleCheck(new Dice(7), "   ")).toThrow();
  });

  it("always produces a prompt in the 1-100 table", () => {
    const result = prompt(new Dice(7));
    expect(result.roll).toBeGreaterThanOrEqual(1);
    expect(result.roll).toBeLessThanOrEqual(100);
    expect(result.text).toBe(`${result.verb} ${result.noun}`);
  });

  it("resolves group initiative to one side and exposes representatives", () => {
    const result = groupInitiative(new Dice(11), [character("hero", 14)], [character("goblin", 8)]);
    expect(["party", "enemies"]).toContain(result.first);
    expect(result.party.representativeId).toBe("hero");
    expect(result.enemies.representativeId).toBe("goblin");
  });

  it("awards natural-20 luck up to the number of PCs", () => {
    const hero = character("hero");
    hero.spendLuckToken();
    expect(awardNaturalTwentyLuck(hero, 20, 2)).toBe(true);
    expect(awardNaturalTwentyLuck(hero, 20, 2)).toBe(true);
    expect(awardNaturalTwentyLuck(hero, 20, 2)).toBe(false);
    expect(hero.luckTokens).toBe(2);
    expect(awardNaturalTwentyLuck(hero, 19, 2)).toBe(false);
  });

  it("rerolls group initiative through the explicit chaos-mode API", () => {
    const chaos = new ChaosInitiative([character("hero")], [character("goblin")]);
    expect(chaos.rollRound(new Dice(5)).party.group).toBe("party");
  });
});
