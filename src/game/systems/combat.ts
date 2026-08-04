/**
 * Real-time combat over dice-authoritative resolution. Every swing calls the
 * engine; this file turns results into damage, floating dice, morale, and
 * death timers. Positional context makes adv/dis legible through movement.
 */

import Phaser from "phaser";
import {
  POISONED_WEAPON_EFFECT_ID,
  applyCondition,
  assassinExtraDamageDice,
  getBaseRole,
  monsterAttackRoll,
  moraleCheck,
  oldGodKillHealing,
  poisonedWeaponDamage,
  hasHook,
  hasCondition,
  isHidden,
  revealCharacter,
  type CheckResult,
  type ItemDef,
} from "../../engine";
import { item } from "../../data";
import type { GameContext } from "../context";
import { RENDER_SCALE } from "../display";
import type { CharacterSprite } from "../entities/CharacterSprite";
import type { MonsterSprite } from "../entities/MonsterSprite";
import { bowShot, swordClang, swordCrit, thud, whoosh } from "../audio/sfx";
import { hitBurst } from "../fx/vfx";
import type { LightSystem } from "./light";

// Running-log colours: blows the party lands read cool, blows it takes read hot,
// and a miss on either side is muted so the log's hits stand out at a glance.
const LOG_ALLY_HIT = "#b9d98a";
const LOG_ALLY_MISS = "#8b9182";
const LOG_FOE_HIT = "#ff8a70";
const LOG_FOE_MISS = "#9a8a8a";

export function floatText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  color: string,
  size = 14,
): void {
  // Slight jitter keeps stacked combat numbers legible (visual only, not rules).
  x += Phaser.Math.Between(-8, 8);
  const t = scene.add
    .text(x, y, text, {
      fontFamily: "monospace",
      fontSize: `${size}px`,
      color,
      stroke: "#000000",
      strokeThickness: 3,
      resolution: RENDER_SCALE,
    })
    .setOrigin(0.5, 1)
    .setDepth(950);
  scene.tweens.add({
    targets: t,
    y: y - 36,
    alpha: 0,
    duration: 900,
    ease: "Cubic.easeOut",
    onComplete: () => t.destroy(),
  });
}

export interface AttackContext {
  advantage: string[];
  disadvantage: string[];
}

export function buildAttackContext(
  attacker: CharacterSprite,
  target: MonsterSprite,
  light: LightSystem,
  ctx?: GameContext,
  scene?: Phaser.Scene,
): AttackContext {
  const advantage: string[] = [];
  const disadvantage: string[] = [];

  if (attacker.y + 20 < target.y) advantage.push("high ground");

  // Backstab: Thief getting behind a monster (unaware or engaged with another player)
  const hiddenAttacker = isHidden(attacker.character);
  if (hiddenAttacker) advantage.push("surprise");
  const isThief = getBaseRole(attacker.character.className) === "thief";
  const targetFacing = target.flipX ? -1 : 1;
  const attackerBehind = Math.sign(attacker.x - target.x) === -targetFacing;

  // Striking from hiding is already the setup the backstab asks for, so it
  // lands outright. Working an opening on a target that can see you is the
  // part that takes a roll: DC 15 DEX, with advantage.
  if (isThief && (hiddenAttacker || attackerBehind)) {
    const openingEarned = hiddenAttacker
      || ((target.aiState === "patrol" || target.targetPlayer !== attacker)
        && (!ctx || ctx.engine.check({
          actor: attacker.character,
          stat: "DEX",
          dc: 15,
          kind: "stat",
          advantage: ["thief backstab"],
        }).success));
    if (openingEarned) {
      advantage.push("backstab");
      if (scene) floatText(scene, attacker.x, attacker.y - 32, "BACKSTAB!", "#70d070", 14);
    }
  }

  if (!attacker.grounded) disadvantage.push("airborne");
  if (target.spellObscured) disadvantage.push("fog");
  if (light.levelAt(attacker.x, attacker.y) === "dark") disadvantage.push("darkness");

  return { advantage, disadvantage };
}

/**
 * Tracks monster groups for morale. Half the group down = check — unless a
 * living leader stands in the group (leader-led groups are immune while the
 * leader lives, and the whole group checks the moment the leader falls).
 */
export class MoraleTracker {
  private groups = new Map<string, { total: number; checked: boolean; leaders: number }>();

  register(monster: MonsterSprite): void {
    const g = this.groups.get(monster.groupId);
    const isLeader = monster.def.leader === true ? 1 : 0;
    if (g) {
      g.total++;
      g.leaders += isLeader;
    } else {
      this.groups.set(monster.groupId, { total: 1, checked: false, leaders: isLeader });
    }
  }

  /** Call when a monster dies. Rolls morale for survivors when the threshold hits. */
  onDeath(
    ctx: GameContext,
    scene: Phaser.Scene,
    dead: MonsterSprite,
    survivors: MonsterSprite[],
  ): void {
    const g = this.groups.get(dead.groupId);
    if (!g) throw new Error(`Monster group "${dead.groupId}" was never registered`);
    const alive = survivors.filter((m) => m.groupId === dead.groupId && m.aliveInFight);

    if (dead.def.leader) {
      // The leader falls: every survivor checks its nerve at once.
      g.leaders--;
      if (g.leaders === 0 && alive.length > 0) {
        ctx.say("Their leader is down — the warband wavers!", "#9999ee");
        g.checked = true;
        this.rollGroup(ctx, scene, alive);
      }
      return;
    }

    if (g.checked || g.total < 2) return;
    if (g.leaders > 0) return; // a standing leader holds the line
    if (alive.length === 0 || alive.length > g.total / 2) return;
    g.checked = true;
    this.rollGroup(ctx, scene, alive);
  }

  private rollGroup(ctx: GameContext, scene: Phaser.Scene, alive: MonsterSprite[]): void {
    for (const m of alive) {
      const result = moraleCheck(ctx.engine.dice, m.def);
      if (!result.holds) {
        m.flee();
        floatText(scene, m.x, m.y - 20, "flees!", "#9999ee");
        ctx.say(`The ${m.def.name} loses its nerve and flees!`, "#9999ee");
      } else {
        floatText(scene, m.x, m.y - 20, "holds!", "#ee9999");
      }
    }
  }
}

export interface MeleeDeps {
  scene: Phaser.Scene;
  ctx: GameContext;
  light: LightSystem;
  monsters: () => MonsterSprite[];
  onMonsterKilled: (m: MonsterSprite, attacker?: CharacterSprite) => void;
  onMonsterSplit?: (m: MonsterSprite) => void;
}

export interface SwingOutcome {
  swung: boolean;
  /** Check result when a target was actually attacked. */
  check?: CheckResult;
  /** Total damage dealt by a successful hit. */
  damage?: number;
}

/** One melee swing from a character. */
export function meleeSwing(deps: MeleeDeps, attacker: CharacterSprite, isExtraSwing = false): SwingOutcome {
  if (!isExtraSwing) {
    if (!attacker.canSwing()) return { swung: false };
    attacker.startSwingCooldown();
  }

  const { scene, ctx, light } = deps;
  const reach = attacker.weaponReachPx;
  const slash = scene.add
    .image(attacker.x + attacker.facing * reach * 0.4, attacker.y, "slash")
    .setDepth(20)
    .setFlipX(attacker.facing === -1);
  scene.tweens.add({ targets: slash, alpha: 0, duration: 200, onComplete: () => slash.destroy() });

  const target = deps
    .monsters()
    .filter(
      (m) =>
        m.aliveInFight &&
        Phaser.Math.Distance.Between(attacker.x, attacker.y, m.x, m.y) <= reach &&
        (m.x - attacker.x) * attacker.facing > -12,
    )
    .sort(
      (a, b) =>
        Phaser.Math.Distance.Between(attacker.x, attacker.y, a.x, a.y) -
        Phaser.Math.Distance.Between(attacker.x, attacker.y, b.x, b.y),
    )[0];
  if (!target) return { swung: true };
  attacker.lastOffensiveActionAt = scene.time.now;

  const posCtx = buildAttackContext(attacker, target, light, ctx, scene);
  // Backstab: advantage AND extra weapon dice (1 + half level), per RAW.
  const backstab = posCtx.advantage.includes("backstab");
  const unaware = target.aiState === "patrol" || target.isSleeping;
  const assassinDice = assassinExtraDamageDice(attacker.character, unaware);
  const result = ctx.engine.attack({
    attacker: attacker.character,
    targetAc: target.def.ac,
    damage: attacker.weaponDamage,
    weapon: attacker.character.wieldedWeapon ?? undefined,
    extraDamageDice: (backstab ? 1 + Math.floor(attacker.character.level / 2) : 0) + assassinDice,
    advantage: posCtx.advantage,
    disadvantage: posCtx.disadvantage,
  });

  const wasHidden = revealCharacter(attacker.character);
  const die = result.check.natural;
  let totalDamage = result.damage;
  if (result.check.success) {
    const poisonDice = poisonedWeaponDamage(attacker.character);
    if (poisonDice) {
      const poison = ctx.engine.dice.roll(poisonDice);
      totalDamage += poison;
      attacker.character.removeEffect(POISONED_WEAPON_EFFECT_ID);
      floatText(deps.scene, target.x, target.y - 32, `+${poison} poison`, "#8bd450", 11);
    }
    const label = result.check.crit ? `${die}! CRIT ${totalDamage}` : `${die} → ${totalDamage}`;
    floatText(deps.scene, target.x, target.y - 16, label, result.check.crit ? "#ffd040" : "#ff7050");
    if (result.check.crit) deps.scene.cameras.main.shake(150, 0.008);
    else deps.scene.cameras.main.shake(80, 0.003);
    if (result.check.crit) swordCrit();
    else swordClang();
    ctx.say(
      `${attacker.character.name} ${result.check.crit ? "crits" : "hits"} the ${target.def.name} for ${totalDamage}.`,
      result.check.crit ? "#ffd040" : LOG_ALLY_HIT,
    );
    applyDamageToMonster(deps, target, totalDamage, attacker);
    applyThorns(deps, target, attacker);
  } else {
    whoosh();
    floatText(deps.scene, target.x, target.y - 16, `${die} miss`, "#8888aa");
    ctx.say(`${attacker.character.name} misses the ${target.def.name}.`, LOG_ALLY_MISS);
  }
  if (posCtx.advantage.length > 0 && posCtx.disadvantage.length === 0) {
    floatText(deps.scene, attacker.x, attacker.y - 34, posCtx.advantage[0]!, "#70d070", 11);
  } else if (posCtx.disadvantage.length > 0 && posCtx.advantage.length === 0) {
    floatText(deps.scene, attacker.x, attacker.y - 34, posCtx.disadvantage[0]!, "#d07070", 11);
  }
  if (wasHidden && assassinDice > 0) {
    floatText(scene, attacker.x, attacker.y - 46, "ASSASSIN!", "#d9b3ff", 12);
  }

  // Scimitar of Speed (+1): Every 2nd attack strikes twice in rapid succession
  if (!isExtraSwing && attacker.character.wieldedWeapon?.id === "scimitar-of-speed") {
    attacker.scimitarSwingCount++;
    if (attacker.scimitarSwingCount % 2 === 0) {
      floatText(deps.scene, attacker.x, attacker.y - 42, "DOUBLE STRIKE!", "#70e0ff", 13);
      scene.time.delayedCall(120, () => {
        if (attacker.alive) {
          meleeSwing(deps, attacker, true);
        }
      });
    }
  }

  return { swung: true, check: result.check, damage: result.check.success ? totalDamage : undefined };
}

/**
 * A thorned monster answers every melee hit with its own hide. Ranged attackers
 * are untouched — the point of quills is that closing costs you.
 */
export function applyThorns(
  deps: MeleeDeps,
  target: MonsterSprite,
  attacker: CharacterSprite,
): void {
  if (target.def.specialAbility !== "thorns" || !attacker.alive) return;
  const damage = deps.ctx.engine.dice.roll("1d4");
  attacker.character.takeDamage(damage);
  floatText(deps.scene, attacker.x, attacker.y - 28, `${damage} thorns`, "#c8d060", 11);
  deps.ctx.say(`${target.def.name}'s quills bite back for ${damage}.`, "#c8d060");
}

export function applyDamageToMonster(deps: MeleeDeps, target: MonsterSprite, damage: number, attacker?: CharacterSprite): void {
  target.wake();
  target.hp -= damage;
  target.setTintFill(0xffffff);
  deps.scene.time.delayedCall(80, () => target.clearTint());
  hitBurst(deps.scene, target.x, target.y, target.def.undead);

  if (target.hp <= 0) {
    if (attacker) {
      const healed = oldGodKillHealing(attacker.character, deps.ctx.engine.dice);
      if (healed > 0) floatText(deps.scene, attacker.x, attacker.y - 44, `+${healed} ODIN`, "#72d887", 11);
    }
    deps.onMonsterKilled(target, attacker);
  } else {
    if (target.def.specialAbility === "split" && !target.hasSplit && target.hp <= Math.ceil(target.maxHp / 2)) {
      target.hasSplit = true;
      deps.onMonsterSplit?.(target);
    }
    if (target.enterSecondPhase()) {
      floatText(deps.scene, target.x, target.y - 34, "PHASE SHIFT!", "#ff795e", 15);
      deps.ctx.say(`${target.def.name} changes stance as the chamber answers its fury!`, "#ff795e");
    }
    if (target.aiState === "patrol") target.aiState = "aggro";
  }
}

/**
 * The best ranged or throwable weapon in a character's pack. Any `ranged`-tagged
 * weapon qualifies (bows, crossbows, javelins), biggest damage die first; a dagger
 * is the last resort because it is thrown rather than loosed.
 */
export function carriedRangedWeapon(attacker: CharacterSprite): ItemDef | null {
  const ranged = attacker.character.inventory
    .all()
    .map((stack) => stack.def)
    .filter((def) => def.tags.includes("ranged") && def.damage);
  if (ranged.length > 0) {
    return ranged.reduce((best, def) => (damageDieSize(def) > damageDieSize(best) ? def : best));
  }
  if (attacker.character.inventory.has("dagger")) return item("dagger");
  return null;
}

/** The die face count of a weapon's damage expression, for ranking ranged options. */
function damageDieSize(def: ItemDef): number {
  const match = /d(\d+)/.exec(def.damage ?? "");
  if (!match) throw new Error(`${def.name} has no damage die`);
  return Number(match[1]);
}

/** Loose an arrow or throw a dagger: attack roll at range, projectile flight, damage on arrival. */
export function rangedShot(
  deps: MeleeDeps,
  attacker: CharacterSprite,
  target: MonsterSprite,
  weapon: ItemDef,
): void {
  if (!attacker.canSwing()) return;
  attacker.startSwingCooldown();
  attacker.lastOffensiveActionAt = deps.scene.time.now;
  const { scene, ctx, light } = deps;
  if (!weapon.damage) throw new Error(`${weapon.name} has no damage dice`);

  attacker.facing = target.x >= attacker.x ? 1 : -1;
  attacker.setFlipX(attacker.facing === -1);
  // A shot from hiding earns the same backstab a blade does. The context also
  // carries the darkness/high-ground modifiers that used to be computed here.
  const posCtx = buildAttackContext(attacker, target, light, ctx, scene);
  const backstab = posCtx.advantage.includes("backstab");
  const unaware = target.aiState === "patrol" || target.isSleeping;

  const result = ctx.engine.attack({
    attacker: attacker.character,
    targetAc: target.def.ac,
    damage: weapon.damage,
    weapon,
    extraDamageDice: (backstab ? 1 + Math.floor(attacker.character.level / 2) : 0)
      + assassinExtraDamageDice(attacker.character, unaware),
    advantage: posCtx.advantage,
    disadvantage: posCtx.disadvantage,
  });
  // Loosing the shot gives the position away, win or lose.
  revealCharacter(attacker.character);

  // Thrown weapons leave the hand; bows loose a shaft. Different sound, different streak.
  const isThrown = weapon.id === "dagger" || weapon.id === "javelin";
  if (isThrown) {
    whoosh({ gain: 0.7 });
  } else {
    bowShot();
  }
  const projectile = isThrown
    ? scene.add.image(attacker.x + attacker.facing * 8, attacker.y - 8, "slash").setDepth(20).setDisplaySize(12, 6)
    : scene.add.rectangle(attacker.x + attacker.facing * 8, attacker.y - 8, 10, 2, 0xd8cfa8).setDepth(20);
  projectile.setRotation(Phaser.Math.Angle.Between(attacker.x, attacker.y, target.x, target.y));
  scene.tweens.add({
    targets: projectile,
    x: target.x,
    y: target.y - 6,
    duration: 160,
    onComplete: () => {
      projectile.destroy();
      if (!target.active || !target.aliveInFight) return;
      const die = result.check.natural;
      const verb = isThrown ? "throw" : "shot";
      if (result.check.success) {
        const label = result.check.crit ? `${die}! CRIT ${result.damage}` : `${die} → ${result.damage}`;
        floatText(scene, target.x, target.y - 16, label, result.check.crit ? "#ffd040" : "#ff7050");
        ctx.say(
          `${attacker.character.name}'s ${verb} ${result.check.crit ? "crits" : "hits"} the ${target.def.name} for ${result.damage}.`,
          result.check.crit ? "#ffd040" : LOG_ALLY_HIT,
        );
        applyDamageToMonster(deps, target, result.damage, attacker);
      } else {
        whoosh({ gain: 0.6 });
        floatText(scene, target.x, target.y - 16, `${die} miss`, "#8888aa");
        ctx.say(`${attacker.character.name}'s ${verb} misses the ${target.def.name}.`, LOG_ALLY_MISS);
      }
    },
  });
}

/** A monster swings at a character. Darkness favors the monster — it sees fine. */
export function monsterSwing(
  scene: Phaser.Scene,
  ctx: GameContext,
  light: LightSystem,
  monster: MonsterSprite,
  target: CharacterSprite,
): void {
  monster.attackCooldown = 1500;
  // Being attacked marks the aggressor so the character swings back.
  target.lastAttackedBy = monster;
  target.lastAttackedAt = scene.time.now;
  const inDark = light.levelAt(target.x, target.y) === "dark";
  const obscured = hasHook(target.character.effects, "obscured");
  const forcedDisadvantage = monster.spellDisadvantageNextAction || obscured;
  const result = monsterAttackRoll(
    ctx.engine.dice,
    monster.def,
    target.character.ac,
    forcedDisadvantage ? "disadvantage" : inDark || monster.phase === 2 ? "advantage" : "normal",
  );
  monster.spellDisadvantageNextAction = false;
  if (result.hit) {
    // Staff Sunder Ability: if target is wielding a staff in 2 hands when hit, sacrifice/destroy staff to block all hit damage!
    const wielded = target.character.wieldedWeapon;
    if (wielded && wielded.id === "staff") {
      swordClang();
      scene.cameras.main.shake(120, 0.006);
      hitBurst(scene, target.x, target.y, false);
      floatText(scene, target.x, target.y - 16, "STAFF SUNDERED!", "#ffe06a", 15);
      
      // Destroy staff from inventory & clear wielded weapon
      target.character.inventory.remove("staff", 1);
      target.character.wieldedWeapon = null;
      
      // Auto-equip dagger if present in inventory
      if (target.character.inventory.has("dagger")) {
        target.character.equipWeapon(item("dagger"));
      }
      
      ctx.say(
        `${target.character.name}'s staff shatters in two hands to block the blow! (0 damage taken)`,
        "#ffe06a",
      );
      return;
    }

    thud();
    floatText(scene, target.x, target.y - 16, `-${result.damage}`, "#ff5050");
    ctx.say(`The ${monster.def.name} hits ${target.character.name} for ${result.damage}.`, LOG_FOE_HIT);
    const wentDown = ctx.engine.damageCharacter(target.character, result.damage, { attack: true });
    if (result.appliedCondition && !wentDown) {
      const duration = result.appliedCondition === "poisoned" ? 3 : 2;
      const alreadyCorroded = result.appliedCondition === "corroded" && hasCondition(target.character, "corroded");
      applyCondition(target.character, result.appliedCondition, { unit: "rounds", remaining: duration });
      floatText(scene, target.x, target.y - 34, result.appliedCondition.toUpperCase(), "#d7a34a", 12);
      ctx.say(`${monster.def.name}'s ${monster.def.specialAbility} leaves ${target.character.name} ${result.appliedCondition}.`, "#d7a34a");
      if (alreadyCorroded) destroyCorrodedGear(target, ctx);
    }
    if (monster.def.specialAbility === "shadow-extinct" && target.torchTimerId) {
      light.snuffTorch(target.torchTimerId);
      target.torchTimerId = null;
      target.character.shieldStowed = false;
      floatText(scene, target.x, target.y - 46, "LIGHT EXTINGUISHED", "#8b82c9", 11);
      ctx.say(`The living shadow drinks ${target.character.name}'s torchlight.`, "#8b82c9");
    }
    scene.cameras.main.shake(80, 0.004);
    hitBurst(scene, target.x, target.y, false);

    if (wentDown) {
      ctx.say(
        `${target.character.name} is down! Dying in ${target.character.dying!.roundsRemaining} rounds — stabilize or heal them!`,
        "#ff5050",
      );
    }
  } else {
    whoosh({ gain: 0.5 });
    floatText(scene, target.x, target.y - 16, "miss", "#8888aa");
    ctx.say(`The ${monster.def.name} misses ${target.character.name}.`, LOG_FOE_MISS);
  }
}

function destroyCorrodedGear(target: CharacterSprite, ctx: GameContext): void {
  const c = target.character;
  const candidates = [
    c.carriedShield,
    c.wornArmor && ["chainmail", "plate-armor"].includes(c.wornArmor.id) ? c.wornArmor : null,
    c.wieldedWeapon?.tags.includes("magic") ? null : c.wieldedWeapon,
  ].filter((def): def is ItemDef => Boolean(def));
  const victim = candidates[0];
  if (!victim) return;
  c.inventory.remove(victim.id, 1);
  if (c.carriedShield?.id === victim.id) c.carriedShield = null;
  if (c.wornArmor?.id === victim.id) c.wornArmor = null;
  if (c.wieldedWeapon?.id === victim.id) c.wieldedWeapon = null;
  ctx.say(`The warned-about rust blooms through ${c.name}'s ${victim.name}; it crumbles away!`, "#d9894a");
}
