/**
 * Monster voices, exercised through the code the game runs.
 *
 * The predecessor of this file only stat'd files on disk, so it stayed green
 * for as long as the assets existed — including the whole period in which
 * nothing loaded or played them. These tests drive `playMonsterVoice` against a
 * fake AudioContext and assert a buffer actually reached a source node.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { allMonsters } from "../src/data/monsters";
import {
  monsterVoiceRate,
  monsterVoiceUrl,
  playMonsterVoice,
  preloadMonsterVoices,
  resetMonsterVoiceThrottle,
  MONSTER_VOICE_KINDS,
} from "../src/game/audio/monsterVoice";
import { clearSampleCache, loadSample } from "../src/game/audio/samples";

// ── A minimal Web Audio fake ─────────────────────────────────────────────────

class FakeParam {
  value = 0;
  setValueAtTime(): this {
    return this;
  }
  setTargetAtTime(): this {
    return this;
  }
  cancelScheduledValues(): this {
    return this;
  }
}

class FakeNode {
  readonly outputs: FakeNode[] = [];
  gain = new FakeParam();
  frequency = new FakeParam();
  pan = new FakeParam();
  threshold = new FakeParam();
  knee = new FakeParam();
  ratio = new FakeParam();
  attack = new FakeParam();
  release = new FakeParam();
  playbackRate = new FakeParam();
  type = "";
  curve: Float32Array | null = null;
  oversample = "none";
  buffer: unknown = null;
  onended: (() => void) | null = null;
  started = false;
  connect(to: FakeNode): FakeNode {
    this.outputs.push(to);
    return to;
  }
  disconnect(): void {}
  start(): void {
    this.started = true;
  }
  stop(): void {}
}

/** Every BufferSourceNode the code under test created, in order. */
let sources: FakeNode[] = [];

class FakeAudioContext {
  readonly sampleRate = 48000;
  readonly currentTime = 0;
  readonly destination = new FakeNode();
  state = "running";
  createGain(): FakeNode {
    return new FakeNode();
  }
  createStereoPanner(): FakeNode {
    return new FakeNode();
  }
  createBiquadFilter(): FakeNode {
    return new FakeNode();
  }
  createWaveShaper(): FakeNode {
    return new FakeNode();
  }
  createDynamicsCompressor(): FakeNode {
    return new FakeNode();
  }
  createConvolver(): FakeNode {
    return new FakeNode();
  }
  createBufferSource(): FakeNode {
    const n = new FakeNode();
    sources.push(n);
    return n;
  }
  createBuffer(channels: number, length: number): { getChannelData: () => Float32Array } {
    const data = Array.from({ length: channels }, () => new Float32Array(length));
    return { getChannelData: (i = 0) => data[i]! };
  }
  decodeAudioData(bytes: ArrayBuffer): Promise<{ duration: number }> {
    // Anything non-empty "decodes"; an empty body stands in for a corrupt clip.
    if (bytes.byteLength === 0) return Promise.reject(new Error("bad clip"));
    return Promise.resolve({ duration: 1.25 });
  }
}

/** Serve any URL as a fixed non-empty body unless overridden. */
function stubFetch(handler?: (url: string) => Response): void {
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) =>
      Promise.resolve(handler ? handler(url) : new Response(new ArrayBuffer(64), { status: 200 })),
    ),
  );
}

const monsters = allMonsters();
const goblin = monsters.find((m) => m.id === "goblin")!;

beforeEach(() => {
  sources = [];
  clearSampleCache();
  resetMonsterVoiceThrottle();
  vi.stubGlobal("AudioContext", FakeAudioContext);
  stubFetch();
});

// ── Asset coverage, through the path the game actually builds ────────────────

describe("monster voice asset coverage", () => {
  it("names a real file on disk for every monster and every kind", () => {
    const missing: string[] = [];
    for (const def of monsters) {
      for (const kind of MONSTER_VOICE_KINDS) {
        // The URL is site-absolute; public/ is the web root.
        const file = path.resolve(__dirname, "../public", monsterVoiceUrl(def.id, kind).slice(1));
        if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
          missing.push(`${def.id}/${kind}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("covers all 248 monsters", () => {
    expect(monsters.length).toBe(248);
  });
});

// ── Playback ─────────────────────────────────────────────────────────────────

describe("playMonsterVoice", () => {
  it("plays a decoded clip through a buffer source", async () => {
    await preloadMonsterVoices([goblin]);
    expect(playMonsterVoice(goblin, "aggro", {}, 1000)).toBe(true);
    expect(sources).toHaveLength(1);
    expect(sources[0]!.buffer).toMatchObject({ duration: 1.25 });
    expect(sources[0]!.started).toBe(true);
  });

  it("does not play a clip that has not been decoded yet, but starts the load", () => {
    expect(playMonsterVoice(goblin, "aggro", {}, 1000)).toBe(false);
    expect(sources).toHaveLength(0);
    expect(fetch).toHaveBeenCalledWith(monsterVoiceUrl(goblin.id, "aggro"));
  });

  it("throttles a repeat of the same line but allows a different one", async () => {
    await preloadMonsterVoices([goblin]);
    expect(playMonsterVoice(goblin, "aggro", {}, 1000)).toBe(true);
    expect(playMonsterVoice(goblin, "aggro", {}, 1200)).toBe(false); // inside the 700 ms per-line gap
    expect(playMonsterVoice(goblin, "attack", {}, 1050)).toBe(false); // inside the 110 ms pack gap
    expect(playMonsterVoice(goblin, "attack", {}, 1400)).toBe(true);
    expect(playMonsterVoice(goblin, "aggro", {}, 2200)).toBe(true);
  });

  it("carries the caller's spatial opts onto the shot", async () => {
    await preloadMonsterVoices([goblin]);
    playMonsterVoice(goblin, "aggro", { pan: -0.8, cutoff: 900, gain: 0.4 }, 1000);
    // pan and cutoff each insert a node ahead of master, so the source's chain
    // is longer than the bare gain → master of an unspatialized shot.
    const chain: FakeNode[] = [];
    let node: FakeNode | undefined = sources[0];
    while (node) {
      chain.push(node);
      node = node.outputs[0];
    }
    expect(chain.length).toBeGreaterThan(3);
  });
});

// ── Per-monster differentiation ──────────────────────────────────────────────

describe("monsterVoiceRate", () => {
  it("is deterministic", () => {
    expect(monsterVoiceRate(goblin)).toBe(monsterVoiceRate(goblin));
  });

  it("drops with size — a gargantuan speaks below a tiny", () => {
    const bySize = (size: string) => monsters.filter((m) => m.size === size);
    const tiny = bySize("tiny")[0];
    const huge = bySize("huge")[0];
    if (!tiny || !huge) throw new Error("roster lacks a tiny or huge monster to compare");
    expect(monsterVoiceRate(tiny)).toBeGreaterThan(monsterVoiceRate(huge));
  });

  it("separates same-size monsters, which mostly share source recordings", () => {
    const medium = monsters.filter((m) => m.size === "medium");
    const rates = new Set(medium.map((m) => monsterVoiceRate(m).toFixed(6)));
    // 248 monsters were built from ~70 recordings; without the per-id detune a
    // whole size band would be audibly one creature.
    expect(rates.size).toBeGreaterThan(medium.length * 0.9);
  });

  it("stays inside a range that does not turn a voice into a chipmunk or a drone", () => {
    for (const def of monsters) {
      const rate = monsterVoiceRate(def);
      expect(rate).toBeGreaterThan(0.5);
      expect(rate).toBeLessThan(1.6);
    }
  });
});

// ── Loading ──────────────────────────────────────────────────────────────────

describe("loadSample", () => {
  it("decodes once and reuses the buffer", async () => {
    const url = monsterVoiceUrl(goblin.id, "aggro");
    const [a, b] = await Promise.all([loadSample(url), loadSample(url)]);
    expect(a).toBe(b);
    await loadSample(url);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("throws on a missing clip rather than silently going quiet", async () => {
    stubFetch(() => new Response(null, { status: 404 }));
    await expect(loadSample("/assets/sounds/monsters/nope/aggro.ogg")).rejects.toThrow(/HTTP 404/);
  });

  it("throws with the file named when a clip cannot be decoded", async () => {
    stubFetch(() => new Response(new ArrayBuffer(0), { status: 200 }));
    await expect(loadSample("/assets/sounds/monsters/goblin/aggro.ogg")).rejects.toThrow(
      /goblin\/aggro\.ogg could not be decoded/,
    );
  });
});
