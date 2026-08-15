import { describe, expect, it } from "vitest";
import { allMonsters, monstersForBiome } from "../../data/monsters";
import { MonsterSpriteDrawer } from "./MonsterSprite";
import { MapGrid } from "../level/MapGrid";
import { AdventureGenerator } from "../level/AdventureGenerator";
import type { MonsterBiome } from "../../engine/monster";

// Mock document.createElement and Image for node test environment
if (typeof document === "undefined") {
  (globalThis as any).document = {
    createElement: (tag: string) => {
      if (tag === "canvas") {
        const mockCtx = {
          fillStyle: "",
          strokeStyle: "",
          lineWidth: 1,
          imageSmoothingEnabled: false,
          fillRect: () => {},
          strokeRect: () => {},
          beginPath: () => {},
          arc: () => {},
          fill: () => {},
          stroke: () => {},
          moveTo: () => {},
          lineTo: () => {},
          closePath: () => {},
          drawImage: () => {},
        };
        return {
          width: 32,
          height: 32,
          getContext: () => mockCtx,
        };
      }
      return {};
    },
  } as any;
}

if (typeof Image === "undefined") {
  (globalThis as any).Image = class {
    width = 16;
    height = 16;
    src = "";
    onload: (() => void) | null = null;
    constructor() {
      setTimeout(() => {
        if (this.onload) this.onload();
      }, 0);
    }
  } as any;
}

describe("MonsterSpriteDrawer", () => {
  it("renders procedural monster tiles for all 248 monster definitions without throwing", () => {
    const drawer = new MonsterSpriteDrawer();
    const monsters = allMonsters();
    expect(monsters.length).toBeGreaterThanOrEqual(248);

    for (const mDef of monsters) {
      const biome = mDef.biome ?? "diablerie";
      const canvas = drawer.getMonsterTileCanvas(mDef, biome);
      expect(canvas).toBeDefined();
      expect(canvas.width).toBe(32);
      expect(canvas.height).toBe(32);
    }
  });

  it("spawns map entities with valid monsterId and monsterDef across biomes", () => {
    const biomes: MonsterBiome[] = [
      "diablerie",
      "red-sands",
      "midnight-sun",
      "river-of-night",
      "dwellers-in-the-deep",
      "city-of-masks",
    ];

    const generator = new AdventureGenerator(42);

    for (const biome of biomes) {
      const adventure = generator.generateAdventure(4, []);
      for (const site of adventure.sites) {
        if (site.biome !== biome) continue;
        const grid = new MapGrid();
        grid.generateSite(site);

        const hostileEntities = grid.entities.filter((e) => e.isHostile);
        expect(hostileEntities.length).toBeGreaterThan(0);

        for (const entity of hostileEntities) {
          expect(entity.monsterId).toBeDefined();
          expect(entity.monsterDef).toBeDefined();

          const validIds = monstersForBiome(site.biome).map((m) => m.id);
          expect(validIds).toContain(entity.monsterId);
        }
      }
    }
  });
});
