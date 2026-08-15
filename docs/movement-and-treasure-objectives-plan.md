# Movement Pacing & Treasure-Backed Objectives — Design Notes

Status: **documentation only, not implemented.**

Two independent changes are proposed here:

1. Arrow-key movement should advance one 5ft square per press (a slow walking
   feel), not the current multi-tile "near" jump.
2. Non-kill objectives (rescue, harvest, retrieve, etc.) should be represented
   as treasure, using Shadowdark's own vocabulary for how treasure is
   concealed, guarded, or trapped — reusing systems that already exist in the
   codebase rather than inventing a parallel one.

---

## 1. Movement: one press = one 5ft square

### Current behavior

- [`InputHandler.ts:42-62`](../src/game/input/InputHandler.ts) — arrow/WASD/numpad
  keys call `onMove(dx, dy, movementBands)` with `dx/dy` as a unit direction.
  [`InputHandler.ts:39`](../src/game/input/InputHandler.ts) — holding **Shift**
  sets `movementBands = 2` instead of `1`.
- [`main.ts:189-280`](../src/main.ts) `handleMove(dx, dy, bands)` is where a
  press actually resolves. The key line is
  [`main.ts:200`](../src/main.ts): `const steps = movementTiles(requestedBands);`
  followed by a `for` loop ([`main.ts:202-238`](../src/main.ts)) that walks the
  player through `steps` tiles in one call — this is what makes a single arrow
  press slide the player several squares at once today.
- [`rangeBands.ts:5-16`](../src/engine/rangeBands.ts) defines the conversion:
  ```
  RANGE_BAND_TILES = { close: 1, near: 4, doubleNear: 8, far: 12 }
  movementTiles(bands) = bands * RANGE_BAND_TILES.near
  ```
  So `movementTiles(1) === 4` and `movementTiles(2) === 8`. One tile is
  Shadowdark's "close" range (5ft square); "near" (4 tiles ≈ 30ft) is a full
  move action. There is no literal `5` or `30` feet constant anywhere — feet
  are implied by the tile/band abstraction.
- [`TileSet.ts:8`](../src/game/renderer/TileSet.ts) — `TILE_SIZE = 32` (pixels
  per tile). Purely visual, unrelated to feet.
- Rendering has no animation/tween: `MapRenderer.ts` redraws the grid per
  frame with the player already at its new logical tile. There is also no
  keyboard-repeat throttling — holding a key relies on the browser's native
  repeat rate.

### What "5ft per press, walking pace" implies

- **Distance per press**: a single arrow press should move exactly 1 tile
  (Shadowdark's "close"/5ft square), not `movementTiles(1) === 4`. The fix
  point is `movementTiles()` in `rangeBands.ts`, or how `handleMove` consumes
  it — but `movementTiles` is also used elsewhere for band-based checks (range
  bands in combat, not just player stepping), so the walking-speed change
  should be scoped to the player's per-press step count in `main.ts`, not by
  silently redefining what a "near" band means everywhere else in the engine.
- **Shift-to-run**: the existing `movementBands = 2` (Shift) path already
  reads as a "double move" — worth deciding whether Shift should still exist
  once base movement is 1 tile, or whether it becomes redundant.
- **"Give the impression of walking, i.e. move slowly"**: there's currently no
  time-based animation layer at all — movement is an instant tile swap plus a
  step SFX (`main.ts:239`, `this.audio.playStepSfx()`). Making it *feel* slow
  needs one of:
  - A per-tile move cooldown/throttle in `handleMove` (reject repeat input
    until N ms have passed), independent of visuals, or
  - An actual sprite tween in `MapRenderer` from old tile to new tile over a
    short duration, so held-key movement reads as walking rather than
    teleporting square-to-square.
  Neither exists today; either is additive, not a rework of existing systems.

### Files that would be touched (for future implementation, not now)

| File | Role |
|---|---|
| `src/engine/rangeBands.ts` | tile/feet conversion constants |
| `src/main.ts` (`handleMove`) | per-press step count, cooldown |
| `src/game/renderer/MapRenderer.ts` | optional tween for walking feel |
| `src/game/input/InputHandler.ts` | Shift/run semantics, if kept |

---

## 2. Non-kill objectives as treasure

Shadowdark doesn't have a formal "objective" mechanic distinct from treasure —
a rescue, a harvested component, a retrieved item are all *treasure* framed by
narrative dressing, and treasure in Shadowdark can be **hidden** (found by
search), **guarded** (a monster stands between the party and it), or
**trapped** (triggers on interaction) per the core rulebook's GM guidance on
crafting "marvelous treasures worth stealing" and populating a site with
danger around them (`docs/extracted/raw/shadow-dark.pdf.json`, GM chapter).
None of the extracted core rulebook text uses a formal "dungeon stocking
table," so DuskUltima's own goal/treasure systems below are the concrete
mechanical footing.

### What already exists in DuskUltima

**Goal/objective model** — [`Adventure.ts:9-56`](../src/game/level/Adventure.ts)
- `GoalKind` (12 values): `rescue-companion`, `fabled-item`, `lift-hex`,
  `harvest-components`, `treasure-cache`, `exotic-materials`,
  `rescue-hostage`, `monster-eggs`, `assassinate-leader`, `secure-chokepoint`,
  `kill-boss`, `clear-border`.
- `GoalCompletion`: `rescue | acquire | interact | defeat-target | secure-area`.
- `SiteGoal` interface carries `treasureQuality?: "fabulous"|"legendary"`,
  `guardianName?`, `guardianMonsterId?`, `guardianSize?`, `objectiveEntity?`.
- [`goalUsesChest(goal)`](../src/game/level/Adventure.ts) (lines 78-84) — true
  for `fabled-item`, `treasure-cache`, `harvest-components`,
  `exotic-materials`, `monster-eggs`: these five goal kinds already resolve as
  "open a chest," i.e. they are **already modeled as treasure**, not as a
  separate objective system.

**Guarded treasure already implemented** — the closest existing analog to
"hidden/protected/trapped treasure" is the `monster-eggs` goal:
[`AdventureGenerator.ts:55-102`](../src/game/level/AdventureGenerator.ts)
(`EggGuardianProfile`, `EGG_GUARDIANS_BY_BIOME`) ties a harvestable
`treasureQuality` reward to a named `guardianMonsterId`/`guardianSize`,
explicitly designed so the guardian doesn't have to be killed to claim the
treasure (comment at lines 64-67). This is the pattern to generalize to other
non-kill goal kinds (`harvest-components`, `exotic-materials`,
`treasure-cache`) rather than building a new guardian concept.

**Room/site placement** — [`roomGeneration.ts`](../src/game/level/roomGeneration.ts)
- `RoomArchetype` includes `trap`, `hazard`, `rescue`, `treasure-cache`,
  `goal-vault`. `goalRoomArchetype(goal)` (lines 68-72) currently sends every
  chest-based goal to the same `goal-vault` archetype — it doesn't yet
  distinguish "hidden," "guarded," or "trapped" vault variants.
- `buildTravelSegments` (lines 104-113) already attaches `trapId` to corridor
  segments on a fixed cadence (`index % 4 === 1`), independent of room
  contents — traps today are a corridor property, not a treasure property.

**Trap engine** — [`trapsHazards.ts:7-109`](../src/engine/trapsHazards.ts)
- `TrapDef` (id, name, trigger, damage, effect, avoidStat), 12 predefined
  traps.
- `TrapState { found: boolean; disabled: boolean }` is the game's existing
  "hidden" concept — a trap starts unfound; `searchSpecificArea` reveals it,
  `disableTrap` defuses it, `triggerTrap` rolls damage/effect on failure.
- Gap: `TrapDef`/`TrapState` are wired to corridors
  (`CorridorTrapMarker`, [`MapGrid.ts:43-48`](../src/game/level/MapGrid.ts)),
  not to a specific chest/goal entity. There is no single object today that
  carries "this treasure is hidden + guarded + trapped" together.

**Treasure/loot rolling** — [`treasureGeneration.ts`](../src/data/treasureGeneration.ts)
- `TreasureFind` (`def`, `qty`, `quality`, `tableId`, `roll`, `text`, `kind`).
- `rollTreasureFind`, `rollGemstoneFind`, `rollLuxuryItem`,
  `rollTreasureCache` (2-5 independent finds), `rollFabledItem`.
- `TreasureQuality` (`poor|normal|fabulous|legendary`) lives in
  `src/engine/inventory.ts`; XP-per-quality mapping is
  `QUALITY_XP` in [`treasureXp.ts:3-13`](../src/engine/treasureXp.ts).

**Resolution path** — [`main.ts:242-268`](../src/main.ts): stepping onto
`CHEST_CLOSED` opens it, branches by `goal.kind` to decide the flavor text and
roll the right treasure table, then awards XP via `treasureQualityXp`. This is
the single choke point where "hidden / guarded / trapped" checks would need to
run *before* the reward is granted.

### Gap summary — what a "treasure, not kill, objectives" pass would add

1. **Hidden**: a `SiteGoal`/chest-entity flag (e.g. `isHidden?: boolean`) plus
   a search step before the chest tile is revealed/interactable — reusing the
   `TrapState.found`-style reveal pattern already in `trapsHazards.ts`.
2. **Guarded**: generalize the `monster-eggs` guardian pattern
   (`guardianMonsterId`/`guardianSize`/"harvest without killing") from
   `AdventureGenerator.ts` to `treasure-cache`, `harvest-components`, and
   `exotic-materials`, since those are the other chest-based non-kill goals.
3. **Trapped**: attach a `TrapDef`/`trapId` directly to the goal-vault chest
   entity (not just corridor segments), and check it in the `CHEST_CLOSED`
   branch in `main.ts` before granting the treasure roll.
4. **Room archetype**: `goalRoomArchetype()` in `roomGeneration.ts` could
   branch on these new flags to pick among hidden/guarded/trapped vault room
   variants instead of always returning `"goal-vault"`.

No implementation has been made — this section is a map of where each piece
already lives and where the three concealment/protection mechanics would need
to be added.
