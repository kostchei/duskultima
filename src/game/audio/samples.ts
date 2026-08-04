/**
 * Recorded one-shots: fetch → decodeAudioData → cache → play through the same
 * mastering chain the synthesized foley uses.
 *
 * Everything else in `audio/` is generated from primitives. This module is the
 * one exception, for sounds no oscillator gets right — a monster's voice. It
 * deliberately does NOT use Phaser's loader or sound manager: those maintain a
 * second audio graph that knows nothing about `context.ts`'s reverb bus, mute
 * or master volume, so a sample played that way would ignore all three.
 *
 * A clip is decoded once per URL and the AudioBuffer is reused; buffers are
 * immutable and any number of BufferSourceNodes can read the same one.
 */

import { audioCtx } from "./context";
import { Shot, type SfxOpts } from "./sfx";

export interface SampleOpts extends SfxOpts {
  /**
   * Playback rate. A canned clip fired twice is identical in a way synthesized
   * foley never is, so callers jitter this to break the machine-gun effect.
   */
  rate?: number;
}

const buffers = new Map<string, AudioBuffer>();
const inflight = new Map<string, Promise<AudioBuffer>>();

/**
 * Fetch and decode a clip, or hand back the cached buffer. Concurrent callers
 * for the same URL share one request. Throws on a missing file or a clip this
 * browser cannot decode — a 404 here means the asset pack and the code that
 * names it have drifted apart, which is a build problem, not a runtime one.
 */
export function loadSample(url: string): Promise<AudioBuffer> {
  const done = buffers.get(url);
  if (done) return Promise.resolve(done);
  const pending = inflight.get(url);
  if (pending) return pending;

  const load = (async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`sample ${url} failed to load: HTTP ${res.status}`);
    const bytes = await res.arrayBuffer();
    // decodeAudioData rejects with a bare DOMException; name the file.
    const buf = await audioCtx()
      .decodeAudioData(bytes)
      .catch((cause: unknown) => {
        throw new Error(`sample ${url} could not be decoded`, { cause });
      });
    buffers.set(url, buf);
    inflight.delete(url);
    return buf;
  })();
  inflight.set(url, load);
  return load;
}

/**
 * The decoded clip, or null when it has not landed yet. Callers that fire on a
 * gameplay beat use this rather than awaiting: a voice that arrives 200 ms late
 * is worse than one that does not play, and the prefetch pass means "not yet"
 * only happens on a monster that spawned in the last instant.
 */
export function cachedSample(url: string): AudioBuffer | null {
  return buffers.get(url) ?? null;
}

/** Play a decoded clip as a one-shot; the node graph frees itself when it ends. */
export function playSample(buf: AudioBuffer, opts: SampleOpts = {}): void {
  const shot = new Shot(opts);
  const src = shot.own(shot.c.createBufferSource());
  src.buffer = buf;
  src.playbackRate.value = opts.rate ?? 1;
  const gain = shot.own(shot.c.createGain());
  gain.gain.value = opts.gain ?? 1;
  src.connect(gain);
  shot.route(gain);
  src.start(shot.t0);
  // Rate-scaled: a clip at 0.9x runs longer than its nominal duration.
  shot.finish(src, shot.t0 + buf.duration / (opts.rate ?? 1) + 0.05);
}

/** Test seam: drop every cached buffer so a fresh load can be observed. */
export function clearSampleCache(): void {
  buffers.clear();
  inflight.clear();
}
