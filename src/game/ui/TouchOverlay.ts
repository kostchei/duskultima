import Phaser from "phaser";
import { RENDER_SCALE } from "../display";
import type { GameAction } from "../input/actions";

export interface TouchActionSink {
  pressAction(action: GameAction): void;
  releaseAction(action: GameAction): void;
}

const TEXT = {
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  color: "#f0eee9",
  resolution: RENDER_SCALE,
} as const;

/** Mobile controls: held D-pad, four primary verbs, and compact utility verbs. */
export function createTouchOverlay(scene: Phaser.Scene, sink: TouchActionSink): Phaser.GameObjects.Container {
  const container = scene.add.container(0, 0).setDepth(2000);
  const controlScale = 1.5;
  const button = (x: number, y: number, label: string, action: GameAction, color: number, radius = 20) => {
    const circle = scene.add.circle(x, y, radius * controlScale, color, 0.75).setInteractive();
    const text = scene.add.text(x, y, label, {
      ...TEXT,
      fontSize: `${10 * controlScale}px`,
      fontStyle: "bold",
    }).setOrigin(0.5).setAlpha(0.75);
    circle.on("pointerdown", () => {
      circle.setAlpha(1);
      text.setAlpha(1);
      sink.pressAction(action);
    });
    const release = () => {
      circle.setAlpha(0.75);
      text.setAlpha(0.75);
      sink.releaseAction(action);
    };
    circle.on("pointerup", release);
    circle.on("pointerout", release);
    container.add([circle, text]);
  };

  // Pull the enlarged clusters inward and up so their larger hit areas remain
  // fully on-screen while preserving comfortable gaps between neighboring taps.
  const padX = 92;
  const padY = 448;
  const spacing = 38 * controlScale;
  button(padX, padY - spacing, "▲", "moveUp", 0x1f2430);
  button(padX, padY + spacing, "▼", "moveDown", 0x1f2430);
  button(padX - spacing, padY, "◀", "moveLeft", 0x1f2430);
  button(padX + spacing, padY, "▶", "moveRight", 0x1f2430);

  const actX = 858;
  const actY = 448;
  button(actX, actY - spacing, "ATK", "attack", 0x9e2a2b);
  button(actX + spacing, actY, "JUMP", "jump", 0x2a9d8f);
  button(actX - spacing, actY, "USE", "interact", 0xe76f51);
  button(actX, actY + spacing, "CAST", "cast", 0x4a4e69);
  button(actX - 90 * controlScale, actY + 36 * controlScale, "LGT", "torch", 0x8b6f22, 16);
  button(actX - 90 * controlScale, actY - 2 * controlScale, "5s", "rewind", 0x315b7d, 16);
  return container;
}
