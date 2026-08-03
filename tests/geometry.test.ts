import { describe, expect, it } from "vitest";
import {
  regionCenter,
  regionRowsAt,
  regionShearAt,
  roomAt,
  roomAtTolerant,
  type RoomRegion,
} from "../src/game/level/geometry";
import { DUNGEONS, LEGACY_REGIONS, ROOM_BANDS, dungeonAt } from "../src/game/level/dungeons";

describe("room geometry", () => {
  it("derives one region per legacy band, aligned to the same x-range", () => {
    expect(LEGACY_REGIONS).toHaveLength(ROOM_BANDS.length);
    LEGACY_REGIONS.forEach((region, i) => {
      const band = ROOM_BANDS[i]!;
      expect(region.x1).toBe(band.x1);
      expect(region.x2).toBe(band.x2);
      // Interior play area, not the shell walls.
      expect(region.y1).toBeGreaterThan(0);
      expect(region.y2).toBeLessThan(DUNGEONS[0]!.height);
    });
    expect(LEGACY_REGIONS.at(-1)!.id).toBe("sanctuary");
  });

  it("resolves the same room a band lookup would, for every interior column", () => {
    const regions = LEGACY_REGIONS;
    for (const band of ROOM_BANDS) {
      const expectedId = band.room === 6 ? "sanctuary" : `room-${band.room}`;
      for (let x = band.x1; x <= band.x2; x++) {
        expect(roomAt(regions, x, 14)?.id).toBe(expectedId);
      }
    }
  });

  it("returns no region on divider columns but tolerates the leader edge", () => {
    const regions = LEGACY_REGIONS;
    const divider = ROOM_BANDS[0]!.x2 + 1; // column 21, between room 1 and 2
    expect(roomAt(regions, divider, 14)).toBeUndefined();
    // A leader standing on the divider still reads as the room to its left.
    expect(roomAtTolerant(regions, divider, 14)?.id).toBe("room-1");
  });

  it("attaches dimensions and regions to every generated dungeon", () => {
    for (let index = 0; index < 8; index++) {
      const d = dungeonAt(index);
      expect(d.width).toBeGreaterThan(0);
      expect(d.height).toBe(d.grid.length);
      expect(d.regions.length).toBeGreaterThanOrEqual(5);
      // Every monster tile must fall inside some region (the scene asserts this).
      d.grid.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
          if ("gsrO".includes(row[x]!)) {
            expect(roomAt(d.regions, x, y), `monster at ${x},${y}`).toBeDefined();
          }
        }
      });
    }
  });

  describe("tilted vaults", () => {
    /** A 20-wide, 12-tall cell that drops five rows across its width. */
    const tilted: RoomRegion = {
      id: "room-1", title: "THE GATE", hud: "ROOM 1", labelX: 10,
      x1: 0, y1: 0, x2: 19, y2: 11, shearRows: 5,
    };
    const level: RoomRegion = { ...tilted, shearRows: 0 };

    it("slides the box down as x advances, ending a full cell lower", () => {
      expect(regionShearAt(tilted, 0)).toBe(0);
      expect(regionShearAt(tilted, 19)).toBe(5);
      expect(regionRowsAt(tilted, 0)).toEqual({ top: 0, bottom: 11 });
      expect(regionRowsAt(tilted, 19)).toEqual({ top: 5, bottom: 16 });
    });

    it("leaves a level region exactly where its bounds say", () => {
      for (const x of [0, 7, 19]) expect(regionRowsAt(level, x)).toEqual({ top: 0, bottom: 11 });
    });

    it("claims the downhill end and releases the rows the lean has left", () => {
      // Row 14 at the far edge is inside the tilted room but outside the level one.
      expect(roomAt([tilted], 19, 14)?.id).toBe("room-1");
      expect(roomAt([level], 19, 14)).toBeUndefined();
      // Row 2 at the far edge is above the tilted room's floor entirely.
      expect(roomAt([tilted], 19, 2)).toBeUndefined();
      expect(roomAt([level], 19, 2)?.id).toBe("room-1");
    });

    it("centres on the sheared middle, not the stated box", () => {
      expect(regionCenter(tilted)).toEqual({ x: 10, y: 9 });
      expect(regionCenter(level)).toEqual({ x: 10, y: 6 });
    });

    it("tolerates the divider column at the region's downhill edge", () => {
      expect(roomAtTolerant([tilted], 20, 14)?.id).toBe("room-1");
    });
  });
});
