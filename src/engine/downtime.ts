import type { StatName } from "./character";
import type { Dice } from "./dice";

export type CarouseTier = "humble" | "bold" | "legendary";

interface CarouseEvent {
  roll: number;
  title: string;
  text: string;
  xpBonus?: number;
  goldDelta?: number;
  grantsLuck?: boolean;
  effect?: "contact" | "debt" | "bruised";
  itemId?: "ration" | "potion-healing";
}

export interface CarouseResult {
  tier: CarouseTier;
  cost: number;
  xp: number;
  event: CarouseEvent;
}

const CAROUSE_COST: Record<CarouseTier, number> = { humble: 20, bold: 100, legendary: 500 };
const CAROUSE_XP: Record<CarouseTier, number> = { humble: 1, bold: 3, legendary: 7 };

const EVENTS: readonly Omit<CarouseEvent, "roll">[] = [
  { title: "The Watch Arrives", text: "A fine follows the revel.", goldDelta: -10 },
  { title: "A Tab Left Open", text: "A tavern debt will complicate the next negotiation.", effect: "debt" },
  { title: "Tabletop Brawl", text: "Bruised, but with a story worth experience.", xpBonus: 1, effect: "bruised" },
  { title: "Shared Provisions", text: "A grateful reveler presses a ration into your hand.", itemId: "ration" },
  { title: "A Useful Name", text: "A local contact owes you a small favor.", effect: "contact" },
  { title: "Fortune Smiles", text: "The night leaves you improbably lucky.", grantsLuck: true },
  { title: "A Delver's Tale", text: "A hard-won secret sharpens your instincts.", xpBonus: 1 },
  { title: "Friendly Wager", text: "You leave the table richer.", goldDelta: 10 },
  { title: "Apothecary's Toast", text: "A healer gifts you a restorative draught.", itemId: "potion-healing" },
  { title: "Hero of the Taproom", text: "Your name carries through town.", xpBonus: 2, effect: "contact" },
  { title: "Old Map Fragment", text: "A route clue makes the next expedition easier.", xpBonus: 2 },
  { title: "Night of Legends", text: "The revel becomes a story people will repeat.", xpBonus: 3, grantsLuck: true },
];

export function carouseCost(tier: CarouseTier): number {
  return CAROUSE_COST[tier];
}

export function resolveCarouse(dice: Pick<Dice, "die">, tier: CarouseTier, availableGold: number): CarouseResult {
  const cost = carouseCost(tier);
  if (availableGold < cost) throw new Error(`Carousing costs ${cost} gold`);
  const roll = dice.die(12);
  const event = { roll, ...EVENTS[roll - 1]! };
  return { tier, cost, xp: CAROUSE_XP[tier] + (event.xpBonus ?? 0), event };
}

export type TrainingSkill = "athletics" | "stealth" | "lore" | "survival";

export const TRAINING_STAT: Readonly<Record<TrainingSkill, StatName>> = {
  athletics: "STR",
  stealth: "DEX",
  lore: "INT",
  survival: "WIS",
};

export function instructorTrainingDc(previousFailures: number): number {
  if (!Number.isInteger(previousFailures) || previousFailures < 0) throw new Error("Training failures must be non-negative");
  return Math.max(9, 15 - previousFailures * 3);
}

/**
 * Learning a spell from a found scroll.
 *
 * A scroll can always be cast once. A caster resting with one may instead study
 * it: a DC 15 casting-stat check to copy the spell into their repertoire. The
 * scroll is spent either way — that is the wager, and the reason it is offered
 * as a choice at rest rather than applied automatically.
 */
export const SCROLL_LEARNING_DC = 15;

export interface ScrollStudyOption {
  /** Inventory id of the scroll being studied. */
  itemId: string;
  scrollName: string;
  spellId: string;
  spellName: string;
  spellTier: number;
}

/** The caster-facing shape of a scroll, so this stays free of item/spell data. */
export interface ScrollCandidate {
  itemId: string;
  scrollName: string;
  spellId: string;
  spellName: string;
  spellTier: number;
  /** Classes the spell appears on. */
  spellClasses: readonly string[];
}

/**
 * Which carried scrolls this caster could actually study: a spell on their own
 * class list, within the tier they can cast, that they do not already know.
 * A non-caster gets nothing — `castStat` absent means no repertoire to copy into.
 */
export function studyableScrolls(
  candidates: readonly ScrollCandidate[],
  options: {
    castStat: StatName | undefined;
    className: string;
    maximumTier: number;
    knownSpellIds: readonly string[];
  },
): ScrollStudyOption[] {
  if (!options.castStat) return [];
  const known = new Set(options.knownSpellIds);
  const seen = new Set<string>();
  const studyable: ScrollStudyOption[] = [];
  for (const candidate of candidates) {
    if (known.has(candidate.spellId)) continue;
    if (seen.has(candidate.itemId)) continue;
    if (!candidate.spellClasses.includes(options.className)) continue;
    if (candidate.spellTier > options.maximumTier) continue;
    seen.add(candidate.itemId);
    studyable.push({
      itemId: candidate.itemId,
      scrollName: candidate.scrollName,
      spellId: candidate.spellId,
      spellName: candidate.spellName,
      spellTier: candidate.spellTier,
    });
  }
  return studyable;
}
