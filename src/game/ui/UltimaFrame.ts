/**
 * UltimaFrame manages the classic Ultima V UI frame elements:
 * - Header bar (Adventure title, site info, goal description, round clock, torch status)
 * - Party status sidebar (HP bars, AC badges, leader star)
 * - Retro scrollable message log
 * - Command action bar
 */

import { Character } from "../../engine/character";

export class UltimaFrame {
  private locDisplay: HTMLElement;
  private turnDisplay: HTMLElement;
  private lightDisplay: HTMLElement;
  private partyList: HTMLElement;
  private logPanel: HTMLElement;

  constructor() {
    this.locDisplay = document.getElementById("loc-display")!;
    this.turnDisplay = document.getElementById("turn-display")!;
    this.lightDisplay = document.getElementById("light-display")!;
    this.partyList = document.getElementById("party-list")!;
    this.logPanel = document.getElementById("log-panel")!;
  }

  public updateHeader(
    advName: string,
    siteName: string,
    siteIndex: number,
    totalSites: number,
    sizeCategory: string,
    roomCount: number,
    goalDesc: string,
    round: number,
    torchSecondsRemaining: number,
    isTorchActive: boolean,
    gold: number,
    movementStatus = ""
  ): void {
    this.locDisplay.innerHTML = `
      <div><strong>Adv:</strong> ${advName}</div>
      <div><strong>Site ${siteIndex}/${totalSites}:</strong> ${siteName} (${sizeCategory.toUpperCase()}, ${roomCount} Rooms)</div>
      <div style="color: #f1c40f;"><strong>Goal:</strong> ${goalDesc}</div>
      <div style="color: #e6c669;"><strong>Gold:</strong> ${gold} gp</div>
    `;

    this.turnDisplay.textContent = `Round: ${round}${movementStatus ? ` · ${movementStatus}` : ""}`;

    if (isTorchActive) {
      const mins = Math.floor(torchSecondsRemaining / 60);
      const secs = torchSecondsRemaining % 60;
      const timeStr = `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
      this.lightDisplay.textContent = `Torch: ${timeStr}`;
      this.lightDisplay.className = "light-active";
    } else {
      this.lightDisplay.textContent = `Light: Dark`;
      this.lightDisplay.className = "";
    }
  }

  public updateParty(party: Character[], leaderIndex: number, onSelectLeader?: (idx: number) => void, autoFollowers: readonly boolean[] = [], onToggleAuto?: (idx: number) => void): void {
    this.partyList.innerHTML = "";

    party.forEach((char, idx) => {
      const card = document.createElement("div");
      const isLeader = idx === leaderIndex;
      card.className = `party-member-card ${isLeader ? "is-leader" : ""}`;
      card.onclick = () => onSelectLeader && onSelectLeader(idx);

      const hpPct = Math.max(0, Math.min(100, (char.hp / char.maxHp) * 100));
      let hpClass = "";
      if (hpPct < 30) hpClass = "danger";
      else if (hpPct < 60) hpClass = "warning";

      card.innerHTML = `
        <div class="member-header">
          <span class="member-name">${idx + 1}. ${char.name}</span>
          ${isLeader ? '<span class="leader-star">★ LEADER</span>' : ""}
        </div>
        <div class="member-stats">
          <span>${char.className.toUpperCase()} Lvl ${char.level}</span>
          <span>AC: ${char.ac}</span>
          <span>HP: ${char.hp}/${char.maxHp}</span>
        </div>
        <div class="hp-bar-bg">
          <div class="hp-bar-fill ${hpClass}" style="width: ${hpPct}%;"></div>
        </div>
      `;

      if (!isLeader) {
        const autoButton = document.createElement("button");
        autoButton.className = `auto-toggle ${autoFollowers[idx] ? "is-auto" : ""}`;
        autoButton.textContent = autoFollowers[idx] ? "AUTO" : "MANUAL";
        autoButton.title = "Toggle follower automation";
        autoButton.onclick = (event) => { event.stopPropagation(); onToggleAuto?.(idx); };
        card.querySelector(".member-header")?.appendChild(autoButton);
      }
      this.partyList.appendChild(card);
    });
  }

  public addLog(text: string, type: "system" | "prompt" | "combat" | "hit" | "item" | "spell" = "system"): void {
    const entry = document.createElement("div");
    entry.className = `log-entry log-${type}`;
    entry.textContent = text;
    this.logPanel.appendChild(entry);
    this.logPanel.scrollTop = this.logPanel.scrollHeight;
  }
}
