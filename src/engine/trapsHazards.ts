import type { Character } from "./character";
import { getBaseRole } from "./character";
import { applyCondition, type ConditionKind } from "./conditions";
import { DC, resolveCheck, type CheckResult } from "./check";
import type { Dice } from "./dice";

export interface TrapDef {
  id: number;
  name: string;
  trigger: string;
  damage: string;
  effect?: ConditionKind;
  avoidStat: "DEX" | "CON";
}

export const TRAPS: readonly TrapDef[] = [
  { id: 1, name: "Crossbow Tripwire", trigger: "tripwire", damage: "1d6", avoidStat: "DEX" },
  { id: 2, name: "Hail of Needles", trigger: "pressure plate", damage: "1d6", effect: "sleeping", avoidStat: "CON" },
  { id: 3, name: "Toxic Gas", trigger: "opening a door", damage: "1d6", effect: "paralyzed", avoidStat: "CON" },
  { id: 4, name: "Barbed Net", trigger: "switch or button", damage: "1d6", effect: "blinded", avoidStat: "DEX" },
  { id: 5, name: "Rolling Boulder", trigger: "false step on stairs", damage: "2d8", avoidStat: "DEX" },
  { id: 6, name: "Slicing Blade", trigger: "closing a door", damage: "2d8", effect: "sleeping", avoidStat: "DEX" },
  { id: 7, name: "Spiked Pit", trigger: "breaking a light beam", damage: "2d8", effect: "paralyzed", avoidStat: "DEX" },
  { id: 8, name: "Javelin", trigger: "pulling a lever", damage: "2d8", effect: "frightened", avoidStat: "DEX" },
  { id: 9, name: "Magical Glyph", trigger: "speaking a word", damage: "3d10", avoidStat: "CON" },
  { id: 10, name: "Blast of Fire", trigger: "hook on a thread", damage: "3d10", effect: "sleeping", avoidStat: "DEX" },
  { id: 11, name: "Falling Block", trigger: "removing an object", damage: "3d10", effect: "paralyzed", avoidStat: "DEX" },
  { id: 12, name: "Cursed Statue", trigger: "casting a spell", damage: "3d10", effect: "magicSuppressed", avoidStat: "CON" },
];

export function trapById(id: number): TrapDef {
  const trap = TRAPS.find((candidate) => candidate.id === id);
  if (!trap) throw new Error(`Unknown trap d12 result ${id}`);
  return trap;
}

export interface TrapState {
  found: boolean;
  disabled: boolean;
}

export function searchSpecificArea(state: TrapState, target: string, trap: TrapDef): TrapState {
  if (!target.trim()) throw new Error("A specific object or area is required to search");
  return { ...state, found: true };
}

export interface DisableTrapResult {
  success: boolean;
  automatic: boolean;
  triggered: boolean;
  check?: CheckResult;
  state: TrapState;
}

export function disableTrap(
  dice: Dice,
  character: Character,
  trap: TrapDef,
  state: TrapState,
  options: { reasonableMethod: boolean; timePressure: boolean } = { reasonableMethod: true, timePressure: false },
): DisableTrapResult {
  if (!state.found) return { success: false, automatic: false, triggered: false, state };
  if (state.disabled) return { success: true, automatic: true, triggered: false, state };
  const trained = getBaseRole(character.className) === "thief" || character.isTrainedIn("tinkering");
  if (trained && options.reasonableMethod && !options.timePressure) {
    return { success: true, automatic: true, triggered: false, state: { ...state, disabled: true } };
  }
  const check = resolveCheck(dice, {
    actor: character,
    stat: "DEX",
    dc: trap.id <= 8 ? DC.NORMAL : DC.HARD,
    kind: "traps",
    task: "tinkering",
    hasTimePressure: options.timePressure,
    hasDireConsequences: true,
  });
  if (check.success) return { success: true, automatic: false, triggered: false, check, state: { ...state, disabled: true } };
  return { success: false, automatic: false, triggered: true, check, state };
}

export interface TriggerTrapResult {
  avoided: boolean;
  damage: number;
  check: CheckResult;
  conditionApplied?: ConditionKind;
}

export function triggerTrap(dice: Dice, character: Character, trap: TrapDef, state: TrapState): TriggerTrapResult {
  if (state.disabled) {
    return {
      avoided: true,
      damage: 0,
      check: { success: true, crit: false, fumble: false, natural: 10, total: DC.EASY, modifier: character.mod(trap.avoidStat), dc: DC.EASY, mode: "normal", rolls: [], advantageReasons: ["disabled trap"], disadvantageReasons: [], automatic: true },
    };
  }
  const check = resolveCheck(dice, {
    actor: character,
    stat: trap.avoidStat,
    dc: DC.NORMAL,
    kind: "traps",
    hasTimePressure: true,
    hasDireConsequences: true,
  });
  if (check.success) return { avoided: true, damage: 0, check };
  const damage = dice.roll(trap.damage);
  character.takeDamage(damage);
  const conditionApplied = trap.effect && applyCondition(character, trap.effect, { unit: "rounds", remaining: 1 }) ? trap.effect : undefined;
  return { avoided: false, damage, check, conditionApplied };
}

export type HazardKind = "movement" | "damage" | "weaken";
export interface HazardDef {
  id: number;
  name: string;
  kind: HazardKind;
}

const MOVEMENT = ["Quicksand", "Caltrops", "Loose debris", "Tar field", "Grasping vines", "Steep incline", "Slippery ice", "Rushing water", "Sticky webs", "Gale force wind", "Greased floor", "Illusory terrain"] as const;
const DAMAGE = ["Acid pools", "Exploding rocks", "Icy water", "Lava", "Pummeling hail", "Steam vents", "Toxic mold", "Falling debris", "Acid rain", "Curtain of fire", "Electrified field", "Gravity flux"] as const;
const WEAKEN = ["Blinding smoke", "Magnetic field", "Exhausting runes", "Antimagic zone", "Snuffs light sources", "Disorienting sound", "Magical silence", "Numbing cold", "Sickening smell", "Sleep-inducing spores", "Confusing reflections", "Memory-stealing"] as const;

export const HAZARDS: readonly HazardDef[] = [
  ...MOVEMENT.map((name, i) => ({ id: i + 1, name, kind: "movement" as const })),
  ...DAMAGE.map((name, i) => ({ id: i + 1, name, kind: "damage" as const })),
  ...WEAKEN.map((name, i) => ({ id: i + 1, name, kind: "weaken" as const })),
];

export function hazardById(kind: HazardKind, id: number): HazardDef {
  if (!Number.isInteger(id) || id < 1 || id > 12) throw new Error(`Invalid hazard d12 result ${id}`);
  return HAZARDS.find((hazard) => hazard.kind === kind && hazard.id === id)!;
}

export interface HazardTickResult {
  kind: HazardKind;
  escaped: boolean;
  damage: number;
  effectApplied?: ConditionKind;
  check?: CheckResult;
}

export function resolveHazardTick(dice: Dice, character: Character, hazard: HazardDef): HazardTickResult {
  if (hazard.kind === "movement") {
    const check = resolveCheck(dice, { actor: character, stat: "DEX", dc: DC.NORMAL, kind: "stat", hasTimePressure: true, hasDireConsequences: true });
    return { kind: hazard.kind, escaped: check.success, damage: 0, check };
  }
  if (hazard.kind === "damage") {
    const damage = dice.roll("1d6");
    character.takeDamage(damage);
    return { kind: hazard.kind, escaped: false, damage };
  }
  const conditionApplied = hazard.name === "Blinding smoke" || hazard.name === "Magical silence"
    ? (applyCondition(character, hazard.name === "Magical silence" ? "silenced" : "blinded", { unit: "rounds", remaining: 1 }) ? hazard.name === "Magical silence" ? "silenced" : "blinded" : undefined)
    : undefined;
  return { kind: hazard.kind, escaped: false, damage: 0, effectApplied: conditionApplied };
}

/** Platformer translation documented by the project: four tiles are safe. */
export function fallingDamage(dice: Dice, heightTiles: number): number {
  if (!Number.isInteger(heightTiles) || heightTiles < 0) throw new Error("Fall height must be a non-negative tile count");
  if (heightTiles <= 4) return 0;
  const diceCount = 1 + Math.floor((heightTiles - 5) / 3);
  return dice.roll(`${diceCount}d6`);
}
