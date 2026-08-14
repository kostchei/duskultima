/**
 * Modals manager for DuskUltima:
 * - Inventory & Gear Drawer
 * - Character Sheet
 * - Spellbook Modal
 * - Rest & Camp Modal
 * - Site Complete Modal (Adventure progression recap)
 */

import { Character } from "../../engine/character";
import type { CarouseTier } from "../../engine/downtime";

export class Modals {
  private overlay: HTMLElement;
  private content: HTMLElement;
  private closeBtn: HTMLElement;
  private body: HTMLElement;

  constructor() {
    this.overlay = document.getElementById("modal-container")!;
    this.content = document.getElementById("modal-content")!;
    this.closeBtn = document.getElementById("modal-close")!;
    this.body = document.getElementById("modal-body")!;

    this.closeBtn.onclick = () => this.hide();
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) this.hide();
    };
  }

  public hide(): void {
    this.overlay.classList.add("hidden");
  }

  public showInventory(char: Character, onUseItem?: (itemDefId: string) => void): void {
    this.overlay.classList.remove("hidden");
    const maxSlots = char.inventory.capacity;
    const usedSlots = char.inventory.slotsUsed();
    const stacks = char.inventory.all();

    let itemsHtml = "";
    stacks.forEach((stack, idx) => {
      itemsHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; border-bottom: 1px solid #333;">
          <span>${idx + 1}. ${stack.def.name} (${stack.qty}x)</span>
          <button class="cmd-btn" style="font-size: 14px; padding: 2px 8px;" onclick="window.onModalUseItem('${stack.def.id}')">Use/Equip</button>
        </div>
      `;
    });

    (window as any).onModalUseItem = (defId: string) => {
      if (onUseItem) onUseItem(defId);
      this.hide();
    };

    this.body.innerHTML = `
      <div class="modal-title">${char.name}'s Inventory (Slots: ${usedSlots}/${maxSlots})</div>
      <div style="font-size: 18px; margin-bottom: 12px;">Luck Token: ${char.luckToken ? "★ Available" : "Spent"}</div>
      <div>${itemsHtml || "<p style='color: #888;'>No items in inventory.</p>"}</div>
    `;
  }

  public showCharacterSheet(char: Character): void {
    this.overlay.classList.remove("hidden");
    const stats = char.stats;

    this.body.innerHTML = `
      <div class="modal-title">${char.name} — ${char.className.toUpperCase()} Level ${char.level}</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 20px;">
        <div>
          <div><strong>STR:</strong> ${stats.STR} (${char.mod("STR") >= 0 ? "+" : ""}${char.mod("STR")})</div>
          <div><strong>DEX:</strong> ${stats.DEX} (${char.mod("DEX") >= 0 ? "+" : ""}${char.mod("DEX")})</div>
          <div><strong>CON:</strong> ${stats.CON} (${char.mod("CON") >= 0 ? "+" : ""}${char.mod("CON")})</div>
        </div>
        <div>
          <div><strong>INT:</strong> ${stats.INT} (${char.mod("INT") >= 0 ? "+" : ""}${char.mod("INT")})</div>
          <div><strong>WIS:</strong> ${stats.WIS} (${char.mod("WIS") >= 0 ? "+" : ""}${char.mod("WIS")})</div>
          <div><strong>CHA:</strong> ${stats.CHA} (${char.mod("CHA") >= 0 ? "+" : ""}${char.mod("CHA")})</div>
        </div>
      </div>
      <hr style="margin: 16px 0; border-color: #4a3810;" />
      <div style="font-size: 18px;">
        <div><strong>Title:</strong> ${char.title}</div>
        <div><strong>Armor Class:</strong> ${char.ac}</div>
        <div><strong>Hit Points:</strong> ${char.hp} / ${char.maxHp}</div>
        <div><strong>XP:</strong> ${char.xp}</div>
        <div><strong>Gear Slots:</strong> ${char.inventory.slotsUsed()} / ${char.inventory.capacity}</div>
        <div><strong>Luck Token:</strong> ${char.luckToken ? "★ Available" : "Spent"}</div>
      </div>
    `;
  }

  public showSpellbook(char: Character, onCastSpell?: (spellId: string) => void): void {
    this.overlay.classList.remove("hidden");
    const spells = char.knownSpells;

    let spellsHtml = "";
    if (spells.length === 0) {
      spellsHtml = "<p style='color: #888;'>No spells known.</p>";
    } else {
      spells.forEach((known) => {
        const isLost = known.status === "lost";
        spellsHtml += `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #333;">
            <span style="${isLost ? 'text-decoration: line-through; color: #888;' : ''}">${known.spellId.toUpperCase().replace('_', ' ')}</span>
            <button class="cmd-btn" style="font-size: 14px;" ${isLost ? 'disabled' : ''} onclick="window.onModalCastSpell('${known.spellId}')">
              ${isLost ? 'Lost until rest' : 'Cast'}
            </button>
          </div>
        `;
      });
    }

    (window as any).onModalCastSpell = (spellId: string) => {
      if (onCastSpell) onCastSpell(spellId);
      this.hide();
    };

    this.body.innerHTML = `
      <div class="modal-title">${char.name}'s Spellbook</div>
      <div>${spellsHtml}</div>
    `;
  }

  public showRestScreen(
    onConfirmRest: () => void,
    carouseOptions?: { gold: number; onCarouse: (tier: CarouseTier) => void }
  ): void {
    this.overlay.classList.remove("hidden");

    (window as any).onModalRest = () => {
      onConfirmRest();
      this.hide();
    };

    let carouseHtml = "";
    if (carouseOptions) {
      const tiers: Array<{ tier: CarouseTier; cost: number; label: string }> = [
        { tier: "worthy-night", cost: 30, label: "Worthy night (30 gp)" },
        { tier: "full-revelry", cost: 100, label: "Full revelry (100 gp)" },
        { tier: "tavern-crawl", cost: 300, label: "Tavern crawl (300 gp)" },
        { tier: "finest-voyage", cost: 600, label: "Finest voyage (600 gp)" },
        { tier: "weeklong-bender", cost: 900, label: "Weeklong bender (900 gp)" },
        { tier: "ten-day-fete", cost: 1200, label: "Ten-day fete (1,200 gp)" },
        { tier: "legendary-weeks", cost: 1800, label: "Legendary weeks (1,800 gp)" },
      ];
      (window as any).onModalCarouse = (tier: string) => {
        carouseOptions.onCarouse(tier as CarouseTier);
        this.hide();
      };
      const buttons = tiers
        .map(
          (t) => `
        <button class="cmd-btn" style="font-size: 16px; padding: 6px;" ${carouseOptions.gold < t.cost ? "disabled" : ""} onclick="window.onModalCarouse('${t.tier}')">${t.label}</button>
      `
        )
        .join("");
      carouseHtml = `
        <hr style="margin: 16px 0; border-color: #4a3810;" />
        <p style="margin-bottom: 8px;">Carouse in the City of Masks (Gold: ${carouseOptions.gold} gp). Roll 1d8 + event bonus for XP and consequences:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">${buttons}</div>
      `;
    }

    this.body.innerHTML = `
      <div class="modal-title">Camp & Respite</div>
      <p style="margin-bottom: 16px;">Resting at camp restores full Hit Points to all party members, recovers lost spells, and provides fresh torches.</p>
      <button class="cmd-btn" style="font-size: 20px; width: 100%; padding: 10px;" onclick="window.onModalRest()">Make Camp & Rest</button>
      ${carouseHtml}
    `;
  }

  public showSiteCompleteModal(
    siteName: string,
    goalDesc: string,
    rescuedHeroName: string | null,
    isFinalSite: boolean,
    onProceed: () => void
  ): void {
    this.overlay.classList.remove("hidden");

    (window as any).onModalProceedSite = () => {
      onProceed();
      this.hide();
    };

    const heroNotice = rescuedHeroName
      ? `<div style="color: #2ecc71; font-weight: bold; margin: 12px 0;">★ ${rescuedHeroName} has joined your party!</div>`
      : "";

    const btnText = isFinalSite ? "Complete Adventure & Start Next" : "Proceed to Next Site";

    this.body.innerHTML = `
      <div class="modal-title">Site Accomplished — ${siteName}</div>
      <p style="font-size: 20px; color: #f1c40f; margin-bottom: 12px;">Goal Completed: ${goalDesc}</p>
      ${heroNotice}
      <p style="margin-bottom: 16px;">Site completion is recorded. XP comes from the treasure and boons earned during the adventure.</p>
      <button class="cmd-btn" style="font-size: 20px; width: 100%; padding: 10px;" onclick="window.onModalProceedSite()">${btnText}</button>
    `;
  }

  public showCustomAdventureModal(onGenerate: (prompt: string) => void): void {
    this.overlay.classList.remove("hidden");

    (window as any).onModalGenerateAdventure = () => {
      const textarea = document.getElementById("prompt-input") as HTMLTextAreaElement;
      const prompt = textarea?.value?.trim() || "rescue the thief Lyra from the small rimesea caves";
      onGenerate(prompt);
      this.hide();
    };

    (window as any).onModalPickPreset = (presetText: string) => {
      const textarea = document.getElementById("prompt-input") as HTMLTextAreaElement;
      if (textarea) textarea.value = presetText;
    };

    this.body.innerHTML = `
      <div class="modal-title">Custom Adventure Prompt Generator</div>
      <p style="margin-bottom: 8px; color: #ccc;">Describe your adventure in natural language. Note: site sizes (small, medium, large) dictate room counts automatically without requiring explicit room numbers!</p>

      <div style="margin-bottom: 12px;">
        <label style="font-weight: bold; color: #f1c40f; display: block; margin-bottom: 4px;">Preset Prompts:</label>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button class="cmd-btn" style="font-size: 13px; text-align: left; padding: 6px;" onclick="window.onModalPickPreset('rescue the thief <name> from the small rimesea caves')">
            1. "rescue the thief &lt;name&gt; from the small rimesea caves"
          </button>
          <button class="cmd-btn" style="font-size: 13px; text-align: left; padding: 6px;" onclick="window.onModalPickPreset('gather the dargon eggs from the medium hazardous approach')">
            2. "gather the dargon eggs from the medium hazardous approach"
          </button>
          <button class="cmd-btn" style="font-size: 13px; text-align: left; padding: 6px;" onclick="window.onModalPickPreset('rescue the thief Lyra from the small rimesea caves or gather the dragon eggs from the medium hazardous approach')">
            3. Multi-site: "rescue the thief Lyra from the small rimesea caves or gather the dragon eggs from the medium hazardous approach"
          </button>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="font-weight: bold; color: #f1c40f; display: block; margin-bottom: 4px;">Adventure Prompt Text:</label>
        <textarea id="prompt-input" rows="3" style="width: 100%; box-sizing: border-box; padding: 8px; font-family: inherit; font-size: 14px; background: #111; color: #f1c40f; border: 1px solid #4a3810;">rescue the thief Lyra from the small rimesea caves</textarea>
      </div>

      <button class="cmd-btn" style="font-size: 18px; width: 100%; padding: 10px;" onclick="window.onModalGenerateAdventure()">Generate & Start Adventure</button>
    `;
  }
}

