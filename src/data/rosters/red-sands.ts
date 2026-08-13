/**
 * Red Sands Roster: Dunes, iron fortresses, and burning mines.
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
  mon("red-sands", id, name, spec);

const DESERT = art(0xb59463, 0x7a6238, 0xe0cfa4, 0xd8a040);
const BANDIT = art(0xa8804e, 0x6d5230, 0xd8c8a8, 0x2a2420, "weapon");
const ASSASSIN = art(0x4a2f2c, 0x2a1a18, 0xd4d8de, 0xe6d27b, "weapon");
const SCORPION = art(0x7a4d29, 0x4e3018, 0x9e683b, 0xded247, "tail");
const MYSTIC = art(0x6a3a2c, 0x3e2018, 0xf29a4a, 0xffd08a, "robe");
const WARLORD = art(0x6a5248, 0x3c2c26, 0xf07832, 0xffd45f, "weapon", "horns");
const FIRE = art(0xd04020, 0x802010, 0xff9030, 0xffd040);
const DEVIL = art(0x5a2a2a, 0x321616, 0xa84030, 0xe0d040, "horns");
const GOLEM = art(0x8a7a60, 0x544a3a, 0xc0b090, 0xff8030);
const DRAGON = art(0x9a3a2a, 0x5a1f1a, 0xf0a040, 0xffd040, "wings");

export const RED_SANDS_ROSTER: readonly MonsterDef[] = [
  // --- LV 0 ---
  d("sand-jackal", "Sand Jackal", { level: 0, role: "vermin", archetype: "quadruped", size: "small", art: DESERT, darkvision: false }),
  d("scorpion", "Scorpion", { level: 0, role: "vermin", archetype: "vermin", size: "tiny", art: SCORPION }),

  // --- LV 1 ---
  d("desert-bandit", "Desert Bandit", { level: 1, role: "soldier", archetype: "biped", size: "medium", speed: 90, art: BANDIT, ac: 13, hitDice: "1d8", attackBonus: 1, damage: "1d6", wisMod: 0, darkvision: false }),
  d("donkey", "Donkey", { level: 1, role: "vermin", archetype: "quadruped", size: "medium", art: DESERT, darkvision: false }),
  d("rookie", "Rookie Pit Fighter", { level: 1, role: "soldier", archetype: "biped", size: "medium", art: BANDIT, darkvision: false }),
  d("cobra-snake", "Cobra Snake", { level: 1, role: "vermin", archetype: "serpent", size: "small", art: SCORPION, specialAbility: "poison" }),
  d("kobold", "Kobold", { level: 1, role: "skirmisher", archetype: "biped", size: "small", art: BANDIT }),
  d("apprentice", "Apprentice Sorcerer", { level: 1, role: "caster", archetype: "biped", size: "medium", art: MYSTIC, darkvision: false }),

  // --- LV 2 ---
  d("silver-camel", "Silver Camel", { level: 2, role: "skirmisher", archetype: "quadruped", size: "medium", art: DESERT, darkvision: false }),
  d("scrag", "Scrag Monitor Lizard", { level: 2, role: "brute", archetype: "vermin", size: "large", art: DESERT }),
  d("siruul", "Siruul Nomad", { level: 2, role: "skirmisher", archetype: "biped", size: "medium", art: BANDIT, darkvision: false }),
  d("camel", "Camel", { level: 2, role: "skirmisher", archetype: "quadruped", size: "medium", art: DESERT, darkvision: false }),
  d("velociraptor", "Velociraptor", { level: 2, role: "skirmisher", archetype: "biped", size: "small", art: DESERT }),
  d("dretch-demon", "Dretch Demon", { level: 2, role: "vermin", archetype: "biped", size: "small", art: DEVIL }),
  d("imp-devil", "Imp Devil", { level: 2, role: "caster", archetype: "flyer", size: "tiny", art: DEVIL }),
  d("giant-dung-beetle", "Giant Dung Beetle", { level: 2, role: "vermin", archetype: "vermin", size: "medium", art: DESERT }),
  d("horse", "Horse", { level: 2, role: "skirmisher", archetype: "quadruped", size: "large", art: DESERT, darkvision: false }),

  // --- LV 3 ---
  d("ras-godai", "Ras-Godai Assassin", { level: 3, role: "skirmisher", archetype: "biped", size: "medium", speed: 115, art: ASSASSIN, ac: 13, hitDice: "3d8", attackBonus: 4, damage: "1d6", wisMod: 1 }),
  d("giant-scorpion", "Giant Scorpion", { level: 3, role: "brute", archetype: "vermin", size: "large", speed: 90, art: SCORPION, ac: 14, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 0, specialAbility: "poison" }),
  d("ashen-mystic", "Ashen Mystic", { level: 3, role: "caster", archetype: "biped", size: "medium", art: MYSTIC, darkvision: false }),
  d("war-horse", "War Horse", { level: 3, role: "soldier", archetype: "quadruped", size: "large", art: DESERT }),
  d("war-scrag", "War Scrag", { level: 3, role: "brute", archetype: "vermin", size: "large", art: DESERT }),
  d("lion", "Lion", { level: 3, role: "skirmisher", archetype: "quadruped", size: "medium", art: DESERT }),
  d("smilodon", "Smilodon", { level: 3, role: "brute", archetype: "quadruped", size: "large", art: DESERT }),
  d("azer", "Azer Fire Dwarf", { level: 3, role: "soldier", archetype: "biped", size: "medium", art: FIRE }),
  d("barbed-devil", "Barbed Devil", { level: 3, role: "soldier", archetype: "biped", size: "medium", art: DEVIL }),
  d("piranha-swarm", "Piranha Swarm", { level: 3, role: "vermin", archetype: "swarm", size: "medium", art: FIRE }),
  d("scarab-swarm", "Scarab Swarm", { level: 3, role: "vermin", archetype: "swarm", size: "medium", art: DESERT }),

  // --- LV 4 ---
  d("dunefiend", "Dunefiend", { level: 4, role: "skirmisher", archetype: "biped", size: "medium", art: DEVIL }),
  d("gorilla", "Gorilla", { level: 4, role: "brute", archetype: "biped", size: "large", art: DESERT }),
  d("pterodactyl", "Pterodactyl", { level: 4, role: "skirmisher", archetype: "flyer", size: "large", art: DESERT }),
  d("snake-swarm", "Snake Swarm", { level: 4, role: "vermin", archetype: "swarm", size: "medium", art: SCORPION, specialAbility: "poison" }),
  d("hell-hound", "Hell Hound", { level: 4, role: "brute", archetype: "quadruped", size: "medium", art: FIRE }),
  d("rust-monster", "Rust Monster", { level: 4, role: "vermin", archetype: "vermin", size: "medium", art: GOLEM, specialAbility: "corrode" }),

  // --- LV 5 ---
  d("iron-warlord", "Iron Warlord", { level: 5, role: "champion", archetype: "brute", size: "large", art: WARLORD }),
  d("hero", "Gladiator Hero", { level: 5, role: "champion", archetype: "biped", size: "medium", art: BANDIT }),
  d("salamander", "Salamander", { level: 5, role: "brute", archetype: "serpent", size: "large", art: FIRE }),
  d("giant-snake", "Giant Snake", { level: 5, role: "brute", archetype: "serpent", size: "large", art: SCORPION, specialAbility: "poison" }),
  d("rhinoceros", "Rhinoceros", { level: 5, role: "brute", archetype: "quadruped", size: "huge", art: DESERT }),

  // --- LV 6 ---
  d("canyon-ape", "Canyon Ape", { level: 6, role: "brute", archetype: "biped", size: "large", art: DESERT }),
  d("succubus-incubus", "Succubus / Incubus", { level: 6, role: "caster", archetype: "biped", size: "medium", art: DEVIL }),
  d("nightmare", "Nightmare", { level: 6, role: "skirmisher", archetype: "quadruped", size: "large", art: FIRE }),
  d("manticore", "Manticore", { level: 6, role: "champion", archetype: "quadruped", size: "large", art: DESERT }),

  // --- LV 7 ---
  d("gorgon", "Gorgon Iron Bull", { level: 7, role: "brute", archetype: "quadruped", size: "large", art: GOLEM }),

  // --- LV 8 ---
  d("dust-devil", "Dust Devil", { level: 8, role: "brute", archetype: "elemental", size: "large", art: DESERT }),
  d("mirage", "Mirage", { level: 8, role: "caster", archetype: "elemental", size: "medium", art: MYSTIC }),
  d("clay-golem", "Clay Golem", { level: 8, role: "brute", archetype: "brute", size: "large", art: GOLEM }),
  d("stone-golem", "Stone Golem", { level: 8, role: "brute", archetype: "brute", size: "large", art: GOLEM }),
  d("rakshasa", "Rakshasa", { level: 8, role: "caster", archetype: "biped", size: "medium", art: BANDIT }),
  d("bulette", "Bulette", { level: 8, role: "brute", archetype: "quadruped", size: "huge", art: DESERT }),
  d("wyvern", "Wyvern", { level: 8, role: "champion", archetype: "flyer", size: "large", art: DESERT, ac: 15, hitDice: "8d8", attackBonus: 7, damage: "2d8" }),

  // --- LV 9 ---
  d("sphinx", "Sphinx", { level: 9, role: "caster", archetype: "quadruped", size: "huge", art: DESERT }),

  // --- LV 10 ---
  d("iron-golem", "Iron Golem", { level: 10, role: "champion", archetype: "brute", size: "huge", art: GOLEM }),
  d("djinni", "Djinni", { level: 10, role: "caster", archetype: "elemental", size: "large", art: MYSTIC }),
  d("mummy", "Mummy", { level: 10, role: "soldier", archetype: "biped", size: "medium", art: BANDIT, undead: true }),
  d("desert-dragon", "Desert Dragon", { level: 13, role: "champion", archetype: "flyer", size: "gargantuan", art: DESERT, ac: 17, hitDice: "13d8", attackBonus: 9, damage: "3d10" }),
  d("fire-dragon", "Fire Dragon", { level: 17, role: "champion", archetype: "flyer", size: "gargantuan", art: DRAGON, ac: 18, hitDice: "17d8", attackBonus: 10, damage: "3d12" }),
  d("purple-worm", "Purple Worm", { level: 12, role: "champion", archetype: "vermin", size: "gargantuan", art: DESERT, ac: 18, hitDice: "12d8", attackBonus: 8, damage: "2d12" }),
];

assertRosterComplete("red-sands", RED_SANDS_ROSTER);
