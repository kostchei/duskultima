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
    weight INTEGER DEFAULT 1,
    category TEXT DEFAULT 'General',
    source TEXT NOT NULL,
    page INTEGER DEFAULT 0,
    metadata_json TEXT
);

CREATE TABLE IF NOT EXISTS ancestry_names (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ancestry TEXT NOT NULL,
    type TEXT NOT NULL, -- 'standalone', 'part1', 'part2'
    name_part TEXT NOT NULL,
    source TEXT NOT NULL
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

-- Performance Indices
CREATE INDEX IF NOT EXISTS idx_roll_tables_name ON roll_tables(table_name);
CREATE INDEX IF NOT EXISTS idx_roll_tables_cat ON roll_tables(category);
CREATE INDEX IF NOT EXISTS idx_ancestry_names_anc ON ancestry_names(ancestry, type);
CREATE INDEX IF NOT EXISTS idx_trinkets_anc ON trinkets(ancestry);
CREATE INDEX IF NOT EXISTS idx_monsters_name ON monsters(name);
CREATE INDEX IF NOT EXISTS idx_monsters_tier ON monsters(tier);
CREATE INDEX IF NOT EXISTS idx_spells_name ON spells(name);
CREATE INDEX IF NOT EXISTS idx_spells_class_tier ON spells(class_name, tier);
