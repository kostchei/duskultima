import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { chooseAutoSupportAction } from "./partyAutomation";
import { item } from "../data/items";

function hero(id: string, className: "fighter" | "priest" | "wizard"): Character {
  return new Character({ id, name: id, className, stats: { STR: 12, DEX: 12, CON: 12, INT: 14, WIS: 14, CHA: 10 }, maxHp: 10 });
}

describe("party auto support", () => {
  it("follows on a leader movement intent", () => {
    const leader = hero("leader", "fighter");
    expect(chooseAutoSupportAction(hero("follower", "wizard"), leader, { leaderIntent: "move" })).toEqual({ kind: "follow" });
  });

  it("heals a badly hurt leader before attacking", () => {
    const leader = hero("leader", "fighter");
    leader.hp = 4;
    const priest = hero("priest", "priest");
    priest.learnSpell("cure_wounds");
    expect(chooseAutoSupportAction(priest, leader, { leaderIntent: "attack", hasThreat: true })).toEqual({ kind: "cast", spellId: "cure_wounds" });
  });

  it("uses the strongest available damaging spell when supporting an attack", () => {
    const leader = hero("leader", "fighter");
    const wizard = hero("wizard", "wizard");
    wizard.learnSpell("magic-missile");
    expect(chooseAutoSupportAction(wizard, leader, { leaderIntent: "attack", hasThreat: true })).toEqual({ kind: "cast", spellId: "magic-missile" });
  });

  it("uses DC 15 stabilization when no potion or healing magic is available", () => {
    const leader = hero("leader", "fighter");
    const dying = hero("dying", "fighter");
    dying.dying = { roundsRemaining: 2 };
    const priest = hero("priest", "priest");
    expect(chooseAutoSupportAction(priest, leader, {
      leaderIntent: "pass",
      hasThreat: true,
      injuredParty: [dying],
      dyingParty: [dying],
    })).toEqual({ kind: "assist", targetId: "dying" });
  });

  it("uses a healing potion before magic or stabilization", () => {
    const leader = hero("leader", "fighter");
    const dying = hero("dying", "fighter");
    dying.dying = { roundsRemaining: 2 };
    dying.inventory.add(item("potion-healing"), 1, true);
    const fighter = hero("fighter", "fighter");
    expect(chooseAutoSupportAction(fighter, leader, {
      leaderIntent: "pass",
      dyingParty: [dying],
    })).toEqual({ kind: "potion", userId: "dying", targetId: "dying" });
  });

  it("casts healing magic on an injured ally before stabilizing", () => {
    const leader = hero("leader", "fighter");
    const dying = hero("dying", "fighter");
    dying.dying = { roundsRemaining: 2 };
    const priest = hero("priest", "priest");
    priest.learnSpell("cure-wounds");
    expect(chooseAutoSupportAction(priest, leader, {
      leaderIntent: "pass",
      injuredParty: [dying],
      dyingParty: [dying],
    })).toEqual({ kind: "cast", spellId: "cure-wounds", targetId: "dying" });
  });

  it("lets ranged followers attack even when the leader passes", () => {
    const leader = hero("leader", "fighter");
    const ranger = hero("ranger", "fighter");
    ranger.equipWeapon(item("shortbow"));
    expect(chooseAutoSupportAction(ranger, leader, { leaderIntent: "pass", hasThreat: true })).toEqual({ kind: "attack" });
  });
});
