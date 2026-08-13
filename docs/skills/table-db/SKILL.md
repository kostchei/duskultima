---
name: duskultima-table-db
description: Access, query, roll on, and search all Shadowdark Core, Western Reaches, and SDtools tables, ancestries, backgrounds, trinkets, equipment, class talents, treasure, magic items, monsters, spells, and regional content.
---

# DuskUltima Table Database & Query System

The **DuskUltima Table Database** consolidates all rules, roll tables, monsters, spells, 2-part compound ancestry names, d100 trinkets, backgrounds, equipment, class talents, treasure tables, magic item generators, and regional lore from:
1. **Player's Guide to the Western Reaches** (`Player_s_Guide_to_the_Western_Reaches_V1.pdf.json`)
2. **Shadowdark Core Rulebook** (`shadow-dark.pdf.json`)
3. **Shadowdark Tools Datasets** (`SDtools_extracted`, including `shadowdark_master_dataset.json`)

All data is compiled into an SQLite database (`shadowdork.db`) and a master JSON bundle (`src/data/db/master_tables.json`), making tables available via **TypeScript APIs**, **Python SQLite queries**, **MCP (Model Context Protocol) Tools**, and this **SKILL.md**.

---

## 📊 Resolved Database Metrics & Schema

All 9 audit gaps have been resolved:
- **`shadowdark_master_dataset.json`**: Ingested (Quest generator: 109, Hazards/Traps: 39, Magic item generators: ~250, NPCs: 16, Spell tiers: 108).
- **`items` Table**: Ingested basic gear, weapons, armor, poisons, mounts, boats, and siege weapons (40 core entries).
- **Backgrounds**: 96 backgrounds (20 Shadowdark Core + 76 Western Reaches regional).
- **Trinkets**: 416 page-bounded trinket entries (exactly 52 range entries per ancestry across all 8 ancestries: Dwarf p. 19, Elf p. 21, Goblin p. 23, Half-Elf p. 25, Half-Orc p. 27, Halfling p. 29, Human p. 31, Kobold p. 33).
- **Class Talents**: Core (Fighter, Priest, Thief, Wizard) and Western Reaches class talent tables.
- **Treasure & Magic Items**: 0–10+ Level Treasure tables (d100), core magic items (pages 140–160), potions, scrolls, wands, rings.
- **Western Reaches Regional Content**: Secrets (d100 p. 78), Titles (p. 82), Hexcrawl & Weather (p. 226–232), Downtime & Bastions (p. 236–250).

### Primary Database Tables (`shadowdork.db`)

| Table Name | Count | Key Columns |
| :--- | :--- | :--- |
| `tables_meta` | 292 | `name`, `die_type`, `category`, `source` |
| `roll_tables` | 4,624 | `table_name`, `roll_min`, `roll_max`, `result_text`, `source` |
| `ancestry_names` | 240 | `ancestry`, `type` ('part1', 'part2', 'standalone'), `name_part` |
| `backgrounds` | 96 | `roll_val`, `name`, `description`, `source` |
| `trinkets` | 416 | `ancestry`, `roll_min`, `roll_max`, `result_text`, `source` |
| `items` | 40 | `name`, `cost`, `slot_cost`, `category`, `properties`, `source`, `page` |
| `monsters` | 243 | `name`, `ac`, `hp`, `attack`, `mv`, `tier`, `biome` |
| `spells` | 114 | `name`, `class_name`, `tier`, `range`, `duration`, `description` |
| `rules_catalog` | 328 | `topic`, `category`, `rule_text`, `source`, `page` |

---

## 🛠️ TypeScript Engine API (`src/engine/tableService.ts`)

```typescript
import {
  listTables,
  rollOnTable,
  generateAncestryName,
  getBackground,
  getTrinket,
  getItems,
  getItemByName,
  getTalents,
  getTreasure,
  getMonster,
  getSpell,
  searchDatabase
} from './src/engine/tableService';

// 1. Generate an ancestry name
const dwarfName = generateAncestryName('Dwarf'); // { name: "Dendor", ancestry: "Dwarf", method: "2-part compound generator" }

// 2. Fetch background (from 96 available backgrounds)
const bg = getBackground(); // { roll_val: 1, name: "Urchin", description: "..." }

// 3. Roll page-bounded ancestry trinket
const trinket = getTrinket('Elf', 15); // { ancestry: "Elf", roll: 15, result_text: "Bottle of blue ink" }

// 4. Query equipment & weapons
const dagger = getItemByName('Dagger'); // { name: "Dagger", cost: "5 sp", slot_cost: 1, category: "Weapon", ... }

// 5. Query class talents
const fighterTalent = getTalents('Fighter', 7); // { roll: 7, talent: "+1 to melee or ranged attacks" }

// 6. Roll level treasure
const treasure = getTreasure(1, 50);

// 7. Universal keyword search
const results = searchDatabase('sword');
```

---

## 🤖 MCP (Model Context Protocol) Tools (`scripts/mcp_table_server.py`)

AI agents can interact with the table database via JSON-RPC stdio:

1. **`list_tables`**: List all tables filtered by `category` or `source`.
2. **`roll_table`**: Roll on any table by name or lookup specific roll value.
3. **`generate_name`**: Generate character name for ancestry (Dwarf, Elf, Goblin, Half-Elf, Half-Orc, Halfling, Human, Kobold).
4. **`get_background`**: Roll/fetch character background.
5. **`get_trinket`**: Roll/fetch ancestry trinket.
6. **`get_item`**: Query weapons, armor, gear, poisons, and mounts.
7. **`get_talent`**: Roll/lookup class talent.
8. **`get_treasure`**: Roll level treasure tables.
9. **`search_database`**: Search items, monsters, spells, trinkets, backgrounds, and roll tables.
10. **`query_sql`**: Safe read-only SQL query against `shadowdork.db`.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_item",
    "arguments": { "name": "Dagger" }
  }
}
```
