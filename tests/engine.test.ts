import { describe, expect, it } from "vitest";
import {
  Character,
  DC,
  Dice,
  Engine,
  Inventory,
  WIZARD_MISHAP_TABLE_TIER_1_2,
  WIZARD_MISHAP_TABLE_TIER_3_4,
  WIZARD_MISHAP_TABLE_TIER_5,
  monsterAttackRoll,
  PRIMARY_STAT,
  resolveCheck,
  rollStats,
  statModifier,
  wizardMishapTableId,
  xpToNextLevel,
  xpToReachNextLevel,
} from "../src/engine";
import {
  createCharacter,
  highestAvailableSpellIndex,
  item,
  monster,
  registerTables,
  spell,
} from "../src/data";
import { appearanceForCharacter, characterAppearanceKey } from "../src/game/entities/appearance";
import { TREASURE_4_6 } from "../src/data/tables/treasure";

function makeEngine(seed = 42): Engine {
  const engine = new Engine({ seed });
  registerTables(engine);
  return engine;
}

describe("dice", () => {
  it("is deterministic under a seed", () => {
    const a = new Dice(7);
    const b = new Dice(7);
    for (let i = 0; i < 50; i++) expect(a.die(20)).toBe(b.die(20));
  });

  it("parses dice expressions", () => {
    const d = new Dice(1);
    const r = d.rollDetailed("2d6+3");
    expect(r.rolls).toHaveLength(2);
    expect(r.modifier).toBe(3);
    expect(r.total).toBe(r.rolls[0]! + r.rolls[1]! + 3);
  });

  it("throws on invalid expressions", () => {
    const d = new Dice(1);
    expect(() => d.roll("banana")).toThrow('Invalid dice expression: "banana"');
    expect(() => d.roll("0d6")).toThrow();
  });

  it("advantage takes the higher of two dice, disadvantage the lower", () => {
    const d = new Dice(3);
    for (let i = 0; i < 100; i++) {
      const adv = d.d20("advantage");
      expect(adv.rolls).toHaveLength(2);
      expect(adv.natural).toBe(Math.max(...adv.rolls));
      const dis = d.d20("disadvantage");
      expect(dis.natural).toBe(Math.min(...dis.rolls));
    }
  });
});

describe("stat modifiers", () => {
  it("maps scores 3..18 to -4..+4", () => {
    expect(statModifier(3)).toBe(-4);
    expect(statModifier(10)).toBe(0);
    expect(statModifier(11)).toBe(0);
    expect(statModifier(14)).toBe(2);
    expect(statModifier(18)).toBe(4);
  });

  it("throws on invalid scores", () => {
    expect(() => statModifier(0)).toThrow();
    expect(() => statModifier(21)).toThrow();
  });
});

describe("resolveCheck", () => {
  function fighter(): Character {
    return new Character({
      id: "f1",
      name: "Test Fighter",
      className: "fighter",
      stats: { STR: 16, DEX: 12, CON: 14, INT: 9, WIS: 10, CHA: 11 },
      maxHp: 10,
    });
  }

  it("nat 1 auto-fails and nat 20 auto-succeeds regardless of modifiers", () => {
    const actor = fighter();
    let sawFumble = false;
    let sawCrit = false;
    const dice = new Dice(9);
    for (let i = 0; i < 500; i++) {
      const r = resolveCheck(dice, { actor, stat: "STR", dc: 999, kind: "stat" });
      if (r.natural === 20) {
        expect(r.success).toBe(true);
        sawCrit = true;
      }
      const r2 = resolveCheck(dice, { actor, stat: "STR", dc: -999, kind: "stat" });
      if (r2.natural === 1) {
        expect(r2.success).toBe(false);
        expect(r2.fumble).toBe(true);
        sawFumble = true;
      }
    }
    expect(sawFumble).toBe(true);
    expect(sawCrit).toBe(true);
  });

  it("advantage and disadvantage cancel to a normal roll", () => {
    const actor = fighter();
    const r = resolveCheck(new Dice(1), {
      actor,
      stat: "STR",
      dc: DC.NORMAL,
      kind: "attack",
      advantage: ["above target"],
      disadvantage: ["in darkness"],
    });
    expect(r.mode).toBe("normal");
    expect(r.rolls).toHaveLength(1);
  });

  it("talent hooks add to matching checks and grant advantage", () => {
    const actor = fighter();
    actor.addEffect({
      id: "t1",
      name: "+2 attacks",
      hooks: [{ kind: "checkBonus", applies: "attack", bonus: 2 }],
    });
    actor.addEffect({
      id: "t2",
      name: "adv on attacks",
      hooks: [{ kind: "advantageOn", applies: "attack" }],
    });
    const r = resolveCheck(new Dice(5), { actor, stat: "STR", dc: DC.NORMAL, kind: "attack" });
    expect(r.modifier).toBe(3 + 2); // STR 16 => +3, talent +2
    expect(r.mode).toBe("advantage");
    const other = resolveCheck(new Dice(5), { actor, stat: "STR", dc: DC.NORMAL, kind: "stat" });
    expect(other.modifier).toBe(3);
    expect(other.mode).toBe("normal");
  });
});

describe("spellcasting state machine", () => {
  it("loses the spell on a failed check and recovers it on rest", () => {
    // Find a seed where the wizard fails (non-nat-1) a cast.
    for (let seed = 0; seed < 200; seed++) {
      const engine = makeEngine(seed);
      const wiz = createCharacter(engine, "w", "Wizard", "wizard");
      wiz.inventory.add(item("ration"), 1);
      const result = engine.cast(wiz, spell("magic-missile"));
      if (result.outcome === "fail") {
        expect(wiz.knownSpell("magic-missile").status).toBe("lost");
        expect(() => engine.cast(wiz, spell("magic-missile"))).toThrow(/lost until/);
        engine.rest(wiz, item("ration"));
        expect(wiz.knownSpell("magic-missile").status).toBe("available");
        return;
      }
    }
    throw new Error("No seed produced a plain failure in 200 tries");
  });

  it("nat 1 wizard cast rolls the mishap table", () => {
    for (let seed = 0; seed < 500; seed++) {
      const engine = makeEngine(seed);
      const wiz = createCharacter(engine, "w", "Wizard", "wizard");
      const result = engine.cast(wiz, spell("magic-missile"));
      if (result.check.natural === 1) {
        expect(result.outcome).toBe("pendingMishap");
        expect(result.mishap).toBeDefined();
        expect(wiz.knownSpell("magic-missile").status).toBe("available");
        const accepted = engine.acceptMishap(wiz, result, "known");
        expect(accepted.outcome).toBe("mishap");
        expect(wiz.knownSpell("magic-missile").status).toBe("lost");
        return;
      }
    }
    throw new Error("No seed produced a nat 1 in 500 tries");
  });

  it("uses the wizard mishap table matching the spell tier", () => {
    expect(wizardMishapTableId(1)).toBe(WIZARD_MISHAP_TABLE_TIER_1_2);
    expect(wizardMishapTableId(2)).toBe(WIZARD_MISHAP_TABLE_TIER_1_2);
    expect(wizardMishapTableId(3)).toBe(WIZARD_MISHAP_TABLE_TIER_3_4);
    expect(wizardMishapTableId(4)).toBe(WIZARD_MISHAP_TABLE_TIER_3_4);
    expect(wizardMishapTableId(5)).toBe(WIZARD_MISHAP_TABLE_TIER_5);
  });

  it("requires priest penance followed by a rest after a natural 1", () => {
    for (let seed = 0; seed < 500; seed++) {
      const engine = makeEngine(seed);
      const priest = createCharacter(engine, "p", "Priest", "priest");
      const result = engine.cast(priest, spell("cure-wounds"));
      if (result.check.natural !== 1) continue;

      const known = priest.knownSpell("cure-wounds");
      expect(result.outcome).toBe("pendingMishap");
      expect(known.status).toBe("available");
      expect(known.requiresAtonement).toBe(false);
      engine.acceptMishap(priest, result, "known");
      expect(known.status).toBe("lost");
      expect(known.requiresAtonement).toBe(true);
      engine.freeRest(priest);
      expect(known.status).toBe("lost");
      expect(engine.atone(priest)).toBe(1);
      expect(known.requiresAtonement).toBe(false);
      expect(known.status).toBe("lost");
      engine.freeRest(priest);
      expect(known.status).toBe("available");
      return;
    }
    throw new Error("No seed produced a priest nat 1 in 500 tries");
  });

  it("selects a follower caster's highest-tier available spell", () => {
    const engine = makeEngine();
    const wizard = createCharacter(engine, "w", "Wizard", "wizard");
    wizard.learnSpell("misty-step");
    wizard.learnSpell("fireball");

    expect(wizard.knownSpells[highestAvailableSpellIndex(wizard)]?.spellId).toBe("fireball");
    wizard.knownSpell("fireball").status = "lost";
    expect(wizard.knownSpells[highestAvailableSpellIndex(wizard)]?.spellId).toBe("misty-step");
    wizard.knownSpell("misty-step").requiresAtonement = true;
    expect(spell(wizard.knownSpells[highestAvailableSpellIndex(wizard)]!.spellId).tier).toBe(1);
  });

  it("priests cannot cast wizard spells and vice versa", () => {
    const engine = makeEngine();
    const priest = createCharacter(engine, "p", "Priest", "priest");
    expect(() => priest.knownSpell("magic-missile")).toThrow(/does not know/);
  });
});

describe("inventory gear slots", () => {
  it("capacity is max(STR, 10) and overflow throws", () => {
    const engine = makeEngine();
    const wiz = createCharacter(engine, "w", "Wizard", "wizard");
    expect(wiz.inventory.capacity).toBe(Math.max(wiz.stats.STR, 10));
    // Starting gear: staff + 2 torches + ration + 2 daggers = 6 slots (wizards wear no armor).
    expect(wiz.inventory.slotsUsed()).toBe(6);
    wiz.inventory.add(item("torch"), wiz.inventory.slotsFree());
    expect(() => wiz.inventory.add(item("torch"))).toThrow(/Cannot carry/);
  });

  it("coins are free (0 slots, stored in shared party purse)", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    f.inventory = new Inventory(f.inventory.capacity);
    const before = f.inventory.slotsUsed();
    f.inventory.add(item("coins"), 300);
    expect(f.inventory.slotsUsed()).toBe(before); // free
  });

  it("fighters haul extra slots equal to their CON modifier", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    const conMod = Math.max(0, statModifier(f.stats.CON));
    expect(f.inventory.capacity).toBe(Math.max(f.stats.STR, 10) + conMod);
    const t = createCharacter(engine, "t", "Thief", "thief");
    expect(t.inventory.capacity).toBe(Math.max(t.stats.STR, 10)); // no hauler
  });
});

describe("character generation", () => {
  it("rolled stat arrays always pass the heroic gate", () => {
    const dice = new Dice(11);
    for (let i = 0; i < 200; i++) {
      const stats = rollStats(dice);
      const scores = Object.values(stats);
      expect(scores.filter((s) => s >= 15).length).toBeGreaterThanOrEqual(2);
      expect(scores.filter((s) => s < 6).length).toBeLessThanOrEqual(1);
      for (const s of scores) {
        expect(s).toBeGreaterThanOrEqual(3);
        expect(s).toBeLessThanOrEqual(18);
      }
    }
  });

  it("derives level-1 HP from the hit die + CON and never below 1", () => {
    for (let seed = 0; seed < 50; seed++) {
      const engine = makeEngine(seed);
      const w = createCharacter(engine, "w", "Wizard", "wizard"); // d4 hit die
      expect(w.maxHp).toBeGreaterThanOrEqual(1);
      expect(w.maxHp).toBeLessThanOrEqual(4 + statModifier(w.stats.CON));
    }
  });

  it("maxes level-1 HP based on class hit die + CON modifier", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter"); // d8 hit die
    const expected = Math.max(1, 8 + statModifier(f.stats.CON));
    expect(f.maxHp).toBe(expected);
  });

  it("starts every character with a luck token", () => {
    const engine = makeEngine();
    expect(createCharacter(engine, "f", "Fighter", "fighter").luckToken).toBe(true);
  });
});

describe("armor and AC", () => {
  it("computes AC from armor base + capped DEX + shield", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter"); // chainmail + shield
    // Clear starting talents to test AC in isolation
    f.effects = f.effects.filter((e) => !e.id.startsWith("talent-start"));
    f.inventory.add(item("shield"), 1, true);
    f.equipShield(item("shield"));
    const dex = statModifier(f.stats.DEX);
    expect(f.ac).toBe(13 + dex + 2);
    f.shieldStowed = true;
    expect(f.ac).toBe(13 + dex);
    f.equipArmor(item("plate-mail")); // dexCap 0
    expect(f.ac).toBe(15);
  });

  it("unarmored AC is 10 + DEX", () => {
    const engine = makeEngine();
    const w = createCharacter(engine, "w", "Wizard", "wizard");
    expect(w.ac).toBe(10 + statModifier(w.stats.DEX));
  });

  it("forbidden armor throws", () => {
    const engine = makeEngine();
    const w = createCharacter(engine, "w", "Wizard", "wizard");
    expect(() => w.equipArmor(item("leather-armor"))).toThrow(/cannot wear/);
    const t = createCharacter(engine, "t", "Thief", "thief");
    expect(() => t.equipArmor(item("plate-mail"))).toThrow(/cannot wear/);
  });
});

describe("equipped appearance state", () => {
  it("equips class starting weapons as authoritative character state", () => {
    const engine = makeEngine();
    expect(createCharacter(engine, "f", "Fighter", "fighter").weapon.id).toBe("spear");
    expect(createCharacter(engine, "t", "Thief", "thief").weapon.id).toBe("shortsword");
    expect(createCharacter(engine, "p", "Priest", "priest").weapon.id).toBe("mace");
    expect(createCharacter(engine, "w", "Wizard", "wizard").weapon.id).toBe("staff");
  });

  it("changes the visual signature when equipment changes", () => {
    const f = createCharacter(makeEngine(), "f", "Fighter", "fighter");
    expect(characterAppearanceKey(appearanceForCharacter(f))).toBe("char-fighter-chain-spear-readied");
    f.equipWeapon(item("longsword"));
    f.equipArmor(item("plate-mail"));
    f.equipShield(item("shield"));
    expect(characterAppearanceKey(appearanceForCharacter(f))).toBe("char-fighter-plate-longsword-readied");
    f.shieldStowed = true;
    expect(characterAppearanceKey(appearanceForCharacter(f))).toBe("char-fighter-plate-longsword-stowed");
  });

  it("supports thief-wearable mithral without allowing mundane chain or plate", () => {
    const t = createCharacter(makeEngine(), "t", "Thief", "thief");
    t.equipArmor(item("mithral-chainmail"));
    expect(appearanceForCharacter(t).armor).toBe("mithral");
    expect(() => t.equipArmor(item("chainmail"))).toThrow(/cannot wear/);
    expect(() => t.equipArmor(item("plate-mail"))).toThrow(/cannot wear/);
  });

  it("rejects non-weapons and exposes weapon rules through the equipped item", () => {
    const f = createCharacter(makeEngine(), "f", "Fighter", "fighter");
    expect(() => f.equipWeapon(item("ration"))).toThrow(/not a weapon that can be wielded/);
    f.equipWeapon(item("longsword"));
    expect(f.weapon.damage).toBe("1d8");
    expect(f.weapon.reachTiles).toBe(1.8);
  });
});

describe("attack fidelity", () => {
  it("finesse weapons attack with DEX when it beats STR", () => {
    const engine = makeEngine();
    const t = new Character({
      id: "t",
      name: "Sneak",
      className: "thief",
      stats: { STR: 8, DEX: 16, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 6,
    });
    const r = engine.attack({ attacker: t, targetAc: 10, damage: "1d4", weapon: item("dagger") });
    expect(r.check.modifier).toBe(3); // DEX +3, not STR -1
  });

  it("ranged weapons use DEX even when STR is higher", () => {
    const engine = makeEngine();
    const archer = new Character({
      id: "archer",
      name: "Archer",
      className: "thief",
      stats: { STR: 18, DEX: 12, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 6,
    });
    const r = engine.attack({ attacker: archer, targetAc: 10, damage: "1d4", weapon: item("shortbow") });
    expect(r.check.modifier).toBe(1); // DEX +1, not STR +4
  });

  it("backstab extra dice raise the damage ceiling", () => {
    const engine = makeEngine(3);
    const t = new Character({
      id: "t",
      name: "Sneak",
      className: "thief",
      stats: { STR: 10, DEX: 16, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 6,
    });
    let sawAboveSingleDie = false;
    for (let i = 0; i < 200; i++) {
      const r = engine.attack({
        attacker: t,
        targetAc: 1,
        damage: "1d4",
        weapon: item("dagger"),
        extraDamageDice: 2,
      });
      if (r.check.success && !r.check.crit && r.damage > 4) sawAboveSingleDie = true;
    }
    expect(sawAboveSingleDie).toBe(true);
  });

  it("adds a magic weapon bonus to both attack and damage", () => {
    const engine = makeEngine(8);
    const attacker = new Character({
      id: "magic-attacker",
      name: "Magic Attacker",
      className: "fighter",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 10,
    });
    const weapon = item("blade-of-vengeance");
    for (let attempt = 0; attempt < 20; attempt++) {
      const result = engine.attack({ attacker, targetAc: 2, damage: weapon.damage!, weapon });
      if (!result.check.success || result.check.crit) continue;
      expect(result.check.modifier).toBe(2);
      expect(result.damage).toBeGreaterThanOrEqual(3);
      return;
    }
    throw new Error("No ordinary magic-weapon hit produced in 20 attempts");
  });

  it("adds generated magic armor bonuses to AC", () => {
    const wearer = new Character({
      id: "magic-wearer",
      name: "Magic Wearer",
      className: "fighter",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 10,
    });
    const armorEntry = TREASURE_4_6.entries.find((entry) => entry.min === 96)!;
    const armor = item((armorEntry.data as { itemId: string }).itemId);
    wearer.equipArmor(armor);
    expect(armor.magicBonus).toBe(2);
    expect(wearer.ac).toBe(15);
  });

  it("a lowered crit range no longer auto-hits", () => {
    const actor = new Character({
      id: "c",
      name: "Critter",
      className: "fighter",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 10,
    });
    actor.addEffect({ id: "t", name: "crit 19", hooks: [{ kind: "critRange", value: 19 }] });
    const dice = new Dice(2);
    for (let i = 0; i < 500; i++) {
      const r = resolveCheck(dice, { actor, stat: "STR", dc: 999, kind: "attack" });
      if (r.natural === 19) {
        expect(r.success).toBe(false); // hits DC 999 only on a natural 20
        expect(r.crit).toBe(false);
      }
      if (r.natural === 20) expect(r.success).toBe(true);
    }
  });

  it("fighter weapon mastery scales damage with half level", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    const base = f.damageBonus; // +1 mastery at level 1
    f.level = 4;
    expect(f.damageBonus).toBe(base + 2);
  });
});

describe("advancement", () => {
  it("levels up at level x 10 XP, rolls HP and a talent", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    expect(xpToNextLevel(1)).toBe(10);
    engine.awardXp(f, 9);
    expect(engine.canLevelUp(f)).toBe(false);
    const award = engine.awardXp(f, 1);
    expect(award.leveledUp).toBe(true);
    const before = f.maxHp;
    f.takeDamage(2);
    const result = engine.levelUp(f, "1d8", "fighter-talents");
    expect(result.newLevel).toBe(2);
    expect(f.maxHp).toBeGreaterThan(before);
    expect(f.hp).toBe(f.maxHp); // leveling heals to full
    expect(f.xp).toBe(0);
    expect(f.effects.some((e) => e.id.startsWith("talent-L2"))).toBe(true);
  });

  it("throws when leveling without enough XP", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    expect(() => engine.levelUp(f, "1d8", "fighter-talents")).toThrow(/cannot level up/);
  });

  it("reports the XP a descent must top up to reach the next level", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    // Fresh level-1 character needs the full level x 10 threshold.
    expect(xpToReachNextLevel(f)).toBe(10);
    engine.awardXp(f, 4); // partway there
    expect(xpToReachNextLevel(f)).toBe(6);
    // Topping up exactly that much makes a level-up available.
    engine.awardXp(f, xpToReachNextLevel(f));
    expect(engine.canLevelUp(f)).toBe(true);
  });

  it("needs no XP top-up at the level cap", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    f.level = 10; // MAX_LEVEL
    expect(xpToReachNextLevel(f)).toBe(0);
  });
});

describe("death timers", () => {
  it("dropping to 0 HP starts a countdown ending in death or a nat-20 self-revive", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    const wentDown = engine.damageCharacter(f, 999);
    expect(wentDown).toBe(true);
    expect(f.dying).not.toBeNull();
    expect(f.dying!.roundsRemaining).toBeGreaterThanOrEqual(1);
    engine.advance(10 * engine.config.roundMs);
    const selfRevived = !f.dead && f.dying === null && f.hp === 1;
    expect(f.dead || selfRevived).toBe(true);
  });

  it("healing clears the death timer", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    engine.damageCharacter(f, 999);
    f.heal(5);
    expect(f.dying).toBeNull();
    engine.advance(20 * engine.config.roundMs);
    expect(f.dead).toBe(false);
  });
});

describe("rest", () => {
  it("requires a ration", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    f.inventory.remove("ration", f.inventory.count("ration"));
    expect(() => engine.rest(f, item("ration"))).toThrow(/no Ration/);
  });

  it("freeRest restores HP and spells without a ration", () => {
    const engine = makeEngine();
    const w = createCharacter(engine, "w", "Wizard", "wizard");
    w.inventory.remove("ration", w.inventory.count("ration"));
    w.takeDamage(3);
    w.knownSpell("magic-missile").status = "lost";
    engine.freeRest(w);
    expect(w.hp).toBe(w.maxHp);
    expect(w.knownSpell("magic-missile").status).toBe("available");
  });
});

describe("tables", () => {
  it("throws on unknown table ids", () => {
    const engine = makeEngine();
    expect(() => engine.rollTable("no-such-table")).toThrow('Unknown table "no-such-table"');
  });

  it("2d6 talent tables cover 2..12", () => {
    const engine = makeEngine();
    for (let i = 0; i < 100; i++) {
      const r = engine.rollTable("fighter-talents");
      expect(r.roll).toBeGreaterThanOrEqual(2);
      expect(r.roll).toBeLessThanOrEqual(12);
      expect(r.entry.text.length).toBeGreaterThan(0);
    }
  });
});

describe("timers (torch semantics)", () => {
  it("real-time timers expire and support pause", () => {
    const engine = makeEngine();
    let expired = false;
    engine.clock.addTimer("torch-1", 1000, () => {
      expired = true;
    });
    engine.advance(500);
    engine.clock.setTimerPaused("torch-1", true);
    engine.advance(5000);
    expect(expired).toBe(false);
    engine.clock.setTimerPaused("torch-1", false);
    engine.advance(600);
    expect(expired).toBe(true);
    expect(engine.clock.hasTimer("torch-1")).toBe(false);
  });
});

describe("fighter class feature rules", () => {
  it("rolls 2 starting talents for Humans", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter", "human");
    // Starting features/talents effects: Weapon Mastery (1), Grit (1), plus 2 starting talent rolls = 4 total effects.
    expect(f.effects.length).toBe(4);
  });

  it("applies Grit advantage to Strength or Dexterity checks but not attacks", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    // Ensure Grit is configured on f.
    const grit = f.effects.find((e) => e.id === "feat-fighter-grit");
    expect(grit).toBeDefined();
    const hook = grit?.hooks[0];
    expect(hook?.kind).toBe("advantageOnStat");
    const stat = (hook as any).stat;

    // Resolve an ability check of the Grit stat
    const r1 = resolveCheck(new Dice(1), {
      actor: f,
      stat,
      dc: DC.NORMAL,
      kind: "stat",
    });
    expect(r1.advantageReasons).toContain("grit");
    expect(r1.mode).toBe("advantage");

    // Attack roll should NOT get Grit advantage
    const r2 = resolveCheck(new Dice(1), {
      actor: f,
      stat,
      dc: DC.NORMAL,
      kind: "attack",
    });
    expect(r2.advantageReasons).not.toContain("grit");
    expect(r2.mode).toBe("normal");
  });

  it("applies Weapon Mastery half level bonus with the mastered weapon only", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    // Clear starting talents/features to test Weapon Mastery in isolation
    f.effects = f.effects.filter((e) => e.id === "feat-fighter-weapon-mastery");
    f.level = 4; // half level = 2
    const check = (weaponId?: string) =>
      resolveCheck(new Dice(1), { actor: f, stat: "STR", dc: DC.NORMAL, kind: "attack", weaponId });

    // The fighter's mastery is bound to their starting weapon: base modifier
    // + checkBonus (1) + checkBonusHalfLevel (2).
    expect(check("spear").modifier).toBe(statModifier(f.stats.STR) + 1 + 2);
    // Any other weapon is unmastered — no attack bonus, no half-level scaling.
    expect(check("dagger").modifier).toBe(statModifier(f.stats.STR));
    expect(f.damageBonusWith("spear")).toBe(1 + 2);
    expect(f.damageBonusWith("dagger")).toBe(0);
  });

  it("auto-resolves statBonusChoice and armorAcBonusChoice", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    
    // Test statBonusChoice resolution
    f.addEffect({
      id: "test-stat-choice",
      name: "Test Choice",
      hooks: [{ kind: "statBonusChoice", stats: ["STR", "DEX"], bonus: 2 }],
    });
    const resolved = f.effects.find((e) => e.id === "test-stat-choice");
    expect(resolved).toBeDefined();
    expect(resolved!.hooks[0]!.kind).toBe("statBonus");
    // It should have picked the highest of STR and DEX
    const expectedStat = f.stats.STR >= f.stats.DEX ? "STR" : "DEX";
    expect((resolved!.hooks[0]! as any).stat).toBe(expectedStat);

    // Test armorAcBonusChoice resolution
    f.addEffect({
      id: "test-armor-choice",
      name: "Test Armor Choice",
      hooks: [{ kind: "armorAcBonusChoice", bonus: 1 }],
    });
    const resolvedArmor = f.effects.find((e) => e.id === "test-armor-choice");
    expect(resolvedArmor).toBeDefined();
    expect(resolvedArmor!.hooks[0]!.kind).toBe("armorAcBonus");
    expect((resolvedArmor!.hooks[0]! as any).armorId).toBe("chainmail");
  });

  it("swaps stats for Fighter if neither STR nor DEX is heroic (>= 15)", () => {
    let foundSeed = -1;
    let originalStats: any = null;
    for (let seed = 0; seed < 1000; seed++) {
      const d = new Dice(seed);
      const rolled = rollStats(d);
      if (rolled.STR < 15 && rolled.DEX < 15) {
        foundSeed = seed;
        originalStats = rolled;
        break;
      }
    }
    expect(foundSeed).toBeGreaterThanOrEqual(0);

    const candidates: ("CON" | "INT" | "WIS" | "CHA")[] = ["CON", "INT", "WIS", "CHA"];
    let bestStat: "CON" | "INT" | "WIS" | "CHA" | null = null;
    let maxVal = -1;
    for (const s of candidates) {
      if (originalStats[s] >= 15 && originalStats[s] > maxVal) {
        maxVal = originalStats[s];
        bestStat = s;
      }
    }
    expect(bestStat).not.toBeNull();

    const seededEngine = new Engine({ seed: foundSeed });
    registerTables(seededEngine);
    const f = createCharacter(seededEngine, "f", "Fighter", "fighter");

    // Starting talents land after the swap and can raise the stat that STR's
    // old value moved into, so assert the exchange rather than exact values:
    // the heroic score is now in STR, and what was in its slot is no longer heroic.
    expect(f.stats.STR).toBeGreaterThanOrEqual(originalStats[bestStat!]);
    expect(f.stats[bestStat!]).toBeGreaterThanOrEqual(originalStats.STR);
    expect(f.stats[bestStat!]).toBeLessThan(originalStats[bestStat!]);
  });
});

describe("monster attack special abilities", () => {
  it("applies condition effects on hit for monsters with special abilities", () => {
    const dice = new Dice(10);
    const spider = {
      id: "spider",
      name: "Giant Spider",
      ac: 13,
      hitDice: "3d8",
      attackBonus: 100, // Guaranteed hit
      damage: "1d6",
      wisMod: 0,
      darkvision: true,
      undead: false,
      xpTier: "minor" as const,
      specialAbility: "web" as const,
    };
    const res = monsterAttackRoll(dice, spider, 10);
    expect(res.hit).toBe(true);
    expect(res.appliedCondition).toBe("webbed");
  });

  it("maps poison, engulf, and corrosion families to live conditions", () => {
    const dice = {
      d20: () => ({ natural: 10, rolls: [10] }),
      roll: () => 1,
    } as unknown as Dice;
    const attack = (specialAbility: "poison" | "engulf" | "corrode") =>
      monsterAttackRoll(dice, {
        id: specialAbility,
        name: specialAbility,
        ac: 10,
        hitDice: "1d4",
        attackBonus: 100,
        damage: "1d1",
        wisMod: 0,
        darkvision: true,
        undead: false,
        xpTier: "minor",
        specialAbility,
      }, 10).appliedCondition;
    expect(attack("poison")).toBe("poisoned");
    expect(attack("engulf")).toBe("swallowed");
    expect(attack("corrode")).toBe("corroded");
  });

  it("assigns family verbs to the intended monster identities", () => {
    expect(monster("bittermold").specialAbility).toBe("split");
    expect(monster("giant-spider").specialAbility).toBe("web");
    expect(monster("deep-one").specialAbility).toBe("engulf");
    expect(monster("shadow").specialAbility).toBe("shadow-extinct");
    expect(monster("animated-armor").specialAbility).toBe("corrode");
  });
});

describe("stat bonus talent targeting", () => {
  const character = (className: "fighter" | "thief" | "priest" | "wizard", stats: Record<string, number>) =>
    new Character({
      id: "s",
      name: "Subject",
      className,
      stats: stats as never,
      maxHp: 8,
    });

  const grant = (c: Character, stats: readonly string[], bonus = 2) =>
    c.addEffect({
      id: "talent-stat",
      name: "+bonus to one stat",
      hooks: [{ kind: "statBonusChoice", stats: stats as never, bonus }],
    });

  it("shores up the weakest offered stat below 10", () => {
    const f = character("fighter", { STR: 16, DEX: 9, CON: 8, INT: 10, WIS: 10, CHA: 10 });
    grant(f, ["STR", "DEX", "CON"]);
    expect(f.stats.CON).toBe(10);
    expect(f.stats.DEX).toBe(9);
    expect(f.stats.STR).toBe(16);
  });

  it("reinforces the class primary when nothing offered is deficient", () => {
    const f = character("fighter", { STR: 13, DEX: 12, CON: 11, INT: 8, WIS: 8, CHA: 8 });
    grant(f, ["STR", "DEX", "CON"]);
    expect(f.stats.STR).toBe(15);
    // A deficient stat the talent does not offer is left alone.
    expect(f.stats.INT).toBe(8);
  });

  it("uses each class's own primary stat", () => {
    const all = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;
    for (const className of ["fighter", "thief", "priest", "wizard"] as const) {
      const c = character(className, { STR: 12, DEX: 12, CON: 12, INT: 12, WIS: 12, CHA: 12 });
      grant(c, all);
      const primary = PRIMARY_STAT[className];
      expect(c.stats[primary]).toBe(14);
    }
  });

  it("refuses to place points when the class primary is not on offer", () => {
    const w = character("wizard", { STR: 12, DEX: 12, CON: 12, INT: 12, WIS: 12, CHA: 12 });
    expect(() => grant(w, ["STR", "CON"])).toThrow(/primary stat INT/);
  });
});

describe("weapon mastery binding", () => {
  it("binds a fighter's first mastery to their starting weapon", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    const mastery = f.effects.find((e) => e.id === "feat-fighter-weapon-mastery");
    expect(mastery).toBeDefined();
    for (const hook of mastery!.hooks) {
      expect((hook as { weaponId?: string }).weaponId).toBe("spear");
    }
    expect(mastery!.name).toContain("Spear");
  });

  it("sends an additional mastery to a carried weapon that is not mastered yet", () => {
    const engine = makeEngine();
    const f = createCharacter(engine, "f", "Fighter", "fighter");
    f.effects = f.effects.filter((e) => e.id === "feat-fighter-weapon-mastery");
    f.inventory.add(item("dagger"), 1, true);
    f.addEffect({
      id: "talent-extra-mastery",
      name: "Weapon Mastery with one additional weapon type",
      hooks: [{ kind: "weaponMasteryChoice", bonus: 1 }],
    });

    // The spear is already mastered by the class feature, so the talent goes to
    // another weapon in the pack (a fighter also starts carrying javelins).
    expect(f.damageBonusWith("spear")).toBe(1);
    const alsoMastered = ["javelin", "dagger"].filter((id) => f.damageBonusWith(id) === 1);
    expect(alsoMastered).toHaveLength(1);
    // A weapon nobody carries or mastered stays unbonused.
    expect(f.damageBonusWith("shortbow")).toBe(0);
  });
});

describe("dice expression parsing", () => {
  it("accepts the single-die shorthand as one die", () => {
    const d = new Dice(11);
    for (let i = 0; i < 50; i++) {
      const r = d.rollDetailed("d100");
      expect(r.rolls).toHaveLength(1);
      expect(r.total).toBeGreaterThanOrEqual(1);
      expect(r.total).toBeLessThanOrEqual(100);
    }
    expect(d.rollDetailed("d6+2").modifier).toBe(2);
  });

  it("still rejects genuinely malformed expressions", () => {
    const d = new Dice(1);
    expect(() => d.roll("d")).toThrow(/Invalid dice expression/);
    expect(() => d.roll("banana")).toThrow(/Invalid dice expression/);
    expect(() => d.roll("0d6")).toThrow(/Invalid dice count/);
  });

  it("rejects a table whose dice expression cannot be parsed, at registration", () => {
    const engine = new Engine({ seed: 1 });
    expect(() =>
      engine.tables.register({
        id: "broken-table",
        name: "Broken",
        dice: "d",
        entries: [{ min: 1, max: 1, text: "nothing" }],
      }),
    ).toThrow(/Invalid dice expression/);
  });

  it("rolls every registered table without throwing", () => {
    const engine = makeEngine();
    const ids = engine.tables.ids();
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      for (let i = 0; i < 30; i++) expect(engine.rollTable(id).entry).toBeDefined();
    }
  });
});

describe("attack stat drives damage", () => {
  const armed = (className: "fighter" | "thief", stats: Record<string, number>, weaponId: string) => {
    const c = new Character({ id: "a", name: "Armed", className, stats: stats as never, maxHp: 10 });
    const weapon = item(weaponId);
    c.inventory.add(weapon, 1, true);
    c.equipWeapon(weapon);
    return c;
  };

  it("adds STR to melee damage", () => {
    const engine = makeEngine(3);
    const f = armed("fighter", { STR: 18, DEX: 8, CON: 12, INT: 10, WIS: 10, CHA: 10 }, "longsword");
    let hits = 0;
    for (let i = 0; i < 60; i++) {
      const r = engine.attack({ attacker: f, targetAc: -99, damage: "1d8", weapon: item("longsword") });
      if (!r.check.success) continue; // a natural 1 always misses
      hits++;
      // 1d8 + STR 18 (+4); no talents on this bare character.
      expect(r.damage).toBeGreaterThanOrEqual(1 + 4);
      expect(r.damage).toBeLessThanOrEqual(8 + 8 + 4); // crits double the dice
    }
    expect(hits).toBeGreaterThan(0);
  });

  it("uses DEX for a finesse shortsword in a dextrous hand, for hit and damage", () => {
    const engine = makeEngine(5);
    const t = armed("thief", { STR: 8, DEX: 18, CON: 10, INT: 10, WIS: 10, CHA: 10 }, "shortsword");
    const sword = item("shortsword");
    expect(sword.damage).toBe("1d6");
    let hits = 0;
    for (let i = 0; i < 60; i++) {
      const r = engine.attack({ attacker: t, targetAc: -99, damage: sword.damage!, weapon: sword });
      expect(r.check.modifier).toBe(4); // DEX 18, not STR 8
      if (!r.check.success) continue;
      hits++;
      expect(r.damage).toBeGreaterThanOrEqual(1 + 4);
    }
    expect(hits).toBeGreaterThan(0);
  });

  it("uses DEX for the shortbow even when strength is higher", () => {
    const engine = makeEngine(7);
    const t = armed("thief", { STR: 18, DEX: 14, CON: 10, INT: 10, WIS: 10, CHA: 10 }, "shortbow");
    const bow = item("shortbow");
    // A bow can be held, so the player can cycle to it and loose.
    expect(t.wieldedWeapon?.id).toBe("shortbow");
    let hits = 0;
    for (let i = 0; i < 60; i++) {
      const r = engine.attack({ attacker: t, targetAc: -99, damage: bow.damage!, weapon: bow });
      expect(r.check.modifier).toBe(2); // DEX 14, not STR 18
      if (!r.check.success) continue;
      hits++;
      expect(r.damage).toBeGreaterThanOrEqual(1 + 2);
    }
    expect(hits).toBeGreaterThan(0);
  });
});
