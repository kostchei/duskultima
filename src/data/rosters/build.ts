/**
 * The roster authoring helper.
 *
 * A roster entry states what a monster *is* — its level, its battlefield role,
 * its silhouette and its colours — and lets the level/role spine in
 * `engine/monster.ts` derive the numbers. Only monsters that earn an exception
 * spell out AC, hit dice, damage or speed, which keeps a sixty-entry zone
 * roster readable and keeps two level-4 brutes comparable across zones.
 */

import {
  monsterStatsForLevel,
  type MonsterArchetype,
  type MonsterArt,
  type MonsterBiome,
  type MonsterDef,
  type MonsterRole,
  type MonsterSize,
} from "../../engine";

/** Base px/s by size band, before the archetype's gait multiplier. */
const SIZE_SPEED: Record<MonsterSize, number> = {
  tiny: 110,
  small: 95,
  medium: 85,
  large: 75,
  huge: 62,
  gargantuan: 55,
};

/** How each silhouette moves: a boar charges, an ooze creeps, a plant waits. */
const ARCHETYPE_GAIT: Record<MonsterArchetype, number> = {
  biped: 1,
  brute: 0.9,
  quadruped: 1.25,
  boar: 1.25,
  vermin: 1.2,
  spider: 1.1,
  swarm: 1.15,
  ooze: 0.55,
  skeletal: 0.85,
  flyer: 1.3,
  serpent: 0.9,
  elemental: 1,
  centaur: 1.2,
  plant: 0.4,
  avian: 1.2,
};

export interface MonsterSpec {
  level: number;
  role: MonsterRole;
  archetype: MonsterArchetype;
  size: MonsterSize;
  art: MonsterArt;
  /** Overrides the size/gait derivation when a monster's pace is its identity. */
  speed?: number;
  darkvision?: boolean;
  undead?: boolean;
  /** Defaults to true for champions, which command their room's morale group. */
  leader?: boolean;
  specialAbility?: MonsterDef["specialAbility"];
  ac?: number;
  hitDice?: string;
  attackBonus?: number;
  damage?: string;
  wisMod?: number;
}

function derivedSpeed(size: MonsterSize, archetype: MonsterArchetype): number {
  const base = SIZE_SPEED[size];
  if (base === undefined) throw new Error(`Unknown monster size "${size}"`);
  const gait = ARCHETYPE_GAIT[archetype];
  if (gait === undefined) throw new Error(`Unknown monster archetype "${archetype}"`);
  return Math.round(base * gait);
}

/** Build one roster entry for a zone. */
export function mon(
  biome: MonsterBiome,
  id: string,
  name: string,
  spec: MonsterSpec,
): MonsterDef {
  const derived = monsterStatsForLevel(spec.level, spec.role);
  return {
    id,
    name,
    level: spec.level,
    role: spec.role,
    ac: spec.ac ?? derived.ac,
    hitDice: spec.hitDice ?? derived.hitDice,
    attackBonus: spec.attackBonus ?? derived.attackBonus,
    damage: spec.damage ?? derived.damage,
    wisMod: spec.wisMod ?? derived.wisMod,
    speed: spec.speed ?? derivedSpeed(spec.size, spec.archetype),
    archetype: spec.archetype,
    size: spec.size,
    art: spec.art,
    darkvision: spec.darkvision ?? true,
    undead: spec.undead ?? false,
    leader: spec.leader ?? spec.role === "champion",
    xpTier: derived.xpTier,
    biome,
    specialAbility: spec.specialAbility,
  };
}

/**
 * Every dungeon tile role a level can place. A roster that cannot staff one of
 * these leaves a grid tile unfillable, so rosters are checked against this list
 * when the data module loads.
 */
const REQUIRED_ROLES: readonly MonsterRole[] = [
  "vermin",
  "skirmisher",
  "soldier",
  "brute",
  "caster",
  "champion",
];

/** Fail loudly at import time rather than mid-run on an unfillable tile. */
export function assertRosterComplete(biome: MonsterBiome, roster: readonly MonsterDef[]): void {
  for (const role of REQUIRED_ROLES) {
    if (!roster.some((m) => m.role === role)) {
      throw new Error(`Zone "${biome}" roster declares no monster with role "${role}"`);
    }
  }
}
