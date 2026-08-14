import { describe, expect, it } from "vitest";
import { Character, xpToNextLevel, awardXp, canLevelUp, levelUp } from "./index";
import { Dice } from "./dice";
import { TableRegistry } from "./tables";
import { applyTalentChoice } from "./talents";

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
  it("uses the published XP schedule by destination level", () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(xpToNextLevel)).toEqual([
      10, 20, 20, 20, 20, 20, 30, 30, 30, 0,
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

  it("does not carry excess XP through a level-up", () => {
    const character = hero();
    const tables = new TableRegistry();
    tables.register({
      id: "fighter-talent-excess",
      name: "Fighter Talent",
      dice: "2d6",
      entries: [{ min: 2, max: 12, text: "A talent" }],
    });

    awardXp(character, 25);
    levelUp(new Dice(7), tables, character, "1d6", "fighter-talent-excess");

    expect(character.level).toBe(2);
    expect(character.xp).toBe(0);
  });

  it("only rolls talents on the source advancement levels and defers choices", () => {
    const character = hero();
    const tables = new TableRegistry();
    tables.register({
      id: "fighter-talents-schedule",
      name: "Fighter Talents",
      dice: "2d6",
      entries: [{
        min: 2,
        max: 12,
        text: "+2 to Strength or Dexterity",
        effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX"], bonus: 2 }],
      }],
    });

    awardXp(character, 10);
    const levelTwo = levelUp(new Dice(11), tables, character, "1d6", "fighter-talents-schedule");
    expect(levelTwo.talent).toBeNull();
    expect(levelTwo.pendingChoices).toHaveLength(0);

    awardXp(character, 20);
    const levelThree = levelUp(new Dice(12), tables, character, "1d6", "fighter-talents-schedule");
    expect(levelThree.talent).not.toBeNull();
    expect(levelThree.pendingChoices).toHaveLength(1);
    expect(character.stats.STR).toBe(14);
    applyTalentChoice(character, levelThree.pendingChoices[0]!, "DEX");
    expect(character.stats.DEX).toBe(14);
  });
});
