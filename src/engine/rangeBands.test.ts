import { describe, expect, it } from "vitest";
import { gridDistance, movementTiles, rangeBandForTiles } from "./rangeBands";

describe("Shadowdark range bands", () => {
  it("maps close, near, double near, far, and out of sight", () => {
    expect(rangeBandForTiles(1)).toBe("close");
    expect(rangeBandForTiles(4)).toBe("near");
    expect(rangeBandForTiles(8)).toBe("doubleNear");
    expect(rangeBandForTiles(12)).toBe("far");
    expect(rangeBandForTiles(13)).toBe("outOfSight");
  });

  it("turns one or two movement bands into the tile budget", () => {
    expect(movementTiles(1)).toBe(4);
    expect(movementTiles(2)).toBe(8);
    expect(gridDistance({ x: 2, y: 2 }, { x: 5, y: 4 })).toBe(3);
  });
});
