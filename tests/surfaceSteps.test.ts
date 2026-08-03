import { describe, expect, it } from "vitest";
import { isSurfaceTile } from "../src/game/visual/surfaceSteps";

describe("surface tiles", () => {
  const grid = ["......", "....##", "..####", "######"];

  it("marks solid rock with open air above it as a cap", () => {
    expect(isSurfaceTile(grid, 1, 3)).toBe(true);
    expect(isSurfaceTile(grid, 4, 1)).toBe(true);
  });

  it("does not mark buried rock, which is nobody's floor", () => {
    expect(isSurfaceTile(grid, 4, 2)).toBe(false);
    expect(isSurfaceTile(["####", "####"], 1, 1)).toBe(false);
  });

  it("does not mark open air", () => {
    expect(isSurfaceTile(grid, 0, 0)).toBe(false);
  });
});
