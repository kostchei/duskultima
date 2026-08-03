/**
 * Classifies which faces of a solid grid cell border open (non-solid) space.
 * Collision keeps every `#`/`%` cell as-is; this only decides whether a cell
 * has a surface worth drawing in detail or is buried rock that should
 * collapse into a flat silhouette instead of a repeated tile texture. A
 * surface is exposed by level geometry alone, never by camera position.
 */

export interface ExposedTerrainFaces {
  floor: boolean;
  ceiling: boolean;
  leftWall: boolean;
  rightWall: boolean;
  enclosed: boolean;
}

const isSolidMass = (grid: readonly string[], x: number, y: number): boolean => {
  const cell = grid[y]?.[x];
  return cell === "#" || cell === "%";
};

/**
 * `(x, y)` is expected to be a solid cell. Off-grid neighbors count as open,
 * matching the existing behavior of always drawing the world's boundary
 * walls (players can walk up to and see the map edge).
 */
export function exposedTerrainFaces(grid: readonly string[], x: number, y: number): ExposedTerrainFaces {
  const floor = !isSolidMass(grid, x, y - 1);
  const ceiling = !isSolidMass(grid, x, y + 1);
  const leftWall = !isSolidMass(grid, x - 1, y);
  const rightWall = !isSolidMass(grid, x + 1, y);
  return {
    floor,
    ceiling,
    leftWall,
    rightWall,
    enclosed: !floor && !ceiling && !leftWall && !rightWall,
  };
}

/**
 * Bits naming the three faces that can carry a broken edge. The underside is
 * excluded: an exposed ceiling already collapses to the `overhang` lip tile,
 * which is its own art.
 */
export const EDGE_TOP = 1;
export const EDGE_LEFT = 2;
export const EDGE_RIGHT = 4;
/** Every mask an edge texture may be asked for; 0 is untouched interior rock. */
export const EDGE_MASKS = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * Packs the exposed faces of a solid cell into a mask.
 *
 * Tile art is otherwise chosen by a position hash, which cannot know that a
 * ledge ends here — that is what leaves a run of rock terminating in a square
 * corner. Keying the eroded variant on the neighbourhood instead means a left
 * end, a right end, a lone pillar and the middle of a run each break
 * differently, and two adjoining tiles never chip the same shared face twice.
 */
export function terrainEdgeMask(grid: readonly string[], x: number, y: number): number {
  const faces = exposedTerrainFaces(grid, x, y);
  return (faces.floor ? EDGE_TOP : 0)
    | (faces.leftWall ? EDGE_LEFT : 0)
    | (faces.rightWall ? EDGE_RIGHT : 0);
}
