import { describe, expect, it, vi } from "vitest";
import { DynamicAmbienceController } from "../src/game/audio/dynamicAmbience";
import type { AmbienceHandle } from "../src/game/audio/ambience";

describe("DynamicAmbienceController (40% Duty Cycle & Event Triggers)", () => {
  function createMockHandle(): { handle: AmbienceHandle; lastLevel: () => number } {
    let currentLevel = 0;
    const handle: AmbienceHandle = {
      gain: {} as GainNode,
      setLevel: vi.fn((v: number) => {
        currentLevel = v;
      }),
      destroy: vi.fn(),
    };
    return { handle, lastLevel: () => currentLevel };
  }

  it("should enforce a 40% active music duty cycle during ambient exploration", () => {
    const { handle, lastLevel } = createMockHandle();
    const ctrl = new DynamicAmbienceController([handle], {
      baseVolume: 0.35,
      cyclePeriodMs: 10_000,
      dutyCycleRatio: 0.40, // 4s active out of 10s
    });

    // Active phase (t = 2s)
    ctrl.tick(2000);
    expect(lastLevel()).toBeGreaterThan(0.2);

    // Quiet silence phase (t = 7s)
    ctrl.tick(5000);
    expect(lastLevel()).toBe(0.0);
  });

  it("should wake up and swell volume when entering a new room/vault ('in')", () => {
    const { handle, lastLevel } = createMockHandle();
    const ctrl = new DynamicAmbienceController([handle], {
      baseVolume: 0.35,
      vaultSwellMult: 1.35,
      cyclePeriodMs: 10_000,
      dutyCycleRatio: 0.40,
    });

    // Advance into quiet phase (t = 7s)
    ctrl.tick(7000);
    expect(lastLevel()).toBe(0.0);

    // Trigger "in" (entering vault)
    ctrl.onEnterVault();
    ctrl.tick(100);
    expect(lastLevel()).toBeGreaterThanOrEqual(0.35 * 1.35 - 0.05);
  });

  it("should wake up and swell volume significantly when finding/claiming an objective ('objective')", () => {
    const { handle, lastLevel } = createMockHandle();
    const ctrl = new DynamicAmbienceController([handle], {
      baseVolume: 0.35,
      objectiveSwellMult: 1.55,
      cyclePeriodMs: 10_000,
      dutyCycleRatio: 0.40,
    });

    // Advance into quiet phase (t = 7s)
    ctrl.tick(7000);
    expect(lastLevel()).toBe(0.0);

    // Trigger "objective"
    ctrl.onDiscoverObjective();
    ctrl.tick(100);
    expect(lastLevel()).toBeGreaterThanOrEqual(0.35 * 1.55 - 0.05);
  });

  it("should wake up and swell volume when nearing the exit ('out')", () => {
    const { handle, lastLevel } = createMockHandle();
    const ctrl = new DynamicAmbienceController([handle], {
      baseVolume: 0.35,
      exitSwellMult: 1.25,
      cyclePeriodMs: 10_000,
      dutyCycleRatio: 0.40,
    });

    // Advance into quiet phase (t = 7s)
    ctrl.tick(7000);
    expect(lastLevel()).toBe(0.0);

    // Trigger "out" (near exit)
    ctrl.updateExitProximity(50, 280);
    ctrl.tick(100);
    expect(lastLevel()).toBeGreaterThan(0.35 * 1.10);
  });
});
