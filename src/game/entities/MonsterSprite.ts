/** A monster: Arcade sprite carrying its stat block, rolled HP, and simple AI state. */

import Phaser from "phaser";
import type { Dice, MonsterActivity, MonsterDef, MonsterReaction, MonsterSize } from "../../engine";
import type { CharacterSprite } from "./CharacterSprite";
import type { LightSystem } from "../systems/light";
import { projectShadow } from "../systems/shadows";
import { castShadowsEnabled } from "../systems/quality";
import { groundYPx, type GroundProfileLike } from "../systems/groundFollow";
import { ensureMonsterAssets } from "../visual/monsterArt";
import { playMonsterVoice, preloadMonsterVoices } from "../audio/monsterVoice";
import { spatialOptsFromListener } from "../audio/spatial";

export type MonsterAiState = "patrol" | "aggro" | "fleeing";

/** Ground-shadow width by size band, so a Daeodon throws a Daeodon's shadow. */
const SHADOW_SCALE: Record<MonsterSize, number> = {
  tiny: 0.5,
  small: 0.68,
  medium: 0.8,
  large: 1.2,
  huge: 1.6,
  gargantuan: 2.1,
};

export const MONSTER_ATTACK_COOLDOWN_MS = 1500;
export const AGGRO_RANGE = 5 * 32;

export class MonsterSprite extends Phaser.Physics.Arcade.Sprite {
  readonly def: MonsterDef;
  readonly groupId: string;
  hp: number;
  aiState: MonsterAiState = "patrol";
  targetPlayer: CharacterSprite | null = null;
  /** Set only on wandering-encounter waves; authored room monsters leave these null. */
  activity: MonsterActivity | null = null;
  reaction: MonsterReaction | null = null;
  private asleepUntil = 0;
  private alertedUntil = 0;
  attackCooldown = 0;
  patrolDir: 1 | -1 = 1;
  /** Fate consumes this on the monster's next attack. */
  spellDisadvantageNextAction = false;
  spellObscured = false;
  /** Family attacks telegraph before applying control or damaging equipment. */
  private specialTellUntil = 0;
  /** Oozes split only once; children inherit this flag. */
  hasSplit = false;
  /** Leaders change tactics at half HP. */
  phase: 1 | 2 = 1;
  readonly maxHp: number;
  nextPerceptionCheckAt = 0;
  /** Seer id whose active Cast Out boundary repels this monster. */
  spellCastOutCasterId: string | null = null;
  /** Set by `settleOnGround`: resting on the exact height field, not on a tile. */
  standingOnSlope = false;
  private patrolOriginX: number;
  private shadow: Phaser.GameObjects.Image;
  private readonly customTexture: boolean;

  /** True when the monster has footing, whether from a tile or the height field. */
  get grounded(): boolean {
    const body = this.body as Phaser.Physics.Arcade.Body;
    return body.blocked.down || body.touching.down || this.standingOnSlope;
  }

  /**
   * Hold the monster on the level's exact ground height, exactly as party
   * members are held (see `systems/groundFollow.ts`). Without it a monster on a
   * sloped level sinks through the floor, because terrain caps there are not
   * landable surfaces.
   */
  settleOnGround(profile: GroundProfileLike): void {
    // Death tweens destroy the Arcade body before Dungeon prunes the sprite
    // from its monster list. Ground following still runs in that intervening
    // frame, so an inactive corpse is not a mover and has no floor to settle.
    if (!this.active || !this.body) {
      this.standingOnSlope = false;
      return;
    }
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (body.allowGravity === false || body.blocked.down) {
      this.standingOnSlope = false;
      return;
    }
    const groundY = groundYPx(profile, { x: this.x, bottom: body.bottom, airborne: body.velocity.y < 0 });
    if (groundY === null) {
      this.standingOnSlope = false;
      return;
    }
    this.y += groundY - body.bottom;
    if (body.velocity.y > 0) this.setVelocityY(0);
    this.standingOnSlope = true;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    def: MonsterDef,
    groupId: string,
    dice: Dice,
    textureKey?: string,
  ) {
    // Argument expressions run before `super`, so a monster met for the first
    // time has its textures and animations built before the sprite needs them.
    super(scene, x, y, textureKey ?? ensureMonsterAssets(scene, def));
    this.def = def;
    this.groupId = groupId;
    this.hp = Math.max(1, dice.roll(def.hitDice));
    this.maxHp = this.hp;
    this.customTexture = textureKey !== undefined;
    this.patrolOriginX = x;
    this.shadow = scene.add.image(x, y + 14, "entity-shadow").setDepth(7).setAlpha(0.62);
    // Warm the voice clips at spawn, not at first aggro: aggro fires when the
    // party is already five tiles out, far too late to begin a fetch. Doing it
    // here rather than in the scene covers every spawn path — authored rooms,
    // wandering waves, ooze splits — with one call. Deduped by URL, ~5 KB each.
    void preloadMonsterVoices([def]);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(9);
    this.setCollideWorldBounds(true);
  }

  get speed(): number {
    return this.def.speed * (this.phase === 2 ? 1.25 : 1);
  }

  get aliveInFight(): boolean {
    return this.active && this.aiState !== "fleeing";
  }

  get isSleeping(): boolean {
    return this.scene.time.now < this.asleepUntil;
  }

  /** Project the ground shadow away from the nearest light. */
  updateShadow(light: LightSystem): void {
    if (!this.active) return;
    const nearest = castShadowsEnabled() ? light.nearestLight(this.x, this.y) : null;
    projectShadow(this.shadow, this.x, this.y + this.displayHeight * 0.42, nearest, {
      baseScaleX: SHADOW_SCALE[this.def.size],
      baseAlpha: 0.62,
    });
  }

  updateAi(delta: number, target: CharacterSprite | null): void {
    this.targetPlayer = target;
    this.attackCooldown = Math.max(0, this.attackCooldown - delta);
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.isSleeping) {
      this.setVelocityX(0);
      this.setTint(0x8a91c8);
      this.stop();
      return;
    }
    if (this.asleepUntil !== 0) {
      this.asleepUntil = 0;
      this.clearTint();
    }

    if (this.aiState === "fleeing") {
      // Run away from the target and despawn off-screen.
      const dir = target && target.x > this.x ? -1 : 1;
      this.setVelocityX(dir * this.speed * 1.4);
      this.setFlipX(dir === -1);
      if (!this.customTexture) this.play(`monster-${this.def.id}-walk`, true);
      return;
    }

    if (target) {
      const dist = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
      if (this.aiState === "patrol" && dist <= AGGRO_RANGE) this.noticeTarget();
      if (
        this.aiState === "aggro" &&
        dist > AGGRO_RANGE * 2 &&
        this.scene.time.now >= this.alertedUntil
      ) this.aiState = "patrol";
    } else if (this.aiState === "aggro") {
      this.aiState = "patrol";
    }

    if (this.aiState === "aggro" && target) {
      const dir = target.x > this.x + 6 ? 1 : target.x < this.x - 6 ? -1 : 0;
      this.setVelocityX(dir * this.speed);
      if (dir !== 0) this.setFlipX(dir === -1);
      // Hop over obstacles.
      if (dir !== 0 && (body.blocked.left || body.blocked.right) && this.grounded) {
        this.setVelocityY(-320);
      }
    } else {
      // Patrol a short beat around the spawn point.
      if (this.x > this.patrolOriginX + 48) this.patrolDir = -1;
      else if (this.x < this.patrolOriginX - 48) this.patrolDir = 1;
      if (body.blocked.left) this.patrolDir = 1;
      if (body.blocked.right) this.patrolDir = -1;
      this.setVelocityX(this.patrolDir * this.speed * 0.4);
      this.setFlipX(this.patrolDir === -1);
    }

    const isMoving = Math.abs(body.velocity.x) > 10;
    if (isMoving) {
      if (!this.customTexture) this.play(`monster-${this.def.id}-walk`, true);
    } else {
      if (!this.customTexture) this.play(`monster-${this.def.id}-idle`, true);
    }
  }

  /**
   * Go hostile because the monster spotted or heard the party, and say so.
   *
   * Only the *noticing* transition is voiced. Waking because something hit you
   * is not a noticing — that beat already speaks through the wounded clip, and
   * voicing both would only make the two shout over each other.
   */
  private noticeTarget(): void {
    this.aiState = "aggro";
    playMonsterVoice(this.def, "aggro", spatialOptsFromListener({ x: this.x, y: this.y }));
  }

  flee(): void {
    this.aiState = "fleeing";
    this.setTint(0x9999cc);
  }

  sleep(durationMs: number): void {
    this.asleepUntil = Math.max(this.asleepUntil, this.scene.time.now + durationMs);
    this.aiState = "patrol";
    this.setVelocity(0, 0);
  }

  wake(): void {
    this.asleepUntil = 0;
    if (this.aiState !== "fleeing") this.aiState = "aggro";
    this.clearTint();
  }

  /** Noise keeps a monster investigating even while the party is beyond sight range. */
  alert(durationMs = 6000): void {
    if (this.aiState === "fleeing") return;
    this.alertedUntil = Math.max(this.alertedUntil, this.scene.time.now + durationMs);
    if (this.aiState !== "aggro") this.noticeTarget();
  }

  /**
   * A severe family verb gets a readable wind-up. The caller prints the tell
   * on "start", waits on "wait", and resolves the attack on "ready".
   */
  specialTell(now: number): "none" | "start" | "wait" | "ready" {
    if (!this.def.specialAbility || this.def.specialAbility === "split") return "none";
    if (this.specialTellUntil === 0) {
      this.specialTellUntil = now + 550;
      this.setTint(0xffb347);
      this.setVelocityX(0);
      return "start";
    }
    if (now < this.specialTellUntil) return "wait";
    this.specialTellUntil = 0;
    this.clearTint();
    return "ready";
  }

  enterSecondPhase(): boolean {
    if (!this.def.leader || this.phase === 2 || this.hp > Math.ceil(this.maxHp / 2)) return false;
    this.phase = 2;
    this.setScale(1.08);
    this.setTint(0xff795e);
    return true;
  }

  override destroy(fromScene?: boolean): void {
    if (this.shadow.active) this.shadow.destroy();
    super.destroy(fromScene);
  }
}
