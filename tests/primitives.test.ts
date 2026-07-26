import { describe, expect, it } from "vitest";
import type { DungeonDefinition } from "../src/game/level/dungeons";
import { DungeonPrimitivesManager } from "../src/game/systems/primitives";

const mockDungeon: DungeonDefinition = {
  id: "test-dungeon",
  name: "Test Dungeon",
  tagline: "Test",
  objective: "Test",
  grid: [".....", "....."],
  width: 5,
  height: 2,
  regions: [],
  theme: {
    background: 0,
    stoneTint: 0,
    accent: 0,
    haze: 0,
    darkness: 0,
    backdrop: "natural-caverns",
  },
  pools: { room1: [0], room2: [0], room3: [0], room4: [0], room5: [0], sanctuary: [0] },
  traps: [],
  trapKinds: [],
  danger: 2,
  encounterMonsterId: "goblin",
  winches: [
    { id: "winch-1", roomId: "room-1", tile: { x: 2, y: 1 }, targetGateId: "gate-1", state: "up" },
  ],
  statues: [
    { id: "statue-1", roomId: "room-2", tile: { x: 3, y: 1 }, facing: 0, targetFacing: 180 },
    { id: "statue-2", roomId: "room-2", tile: { x: 4, y: 1 }, facing: 90, targetFacing: 90 },
  ],
  heavyChests: [
    { id: "chest-1", roomId: "room-5", tile: { x: 1, y: 1 }, slots: 6, value: 500 },
  ],
  zones: [
    { id: "zone-nolight", roomId: "room-2", kind: "no-light", bounds: { x1: 1, y1: 1, x2: 3, y2: 3 }, active: true },
    { id: "zone-gas", roomId: "room-4", kind: "gas-vent", tile: { x: 2, y: 2 }, active: true },
  ],
};

describe("Dungeon Primitives Manager", () => {
  it("handles throwable coin and noise emission", () => {
    const mgr = new DungeonPrimitivesManager(mockDungeon);
    const item = mgr.throwItem(10, 10, 100, 100, "coin");
    expect(item.type).toBe("coin");
    const noise = mgr.getNoiseEventOnLanding(item);
    expect(noise.x).toBe(100);
    expect(noise.radius).toBeGreaterThan(100);
  });

  it("detects no-light zones", () => {
    const mgr = new DungeonPrimitivesManager(mockDungeon);
    expect(mgr.isPlayerInNoLightZone(64, 64)).toBe(true);
    expect(mgr.isPlayerInNoLightZone(500, 500)).toBe(false);
  });

  it("detects gas vent explosions with lit torch", () => {
    const mgr = new DungeonPrimitivesManager(mockDungeon);
    expect(mgr.checkGasVentExplosion(500, 500, false).explode).toBe(false);
    const res = mgr.checkGasVentExplosion(2 * 32 + 10, 2 * 32 + 10, true);
    expect(res.explode).toBe(true);
    expect(res.ventId).toBe("zone-gas");
    expect(mgr.checkGasVentExplosion(2 * 32 + 10, 2 * 32 + 10, true).explode).toBe(false); // cleared
  });

  it("manages heavy chests and inventory/speed penalties", () => {
    const mgr = new DungeonPrimitivesManager(mockDungeon);
    const failedCarry = mgr.toggleChestCarry("chest-1", 4);
    expect(failedCarry.success).toBe(false);

    const successCarry = mgr.toggleChestCarry("chest-1", 6);
    expect(successCarry.success).toBe(true);
    expect(successCarry.carried).toBe(true);
    expect(successCarry.speedMult).toBe(0.75);

    expect(mgr.getCarriedChestWeight()).toBe(6);
  });

  it("operates winches", () => {
    const mgr = new DungeonPrimitivesManager(mockDungeon);
    const op = mgr.operateWinch("winch-1");
    expect(op.success).toBe(true);
    expect(op.newState).toBe("down");
    expect(op.targetGateId).toBe("gate-1");
  });

  it("rotates statues and verifies puzzle alignment", () => {
    const mgr = new DungeonPrimitivesManager(mockDungeon);

    // Rotate statue-1 from 0 -> 90 -> 180
    mgr.rotateStatue("statue-1");
    const res2 = mgr.rotateStatue("statue-1");
    expect(res2.newFacing).toBe(180);
    expect(res2.allAligned).toBe(true);
  });
});