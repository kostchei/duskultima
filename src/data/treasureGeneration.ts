import { TableRegistry, type Dice, type ItemDef, type TreasureQuality } from "../engine";
import { encounterTreasureTableId } from "../engine/treasureXp";
import { allItems, item } from "./items";
import { resolveFoundItem } from "./magicItemTraitRoll";
import { ALL_TREASURE_TABLES } from "./tables/treasure";

export interface TreasureFind {
  def: ItemDef;
  qty: number;
  quality: TreasureQuality;
  tableId: string;
  roll: number;
  text: string;
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
  };
}

/** A cache contains a small handful of independent treasure finds, never one lump reward. */
export function rollTreasureCache(dice: Dice, partyLevel: number): readonly TreasureFind[] {
  const count = dice.between(2, 5);
  return Array.from({ length: count }, () => rollTreasureFind(dice, partyLevel));
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
