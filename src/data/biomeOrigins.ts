/**
 * Which classes a character can be created as, keyed by the biome they call
 * home, and which classes can only ever be gained by rescuing them on-site.
 * Sourced from the Cursed Scroll campaign's class/zone table.
 */

import type { ClassName } from "../engine/character";
import type { MonsterBiome } from "../engine/monster";

export const BIOME_DISPLAY_NAMES: Readonly<Record<MonsterBiome, string>> = {
  "diablerie": "Diablerie",
  "red-sands": "Red Sands",
  "midnight-sun": "Midnight Sun",
  "river-of-night": "River of Night",
  "dwellers-in-the-deep": "Dwellers in the Deep",
  "city-of-masks": "City of Masks",
};

/** Playable at character creation in every biome. */
export const UNIVERSAL_CLASSES: readonly ClassName[] = [
  "fighter", "cleric", "magic-user", "thief", "monk", "necromancer", "paladin",
];

/** Playable at character creation, but only when that biome is chosen as home. */
export const ZONE_LOCKED_CLASSES: Readonly<Partial<Record<MonsterBiome, ClassName>>> = {
  "city-of-masks": "bard",
  "river-of-night": "ranger",
  "midnight-sun": "seawolf",
  "diablerie": "warlock",
};

/** Never playable at creation — obtainable only by rescuing one from its home biome. */
export const RECOVERABLE_CLASSES_BY_BIOME: Readonly<Record<MonsterBiome, readonly ClassName[]>> = {
  "diablerie": [],
  "red-sands": ["basilisk-warrior", "ras-godai", "pit-fighter"],
  "midnight-sun": [],
  "river-of-night": [],
  "dwellers-in-the-deep": ["delver"],
  "city-of-masks": ["roustabout", "duelist"],
};

/** Every class playable at character creation: the 7 universal plus the 4 zone-locked. */
export const ALL_CREATION_CLASSES: readonly ClassName[] = [
  ...UNIVERSAL_CLASSES,
  ...(Object.values(ZONE_LOCKED_CLASSES) as ClassName[]),
];

/** The one biome a zone-locked class can call home, or undefined for a universal class. */
export function zoneLockedBiomeForClass(cls: ClassName): MonsterBiome | undefined {
  const entry = (Object.entries(ZONE_LOCKED_CLASSES) as [MonsterBiome, ClassName][])
    .find(([, lockedClass]) => lockedClass === cls);
  return entry?.[0];
}

/** Rescue-eligible classes for a site's biome — the recoverable roster only. */
export function classesForBiome(biome: MonsterBiome): readonly ClassName[] {
  return RECOVERABLE_CLASSES_BY_BIOME[biome];
}
