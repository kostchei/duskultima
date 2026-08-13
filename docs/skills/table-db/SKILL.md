---
name: duskultima-table-db
description: Query the source-manifest-backed Shadowdark Core, Western Reaches, and SDtools database through TypeScript, SQLite, or MCP.
---

# DuskUltima Table Database

The database is rebuilt by `scripts/populate_sql_db.py`, which delegates to the relative-path source-driven builder in `scripts/populate_master_db.py`.

Sources:

- `docs/extracted/raw/shadow-dark.pdf.json`
- `docs/extracted/raw/Player_s_Guide_to_the_Western_Reaches_V1.pdf.json`
- `docs/raw_source/SDtools_extracted/data/*.json`
- `docs/raw_source/Classes_and_ancestry.txt`

`src/data/db/source_manifest.json` is the audit manifest. Each entry records the document, extracted and printed pages, heading, die expression, expected row count, schema shape, and adapter. The database also stores this data in `source_manifest` and preserves unflattened content in `structured_rows`.

## Current generated counts

Counts are generated, not hand-maintained. Read `src/data/db/tables_manifest.json` or query SQLite for the current values. The generated bundle includes `rules_catalog`, `structured_rows`, `project_classes`, `project_ancestries`, and `source_manifest` in addition to the roll tables, names, backgrounds, trinkets, items, monsters, and spells.

## Classes and ancestries

The project constraint file is authoritative. The database exposes 11 full classes and 6 recoverable classes in `project_classes`. The project-facing ancestries are Human, Dwarf, Elf, Half-Orc, Gnome, and Tiefling/Deva.

The source book contains eight name/trinket ancestries. The intentional project mappings are documented in `CLASSES_AND_ANCESTRIES.md`: Gnome uses the Kobold source name table; Tiefling/Deva uses Human names and receives its distinction through patron-boon rules. Goblin, Half-Elf, Halfling, and Kobold remain available as source-table queries.

## TypeScript API

```ts
import {
  generateAncestryName, getBackground, getTrinket, rollOnTable,
  getRules, getEquipment, getProjectClasses, getProjectAncestries,
  getSourceManifest
} from './src/engine/tableService';

generateAncestryName('Gnome');
getBackground(100); // 00 is normalized to roll 100 (Lost)
getTrinket('Kobold', 100);
rollOnTable('Core Rumors (Shadowdark Core)', 100);
getRules({ category: 'Core Mechanics' });
getEquipment({ category: 'Boat' });
getProjectClasses('recoverable');
getProjectAncestries();
getSourceManifest();
```

`getTalents()` selects the source page associated with the requested class and preserves 2d6/d10 roll labels. `getTreasure()` preserves 00/100 boundaries; callers should use the table name when a source contains multiple treasure tiers.

## SQLite

```sql
SELECT heading, die_expression, expected_rows, schema_shape
FROM source_manifest
WHERE document LIKE '%shadow-dark%';

SELECT * FROM rules_catalog
WHERE rule_text LIKE '%light%';

SELECT name, category, range, damage, ac, speed, hp, gear_slots, properties
FROM items
WHERE category IN ('Weapon', 'Armor', 'Boat');
```

## MCP tools

Run `python scripts/mcp_table_server.py` as a stdio JSON-RPC server. Tools include `list_tables`, `roll_table`, `generate_name`, `get_background`, `get_trinket`, `get_item`, `get_equipment`, `get_talent`, `get_treasure`, `search_database`, `get_rule`, and read-only `query_sql`.

The MCP server resolves `shadowdork.db` relative to its own script, so it can be launched from any working directory.

## Verification

```powershell
python scripts/populate_sql_db.py
python scripts/test_table_database.py
npx vitest run
npm run build
```
