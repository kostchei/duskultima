import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Dice } from "./dice";
import { consumeDailyRations, forage, navigate, pushedTravel, travelWatch } from "./hexcrawl";

function hero(): Character {
  return new Character({
    id: "hero", name: "Hero", className: "ranger",
    stats: { STR: 10, DEX: 10, CON: 10, INT: 15, WIS: 10, CHA: 10 }, maxHp: 8,
  });
}

describe("hexcrawl travel", () => {
  it("uses the source terrain cadence", () => {
    expect(travelWatch(new Dice(1), { terrain: "easy" }).hexCleared).toBe(true);
    expect(travelWatch(new Dice(1), { terrain: "hard" }).hexCleared).toBe(false);
    expect(() => travelWatch(new Dice(1), { terrain: "impassable" })).toThrow();
  });

  it("checks navigation only when terrain or weather can lose the party", () => {
    expect(navigate(new Dice(1), "easy", "fair").checked).toBe(false);
    expect(navigate(new Dice(1), "moderate", "fair").checked).toBe(true);
    expect(navigate(new Dice(1), "easy", "bad").checked).toBe(true);
  });

  it("models pushing, food pressure, and one encounter check per watch", () => {
    expect(pushedTravel("walking").hexes).toBe(6);
    expect(consumeDailyRations(1, 2)).toEqual({ consumed: 1, missing: 1, starving: true });
    const result = travelWatch(new Dice(9), { terrain: "easy", pushed: true });
    expect(result.encounterRoll).toBeGreaterThanOrEqual(1);
    expect(result.encounterRoll).toBeLessThanOrEqual(6);
    expect(result.pushed).toBe(true);
  });

  it("allows an INT-trained forager to be resolved by the shared check service", () => {
    const partyMember = hero();
    partyMember.trainSkill("foraging");
    const result = forage(new Dice(9), partyMember);
    expect(result.check?.dc).toBe(12);
    expect(result.rationsFound).toBe(result.success ? 1 : 0);
  });
});
