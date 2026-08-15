/**
 * Advancement: XP comes from treasure and boons only. The source advancement
 * table sets XP by destination level, and XP resets when that level is gained.
 * Level-up rolls HP (class hit die) and 2d6 on the class talent table. The CON
 * modifier is included only in the level-1 starting HP calculation.
 */

import type { Character } from "./character";
import type { Dice } from "./dice";
import type { TableRegistry, TableRollResult } from "./tables";
import { applyTalentResultForLevelUp, type AppliedTalent, type TalentChoice } from "./talents";
import { applyClassLevelProgression } from "./classAbilities";

export const MAX_LEVEL = 10;

/** Source Shadowdark advancement table: XP required by destination level. */
const XP_BY_DESTINATION_LEVEL: Readonly<Record<number, number>> = {
  2: 10,
  3: 20,
  4: 20,
  5: 20,
  6: 20,
  7: 20,
  8: 30,
  9: 30,
  10: 30,
};

export function xpToNextLevel(level: number): number {
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) {
    throw new Error(`Invalid level ${level}`);
  }
  return XP_BY_DESTINATION_LEVEL[level + 1] ?? 0;
}

export interface LevelUpResult {
  newLevel: number;
  hpRolled: number;
  hpGained: number;
  talent: TableRollResult | null;
  /** Primary roll plus any chained/rerolled talents actually applied. */
  talents: AppliedTalent[];
  /** Player decisions that must be resolved before the level-up flow continues. */
  pendingChoices: TalentChoice[];
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
  // Shadowdark adds CON to starting HP only. Later levels add the hit-die roll
  // by itself (minimum 1), so a high CON does not compound every level.
  const hpGained = Math.max(1, hpRolled);
  character.increaseMaxHp(hpGained);
  applyClassLevelProgression(character);
  // Leveling restores the character to full (and pulls a dying one back up).
  character.heal(character.maxHp);

  const talentLevel = [3, 5, 7, 9].includes(character.level);
  const application = talentLevel
    ? applyTalentResultForLevelUp(dice, tables, character, tables.roll(dice, talentTableId), `talent-L${character.level}`)
    : { talents: [], pendingChoices: [] };
  const talent = application.talents[0]?.result ?? null;

  return { newLevel: character.level, hpRolled, hpGained, talent, talents: application.talents, pendingChoices: application.pendingChoices };
}

/**
 * XP needed to reach the next level from the character's current progress.
 * Zero at the level cap.
 */
export function xpToReachNextLevel(character: Character): number {
  if (character.level >= MAX_LEVEL) return 0;
  return Math.max(0, xpToNextLevel(character.level) - character.xp);
}
