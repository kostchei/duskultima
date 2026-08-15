/**
 * Parametric monster sprite renderer and tile generator for DuskUltima.
 * Draws procedural pixel art tiles for all 15 MonsterArchetypes and 9 MonsterFeatures,
 * with non-blocking async overrides for hand-curated Kenney raster tiles.
 */

import {
  MONSTER_SIZE_PX,
  type MonsterBiome,
  type MonsterDef,
  type MonsterFeature,
  type MonsterSize,
} from "../../engine/monster";
import { BIOME_PALETTES, type BiomePalette } from "./TileSet";

export const TILE_SIZE = 32;
const SPRITE_OUTLINE = "#080b10";
const OUTLINE_OFFSETS = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],            [1, 0],
  [-1, 1],  [0, 1],   [1, 1],
] as const;

/**
 * Curated monster IDs that have hand-mapped PNG tiles in assets/monsters/<id>.png.
 */
const CURATED_MONSTER_IDS = new Set<string>([
  "zombie", "skeleton", "vampire", "flameskull", "wraith", "disembodied-eye",
  "disembodied-hand", "medusa", "medusa-cultist", "rot-flower", "rot-flower-gloaming",
  "maneater-plant", "leprechaun", "goblin", "orc", "faerie", "mushroomfolk",
  "funguy", "ogre", "ogre-bouncer", "wendego", "knight-green", "knight-blue",
  "knight-red", "wight", "minotaur", "centaur", "centaurette", "wolf", "timber-wolf",
  "werewolf", "dryad", "siren", "mermaid", "sea-nymph", "arachni", "succubus",
  "succubus-incubus", "desert-dragon", "fire-dragon", "devil", "archdevil", "imp",
  "imp-devil", "asp", "adder", "cobra-snake", "troll", "frost-troll", "deep-troll",
  "yeti", "sasquatch", "elemental-fire", "azer", "elemental-water", "elemental-earth",
  "stone-elemental", "elemental-air", "wind-elemental", "elemental-ice", "rime-walker",
  "horse", "war-horse", "unicorn", "pegasus", "hippocampus", "nightmare", "mutant-catfish",
  "catfish", "high-mage", "mage", "dark-wizard", "harpy", "flesh-golem", "gargoyle",
  "naga", "serpent-naga", "bone-naga", "lizardman", "viperian", "viperian-warrior",
  "kobold", "gelatinous-cube", "slime", "gray-ooze", "ichor-ooze", "black-pudding",
  "primordial-slime", "bittermold", "will-o-wisp", "gnoll", "hyena", "were-rat",
  "mummy", "lich", "archlich", "death-knight", "banshee", "ghoul", "barrow-ghast",
  "sea-hag", "weald-hag", "night-hag", "night-hag-city", "witch", "hell-hound",
  "cockatrice", "griffon", "hippogriff", "manticore", "chimera", "sphinx", "djinni",
  "treant", "owlbear", "owlbear-guard", "fairy", "pixie", "dretch-demon", "barbed-devil",
  "glabrezu-demon", "demon", "clay-golem", "stone-golem", "iron-golem", "camel",
  "silver-camel", "stingbat", "tar-bat", "bat", "large-bat", "giant-wasp", "hornet",
  "giant-dung-beetle", "beetle", "giant-centipede", "centipede", "scorpion",
  "giant-scorpion", "velociraptor", "giant-frog", "frog", "crocodile", "plains-strider",
  "ostrich", "zhevra", "lion", "savannah-huntress", "smilodon", "elephant", "war-elephant",
  "dusthoof-giraffe", "wild-boar", "giant-boar", "dire-boar", "giant-warthog",
  "daeodon", "quillboar-wretch", "quillboar-chopper", "moose", "brown-bear",
  "werebear", "gorilla", "ape", "canyon-ape", "snow-ape", "mastiff", "rhinoceros",
  "shark", "megalodon-shark", "orca", "badger", "rat", "dire-rat", "giant-rat",
]);

function toHexColor(colorNum: number): string {
  return `#${(colorNum & 0xffffff).toString(16).padStart(6, "0")}`;
}

export class MonsterSpriteDrawer {
  private cache = new Map<string, HTMLCanvasElement>();

  public getMonsterTileCanvas(
    def: MonsterDef,
    biome: MonsterBiome,
    palette?: BiomePalette
  ): HTMLCanvasElement {
    const key = `${def.id}_${biome}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const p = palette || BIOME_PALETTES[biome] || BIOME_PALETTES["diablerie"];
    const cvs = document.createElement("canvas");
    cvs.width = TILE_SIZE;
    cvs.height = TILE_SIZE;

    // Step 1: Draw Phase 1 procedural sprite immediately onto canvas
    this.drawProceduralMonsterTile(cvs, def, p);
    this.cache.set(key, cvs);

    // Step 2: Phase 2 curated tile override non-blocking load
    if (CURATED_MONSTER_IDS.has(def.id) && typeof Image !== "undefined") {
      const img = new Image();
      img.onload = () => {
        const ctx = cvs.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;

        // Redraw floor tile background
        this.drawFloorBackground(ctx, p);

        // Draw 16x16 raster sprite scaled to 24x24 centered (or 28x28 for large)
        const sizeOffset = def.size === "large" || def.size === "huge" || def.size === "gargantuan" ? 2 : 4;
        const sizeDim = TILE_SIZE - sizeOffset * 2;
        ctx.drawImage(img, 0, 0, img.width, img.height, sizeOffset, sizeOffset, sizeDim, sizeDim);
      };
      img.src = `assets/monsters/${def.id}.png`;
    }

    return cvs;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  private drawFloorBackground(ctx: CanvasRenderingContext2D, p: BiomePalette): void {
    ctx.fillStyle = p.floorBg;
    ctx.fillRect(0, 0, 32, 32);

    ctx.strokeStyle = p.wallDetail;
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 32, 32);
    ctx.strokeRect(4, 4, 12, 12);
    ctx.strokeRect(16, 4, 12, 12);

    ctx.fillStyle = p.floorDetail;
    ctx.fillRect(6, 8, 2, 2);
    ctx.fillRect(20, 18, 2, 2);
  }

  private drawProceduralMonsterTile(
    cvs: HTMLCanvasElement,
    def: MonsterDef,
    p: BiomePalette
  ): void {
    const ctx = cvs.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    // Base terrain
    this.drawFloorBackground(ctx, p);

    // Calculate dimensions on 32x32 tile canvas based on def.size
    const targetBounds = this.getTileBounds(def.size);
    const { w, h, x0, y0 } = targetBounds;

    // Keep the silhouette visually grounded without adding a second opaque tile.
    ctx.fillStyle = SPRITE_OUTLINE;
    ctx.fillRect(x0 + 2, Math.min(TILE_SIZE - 2, y0 + h - 1), Math.max(2, w - 4), 2);

    // Draw the creature on transparency first. This lets the shared ink pass
    // outline irregular silhouettes, not just their rectangular bounding box.
    const spriteCvs = document.createElement("canvas");
    spriteCvs.width = TILE_SIZE;
    spriteCvs.height = TILE_SIZE;
    const spriteCtx = spriteCvs.getContext("2d")!;
    spriteCtx.imageSmoothingEnabled = false;

    const bodyCol = toHexColor(def.art.body);
    const shadeCol = toHexColor(def.art.shade);
    const accentCol = toHexColor(def.art.accent);
    const eyeCol = toHexColor(def.art.eye);

    // Render Archetype silhouette
    switch (def.archetype) {
      case "biped":
        this.drawBiped(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "brute":
        this.drawBrute(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "quadruped":
        this.drawQuadruped(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "boar":
        this.drawBoar(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "vermin":
        this.drawVermin(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "spider":
        this.drawSpider(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "swarm":
        this.drawSwarm(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "ooze":
        this.drawOoze(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "skeletal":
        this.drawSkeletal(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "flyer":
        this.drawFlyer(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "serpent":
        this.drawSerpent(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "elemental":
        this.drawElemental(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "centaur":
        this.drawCentaur(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "plant":
        this.drawPlant(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
      case "avian":
        this.drawAvian(spriteCtx, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
        break;
    }

    // Render Features overlays if defined
    if (def.art.features && def.art.features.length > 0) {
      for (const feat of def.art.features) {
        this.drawFeature(spriteCtx, feat, x0, y0, w, h, bodyCol, shadeCol, accentCol, eyeCol);
      }
    }

    this.drawPixelOutline(ctx, spriteCvs);
    ctx.drawImage(spriteCvs, 0, 0);
  }

  private getTileBounds(size: MonsterSize): { w: number; h: number; x0: number; y0: number } {
    const footprint = MONSTER_SIZE_PX[size];
    const scale = Math.min(1, 28 / footprint.w, 28 / footprint.h);
    const w = Math.max(12, Math.floor(footprint.w * scale));
    const h = Math.max(10, Math.floor(footprint.h * scale));
    const x0 = Math.floor((32 - w) / 2);
    const y0 = Math.floor((32 - h) / 2);
    return { w, h, x0, y0 };
  }

  /**
   * Gives every procedural silhouette the same dark pixel-ink treatment as
   * the game's terrain tiles. The mask is made from shifted copies so arms,
   * wings, tails, and other features receive a real contour instead of a box.
   */
  private drawPixelOutline(ctx: CanvasRenderingContext2D, spriteCvs: HTMLCanvasElement): void {
    const maskCvs = document.createElement("canvas");
    maskCvs.width = TILE_SIZE;
    maskCvs.height = TILE_SIZE;
    const maskCtx = maskCvs.getContext("2d")!;
    maskCtx.imageSmoothingEnabled = false;
    for (const [dx, dy] of OUTLINE_OFFSETS) {
      maskCtx.drawImage(spriteCvs, dx, dy);
    }

    const outlineCvs = document.createElement("canvas");
    outlineCvs.width = TILE_SIZE;
    outlineCvs.height = TILE_SIZE;
    const outlineCtx = outlineCvs.getContext("2d")!;
    outlineCtx.imageSmoothingEnabled = false;
    outlineCtx.fillStyle = SPRITE_OUTLINE;
    outlineCtx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    outlineCtx.globalCompositeOperation = "destination-in";
    outlineCtx.drawImage(maskCvs, 0, 0);

    ctx.drawImage(outlineCvs, 0, 0);
  }

  // --- ARCHETYPE DRAWERS ---

  private drawBiped(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const headSize = Math.max(5, Math.floor(w * 0.35));
    const cx = x0 + Math.floor(w / 2);

    // Head
    ctx.fillStyle = body;
    ctx.fillRect(cx - Math.floor(headSize / 2), y0, headSize, headSize);

    // Eyes
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, y0 + 2, 1.5, 1.5);
    ctx.fillRect(cx + 1, y0 + 2, 1.5, 1.5);

    // Torso
    const torsoY = y0 + headSize;
    const torsoH = Math.floor(h * 0.4);
    ctx.fillStyle = body;
    ctx.fillRect(cx - Math.floor(w * 0.3), torsoY, Math.floor(w * 0.6), torsoH);

    // Belt/Accent
    ctx.fillStyle = accent;
    ctx.fillRect(cx - Math.floor(w * 0.3), torsoY + Math.floor(torsoH * 0.6), Math.floor(w * 0.6), 2);

    // Arms
    ctx.fillStyle = shade;
    ctx.fillRect(cx - Math.floor(w * 0.45), torsoY, Math.floor(w * 0.15), torsoH - 2);
    ctx.fillRect(cx + Math.floor(w * 0.3), torsoY, Math.floor(w * 0.15), torsoH - 2);

    // Legs
    const legY = torsoY + torsoH;
    const legH = h - (headSize + torsoH);
    ctx.fillRect(cx - Math.floor(w * 0.25), legY, Math.floor(w * 0.2), legH);
    ctx.fillRect(cx + Math.floor(w * 0.05), legY, Math.floor(w * 0.2), legH);
  }

  private drawBrute(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);

    // Heavy shoulders & chest
    ctx.fillStyle = body;
    ctx.fillRect(x0 + 2, y0 + 4, w - 4, Math.floor(h * 0.45));

    // Head (low set)
    ctx.fillRect(cx - 4, y0, 8, 6);
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 3, y0 + 2, 2, 2);
    ctx.fillRect(cx + 1, y0 + 2, 2, 2);

    // Shaded belly/legs
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 4, y0 + 4 + Math.floor(h * 0.45), w - 8, Math.floor(h * 0.45));

    // Heavy arms
    ctx.fillStyle = accent;
    ctx.fillRect(x0, y0 + 6, 4, Math.floor(h * 0.5));
    ctx.fillRect(x0 + w - 4, y0 + 6, 4, Math.floor(h * 0.5));
  }

  private drawQuadruped(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    // Body oval
    const bodyY = y0 + Math.floor(h * 0.25);
    const bodyH = Math.floor(h * 0.45);
    ctx.fillStyle = body;
    ctx.fillRect(x0 + 4, bodyY, w - 8, bodyH);

    // Back shading
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 4, bodyY, w - 8, 3);

    // Head
    ctx.fillStyle = body;
    ctx.fillRect(x0, bodyY - 2, 7, 8);
    ctx.fillStyle = eye;
    ctx.fillRect(x0 + 2, bodyY, 2, 2);

    // 4 legs
    ctx.fillStyle = accent;
    const legY = bodyY + bodyH;
    const legH = h - (bodyY + bodyH - y0);
    ctx.fillRect(x0 + 5, legY, 3, legH);
    ctx.fillRect(x0 + 10, legY, 3, legH);
    ctx.fillRect(x0 + w - 12, legY, 3, legH);
    ctx.fillRect(x0 + w - 7, legY, 3, legH);
  }

  private drawBoar(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    // Wedge body
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + h - 6);
    ctx.lineTo(x0 + 8, y0 + 2);
    ctx.lineTo(x0 + w, y0 + 6);
    ctx.lineTo(x0 + w, y0 + h - 4);
    ctx.closePath();
    ctx.fill();

    // Snout
    ctx.fillStyle = shade;
    ctx.fillRect(x0, y0 + h - 10, 5, 5);

    // Eye
    ctx.fillStyle = eye;
    ctx.fillRect(x0 + 4, y0 + 6, 2, 2);

    // Back ridge/fur
    ctx.fillStyle = accent;
    ctx.fillRect(x0 + 6, y0, w - 8, 3);

    // Legs
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 6, y0 + h - 4, 3, 4);
    ctx.fillRect(x0 + w - 8, y0 + h - 4, 3, 4);
  }

  private drawVermin(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    // Low body
    ctx.fillStyle = body;
    ctx.fillRect(x0 + 4, y0 + Math.floor(h * 0.3), w - 8, Math.floor(h * 0.5));

    // Head & snout
    ctx.fillRect(x0, y0 + Math.floor(h * 0.4), 6, Math.floor(h * 0.35));
    ctx.fillStyle = eye;
    ctx.fillRect(x0 + 2, y0 + Math.floor(h * 0.45), 2, 2);

    // Tail
    ctx.fillStyle = accent;
    ctx.fillRect(x0 + w - 4, y0 + Math.floor(h * 0.5), 4, 2);

    // Feet
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 6, y0 + Math.floor(h * 0.8), 3, Math.floor(h * 0.2));
    ctx.fillRect(x0 + w - 8, y0 + Math.floor(h * 0.8), 3, Math.floor(h * 0.2));
  }

  private drawSpider(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);
    const cy = y0 + Math.floor(h / 2);

    // Abdomen
    ctx.fillStyle = body;
    ctx.fillRect(cx - 5, cy - 6, 10, 10);

    // Cephalothorax
    ctx.fillStyle = shade;
    ctx.fillRect(cx - 3, cy + 2, 6, 5);

    // Eyes
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, cy + 4, 1.5, 1.5);
    ctx.fillRect(cx + 1, cy + 4, 1.5, 1.5);

    // 8 Legs
    ctx.fillStyle = accent;
    for (let i = 0; i < 4; i++) {
      const legY = y0 + 3 + i * 5;
      ctx.fillRect(x0, legY, cx - x0 - 4, 2);
      ctx.fillRect(cx + 4, legY, x0 + w - (cx + 4), 2);
    }
  }

  private drawSwarm(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    // Cluster of dots
    const dots = [
      { x: 0.2, y: 0.2, c: body },
      { x: 0.5, y: 0.15, c: accent },
      { x: 0.8, y: 0.3, c: body },
      { x: 0.3, y: 0.5, c: eye },
      { x: 0.65, y: 0.55, c: shade },
      { x: 0.15, y: 0.75, c: accent },
      { x: 0.45, y: 0.8, c: body },
      { x: 0.8, y: 0.7, c: eye },
    ];
    for (const d of dots) {
      ctx.fillStyle = d.c;
      ctx.fillRect(x0 + Math.floor(w * d.x), y0 + Math.floor(h * d.y), 3, 3);
    }
  }

  private drawOoze(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    // Blob shape
    ctx.fillStyle = body;
    ctx.fillRect(x0 + 2, y0 + Math.floor(h * 0.3), w - 4, Math.floor(h * 0.65));
    ctx.fillRect(x0 + 5, y0 + Math.floor(h * 0.15), w - 10, Math.floor(h * 0.2));

    // Bottom shading
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 2, y0 + Math.floor(h * 0.75), w - 4, Math.floor(h * 0.2));

    // Bubbles & nucleus
    ctx.fillStyle = accent;
    ctx.fillRect(x0 + 6, y0 + Math.floor(h * 0.4), 3, 3);
    ctx.fillRect(x0 + w - 9, y0 + Math.floor(h * 0.5), 4, 4);

    // Core nucleus / eye
    ctx.fillStyle = eye;
    ctx.fillRect(x0 + Math.floor(w * 0.4), y0 + Math.floor(h * 0.35), 4, 4);
  }

  private drawSkeletal(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);

    // Skull
    ctx.fillStyle = body;
    ctx.fillRect(cx - 4, y0, 8, 7);

    // Dark eye sockets with eye pupils
    ctx.fillStyle = shade;
    ctx.fillRect(cx - 3, y0 + 2, 2, 2);
    ctx.fillRect(cx + 1, y0 + 2, 2, 2);
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, y0 + 2, 1, 1);
    ctx.fillRect(cx + 1, y0 + 2, 1, 1);

    // Spine & Ribcage
    ctx.fillStyle = body;
    ctx.fillRect(cx - 1, y0 + 7, 2, h - 13);
    ctx.fillStyle = accent;
    ctx.fillRect(cx - 5, y0 + 9, 10, 2);
    ctx.fillRect(cx - 4, y0 + 13, 8, 2);
    ctx.fillRect(cx - 3, y0 + 17, 6, 2);

    // Limbs
    ctx.fillStyle = shade;
    ctx.fillRect(cx - 6, y0 + 22, 3, h - 22);
    ctx.fillRect(cx + 3, y0 + 22, 3, h - 22);
  }

  private drawFlyer(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);
    const cy = y0 + Math.floor(h / 2);

    // Wings spreading out
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x0, y0 + 2);
    ctx.lineTo(x0 + 4, cy + 4);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x0 + w, y0 + 2);
    ctx.lineTo(x0 + w - 4, cy + 4);
    ctx.closePath();
    ctx.fill();

    // Body & Head
    ctx.fillStyle = body;
    ctx.fillRect(cx - 3, y0 + 4, 6, h - 8);

    // Eye
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, y0 + 6, 1.5, 1.5);
    ctx.fillRect(cx + 1, y0 + 6, 1.5, 1.5);

    // Feet
    ctx.fillStyle = shade;
    ctx.fillRect(cx - 3, y0 + h - 4, 2, 4);
    ctx.fillRect(cx + 1, y0 + h - 4, 2, 4);
  }

  private drawSerpent(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);

    // Coiled body S-curve
    ctx.fillStyle = body;
    ctx.fillRect(cx - 5, y0 + Math.floor(h * 0.3), 10, 6);
    ctx.fillRect(cx - 8, y0 + Math.floor(h * 0.55), 12, 6);
    ctx.fillRect(cx - 4, y0 + Math.floor(h * 0.75), 10, 5);

    // Head
    ctx.fillStyle = accent;
    ctx.fillRect(cx - 4, y0, 8, 8);
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, y0 + 2, 1.5, 1.5);
    ctx.fillRect(cx + 1, y0 + 2, 1.5, 1.5);

    // Shading
    ctx.fillStyle = shade;
    ctx.fillRect(cx - 5, y0 + Math.floor(h * 0.3) + 4, 10, 2);
  }

  private drawElemental(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);
    const cy = y0 + Math.floor(h / 2);

    // Swirling core
    ctx.fillStyle = body;
    ctx.fillRect(cx - 6, cy - 8, 12, 16);
    ctx.fillRect(cx - 9, cy - 4, 18, 8);

    // Floating aura
    ctx.fillStyle = accent;
    ctx.fillRect(x0 + 2, y0 + 2, 3, 3);
    ctx.fillRect(x0 + w - 5, y0 + 4, 3, 3);
    ctx.fillRect(x0 + 4, y0 + h - 5, 3, 3);
    ctx.fillRect(x0 + w - 4, y0 + h - 6, 3, 3);

    // Glowing core
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 3, cy - 3, 6, 6);
  }

  private drawCentaur(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    // Quadruped lower body
    const horseY = y0 + Math.floor(h * 0.4);
    const horseH = Math.floor(h * 0.4);
    ctx.fillStyle = body;
    ctx.fillRect(x0 + 4, horseY, w - 6, horseH);

    // Humanoid upper torso rising from front
    ctx.fillStyle = accent;
    ctx.fillRect(x0 + 4, y0, 6, Math.floor(h * 0.45));

    // Head
    ctx.fillStyle = body;
    ctx.fillRect(x0 + 3, y0, 8, 6);
    ctx.fillStyle = eye;
    ctx.fillRect(x0 + 5, y0 + 2, 2, 2);

    // Legs
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 6, horseY + horseH, 3, h - (horseY + horseH));
    ctx.fillRect(x0 + w - 6, horseY + horseH, 3, h - (horseY + horseH));
  }

  private drawPlant(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);

    // Central stalk / bulb
    ctx.fillStyle = body;
    ctx.fillRect(cx - 4, y0 + 4, 8, h - 8);

    // Sprouting leaves / tendrils
    ctx.fillStyle = accent;
    ctx.fillRect(x0 + 2, y0 + 8, cx - x0 - 2, 3);
    ctx.fillRect(cx, y0 + 14, x0 + w - cx - 2, 3);
    ctx.fillRect(x0 + 4, y0 + 20, cx - x0 - 4, 3);

    // Central maw / eye
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, y0 + 6, 4, 4);

    // Root base
    ctx.fillStyle = shade;
    ctx.fillRect(x0 + 3, y0 + h - 4, w - 6, 4);
  }

  private drawAvian(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number, w: number, h: number,
    body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);

    // Feathered body
    ctx.fillStyle = body;
    ctx.fillRect(cx - 6, y0 + 6, 12, Math.floor(h * 0.6));

    // Beak
    ctx.fillStyle = accent;
    ctx.fillRect(cx - 8, y0 + 3, 4, 3);

    // Head & Eye
    ctx.fillStyle = shade;
    ctx.fillRect(cx - 4, y0, 8, 7);
    ctx.fillStyle = eye;
    ctx.fillRect(cx - 2, y0 + 2, 2, 2);

    // Talons
    ctx.fillStyle = accent;
    ctx.fillRect(cx - 4, y0 + h - 4, 3, 4);
    ctx.fillRect(cx + 1, y0 + h - 4, 3, 4);
  }

  // --- FEATURE DRAWERS ---

  private drawFeature(
    ctx: CanvasRenderingContext2D,
    feature: MonsterFeature,
    x0: number, y0: number, w: number, h: number,
    _body: string, shade: string, accent: string, eye: string
  ): void {
    const cx = x0 + Math.floor(w / 2);

    switch (feature) {
      case "tusks":
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx - 4, y0 + 6, 2, 3);
        ctx.fillRect(cx + 2, y0 + 6, 2, 3);
        break;
      case "horns":
        ctx.fillStyle = accent;
        ctx.fillRect(cx - 5, y0 - 2, 2, 4);
        ctx.fillRect(cx + 3, y0 - 2, 2, 4);
        break;
      case "quills":
        ctx.fillStyle = accent;
        ctx.fillRect(cx - 1, y0 + 2, 2, 3);
        ctx.fillRect(cx - 1, y0 + 8, 2, 3);
        ctx.fillRect(cx - 1, y0 + 14, 2, 3);
        break;
      case "mane":
        ctx.fillStyle = accent;
        ctx.fillRect(cx - 5, y0 + 4, 10, 3);
        break;
      case "weapon":
        ctx.fillStyle = accent;
        ctx.fillRect(x0 + w - 3, y0 + 4, 2, h - 6);
        break;
      case "robe":
        ctx.fillStyle = shade;
        ctx.fillRect(cx - Math.floor(w * 0.4), y0 + Math.floor(h * 0.4), Math.floor(w * 0.8), Math.floor(h * 0.55));
        break;
      case "wings":
        ctx.fillStyle = accent;
        ctx.fillRect(x0 - 2, y0 + 4, 3, Math.floor(h * 0.4));
        ctx.fillRect(x0 + w - 1, y0 + 4, 3, Math.floor(h * 0.4));
        break;
      case "manyEyes":
        ctx.fillStyle = eye;
        ctx.fillRect(cx - 3, y0 + 8, 1.5, 1.5);
        ctx.fillRect(cx + 2, y0 + 8, 1.5, 1.5);
        ctx.fillRect(cx - 1, y0 + 11, 1.5, 1.5);
        break;
      case "tail":
        ctx.fillStyle = shade;
        ctx.fillRect(x0 + w, y0 + h - 6, 4, 2);
        break;
    }
  }
}

export const monsterSpriteDrawer = new MonsterSpriteDrawer();
