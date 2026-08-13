import { describe, expect, it } from "vitest";
import { LightTracker } from "./light";

describe("light-source rules", () => {
  it("uses SoloDark's ten-round torch duration", () => {
    const light = new LightTracker({ soloDark: true });
    light.addTorches(1);
    const torch = light.lightTorch();
    expect(torch.remainingRounds).toBe(10);
    for (let i = 0; i < 9; i++) light.advanceRound();
    expect(light.active).not.toBeNull();
    light.advanceRound();
    expect(light.active).toBeNull();
  });

  it("converts exactly three torches into an eight-hour campfire", () => {
    const light = new LightTracker();
    light.addTorches(3);
    expect(light.lightCampfire().remainingMs).toBe(8 * 60 * 60 * 1000);
    expect(light.torches).toBe(0);
    expect(() => light.lightCampfire()).toThrow();
  });
});
