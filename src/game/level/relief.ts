/**
 * Vertical relief: the height field that stops every vault reading as a stack of
 * flat boxes joined by ladders.
 *
 * Expansion used to put one constant standing row in every macro cell, which is
 * what made levels feel like snakes-and-ladders — flat chamber, flat corridor,
 * ladder, repeat. This module replaces that constant with a continuous height
 * field over the whole grid, composed of two independent layers:
 *
 *   1. A macro **tilt**: the entire vault may lean, dropping a fixed number of
 *      rows per macro-cell width. Five rows over a twenty-tile cell is
 *      atan(5/20) = 14 degrees — a mountain climbed or a lava tube descended.
 *   2. A per-cell **profile**: ramps, terraces, crevasse basins, crests and
 *      broken ground layered on top of the tilt, pinned to zero at the cell's
 *      wall columns so neighbouring cells always join seamlessly.
 *
 * Both layers are sampled through one function, `surfaceY`, so room carving,
 * corridor carving and content stamping cannot disagree about where the floor
 * is. Profiles that cut a step too tall to walk out of declare a climb column,
 * and `assertReliefIsTraversable` refuses to emit a field a party could be
 * stranded in.
 */

import { CELL_H, CELL_W } from "./cellSize";

export type ReliefProfileId =
  | "flat"
  | "crest"
  | "basin"
  | "terrace"
  | "shelf-left"
  | "shelf-right"
  | "broken";

/**
 * How far a profile may raise or lower the floor, in rows.
 *
 * The budget and the headroom are jointly constrained. A cell's void runs from
 * `floor - HEADROOM_ROWS` to `floor`, and its floor rock sits at `floor + 1`, so
 * for a basin in one cell never to eat the crest of the cell below:
 *
 *     RELIEF_MAX_DROP + RELIEF_MAX_RISE < CELL_H - HEADROOM_ROWS - 1
 *
 * 2 + 2 < 12 - 6 - 1 holds with exactly one row of rock to spare in the worst
 * case (a basin directly above a crest), which is the thinnest floor that is
 * still a floor. `assertReliefBudget` re-checks this at module load.
 */
export const RELIEF_MAX_RISE = 2;
export const RELIEF_MAX_DROP = 2;

/** Constant headroom carved above the standing row, whatever the relief does. */
export const HEADROOM_ROWS = 6;

if (RELIEF_MAX_DROP + RELIEF_MAX_RISE >= CELL_H - HEADROOM_ROWS - 1) {
  throw new Error("Relief budget exceeds the rock between stacked macro cells");
}

/**
 * A step this tall or taller cannot be reliably walked or jumped back up, so the
 * profile that creates one must also declare a climb column beside it.
 */
const CLIMB_REQUIRED_STEP = 2;

/** Rows the vault drops across one macro cell when tilted. atan(5/20) ~= 14 deg. */
export const TILT_ROWS_PER_CELL = 5;

/** Local columns pinned flat so a cell always meets its neighbours at base height. */
const PINNED_LOCAL_X = [0, 1, CELL_W - 2, CELL_W - 1];

function hash(seed: number, text: string): number {
  let value = seed >>> 0;
  for (let i = 0; i < text.length; i++) {
    value = Math.imul(value ^ text.charCodeAt(i), 0x45d9f3b) >>> 0;
  }
  return value >>> 0;
}

/** Linear interpolation between two pinned columns, rounded to whole rows. */
function rampBetween(profile: number[], fromX: number, toX: number, fromD: number, toD: number): void {
  const span = toX - fromX;
  if (span <= 0) throw new Error("Ramp span must be positive");
  for (let x = fromX; x <= toX; x++) {
    profile[x] = Math.round(fromD + ((toD - fromD) * (x - fromX)) / span);
  }
}

const INTERIOR_LO = 2;
const INTERIOR_HI = CELL_W - 3;

/**
 * A shallow continuous contour applied inside a room cell.
 *
 * Tile terrain needs a clean contract at each macro-cell boundary: doors,
 * corridors and the neighbouring cell all meet there. The contour is therefore
 * multiplied by a sine envelope which is exactly zero at the two pinned wall
 * columns, but lets the middle of the room bow, round and wander by up to about
 * three quarters of a tile. Two keyed waves keep it organic rather than a
 * repeated sine pattern.
 */
function roundedContour(seed: number, key: string, localX: number): number {
  if (localX <= 1 || localX >= CELL_W - 2) return 0;
  const t = (localX - 1) / (CELL_W - 3);
  const wave = hash(seed, `contour:${key}`);
  const phaseA = ((wave & 0xff) / 0xff) * Math.PI * 2;
  const phaseB = (((wave >>> 8) & 0xff) / 0xff) * Math.PI * 2;
  const amplitudeA = 0.42 + ((wave >>> 16) & 0x0f) / 100;
  const amplitudeB = 0.14 + ((wave >>> 20) & 0x07) / 100;
  const envelope = Math.sin(Math.PI * t);
  return envelope * (
    amplitudeA * Math.sin(Math.PI * 2 * t + phaseA)
    + amplitudeB * Math.sin(Math.PI * 4 * t + phaseB)
  );
}

/** Build one cell's relief offsets: positive is lower ground, negative higher. */
function buildProfile(kind: ReliefProfileId, salt: number): number[] {
  const profile = new Array<number>(CELL_W).fill(0);
  const mid = Math.floor((INTERIOR_LO + INTERIOR_HI) / 2);
  switch (kind) {
    case "flat":
      break;
    case "crest": {
      const rise = 1 + (salt % RELIEF_MAX_RISE);
      rampBetween(profile, INTERIOR_LO - 1, mid, 0, -rise);
      rampBetween(profile, mid, INTERIOR_HI + 1, -rise, 0);
      break;
    }
    case "basin": {
      const drop = RELIEF_MAX_DROP;
      rampBetween(profile, INTERIOR_LO - 1, mid, 0, drop);
      rampBetween(profile, mid, INTERIOR_HI + 1, drop, 0);
      break;
    }
    case "terrace": {
      // Descending shelves and back up: walkable stairs, not a slide.
      const drop = RELIEF_MAX_DROP;
      const stepWidth = Math.max(2, Math.floor((mid - INTERIOR_LO) / drop));
      for (let x = INTERIOR_LO; x <= INTERIOR_HI; x++) {
        const fromLeft = Math.min(drop, Math.floor((x - INTERIOR_LO) / stepWidth));
        const fromRight = Math.min(drop, Math.floor((INTERIOR_HI - x) / stepWidth));
        profile[x] = Math.min(fromLeft, fromRight);
      }
      break;
    }
    case "shelf-left":
    case "shelf-right": {
      // One honest drop: a ledge you commit to. The climb column pairs with it.
      const drop = RELIEF_MAX_DROP;
      const edge = kind === "shelf-left" ? mid - 2 : mid + 2;
      for (let x = INTERIOR_LO; x <= INTERIOR_HI; x++) {
        const low = kind === "shelf-left" ? x <= edge : x >= edge;
        profile[x] = low ? drop : 0;
      }
      // Ease back to the pinned wall columns so corridors still meet the floor.
      rampBetween(profile, INTERIOR_LO - 1, INTERIOR_LO + 1, 0, profile[INTERIOR_LO + 1]!);
      rampBetween(profile, INTERIOR_HI - 1, INTERIOR_HI + 1, profile[INTERIOR_HI - 1]!, 0);
      break;
    }
    case "broken": {
      for (let x = INTERIOR_LO; x <= INTERIOR_HI; x++) {
        profile[x] = (hash(salt, `broken:${x}`) % 3) - 1;
      }
      // Smooth the two columns nearest each wall back to zero.
      profile[INTERIOR_LO] = Math.sign(profile[INTERIOR_LO]!);
      profile[INTERIOR_HI] = Math.sign(profile[INTERIOR_HI]!);
      break;
    }
  }
  for (const x of PINNED_LOCAL_X) profile[x] = 0;
  for (let x = 0; x < CELL_W; x++) {
    const d = profile[x]!;
    if (d < -RELIEF_MAX_RISE || d > RELIEF_MAX_DROP) {
      throw new Error(`Relief profile "${kind}" exceeds its row budget at column ${x} (${d})`);
    }
  }
  return profile;
}

/**
 * Local columns where the ground steps too far to walk up, and so needs a climb
 * aid. Measured on the finished surface, not on the profile alone: a two-row
 * profile step that lands on the same column as a one-row tilt step is a
 * three-row wall, and the profile by itself cannot see that.
 */
function climbColumnsFor(surfaceAt: (localX: number) => number): number[] {
  const columns: number[] = [];
  for (let x = 0; x + 1 < CELL_W; x++) {
    const here = surfaceAt(x);
    const next = surfaceAt(x + 1);
    if (Math.abs(next - here) < CLIMB_REQUIRED_STEP) continue;
    // Anchor the aid on the higher side so its foot reaches the lower floor.
    columns.push(next > here ? x : x + 1);
  }
  return columns;
}

/** Weighted profile pool. Flat still appears, so relief reads as variation. */
const PROFILE_POOL: readonly ReliefProfileId[] = [
  "flat", "flat",
  "crest", "crest",
  "basin", "basin",
  "terrace",
  "shelf-left", "shelf-right",
  "broken",
];

export interface ReliefCell {
  readonly column: number;
  readonly row: number;
  readonly kind: ReliefProfileId;
  /** Row offsets by local x; positive is lower ground. */
  readonly offsets: readonly number[];
  /** Local columns needing a climb aid, already validated as reachable. */
  readonly climbColumns: readonly number[];
}

export interface ReliefField {
  /** Rows of drop per macro-cell width. Zero for a level vault. */
  readonly tiltRowsPerCell: number;
  /** Rows prepended to the grid so an uphill tilt never produces negative rows. */
  readonly padRows: number;
  /** Extra grid rows the tilt needs beyond `macroHeight * CELL_H`. */
  readonly extraRows: number;
  /** True when this vault leans end to end. */
  readonly tilted: boolean;
  /** Standing (feet) row for `macroRow` at global tile x, snapped to the grid. */
  surfaceY(macroRow: number, x: number): number;
  /**
   * The same surface without the grid's rounding — the real, continuous height.
   *
   * The tile grid has to quantise to whole rows, but the height field itself
   * never did: the lean is `tilt * x / CELL_W`, which at five rows per
   * twenty-tile cell is a quarter of a row per column. `surfaceY` throws that
   * precision away and leaves a step every fourth column; this keeps it, and it
   * is what movers actually stand on (see `systems/groundFollow.ts`). Profile
   * offsets stay whole rows on purpose — a terrace is meant to be a step.
   */
  surfaceYExact(macroRow: number, x: number): number;
  /** First open row above the floor is `surfaceY - 1`; this is the rock above it. */
  ceilingY(macroRow: number, x: number): number;
  /** Rows the region box shifts down across one macro cell (the shear). */
  readonly shearRows: number;
  cell(column: number, row: number): ReliefCell;
}

export interface ReliefOptions {
  seed: number;
  macroWidth: number;
  macroHeight: number;
  /**
   * Cells holding a room chamber, as `"column,row"`. Only these get a profile:
   * relief is an interior feature, and a corridor threading filler cells should
   * carry nothing but the vault's lean, which never steps more than one row at
   * a time and so stays walkable without handholds.
   */
  roomCells: ReadonlySet<string>;
  /** Suppress the macro tilt (imported or authored layouts). */
  allowTilt?: boolean;
  /** Suppress per-cell profiles. */
  allowProfiles?: boolean;
}

/**
 * Roll the vault's lean. Two thirds of vaults stay level; the rest tilt one way
 * or the other, which is enough for a tilted run to feel like an event.
 */
function rollTilt(seed: number): number {
  const roll = hash(seed, "vault-tilt") % 3;
  if (roll === 0) return TILT_ROWS_PER_CELL;
  if (roll === 1) return -TILT_ROWS_PER_CELL;
  return 0;
}

export function buildRelief(options: ReliefOptions): ReliefField {
  const { seed, macroWidth, macroHeight } = options;
  if (!Number.isInteger(macroWidth) || macroWidth < 1) throw new Error("Macro width must be a positive integer");
  if (!Number.isInteger(macroHeight) || macroHeight < 1) throw new Error("Macro height must be a positive integer");
  const tiltRowsPerCell = options.allowTilt === false ? 0 : rollTilt(seed);
  const profilesEnabled = options.allowProfiles !== false;

  const worldWidth = macroWidth * CELL_W;

  /** The lean at column x, in fractional rows. Continuous, never rounded. */
  const tiltExactAt = (x: number): number =>
    tiltRowsPerCell === 0 ? 0 : (tiltRowsPerCell * x) / CELL_W;
  const tiltAt = (x: number): number => Math.round(tiltExactAt(x));

  // The lean is monotone in x, so its extremes sit at the two edges of the world.
  // A leftward-descending vault would push the first column's floor above row 0,
  // so pad the grid instead of clamping — clamping would flatten the lean. The
  // rightward case instead needs rows added at the bottom, and both cases need
  // room for a basin's drop plus the solid row of floor rock beneath it.
  const edges = [tiltAt(0), tiltAt(worldWidth - 1)];
  const padRows = Math.max(0, -Math.min(...edges));
  const extraRows = padRows + Math.max(0, ...edges) + RELIEF_MAX_DROP + 1;

  const offsets = new Map<string, readonly number[]>();
  const kinds = new Map<string, ReliefProfileId>();
  const contours = new Map<string, readonly number[]>();
  for (let row = 0; row < macroHeight; row++) {
    for (let column = 0; column < macroWidth; column++) {
      const key = `${column},${row}`;
      const salt = hash(seed, `relief:${key}`);
      const inRoom = options.roomCells.has(key);
      const kind = profilesEnabled && inRoom
        ? PROFILE_POOL[salt % PROFILE_POOL.length]!
        : "flat";
      kinds.set(key, kind);
      offsets.set(key, buildProfile(kind, salt >>> 8));
      contours.set(
        key,
        Array.from({ length: CELL_W }, (_, localX) =>
          // Stack bands share their contour at a global x. This preserves the
          // vertical clearance budget between a lower room's rock and the room
          // above it, while columns still vary independently across the vault.
          profilesEnabled && inRoom ? roundedContour(seed, `column:${column}`, localX) : 0,
        ),
      );
    }
  }

  const offsetAt = (macroRow: number, x: number): number => {
    if (x < 0 || x >= worldWidth) return 0;
    if (macroRow < 0 || macroRow >= macroHeight) return 0;
    const column = Math.floor(x / CELL_W);
    const profile = offsets.get(`${column},${macroRow}`);
    if (!profile) throw new Error(`No relief profile at (${column},${macroRow})`);
    return profile[x - column * CELL_W]!;
  };
  const contourAt = (macroRow: number, x: number): number => {
    if (x < 0 || x >= worldWidth) return 0;
    if (macroRow < 0 || macroRow >= macroHeight) return 0;
    const column = Math.floor(x / CELL_W);
    const contour = contours.get(`${column},${macroRow}`);
    if (!contour) throw new Error(`No relief contour at (${column},${macroRow})`);
    return contour[x - column * CELL_W]!;
  };

  const surfaceBase = (macroRow: number, x: number): number =>
    macroRow * CELL_H + CELL_H - 3 + padRows + offsetAt(macroRow, x);
  const surfaceYExact = (macroRow: number, x: number): number =>
    surfaceBase(macroRow, x) + tiltExactAt(x) + contourAt(macroRow, x);
  // The grid owns room extents, content placement and collision boundaries, so
  // retain its established whole-row approximation. The contour stays in the
  // exact surface used for rendering and footing, which gives us a rounded
  // silhouette without narrowing a one-tile clearance or displacing a landmark.
  const surfaceY = (macroRow: number, x: number): number =>
    surfaceBase(macroRow, x) + tiltAt(x);

  // Climb aids are derived once the surface is final, so a profile step and a
  // tilt step stacking on the same column is caught rather than missed.
  const cells = new Map<string, ReliefCell>();
  for (let row = 0; row < macroHeight; row++) {
    for (let column = 0; column < macroWidth; column++) {
      const key = `${column},${row}`;
      cells.set(key, {
        column,
        row,
        kind: kinds.get(key)!,
        offsets: offsets.get(key)!,
        climbColumns: climbColumnsFor((localX) => surfaceY(row, column * CELL_W + localX)),
      });
    }
  }

  const cellAt = (column: number, row: number): ReliefCell => {
    const found = cells.get(`${column},${row}`);
    if (!found) throw new Error(`No relief cell at (${column},${row})`);
    return found;
  };

  const field: ReliefField = {
    tiltRowsPerCell,
    padRows,
    extraRows,
    tilted: tiltRowsPerCell !== 0,
    shearRows: tiltRowsPerCell,
    surfaceY,
    surfaceYExact,
    ceilingY: (macroRow, x) => surfaceY(macroRow, x) - HEADROOM_ROWS - 1,
    cell: cellAt,
  };
  assertReliefIsTraversable(field, macroWidth, macroHeight);
  return field;
}

/**
 * Prove no cell's floor contains a step the party cannot get back up. A step of
 * one row is walked (the scene's step assist lifts a grounded mover a single
 * tile); anything taller must have declared a climb column. Anything taller than
 * the profile budget is a generator bug, not a level to ship.
 */
export function assertReliefIsTraversable(
  field: ReliefField,
  macroWidth: number,
  macroHeight: number,
): void {
  // A one-row step is walked (the scene's step assist lifts a grounded mover a
  // single tile). Anything taller must have declared a handhold, and anything
  // taller than a profile step plus a tilt step is a generator bug.
  const maxStep = RELIEF_MAX_DROP + RELIEF_MAX_RISE + Math.abs(field.tiltRowsPerCell);
  for (let row = 0; row < macroHeight; row++) {
    for (let column = 0; column < macroWidth; column++) {
      const cell = field.cell(column, row);
      const aids = new Set(cell.climbColumns);
      for (let x = 0; x + 1 < CELL_W; x++) {
        const gx = column * CELL_W + x;
        const step = Math.abs(field.surfaceY(row, gx + 1) - field.surfaceY(row, gx));
        if (step <= 1) continue;
        if (step > maxStep) {
          throw new Error(`Relief step of ${step} rows at cell (${column},${row}) column ${x} is unclimbable`);
        }
        if (!aids.has(x) && !aids.has(x + 1)) {
          throw new Error(`Relief step of ${step} rows at cell (${column},${row}) column ${x} has no climb aid`);
        }
      }
    }
  }
}
