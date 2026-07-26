import { describe, expect, it } from "vitest";
import {
  availableEncounterChoices,
  Dice,
  Engine,
  encounterStealthDc,
  resolvePartyEncounterStealth,
  rollActivity,
  rollDistance,
  rollReaction,
  type EncounterChoice,
} from "../src/engine";
import { createCharacter, item, registerTables } from "../src/data";

function fighterForStealth(seed = 1) {
  const engine = new Engine({ seed });
  registerTables(engine);
  return { engine, fighter: createCharacter(engine, "stealth-fighter", "Fighter", "fighter") };
}

describe("encounter reaction rolls", () => {
  it("rollActivity always returns one of the five defined activities", () => {
    const dice = new Dice(1);
    const seen = new Set<string>();
    for (let i = 0; i < 200; i++) seen.add(rollActivity(dice));
    expect(seen).toEqual(new Set(["eating", "guarding", "sleeping", "building", "hunting"]));
  });

  it("rollDistance always returns one of close/near/far", () => {
    const dice = new Dice(2);
    const seen = new Set<string>();
    for (let i = 0; i < 100; i++) seen.add(rollDistance(dice));
    expect(seen).toEqual(new Set(["close", "near", "far"]));
  });

  it("rollReaction is a 2d6 bell curve — hostile and friendly are rarer than the middle band", () => {
    const dice = new Dice(3);
    const counts: Record<string, number> = { hostile: 0, suspicious: 0, neutral: 0, curious: 0, friendly: 0 };
    for (let i = 0; i < 5000; i++) counts[rollReaction(dice)]!++;
    expect(Object.values(counts).every((n) => n > 0)).toBe(true);
    expect(counts.neutral!).toBeGreaterThan(counts.hostile!);
    expect(counts.neutral!).toBeGreaterThan(counts.friendly!);
  });
});

describe("availableEncounterChoices", () => {
  const has = (choices: readonly EncounterChoice[], c: EncounterChoice) => choices.includes(c);

  it("a sleeping wave only offers ambush, hide, and retreat", () => {
    const choices = availableEncounterChoices("sleeping", true);
    expect(choices).toEqual(["ambush", "hide", "retreat"]);
  });

  it("an awake wave offers all six when the party can offer food/treasure", () => {
    const choices = availableEncounterChoices("hunting", true);
    expect(choices).toEqual(["ambush", "parley", "offer", "threaten", "hide", "retreat"]);
  });

  it("offer drops out when the party has nothing to give", () => {
    const choices = availableEncounterChoices("guarding", false);
    expect(has(choices, "offer")).toBe(false);
    expect(has(choices, "parley")).toBe(true);
    expect(has(choices, "threaten")).toBe(true);
  });

  it("ambush, hide, and retreat are always present regardless of activity or resources", () => {
    for (const activity of ["eating", "guarding", "sleeping", "building", "hunting"] as const) {
      for (const canOffer of [true, false]) {
        const choices = availableEncounterChoices(activity, canOffer);
        expect(has(choices, "ambush")).toBe(true);
        expect(has(choices, "hide")).toBe(true);
        expect(has(choices, "retreat")).toBe(true);
      }
    }
  });
});

describe("encounter stealth", () => {
  it("makes distance and monster activity matter to detection", () => {
    expect(encounterStealthDc("far", "sleeping")).toBe(9);
    expect(encounterStealthDc("far", "guarding")).toBe(9);
    expect(encounterStealthDc("near", "guarding")).toBe(12);
    expect(encounterStealthDc("close", "guarding")).toBe(15);
    expect(encounterStealthDc("close", "hunting")).toBe(18);
  });

  it("gives a default chainmail fighter disadvantage but leather removes it", () => {
    const { engine, fighter } = fighterForStealth();
    const noisy = resolvePartyEncounterStealth(engine.dice, [fighter], "near", "guarding");
    expect(fighter.wornArmor?.id).toBe("chainmail");
    expect(noisy.checks[0]!.mode).toBe("disadvantage");
    expect(noisy.checks[0]!.disadvantageReasons).toContain("Chainmail");

    fighter.equipArmor(item("leather-armor"));
    const quiet = resolvePartyEncounterStealth(engine.dice, [fighter], "near", "guarding");
    expect(quiet.checks[0]!.mode).toBe("normal");
  });

  it("requires a strict majority rather than making every party member pass", () => {
    const { engine, fighter } = fighterForStealth(2);
    const party = [
      fighter,
      createCharacter(engine, "stealth-thief", "Thief", "thief"),
      createCharacter(engine, "stealth-priest", "Priest", "priest"),
      createCharacter(engine, "stealth-wizard", "Wizard", "wizard"),
    ];
    expect(resolvePartyEncounterStealth(engine.dice, party, "near", "guarding").required).toBe(3);
  });
});
