# Walkthrough - Shadowdark & Western Reaches Master Table Database, API, MCP Server & Skill

We have built a master table database system for **DuskUltima**, ingesting all tables from **SDtools**, **Shadowdark Core PDF**, and **Player's Guide to the Western Reaches**.

## Changes Made

### 1. Database Ingestion Pipeline & SQLite Master Database
- **`scripts/schema.sql`**: Updated schema with indexed tables for `tables_meta`, `roll_tables`, `ancestry_names`, `backgrounds`, `trinkets`, `monsters`, `spells`, `items`, `rules_catalog`.
- **`scripts/populate_sql_db.py`**: Automated ingestion pipeline extracting:
  - **294 Roll Tables Cataloged**
  - **5,094 Roll Table Entries**
  - **280 Ancestry 2-part and Standalone Name Parts** (Dwarf, Elf, Goblin, Half-Elf, Half-Orc, Halfling, Human, Kobold)
  - **876 Ancestry Starting Trinkets**
  - **42 Backgrounds**
  - **243 Monsters**
  - **114 Spells**
- **`src/data/db/master_tables.json`**: Compiled JSON master bundle for TypeScript and web browser access without native SQLite dependencies.

### 2. Engine & API Integration
- **`src/data/tableDatabase.ts`**: TypeScript interfaces and exported `masterTables` dataset.
- **`src/engine/tableService.ts`**: Comprehensive query and roll service exposing:
  - `listTables(category?, source?)`
  - `getTableEntries(tableName)`
  - `rollOnTable(tableName, fixedRoll?)`
  - `generateAncestryName(ancestry)`
  - `getBackground(fixedRoll?)`
  - `getTrinket(ancestry, fixedRoll?)`
  - `getMonster(query)`
  - `getSpell(query)`
  - `searchDatabase(query)`
- **`src/engine/tableService.test.ts`**: Vitest test suite covering table lookups, name generation, backgrounds, trinkets, spell queries, and universal search.

### 3. Model Context Protocol (MCP) Server
- **`scripts/mcp_table_server.py`**: Stdio JSON-RPC MCP server exposing standard tools:
  - `list_tables`
  - `roll_table`
  - `generate_name`
  - `get_background`
  - `get_trinket`
  - `search_database`
  - `query_sql`

### 4. Skill & Operational Documentation
- **`docs/skills/table-db/SKILL.md`**: Complete skill reference detailing schema definitions, TypeScript API calls, Python/SQLite usage, and MCP tool interactions.

---

## Verification Results

### Automated Tests
1. **Database Population**:
   ```bash
   python scripts/populate_sql_db.py
   ```
   *Result*: Successfully populated `shadowdork.db` (294 tables, 5,094 roll entries, 280 name parts, 876 trinkets, 42 backgrounds, 243 monsters, 114 spells).

2. **TypeScript Engine & Test Suite**:
   ```bash
   npx vitest run
   ```
   *Result*: Passed all 15 test files and 45 tests cleanly.

3. **MCP Server Verification**:
   ```bash
   python -c "import subprocess, json; ..."
   ```
   *Result*: Tested `tools/list` and `tools/call` for `generate_name` (e.g. generated Dwarf name `"Dendak"` via 2-part compound generator).

4. **Production Build**:
   ```bash
   npm run build
   ```
   *Result*: Build completed successfully with 0 errors.
