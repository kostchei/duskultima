import type { StatName } from "./character";
import type { Dice } from "./dice";

export type CarouseTier = "humble" | "bold" | "legendary";

export interface CarouseEvent {
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
