/**
 * RetroDialogPanel: Ultima-inspired obsidian modal dialog frame with gold/amber borders.
 */

import Phaser from "phaser";
import { RENDER_SCALE } from "../display";

export interface RetroDialogOptions {
  title: string;
  body: string;
  options?: { label: string; action: () => void }[];
  onClose?: () => void;
}

export class RetroDialogPanel {
  private container: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, opts: RetroDialogOptions) {
    this.container = scene.add.container(x, y).setScrollFactor(0).setDepth(1000);

    const bg = scene.add.graphics();

    // Dark obsidian background fill
    bg.fillStyle(0x0c0d12, 0.95);
    bg.fillRect(-width / 2, -height / 2, width, height);

    // High-contrast double gold border (Ultima style)
    bg.lineStyle(2, 0xd4af37, 1);
    bg.strokeRect(-width / 2, -height / 2, width, height);

    bg.lineStyle(1, 0x8a7322, 0.8);
    bg.strokeRect(-width / 2 + 4, -height / 2 + 4, width - 8, height - 8);

    this.container.add(bg);

    // Title text
    const titleText = scene.add
      .text(0, -height / 2 + 18, opts.title.toUpperCase(), {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#ffd45f",
        stroke: "#000000",
        strokeThickness: 3,
        resolution: RENDER_SCALE,
      })
      .setOrigin(0.5);
    this.container.add(titleText);

    // Body text
    const bodyText = scene.add
      .text(0, -10, opts.body, {
        fontFamily: '"Trebuchet MS", Arial, sans-serif',
        fontSize: "12px",
        color: "#f0eee9",
        align: "center",
        wordWrap: { width: width - 32 },
        resolution: RENDER_SCALE,
      })
      .setOrigin(0.5);
    this.container.add(bodyText);
  }

  destroy(): void {
    this.container.destroy();
  }
}
