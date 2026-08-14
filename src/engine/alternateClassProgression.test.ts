import { describe, expect, it } from "vitest";
import { classDef } from "../data/classes";
import { registerTables } from "../data";
import { Character, Engine } from "./index";
import { initializeClassState, resourceMaximum, useParry, usePetrifyingGaze } from "./classAbilities";
import { applyTalentResultForLevelUp } from "./talents";

const stats = { STR: 14, DEX: 14, CON: 14, INT: 12, WIS: 12, CHA: 12 } as const;

describe("recoverable and regional class progression", () => {
  it("uses the extracted hit dice, armor, and starting-ability shapes", () => {
    expect(classDef("basilisk-warrior").hitDie).toBe("1d8");
    expect(classDef("basilisk-warrior").armorId).toBeNull();
    expect(classDef("roustabout").hitDie).toBe("1d4");
    expect(classDef("duelist").hitDie).toBe("1d8");
    expect(classDef("delver").startsWithShield).toBe(true);
    expect(classDef("bard").startsWithShield).toBe(true);
  });

  it("calculates Basilisk Stone Skin and daily Gaze, plus Duelist Parry", () => {
    const basilisk = new Character({ id: "basilisk", name: "Basilisk", className: "basilisk-warrior", stats, maxHp: 10 });
    basilisk.level = 4;
    basilisk.addEffect(classDef("basilisk-warrior").features[0]!);
    initializeClassState(basilisk);
    expect(basilisk.ac).toBe(16); // 10 + DEX 2 + Stone Skin 2 + half level 2
    expect(resourceMaximum(basilisk, "petrifyingGaze")).toBe(2);
    expect(usePetrifyingGaze(basilisk)).toBe(1);

    const duelist = new Character({ id: "duelist", name: "Duelist", className: "duelist", stats, maxHp: 10 });
    initializeClassState(duelist);
    expect(resourceMaximum(duelist, "parry")).toBe(1);
    expect(useParry(duelist)).toBe(0);
  });

  it("exposes the source Pit Fighter stat-or-HP decision instead of silently choosing one", () => {
    const engine = new Engine({ seed: 8 });
    registerTables(engine);
    const pit = new Character({ id: "pit", name: "Pit", className: "pit-fighter", stats, maxHp: 10 });
    const table = engine.tables.get("pit-fighter-talents");
    const result = applyTalentResultForLevelUp(engine.dice, engine.tables, pit, { table, roll: 7, entry: table.entries[2]! }, "pit-choice");
    expect(result.pendingChoices[0]?.kind).toBe("statOrHp");
    expect(result.pendingChoices[0]?.options.some((option) => option.value === "hp")).toBe(true);
  });
});
