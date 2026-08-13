import { describe, expect, it, vi } from "vitest";
import {
  ANCESTRIES,
  Character,
  Dice,
  Engine,
  resolveCheck,
  resolveClimbing,
  resolveContestedCheck,
  resolveSwimming,
  type Advantage,
  type Ancestry,
  type D20Result,
} from "../src/engine";
import { createCharacter, item, registerTables, spell } from "../src/data";

const STATS = { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 } as const;

function character(id: string, ancestry: Ancestry = "human", className: "fighter" | "thief" = "fighter"): Character {
  return new Character({ id, name: id, className, ancestry, stats: STATS, maxHp: 8 });
}

class ScriptedDice extends Dice {
  constructor(
    private readonly d20s: number[],
    private readonly damage: number[] = [],
  ) {
    super(1);
  }

  override d20(mode: Advantage = "normal"): D20Result {
    const count = mode === "normal" ? 1 : 2;
    const rolls = this.d20s.splice(0, count);
    if (rolls.length !== count) throw new Error("Scripted d20 exhausted");
    const natural = mode === "advantage" ? Math.max(...rolls) : mode === "disadvantage" ? Math.min(...rolls) : rolls[0]!;
    return { natural, rolls, mode };
  }

  override roll(expr: string): number {
    if (expr === "1d6" && this.damage.length > 0) return this.damage.shift()!;
    return super.roll(expr);
  }
}

describe("ancestry traits", () => {
  it("offers every implemented ancestry", () => {
    expect(ANCESTRIES).toEqual(["human", "dwarf", "elf", "half-orc", "gnome", "tiefling-deva"]);
  });

  it("dwarves take the better of two level-up HP rolls", () => {
    const engine = new Engine({ seed: 7 });
    registerTables(engine);
    const dwarf = createCharacter(engine, "d", "Dwarf", "fighter", "dwarf");
    engine.awardXp(dwarf, 10);
    const original = engine.dice.roll.bind(engine.dice);
    const hp = [2, 7];
    vi.spyOn(engine.dice, "roll").mockImplementation((expr) =>
      expr === "1d8" && hp.length > 0 ? hp.shift()! : original(expr)
    );
    expect(engine.levelUp(dwarf, "1d8", "fighter-talents").hpRolled).toBe(7);
  });

  it("elves have spell-check advantage", () => {
    const engine = new Engine({ seed: 11 });
    registerTables(engine);
    const elf = createCharacter(engine, "e", "Elf", "wizard", "elf");
    expect(engine.cast(elf, spell(elf.knownSpells[0]!.spellId)).check.mode).toBe("advantage");
  });

  it("half-orcs add one melee damage but not ranged damage", () => {
    const human = character("human");
    const halfOrc = character("orc", "half-orc");
    const attack = (attacker: Character, weaponId: "dagger" | "shortbow") => {
      const engine = new Engine({ seed: 99 });
      vi.spyOn(engine.dice, "d20").mockReturnValue({ natural: 10, rolls: [10], mode: "normal" });
      vi.spyOn(engine.dice, "roll").mockReturnValue(3);
      return engine.attack({
        attacker,
        targetAc: 1,
        damage: weaponId === "dagger" ? "1d4" : "1d6",
        weapon: item(weaponId),
      });
    };
    const humanMelee = attack(human, "dagger");
    const orcMelee = attack(halfOrc, "dagger");
    expect(orcMelee.damage).toBe(humanMelee.damage + 1);

    const humanRanged = attack(human, "shortbow");
    const orcRanged = attack(halfOrc, "shortbow");
    expect(orcRanged.damage).toBe(humanRanged.damage);
  });
});

describe("training and contested checks", () => {
  it("auto-succeeds at a trained routine task but rolls under pressure and dire stakes", () => {
    const climber = character("trained");
    climber.trainSkill("climbing");
    const automatic = resolveCheck(new ScriptedDice([]), {
      actor: climber, stat: "DEX", dc: 15, kind: "stat", task: "climbing",
    });
    expect(automatic).toMatchObject({ success: true, automatic: true, total: 15, rolls: [] });

    const pressured = resolveCheck(new ScriptedDice([7]), {
      actor: climber,
      stat: "DEX",
      dc: 15,
      kind: "stat",
      task: "climbing",
      hasTimePressure: true,
      hasDireConsequences: true,
    });
    expect(pressured).toMatchObject({ success: false, automatic: false, natural: 7 });
  });

  it("rerolls tied contested checks", () => {
    const a = character("a");
    const b = character("b");
    const result = resolveContestedCheck(
      new ScriptedDice([10, 10, 16, 5]),
      { actor: a, stat: "STR" },
      { actor: b, stat: "STR" },
    );
    expect(result.winner).toBe(a);
    expect(result.rounds).toBe(2);
  });
});

describe("climbing and swimming rules", () => {
  it("lets trained thieves auto-climb routinely and use advantage under pressure", () => {
    const thief = character("thief", "human", "thief");
    thief.trainSkill("climbing");
    expect(resolveClimbing(new ScriptedDice([]), thief).check.automatic).toBe(true);
    const pressured = resolveClimbing(new ScriptedDice([4, 17]), thief, {
      hasTimePressure: true,
      hasDireConsequences: true,
    });
    expect(pressured.check.mode).toBe("advantage");
    expect(pressured.success).toBe(true);
  });

  it("makes plate unable to swim and applies suffocation after safe CON rounds", () => {
    const fighter = character("plate");
    fighter.wornArmor = item("plate-mail");
    const result = resolveSwimming(new ScriptedDice([1], [4]), fighter, 2, false);
    expect(result).toMatchObject({
      safe: false,
      canProgress: false,
      drowning: true,
      damage: 4,
    });
  });

  it("applies chainmail disadvantage in rough water", () => {
    const fighter = character("chain");
    fighter.wornArmor = item("chainmail");
    const result = resolveSwimming(new ScriptedDice([18, 4]), fighter, 1, true);
    expect(result.swimCheck).toMatchObject({ mode: "disadvantage", natural: 4, success: false });
    expect(result.canProgress).toBe(false);
  });
});
