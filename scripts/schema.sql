-- Shadowdork SQL Database Schema

CREATE TABLE IF NOT EXISTS monsters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ac INTEGER NOT NULL,
    hp INTEGER NOT NULL,
    attack TEXT,
    mv TEXT,
    alignment TEXT,
    tier INTEGER DEFAULT 1,
    description TEXT,
    source TEXT NOT NULL,
    page INTEGER
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cost TEXT,
    slot_cost INTEGER DEFAULT 1,
    category TEXT,
    properties TEXT,
    source TEXT NOT NULL,
    page INTEGER
);

CREATE TABLE IF NOT EXISTS spells (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    tier INTEGER NOT NULL,
    range TEXT,
    duration TEXT,
    description TEXT,
    source TEXT NOT NULL,
    page INTEGER
);

CREATE TABLE IF NOT EXISTS roll_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    die_type TEXT NOT NULL,
    roll_min INTEGER NOT NULL,
    roll_max INTEGER NOT NULL,
    result_text TEXT NOT NULL,
    source TEXT NOT NULL,
    page INTEGER
);

CREATE TABLE IF NOT EXISTS rules_catalog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    category TEXT NOT NULL,
    rule_text TEXT NOT NULL,
    source TEXT NOT NULL,
    page INTEGER
);
