/**
 * Per-class stat priority order (primary -> dump), from the Unearthed Arcana
 * class table. Drives the Unearthed Arcana generation method: the class
 * decides which stat gets the biggest dice pool.
 */

import type { ClassName, StatName } from "../engine/character";

const STAT_PRIORITY_BY_CLASS: Partial<Record<ClassName, readonly StatName[]>> = {
  fighter: ["STR", "CON", "DEX", "CHA", "WIS", "INT"],
  cleric: ["WIS", "STR", "CON", "CHA", "INT", "DEX"],
  thief: ["DEX", "CHA", "STR", "INT", "CON", "WIS"],
  "magic-user": ["INT", "DEX", "CON", "WIS", "CHA", "STR"],
  paladin: ["STR", "CHA", "CON", "WIS", "DEX", "INT"],
  bard: ["CHA", "DEX", "CON", "INT", "WIS", "STR"],
  ranger: ["DEX", "WIS", "CON", "STR", "INT", "CHA"],
  monk: ["DEX", "WIS", "CON", "STR", "CHA", "INT"],
  necromancer: ["CHA", "INT", "CON", "WIS", "DEX", "STR"],
  warlock: ["CHA", "CON", "DEX", "INT", "WIS", "STR"],
  seawolf: ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
  duelist: ["DEX", "CHA", "CON", "STR", "WIS", "INT"],
  roustabout: ["STR", "CON", "CHA", "DEX", "WIS", "INT"],
  "pit-fighter": ["STR", "CON", "DEX", "CHA", "WIS", "INT"],
  "basilisk-warrior": ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
  "ras-godai": ["DEX", "CON", "INT", "STR", "WIS", "CHA"],
  delver: ["STR", "CON", "WIS", "DEX", "INT", "CHA"],
};

export function statPriorityForClass(cls: ClassName): readonly StatName[] {
  const order = STAT_PRIORITY_BY_CLASS[cls];
  if (!order) throw new Error(`No stat priority order defined for class "${cls}"`);
  return order;
}
