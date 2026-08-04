/**
 * High-DPI rendering. The canvas framebuffer is the logical 960x540 game
 * multiplied by RENDER_SCALE, and every camera zooms by RENDER_SCALE, so
 * all gameplay and layout code keeps working in logical coordinates and
 * nothing changes apparent size. Text objects rasterise at RENDER_SCALE
 * (`resolution` in their style) so UI text is sharp while the pixel art
 * keeps its chunky integer scaling.
 */

export const GAME_W = 960;
export const GAME_H = 540;

const hasWindow = typeof window !== "undefined";
const query = new URLSearchParams(hasWindow ? window.location.search : "");
/** Desktop QA mode: force every mobile-only presentation path without device emulation. */
export const MOBILE_PREVIEW_MODE = query.get("mobile") === "on";

/** `?dpr=N` forces the render scale, e.g. to test hi-DPI output on a 1x display. */
const override = query.get("dpr");
if (override !== null && !(Number(override) > 0)) {
  throw new Error(`Invalid dpr override "${override}"`);
}

/**
 * Physical pixels per logical game pixel when the game fills the screen.
 * Derived from the *viewport* the canvas fits into (`innerWidth/Height`), not
 * `window.screen`: the fitted canvas only ever covers the browser viewport, so
 * sizing the framebuffer to the physical monitor over-allocates massively on
 * mobile — an 844x390 viewport was allocating a 3840x2160 (scale 4) framebuffer.
 */
const dpr = hasWindow ? window.devicePixelRatio || 1 : 1;
const displayScale = Math.min(
  ((hasWindow ? window.innerWidth : GAME_W) * dpr) / GAME_W,
  ((hasWindow ? window.innerHeight : GAME_H) * dpr) / GAME_H,
);

/**
 * Coarse pointers (touch phones/tablets) are fill-rate and thermally bound and
 * gain little from a 4x framebuffer, so cap their automatic scale at 2. Desktop
 * stays capped at 4 (a full 4K frame) to bound the fill cost.
 */
export const IS_MOBILE_DISPLAY =
  MOBILE_PREVIEW_MODE ||
  (hasWindow &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches);
const scaleCap = IS_MOBILE_DISPLAY ? 2 : 4;

/** Framebuffer scale. `?dpr=N` overrides for testing hi-DPI on a 1x display. */
export const RENDER_SCALE =
  override !== null
    ? Number(override)
    : Math.min(scaleCap, Math.max(1, displayScale));

/** Mobile gameplay shows 25% less world in each dimension; screen-space HUD cameras stay unchanged. */
export const GAMEPLAY_ZOOM_MULTIPLIER = IS_MOBILE_DISPLAY ? 1.25 : 1;
export const GAMEPLAY_CAMERA_ZOOM = RENDER_SCALE * GAMEPLAY_ZOOM_MULTIPLIER;
/**
 * How much further a lit, open-sky level sees — the payoff for a level that
 * rolled daylight, and the reason it plays as an outdoor level rather than a
 * roofless corridor.
 *
 * Read it as apparent size: everything on screen draws at `1 / multiplier` of
 * its normal size. A full 2x put the party at half size, which was too small to
 * read at a glance; 4/3 puts them at three-quarters, keeping the open feel.
 */
export const DAYLIT_VIEW_MULTIPLIER = 4 / 3;

export const GAMEPLAY_VIEW_W = GAME_W / GAMEPLAY_ZOOM_MULTIPLIER;
export const GAMEPLAY_VIEW_H = GAME_H / GAMEPLAY_ZOOM_MULTIPLIER;
