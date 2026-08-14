import { describe, expect, it } from "vitest";
import { Character, xpToNextLevel, awardXp, canLevelUp, levelUp } from "./index";
import { Dice } from "./dice";
import { TableRegistry } from "./tables";

function hero(): Character {
  return new Character({
    id: "xp-hero",
    name: "XP Hero",
    className: "fighter",
    stats: { STR: 14, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 10 },
    maxHp: 8,
  });
}

describe("Shadowdark advancement XP", () => {
  it("uses the published per-level requirements: level x 10", () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(xpToNextLevel)).toEqual([
      10, 20, 30, 40, 50, 60, 70, 80, 90, 0,
    ]);
  });

  it("resets XP to zero instead of carrying excess into the new level", () => {
    const character = hero();
    const tables = new TableRegistry();
    tables.register({
      id: "fighter-talent",
      name: "Fighter Talent",
      dice: "2d6",
      entries: [{ min: 2, max: 12, text: "A talent" }],
    });

    awardXp(character, 15);
    expect(canLevelUp(character)).toBe(true);
    levelUp(new Dice(7), tables, character, "1d6", "fighter-talent");

    expect(character.level).toBe(2);
    expect(character.xp).toBe(0);
    expect(xpToNextLevel(character.level)).toBe(20);
  });
});
