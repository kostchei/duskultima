/**
 * City of Masks Roster: Rooftops, sunken guilds, and masked temples.
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
  mon("city-of-masks", id, name, spec);

const RAT = art(0x5f493e, 0x302527, 0x8a6b5b, 0xf05b62);
const THUG = art(0x4a4048, 0x282228, 0xb5a7a0, 0x2a2420, "weapon");
const ARMOR = art(0x8b8f98, 0x4e525a, 0xd4d8de, 0xd69a72, "weapon");
const ROGUE = art(0x1d473d, 0x0f2a24, 0xd4d8de, 0xe6d27b, "weapon");
const CONJURER = art(0x3a2a40, 0x1e1622, 0xd4a45f, 0xc07be0, "robe");
const GUILD_MASTER = art(0x40303c, 0x221820, 0xd4a45f, 0xe6d27b, "weapon", "robe");
const MASKED = art(0x7a2a40, 0x401622, 0xf0c050, 0xe0e060, "robe", "horns");
const FIEND = art(0x801515, 0x4a0a0a, 0xf07030, 0xffd040, "horns", "wings");

export const CITY_OF_MASKS_ROSTER: readonly MonsterDef[] = [
  // --- LV 0 ---
  d("sewer-rat-swarm", "Sewer Rat Swarm", { level: 0, role: "vermin", archetype: "swarm", size: "small", art: RAT }),

  // --- LV 1 ---
  d("thug", "Guild Thug", { level: 1, role: "soldier", archetype: "biped", size: "medium", speed: 85, art: THUG, ac: 12, hitDice: "1d8", attackBonus: 1, damage: "1d6", wisMod: 0, darkvision: false }),

  // --- LV 2 ---
  d("animated-armor", "Animated Armor", { level: 2, role: "brute", archetype: "brute", size: "medium", speed: 65, art: ARMOR, ac: 15, hitDice: "2d8", attackBonus: 3, damage: "1d8", wisMod: 1, specialAbility: "corrode" }),
  d("elf", "Noble Elf Duelist", { level: 2, role: "skirmisher", archetype: "biped", size: "medium", art: ROGUE, darkvision: false }),
  d("dire-rat", "Dire Rat", { level: 2, role: "vermin", archetype: "vermin", size: "small", art: RAT }),

  // --- LV 3 ---
  d("thief-rogue", "Masked Rogue", { level: 3, role: "skirmisher", archetype: "biped", size: "medium", speed: 95, art: ROGUE, ac: 13, hitDice: "3d8", attackBonus: 3, damage: "1d6", wisMod: 1, darkvision: false }),
  d("masked-conjurer", "Masked Conjurer", { level: 3, role: "caster", archetype: "biped", size: "medium", art: CONJURER, darkvision: false }),

  // --- LV 5 ---
  d("guild-master", "Guild Master", { level: 5, role: "champion", archetype: "biped", size: "medium", art: GUILD_MASTER, darkvision: false }),

  // --- LV 6 ---
  d("mage", "High Mage", { level: 6, role: "caster", archetype: "biped", size: "medium", art: CONJURER, darkvision: false }),
  d("rat-swarm", "Giant Rat Swarm", { level: 6, role: "vermin", archetype: "swarm", size: "medium", art: RAT }),
  d("ogre", "Ogre Bouncer", { level: 6, role: "brute", archetype: "brute", size: "large", art: THUG }),
  d("owlbear", "Owlbear Guard", { level: 6, role: "brute", archetype: "quadruped", size: "large", art: ARMOR }),

  // --- LV 7 ---
  d("elephant", "War Elephant", { level: 7, role: "brute", archetype: "quadruped", size: "huge", art: ARMOR }),
  d("flesh-golem", "Flesh Golem", { level: 7, role: "brute", archetype: "brute", size: "large", art: ARMOR }),
  d("horned-devil", "Horned Devil", { level: 7, role: "soldier", archetype: "biped", size: "large", art: FIEND }),
  d("triceratops", "Triceratops", { level: 7, role: "brute", archetype: "quadruped", size: "huge", art: ARMOR }),

  // --- LV 8 ---
  d("night-hag-city", "Night Hag of the Gutter", { level: 8, role: "caster", archetype: "biped", size: "medium", art: CONJURER }),
  d("medusa", "Medusa Cultist", { level: 8, role: "caster", archetype: "biped", size: "medium", art: MASKED }),
];

assertRosterComplete("city-of-masks", CITY_OF_MASKS_ROSTER);
