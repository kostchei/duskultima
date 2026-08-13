import masterData from './db/master_tables.json';

export interface TableMeta {
  name: string;
  die_type: string;
  category: string;
  description: string | null;
  source: string;
}

export interface RollTableEntry {
  table_name: string;
  die_type: string;
  roll_min: number;
  roll_max: number;
  result_text: string;
  category: string;
  source: string;
}

export interface AncestryNameEntry {
  ancestry: string;
  type: 'standalone' | 'part1' | 'part2' | string;
  name_part: string;
  source: string;
}

export interface BackgroundEntry {
  roll_val: number;
  name: string;
  description: string;
  source: string;
}

export interface TrinketEntry {
  ancestry: string;
  roll_min: number;
  roll_max: number;
  result_text: string;
  source: string;
}

export interface ItemEntry {
  name: string;
  cost: string;
  slot_cost: number;
  category: string;
  properties: string;
  source: string;
  page: number;
}

export interface MonsterData {
  name: string;
  ac: number;
  hp: number;
  attack: string;
  mv: string;
  alignment: string;
  tier: number;
  biome: string;
  description: string;
  source: string;
}

export interface SpellData {
  name: string;
  class_name: string;
  tier: number;
  range: string;
  duration: string;
  description: string;
  archetype: string;
  tags: string;
  source: string;
}

export interface MasterTablesBundle {
  metadata: {
    database: string;
    table_count: number;
    roll_entries_count: number;
    monsters_count: number;
    spells_count: number;
    names_count: number;
    backgrounds_count: number;
    trinkets_count: number;
    items_count?: number;
    rules_count?: number;
  };
  tables_meta: TableMeta[];
  roll_tables: RollTableEntry[];
  ancestry_names: AncestryNameEntry[];
  backgrounds: BackgroundEntry[];
  trinkets: TrinketEntry[];
  items?: ItemEntry[];
  monsters: MonsterData[];
  spells: SpellData[];
}

export const masterTables: MasterTablesBundle = masterData as MasterTablesBundle;
