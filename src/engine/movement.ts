import type { Character } from "./character";
import { getBaseRole } from "./character";
import { DC, resolveCheck, type CheckResult } from "./check";
import type { Dice } from "./dice";
import { hasHook } from "./effects";
import { hasCapability } from "./potions";

export interface ClimbingResult {
  success: boolean;
  fell: boolean;
  check: CheckResult;
}

export function resolveClimbing(
  dice: Dice,
  character: Character,
  opts: {
    slippery?: boolean;
    hasTimePressure?: boolean;
    hasDireConsequences?: boolean;
  } = {},
): ClimbingResult {
  const dc = opts.slippery ? DC.HARD : DC.NORMAL;
  const check = resolveCheck(dice, {
    actor: character,
    stat: "DEX",
    dc,
    kind: "stat",
    task: "climbing",
    hasTimePressure: opts.hasTimePressure,
    hasDireConsequences: opts.hasDireConsequences ?? true,
    advantage: getBaseRole(character.className) === "thief" ? ["thief climbing"] : undefined,
  });
  return {
    success: check.success,
    fell: !check.success && check.total <= dc - 5,
    check,
  };
}

export interface SwimmingResult {
  safe: boolean;
  canProgress: boolean;
  drowning: boolean;
  damage: number;
  swimCheck?: CheckResult;
  suffocationCheck?: CheckResult;
}

/**
 * Resolve one swimming round. Plate cannot make progress, chain is
 * disadvantaged, rough water requires STR, and exertion beyond CON-safe
 * rounds risks 1d6 suffocation damage.
 */
export function resolveSwimming(
  dice: Dice,
  character: Character,
  roundsSwimming: number,
  isRoughWater: boolean,
): SwimmingResult {
  if (!Number.isInteger(roundsSwimming) || roundsSwimming < 1) {
    throw new Error("Swimming rounds must be a positive integer");
  }
  if (hasCapability(character, "waterBreathing") || hasHook(character.effects, "waterWalking")) {
    return { safe: true, canProgress: true, drowning: false, damage: 0 };
  }

  const plate = character.wornArmor?.armorVisual === "plate";
  const swimDisadvantaged = character.wornArmor?.armor?.swimDisadvantage ?? false;
  const advantage = [
    ...(getBaseRole(character.className) === "thief" ? ["thief swimming"] : []),
    ...(hasHook(character.effects, "seafarer") ? ["seafarer"] : []),
  ];
  const disadvantage = swimDisadvantaged ? [character.wornArmor!.name] : undefined;

  let swimCheck: CheckResult | undefined;
  let canProgress = !plate;
  if (isRoughWater && !plate) {
    swimCheck = resolveCheck(dice, {
      actor: character,
      stat: "STR",
      dc: DC.NORMAL,
      kind: "stat",
      task: "swimming",
      hasTimePressure: true,
      hasDireConsequences: true,
      advantage,
      disadvantage,
    });
    canProgress = swimCheck.success;
  }

  const safeRounds = Math.max(1, character.mod("CON"));
  let suffocationCheck: CheckResult | undefined;
  let damage = 0;
  if (roundsSwimming > safeRounds) {
    suffocationCheck = resolveCheck(dice, {
      actor: character,
      stat: "CON",
      dc: DC.NORMAL,
      kind: "stat",
      task: "swimming",
      hasTimePressure: true,
      hasDireConsequences: true,
      advantage,
      disadvantage,
    });
    if (!suffocationCheck.success) damage = dice.roll("1d6");
  }

  return {
    safe: !plate && damage === 0 && (swimCheck?.success ?? true),
    canProgress,
    drowning: plate || damage > 0,
    damage,
    swimCheck,
    suffocationCheck,
  };
}
