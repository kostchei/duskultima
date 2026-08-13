/**
 * Wandering-encounter reaction roll. Assumes the party is not surprised —
 * the separate hiding/detection system that would make surprise possible is
 * P2-3's own later slice. Every wave gets one activity, one reaction, and a
 * starting distance (shared by the whole group, not rolled per-monster)
 * instead of arriving already hunting. Activity decides which contextual
 * responses are even offered (a sleeping creature can't be parleyed with);
 * reaction decides how hard those responses are to pull off.
 */

import type { Dice } from "./dice";

export type MonsterActivity = "eating" | "guarding" | "sleeping" | "building" | "hunting" | "socializing";
export type MonsterReaction = "hostile" | "suspicious" | "neutral" | "curious" | "friendly";
export type EncounterDistance = "close" | "near" | "far";
export type EncounterChoice =
  | "hide"
  | "ambush"
  | "parley"
  | "offer"
  | "trade"
  | "threaten"
  | "demand-surrender"
  | "surrender"
  | "subdue"
  | "retreat";

export function rollActivity(dice: Dice): MonsterActivity {
  const roll = dice.roll("2d6");
  if (roll <= 4) return "hunting";
  if (roll <= 6) return "eating";
  if (roll <= 8) return "building";
  if (roll <= 10) return "socializing";
  if (roll === 11) return "guarding";
  return "sleeping";
}

export function rollDistance(dice: Dice): EncounterDistance {
  const roll = dice.die(6);
  if (roll === 1) return "close";
  if (roll >= 5) return "far";
  return "near";
}

/** 2d6 bell curve: hostile and friendly are the rare tails, same shape as a reaction roll should have. */
export function rollReaction(dice: Dice): MonsterReaction {
  const roll = dice.roll("2d6");
  if (roll <= 6) return "hostile";
  if (roll <= 8) return "suspicious";
  if (roll === 9) return "neutral";
  if (roll <= 11) return "curious";
  return "friendly";
}

/**
 * Which of the six contextual responses make sense for this activity/
 * resource combination. Ambush, hide, and retreat always make sense — the
 * wave is in "patrol", unaware state at the point this is offered, so the
 * party can always choose to strike first or simply not engage. A sleeping
 * creature can't hear a threat or an offer, so those (and parley) drop out;
 * ambushing a sleeper is exactly what the choice is for.
 */
export function availableEncounterChoices(
  activity: MonsterActivity,
  canOffer: boolean,
  reaction?: MonsterReaction,
  intelligent = true,
): readonly EncounterChoice[] {
  const choices: EncounterChoice[] = ["ambush"];
  if (activity !== "sleeping") {
    choices.push("parley");
    if (canOffer) choices.push("offer");
    if (intelligent && (reaction === "neutral" || reaction === "curious" || reaction === "friendly")) {
      choices.push("trade");
    }
    choices.push("threaten");
    if (intelligent) {
      choices.push("demand-surrender", "subdue");
      if (reaction === "hostile") choices.push("surrender");
    }
  }
  choices.push("hide", "retreat");
  return choices;
}
