/**
 * The five zones outside Diablerie.
 *
 * These are the original hand-tuned stat blocks, now carrying a Shadowdark
 * level and a battlefield role so the same party-level spawning works
 * everywhere. Their numbers are stated explicitly rather than derived: they
 * predate the level/role spine and are kept exactly as they played.
 *
 * Each zone also gains the two or three entries it needed to staff every
 * dungeon tile role — a roster missing a role cannot fill a grid, and
 * `assertRosterComplete` throws at import if one does. These fillers are
 * deliberately plain; the zones are due their own authored rosters.
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

// --- Diablerie holdovers: the four that already lived in the black forest ---
export const DIABLERIE_HOLDOVERS: readonly MonsterDef[] = [
  mon("diablerie", "goblin", "Goblin", {
    level: 1, role: "skirmisher", archetype: "biped", size: "small", speed: 90,
    art: art(0x537c3b, 0x2e3b25, 0xb5c84d, 0xb5c84d, "weapon"),
    ac: 11, hitDice: "2d4", attackBonus: 2, damage: "1d4", wisMod: -1,
  }),
  mon("diablerie", "bittermold", "Bittermold Scuttler", {
    level: 1, role: "vermin", archetype: "ooze", size: "small", speed: 85,
    art: art(0x5a6b3a, 0x34401f, 0x9ac673, 0xdeda6b),
    ac: 12, hitDice: "1d6", attackBonus: 1, damage: "1d6", wisMod: 0,
    specialAbility: "split",
  }),
  mon("diablerie", "bogthorn", "Bogthorn", {
    level: 2, role: "soldier", archetype: "plant", size: "medium", speed: 80,
    art: art(0x4a5c34, 0x28341c, 0xc0506a, 0xe0e060),
    ac: 13, hitDice: "2d6", attackBonus: 2, damage: "1d4", wisMod: 1,
  }),
  mon("diablerie", "gloom-ogre", "Gloom Ogre", {
    level: 4, role: "champion", archetype: "brute", size: "large", speed: 60,
    art: art(0x765784, 0x584065, 0xc8bd9a, 0xd7dd58, "tusks"),
    ac: 14, hitDice: "4d8", attackBonus: 4, damage: "1d10", wisMod: 0,
  }),
];

// --- RED SANDS: desert wastes and iron fortresses ---------------------------
export const RED_SANDS_ROSTER: readonly MonsterDef[] = [
  mon("red-sands", "sand-jackal", "Sand Jackal", {
    level: 0, role: "vermin", archetype: "quadruped", size: "small",
    art: art(0xb59463, 0x7a6238, 0xe0cfa4, 0xd8a040, "tail"),
    darkvision: false,
  }),
  mon("red-sands", "bandit", "Desert Bandit", {
    level: 1, role: "soldier", archetype: "biped", size: "medium", speed: 90,
    art: art(0xa8804e, 0x6d5230, 0xd8c8a8, 0x2a2420, "weapon"),
    ac: 13, hitDice: "1d8", attackBonus: 1, damage: "1d6", wisMod: 0,
    darkvision: false,
  }),
  mon("red-sands", "ras-godai", "Ras-Godai Assassin", {
    level: 3, role: "skirmisher", archetype: "biped", size: "medium", speed: 115,
    art: art(0x4a2f2c, 0x2a1a18, 0xd4d8de, 0xe6d27b, "weapon"),
    ac: 13, hitDice: "3d8", attackBonus: 4, damage: "1d6", wisMod: 1,
  }),
  mon("red-sands", "giant-scorpion", "Giant Scorpion", {
    level: 3, role: "brute", archetype: "vermin", size: "large", speed: 90,
    art: art(0x7a4d29, 0x4e3018, 0x9e683b, 0xded247, "tail"),
    ac: 14, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 0,
    specialAbility: "poison",
  }),
  mon("red-sands", "ashen-mystic", "Ashen Mystic", {
    level: 3, role: "caster", archetype: "biped", size: "medium",
    art: art(0x6a3a2c, 0x3e2018, 0xf29a4a, 0xffd08a, "robe"),
    darkvision: false,
  }),
  mon("red-sands", "iron-warlord", "Iron Warlord", {
    level: 5, role: "champion", archetype: "brute", size: "large",
    art: art(0x6a5248, 0x3c2c26, 0xf07832, 0xffd45f, "weapon", "horns"),
  }),
];

// --- MIDNIGHT SUN: rime sea caves and frost tombs ---------------------------
export const MIDNIGHT_SUN_ROSTER: readonly MonsterDef[] = [
  mon("midnight-sun", "rime-crab", "Rime Crab", {
    level: 0, role: "vermin", archetype: "vermin", size: "small",
    art: art(0x8fb0c0, 0x556c7c, 0xd0e8f4, 0x2a3440),
  }),
  mon("midnight-sun", "skeleton", "Skeleton", {
    level: 1, role: "soldier", archetype: "skeletal", size: "medium", speed: 70,
    art: art(0xe2dfc6, 0xa9a995, 0x727067, 0x27242a),
    ac: 13, hitDice: "2d6", attackBonus: 2, damage: "1d6", wisMod: 0,
    undead: true,
  }),
  mon("midnight-sun", "frost-raider", "Frost Raider", {
    level: 2, role: "skirmisher", archetype: "biped", size: "medium",
    art: art(0x7c8ea0, 0x475666, 0xcfe6f2, 0x8fd0ee, "weapon", "horns"),
    darkvision: false,
  }),
  mon("midnight-sun", "draugr", "Frost Draugr", {
    level: 3, role: "brute", archetype: "skeletal", size: "medium", speed: 75,
    art: art(0xa8b8b0, 0x5e6a64, 0x8eb7d2, 0x75c7e8, "weapon"),
    ac: 14, hitDice: "3d8", attackBonus: 3, damage: "1d8", wisMod: 0,
    undead: true,
  }),
  mon("midnight-sun", "sea-nymph", "Sea Nymph", {
    level: 3, role: "caster", archetype: "biped", size: "medium", speed: 80,
    art: art(0x4bb5ad, 0x1d5c56, 0xe07989, 0x201b20),
    ac: 13, hitDice: "3d8", attackBonus: 2, damage: "1d6", wisMod: 1,
  }),
  mon("midnight-sun", "dire-wolf", "Dire Wolf", {
    level: 4, role: "champion", archetype: "quadruped", size: "large", speed: 105,
    art: art(0x6a6a72, 0x3e3e46, 0xb0b0bc, 0xd8d050, "mane", "tail"),
    ac: 12, hitDice: "4d8", attackBonus: 4, damage: "1d8", wisMod: 1,
  }),
];

// --- RIVER OF NIGHT: jungle ziggurats and cenotes ---------------------------
export const RIVER_OF_NIGHT_ROSTER: readonly MonsterDef[] = [
  mon("river-of-night", "blood-tick-swarm", "Blood Tick Swarm", {
    level: 0, role: "vermin", archetype: "swarm", size: "small",
    art: art(0x6a2a2a, 0x3c1616, 0xb0503a, 0xe0c060),
  }),
  mon("river-of-night", "viperian", "Viperian Warrior", {
    level: 2, role: "soldier", archetype: "serpent", size: "medium", speed: 90,
    art: art(0x3f7a4a, 0x22452a, 0xc8d060, 0xe0c040, "weapon"),
    ac: 13, hitDice: "2d8", attackBonus: 2, damage: "1d6", wisMod: 0,
    specialAbility: "poison",
  }),
  mon("river-of-night", "rot-flower", "Rot Flower", {
    level: 2, role: "brute", archetype: "plant", size: "medium", speed: 50,
    art: art(0x5a6b3a, 0x34401f, 0xc0506a, 0xe0e060),
    ac: 11, hitDice: "2d8", attackBonus: 2, damage: "1d6", wisMod: -2,
    darkvision: false,
  }),
  mon("river-of-night", "giant-spider", "Giant Spider", {
    level: 3, role: "skirmisher", archetype: "spider", size: "medium", speed: 100,
    art: art(0x2b1d24, 0x140d12, 0x4a2c35, 0xdb3535, "manyEyes"),
    ac: 13, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 1,
    specialAbility: "web",
  }),
  mon("river-of-night", "viperian-oracle", "Viperian Oracle", {
    level: 4, role: "caster", archetype: "serpent", size: "medium",
    art: art(0x2f5a6a, 0x18333e, 0x61b870, 0xe0d060, "robe"),
  }),
  mon("river-of-night", "ziggurat-guardian", "Ziggurat Guardian", {
    level: 5, role: "champion", archetype: "brute", size: "large",
    art: art(0x8da899, 0x4e6058, 0x61b870, 0xffd45f, "weapon"),
  }),
];

// --- DWELLERS IN THE DEEP: abyssal grottos and archives ---------------------
export const DEEP_ROSTER: readonly MonsterDef[] = [
  mon("dwellers-in-the-deep", "giant-rat", "Giant Rat", {
    level: 0, role: "vermin", archetype: "vermin", size: "small", speed: 110,
    art: art(0x5f493e, 0x302527, 0x8a6b5b, 0xf05b62, "tail"),
    ac: 12, hitDice: "1d6", attackBonus: 1, damage: "1d4", wisMod: -2,
  }),
  mon("dwellers-in-the-deep", "blind-eel", "Blind Eel", {
    level: 2, role: "skirmisher", archetype: "serpent", size: "medium",
    art: art(0x5a6470, 0x323a44, 0xa8c0c8, 0xd8e8f0),
  }),
  mon("dwellers-in-the-deep", "deep-one", "Deep One", {
    level: 2, role: "soldier", archetype: "biped", size: "medium", speed: 80,
    art: art(0x3f6a6a, 0x21393a, 0x8fbcb0, 0xdeda6b),
    ac: 13, hitDice: "2d8", attackBonus: 2, damage: "1d6", wisMod: 0,
    specialAbility: "engulf",
  }),
  mon("dwellers-in-the-deep", "cave-creeper", "Cave Creeper", {
    level: 3, role: "brute", archetype: "vermin", size: "medium", speed: 85,
    art: art(0x42384a, 0x241f2a, 0x655473, 0xdeda6b),
    ac: 13, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 0,
  }),
  mon("dwellers-in-the-deep", "shadow", "Living Shadow", {
    level: 3, role: "caster", archetype: "elemental", size: "medium", speed: 95,
    art: art(0x2a2438, 0x14101e, 0xa68ad1, 0xc07be0),
    ac: 12, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 1,
    undead: true, specialAbility: "shadow-extinct",
  }),
  mon("dwellers-in-the-deep", "deep-priest", "Deep Priest", {
    level: 5, role: "champion", archetype: "biped", size: "large",
    art: art(0x2f5a58, 0x173230, 0xa68ad1, 0x71d58b, "robe", "horns"),
  }),
];

// --- CITY OF MASKS: rooftops and sunken guilds -------------------------------
export const CITY_OF_MASKS_ROSTER: readonly MonsterDef[] = [
  mon("city-of-masks", "sewer-rat-swarm", "Sewer Rat Swarm", {
    level: 0, role: "vermin", archetype: "swarm", size: "small",
    art: art(0x5f493e, 0x302527, 0x8a6b5b, 0xf05b62),
  }),
  mon("city-of-masks", "thug", "Guild Thug", {
    level: 1, role: "soldier", archetype: "biped", size: "medium", speed: 85,
    art: art(0x4a4048, 0x282228, 0xb5a7a0, 0x2a2420, "weapon"),
    ac: 12, hitDice: "1d8", attackBonus: 1, damage: "1d6", wisMod: 0,
    darkvision: false,
  }),
  mon("city-of-masks", "animated-armor", "Animated Armor", {
    level: 2, role: "brute", archetype: "brute", size: "medium", speed: 65,
    art: art(0x8b8f98, 0x4e525a, 0xd4d8de, 0xd69a72, "weapon"),
    ac: 15, hitDice: "2d8", attackBonus: 3, damage: "1d8", wisMod: 1,
    specialAbility: "corrode",
  }),
  mon("city-of-masks", "thief-rogue", "Masked Rogue", {
    level: 3, role: "skirmisher", archetype: "biped", size: "medium", speed: 95,
    art: art(0x1d473d, 0x0f2a24, 0xd4d8de, 0xe6d27b, "weapon"),
    ac: 13, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 1,
    darkvision: false,
  }),
  mon("city-of-masks", "masked-conjurer", "Masked Conjurer", {
    level: 3, role: "caster", archetype: "biped", size: "medium",
    art: art(0x3a2a40, 0x1e1622, 0xd4a45f, 0xc07be0, "robe"),
    darkvision: false,
  }),
  mon("city-of-masks", "guild-master", "Guild Master", {
    level: 5, role: "champion", archetype: "biped", size: "medium",
    art: art(0x40303c, 0x221820, 0xd4a45f, 0xe6d27b, "weapon", "robe"),
    darkvision: false,
  }),
];

for (const [biome, roster] of [
  ["red-sands", RED_SANDS_ROSTER],
  ["midnight-sun", MIDNIGHT_SUN_ROSTER],
  ["river-of-night", RIVER_OF_NIGHT_ROSTER],
  ["dwellers-in-the-deep", DEEP_ROSTER],
  ["city-of-masks", CITY_OF_MASKS_ROSTER],
] as const) {
  assertRosterComplete(biome, roster);
}
