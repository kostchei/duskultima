import type { Character } from "./character";
import type { Dice, Advantage } from "./dice";

/** SoloDark's three oracle odds, expressed as the die mode they modify. */
export type OracleOdds = "unlikely" | "even" | "likely";
export type OracleOutcome = "no" | "yes";

export interface OracleResult {
  question: string;
  odds: OracleOdds;
  mode: Advantage;
  natural: number;
  outcome: OracleOutcome;
  twist: boolean;
  turnabout: boolean;
  critical: boolean;
  prompt?: PromptResult;
}

/** The complete SoloDark oracle table: 1-9 no, 10 twist, 11-20 yes. */
export function oracleCheck(
  dice: Dice,
  question: string,
  odds: OracleOdds = "even",
): OracleResult {
  const normalizedQuestion = question.trim();
  if (!normalizedQuestion) throw new Error("Oracle questions cannot be empty");
  const mode: Advantage = odds === "even" ? "normal" : odds === "likely" ? "advantage" : "disadvantage";
  const natural = dice.d20(mode).natural;
  const twist = natural === 10;
  const outcome: OracleOutcome = natural >= 10 ? "yes" : "no";
  return {
    question: normalizedQuestion,
    odds,
    mode,
    natural,
    outcome,
    twist,
    // Odd results other than a natural 1 add a "but" turnabout.
    turnabout: natural > 1 && natural % 2 === 1,
    critical: natural === 1 || natural === 20,
  };
}

export interface PromptResult {
  roll: number;
  verb: string;
  noun: string;
  text: string;
}

const PROMPTS: Readonly<Record<number, readonly [string, string]>> = {
  1: ["Stop", "Fault"], 2: ["Tell", "Life"], 3: ["Trust", "Battle"], 4: ["Prevent", "Lie"],
  5: ["Deliver", "Vice"], 6: ["Dismantle", "Memory"], 7: ["Create", "Burden"], 8: ["Resist", "Treachery"],
  9: ["Imbue", "Trial"], 10: ["Befriend", "Risk"], 11: ["Sneak", "Prosperity"], 12: ["Disagree", "Time"],
  13: ["Illuminate", "Conflict"], 14: ["Assemble", "Light"], 15: ["Free", "Unnatural"], 16: ["Combine", "Information"],
  17: ["Disrupt", "Hope"], 18: ["Demand", "Journey"], 19: ["Obstruct", "Mundane"], 20: ["Push", "Hazard"],
  21: ["Arrive", "Family"], 22: ["Slow", "Obstacle"], 23: ["Overcome", "Doubt"], 24: ["Block", "Freedom"],
  25: ["Consume", "Weakness"], 26: ["Pursue", "Unknown"], 27: ["Reward", "Glory"], 28: ["Expand", "Friend"],
  29: ["Waste", "Discovery"], 30: ["Capture", "Lead"], 31: ["Weaken", "Storm"], 32: ["Reveal", "Enemy"],
  33: ["Investigate", "Integrity"], 34: ["Forbid", "Science"], 35: ["Start", "Asset"], 36: ["Surprise", "Crime"],
  37: ["Endure", "Wisdom"], 38: ["Pull", "Justice"], 39: ["Unleash", "Strife"], 40: ["Avoid", "Disgust"],
  41: ["Advance", "Danger"], 42: ["Agree", "Balance"], 43: ["Deliver", "Nature"], 44: ["Link", "Chaos"],
  45: ["Hinder", "Ambush"], 46: ["Withhold", "Wealth"], 47: ["Lose", "Thought"], 48: ["Evolve", "Dark"],
  49: ["Fortify", "Connection"], 50: ["Punish", "Door"], 51: ["Ignite", "Fear"], 52: ["Awaken", "Sorcery"],
  53: ["Defy", "Honor"], 54: ["Conceal", "Spirit"], 55: ["Invite", "Trust"], 56: ["Break", "Loss"],
  57: ["Allow", "Failure"], 58: ["Open", "Peril"], 59: ["Repel", "Plan"], 60: ["Activate", "Trick"],
  61: ["Gather", "Mind"], 62: ["Give", "Pain"], 63: ["Reverse", "Victory"], 64: ["Warn", "Death"],
  65: ["Confront", "Control"], 66: ["Betray", "Knowledge"], 67: ["Secure", "Secret"], 68: ["Darken", "Kindness"],
  69: ["Flee", "Exploration"], 70: ["Win", "Surprise"], 71: ["Scatter", "Magic"], 72: ["Contain", "Animal"],
  73: ["Assist", "Way"], 74: ["Take", "Essence"], 75: ["Question", "Dream"], 76: ["Drop", "Anger"],
  77: ["Accept", "Vision"], 78: ["Sacrifice", "Safety"], 79: ["Drain", "Result"], 80: ["Hint", "Place"],
  81: ["Fumble", "Path"], 82: ["Fall", "Nourishment"], 83: ["Ascend", "Theft"], 84: ["Protect", "Decay"],
  85: ["Escape", "Truth"], 86: ["Defeat", "People"], 87: ["Mend", "Help"], 88: ["Acquire", "Gear"],
  89: ["Guide", "Idea"], 90: ["Mislead", "Order"], 91: ["Banish", "Success"], 92: ["Uphold", "Barrier"],
  93: ["Build", "Goal"], 94: ["Change", "Luck"], 95: ["Revoke", "Identity"], 96: ["Seek", "Harm"],
  97: ["Destroy", "Wilderness"], 98: ["Uncover", "Motive"], 99: ["Rest", "Shelter"], 100: ["Release", "Power"],
};

export function prompt(dice: Pick<Dice, "die">): PromptResult {
  const roll = dice.die(100);
  const [verb, noun] = PROMPTS[roll]!;
  return { roll, verb, noun, text: `${verb} ${noun}` };
}

export function interpretOracle(dice: Pick<Dice, "die">, result: OracleResult): OracleResult {
  if (!result.twist) return result;
  return { ...result, prompt: prompt(dice) };
}

export interface InitiativeCheck {
  group: "party" | "enemies";
  representativeId: string;
  natural: number;
  modifier: number;
  total: number;
  advantage: Advantage;
}

export interface GroupInitiativeResult {
  first: "party" | "enemies";
  party: InitiativeCheck;
  enemies: InitiativeCheck;
}

/** SoloDark Chaos Mode: call rollRound at the start of every combat round. */
export class ChaosInitiative {
  constructor(
    readonly party: readonly Character[],
    readonly enemies: readonly Character[],
  ) {
    if (!party.length || !enemies.length) throw new Error("Both initiative groups need a representative");
  }

  rollRound(dice: Dice): GroupInitiativeResult {
    return groupInitiative(dice, this.party, this.enemies);
  }
}

/** SoloDark group initiative: one DEX check per side, with ties rerolled. */
export function groupInitiative(
  dice: Dice,
  party: readonly Character[],
  enemies: readonly Character[],
): GroupInitiativeResult {
  if (!party.length || !enemies.length) throw new Error("Both initiative groups need a representative");
  for (let attempt = 0; attempt < 100; attempt++) {
    const partyRep = party[0]!;
    const enemyRep = enemies[0]!;
    const partyRoll = dice.d20(hasInitiativeAdvantage(partyRep) ? "advantage" : "normal");
    const enemyRoll = dice.d20(hasInitiativeAdvantage(enemyRep) ? "advantage" : "normal");
    const partyResult: InitiativeCheck = {
      group: "party", representativeId: partyRep.id, natural: partyRoll.natural,
      modifier: partyRep.mod("DEX"), total: partyRoll.natural + partyRep.mod("DEX"), advantage: partyRoll.mode,
    };
    const enemyResult: InitiativeCheck = {
      group: "enemies", representativeId: enemyRep.id, natural: enemyRoll.natural,
      modifier: enemyRep.mod("DEX"), total: enemyRoll.natural + enemyRep.mod("DEX"), advantage: enemyRoll.mode,
    };
    if (partyResult.total === enemyResult.total) continue;
    return { first: partyResult.total > enemyResult.total ? "party" : "enemies", party: partyResult, enemies: enemyResult };
  }
  throw new Error("Group initiative remained tied for 100 rolls");
}

function hasInitiativeAdvantage(character: Character): boolean {
  return character.effects.some((effect) => effect.hooks.some((hook) => hook.kind === "advantageOn" && hook.applies === "initiative"));
}

/** Natural 20 luck from SoloDark; tokens cap at the number of PCs. */
export function awardNaturalTwentyLuck(character: Character, natural: number, partySize: number): boolean {
  if (natural !== 20) return false;
  if (!Number.isInteger(partySize) || partySize < 1) throw new Error("Party size must be positive");
  return character.gainLuckTokens(1, partySize) > 0;
}
