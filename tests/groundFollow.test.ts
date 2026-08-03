import { describe, expect, it } from "vitest";
import { bandGroundYPx, groundYPx, scrambleGroundYPx } from "../src/game/systems/groundFollow";
import { buildRelief } from "../src/game/level/relief";
import { CELL_W } from "../src/game/level/cellSize";

const TILE = 32;

/** A flat band standing at tile row `row` across `columns` columns. */
const flat = (row: number, columns = 40): number[] => new Array<number>(columns).fill(row);

/** A band leaning by `rowsPerColumn`, i.e. the shape a tilted vault produces. */
const sloped = (row: number, rowsPerColumn: number, columns = 40): number[] =>
  Array.from({ length: columns }, (_, x) => row + rowsPerColumn * x);

describe("band ground height", () => {
  it("puts the surface at the lower edge of the standing row", () => {
    expect(bandGroundYPx(flat(9), 5 * TILE)).toBe(10 * TILE);
  });

  it("interpolates between columns, so a slope has no steps at all", () => {
    const band = sloped(9, 0.25);
    const a = bandGroundYPx(band, 4 * TILE)!;
    const b = bandGroundYPx(band, 5 * TILE)!;
    // A quarter row per column is eight pixels; the midpoint is exactly halfway.
    expect(b - a).toBeCloseTo(8, 5);
    expect(bandGroundYPx(band, 4.5 * TILE)).toBeCloseTo(a + 4, 5);
  });

  it("rises continuously across the whole span, never in jumps", () => {
    const band = sloped(9, 0.25);
    let previous = bandGroundYPx(band, 0)!;
    for (let px = 1; px < 39 * TILE; px++) {
      const here = bandGroundYPx(band, px)!;
      expect(here - previous).toBeGreaterThan(0);
      expect(here - previous).toBeLessThan(1);
      previous = here;
    }
  });

  it("reports nothing off the ends of the profile", () => {
    expect(bandGroundYPx(flat(9), -1)).toBeNull();
    expect(bandGroundYPx(flat(9, 4), 9 * TILE)).toBeNull();
    expect(bandGroundYPx([], 0)).toBeNull();
  });
});

describe("ground follow", () => {
  const twoTerraces = { bands: [flat(9), flat(21)] };

  it("catches a mover standing just above a surface", () => {
    const ground = groundYPx(twoTerraces, { x: 5 * TILE, bottom: 10 * TILE - 4, airborne: false });
    expect(ground).toBe(10 * TILE);
  });

  it("picks the terrace the mover is on, not the one below", () => {
    expect(groundYPx(twoTerraces, { x: 5 * TILE, bottom: 10 * TILE, airborne: false })).toBe(10 * TILE);
    expect(groundYPx(twoTerraces, { x: 5 * TILE, bottom: 22 * TILE, airborne: false })).toBe(22 * TILE);
  });

  it("lets a mover fall clear of a terrace instead of snapping them back", () => {
    // Well below the upper terrace and still well above the lower one.
    expect(groundYPx(twoTerraces, { x: 5 * TILE, bottom: 15 * TILE, airborne: false })).toBeNull();
  });

  it("pulls a mover back up after a fast descent overshoots", () => {
    expect(groundYPx(twoTerraces, { x: 5 * TILE, bottom: 10 * TILE + 12, airborne: false })).toBe(10 * TILE);
  });

  it("does not catch a jumping mover on the way up", () => {
    const rising = { x: 5 * TILE, bottom: 10 * TILE - 20, airborne: true };
    expect(groundYPx(twoTerraces, rising)).toBeNull();
    // ...but still catches them once they are back below the surface.
    expect(groundYPx(twoTerraces, { ...rising, bottom: 10 * TILE + 4 })).toBe(10 * TILE);
  });

  it("reports nothing over a shaft, where the profile does not reach", () => {
    expect(groundYPx({ bands: [] }, { x: 0, bottom: 0, airborne: false })).toBeNull();
  });
});

describe("terrain scrambles", () => {
  it("accepts a lip shorter than the character", () => {
    const profile = { bands: [Array.from({ length: 40 }, (_, x) => x < 10 ? 10 : 9.25)] };
    expect(scrambleGroundYPx(profile, {
      fromX: 9 * TILE,
      toX: 11 * TILE,
      bottom: 11 * TILE,
      maxRisePx: 30,
    })).toBeCloseTo(10.25 * TILE, 5);
  });

  it("does not turn a character-height-plus ledge into a walkable slope", () => {
    const profile = { bands: [Array.from({ length: 40 }, (_, x) => x < 10 ? 10 : 9)] };
    expect(scrambleGroundYPx(profile, {
      fromX: 9 * TILE,
      toX: 11 * TILE,
      bottom: 11 * TILE,
      maxRisePx: 30,
    })).toBeNull();
  });

  it("does not scramble down or across level ground", () => {
    const level = { bands: [flat(10)] };
    expect(scrambleGroundYPx(level, {
      fromX: 9 * TILE,
      toX: 11 * TILE,
      bottom: 11 * TILE,
      maxRisePx: 30,
    })).toBeNull();
  });
});

describe("ground follow over a real tilted vault", () => {
  it("gives a continuous surface where the tile grid gives a staircase", () => {
    const macroWidth = 5;
    const tilted = Array.from({ length: 60 }, (_, seed) =>
      buildRelief({ seed, macroWidth, macroHeight: 4, roomCells: new Set() }),
    ).find((relief) => relief.tilted);
    if (!tilted) throw new Error("Expected at least one tilted vault in 60 seeds");

    const width = macroWidth * CELL_W;
    const band = Array.from({ length: width }, (_, x) => tilted.surfaceYExact(0, x));
    const rounded = Array.from({ length: width }, (_, x) => tilted.surfaceY(0, x));

    // The grid steps a whole row at a time; the exact field never does.
    expect(Math.max(...rounded.map((r, i) => Math.abs(r - (rounded[i - 1] ?? r))))).toBe(1);
    const exactSteps = band.map((r, i) => Math.abs(r - (band[i - 1] ?? r)));
    expect(Math.max(...exactSteps)).toBeCloseTo(0.25, 5);

    // And the two never drift more than the rounding that separates them.
    for (let x = 0; x < width; x++) {
      expect(Math.abs(band[x]! - rounded[x]!)).toBeLessThanOrEqual(0.5);
    }
  });
});
