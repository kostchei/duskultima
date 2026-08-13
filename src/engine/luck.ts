import type { Character } from "./character";
import { resolveCheck, type CheckInput, type CheckResult } from "./check";
import type { Dice } from "./dice";

export interface LuckRerollResult {
  spent: boolean;
  original: CheckResult;
  result: CheckResult;
}

/** Reroll a failed gameplay check; oracle and table rolls must not call this. */
export function rerollFailedCheck(
  dice: Dice,
  input: CheckInput,
  original: CheckResult,
  options: { gameplayRoll?: boolean } = {},
): LuckRerollResult {
  if (original.success) throw new Error("Luck can only reroll a failed check");
  if (options.gameplayRoll === false) {
    return { spent: false, original, result: original };
  }
  if (!input.actor.spendLuckToken()) {
    return { spent: false, original, result: original };
  }
  return { spent: true, original, result: resolveCheck(dice, input) };
}

export function gainNaturalTwentyLuck(character: Character, result: CheckResult, partySize: number): boolean {
  return result.natural === 20 && character.gainLuckTokens(1, partySize) > 0;
}
