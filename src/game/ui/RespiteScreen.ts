/**
 * Respite: the full-screen stop between destinations.
 *
 * The party is out of the vault but has not chosen where to go next. Everything
 * that used to be reachable only from a mid-run safe-zone room — trade and
 * downtime — happens here, alongside party-wide gear organisation that the
 * per-character gear overlay cannot do.
 *
 * Click-driven rather than cursor-driven: the panel shows all four members at
 * once, so a single selection cursor would be the wrong shape. The screen owns
 * input while it is up (see the `respite` game mode).
 */

import Phaser from "phaser";
import type { Character, ItemDef } from "../../engine";
import {
  TRAINING_STAT,
  carouseCost,
  instructorTrainingDc,
  type CarouseTier,
  type TrainingSkill,
} from "../../engine";
import { RENDER_SCALE } from "../display";
import { GAME_W, GAME_H } from "../display";
import { buyBlocker, buyPrice, isSellable, sellPrice, stockItems } from "../systems/shop";

const TITLE_STYLE = {
  fontFamily: "Georgia, serif",
  fontSize: "22px",
  color: "#ffd45f",
  stroke: "#000000",
  strokeThickness: 3,
  resolution: RENDER_SCALE,
} as const;

const LABEL_STYLE = {
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  fontSize: "10px",
  color: "#f0eee9",
  resolution: RENDER_SCALE,
} as const;

const DATA_STYLE = {
  fontFamily: "Consolas, monospace",
  fontSize: "9px",
  color: "#c9cbd1",
  resolution: RENDER_SCALE,
} as const;

/** Items a member can put on, so [EQUIP] only appears where it means something. */
function isEquippable(def: ItemDef): boolean {
  return def.armor !== undefined || def.shield === true
    || (def.tags.includes("weapon") && def.damage !== undefined);
}

const TABS = ["GEAR", "TRADE", "DOWNTIME"] as const;
export type RespiteTab = (typeof TABS)[number];

const CAROUSE_TIERS: readonly CarouseTier[] = ["humble", "bold", "legendary"];
const TRAINING_SKILLS: readonly TrainingSkill[] = ["athletics", "stealth", "lore", "survival"];

/** Everything the screen needs from the scene, kept narrow so it stays testable. */
export interface RespiteHost {
  members(): readonly { character: Character; displayName: string }[];
  gold(): number;
  zoneName(): string;
  /** True once this destination's single downtime action has been spent. */
  downtimeSpent(): boolean;
  trainingDcFor(characterId: string, skill: TrainingSkill): number;

  moveItem(fromId: string, toId: string, itemId: string): void;
  equipItem(characterId: string, itemId: string): void;
  dropItem(characterId: string, itemId: string): void;
  sellItem(characterId: string, itemId: string): void;
  buyItem(characterId: string, itemId: string): void;
  carouse(characterId: string, tier: CarouseTier): void;
  train(characterId: string, skill: TrainingSkill): void;
  depart(): void;
}

interface Selection {
  characterId: string;
  itemId: string;
}

export class RespiteScreen {
  readonly container: Phaser.GameObjects.Container;
  private tab: RespiteTab = "GEAR";
  private selection: Selection | null = null;
  /** Who carouses or trains — the panel acts on one member at a time. */
  private activeMemberId: string | null = null;
  private body: Phaser.GameObjects.GameObject[] = [];

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly host: RespiteHost,
    private readonly accent: number,
  ) {
    this.container = scene.add.container(0, 0).setDepth(2100);
    this.build();
  }

  destroy(): void {
    this.container.destroy();
  }

  private accentColor(): string {
    return `#${this.accent.toString(16).padStart(6, "0")}`;
  }

  /** Chrome that never changes; the tab body is rebuilt separately. */
  private build(): void {
    // Fully opaque: the run HUD sits below this and any translucency lets the
    // party panel and log ghost through the columns.
    const bg = this.scene.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x04050a, 1).setInteractive();
    const frame = this.scene.add.graphics();
    frame.lineStyle(2, this.accent, 0.85).strokeRoundedRect(10, 10, GAME_W - 20, GAME_H - 20, 8);
    this.container.add([bg, frame]);
    this.refresh();
  }

  /** Rebuild everything below the frame. Cheap enough at this size, and it keeps
   * every panel a pure function of current party state rather than a diff. */
  refresh(): void {
    for (const object of this.body) object.destroy();
    this.body = [];

    const title = this.scene.add.text(28, 24, "RESPITE", TITLE_STYLE);
    const where = this.scene.add
      .text(28, 52, `${this.host.zoneName().toUpperCase()}  —  the road out`, {
        ...DATA_STYLE,
        color: "#9fa5b1",
      });
    const purse = this.scene.add
      .text(GAME_W - 28, 30, `${this.host.gold()} GOLD`, { ...LABEL_STYLE, fontSize: "13px", color: "#e3c56d" })
      .setOrigin(1, 0);
    const depart = this.textButton(GAME_W - 28, 52, "[ DEPART → ]", () => this.host.depart(), "12px");
    depart.setOrigin(1, 0);
    this.push(title, where, purse, depart);

    let tabX = 28;
    for (const tab of TABS) {
      const active = tab === this.tab;
      const button = this.textButton(tabX, 82, active ? `▸ ${tab}` : `  ${tab}`, () => {
        this.tab = tab;
        this.selection = null;
        this.refresh();
      }, "12px");
      button.setColor(active ? this.accentColor() : "#8f949e");
      this.push(button);
      tabX += button.width + 26;
    }
    const rule = this.scene.add.graphics();
    rule.fillStyle(this.accent, 0.55).fillRect(28, 102, GAME_W - 56, 1);
    this.push(rule);

    if (this.tab === "GEAR") this.buildGear();
    else if (this.tab === "TRADE") this.buildTrade();
    else this.buildDowntime();
  }

  private push(...objects: Phaser.GameObjects.GameObject[]): void {
    this.body.push(...objects);
    this.container.add(objects);
  }

  private textButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void,
    fontSize = "10px",
    enabled = true,
  ): Phaser.GameObjects.Text {
    const text = this.scene.add.text(x, y, label, { ...LABEL_STYLE, fontSize });
    if (!enabled) {
      text.setColor("#5d616b");
      return text;
    }
    const base = "#f0eee9";
    text
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => text.setColor("#ffffff"))
      .on("pointerout", () => text.setColor(base))
      .on("pointerdown", () => onClick());
    return text;
  }

  // ---------------------------------------------------------------- gear ----

  /** Four columns, one per living member, each a clickable pack. */
  private buildGear(): void {
    const members = this.host.members();
    const columnW = Math.floor((GAME_W - 56) / Math.max(1, members.length));
    members.forEach((member, index) => {
      const c = member.character;
      const x = 28 + index * columnW;
      const used = c.inventory.slotsUsed();
      const header = this.scene.add.text(x, 116, `${c.name}  L${c.level}`, {
        ...LABEL_STYLE,
        fontSize: "11px",
        color: this.accentColor(),
      });
      const role = this.scene.add.text(x, 132, `${member.displayName}  ·  ${used}/${c.inventory.capacity} slots`, {
        ...DATA_STYLE,
        color: "#9fa5b1",
      });
      const worn = this.scene.add.text(
        x,
        148,
        `W ${c.wieldedWeapon?.name ?? "—"}\nA ${c.wornArmor?.name ?? "—"}\nS ${c.carriedShield?.name ?? "—"}`,
        { ...DATA_STYLE, wordWrap: { width: columnW - 12 }, lineSpacing: 2 },
      );
      this.push(header, role, worn);

      let y = 148 + worn.height + 8;
      for (const stack of c.inventory.all()) {
        const selected = this.selection?.characterId === c.id && this.selection.itemId === stack.def.id;
        const equipped = c.wieldedWeapon?.id === stack.def.id
          || c.wornArmor?.id === stack.def.id
          || c.carriedShield?.id === stack.def.id;
        const row = this.textButton(
          x,
          y,
          `${selected ? "▸" : " "}${stack.qty > 1 ? `${stack.qty}x ` : ""}${stack.def.name}${equipped ? " [EQ]" : ""}`,
          () => {
            this.selection = selected ? null : { characterId: c.id, itemId: stack.def.id };
            this.refresh();
          },
          "9px",
        );
        row.setColor(selected ? "#ffd45f" : equipped ? "#9fd8a0" : "#f0eee9");
        this.push(row);
        y += 13;
        if (y > GAME_H - 96) break;
      }
    });

    this.buildGearActions(members);
  }

  /** The action row for the selected item: equip, drop, or hand to anyone else. */
  private buildGearActions(members: readonly { character: Character; displayName: string }[]): void {
    const y = GAME_H - 70;
    if (!this.selection) {
      this.push(
        this.scene.add.text(28, y, "Click an item to move, equip, or drop it.", {
          ...DATA_STYLE,
          color: "#8f949e",
        }),
      );
      return;
    }
    const selection = this.selection;
    const owner = members.find((member) => member.character.id === selection.characterId);
    if (!owner) {
      // The holder died or left the party between refreshes; the selection is stale.
      this.selection = null;
      this.refresh();
      return;
    }
    const def = owner.character.inventory.all().find((stack) => stack.def.id === selection.itemId)?.def;
    if (!def) {
      this.selection = null;
      this.refresh();
      return;
    }

    const label = this.scene.add.text(28, y - 18, `${def.name} — ${owner.character.name}`, {
      ...LABEL_STYLE,
      fontSize: "11px",
      color: "#ffd45f",
    });
    this.push(label);

    let x = 28;
    const add = (text: string, onClick: () => void, enabled = true) => {
      const button = this.textButton(x, y, text, onClick, "10px", enabled);
      this.push(button);
      x += button.width + 18;
    };

    if (isEquippable(def)) {
      add("[ EQUIP ]", () => {
        this.host.equipItem(owner.character.id, def.id);
        this.refresh();
      });
    }
    for (const other of members) {
      if (other.character.id === owner.character.id) continue;
      const room = other.character.inventory.canAdd(def);
      add(`[ → ${other.character.name} ]`, () => {
        this.host.moveItem(owner.character.id, other.character.id, def.id);
        this.selection = { characterId: other.character.id, itemId: def.id };
        this.refresh();
      }, room);
    }
    add("[ DROP ]", () => {
      this.host.dropItem(owner.character.id, def.id);
      this.selection = null;
      this.refresh();
    });
  }

  // --------------------------------------------------------------- trade ----

  /** Sell from any pack on the left, buy into the active member on the right. */
  private buildTrade(): void {
    const members = this.host.members();
    if (members.length === 0) return;
    const active = this.activeMember(members);

    const sellTitle = this.scene.add.text(28, 116, "SELL", {
      ...LABEL_STYLE, fontSize: "11px", color: this.accentColor(), fontStyle: "bold",
    });
    this.push(sellTitle);
    let y = 136;
    let sold = 0;
    for (const member of members) {
      for (const stack of member.character.inventory.all()) {
        if (!isSellable(stack.def)) continue;
        if (y > GAME_H - 90) break;
        const price = sellPrice(stack.def);
        const button = this.textButton(
          28,
          y,
          `${stack.qty}x ${stack.def.name} (${member.character.name}) — ${price}g`,
          () => {
            this.host.sellItem(member.character.id, stack.def.id);
            this.refresh();
          },
          "9px",
        );
        this.push(button);
        y += 14;
        sold++;
      }
    }
    if (sold === 0) {
      this.push(this.scene.add.text(28, 136, "Nothing the party carries has a buyer.", {
        ...DATA_STYLE, color: "#8f949e",
      }));
    }

    const buyX = GAME_W / 2 + 20;
    const buyTitle = this.scene.add.text(buyX, 116, `BUY → ${active.character.name}`, {
      ...LABEL_STYLE, fontSize: "11px", color: this.accentColor(), fontStyle: "bold",
    });
    this.push(buyTitle, this.memberSwitcher(members, buyX, GAME_H - 70));
    y = 136;
    for (const def of stockItems()) {
      const block = buyBlocker(
        { spendableGold: this.host.gold(), earnGold: () => {}, spendGold: () => {} },
        active.character.inventory,
        def,
      );
      const why = block === "gold" ? " (no gold)" : block === "room" ? " (no room)" : "";
      const button = this.textButton(
        buyX,
        y,
        `${def.name} — ${buyPrice(def)}g${why}`,
        () => {
          this.host.buyItem(active.character.id, def.id);
          this.refresh();
        },
        "9px",
        block === null,
      );
      this.push(button);
      y += 14;
    }
  }

  // ------------------------------------------------------------ downtime ----

  private buildDowntime(): void {
    const members = this.host.members();
    if (members.length === 0) return;
    const active = this.activeMember(members);
    const spent = this.host.downtimeSpent();

    this.push(this.memberSwitcher(members, 28, 116));

    const note = spent
      ? "This destination's downtime is already spent."
      : "One downtime action per destination — carouse or train.";
    this.push(this.scene.add.text(28, 140, note, { ...DATA_STYLE, color: spent ? "#d09070" : "#9fa5b1" }));

    const carouseTitle = this.scene.add.text(28, 170, "CAROUSE", {
      ...LABEL_STYLE, fontSize: "11px", color: this.accentColor(), fontStyle: "bold",
    });
    this.push(carouseTitle);
    let y = 190;
    for (const tier of CAROUSE_TIERS) {
      const cost = carouseCost(tier);
      const affordable = !spent && this.host.gold() >= cost;
      const button = this.textButton(28, y, `[ ${tier} revel — ${cost}g ]`, () => {
        this.host.carouse(active.character.id, tier);
        this.refresh();
      }, "10px", affordable);
      this.push(button);
      y += 18;
    }

    const trainTitle = this.scene.add.text(GAME_W / 2 + 20, 170, "TRAIN (25g)", {
      ...LABEL_STYLE, fontSize: "11px", color: this.accentColor(), fontStyle: "bold",
    });
    this.push(trainTitle);
    y = 190;
    for (const skill of TRAINING_SKILLS) {
      const dc = this.host.trainingDcFor(active.character.id, skill);
      const trained = active.character.isTrainedIn(skill);
      const enabled = !spent && !trained && this.host.gold() >= 25;
      const button = this.textButton(
        GAME_W / 2 + 20,
        y,
        `[ ${skill} — ${TRAINING_STAT[skill]} DC ${dc}${trained ? ", trained" : ""} ]`,
        () => {
          this.host.train(active.character.id, skill);
          this.refresh();
        },
        "10px",
        enabled,
      );
      this.push(button);
      y += 18;
    }
  }

  // --------------------------------------------------------------- shared ---

  private activeMember(
    members: readonly { character: Character; displayName: string }[],
  ): { character: Character; displayName: string } {
    const found = members.find((member) => member.character.id === this.activeMemberId);
    if (found) return found;
    this.activeMemberId = members[0]!.character.id;
    return members[0]!;
  }

  /** Row of member names; clicking one makes it the target of buys and downtime. */
  private memberSwitcher(
    members: readonly { character: Character; displayName: string }[],
    x: number,
    y: number,
  ): Phaser.GameObjects.Container {
    const row = this.scene.add.container(x, y);
    let offset = 0;
    for (const member of members) {
      const active = member.character.id === this.activeMemberId;
      const button = this.textButton(offset, 0, active ? `▸${member.character.name}` : ` ${member.character.name}`, () => {
        this.activeMemberId = member.character.id;
        this.refresh();
      }, "10px");
      button.setColor(active ? "#ffd45f" : "#a8adb6");
      row.add(button);
      offset += button.width + 14;
    }
    return row;
  }
}
