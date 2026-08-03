/**
 * Parametric monster sprites.
 *
 * A zone roster runs to sixty entries, so monsters are not hand-drawn one at a
 * time. Each stat block names a silhouette archetype, a size band and four
 * colours, and this module renders idle and walk frames from that. Adding a
 * monster is a data edit; it arrives with art.
 *
 * Textures are built on first sighting rather than at boot: a run only ever
 * meets one zone's roster, and generating six zones' worth up front would cost
 * a thousand textures nobody looks at.
 */

import Phaser from "phaser";
import { MONSTER_SIZE_PX, type MonsterArt, type MonsterDef, type MonsterFeature } from "../../engine";
import { texture } from "../textures";

type Graphics = Phaser.GameObjects.Graphics;

/** Blend two packed RGB colours; `t` of 1 returns `b`. */
function mix(a: number, b: number, t: number): number {
  const lerp = (shift: number) => {
    const ca = (a >> shift) & 0xff;
    const cb = (b >> shift) & 0xff;
    return Math.round(ca + (cb - ca) * t) & 0xff;
  };
  return (lerp(16) << 16) | (lerp(8) << 8) | lerp(0);
}

interface Frame {
  g: Graphics;
  w: number;
  h: number;
  art: MonsterArt;
  /**
   * Legs, arms and tails. `shade` alone is near-black on a dark palette, which
   * loses the whole limb silhouette against an unlit dungeon; lifting it toward
   * the body colour keeps the shape readable without flattening the sprite.
   */
  limb: number;
  has: (feature: MonsterFeature) => boolean;
  /** Vertical body bob in px; breathing when idle, gait when walking. */
  bob: number;
  /** Limb swing, -1 to 1. */
  stride: number;
  rect: (x: number, y: number, w: number, h: number, color: number) => void;
  tri: (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number) => void;
  ellipse: (cx: number, cy: number, w: number, h: number, color: number) => void;
  circle: (cx: number, cy: number, r: number, color: number) => void;
}

function makeFrame(
  g: Graphics,
  def: MonsterDef,
  type: "idle" | "walk",
  index: number,
): Frame {
  const { w, h } = MONSTER_SIZE_PX[def.size];
  const features = new Set(def.art.features ?? []);
  const bob = type === "idle" ? (index === 1 ? 1 : 0) : index === 1 || index === 3 ? -1 : 0;
  const stride = type === "idle" ? 0 : [0, 1, 0, -1][index] ?? 0;
  return {
    g,
    w,
    h,
    art: def.art,
    limb: mix(def.art.shade, def.art.body, 0.45),
    has: (feature) => features.has(feature),
    bob,
    stride,
    rect: (x, y, rw, rh, color) => {
      g.fillStyle(color, 1);
      g.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(rw)), Math.max(1, Math.round(rh)));
    },
    tri: (x1, y1, x2, y2, x3, y3, color) => {
      g.fillStyle(color, 1);
      g.fillTriangle(x1, y1, x2, y2, x3, y3);
    },
    ellipse: (cx, cy, ew, eh, color) => {
      g.fillStyle(color, 1);
      g.fillEllipse(cx, cy, ew, eh);
    },
    circle: (cx, cy, r, color) => {
      g.fillStyle(color, 1);
      g.fillCircle(cx, cy, r);
    },
  };
}

/** A pair of glowing eyes, the one thing every silhouette shares. */
function eyes(f: Frame, cx: number, cy: number, spread: number, size: number): void {
  f.rect(cx - spread - size / 2, cy, size, size, f.art.eye);
  f.rect(cx + spread - size / 2, cy, size, size, f.art.eye);
  if (f.has("manyEyes")) {
    f.rect(cx - spread * 1.9, cy - size, size * 0.7, size * 0.7, f.art.eye);
    f.rect(cx + spread * 1.5, cy - size, size * 0.7, size * 0.7, f.art.eye);
  }
}

/** Spines down a back line, from (x1,y) to (x2,y). */
function quillRow(f: Frame, x1: number, x2: number, y: number, height: number): void {
  const count = Math.max(3, Math.round((x2 - x1) / 6));
  for (let i = 0; i < count; i++) {
    const x = x1 + ((x2 - x1) * i) / (count - 1);
    const len = height * (i % 2 === 0 ? 1 : 0.7);
    f.tri(x - 2.5, y + 2, x, y - len, x + 2.5, y + 2, f.art.accent);
  }
}

/** A curved pair of tusks, sized off the head they hang from. */
function tuskPair(f: Frame, cx: number, cy: number, spread: number, length: number): void {
  for (const dir of [-1, 1]) {
    f.tri(cx + dir * spread, cy, cx + dir * spread * 1.5, cy - length, cx + dir * spread * 0.5, cy + length * 0.25, f.art.accent);
  }
}

function weapon(f: Frame, x: number, y: number, length: number): void {
  f.rect(x, y, 2, length, 0x9c8b6a);
  f.rect(x - 2, y - length * 0.45, 6, length * 0.45, f.art.accent);
}

function robeSkirt(f: Frame, cx: number, top: number, bottom: number, halfWidth: number): void {
  f.tri(cx - halfWidth * 0.45, top, cx + halfWidth * 0.45, top, cx + halfWidth, bottom, f.art.shade);
  f.tri(cx - halfWidth * 0.45, top, cx - halfWidth, bottom, cx + halfWidth, bottom, f.art.shade);
}

function wings(f: Frame, cx: number, cy: number, span: number, droop: number): void {
  f.tri(cx, cy, cx - span, cy - droop, cx - span * 0.6, cy + droop, f.art.shade);
  f.tri(cx, cy, cx + span, cy - droop, cx + span * 0.6, cy + droop, f.art.shade);
}

// --- Archetypes -------------------------------------------------------------

function drawBiped(f: Frame, heavy: boolean): void {
  const { w, h } = f;
  const footY = h - h * 0.14;
  const legW = w * (heavy ? 0.2 : 0.14);
  const swing = f.stride * w * 0.09;
  f.rect(w * 0.32 - legW / 2 + swing, footY, legW, h * 0.14, f.limb);
  f.rect(w * 0.68 - legW / 2 - swing, footY, legW, h * 0.14, f.limb);

  const torsoTop = h * (heavy ? 0.36 : 0.4) + f.bob;
  const torsoW = w * (heavy ? 0.72 : 0.52);
  f.rect(w / 2 - torsoW / 2, torsoTop, torsoW, footY - torsoTop, f.art.body);
  // Arms hang wider on a heavy frame; that is most of what reads as "brute".
  const armW = w * (heavy ? 0.16 : 0.11);
  f.rect(w / 2 - torsoW / 2 - armW, torsoTop + h * 0.04, armW, h * (heavy ? 0.34 : 0.26), f.limb);
  f.rect(w / 2 + torsoW / 2, torsoTop + h * 0.04, armW, h * (heavy ? 0.34 : 0.26), f.limb);

  const headH = h * (heavy ? 0.26 : 0.28);
  const headW = w * (heavy ? 0.46 : 0.4);
  const headTop = torsoTop - headH * 0.9;
  f.rect(w / 2 - headW / 2, headTop, headW, headH, f.art.body);
  if (f.has("mane")) {
    f.rect(w / 2 - headW * 0.66, headTop - h * 0.03, headW * 1.32, h * 0.08, f.art.accent);
  }
  if (f.has("horns")) {
    f.tri(w / 2 - headW / 2, headTop, w / 2 - headW * 0.8, headTop - h * 0.16, w / 2 - headW * 0.28, headTop, f.art.accent);
    f.tri(w / 2 + headW / 2, headTop, w / 2 + headW * 0.8, headTop - h * 0.16, w / 2 + headW * 0.28, headTop, f.art.accent);
  }
  if (f.has("tusks")) tuskPair(f, w / 2, headTop + headH, headW * 0.28, -headH * 0.4);
  eyes(f, w / 2, headTop + headH * 0.38, headW * 0.22, Math.max(2, w * 0.08));
  if (f.has("quills")) quillRow(f, w / 2 - torsoW * 0.45, w / 2 + torsoW * 0.45, torsoTop, h * 0.18);
  if (f.has("robe")) robeSkirt(f, w / 2, torsoTop + h * 0.2, h - 1, torsoW * 0.85);
  if (f.has("weapon")) weapon(f, w * 0.9, torsoTop + h * 0.04, h * 0.4);
  if (f.has("wings")) wings(f, w / 2, torsoTop + h * 0.1, w * 0.5, h * 0.14);
}

function drawSkeletal(f: Frame): void {
  const { w, h } = f;
  const footY = h - h * 0.12;
  const swing = f.stride * w * 0.09;
  f.rect(w * 0.36 + swing, footY, w * 0.1, h * 0.12, f.limb);
  f.rect(w * 0.56 - swing, footY, w * 0.1, h * 0.12, f.limb);

  const spineTop = h * 0.42 + f.bob;
  f.rect(w * 0.44, spineTop, w * 0.12, footY - spineTop, f.art.shade);
  for (let i = 0; i < 3; i++) {
    const y = spineTop + h * 0.05 + i * h * 0.08;
    f.rect(w * 0.26, y, w * 0.48, Math.max(1, h * 0.03), f.art.body);
  }
  const skullH = h * 0.26;
  const skullW = w * 0.42;
  const skullTop = spineTop - skullH * 1.05;
  f.rect(w / 2 - skullW / 2, skullTop, skullW, skullH, f.art.body);
  f.rect(w / 2 - skullW * 0.34, skullTop + skullH * 0.62, skullW * 0.68, skullH * 0.2, f.art.shade);
  eyes(f, w / 2, skullTop + skullH * 0.3, skullW * 0.24, Math.max(2, w * 0.09));
  if (f.has("horns")) {
    f.tri(w / 2 - skullW / 2, skullTop, w / 2 - skullW, skullTop - h * 0.18, w / 2 - skullW * 0.3, skullTop, f.art.accent);
    f.tri(w / 2 + skullW / 2, skullTop, w / 2 + skullW, skullTop - h * 0.18, w / 2 + skullW * 0.3, skullTop, f.art.accent);
  }
  if (f.has("robe")) robeSkirt(f, w / 2, spineTop + h * 0.12, h - 1, w * 0.46);
  if (f.has("weapon")) weapon(f, w * 0.88, spineTop, h * 0.38);
}

function drawQuadruped(f: Frame, boar: boolean): void {
  const { w, h } = f;
  const footY = h - h * 0.02;
  const legTop = h * 0.62 + f.bob;
  const swing = f.stride * w * 0.06;
  for (const [x, dir] of [[0.2, 1], [0.32, -1], [0.66, -1], [0.8, 1]] as const) {
    f.rect(w * x + swing * dir, legTop, w * 0.09, footY - legTop, f.limb);
  }

  const bodyY = h * 0.5 + f.bob;
  f.ellipse(w * 0.5, bodyY, w * 0.74, h * 0.36, f.art.body);
  if (f.has("tail")) {
    f.rect(w * 0.84, bodyY - h * 0.06, w * 0.16, Math.max(1, h * 0.05), f.limb);
  }
  // The shoulder hump, and the spines that ride on top of it, are the whole
  // read on a quillboar: draw the hump first, then quill its crest.
  const humpTop = boar ? bodyY - h * 0.24 : bodyY - h * 0.18;
  if (boar) f.ellipse(w * 0.38, bodyY - h * 0.1, w * 0.44, h * 0.3, f.art.body);
  if (f.has("quills")) quillRow(f, w * 0.26, w * 0.8, humpTop, h * 0.2);

  const headCx = w * 0.18;
  const headCy = bodyY - h * (boar ? 0.04 : 0.14);
  f.ellipse(headCx, headCy, w * 0.34, h * 0.26, f.art.body);
  if (boar) {
    // Snout and tusks, big enough to survive at 30 px tall.
    f.rect(w * 0.01, headCy - h * 0.03, w * 0.13, h * 0.12, f.art.shade);
    tuskPair(f, w * 0.08, headCy + h * 0.06, w * 0.06, h * 0.16);
  } else {
    f.tri(w * 0.06, headCy - h * 0.1, w * 0.13, headCy - h * 0.3, w * 0.18, headCy - h * 0.08, f.limb);
    f.tri(w * 0.2, headCy - h * 0.11, w * 0.27, headCy - h * 0.3, w * 0.3, headCy - h * 0.08, f.limb);
  }
  if (f.has("mane")) f.ellipse(w * 0.3, headCy, w * 0.26, h * 0.34, f.art.accent);
  eyes(f, headCx, headCy - h * 0.05, w * 0.07, Math.max(2, w * 0.07));
  // A war-blanket and a shouldered haft are what separate a warband from a
  // herd: without them twenty quillboar read as one brown shape.
  if (f.has("robe")) {
    f.ellipse(w * 0.58, bodyY + h * 0.04, w * 0.44, h * 0.26, f.art.accent);
    f.rect(w * 0.52, bodyY + h * 0.12, w * 0.16, Math.max(1, h * 0.05), f.art.shade);
  }
  if (f.has("weapon")) {
    f.rect(w * 0.3, bodyY - h * 0.34, w * 0.5, Math.max(2, h * 0.05), 0x9c8b6a);
    f.tri(w * 0.78, bodyY - h * 0.4, w * 0.96, bodyY - h * 0.26, w * 0.78, bodyY - h * 0.2, f.art.accent);
  }
}

function drawCentaur(f: Frame): void {
  const { w, h } = f;
  const footY = h - h * 0.02;
  const legTop = h * 0.7 + f.bob;
  const swing = f.stride * w * 0.05;
  for (const [x, dir] of [[0.28, 1], [0.4, -1], [0.68, -1], [0.8, 1]] as const) {
    f.rect(w * x + swing * dir, legTop, w * 0.09, footY - legTop, f.art.shade);
  }
  f.ellipse(w * 0.56, h * 0.62 + f.bob, w * 0.66, h * 0.28, f.art.body);

  const torsoTop = h * 0.18 + f.bob;
  f.rect(w * 0.2, torsoTop, w * 0.28, h * 0.36, f.art.body);
  f.rect(w * 0.12, torsoTop + h * 0.04, w * 0.09, h * 0.26, f.art.accent);
  f.rect(w * 0.47, torsoTop + h * 0.04, w * 0.09, h * 0.26, f.art.accent);
  const headW = w * 0.24;
  f.rect(w * 0.22, torsoTop - h * 0.16, headW, h * 0.18, f.art.body);
  if (f.has("tusks")) {
    f.tri(w * 0.22, torsoTop - h * 0.02, w * 0.18, torsoTop + h * 0.05, w * 0.27, torsoTop - h * 0.02, f.art.accent);
    f.tri(w * 0.4, torsoTop - h * 0.02, w * 0.44, torsoTop + h * 0.05, w * 0.35, torsoTop - h * 0.02, f.art.accent);
  }
  eyes(f, w * 0.34, torsoTop - h * 0.1, w * 0.06, Math.max(2, w * 0.05));
  if (f.has("weapon")) weapon(f, w * 0.06, torsoTop, h * 0.4);
  if (f.has("quills")) quillRow(f, w * 0.36, w * 0.84, h * 0.5 + f.bob, h * 0.12);
}

function drawVermin(f: Frame): void {
  const { w, h } = f;
  const bodyY = h * 0.58 + f.bob;
  const swing = f.stride * w * 0.05;
  for (const [x, dir] of [[0.28, 1], [0.6, -1]] as const) {
    f.rect(w * x + swing * dir, h * 0.8, w * 0.1, h * 0.2, f.art.shade);
  }
  f.ellipse(w * 0.52, bodyY, w * 0.76, h * 0.5, f.art.body);
  f.ellipse(w * 0.2, bodyY + h * 0.02, w * 0.3, h * 0.34, f.art.accent);
  if (f.has("tail")) f.rect(w * 0.86, bodyY, w * 0.14, Math.max(1, h * 0.07), f.art.accent);
  f.tri(w * 0.22, bodyY - h * 0.14, w * 0.3, bodyY - h * 0.36, w * 0.36, bodyY - h * 0.12, f.art.shade);
  eyes(f, w * 0.16, bodyY - h * 0.06, w * 0.06, Math.max(2, w * 0.06));
}

function drawSpider(f: Frame): void {
  const { w, h } = f;
  const bodyCy = h * 0.55 + f.bob;
  // Legs carry the whole silhouette, so they are drawn in the lifted limb
  // colour and jointed — a straight bar at this size reads as a smudge.
  for (let i = 0; i < 4; i++) {
    const y = bodyCy - h * 0.22 + i * h * 0.14;
    const kick = f.stride * (i % 2 === 0 ? 2 : -2);
    const knee = h * 0.12 - i * h * 0.03;
    for (const dir of [-1, 1]) {
      const hipX = w * 0.5 + dir * w * 0.12;
      const kneeX = w * 0.5 + dir * w * 0.3;
      f.tri(hipX, y + kick, kneeX, y - knee + kick, kneeX - dir * w * 0.04, y - knee + kick + 3, f.limb);
      f.tri(kneeX, y - knee + kick, w * 0.5 + dir * w * 0.48, y + h * 0.06 + kick, kneeX - dir * w * 0.03, y - knee + kick + 3, f.limb);
    }
  }
  f.ellipse(w * 0.56, bodyCy + h * 0.02, Math.min(w, h) * 0.56, Math.min(w, h) * 0.48, f.art.body);
  f.circle(w * 0.32, bodyCy - h * 0.06, Math.min(w, h) * 0.18, f.art.accent);
  eyes(f, w * 0.3, bodyCy - h * 0.1, w * 0.06, Math.max(2, w * 0.06));
}

function drawSwarm(f: Frame): void {
  const { w, h } = f;
  const blobs = [
    [0.2, 0.7, 0.16], [0.42, 0.55, 0.2], [0.66, 0.72, 0.18],
    [0.32, 0.86, 0.14], [0.78, 0.5, 0.13], [0.55, 0.84, 0.15],
  ] as const;
  blobs.forEach(([x, y, r], i) => {
    const jitter = (i % 2 === 0 ? 1 : -1) * f.stride * h * 0.05;
    f.circle(w * x, h * y + jitter + f.bob, Math.min(w, h) * r, i % 3 === 0 ? f.art.accent : f.art.body);
  });
  eyes(f, w * 0.42, h * 0.52 + f.bob, w * 0.07, Math.max(2, w * 0.05));
}

function drawOoze(f: Frame): void {
  const { w, h } = f;
  const wobble = f.stride * w * 0.04;
  f.ellipse(w * 0.5, h * 0.66 + f.bob, w * 0.88 + wobble, h * 0.6, f.art.body);
  f.ellipse(w * 0.5, h * 0.86, w * 0.94, h * 0.24, f.art.shade);
  f.ellipse(w * 0.36, h * 0.5 + f.bob, w * 0.24, h * 0.2, f.art.accent);
  eyes(f, w * 0.5, h * 0.56 + f.bob, w * 0.13, Math.max(2, w * 0.08));
}

function drawFlyer(f: Frame): void {
  const { w, h } = f;
  const cy = h * 0.5 + f.bob * 2;
  const flap = h * (0.1 + f.stride * 0.1);
  wings(f, w * 0.5, cy, w * 0.48, flap);
  f.ellipse(w * 0.5, cy + h * 0.06, w * 0.26, h * 0.42, f.art.body);
  f.tri(w * 0.4, cy - h * 0.14, w * 0.44, cy - h * 0.34, w * 0.5, cy - h * 0.12, f.art.accent);
  f.tri(w * 0.6, cy - h * 0.14, w * 0.56, cy - h * 0.34, w * 0.5, cy - h * 0.12, f.art.accent);
  eyes(f, w * 0.5, cy - h * 0.1, w * 0.08, Math.max(2, w * 0.07));
}

function drawSerpent(f: Frame): void {
  const { w, h } = f;
  const sway = f.stride * w * 0.05;
  f.ellipse(w * 0.5, h * 0.82, w * 0.9, h * 0.24, f.art.body);
  f.ellipse(w * 0.44 + sway, h * 0.6, w * 0.66, h * 0.22, f.art.shade);
  f.ellipse(w * 0.56 - sway, h * 0.4 + f.bob, w * 0.44, h * 0.2, f.art.body);
  f.ellipse(w * 0.5, h * 0.22 + f.bob, w * 0.3, h * 0.2, f.art.body);
  f.rect(w * 0.46, h * 0.28, w * 0.08, h * 0.06, f.art.accent);
  eyes(f, w * 0.5, h * 0.18 + f.bob, w * 0.08, Math.max(2, w * 0.06));
  if (f.has("weapon")) weapon(f, w * 0.88, h * 0.3, h * 0.34);
  if (f.has("robe")) robeSkirt(f, w * 0.5, h * 0.42, h - 1, w * 0.44);
}

function drawElemental(f: Frame): void {
  const { w, h } = f;
  const drift = f.stride * w * 0.04;
  const cy = h * 0.5 + f.bob * 2;
  f.tri(w * 0.5 + drift, h * 0.02, w * 0.06, h * 0.72, w * 0.94, h * 0.72, f.art.shade);
  f.ellipse(w * 0.5, cy + h * 0.16, w * 0.72, h * 0.5, f.art.body);
  f.ellipse(w * 0.5 - drift, h * 0.92, w * 0.5, h * 0.14, f.art.shade);
  f.circle(w * 0.5, cy, Math.min(w, h) * 0.14, f.art.accent);
  eyes(f, w * 0.5, cy - h * 0.08, w * 0.11, Math.max(2, w * 0.08));
}

function drawPlant(f: Frame): void {
  const { w, h } = f;
  const lean = f.stride * w * 0.04;
  f.rect(w * 0.44, h * 0.4, w * 0.12, h * 0.6, f.art.shade);
  f.tri(w * 0.46, h * 0.62, w * 0.02, h * 0.72, w * 0.44, h * 0.84, f.art.shade);
  f.tri(w * 0.54, h * 0.62, w * 0.98, h * 0.72, w * 0.56, h * 0.84, f.art.shade);
  f.ellipse(w * 0.5 + lean, h * 0.26 + f.bob, w * 0.66, h * 0.42, f.art.body);
  f.tri(w * 0.3 + lean, h * 0.26, w * 0.5 + lean, h * 0.06, w * 0.7 + lean, h * 0.26, f.art.accent);
  eyes(f, w * 0.5 + lean, h * 0.24 + f.bob, w * 0.1, Math.max(2, w * 0.07));
}

function drawAvian(f: Frame): void {
  const { w, h } = f;
  const swing = f.stride * w * 0.07;
  f.rect(w * 0.4 + swing, h * 0.64, w * 0.07, h * 0.36, f.art.accent);
  f.rect(w * 0.58 - swing, h * 0.64, w * 0.07, h * 0.36, f.art.accent);
  f.ellipse(w * 0.5, h * 0.52 + f.bob, w * 0.7, h * 0.36, f.art.body);
  if (f.has("wings")) wings(f, w * 0.5, h * 0.48 + f.bob, w * 0.42, h * 0.1);
  f.rect(w * 0.44, h * 0.2 + f.bob, w * 0.1, h * 0.2, f.art.shade);
  f.ellipse(w * 0.48, h * 0.16 + f.bob, w * 0.26, h * 0.16, f.art.body);
  f.tri(w * 0.36, h * 0.14 + f.bob, w * 0.1, h * 0.2 + f.bob, w * 0.36, h * 0.22 + f.bob, f.art.accent);
  eyes(f, w * 0.5, h * 0.12 + f.bob, w * 0.07, Math.max(2, w * 0.06));
}

function drawArchetype(f: Frame, def: MonsterDef): void {
  switch (def.archetype) {
    case "biped": return drawBiped(f, false);
    case "brute": return drawBiped(f, true);
    case "skeletal": return drawSkeletal(f);
    case "quadruped": return drawQuadruped(f, false);
    case "boar": return drawQuadruped(f, true);
    case "centaur": return drawCentaur(f);
    case "vermin": return drawVermin(f);
    case "spider": return drawSpider(f);
    case "swarm": return drawSwarm(f);
    case "ooze": return drawOoze(f);
    case "flyer": return drawFlyer(f);
    case "serpent": return drawSerpent(f);
    case "elemental": return drawElemental(f);
    case "plant": return drawPlant(f);
    case "avian": return drawAvian(f);
  }
}

/**
 * Generate this monster's textures and animations if they do not exist yet, and
 * return the base texture key. Safe to call on every spawn — the second call is
 * two existence checks.
 *
 * Monsters with hand-drawn art (the original bestiary, generated at boot) keep
 * it; only their animations are filled in here.
 */
export function ensureMonsterAssets(scene: Phaser.Scene, def: MonsterDef): string {
  const base = `monster-${def.id}`;
  if (!scene.textures.exists(base)) {
    const { w, h } = MONSTER_SIZE_PX[def.size];
    const paint = (type: "idle" | "walk", index: number) => (g: Graphics) =>
      drawArchetype(makeFrame(g, def, type, index), def);
    texture(scene, base, w, h, paint("idle", 0));
    for (let i = 0; i < 2; i++) texture(scene, `${base}-idle-${i}`, w, h, paint("idle", i));
    for (let i = 0; i < 4; i++) texture(scene, `${base}-walk-${i}`, w, h, paint("walk", i));
  }
  if (!scene.anims.exists(`${base}-idle`)) {
    scene.anims.create({
      key: `${base}-idle`,
      frames: [{ key: `${base}-idle-0` }, { key: `${base}-idle-1` }],
      frameRate: 3,
      repeat: -1,
    });
  }
  if (!scene.anims.exists(`${base}-walk`)) {
    scene.anims.create({
      key: `${base}-walk`,
      frames: [0, 1, 2, 3].map((i) => ({ key: `${base}-walk-${i}` })),
      frameRate: 8,
      repeat: -1,
    });
  }
  return base;
}
