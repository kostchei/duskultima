# Monster Sprite Packs — Audit and Implementation Plan

Status: **Phases 1 and 2 implemented** (`src/game/renderer/MonsterSprite.ts`, wired
into `MapGrid`/`MapRenderer` — see 2026-08-16 note below) / originally drafted 2026-08-15
Scope: monster visual identity only — no rules, stats, spawn, or combat-math changes

## 2026-08-16 — implementation note

This plan was drafted from an audit that missed `MonsterSprite.ts` (case-sensitive
grep gap, not a real gap in the code) — it already existed, built in
commits `bb95425` ("feat: render monsters with procedural sprites") and `a7d511a`
("dungeon"), predating this doc. Both phases below are done:

- **Phase 1**: `MonsterSpriteDrawer.getMonsterTileCanvas` draws all 15
  `MonsterArchetype`s plus all 9 `MonsterFeature` overlays from each monster's
  `art`/`size` data, with a shared ink-outline pass. `MapEntity` carries
  `monsterId`/`monsterDef`, `MapGrid` sets them on every spawn path (regular
  room content, boss/climax, rescue guardian), and `MapRenderer.getEntityCanvas`
  always resolves through the real `MonsterDef` when present — the old 4-glyph
  `TileType.GOBLIN/ORC/SKELETON/GLOOM_OGRE` fallback is effectively dead code now.
- **Phase 2**: `CURATED_MONSTER_IDS` (175 ids, all verified present as
  `public/assets/monsters/<id>.png`) triggers a non-blocking `Image` load that
  overwrites the procedural canvas once decoded, upscaling the 16×16 Kenney tile
  with `imageSmoothingEnabled = false`. Every other monster keeps the Phase 1
  procedural sprite.

Remaining item from the original plan: **Phase 3** (bestiary/combat-portrait UI)
is still not built — no such screen exists yet. Not a blocker; the art from
Phases 1–2 is already the right shape to reuse there if that UI gets built.

## Audit — what's actually in the repo

Three sprite sources exist under `public/assets/monsters/`, and **none of them
are wired into the running game**. `MapRenderer`/`TileSet` and every other
render path in `src/game/` draw everything with `ctx.drawImage()` onto
procedurally-generated `HTMLCanvasElement`s (see `TileSet.ts`'s
`drawFloorTile`, `drawWallTile`, `drawHeroTile`, etc.) — there is no
`new Image()` / sprite-sheet loading path anywhere in `src/`. The three PNG
sources were staged by earlier `tmp/*.py` scripts but the loop stopped short
of the actual rendering code:

1. **`50_monsters_pack_2d_version_1.0_0/`** — a licensed "50+ Monsters Pack
   2D" front/back battle-sprite set. Visually it's a cute creature-collector
   style (rounded, saturated, Pokémon-adjacent) — see
   `public/assets/monsters/50_monsters_pack_2d_preview_1.png`. This clashes
   hard with the game's dark, gritty Shadowdark/Ultima‑V tone and with every
   other procedurally-painted surface in the game (biome textures, hero
   tiles, HUD chrome). **Not recommended for in-game rendering.** It's fine
   to leave on disk unused, or repurpose later for something explicitly
   whimsical (a joke ending, a April-fools skin), but it should not become
   the default monster art.

2. **`tiny-creatures/` (Kenney "Tiny Dungeon" pack, CC0)** — 180 individual
   16×16 pixel-art tiles, already extracted to
   `tiny-creatures/tiny-creatures/Tiles/tile_0001.png..tile_0180.png`. Style
   is dark-outlined, muted, chunky retro pixel art — a genuine match for this
   game's aesthetic and license (CC0, no attribution required). A prior
   session already hand-curated a quality mapping from tile → monster id in
   `tmp/map_exact_manifest.py` (e.g. tile 11 → `goblin`, tile 43 →
   `troll`/`frost-troll`/`deep-troll`) and copied the results into
   `public/assets/monsters/<id>.png`. That curation only covers **116 of the
   248** monster ids defined across the six rosters.

3. **`Slimes/`** — 6 small hand-drawn slime spritesheets (128×128, RGBA,
   grid-of-frames), reasonable style fit, but a tiny slice of the roster.

Checked against the full monster list (`tmp/all_monsters.json`, 248 ids
pulled from `src/data/rosters/*.ts` via the `mon()` builder in
`src/data/rosters/build.ts`): **131 of 248 monster ids have no PNG at all.**
Raster art alone cannot reach full coverage without buying/commissioning ~130
more sprites in a matching style.

## The asset that's actually complete: procedural monster art data

Every one of the 248 `MonsterDef` entries (`src/engine/monster.ts`) already
carries everything a parametric sprite generator needs, authored by hand per
monster:

- `archetype: MonsterArchetype` — 15 silhouette families (`biped`, `brute`,
  `quadruped`, `boar`, `vermin`, `spider`, `swarm`, `ooze`, `skeletal`,
  `flyer`, `serpent`, `elemental`, `centaur`, `plant`, `avian`)
- `size: MonsterSize` — 6 bands, each with a footprint in
  `MONSTER_SIZE_PX` (tiny 18×14 up to gargantuan 58×54)
- `art: MonsterArt` — `body`/`shade`/`accent`/`eye` colors (packed as
  `number`, i.e. `0xRRGGBB`) plus an optional `features` list (`tusks`,
  `horns`, `quills`, `mane`, `weapon`, `robe`, `wings`, `manyEyes`, `tail`)

The doc comments even name the intended consumer: `MonsterArt`'s docstring
says "Colours **the parametric generator** paints an archetype with" and
`MonsterSize`'s says "Sprite footprint per size band" — this generator was
designed and the data fully authored, but never built. This is the highest-
leverage path: it reaches all 248 monsters immediately, needs no new art
licensing, and stays visually consistent with every other canvas-drawn
surface in the game (same style `TileSet.drawHeroTile` already uses: flat
shapes, a 1–2px outline, `imageSmoothingEnabled = false`, 32×32 canvas).

## Recommended plan

### Phase 1 — Parametric monster sprite generator (primary, full coverage) — ✅ done

1. Add `src/game/renderer/MonsterSprite.ts` with one entry point,
   `drawMonsterTile(def: MonsterDef, palette: BiomePalette): HTMLCanvasElement`.
2. Implement one silhouette-drawing function per `MonsterArchetype` (15
   total). Each draws a simple layered shape on a 32×32 canvas using
   `def.art.body/shade/accent/eye` for fills and a shared outline pass, scaled
   by `MONSTER_SIZE_PX[def.size]` so tiny vermin read smaller than a huge
   ogre. Start with 4–5 archetypes that cover the most monsters (`biped`,
   `quadruped`, `skeletal`, `ooze`, `brute`), reusing `TileSet`'s existing
   `createCanvas()`/outline helpers, then fill in the rest.
3. Layer `features` as small additive marks on top of the base silhouette
   (a `tusks` triangle pair, a `weapon` diagonal line, a `wings` side pair,
   `manyEyes` as a dot cluster, etc.) so families that share an archetype
   (e.g. all the Diablerie quillboar ranks) still read as distinct.
4. Cache generated canvases by `${def.id}_${biome}` the same way
   `TileSet.heroTileCache` caches hero tiles today — monster art shouldn't be
   redrawn every frame.
5. Wire it into rendering: `MapGrid`'s `tileType: TileType.GOBLIN` /
   `TileType.ORC` assignment (`src/game/level/MapGrid.ts:305` and the
   boss-spawn sites around lines 249/269) is the current bottleneck — it
   only ever picks one of 4 hardcoded `TileType`s regardless of which
   monster actually spawned. Replace that indirection: give `MapEntity` a
   `monsterId` (or the full `MonsterDef`) instead of a fixed `TileType`, and
   have `MapRenderer` call `MonsterSprite.drawMonsterTile(def, palette)`
   directly instead of `tileSet.getTileCanvas(entity.tileType)`
   (`MapRenderer.ts:78`). This is the one real architectural change — worth
   doing carefully since `TileType` may be used elsewhere for collision/FOV
   logic, not just art.

### Phase 2 — Kenney tiles as curated overrides (optional polish, ~half coverage) — ✅ done

The 116 already-mapped Kenney tiles are hand-picked for thematic fit and are
a stylistic notch above anything a generator produces procedurally. Once
Phase 1 gives every monster a baseline sprite:

1. Add an `artOverride?: string` (path under `assets/monsters/`) to
   `MonsterDef`, populated only for the 116 ids that already have a curated
   PNG (cross-reference `tmp/map_exact_manifest.py`'s `MANIFEST_MAPPING`
   against `public/assets/monsters/*.png` to build the final list — some
   entries in that manifest may not have made it to disk, so verify rather
   than trust the script blindly).
2. In `MonsterSprite.drawMonsterTile`, if `artOverride` is set, load and
   2×-upscale the 16×16 PNG onto the 32×32 canvas with
   `imageSmoothingEnabled = false` (nearest-neighbor, keeps hard pixel edges)
   instead of running the procedural path. Image loading is async
   (`new Image()` + `onload`), so cache a placeholder (the procedural sprite)
   until the real one decodes, then swap the cache entry and let the next
   frame pick it up — don't block the render loop on image decode.
3. Extend the same override slot to the 6 `Slimes/` sprites for the ooze
   archetype monsters they visually match (blue/green/red, small/medium).

Do not extend this phase to the 50-Monsters Pokémon-style pack.

### Phase 3 — Surface it beyond the map tile (optional, needs current-UI check)

`Modals.ts` has no bestiary/codex screen and no combat-encounter portrait
today (confirmed: no matches for "bestiary", "combat modal", or per-monster
UI in `src/game/ui/Modals.ts`). If one gets built later, both Phase 1 and
Phase 2 art are already the right shape (32×32 canvas / 16×16 source) to
reuse there, just drawn larger.

## Suggested order

1. Ship Phase 1 for the 5 highest-population archetypes first (covers the
   bulk of encounters), verify in-browser that map tiles read correctly at
   both lit and dark FOV states, then fill in the remaining 10 archetypes.
2. Do the `MapGrid`/`MapRenderer`/`TileSet` wiring change once, not
   per-archetype — it's the risky part (collision/FOV code may depend on the
   existing `TileType` enum values for monsters) and should get its own
   focused review and `npm run build` + browser check before art work
   continues on top of it.
3. Phase 2 (Kenney overrides) and Phase 3 (bestiary UI) are independent
   follow-ups, not blockers for Phase 1 shipping.

## Explicitly out of scope here

- No changes to monster stats, spawn tables, or combat resolution.
- No changes to `TileType` values used for terrain/collision — only the
  monster-entity art path changes.
- The 50-Monsters Pokémon-style pack stays on disk, unused, unless a future
  request specifically wants a whimsical/joke skin.
