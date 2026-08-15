import { getBaseRole, type Character } from "./character";
import { highestAvailableDamagingSpellIndex, spell } from "../data/spells";

export type FollowerMode = "manual" | "auto";
export type LeaderIntent = "move" | "attack" | "cast" | "pass";
export type AutoSupportAction =
  | { kind: "follow" }
  | { kind: "attack" }
  | { kind: "cast"; spellId: string; targetId?: string }
  | { kind: "potion"; userId: string; targetId: string }
  | { kind: "assist"; targetId: string }
  | { kind: "none"; reason: string };

export interface AutoSupportContext {
  leaderIntent: LeaderIntent;
  /** Whether a hostile target is available in the follower's effective range. */
  hasThreat?: boolean;
  leaderHpPercent?: number;
  /** Other party members who are currently injured, ordered by priority. */
  injuredParty?: readonly Character[];
  /** Other party members currently dying and eligible for first aid. */
  dyingParty?: readonly Character[];
  /** Threat bands used to distinguish ranged attacks from close attacks. */
  hasCloseThreat?: boolean;
  hasRangedThreat?: boolean;
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

  const dyingTarget = context.dyingParty?.find((member) => member.id !== follower.id && member.dying);
  const potionUser = dyingTarget && (dyingTarget.inventory.has("potion-healing")
    ? dyingTarget
    : follower.inventory.has("potion-healing") ? follower : undefined);
  if (dyingTarget && potionUser) {
    return { kind: "potion", userId: potionUser.id, targetId: dyingTarget.id };
  }

  const role = getBaseRole(follower.className);
  const healingSpell = follower.knownSpells.find((known) => {
    if (known.status !== "available") return false;
    const id = known.spellId.replaceAll("_", "-");
    return id === "cure-wounds" || id === "mass-cure" || id === "heal" || id === "seer-potion";
  });
  const injuredTarget = context.injuredParty?.find((member) => member.id !== follower.id && !member.dead && (member.dying || member.hp < member.maxHp))
    ?? (leader.id !== follower.id && !leader.dead && (leader.dying || leader.hp < leader.maxHp) ? leader : undefined);
  if (role === "priest" && healingSpell && injuredTarget &&
      (context.leaderIntent === "attack" || context.leaderIntent === "cast" || context.leaderIntent === "pass")) {
    return context.injuredParty
      ? { kind: "cast", spellId: healingSpell.spellId, targetId: injuredTarget.id }
      : { kind: "cast", spellId: healingSpell.spellId };
  }

  if (dyingTarget) return { kind: "assist", targetId: dyingTarget.id };

  if (context.hasThreat) {
    const closeThreat = context.hasCloseThreat === true;
    const rangedThreat = context.hasRangedThreat === true || (context.hasCloseThreat === undefined && context.hasThreat);
    if (!closeThreat && rangedThreat) {
      const damagingIndex = highestAvailableDamagingSpellIndex(follower);
      const known = damagingIndex >= 0 ? follower.knownSpells[damagingIndex] : undefined;
      if (known && spell(known.spellId).target !== "ally") return { kind: "cast", spellId: known.spellId };
      if (follower.wieldedWeapon?.tags.includes("ranged")) return { kind: "attack" };
    }
    if (closeThreat && context.leaderIntent === "attack") {
      return { kind: "attack" };
    }
    if (!closeThreat && follower.wieldedWeapon?.tags.includes("ranged")) {
      return { kind: "attack" };
    }
  }

  return context.leaderIntent === "pass" ? { kind: "none", reason: "no immediate support" } : { kind: "follow" };
}
