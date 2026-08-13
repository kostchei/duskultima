import {
  masterTables,
  TableMeta,
  RollTableEntry,
  AncestryNameEntry,
  BackgroundEntry,
  TrinketEntry,
  ItemEntry,
  MonsterData,
  SpellData,
  RuleCatalogEntry,
  StructuredRow,
  ProjectClass,
  ProjectAncestry,
  SourceManifestEntry
} from '../data/tableDatabase';

const ANCESTRY_ALIASES: Record<string, string> = {
  gnome: 'Kobold',
  'tiefling/deva': 'Human',
  tiefling: 'Human',
  deva: 'Human'
};

const CLASS_TALENT_PAGES: Record<string, number> = {
  cleric: 17, fighter: 19, thief: 21, wizard: 24,
  magicuser: 24, bard: 34, 'basilisk warrior': 37,
  delver: 38, 'desert rider': 41, duelist: 42,
  'green knight': 44, paladin: 55, 'pit fighter': 57,
  ranger: 58, 'ras-godai': 61, roustabout: 63,
  seawolf: 64, seer: 66, warlock: 69, witch: 71,
  wyrdling: 72, necromancer: 53
};

/**
 * List all available roll tables, optionally filtered by category or source.
 */
export function listTables(category?: string, source?: string): TableMeta[] {
  return masterTables.tables_meta.filter((t) => {
    if (category && (t.category || '').toLowerCase() !== category.toLowerCase()) return false;
    if (source && !(t.source || '').toLowerCase().includes(source.toLowerCase())) return false;
    return true;
  });
}

/**
 * Get all entries for a specified table name.
 */
export function getTableEntries(tableName: string): RollTableEntry[] {
  const normalized = tableName.toLowerCase().trim();
  return masterTables.roll_tables.filter(
    (e) => (e.table_name || '').toLowerCase().trim() === normalized
  );
}

/**
 * Roll on a named table or retrieve the entry for a specific die roll.
 */
export function rollOnTable(
  tableName: string,
  fixedRoll?: number
): { roll: number; result: string; entry: RollTableEntry | null } {
  const entries = getTableEntries(tableName);
  if (!entries || entries.length === 0) {
    return { roll: 0, result: `Table "${tableName}" not found`, entry: null };
  }

  const maxRoll = Math.max(...entries.map((e) => e.roll_max));
  const roll = fixedRoll ?? Math.floor(Math.random() * maxRoll) + 1;

  const match = entries.find((e) => roll >= e.roll_min && roll <= e.roll_max) || entries[0];
  return {
    roll,
    result: match ? match.result_text : '',
    entry: match || null
  };
}

/**
 * Generate a lore-accurate name for a given ancestry.
 * Supports both compound 2-part name generators (Part 1 + Part 2) and standalone name lists.
 */
export function generateAncestryName(ancestry: string): { name: string; ancestry: string; method: string } {
  const ancNorm = ancestry.toLowerCase().trim();
  const sourceAncestry = ANCESTRY_ALIASES[ancNorm] || ancestry;
  const sourceNorm = sourceAncestry.toLowerCase().trim();
  
  const part1s = masterTables.ancestry_names.filter(
    (n) => (n.ancestry || '').toLowerCase() === sourceNorm && n.type === 'part1'
  );
  const part2s = masterTables.ancestry_names.filter(
    (n) => (n.ancestry || '').toLowerCase() === sourceNorm && n.type === 'part2'
  );

  if (part1s.length > 0 && part2s.length > 0) {
    const p1Item = part1s[Math.floor(Math.random() * part1s.length)];
    const p2Item = part2s[Math.floor(Math.random() * part2s.length)];
    const p1 = p1Item ? p1Item.name_part : 'Den';
    const p2 = p2Item ? p2Item.name_part : 'dak';
    const cleanP1 = p1.endsWith('-') ? p1.slice(0, -1) : p1;
    const cleanP2 = p2.startsWith('-') ? p2.slice(1) : p2;
    const combined = cleanP1 + cleanP2;
    const formatted = combined.charAt(0).toUpperCase() + combined.slice(1);
    return { name: formatted, ancestry, method: sourceAncestry === ancestry ? '2-part compound generator' : `2-part compound generator (${sourceAncestry} source alias)` };
  }

  const standalones = masterTables.ancestry_names.filter(
    (n) => (n.ancestry || '').toLowerCase() === sourceNorm || sourceNorm.includes((n.ancestry || '').toLowerCase())
  );

  if (standalones.length > 0) {
    const chosenItem = standalones[Math.floor(Math.random() * standalones.length)];
    const chosen = chosenItem ? chosenItem.name_part : 'Thorin';
    return { name: chosen, ancestry, method: sourceAncestry === ancestry ? 'standalone name list' : `standalone name list (${sourceAncestry} source alias)` };
  }

  const fallbackHumans = masterTables.ancestry_names.filter((n) => (n.ancestry || '').toLowerCase() === 'human');
  const fallbackItem = fallbackHumans.length > 0 ? fallbackHumans[Math.floor(Math.random() * fallbackHumans.length)] : null;
  const fallback = fallbackItem ? fallbackItem.name_part : 'Thorin';
  return { name: fallback, ancestry, method: 'default fallback' };
}

/**
 * Roll or fetch a character background.
 */
export function getBackground(fixedRoll?: number): BackgroundEntry {
  const bgs = masterTables.backgrounds;
  const fallbackBg: BackgroundEntry = { roll_val: 1, name: 'Adventurer', description: 'Seeking fortune and glory.', source: 'Fallback' };
  if (!bgs || bgs.length === 0) {
    return fallbackBg;
  }

  const validRolls = bgs.map((b) => b.roll_val).filter((roll) => roll >= 1 && roll <= 100);
  const roll = fixedRoll === 0 ? 100 : (fixedRoll ?? validRolls[Math.floor(Math.random() * validRolls.length)] ?? 1);
  const match = bgs.find((b) => b.roll_val === roll) || bgs[Math.floor(Math.random() * bgs.length)];
  return match || fallbackBg;
}

/**
 * Roll or fetch an ancestry trinket.
 */
export function getTrinket(ancestry: string, fixedRoll?: number): TrinketEntry {
  const ancNorm = ancestry.toLowerCase().trim();
  let matches = masterTables.trinkets.filter((t) => (t.ancestry || '').toLowerCase() === ancNorm);
  const fallbackTrinket: TrinketEntry = { ancestry: 'Generic', roll_min: 1, roll_max: 100, result_text: 'Iron key', source: 'Fallback' };

  if (matches.length === 0) {
    matches = masterTables.trinkets;
  }

  if (matches.length === 0) {
    return fallbackTrinket;
  }

  const roll = fixedRoll ?? Math.floor(Math.random() * 100) + 1;
  const item = matches.find((t) => roll >= t.roll_min && roll <= t.roll_max) || matches[0];
  return item || fallbackTrinket;
}

/**
 * Query gear, weapons, armor, poisons, and mounts from the items database.
 */
export function getItems(category?: string): ItemEntry[] {
  const items = masterTables.items || [];
  if (!category) return items;
  const catNorm = category.toLowerCase().trim();
  return items.filter((i) => (i.category || '').toLowerCase().includes(catNorm));
}

/**
 * Find an item by exact or partial name.
 */
export function getItemByName(name: string): ItemEntry | null {
  const items = masterTables.items || [];
  const nNorm = name.toLowerCase().trim();
  return items.find((i) => (i.name || '').toLowerCase() === nNorm) || items.find((i) => (i.name || '').toLowerCase().includes(nNorm)) || null;
}

/**
 * Find class talents by class name or keyword.
 */
export function getTalents(className: string, fixedRoll?: number): { roll: number; talent: string } {
  const cNorm = className.toLowerCase().trim();
  const page = CLASS_TALENT_PAGES[cNorm];
  const talentTables = masterTables.roll_tables.filter(
    (t) => t.category === 'Class Talents' && (page === undefined || (t.table_name || '').toLowerCase().includes(`p.${page}`))
  );

  if (talentTables.length === 0) {
    return { roll: 7, talent: '+1 to melee or ranged attack rolls' };
  }

  const roll = fixedRoll ?? Math.floor(Math.random() * 11) + 2;
  const match = talentTables.find((t) => roll >= t.roll_min && roll <= t.roll_max) || talentTables[0];
  return { roll, talent: match ? match.result_text : '+1 to melee or ranged attack rolls' };
}

/**
 * Roll on level treasure tables (Tier 0-1, 2-3, 4-5, 6-7, 8-9, 10+).
 */
export function getTreasure(tier: number, fixedRoll?: number): { roll: number; result: string } {
  const treasureTables = masterTables.roll_tables.filter((t) => t.category === 'Treasure');
  if (treasureTables.length === 0) {
    return { roll: 50, result: '10 gp and a polished silver ring (25 gp)' };
  }

  const roll = fixedRoll === 0 ? 100 : (fixedRoll ?? Math.floor(Math.random() * 100) + 1);
  const match = treasureTables.find((t) => roll >= t.roll_min && roll <= t.roll_max) || treasureTables[0];
  return { roll, result: match ? match.result_text : '10 gp' };
}

/** Search the exported rules catalog by topic, category, source, or text. */
export function getRules(query?: string | { topic?: string; category?: string; source?: string }): RuleCatalogEntry[] {
  const rules = masterTables.rules_catalog || [];
  if (!query) return rules;
  if (typeof query === 'string') {
    const q = query.toLowerCase();
    return rules.filter((r) => [r.topic, r.category, r.rule_text, r.source].some((v) => (v || '').toLowerCase().includes(q)));
  }
  return rules.filter((r) => {
    if (query.topic && !r.topic.toLowerCase().includes(query.topic.toLowerCase())) return false;
    if (query.category && !r.category.toLowerCase().includes(query.category.toLowerCase())) return false;
    if (query.source && !r.source.toLowerCase().includes(query.source.toLowerCase())) return false;
    return true;
  });
}

/** Query structured equipment fields without losing the original properties. */
export function getEquipment(query?: string | { category?: string; name?: string; rarity?: string }): ItemEntry[] {
  const items = masterTables.items || [];
  if (!query) return items;
  if (typeof query === 'string') {
    const q = query.toLowerCase();
    return items.filter((i) => [i.name, i.category, i.properties, i.item_type, i.rarity].some((v) => (v || '').toLowerCase().includes(q)));
  }
  return items.filter((i) => {
    if (query.category && !(i.category || '').toLowerCase().includes(query.category.toLowerCase())) return false;
    if (query.name && !(i.name || '').toLowerCase().includes(query.name.toLowerCase())) return false;
    if (query.rarity && !(i.rarity || '').toLowerCase().includes(query.rarity.toLowerCase())) return false;
    return true;
  });
}

export function getStructuredRows(tableName?: string): StructuredRow[] {
  const rows = masterTables.structured_rows || [];
  if (!tableName) return rows;
  return rows.filter((row) => row.table_name.toLowerCase().includes(tableName.toLowerCase()));
}

export function getProjectClasses(status?: string): ProjectClass[] {
  const classes = masterTables.project_classes || [];
  return status ? classes.filter((c) => c.implementation_status === status) : classes;
}

export function getProjectAncestries(): ProjectAncestry[] {
  return masterTables.project_ancestries || [];
}

export function getSourceManifest(): SourceManifestEntry[] {
  return masterTables.source_manifest || [];
}

/**
 * Find monsters by name, tier, or biome.
 */
export function getMonster(query: string | number): MonsterData[] {
  if (typeof query === 'number') {
    return masterTables.monsters.filter((m) => m.tier === query);
  }
  const qLower = query.toLowerCase().trim();
  return masterTables.monsters.filter(
    (m) =>
      (m.name || '').toLowerCase().includes(qLower) ||
      (m.biome || '').toLowerCase().includes(qLower) ||
      (m.alignment || '').toLowerCase() === qLower
  );
}

/**
 * Find spells by name, class, or tier.
 */
export function getSpell(query: string | { name?: string; class_name?: string; tier?: number }): SpellData[] {
  if (typeof query === 'string') {
    const qLower = query.toLowerCase().trim();
    return masterTables.spells.filter(
      (s) => (s.name || '').toLowerCase().includes(qLower) || (s.class_name || '').toLowerCase().includes(qLower)
    );
  }

  return masterTables.spells.filter((s) => {
    if (query.name && !(s.name || '').toLowerCase().includes(query.name.toLowerCase())) return false;
    if (query.class_name && !(s.class_name || '').toLowerCase().includes(query.class_name.toLowerCase())) return false;
    if (query.tier !== undefined && s.tier !== query.tier) return false;
    return true;
  });
}

/**
 * Universal search across all tables, monsters, spells, trinkets, backgrounds, and items.
 */
export function searchDatabase(query: string): {
  tables: TableMeta[];
  monsters: MonsterData[];
  spells: SpellData[];
  backgrounds: BackgroundEntry[];
  trinkets: TrinketEntry[];
  items: ItemEntry[];
  roll_entries: RollTableEntry[];
  rules: RuleCatalogEntry[];
} {
  const q = query.toLowerCase().trim();
  const items = masterTables.items || [];
  return {
    tables: masterTables.tables_meta.filter((t) => (t.name || '').toLowerCase().includes(q) || (t.category || '').toLowerCase().includes(q)),
    monsters: masterTables.monsters.filter((m) => (m.name || '').toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q)),
    spells: masterTables.spells.filter((s) => (s.name || '').toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q)),
    backgrounds: masterTables.backgrounds.filter((b) => (b.name || '').toLowerCase().includes(q) || (b.description || '').toLowerCase().includes(q)),
    trinkets: masterTables.trinkets.filter((t) => (t.result_text || '').toLowerCase().includes(q)),
    items: items.filter((i) => (i.name || '').toLowerCase().includes(q) || (i.category || '').toLowerCase().includes(q)),
    roll_entries: masterTables.roll_tables.filter((r) => (r.result_text || '').toLowerCase().includes(q)).slice(0, 20)
    ,rules: getRules(query).slice(0, 20)
  };
}
