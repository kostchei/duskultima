/**
 * Resolving a magic item's unrolled qualities.
 *
 * A treasure row states how many benefits/curses/virtues/flaws a find carries;
 * this turns those counts into concrete traits. It is deliberately a pure
 * function of (item, seed) so a reloaded save reproduces the same item, matching
 * how the reward layer derives everything else from a seed rather than dice.
 */

import type { EffectHook, ItemDef } from "../engine";
import {
  ITEM_BENEFITS,
  ITEM_CURSES,
  ITEM_FLAWS,
  ITEM_VIRTUES,
  type MagicItemTrait,
} from "./tables/magicItemTraits";

export interface RolledItemTraits {
  benefits: readonly MagicItemTrait[];
  curses: readonly MagicItemTrait[];
  virtues: readonly MagicItemTrait[];
  flaws: readonly MagicItemTrait[];
  /** Every hook the rolled traits contribute, ready to hang off one Effect. */
  hooks: readonly EffectHook[];
}

function hash(seed: number, salt: number): number {
  let value = (seed ^ (salt * 0x9e3779b9)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
  value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
  return (value ^ (value >>> 15)) >>> 0;
}

/** Traits a given item is eligible for — a weapon cannot roll an armor quality. */
function eligible(table: readonly MagicItemTrait[], def: ItemDef): MagicItemTrait[] {
  return table.filter((trait) => {
    if (trait.appliesTo === "weapon") return def.tags.includes("weapon");
    if (trait.appliesTo === "armor") return def.armor !== undefined;
    return true;
  });
}

/** Draw `count` distinct traits, deterministically, without repeats. */
function draw(
  table: readonly MagicItemTrait[],
  def: ItemDef,
  count: number,
  seed: number,
  salt: number,
): MagicItemTrait[] {
  const pool = eligible(table, def);
  if (pool.length === 0) {
    throw new Error(`${def.name} calls for a trait but no table entry applies to it`);
  }
  const picked: MagicItemTrait[] = [];
  const remaining = [...pool];
  for (let i = 0; i < count && remaining.length > 0; i++) {
    const [trait] = remaining.splice(hash(seed, salt + i) % remaining.length, 1);
    picked.push(trait!);
  }
  return picked;
}

/**
 * Resolve every unrolled quality an item declares. Items with no `benefitRolls`,
 * `curseRolls`, or personality rolls come back empty, so this is safe to call on
 * anything.
 */
export function rollItemTraits(def: ItemDef, seed: number): RolledItemTraits {
  const benefits = draw(ITEM_BENEFITS, def, def.benefitRolls ?? 0, seed, 11);
  const curses = draw(ITEM_CURSES, def, def.curseRolls ?? 0, seed, 29);
  const virtues = draw(ITEM_VIRTUES, def, def.personality?.virtueRolls ?? 0, seed, 47);
  const flaws = draw(ITEM_FLAWS, def, def.personality?.flawRolls ?? 0, seed, 71);
  return {
    benefits,
    curses,
    virtues,
    flaws,
    hooks: [...benefits, ...curses].flatMap((trait) => trait.hooks),
  };
}

/**
 * The item as it is actually found: rolled benefits and curses folded into its
 * printed lists, so inspection, the shop, and the gear screen all show the real
 * article. Hooks stay on the returned traits for the equip layer to apply.
 */
export function resolveFoundItem(def: ItemDef, seed: number): { def: ItemDef; traits: RolledItemTraits } {
  const traits = rollItemTraits(def, seed);
  if (traits.benefits.length === 0 && traits.curses.length === 0
    && traits.virtues.length === 0 && traits.flaws.length === 0) {
    return { def, traits };
  }
  return {
    def: {
      ...def,
      benefits: [...(def.benefits ?? []), ...traits.benefits.map((trait) => trait.text)],
      curses: [...(def.curses ?? []), ...traits.curses.map((trait) => trait.text)],
      benefitRolls: undefined,
      curseRolls: undefined,
    },
    traits,
  };
}
