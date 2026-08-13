import type { ItemDef, TreasureQuality } from "./inventory";

const QUALITY_XP: Readonly<Record<TreasureQuality, number>> = {
  poor: 0,
  normal: 2,
  fabulous: 3,
  legendary: 4,
};

/** RAW awards once per treasure find, based on the best item in that find. */
export function treasureQualityXp(quality: TreasureQuality): number {
  return QUALITY_XP[quality];
}

/** XP value for newly acquired valuables; quality is contextual, not price-based. */
export function treasureItemXp(def: ItemDef): number {
  const treasureLike =
    def.tags.includes("treasure") || def.tags.includes("magic") || def.tags.includes("relic");
  if (!treasureLike) return 0;
  if (def.xpValue !== undefined) return def.xpValue;
  return def.treasureQuality === undefined ? 0 : treasureQualityXp(def.treasureQuality);
}

export function encounterTreasureTableId(level: number):
  "treasure-0-3" | "treasure-4-6" | "treasure-7-9" | "treasure-10-plus" {
  if (!Number.isInteger(level) || level < 0) throw new Error("Encounter level must be a non-negative integer");
  if (level <= 3) return "treasure-0-3";
  if (level <= 6) return "treasure-4-6";
  if (level <= 9) return "treasure-7-9";
  return "treasure-10-plus";
}
