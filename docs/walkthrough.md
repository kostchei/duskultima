# Table database implementation walkthrough

The database is now built from a source manifest rather than page-specific ad hoc extraction.

## Implementation

- `scripts/populate_master_db.py` resolves all paths from the repository root.
- `scripts/populate_sql_db.py` remains the compatibility entry point.
- `scripts/schema.sql` contains normalized roll labels, structured equipment fields, source-manifest records, structured source rows, rules, and project class/ancestry constraints.
- `src/data/db/source_manifest.json` records every named source table plus auto-discovered table-like pages for follow-up review.
- PDF table adapters preserve ranges such as `85-86` and `00`, die expressions, printed/extracted page identity, and structured row payloads.
- Western Reaches equipment is parsed into weapons, armor, basic gear, mounts, boats, and siege weapons.
- Rules are exported into the browser bundle and exposed through TypeScript and MCP.
- SDtools duplicate bundle data is not ingested twice; individual JSON datasets are authoritative, while the master dataset supplies only its additional table sections.

## Class and ancestry constraint

`docs/raw_source/Classes_and_ancestry.txt` is authoritative for project shape. See `docs/skills/table-db/CLASSES_AND_ANCESTRIES.md` for the deliberate source-to-project aliases and why the extra source ancestries remain queryable without being promoted to project ancestries.

## Verification

The verification sequence is:

```powershell
python scripts/populate_sql_db.py
python scripts/test_table_database.py
npx vitest run
npm run build
```

The Python completeness suite compares SQLite and JSON counts, validates the source-manifest shape, checks all trinket/background boundary rolls, verifies project classes/ancestries, and checks structured equipment categories. Vitest covers the TypeScript API and the class/ancestry alias behavior.

The source manifest intentionally records auto-discovered pages whose layout is not yet safely column-parsed. Those rows are preserved as `structured_rows` and marked for adapter promotion instead of being silently discarded.
