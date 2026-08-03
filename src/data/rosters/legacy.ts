/**
 * Legacy roster re-exports & holdovers.
 *
 * Each zone now carries its full authored roster in a dedicated file.
 */

import type { MonsterArt, MonsterDef } from "../../engine";
import { mon } from "./build";

export { RED_SANDS_ROSTER } from "./red-sands";
export { MIDNIGHT_SUN_ROSTER } from "./midnight-sun";
export { RIVER_OF_NIGHT_ROSTER } from "./river-of-night";
export { DEEP_ROSTER } from "./dwellers-in-the-deep";
export { CITY_OF_MASKS_ROSTER } from "./city-of-masks";

const art = (
  body: number,
  shade: number,
  accent: number,
  eye: number,
  ...features: NonNullable<MonsterArt["features"]>
): MonsterArt => ({ body, shade, accent, eye, features });

// --- Diablerie holdovers: original four from the black forest ---
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
