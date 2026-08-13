import Phaser from "phaser";
import { ANCESTRIES, type Ancestry, type ClassName } from "../../engine";
import { classDef } from "../../data";
import { RENDER_SCALE, GAME_H, GAME_W } from "../display";
import { textButton } from "../ui/button";
import type { VisualSkinId, ZonePackId } from "../visual/model";
import { ZONE_PACKS, zonePackInfo } from "../visual/skins";
import { startingClassesForZone, startingLocationsForZone } from "../startingChoices";
import { startRun } from "../quickstart";

/** Touch-complete new-run setup: destination, exact starting location, then class. */
export class NewGameScene extends Phaser.Scene {
  private zone: ZonePackId = "diablerie";
  private skinId: VisualSkinId = "rot-bramble";
  private className: ClassName = "fighter";
  private ancestry: Ancestry = "human";
  private dynamic: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super("NewGame");
  }

  create(): void {
    this.cameras.main.setZoom(RENDER_SCALE).centerOn(GAME_W / 2, GAME_H / 2);
    this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x090b11);
    this.add.text(GAME_W / 2, 32, "CHOOSE YOUR BEGINNING", {
      fontFamily: "Georgia, serif", fontSize: "28px", color: "#ffd45f",
      stroke: "#000000", strokeThickness: 4, resolution: RENDER_SCALE,
    }).setOrigin(0.5);
    this.add.text(GAME_W / 2, 62, "Choose a destination, location, class, and ancestry.", {
      fontFamily: "Consolas, monospace", fontSize: "11px", color: "#a0a4b0", resolution: RENDER_SCALE,
    }).setOrigin(0.5);
    this.renderChoices();
  }

  private track<T extends Phaser.GameObjects.GameObject>(object: T): T {
    this.dynamic.push(object);
    return object;
  }

  private renderChoices(): void {
    for (const object of this.dynamic) object.destroy();
    this.dynamic = [];

    this.track(this.add.text(52, 82, "1. DESTINATION", {
      fontFamily: "Consolas, monospace", fontSize: "11px", color: "#d9b54a", fontStyle: "bold", resolution: RENDER_SCALE,
    }));
    ZONE_PACKS.forEach((zone, index) => {
      const x = 190 + (index % 3) * 285;
      const y = 103 + Math.floor(index / 3) * 34;
      const selected = zone === this.zone;
      this.track(textButton(this, x, y, `${selected ? "◆" : "◇"} ${zonePackInfo(zone).scrollName}`, () => {
        this.zone = zone;
        this.skinId = startingLocationsForZone(zone)[0]!.id;
        if (!startingClassesForZone(zone).includes(this.className)) this.className = "fighter";
        this.renderChoices();
      }, { idleColor: selected ? "#ffd45f" : "#a0a4b0", fontSize: "12px", resolution: RENDER_SCALE }));
    });

    this.track(this.add.text(52, 166, "2. STARTING LOCATION", {
      fontFamily: "Consolas, monospace", fontSize: "11px", color: "#d9b54a", fontStyle: "bold", resolution: RENDER_SCALE,
    }));
    startingLocationsForZone(this.zone).forEach((skin, index) => {
      const selected = skin.id === this.skinId;
      this.track(textButton(this, 190 + index * 285, 190, `${selected ? "◆" : "◇"} ${skin.displayName}`, () => {
        this.skinId = skin.id;
        this.renderChoices();
      }, { idleColor: selected ? "#ffd45f" : "#a0a4b0", fontSize: "11px", resolution: RENDER_SCALE }));
    });

    this.track(this.add.text(52, 222, "3. STARTING CLASS", {
      fontFamily: "Consolas, monospace", fontSize: "11px", color: "#d9b54a", fontStyle: "bold", resolution: RENDER_SCALE,
    }));
    const classes = startingClassesForZone(this.zone);
    classes.forEach((className, index) => {
      const x = 190 + (index % 3) * 285;
      const y = 244 + Math.floor(index / 3) * 32;
      const selected = className === this.className;
      this.track(textButton(this, x, y, `${selected ? "◆" : "◇"} ${classDef(className).displayName}`, () => {
        this.className = className;
        this.renderChoices();
      }, { idleColor: selected ? "#ffd45f" : "#a0a4b0", fontSize: "12px", resolution: RENDER_SCALE }));
    });

    this.track(this.add.text(52, 302, "4. ANCESTRY", {
      fontFamily: "Consolas, monospace", fontSize: "11px", color: "#d9b54a", fontStyle: "bold", resolution: RENDER_SCALE,
    }));
    ANCESTRIES.forEach((ancestry, index) => {
      const selected = ancestry === this.ancestry;
      const label = ancestry === "half-orc"
        ? "Half-Orc"
        : ancestry[0]!.toUpperCase() + ancestry.slice(1);
      this.track(textButton(this, 170 + index * 210, 326, `${selected ? "◆" : "◇"} ${label}`, () => {
        this.ancestry = ancestry;
        this.renderChoices();
      }, { idleColor: selected ? "#ffd45f" : "#a0a4b0", fontSize: "12px", resolution: RENDER_SCALE }));
    });

    const chosenClass = classDef(this.className);
    const local = !["fighter", "thief", "priest", "wizard"].includes(this.className);
    const ancestryTrait: Record<Ancestry, string> = {
      human: "Ambitious: one extra starting talent",
      dwarf: "Stout: roll level-up HP with advantage, plate armor (no finesse)",
      elf: "Spellcraft: advantage on spell checks",
      "half-orc": "Mighty: +1 melee damage",
      gnome: "Small: advantage on trap evasion and DEX checks",
      "tiefling-deva": "Descendant: starts with a Patron Boon",
    };

    // Detail info box
    const box = this.add.graphics();
    box.fillStyle(0x05070d, 0.9);
    box.fillRoundedRect(52, 354, GAME_W - 104, 82, 6);
    box.lineStyle(1, 0x303444, 0.9);
    box.strokeRoundedRect(52, 354, GAME_W - 104, 82, 6);
    this.track(box);

    this.track(this.add.text(GAME_W / 2, 395,
      `${chosenClass.displayName.toUpperCase()}  •  ${chosenClass.hitDie} hit die  •  ${local ? "Local class tradition" : "Core class"}\n${ancestryTrait[this.ancestry]}\n${zonePackInfo(this.zone).flavor}`,
      { fontFamily: "Consolas, monospace", fontSize: "11px", color: "#c8c8d0", align: "center", lineSpacing: 5, resolution: RENDER_SCALE, wordWrap: { width: GAME_W - 130 } },
    ).setOrigin(0.5));

    this.track(textButton(this, 120, 472, "[ BACK ]", () => this.scene.start("Boot"), {
      idleColor: "#a0a4b0", fontSize: "14px", resolution: RENDER_SCALE,
    }));
    this.track(textButton(this, GAME_W / 2, 472, "[ BEGIN EXPEDITION ]", () => this.begin(), {
      idleColor: "#ffd45f", pressedColor: "#fff4cf", fontSize: "17px", resolution: RENDER_SCALE,
      padding: { x: 14, y: 7 },
    }));
  }

  private begin(): void {
    startRun(this, {
      zone: this.zone,
      skinId: this.skinId,
      className: this.className,
      ancestry: this.ancestry,
    });
  }
}
