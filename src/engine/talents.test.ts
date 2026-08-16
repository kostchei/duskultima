import { describe, expect, it } from "vitest";
import { Character } from "./character";
import { Dice } from "./dice";
import { TableRegistry } from "./tables";
import { applyTalentChoice, rollAndApplyTalentWithChoices, rollAndApplyTalents } from "./talents";

class SequenceDice extends Dice {
  private readonly results: number[];

  constructor(...results: number[]) {
    super(1);
    this.results = [...results];
  }

  override roll(_expression: string): number {
    const result = this.results.shift();
    if (result === undefined) throw new Error("SequenceDice ran out of results");
    return result;
  }
}

describe("starting talent rolls", () => {
  it("performs the requested rolls independently, even when outcomes may repeat", () => {
    const tables = new TableRegistry();
    tables.register({
      id: "test-talents",
      name: "Test Talents",
      dice: "1d2",
      entries: [
        { min: 1, max: 1, text: "First result" },
        { min: 2, max: 2, text: "Second result" },
      ],
    });
    const character = new Character({
      id: "hero",
      name: "Hero",
      className: "fighter",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 8,
    });

    const applied = rollAndApplyTalents(
      new SequenceDice(1, 2),
      tables,
      character,
      "test-talents",
      2,
      "talent-start",
    );

    expect(applied.map((result) => result.result.roll)).toEqual([1, 2]);
    expect(character.effects).toHaveLength(2);
  });

  it("adds alignment spells to a spell-choice talent", () => {
    const tables = new TableRegistry();
    tables.register({
      id: "spell-choice",
      name: "Spell Choice",
      dice: "1d1",
      entries: [{
        min: 1,
        max: 1,
        text: "Learn a wizard spell",
        talent: [{ kind: "learnSpell", spells: [{ id: "magic-missile", tier: 1 }] }],
      }],
    });
    const character = new Character({
      id: "mage",
      name: "Mage",
      className: "magic-user",
      alignment: "law",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 6,
    });

    const application = rollAndApplyTalentWithChoices(new SequenceDice(1), tables, character, "spell-choice", "talent-start-0");
    const spellChoice = application.pendingChoices.find((choice) => choice.kind === "learnSpell");

    expect(spellChoice?.options.some((option) => option.value === "cleanse")).toBe(true);
    expect(spellChoice?.options.some((option) => option.value === "magic-missile")).toBe(true);
  });

  it("replaces a deferred talent placeholder with the benefit actually selected", () => {
    const tables = new TableRegistry();
    tables.register({
      id: "stat-choice",
      name: "Stat Choice",
      dice: "1d1",
      entries: [{
        min: 1,
        max: 1,
        text: "+2 to Strength, Dexterity, or Constitution stat",
        effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON"], bonus: 2 }],
      }],
    });
    const character = new Character({
      id: "fighter",
      name: "Fighter",
      className: "fighter",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 8,
    });

    const application = rollAndApplyTalentWithChoices(new SequenceDice(1), tables, character, "stat-choice", "talent-start-0");
    expect(character.effects.map((effect) => effect.name)).toEqual(["+2 to Strength, Dexterity, or Constitution stat"]);

    applyTalentChoice(character, application.pendingChoices[0]!, "STR");

    expect(character.effects.map((effect) => effect.name)).toEqual(["+2 STR"]);
    expect(character.stats.STR).toBe(12);
  });

  it("records the alignment spell actually selected in the talent summary", () => {
    const tables = new TableRegistry();
    tables.register({
      id: "spell-choice",
      name: "Spell Choice",
      dice: "1d1",
      entries: [{
        min: 1,
        max: 1,
        text: "Learn a wizard spell",
        talent: [{ kind: "learnSpell", spells: [{ id: "magic-missile", tier: 1 }] }],
      }],
    });
    const character = new Character({
      id: "mage",
      name: "Mage",
      className: "magic-user",
      alignment: "law",
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      maxHp: 6,
    });

    const application = rollAndApplyTalentWithChoices(new SequenceDice(1), tables, character, "spell-choice", "talent-start-0");
    const spellChoice = application.pendingChoices.find((choice) => choice.kind === "learnSpell")!;
    applyTalentChoice(character, spellChoice, "cleanse");

    expect(character.effects.map((effect) => effect.name)).toEqual(["Learned spell: Cleanse"]);
    expect(character.knownSpells.some((spell) => spell.spellId === "cleanse")).toBe(true);
  });
});
