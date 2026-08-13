/**
 * VignetteOverlay: Renders atmospheric screen-edge vignettes for dark danger
 * and low torch / dying character states.
 */

import Phaser from "phaser";
import { GAME_H, GAME_W, RENDER_SCALE } from "../display";

export class VignetteOverlay {
  private graphics: Phaser.GameObjects.Graphics;
  private alphaPulse = 0;

  constructor(private scene: Phaser.Scene) {
    this.graphics = scene.add.graphics().setScrollFactor(0).setDepth(995);
  }

  update(now: number, isDying: boolean, lowTorch: boolean): void {
    this.graphics.clear();
    if (!isDying && !lowTorch) return;

    this.alphaPulse += 0.05;
    const pulse = 0.3 + 0.2 * Math.sin(this.alphaPulse);

    const w = GAME_W * RENDER_SCALE;
    const h = GAME_H * RENDER_SCALE;

    if (isDying) {
      // Crimson pulse vignette on dying state
      this.graphics.fillStyle(0x880000, pulse * 0.4);
      this.graphics.fillRect(0, 0, w, 16);
      this.graphics.fillRect(0, h - 16, w, 16);
      this.graphics.fillRect(0, 0, 16, h);
      this.graphics.fillRect(w - 16, 0, 16, h);
    } else if (lowTorch) {
      // Dark shadow edge vignette when torch is guttering out
      this.graphics.fillStyle(0x000000, pulse * 0.5);
      this.graphics.fillRect(0, 0, w, 12);
      this.graphics.fillRect(0, h - 12, w, 12);
      this.graphics.fillRect(0, 0, 12, h);
      this.graphics.fillRect(w - 12, 0, 12, h);
    }
  }

  destroy(): void {
    this.graphics.destroy();
  }
}
