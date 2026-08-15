# Audio Plan (2026) — supersedes `audio-plan.md`

> **Status: planning only.** No implementation in this doc has landed yet.

## Why a new doc

[`audio-plan.md`](audio-plan.md) was written against the old scene-based
architecture (`src/game/scenes/Dungeon.ts`, `CharacterSprite.ts`,
`combat.ts`, `spells.ts`, `traps.ts`, `Hud.ts`). That architecture no longer
exists — the game was rewritten into a single `src/main.ts` scene
(958 lines) plus `src/engine/` (pure rules) and `src/game/{level,renderer,
ui,input,audio}/`. Six of that plan's checkpoints are marked done, but none
of the described files (`context.ts`, `noise.ts`, `sfx.ts`, `ambience.ts`,
`spatial.ts`, `voice.ts`) exist in the tree, and nothing in `main.ts`
references them. The only surviving artifact is
[`AudioEngine.ts`](../src/game/audio/AudioEngine.ts), a small class with
four one-shots and a single-oscillator ambience drone, wired directly into
`main.ts`. Whatever the old system became, it isn't there now — this plan
starts from what actually exists today and does not assume any of the old
plan's file layout is reachable.

## Current state (verified against the tree)

`src/game/audio/AudioEngine.ts` — one class, constructed once in `main.ts`:

- Lazy `AudioContext`, unlocked on first `click`/`keydown` (`window`
  listeners registered in the constructor, not deregistered after firing).
- `playHitSfx()` — sawtooth 160→40 Hz, τ≈150ms.
- `playSpellSfx()` — sine 440→880 Hz, τ≈300ms.
- `playStepSfx()` — triangle 80→30 Hz, τ≈50ms.
- `playVictoryJingle()` — 4-note square arpeggio (C5 E5 G5 C6).
- `updateBiomeAmbience(biome)` — one sine oscillator, frequency keyed by
  `MonsterBiome`, gain fixed at 0.03, replaces the previous oscillator on
  call. Runs continuously once started (no bed/loop — a raw drone).
- No mute toggle, no master bus, no per-sound gain/pan control, no jitter
  (every hit sounds identical), no reverb, no spatialization, no cleanup
  beyond `stop()`/`disconnect()` on ambience replacement.

Wired call sites in `src/main.ts` (all direct calls, no event/log
indirection):

| Call | Site |
|---|---|
| `updateBiomeAmbience(site.biome)` | `loadCurrentSite()` — site entry |
| `playStepSfx()` | player move resolution (walk loop) |
| `playHitSfx()` | player-hits-monster, monster-hits-player, spell damage |
| `playSpellSfx()` | `handleCast()`, follower auto-cast in `resolveAutoSupport` |
| `playVictoryJingle()` | NPC rescue, site goal completion, carousing result |

`MonsterBiome` has exactly six values (`diablerie`, `red-sands`,
`midnight-sun`, `river-of-night`, `dwellers-in-the-deep`, `city-of-masks`),
matching the six Cursed Scroll zones in `AGENTS.md`.

## Constraints (carried over from the old plan, still correct)

- Zero new dependencies, zero audio assets — Web Audio primitives only
  (oscillators, noise buffers, filters, envelopes). No AudioWorklet needed
  for anything in scope.
- `Math.random()` for all sound-parameter jitter — never the engine's
  seeded `Dice` (`src/engine/dice.ts`). Audio is cosmetic and must not
  perturb rules-determinism.
- Per user's global instruction: **no fallbacks** — if `AudioContext` is
  unavailable or a node graph can't be built, throw rather than silently
  no-op. (Note: this is a change from `AudioEngine.ts`'s current
  `if (!this.ctx) return;` guards, which swallow the missing-API case —
  the rewrite should throw instead, still gated so the throw only happens
  after a user gesture has been attempted.)
- One-shots self-clean via `onended` → `disconnect()`. Persistent sounds
  (ambience beds) return a handle with `.destroy()`.

## Proposed architecture

Keep it flat inside `src/game/audio/`, replacing `AudioEngine.ts` with a
small set of focused modules rather than one growing class — mirrors how
`src/game/renderer/` already splits `TileSet.ts` / `MapRenderer.ts` /
`MonsterSprite.ts` by concern.

```
src/game/audio/
  context.ts    // AudioContext singleton, unlock, master bus, mute
  noise.ts      // pure noise generators + cached AudioBuffers
  sfx.ts        // one-shot foley (attack, spell, footstep, pickup, etc.)
  ambience.ts   // looping per-biome beds (replaces the raw oscillator)
  index.ts      // thin facade main.ts imports, so call sites don't change shape
```

`index.ts` exists specifically so `main.ts`'s ~11 call sites
(`this.audio.playHitSfx()` etc.) keep working with minimal edits — swap the
`AudioEngine` class instance for a facade object with the same method
names, backed by the new modules underneath.

### `context.ts`

```ts
export function audioCtx(): AudioContext;       // lazy singleton; throws if AudioContext unavailable
export function masterGain(): GainNode;          // audioCtx → masterGain → destination
export function setMuted(muted: boolean): void;
export function isMuted(): boolean;
export function installUnlock(): void;           // one-time pointerdown/keydown → ctx.resume(), self-deregisters
```

- Fixes the current listener leak (today's `{ once: true }` on `click`/
  `keydown` in the constructor is fine for a single instance, but the new
  singleton form should own this once at module scope, not per-`new`).
- Master gain default ~0.5; individual sounds mix underneath it.
- Re-resume on `visibilitychange` (tab backgrounding suspends the
  context in most browsers).

### `noise.ts`

Pure functions, unit-testable without any Web Audio types (same pattern the
old plan used, and matches this repo's existing style of pure-logic modules
in `src/engine/` with colocated `*.test.ts`):

```ts
export function whiteNoise(length: number): Float32Array;
export function pinkNoise(length: number): Float32Array;   // Voss–McCartney
export function brownNoise(length: number): Float32Array;  // integrated white, normalized
export function noiseBuffer(ctx: AudioContext, kind: "white" | "pink" | "brown"): AudioBuffer; // cached
```

### `sfx.ts` — one-shot foley, jittered

Replace the four fixed-frequency one-shots with jittered versions (today,
every `playHitSfx()` call is bit-identical — the old plan's stated
principle of "every one-shot jitters its parameters per call" was never
applied here) and add the categories the current call sites actually need
but don't have yet:

| Export | Covers today's call | Notes |
|---|---|---|
| `meleeHit({ crit })` | `playHitSfx()` at player/monster melee sites | replace fixed 160→40 Hz sweep with ±15% jitter; `crit` adds a brighter second partial |
| `meleeMiss()` | *(new — currently silent on miss)* | short bandpassed noise whoosh |
| `spellCast()` | `playSpellSfx()` | jittered base frequency |
| `spellMishap()` | *(new — `resolveSpellEffect`'s `pendingMishap`/`fail` branches are currently silent)* | descending FM sweep |
| `footstep()` | `playStepSfx()` | quieter, pink-noise-based instead of a bare triangle sweep |
| `pickupChime()` | *(new — chest/treasure pickup has no sound today)* | additive sine, 2 partials |
| `victoryFanfare()` | `playVictoryJingle()` | keep the 4-note arpeggio shape, add slight per-note timing jitter |
| `deathKnell()` | *(new — "is slain!" log lines are silent)* | low FM bell |
| `doorOpen()` | *(new — door-open log line is silent)* | brown burst + damped sine |

All take an optional `{ gain?, jitter? }`; every function builds its own
node graph on `audioCtx()`, starts, and self-destructs via `onended`.

### `ambience.ts` — six biome beds, not one oscillator

Today's `updateBiomeAmbience` is a single sine tone per biome — six
different pitches of the same drone, no texture. Replace with per-biome
noise-and-filter beds keyed off the existing `MonsterBiome` union (no new
type needed):

| `MonsterBiome` | Bed |
|---|---|
| `diablerie` (swamp) | brown noise, heavy lowpass, slow LFO on cutoff — bog rumble |
| `red-sands` (desert) | pink noise, lowpass with wide slow LFO sweep — wind |
| `midnight-sun` (frost) | thin high-passed white noise, sparse — wind whistle |
| `river-of-night` (subterranean river) | brown noise bed + sparse `waterPlink`-style Poisson drips |
| `dwellers-in-the-deep` (sunken cenote) | very low lowpassed brown noise, muffled — underwater pressure |
| `city-of-masks` (urban) | quiet pink noise, minimal filtering — distant city murmur |

```ts
export interface AmbienceHandle { setLevel(v: number): void; destroy(): void; }
export function biomeAmbience(biome: MonsterBiome): AmbienceHandle;
```

`main.ts`'s `loadCurrentSite()` calls `.destroy()` on the previous handle
before creating the next one (today it just replaces the oscillator
in-place inside the class — same idea, made explicit so tests can assert no
node leak across repeated site loads).

### What's explicitly out of scope for this pass

- **Spatialization / panning.** `main.ts` has no per-sprite render layer
  today (rendering is grid-tile based via `MapRenderer.ts`, not individual
  positioned sprites with a camera), so distance/pan math has no listener
  position to key off yet. Revisit if/when combat gets positional
  rendering.
- **Narrative voice synthesis.** The old plan's Checkpoint 5
  (`voice.ts`, formant synthesis for message-log lines) is a large, separate
  feature. Not attempted here; if wanted later it's an independent doc.
- **Mastering bus (compressor/saturation/reverb send).** Old plan's
  Checkpoint 6. Worth doing once the basic foley set sounds distinct and
  jittered — premature before that.

## Integration map (current file, current line shapes)

| Sound | Where in `src/main.ts` |
|---|---|
| `installUnlock` | once, near `AudioEngine` construction (constructor call site) |
| mute toggle | none exists today — needs a keybind (check `InputHandler.ts` for a free key) and/or a `Modals.ts` entry; no UI currently surfaces sound state |
| `meleeHit`/`meleeMiss` | player-attacks-monster block (`audio.playHitSfx()` today) — branch on `result.check.success` for miss |
| `meleeHit` (monster→player) | monster attack resolution block (`audio.playHitSfx()` today) |
| `spellCast`/`spellMishap` | `resolveSpellEffect()` — mishap/fail branches currently fall through silently |
| `footstep` | walk-loop block (`audio.playStepSfx()` today) |
| `pickupChime` | chest-open / treasure-collect block (`TileType.CHEST_CLOSED` handling) — currently silent |
| `victoryFanfare` | rescue, site-goal-completion, carousing-result blocks (`audio.playVictoryJingle()` today) |
| `deathKnell` | "`${monster.name} is slain!`" log line in melee/spell-damage blocks — currently silent |
| `doorOpen` | door-open log line in walk-loop block — currently silent |
| `biomeAmbience` | `loadCurrentSite()` (`audio.updateBiomeAmbience(site.biome)` today) |

## Checkpoints

Each ends with `npm run build` (tsc + vite) clean, `npm test` green
(`vitest run`), and a browser check via the `run` skill / dev server.
Web Audio output can't be asserted from a screenshot; verify
programmatically by attaching an `AnalyserNode` to `masterGain()` and
checking RMS > 0 after firing a sound, plus `audioCtx().state === "running"`
after the unlock gesture. Final signoff on "does it sound right" is the
user listening.

1. **Core plumbing.** `context.ts`, `noise.ts` + `*.test.ts` (spectral
   sanity: brown low-band ≫ high-band, pink in between; non-determinism
   assertion — two calls differ).
2. **Foley set.** `sfx.ts`, `index.ts` facade, swap `AudioEngine` for the
   facade in `main.ts` (existing call sites unchanged), add the previously-
   silent hooks (miss, mishap, pickup, death, door). Level pass so nothing
   dominates.
3. **Ambience beds.** `ambience.ts`, six biome beds replacing the single
   oscillator; verify no node leak across repeated `loadCurrentSite()`
   calls (RMS stable across several site transitions).
4. **Mute control.** Wire a keybind + `setMuted`/`isMuted`, surface state
   somewhere in `Modals.ts` or the HUD log line so it's discoverable.

Deliberately stops there — mastering bus, spatialization, and voice synth
are called out above as future, separately-scoped work.

## Open questions for the user

1. Keep `AudioEngine.ts`'s class-based public API (so `main.ts` needs zero
   call-site edits beyond the constructor line), or take this chance to
   inline the calls and drop the facade? Plan above assumes keep-the-facade
   for a smaller diff.
2. Any preference on the mute keybind? `InputHandler.ts` needs a check for
   a free key.
