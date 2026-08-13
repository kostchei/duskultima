import type { Dice } from "./dice";
import type { Character } from "./character";
import { DC, resolveCheck, type CheckResult } from "./check";

export type HexTerrain = "easy" | "moderate" | "hard" | "impassable";
export type TravelMethod = "walking" | "mounted" | "sailing";
export type Weather = "bad" | "fair" | "excellent";

export const TERRAIN_WATCHES: Readonly<Record<HexTerrain, number>> = {
  easy: 1,
  moderate: 2,
  hard: 3,
  impassable: Number.POSITIVE_INFINITY,
};

export const TRAVEL_HEXES_PER_DAY: Readonly<Record<TravelMethod, number>> = {
  walking: 4,
  mounted: 6,
  sailing: 8,
};

export interface WeatherResult {
  roll: number;
  weather: Weather;
  storm: boolean;
  nextRollAdvantage: boolean;
}

export function rollWeather(dice: Dice, advantage = false): WeatherResult {
  const first = dice.die(6);
  const weatherRoll = advantage ? Math.max(first, dice.die(6)) : first;
  if (weatherRoll === 1) return { roll: weatherRoll, weather: "bad", storm: dice.die(6) <= 3, nextRollAdvantage: false };
  if (weatherRoll === 6) return { roll: weatherRoll, weather: "excellent", storm: false, nextRollAdvantage: true };
  return { roll: weatherRoll, weather: "fair", storm: false, nextRollAdvantage: false };
}

export interface NavigationResult {
  checked: boolean;
  lost: boolean;
  roll?: number;
  driftNeighbor?: number;
}

export function navigate(dice: Dice, terrain: HexTerrain, weather: Weather): NavigationResult {
  if (terrain === "impassable") throw new Error("Impassable terrain cannot be navigated by standard travel");
  const hard = terrain === "hard" || weather === "bad";
  const moderate = terrain === "moderate" && !hard;
  if (!hard && !moderate) return { checked: false, lost: false };
  const roll = dice.die(6);
  const lost = hard ? roll <= 2 : roll === 1;
  return { checked: true, lost, roll, driftNeighbor: lost ? dice.die(6) : undefined };
}

export interface TravelWatchResult {
  terrain: HexTerrain;
  navigation: NavigationResult;
  watchesSpent: number;
  hexCleared: boolean;
  encounter: boolean;
  encounterRoll: number;
  driftNeighbor?: number;
  pushed: boolean;
}

/** Resolve the six-step travel procedure for one travel watch. */
export function travelWatch(
  dice: Dice,
  options: {
    terrain: HexTerrain;
    weather?: Weather;
    dangerous?: boolean;
    pushed?: boolean;
    watchesIntoHex?: number;
  },
): TravelWatchResult {
  const weather = options.weather ?? "fair";
  const watchesSpent = TERRAIN_WATCHES[options.terrain];
  if (!Number.isFinite(watchesSpent)) throw new Error("Impassable terrain cannot be crossed");
  const navigation = navigate(dice, options.terrain, weather);
  const threshold = (options.dangerous ? 2 : 1) + (options.pushed ? 1 : 0);
  const encounterRoll = dice.die(6);
  const progress = (options.watchesIntoHex ?? 0) + 1;
  return {
    terrain: options.terrain,
    navigation,
    watchesSpent: 1,
    hexCleared: progress >= watchesSpent,
    encounter: encounterRoll <= threshold,
    encounterRoll,
    driftNeighbor: navigation.driftNeighbor,
    pushed: options.pushed === true,
  };
}

export interface PushResult {
  allowed: boolean;
  hexes: number;
  encounterThreshold: number;
  reason?: string;
}

export function pushedTravel(
  method: TravelMethod,
  dangerous = false,
): PushResult {
  const base = TRAVEL_HEXES_PER_DAY[method];
  return {
    allowed: true,
    hexes: Math.floor(base * 1.5),
    encounterThreshold: (dangerous ? 2 : 1) + 1,
  };
}

export interface ForageResult {
  success: boolean;
  check?: CheckResult;
  rationsFound: number;
}

export function forage(dice: Dice, character: Character): ForageResult {
  const check = resolveCheck(dice, {
    actor: character,
    stat: "INT",
    dc: DC.NORMAL,
    kind: "stat",
    task: "foraging",
    hasTimePressure: true,
    hasDireConsequences: true,
  });
  return { success: check.success, check, rationsFound: check.success ? 1 : 0 };
}

export interface DailyResourcesResult {
  consumed: number;
  missing: number;
  starving: boolean;
}

/** One ration per PC per day; callers may forage during travel before this. */
export function consumeDailyRations(rations: number, partySize: number): DailyResourcesResult {
  if (!Number.isInteger(rations) || rations < 0) throw new Error("Rations must be non-negative");
  if (!Number.isInteger(partySize) || partySize < 1) throw new Error("Party size must be positive");
  const consumed = Math.min(rations, partySize);
  const missing = partySize - consumed;
  return { consumed, missing, starving: missing > 0 };
}

export interface NightWatchResult {
  guardCharacterId: string;
  encounter: boolean;
  roll: number;
}

export function nightWatch(
  dice: Dice,
  guard: Character,
  dangerous = false,
): NightWatchResult {
  const roll = dice.die(6);
  return { guardCharacterId: guard.id, encounter: roll <= (dangerous ? 2 : 1), roll };
}
