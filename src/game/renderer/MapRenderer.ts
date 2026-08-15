/**
 * Canvas renderer for Ultima V style 2D tile viewport.
 * Handles grid rendering, FOV lighting mask, entity sprites, and biome palette switching.
 */

import { MapGrid, type MapEntity } from "../level/MapGrid";
import { TileSet, TileType, TILE_SIZE } from "./TileSet";
import { monsterSpriteDrawer } from "./MonsterSprite";
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

    const ctx = this.ctx;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate view offset to center on player
    const startX = grid.playerPos.x - Math.floor(this.viewportCols / 2);
    const startY = grid.playerPos.y - Math.floor(this.viewportRows / 2);

    for (let vy = 0; vy < this.viewportRows; vy++) {
      for (let vx = 0; vx < this.viewportCols; vx++) {
        const gx = startX + vx;
        const gy = startY + vy;
        const screenX = vx * TILE_SIZE;
        const screenY = vy * TILE_SIZE;

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
              ctx.fillStyle = "#000";
              ctx.fillRect(screenX + 2, screenY + 28, 28, 3);
              ctx.fillStyle = entity.hp > entity.maxHp * 0.4 ? "#2ecc71" : "#e74c3c";
              ctx.fillRect(screenX + 2, screenY + 28, 28 * hpPct, 3);
            }
          }

          // Draw Player Party Leader if at gx, gy
          if (gx === grid.playerPos.x && gy === grid.playerPos.y) {
            const leaderChar = party[leaderIndex];
            const playerCvs = leaderChar
              ? this.tileSet.getHeroTileCanvas(leaderChar.className, leaderChar.method)
              : this.tileSet.getTileCanvas(TileType.FIGHTER);
            ctx.drawImage(playerCvs, screenX, screenY, TILE_SIZE, TILE_SIZE);
          }
          for (const [charId, position] of grid.partyPositions.entries()) {
            if (gx === position.x && gy === position.y) {
              const followerChar = party.find((member) => member.id === charId);
              const followerCvs = followerChar
                ? this.tileSet.getHeroTileCanvas(followerChar.className, followerChar.method)
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
  }
}
