import { getBaseRole, type Character } from "./character";
import { highestAvailableDamagingSpellIndex, spell } from "../data/spells";

export type FollowerMode = "manual" | "auto";
export type LeaderIntent = "move" | "attack" | "cast" | "pass";
export type AutoSupportAction =
  | { kind: "follow" }
  | { kind: "attack" }
  | { kind: "cast"; spellId: string }
  | { kind: "none"; reason: string };

export interface AutoSupportContext {
  leaderIntent: LeaderIntent;
  /** Whether a hostile target is available in the follower's effective range. */
  hasThreat?: boolean;
  leaderHpPercent?: number;
}

/**
 * Small, deterministic party AI. It makes a useful support decision without
 * stealing the leader's turn: followers move on movement, heal an endangered
 * leader when able, otherwise use their strongest available offensive spell,
 * and fall back to a weapon attack.
 */
export function chooseAutoSupportAction(
  follower: Character,
  leader: Character,
  context: AutoSupportContext,
): AutoSupportAction {
  if (follower.dead || follower.hp <= 0) return { kind: "none", reason: "fallen" };
  if (context.leaderIntent === "move") return { kind: "follow" };

  const leaderHpPercent = context.leaderHpPercent ?? leader.hp / Math.max(1, leader.maxHp);
  const role = getBaseRole(follower.className);
  const cure = follower.knownSpells.find((known) =>
    known.status === "available" && known.spellId === "cure_wounds",
  );
  if ((context.leaderIntent === "attack" || context.leaderIntent === "cast" || context.leaderIntent === "pass") &&
      role === "priest" && leaderHpPercent <= 0.5 && cure) {
    return { kind: "cast", spellId: cure.spellId };
  }

  if (context.hasThreat && (context.leaderIntent === "attack" || context.leaderIntent === "cast")) {
    const damagingIndex = highestAvailableDamagingSpellIndex(follower);
    const known = damagingIndex >= 0 ? follower.knownSpells[damagingIndex] : undefined;
    if (known && spell(known.spellId).target !== "ally") return { kind: "cast", spellId: known.spellId };
    return { kind: "attack" };
  }

  return context.leaderIntent === "pass" ? { kind: "none", reason: "no immediate support" } : { kind: "follow" };
}
