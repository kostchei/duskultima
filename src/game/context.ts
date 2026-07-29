/** Shared game context: the engine instance plus cross-scene message bus. */

import Phaser from "phaser";
import { Engine } from "../engine";
import { registerTables } from "../data";
import { torchDurationMs } from "./MobilePrefs";

export interface GameMessage {
  text: string;
  color: string;
}

export class GameContext {
  readonly engine: Engine;
  readonly events = new Phaser.Events.EventEmitter();
  readonly messages: GameMessage[] = [];

  /** Monsters slain this run (for the end-of-run summary). */
  kills = 0;

  constructor() {
    this.engine = new Engine({
      // Playtest house rules: torches burn 3 real minutes instead of 1 hour,
      // and a crawling round is 45 s so random-encounter checks matter in a
      // 10-minute run. RAW values are one config change away.
      config: { torchMs: torchDurationMs(), roundMs: 3000, crawlingRoundMs: 45 * 1000 },
    });
    registerTables(this.engine);
  }

  say(text: string, color = "#c8c8d0"): void {
    this.messages.push({ text, color });
    if (this.messages.length > 60) this.messages.shift();
    this.events.emit("message");
  }

  /** Running total of coins looted this campaign. XP is awarded per treasure find by quality. */
  private coinsBanked = 0;

  set totalCoins(value: number) {
    this.coinsBanked = value;
  }

  get totalCoins(): number {
    return this.coinsBanked;
  }

  /** Bank newly looted coins. Treasure XP is resolved by the find that produced them. */
  bankCoins(qty: number): void {
    if (!Number.isInteger(qty) || qty < 1) throw new Error(`Coin quantity must be a positive integer, got ${qty}`);
    this.coinsBanked += qty;
  }

  /**
   * Spendable wallet, separate from the historical {@link coinsBanked}.
   * Collecting treasure feeds both; buying and downtime spend from here;
   * selling adds here only (no XP). See docs/shops-plan.md.
   */
  private gold = 0;

  set spendableGold(value: number) {
    if (value < 0) throw new Error(`Wallet cannot be negative, got ${value}`);
    this.gold = value;
  }

  get spendableGold(): number {
    return this.gold;
  }

  /** Add coin to the wallet (treasure pickup or a sale). Never grants XP. */
  earnGold(qty: number): void {
    if (qty < 1) throw new Error(`Gold quantity must be >= 1, got ${qty}`);
    this.gold += qty;
  }

  /** Spend from the wallet. Throws rather than going negative. */
  spendGold(qty: number): void {
    if (qty < 1) throw new Error(`Gold quantity must be >= 1, got ${qty}`);
    if (qty > this.gold) throw new Error(`Cannot spend ${qty}: wallet holds ${this.gold}`);
    this.gold -= qty;
  }
}
