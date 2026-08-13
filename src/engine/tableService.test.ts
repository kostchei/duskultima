import { describe, it, expect } from 'vitest';
import {
  listTables,
  getTableEntries,
  rollOnTable,
  generateAncestryName,
  getBackground,
  getTrinket,
  getItems,
  getItemByName,
  getTalents,
  getTreasure,
  getRules,
  getEquipment,
  getProjectClasses,
  getProjectAncestries,
  getSourceManifest,
  getMonster,
  getSpell,
  searchDatabase
} from './tableService';

describe('TableService API & Coverage Fixes', () => {
  it('lists cataloged tables metadata', () => {
    const tables = listTables();
    expect(tables.length).toBeGreaterThan(200);
  });

  it('generates lore names for all 8 ancestries', () => {
    const ancestries = ['Dwarf', 'Elf', 'Goblin', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Kobold'];
    ancestries.forEach((anc) => {
      const res = generateAncestryName(anc);
      expect(res.name).toBeTruthy();
      expect(res.ancestry).toBe(anc);
    });
  });

  it('honors project ancestry aliases from Classes_and_ancestry.txt', () => {
    expect(generateAncestryName('Gnome').name).toBeTruthy();
    expect(generateAncestryName('Gnome').method).toContain('Kobold source alias');
    expect(generateAncestryName('Tiefling/Deva').name).toBeTruthy();
    expect(getProjectAncestries()).toHaveLength(6);
  });

  it('rolls backgrounds from expanded 96 background pool', () => {
    const bg1 = getBackground(1);
    expect(bg1).toBeTruthy();
    expect(bg1.name).toBeTruthy();

    const bg50 = getBackground(50);
    expect(bg50).toBeTruthy();
  });

  it('verifies page-bounded trinkets for all 8 ancestries', () => {
    const ancestries = ['Dwarf', 'Elf', 'Goblin', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Kobold'];
    ancestries.forEach((anc) => {
      const trinket = getTrinket(anc, 10);
      expect(trinket).toBeTruthy();
      expect(trinket.result_text).toBeTruthy();
    });
  });

  it('queries equipment, weapons, and armor items', () => {
    const allItems = getItems();
    expect(allItems.length).toBeGreaterThanOrEqual(40);

    const weapons = getItems('Weapon');
    expect(weapons.length).toBeGreaterThan(5);

    const dagger = getItemByName('Dagger');
    expect(dagger).toBeTruthy();
    expect(dagger?.cost).toBe('1 gp');

    const chainmail = getItemByName('Chainmail');
    expect(chainmail).toBeTruthy();
  });

  it('queries class talent tables', () => {
    const fighterTalent = getTalents('Fighter', 7);
    expect(fighterTalent).toBeTruthy();
    expect(fighterTalent.talent).toBeTruthy();
  });

  it('queries level treasure tables', () => {
    const treasure = getTreasure(1, 50);
    expect(treasure).toBeTruthy();
    expect(treasure.result).toBeTruthy();
  });

  it('queries rules, structured equipment, classes, and source manifest', () => {
    expect(getRules('light').length).toBeGreaterThan(0);
    expect(getEquipment({ category: 'Boat' }).length).toBeGreaterThanOrEqual(8);
    expect(getProjectClasses('full')).toHaveLength(11);
    expect(getProjectClasses('recoverable')).toHaveLength(6);
    expect(getSourceManifest().length).toBeGreaterThanOrEqual(100);
  });

  it('queries monsters by name and tier', () => {
    const aboleths = getMonster('Aboleth');
    expect(aboleths.length).toBeGreaterThan(0);
    expect(aboleths[0]?.name).toContain('ABOLETH');

    const tier1s = getMonster(1);
    expect(tier1s.length).toBeGreaterThan(0);
  });

  it('queries spells', () => {
    const magicMissile = getSpell('Magic Missile');
    expect(magicMissile.length).toBeGreaterThan(0);
  });

  it('performs universal database search', () => {
    const searchRes = searchDatabase('sword');
    expect(searchRes.monsters.length + searchRes.trinkets.length + searchRes.roll_entries.length + searchRes.items.length).toBeGreaterThan(0);
  });
});
