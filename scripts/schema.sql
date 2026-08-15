-- Shadowdork Master SQL Database Schema
-- Unified schema for SDtools, Shadowdark Core, and Player's Guide to Western Reaches

CREATE TABLE IF NOT EXISTS tables_meta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    die_type TEXT NOT NULL DEFAULT 'd20',
    category TEXT NOT NULL DEFAULT 'General',
    description TEXT,
    source TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roll_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    die_type TEXT NOT NULL DEFAULT 'd20',
    roll_min INTEGER NOT NULL,
    roll_max INTEGER NOT NULL,
    result_text TEXT NOT NULL,
    roll_label TEXT,
    weight INTEGER DEFAULT 1,
    category TEXT DEFAULT 'General',
    source TEXT NOT NULL,
    page INTEGER DEFAULT 0,
    metadata_json TEXT
);

CREATE TABLE IF NOT EXISTS ancestry_names (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ancestry TEXT NOT NULL,
    type TEXT NOT NULL, -- 'standalone', 'part1', 'part2', 'surname'
    name_part TEXT NOT NULL,
    source TEXT NOT NULL,
    region TEXT
);

CREATE TABLE IF NOT EXISTS backgrounds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_val INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    source TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trinkets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ancestry TEXT NOT NULL,
    roll_min INTEGER NOT NULL,
    roll_max INTEGER NOT NULL,
    result_text TEXT NOT NULL,
    source TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS monsters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ac INTEGER NOT NULL DEFAULT 10,
    hp INTEGER NOT NULL DEFAULT 1,
    attack TEXT,
    mv TEXT,
    alignment TEXT,
    tier INTEGER DEFAULT 1,
    biome TEXT,
    description TEXT,
    source TEXT NOT NULL,
    page INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS spells (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    tier INTEGER NOT NULL DEFAULT 1,
    range TEXT,
    duration TEXT,
    description TEXT,
    archetype TEXT,
    tags TEXT,
    source TEXT NOT NULL,
    page INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cost TEXT,
    slot_cost INTEGER DEFAULT 1,
    category TEXT,
    properties TEXT,
    item_type TEXT,
    rarity TEXT,
    range TEXT,
    damage TEXT,
    ac TEXT,
    speed TEXT,
    hp TEXT,
    gear_slots TEXT,
    metadata_json TEXT,
    source TEXT NOT NULL,
    page INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS rules_catalog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    category TEXT NOT NULL,
    rule_text TEXT NOT NULL,
    source TEXT NOT NULL,
    page INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS source_manifest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document TEXT NOT NULL,
    source_path TEXT NOT NULL,
    extracted_page_min INTEGER,
    extracted_page_max INTEGER,
    printed_page_min INTEGER,
    printed_page_max INTEGER,
    heading TEXT NOT NULL,
    die_expression TEXT,
    expected_rows INTEGER NOT NULL DEFAULT 0,
    schema_shape TEXT NOT NULL,
    adapter TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'captured',
    notes TEXT
);

CREATE TABLE IF NOT EXISTS structured_rows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    document TEXT NOT NULL,
    extracted_page INTEGER,
    printed_page INTEGER,
    row_index INTEGER NOT NULL,
    roll_label TEXT,
    raw_text TEXT NOT NULL,
    row_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_classes (
    name TEXT PRIMARY KEY,
    ability TEXT NOT NULL,
    implementation_status TEXT NOT NULL,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS project_ancestries (
    name TEXT PRIMARY KEY,
    source_ancestry TEXT NOT NULL,
    implementation_status TEXT NOT NULL,
    notes TEXT
);

-- Performance Indices
CREATE INDEX IF NOT EXISTS idx_roll_tables_name ON roll_tables(table_name);
CREATE INDEX IF NOT EXISTS idx_roll_tables_cat ON roll_tables(category);
CREATE INDEX IF NOT EXISTS idx_ancestry_names_anc ON ancestry_names(ancestry, type);
CREATE INDEX IF NOT EXISTS idx_trinkets_anc ON trinkets(ancestry);
CREATE INDEX IF NOT EXISTS idx_monsters_name ON monsters(name);
CREATE INDEX IF NOT EXISTS idx_monsters_tier ON monsters(tier);
CREATE INDEX IF NOT EXISTS idx_spells_name ON spells(name);
CREATE INDEX IF NOT EXISTS idx_spells_class_tier ON spells(class_name, tier);
CREATE INDEX IF NOT EXISTS idx_source_manifest_document ON source_manifest(document);
CREATE INDEX IF NOT EXISTS idx_structured_rows_table ON structured_rows(table_name);
CREATE INDEX IF NOT EXISTS idx_items_type ON items(item_type);
