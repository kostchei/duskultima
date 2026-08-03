/**
 * Broken edges for terrain tiles.
 *
 * Every skin draws its rock as a full 32x32 face, so the silhouette of a ledge
 * is the tile grid exactly: an axis-aligned line repeating with the period of
 * the wall variants. This module chews that line up. For each combination of
 * exposed faces (`visual/terrainVisibility.ts`) it composites a new texture from
 * the skin's own wall art — erasing a noisy bite out of every face that borders
 * open air, then painting a lit rim, a shaded turn-under and, where the material
 * grows something, a fringe hanging off the lip.
 *
 * The erosion is per-tile and therefore still periodic at 32px; it is the
 * chipping, not the contour. The globally continuous part of the silhouette is
 * `visual/surfaceCrest.ts`, which follows the exact height field and does not
 * repeat at all. The two are meant to be read together.
 *
 * Compositing goes through a canvas rather than a Graphics: `generateTexture`
 * already backs every skin texture with a canvas, so the source art can be
 * drawn in, punched out with `destination-out`, and repainted with exact pixel
 * control — none of which Graphics can express.
 */

import Phaser from "phaser";
import { TILE } from "../../textures";
import type { VisualSkinId } from "../model";
import { EDGE_LEFT, EDGE_MASKS, EDGE_RIGHT, EDGE_TOP } from "../terrainVisibility";
import { valueNoise } from "./math";

/** Growth that hangs off a lip: moss, icicles, vines, dripping algae. */
export interface EdgeFringe {
  color: number;
  alpha: number;
  /** Longest strand, in pixels. */
  length: number;
  /** Pixels between strands. */
  spacing: number;
}

export interface RimStyle {
  /** The pixel row right on the silhouette, catching the key light. */
  light: number;
  /** The band just under the lit line, where the face is still turned up. */
  body: number;
  /** Where the face turns away and drops into its own shadow. */
  shade: number;
  /** Deepest bite taken out of an exposed face, in pixels. */
  bite: number;
  fringe?: EdgeFringe;
}

/**
 * Per-skin rim materials. Colours are pulled toward each skin's accent so the
 * broken edge reads as the same rock that was broken, not as an outline: a
 * uniform rim on every skin would just redraw the tile grid in a new colour.
 */
export const RIM_STYLES: Record<VisualSkinId, RimStyle> = {
  "rot-bramble": { light: 0xb6c88a, body: 0x4d5c36, shade: 0x1a2213, bite: 5, fringe: { color: 0x6f8f3f, alpha: 0.8, length: 5, spacing: 5 } },
  "mugdulblub-keep": { light: 0x8fae86, body: 0x3c4c3e, shade: 0x141a15, bite: 4, fringe: { color: 0x6eb043, alpha: 0.85, length: 6, spacing: 4 } },
  "willowman-hollow": { light: 0xcfc7b4, body: 0x5b5346, shade: 0x1c1a16, bite: 4, fringe: { color: 0xa6b2c4, alpha: 0.5, length: 3, spacing: 7 } },
  "djurum-approach": { light: 0xf0a06a, body: 0x8e3a28, shade: 0x2d0d0d, bite: 5, fringe: { color: 0xe0a76a, alpha: 0.45, length: 3, spacing: 6 } },
  "iron-fortress": { light: 0x8a8f96, body: 0x3a3d43, shade: 0x101216, bite: 3 },
  "burning-mines": { light: 0xc9a184, body: 0x5a4034, shade: 0x1a100b, bite: 4, fringe: { color: 0xe38a37, alpha: 0.45, length: 3, spacing: 9 } },
  "rime-sea-caves": { light: 0xdff3ff, body: 0x4a7f9c, shade: 0x0f2231, bite: 4, fringe: { color: 0xbfe8fb, alpha: 0.7, length: 6, spacing: 4 } },
  "frost-jarl-tomb": { light: 0xd3e6f5, body: 0x3d6888, shade: 0x0e1c28, bite: 3, fringe: { color: 0xa9d8f0, alpha: 0.6, length: 5, spacing: 5 } },
  "fell-glacier": { light: 0xeaf7ff, body: 0x4d7fa2, shade: 0x14293a, bite: 4, fringe: { color: 0xcfe9fa, alpha: 0.75, length: 7, spacing: 4 } },
  "overgrown-basalt-ziggurat": { light: 0x7fa085, body: 0x2d4433, shade: 0x0b1610, bite: 5, fringe: { color: 0x489654, alpha: 0.85, length: 7, spacing: 4 } },
  "drowned-star-cenote": { light: 0x63d7c6, body: 0x1e5569, shade: 0x04131a, bite: 4, fringe: { color: 0x00a896, alpha: 0.7, length: 6, spacing: 5 } },
  "canopy-village": { light: 0xc6c188, body: 0x5c5a2f, shade: 0x181a0d, bite: 5, fringe: { color: 0x78c55a, alpha: 0.85, length: 8, spacing: 3 } },
  "librarians-chasm": { light: 0x9e93b4, body: 0x473e57, shade: 0x14111c, bite: 3, fringe: { color: 0xa68ad1, alpha: 0.4, length: 4, spacing: 8 } },
  "nuln-fungal-grottos": { light: 0x9fd9ac, body: 0x2f5a3c, shade: 0x0b1710, bite: 5, fringe: { color: 0x71d58b, alpha: 0.8, length: 7, spacing: 4 } },
  "subterranean-sea-fort": { light: 0x9fc4cd, body: 0x2f5764, shade: 0x0a1d26, bite: 4, fringe: { color: 0x58c3c9, alpha: 0.6, length: 5, spacing: 5 } },
  "rooftop-scamper": { light: 0xd8b39a, body: 0x6b3c30, shade: 0x1d1114, bite: 3, fringe: { color: 0x8f6a52, alpha: 0.5, length: 3, spacing: 7 } },
  "sunken-thieves-guild": { light: 0x9fb6a9, body: 0x3b4c44, shade: 0x121b18, bite: 4, fringe: { color: 0x6fc0a7, alpha: 0.6, length: 5, spacing: 5 } },
  "hidden-face-temple": { light: 0xe0c7a0, body: 0x6a4f4c, shade: 0x1c1418, bite: 3, fringe: { color: 0xd4a45f, alpha: 0.5, length: 3, spacing: 8 } },
};

/** Legacy authored levels carry no skin; their generic grey rock still breaks. */
export const DEFAULT_RIM_STYLE: RimStyle = {
  light: 0x9a9a94, body: 0x4a4a46, shade: 0x161615, bite: 4,
};

export function edgeTextureKey(prefix: string, mask: number, variant: number): string {
  return `${prefix}-edge-${mask}-${variant}`;
}

/**
 * How deep the bite is at one pixel along a face.
 *
 * Two octaves keep the profile from reading as a sine, and squaring the result
 * biases it shallow: most of a face survives intact and only occasional
 * stretches are chewed to the full depth, which is what makes it read as
 * chipping rather than as a fuzzy border.
 */
function biteDepth(style: RimStyle, seed: number, index: number): number {
  const coarse = valueNoise(index * 0.19, 0, seed);
  const fine = valueNoise(index * 0.63, 11, seed + 4409);
  const unit = (coarse * 0.68 + fine * 0.32) * 0.5 + 0.5;
  return Math.round(unit * unit * style.bite);
}

const NO_BITE: readonly number[] = new Array<number>(TILE).fill(0);

function biteProfile(style: RimStyle, seed: number, active: boolean): readonly number[] {
  if (!active) return NO_BITE;
  return Array.from({ length: TILE }, (_, index) => biteDepth(style, seed, index));
}

function css(color: number, alpha: number): string {
  return `rgba(${(color >>> 16) & 0xff}, ${(color >>> 8) & 0xff}, ${color & 0xff}, ${alpha})`;
}

function paint(
  ctx: CanvasRenderingContext2D,
  color: number,
  alpha: number,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const clippedY = Math.max(0, y);
  const clippedHeight = Math.min(TILE, y + height) - clippedY;
  if (clippedHeight <= 0 || x < 0 || x >= TILE) return;
  ctx.fillStyle = css(color, alpha);
  ctx.fillRect(x, clippedY, width, clippedHeight);
}

function buildEdgeTexture(
  scene: Phaser.Scene,
  key: string,
  baseKey: string,
  mask: number,
  variant: number,
  style: RimStyle,
): void {
  if (scene.textures.exists(key)) return;
  const source = scene.textures.get(baseKey).getSourceImage();
  // Duck-typed rather than `instanceof HTMLCanvasElement`: every skin texture is
  // built by `Graphics.generateTexture`, which backs it with a canvas, but the
  // check has to hold in a headless test too.
  if (typeof (source as { getContext?: unknown } | null)?.getContext !== "function") {
    throw new Error(`Edge erosion needs a canvas-backed source texture; "${baseKey}" is not one`);
  }
  const canvasTexture = scene.textures.createCanvas(key, TILE, TILE);
  if (!canvasTexture) throw new Error(`Could not create edge texture "${key}"`);
  const ctx = canvasTexture.getContext();

  ctx.clearRect(0, 0, TILE, TILE);
  ctx.drawImage(source as CanvasImageSource, 0, 0);

  const seed = 6151 + mask * 977 + variant * 131;
  const top = biteProfile(style, seed + 1, (mask & EDGE_TOP) !== 0);
  const left = biteProfile(style, seed + 2, (mask & EDGE_LEFT) !== 0);
  const right = biteProfile(style, seed + 3, (mask & EDGE_RIGHT) !== 0);

  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";
  for (let x = 0; x < TILE; x++) if (top[x]! > 0) ctx.fillRect(x, 0, 1, top[x]!);
  for (let y = 0; y < TILE; y++) {
    if (left[y]! > 0) ctx.fillRect(0, y, left[y]!, 1);
    if (right[y]! > 0) ctx.fillRect(TILE - right[y]!, y, right[y]!, 1);
  }
  ctx.globalCompositeOperation = "source-over";

  // A rim pixel only belongs on stone that survived every bite, or it floats in
  // the corner that the neighbouring face just ate.
  const survives = (x: number, y: number): boolean =>
    y >= top[x]! && x >= left[y]! && x < TILE - right[y]!;

  if ((mask & EDGE_TOP) !== 0) {
    for (let x = 0; x < TILE; x++) {
      const y = top[x]!;
      if (!survives(x, y)) continue;
      paint(ctx, style.light, 0.9, x, y, 1, 1);
      paint(ctx, style.body, 0.7, x, y + 1, 1, 2);
      paint(ctx, style.shade, 0.45, x, y + 3, 1, 1);
    }
    const fringe = style.fringe;
    if (fringe) {
      // Stepping by a fixed spacing lays the strands out on a comb, which is a
      // pattern the eye locks onto faster than the flat edge it replaced. The
      // gap is jittered instead, so growth clumps and thins the way it does.
      for (let x = 1 + Math.round(Math.abs(valueNoise(mask, variant, seed)) * fringe.spacing); x < TILE;) {
        const y = top[x]!;
        if (survives(x, y)) {
          const strand = 1 + Math.round(Math.abs(valueNoise(x * 0.7, 3, seed)) * fringe.length);
          paint(ctx, fringe.color, fringe.alpha, x, y + 1, 1, strand);
          paint(ctx, fringe.color, fringe.alpha * 0.55, x + 1, y + 1, 1, Math.max(1, strand - 2));
        }
        x += Math.max(2, fringe.spacing + Math.round(valueNoise(x * 0.45, 9, seed) * fringe.spacing));
      }
    }
  }

  // The key light comes from the upper left (`SURFACE_LIGHT` in materials.ts),
  // so a left face catches it and a right face turns away from it.
  for (let y = 0; y < TILE; y++) {
    if ((mask & EDGE_LEFT) !== 0) {
      const x = left[y]!;
      if (survives(x, y)) {
        paint(ctx, style.light, 0.55, x, y, 1, 1);
        paint(ctx, style.body, 0.5, x + 1, y, 2, 1);
      }
    }
    if ((mask & EDGE_RIGHT) !== 0) {
      const x = TILE - 1 - right[y]!;
      if (survives(x, y)) {
        paint(ctx, style.shade, 0.6, x, y, 1, 1);
        paint(ctx, style.body, 0.4, x - 2, y, 2, 1);
      }
    }
  }

  canvasTexture.refresh();
}

/**
 * Builds every eroded variant for one skin.
 *
 * `base` picks which art a mask erodes: a tile with open sky above shows the
 * skin's decorated face, while one buried in the mass shows its support art and
 * only breaks along whichever side is exposed.
 */
export function ensureEdgeTextures(
  scene: Phaser.Scene,
  prefix: string,
  style: RimStyle,
  base: (mask: number, variant: number) => string,
  variants: number,
): void {
  if (variants <= 0) throw new Error(`Edge textures need at least one wall variant for "${prefix}"`);
  for (const mask of EDGE_MASKS) {
    for (let variant = 0; variant < variants; variant++) {
      buildEdgeTexture(scene, edgeTextureKey(prefix, mask, variant), base(mask, variant), mask, variant, style);
    }
  }
}
