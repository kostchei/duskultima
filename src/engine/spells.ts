/**
 * Spellcasting state machine. No slots: casting is a spell check
 * (d20 + INT/WIS vs DC 10 + tier). Failure loses the spell until rest.
 * Nat 1: wizards roll the mishap table; priests are cut off (atonement).
 * Nat 20: effect/duration doubled.
 */

import { getBaseRole, type Alignment, type Character, type StatName } from "./character";
import { resolveCheck, type CheckResult } from "./check";
import type { Dice } from "./dice";
import type { TableRegistry, TableRollResult } from "./tables";

export type SpellClass = "wizard" | "priest" | "witch" | "seer" | "necromancer";
export type SpellClasses = SpellClass | readonly SpellClass[];

export interface SpellDef {
  id: string;
  name: string;
  tier: number;
  /** A spell can appear on more than one class list. */
  class: SpellClasses;
  /** "self" | "close" | "near" | "far" */
  range: string;
  /** Ends when the caster takes damage or drops focus. */
  focus: boolean;
  /** Dice healed/dealt, when applicable, e.g. "1d4". */
  dice?: string;
  /** Real-time duration for lingering spells (e.g. light), ms. */
  durationMs?: number;
  description: string;
  /** Game-facing selection shape; omitted spells resolve unambiguously. */
  target?: "self" | "ally" | "enemy" | "point" | "object" | "direction";
  /** A second explicit decision such as Prismatic Orb's energy. */
  choices?: readonly string[];
  /** Alignment-restricted class spell from a Cursed Scroll list. */
  alignment?: "law" | "chaos";
}

export interface AlignmentSpellOption {
  id: string;
  name: string;
  tier: number;
  class: "wizard" | "priest";
  alignment: "law" | "chaos";
}

/** Alignment expands the spell list available to wizard and priest casters. */
export const ALIGNMENT_SPELLS: readonly AlignmentSpellOption[] = [
  { id: "cleanse", name: "Cleanse", tier: 1, class: "wizard", alignment: "law" },
  { id: "flare", name: "Flare", tier: 1, class: "wizard", alignment: "law" },
  { id: "reveal", name: "Reveal", tier: 1, class: "wizard", alignment: "law" },
  { id: "ward", name: "Ward", tier: 1, class: "wizard", alignment: "law" },
  { id: "absorb", name: "Absorb", tier: 2, class: "wizard", alignment: "law" },
  { id: "meld", name: "Meld", tier: 2, class: "wizard", alignment: "law" },
  { id: "pacify", name: "Pacify", tier: 2, class: "wizard", alignment: "law" },
  { id: "push-pull", name: "Push/Pull", tier: 2, class: "wizard", alignment: "law" },
  { id: "banish", name: "Banish", tier: 3, class: "wizard", alignment: "law" },
  { id: "forbid", name: "Forbid", tier: 3, class: "wizard", alignment: "law" },
  { id: "identify", name: "Identify", tier: 3, class: "wizard", alignment: "law" },
  { id: "speak-with-object", name: "Speak With Object", tier: 3, class: "wizard", alignment: "law" },
  { id: "glyph", name: "Glyph", tier: 4, class: "wizard", alignment: "law" },
  { id: "stasis", name: "Stasis", tier: 4, class: "wizard", alignment: "law" },
  { id: "abjure", name: "Abjure", tier: 5, class: "wizard", alignment: "law" },
  { id: "permanence", name: "Permanence", tier: 5, class: "wizard", alignment: "law" },
  { id: "blight", name: "Blight", tier: 1, class: "wizard", alignment: "chaos" },
  { id: "eyebite", name: "Eyebite", tier: 1, class: "wizard", alignment: "chaos" },
  { id: "mischief", name: "Mischief", tier: 1, class: "wizard", alignment: "chaos" },
  { id: "protection-from-good", name: "Protection From Good", tier: 1, class: "wizard", alignment: "chaos" },
  { id: "envenom", name: "Envenom", tier: 2, class: "wizard", alignment: "chaos" },
  { id: "phantoms", name: "Phantoms", tier: 2, class: "wizard", alignment: "chaos" },
  { id: "wither", name: "Wither", tier: 2, class: "wizard", alignment: "chaos" },
  { id: "wrack", name: "Wrack", tier: 2, class: "wizard", alignment: "chaos" },
  { id: "betrayal", name: "Betrayal", tier: 3, class: "wizard", alignment: "chaos" },
  { id: "defile", name: "Defile", tier: 3, class: "wizard", alignment: "chaos" },
  { id: "mazzims-mesmerism", name: "Mazzim's Mesmerism", tier: 3, class: "wizard", alignment: "chaos" },
  { id: "unlife", name: "Unlife", tier: 3, class: "wizard", alignment: "chaos" },
  { id: "dismember", name: "Dismember", tier: 4, class: "wizard", alignment: "chaos" },
  { id: "dominate", name: "Dominate", tier: 4, class: "wizard", alignment: "chaos" },
  { id: "feeblemind", name: "Feeblemind", tier: 5, class: "wizard", alignment: "chaos" },
  { id: "subjugate", name: "Subjugate", tier: 5, class: "wizard", alignment: "chaos" },
  { id: "prayer", name: "Prayer", tier: 1, class: "priest", alignment: "law" },
  { id: "fortify", name: "Fortify", tier: 1, class: "priest", alignment: "law" },
  { id: "consecrate", name: "Consecrate", tier: 2, class: "priest", alignment: "law" },
  { id: "peace", name: "Peace", tier: 2, class: "priest", alignment: "law" },
  { id: "covenant", name: "Covenant", tier: 3, class: "priest", alignment: "law" },
  { id: "revitalize", name: "Revitalize", tier: 3, class: "priest", alignment: "law" },
  { id: "halo", name: "Halo", tier: 4, class: "priest", alignment: "law" },
  { id: "wheel-of-flames", name: "Wheel of Flames", tier: 4, class: "priest", alignment: "law" },
  { id: "death-ward", name: "Death Ward", tier: 5, class: "priest", alignment: "law" },
  { id: "rapture", name: "Rapture", tier: 5, class: "priest", alignment: "law" },
  { id: "darkness", name: "Darkness", tier: 1, class: "priest", alignment: "chaos" },
  { id: "protection-from-good-priest", name: "Protection From Good", tier: 1, class: "priest", alignment: "chaos" },
  { id: "extract", name: "Extract", tier: 2, class: "priest", alignment: "chaos" },
  { id: "inflict-wounds", name: "Inflict Wounds", tier: 2, class: "priest", alignment: "chaos" },
  { id: "blood-rite", name: "Blood Rite", tier: 3, class: "priest", alignment: "chaos" },
  { id: "rend", name: "Rend", tier: 3, class: "priest", alignment: "chaos" },
  { id: "contagion", name: "Contagion", tier: 4, class: "priest", alignment: "chaos" },
  { id: "unhinge", name: "Unhinge", tier: 4, class: "priest", alignment: "chaos" },
  { id: "damnation", name: "Damnation", tier: 5, class: "priest", alignment: "chaos" },
  { id: "harm", name: "Harm", tier: 5, class: "priest", alignment: "chaos" },
];

export function alignmentSpellOptionsFor(className: string, alignment: Alignment): readonly AlignmentSpellOption[] {
  const spellClass = className === "wizard" || className === "magic-user" ? "wizard" : className === "priest" || className === "cleric" ? "priest" : null;
  return spellClass ? ALIGNMENT_SPELLS.filter((entry) => entry.class === spellClass && entry.alignment === alignment) : [];
}

type CastOutcome = "success" | "crit" | "fail" | "pendingMishap" | "mishap";
export type CastSource = "known" | "item";
export type MishapDecision = "spendLuck" | "accept";

export interface CastResult {
  spell: SpellDef;
  check: CheckResult;
  outcome: CastOutcome;
  /** Effect doubled (crit). */
  doubled: boolean;
  /** Wizard nat-1 consequence, rolled live. */
  mishap?: TableRollResult;
  /** Guards a pending natural 1 from being accepted after it was rerolled, or applied twice. */
  mishapResolution?: "accepted" | "discarded";
}

const CAST_STAT: Record<string, StatName> = {
  wizard: "INT",
  "magic-user": "INT",
  priest: "WIS",
  cleric: "WIS",
  witch: "CHA",
  seer: "WIS",
  necromancer: "CHA",
};

export const WIZARD_MISHAP_TABLE_TIER_1_2 = "wizard-mishaps-tier-1-2";
export const WIZARD_MISHAP_TABLE_TIER_3_4 = "wizard-mishaps-tier-3-4";
export const WIZARD_MISHAP_TABLE_TIER_5 = "wizard-mishaps-tier-5";
export const WITCH_MISHAP_TABLE_TIER_1_2 = "witch-mishaps-tier-1-2";
export const WITCH_MISHAP_TABLE_TIER_3_4 = "witch-mishaps-tier-3-4";
export const WITCH_MISHAP_TABLE_TIER_5 = "witch-mishaps-tier-5";

/** Select the increasingly dangerous mishap table for the spell's tier. */
export function wizardMishapTableId(tier: number): string {
  if (tier <= 0 || tier > 5) throw new Error(`Invalid spell tier ${tier}`);
  if (tier <= 2) return WIZARD_MISHAP_TABLE_TIER_1_2;
  if (tier <= 4) return WIZARD_MISHAP_TABLE_TIER_3_4;
  return WIZARD_MISHAP_TABLE_TIER_5;
}

export function witchMishapTableId(tier: number): string {
  if (tier <= 0 || tier > 5) throw new Error(`Invalid spell tier ${tier}`);
  if (tier <= 2) return WITCH_MISHAP_TABLE_TIER_1_2;
  if (tier <= 4) return WITCH_MISHAP_TABLE_TIER_3_4;
  return WITCH_MISHAP_TABLE_TIER_5;
}

export function mishapTableId(caster: Character, tier: number): string | undefined {
  if (caster.className === "witch") return witchMishapTableId(tier);
  return getBaseRole(caster.className) === "wizard" ? wizardMishapTableId(tier) : undefined;
}

export function castingStat(spellClass: SpellClass): StatName {
  return CAST_STAT[spellClass] ?? "INT";
}

function casterStat(caster: Character, _spell: SpellDef): StatName {
  return CAST_STAT[caster.className] ?? "INT";
}

export function spellClasses(spell: SpellDef): readonly SpellClass[] {
  return typeof spell.class === "string" ? [spell.class] : spell.class;
}

export function canCastSpellClass(caster: Character, spellClass: SpellClasses): boolean {
  const allowed = typeof spellClass === "string" ? [spellClass] : spellClass;
  if (allowed.includes(caster.className as SpellClass)) return true;
  if (caster.className === "cleric" && allowed.includes("priest")) return true;
  if (caster.className === "magic-user" && allowed.includes("wizard")) return true;
  return false;
}

/** Beginning any new spell ends the caster's previous Focus effect. */
function dropFocus(caster: Character): void {
  caster.effects = caster.effects.filter((effect) => effect.duration?.unit !== "focus");
}

function consumeOneShotCastEffects(caster: Character): void {
  caster.removeEffect("item:witchknife-blood");
}

function pendingMishap(
  dice: Dice,
  tables: TableRegistry,
  caster: Character,
  spell: SpellDef,
  check: CheckResult,
): CastResult {
  const tableId = mishapTableId(caster, spell.tier);
  const mishap = tableId ? tables.roll(dice, tableId) : undefined;
  return { spell, check, outcome: "pendingMishap", doubled: false, mishap };
}

export function castSpell(
  dice: Dice,
  tables: TableRegistry,
  caster: Character,
  spell: SpellDef,
  opts: { advantage?: readonly string[]; disadvantage?: readonly string[] } = {},
): CastResult {
  const known = caster.knownSpell(spell.id);
  if (known.status === "lost") {
    throw new Error(`${spell.name} is lost until ${caster.name} rests`);
  }
  if (!canCastSpellClass(caster, spell.class)) {
    throw new Error(`${caster.name} (${caster.className}) cannot cast ${spellClasses(spell).join("/")} spells`);
  }
  dropFocus(caster);

  const check = resolveCheck(dice, {
    actor: caster,
    stat: casterStat(caster, spell),
    dc: 10 + spell.tier,
    kind: "spellcast",
    advantage: [
      ...(opts.advantage ?? []),
      ...(caster.ancestry === "elf" ? ["elven spellcraft"] : []),
      ...(caster.effects.some((effect) => effect.hooks.some((hook) => hook.kind === "advantageOnSpell" && hook.spellId === spell.id)) ? ["talent"] : []),
    ],
    disadvantage: opts.disadvantage,
  });
  consumeOneShotCastEffects(caster);

  if (check.fumble) {
    return pendingMishap(dice, tables, caster, spell, check);
  }

  if (!check.success) {
    known.status = "lost";
    return { spell, check, outcome: "fail", doubled: false };
  }

  return {
    spell,
    check,
    outcome: check.natural === 20 ? "crit" : "success",
    doubled: check.natural === 20,
  };
}

/**
 * Cast a spell supplied by an item. This uses the normal class list, DC,
 * advantage, critical, and mishap rules but never reads or mutates a known
 * spell slot; the caller owns scroll/wand consumption state.
 */
export function castSpellFromItem(
  dice: Dice,
  tables: TableRegistry,
  caster: Character,
  spell: SpellDef,
  opts: { advantage?: readonly string[]; disadvantage?: readonly string[] } = {},
): CastResult {
  if (!canCastSpellClass(caster, spell.class)) {
    throw new Error(`${caster.name} (${caster.className}) cannot cast ${spellClasses(spell).join("/")} spells`);
  }
  dropFocus(caster);

  const check = resolveCheck(dice, {
    actor: caster,
    stat: casterStat(caster, spell),
    dc: 10 + spell.tier,
    kind: "spellcast",
    advantage: [
      ...(opts.advantage ?? []),
      ...(caster.ancestry === "elf" ? ["elven spellcraft"] : []),
    ],
    disadvantage: opts.disadvantage,
  });
  consumeOneShotCastEffects(caster);

  if (check.fumble) {
    return pendingMishap(dice, tables, caster, spell, check);
  }
  if (!check.success) return { spell, check, outcome: "fail", doubled: false };
  return {
    spell,
    check,
    outcome: check.natural === 20 ? "crit" : "success",
    doubled: check.natural === 20,
  };
}

/** Commit a previewed natural-1 consequence exactly once. */
export function acceptPendingMishap(
  caster: Character,
  pending: CastResult,
  source: CastSource,
): CastResult {
  if (pending.outcome !== "pendingMishap") throw new Error("Cast has no pending mishap");
  if (pending.mishapResolution) throw new Error(`Pending mishap was already ${pending.mishapResolution}`);
  pending.mishapResolution = "accepted";
  if (source === "known") {
    const known = caster.knownSpell(pending.spell.id);
    known.status = "lost";
    if (getBaseRole(caster.className) === "priest") known.requiresAtonement = true;
  }
  return { ...pending, outcome: "mishap", mishapResolution: "accepted" };
}

/** Permanently invalidate a preview because Luck is rerolling that check. */
export function discardPendingMishap(pending: CastResult): void {
  if (pending.outcome !== "pendingMishap") throw new Error("Cast has no pending mishap");
  if (pending.mishapResolution) throw new Error(`Pending mishap was already ${pending.mishapResolution}`);
  pending.mishapResolution = "discarded";
}

/** Atomically spend Luck and invalidate the exact consequence being rerolled. */
export function spendLuckOnPendingMishap(caster: Character, pending: CastResult): void {
  if (!caster.luckToken) throw new Error(`${caster.name} has no Luck token`);
  discardPendingMishap(pending);
  caster.spendLuckToken();
}

/** Player decisions valid for this exact unresolved natural-1 result. */
export function availableMishapDecisions(
  caster: Character,
  pending: CastResult,
): readonly MishapDecision[] {
  if (pending.outcome !== "pendingMishap" || pending.mishapResolution) return [];
  return caster.luckToken ? ["spendLuck", "accept"] : ["accept"];
}

/** Rest recovery: every lost spell (except those awaiting atonement) becomes available. */
export function recoverSpells(caster: Character): void {
  for (const s of caster.knownSpells) {
    if (s.status === "lost" && !s.requiresAtonement) s.status = "available";
  }
}

/** Complete divine penance; affected spells still require a subsequent rest. */
export function completePenance(caster: Character): number {
  let completed = 0;
  for (const s of caster.knownSpells) {
    if (!s.requiresAtonement) continue;
    s.requiresAtonement = false;
    completed++;
  }
  return completed;
}
