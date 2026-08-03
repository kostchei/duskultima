/**
 * The bestiary, assembled from per-zone rosters.
 *
 * Every monster belongs to exactly one zone and carries a Shadowdark level and
 * a battlefield role. Dungeon grids place roles, not names — see
 * `engine/monsterSelect.ts` — so the same climax tile fields a Quillboar
 * Chopper for a level-1 party and a Daeodon for a level-8 one, and always
 * something that belongs to the scroll the party descended under.
 */

import type { MonsterBiome, MonsterDef, MonsterRole } from "../engine";
import { pickMonster } from "../engine";
import type { Dice } from "../engine/dice";
import { DIABLERIE_ROSTER } from "./rosters/diablerie";
import {
  CITY_OF_MASKS_ROSTER,
  DEEP_ROSTER,
  DIABLERIE_HOLDOVERS,
  MIDNIGHT_SUN_ROSTER,
  RED_SANDS_ROSTER,
  RIVER_OF_NIGHT_ROSTER,
} from "./rosters/legacy";
import { assertRosterComplete } from "./rosters/build";

const ROSTERS: Record<MonsterBiome, readonly MonsterDef[]> = {
  "diablerie": [...DIABLERIE_HOLDOVERS, ...DIABLERIE_ROSTER],
  "red-sands": RED_SANDS_ROSTER,
  "midnight-sun": MIDNIGHT_SUN_ROSTER,
  "river-of-night": RIVER_OF_NIGHT_ROSTER,
  "dwellers-in-the-deep": DEEP_ROSTER,
  "city-of-masks": CITY_OF_MASKS_ROSTER,
};

for (const [biome, roster] of Object.entries(ROSTERS) as [MonsterBiome, readonly MonsterDef[]][]) {
  assertRosterComplete(biome, roster);
}

const MONSTER_LIST: readonly MonsterDef[] = Object.values(ROSTERS).flat();

const MONSTERS = new Map(MONSTER_LIST.map((m) => [m.id, m]));
if (MONSTERS.size !== MONSTER_LIST.length) throw new Error("Duplicate monster ids in data");

export function monster(id: string): MonsterDef {
  const def = MONSTERS.get(id);
  if (!def) throw new Error(`Unknown monster "${id}"`);
  return def;
}

export function monstersForBiome(biome: MonsterBiome): readonly MonsterDef[] {
  const roster = ROSTERS[biome];
  if (!roster) throw new Error(`Unknown monster biome "${biome}"`);
  return roster;
}

export function allMonsters(): readonly MonsterDef[] {
  return MONSTER_LIST;
}

/**
 * Resolve a dungeon tile's role into an actual monster for this zone and this
 * party level. Throws when the zone cannot staff the role, which
 * `assertRosterComplete` already rules out at import — so a throw here means a
 * caller invented a role.
 */
export function monsterForRole(
  dice: Dice,
  biome: MonsterBiome,
  role: MonsterRole,
  partyLevel: number,
): MonsterDef {
  return pickMonster(dice, monstersForBiome(biome), role, partyLevel);
}
