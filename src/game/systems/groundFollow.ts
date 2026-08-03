/**
 * Standing on a slope.
 *
 * Terrain is generated from a continuous height field (`level/relief.ts`), but
 * the tile grid it is written into can only hold whole rows, so a shallow lean
 * becomes a staircase. Colliding against those tiles is what made ramps read as
 * a row of walls — the physics engine's lack of sloped bodies is beside the
 * point, because the exact heights survive in `DungeonDefinition.groundProfile`.
 *
 * So terrain caps stop being landable surfaces and this resolves the floor
 * instead: given a mover's x, it returns the exact height of the ground beneath
 * their feet, and the caller places them on it. The result is a true slope —
 * continuous in x, no quantisation, walked at full speed in both directions.
 *
 * Tile collision still owns everything vertical: walls, cell dividers, gates and
 * weak walls all block laterally exactly as before. Only the standing surface
 * moved.
 */

/**
 * Mirrors TILE from ../textures. Kept local so this module stays Phaser-free
 * and unit-testable, matching cameraFraming.ts.
 */
const TILE = 32;

/**
 * How far above a band's surface a mover can be and still be considered to be
 * standing on it rather than falling toward it. A little over one tile, so
 * walking off a lip reads as a step down rather than a fall.
 */
const SNAP_ABOVE_PX = TILE * 1.2;

/**
 * How far *below* a surface a mover may be and still get pushed back up onto it.
 * This catches the frame a fast descent overshoots by, without letting someone
 * who has genuinely dropped past a ledge get yanked back to it.
 */
const SNAP_BELOW_PX = TILE * 0.75;

export interface GroundProfileLike {
  readonly bands: readonly (readonly number[])[];
}

export interface GroundQuery {
  /** Mover centre x, in pixels. */
  x: number;
  /** Body bottom, in pixels. */
  bottom: number;
  /** True while the mover is deliberately airborne (jumping or climbing). */
  airborne: boolean;
}

/**
 * Exact ground height in pixels at world x for one band, interpolating between
 * the two columns the mover straddles. The interpolation is what removes the
 * last of the stepping: without it the surface would still jump once per tile.
 */
export function bandGroundYPx(band: readonly number[], x: number): number | null {
  const columns = band.length;
  if (columns === 0) return null;
  const t = x / TILE;
  const lo = Math.floor(t);
  if (lo < 0 || lo >= columns) return null;
  const hi = Math.min(columns - 1, lo + 1);
  const frac = t - lo;
  const rows = band[lo]! * (1 - frac) + band[hi]! * frac;
  // A surface row is the row the feet occupy, so the ground is its lower edge.
  return (rows + 1) * TILE;
}

/**
 * The surface the mover is standing on, or null when there is none within reach
 * — mid-air, over a shaft, or off the profile entirely, in which case ordinary
 * gravity and tile collision take over.
 *
 * Bands are stacked terraces, so the right one is the highest surface that is
 * not above the mover's feet by more than a step. Choosing by nearest-below is
 * what lets a party drop from one terrace to the next without being snapped back
 * to the one they left.
 */
export function groundYPx(profile: GroundProfileLike, query: GroundQuery): number | null {
  let best: number | null = null;
  for (const band of profile.bands) {
    const groundY = bandGroundYPx(band, query.x);
    if (groundY === null) continue;
    const gap = groundY - query.bottom;
    // Positive gap: ground is below the feet. Negative: the feet are past it.
    if (gap > SNAP_ABOVE_PX) continue;
    if (gap < -SNAP_BELOW_PX) continue;
    // Prefer the surface closest to the feet.
    if (best === null || Math.abs(gap) < Math.abs(best - query.bottom)) best = groundY;
  }
  if (best === null) return null;
  // While deliberately airborne, only catch a mover on the way down.
  if (query.airborne && best > query.bottom) return null;
  return best;
}
