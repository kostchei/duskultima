/** Boot: generate all runtime textures, create the game context, start the dungeon. */

import Phaser from "phaser";
import { generateTextures } from "../textures";
import { IS_MOBILE_DISPLAY, RENDER_SCALE, GAME_W, GAME_H } from "../display";
import { SaveRepository } from "../SaveRepository";
import { showAlert, showConfirm } from "../ui/modal";
import { currentInputFamily } from "../input/inputFamily";
import { textButton } from "../ui/button";
import { randomRunSelection, startRun } from "../quickstart";

const SAVE_SLOTS = [0, 1, 2, 3];

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  private anySaveExists(): boolean {
    return SAVE_SLOTS.some((slot) => SaveRepository.exists(slot));
  }

  /** Roll a beginning and go. `skipBriefing` is the no-intro-screens mobile path. */
  private quickstart(skipBriefing: boolean): void {
    startRun(this, { ...randomRunSelection(), ancestry: "human" }, skipBriefing);
  }

  create(): void {
    // The framebuffer is render-scaled; keep the title screen in the same
    // logical 960x540 view used by the dungeon, HUD, and showroom scenes.
    this.cameras.main.setZoom(RENDER_SCALE).centerOn(GAME_W / 2, GAME_H / 2);

    if (!this.textures.exists("tile-wall-0")) {
      generateTextures(this);
      this.createAnimations();
    }
    if (new URLSearchParams(window.location.search).get("showroom") === "equipment") {
      this.scene.start("EquipmentShowroom");
      return;
    }

    // Mobile skips the title screen entirely and lands in play. Only on the
    // session's first Boot, so returning here from in-game doesn't bounce
    // straight back out — and only with nothing to lose, since a fresh run
    // eventually overwrites the autosave.
    if (IS_MOBILE_DISPLAY && !this.registry.get("bootShown") && !this.anySaveExists()) {
      this.quickstart(true);
      return;
    }
    this.registry.set("bootShown", true);

    const w = GAME_W;
    const h = GAME_H;

    // Title screen background
    this.add.rectangle(w / 2, h / 2, w, h, 0x090b11);

    // Title
    this.add.text(w / 2, h / 2 - 130, "SHADOWDORK", {
      fontFamily: "Georgia, serif",
      fontSize: "44px",
      color: "#ffd45f",
      stroke: "#000000",
      strokeThickness: 5,
      resolution: RENDER_SCALE,
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 - 80, "Explore the depths as your torch dwindles", {
      fontFamily: 'Consolas, monospace',
      fontSize: "12px",
      color: "#808490",
      resolution: RENDER_SCALE,
    }).setOrigin(0.5);

    this.add.text(
      w / 2,
      h / 2 - 55,
      currentInputFamily() === "touch" ? "Playable with Touch Controls" : "Desktop Keyboard Recommended",
      {
      fontFamily: 'Consolas, monospace',
      fontSize: "10px",
      color: "#ffd45f",
      resolution: RENDER_SCALE,
    }).setOrigin(0.5);

    // Any fresh run eventually overwrites the autosave, so both start paths
    // ask first when there is progress on disk.
    const guardProgress = (begin: () => void) => {
      if (this.anySaveExists()) {
        showConfirm(this, "Starting a new game will eventually overwrite your autosave and progress. Proceed?", begin);
        return;
      }
      begin();
    };

    // Quickstart — a rolled destination, location, and class, straight into play.
    textButton(
      this,
      w / 2,
      h / 2 - 22,
      "[ QUICKSTART ]",
      () => guardProgress(() => this.quickstart(false)),
      {
        fontSize: "16px",
        idleColor: "#ffd45f",
        pressedColor: "#fff4cf",
        resolution: RENDER_SCALE,
        padding: { x: 10, y: 5 },
      },
    );

    // New Game Button — the first tap a mobile player ever makes here, so it
    // gets the shared textButton's larger hit rect and pressed feedback.
    textButton(
      this,
      w / 2,
      h / 2 + 12,
      "[ Start New Game ]",
      () => guardProgress(() => this.scene.start("NewGame")),
      {
        fontSize: "14px",
        idleColor: "#a0a4b0",
        pressedColor: "#ffffff",
        resolution: RENDER_SCALE,
        padding: { x: 10, y: 5 },
      },
    );

    // Load slots
    this.add.text(w / 2, h / 2 + 50, "RESUME EXPEDITION", {
      fontFamily: 'Consolas, monospace',
      fontSize: "12px",
      color: "#a0a4b0",
      fontStyle: "bold",
      resolution: RENDER_SCALE,
    }).setOrigin(0.5);

    const makeLoadBtn = (y: number, label: string, slotId: number) => {
      const hasSaved = SaveRepository.exists(slotId);
      let btnText = `[ ${label}: empty ]`;
      let slotData: any = null;
      if (hasSaved) {
        try {
          slotData = SaveRepository.load(slotId);
          if (slotData) {
            const leader = slotData.party.find((p: any) => !p.dead) || slotData.party[0];
            const leaderName = leader ? `${leader.name} (Lvl ${leader.level})` : "Party";
            const room = slotData.roomId
              ? slotData.roomId.replace(/^room-/, "Room ").replace(/^sanctuary$/, "Sanctuary")
              : slotData.currentRoom != null
                ? `Room ${slotData.currentRoom}`
                : "In progress";
            btnText = `[ Load ${label}: ${leaderName} | ${room} ]`;
          } else {
            btnText = `[ Load ${label}: empty ]`;
          }
        } catch {
          btnText = `[ Load ${label}: corrupt ]`;
        }
      }

      const btn = this.add.text(w / 2, y, btnText, {
        fontFamily: 'Consolas, monospace',
        fontSize: "12px",
        color: hasSaved ? "#ffd45f" : "#4a4d55",
        padding: { x: 8, y: 4 },
        resolution: RENDER_SCALE,
      }).setOrigin(0.5);

      if (hasSaved && slotData) {
        btn.setInteractive({ useHandCursor: true })
        .on("pointerover", () => btn.setColor("#ffffff"))
        .on("pointerout", () => btn.setColor("#ffd45f"))
        .on("pointerdown", () => {
          this.registry.set("loadState", slotData);
          this.scene.start("Dungeon");
        });
      }
      return btn;
    };

    makeLoadBtn(h / 2 + 80, "Slot 1", 1);
    makeLoadBtn(h / 2 + 108, "Slot 2", 2);
    makeLoadBtn(h / 2 + 136, "Slot 3", 3);
    makeLoadBtn(h / 2 + 164, "Auto-Save", 0);

    // Export/Import
    const exportBtn = this.add.text(w / 2 - 80, h / 2 + 202, "[ Export Saves ]", {
      fontFamily: 'Consolas, monospace',
      fontSize: "11px",
      color: "#a0a4b0",
      padding: { x: 5, y: 3 },
      resolution: RENDER_SCALE,
    }).setOrigin(0.5);

    const importBtn = this.add.text(w / 2 + 80, h / 2 + 202, "[ Import Saves ]", {
      fontFamily: 'Consolas, monospace',
      fontSize: "11px",
      color: "#a0a4b0",
      padding: { x: 5, y: 3 },
      resolution: RENDER_SCALE,
    }).setOrigin(0.5);

    exportBtn.setInteractive({ useHandCursor: true })
      .on("pointerover", () => exportBtn.setColor("#ffffff"))
      .on("pointerout", () => exportBtn.setColor("#a0a4b0"))
      .on("pointerdown", () => {
        try {
          const json = SaveRepository.exportAll();
          const blob = new Blob([json], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `shadowdork_saves_${Date.now()}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (e: any) {
          showAlert(this, `Failed to export saves: ${e.message}`);
        }
      });

    importBtn.setInteractive({ useHandCursor: true })
      .on("pointerover", () => importBtn.setColor("#ffffff"))
      .on("pointerout", () => importBtn.setColor("#a0a4b0"))
      .on("pointerdown", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (evt) => {
            const contents = evt.target?.result as string;
            const res = SaveRepository.importAll(contents);
            if (res.success) {
              showAlert(this, `Successfully imported ${res.count} save slot(s)!`, () => this.scene.restart());
            } else {
              showAlert(this, `Import failed: ${res.error}`);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      });

  }

  /**
   * Monster animations are created on first sighting alongside the monster's
   * textures (`visual/monsterArt.ts`), so this only has to exist for whatever
   * else the boot scene animates. Nothing does yet.
   */
  private createAnimations(): void {}
}
