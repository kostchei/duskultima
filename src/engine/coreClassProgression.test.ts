import { describe, expect, it } from "vitest";
import { createCharacter, registerTables } from "../data";
import { classDef } from "../data/classes";
import { Character, Engine } from "./index";
import { activateStillHeart, initializeClassState, monkFistMagicBonus, namedBladeMagicBonus, useSunOnWater } from "./classAbilities";

const stats = { STR: 14, DEX: 14, CON: 12, INT: 12, WIS: 14, CHA: 14 } as const;

describe("source class progression", () => {
  it("implements Monk defense, fist scaling, Still the Heart, and Sun on the Water", () => {
    const monk = new Character({ id: "monk", name: "Monk", className: "monk", stats, maxHp: 9 });
    monk.addEffect(classDef("monk").features[0]!);
    initializeClassState(monk);
    expect(monk.ac).toBe(14); // 10 + DEX 2 + positive WIS 2
    expect(monkFistMagicBonus(monk)).toBe(0);
    monk.level = 4;
    expect(monkFistMagicBonus(monk)).toBe(2);
    expect(activateStillHeart(monk)).toBe(4);
    expect(monk.effects.some((effect) => effect.id === "class:monk:still-heart")).toBe(true);
    expect(useSunOnWater(monk)).toBe(0);
  });

  it("uses the Necromancer d6 hit/death progression and source spell list", () => {
    const engine = new Engine({ seed: 2 });
    registerTables(engine);
    const necromancer = createCharacter(engine, "necro", "Necro", "necromancer", "human", "chaos", undefined, "unearthed-arcana", stats);
    expect(classDef("necromancer").hitDie).toBe("1d6");
    expect(necromancer.knownSpells.map((spell) => spell.spellId)).toEqual(["wither-mark", "undeath"]);
    engine.dice.roll = (expression: string) => expression === "1d6" ? 6 : 1;
    engine.damageCharacter(necromancer, necromancer.hp);
    expect(necromancer.dying?.roundsRemaining).toBe(7); // d6 6 + CON modifier 1
  });

  it("starts Paladins in source armor and scales Named Blade magic", () => {
    const engine = new Engine({ seed: 3 });
    registerTables(engine);
    const paladin = createCharacter(engine, "paladin", "Paladin", "paladin", "human", "law", undefined, "unearthed-arcana", stats, "longsword");
    expect(classDef("paladin").hitDie).toBe("1d8");
    expect(paladin.wornArmor?.id).toBe("plate-mail");
    expect(paladin.carriedShield).not.toBeNull();
    paladin.level = 8;
    expect(namedBladeMagicBonus(paladin)).toBe(3);
  });

  it("gives Warlocks a patron boon at level 1 and another at every even level", () => {
    const engine = new Engine({ seed: 4 });
    registerTables(engine);
    const warlock = createCharacter(engine, "warlock", "Warlock", "warlock", "human", "law", undefined, "unearthed-arcana", stats);
    expect(warlock.classState.warlockPatron).toBe("freya");
    expect(warlock.classState.patronBoons).toBe(1);
    warlock.xp = 10;
    engine.levelUp(warlock, classDef("warlock").hitDie, classDef("warlock").talentTableId);
    expect(warlock.level).toBe(2);
    expect(warlock.classState.patronBoons).toBe(2);
  });
});
