/** Resolves talent-table results, including chained tables and class-specific duplicate rules. */

import type { Character, StatName } from "./character";
import type { Dice } from "./dice";
import type { TableRegistry, TableRollResult } from "./tables";
import type { EffectHook } from "./effects";

export interface AppliedTalent {
  result: TableRollResult;
  effectId: string;
}

export interface TalentChoiceOption {
  value: string;
  label: string;
}

export type TalentChoice =
  | { kind: "stat"; id: string; label: string; bonus: number; stats: readonly string[]; options: readonly TalentChoiceOption[] }
  | { kind: "weaponMastery"; id: string; label: string; bonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "armorAc"; id: string; label: string; bonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "knownSpellAdvantage"; id: string; label: string; options: readonly TalentChoiceOption[] }
  | { kind: "learnSpell"; id: string; label: string; options: readonly TalentChoiceOption[] };

export interface TalentApplication {
  talents: AppliedTalent[];
  pendingChoices: TalentChoice[];
}

function alreadyHasRoll(character: Character, tableId: string, roll: number): boolean {
  return character.effects.some((effect) => effect.id.includes(`:${tableId}:${roll}:`));
}

function duplicateResource(tableId: string, roll: number): "ignoreAttack" | "berserk" | "familiarTeleport" | null {
  if (roll !== 2) return null;
  if (tableId === "pit-fighter-talents") return "ignoreAttack";
  if (tableId === "sea-wolf-talents") return "berserk";
  if (tableId === "witch-talents") return "familiarTeleport";
  return null;
}

export function applyTalentResult(
  dice: Dice,
  tables: TableRegistry,
  character: Character,
  initial: TableRollResult,
  sourceId: string,
): AppliedTalent[] {
  return applyTalentResultInternal(dice, tables, character, initial, sourceId, false).talents;
}

/** Applies a level-up talent while preserving decisions for the level-up UI. */
export function applyTalentResultForLevelUp(
  dice: Dice,
  tables: TableRegistry,
  character: Character,
  initial: TableRollResult,
  sourceId: string,
): TalentApplication {
  return applyTalentResultInternal(dice, tables, character, initial, sourceId, true);
}

function applyTalentResultInternal(
  dice: Dice,
  tables: TableRegistry,
  character: Character,
  initial: TableRollResult,
  sourceId: string,
  deferChoices: boolean,
): TalentApplication {
  const applied: AppliedTalent[] = [];
  const pendingChoices: TalentChoice[] = [];

  const choiceOptions = (values: readonly string[], labels = values): TalentChoiceOption[] =>
    values.map((value, index) => ({ value, label: labels[index] ?? value }));

  const weaponOptions = (): TalentChoiceOption[] => {
    const defs = [
      ...(character.wieldedWeapon ? [character.wieldedWeapon] : []),
      ...character.inventory.all().map((stack) => stack.def),
    ].filter((def, index, all) => def.tags.includes("weapon") && all.findIndex((other) => other.id === def.id) === index);
    return defs.map((def) => ({ value: def.id, label: def.name }));
  };

  const addDeferredHookChoice = (hook: EffectHook, effectId: string, text: string): boolean => {
    if (!deferChoices) return false;
    if (hook.kind === "statBonusChoice") {
      pendingChoices.push({
        kind: "stat",
        id: `${effectId}:stat`,
        label: text,
        bonus: hook.bonus,
        stats: hook.stats,
        options: choiceOptions(hook.stats),
      });
      return true;
    }
    if (hook.kind === "weaponMasteryChoice") {
      pendingChoices.push({ kind: "weaponMastery", id: `${effectId}:weapon`, label: text, bonus: hook.bonus, options: weaponOptions() });
      return true;
    }
    if (hook.kind === "armorAcBonusChoice") {
      const armorIds = ["leather-armor", "chainmail", "plate-mail", "mithral-chainmail"];
      pendingChoices.push({ kind: "armorAc", id: `${effectId}:armor`, label: text, bonus: hook.bonus, options: choiceOptions(armorIds) });
      return true;
    }
    return false;
  };

  const apply = (result: TableRollResult, suffix: string, rerollOnBlackLotusOne = false): void => {
    if (rerollOnBlackLotusOne && result.table.id === "black-lotus-talents" && result.roll === 1) {
      apply(tables.roll(dice, result.table.id), `${suffix}-reroll`, true);
      return;
    }

    const duplicate = alreadyHasRoll(character, result.table.id, result.roll);
    const duplicateBonus = duplicateResource(result.table.id, result.roll);
    const mustReroll = duplicate && (
      (result.table.id === "ras-godai-talents" && result.roll === 2) ||
      (result.table.id === "sea-wolf-talents" && result.roll >= 10 && result.roll <= 11)
    );
    if (mustReroll) {
      apply(tables.roll(dice, result.table.id), `${suffix}-reroll`);
      return;
    }

    const effectId = `${sourceId}:${result.table.id}:${result.roll}:${suffix}`;
    const rawHooks = duplicate && duplicateBonus
      ? [{ kind: "resourceBonus" as const, resource: duplicateBonus, bonus: 1 }]
      : [...(result.entry.effects ?? [])];
    const hooks = rawHooks.filter((hook) => !addDeferredHookChoice(hook, effectId, result.entry.text));
    character.addEffect({ id: effectId, name: result.entry.text, hooks });
    applied.push({ result, effectId });

    for (const instruction of result.entry.talent ?? []) {
      if (instruction.kind === "learnSpell") {
        const maxTier = Math.min(5, Math.ceil(character.level / 2));
        const choices = instruction.spells.filter((spell) => spell.tier <= maxTier && !character.knownSpells.some((known) => known.spellId === spell.id));
        if (deferChoices) {
          pendingChoices.push({ kind: "learnSpell", id: `${effectId}:spell`, label: result.entry.text, options: choices.map((spell) => ({ value: spell.id, label: spell.id })) });
        } else {
          const choice = choices[0];
          if (choice) character.learnSpell(choice.id);
        }
      } else if (instruction.kind === "advantageKnownSpell") {
        const choices = character.knownSpells.filter((known) =>
          !character.effects.some((effect) => effect.hooks.some((hook) => hook.kind === "advantageOnSpell" && hook.spellId === known.spellId)),
        );
        if (deferChoices) {
          pendingChoices.push({ kind: "knownSpellAdvantage", id: `${effectId}:spell`, label: result.entry.text, options: choices.map((spell) => ({ value: spell.spellId, label: spell.spellId })) });
        } else {
          const choice = choices[0];
          if (choice) character.addEffect({ id: `${effectId}:spell`, name: `Advantage casting ${choice.spellId}`, hooks: [{ kind: "advantageOnSpell", spellId: choice.spellId }] });
        }
      } else if (instruction.kind === "gainHitDie") {
        character.increaseMaxHp(dice.roll(instruction.dice));
      } else {
        for (let i = 0; i < instruction.count; i++) {
          const next = tables.roll(dice, instruction.tableId);
          apply(next, `${suffix}-${instruction.tableId}-${i}`, result.table.id === "black-lotus-talents" && result.roll === 1);
        }
      }
    }
  };

  apply(initial, "0");
  return { talents: applied, pendingChoices };
}

/** Applies one previously deferred level-up choice. */
export function applyTalentChoice(character: Character, choice: TalentChoice, value: string): void {
  if (!choice.options.some((option) => option.value === value)) throw new Error(`Invalid choice "${value}" for ${choice.label}`);
  if (choice.kind === "stat") {
    if (!choice.stats.includes(value)) throw new Error(`Invalid stat choice "${value}"`);
    character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "statBonus" as const, stat: value as StatName, bonus: choice.bonus }] });
  } else if (choice.kind === "weaponMastery") {
    character.addEffect({ id: choice.id, name: choice.label, hooks: [
      { kind: "checkBonus", applies: "attack", bonus: choice.bonus, weaponId: value },
      { kind: "damageBonus", bonus: choice.bonus, weaponId: value },
    ] });
  } else if (choice.kind === "armorAc") {
    character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "armorAcBonus", armorId: value, bonus: choice.bonus }] });
  } else if (choice.kind === "knownSpellAdvantage") {
    character.addEffect({ id: choice.id, name: `Advantage casting ${value}`, hooks: [{ kind: "advantageOnSpell", spellId: value }] });
  } else {
    character.learnSpell(value);
  }
}

export function rollAndApplyTalent(
  dice: Dice,
  tables: TableRegistry,
  character: Character,
  tableId: string,
  sourceId: string,
): AppliedTalent[] {
  return applyTalentResult(dice, tables, character, tables.roll(dice, tableId), sourceId);
}
