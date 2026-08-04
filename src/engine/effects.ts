/**
 * Talents and conditions as data-driven effect hooks.
 * Talents are rolled on class tables and mutate the rules via these hooks —
 * never as hardcoded booleans on the character.
 */

import type { StatName } from "./character";

export type CheckKind =
  | "attack"
  | "meleeAttack"
  | "spellcast"
  | "initiative"
  | "morale"
  | "stealth"
  | "stat" // generic ability check (climb, disarm, stabilize...)
  | "any";

export type EffectHook =
  /** `weaponId` restricts the bonus to attacks made with that weapon (Weapon Mastery). */
  | { kind: "checkBonus"; applies: CheckKind; bonus: number; weaponId?: string; stat?: StatName }
  | { kind: "checkBonusHalfLevel"; applies: CheckKind; weaponId?: string }
  | { kind: "advantageOn"; applies: CheckKind }
  | { kind: "advantageOnSpell"; spellId: string }
  | { kind: "advantageOnStat"; stat: StatName }
  | { kind: "disadvantageOn"; applies: CheckKind }
  | { kind: "critRange"; value: number } // attacks crit on natural >= value
  | { kind: "statBonus"; stat: StatName; bonus: number }
  /** A temporary floor for a stat score (giant strength, polymorph, etc.). */
  | { kind: "statMinimum"; stat: StatName; value: number }
  | { kind: "statBonusChoice"; stats: StatName[]; bonus: number }
  | { kind: "acBonus"; bonus: number }
  | { kind: "acMinimum"; value: number }
  | { kind: "armorAcBonusChoice"; bonus: number }
  /** Mastery of one more weapon type; resolved to a carried weapon on gain. */
  | { kind: "weaponMasteryChoice"; bonus: number }
  | { kind: "armorAcBonus"; armorId: string; bonus: number }
  | { kind: "damageBonus"; bonus: number; weaponId?: string }
  | { kind: "meleeDamageBonus"; bonus: number }
  | { kind: "meleeDamageMultiplier"; value: number }
  /** Weapon Mastery scaling: +floor(level / 2) damage. */
  | { kind: "damageBonusHalfLevel"; weaponId?: string }
  | { kind: "maxHpBonus"; bonus: number }
  | { kind: "invisible" }
  | { kind: "waterBreathing" }
  | { kind: "waterWalking" }
  | { kind: "canFly" }
  | { kind: "canClimbWalls" }
  | { kind: "emitsLight" }
  | { kind: "seeInvisible" }
  | { kind: "hidden" }
  | { kind: "poisonedWeapon"; damage: string }
  | { kind: "seafarer" }
  | { kind: "obscured" }
  | { kind: "moraleImmune" }
  | { kind: "extraDamageDice"; dice: string }
  | { kind: "speedBonus"; bonus: number }
  | { kind: "focusSpell"; spellId: string; tier: number }
  | { kind: "focusTarget"; targetId: string }
  | { kind: "focusPoint"; x: number; y: number }
  | { kind: "hostileSpellDc"; value: number }
  /** Ancestry/talent immunity to a named status condition (see ./conditions). */
  | { kind: "conditionImmunity"; condition: string }
  | { kind: "resourceBonus"; resource: ClassResource; bonus: number }
  | { kind: "flourishExtraDie"; bonus: number }
  | { kind: "destinedDieStep"; bonus: number }
  | { kind: "assassinDamageMultiplier"; value: number }
  | { kind: "dualWieldAcBonus"; bonus: number }
  | { kind: "enemyMoraleDcMinimum"; value: number }
  | { kind: "oldGodDuality" }
  | { kind: "damageImmune" }
  | { kind: "hpFloor"; value: number };

export type ClassResource =
  | "ignoreAttack"
  | "relentless"
  | "berserk"
  | "smokeStep"
  | "paralyze"
  | "waterWalk"
  | "sleep"
  | "wallWalk"
  | "unseen"
  | "familiarTeleport"
  | "omen";

type DurationUnit = "rounds" | "crawlingRounds" | "realMs" | "untilRest" | "focus";

export interface Duration {
  unit: DurationUnit;
  /** Remaining amount in the given unit. Ignored for untilRest/focus. */
  remaining: number;
}

/** A named source of hooks: a talent (permanent) or a condition (has a duration). */
export interface Effect {
  id: string;
  name: string;
  hooks: EffectHook[];
  /** Absent = permanent (talents, ancestry features). */
  duration?: Duration;
}

/** A weapon-scoped hook only counts when that weapon is the one being swung. */
export function hookAppliesToWeapon(hookWeaponId: string | undefined, wieldedWeaponId: string | undefined): boolean {
  return hookWeaponId === undefined || hookWeaponId === wieldedWeaponId;
}

export function sumCheckBonus(
  effects: readonly Effect[],
  kind: CheckKind,
  level = 1,
  weaponId?: string,
  stat?: StatName,
): number {
  let total = 0;
  for (const e of effects) {
    for (const h of e.hooks) {
      if (h.kind === "checkBonus" && (h.stat === undefined || h.stat === stat) && (h.applies === kind || h.applies === "any" || (kind === "meleeAttack" && h.applies === "attack"))) {
        if (hookAppliesToWeapon(h.weaponId, weaponId)) total += h.bonus;
      }
      if (h.kind === "checkBonusHalfLevel" && (h.applies === kind || h.applies === "any" || (kind === "meleeAttack" && h.applies === "attack"))) {
        if (hookAppliesToWeapon(h.weaponId, weaponId)) total += Math.floor(level / 2);
      }
    }
  }
  return total;
}

export function grantsAdvantage(effects: readonly Effect[], kind: CheckKind): boolean {
  return effects.some((e) =>
    e.hooks.some((h) => h.kind === "advantageOn" && (h.applies === kind || h.applies === "any" || (kind === "meleeAttack" && h.applies === "attack"))),
  );
}

export function grantsDisadvantage(effects: readonly Effect[], kind: CheckKind): boolean {
  return effects.some((e) =>
    e.hooks.some(
      (h) => h.kind === "disadvantageOn" && (h.applies === kind || h.applies === "any" || (kind === "meleeAttack" && h.applies === "attack")),
    ),
  );
}

/** Lowest crit threshold among hooks; default 20. */
export function critThreshold(effects: readonly Effect[]): number {
  let threshold = 20;
  for (const e of effects) {
    for (const h of e.hooks) {
      if (h.kind === "critRange" && h.value < threshold) threshold = h.value;
    }
  }
  return threshold;
}

export function sumHook(
  effects: readonly Effect[],
  kind: "acBonus" | "damageBonus" | "maxHpBonus",
): number {
  let total = 0;
  for (const e of effects) {
    for (const h of e.hooks) {
      if (h.kind === kind) total += h.bonus;
    }
  }
  return total;
}

export function hasHook(effects: readonly Effect[], kind: EffectHook["kind"]): boolean {
  return effects.some((e) => e.hooks.some((h) => h.kind === kind));
}

/** Highest temporary minimum for a stat, or the supplied base score. */
export function effectiveStatScore(
  effects: readonly Effect[],
  stat: StatName,
  baseScore: number,
): number {
  let score = baseScore;
  for (const effect of effects) {
    for (const hook of effect.hooks) {
      if (hook.kind === "statMinimum" && hook.stat === stat) score = Math.max(score, hook.value);
    }
  }
  return score;
}

/** Flat melee-only damage, which `Engine.attack` adds after the weapon's own bonuses. */
export function sumMeleeDamageBonus(effects: readonly Effect[]): number {
  let total = 0;
  for (const e of effects) {
    for (const h of e.hooks) {
      if (h.kind === "meleeDamageBonus") total += h.bonus;
    }
  }
  return total;
}

export function sumStatBonus(effects: readonly Effect[], stat: StatName): number {
  let total = 0;
  for (const e of effects) {
    for (const h of e.hooks) {
      if (h.kind === "statBonus" && h.stat === stat) total += h.bonus;
    }
  }
  return total;
}
