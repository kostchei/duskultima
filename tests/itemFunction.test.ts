import { describe, expect, it } from "vitest";
import { allItems, item } from "../src/data/items";
import { ALL_TREASURE_TABLES } from "../src/data/tables/treasure";
import { spellForMagicItem } from "../src/data/spells";
import { stackSlots, type ItemDef } from "../src/engine/inventory";

/**
 * Every item a party can pick up has to do something: be worn, be swung, be
 * used, or be worth coin. An item that does none of those is dead weight in a
 * gear slot, and a treasure table that hands one out is a wasted reward slot.
 *
 * These are data guards, not behaviour tests — they fail when a new item or
 * treasure row is added without wiring it up.
 */

const equippable = (def: ItemDef): boolean => Boolean(def.armor || def.damage || def.shield);
const sellable = (def: ItemDef): boolean => def.valueGp !== undefined && def.valueGp > 0;
/** Effects that need no player action: extra slots, a named passive, a spell DC. */
const passive = (def: ItemDef): boolean =>
  Boolean(def.capacityBonus || def.namedEffect || def.hostileSpellDc || def.magicBonus);

/** Money and quest rewards are their own reason to exist. */
const EXEMPT_FROM_FUNCTION = new Set(["coins", "crown-of-the-deep"]);

describe("every item does something", () => {
  it("is worn, wielded, used, or worth coin", () => {
    const inert = allItems()
      .filter((def) => !EXEMPT_FROM_FUNCTION.has(def.id))
      .filter((def) => !equippable(def) && !def.use && !sellable(def) && !passive(def))
      .map((def) => `${def.id} ("${def.name}")`);
    expect(inert).toEqual([]);
  });

  it("gives every potion a way to be spent", () => {
    // Most are drunk; Extirpation is aimed at something else, so `activate`
    // counts too. What must never happen is a potion with no use at all.
    const unusable = allItems()
      .filter((def) => def.tags.includes("potion"))
      .filter((def) => !def.use?.actions.some((action) => action === "consume" || action === "activate"))
      .map((def) => def.id);
    expect(unusable).toEqual([]);
  });

  it("resolves a spell for everything that can be cast", () => {
    const spellless = allItems()
      .filter((def) => def.use?.actions.includes("cast"))
      .filter((def) => !def.boundSpellIds?.length && !spellForMagicItem(def.id, def.rulesId, def.boundSpellId))
      .map((def) => def.id);
    expect(spellless).toEqual([]);
  });

  it("keeps melee weapons reachable and ranged weapons deliberately not", () => {
    for (const def of allItems()) {
      if (!def.damage) continue;
      const ranged = def.tags.includes("ranged");
      // Ranged weapons carry no reach on purpose — see character.ts equip rules.
      expect(ranged ? def.reachTiles === undefined : def.reachTiles !== undefined).toBe(true);
    }
  });
});

describe("treasure tables hand out working items", () => {
  const droppedItems = (): readonly ItemDef[] => ALL_TREASURE_TABLES.flatMap((table) =>
    table.entries.flatMap((entry) => {
      const id = (entry.data as { itemId?: string } | undefined)?.itemId;
      return id ? [item(id)] : [];
    }));

  it("names an item that exists for every row that drops one", () => {
    expect(() => droppedItems()).not.toThrow();
  });

  it("resolves gear-shaped finds to real gear rather than flavour text", () => {
    // Rows whose text names a functioning piece of kit must carry a baseItemId,
    // or the party picks up an inert souvenir called "Muddy torch".
    const GEAR_WORDS = /\b(?:torch|mirror|spikes?|rope|lantern)\b/i;
    const flavourOnly = droppedItems()
      .filter((def) => GEAR_WORDS.test(def.name) && !def.use && !equippable(def))
      .map((def) => `${def.id} ("${def.name}")`);
    // The survivors are deliberate: two lanterns that are art or wreckage
    // rather than a working light, and two mirrors that are furniture — none of
    // them the handheld steel mirror the gear list already has.
    expect(flavourOnly).toEqual([
      'core-treasure-0-3-008 ("Rusty lantern with shattered glass")',
      'core-treasure-4-6-068 ("Full-length mirror set in gold frame")',
      'core-treasure-7-9-008 ("Tall, thin mirror in a bronze frame")',
      'core-treasure-7-9-048 ("Lantern made of intricate stained glass")',
    ]);
  });

  it("packs loose valuables ten to a slot", () => {
    const pearl = item("core-treasure-0-3-044");
    const scarabPin = item("core-treasure-0-3-046");
    for (const def of [pearl, scarabPin]) {
      expect(def.slotGroup).toBe("small-treasure");
      expect(stackSlots(def, 10)).toBe(1);
    }
  });

  it("packs the Cursed Scroll relics like the trinkets they are", () => {
    for (const id of ["carved-flame-bone", "eyeball-charm", "compass-rose", "cursed-eye-token", "poison-wine-cup"]) {
      const def = item(id);
      expect(stackSlots(def, 10)).toBe(1);
      expect(sellable(def)).toBe(true);
    }
  });

  it("keeps an armful out of the pouch", () => {
    for (const id of ["core-treasure-7-9-050", "core-treasure-7-9-036", "core-treasure-10-plus-020"]) {
      expect(item(id).slotGroup).toBeUndefined();
    }
  });
});
