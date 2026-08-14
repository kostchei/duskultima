/**
 * Data structures for DuskUltima Adventures, Sites, Room Counts, Biomes, and Shadowdark Goals.
 */

import type { ClassName, MonsterBiome } from "../../engine";

export type SiteSize = "small" | "medium" | "large";
export type SiteType = "cave" | "ruins" | "tomb" | "fortress" | "temple" | "lair";
export type GoalVerb = "Rescue" | "Slay" | "Retrieve" | "Cleanse" | "Investigate";
export type GoalKind =
  | "rescue-companion"
  | "fabled-item"
  | "lift-hex"
  | "harvest-components"
  | "treasure-cache"
  | "exotic-materials"
  | "rescue-hostage"
  | "monster-eggs"
  | "assassinate-leader"
  | "secure-chokepoint"
  | "kill-boss"
  | "clear-border";

export type GoalCompletion = "rescue" | "acquire" | "interact" | "defeat-target" | "secure-area";
export type GoalApproach = "combat" | "stealth" | "evasion" | "social";
export type GoalEntityKind = "rescue-companion" | "hostage" | "objective";
export type EggGuardianSize = "medium" | "large" | "huge" | "gargantuan";

export interface SiteGoal {
  /** Stable machine-readable goal identity. */
  kind: GoalKind;
  /** Legacy/display verb retained for existing UI and combat checks. */
  verb: GoalVerb;
  target: string;
  isRescue: boolean;
  rescueClass?: ClassName;
  rescueHeroName?: string;
  completion: GoalCompletion;
  approaches: readonly GoalApproach[];
  /** This is deliberately false for every current goal. Named-target goals
   * require only that target; border goals can resolve through stealth or
   * morale instead of a full extermination. */
  requiresAllHostilesDefeated: boolean;
  targetItemId?: string;
  requiredQuantity?: number;
  treasureQuality?: "fabulous" | "legendary";
  guardianName?: string;
  /** Species whose eggs are being harvested, distinct from the guardian. */
  eggSpeciesId?: string;
  eggSpeciesName?: string;
  guardianMonsterId?: string;
  guardianSize?: EggGuardianSize;
  objectiveEntity?: GoalEntityKind;
  isCompleted: boolean;
  description: string;
}

export interface SiteDef {
  id: string;
  name: string;
  biome: MonsterBiome;
  sizeCategory: SiteSize;
  siteType: SiteType;
  roomCount: number;
  goal: SiteGoal;
}

export interface Adventure {
  id: string;
  name: string;
  sites: SiteDef[];
  currentSiteIndex: number;
  /** Generated once per adventure so downtime stays consistent across its sites. */
  tavernName: string;
  shopName: string;
}

export function goalUsesChest(goal: SiteGoal): boolean {
  return goal.kind === "fabled-item"
    || goal.kind === "treasure-cache"
    || goal.kind === "harvest-components"
    || goal.kind === "exotic-materials"
    || goal.kind === "monster-eggs";
}

export function goalRequiresNamedDefeat(goal: SiteGoal): boolean {
  return goal.completion === "defeat-target";
}
