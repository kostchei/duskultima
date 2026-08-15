"""Build the DuskUltima Shadowdark table database from source files.

The importer is source-driven. PDF pages are addressed by extracted page number,
while printed page numbers are retained in the manifest and structured rows. All
roll labels are preserved (including ``00``) and normalized to 100 only for
numeric range matching.
"""

from __future__ import annotations

import json
import re
import shutil
import sqlite3
from pathlib import Path
from typing import Any, Iterable

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "shadowdork.db"
SCHEMA_PATH = ROOT / "scripts" / "schema.sql"
RAW_PDF_DIR = ROOT / "docs" / "extracted" / "raw"
SDTOOLS_DIR = ROOT / "docs" / "raw_source" / "SDtools_extracted" / "data"
PLAYERS_GUIDE_PATH = RAW_PDF_DIR / "Player_s_Guide_to_the_Western_Reaches_V1.pdf.json"
SHADOWDARK_PATH = RAW_PDF_DIR / "shadow-dark.pdf.json"
SHADOWDARK_V48_PATH = RAW_PDF_DIR / "Shadowdark RPG - V4-8.pdf.json"
CURSED_SCROLL_3_PATH = RAW_PDF_DIR / "Cursed Scroll 3 - Midnight Sun V3-5.pdf.json"
MASTER_EXPORT_PATH = ROOT / "src" / "data" / "db" / "master_tables.json"
MANIFEST_EXPORT_PATH = ROOT / "src" / "data" / "db" / "source_manifest.json"
TABLES_MANIFEST_PATH = ROOT / "src" / "data" / "db" / "tables_manifest.json"
DOC_MANIFEST_PATH = ROOT / "docs" / "skills" / "table-db" / "source_manifest.json"
CONSTRAINTS_DOC_PATH = ROOT / "docs" / "skills" / "table-db" / "CLASSES_AND_ANCESTRIES.md"

FULL_CLASSES = [
    ("Fighter", "str"), ("Cleric", "wis"), ("MagicUser", "int"),
    ("Thief", "dex"), ("Bard", "cha"), ("Monk", "wis"),
    ("Necromancer", "cha"), ("Paladin", "cha"), ("Ranger", "int"),
    ("Seawolf", "str"), ("Warlock", "var"),
]
RECOVERABLE_CLASSES = [
    ("Basilisk Warrior", "con"), ("Ras-Godai", "dex"),
    ("Roustabout", "var"), ("Delver", "var"), ("Duelist", "cha"),
    ("Pit Fighter", "con"),
]
PROJECT_ANCESTRIES = [
    ("Human", "Human", "source-backed", "Western Reaches d10 compound names."),
    ("Dwarf", "Dwarf", "source-backed", "Western Reaches d10 compound names; plate allowed, finesse prohibited."),
    ("Elf", "Elf", "source-backed", "Western Reaches d10 compound names."),
    ("Half-Orc", "Half-Orc", "source-backed", "Western Reaches d10 compound names."),
    ("Gnome", "Kobold", "alias", "Project constraint maps Gnome to the Kobold source ancestry."),
    ("Tiefling/Deva", "Human", "alias", "Name generation uses Human source names; ancestry feature is patron boon from a Lawful or Chaotic patron."),
]
SOURCE_ANCESTRIES = ["Dwarf", "Elf", "Goblin", "Half-Elf", "Half-Orc", "Halfling", "Human", "Kobold"]
CORE_EQUIPMENT_NAMES = {
    "Bastard sword", "Club", "Crossbow", "Dagger", "Greataxe", "Greatsword", "Javelin",
    "Longbow", "Longsword", "Mace", "Shortbow", "Shortsword", "Staff", "Warhammer",
    "Leather armor", "Chainmail", "Plate mail", "Shield", "Mithril (metal armor only)",
}

ROLL_TOKEN = re.compile(r"(?<![\w-])(00|\d{1,3}(?:\s*[-–]\s*\d{1,3})?)(?![\w-])")
LINE_ROLL = re.compile(r"^\s*(00|\d{1,3}(?:\s*[-–]\s*\d{1,3})?)\s+(.+?)\s*$")
COST_TOKEN = re.compile(r"(?P<cost>(?:[\d,]+\s*(?:gp|sp|cp)|Varies|-))(?=\s|$)", re.I)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\u2019", "'").replace("\u2013", "-")).strip()


def load_pdf(path: Path) -> dict[int, dict[str, Any]]:
    document = load_json(path)
    pages: dict[int, dict[str, Any]] = {}
    for page in document.get("pages", []):
        extracted = int(page.get("page_number", 0))
        text = page.get("text", "") or ""
        first = next((line.strip() for line in text.splitlines() if line.strip()), "")
        printed = int(first) if first.isdigit() else extracted
        pages[extracted] = {"text": text, "printed": printed}
    return pages


def parse_range(label: str) -> tuple[int, int, str]:
    clean = label.replace("–", "-").replace(" ", "")
    if clean == "00":
        return 100, 100, "00"
    if "-" in clean:
        left, right = clean.split("-", 1)
        return int(left), 100 if right == "00" else int(right), clean
    value = int(clean)
    return value, value, clean


def parse_roll_rows(text: str, max_roll: int | None = None) -> list[dict[str, Any]]:
    """Parse numbered rows line-by-line, including two-column PDF extraction."""
    rows: list[dict[str, Any]] = []
    for line in text.splitlines():
        line = normalize_text(line)
        if not line:
            continue
        matches = list(ROLL_TOKEN.finditer(line))
        if not matches:
            continue
        for index, match in enumerate(matches):
            label = match.group(1)
            start = match.end()
            end = matches[index + 1].start() if index + 1 < len(matches) else len(line)
            result = line[start:end].strip(" .|\t")
            low, high, original = parse_range(label)
            if not result or result.lower() in {"details", "details d", "effect", "name", "item"}:
                continue
            if max_roll is not None and low > max_roll:
                continue
            rows.append({"roll_min": low, "roll_max": high, "roll_label": original, "result_text": result})
    return rows


def parse_name_parts(text: str) -> list[tuple[int, str, str]]:
    rows = []
    for line in text.splitlines():
        match = re.match(r"^\s*(\d{1,2})\s+([^\s]+)\s+([^\s]+)\s*$", line)
        if match and match.group(1) != "18":
            rows.append((int(match.group(1)), match.group(2), match.group(3)))
    return rows


def table_specs() -> list[dict[str, Any]]:
    specs: list[dict[str, Any]] = []

    def add(document: str, pages: Iterable[int], heading: str, die: str | None, category: str, shape: str, adapter: str, notes: str = "") -> None:
        specs.append({
            "document": document, "pages": list(pages), "heading": heading,
            "die_expression": die, "category": category, "schema_shape": shape,
            "adapter": adapter, "notes": notes,
        })

    sd = SHADOWDARK_PATH.name
    pg = PLAYERS_GUIDE_PATH.name
    # Core tables: extracted page numbers are the page numbers in the JSON files.
    for pages, heading, die, category, shape, adapter in [
        ([25], "Backgrounds", "d20", "Backgrounds", "roll,name,description", "backgrounds"),
        ([29, 30], "Core Class Titles", "level bands", "Titles", "level,alignment,title", "roll"),
        ([32], "Core Starting Gear", "d12", "Starting Gear", "roll,result", "roll"),
        ([37], "Core Character Names", "d20", "Names", "roll,ancestry,name", "names_core"),
        ([39, 40], "Core Random Character Tables", "d4-d12", "Random Characters", "roll,result", "roll"),
        ([44, 45, 46], "Wizard Mishaps", "d12", "Mishaps", "roll,effect", "roll"),
        ([90], "Core Carousing Outcomes", "d20", "Carousing", "roll,outcome,benefit", "roll"),
        ([108], "Core Traps", "3d12", "Traps & Hazards", "roll,trigger,damage_effect", "roll"),
        ([109], "Core Hazards", "d12", "Traps & Hazards", "roll,movement,damage,weaken", "roll"),
        ([112, 113], "Something Happens", "d100", "Encounters", "roll,event", "roll"),
        ([114, 115], "Core Rumors", "d100", "Rumors", "roll,rumor", "roll"),
        ([120], "Monster Generator", "4d20", "Monster Generator", "roll,combat,quality,strength,weakness", "roll"),
        ([121], "Monster Mutations", "3d12", "Monster Generator", "roll,mutation_1,mutation_2,mutation_3", "roll"),
        ([136, 137], "Treasure 1-3", "d100", "Treasure", "roll,rarity,details", "roll"),
        ([139], "Luxury Items", "2d20", "Treasure", "roll,feature,item", "roll"),
        ([140], "Boons", "d8", "Boons", "roll,details", "roll"),
        ([141], "Secrets and Blessings", "2d12/d12", "Boons", "roll,detail,subject", "roll"),
        ([142], "Magic Item Qualities", "d6/2d6", "Magic Item Qualities", "roll,quality", "roll"),
        ([143], "Magic Item Idea Generator", "3d20", "Magic Items", "roll,name_part", "roll"),
    ]:
        add(sd, pages, heading, die, category, shape, adapter)

    # Western Reaches tables.
    for page, ancestry in [(18, "Dwarf"), (20, "Elf"), (22, "Goblin"), (24, "Half-Elf"), (26, "Half-Orc"), (28, "Halfling"), (30, "Human"), (32, "Kobold")]:
        add(pg, [page], f"{ancestry} Names", "d10", "Names", "roll,part1,part2", "names_parts")
    for pages, heading, die, category, shape, adapter in [
        ([19, 21, 23, 25, 27, 29, 31, 33], "Ancestry Trinkets", "d100", "Trinkets", "ancestry,roll,result", "trinkets"),
        ([74, 75, 76, 77], "Western Reaches Backgrounds", "d100", "Backgrounds", "roll,name,description,region", "backgrounds"),
        ([78, 79, 80, 81], "Western Reaches Secrets", "d100", "Regional Secrets", "roll,details", "roll"),
        ([82, 83, 84, 85, 86, 87, 88, 89], "Class Titles", "level bands", "Titles", "level,alignment,title", "roll"),
        ([91, 93, 95, 97, 99, 101, 103], "Factions", "d20/benefits", "Factions", "mission,symbol,leader,benefit", "raw"),
        ([34, 37, 38, 41, 42, 44, 46, 49, 50, 53, 55, 57, 58, 61, 63, 64, 66, 69, 71, 72, 73], "Western Reaches Class Tables", "2d6/d10", "Class Talents", "roll,effect", "roll"),
        ([106, 107], "Basic Gear", None, "Equipment", "name,cost,quantity,gear_slots", "equipment"),
        ([110, 111], "Weapons", None, "Equipment", "name,cost,type,range,damage,properties", "equipment"),
        ([112], "Armor", None, "Equipment", "name,cost,gear_slots,ac,properties", "equipment"),
        ([115], "Mounts", None, "Equipment", "name,cost,rarity,gear_slots,properties", "equipment"),
        ([118], "Boats", None, "Equipment", "name,cost,speed,ac,hp,gear_slots,properties", "equipment"),
        ([119], "Siege Weapons", None, "Equipment", "name,cost,type,range,damage,properties", "equipment"),
        ([184, 185, 186, 187], "Western Reaches Mishaps", "d12", "Mishaps", "roll,effect", "roll"),
        ([191, 193, 195, 197, 199, 201, 203, 205], "Spell Tier Details", "d12", "Spell Tier Details", "roll,detail", "roll"),
        ([207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223], "Patron Boons", "2d6", "Patron Boons", "patron,roll,boon", "roll"),
        ([226, 227, 228, 229, 230, 231, 232], "Hexcrawl and Weather", "d6/d20", "Hexcrawl", "step,terrain,weather,encounter", "raw"),
        ([236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247], "Downtime, Carousing and Bastions", "d8/d100", "Downtime & Bastions", "roll,result,benefit,cost", "roll"),
    ]:
        add(pg, pages, heading, die, category, shape, adapter)

    # Shadowdark RPG V4-8 Core Rulebook tables.
    sd_v48 = SHADOWDARK_V48_PATH.name
    for pages, heading, die, category, shape, adapter in [
        ([30], "Backgrounds V4-8", "d20", "Backgrounds", "roll,name,description", "backgrounds"),
        ([34, 35], "Core Class Titles V4-8", "level bands", "Titles", "level,alignment,title", "roll"),
        ([37], "Core Starting Gear V4-8", "d12", "Starting Gear", "roll,result", "roll"),
        ([42, 331], "Core Character Names V4-8", "d20", "Names", "roll,ancestry,name", "names_core"),
        ([44, 45], "Core Random Character Tables V4-8", "d4-d12", "Random Characters", "roll,result", "roll"),
        ([50, 51], "Wizard Mishaps V4-8", "d12", "Mishaps", "roll,effect", "roll"),
        ([96, 97], "Core Carousing Outcomes V4-8", "d20", "Carousing", "roll,outcome,benefit", "roll"),
        ([118], "Core Traps V4-8", "3d12", "Traps & Hazards", "roll,trigger,damage_effect", "roll"),
        ([119], "Core Hazards V4-8", "d12", "Traps & Hazards", "roll,movement,damage,weaken", "roll"),
        ([122, 123], "Something Happens V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([124, 125], "Core Rumors V4-8", "d100", "Rumors", "roll,rumor", "roll"),
        ([146, 147], "Arctic Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([148, 149], "Artisan District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([150, 151], "Castle District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([152, 153], "Cave Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([154, 155], "Deep Tunnels Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([156, 157], "Desert Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([158, 159], "Forest Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([160, 161], "Grassland Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([162, 163], "High District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([164, 165], "Jungle Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([166, 167], "Low District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([168, 169], "Market District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([170, 171], "Mountain Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([172, 173], "Ocean Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([174, 175], "River and Coast Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([176, 177], "Ruins Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([178, 179], "Slums Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([180, 181], "Swamp Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([182, 183], "Tavern Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([184, 185], "Temple District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([186, 187], "Tomb Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([188, 189], "University District Encounters V4-8", "d100", "Encounters", "roll,event", "roll"),
        ([194], "Monster Generator V4-8", "4d20", "Monster Generator", "roll,combat,quality,strength,weakness", "roll"),
        ([195], "Monster Mutations V4-8", "3d12", "Monster Generator", "roll,mutation_1,mutation_2,mutation_3", "roll"),
        ([274, 275], "Treasure 0-3 V4-8", "d100", "Treasure", "roll,rarity,details", "roll"),
        ([276, 277], "Treasure 4-6 V4-8", "d100", "Treasure", "roll,rarity,details", "roll"),
        ([278, 279], "Treasure 7-9 V4-8", "d100", "Treasure", "roll,rarity,details", "roll"),
        ([280, 281], "Treasure 10+ V4-8", "d100", "Treasure", "roll,rarity,details", "roll"),
        ([283], "Luxury Items V4-8", "2d20", "Treasure", "roll,feature,item", "roll"),
        ([284, 285], "Boons V4-8", "d8", "Boons", "roll,details", "roll"),
        ([287], "Magic Item Idea Generator V4-8", "3d20", "Magic Items", "roll,name_part", "roll"),
    ]:
        add(sd_v48, pages, heading, die, category, shape, adapter)
    return specs


def source_page_manifest(path: Path, pages: dict[int, dict[str, Any]]) -> list[dict[str, Any]]:
    """Capture table-like pages not covered by a named adapter for auditability."""
    covered = {page for spec in table_specs() if spec["document"] == path.name for page in spec["pages"]}
    discovered = []
    for extracted, page in pages.items():
        text = page["text"]
        if extracted in covered or not text:
            continue
        if not re.search(r"\b(?:d100|d20|d12|d10|d8|d6|d4|2d6|table|titles|gear|weapons|armor|mounts|boats|bastion|warband)\b", text, re.I):
            continue
        numbered = parse_roll_rows(text)
        if len(numbered) < 4:
            continue
        heading = next((normalize_text(line) for line in text.splitlines() if re.search(r"(?:table|titles|gear|weapons|armor|mounts|boats|bastion|warband|background|mishap|rumor)", line, re.I)), f"Extracted page {extracted}")
        discovered.append({
            "document": path.name, "pages": [extracted], "heading": heading[:120],
            "die_expression": None, "category": "Unclassified Source Table",
            "schema_shape": "raw_text", "adapter": "raw_page_capture",
            "notes": "Auto-discovered table-like page; promote to a named adapter after review.",
        })
    return discovered


def insert_manifest(conn: sqlite3.Connection, specs: list[dict[str, Any]], pdfs: dict[str, dict[int, dict[str, Any]]]) -> list[dict[str, Any]]:
    rows = []
    all_specs = specs[:]
    for path in [PLAYERS_GUIDE_PATH, SHADOWDARK_PATH, SHADOWDARK_V48_PATH]:
        all_specs.extend(source_page_manifest(path, pdfs[path.name]))
    seen = set()
    for spec in all_specs:
        key = (spec["document"], spec["heading"], tuple(spec["pages"]))
        if key in seen:
            continue
        seen.add(key)
        pages = pdfs[spec["document"]]
        printed = [pages[p]["printed"] for p in spec["pages"] if p in pages]
        texts = [pages[p]["text"] for p in spec["pages"] if p in pages]
        expected = sum(len(parse_roll_rows(text)) for text in texts)
        if spec["adapter"] == "equipment":
            category = {
                "Basic Gear": "Gear", "Weapons": "Weapon", "Armor": "Armor",
                "Mounts": "Mount", "Boats": "Boat", "Siege Weapons": "Siege Weapon",
                "Core Weapons and Armor": "Core Equipment",
            }.get(spec["heading"], "Equipment")
            expected = sum(
                1 for page_number in spec["pages"] if page_number in pages
                for line in pages[page_number]["text"].splitlines()
                if parse_item_line(normalize_text(line), category, page_number, "manifest")
            )
        elif spec["adapter"] in {"raw", "raw_page_capture"} and expected == 0:
            expected = sum(sum(1 for line in text.splitlines() if normalize_text(line)) for text in texts)
        elif spec["adapter"] == "names_parts":
            expected = sum(len(parse_name_parts(text)) for text in texts)
        elif spec["adapter"] == "names_core":
            expected = sum(len(re.findall(r"^\s*\d{1,2}\s+", text, re.M)) for text in texts)
        elif spec["adapter"] == "backgrounds":
            expected = sum(
                1 for text in texts for row in parse_roll_rows(text, 100)
                if "." in row["result_text"]
            )
        row = {
            "document": spec["document"],
            "source_path": str(Path("docs/extracted/raw") / spec["document"]),
            "extracted_page_min": min(spec["pages"]), "extracted_page_max": max(spec["pages"]),
            "printed_page_min": min(printed) if printed else None, "printed_page_max": max(printed) if printed else None,
            "heading": spec["heading"], "die_expression": spec["die_expression"],
            "expected_rows": expected, "schema_shape": spec["schema_shape"],
            "adapter": spec["adapter"], "status": "captured", "notes": spec.get("notes", ""),
        }
        conn.execute("""INSERT INTO source_manifest
            (document,source_path,extracted_page_min,extracted_page_max,printed_page_min,printed_page_max,heading,die_expression,expected_rows,schema_shape,adapter,status,notes)
            VALUES (:document,:source_path,:extracted_page_min,:extracted_page_max,:printed_page_min,:printed_page_max,:heading,:die_expression,:expected_rows,:schema_shape,:adapter,:status,:notes)""", row)
        rows.append(row)
    return rows


def add_roll_table(conn: sqlite3.Connection, name: str, die: str, category: str, source: str, page: int, rows: list[dict[str, Any]], metadata: dict[str, Any] | None = None) -> None:
    conn.execute("INSERT OR IGNORE INTO tables_meta(name,die_type,category,description,source) VALUES (?,?,?,?,?)", (name, die or "raw", category, name, source))
    for row_index, row in enumerate(rows):
        conn.execute("""INSERT INTO roll_tables
            (table_name,die_type,roll_min,roll_max,result_text,roll_label,category,source,page,metadata_json)
            VALUES (?,?,?,?,?,?,?,?,?,?)""", (name, die or "raw", row["roll_min"], row["roll_max"], row["result_text"], row.get("roll_label"), category, source, page, json.dumps(metadata or {}, ensure_ascii=False)))
        conn.execute("""INSERT INTO structured_rows
            (table_name,document,extracted_page,printed_page,row_index,roll_label,raw_text,row_json)
            VALUES (?,?,?,?,?,?,?,?)""", (name, source, page, page, row_index, row.get("roll_label"), row["result_text"], json.dumps(row, ensure_ascii=False)))


def ingest_named_tables(conn: sqlite3.Connection, specs: list[dict[str, Any]], pdfs: dict[str, dict[int, dict[str, Any]]]) -> None:
    for spec in specs:
        if spec["document"] == SHADOWDARK_V48_PATH.name:
            source = "Shadowdark RPG V4-8"
        elif spec["document"] == SHADOWDARK_PATH.name:
            source = "Shadowdark Core"
        else:
            source = "Player's Guide"
        pages = pdfs[spec["document"]]
        if spec["adapter"] in {"equipment", "names_parts", "names_core", "backgrounds", "trinkets"}:
            continue
        texts = [pages[p]["text"] for p in spec["pages"] if p in pages]
        rows = parse_roll_rows("\n".join(texts))
        if not rows:
            # Preserve non-numbered/multi-column source content as structured raw rows.
            name = f"{spec['heading']} ({source})"
            for page_number in spec["pages"]:
                if page_number not in pages:
                    continue
                lines = [normalize_text(x) for x in pages[page_number]["text"].splitlines() if normalize_text(x)]
                for index, line in enumerate(lines):
                    conn.execute("""INSERT INTO structured_rows
                        (table_name,document,extracted_page,printed_page,row_index,raw_text,row_json)
                        VALUES (?,?,?,?,?,?,?)""", (name, spec["document"], page_number, pages[page_number]["printed"], index, line, json.dumps({"raw": line}, ensure_ascii=False)))
            continue
        name = f"{spec['heading']} ({source})"
        add_roll_table(conn, name, spec.get("die_expression") or "raw", spec["category"], source, spec["pages"][0], rows, {"schema_shape": spec["schema_shape"], "adapter": spec["adapter"]})


def ingest_names(conn: sqlite3.Connection, pages: dict[int, dict[str, Any]], cs3_pages: dict[int, dict[str, Any]]) -> None:
    page_map = {"Dwarf": 18, "Elf": 20, "Goblin": 22, "Half-Elf": 24, "Half-Orc": 26, "Halfling": 28, "Human": 30, "Kobold": 32}
    for ancestry, page in page_map.items():
        for _, part1, part2 in parse_name_parts(pages[page]["text"]):
            conn.execute("INSERT OR IGNORE INTO ancestry_names(ancestry,type,name_part,source) VALUES (?,?,?,?)", (ancestry, "part1", part1, "Player's Guide"))
            conn.execute("INSERT OR IGNORE INTO ancestry_names(ancestry,type,name_part,source) VALUES (?,?,?,?)", (ancestry, "part2", part2, "Player's Guide"))
    if 16 in cs3_pages:
        for line in cs3_pages[16]["text"].splitlines():
            line = normalize_text(line)
            tokens = line.split()
            if len(tokens) >= 5 and tokens[0].isdigit():
                male, female, surname = tokens[1], tokens[2], tokens[3]
                conn.execute("INSERT OR IGNORE INTO ancestry_names(ancestry,type,name_part,source,region) VALUES (?,?,?,?,?)", ("Human", "standalone", male, "Cursed Scroll 3", "Midnight Sun"))
                conn.execute("INSERT OR IGNORE INTO ancestry_names(ancestry,type,name_part,source,region) VALUES (?,?,?,?,?)", ("Human", "standalone", female, "Cursed Scroll 3", "Midnight Sun"))
                conn.execute("INSERT OR IGNORE INTO ancestry_names(ancestry,type,name_part,source,region) VALUES (?,?,?,?,?)", ("Human", "surname", surname, "Cursed Scroll 3", "Midnight Sun"))


def ingest_trinkets(conn: sqlite3.Connection, pages: dict[int, dict[str, Any]]) -> None:
    page_map = {"Dwarf": 19, "Elf": 21, "Goblin": 23, "Half-Elf": 25, "Half-Orc": 27, "Halfling": 29, "Human": 31, "Kobold": 33}
    for ancestry, page in page_map.items():
        rows = parse_roll_rows(pages[page]["text"], 100)
        for row in rows:
            conn.execute("INSERT OR IGNORE INTO trinkets(ancestry,roll_min,roll_max,result_text,source) VALUES (?,?,?,?,?)", (ancestry, row["roll_min"], row["roll_max"], row["result_text"], "Player's Guide"))


def ingest_backgrounds(conn: sqlite3.Connection, sd_pages: dict[int, dict[str, Any]], pg_pages: dict[int, dict[str, Any]], v48_pages: dict[int, dict[str, Any]]) -> None:
    for row in parse_roll_rows(sd_pages[25]["text"], 20):
        result = row["result_text"]
        if "." not in result:
            continue
        name, description = result.split(".", 1)
        conn.execute("INSERT OR IGNORE INTO backgrounds(roll_val,name,description,source) VALUES (?,?,?,?)", (row["roll_min"], name.strip(), description.strip(), "Shadowdark Core"))
    for row in parse_roll_rows(v48_pages[30]["text"], 20):
        result = row["result_text"]
        if "." not in result:
            continue
        name, description = result.split(".", 1)
        conn.execute("INSERT OR IGNORE INTO backgrounds(roll_val,name,description,source) VALUES (?,?,?,?)", (row["roll_min"], name.strip(), description.strip(), "Shadowdark RPG V4-8"))
    for page in [74, 75, 76, 77]:
        for row in parse_roll_rows(pg_pages[page]["text"], 100):
            result = row["result_text"]
            if "." not in result:
                continue
            name, description = result.split(".", 1)
            conn.execute("INSERT OR IGNORE INTO backgrounds(roll_val,name,description,source) VALUES (?,?,?,?)", (row["roll_min"], name.strip(), description.strip(), "Player's Guide"))


def parse_item_line(line: str, category: str, page: int, source: str) -> dict[str, Any] | None:
    line = normalize_text(line)
    if not line or line.lower().startswith(("item cost", "weapon cost", "name cost", "type cost")):
        return None
    match = COST_TOKEN.search(line)
    if not match:
        return None
    name = line[:match.start()].strip(" ,")
    if not name or name.isdigit() or len(name) > 50:
        return None
    rest = line[match.end():].strip()
    tokens = rest.split()
    if category == "Gear" and not (tokens and (tokens[0][0].isdigit() or tokens[0].lower() == "varies")):
        return None
    if category in {"Weapon", "Siege Weapon"} and (len(tokens) < 3 or tokens[0] not in {"M", "R", "M/R"}):
        return None
    if category == "Armor" and (len(tokens) < 2 or not tokens[0].isdigit() or not (tokens[1][0].isdigit() or tokens[1].startswith("+"))):
        return None
    if category == "Mount" and (len(tokens) < 2 or tokens[0] not in {"C", "U", "R", "L"} or not tokens[1].isdigit()):
        return None
    if category == "Boat" and (len(tokens) < 4 or not all(token.replace(",", "").isdigit() for token in tokens[:4])):
        return None
    if category == "Core Equipment" and (not tokens or (tokens[0] not in {"M", "R", "M/R"} and not tokens[0].isdigit())):
        return None
    if category == "Core Equipment" and name not in CORE_EQUIPMENT_NAMES:
        return None
    item: dict[str, Any] = {"name": name, "cost": match.group("cost").strip(), "category": category, "source": source, "page": page, "properties": rest}
    item["item_type"] = category
    if category in {"Weapon", "Siege Weapon"}:
        tokens = rest.split()
        if len(tokens) >= 4:
            item["type"] = tokens[0]; item["range"] = tokens[1]; item["damage"] = tokens[2]; item["properties"] = " ".join(tokens[3:])
    elif category == "Armor":
        tokens = rest.split()
        if len(tokens) >= 3:
            item["gear_slots"] = tokens[0]; item["ac"] = tokens[1]; item["properties"] = " ".join(tokens[2:])
    elif category == "Mount":
        tokens = rest.split()
        if len(tokens) >= 3:
            item["rarity"] = tokens[0]; item["gear_slots"] = tokens[1]; item["properties"] = " ".join(tokens[2:])
    elif category == "Boat":
        tokens = rest.split()
        if len(tokens) >= 5:
            item["speed"] = tokens[0]; item["ac"] = tokens[1]; item["hp"] = tokens[2]; item["gear_slots"] = tokens[3]; item["properties"] = " ".join(tokens[4:])
    return item


def ingest_equipment(conn: sqlite3.Connection, sd_pages: dict[int, dict[str, Any]], pg_pages: dict[int, dict[str, Any]]) -> None:
    sections = [
        (pg_pages, [106, 107], "Basic Gear", "Gear"),
        (pg_pages, [110, 111], "Weapons", "Weapon"),
        (pg_pages, [112], "Armor", "Armor"),
        (pg_pages, [115], "Mounts", "Mount"),
        (pg_pages, [118], "Boats", "Boat"),
        (pg_pages, [119], "Siege Weapons", "Siege Weapon"),
        (sd_pages, [2], "Core Weapons and Armor", "Core Equipment"),
    ]
    seen: set[tuple[str, str]] = set()
    for pages, page_numbers, heading, category in sections:
        source = "Shadowdark Core" if pages is sd_pages else "Player's Guide"
        for page in page_numbers:
            text = pages[page]["text"]
            raw_lines = [normalize_text(x) for x in text.splitlines() if normalize_text(x)]
            merged_lines: list[str] = []
            line_index = 0
            while line_index < len(raw_lines):
                line = raw_lines[line_index]
                if line.endswith(",") and line_index + 1 < len(raw_lines):
                    line = f"{line} {raw_lines[line_index + 1]}"
                    line_index += 1
                merged_lines.append(line)
                line_index += 1
            for line in merged_lines:
                item = parse_item_line(line, category, page, source)
                if not item:
                    continue
                key = (item["name"].lower(), source)
                if key in seen:
                    continue
                seen.add(key)
                conn.execute("""INSERT INTO items
                    (name,cost,slot_cost,category,properties,item_type,rarity,range,damage,ac,speed,hp,gear_slots,metadata_json,source,page)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""", (item["name"], item.get("cost"), 1, item["category"], item.get("properties", ""), item.get("item_type"), item.get("rarity"), item.get("range"), item.get("damage"), item.get("ac"), item.get("speed"), item.get("hp"), item.get("gear_slots"), json.dumps(item, ensure_ascii=False), source, page))


def ingest_sdtools(conn: sqlite3.Connection) -> None:
    # Individual JSON files are authoritative. shadowdark_master_dataset.json is
    # a denormalized bundle, so its duplicate names/bestiary/spells are not read.
    names = load_json(SDTOOLS_DIR / "ancestry_names.json")
    # Keep the source dataset available for provenance, but prefer the PDF's
    # compound names for all source ancestries.
    for ancestry, values in names.items():
        if ancestry.capitalize() in SOURCE_ANCESTRIES and not conn.execute("select 1 from ancestry_names where ancestry=? limit 1", (ancestry.capitalize(),)).fetchone():
            for value in values:
                conn.execute("INSERT OR IGNORE INTO ancestry_names(ancestry,type,name_part,source) VALUES (?,?,?,?)", (ancestry.capitalize(), "standalone", value, "SDtools"))

    for monster in load_json(SDTOOLS_DIR / "bestiary.json"):
        name = str(monster.get("name", "")).strip()
        if not name:
            continue
        try: tier = int(monster.get("level", 1))
        except (ValueError, TypeError): tier = 1
        page = int(monster.get("page", 0)) if str(monster.get("page", "")).isdigit() else 0
        conn.execute("""INSERT INTO monsters(name,ac,hp,attack,mv,alignment,tier,biome,description,source,page)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)""", (name, 10, max(1, tier), monster.get("attack", ""), monster.get("move", ""), monster.get("alignment", "N"), tier, monster.get("biome", ""), f"Tags: {monster.get('tags','')}. Effect: {monster.get('effect','')}. Trait: {monster.get('trait','')}", "SDtools/Bestiary", page))

    for spell in load_json(SDTOOLS_DIR / "spells.json"):
        if not spell.get("name"):
            continue
        conn.execute("""INSERT INTO spells(name,class_name,tier,range,duration,description,archetype,tags,source)
            VALUES (?,?,?,?,?,?,?,?,?)""", (spell["name"], spell.get("class", "Wizard"), int(spell.get("tier", 1)), spell.get("range", "Near"), spell.get("duration", "Instant"), spell.get("description", ""), spell.get("archetype", ""), ",".join(spell.get("tags", [])), "SDtools/Spells"))

    category_map = {"misc.json": "Misc", "shops.json": "Shops", "taverns.json": "Taverns", "npcs.json": "NPCs", "dungeons.json": "Dungeons", "magic_items.json": "Magic Items"}
    for filename, category in category_map.items():
        data = load_json(SDTOOLS_DIR / filename)
        for key, entries in data.items():
            if not isinstance(entries, list):
                continue
            name = f"{filename[:-5]}_{key}"
            rows = [{"roll_min": i + 1, "roll_max": i + 1, "roll_label": str(i + 1), "result_text": str(value)} for i, value in enumerate(entries)]
            add_roll_table(conn, name, f"d{len(rows)}" if rows else "d20", category, f"SDtools/{filename}", 0, rows)

    for table in load_json(SDTOOLS_DIR / "generator_tables.json"):
        entries = table.get("entries", [])
        name = f"Generator Table {table.get('table_id')}"
        rows = [{"roll_min": i + 1, "roll_max": i + 1, "roll_label": str(i + 1), "result_text": str(value)} for i, value in enumerate(entries)]
        add_roll_table(conn, name, f"d{len(rows)}" if rows else "d20", "Generator", "SDtools/Generator", 0, rows)

    master = load_json(SDTOOLS_DIR / "shadowdark_master_dataset.json")
    table_categories = {"quest_generator": "Quest Generator", "hazards_and_traps": "Hazards & Traps", "magic_item_generator": "Magic Item Generator", "npc_generator": "NPC Generator", "spell_tier_tables": "Spell Tier Tables"}
    for section, category in table_categories.items():
        for key, entries in master.get("tables", {}).get(section, {}).items():
            values = [entry.get("name", str(entry)) if isinstance(entry, dict) else str(entry) for entry in entries]
            rows = [{"roll_min": i + 1, "roll_max": i + 1, "roll_label": str(i + 1), "result_text": value} for i, value in enumerate(values)]
            add_roll_table(conn, f"{category.replace(' ', '_')}_{key}", f"d{len(rows)}", category, "SDtools/MasterDataset", 0, rows)


def ingest_rules(conn: sqlite3.Connection, classified_path: Path) -> None:
    if not classified_path.exists():
        return
    data = load_json(classified_path)
    for entry in data.get("rules", []):
        source = entry.get("source", "unknown")
        page = int(entry.get("page", 0))
        rule_text = normalize_text(entry.get("full_text") or entry.get("snippet") or "")
        if rule_text:
            conn.execute("INSERT INTO rules_catalog(topic,category,rule_text,source,page) VALUES (?,?,?,?,?)", (f"Rule p.{page}", "Core Mechanics", rule_text, source, page))


def insert_project_constraints(conn: sqlite3.Connection) -> None:
    for name, ability in FULL_CLASSES:
        conn.execute("INSERT INTO project_classes(name,ability,implementation_status,notes) VALUES (?,?,?,?)", (name, ability, "full", "Allowed by Classes_and_ancestry.txt"))
    for name, ability in RECOVERABLE_CLASSES:
        conn.execute("INSERT INTO project_classes(name,ability,implementation_status,notes) VALUES (?,?,?,?)", (name, ability, "recoverable", "Allowed by Classes_and_ancestry.txt"))
    for row in PROJECT_ANCESTRIES:
        conn.execute("INSERT INTO project_ancestries(name,source_ancestry,implementation_status,notes) VALUES (?,?,?,?)", row)


def export_bundle(conn: sqlite3.Connection, manifest_rows: list[dict[str, Any]]) -> dict[str, Any]:
    def rows(table: str, columns: str) -> list[dict[str, Any]]:
        return [dict(row) for row in conn.execute(f"select {columns} from {table}")]

    bundle = {
        "metadata": {"database": "shadowdork.db", "status": "source_manifest_backed"},
        "tables_meta": rows("tables_meta", "name,die_type,category,description,source"),
        "roll_tables": rows("roll_tables", "table_name,die_type,roll_min,roll_max,result_text,roll_label,category,source,page,metadata_json"),
        "ancestry_names": rows("ancestry_names", "ancestry,type,name_part,source,region"),
        "backgrounds": rows("backgrounds", "roll_val,name,description,source"),
        "trinkets": rows("trinkets", "ancestry,roll_min,roll_max,result_text,source"),
        "items": rows("items", "name,cost,slot_cost,category,properties,item_type,rarity,range,damage,ac,speed,hp,gear_slots,metadata_json,source,page"),
        "monsters": rows("monsters", "name,ac,hp,attack,mv,alignment,tier,biome,description,source,page"),
        "spells": rows("spells", "name,class_name,tier,range,duration,description,archetype,tags,source,page"),
        "rules_catalog": rows("rules_catalog", "topic,category,rule_text,source,page"),
        "structured_rows": rows("structured_rows", "table_name,document,extracted_page,printed_page,row_index,roll_label,raw_text,row_json"),
        "project_classes": rows("project_classes", "name,ability,implementation_status,notes"),
        "project_ancestries": rows("project_ancestries", "name,source_ancestry,implementation_status,notes"),
        "source_manifest": manifest_rows,
    }
    counts = {key: len(value) for key, value in bundle.items() if isinstance(value, list)}
    bundle["metadata"].update(counts)
    bundle["metadata"].update({
        "table_count": counts["tables_meta"],
        "roll_entries_count": counts["roll_tables"],
        "names_count": counts["ancestry_names"],
        "monsters_count": counts["monsters"],
        "spells_count": counts["spells"],
        "backgrounds_count": counts["backgrounds"],
        "trinkets_count": counts["trinkets"],
        "items_count": counts["items"],
        "rules_count": counts["rules_catalog"],
    })
    MASTER_EXPORT_PATH.write_text(json.dumps(bundle, indent=2, ensure_ascii=False), encoding="utf-8")
    MANIFEST_EXPORT_PATH.write_text(json.dumps(manifest_rows, indent=2, ensure_ascii=False), encoding="utf-8")
    DOC_MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    DOC_MANIFEST_PATH.write_text(json.dumps(manifest_rows, indent=2, ensure_ascii=False), encoding="utf-8")
    return bundle


def populate() -> None:
    if DB_PATH.exists():
        DB_PATH.unlink()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
    sd_pages = load_pdf(SHADOWDARK_PATH)
    v48_pages = load_pdf(SHADOWDARK_V48_PATH)
    pg_pages = load_pdf(PLAYERS_GUIDE_PATH)
    cs3_pages = load_pdf(CURSED_SCROLL_3_PATH)
    pdfs = {SHADOWDARK_PATH.name: sd_pages, SHADOWDARK_V48_PATH.name: v48_pages, PLAYERS_GUIDE_PATH.name: pg_pages, CURSED_SCROLL_3_PATH.name: cs3_pages}
    specs = table_specs()
    manifest_rows = insert_manifest(conn, specs, pdfs)
    ingest_named_tables(conn, specs, pdfs)
    ingest_names(conn, pg_pages, cs3_pages)
    ingest_trinkets(conn, pg_pages)
    ingest_backgrounds(conn, sd_pages, pg_pages, v48_pages)
    ingest_equipment(conn, sd_pages, pg_pages)
    ingest_sdtools(conn)
    ingest_rules(conn, ROOT / "docs" / "extracted" / "classified_data.json")
    insert_project_constraints(conn)
    conn.commit()
    bundle = export_bundle(conn, manifest_rows)
    counts = {table: conn.execute(f"select count(*) from {table}").fetchone()[0] for table in ["tables_meta", "roll_tables", "ancestry_names", "backgrounds", "trinkets", "items", "monsters", "spells", "rules_catalog", "structured_rows", "source_manifest", "project_classes", "project_ancestries"]}
    tables_manifest = {"database": "shadowdork.db", **{f"{key}_count": value for key, value in counts.items()}, "status": "source_manifest_backed", "constraints": "docs/raw_source/Classes_and_ancestry.txt"}
    TABLES_MANIFEST_PATH.write_text(json.dumps(tables_manifest, indent=2), encoding="utf-8")
    CONSTRAINTS_DOC_PATH.write_text("""# DuskUltima class and ancestry constraints\n\nThis database follows `docs/raw_source/Classes_and_ancestry.txt`.\n\n- Full classes: Fighter, Cleric, MagicUser, Thief, Bard, Monk, Necromancer, Paladin, Ranger, Seawolf, Warlock.\n- Recoverable classes: Basilisk Warrior, Ras-Godai, Roustabout, Delver, Duelist, Pit Fighter.\n- Project ancestries: Human, Dwarf, Elf, Half-Orc, Gnome, Tiefling/Deva.\n\nThe Western Reaches source provides eight ancestry name tables. They remain source-addressable, including Goblin, Half-Elf, and Halfling. For the project-facing six ancestries, Gnome aliases the Kobold source name table and Tiefling/Deva aliases Human names. Tiefling/Deva's mechanical distinction is represented by the patron-boon note, not by inventing an unsupported name table.\n\nThese aliases are deliberate and are exposed in `project_ancestries` and `project_ancestries` in the TypeScript bundle.\n""", encoding="utf-8")
    conn.close()
    print(json.dumps({"counts": counts, "bundle": str(MASTER_EXPORT_PATH)}, indent=2))


if __name__ == "__main__":
    populate()
