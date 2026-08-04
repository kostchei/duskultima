/**
 * Benefit / curse / virtue / flaw tables for magic items.
 *
 * Treasure rows say how many of each a find rolls ("+2 magic armor (benefit,
 * curse)") and `CORE_TREASURE_ITEM_SPECS` already parses those counts into
 * `benefitRolls` / `curseRolls` / `personality`. This is what they roll on.
 *
 * The entries below are PLACEHOLDERS — a small, deliberately plain set that
 * exercises every wiring path (a stat-independent bonus, a weapon-scoped one, an
 * armor-scoped one, a pure-flavour personality line). Replace the arrays with
 * the real tables; nothing outside this file needs to change, because
 * `rollItemTraits` reads counts off the item and indexes these lists.
 */

import type { EffectHook } from "../../engine";

export interface MagicItemTrait {
  id: string;
  text: string;
  /** Hooks merged into the item's effect while it is equipped. Empty = flavour only. */
  hooks: readonly EffectHook[];
  /** Restricts the trait to items that can take it. Absent = any item. */
  appliesTo?: "weapon" | "armor";
}

export const ITEM_BENEFITS: readonly MagicItemTrait[] = [
  { id: "benefit-keen", text: "Keen: crits on a natural 19 or better.", hooks: [{ kind: "critRange", value: 19 }], appliesTo: "weapon" },
  { id: "benefit-warding", text: "Warding: +1 AC.", hooks: [{ kind: "acBonus", bonus: 1 }], appliesTo: "armor" },
  { id: "benefit-vigor", text: "Vigor: +2 maximum HP.", hooks: [{ kind: "maxHpBonus", bonus: 2 }] },
  { id: "benefit-sure", text: "Sure-handed: +1 to attack rolls.", hooks: [{ kind: "checkBonus", applies: "attack", bonus: 1 }] },
];

export const ITEM_CURSES: readonly MagicItemTrait[] = [
  { id: "curse-heavy", text: "Heavy: -1 to attack rolls.", hooks: [{ kind: "checkBonus", applies: "attack", bonus: -1 }] },
  { id: "curse-brittle", text: "Brittle: -1 AC.", hooks: [{ kind: "acBonus", bonus: -1 }], appliesTo: "armor" },
  { id: "curse-frail", text: "Frail: -2 maximum HP.", hooks: [{ kind: "maxHpBonus", bonus: -2 }] },
];

export const ITEM_VIRTUES: readonly MagicItemTrait[] = [
  { id: "virtue-loyal", text: "Loyal: warms in the hand of one who keeps their word.", hooks: [] },
  { id: "virtue-curious", text: "Curious: strains toward unopened doors.", hooks: [] },
];

export const ITEM_FLAWS: readonly MagicItemTrait[] = [
  { id: "flaw-proud", text: "Proud: sulks when set aside for another item.", hooks: [] },
  { id: "flaw-restless", text: "Restless: hums faintly and will not be quiet.", hooks: [] },
];
