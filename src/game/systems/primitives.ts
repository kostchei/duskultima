/**
 * Dungeon Primitives System:
 * - Throwables (light/noise-emitting coins/rocks)
 * - Zone effects (magical no-light zones, gas vents)
 * - Heavy carryable chests (6 slots)
 * - Winches (gate toggling)
 * - Rotating statues (puzzle alignment & shadow pulse)
 */

import type { DungeonDefinition, HeavyChestSpec, StatueSpec, WinchSpec, ZoneEffectSpec } from "../level/dungeons";

export interface ThrowableState {
  id: string;
  type: "coin" | "rock" | "lit-torch";
  x: number;
  y: number;
  landingX: number;
  landingY: number;
  active: boolean;
}

export interface NoiseEvent {
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

export interface ActiveZone {
  spec: ZoneEffectSpec;
  active: boolean;
}

export interface HeavyChestState {
  spec: HeavyChestSpec;
  isCarried: boolean;
  x: number;
  y: number;
}

export interface WinchState {
  spec: WinchSpec;
  state: "up" | "down";
}

export interface StatueState {
  spec: StatueSpec;
  facing: 0 | 90 | 180 | 270;
}

export class DungeonPrimitivesManager {
  private winches: Map<string, WinchState> = new Map();
  private statues: Map<string, StatueState> = new Map();
  private chests: Map<string, HeavyChestState> = new Map();
  private zones: Map<string, ActiveZone> = new Map();
  private activeThrowables: ThrowableState[] = [];

  constructor(dungeon: DungeonDefinition) {
    if (dungeon.winches) {
      for (const w of dungeon.winches) {
        this.winches.set(w.id, { spec: w, state: w.state });
      }
    }
    if (dungeon.statues) {
      for (const s of dungeon.statues) {
        this.statues.set(s.id, { spec: s, facing: s.facing });
      }
    }
    if (dungeon.heavyChests) {
      for (const c of dungeon.heavyChests) {
        this.chests.set(c.id, { spec: c, isCarried: false, x: c.tile.x * 32, y: c.tile.y * 32 });
      }
    }
    if (dungeon.zones) {
      for (const z of dungeon.zones) {
        this.zones.set(z.id, { spec: z, active: z.active });
      }
    }
  }

  // --- Throwables ---
  public throwItem(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    type: "coin" | "rock" | "lit-torch",
  ): ThrowableState {
    const id = `throwable-${Date.now()}-${Math.random()}`;
    const state: ThrowableState = {
      id,
      type,
      x: startX,
      y: startY,
      landingX: targetX,
      landingY: targetY,
      active: true,
    };
    this.activeThrowables.push(state);
    return state;
  }

  public getNoiseEventOnLanding(item: ThrowableState): NoiseEvent {
    const radius = item.type === "coin" ? 180 : item.type === "rock" ? 140 : 100;
    return { x: item.landingX, y: item.landingY, radius, intensity: 1.0 };
  }

  // --- Zone Effects ---
  public isPlayerInNoLightZone(playerX: number, playerY: number): boolean {
    for (const z of this.zones.values()) {
      if (!z.active || z.spec.kind !== "no-light" || !z.spec.bounds) continue;
      const b = z.spec.bounds;
      if (playerX >= b.x1 * 32 && playerX <= b.x2 * 32 && playerY >= b.y1 * 32 && playerY <= b.y2 * 32) {
        return true;
      }
    }
    return false;
  }

  public checkGasVentExplosion(playerX: number, playerY: number, hasLitTorch: boolean): { explode: boolean; ventId?: string } {
    if (!hasLitTorch) return { explode: false };
    for (const z of this.zones.values()) {
      if (!z.active || z.spec.kind !== "gas-vent" || !z.spec.tile) continue;
      const vx = z.spec.tile.x * 32 + 16;
      const vy = z.spec.tile.y * 32 + 16;
      const dist = Math.hypot(playerX - vx, playerY - vy);
      if (dist <= 60) {
        z.active = false; // gas detonated and cleared
        return { explode: true, ventId: z.spec.id };
      }
    }
    return { explode: false };
  }

  // --- Heavy Chests ---
  public toggleChestCarry(chestId: string, currentSlotsAvailable: number): { success: boolean; carried: boolean; slotsUsed: number; speedMult: number } {
    const chest = this.chests.get(chestId);
    if (!chest) return { success: false, carried: false, slotsUsed: 0, speedMult: 1.0 };
    if (!chest.isCarried) {
      if (currentSlotsAvailable < 6) return { success: false, carried: false, slotsUsed: 0, speedMult: 1.0 };
      chest.isCarried = true;
      return { success: true, carried: true, slotsUsed: 6, speedMult: 0.75 };
    } else {
      chest.isCarried = false;
      return { success: true, carried: false, slotsUsed: 0, speedMult: 1.0 };
    }
  }

  public getCarriedChestWeight(): number {
    let weight = 0;
    for (const c of this.chests.values()) {
      if (c.isCarried) weight += 6;
    }
    return weight;
  }

  // --- Winches ---
  public operateWinch(winchId: string): { success: boolean; newState: "up" | "down"; targetGateId?: string } {
    const w = this.winches.get(winchId);
    if (!w) return { success: false, newState: "up" };
    w.state = w.state === "up" ? "down" : "up";
    return { success: true, newState: w.state, targetGateId: w.spec.targetGateId };
  }

  // --- Rotating Statues ---
  public rotateStatue(statueId: string): { success: boolean; newFacing: 0 | 90 | 180 | 270; allAligned: boolean } {
    const s = this.statues.get(statueId);
    if (!s) return { success: false, newFacing: 0, allAligned: false };
    s.facing = ((s.facing + 90) % 360) as 0 | 90 | 180 | 270;

    // Check room alignment
    let allAligned = true;
    for (const statue of this.statues.values()) {
      if (statue.facing !== statue.spec.targetFacing) {
        allAligned = false;
        break;
      }
    }
    return { success: true, newFacing: s.facing, allAligned };
  }

  public getStatues(): readonly StatueState[] {
    return [...this.statues.values()];
  }

  public getWinches(): readonly WinchState[] {
    return [...this.winches.values()];
  }

  public getChests(): readonly HeavyChestState[] {
    return [...this.chests.values()];
  }

  public getZones(): readonly ActiveZone[] {
    return [...this.zones.values()];
  }
}