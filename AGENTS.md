# AGENTS.md — DuskUltima Maintenance & Master Development Blueprint

This document is the authoritative roadmap and operational rulebook for agents working on **DuskUltima**. It dictates system goals, rules references, design constraints, and a continuous work checklist for full game implementation.

---

## 🎯 Master Objective

Systematically implement the complete mechanics, flavour, quirks, visual aesthetics, and procedural audio for all **6 Cursed Scroll Zones** and core **Shadowdark / SoloDark / Hexcrawl** rules in **DuskUltima**, adhering strictly to **Ultima V retro 2D style** and class/ancestry limits.

---

## 📚 Canonical Rulebooks & Source Files

1. **6 Cursed Scroll Zones**:
   - `docs/extracted/raw/Cursed Scroll 1 - Diablerie V4-3.pdf.json` (Swamp, rot-bramble, demon cults, mutant catfish)
   - `docs/extracted/raw/Cursed Scroll 2 - Red Sands V2-2.pdf.json` (Red desert, heat hazards, ziggurats, sand jackals)
   - `docs/extracted/raw/Cursed Scroll 3 - Midnight Sun V3-5.pdf.json` (Frost, sub-zero cold, dverg forges, rime crabs)
   - `docs/extracted/raw/Cursed Scroll 4 - River of Night V1-4.pdf.json` (Subterranean river, canopy, blood ticks)
   - `docs/extracted/raw/Cursed Scroll 5 - Dwellers in the Deep V1-3.pdf.json` (Sunken cenote, aboleths, pressure)
   - `docs/extracted/raw/Cursed Scroll 6 - City of Masks V1-1.pdf.json` (Urban rooftops, thieves' guild, carousing)

2. **Core Systems & Rules**:
   - `docs/extracted/raw/shadow-dark.pdf.json` (Core rules, monsters, carousing, treasure tables)
   - `docs/extracted/raw/SoloDark_V1_(PDF).pdf.json` (Solo oracle checks, group initiative, chaos mode, prompts)
   - `docs/extracted/raw/Hexcrawl_Guidebook_Desktop.pdf.json` (Overland hexcrawl, weather, travel cadence)
   - `docs/extracted/raw/Player_s_Guide_to_the_Western_Reaches_V1.pdf.json` (Factions, regional lore, rumors)

3. **Strict Class & Ancestry Limits (`docs/raw_source/Classes_and_ancestry.txt`)**:
   - **11 Full Classes**: Fighter, Cleric, MagicUser/Wizard, Thief, Bard, Monk, Necromancer, Paladin, Ranger, Seawolf, Warlock (Patrons: Freya, Molek, Rathgamnon, Saint Ydris, Shune the Vile).
   - **6 Recoverable Classes**: Basilisk Warrior, Ras-Godai, Roustabout, Delver, Duelist, Pit Fighter.
   - **6 Ancestries**: Human, Dwarf (plate armor, no finesse), Elf, Half-Orc, Gnome (use Kobold), Tiefling/Deva (patron boon).

---

## 🎨 Design & Style Directives

1. **Graphics**:
   - Ultima V retro 2D pixel art aesthetic (32x32 tiles, crisp pixel rendering, dark retro borders, gold font highlights).
   - Zone-specific tile skins for each of the 6 biomes (Swamp, Desert, Tundra, Subterranean River, Sunken Trench, Urban City).

2. **Audio**:
   - Web Audio API procedural synthesis (zero external audio files).
   - Math-driven retro SFX (swords, spells, dice rolls, footstep clicks, torch sizzle) and zone-specific ambient hums.

3. **Rules Integrity**:
   - Engine stays pure TypeScript in `src/engine/` & `src/data/`.
   - All dice rolls surface natural numbers and modifiers in the scrollable retro message log.

---

## 📋 Development Checklist & Zone Milestones

### Core Systems & Architecture
- [x] Solo Fighter Start (Thorin).
- [x] Multi-site Adventures (2-4 sites per adventure).
- [x] Dice-rolled room count per site size (Small: 1d4+2, Medium: 2d4+1, Large: 3d4).
- [x] Shadowdark Goal Generator with 50% Party Rescue Goal rule until 4 party members.
- [x] Biome Palette TileSet switching for all 6 Cursed Scroll zones (`TileSet.ts`, `MapRenderer.ts`).
- [x] Shadowdark range bands (close/near/double near/far/out of sight), two-band turn movement, and leader-driven follower auto-support (`rangeBands.ts`, `partyAutomation.ts`).

### Phase 1: Zone 1 — Diablerie (Swamp & Rot-Bramble)
- [x] Basic 5-room dungeon layout generator with torch light FOV.
- [x] Diablerie tile set (mossy bog floors, murky water, rotting vine walls).
- [x] Diablerie monster roster (Mutant Catfish, Rotgrub Swarm, Quillboar Wretch, Weald Hag).
- [x] Environmental hazards (Poisonous gas, deep murky water checks).

### Phase 2: Zone 2 — Red Sands (Desert & Ziggurat)
- [x] Red Sands tile set (red sand dunes, sandstone ruins, crumbling ziggurats).
- [x] Red Sands monster roster (Sand Jackal, Cobra Snake, Velociraptor, Dretch Demon).
- [x] Sunstroke & Heat Exhaustion rules (CON checks under scorching sun).

### Phase 3: Zone 3 — Midnight Sun (Frost & Dverg Forges)
- [x] Midnight Sun tile set (ice floes, glacial walls, dverg smithy forges).
- [x] Midnight Sun monster roster (Rime Crab, Dverg Craftsman, Cockatrice, Snow Ape).
- [x] Sub-Zero Cold rules (CON checks against frostbite, fire/torch warmth).

### Phase 4: Zone 4 — River of Night (Subterranean River & Canopy)
- [x] River of Night tile set (underground river currents, canopy rope bridges, bioluminescent fungi).
- [x] River of Night monster roster (Blood Tick Swarm, Leprechaun, Skrell Raptor, Tar Bat).
- [x] Fast water current swimming mechanics & rope bridge hazards.

### Phase 5: Zone 5 — Dwellers in the Deep (Sunken Cenotes & Trenches)
- [x] Dwellers tile set (flooded stone cenotes, coral pillars, abyssal trenches).
- [x] Dwellers monster roster (Giant Leech, Jellyfish, Aboleth, Swamp Dragon).
- [x] Submerged exploration & holding breath rules.

### Phase 6: Zone 6 — City of Masks (Urban Rooftops & Thieves' Guild)
- [x] City of Masks tile set (rooftop tiles, cobblestone streets, tavern interiors).
- [x] City monster roster (Sewer Rat Swarm, Dire Rat, City Guard, Assassin).
- [x] Carousing downtime system (converting gold to XP & gaining contacts).

### Phase 7: Audio & Visual Polish
- [x] Procedural Web Audio engine for zone ambience & retro combat SFX.
- [x] CRT scanline toggle & Ultima V HUD enhancements.
- [x] Parametric procedural monster sprite renderer & hand-curated Kenney raster tile overrides for all 248 monster definitions (`MonsterSprite.ts`, `MapGrid.ts`, `MapRenderer.ts`).

### Rule Coverage Closure — `docs/extracted/CATEGORIZATION_REVIEW.md`
- [x] SoloDark oracle, prompts, group initiative, chaos-ready rerolls, and natural-20 luck pool (`src/engine/soloDark.ts`).
- [x] Hexcrawl watches, terrain navigation, weather, encounters, pushing, foraging, rations, and night guard (`src/engine/hexcrawl.ts`).
- [x] Shadowdark trap table, hazard catalog, trap discovery/disable/trigger flow, and platformer falling damage (`src/engine/trapsHazards.ts`).
- [x] Six project ancestries and Warlock/Tiefling-Deva patron restrictions (`src/engine/ancestryRules.ts`, `src/engine/patrons.ts`).
- [x] Source-correct encounter distance, activity, and reaction bands (`src/engine/encounterReaction.ts`).
- [x] Shared check resolution for all six zone environmental hazard families (`src/engine/zoneHazards.ts`).
- [x] Gameplay luck rerolls, natural-20 accrual, and light-source durations/campfires (`src/engine/luck.ts`, `src/engine/light.ts`).
- [x] Core mundane gemstone values and the source-correct two-stage luxury-item table (`src/data/tables/treasure.ts`, `src/data/treasureGeneration.ts`).
- [x] Advanced Downtime System (Spiritualism, Skulduggery, Martial Training, Magical Research, Mount Training, DC Step-Down) and Renown Engine (`src/engine/downtime.ts`, `src/engine/renown.ts`).
- [x] Pure-engine regression tests and production/browser boot verification completed after each rule slice.

---

## 🔄 Agent Work Loop Protocol

Whenever an agent takes a turn on this codebase:
1. Read `AGENTS.md` to identify the next unchecked item in the **Development Checklist**.
2. Read the corresponding source json in `docs/extracted/raw/` for exact tables and data.
3. Implement the feature in `src/`.
4. Verify with `npm run build` and browser testing.
5. Update `AGENTS.md` checking off the completed items!
