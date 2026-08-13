import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { resolveCheck } from "./check";
import { Dice } from "./dice";
import { rerollFailedCheck } from "./luck";

function hero(): Character {
  const c = new Character({ id: "hero", name: "Hero", className: "fighter", stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, maxHp: 8 });
  return c;
}

describe("gameplay luck", () => {
  it("spends one token only for a failed gameplay check", () => {
    const character = hero();
    const input = { actor: character, stat: "STR" as const, dc: 20, kind: "stat" as const, hasTimePressure: true, hasDireConsequences: true };
    const original = resolveCheck(new Dice(1), input);
    const result = rerollFailedCheck(new Dice(2), input, { ...original, success: false });
    expect(result.spent).toBe(true);
    expect(character.luckTokens).toBe(0);
  });

  it("does not spend luck on an out-of-gameplay result", () => {
    const character = hero();
    const input = { actor: character, stat: "STR" as const, dc: 20, kind: "stat" as const };
    const original = { ...resolveCheck(new Dice(1), input), success: false };
    const result = rerollFailedCheck(new Dice(2), input, original, { gameplayRoll: false });
    expect(result.spent).toBe(false);
    expect(character.luckTokens).toBe(1);
  });
});
