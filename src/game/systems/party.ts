/**
 * Party management: one leader under direct control, followers on simple AI
 * (follow / hold, auto-fighting when monsters close in). Swap leader instantly.
 */

import Phaser from "phaser";
import type { GameContext } from "../context";
import type { CharacterSprite } from "../entities/CharacterSprite";

const FOLLOW_GAP_PX = 56;
const TELEPORT_CATCHUP_PX = 700;

export class PartyManager {
  readonly members: CharacterSprite[] = [];
  private leaderIdx = 0;
  private ctx: GameContext;

  constructor(ctx: GameContext) {
    this.ctx = ctx;
  }

  get leader(): CharacterSprite {
    const l = this.members[this.leaderIdx];
    if (!l) throw new Error("Party has no members");
    return l;
  }

  get size(): number {
    return this.members.length;
  }

  get leaderIndex(): number {
    return this.leaderIdx;
  }

  add(member: CharacterSprite): void {
    this.members.push(member);
  }

  /** Remove permanent casualties before a replacement joins the expedition. */
  pruneDeadMembers(): CharacterSprite[] {
    const leader = this.members[this.leaderIdx];
    const removed = this.members.filter((member) => member.character.dead);
    for (let i = this.members.length - 1; i >= 0; i--) {
      if (this.members[i]!.character.dead) this.members.splice(i, 1);
    }
    this.leaderIdx = leader && !leader.character.dead ? this.members.indexOf(leader) : 0;
    return removed;
  }

  /** Any member who can still act (not dead, not down). */
  aliveMembers(): CharacterSprite[] {
    return this.members.filter((m) => m.alive);
  }

  /** Party wipe = nobody alive AND nobody dying (dying can still be lost). */
  isWiped(): boolean {
    return this.members.every((m) => m.character.dead);
  }

  allDownOrDead(): boolean {
    return this.members.every((m) => !m.alive);
  }

  /** Swap to a specific member (1-based hotkey index). Throws on bad index. */
  selectLeader(index: number): boolean {
    const m = this.members[index];
    if (!m) throw new Error(`No party member at index ${index}`);
    if (!m.alive) return false;
    this.leaderIdx = index;
    this.ctx.say(`You take control of ${m.character.name} the ${m.cls.displayName}.`);
    return true;
  }

  /** Save/rewind restoration without emitting a player-choice message. */
  restoreLeader(index: number): void {
    if (!this.members[index]) throw new Error(`No party member at index ${index}`);
    this.leaderIdx = index;
  }

  cycleLeader(): boolean {
    for (let step = 1; step <= this.members.length; step++) {
      const idx = (this.leaderIdx + step) % this.members.length;
      if (this.members[idx]!.alive) {
        this.leaderIdx = idx;
        this.ctx.say(
          `You take control of ${this.members[idx]!.character.name} the ${this.members[idx]!.cls.displayName}.`,
        );
        return true;
      }
    }
    return false;
  }

  /** If the leader goes down, control passes to the next alive member. */
  ensureLeaderAlive(): void {
    if (!this.leader.alive) this.cycleLeader();
  }

  /**
   * canStep answers "is there ground within a safe drop ahead of this
   * follower?" — followers stop at ledges unless their target is below them.
   * routeVia offers a waypoint to walk to first: a ladder that reaches the
   * leader's level, so followers take the rungs instead of stepping off a drop.
   */
  updateFollowers(
    now: number,
    canStep: (m: CharacterSprite, dir: -1 | 1, targetY: number) => boolean,
    routeVia: (m: CharacterSprite) => { x: number; y: number } | null = () => null,
  ): void {
    const leader = this.leader;
    for (const m of this.members) m.isLeader = m === leader;
    for (const m of this.members) {
      if (m === leader || !m.alive) continue;
      m.noteGrounded(now);
      // A rescue destination overrides both following and HOLD.
      const rescue = m.aiMoveTarget;
      if (m.mode === "hold" && !rescue) {
        m.moveHorizontal(0, 0);
        continue;
      }
      // Rescue first, then any ladder standing between this follower and the
      // leader, then the leader themselves.
      const ladder = rescue ? null : routeVia(m);
      const target = rescue ?? ladder ?? { x: leader.x, y: leader.y };
      const gap = rescue ? 20 : ladder ? 8 : FOLLOW_GAP_PX;
      const dx = target.x - m.x;
      const body = m.body as Phaser.Physics.Arcade.Body;
      if (!rescue && Math.abs(dx) > TELEPORT_CATCHUP_PX) {
        // Hopelessly separated — catch up (Lost Vikings mercy rule).
        m.setPosition(leader.x, leader.y - 8);
        m.setVelocity(0, 0);
        continue;
      }
      if (Math.abs(dx) > gap) {
        const dir: -1 | 1 = dx > 0 ? 1 : -1;
        // Walking to a ladder means staying on this floor to reach it: pass the
        // follower's own height so canStep never licenses a drop on the way.
        if (!canStep(m, dir, ladder ? m.y : target.y)) {
          m.moveHorizontal(0, 0);
          continue;
        }
        m.moveHorizontal(dir, 0);
        const wallAhead = dir === 1 ? body.blocked.right : body.blocked.left;
        // Obstacles still get hopped, but a follower heading for a ladder does
        // not jump at a leader overhead — that is what the rungs are for.
        const jumpForHeight = !ladder && target.y < m.y - 40;
        if ((wallAhead || jumpForHeight) && body.blocked.down) {
          m.tryJump(now);
        }
      } else {
        m.moveHorizontal(0, 0);
      }
    }
  }
}
