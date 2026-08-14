import type { StatName } from "./character";

export type RenownTier = "invisible" | "favorable" | "renowned" | "celebrity";

export interface RenownInfo {
  score: number;
  tier: RenownTier;
  carouseBonus: number;
  reactionBonus: number;
  title: string;
  description: string;
}

/**
 * Calculates the initial renown for a character (starts equal to CHA modifier).
 */
export function initialRenown(chaMod: number): number {
  return chaMod;
}

/**
 * Derives renown details, carousing bonus, and social reaction bonus from total renown score.
 * Western Reaches p.233:
 * - 3 or Less: Invisible, -1 / 0 bonus. Not welcome in upscale places.
 * - 4-7: +1 renown bonus on carouse rolls. Regular folk view favorably. High-status ignore.
 * - 8-11: +2 renown bonus on carouse rolls. Known name. High-status treat as peer.
 * - 12+: +3 renown bonus on carouse rolls. Celebrity. Defer to you.
 */
export function evaluateRenown(score: number): RenownInfo {
  if (score <= 3) {
    return {
      score,
      tier: "invisible",
      carouseBonus: 0,
      reactionBonus: 0,
      title: "Invisible",
      description: "Mostly invisible even to regular folks; not welcome in upscale places.",
    };
  }
  if (score <= 7) {
    return {
      score,
      tier: "favorable",
      carouseBonus: 1,
      reactionBonus: 1,
      title: "Favorable",
      description: "Regular folk view you favorably. High-status people ignore you.",
    };
  }
  if (score <= 11) {
    return {
      score,
      tier: "renowned",
      carouseBonus: 2,
      reactionBonus: 2,
      title: "Renowned",
      description: "You're a known name. High-status people treat you as a peer.",
    };
  }
  return {
    score,
    tier: "celebrity",
    carouseBonus: 3,
    reactionBonus: 3,
    title: "Celebrity",
    description: "Celebrity status, welcome in the most luxurious places. High status defers to you.",
  };
}

export type RenownChangeReason =
  | "level_up"
  | "public_honors"
  | "extravagant_spending"
  | "major_triumph"
  | "public_humiliation"
  | "law_run_in"
  | "fashion_mistake"
  | "cultural_faux_pas"
  | "offended_noble";

/**
 * Returns the net change in renown score for a given event.
 */
export function renownDelta(reason: RenownChangeReason): number {
  switch (reason) {
    case "level_up":
    case "public_honors":
    case "extravagant_spending":
    case "major_triumph":
      return 1;
    case "public_humiliation":
    case "law_run_in":
    case "fashion_mistake":
    case "cultural_faux_pas":
    case "offended_noble":
      return -1;
  }
}
