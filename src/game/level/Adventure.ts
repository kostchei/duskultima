/**
 * Data structures for DuskUltima Adventures, Sites, Room Counts, Biomes, and Shadowdark Goals.
 */

import type { MonsterBiome } from "../../engine";

export type SiteSize = "small" | "medium" | "large";
export type GoalVerb = "Rescue" | "Slay" | "Retrieve" | "Cleanse" | "Investigate";

export interface SiteGoal {
  verb: GoalVerb;
  target: string;
  isRescue: boolean;
  rescueClass?: "thief" | "priest" | "wizard";
  isCompleted: boolean;
  description: string;
}

export interface SiteDef {
  id: string;
  name: string;
  biome: MonsterBiome;
  sizeCategory: SiteSize;
  roomCount: number;
  goal: SiteGoal;
}

export interface Adventure {
  id: string;
  name: string;
  sites: SiteDef[];
  currentSiteIndex: number;
}
