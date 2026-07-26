import type { ItemDef, TreasureQuality } from "./inventory";

const QUALITY_XP: Readonly<Record<TreasureQuality, number>> = {
  poor: 0,
  normal: 1,
  fabulous: 3,
  legendary: 10,
};

/** RAW awards once per treasure find, based on the best item in that find. */
export function treasureQualityXp(quality: TreasureQuality): number {
  return QUALITY_XP[quality];
}

/** XP value for newly acquired valuables; mundane bought/recovered gear earns none. */
export function treasureItemXp(def: ItemDef): number {
  const treasureLike =
    def.tags.includes("treasure") || def.tags.includes("magic") || def.tags.includes("relic");
  if (!treasureLike) return 0;
  const inferredQuality: TreasureQuality =
    def.treasureQuality ?? ((def.valueGp ?? 0) < 10 ? "poor" : (def.valueGp ?? 0) >= 300 ? "fabulous" : "normal");
  return def.xpValue ?? treasureQualityXp(inferredQuality);
}

export function encounterTreasureTableId(level: number):
  "treasure-0-3" | "treasure-4-6" | "treasure-7-9" | "treasure-10-plus" {
  if (!Number.isInteger(level) || level < 0) throw new Error("Encounter level must be a non-negative integer");
  if (level <= 3) return "treasure-0-3";
  if (level <= 6) return "treasure-4-6";
  if (level <= 9) return "treasure-7-9";
  return "treasure-10-plus";
}
