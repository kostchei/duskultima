/**
 * River of Night Roster: Jungle ziggurats, cenotes, and canopy towns.
 */

import type { MonsterArt, MonsterDef } from "../../engine";
import { assertRosterComplete, mon } from "./build";

const art = (
  body: number,
  shade: number,
  accent: number,
  eye: number,
  ...features: NonNullable<MonsterArt["features"]>
): MonsterArt => ({ body, shade, accent, eye, features });

const d = (id: string, name: string, spec: Parameters<typeof mon>[3]): MonsterDef =>
  mon("river-of-night", id, name, spec);

const TICK = art(0x6a2a2a, 0x3c1616, 0xb0503a, 0xe0c060);
const VIPER = art(0x3f7a4a, 0x22452a, 0xc8d060, 0xe0c040, "weapon");
const PLANT = art(0x5a6b3a, 0x34401f, 0xc0506a, 0xe0e060);
const SPIDER = art(0x2b1d24, 0x140d12, 0x4a2c35, 0xdb3535, "manyEyes");
const ORACLE = art(0x2f5a6a, 0x18333e, 0x61b870, 0xe0d060, "robe");
const GUARDIAN = art(0x8da899, 0x4e6058, 0x61b870, 0xffd45f, "weapon");
const BEAST = art(0x3a5c34, 0x1c341c, 0x78c55a, 0xe0d040);
const DRAGON = art(0x2a7a40, 0x144020, 0x8fd0ee, 0xffd45f, "wings");

export const RIVER_OF_NIGHT_ROSTER: readonly MonsterDef[] = [
  // --- LV 0 ---
  d("blood-tick-swarm", "Blood Tick Swarm", { level: 0, role: "vermin", archetype: "swarm", size: "small", art: TICK }),

  // --- LV 2 ---
  d("viperian", "Viperian Warrior", { level: 2, role: "soldier", archetype: "serpent", size: "medium", speed: 90, art: VIPER, ac: 13, hitDice: "2d8", attackBonus: 2, damage: "1d6", wisMod: 0, specialAbility: "poison" }),
  d("rot-flower", "Rot Flower", { level: 2, role: "brute", archetype: "plant", size: "medium", speed: 50, art: PLANT, ac: 11, hitDice: "2d8", attackBonus: 2, damage: "1d6", wisMod: -2, darkvision: false }),
  d("ape", "Ape", { level: 2, role: "brute", archetype: "biped", size: "medium", art: BEAST }),

  // --- LV 3 ---
  d("giant-spider", "Giant Spider", { level: 3, role: "skirmisher", archetype: "spider", size: "medium", speed: 100, art: SPIDER, ac: 13, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 1, specialAbility: "web" }),
  d("ankheg", "Ankheg", { level: 3, role: "brute", archetype: "vermin", size: "large", art: BEAST }),

  // --- LV 4 ---
  d("viperian-oracle", "Viperian Oracle", { level: 4, role: "caster", archetype: "serpent", size: "medium", art: ORACLE }),
  d("crocodile", "Crocodile", { level: 4, role: "brute", archetype: "serpent", size: "large", art: BEAST }),
  d("doppelganger", "Doppelganger", { level: 4, role: "skirmisher", archetype: "biped", size: "medium", art: ORACLE }),
  d("leprechaun", "Leprechaun", { level: 4, role: "caster", archetype: "biped", size: "small", art: PLANT, darkvision: false }),

  // --- LV 5 ---
  d("ziggurat-guardian", "Ziggurat Guardian", { level: 5, role: "champion", archetype: "brute", size: "large", art: GUARDIAN }),
  d("basilisk", "Basilisk", { level: 5, role: "brute", archetype: "quadruped", size: "large", art: BEAST, specialAbility: "poison" }),
  d("giant-octopus", "Giant Octopus", { level: 5, role: "brute", archetype: "serpent", size: "huge", art: TICK }),

  // --- LV 6 ---
  d("sea-hag", "Sea Hag", { level: 6, role: "caster", archetype: "biped", size: "medium", art: PLANT }),

  // --- LV 7 ---
  d("oni", "Oni Ogremage", { level: 7, role: "champion", archetype: "biped", size: "large", art: GUARDIAN }),
  d("druid", "Jungle Druid", { level: 7, role: "caster", archetype: "biped", size: "medium", art: PLANT, darkvision: false }),

  // --- LV 9 ---
  d("couatl", "Couatl", { level: 9, role: "caster", archetype: "serpent", size: "medium", art: DRAGON }),
  d("naga", "Serpent Naga", { level: 9, role: "caster", archetype: "serpent", size: "large", art: VIPER }),
  d("forest-dragon", "Forest Dragon", { level: 12, role: "champion", archetype: "flyer", size: "gargantuan", art: DRAGON, ac: 17, hitDice: "12d8", attackBonus: 9, damage: "3d10" }),
];

assertRosterComplete("river-of-night", RIVER_OF_NIGHT_ROSTER);
