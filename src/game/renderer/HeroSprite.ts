/**
 * Parametric hero sprite renderer for DuskUltima party members.
 * Draws a small procedural pixel-art humanoid per character: class fixes the
 * headgear silhouette and accent palette, actual worn armor (or lack of it)
 * drives the body/leg silhouette and material color, and the actual wielded
 * weapon (falling back to a class-flavored default when unarmed) draws the
 * held prop. Sits directly on the floor tile with no outline pass, matching
 * the flat classic-CRPG look (Ultima V party icons) rather than the inked
 * silhouette treatment used for monsters.
 */

import type { Character, ClassName } from "../../engine/character";
import type { ArmorVisual, WeaponVisual } from "../../engine/inventory";
import { BIOME_PALETTES, type BiomePalette } from "./TileSet";
import type { MonsterBiome } from "../../engine/monster";

/** Drawn in a logical 32x32 grid, supersampled 2x onto the physical canvas — see TileSet.ts. */
const RENDER_SCALE = 2;
export const TILE_SIZE = 32 * RENDER_SCALE;

type Build = "slim" | "normal" | "heavy";
type ArmorTier = "robe" | "leather" | "chain" | "plate";

type Headgear =
  | "bare"
  | "coif"
  | "mitre"
  | "pointy-hat"
  | "leather-hood"
  | "bucket-helm"
  | "horned-helm"
  | "headband";

type Weapon = "sword" | "dagger" | "mace" | "staff" | "spear" | "bow" | "wand" | "axe" | "fists";

interface HeroStyle {
  accent: number;
  trim: number;
  skin: number;
  build: Build;
  headgear: Headgear;
  defaultWeapon: Weapon;
}

function hex(n: number): string {
  return `#${(n & 0xffffff).toString(16).padStart(6, "0")}`;
}

const SKIN_LIGHT = 0xe0b088;
const SKIN_DARK = 0x8a5a3c;

export const CLASS_STYLE: Record<ClassName, HeroStyle> = {
  fighter: { accent: 0xc0c0c0, trim: 0x8a1c1c, skin: SKIN_LIGHT, build: "heavy", headgear: "coif", defaultWeapon: "sword" },
  cleric: { accent: 0xf1c40f, trim: 0xffffff, skin: SKIN_LIGHT, build: "normal", headgear: "mitre", defaultWeapon: "mace" },
  "magic-user": { accent: 0xb388ff, trim: 0x2c1450, skin: SKIN_LIGHT, build: "normal", headgear: "pointy-hat", defaultWeapon: "staff" },
  thief: { accent: 0x2c2c2c, trim: 0x1f5c3a, skin: SKIN_DARK, build: "slim", headgear: "leather-hood", defaultWeapon: "dagger" },
  bard: { accent: 0xf2c760, trim: 0xb03050, skin: SKIN_LIGHT, build: "slim", headgear: "leather-hood", defaultWeapon: "dagger" },
  monk: { accent: 0xf3e3b3, trim: 0xd97b29, skin: SKIN_DARK, build: "normal", headgear: "headband", defaultWeapon: "fists" },
  necromancer: { accent: 0x5fd97a, trim: 0x1a1a24, skin: 0x6b7a6b, build: "normal", headgear: "pointy-hat", defaultWeapon: "wand" },
  paladin: { accent: 0xf1c40f, trim: 0x8a1c1c, skin: SKIN_LIGHT, build: "heavy", headgear: "bucket-helm", defaultWeapon: "sword" },
  ranger: { accent: 0x6b4a2c, trim: 0x2e4a24, skin: SKIN_DARK, build: "normal", headgear: "leather-hood", defaultWeapon: "bow" },
  seawolf: { accent: 0x9fb8c4, trim: 0x25526b, skin: SKIN_LIGHT, build: "heavy", headgear: "horned-helm", defaultWeapon: "axe" },
  "sea-wolf": { accent: 0x9fb8c4, trim: 0x25526b, skin: SKIN_LIGHT, build: "heavy", headgear: "horned-helm", defaultWeapon: "axe" },
  warlock: { accent: 0x7a2ca0, trim: 0x120a1a, skin: 0x9c8ab0, build: "normal", headgear: "headband", defaultWeapon: "wand" },
  "basilisk-warrior": { accent: 0xc4d24a, trim: 0x5c6b1c, skin: SKIN_DARK, build: "heavy", headgear: "horned-helm", defaultWeapon: "spear" },
  "ras-godai": { accent: 0xb03020, trim: 0xc48a3a, skin: SKIN_DARK, build: "slim", headgear: "leather-hood", defaultWeapon: "sword" },
  roustabout: { accent: 0xa06a2c, trim: 0x6b4a2c, skin: SKIN_DARK, build: "heavy", headgear: "bare", defaultWeapon: "axe" },
  delver: { accent: 0xe0a010, trim: 0x5a5a5a, skin: SKIN_LIGHT, build: "normal", headgear: "leather-hood", defaultWeapon: "dagger" },
  duelist: { accent: 0x1a1a1a, trim: 0x8a1030, skin: SKIN_LIGHT, build: "slim", headgear: "leather-hood", defaultWeapon: "sword" },
  "pit-fighter": { accent: 0xc0a030, trim: 0x7a4a1c, skin: SKIN_DARK, build: "heavy", headgear: "bare", defaultWeapon: "axe" },
  priest: { accent: 0xf1c40f, trim: 0x3060a0, skin: SKIN_LIGHT, build: "normal", headgear: "mitre", defaultWeapon: "mace" },
  wizard: { accent: 0x8e44ad, trim: 0x2c1450, skin: SKIN_LIGHT, build: "normal", headgear: "pointy-hat", defaultWeapon: "staff" },
  witch: { accent: 0x2e7a3a, trim: 0x1c1c1c, skin: 0x9c8ab0, build: "slim", headgear: "pointy-hat", defaultWeapon: "wand" },
  seer: { accent: 0x4ac0d0, trim: 0xc8d0e0, skin: SKIN_LIGHT, build: "normal", headgear: "mitre", defaultWeapon: "staff" },
  "desert-rider": { accent: 0xb0501c, trim: 0xd4a45a, skin: SKIN_DARK, build: "normal", headgear: "leather-hood", defaultWeapon: "spear" },
  "kyzian-archer": { accent: 0xd4af37, trim: 0x1c7a6b, skin: SKIN_DARK, build: "slim", headgear: "leather-hood", defaultWeapon: "bow" },
};

const METAL_ARMOR_COLORS: Record<"chain" | "plate", { body: string; shade: string }> = {
  chain: { body: "#7a828c", shade: "#565c64" },
  plate: { body: "#d4d8e0", shade: "#8a8f9a" },
};

function armorTierFromVisual(visual: ArmorVisual | undefined): ArmorTier {
  switch (visual) {
    case "plate":
      return "plate";
    case "chain":
    case "mithral":
      return "chain";
    case "leather":
    case "padded":
      return "leather";
    default:
      return "robe";
  }
}

function weaponFromVisual(visual: WeaponVisual | undefined, fallback: Weapon): Weapon {
  switch (visual) {
    case "longsword":
      return "sword";
    case "dagger":
      return "dagger";
    case "mace":
      return "mace";
    case "staff":
      return "staff";
    case "spear":
    case "javelin":
      return "spear";
    default:
      return fallback;
  }
}

export class HeroSpriteDrawer {
  private cache = new Map<string, HTMLCanvasElement>();

  public getHeroTileCanvas(character: Character, biome: MonsterBiome = "diablerie"): HTMLCanvasElement {
    const armorTier = armorTierFromVisual(character.wornArmor?.armorVisual);
    const style = CLASS_STYLE[character.className] ?? CLASS_STYLE.fighter;
    const weapon = weaponFromVisual(character.wieldedWeapon?.weaponVisual, style.defaultWeapon);
    const key = `${character.className}_${character.method}_${armorTier}_${weapon}_${biome}`;
    const cached = this.cache.get(key);
    if (cached) return cached;

    const p = BIOME_PALETTES[biome] || BIOME_PALETTES["diablerie"];
    const cvs = document.createElement("canvas");
    cvs.width = TILE_SIZE;
    cvs.height = TILE_SIZE;
    const ctx = cvs.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.scale(RENDER_SCALE, RENDER_SCALE);

    ctx.fillStyle = p.floorBg;
    ctx.fillRect(0, 0, 32, 32);

    this.drawHero(ctx, style, armorTier, weapon);
    this.drawMethodBadge(ctx, character.method);

    this.cache.set(key, cvs);
    return cvs;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  /** Small corner dot marking iron-man (blood red) vs unearthed-arcana (chrome cyan) stat generation. */
  private drawMethodBadge(ctx: CanvasRenderingContext2D, method: Character["method"]): void {
    ctx.fillStyle = method === "iron-man" ? "#c1440e" : "#34c4f2";
    ctx.fillRect(27, 2, 3, 3);
  }

  private drawHero(ctx: CanvasRenderingContext2D, style: HeroStyle, armorTier: ArmorTier, weapon: Weapon): void {
    const cx = 16;
    const accentCol = hex(style.accent);
    const trimCol = hex(style.trim);
    const skinCol = hex(style.skin);

    const headSize = style.build === "heavy" ? 9 : style.build === "slim" ? 6 : 7;
    const torsoW = style.build === "heavy" ? 16 : style.build === "slim" ? 10 : 13;
    const headY = 3;
    const torsoY = headY + headSize - 1;
    const torsoH = armorTier === "robe" ? 20 : 13;
    const legY = torsoY + torsoH;
    const legH = Math.max(2, 30 - legY);

    const metal = armorTier === "chain" || armorTier === "plate" ? METAL_ARMOR_COLORS[armorTier] : null;
    const bodyCol = metal ? metal.body : trimCol;
    const shadeCol = metal ? metal.shade : accentCol;

    // Legs
    if (armorTier !== "robe") {
      ctx.fillStyle = bodyCol;
      ctx.fillRect(cx - Math.floor(torsoW * 0.32), legY, Math.floor(torsoW * 0.28), legH);
      ctx.fillRect(cx + Math.floor(torsoW * 0.04), legY, Math.floor(torsoW * 0.28), legH);
    }

    // Torso / robe
    ctx.fillStyle = bodyCol;
    if (armorTier === "robe") {
      ctx.beginPath();
      ctx.moveTo(cx - Math.floor(torsoW * 0.4), torsoY);
      ctx.lineTo(cx + Math.floor(torsoW * 0.4), torsoY);
      ctx.lineTo(cx + Math.floor(torsoW * 0.65), legY + legH);
      ctx.lineTo(cx - Math.floor(torsoW * 0.65), legY + legH);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(cx - Math.floor(torsoW * 0.5), torsoY, torsoW, torsoH);
    }

    this.drawArmorTexture(ctx, armorTier, cx, torsoY, torsoH, torsoW, shadeCol, accentCol);

    // Belt
    ctx.fillStyle = accentCol;
    ctx.fillRect(cx - Math.floor(torsoW * 0.45), torsoY + Math.floor(torsoH * 0.5), Math.floor(torsoW * 0.9), 2);

    // Arms
    ctx.fillStyle = bodyCol;
    const armW = 3;
    ctx.fillRect(cx - Math.floor(torsoW * 0.5) - armW + 1, torsoY + 1, armW, Math.floor(torsoH * 0.7));
    ctx.fillRect(cx + Math.floor(torsoW * 0.5) - 1, torsoY + 1, armW, Math.floor(torsoH * 0.7));

    // Head + face
    ctx.fillStyle = skinCol;
    ctx.fillRect(cx - Math.floor(headSize / 2), headY, headSize, headSize);
    ctx.fillStyle = "#101014";
    ctx.fillRect(cx - 2, headY + Math.floor(headSize * 0.45), 1.5, 1.5);
    ctx.fillRect(cx + 1, headY + Math.floor(headSize * 0.45), 1.5, 1.5);

    this.drawHeadgear(ctx, style.headgear, cx, headY, headSize, trimCol, accentCol);
    this.drawWeapon(ctx, weapon, cx, torsoY, torsoH, torsoW, accentCol, trimCol);
  }

  /** Tier-specific texture layered on top of the base torso/leg silhouette. */
  private drawArmorTexture(
    ctx: CanvasRenderingContext2D,
    tier: ArmorTier,
    cx: number,
    torsoY: number,
    torsoH: number,
    torsoW: number,
    shade: string,
    accent: string
  ): void {
    const left = cx - Math.floor(torsoW * 0.5);
    switch (tier) {
      case "robe":
        break;
      case "leather":
        // Pauldrons
        ctx.fillStyle = shade;
        ctx.fillRect(left - 1, torsoY, 4, 4);
        ctx.fillRect(left + torsoW - 3, torsoY, 4, 4);
        break;
      case "chain":
        // Mail ring texture
        ctx.fillStyle = shade;
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            ctx.fillRect(left + 2 + col * 4, torsoY + 2 + row * 4, 1.5, 1.5);
          }
        }
        ctx.fillRect(left - 1, torsoY, 4, 4);
        ctx.fillRect(left + torsoW - 3, torsoY, 4, 4);
        break;
      case "plate":
        // Segment seams
        ctx.fillStyle = shade;
        for (let row = 1; row < 3; row++) {
          ctx.fillRect(left + 1, torsoY + row * Math.floor(torsoH / 3), torsoW - 2, 1.5);
        }
        // Large shoulder pauldron
        ctx.fillStyle = accent;
        ctx.fillRect(left - 2, torsoY - 1, 5, 5);
        ctx.fillRect(left + torsoW - 3, torsoY - 1, 5, 5);
        break;
    }
  }

  private drawHeadgear(
    ctx: CanvasRenderingContext2D,
    type: Headgear,
    cx: number,
    headY: number,
    headSize: number,
    trim: string,
    accent: string
  ): void {
    const top = headY - 1;
    switch (type) {
      case "bare":
        break;
      case "coif":
        ctx.fillStyle = trim;
        ctx.fillRect(cx - Math.floor(headSize / 2) - 1, top - 1, headSize + 2, 3);
        ctx.fillRect(cx - Math.floor(headSize / 2) - 1, top + 1, 2, headSize - 1);
        ctx.fillRect(cx + Math.floor(headSize / 2) - 1, top + 1, 2, headSize - 1);
        break;
      case "mitre":
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.moveTo(cx, top - 6);
        ctx.lineTo(cx - 3, top + 1);
        ctx.lineTo(cx + 3, top + 1);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = trim;
        ctx.fillRect(cx - Math.floor(headSize / 2) - 1, top, headSize + 2, 2);
        break;
      case "pointy-hat":
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.moveTo(cx, top - 9);
        ctx.lineTo(cx - Math.floor(headSize / 2) - 3, top + 1);
        ctx.lineTo(cx + Math.floor(headSize / 2) + 3, top + 1);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = trim;
        ctx.fillRect(cx - Math.floor(headSize / 2) - 2, top, headSize + 4, 2);
        break;
      case "leather-hood":
        ctx.fillStyle = trim;
        ctx.fillRect(cx - Math.floor(headSize / 2) - 1, top - 1, headSize + 2, 3);
        ctx.fillRect(cx - Math.floor(headSize / 2) - 2, top + 2, 2, headSize - 2);
        ctx.fillRect(cx + Math.floor(headSize / 2), top + 2, 2, headSize - 2);
        break;
      case "bucket-helm":
        ctx.fillStyle = trim;
        ctx.fillRect(cx - Math.floor(headSize / 2) - 1, top - 2, headSize + 2, headSize + 1);
        ctx.fillStyle = "#101014";
        ctx.fillRect(cx - 3, headY + Math.floor(headSize * 0.35), headSize - 3, 1.5);
        break;
      case "horned-helm":
        ctx.fillStyle = trim;
        ctx.fillRect(cx - Math.floor(headSize / 2) - 1, top, headSize + 2, 4);
        ctx.fillStyle = "#e8e4d8";
        ctx.fillRect(cx - Math.floor(headSize / 2) - 3, top - 3, 2, 5);
        ctx.fillRect(cx + Math.floor(headSize / 2) + 1, top - 3, 2, 5);
        break;
      case "headband":
        ctx.fillStyle = accent;
        ctx.fillRect(cx - Math.floor(headSize / 2), top + 2, headSize, 2);
        break;
    }
  }

  private drawWeapon(
    ctx: CanvasRenderingContext2D,
    type: Weapon,
    cx: number,
    torsoY: number,
    torsoH: number,
    torsoW: number,
    accent: string,
    trim: string
  ): void {
    const wx = cx + Math.floor(torsoW * 0.5) + 1;
    switch (type) {
      case "sword":
        ctx.fillStyle = "#d0d0d8";
        ctx.fillRect(wx, torsoY - 4, 2, torsoH + 4);
        ctx.fillStyle = trim;
        ctx.fillRect(wx - 1, torsoY + torsoH - 5, 4, 2);
        break;
      case "dagger":
        ctx.fillStyle = "#d0d0d8";
        ctx.fillRect(wx, torsoY + 2, 2, 6);
        ctx.fillStyle = trim;
        ctx.fillRect(wx - 1, torsoY + 7, 4, 1.5);
        break;
      case "mace":
        ctx.fillStyle = trim;
        ctx.fillRect(wx, torsoY - 2, 1.5, torsoH);
        ctx.fillStyle = accent;
        ctx.fillRect(wx - 1.5, torsoY - 5, 4.5, 4.5);
        break;
      case "staff":
        ctx.fillStyle = trim;
        ctx.fillRect(wx, torsoY - 8, 2, torsoH + 8);
        ctx.fillStyle = accent;
        ctx.fillRect(wx - 1, torsoY - 10, 4, 4);
        break;
      case "spear":
        ctx.fillStyle = trim;
        ctx.fillRect(wx, torsoY - 9, 1.5, torsoH + 9);
        ctx.fillStyle = "#c0c0c8";
        ctx.beginPath();
        ctx.moveTo(wx + 0.75, torsoY - 12);
        ctx.lineTo(wx + 3, torsoY - 7);
        ctx.lineTo(wx - 1.5, torsoY - 7);
        ctx.closePath();
        ctx.fill();
        break;
      case "bow":
        ctx.strokeStyle = trim;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wx + 2, torsoY + Math.floor(torsoH / 2), 7, -Math.PI * 0.6, Math.PI * 0.6);
        ctx.stroke();
        ctx.fillStyle = accent;
        ctx.fillRect(wx + 1, torsoY - 1, 1, torsoH + 2);
        break;
      case "wand":
        ctx.fillStyle = trim;
        ctx.fillRect(wx, torsoY + 1, 1.5, 9);
        ctx.fillStyle = accent;
        ctx.fillRect(wx - 1, torsoY, 3, 2);
        break;
      case "axe":
        ctx.fillStyle = trim;
        ctx.fillRect(wx, torsoY - 3, 1.5, torsoH + 3);
        ctx.fillStyle = "#c0c0c8";
        ctx.beginPath();
        ctx.moveTo(wx + 1, torsoY - 4);
        ctx.lineTo(wx + 6, torsoY - 2);
        ctx.lineTo(wx + 1, torsoY + 2);
        ctx.closePath();
        ctx.fill();
        break;
      case "fists":
        ctx.fillStyle = accent;
        ctx.fillRect(wx - 1, torsoY + Math.floor(torsoH * 0.3), 3, 3);
        break;
    }
  }
}

export const heroSpriteDrawer = new HeroSpriteDrawer();
