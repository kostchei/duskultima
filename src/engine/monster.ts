/**
 * Monster stat blocks and monster-side rolls. Monsters are simpler than
 * characters — flat attack bonus, no talents — but share the nat-1/nat-20 rules.
 */

import type { Dice } from "./dice";

export type MonsterBiome =
  | "diablerie"
  | "red-sands"
  | "midnight-sun"
  | "river-of-night"
  | "dwellers-in-the-deep"
  | "city-of-masks";

/**
 * What a monster does in a fight. The dungeon grid places roles, not names —
 * tile `r` is "something vermin lives here", and the active zone's roster
 * decides whether that is a rotgrub swarm or a giant rat. Roles also set how
 * far above or below the party's level a spawn is aimed (see `targetLevel`).
 */
export type MonsterRole =
  | "vermin"
  | "skirmisher"
  | "soldier"
  | "brute"
  | "caster"
  | "champion";

/** Silhouette family the parametric sprite generator draws. */
export type MonsterArchetype =
  | "biped"
  | "brute"
  | "quadruped"
  | "boar"
  | "vermin"
  | "spider"
  | "swarm"
  | "ooze"
  | "skeletal"
  | "flyer"
  | "serpent"
  | "elemental"
  | "centaur"
  | "plant"
  | "avian";

export type MonsterSize = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";

/** Colours the parametric generator paints an archetype with. */
export interface MonsterArt {
  body: number;
  shade: number;
  accent: number;
  eye: number;
  /** Silhouette details the archetype honours where they make sense. */
  features?: readonly MonsterFeature[];
}

export type MonsterFeature =
  | "tusks"
  | "horns"
  | "quills"
  | "mane"
  | "weapon"
  | "robe"
  | "wings"
  | "manyEyes"
  | "tail";

export interface MonsterDef {
  id: string;
  name: string;
  /** Monster level, 0-10. Drives party-level-appropriate spawning. */
  level: number;
  role: MonsterRole;
  ac: number;
  hitDice: string;
  attackBonus: number;
  damage: string;
  wisMod: number;
  /** Horizontal movement in px/s. */
  speed: number;
  archetype: MonsterArchetype;
  size: MonsterSize;
  art: MonsterArt;
  /** Monsters see fine in the dark. */
  darkvision: boolean;
  undead: boolean;
  /** Leader-led groups skip morale while the leader lives; its death breaks them. */
  leader?: boolean;
  xpTier: "minor" | "major" | "legendary";
  biome?: MonsterBiome;
  specialAbility?:
    | "web"
    | "poison"
    | "engulf"
    | "shadow-extinct"
    | "split"
    | "corrode"
    | "thorns";
}

/** Sprite footprint per size band, in pixels. */
export const MONSTER_SIZE_PX: Record<MonsterSize, { w: number; h: number }> = {
  tiny: { w: 18, h: 14 },
  small: { w: 24, h: 24 },
  medium: { w: 30, h: 32 },
  large: { w: 42, h: 40 },
  huge: { w: 58, h: 54 },
  gargantuan: { w: 76, h: 68 },
};

const LEVEL_DAMAGE = [
  "1d4", "1d6", "1d6", "1d8", "1d10", "2d6", "2d6", "2d8", "2d10", "3d8", "3d10",
  "3d12", "4d10", "4d12", "5d10", "5d12", "6d12", "7d12", "8d12", "10d12", "12d12",
  "12d12", "14d12", "16d12", "18d12", "20d12", "24d12", "28d12", "30d12", "40d12",
] as const;

/** AC / to-hit / wisdom shifts that give each role a different feel at one level. */
const ROLE_SHIFT: Record<MonsterRole, { ac: number; hit: number; wis: number; damageStep: number }> = {
  vermin: { ac: -1, hit: 0, wis: -3, damageStep: -1 },
  skirmisher: { ac: 0, hit: 1, wis: -1, damageStep: 0 },
  soldier: { ac: 1, hit: 0, wis: 0, damageStep: 0 },
  brute: { ac: 0, hit: 0, wis: -1, damageStep: 1 },
  caster: { ac: -1, hit: 0, wis: 2, damageStep: 0 },
  champion: { ac: 1, hit: 1, wis: 1, damageStep: 1 },
};

export interface DerivedMonsterStats {
  ac: number;
  hitDice: string;
  attackBonus: number;
  damage: string;
  wisMod: number;
  xpTier: "minor" | "major" | "legendary";
}

/**
 * The stat spine every roster entry starts from, so a level-4 brute in one
 * zone hits about as hard as a level-4 brute in another. Roster entries
 * override individual fields where a monster earns an exception.
 */
export function monsterStatsForLevel(level: number, role: MonsterRole): DerivedMonsterStats {
  if (!Number.isInteger(level) || level < 0 || level > 30) {
    throw new Error(`Monster level must be an integer 0-30, got ${level}`);
  }
  const shift = ROLE_SHIFT[role];
  if (!shift) throw new Error(`Unknown monster role "${role}"`);
  const damageIndex = Math.min(
    LEVEL_DAMAGE.length - 1,
    Math.max(0, level + shift.damageStep),
  );
  return {
    ac: Math.min(24, 10 + Math.ceil(level / 2) + shift.ac),
    hitDice: level === 0 ? "1d4" : `${level}d8`,
    attackBonus: 1 + Math.floor(level / 2) + shift.hit,
    damage: LEVEL_DAMAGE[damageIndex]!,
    wisMod: Math.min(8, Math.floor(level / 3) + shift.wis),
    xpTier: level <= 3 ? "minor" : level <= 7 ? "major" : "legendary",
  };
}

export interface MonsterAttackResult {
  natural: number;
  total: number;
  hit: boolean;
  crit: boolean;
  damage: number;
  appliedCondition?: "webbed" | "poisoned" | "swallowed" | "corroded";
}

export interface MonsterCombatProfile {
  attackBonus: number;
  damage: string;
  specialAbility?: MonsterDef["specialAbility"];
}

export function monsterAttackRoll(
  dice: Dice,
  monster: MonsterCombatProfile,
  targetAc: number,
  mode: "normal" | "advantage" | "disadvantage" = "normal",
): MonsterAttackResult {
  const roll = dice.d20(mode);
  const total = roll.natural + monster.attackBonus;
  const crit = roll.natural === 20;
  const hit = roll.natural !== 1 && (crit || total >= targetAc);
  let damage = 0;
  let appliedCondition: "webbed" | "poisoned" | "swallowed" | "corroded" | undefined;
  if (hit) {
    damage = dice.roll(monster.damage);
    if (crit) damage += dice.roll(monster.damage); // crits double damage dice
    if (monster.specialAbility === "web") appliedCondition = "webbed";
    else if (monster.specialAbility === "poison") appliedCondition = "poisoned";
    else if (monster.specialAbility === "engulf") appliedCondition = "swallowed";
    else if (monster.specialAbility === "corrode") appliedCondition = "corroded";
  }
  return { natural: roll.natural, total, hit, crit, damage, appliedCondition };
}

/**
 * Morale check: DC 15 WIS. Fired when half the group has fallen or the
 * group's leader drops. Failure = flight or surrender.
 */
export function moraleCheck(dice: Dice, monster: MonsterDef): { natural: number; holds: boolean } {
  const roll = dice.d20("normal");
  if (roll.natural === 1) return { natural: 1, holds: false };
  if (roll.natural === 20) return { natural: 20, holds: true };
  return { natural: roll.natural, holds: roll.natural + monster.wisMod >= 15 };
}
