/**
 * Advancement: XP comes from treasure and boons only. The XP requirement is
 * the value listed for the next level, and XP resets when that level is gained.
 * Level-up rolls HP (class hit die + CON) and 2d6 on the class talent table.
 */

import type { Character } from "./character";
import type { Dice } from "./dice";
import type { TableRegistry, TableRollResult } from "./tables";
import { applyTalentResult, type AppliedTalent } from "./talents";

export const MAX_LEVEL = 10;

/** XP required after resetting to advance from each current level: level x 10. */
const XP_TO_NEXT_LEVEL: Readonly<Record<number, number>> = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
  6: 60,
  7: 70,
  8: 80,
  9: 90,
  10: 0,
};

export function xpToNextLevel(level: number): number {
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) {
    throw new Error(`Invalid level ${level}`);
  }
  return XP_TO_NEXT_LEVEL[level]!;
}

export interface LevelUpResult {
  newLevel: number;
  hpRolled: number;
  hpGained: number;
  talent: TableRollResult;
  /** Primary roll plus any chained/rerolled talents actually applied. */
  talents: AppliedTalent[];
}

export interface XpAward {
  amount: number;
  leveledUp: boolean;
}

/** Award XP. Returns whether a level-up is now pending (caller triggers levelUp for the UI moment). */
export function awardXp(character: Character, amount: number): XpAward {
  if (amount < 1) throw new Error(`XP award must be >= 1, got ${amount}`);
  character.xp += amount;
  return { amount, leveledUp: canLevelUp(character) };
}

export function canLevelUp(character: Character): boolean {
  return character.level < MAX_LEVEL && character.xp >= xpToNextLevel(character.level);
}

export function levelUp(
  dice: Dice,
  tables: TableRegistry,
  character: Character,
  hitDie: string,
  talentTableId: string,
): LevelUpResult {
  if (!canLevelUp(character)) {
    throw new Error(
      `${character.name} has ${character.xp}/${xpToNextLevel(character.level)} XP — cannot level up`,
    );
  }
  // Shadowdark resets the running total on every level-up; it does not carry
  // excess XP into the next level.
  character.xp = 0;
  character.level++;

  const hpRolled = character.ancestry === "dwarf"
    ? Math.max(dice.roll(hitDie), dice.roll(hitDie))
    : dice.roll(hitDie);
  const hpGained = Math.max(1, hpRolled + character.mod("CON"));
  character.increaseMaxHp(hpGained);
  // Leveling restores the character to full (and pulls a dying one back up).
  character.heal(character.maxHp);

  const talent = tables.roll(dice, talentTableId);
  const talents = applyTalentResult(dice, tables, character, talent, `talent-L${character.level}`);

  return { newLevel: character.level, hpRolled, hpGained, talent, talents };
}

/**
 * XP needed to reach the next level from the character's current progress.
 * Zero at the level cap.
 */
export function xpToReachNextLevel(character: Character): number {
  if (character.level >= MAX_LEVEL) return 0;
  return Math.max(0, xpToNextLevel(character.level) - character.xp);
}
