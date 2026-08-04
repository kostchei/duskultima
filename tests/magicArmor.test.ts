import { describe, expect, it } from "vitest";
import {
  MAGIC_ARMOR_BASE_IDS,
  allItems,
  generatedMagicArmor,
  isGenericMagicArmorId,
  item,
  resolveFoundItem,
  rollItemTraits,
} from "../src/data";
import { chooseMagicArmorType, type PartyProgress } from "../src/game/progression";

const member = (className: string, wornArmorId?: string, dead = false): PartyProgress => ({
  className,
  level: 4,
  knownSpellIds: [],
  wornArmorId,
  dead,
});

/** The +2 magic armor row from the 4-6 band, the one that also carries a curse. */
const GENERIC_PLUS_TWO = "core-treasure-4-6-096";

describe("generic magic armor becomes a real suit of armor", () => {
  it("mints one variant per armor type, keeping the mundane armor's own stats", () => {
    for (const armorId of MAGIC_ARMOR_BASE_IDS) {
      const mundane = item(armorId);
      const magic = generatedMagicArmor(GENERIC_PLUS_TWO, armorId);
      expect(magic.armor).toEqual(mundane.armor);
      expect(magic.slotCost).toBe(mundane.slotCost);
      expect(magic.armorVisual).toBe(mundane.armorVisual);
      expect(magic.magicBonus).toBe(2);
      expect(magic.name).toBe(`+2 ${mundane.name}`);
    }
  });

  it("keeps plate's DEX cap and stealth penalty rather than flattening every find", () => {
    const plate = generatedMagicArmor(GENERIC_PLUS_TWO, "plate-mail");
    const leather = generatedMagicArmor(GENERIC_PLUS_TWO, "leather-armor");
    expect(plate.armor!.dexCap).toBe(0);
    expect(plate.armor!.stealthDisadvantage).toBe(true);
    expect(leather.armor!.dexCap).toBe(99);
    expect(leather.armor!.stealthDisadvantage).toBeUndefined();
  });

  it("registers every variant as a resolvable item", () => {
    const ids = new Set(allItems().map((def) => def.id));
    for (const armorId of MAGIC_ARMOR_BASE_IDS) {
      expect(ids.has(`${GENERIC_PLUS_TWO}--${armorId}`)).toBe(true);
    }
  });

  it("rejects ids that are not generic magic armor", () => {
    expect(isGenericMagicArmorId("chainmail")).toBe(false);
    expect(() => generatedMagicArmor("chainmail", "plate-mail")).toThrow();
    expect(() => generatedMagicArmor(GENERIC_PLUS_TWO, "mithral-chainmail")).toThrow();
  });
});

describe("the armor type fills the party's gaps", () => {
  it("hands plate to a fighter still in plain chainmail", () => {
    expect(chooseMagicArmorType([member("fighter", "chainmail")], 2, 1)).toBe("plate-mail");
  });

  it("moves to the next gap once the front-liner already has magic armor", () => {
    const party = [
      member("thief", "leather-armor"),
      member("fighter", `${GENERIC_PLUS_TWO}--plate-mail`),
    ];
    expect(chooseMagicArmorType(party, 2, 1)).toBe("leather-armor");
  });

  it("never picks armor no living member can legally wear", () => {
    const party = [member("wizard"), member("thief", "leather-armor")];
    expect(chooseMagicArmorType(party, 2, 1)).toBe("leather-armor");
  });

  it("ignores the dead when deciding whose gap to fill", () => {
    const party = [member("fighter", "chainmail", true), member("thief", "leather-armor")];
    expect(chooseMagicArmorType(party, 2, 1)).toBe("leather-armor");
  });

  it("is a pure function of its seed", () => {
    const party = [member("fighter", "chainmail")];
    for (let seed = 0; seed < 50; seed++) {
      expect(chooseMagicArmorType(party, 2, seed)).toBe(chooseMagicArmorType(party, 2, seed));
    }
  });

  it("still yields a wearable-by-nobody party a valid armor type", () => {
    const party = [member("wizard"), member("wizard")];
    for (let seed = 0; seed < 50; seed++) {
      expect(MAGIC_ARMOR_BASE_IDS).toContain(chooseMagicArmorType(party, 2, seed));
    }
  });
});

describe("benefit and curse rolls resolve", () => {
  it("turns the row's declared counts into concrete traits", () => {
    const def = generatedMagicArmor(GENERIC_PLUS_TWO, "plate-mail");
    expect(def.benefitRolls).toBe(1);
    expect(def.curseRolls).toBe(1);
    const traits = rollItemTraits(def, 12345);
    expect(traits.benefits).toHaveLength(1);
    expect(traits.curses).toHaveLength(1);
  });

  it("folds them into the found item and clears the unrolled counts", () => {
    const { def, traits } = resolveFoundItem(generatedMagicArmor(GENERIC_PLUS_TWO, "plate-mail"), 12345);
    expect(def.benefits).toContain(traits.benefits[0]!.text);
    expect(def.curses).toContain(traits.curses[0]!.text);
    expect(def.benefitRolls).toBeUndefined();
    expect(def.curseRolls).toBeUndefined();
  });

  it("collects every rolled hook for the equip layer", () => {
    const traits = rollItemTraits(generatedMagicArmor(GENERIC_PLUS_TWO, "plate-mail"), 999);
    const expected = [...traits.benefits, ...traits.curses].flatMap((trait) => trait.hooks);
    expect(traits.hooks).toEqual(expected);
  });

  it("never gives an armor find a weapon-only trait", () => {
    const def = generatedMagicArmor(GENERIC_PLUS_TWO, "plate-mail");
    for (let seed = 0; seed < 200; seed++) {
      for (const trait of rollItemTraits(def, seed).benefits) {
        expect(trait.appliesTo).not.toBe("weapon");
      }
    }
  });

  it("is a pure function of its seed", () => {
    const def = generatedMagicArmor(GENERIC_PLUS_TWO, "chainmail");
    for (let seed = 0; seed < 50; seed++) {
      expect(rollItemTraits(def, seed)).toEqual(rollItemTraits(def, seed));
    }
  });

  it("leaves ordinary items untouched", () => {
    const { def, traits } = resolveFoundItem(item("chainmail"), 7);
    expect(def).toBe(item("chainmail"));
    expect(traits.hooks).toHaveLength(0);
  });
});
