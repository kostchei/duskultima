/**
 * Monster voices: the aggro / attack / wounded clips in
 * `public/assets/sounds/monsters/<id>/`.
 *
 * Paths are derived from the monster's id — the asset directories are named for
 * exactly the ids in `data/rosters/`, so no lookup table and no manifest fetch
 * is needed at runtime. `manifest.json` records where each clip came from and
 * is what the coverage test checks; the game never reads it.
 *
 * The 248 monsters share only ~70 source recordings, so playing a clip flat
 * would make a Madman and a Lich the same creature. Two cheap corrections fix
 * that: playback rate follows the monster's size band (a gargantuan speaks an
 * octave down, and slower), and a stable per-id detune separates two monsters
 * of the same size that drew the same recording. Both are deterministic, so a
 * given monster always sounds like itself.
 *
 * Throttles matter here in a way they do not for synthesized foley: a room of
 * eight goblins waking together would otherwise fire eight copies of one clip
 * into phase-cancelling mush.
 */

import type { MonsterDef, MonsterSize } from "../../engine";
import { cachedSample, loadSample, playSample } from "./samples";
import type { SfxOpts } from "./sfx";

export type MonsterVoiceKind = "aggro" | "attack" | "wounded";

export const MONSTER_VOICE_KINDS: readonly MonsterVoiceKind[] = ["aggro", "attack", "wounded"];

/** Playback rate by size band: bigger throat, lower and slower voice. */
const SIZE_RATE: Record<MonsterSize, number> = {
  tiny: 1.38,
  small: 1.16,
  medium: 1,
  large: 0.86,
  huge: 0.74,
  gargantuan: 0.63,
};

/** Widest stable detune between two same-size monsters sharing a recording. */
const ID_DETUNE = 0.07;
/** A single monster will not repeat the same line faster than this. */
const PER_VOICE_GAP_MS = 700;
/** Nor will the pack as a whole stack voices tighter than this. */
const ANY_VOICE_GAP_MS = 110;
/** Voices carry the room, like the rest of the dungeon's foley. */
const VOICE_REVERB = 0.18;

const lastAt = new Map<string, number>();
let lastAnyAt = -Infinity;

/** FNV-1a over the id — a stable, well-spread offset, not a random one. */
function idHash(id: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 0xffffffff;
}

export function monsterVoiceUrl(id: string, kind: MonsterVoiceKind): string {
  return `/assets/sounds/monsters/${id}/${kind}.ogg`;
}

/** The deterministic rate for a monster's voice: size band, then per-id detune. */
export function monsterVoiceRate(def: MonsterDef): number {
  return SIZE_RATE[def.size] * (1 + (idHash(def.id) * 2 - 1) * ID_DETUNE);
}

/**
 * Warm the cache for every monster a level can field. Called at level build,
 * because the first aggro is triggered by walking within five tiles — far too
 * late to start a fetch. Clips average 5 KB, so a whole level's roster is well
 * under a tenth of a megabyte.
 */
export function preloadMonsterVoices(defs: Iterable<MonsterDef>): Promise<void> {
  const seen = new Set<string>();
  const loads: Promise<unknown>[] = [];
  for (const def of defs) {
    if (seen.has(def.id)) continue;
    seen.add(def.id);
    for (const kind of MONSTER_VOICE_KINDS) loads.push(loadSample(monsterVoiceUrl(def.id, kind)));
  }
  return Promise.all(loads).then(() => undefined);
}

/**
 * Fire a monster's voice. Returns whether it actually played, which is what the
 * tests assert on. A clip that has not finished decoding is skipped rather than
 * awaited — the sound belongs to this frame or not at all — and the load is
 * kicked off so the monster's next line lands.
 */
export function playMonsterVoice(
  def: MonsterDef,
  kind: MonsterVoiceKind,
  opts: SfxOpts = {},
  now = performance.now(),
): boolean {
  const key = `${def.id}:${kind}`;
  if (now - (lastAt.get(key) ?? -Infinity) < PER_VOICE_GAP_MS) return false;
  if (now - lastAnyAt < ANY_VOICE_GAP_MS) return false;

  const url = monsterVoiceUrl(def.id, kind);
  const buf = cachedSample(url);
  if (!buf) {
    void loadSample(url);
    return false;
  }

  lastAt.set(key, now);
  lastAnyAt = now;
  playSample(buf, { reverb: VOICE_REVERB, ...opts, rate: monsterVoiceRate(def) });
  return true;
}

/** Test seam: forget every throttle so timing can be exercised from a clean slate. */
export function resetMonsterVoiceThrottle(): void {
  lastAt.clear();
  lastAnyAt = -Infinity;
}
