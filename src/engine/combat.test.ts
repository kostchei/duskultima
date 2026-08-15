import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Engine } from "./index";
import { monsterAttackRoll } from "./monster";
import { groupInitiative } from "./soloDark";
import { item } from "../data/items";

function fighter(): Character {
  const character = new Character({
    id: "fighter",
    name: "Fighter",
    className: "fighter",
    stats: { STR: 16, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 10 },
    maxHp: 10,
  });
  const sword = item("longsword");
  character.equipWeapon(sword);
  return character;
}

function thief(): Character {
  const character = new Character({
    id: "thief",
    name: "Thief",
    className: "thief",
    stats: { STR: 10, DEX: 16, CON: 10, INT: 10, WIS: 10, CHA: 10 },
    maxHp: 4,
  });
  character.level = 3;
  character.equipWeapon(item("shortsword"));
  return character;
}

describe("Shadowdark combat resolution", () => {
  it("uses the equipped weapon, applies the attack stat, and doubles dice on a critical", () => {
    const engine = new Engine({ seed: 1 });
    engine.dice.d20 = () => ({ natural: 20, rolls: [20], mode: "normal" });
    engine.dice.roll = () => 5;

    const result = engine.attack({
      attacker: fighter(),
      targetAc: 18,
      damage: "1d8",
      weapon: item("longsword"),
    });

    expect(result.check.crit).toBe(true);
    expect(result.damage).toBe(10); // 5 + 5 critical weapon dice; STR applies to-hit only
  });

  it("treats a natural 1 as an automatic miss", () => {
    const engine = new Engine({ seed: 1 });
    engine.dice.d20 = () => ({ natural: 1, rolls: [1], mode: "normal" });
    engine.dice.roll = () => 8;

    const result = engine.attack({
      attacker: fighter(),
      targetAc: 1,
      damage: "1d8",
      weapon: item("longsword"),
    });

    expect(result.check.fumble).toBe(true);
    expect(result.check.success).toBe(false);
    expect(result.damage).toBe(0);
  });

  it("adds the source Backstab weapon dice only against an unaware target", () => {
    const engine = new Engine({ seed: 1 });
    engine.dice.d20 = () => ({ natural: 20, rolls: [20], mode: "normal" });
    engine.dice.roll = () => 4;

    const backstab = engine.attack({
      attacker: thief(),
      targetAc: 1,
      damage: "1d6",
      weapon: item("shortsword"),
      targetUnaware: true,
    });
    const ordinary = engine.attack({
      attacker: thief(),
      targetAc: 1,
      damage: "1d6",
      weapon: item("shortsword"),
      targetUnaware: false,
    });

    expect(backstab.damage).toBe(24); // 4 x 6 dice; crit doubles the Backstab dice too
    expect(ordinary.damage).toBe(8); // 4 x 2 dice; DEX applies to-hit only
  });

  it("resolves monster attack bonus, weapon damage, and critical damage dice", () => {
    const dice = new (class {
      d20() { return { natural: 20, rolls: [20], mode: "normal" as const }; }
      roll() { return 4; }
    })();

    const result = monsterAttackRoll(dice as never, { attackBonus: 3, damage: "1d6" }, 25);

    expect(result.hit).toBe(true);
    expect(result.crit).toBe(true);
    expect(result.total).toBe(23);
    expect(result.damage).toBe(8);
  });

  it("performs one group initiative roll at encounter start without rerolling a round", () => {
    const engine = new Engine({ seed: 1 });
    let rolls = 0;
    engine.dice.d20 = () => {
      rolls++;
      return { natural: 12, rolls: [12], mode: "normal" };
    };
    const result = groupInitiative(
      engine.dice,
      [fighter()],
      [{ id: "goblin", mod: () => 0 }],
    );

    expect(result.first).toBe("party");
    expect(rolls).toBe(2);
  });

  it("re-grips a versatile Seawolf weapon so a starting shield can be readied", () => {
    const character = new Character({
      id: "seawolf",
      name: "Seawolf",
      className: "seawolf",
      stats: { STR: 16, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 10,
    });
    character.equipWeapon(item("greataxe"));
    character.equipShield(item("round-shield"));

    expect(character.shieldStowed).toBe(true);
    character.setWeaponWieldMode("1h");

    expect(character.shieldStowed).toBe(false);
    expect(character.ac).toBe(13);
    expect(character.effectiveWeaponDamage).toBe("1d8");
  });
});
