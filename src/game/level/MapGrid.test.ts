import { describe, expect, it } from "vitest";
import { Dice } from "../../engine/dice";
import { MapGrid } from "./MapGrid";
import { TileType } from "../renderer/TileSet";
import type { SiteDef, SiteGoal } from "./Adventure";

const CHEST_GOAL: SiteGoal = {
  kind: "treasure-cache",
  verb: "Retrieve",
  target: "the smugglers' cache",
  isRescue: false,
  completion: "acquire",
  approaches: ["combat", "stealth", "evasion"],
  requiresAllHostilesDefeated: false,
  isCompleted: false,
  description: "Recover the smugglers' cache",
};

const RESCUE_GOAL: SiteGoal = {
  kind: "rescue-hostage",
  verb: "Rescue",
  target: "the missing tithe-collector",
  isRescue: true,
  completion: "rescue",
  approaches: ["combat", "stealth"],
  requiresAllHostilesDefeated: false,
  objectiveEntity: "hostage",
  isCompleted: false,
  description: "Free the missing tithe-collector",
};

function site(goal: SiteGoal, roomCount: number, id = "site-test"): SiteDef {
  return { id, name: "Test Site", biome: "diablerie", sizeCategory: "large", siteType: "cave", roomCount, goal };
}

describe("MapGrid.generateSite", () => {
  it("carves exactly the room count the site advertises", () => {
    for (let seed = 1; seed <= 20; seed++) {
      for (const roomCount of [5, 7, 9]) {
        const grid = new MapGrid();
        grid.generateSite(site({ ...CHEST_GOAL }, roomCount), new Dice(seed));
        expect(grid.roomPlans).toHaveLength(roomCount);
      }
    }
  });

  it("rejects a site that declares fewer rooms than the 5 beats", () => {
    expect(() => new MapGrid().generateSite(site({ ...CHEST_GOAL }, 4), new Dice(1))).toThrow();
  });

  it("keeps every room and corridor trap inside the grid", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const grid = new MapGrid();
      grid.generateSite(site({ ...CHEST_GOAL }, 9), new Dice(seed));
      for (const room of grid.roomPlans) {
        expect(room.rect.x).toBeGreaterThanOrEqual(0);
        expect(room.rect.y).toBeGreaterThanOrEqual(0);
        expect(room.rect.x + room.rect.w).toBeLessThanOrEqual(grid.width);
        expect(room.rect.y + room.rect.h).toBeLessThanOrEqual(grid.height);
      }
      for (const trap of grid.corridorTraps) {
        expect(grid.getTile(trap.x, trap.y)).toBe(TileType.TRAP);
      }
    }
  });

  it("places every rolled hazard on a walkable hazard tile", () => {
    let hazardsSeen = 0;
    for (let seed = 1; seed <= 30; seed++) {
      const grid = new MapGrid();
      grid.generateSite(site({ ...CHEST_GOAL }, 9), new Dice(seed));
      for (const hazard of grid.hazards) {
        hazardsSeen++;
        expect(grid.getTile(hazard.x, hazard.y)).toBe(TileType.HAZARD);
        expect(grid.isWalkable(hazard.x, hazard.y)).toBe(true);
      }
    }
    expect(hazardsSeen).toBeGreaterThan(0);
  });

  it("hides a hidden goal chest until it is revealed, then carves it in the climax room", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const grid = new MapGrid();
      grid.generateSite(site({ ...CHEST_GOAL, isHidden: true }, 7), new Dice(seed));
      const chest = grid.treasureChests.find((c) => c.isGoal)!;
      expect(chest.hidden).toBe(true);
      expect(grid.getTile(chest.x, chest.y)).not.toBe(TileType.CHEST_CLOSED);

      expect(grid.revealHiddenGoal()).toBe(true);
      expect(grid.getTile(chest.x, chest.y)).toBe(TileType.CHEST_CLOSED);

      const climax = grid.roomPlans.find((r) => r.beatRole === "climax")!.rect;
      expect(chest.x).toBeGreaterThanOrEqual(climax.x);
      expect(chest.x).toBeLessThan(climax.x + climax.w);
      expect(chest.y).toBeGreaterThanOrEqual(climax.y);
      expect(chest.y).toBeLessThan(climax.y + climax.h);
    }
  });

  it("spawns a non-chest hidden goal unrendered until it is revealed", () => {
    const grid = new MapGrid();
    grid.generateSite(site({ ...RESCUE_GOAL, isHidden: true }, 5), new Dice(3));
    const hostage = grid.entities.find((e) => e.goalInteraction === "hostage")!;
    expect(hostage.isHiddenGoal).toBe(true);

    expect(grid.revealHiddenGoal()).toBe(true);
    expect(hostage.isHiddenGoal).toBe(false);
  });

  it("leaves a visible goal chest carved from the start", () => {
    const grid = new MapGrid();
    grid.generateSite(site({ ...CHEST_GOAL }, 5), new Dice(5));
    const chest = grid.treasureChests.find((c) => c.isGoal)!;
    expect(chest.hidden).toBe(false);
    expect(grid.getTile(chest.x, chest.y)).toBe(TileType.CHEST_CLOSED);
    expect(grid.revealHiddenGoal()).toBe(false);
  });
});
