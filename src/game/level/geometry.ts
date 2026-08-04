/**
 * Room geometry as (x, y) tile regions rather than horizontal bands.
 *
 * The old world was one screen high and rooms were pure x-ranges, so "which room
 * is this?" was an x lookup (see the retired ROOM_BANDS). Non-linear dungeons put
 * rooms above and below one another, so room identity must be a rectangular region
 * test. This module is Phaser-free: the scene reads regions from the active
 * dungeon and asks `roomAt` instead of consulting module-level constants.
 */

import type { Beat } from "./model";

export interface RoomRegion {
  /** Stable id used in saves and morale-group keys, e.g. "room-1" or "sanctuary". */
  id: string;
  /** Backdrop label drawn across the region, e.g. "I  THE GATE". */
  title: string;
  /** HUD room readout, e.g. "ROOM I  |  THE GATE". */
  hud: string;
  /** Inclusive tile bounds. */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Tile x the backdrop label anchors to. */
  labelX: number;
  /** Narrative beat, when the region came from the abstract generator. */
  beat?: Beat;
  /**
   * Macro-grid coordinates, when the region came from the abstract generator.
   * The minimap buckets by these rather than reverse-engineering them from tile
   * bounds, which stops working the moment a vault is tilted.
   */
  macro?: { column: number; row: number };
  /**
   * Rows the box slides downward across the region's full width. Zero (or absent)
   * for a level vault; a tilted vault's rooms are parallelograms, and every
   * region in one dungeon shares the same shear. `y1`/`y2` state the box at `x1`.
   */
  shearRows?: number;
}

/**
 * Rows the region's box has shifted by the time it reaches tile x. Matches the
 * relief field's tilt exactly: both round `shear * localX / width`.
 */
export function regionShearAt(r: RoomRegion, tx: number): number {
  const shear = r.shearRows ?? 0;
  if (shear === 0) return 0;
  return Math.round((shear * (tx - r.x1)) / (r.x2 - r.x1 + 1));
}

/** Vertical bounds of the region at tile x, following the tilt. */
export function regionRowsAt(r: RoomRegion, tx: number): { top: number; bottom: number } {
  const shift = regionShearAt(r, tx);
  return { top: r.y1 + shift, bottom: r.y2 + shift };
}

/** The region strictly containing tile (tx, ty), or undefined on walls/dividers. */
export function roomAt(
  regions: readonly RoomRegion[],
  tx: number,
  ty: number,
): RoomRegion | undefined {
  return regions.find((r) => {
    if (tx < r.x1 || tx > r.x2) return false;
    const { top, bottom } = regionRowsAt(r, tx);
    return ty >= top && ty <= bottom;
  });
}

/**
 * The leader's current room. Falls back to a one-tile x tolerance so a leader
 * standing exactly on the divider column between two rooms still resolves to a
 * room (matching the retired ROOM_BANDS `x2 + 1` behaviour), rather than reading
 * as "no room" and suppressing the room readout and auto-save-on-transition.
 */
export function roomAtTolerant(
  regions: readonly RoomRegion[],
  tx: number,
  ty: number,
): RoomRegion | undefined {
  return (
    roomAt(regions, tx, ty) ??
    regions.find((r) => {
      if (tx < r.x1 || tx > r.x2 + 1) return false;
      const { top, bottom } = regionRowsAt(r, Math.min(tx, r.x2));
      return ty >= top && ty <= bottom;
    })
  );
}

/** Centre tile of a region, for placing camera cues or spawn scans. */
export function regionCenter(r: RoomRegion): { x: number; y: number } {
  const x = Math.round((r.x1 + r.x2) / 2);
  const { top, bottom } = regionRowsAt(r, x);
  return { x, y: Math.round((top + bottom) / 2) };
}

/**
 * The vertical band of a grid that actually draws something, in world pixels.
 *
 * A grid is taller than its level: rows below the lowest floor are solid fill,
 * and an open-sky vault leaves a deep slab of it. Camera bounds taken from the
 * full grid therefore let a zoomed-out level frame a screenful of nothing, so
 * the view is bounded by this band instead. One tile of padding keeps the
 * outermost drawn row from sitting flush against the screen edge.
 */
export function drawnBandY(
  grid: readonly string[],
  tileSize = 24,
): { top: number; height: number } {
  let first = -1;
  let last = -1;
  for (let y = 0; y < grid.length; y++) {
    if (!/[^#]/.test(grid[y]!)) continue;
    if (first === -1) first = y;
    last = y;
  }
  if (first === -1) throw new Error("Grid has no drawn rows — every row is solid fill");
  const top = Math.max(0, first - 1) * tileSize;
  const bottom = Math.min(grid.length, last + 2) * tileSize;
  return { top, height: bottom - top };
}
