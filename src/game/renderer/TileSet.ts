/**
 * Procedural retro pixel art TileSet generator for DuskUltima.
 * Supports biome-specific terrain palettes for all 6 Cursed Scroll zones.
 */

import type { MonsterBiome, ClassName, StatGenerationMethod } from "../../engine";

export const TILE_SIZE = 32;

export enum TileType {
  FLOOR = 0,
  WALL = 1,
  VINE_WALL = 2,
  CRACKED_WALL = 3,
  DOOR_CLOSED = 4,
  DOOR_OPEN = 5,
  STAIRS_DOWN = 6,
  STAIRS_UP = 7,
  CHEST_CLOSED = 8,
  CHEST_OPEN = 9,
  CAMPFIRE = 10,
  TRAP = 11,
  WATER = 12,
  RAMP = 13,
  SHAFT = 14,

  // Entities
  FIGHTER = 20,
  THIEF = 21,
  PRIEST = 22,
  WIZARD = 23,
  GOBLIN = 24,
  ORC = 25,
  SKELETON = 26,
  GLOOM_OGRE = 27,
  RESCUE_NPC = 28,

  // Indicators
  CURSOR = 40,
}

export interface BiomePalette {
  floorBg: string;
  floorDetail: string;
  wallBg: string;
  wallDetail: string;
}

export const BIOME_PALETTES: Record<MonsterBiome, BiomePalette> = {
  "diablerie": { floorBg: "#1a2418", floorDetail: "#27ae60", wallBg: "#2c3b28", wallDetail: "#1e2a1b" },
  "red-sands": { floorBg: "#3d2216", floorDetail: "#e67e22", wallBg: "#5c331e", wallDetail: "#3d1f11" },
  "midnight-sun": { floorBg: "#162836", floorDetail: "#3498db", wallBg: "#2c3e50", wallDetail: "#1a252f" },
  "river-of-night": { floorBg: "#121b24", floorDetail: "#00d2d3", wallBg: "#1e2a38", wallDetail: "#0f1721" },
  "dwellers-in-the-deep": { floorBg: "#0f232a", floorDetail: "#16a085", wallBg: "#17363f", wallDetail: "#0a191f" },
  "city-of-masks": { floorBg: "#242028", floorDetail: "#9b59b6", wallBg: "#38323e", wallDetail: "#1a161f" },
};

export class TileSet {
  private currentBiome: MonsterBiome = "diablerie";
  private tileMap = new Map<TileType, HTMLCanvasElement>();
  private heroTileCache = new Map<string, HTMLCanvasElement>();

  constructor(biome: MonsterBiome = "diablerie") {
    this.setBiome(biome);
  }

  public setBiome(biome: MonsterBiome): void {
    this.currentBiome = biome;
    this.heroTileCache.clear();
    this.generateAllTiles();
  }

  public getHeroTileCanvas(className: ClassName, method: StatGenerationMethod = "unearthed-arcana"): HTMLCanvasElement {
    const key = `${className}_${method}_${this.currentBiome}`;
    if (this.heroTileCache.has(key)) {
      return this.heroTileCache.get(key)!;
    }

    const palette = BIOME_PALETTES[this.currentBiome] || BIOME_PALETTES["diablerie"];
    const symbol = className.charAt(0).toUpperCase();
    const isIronman = method === "iron-man";

    const cvs = this.drawFloorTile(palette);
    const ctx = cvs.getContext("2d")!;

    if (isIronman) {
      // Ironman: Barbaric deep blood ring with Conan Display font
      ctx.fillStyle = "#3e1203";
      ctx.beginPath();
      ctx.arc(16, 16, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#c1440e";
      ctx.beginPath();
      ctx.arc(16, 16, 9.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffd45f";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Conan Display', 'MedievalSharp', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol, 16, 16);
    } else {
      // Unearthed Arcana: Chrome metallic cyan ring with Classic Chrome font
      ctx.fillStyle = "#091724";
      ctx.beginPath();
      ctx.arc(16, 16, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#34c4f2";
      ctx.beginPath();
      ctx.arc(16, 16, 9.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#f2c760";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px 'Classic Chrome', 'Orbitron', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol, 16, 16);
    }

    this.heroTileCache.set(key, cvs);
    return cvs;
  }

  public getTileCanvas(type: TileType): HTMLCanvasElement {
    return this.tileMap.get(type) || this.tileMap.get(TileType.FLOOR)!;
  }

  private generateAllTiles(): void {
    const palette = BIOME_PALETTES[this.currentBiome] || BIOME_PALETTES["diablerie"];

    this.tileMap.set(TileType.FLOOR, this.drawFloorTile(palette));
    this.tileMap.set(TileType.WALL, this.drawWallTile(palette));
    this.tileMap.set(TileType.VINE_WALL, this.drawVineWallTile(palette));
    this.tileMap.set(TileType.CRACKED_WALL, this.drawCrackedWallTile(palette));
    this.tileMap.set(TileType.DOOR_CLOSED, this.drawDoorClosedTile(palette));
    this.tileMap.set(TileType.DOOR_OPEN, this.drawDoorOpenTile(palette));
    this.tileMap.set(TileType.STAIRS_DOWN, this.drawStairsDownTile(palette));
    this.tileMap.set(TileType.STAIRS_UP, this.drawStairsUpTile(palette));
    this.tileMap.set(TileType.CHEST_CLOSED, this.drawChestTile(false, palette));
    this.tileMap.set(TileType.CHEST_OPEN, this.drawChestTile(true, palette));
    this.tileMap.set(TileType.CAMPFIRE, this.drawCampfireTile(palette));
    this.tileMap.set(TileType.TRAP, this.drawTrapTile(palette));
    this.tileMap.set(TileType.WATER, this.drawWaterTile());
    this.tileMap.set(TileType.RAMP, this.drawRampTile(palette));
    this.tileMap.set(TileType.SHAFT, this.drawShaftTile(palette));

    // Entities
    this.tileMap.set(TileType.FIGHTER, this.drawHeroTile("#e74c3c", "#f39c12", "F", palette));
    this.tileMap.set(TileType.THIEF, this.drawHeroTile("#2ecc71", "#27ae60", "T", palette));
    this.tileMap.set(TileType.PRIEST, this.drawHeroTile("#3498db", "#f1c40f", "P", palette));
    this.tileMap.set(TileType.WIZARD, this.drawHeroTile("#9b59b6", "#8e44ad", "W", palette));
    this.tileMap.set(TileType.RESCUE_NPC, this.drawHeroTile("#e67e22", "#d35400", "?", palette));

    this.tileMap.set(TileType.GOBLIN, this.drawMonsterTile("#27ae60", "g", palette));
    this.tileMap.set(TileType.ORC, this.drawMonsterTile("#16a085", "O", palette));
    this.tileMap.set(TileType.SKELETON, this.drawMonsterTile("#ecf0f1", "S", palette));
    this.tileMap.set(TileType.GLOOM_OGRE, this.drawMonsterTile("#8e44ad", "B", palette));

    this.tileMap.set(TileType.CURSOR, this.drawCursorTile());
  }

  private createCanvas(): { cvs: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    const cvs = document.createElement("canvas");
    cvs.width = TILE_SIZE;
    cvs.height = TILE_SIZE;
    const ctx = cvs.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    return { cvs, ctx };
  }

  private drawFloorTile(p: BiomePalette): HTMLCanvasElement {
    const { cvs, ctx } = this.createCanvas();
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
    return cvs;
  }

  private drawWallTile(p: BiomePalette): HTMLCanvasElement {
    const { cvs, ctx } = this.createCanvas();
    ctx.fillStyle = p.wallBg;
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = p.wallDetail;
    ctx.fillRect(2, 2, 12, 6);
    ctx.fillRect(16, 2, 14, 6);
    ctx.fillRect(2, 10, 28, 6);
    ctx.fillRect(2, 18, 14, 6);
    ctx.fillRect(18, 18, 12, 6);

    ctx.strokeStyle = "#000";
    ctx.strokeRect(0, 0, 32, 32);
    return cvs;
  }

  private drawVineWallTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawWallTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(4, 4, 4, 24);
    ctx.fillRect(8, 12, 12, 4);
    return cvs;
  }

  private drawCrackedWallTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawWallTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.strokeStyle = "#e74c3c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, 4);
    ctx.lineTo(16, 14);
    ctx.lineTo(12, 22);
    ctx.stroke();
    return cvs;
  }

  private drawDoorClosedTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#5c3a21";
    ctx.fillRect(4, 2, 24, 28);
    ctx.fillStyle = "#f1c40f";
    ctx.fillRect(20, 15, 4, 4);
    return cvs;
  }

  private drawDoorOpenTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#5c3a21";
    ctx.fillRect(2, 2, 4, 28);
    ctx.fillRect(26, 2, 4, 28);
    ctx.fillRect(2, 2, 28, 4);
    ctx.fillStyle = "#0c0c12";
    ctx.fillRect(6, 6, 20, 24);
    return cvs;
  }

  private drawStairsDownTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#111118";
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = p.wallBg;
    ctx.fillRect(6, 6, 20, 4);
    ctx.fillRect(8, 12, 16, 4);
    return cvs;
  }

  private drawStairsUpTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = p.floorDetail;
    ctx.fillRect(12, 4, 8, 4);
    ctx.fillRect(10, 10, 12, 4);
    return cvs;
  }

  private drawChestTile(isOpen: boolean, p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    if (!isOpen) {
      ctx.fillStyle = "#b8860b";
      ctx.fillRect(6, 10, 20, 16);
      ctx.fillStyle = "#f1c40f";
      ctx.fillRect(14, 16, 4, 6);
    } else {
      ctx.fillStyle = "#5c3a21";
      ctx.fillRect(6, 14, 20, 12);
    }
    return cvs;
  }

  private drawCampfireTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#e67e22";
    ctx.beginPath();
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(16, 16, 4, 0, Math.PI * 2);
    ctx.fill();
    return cvs;
  }

  private drawTrapTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(10, 10, 12, 12);
    return cvs;
  }

  private drawWaterTile(): HTMLCanvasElement {
    const { cvs, ctx } = this.createCanvas();
    ctx.fillStyle = "#1b3b6f";
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = "#21558b";
    ctx.fillRect(4, 6, 10, 2);
    ctx.fillRect(18, 16, 10, 2);
    return cvs;
  }

  private drawRampTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.strokeStyle = "#d4ac5a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(5, 25);
    ctx.lineTo(27, 7);
    ctx.stroke();
    return cvs;
  }

  private drawShaftTile(p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#101018";
    ctx.fillRect(7, 7, 18, 18);
    ctx.strokeStyle = "#6b7280";
    ctx.strokeRect(7, 7, 18, 18);
    ctx.strokeRect(11, 11, 10, 10);
    return cvs;
  }

  private drawHeroTile(mainColor: string, accentColor: string, symbol: string, p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.arc(16, 16, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, 16, 16);
    return cvs;
  }

  private drawMonsterTile(color: string, symbol: string, p: BiomePalette): HTMLCanvasElement {
    const cvs = this.drawFloorTile(p);
    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(6, 6, 20, 20);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, 16, 16);
    return cvs;
  }

  private drawCursorTile(): HTMLCanvasElement {
    const { cvs, ctx } = this.createCanvas();
    ctx.strokeStyle = "#f1c40f";
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 28, 28);
    return cvs;
  }
}
