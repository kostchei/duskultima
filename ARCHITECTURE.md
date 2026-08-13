# Shadowdork Architecture & System Blueprint

`shadowdork-core` is built with a strict separation between game rules (the **Rules Engine**) and visual presentation (the **Phaser 3 Game Layer**).

---

## High-Level System Architecture

```
                      +-----------------------------+
                      |     Phaser 3 Game Layer     |
                      |        (src/game/)          |
                      +--------------+--------------+
                                     |
                                     | calls methods / listens to events
                                     v
                      +-----------------------------+
                      |     Pure Rules Engine       |
                      |        (src/engine/)        |
                      +--------------+--------------+
                                     |
                                     | consumes static data
                                     v
                      +-----------------------------+
                      |      Rules-as-Data          |
                      |         (src/data/)         |
                      +-----------------------------+
```

---

## Layer Responsibilities

### 1. Pure Rules Engine (`src/engine/`)
- **Framework-Agnostic**: Written in pure TypeScript with **zero** Phaser or DOM imports.
- **Single Source of Truth**: Owns all rules state, dice rolling (`Dice`), character statistics (`Character`), inventory capacity (`Inventory`), time progression (`GameClock`), spell casting resolution (`spells.ts`), and combat checks (`check.ts`).
- **Deterministic**: Seeded Mulberry32 random number generator for testable, reproducible runs.
- **Fail-Fast**: Throws explicit runtime errors on invalid state transitions rather than quietly failing.

### 2. Rules-as-Data (`src/data/`)
- Declarative definitions for items, spells, class tables, monster stat blocks, and talent progression.
- Structured data records (`Effect`, `ItemDef`, `SpellDef`, `MonsterDef`) consumed by the engine.

### 3. Phaser Presentation & Game Layer (`src/game/`)
- **Rendering & Physics**: Manages Phaser 3 Arcade physics, sprites, tilemaps, animations, camera framing, and particle visual effects.
- **Input & Control**: Translates keyboard (`A`/`D`/`Space`/`J`/`E`/`Tab`) and touch gestures into engine calls.
- **Modular Systems**:
  - `PartyManager`: Party formation, follower movement AI, leader switching.
  - `CombatManager`: Hitbox detection, attack animations, floating d20 dice text, damage dispatch.
  - `LightingManager`: Real-time torch countdown rendering and field-of-view darkness shaders.
  - `TrapManager`: Stateful 2D traps (spikes, crushers, boulders, lifts).
  - `LevelManager`: Procedural 5-room dungeon grid assembly.
- **UI Components** (`src/game/ui/`):
  - `InventoryPanel`: Slot-based inventory drawer and gear equipping.
  - `CharacterSheetPanel`: Character stats, class talents, and active spellbook.

---

## Primary Rules Engine Mechanics

1. **d20 Resolution Core**: `d20 + stat mod vs DC/AC`. Positional advantage/disadvantage cancels out to standard roll.
2. **Real-Time Light**: Torches burn on the engine clock. Darkness imposes disadvantage on players and advantage on monsters.
3. **Party of 4**: Solo start as Fighter; rescue Thief, Priest, and Wizard throughout dungeons. Instant swap leader.
4. **Gold-as-XP**: Experience gained exclusively by collecting and banking treasure.
5. **Spellcasting Checks**: No spell slots; casts require spell checks. Natural 1 triggers mishaps or atonement lock.
