/** Shadowdark distance bands mapped to the tile grid used by the game layer. */
export type RangeBand = "close" | "near" | "doubleNear" | "far" | "outOfSight";

/** One tile is treated as close/touching; four tiles is the game's near move. */
export const RANGE_BAND_TILES: Readonly<Record<Exclude<RangeBand, "outOfSight">, number>> = {
  close: 1,
  near: 4,
  doubleNear: 8,
  far: 12,
};

export type MovementBands = 1 | 2;

export function movementTiles(bands: MovementBands): number {
  return bands * RANGE_BAND_TILES.near;
}

/** Grid distance uses Chebyshev distance so diagonal adjacency remains close. */
export function gridDistance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function rangeBandForTiles(distance: number): RangeBand {
  if (!Number.isFinite(distance) || distance < 0) throw new Error(`Invalid distance ${distance}`);
  if (distance <= RANGE_BAND_TILES.close) return "close";
  if (distance <= RANGE_BAND_TILES.near) return "near";
  if (distance <= RANGE_BAND_TILES.doubleNear) return "doubleNear";
  if (distance <= RANGE_BAND_TILES.far) return "far";
  return "outOfSight";
}

export function canReach(distance: number, band: Exclude<RangeBand, "outOfSight">): boolean {
  return distance <= RANGE_BAND_TILES[band];
}
