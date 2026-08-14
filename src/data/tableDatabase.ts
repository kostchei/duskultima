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
  roll_label?: string | null;
  category: string;
  source: string;
}

export interface AncestryNameEntry {
  ancestry: string;
  type: 'standalone' | 'part1' | 'part2' | string;
  name_part: string;
  source: string;
  /** Optional region key for future/source datasets with regional naming tables. */
  region?: string | null;
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
  item_type?: string | null;
  rarity?: string | null;
  range?: string | null;
  damage?: string | null;
  ac?: string | null;
  speed?: string | null;
  hp?: string | null;
  gear_slots?: string | null;
  metadata_json?: string | null;
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
  page?: number;
}

export interface RuleCatalogEntry {
  topic: string;
  category: string;
  rule_text: string;
  source: string;
  page: number;
}

export interface StructuredRow {
  table_name: string;
  document: string;
  extracted_page: number;
  printed_page: number;
  row_index: number;
  roll_label?: string | null;
  raw_text: string;
  row_json: string;
}

export interface ProjectClass {
  name: string;
  ability: string;
  implementation_status: string;
  notes: string;
}

export interface ProjectAncestry {
  name: string;
  source_ancestry: string;
  implementation_status: string;
  notes: string;
}

export interface SourceManifestEntry {
  document: string;
  source_path: string;
  extracted_page_min: number;
  extracted_page_max: number;
  printed_page_min: number | null;
  printed_page_max: number | null;
  heading: string;
  die_expression: string | null;
  expected_rows: number;
  schema_shape: string;
  adapter: string;
  status: string;
  notes: string;
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
  rules_catalog?: RuleCatalogEntry[];
  structured_rows?: StructuredRow[];
  project_classes?: ProjectClass[];
  project_ancestries?: ProjectAncestry[];
  source_manifest?: SourceManifestEntry[];
}

export const masterTables: MasterTablesBundle = masterData as MasterTablesBundle;
