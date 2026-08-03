import { describe, expect, it } from "vitest";
import {
  buildRelief,
  HEADROOM_ROWS,
  RELIEF_MAX_DROP,
  RELIEF_MAX_RISE,
  TILT_ROWS_PER_CELL,
  type ReliefField,
} from "../src/game/level/relief";
import { CELL_H, CELL_W } from "../src/game/level/cellSize";

const MACRO_W = 5;
const MACRO_H = 4;

/** Every cell a room, so profiles are exercised rather than skipped as filler. */
function allRooms(width = MACRO_W, height = MACRO_H): Set<string> {
  const cells = new Set<string>();
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) cells.add(`${column},${row}`);
  }
  return cells;
}

function field(seed: number, roomCells = allRooms()): ReliefField {
  return buildRelief({ seed, macroWidth: MACRO_W, macroHeight: MACRO_H, roomCells });
}

describe("relief height field", () => {
  it("is deterministic in the seed", () => {
    const sample = (seed: number): string => {
      const relief = field(seed);
      const rows: number[] = [];
      for (let row = 0; row < MACRO_H; row++) {
        for (let x = 0; x < MACRO_W * CELL_W; x++) rows.push(relief.surfaceY(row, x));
      }
      return rows.join(",");
    };
    expect(sample(11)).toBe(sample(11));
    expect(sample(11)).not.toBe(sample(12));
  });

  it("leans a minority of vaults, and always by the full 14-degree grade", () => {
    const tilts = Array.from({ length: 300 }, (_, seed) => field(seed).tiltRowsPerCell);
    expect(new Set(tilts)).toEqual(new Set([0, TILT_ROWS_PER_CELL, -TILT_ROWS_PER_CELL]));
    const level = tilts.filter((tilt) => tilt === 0).length;
    // Roughly a third level, so a tilted run still reads as an event.
    expect(level).toBeGreaterThan(60);
    expect(level).toBeLessThan(180);
  });

  it("pins every cell's edge columns flat so neighbouring cells meet", () => {
    for (let seed = 0; seed < 40; seed++) {
      const relief = field(seed);
      for (let row = 0; row < MACRO_H; row++) {
        for (let column = 0; column < MACRO_W; column++) {
          for (const localX of [0, 1, CELL_W - 2, CELL_W - 1]) {
            expect(relief.cell(column, row).offsets[localX]).toBe(0);
          }
        }
      }
    }
  });

  it("rounds room interiors while pinning the contour at every cell join", () => {
    for (let seed = 0; seed < 20; seed++) {
      const relief = buildRelief({
        seed,
        macroWidth: 1,
        macroHeight: 1,
        roomCells: new Set(["0,0"]),
        allowTilt: false,
      });
      const edgeHeight = relief.surfaceYExact(0, 0);
      for (const x of [0, 1, CELL_W - 2, CELL_W - 1]) {
        expect(relief.surfaceYExact(0, x), `seed ${seed} x ${x}`).toBe(edgeHeight);
      }
      const greatestFraction = Math.max(
        ...Array.from({ length: CELL_W - 4 }, (_, i) => {
          const height = relief.surfaceYExact(0, i + 2);
          return Math.abs(height - Math.round(height));
        }),
      );
      expect(greatestFraction, `seed ${seed}`).toBeGreaterThan(0.05);
    }
  });

  it("keeps every profile inside its row budget", () => {
    for (let seed = 0; seed < 60; seed++) {
      const relief = field(seed);
      for (let row = 0; row < MACRO_H; row++) {
        for (let column = 0; column < MACRO_W; column++) {
          for (const offset of relief.cell(column, row).offsets) {
            expect(offset).toBeGreaterThanOrEqual(-RELIEF_MAX_RISE);
            expect(offset).toBeLessThanOrEqual(RELIEF_MAX_DROP);
          }
        }
      }
    }
  });

  it("declares a climb aid for every step too tall to walk up", () => {
    for (let seed = 0; seed < 80; seed++) {
      const relief = field(seed);
      for (let row = 0; row < MACRO_H; row++) {
        for (let column = 0; column < MACRO_W; column++) {
          const aids = new Set(relief.cell(column, row).climbColumns);
          for (let localX = 0; localX + 1 < CELL_W; localX++) {
            const gx = column * CELL_W + localX;
            const step = Math.abs(relief.surfaceY(row, gx + 1) - relief.surfaceY(row, gx));
            if (step <= 1) continue;
            expect(aids.has(localX) || aids.has(localX + 1), `seed ${seed} cell ${column},${row}@${localX}`).toBe(true);
          }
        }
      }
    }
  });

  it("never lets one cell's basin eat the crest of the cell below it", () => {
    for (let seed = 0; seed < 60; seed++) {
      const relief = field(seed);
      for (let row = 0; row + 1 < MACRO_H; row++) {
        for (let x = 0; x < MACRO_W * CELL_W; x++) {
          const floorRock = relief.surfaceY(row, x) + 1;
          const ceilingVoid = relief.surfaceY(row + 1, x) - HEADROOM_ROWS;
          expect(floorRock, `seed ${seed} row ${row} x ${x}`).toBeLessThan(ceilingVoid);
        }
      }
    }
  });

  it("stays inside the grid it asks the expander to allocate", () => {
    for (let seed = 0; seed < 80; seed++) {
      const relief = field(seed);
      const height = MACRO_H * CELL_H + relief.extraRows;
      for (let row = 0; row < MACRO_H; row++) {
        for (let x = 0; x < MACRO_W * CELL_W; x++) {
          expect(relief.surfaceY(row, x) - HEADROOM_ROWS).toBeGreaterThanOrEqual(0);
          expect(relief.surfaceY(row, x) + 1).toBeLessThan(height);
        }
      }
    }
  });

  it("leaves filler cells flat, so corridors only ever carry the lean", () => {
    const relief = buildRelief({
      seed: 3,
      macroWidth: MACRO_W,
      macroHeight: MACRO_H,
      roomCells: new Set(["0,0"]),
    });
    for (let row = 0; row < MACRO_H; row++) {
      for (let column = 0; column < MACRO_W; column++) {
        if (column === 0 && row === 0) continue;
        expect(relief.cell(column, row).kind).toBe("flat");
        expect(relief.cell(column, row).climbColumns).toEqual([]);
      }
    }
  });

  it("steps the lean by at most one row per column, so corridors stay walkable", () => {
    const tilted = Array.from({ length: 60 }, (_, seed) => field(seed, new Set()))
      .find((relief) => relief.tilted);
    if (!tilted) throw new Error("Expected at least one tilted vault in 60 seeds");
    for (let x = 1; x < MACRO_W * CELL_W; x++) {
      expect(Math.abs(tilted.surfaceY(0, x) - tilted.surfaceY(0, x - 1))).toBeLessThanOrEqual(1);
    }
  });
});
