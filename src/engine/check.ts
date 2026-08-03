/**
 * The single resolution service: d20 + stat modifier vs DC or AC, roll high.
 * Everything — attacks, spell checks, morale, stabilization — calls resolveCheck.
 */

import type { Advantage } from "./dice";
import { Dice } from "./dice";
import type { Character } from "./character";
import type { StatName } from "./character";
import {
  grantsAdvantage,
  grantsDisadvantage,
  sumCheckBonus,
  type CheckKind,
} from "./effects";

export const DC = {
  EASY: 9,
  NORMAL: 12,
  HARD: 15,
  EXTREME: 18,
} as const;

export interface CheckInput {
  actor: Character;
  stat: StatName;
  dc: number;
  kind: CheckKind;
  /** Situational adv/dis sources with human-readable reasons (for the log/UI). */
  advantage?: readonly string[];
  disadvantage?: readonly string[];
  /** Attacks: crit threshold from the attacker (talents can lower it below 20). */
  critThreshold?: number;
  /** Flat situational modifier supplied by the caller, such as a magic weapon bonus. */
  bonus?: number;
  /** The weapon being swung, so Weapon Mastery bonuses only count for their own weapon. */
  weaponId?: string;
  /** Named trained task, such as climbing, swimming, stealth, or lore. */
  task?: string;
  /** Trained tasks only require a roll when both pressure and dire stakes apply. */
  hasTimePressure?: boolean;
  hasDireConsequences?: boolean;
}

export interface CheckResult {
  success: boolean;
  /** Natural roll >= crit threshold (attacks) or natural 20 (everything else). */
  crit: boolean;
  /** Natural 1 — auto-fail, triggers mishaps on spell checks. */
  fumble: boolean;
  natural: number;
  total: number;
  modifier: number;
  dc: number;
  mode: Advantage;
  rolls: number[];
  advantageReasons: string[];
  disadvantageReasons: string[];
  /** True when training resolved the task without consuming a die roll. */
  automatic: boolean;
}

export function resolveCheck(dice: Dice, input: CheckInput): CheckResult {
  const { actor, stat, dc, kind } = input;

  const advReasons = [...(input.advantage ?? [])];
  const disReasons = [...(input.disadvantage ?? [])];
  if (grantsAdvantage(actor.effects, kind)) advReasons.push("talent");
  if (grantsDisadvantage(actor.effects, kind)) disReasons.push("condition");
  if (kind === "stat" && actor.effects.some((e) => e.hooks.some((h) => h.kind === "advantageOnStat" && h.stat === stat))) {
    advReasons.push("grit");
  }

  const modifier = actor.mod(stat)
    + sumCheckBonus(actor.effects, kind, actor.level, input.weaponId, stat)
    + (input.bonus ?? 0);
  const trained =
    (input.task !== undefined && actor.isTrainedIn(input.task))
    || actor.isTrainedIn(stat);
  if (
    trained
    && !(input.hasTimePressure === true && input.hasDireConsequences === true)
  ) {
    return {
      success: true,
      crit: false,
      fumble: false,
      natural: 10,
      total: dc,
      modifier,
      dc,
      mode: "normal",
      rolls: [],
      advantageReasons: [...advReasons, "trained"],
      disadvantageReasons: disReasons,
      automatic: true,
    };
  }

  // Any advantage + any disadvantage cancel to a normal roll.
  let mode: Advantage = "normal";
  if (advReasons.length > 0 && disReasons.length === 0) mode = "advantage";
  else if (disReasons.length > 0 && advReasons.length === 0) mode = "disadvantage";

  const roll = dice.d20(mode);
  const total = roll.natural + modifier;

  const critAt = kind === "attack" || kind === "meleeAttack" ? (input.critThreshold ?? actor.critThreshold) : 20;
  const fumble = roll.natural === 1;

  // Only a natural 20 auto-succeeds; a talent-lowered crit range still has to hit.
  const success = fumble ? false : roll.natural === 20 ? true : total >= dc;
  const crit = success && roll.natural >= critAt;

  return {
    success,
    crit,
    fumble,
    natural: roll.natural,
    total,
    modifier,
    dc,
    mode,
    rolls: roll.rolls,
    advantageReasons: advReasons,
    disadvantageReasons: disReasons,
    automatic: false,
  };
}

export interface ContestedCheckSide {
  actor: Character;
  stat: StatName;
  kind?: CheckKind;
  advantage?: readonly string[];
  disadvantage?: readonly string[];
  bonus?: number;
  task?: string;
}

export interface ContestedCheckResult {
  winner: Character;
  loser: Character;
  winnerResult: CheckResult;
  loserResult: CheckResult;
  /** Number of opposed rolls made; ties reroll both sides. */
  rounds: number;
}

/** Opposed d20 checks reroll ties until one total is strictly higher. */
export function resolveContestedCheck(
  dice: Dice,
  a: ContestedCheckSide,
  b: ContestedCheckSide,
): ContestedCheckResult {
  for (let rounds = 1; rounds <= 100; rounds++) {
    const resultA = resolveCheck(dice, {
      ...a,
      dc: 0,
      kind: a.kind ?? "stat",
      hasTimePressure: true,
      hasDireConsequences: true,
    });
    const resultB = resolveCheck(dice, {
      ...b,
      dc: 0,
      kind: b.kind ?? "stat",
      hasTimePressure: true,
      hasDireConsequences: true,
    });
    if (resultA.total === resultB.total) continue;
    return resultA.total > resultB.total
      ? { winner: a.actor, loser: b.actor, winnerResult: resultA, loserResult: resultB, rounds }
      : { winner: b.actor, loser: a.actor, winnerResult: resultB, loserResult: resultA, rounds };
  }
  throw new Error("Contested check remained tied for 100 rounds");
}
