import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { chooseAutoSupportAction } from "./partyAutomation";

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
});
