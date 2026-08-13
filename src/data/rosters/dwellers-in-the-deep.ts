/**
 * Dwellers in the Deep Roster: Abyssal archives, fungal grottos, and sea-forts.
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
  mon("dwellers-in-the-deep", id, name, spec);

const RAT = art(0x5f493e, 0x302527, 0x8a6b5b, 0xf05b62, "tail");
const EEL = art(0x5a6470, 0x323a44, 0xa8c0c8, 0xd8e8f0);
const DEEP_ONE = art(0x3f6a6a, 0x21393a, 0x8fbcb0, 0xdeda6b);
const CREEPER = art(0x42384a, 0x241f2a, 0x655473, 0xdeda6b);
const SHADOW = art(0x2a2438, 0x14101e, 0xa68ad1, 0xc07be0);
const PRIEST = art(0x2f5a58, 0x173230, 0xa68ad1, 0x71d58b, "robe", "horns");
const ABYSSAL = art(0x1a162b, 0x0c0915, 0x8050c0, 0x90e0ef, "manyEyes");

export const DEEP_ROSTER: readonly MonsterDef[] = [
  // --- LV 0 ---
  d("giant-rat", "Giant Rat", { level: 0, role: "vermin", archetype: "vermin", size: "small", speed: 110, art: RAT, ac: 12, hitDice: "1d6", attackBonus: 1, damage: "1d4", wisMod: -2 }),

  // --- LV 2 ---
  d("blind-eel", "Blind Eel", { level: 2, role: "skirmisher", archetype: "serpent", size: "medium", art: EEL }),
  d("deep-one", "Deep One", { level: 2, role: "soldier", archetype: "biped", size: "medium", speed: 80, art: DEEP_ONE, ac: 13, hitDice: "2d8", attackBonus: 2, damage: "1d6", wisMod: 0, specialAbility: "engulf" }),
  d("merfolk", "Merfolk", { level: 2, role: "soldier", archetype: "biped", size: "medium", art: DEEP_ONE }),

  // --- LV 3 ---
  d("cave-creeper", "Cave Creeper", { level: 3, role: "brute", archetype: "vermin", size: "medium", speed: 85, art: CREEPER, ac: 13, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 0 }),
  d("shadow", "Living Shadow", { level: 3, role: "caster", archetype: "elemental", size: "medium", speed: 95, art: SHADOW, ac: 12, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 1, undead: true, specialAbility: "shadow-extinct" }),
  d("mushroomfolk", "Mushroomfolk Myconid", { level: 3, role: "skirmisher", archetype: "plant", size: "medium", art: CREEPER }),

  // --- LV 5 ---
  d("deep-priest", "Deep Priest", { level: 5, role: "champion", archetype: "biped", size: "large", art: PRIEST }),
  d("chuul", "Chuul Crab-Horror", { level: 5, role: "brute", archetype: "vermin", size: "large", art: ABYSSAL }),
  d("void-spider", "Void Spider", { level: 5, role: "skirmisher", archetype: "spider", size: "medium", art: ABYSSAL, specialAbility: "web" }),
  d("mimic", "Mimic", { level: 5, role: "brute", archetype: "ooze", size: "medium", art: CREEPER }),

  // --- LV 6 ---
  d("cloaker", "Cloaker", { level: 6, role: "skirmisher", archetype: "flyer", size: "large", art: SHADOW }),
  d("invisible-stalker", "Invisible Stalker", { level: 6, role: "skirmisher", archetype: "elemental", size: "medium", art: SHADOW }),
  d("cave-brute", "Cave Brute", { level: 6, role: "brute", archetype: "brute", size: "large", art: CREEPER }),
  d("primordial-slime", "Primordial Slime", { level: 6, role: "brute", archetype: "ooze", size: "huge", art: CREEPER, specialAbility: "split" }),
  d("roper", "Roper Tentacle Fiend", { level: 6, role: "brute", archetype: "plant", size: "large", art: ABYSSAL }),

  // --- LV 7 ---
  d("otyugh", "Otyugh Garbage Beast", { level: 7, role: "brute", archetype: "ooze", size: "large", art: CREEPER }),
  d("void-spawn", "Void Spawn", { level: 7, role: "champion", archetype: "elemental", size: "large", art: ABYSSAL }),

  // --- LV 8 ---
  d("glabrezu-demon", "Glabrezu Demon", { level: 8, role: "champion", archetype: "brute", size: "large", art: ABYSSAL }),

  // --- LV 10 ---
  d("archmage", "Archmage", { level: 10, role: "caster", archetype: "biped", size: "medium", art: PRIEST }),
  d("sea-dragon", "Sea Dragon", { level: 16, role: "champion", archetype: "serpent", size: "gargantuan", art: ABYSSAL, ac: 18, hitDice: "16d8", attackBonus: 10, damage: "3d12" }),
];

assertRosterComplete("dwellers-in-the-deep", DEEP_ROSTER);
