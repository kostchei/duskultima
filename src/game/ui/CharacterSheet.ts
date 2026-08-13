/**
 * Character Sheet component: displays stat arrays, saving throws, class features,
 * active talents, and known spells for a party member.
 */

import type { Character } from "../../engine";
import { activeConditions, statModifier } from "../../engine";

export interface CharacterSheetSummary {
  name: string;
  className: string;
  ancestry: string;
  level: number;
  hp: string;
  ac: number;
  statsText: string;
  talentsText: string;
  conditionsText: string;
}

export function buildCharacterSheetSummary(c: Character): CharacterSheetSummary {
  const hp = `${c.hp}/${c.maxHp}`;
  const ac = c.ac;

  const modStr = statModifier(c.stats.STR);
  const modDex = statModifier(c.stats.DEX);
  const modCon = statModifier(c.stats.CON);
  const modInt = statModifier(c.stats.INT);
  const modWis = statModifier(c.stats.WIS);
  const modCha = statModifier(c.stats.CHA);

  const statsText =
    `STR: ${c.stats.STR} (${modStr >= 0 ? "+" : ""}${modStr})  ` +
    `DEX: ${c.stats.DEX} (${modDex >= 0 ? "+" : ""}${modDex})  ` +
    `CON: ${c.stats.CON} (${modCon >= 0 ? "+" : ""}${modCon})\n` +
    `INT: ${c.stats.INT} (${modInt >= 0 ? "+" : ""}${modInt})  ` +
    `WIS: ${c.stats.WIS} (${modWis >= 0 ? "+" : ""}${modWis})  ` +
    `CHA: ${c.stats.CHA} (${modCha >= 0 ? "+" : ""}${modCha})`;

  const talentsText = c.effects
    .map((e) => `- ${e.name}`)
    .join("\n") || "No extra talents";

  const conds = activeConditions(c);
  const conditionsText = conds.length > 0 ? conds.join(", ") : "None";

  return {
    name: c.name,
    className: c.className,
    ancestry: c.ancestry,
    level: c.level,
    hp,
    ac,
    statsText,
    talentsText,
    conditionsText,
  };
}
