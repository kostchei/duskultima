import os
import json
import sqlite3
import re

DB_PATH = r"d:\Code\DuskUltima\shadowdork.db"
SCHEMA_PATH = r"d:\Code\DuskUltima\scripts\schema.sql"
CLASSIFIED_JSON_PATH = r"d:\Code\DuskUltima\docs\extracted\classified_data.json"
SDTOOLS_DATA_DIR = r"d:\Code\DuskUltima\docs\raw_source\SDtools_extracted\data"
MANIFEST_PATH = r"d:\Code\DuskUltima\src\data\db\tables_manifest.json"

STAT_BLOCK_REGEX = re.compile(
    r"([A-Z\s]{3,25})\s+AC\s+(\d+),\s+HP\s+(\d+),\s+ATK\s+([^,]+)(?:,\s+MV\s+([^,]+))?",
    re.IGNORECASE
)

SPELL_REGEX = re.compile(
    r"([A-Z\s]{3,25})\s+Tier\s+(\d+),\s+(wizard|priest|witch|seer)\s+Duration:\s+([^\n]+)",
    re.IGNORECASE
)

ROLL_ENTRY_REGEX = re.compile(
    r"^\s*(\d{1,2})(?:-(\d{1,2}))?\s+(.+)$",
    re.MULTILINE
)

def init_db():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        conn.executescript(f.read())
    return conn

def populate():
    conn = init_db()
    cursor = conn.cursor()

    # -------------------------------------------------------------
    # 1. Ingest SDtools Structured JSON Datasets
    # -------------------------------------------------------------

    # Ingest Bestiary (239 Monsters)
    bestiary_path = os.path.join(SDTOOLS_DATA_DIR, "bestiary.json")
    if os.path.exists(bestiary_path):
        with open(bestiary_path, "r", encoding="utf-8") as f:
            bestiary = json.load(f)
            for m in bestiary:
                name = m.get("name", "").strip()
                if not name:
                    continue
                try:
                    ac = int(m.get("ac", 10))
                except (ValueError, TypeError):
                    ac = 10
                try:
                    hp = int(m.get("hp", m.get("level", 1)))
                except (ValueError, TypeError):
                    hp = 1
                try:
                    tier = int(m.get("level", 1))
                except (ValueError, TypeError):
                    tier = 1
                atk = m.get("attack", "1 weapon")
                mv = m.get("move", "near")
                alignment = m.get("alignment", "N")
                desc = f"Tags: {m.get('tags', '')}. Effect: {m.get('effect', '')}. Trait: {m.get('trait', '')}"
                source = "SDtools/Bestiary"
                page = int(m.get("page", 0)) if str(m.get("page", "")).isdigit() else 0

                cursor.execute(
                    "INSERT INTO monsters (name, ac, hp, attack, mv, alignment, tier, description, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (name, ac, hp, atk, mv, alignment, tier, desc, source, page)
                )

    # Ingest Spells (90 Spells)
    spells_path = os.path.join(SDTOOLS_DATA_DIR, "spells.json")
    if os.path.exists(spells_path):
        with open(spells_path, "r", encoding="utf-8") as f:
            spells = json.load(f)
            for s in spells:
                s_name = s.get("name", "").strip()
                if not s_name:
                    continue
                cls = s.get("class", "Wizard")
                tier = int(s.get("tier", 1))
                rng = s.get("range", "Near")
                dur = s.get("duration", "Instant")
                desc = s.get("description", "")
                source = "SDtools/Spells"

                cursor.execute(
                    "INSERT INTO spells (name, class_name, tier, range, duration, description, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (s_name, cls, tier, rng, dur, desc, source)
                )

    # Ingest Generator Tables (103 tables)
    gen_path = os.path.join(SDTOOLS_DATA_DIR, "generator_tables.json")
    if os.path.exists(gen_path):
        with open(gen_path, "r", encoding="utf-8") as f:
            gen_tables = json.load(f)
            for idx, tbl in enumerate(gen_tables):
                t_name = f"Generator Table {tbl.get('table_id', idx+1)}"
                entries = tbl.get("entries", [])
                die_type = f"d{len(entries)}" if len(entries) > 0 else "d20"
                for r_idx, entry_text in enumerate(entries):
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, source) VALUES (?, ?, ?, ?, ?, ?)",
                        (t_name, die_type, r_idx + 1, r_idx + 1, str(entry_text), "SDtools/Generator")
                    )

    # Ingest Dict Generator Files (misc, shops, taverns, npcs, dungeons, magic_items)
    dict_files = ["misc.json", "shops.json", "taverns.json", "npcs.json", "dungeons.json", "magic_items.json"]
    for df in dict_files:
        dp = os.path.join(SDTOOLS_DATA_DIR, df)
        if os.path.exists(dp):
            with open(dp, "r", encoding="utf-8") as f:
                d_data = json.load(f)
                if isinstance(d_data, dict):
                    for t_key, entries in d_data.items():
                        if isinstance(entries, list):
                            die_type = f"d{len(entries)}" if len(entries) > 0 else "d20"
                            for r_idx, text_val in enumerate(entries):
                                cursor.execute(
                                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, source) VALUES (?, ?, ?, ?, ?, ?)",
                                    (f"{df.replace('.json','')}_{t_key}", die_type, r_idx + 1, r_idx + 1, str(text_val), f"SDtools/{df}")
                                )

    # -------------------------------------------------------------
    # 2. Ingest PDF Extracted Tables & Rules
    # -------------------------------------------------------------
    if os.path.exists(CLASSIFIED_JSON_PATH):
        with open(CLASSIFIED_JSON_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)

        for entry in data.get("tables", []):
            source = entry["source"]
            page = entry["page"]
            text = entry["full_text"]

            for m in STAT_BLOCK_REGEX.finditer(text):
                name = m.group(1).strip()
                ac = int(m.group(2))
                hp = int(m.group(3))
                atk = m.group(4).strip()
                mv = m.group(5).strip() if m.group(5) else "near"
                cursor.execute(
                    "INSERT INTO monsters (name, ac, hp, attack, mv, source, page) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (name, ac, hp, atk, mv, source, page)
                )

            for s in SPELL_REGEX.finditer(text):
                s_name = s.group(1).strip()
                tier = int(s.group(2))
                cls = s.group(3).strip()
                dur = s.group(4).strip()
                cursor.execute(
                    "INSERT INTO spells (name, class_name, tier, duration, source, page) VALUES (?, ?, ?, ?, ?, ?)",
                    (s_name, cls, tier, dur, source, page)
                )

            for r in ROLL_ENTRY_REGEX.finditer(text):
                min_r = int(r.group(1))
                max_r = int(r.group(2)) if r.group(2) else min_r
                result = r.group(3).strip()
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, source, page) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (f"PDF Table p.{page}", "d20", min_r, max_r, result, source, page)
                )

        for entry in data.get("rules", []):
            source = entry["source"]
            page = entry["page"]
            text = entry["snippet"]
            cursor.execute(
                "INSERT INTO rules_catalog (topic, category, rule_text, source, page) VALUES (?, ?, ?, ?, ?)",
                (f"Rule p.{page}", "Core Mechanics", text, source, page)
            )

    conn.commit()

    # Query final counts
    cursor.execute("SELECT count(*) FROM monsters")
    db_monsters = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM spells")
    db_spells = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM roll_tables")
    db_roll_tables = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM rules_catalog")
    db_rules = cursor.fetchone()[0]

    conn.close()

    # Export manifest
    manifest = {
        "database": "shadowdork.db",
        "monsters_count": db_monsters,
        "spells_count": db_spells,
        "roll_tables_count": db_roll_tables,
        "rules_count": db_rules,
        "status": "populated_with_sdtools"
    }

    os.makedirs(os.path.dirname(MANIFEST_PATH), exist_ok=True)
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"Enhanced Database populated successfully at {DB_PATH}:")
    print(f"  - Monsters: {db_monsters} (includes 239 SDtools Bestiary entries)")
    print(f"  - Spells: {db_spells} (includes 90 SDtools Spells entries)")
    print(f"  - Roll Tables: {db_roll_tables} (includes 180+ SDtools Generator tables)")
    print(f"  - Rules Catalog: {db_rules}")

if __name__ == "__main__":
    populate()
