import type { StatName } from "./character";
import type { Dice } from "./dice";

export type CarouseTier =
  | "worthy-night"
  | "full-revelry"
  | "tavern-crawl"
  | "finest-voyage"
  | "weeklong-bender"
  | "ten-day-fete"
  | "legendary-weeks";

interface CarouseEvent {
  roll: number;
  total: number;
  title: string;
  text: string;
  xp: number;
  goldDelta?: number;
  treasureQuality?: "fabulous" | "legendary";
  itemId?: "ration" | "potion-healing";
}

export interface CarouseResult {
  tier: CarouseTier;
  cost: number;
  xp: number;
  event: CarouseEvent;
}

const CAROUSE_OPTIONS: Readonly<Record<CarouseTier, { cost: number; bonus: number }>> = {
  "worthy-night": { cost: 30, bonus: 0 },
  "full-revelry": { cost: 100, bonus: 1 },
  "tavern-crawl": { cost: 300, bonus: 2 },
  "finest-voyage": { cost: 600, bonus: 3 },
  "weeklong-bender": { cost: 900, bonus: 4 },
  "ten-day-fete": { cost: 1_200, bonus: 5 },
  "legendary-weeks": { cost: 1_800, bonus: 6 },
};

const EVENTS: Readonly<Record<number, Omit<CarouseEvent, "roll" | "total">>> = {
  1: { title: "A Blearily Ordinary Morning", text: "You wake up in your bed.", xp: 2 },
  2: { title: "The Stocks", text: "You are locked in the stocks for 1d4 days and fined for setting a building on fire.", xp: 2 },
  3: { title: "The Gutter", text: "You wake up in a gutter with half your wealth missing.", xp: 3 },
  4: { title: "A Charming Priest", text: "You hazily remember donating 40% of your wealth to a charming priest.", xp: 3 },
  5: { title: "A Full-Tavern Brawl", text: "You are fined 30% of your wealth after instigating a full-tavern brawl.", xp: 3 },
  6: { title: "A Rigged Bet", text: "The Thieves' Guild bilked you in a rigged bet for 20% of your wealth.", xp: 4 },
  7: { title: "The Noble's Song", text: "You lead an entire tavern in a wildly insulting song about a disliked noble.", xp: 4 },
  8: { title: "Blindfolded Knives", text: "You survive a blindfolded knife-throwing demonstration unscathed.", xp: 4 },
  9: { title: "The Honor Duel", text: "By talent or trickery, you beat a rival adventurer in an honor duel.", xp: 5 },
  10: { title: "Reflected Sorcery", text: "You reflect an angry wizard's deadly spell off your cup.", xp: 5 },
  11: { title: "The Merchant's Prank", text: "You perform a humiliating prank on a despised, corrupt merchant.", xp: 5 },
  12: { title: "The Drinking Contest", text: "You defeat a noble in a highly wagered drinking contest.", xp: 5 },
  13: { title: "The Sorcerer's Tower", text: "You pull off an ill-advised heist inside a feared sorcerer's tower.", xp: 3, treasureQuality: "fabulous" },
  14: { title: "The Ruler's Heirloom", text: "You wake inside the local ruler's dwelling holding a priceless heirloom. Gain the legendary treasure's XP if you escape.", xp: 4, treasureQuality: "legendary" },
};

export function carouseCost(tier: CarouseTier): number {
  return CAROUSE_OPTIONS[tier].cost;
}

export function resolveCarouse(dice: Pick<Dice, "die">, tier: CarouseTier, availableGold: number): CarouseResult {
  const cost = carouseCost(tier);
  if (availableGold < cost) throw new Error(`Carousing costs ${cost} gold`);
  const roll = dice.die(8);
  const total = roll + CAROUSE_OPTIONS[tier].bonus;
  const event = { roll, total, ...EVENTS[total]! };
  return { tier, cost, xp: event.xp, event };
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
