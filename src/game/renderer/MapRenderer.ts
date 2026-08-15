/**
 * Canvas renderer for Ultima V style 2D tile viewport.
 * Handles grid rendering, FOV lighting mask, entity sprites, and biome palette switching.
 */

import { MapGrid, type MapEntity } from "../level/MapGrid";
import { TileSet, TileType, TILE_SIZE } from "./TileSet";
import { monsterSpriteDrawer } from "./MonsterSprite";
import { heroSpriteDrawer } from "./HeroSprite";
import { monster } from "../../data/monsters";
import type { Character } from "../../engine/character";
import type { MonsterBiome } from "../../engine/monster";

export class MapRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private tileSet: TileSet;
  private viewportCols = 18;
  private viewportRows = 18;
  private cursorX: number | null = null;
  private cursorY: number | null = null;
  private lastBiome: string | null = null;

  private displayPlayerX: number | null = null;
  private displayPlayerY: number | null = null;
  private animFrameId: number | null = null;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.imageSmoothingEnabled = false;
    this.tileSet = new TileSet();
  }

  public setCursor(x: number | null, y: number | null): void {
    this.cursorX = x;
    this.cursorY = y;
  }

  private getEntityCanvas(entity: MapEntity, biome: MonsterBiome): HTMLCanvasElement {
    const mDef = entity.monsterDef || (entity.monsterId ? monster(entity.monsterId) : undefined);
    if (mDef) {
      return monsterSpriteDrawer.getMonsterTileCanvas(mDef, biome);
    }
    return this.tileSet.getTileCanvas(entity.tileType);
  }

  public render(grid: MapGrid, party: Character[] = [], leaderIndex = 0): void {
    // Update biome palette if site biome changed
    const currentBiome: MonsterBiome = grid.siteDef?.biome ?? "diablerie";
    if (grid.siteDef && grid.siteDef.biome !== this.lastBiome) {
      this.lastBiome = grid.siteDef.biome;
      this.tileSet.setBiome(grid.siteDef.biome);
    }

    // Smooth position interpolation for walking visual
    if (this.displayPlayerX === null || this.displayPlayerY === null || Math.abs(this.displayPlayerX - grid.playerPos.x) > 6) {
      this.displayPlayerX = grid.playerPos.x;
      this.displayPlayerY = grid.playerPos.y;
    } else {
      this.displayPlayerX += (grid.playerPos.x - this.displayPlayerX) * 0.35;
      this.displayPlayerY += (grid.playerPos.y - this.displayPlayerY) * 0.35;
      if (Math.abs(this.displayPlayerX - grid.playerPos.x) < 0.02) this.displayPlayerX = grid.playerPos.x;
      if (Math.abs(this.displayPlayerY - grid.playerPos.y) < 0.02) this.displayPlayerY = grid.playerPos.y;
    }

    const dispX = this.displayPlayerX;
    const dispY = this.displayPlayerY;
    const isAnimating = dispX !== grid.playerPos.x || dispY !== grid.playerPos.y;

    const ctx = this.ctx;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate view offset centered on interpolated display position
    const startX = dispX - Math.floor(this.viewportCols / 2);
    const startY = dispY - Math.floor(this.viewportRows / 2);

    const minVx = -1;
    const maxVx = this.viewportCols + 1;
    const minVy = -1;
    const maxVy = this.viewportRows + 1;

    for (let vy = minVy; vy <= maxVy; vy++) {
      for (let vx = minVx; vx <= maxVx; vx++) {
        const gx = Math.floor(startX + vx);
        const gy = Math.floor(startY + vy);
        const screenX = Math.round((vx - (startX - Math.floor(startX))) * TILE_SIZE);
        const screenY = Math.round((vy - (startY - Math.floor(startY))) * TILE_SIZE);

        if (gx < 0 || gx >= grid.width || gy < 0 || gy >= grid.height) {
          continue;
        }

        const isVisible = grid.visible[gy]?.[gx] ?? false;
        const isVisited = grid.visited[gy]?.[gx] ?? false;

        if (!isVisited) {
          // Pitch black fog of war
          ctx.fillStyle = "#000000";
          ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
          continue;
        }

        // Draw terrain tile
        const tileType = grid.getTile(gx, gy);
        const tileCvs = this.tileSet.getTileCanvas(tileType);
        ctx.drawImage(tileCvs, screenX, screenY, TILE_SIZE, TILE_SIZE);

        // Draw Entities if visible
        if (isVisible) {
          // Draw monsters or items
          const entity = grid.getEntityAt(gx, gy);
          if (entity) {
            const entityCvs = this.getEntityCanvas(entity, currentBiome);
            ctx.drawImage(entityCvs, screenX, screenY, TILE_SIZE, TILE_SIZE);

            // Draw HP bar for monsters
            if (entity.isHostile && entity.hp < entity.maxHp) {
              const hpPct = Math.max(0, entity.hp / entity.maxHp);
              const barW = TILE_SIZE - 4;
              const barY = screenY + TILE_SIZE - 4;
              ctx.fillStyle = "#000";
              ctx.fillRect(screenX + 2, barY, barW, 3);
              ctx.fillStyle = entity.hp > entity.maxHp * 0.4 ? "#2ecc71" : "#e74c3c";
              ctx.fillRect(screenX + 2, barY, barW * hpPct, 3);
            }
          }

          // Draw Player Party Leader if at gx, gy
          if (gx === grid.playerPos.x && gy === grid.playerPos.y) {
            const leaderChar = party[leaderIndex];
            const playerCvs = leaderChar
              ? heroSpriteDrawer.getHeroTileCanvas(leaderChar, currentBiome)
              : this.tileSet.getTileCanvas(TileType.FIGHTER);
            ctx.drawImage(playerCvs, screenX, screenY, TILE_SIZE, TILE_SIZE);
          }
          for (const [charId, position] of grid.partyPositions.entries()) {
            if (gx === position.x && gy === position.y) {
              const followerChar = party.find((member) => member.id === charId);
              const followerCvs = followerChar
                ? heroSpriteDrawer.getHeroTileCanvas(followerChar, currentBiome)
                : this.tileSet.getTileCanvas(TileType.PRIEST);
              ctx.drawImage(followerCvs, screenX, screenY, TILE_SIZE, TILE_SIZE);
              break;
            }
          }
        }

        // Shadow / Dimming mask for visited but not visible tiles
        if (!isVisible && isVisited) {
          ctx.fillStyle = "rgba(10, 10, 20, 0.75)";
          ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
        }

        // Cursor highlight
        if (this.cursorX === gx && this.cursorY === gy) {
          const cursorCvs = this.tileSet.getTileCanvas(TileType.CURSOR);
          ctx.drawImage(cursorCvs, screenX, screenY, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    if (isAnimating) {
      if (this.animFrameId !== null) cancelAnimationFrame(this.animFrameId);
      this.animFrameId = requestAnimationFrame(() => this.render(grid, party, leaderIndex));
    }
  }
}
