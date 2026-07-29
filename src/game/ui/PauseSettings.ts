import Phaser from "phaser";
import { masterVolume } from "../audio/context";
import { GAME_H, GAME_W, RENDER_SCALE } from "../display";
import { REBINDABLE_KEYS, isRebindableKey } from "../input/bindings";
import type { GameAction } from "../input/actions";
import {
  saveVolumePref,
  torchDurationPref,
  volumePref,
  type TorchDurationSetting,
} from "../MobilePrefs";

export interface SettingsHost {
  keyForAction(action: GameAction): string;
  setKeyBinding(action: GameAction, key: string): void;
  resetKeyBindings(): void;
  setTorchDuration(setting: TorchDurationSetting): void;
}

const STYLE = {
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  color: "#f0eee9",
  resolution: RENDER_SCALE,
} as const;

const BINDINGS: readonly [GameAction, string][] = [
  ["jump", "Jump"],
  ["attack", "Attack"],
  ["interact", "Interact"],
  ["cast", "Cast"],
  ["rewind", "Rewind"],
];
const TORCHES: TorchDurationSetting[] = ["3m", "10m", "60m"];

export function createPauseSettings(
  scene: Phaser.Scene,
  host: SettingsHost,
  accent: number,
  onClose: () => void,
): Phaser.GameObjects.Container {
  const children: Phaser.GameObjects.GameObject[] = [];
  const bg = scene.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x020205, 0.82).setInteractive();
  const panel = scene.add.graphics();
  panel.fillStyle(0x05060a, 0.97).fillRoundedRect(GAME_W / 2 - 250, GAME_H / 2 - 190, 500, 380, 8);
  panel.lineStyle(2, accent, 0.9).strokeRoundedRect(GAME_W / 2 - 250, GAME_H / 2 - 190, 500, 380, 8);
  children.push(bg, panel);

  const text = (x: number, y: number, value: string, size = "13px", color = "#f0eee9") => {
    const node = scene.add.text(x, y, value, { ...STYLE, fontSize: size, color }).setOrigin(0.5);
    children.push(node);
    return node;
  };
  const click = (x: number, y: number, value: string, fn: () => void) => {
    const node = text(x, y, value, "13px", "#aeb7c8").setInteractive({ useHandCursor: true });
    node.on("pointerover", () => node.setColor("#ffd45f"));
    node.on("pointerout", () => node.setColor("#aeb7c8"));
    node.on("pointerdown", fn);
    return node;
  };

  text(GAME_W / 2, 92, "SETTINGS", "26px", "#ffd45f");
  const volume = text(GAME_W / 2, 135, `Volume ${Math.round(volumePref() * 100)}%`);
  click(GAME_W / 2 - 125, 135, "[ − ]", () => {
    saveVolumePref(Math.max(0, masterVolume() - 0.1));
    volume.setText(`Volume ${Math.round(masterVolume() * 100)}%`);
  });
  click(GAME_W / 2 + 125, 135, "[ + ]", () => {
    saveVolumePref(Math.min(1, masterVolume() + 0.1));
    volume.setText(`Volume ${Math.round(masterVolume() * 100)}%`);
  });

  const torch = text(GAME_W / 2, 174, `Torch duration ${torchDurationPref()}`);
  click(GAME_W / 2 + 145, 174, "[ CHANGE ]", () => {
    const current = torchDurationPref();
    const next = TORCHES[(TORCHES.indexOf(current) + 1) % TORCHES.length]!;
    host.setTorchDuration(next);
    torch.setText(`Torch duration ${next} (new torches)`);
  });

  text(GAME_W / 2, 210, "KEY BINDINGS — tap a row to cycle", "12px", "#9ea8ba");
  const bindingRows = new Map<GameAction, { label: string; node: Phaser.GameObjects.Text }>();
  const refreshBindings = () => {
    for (const [action, row] of bindingRows) {
      row.node.setText(`[ ${row.label.padEnd(9)} ${host.keyForAction(action)} ]`);
    }
  };
  BINDINGS.forEach(([action, label], index) => {
    const row = click(GAME_W / 2, 240 + index * 28, "", () => {
      const current = host.keyForAction(action);
      const currentIndex = isRebindableKey(current) ? REBINDABLE_KEYS.indexOf(current) : -1;
      const next = REBINDABLE_KEYS[(currentIndex + 1) % REBINDABLE_KEYS.length]!;
      host.setKeyBinding(action, next);
      refreshBindings();
    });
    bindingRows.set(action, { label, node: row });
  });
  refreshBindings();

  click(GAME_W / 2 - 90, 400, "[ RESET KEYS ]", () => {
    host.resetKeyBindings();
    onClose();
  });
  click(GAME_W / 2 + 90, 400, "[ CLOSE ]", onClose);
  return scene.add.container(0, 0, children).setDepth(2100);
}
