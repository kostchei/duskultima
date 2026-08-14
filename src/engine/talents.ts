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
  | { kind: "statOrCheck"; id: string; label: string; stat: StatName; statBonus: number; applies: string; checkBonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "statPair"; id: string; label: string; stats: readonly StatName[]; bonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "checkKind"; id: string; label: string; applies: readonly string[]; bonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "weaponMastery"; id: string; label: string; bonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "armorAc"; id: string; label: string; bonus: number; options: readonly TalentChoiceOption[] }
  | { kind: "knownSpellAdvantage"; id: string; label: string; options: readonly TalentChoiceOption[] }
  | { kind: "learnSpell"; id: string; label: string; options: readonly TalentChoiceOption[] }
  | { kind: "talent"; id: string; label: string; tableId: string; options: readonly TalentChoiceOption[] };

export interface TalentApplication {
  talents: AppliedTalent[];
  pendingChoices: TalentChoice[];
}

function alreadyHasRoll(character: Character, tableId: string, roll: number): boolean {
  return character.effects.some((effect) => effect.id.includes(`:${tableId}:${roll}:`));
}

function duplicateResource(tableId: string, roll: number): "ignoreAttack" | "berserk" | "familiarTeleport" | "sunOnWater" | "returnFromDeath" | null {
  if (roll !== 2) return null;
  if (tableId === "pit-fighter-talents") return "ignoreAttack";
  if (tableId === "sea-wolf-talents") return "berserk";
  if (tableId === "witch-talents") return "familiarTeleport";
  if (tableId === "monk-talents") return "sunOnWater";
  if (tableId === "necromancer-talents") return "returnFromDeath";
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
    if (hook.kind === "statOrCheckChoice") {
      pendingChoices.push({
        kind: "statOrCheck",
        id: `${effectId}:stat-or-check`,
        label: text,
        stat: hook.stat,
        statBonus: hook.statBonus,
        applies: hook.applies,
        checkBonus: hook.checkBonus,
        options: [{ value: "stat", label: `+${hook.statBonus} ${hook.stat}` }, { value: "check", label: `+${hook.checkBonus} ${hook.applies}` }],
      });
      return true;
    }
    if (hook.kind === "statPairChoice") {
      const pairs = hook.stats.flatMap((first, index) => hook.stats.slice(index + 1).map((second) => ({ value: `${first},${second}`, label: `+${hook.bonus} ${first} and ${second}` })));
      pendingChoices.push({ kind: "statPair", id: `${effectId}:stats`, label: text, stats: hook.stats, bonus: hook.bonus, options: pairs });
      return true;
    }
    if (hook.kind === "checkKindChoice") {
      pendingChoices.push({ kind: "checkKind", id: `${effectId}:check`, label: text, applies: hook.applies, bonus: hook.bonus, options: choiceOptions(hook.applies) });
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
      (result.table.id === "thief-talents" && result.roll === 2) ||
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
      } else if (instruction.kind === "chooseTalent") {
        const table = tables.get(instruction.tableId);
        if (deferChoices) {
          pendingChoices.push({
            kind: "talent",
            id: `${effectId}:talent`,
            label: result.entry.text,
            tableId: instruction.tableId,
            options: table.entries.map((entry) => ({ value: String(entry.min), label: entry.text })),
          });
        } else {
          const entry = table.entries[0]!;
          apply({ table, roll: entry.min, entry }, `${suffix}-${instruction.tableId}-choice`);
        }
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
export function applyTalentChoice(character: Character, choice: TalentChoice, value: string, dice?: Dice, tables?: TableRegistry): void {
  if (!choice.options.some((option) => option.value === value)) throw new Error(`Invalid choice "${value}" for ${choice.label}`);
  if (choice.kind === "stat") {
    if (!choice.stats.includes(value)) throw new Error(`Invalid stat choice "${value}"`);
    character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "statBonus" as const, stat: value as StatName, bonus: choice.bonus }] });
  } else if (choice.kind === "statOrCheck") {
    if (value === "stat") character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "statBonus", stat: choice.stat, bonus: choice.statBonus }] });
    else character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "checkBonus", applies: choice.applies as any, bonus: choice.checkBonus }] });
  } else if (choice.kind === "statPair") {
    const [first, second] = value.split(",") as [StatName | undefined, StatName | undefined];
    if (!first || !second || first === second || !choice.stats.includes(first) || !choice.stats.includes(second)) throw new Error(`Invalid stat pair choice "${value}"`);
    character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "statBonus", stat: first, bonus: choice.bonus }, { kind: "statBonus", stat: second, bonus: choice.bonus }] });
  } else if (choice.kind === "checkKind") {
    if (!choice.applies.includes(value)) throw new Error(`Invalid check choice "${value}"`);
    character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "checkBonus", applies: value as any, bonus: choice.bonus }] });
  } else if (choice.kind === "weaponMastery") {
    character.addEffect({ id: choice.id, name: choice.label, hooks: [
      { kind: "checkBonus", applies: "attack", bonus: choice.bonus, weaponId: value },
      { kind: "damageBonus", bonus: choice.bonus, weaponId: value },
    ] });
  } else if (choice.kind === "armorAc") {
    character.addEffect({ id: choice.id, name: choice.label, hooks: [{ kind: "armorAcBonus", armorId: value, bonus: choice.bonus }] });
  } else if (choice.kind === "knownSpellAdvantage") {
    character.addEffect({ id: choice.id, name: `Advantage casting ${value}`, hooks: [{ kind: "advantageOnSpell", spellId: value }] });
  } else if (choice.kind === "learnSpell") {
    character.learnSpell(value);
  } else {
    if (!dice || !tables) throw new Error(`Choosing a talent requires the engine dice and table registry`);
    const table = tables.get(choice.tableId);
    const entry = table.entries.find((candidate) => candidate.min === Number(value));
    if (!entry) throw new Error(`Invalid talent choice "${value}" for ${choice.label}`);
    applyTalentResultInternal(dice, tables, character, { table, roll: entry.min, entry }, choice.id, false);
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
