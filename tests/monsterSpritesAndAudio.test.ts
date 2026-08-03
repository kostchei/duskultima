import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { allMonsters } from "../src/data/monsters";

describe("Monster Sprites and Audio Assets Verification", () => {
  const monsters = allMonsters();
  const soundsDir = path.resolve(__dirname, "../public/assets/sounds/monsters");
  const manifestPath = path.resolve(soundsDir, "manifest.json");

  it("should have all 248 core monsters defined across biomes", () => {
    expect(monsters.length).toBe(248);
  });

  it("should have valid parametric sprite archetype definitions for all 248 monsters", () => {
    for (const m of monsters) {
      expect(m.id).toBeDefined();
      expect(m.name).toBeDefined();
      expect(m.archetype).toBeDefined();
      expect(m.art).toBeDefined();
      expect(m.art.body).toBeGreaterThan(0);
    }
  });

  it("should have a manifest.json file detailing all sound mappings", () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(Array.isArray(manifest)).toBe(true);
    expect(manifest.length).toBe(monsters.length);
  });

  it("should have all 3 combat .ogg sounds (aggro, attack, wounded) for every monster", () => {
    let missingSounds: string[] = [];
    for (const m of monsters) {
      const mSoundDir = path.join(soundsDir, m.id);
      const aggro = path.join(mSoundDir, "aggro.ogg");
      const attack = path.join(mSoundDir, "attack.ogg");
      const wounded = path.join(mSoundDir, "wounded.ogg");

      if (!fs.existsSync(aggro) || fs.statSync(aggro).size === 0) {
        missingSounds.push(`${m.id}/aggro.ogg`);
      }
      if (!fs.existsSync(attack) || fs.statSync(attack).size === 0) {
        missingSounds.push(`${m.id}/attack.ogg`);
      }
      if (!fs.existsSync(wounded) || fs.statSync(wounded).size === 0) {
        missingSounds.push(`${m.id}/wounded.ogg`);
      }
    }
    expect(missingSounds).toEqual([]);
  });
});
