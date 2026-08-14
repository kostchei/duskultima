import { describe, expect, it } from "vitest";
import { Character } from "../engine/character";
import { advanceKnownSpells } from "./index";

function caster(className: "wizard" | "cleric"): Character {
  return new Character({
    id: `${className}-progression`,
    name: className,
    className,
    stats: { STR: 10, DEX: 10, CON: 10, INT: 16, WIS: 16, CHA: 10 },
    maxHp: 4,
  });
}

describe("class spell progression", () => {
  it("adds the fourth wizard spell at level 2", () => {
    const character = caster("wizard");
    character.learnSpell("magic-missile");
    character.learnSpell("mage-armor");
    character.learnSpell("burning-hands");
    character.level = 2;

    expect(advanceKnownSpells(character)).toHaveLength(1);
    expect(character.knownSpells).toHaveLength(4);
  });

  it("adds a tier-2 cleric spell when the level-3 progression opens one", () => {
    const character = caster("cleric");
    character.learnSpell("cure-wounds");
    character.learnSpell("turn-undead");
    character.learnSpell("light");
    character.level = 3;

    expect(advanceKnownSpells(character)).toContain("bless");
  });
});
