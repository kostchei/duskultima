/** Pure rules for named magic items. Spatial rendering/summoned sprites stay in the game layer. */

import { STAT_NAMES, type Character, type StatName } from "./character";
import type { Dice } from "./dice";
import type { ItemDef } from "./inventory";
import { applyUseOutcome, canUseItem } from "./itemActions";

export interface NamedItemUseResult {
  itemId: string;
  message: string;
  consumed: boolean;
  active?: boolean;
  summoned?: { monsterId: string; rounds: number };
  extirpated?: boolean;
  raisedStat?: StatName;
}

export function activateNamedItem(
  character: Character,
  def: ItemDef,
  dice: Pick<Dice, "die">,
  hasTarget = false,
): NamedItemUseResult {
  const legal = canUseItem(character, character.itemState, def, "activate", hasTarget);
  if (!legal.ok) throw new Error(legal.message);
  const effect = def.namedEffect;
  if (!effect) throw new Error(`${def.name} has no implemented named effect.`);

  switch (effect.kind) {
    case "summon":
      applyUseOutcome(character.itemState, def, "success");
      return {
        itemId: def.id,
        message: `${def.name} summons a ${effect.monsterId} for ${effect.rounds} rounds.`,
        consumed: false,
        summoned: { monsterId: effect.monsterId, rounds: effect.rounds },
      };
    case "fixInSpace": {
      const active = character.itemState.toggleActive(def.id);
      return {
        itemId: def.id,
        message: `${def.name} is ${active ? `fixed in space and can hold ${effect.capacityLb.toLocaleString()} pounds` : "mobile again"}.`,
        consumed: false,
        active,
      };
    }
    case "statTo18": {
      const stat = STAT_NAMES[dice.die(6) - 1]!;
      character.stats[stat] = 18;
      character.inventory.remove(def.id, 1);
      return { itemId: def.id, message: `${stat} permanently becomes 18; the cube vanishes.`, consumed: true, raisedStat: stat };
    }
    case "divineHalo":
      character.removeEffect("item:divine-halo");
      character.addEffect({
        id: "item:divine-halo",
        name: `Divine Halo (${effect.count})`,
        hooks: [{ kind: "hostileSpellDc", value: 15 }],
      });
      character.inventory.remove(def.id, 1);
      return { itemId: def.id, message: `${character.name} receives ${effect.count} Divine Halo blessings.`, consumed: true };
    case "extirpate":
      character.inventory.remove(def.id, 1);
      return { itemId: def.id, message: "The target is utterly removed from reality.", consumed: true, extirpated: true };
    case "flyingMount":
      return { itemId: def.id, message: `${def.name} rises, carrying up to ${effect.riders} riders.`, consumed: false, active: true };
    case "sessionLuck":
      character.luckToken = true;
      return { itemId: def.id, message: `${character.name} begins with a luck token.`, consumed: false };
    case "spellcastBloodBonus":
      throw new Error(`${def.name} is invoked by wounding its wielder before a spellcast.`);
  }
}

/** Wound the wielder and bank that exact amount as a bonus to their next spellcasting check. */
export function primeWitchknife(character: Character, damage: number): number {
  const weapon = character.wieldedWeapon;
  if (weapon?.namedEffect?.kind !== "spellcastBloodBonus") throw new Error(`${character.name} is not wielding the Obsidian Witchknife.`);
  if (!Number.isInteger(damage) || damage < 1 || damage >= character.hp) throw new Error("Witchknife damage must leave the wielder alive.");
  character.takeDamage(damage);
  character.removeEffect("item:witchknife-blood");
  character.addEffect({
    id: "item:witchknife-blood",
    name: `Witchknife blood (+${damage} next cast)`,
    hooks: [{ kind: "checkBonus", applies: "spellcast", bonus: damage }],
    duration: { unit: "rounds", remaining: 1 },
  });
  return damage;
}

export function hostileSpellTargetDc(character: Character): number | undefined {
  const gear = [character.wornArmor, character.wieldedWeapon, character.carriedShield]
    .reduce<number>((highest, def) => Math.max(highest, def?.hostileSpellDc ?? 0), 0);
  const effects = character.effects.flatMap((effect) => effect.hooks).reduce(
    (highest, hook) => hook.kind === "hostileSpellDc" ? Math.max(highest, hook.value) : highest,
    0,
  );
  return Math.max(gear, effects) || undefined;
}

/** Apply session-start passives after inventory has been created or loaded. */
export function applySessionItemEffects(character: Character): void {
  if (character.inventory.all().some((stack) => stack.def.namedEffect?.kind === "sessionLuck")) character.luckToken = true;
}
