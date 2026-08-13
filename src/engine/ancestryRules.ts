import type { Ancestry, Character } from "./character";
import type { Dice } from "./dice";

export interface AncestryRules {
  ancestry: Ancestry;
  languages: readonly string[];
  feature: string;
  canBeSurprised: boolean;
}

export const ANCESTRY_RULES: Readonly<Record<Ancestry, AncestryRules>> = {
  human: { ancestry: "human", languages: ["Common", "one additional common language"], feature: "Ambitious: one additional level-1 talent roll", canBeSurprised: true },
  dwarf: { ancestry: "dwarf", languages: ["Common", "Dwarvish"], feature: "Stout: roll hit-die gains with advantage", canBeSurprised: true },
  elf: { ancestry: "elf", languages: ["Common", "Elvish", "Sylvan"], feature: "Farsight: +1 ranged attack or +1 spellcasting checks", canBeSurprised: true },
  "half-orc": { ancestry: "half-orc", languages: ["Common", "Orcish"], feature: "Mighty: +1 melee attack and damage", canBeSurprised: true },
  gnome: { ancestry: "gnome", languages: ["Common", "Kobold"], feature: "Keen Senses: cannot be surprised", canBeSurprised: false },
  "tiefling-deva": { ancestry: "tiefling-deva", languages: ["Common"], feature: "Patron blood: choose a lawful or chaotic patron boon", canBeSurprised: true },
};

export function ancestryRules(ancestry: Ancestry): AncestryRules {
  return ANCESTRY_RULES[ancestry];
}

export function canBeSurprised(character: Character): boolean {
  return ANCESTRY_RULES[character.ancestry].canBeSurprised;
}

export function elfRangedOrSpellBonus(character: Character, choice: "ranged" | "spellcasting"): number {
  return character.ancestry === "elf" ? 1 : 0;
}

export function rollHitDieGain(dice: Dice, hitDie: string, ancestry: Ancestry): number {
  const first = dice.roll(hitDie);
  return ancestry === "dwarf" ? Math.max(first, dice.roll(hitDie)) : first;
}

export function humanTalentRolls(ancestry: Ancestry): number {
  return ancestry === "human" ? 2 : 1;
}

export function halfOrcMeleeBonus(ancestry: Ancestry, ranged: boolean): number {
  return ancestry === "half-orc" && !ranged ? 1 : 0;
}
