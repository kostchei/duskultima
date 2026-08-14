/** Pure mechanical rules shared by the five Cursed Scroll alternate classes. */

import type { Character } from "./character";
import type { Dice } from "./dice";
import { hasHook, type ClassResource } from "./effects";
import type { WarlockPatronId } from "./patrons";

export const SHIELD_WALL_EFFECT_ID = "class:sea-wolf:shield-wall";
export const HIDDEN_EFFECT_ID = "class:hidden";
export const POISONED_WEAPON_EFFECT_ID = "class:poisoned-weapon";
export type OldGod = "odin" | "freya" | "loki";

export function resourceMaximum(character: Character, resource: ClassResource): number {
  const base: Partial<Record<ClassResource, number>> = {};
  if (character.className === "ras-godai") base.smokeStep = 3;
  if (character.className === "seer") base.omen = 3;
  if (character.className === "pit-fighter") base.relentless = 3;
  if (character.className === "monk") base.sunOnWater = 1;
  if (character.className === "necromancer") base.returnFromDeath = character.classState.returnFromDeathUses;
  let total = base[resource] ?? 0;
  for (const effect of character.effects) for (const hook of effect.hooks) {
    if (hook.kind === "resourceBonus" && hook.resource === resource) total += hook.bonus;
  }
  return total;
}

function refillResources(character: Character): void {
  const resources: ClassResource[] = ["ignoreAttack", "relentless", "berserk", "smokeStep", "paralyze", "waterWalk", "sleep", "wallWalk", "unseen", "familiarTeleport", "omen", "sunOnWater", "returnFromDeath"];
  for (const resource of resources) character.classState.resourceUses[resource] = resourceMaximum(character, resource);
  character.classState.omenUses = character.classState.resourceUses.omen ?? 0;
}

function spendResource(character: Character, resource: ClassResource): number {
  const uses = character.classState.resourceUses[resource] ?? 0;
  if (uses <= 0) throw new Error(`${character.name} has no ${resource} uses remaining`);
  character.classState.resourceUses[resource] = uses - 1;
  if (resource === "omen") character.classState.omenUses = uses - 1;
  return uses - 1;
}

export function initializeClassState(character: Character): void {
  character.classState.flourishUses = character.className === "pit-fighter" ? 3 : 0;
  character.classState.familiarAlive = character.className === "witch";
  character.classState.resourceUses ??= {};
  character.classState.oldGods ??= [];
  if (character.className === "sea-wolf" && character.classState.oldGods.length === 0) character.classState.oldGods = ["odin"];
  refillResources(character);
  character.classState.cauldronItems ??= [];
  character.classState.sunOnWaterUses = character.classState.resourceUses.sunOnWater ?? 0;
  character.classState.returnFromDeathUses = character.classState.resourceUses.returnFromDeath ?? 0;
}

export function restoreClassResources(character: Character): void {
  if (character.className === "pit-fighter") character.classState.flourishUses = 3;
  refillResources(character);
  character.classState.sunOnWaterUses = character.classState.resourceUses.sunOnWater ?? 0;
  character.classState.returnFromDeathUses = character.classState.resourceUses.returnFromDeath ?? 0;
  if (character.className === "sea-wolf" && character.classState.oldGods.includes("freya") && !character.luckToken) character.luckToken = true;
  character.removeEffect("class:sea-wolf:berserk");
  cancelShieldWall(character);
}

export function isShieldWallActive(character: Character): boolean {
  return Boolean(
    character.carriedShield &&
    !character.shieldStowed &&
    character.effects.some((effect) => effect.id === SHIELD_WALL_EFFECT_ID),
  );
}

export function activateShieldWall(character: Character): void {
  if (character.className !== "sea-wolf") throw new Error("Only a Sea Wolf can form a Shield Wall");
  if (!character.carriedShield || character.shieldStowed) throw new Error("Shield Wall requires a readied shield");
  if (isShieldWallActive(character)) return;
  character.addEffect({
    id: SHIELD_WALL_EFFECT_ID,
    name: "Shield Wall (AC 20; movement or attacking ends it)",
    hooks: [{ kind: "acMinimum", value: 20 }],
  });
}

export function cancelShieldWall(character: Character): boolean {
  const active = character.effects.some((effect) => effect.id === SHIELD_WALL_EFFECT_ID);
  character.removeEffect(SHIELD_WALL_EFFECT_ID);
  return active;
}

export interface FlourishResult {
  healed: number;
  usesRemaining: number;
}

/** Trigger after a valid melee hit; full-health hits do not waste a use. */
export function triggerFlourish(character: Character, dice: Pick<Dice, "roll">): FlourishResult | null {
  if (character.className !== "pit-fighter" || character.classState.flourishUses <= 0) return null;
  if (character.dead || character.dying || character.hp >= character.maxHp) return null;
  const before = character.hp;
  const extraDice = character.effects.flatMap((effect) => effect.hooks).reduce((sum, hook) => sum + (hook.kind === "flourishExtraDie" ? hook.bonus : 0), 0);
  let healing = 0;
  for (let i = 0; i < 1 + extraDice; i++) healing += dice.roll("1d6");
  character.heal(healing);
  character.classState.flourishUses--;
  return { healed: character.hp - before, usesRemaining: character.classState.flourishUses };
}

export function isHidden(character: Character): boolean {
  return hasHook(character.effects, "hidden");
}

export function hideCharacter(character: Character): void {
  character.removeEffect(HIDDEN_EFFECT_ID);
  character.addEffect({ id: HIDDEN_EFFECT_ID, name: "Hidden", hooks: [{ kind: "hidden" }] });
}

export function revealCharacter(character: Character): boolean {
  const hidden = isHidden(character);
  character.removeEffect(HIDDEN_EFFECT_ID);
  return hidden;
}

/** Ras-Godai doubles its weapon dice against an unaware target. */
export function assassinExtraDamageDice(character: Character, targetIsUnaware: boolean): number {
  if (character.className !== "ras-godai" || !isHidden(character) || !targetIsUnaware) return 0;
  let multiplier = 2;
  for (const effect of character.effects) for (const hook of effect.hooks) {
    if (hook.kind === "assassinDamageMultiplier") multiplier = Math.max(multiplier, hook.value);
  }
  return multiplier - 1;
}

/** Untrained poisoners spill on 1-2; Ras-Godai training only spills on natural 1. */
export function poisonApplicationAccident(character: Character, natural: number): boolean {
  const trained = character.className === "ras-godai" && character.effects.some((effect) => effect.id.includes(":ras-godai-talents:2:"));
  return natural <= (trained ? 1 : 2);
}

export function armPoisonedWeapon(character: Character, damage = "1d6"): void {
  character.removeEffect(POISONED_WEAPON_EFFECT_ID);
  character.addEffect({
    id: POISONED_WEAPON_EFFECT_ID,
    name: `Poisoned Weapon (+${damage} on next melee hit)`,
    hooks: [{ kind: "poisonedWeapon", damage }],
    duration: { unit: "untilRest", remaining: 0 },
  });
}

export function poisonedWeaponDamage(character: Character): string | null {
  for (const effect of character.effects) {
    for (const hook of effect.hooks) if (hook.kind === "poisonedWeapon") return hook.damage;
  }
  return null;
}

export function destinedLuckBonus(character: Character, dice: Pick<Dice, "roll">): number {
  if (character.className === "sea-wolf" && character.classState.oldGods.includes("freya")) return dice.roll("1d6");
  if (character.className !== "seer") return 0;
  const steps = character.effects.flatMap((effect) => effect.hooks).reduce((sum, hook) => sum + (hook.kind === "destinedDieStep" ? hook.bonus : 0), 0);
  return dice.roll(`1d${Math.min(12, 6 + steps * 2)}`);
}

export function chooseOldGods(character: Character, gods: readonly OldGod[]): void {
  if (character.className !== "sea-wolf") throw new Error("Only a Sea Wolf follows the Old Gods");
  const duality = character.effects.some((effect) => effect.hooks.some((hook) => hook.kind === "oldGodDuality"));
  const limit = duality ? 2 : 1;
  const unique = [...new Set(gods)];
  if (unique.length !== limit) throw new Error(`Sea Wolf must choose ${limit} different Old God effect${limit === 1 ? "" : "s"}`);
  character.classState.oldGods = unique;
  character.removeEffect("class:sea-wolf:loki");
  if (unique.includes("loki")) character.addEffect({ id: "class:sea-wolf:loki", name: "Loki: advantage to sneak and hide", hooks: [{ kind: "advantageOn", applies: "stealth" }] });
  if (unique.includes("freya") && !character.luckToken) character.luckToken = true;
}

export function oldGodKillHealing(character: Character, dice: Pick<Dice, "roll">): number {
  if (character.className !== "sea-wolf" || !character.classState.oldGods.includes("odin") || character.hp >= character.maxHp) return 0;
  const before = character.hp;
  character.heal(dice.roll("1d4"));
  return character.hp - before;
}

export function ignoreAttackDamage(character: Character): number {
  spendResource(character, "ignoreAttack");
  return 0;
}

export function goBerserk(character: Character): void {
  spendResource(character, "berserk");
  character.addEffect({ id: "class:sea-wolf:berserk", name: "Berserk: immune to damage", hooks: [{ kind: "damageImmune" }], duration: { unit: "rounds", remaining: 3 } });
}

export function useSmokeStep(character: Character): number { return spendResource(character, "smokeStep"); }

export function useFamiliarTeleport(character: Character): number {
  if (!character.classState.familiarAlive) throw new Error(`${character.name}'s familiar is dead`);
  return spendResource(character, "familiarTeleport");
}

export function restoreFamiliar(character: Character, dice: Pick<Dice, "roll">): number {
  if (character.className !== "witch") throw new Error("Only a Witch has a familiar");
  if (character.classState.familiarAlive) throw new Error(`${character.name}'s familiar is already alive`);
  const sacrifice = Math.min(character.maxHp - 1, dice.roll("1d4"));
  character.permanentlyReduceMaxHp(sacrifice);
  character.classState.familiarAlive = true;
  return sacrifice;
}

export function useBlackLotusPower(character: Character, power: "paralyze" | "waterWalk" | "sleep" | "wallWalk" | "unseen"): number {
  return spendResource(character, power);
}

export interface BlackLotusPowerResult {
  success: boolean;
  remaining: number;
  durationRounds: number;
}

/** Resolve the level cap, saving throw, and duration of an activated Black Lotus talent. */
export function resolveBlackLotusPower(
  character: Character,
  power: "paralyze" | "waterWalk" | "sleep" | "wallWalk" | "unseen",
  dice: Pick<Dice, "roll">,
  target?: { level: number; saveTotal: number },
): BlackLotusPowerResult {
  const caps = { paralyze: 9, sleep: 5, unseen: 9 } as const;
  const cap = power === "paralyze" || power === "sleep" || power === "unseen" ? caps[power] : null;
  if (cap !== null && (!target || target.level > cap)) throw new Error(`${power} requires a target of level ${cap} or less`);
  const remaining = useBlackLotusPower(character, power);
  const success = cap === null || target!.saveTotal < 15;
  const durationRounds = success ? dice.roll("1d4") : 0;
  if (success && power === "waterWalk") character.addEffect({ id: "class:ras-godai:water-walk", name: "Walking on water", hooks: [{ kind: "waterWalking" }], duration: { unit: "rounds", remaining: durationRounds } });
  if (success && power === "wallWalk") character.addEffect({ id: "class:ras-godai:wall-walk", name: "Walking on sheer surfaces", hooks: [{ kind: "canClimbWalls" }], duration: { unit: "rounds", remaining: durationRounds } });
  return { success, remaining, durationRounds };
}

export function enemyMoraleDc(character: Character, enemiesCanSeeCharacter: boolean): number {
  if (!enemiesCanSeeCharacter) return 15;
  return character.effects.some((effect) => effect.hooks.some((hook) => hook.kind === "enemyMoraleDcMinimum" && hook.value >= 18)) ? 18 : 15;
}

export function pitFighterLastStandThreshold(character: Character): number {
  return character.className === "pit-fighter" ? 18 : 20;
}

export function monkFistMagicBonus(character: Character): number {
  if (character.className !== "monk") return 0;
  if (character.level >= 8) return 3;
  if (character.level >= 4) return 2;
  if (character.level >= 2) return 1;
  return 0;
}

export function namedBladeMagicBonus(character: Character): number {
  if (character.className !== "paladin") return 0;
  if (character.level >= 8) return 3;
  if (character.level >= 5) return 2;
  if (character.level >= 2) return 1;
  return 0;
}

export function activateStillHeart(character: Character): number {
  if (character.className !== "monk") throw new Error("Only a Monk can use Still the Heart");
  const rounds = Math.max(0, character.level);
  if (rounds === 0) throw new Error("Still the Heart has no rounds remaining today");
  character.addEffect({
    id: "class:monk:still-heart",
    name: "Still the Heart",
    hooks: [{ kind: "waterBreathing" }, { kind: "hpFloor", value: 1 }],
    duration: { unit: "rounds", remaining: rounds },
  });
  return rounds;
}

export function useSunOnWater(character: Character): number {
  if (character.className !== "monk") throw new Error("Only a Monk can use Sun on the Water");
  const remaining = spendResource(character, "sunOnWater");
  character.classState.sunOnWaterUses = remaining;
  return remaining;
}

export function useNecromancerDeathReturn(character: Character): number {
  if (character.className !== "necromancer") throw new Error("Only a Necromancer can use River of Death");
  const remaining = spendResource(character, "returnFromDeath");
  character.classState.returnFromDeathUses = remaining;
  return remaining;
}

export function deathTimerDie(character: Character): string {
  return character.className === "necromancer" ? "1d6" : "1d4";
}

export function inspiringPresenceThreshold(paladin: Character, bonus = 0): number {
  if (paladin.className !== "paladin") throw new Error("Only a Paladin has Inspiring Presence");
  return Math.max(2, 18 - bonus);
}

export function inspireAllyFromDying(paladin: Character, ally: Character, naturalD20: number, inNearRange: boolean): boolean {
  if (!inNearRange || paladin.className !== "paladin" || !ally.dying) return false;
  const bonus = paladin.effects.flatMap((effect) => effect.hooks).reduce((sum, hook) => sum + (hook.kind === "deathSaveBonus" ? hook.bonus : 0), 0);
  if (naturalD20 < inspiringPresenceThreshold(paladin, bonus)) return false;
  ally.dying = null;
  ally.hp = Math.max(1, paladin.mod("CHA"));
  return true;
}

export function chooseWarlockPatron(character: Character, patron: WarlockPatronId): void {
  if (character.className !== "warlock") throw new Error("Only a Warlock can choose a patron");
  character.classState.warlockPatron = patron;
  character.classState.patronBoons = Math.max(1, character.classState.patronBoons);
  character.removeEffect("class:warlock:patron-boon");
  const hooks = patron === "rathgamnon"
    ? [{ kind: "acBonus" as const, bonus: 1 }]
    : patron === "saint-ydris"
      ? [{ kind: "checkBonus" as const, applies: "attack" as const, bonus: 1 }]
      : [];
  character.addEffect({ id: "class:warlock:patron-boon", name: `Patron Boon (${patron})`, hooks });
}

export function warlockPatronBoonCount(character: Character): number {
  return character.className === "warlock" ? character.classState.patronBoons : 0;
}

/** Apply class features whose source schedule advances with character level. */
export function applyClassLevelProgression(character: Character): void {
  if (character.className === "warlock" && character.level % 2 === 0) {
    character.classState.patronBoons++;
  }
}
