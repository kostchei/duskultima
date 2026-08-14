import { TableRegistry, type Dice, type ItemDef, type TreasureQuality } from "../engine";
import { encounterTreasureTableId } from "../engine/treasureXp";
import { allItems, item } from "./items";
import { resolveFoundItem } from "./magicItemTraitRoll";
import { ALL_TREASURE_TABLES, LUXURY_FEATURES } from "./tables/treasure";

export type TreasureFindKind = "core" | "gemstone" | "luxury";

export interface TreasureFind {
  def: ItemDef;
  qty: number;
  quality: TreasureQuality;
  tableId: string;
  roll: number;
  text: string;
  kind?: TreasureFindKind;
  secondaryRoll?: number;
}

export interface FabledItemFind {
  def: ItemDef;
  quality: TreasureQuality;
}

const TREASURE_TABLES = new TableRegistry();
for (const table of ALL_TREASURE_TABLES) TREASURE_TABLES.register(table);

function nextTraitSeed(dice: Dice): number {
  return dice.between(1, 0x7fffffff);
}

function treasureQuality(value: unknown, def: ItemDef): TreasureQuality {
  if (value === "poor" || value === "normal" || value === "fabulous" || value === "legendary") {
    return value;
  }
  return def.treasureQuality ?? "normal";
}

/** Roll one ordinary cache item from the table matching the party level. */
export function rollTreasureFind(dice: Dice, partyLevel: number): TreasureFind {
  const tableId = encounterTreasureTableId(partyLevel);
  const result = TREASURE_TABLES.roll(dice, tableId);
  const itemId = result.entry.data?.itemId;
  if (typeof itemId !== "string") throw new Error(`Treasure entry ${tableId}:${result.roll} has no itemId`);
  const rawDef = item(itemId);
  const found = resolveFoundItem(rawDef, nextTraitSeed(dice));
  const qty = typeof result.entry.data?.qty === "number" ? result.entry.data.qty : 1;
  return {
    def: found.def,
    qty,
    quality: treasureQuality(result.entry.data?.treasureQuality, found.def),
    tableId,
    roll: result.roll,
    text: result.entry.text,
    kind: "core",
  };
}

/** Roll one gemstone type from page 222. Pass true for the listed giant-gem x2 result. */
export function rollGemstoneFind(dice: Dice, giant = false): TreasureFind {
  const result = TREASURE_TABLES.roll(dice, "gemstones");
  const gemstoneId = result.entry.data?.gemstoneId;
  if (typeof gemstoneId !== "string") throw new Error(`Gemstone entry ${result.roll} has no gemstoneId`);
  const itemId = `gemstone-${giant ? `giant-${gemstoneId}` : gemstoneId}`;
  const def = item(itemId);
  return {
    def,
    qty: 1,
    quality: "normal",
    tableId: "gemstones",
    roll: result.roll,
    text: `${result.entry.text}${giant ? " [giant gem x2]" : ""}`,
    kind: "gemstone",
  };
}

/** Roll page 223 as two stages: feature d20, then that feature's subtype d4. */
export function rollLuxuryItem(dice: Dice): TreasureFind {
  const featureResult = TREASURE_TABLES.roll(dice, "luxury-features");
  const featureId = featureResult.entry.data?.featureId;
  if (typeof featureId !== "string") throw new Error(`Luxury entry ${featureResult.roll} has no featureId`);
  const feature = LUXURY_FEATURES.find((candidate) => candidate.id === featureId);
  if (!feature) throw new Error(`Unknown luxury feature "${featureId}"`);
  const secondaryRoll = feature.subtypes.length === 1 ? 1 : dice.die(4);
  const itemId = `luxury-${featureId}-${secondaryRoll}`;
  const def = item(itemId);
  return {
    def,
    qty: 1,
    quality: "normal",
    tableId: "luxury-features",
    roll: featureResult.roll,
    secondaryRoll,
    text: `${feature.feature} ${feature.subtypes[secondaryRoll - 1]}`,
    kind: "luxury",
  };
}

/** A cache contains a small handful of independent treasure finds, never one lump reward. */
export function rollTreasureCache(dice: Dice, partyLevel: number): readonly TreasureFind[] {
  const count = dice.between(2, 5);
  return Array.from({ length: count }, () => {
    // Each find chooses a source family independently. The level-based core
    // tables provide currency, mundane valuables, and magic; the two
    // supplemental families add the dedicated gemstone and luxury tables.
    switch (dice.die(3)) {
      case 1: return rollTreasureFind(dice, partyLevel);
      case 2: return rollGemstoneFind(dice);
      default: return rollLuxuryItem(dice);
    }
  });
}

/**
 * Fabled items are selected from magical fabulous/legendary items. If the
 * selected definition has no explicit benefit, force one benefit trait roll;
 * existing curse rolls remain optional and may add a disadvantage.
 */
export function rollFabledItem(dice: Dice): FabledItemFind {
  const pool = allItems().filter((def) =>
    def.tags.includes("magic") && (def.treasureQuality === "fabulous" || def.treasureQuality === "legendary"),
  );
  if (pool.length === 0) throw new Error("No magical fabulous/legendary items available for a fabled find");
  const selected = pool[dice.die(pool.length) - 1]!;
  const withBenefitRoll = selected.benefits?.length || selected.benefitRolls
    ? selected
    : { ...selected, benefitRolls: 1 };
  const found = resolveFoundItem(withBenefitRoll, nextTraitSeed(dice));
  if ((found.def.benefits?.length ?? 0) === 0) {
    throw new Error(`Fabled item ${found.def.name} resolved without a benefit`);
  }
  return { def: found.def, quality: found.def.treasureQuality ?? "fabulous" };
}

export function bestTreasureQuality(findings: readonly { quality: TreasureQuality }[]): TreasureQuality {
  const rank: Record<TreasureQuality, number> = { poor: 0, normal: 1, fabulous: 2, legendary: 3 };
  return findings.reduce<TreasureQuality>(
    (best, finding) => rank[finding.quality] > rank[best] ? finding.quality : best,
    "poor",
  );
}
