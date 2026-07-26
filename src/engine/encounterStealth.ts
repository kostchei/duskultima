import type { Character } from "./character";
import type { CheckResult } from "./check";
import { resolveCheck } from "./check";
import type { Dice } from "./dice";
import type { EncounterDistance, MonsterActivity } from "./encounterReaction";

const DISTANCE_DC: Record<EncounterDistance, number> = {
  close: 15,
  near: 12,
  far: 9,
};

/** Far encounters are easier to avoid; sleepers reduce and hunters raise the DC. */
export function encounterStealthDc(distance: EncounterDistance, activity: MonsterActivity): number {
  const activityModifier = activity === "sleeping" ? -3 : activity === "hunting" ? 3 : 0;
  return Math.max(9, Math.min(18, DISTANCE_DC[distance] + activityModifier));
}

export interface PartyStealthResult {
  success: boolean;
  dc: number;
  successes: number;
  required: number;
  checks: readonly CheckResult[];
}

/**
 * Every survivor checks DEX, and a strict majority must pass. This lets a noisy
 * member matter without making a mixed party's chance the product of every roll.
 */
export function resolvePartyEncounterStealth(
  dice: Dice,
  party: readonly Character[],
  distance: EncounterDistance,
  activity: MonsterActivity,
): PartyStealthResult {
  if (party.length === 0) throw new Error("Cannot resolve stealth for an empty party");
  const dc = encounterStealthDc(distance, activity);
  const checks = party.map((actor) => resolveCheck(dice, {
    actor,
    stat: "DEX",
    dc,
    kind: "stealth",
    disadvantage: actor.wornArmor?.armor?.stealthDisadvantage ? [actor.wornArmor.name] : undefined,
  }));
  const successes = checks.filter((check) => check.success).length;
  const required = Math.floor(party.length / 2) + 1;
  return { success: successes >= required, dc, successes, required, checks };
}
