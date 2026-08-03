/**
 * Which solid tiles are walkable caps.
 *
 * A cap is solid rock with open space directly above it — the top of a terrace,
 * a ledge, or a floor. On a level with an exact height field these stop being
 * landable surfaces: the grid rounds every surface to a whole row, and colliding
 * against that rounding is what turns a shallow slope into a staircase. The
 * scene clears their upward collision and `systems/groundFollow.ts` resolves the
 * real height instead.
 */

const isSolid = (grid: readonly string[], x: number, y: number): boolean => {
  const cell = grid[y]?.[x];
  return cell === "#" || cell === "%";
};

/** True when (x, y) is solid with open space directly above — a standable cap. */
export function isSurfaceTile(grid: readonly string[], x: number, y: number): boolean {
  return isSolid(grid, x, y) && !isSolid(grid, x, y - 1);
}
