/**
 * Midnight Sun Roster: Ice caves, frost tombs, and open glaciers.
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
  mon("midnight-sun", id, name, spec);

const ICE = art(0x8fb0c0, 0x556c7c, 0xd0e8f4, 0x2a3440);
const FROST_WARRIOR = art(0x7c8ea0, 0x475666, 0xcfe6f2, 0x8fd0ee, "weapon", "horns");
const SKELETON = art(0xe2dfc6, 0xa9a995, 0x727067, 0x27242a);
const DRAUGR = art(0xa8b8b0, 0x5e6a64, 0x8eb7d2, 0x75c7e8, "weapon");
const NYMPH = art(0x4bb5ad, 0x1d5c56, 0xe07989, 0x201b20);
const WOLF = art(0x6a6a72, 0x3e3e46, 0xb0b0bc, 0xd8d050, "mane", "tail");
const DRAKE = art(0x6a4078, 0x3d2048, 0x9f60b8, 0xe0c040, "wings");
const BEAST = art(0x5a4a3a, 0x342a1f, 0xc0b090, 0xd04040);

export const MIDNIGHT_SUN_ROSTER: readonly MonsterDef[] = [
  // --- LV 0 ---
  d("rime-crab", "Rime Crab", { level: 0, role: "vermin", archetype: "vermin", size: "small", art: ICE }),

  // --- LV 1 ---
  d("skeleton", "Skeleton", { level: 1, role: "soldier", archetype: "skeletal", size: "medium", speed: 70, art: SKELETON, ac: 13, hitDice: "2d6", attackBonus: 2, damage: "1d6", wisMod: 0, undead: true }),
  d("mastiff", "Mastiff", { level: 1, role: "skirmisher", archetype: "quadruped", size: "medium", art: WOLF, darkvision: false }),

  // --- LV 2 ---
  d("frost-raider", "Frost Raider", { level: 2, role: "skirmisher", archetype: "biped", size: "medium", art: FROST_WARRIOR, darkvision: false }),
  d("nord", "Nord Warrior", { level: 2, role: "soldier", archetype: "biped", size: "medium", art: FROST_WARRIOR, darkvision: false }),
  d("giant-bat", "Giant Bat", { level: 2, role: "vermin", archetype: "flyer", size: "medium", art: ICE }),
  d("wolf", "Wolf", { level: 2, role: "skirmisher", archetype: "quadruped", size: "medium", art: WOLF }),

  // --- LV 3 ---
  d("draugr", "Frost Draugr", { level: 3, role: "brute", archetype: "skeletal", size: "medium", speed: 75, art: DRAUGR, ac: 14, hitDice: "3d8", attackBonus: 3, damage: "1d8", wisMod: 0, undead: true }),
  d("sea-nymph", "Sea Nymph", { level: 3, role: "caster", archetype: "biped", size: "medium", speed: 80, art: NYMPH, ac: 13, hitDice: "3d8", attackBonus: 2, damage: "1d6", wisMod: 1 }),
  d("dverg", "Dverg Craftsman", { level: 3, role: "skirmisher", archetype: "biped", size: "small", art: FROST_WARRIOR, darkvision: true }),
  d("cockatrice", "Cockatrice", { level: 3, role: "skirmisher", archetype: "avian", size: "small", art: ICE }),
  d("hippogriff", "Hippogriff", { level: 3, role: "skirmisher", archetype: "avian", size: "large", art: BEAST }),
  d("shark", "Shark", { level: 3, role: "brute", archetype: "serpent", size: "large", art: ICE }),

  // --- LV 4 ---
  d("dire-wolf", "Dire Wolf", { level: 4, role: "champion", archetype: "quadruped", size: "large", speed: 105, art: WOLF, ac: 12, hitDice: "4d8", attackBonus: 4, damage: "1d8", wisMod: 1 }),
  d("oracle", "Nordic Oracle", { level: 4, role: "caster", archetype: "biped", size: "medium", art: NYMPH, darkvision: false }),
  d("moose", "Moose", { level: 4, role: "brute", archetype: "quadruped", size: "large", art: BEAST }),
  d("gargoyle", "Gargoyle", { level: 4, role: "soldier", archetype: "biped", size: "medium", art: ICE }),
  d("snow-ape", "Snow Ape", { level: 4, role: "brute", archetype: "biped", size: "large", art: BEAST }),
  d("bat-swarm", "Bat Swarm", { level: 4, role: "vermin", archetype: "swarm", size: "medium", art: ICE }),
  d("griffon", "Griffon", { level: 4, role: "champion", archetype: "avian", size: "large", art: BEAST }),

  // --- LV 5 ---
  d("frost-draugr-lord", "Frost Draugr Lord", { level: 5, role: "soldier", archetype: "skeletal", size: "medium", art: DRAUGR, undead: true }),
  d("giant-crab", "Giant Crab", { level: 5, role: "brute", archetype: "vermin", size: "large", art: ICE }),
  d("winter-wolf", "Winter Wolf", { level: 5, role: "brute", archetype: "quadruped", size: "large", art: WOLF }),

  // --- LV 6 ---
  d("ghost", "Ghost", { level: 6, role: "caster", archetype: "elemental", size: "medium", art: ICE, undead: true }),
  d("bone-naga", "Bone Naga", { level: 6, role: "caster", archetype: "serpent", size: "large", art: SKELETON, undead: true }),
  d("plesiosaurus", "Plesiosaurus", { level: 6, role: "brute", archetype: "serpent", size: "huge", art: ICE }),

  // --- LV 7 ---
  d("werebear", "Werebear", { level: 7, role: "champion", archetype: "biped", size: "large", art: BEAST }),
  d("frost-troll", "Frost Troll", { level: 7, role: "brute", archetype: "brute", size: "large", art: ICE }),
  d("brown-bear", "Brown Bear", { level: 7, role: "brute", archetype: "quadruped", size: "large", art: BEAST }),

  // --- LV 8 ---
  d("orca", "Orca", { level: 8, role: "brute", archetype: "serpent", size: "huge", art: ICE }),
  d("deep-troll", "Deep Troll", { level: 8, role: "brute", archetype: "brute", size: "large", art: ICE }),
  d("giant-manta-ray", "Giant Manta Ray", { level: 8, role: "skirmisher", archetype: "serpent", size: "huge", art: ICE }),
  d("megalodon-shark", "Megalodon Shark", { level: 8, role: "brute", archetype: "serpent", size: "huge", art: ICE }),
  d("stone-giant", "Stone Giant", { level: 8, role: "brute", archetype: "brute", size: "huge", art: BEAST }),
  d("wraith", "Wraith", { level: 8, role: "caster", archetype: "elemental", size: "medium", art: ICE, undead: true }),

  // --- LV 9 ---
  d("rime-walker", "Rime Walker", { level: 9, role: "champion", archetype: "elemental", size: "huge", art: ICE }),
  d("mammoth", "Mammoth", { level: 9, role: "brute", archetype: "quadruped", size: "gargantuan", art: BEAST }),

  // --- LV 10 ---
  d("remorhaz", "Remorhaz", { level: 10, role: "champion", archetype: "vermin", size: "gargantuan", art: ICE }),

  // --- LV 14 ---
  d("valkyrie", "Valkyrie", { level: 14, role: "champion", archetype: "flyer", size: "medium", art: NYMPH }),
  d("frost-dragon", "Frost Dragon", { level: 14, role: "champion", archetype: "flyer", size: "gargantuan", art: DRAKE, ac: 18, hitDice: "14d8", attackBonus: 10, damage: "3d10" }),
];

assertRosterComplete("midnight-sun", MIDNIGHT_SUN_ROSTER);
