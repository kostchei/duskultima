/**
 * Zone rosters at the play layer.
 *
 * Dungeon grids are authored with monster *roles* — `r` is vermin, `g` a
 * skirmisher, `s` a line soldier, `O` the champion that holds the room. Which
 * creature fills the tile is decided here, from the scroll the party descended
 * under and the level they have actually reached. That is what makes a vault
 * spawn things sized for the party instead of the same goblin forever.
 */

import { fitWave, type Dice, type MonsterBiome, type MonsterDef, type MonsterRole } from "../../engine";
import { monsterForRole, monstersForBiome } from "../../data/monsters";

/** The grid glyphs that place a monster. */
export type MonsterGlyph = "g" | "s" | "r" | "O";

export const MONSTER_GLYPHS: readonly MonsterGlyph[] = ["g", "s", "r", "O"];

/**
 * Each glyph's role, and the variant it sometimes rolls instead. A `g` tile is
 * usually a skirmisher but occasionally a brute; an `s` tile is usually a line
 * soldier but occasionally that line's caster. Without this, brutes and casters
 * would only ever appear in the encounter deck.
 */
const GLYPH_ROLES: Record<MonsterGlyph, { common: MonsterRole; variant: MonsterRole }> = {
  g: { common: "skirmisher", variant: "brute" },
  s: { common: "soldier", variant: "caster" },
  r: { common: "vermin", variant: "vermin" },
  O: { common: "champion", variant: "champion" },
};

/** One roll in six turns a tile over to its variant role. */
export function roleForGlyph(dice: Dice, glyph: MonsterGlyph): MonsterRole {
  const roles = GLYPH_ROLES[glyph];
  if (!roles) throw new Error(`Glyph "${glyph}" does not place a monster`);
  return dice.die(6) === 1 ? roles.variant : roles.common;
}

/** The monster a grid glyph resolves to for this zone and party level. */
export function monsterForGlyph(
  dice: Dice,
  zone: MonsterBiome,
  glyph: MonsterGlyph,
  partyLevel: number,
): MonsterDef {
  return monsterForRole(dice, zone, roleForGlyph(dice, glyph), partyLevel);
}

/**
 * The roles a wandering encounter draws from, weighted toward the ordinary.
 * Champions never wander: they are what a room is built around.
 */
const ENCOUNTER_ROLES: readonly MonsterRole[] = [
  "vermin",
  "vermin",
  "skirmisher",
  "skirmisher",
  "soldier",
  "brute",
  "caster",
  "skirmisher",
];

export function encounterMonster(dice: Dice, zone: MonsterBiome, partyLevel: number): MonsterDef {
  const role = ENCOUNTER_ROLES[dice.die(ENCOUNTER_ROLES.length) - 1]!;
  return monsterForRole(dice, zone, role, partyLevel);
}

/**
 * A whole wandering wave: one kind of monster, in a number the party can be
 * expected to survive. Chaff arrives in a swarm and a brute arrives alone,
 * because the budget is counted in monster levels rather than bodies.
 */
export function encounterWave(
  dice: Dice,
  zone: MonsterBiome,
  partyLevel: number,
  partySize: number,
): readonly MonsterDef[] {
  const role = ENCOUNTER_ROLES[dice.die(ENCOUNTER_ROLES.length) - 1]!;
  return fitWave(dice, monstersForBiome(zone), role, partyLevel, partySize);
}
