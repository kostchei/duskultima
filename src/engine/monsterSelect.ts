/**
 * Party-level-appropriate monster selection.
 *
 * Monsters carry levels, so a fight is sized by comparing monster levels to
 * the party's. The dungeon grid never names a monster: it places a
 * role ("something vermin lives here", "a champion holds this dais"), and this
 * module resolves that role against the active zone's roster at the level the
 * party has actually reached. The same climax tile is a Quillboar Chopper at
 * party level 1 and a Daeodon at party level 8.
 *
 * Pure and dice-driven so it can be tested without a scene.
 */

import type { Dice } from "./dice";
import type { MonsterDef, MonsterRole } from "./monster";

/**
 * How far from the party's level each role is aimed. Vermin are chaff the
 * party outclasses; champions are meant to be the hardest thing in the room.
 */
const ROLE_LEVEL_OFFSET: Record<MonsterRole, number> = {
  vermin: -3,
  skirmisher: -1,
  soldier: 0,
  caster: 0,
  brute: 1,
  champion: 2,
};

/** How wide a level band around the target still counts as an on-level pick. */
const ROLE_BAND: Record<MonsterRole, number> = {
  vermin: 1,
  skirmisher: 1,
  soldier: 1,
  caster: 1,
  brute: 1,
  // A champion is already aimed two levels over the party; widening its band
  // as well is how a solo level-1 fighter ends up alone with a level-5 boss.
  champion: 1,
};

/** Group size rolled for a spawn of this role. */
const ROLE_PACK_DICE: Record<MonsterRole, string> = {
  vermin: "2d4",
  skirmisher: "1d4",
  soldier: "1d3",
  brute: "1d2",
  caster: "1d2",
  champion: "1d1",
};

/** The monster level a role aims for against a given party level. */
export function targetLevel(role: MonsterRole, partyLevel: number): number {
  if (!Number.isInteger(partyLevel) || partyLevel < 1) {
    throw new Error(`Party level must be a positive integer, got ${partyLevel}`);
  }
  const offset = ROLE_LEVEL_OFFSET[role];
  if (offset === undefined) throw new Error(`Unknown monster role "${role}"`);
  return Math.max(0, Math.min(30, partyLevel + offset));
}

/**
 * The roster entries of one role that sit on-level for this party. Empty when
 * the roster has that role but nothing near the target level — callers fall
 * through to {@link nearestByLevel}, which is a defined widening of the search,
 * not a silent substitution.
 */
function onLevelCandidates(
  roster: readonly MonsterDef[],
  role: MonsterRole,
  partyLevel: number,
): readonly MonsterDef[] {
  const target = targetLevel(role, partyLevel);
  const band = ROLE_BAND[role]!;
  return roster.filter(
    (m) => m.role === role && Math.abs(m.level - target) <= band,
  );
}

/** The role's entries closest to the target level, ties kept for a dice pick. */
function nearestByLevel(
  roster: readonly MonsterDef[],
  role: MonsterRole,
  partyLevel: number,
): readonly MonsterDef[] {
  const target = targetLevel(role, partyLevel);
  const ofRole = roster.filter((m) => m.role === role);
  if (ofRole.length === 0) return [];
  const best = Math.min(...ofRole.map((m) => Math.abs(m.level - target)));
  return ofRole.filter((m) => Math.abs(m.level - target) === best);
}

/**
 * Roles in ascending threat. A roster's top end is usually thinner than its
 * bottom — there are more kinds of chaff than there are archliches — so a
 * high-level party can out-scale a role entirely.
 */
const ROLE_LADDER: readonly MonsterRole[] = [
  "vermin",
  "skirmisher",
  "soldier",
  "caster",
  "brute",
  "champion",
];

/** How far under the target a role may fall before the tile escalates. */
const ESCALATION_GAP = 3;

/**
 * Pick one monster of `role` sized for `partyLevel`.
 *
 * When the roster's best answer for a role is more than {@link ESCALATION_GAP}
 * levels beneath the target, the tile escalates up the role ladder rather than
 * fielding chaff: a level-9 party's skirmisher tile should hold something that
 * can threaten them, not the same rotgrub swarm a level-1 party stepped over.
 * That is a stated selection policy, not a silent substitution — and if no role
 * on the ladder can staff the tile at all, this throws.
 */
export function pickMonster(
  dice: Dice,
  roster: readonly MonsterDef[],
  role: MonsterRole,
  partyLevel: number,
): MonsterDef {
  const startIndex = ROLE_LADDER.indexOf(role);
  if (startIndex < 0) throw new Error(`Unknown monster role "${role}"`);

  let best: readonly MonsterDef[] = [];
  for (let i = startIndex; i < ROLE_LADDER.length; i++) {
    const candidate = ROLE_LADDER[i]!;
    const onLevel = onLevelCandidates(roster, candidate, partyLevel);
    if (onLevel.length > 0) return onLevel[dice.die(onLevel.length) - 1]!;

    const nearest = nearestByLevel(roster, candidate, partyLevel);
    if (nearest.length === 0) continue;
    // Remember the strongest thing the ladder offered, so a party that has
    // out-scaled the entire zone still meets its toughest inhabitants.
    if (best.length === 0 || nearest[0]!.level > best[0]!.level) best = nearest;
    // Escalate only while the shortfall is a real one; a role that lands just
    // under the target is a fine answer and stops the walk.
    if (targetLevel(role, partyLevel) - nearest[0]!.level <= ESCALATION_GAP) {
      return nearest[dice.die(nearest.length) - 1]!;
    }
  }
  if (best.length === 0) throw new Error(`Roster declares no monster with role "${role}"`);
  return best[dice.die(best.length) - 1]!;
}

/** How many of this role show up together. */
function rollPackSize(dice: Dice, role: MonsterRole): number {
  const packDice = ROLE_PACK_DICE[role];
  if (!packDice) throw new Error(`Unknown monster role "${role}"`);
  return Math.max(1, dice.roll(packDice));
}

/**
 * Total monster levels a party of this size and level can be expected to beat
 * in one encounter. The rule of thumb is parity, so the budget is the party's
 * summed levels; level-0 chaff counts as a half so swarms stay legal.
 */
function encounterBudget(partySize: number, partyLevel: number): number {
  if (!Number.isInteger(partySize) || partySize < 1) {
    throw new Error(`Party size must be a positive integer, got ${partySize}`);
  }
  if (!Number.isInteger(partyLevel) || partyLevel < 1) {
    throw new Error(`Party level must be a positive integer, got ${partyLevel}`);
  }
  return partySize * partyLevel;
}

/** A monster's cost against {@link encounterBudget}; level-0 chaff is a half. */
function budgetCost(def: MonsterDef): number {
  return def.level === 0 ? 0.5 : def.level;
}

/**
 * Fill a wave of one role without blowing the encounter budget. Always returns
 * at least one monster: an encounter that rolls empty is worse than one that
 * overspends by a single chaff monster.
 */
export function fitWave(
  dice: Dice,
  roster: readonly MonsterDef[],
  role: MonsterRole,
  partyLevel: number,
  partySize: number,
): readonly MonsterDef[] {
  const def = pickMonster(dice, roster, role, partyLevel);
  const budget = encounterBudget(partySize, partyLevel);
  const rolled = rollPackSize(dice, role);
  const affordable = Math.max(1, Math.floor(budget / budgetCost(def)));
  return Array.from({ length: Math.min(rolled, affordable) }, () => def);
}
