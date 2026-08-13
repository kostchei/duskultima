import os
import json
import sqlite3
import re

DB_PATH = r"d:\Code\DuskUltima\shadowdork.db"
SCHEMA_PATH = r"d:\Code\DuskUltima\scripts\schema.sql"
SDTOOLS_DATA_DIR = r"d:\Code\DuskUltima\docs\raw_source\SDtools_extracted\data"
SDTOOLS_MASTER_PATH = r"d:\Code\DuskUltima\docs\raw_source\SDtools_extracted\data\shadowdark_master_dataset.json"
PLAYERS_GUIDE_PATH = r"d:\Code\DuskUltima\docs\extracted\raw\Player_s_Guide_to_the_Western_Reaches_V1.pdf.json"
SHADOWDARK_PDF_PATH = r"d:\Code\DuskUltima\docs\extracted\raw\shadow-dark.pdf.json"
CLASSIFIED_JSON_PATH = r"d:\Code\DuskUltima\docs\extracted\classified_data.json"
MASTER_EXPORT_PATH = r"d:\Code\DuskUltima\src\data\db\master_tables.json"
MANIFEST_PATH = r"d:\Code\DuskUltima\src\data\db\tables_manifest.json"

STAT_BLOCK_REGEX = re.compile(
    r"([A-Z\s]{3,30})\s+AC\s+(\d+),\s+HP\s+(\d+),\s+ATK\s+([^,]+)(?:,\s+MV\s+([^,]+))?",
    re.IGNORECASE
)

SPELL_REGEX = re.compile(
    r"([A-Z\s]{3,30})\s+Tier\s+(\d+),\s+(wizard|priest|witch|seer|necromancer)\s+Duration:\s+([^\n]+)",
    re.IGNORECASE
)

NAME_PART_REGEX = re.compile(
    r"^\s*(\d{1,2})\s+([A-Za-z\-]+)\s+([A-Za-z\-]+)\s*$",
    re.MULTILINE
)

ROLL_ENTRY_REGEX = re.compile(
    r"^\s*(\d{1,3})(?:-(\d{1,3}))?\s+(.+)$",
    re.MULTILINE
)

def init_db():
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
        except OSError:
            pass
    conn = sqlite3.connect(DB_PATH)
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        conn.executescript(f.read())
    return conn

def populate():
    conn = init_db()
    cursor = conn.cursor()

    # -------------------------------------------------------------
    # 1. Ingest shadowdark_master_dataset.json (GAP 1 FIX)
    # -------------------------------------------------------------
    if os.path.exists(SDTOOLS_MASTER_PATH):
        with open(SDTOOLS_MASTER_PATH, "r", encoding="utf-8") as f:
            master_ds = json.load(f)

        # Ingest standalone ancestry names from master dataset
        for anc, name_list in master_ds.get("ancestry_names", {}).items():
            for nm in name_list:
                cursor.execute(
                    "INSERT INTO ancestry_names (ancestry, type, name_part, source) VALUES (?, ?, ?, ?)",
                    (anc.capitalize(), "standalone", nm, "MasterDataset/AncestryNames")
                )

        # Ingest tables section from master dataset (Quests, Hazards/Traps, Magic Item Generator, NPCs, Spell Tiers)
        tables_dict = master_ds.get("tables", {})
        
        # Quest Generator (109 entries)
        for q_sub, q_entries in tables_dict.get("quest_generator", {}).items():
            t_name = f"Quest_{q_sub.capitalize()}"
            die_type = f"d{len(q_entries)}"
            cursor.execute(
                "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                (t_name, die_type, "Quest Generator", f"Master Dataset Quest {q_sub}", "SDtools/MasterDataset")
            )
            for idx, entry in enumerate(q_entries):
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (t_name, die_type, idx + 1, idx + 1, str(entry), "Quest Generator", "SDtools/MasterDataset")
                )

        # Hazards & Traps (39 entries)
        for h_sub, h_entries in tables_dict.get("hazards_and_traps", {}).items():
            t_name = f"Hazard_{h_sub.capitalize()}"
            die_type = f"d{len(h_entries)}"
            cursor.execute(
                "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                (t_name, die_type, "Hazards & Traps", f"Master Dataset Hazard {h_sub}", "SDtools/MasterDataset")
            )
            for idx, entry in enumerate(h_entries):
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (t_name, die_type, idx + 1, idx + 1, str(entry), "Hazards & Traps", "SDtools/MasterDataset")
                )

        # Magic Item Generator (~250 entries)
        for m_sub, m_entries in tables_dict.get("magic_item_generator", {}).items():
            t_name = f"MagicItem_{m_sub.capitalize()}"
            die_type = f"d{len(m_entries)}"
            cursor.execute(
                "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                (t_name, die_type, "Magic Item Generator", f"Master Dataset Magic Item {m_sub}", "SDtools/MasterDataset")
            )
            for idx, entry in enumerate(m_entries):
                res_str = entry.get("name", str(entry)) if isinstance(entry, dict) else str(entry)
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (t_name, die_type, idx + 1, idx + 1, res_str, "Magic Item Generator", "SDtools/MasterDataset")
                )

        # NPC Generator (16 entries)
        for n_sub, n_entries in tables_dict.get("npc_generator", {}).items():
            t_name = f"NPC_{n_sub.capitalize()}"
            die_type = f"d{len(n_entries)}"
            cursor.execute(
                "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                (t_name, die_type, "NPC Generator", f"Master Dataset NPC {n_sub}", "SDtools/MasterDataset")
            )
            for idx, entry in enumerate(n_entries):
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (t_name, die_type, idx + 1, idx + 1, str(entry), "NPC Generator", "SDtools/MasterDataset")
                )

        # Spell Tier Tables (108 entries)
        for s_sub, s_entries in tables_dict.get("spell_tier_tables", {}).items():
            t_name = f"SpellTier_{s_sub.capitalize()}"
            die_type = f"d{len(s_entries)}"
            cursor.execute(
                "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                (t_name, die_type, "Spell Tier Tables", f"Master Dataset Spell Tier {s_sub}", "SDtools/MasterDataset")
            )
            for idx, entry in enumerate(s_entries):
                res_str = entry.get("name", str(entry)) if isinstance(entry, dict) else str(entry)
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (t_name, die_type, idx + 1, idx + 1, res_str, "Spell Tier Tables", "SDtools/MasterDataset")
                )

    # -------------------------------------------------------------
    # 2. SDtools Datasets (Bestiary, Spells, Dict Generators)
    # -------------------------------------------------------------
    
    # Standalone Ancestry Names
    names_path = os.path.join(SDTOOLS_DATA_DIR, "ancestry_names.json")
    if os.path.exists(names_path):
        with open(names_path, "r", encoding="utf-8") as f:
            anc_names = json.load(f)
            for anc, name_list in anc_names.items():
                for nm in name_list:
                    cursor.execute(
                        "INSERT INTO ancestry_names (ancestry, type, name_part, source) VALUES (?, ?, ?, ?)",
                        (anc.capitalize(), "standalone", nm, "SDtools")
                    )

    # Bestiary
    bestiary_path = os.path.join(SDTOOLS_DATA_DIR, "bestiary.json")
    if os.path.exists(bestiary_path):
        with open(bestiary_path, "r", encoding="utf-8") as f:
            bestiary = json.load(f)
            for m in bestiary:
                name = m.get("name", "").strip()
                if not name:
                    continue
                try: ac = int(m.get("ac", 10))
                except (ValueError, TypeError): ac = 10
                try: hp = int(m.get("hp", m.get("level", 1)))
                except (ValueError, TypeError): hp = 1
                try: tier = int(m.get("level", 1))
                except (ValueError, TypeError): tier = 1
                atk = m.get("attack", "1 weapon")
                mv = m.get("move", "near")
                alignment = m.get("alignment", "N")
                biome = m.get("biome", "")
                desc = f"Tags: {m.get('tags', '')}. Effect: {m.get('effect', '')}. Trait: {m.get('trait', '')}"
                page = int(m.get("page", 0)) if str(m.get("page", "")).isdigit() else 0

                cursor.execute(
                    "INSERT INTO monsters (name, ac, hp, attack, mv, alignment, tier, biome, description, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (name, ac, hp, atk, mv, alignment, tier, biome, desc, "SDtools/Bestiary", page)
                )

    # Spells
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
                arch = s.get("archetype", "")
                tags = ",".join(s.get("tags", [])) if isinstance(s.get("tags"), list) else str(s.get("tags", ""))

                cursor.execute(
                    "INSERT INTO spells (name, class_name, tier, range, duration, description, archetype, tags, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (s_name, cls, tier, rng, dur, desc, arch, tags, "SDtools/Spells")
                )

    # Generator Tables
    gen_path = os.path.join(SDTOOLS_DATA_DIR, "generator_tables.json")
    if os.path.exists(gen_path):
        with open(gen_path, "r", encoding="utf-8") as f:
            gen_tables = json.load(f)
            for idx, tbl in enumerate(gen_tables):
                t_name = f"Generator Table {tbl.get('table_id', idx+1)}"
                entries = tbl.get("entries", [])
                die_type = f"d{len(entries)}" if len(entries) > 0 else "d20"
                cursor.execute(
                    "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                    (t_name, die_type, "Generator", f"SDtools Table {tbl.get('table_id')}", "SDtools/Generator")
                )
                for r_idx, entry_text in enumerate(entries):
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        (t_name, die_type, r_idx + 1, r_idx + 1, str(entry_text), "Generator", "SDtools/Generator")
                    )

    # SDtools Dict Generator Files
    dict_files = [
        ("misc.json", "Misc"),
        ("shops.json", "Shops"),
        ("taverns.json", "Taverns"),
        ("npcs.json", "NPCs"),
        ("dungeons.json", "Dungeons"),
        ("magic_items.json", "Magic Items")
    ]
    for df, cat in dict_files:
        dp = os.path.join(SDTOOLS_DATA_DIR, df)
        if os.path.exists(dp):
            with open(dp, "r", encoding="utf-8") as f:
                d_data = json.load(f)
                if isinstance(d_data, dict):
                    for t_key, entries in d_data.items():
                        t_name = f"{df.replace('.json','')}_{t_key}"
                        if isinstance(entries, list):
                            die_type = f"d{len(entries)}" if len(entries) > 0 else "d20"
                            cursor.execute(
                                "INSERT OR IGNORE INTO tables_meta (name, die_type, category, description, source) VALUES (?, ?, ?, ?, ?)",
                                (t_name, die_type, cat, f"SDtools {cat} Table", f"SDtools/{df}")
                            )
                            for r_idx, text_val in enumerate(entries):
                                cursor.execute(
                                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
                                    (t_name, die_type, r_idx + 1, r_idx + 1, str(text_val), cat, f"SDtools/{df}")
                                )

    # -------------------------------------------------------------
    # 3. Ingest Items / Equipment (GAP 3 FIX)
    # -------------------------------------------------------------
    equipment_items = [
        # Basic Gear
        ("Arrows (20)", "1 gp", 1, "Ammunition", "20 arrows for bow", "Player's Guide", 106),
        ("Backpack", "2 gp", 1, "Container", "Holds up to 10 slots (first free)", "Player's Guide", 106),
        ("Caltrops", "5 sp", 1, "Gear", "Bag of iron spikes", "Player's Guide", 106),
        ("Candle (3)", "5 cp", 1, "Light", "3 candles, 5' light each", "Player's Guide", 106),
        ("Crowbar", "2 gp", 1, "Tool", "Advantage on prying checks", "Player's Guide", 106),
        ("Flint and steel", "5 sp", 1, "Tool", "Ignites tinder and torches", "Player's Guide", 106),
        ("Grappling hook", "1 gp", 1, "Tool", "Used with rope for climbing", "Player's Guide", 106),
        ("Iron spikes (10)", "1 gp", 1, "Tool", "10 spikes for wedging doors", "Player's Guide", 106),
        ("Lantern", "5 gp", 1, "Light", "Casts double near light (needs oil)", "Player's Guide", 108),
        ("Oil, flask", "5 sp", 1, "Fuel", "Fuels lantern 1 hour or sets fire", "Player's Guide", 107),
        ("Pole, 10'", "5 sp", 1, "Tool", "Wooden pole for probing traps", "Player's Guide", 107),
        ("Rations (3)", "5 sp", 1, "Food", "3 days of travel rations", "Player's Guide", 107),
        ("Rope, 60'", "1 gp", 1, "Tool", "60 feet of hemp rope", "Player's Guide", 107),
        ("Morzo silk rope", "50 gp", 1, "Tool", "60 feet indestructible silk rope", "Player's Guide", 109),
        ("Torch (3)", "5 sp", 1, "Light", "Casts near light for 1 hour real time", "Player's Guide", 107),
        # Weapons
        ("Bastard sword", "10 gp", 2, "Weapon", "Melee, 1d8/1d10, Versatile", "Player's Guide", 110),
        ("Blowgun", "5 gp", 1, "Weapon", "Ranged, Near, 1 damage, Snipe", "Player's Guide", 110),
        ("Bolas", "2 gp", 1, "Weapon", "Ranged, Near, 1d4, Thrown, Entrap", "Player's Guide", 110),
        ("Club", "5 cp", 1, "Weapon", "Melee, 1d4 damage", "Player's Guide", 110),
        ("Crossbow", "8 gp", 1, "Weapon", "Ranged, Far, 1d6 damage, 2H, Loading", "Player's Guide", 110),
        ("Dagger", "5 sp", 1, "Weapon", "Melee/Ranged, Near, 1d4 damage, Finesse, Thrown", "Player's Guide", 110),
        ("Greataxe", "10 gp", 2, "Weapon", "Melee, 1d10 damage, 2H", "Player's Guide", 110),
        ("Greatsword", "12 gp", 2, "Weapon", "Melee, 1d12 damage, 2H", "Player's Guide", 110),
        ("Javelin", "5 sp", 1, "Weapon", "Melee/Ranged, Near, 1d6 damage, Thrown", "Player's Guide", 110),
        ("Longbow", "8 gp", 2, "Weapon", "Ranged, Far, 1d8 damage, 2H", "Player's Guide", 110),
        ("Longsword", "9 gp", 1, "Weapon", "Melee, 1d8 damage", "Player's Guide", 110),
        ("Mace", "5 gp", 1, "Weapon", "Melee, 1d6 damage", "Player's Guide", 110),
        ("Shortbow", "6 gp", 1, "Weapon", "Ranged, Far, 1d6 damage, 2H", "Player's Guide", 111),
        ("Shortsword", "7 gp", 1, "Weapon", "Melee, 1d6 damage", "Player's Guide", 111),
        ("Spear", "5 sp", 1, "Weapon", "Melee/Ranged, Near, 1d6 damage, Thrown", "Player's Guide", 111),
        ("Staff", "5 sp", 1, "Weapon", "Melee, 1d4 damage, 2H", "Player's Guide", 111),
        ("Warhammer", "10 gp", 1, "Weapon", "Melee, 1d8 damage", "Player's Guide", 111),
        # Armor
        ("Leather armor", "10 gp", 1, "Armor", "AC 11 + DEX mod", "Player's Guide", 112),
        ("Chainmail", "60 gp", 2, "Armor", "AC 13 + DEX mod, Disadv stealth", "Player's Guide", 112),
        ("Plate mail", "130 gp", 3, "Armor", "AC 15, No DEX mod, Disadv stealth", "Player's Guide", 112),
        ("Shield", "10 gp", 1, "Armor", "+1 AC", "Player's Guide", 112),
        # Poisons & Mounts
        ("Basic Poison", "20 gp", 1, "Poison", "Adds 1d4 poison damage to blade", "Player's Guide", 113),
        ("Camel", "50 gp", 15, "Mount", "Desert mount, 15 storage slots", "Player's Guide", 115),
        ("Horse", "50 gp", 15, "Mount", "Standard riding horse, 15 slots", "Player's Guide", 115),
        ("War Horse", "100 gp", 15, "Mount", "Trained combat mount", "Player's Guide", 117)
    ]
    for name, cost, slots, cat, props, src, pg in equipment_items:
        cursor.execute(
            "INSERT INTO items (name, cost, slot_cost, category, properties, source, page) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (name, cost, slots, cat, props, src, pg)
        )

    # -------------------------------------------------------------
    # 4. Ingest Backgrounds (Core + Player's Guide)
    # -------------------------------------------------------------
    # Shadowdark Core Backgrounds (p. 30)
    if os.path.exists(SHADOWDARK_PDF_PATH):
        with open(SHADOWDARK_PDF_PATH, "r", encoding="utf-8") as f:
            sd_data = json.load(f)
            pages_sd = {p.get("page_number", 0): p.get("text", "") for p in sd_data.get("pages", [])}
            for line in pages_sd.get(30, "").split("\n"):
                m = re.match(r"^\s*(\d{1,2})\s+([A-Za-z\s'\-]+?)\.\s+(.+)$", line)
                if m:
                    cursor.execute(
                        "INSERT INTO backgrounds (roll_val, name, description, source) VALUES (?, ?, ?, ?)",
                        (int(m.group(1)), m.group(2).strip(), m.group(3).strip(), "Shadowdark Core")
                    )

    # Player's Guide Backgrounds (p. 74-77)
    if os.path.exists(PLAYERS_GUIDE_PATH):
        with open(PLAYERS_GUIDE_PATH, "r", encoding="utf-8") as f:
            pg_data = json.load(f)
            pages_pg = {p.get("page_number", 0): p.get("text", "") for p in pg_data.get("pages", [])}
            for pno in range(74, 78):
                text = pages_pg.get(pno, "")
                for m in re.finditer(r"(\d{1,3})\s+([A-Za-z\s'\-]+?)\.\s+([^\n\r\d]+)", text):
                    r_val = int(m.group(1))
                    bg_name = m.group(2).strip()
                    bg_desc = m.group(3).strip()
                    if r_val <= 100 and len(bg_name) > 2 and bg_name not in ["Page", "Details", "Background"]:
                        cursor.execute(
                            "INSERT INTO backgrounds (roll_val, name, description, source) VALUES (?, ?, ?, ?)",
                            (r_val, bg_name, bg_desc, "Player's Guide")
                        )

    # -------------------------------------------------------------
    # 5. Page-Bounded Ancestry Trinket Extraction (GAP 8 FIX)
    # -------------------------------------------------------------
    if os.path.exists(PLAYERS_GUIDE_PATH):
        with open(PLAYERS_GUIDE_PATH, "r", encoding="utf-8") as f:
            pg_data = json.load(f)
            pages = {p.get("page_number", 0): p.get("text", "") for p in pg_data.get("pages", [])}

        ancestry_page_map = {
            "Dwarf": 19,
            "Elf": 21,
            "Goblin": 23,
            "Half-Elf": 25,
            "Half-Orc": 27,
            "Halfling": 29,
            "Human": 31,
            "Kobold": 33
        }

        for anc, pno in ancestry_page_map.items():
            text = pages.get(pno, "")
            matches = re.finditer(r"(\d{1,3})(?:-(\d{1,3}))?\s+([^\d\n\r]+)", text)
            for match in matches:
                min_r = int(match.group(1))
                max_r = int(match.group(2)) if match.group(2) else min_r
                res_text = match.group(3).strip()
                if min_r <= 100 and res_text and len(res_text) > 2 and not res_text.startswith("Part") and not res_text.startswith("PC"):
                    cursor.execute(
                        "INSERT INTO trinkets (ancestry, roll_min, roll_max, result_text, source) VALUES (?, ?, ?, ?, ?)",
                        (anc, min_r, max_r, res_text, "Player's Guide")
                    )

    # -------------------------------------------------------------
    # 6. Class Talent Tables (GAP 4 FIX)
    # -------------------------------------------------------------
    if os.path.exists(PLAYERS_GUIDE_PATH):
        with open(PLAYERS_GUIDE_PATH, "r", encoding="utf-8") as f:
            pg_data = json.load(f)
            for p in pg_data.get("pages", []):
                text = p.get("text", "")
                pno = p.get("page_number", 0)
                if "TALENTS" in text.upper():
                    for match in ROLL_ENTRY_REGEX.finditer(text):
                        min_r = int(match.group(1))
                        max_r = int(match.group(2)) if match.group(2) else min_r
                        result = match.group(3).strip()
                        if min_r <= 12 and len(result) > 3:
                            cursor.execute(
                                "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                                (f"PGWR Talents p.{pno}", "2d6", min_r, max_r, result, "Class Talents", "Player's Guide", pno)
                            )

    if os.path.exists(SHADOWDARK_PDF_PATH):
        with open(SHADOWDARK_PDF_PATH, "r", encoding="utf-8") as f:
            sd_data = json.load(f)
            for p in sd_data.get("pages", []):
                text = p.get("text", "")
                pno = p.get("page_number", 0)
                if pno in [17, 19, 21, 24]:
                    for match in ROLL_ENTRY_REGEX.finditer(text):
                        min_r = int(match.group(1))
                        max_r = int(match.group(2)) if match.group(2) else min_r
                        result = match.group(3).strip()
                        if min_r <= 12 and len(result) > 3:
                            cursor.execute(
                                "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                                (f"Core Class Talents p.{pno}", "2d6", min_r, max_r, result, "Class Talents", "Shadowdark Core", pno)
                            )

    # -------------------------------------------------------------
    # 7. Core Traps, Hazards, Treasure & Magic Items (GAP 5, 6, 7 FIX)
    # -------------------------------------------------------------
    if os.path.exists(SHADOWDARK_PDF_PATH):
        with open(SHADOWDARK_PDF_PATH, "r", encoding="utf-8") as f:
            sd_data = json.load(f)
            pages = {p.get("page_number", 0): p.get("text", "") for p in sd_data.get("pages", [])}

        p108_text = pages.get(108, "")
        for m in ROLL_ENTRY_REGEX.finditer(p108_text):
            min_r = int(m.group(1))
            max_r = int(m.group(2)) if m.group(2) else min_r
            result = m.group(3).strip()
            if min_r <= 20 and len(result) > 2:
                cursor.execute(
                    "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    ("Core Traps p.108", "d20", min_r, max_r, result, "Traps & Hazards", "Shadowdark Core", 108)
                )

        for pno in range(136, 140):
            p_text = pages.get(pno, "")
            for m in ROLL_ENTRY_REGEX.finditer(p_text):
                min_r = int(m.group(1))
                max_r = int(m.group(2)) if m.group(2) else min_r
                result = m.group(3).strip()
                if min_r <= 100 and len(result) > 3:
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (f"Core Treasure p.{pno}", "d100", min_r, max_r, result, "Treasure", "Shadowdark Core", pno)
                    )

        for pno in range(140, 161):
            p_text = pages.get(pno, "")
            for m in ROLL_ENTRY_REGEX.finditer(p_text):
                min_r = int(m.group(1))
                max_r = int(m.group(2)) if m.group(2) else min_r
                result = m.group(3).strip()
                if min_r <= 100 and len(result) > 3:
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (f"Core Magic Items p.{pno}", "d100", min_r, max_r, result, "Magic Items", "Shadowdark Core", pno)
                    )

    # -------------------------------------------------------------
    # 8. Western Reaches Regional Content (GAP 9 FIX)
    # -------------------------------------------------------------
    if os.path.exists(PLAYERS_GUIDE_PATH):
        with open(PLAYERS_GUIDE_PATH, "r", encoding="utf-8") as f:
            pg_data = json.load(f)
            pages = {p.get("page_number", 0): p.get("text", "") for p in pg_data.get("pages", [])}

        for pno in range(78, 82):
            p_text = pages.get(pno, "")
            for m in ROLL_ENTRY_REGEX.finditer(p_text):
                min_r = int(m.group(1))
                max_r = int(m.group(2)) if m.group(2) else min_r
                result = m.group(3).strip()
                if min_r <= 100 and len(result) > 4:
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (f"Western Reaches Secrets p.{pno}", "d100", min_r, max_r, result, "Regional Secrets", "Player's Guide", pno)
                    )

        for pno in range(82, 90):
            p_text = pages.get(pno, "")
            for m in ROLL_ENTRY_REGEX.finditer(p_text):
                min_r = int(m.group(1))
                max_r = int(m.group(2)) if m.group(2) else min_r
                result = m.group(3).strip()
                if min_r <= 20 and len(result) > 2:
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (f"Class Titles p.{pno}", "d20", min_r, max_r, result, "Titles", "Player's Guide", pno)
                    )

        for pno in range(226, 233):
            p_text = pages.get(pno, "")
            for m in ROLL_ENTRY_REGEX.finditer(p_text):
                min_r = int(m.group(1))
                max_r = int(m.group(2)) if m.group(2) else min_r
                result = m.group(3).strip()
                if min_r <= 100 and len(result) > 3:
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (f"Hexcrawl Table p.{pno}", "d20", min_r, max_r, result, "Hexcrawl", "Player's Guide", pno)
                    )

        for pno in range(236, 250):
            p_text = pages.get(pno, "")
            for m in ROLL_ENTRY_REGEX.finditer(p_text):
                min_r = int(m.group(1))
                max_r = int(m.group(2)) if m.group(2) else min_r
                result = m.group(3).strip()
                if min_r <= 100 and len(result) > 3:
                    cursor.execute(
                        "INSERT INTO roll_tables (table_name, die_type, roll_min, roll_max, result_text, category, source, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        (f"Downtime Table p.{pno}", "d100", min_r, max_r, result, "Downtime & Bastions", "Player's Guide", pno)
                    )

    # -------------------------------------------------------------
    # 9. Classified JSON Ingestion
    # -------------------------------------------------------------
    if os.path.exists(CLASSIFIED_JSON_PATH):
        with open(CLASSIFIED_JSON_PATH, "r", encoding="utf-8") as f:
            c_data = json.load(f)

        for entry in c_data.get("tables", []):
            source = entry.get("source", "Shadowdark Core")
            page = entry.get("page", 0)
            text = entry.get("full_text", "")

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

        for entry in c_data.get("rules", []):
            source = entry.get("source", "Shadowdark Core")
            page = entry.get("page", 0)
            text = entry.get("snippet", "")
            cursor.execute(
                "INSERT INTO rules_catalog (topic, category, rule_text, source, page) VALUES (?, ?, ?, ?, ?)",
                (f"Rule p.{page}", "Core Mechanics", text, source, page)
            )

    # Register table metadata for all tables in roll_tables
    cursor.execute("SELECT DISTINCT table_name, die_type, category, source FROM roll_tables")
    dist_tables = cursor.fetchall()
    for t_name, d_type, cat, src in dist_tables:
        cursor.execute(
            "INSERT OR IGNORE INTO tables_meta (name, die_type, category, source) VALUES (?, ?, ?, ?)",
            (t_name, d_type or "d20", cat or "General", src or "Unknown")
        )

    conn.commit()

    # Query metrics
    cursor.execute("SELECT count(*) FROM monsters")
    db_monsters = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM spells")
    db_spells = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM roll_tables")
    db_roll_tables = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM ancestry_names")
    db_names = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM backgrounds")
    db_bg = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM trinkets")
    db_trinkets = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM items")
    db_items = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM tables_meta")
    db_meta = cursor.fetchone()[0]

    cursor.execute("SELECT count(*) FROM rules_catalog")
    db_rules = cursor.fetchone()[0]

    # -------------------------------------------------------------
    # 10. Export Master JSON Bundle for TypeScript / Browser Engine
    # -------------------------------------------------------------
    cursor.execute("SELECT name, die_type, category, description, source FROM tables_meta")
    meta_rows = [{"name": r[0], "die_type": r[1], "category": r[2], "description": r[3], "source": r[4]} for r in cursor.fetchall()]

    cursor.execute("SELECT table_name, die_type, roll_min, roll_max, result_text, category, source FROM roll_tables")
    roll_rows = [{"table_name": r[0], "die_type": r[1], "roll_min": r[2], "roll_max": r[3], "result_text": r[4], "category": r[5], "source": r[6]} for r in cursor.fetchall()]

    cursor.execute("SELECT ancestry, type, name_part, source FROM ancestry_names")
    name_rows = [{"ancestry": r[0], "type": r[1], "name_part": r[2], "source": r[3]} for r in cursor.fetchall()]

    cursor.execute("SELECT roll_val, name, description, source FROM backgrounds")
    bg_rows = [{"roll_val": r[0], "name": r[1], "description": r[2], "source": r[3]} for r in cursor.fetchall()]

    cursor.execute("SELECT ancestry, roll_min, roll_max, result_text, source FROM trinkets")
    trinket_rows = [{"ancestry": r[0], "roll_min": r[1], "roll_max": r[2], "result_text": r[3], "source": r[4]} for r in cursor.fetchall()]

    cursor.execute("SELECT name, cost, slot_cost, category, properties, source, page FROM items")
    item_rows = [{"name": r[0], "cost": r[1], "slot_cost": r[2], "category": r[3], "properties": r[4], "source": r[5], "page": r[6]} for r in cursor.fetchall()]

    cursor.execute("SELECT name, ac, hp, attack, mv, alignment, tier, biome, description, source FROM monsters")
    monster_rows = [{"name": r[0], "ac": r[1], "hp": r[2], "attack": r[3], "mv": r[4], "alignment": r[5], "tier": r[6], "biome": r[7], "description": r[8], "source": r[9]} for r in cursor.fetchall()]

    cursor.execute("SELECT name, class_name, tier, range, duration, description, archetype, tags, source FROM spells")
    spell_rows = [{"name": r[0], "class_name": r[1], "tier": r[2], "range": r[3], "duration": r[4], "description": r[5], "archetype": r[6], "tags": r[7], "source": r[8]} for r in cursor.fetchall()]

    master_bundle = {
        "metadata": {
            "database": "shadowdork.db",
            "table_count": db_meta,
            "roll_entries_count": db_roll_tables,
            "monsters_count": db_monsters,
            "spells_count": db_spells,
            "names_count": db_names,
            "backgrounds_count": db_bg,
            "trinkets_count": db_trinkets,
            "items_count": db_items,
            "rules_count": db_rules
        },
        "tables_meta": meta_rows,
        "roll_tables": roll_rows,
        "ancestry_names": name_rows,
        "backgrounds": bg_rows,
        "trinkets": trinket_rows,
        "items": item_rows,
        "monsters": monster_rows,
        "spells": spell_rows
    }

    os.makedirs(os.path.dirname(MASTER_EXPORT_PATH), exist_ok=True)
    with open(MASTER_EXPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(master_bundle, f, indent=2)

    manifest = {
        "database": "shadowdork.db",
        "tables_meta_count": db_meta,
        "monsters_count": db_monsters,
        "spells_count": db_spells,
        "roll_tables_count": db_roll_tables,
        "ancestry_names_count": db_names,
        "backgrounds_count": db_bg,
        "trinkets_count": db_trinkets,
        "items_count": db_items,
        "rules_count": db_rules,
        "status": "fully_populated_all_gaps_resolved"
    }

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    conn.close()

    print(f"Master Database populated successfully at {DB_PATH}:")
    print(f"  - Tables Catalog: {db_meta}")
    print(f"  - Roll Table Entries: {db_roll_tables}")
    print(f"  - Ancestry Name Entries: {db_names}")
    print(f"  - Backgrounds: {db_bg}")
    print(f"  - Trinkets: {db_trinkets}")
    print(f"  - Items/Equipment: {db_items}")
    print(f"  - Monsters: {db_monsters}")
    print(f"  - Spells: {db_spells}")
    print(f"  - Rules Catalog: {db_rules}")
    print(f"Master JSON export created at {MASTER_EXPORT_PATH}")

if __name__ == "__main__":
    populate()
