/**
 * Modals manager for DuskUltima:
 * - Inventory & Gear Drawer
 * - Character Sheet
 * - Spellbook Modal
 * - Rest & Camp Modal
 * - Site Complete Modal (Adventure progression recap)
 */

import { Character } from "../../engine/character";
import type { ClassName, StatGenerationMethod } from "../../engine/character";
import type { MonsterBiome } from "../../engine/monster";
import type { CarouseTier } from "../../engine/downtime";
import { sellPrice } from "../../engine/inventory";
import { classDef } from "../../data/classes";
import { ALL_CREATION_CLASSES, BIOME_DISPLAY_NAMES, zoneLockedBiomeForClass } from "../../data/biomeOrigins";

export class Modals {
  private overlay: HTMLElement;
  private content: HTMLElement;
  private closeBtn: HTMLElement;
  private body: HTMLElement;
  /** True while a modal (e.g. character creation) must be resolved before it can be dismissed. */
  private blockDismiss = false;

  constructor() {
    this.overlay = document.getElementById("modal-container")!;
    this.content = document.getElementById("modal-content")!;
    this.closeBtn = document.getElementById("modal-close")!;
    this.body = document.getElementById("modal-body")!;

    this.closeBtn.onclick = () => {
      if (!this.blockDismiss) this.hide();
    };
    this.overlay.onclick = (e) => {
      if (!this.blockDismiss && e.target === this.overlay) this.hide();
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
      <div class="modal-title">${char.name} — ${classDef(char.className).displayName.toUpperCase()} Level ${char.level}</div>
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
    carouseOptions?: { gold: number; partySize: number; tavernName: string; onCarouse: (tier: CarouseTier) => void },
    onVisitShop?: () => void
  ): void {
    this.overlay.classList.remove("hidden");

    (window as any).onModalRest = () => {
      onConfirmRest();
      this.hide();
    };

    let carouseHtml = "";
    if (carouseOptions) {
      const tiers: Array<{ tier: CarouseTier; perHead: number; label: string }> = [
        { tier: "worthy-night", perHead: 30, label: "Worthy night" },
        { tier: "full-revelry", perHead: 100, label: "Full revelry" },
        { tier: "tavern-crawl", perHead: 300, label: "Tavern crawl" },
        { tier: "finest-voyage", perHead: 600, label: "Finest voyage" },
        { tier: "weeklong-bender", perHead: 900, label: "Weeklong bender" },
        { tier: "ten-day-fete", perHead: 1200, label: "Ten-day fete" },
        { tier: "legendary-weeks", perHead: 1800, label: "Legendary weeks" },
        { tier: "outrageous-finery", perHead: 2400, label: "Outrageous finery" },
        { tier: "citywide-festival", perHead: 3000, label: "City-wide festival" },
        { tier: "nobles-fete", perHead: 4000, label: "Noble's fete" },
      ];
      (window as any).onModalCarouse = (tier: string) => {
        carouseOptions.onCarouse(tier as CarouseTier);
        this.hide();
      };
      const buttons = tiers
        .map((t) => {
          const totalCost = t.perHead * carouseOptions.partySize;
          return `
        <button class="cmd-btn" style="font-size: 16px; padding: 6px;" ${carouseOptions.gold < totalCost ? "disabled" : ""} onclick="window.onModalCarouse('${t.tier}')">${t.label} (${t.perHead} gp x ${carouseOptions.partySize} = ${totalCost} gp)</button>
      `;
        })
        .join("");
      carouseHtml = `
        <hr style="margin: 16px 0; border-color: #4a3810;" />
        <p style="margin-bottom: 8px;">Carouse at ${carouseOptions.tavernName} with the whole party (Gold: ${carouseOptions.gold} gp). Cost is pooled per head; every reveler rolls 1d8 + the tier bonus on their own:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">${buttons}</div>
      `;
    }

    let shopHtml = "";
    if (onVisitShop) {
      (window as any).onModalVisitShop = () => onVisitShop();
      shopHtml = `
        <hr style="margin: 16px 0; border-color: #4a3810;" />
        <button class="cmd-btn" style="font-size: 18px; width: 100%; padding: 8px;" onclick="window.onModalVisitShop()">Visit the Shop</button>
      `;
    }

    this.body.innerHTML = `
      <div class="modal-title">Camp & Respite</div>
      <p style="margin-bottom: 16px;">Resting at camp restores full Hit Points to all party members, recovers lost spells, and provides fresh torches.</p>
      <button class="cmd-btn" style="font-size: 20px; width: 100%; padding: 10px;" onclick="window.onModalRest()">Make Camp & Rest</button>
      ${shopHtml}
      ${carouseHtml}
    `;
  }

  public showShopScreen(shopName: string, char: Character, onSell: (itemId: string) => void): void {
    this.overlay.classList.remove("hidden");

    const sellable = char.inventory.all().filter((stack) => stack.def.valueGp !== undefined);
    let itemsHtml = "";
    if (sellable.length === 0) {
      itemsHtml = "<p style='color: #888;'>Nothing worth selling.</p>";
    } else {
      sellable.forEach((stack) => {
        const price = sellPrice(stack.def);
        itemsHtml += `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; border-bottom: 1px solid #333;">
            <span>${stack.def.name} (${stack.qty}x) — ${price} gp each</span>
            <button class="cmd-btn" style="font-size: 14px; padding: 2px 8px;" onclick="window.onModalSellItem('${stack.def.id}')">Sell 1</button>
          </div>
        `;
      });
    }

    (window as any).onModalSellItem = (itemId: string) => {
      onSell(itemId);
      this.showShopScreen(shopName, char, onSell);
    };

    this.body.innerHTML = `
      <div class="modal-title">${shopName}</div>
      <p style="margin-bottom: 12px;">Gold: ${char.gold} gp</p>
      <div>${itemsHtml}</div>
    `;
  }

  public showCharacterCreation(
    onCreate: (choice: {
      name: string;
      biome: MonsterBiome;
      className: ClassName;
      method: StatGenerationMethod;
    }) => void
  ): void {
    this.overlay.classList.remove("hidden");
    this.blockDismiss = true;
    this.closeBtn.style.display = "none";

    const allBiomes = Object.keys(BIOME_DISPLAY_NAMES) as MonsterBiome[];
    let selectedClass: ClassName = ALL_CREATION_CLASSES[0]!;
    let selectedBiome: MonsterBiome = zoneLockedBiomeForClass(selectedClass) ?? allBiomes[0]!;
    let selectedMethod: StatGenerationMethod = "unearthed-arcana";

    const render = () => {
      const nameValue = (document.getElementById("char-name-input") as HTMLInputElement | null)?.value ?? "";
      const lockedBiome = zoneLockedBiomeForClass(selectedClass);

      const classButtons = ALL_CREATION_CLASSES
        .map((c: ClassName) => {
          const locked = zoneLockedBiomeForClass(c);
          const suffix = locked ? ` (${BIOME_DISPLAY_NAMES[locked]})` : "";
          return `
        <button class="cmd-btn" style="font-size: 14px; padding: 8px; text-align: left; ${c === selectedClass ? "border-color: #f1c40f;" : ""}" onclick="window.onModalPickClass('${c}')">${classDef(c).displayName}${suffix}</button>
      `;
        })
        .join("");

      const regionSection = lockedBiome
        ? `<p style="color: #ccc;">Home Region: <strong style="color: #f1c40f;">${BIOME_DISPLAY_NAMES[lockedBiome]}</strong> — fixed by your class.</p>`
        : `<div style="display: flex; flex-wrap: wrap; gap: 6px;">${allBiomes
            .map(
              (b) => `
          <button class="cmd-btn" style="font-size: 13px; padding: 6px 10px; ${b === selectedBiome ? "border-color: #f1c40f;" : ""}" onclick="window.onModalPickBiome('${b}')">${BIOME_DISPLAY_NAMES[b]}</button>
        `
            )
            .join("")}</div>`;

      const methods: Array<{ id: StatGenerationMethod; label: string; blurb: string }> = [
        { id: "unearthed-arcana", label: "Unearthed Arcana", blurb: "stats rolled in your class's priority order, best dice pools first" },
        { id: "iron-man", label: "Iron Man", blurb: "3d6 straight down the line, STR through CHA" },
      ];
      const methodButtons = methods
        .map(
          (m) => `
        <button class="cmd-btn" style="font-size: 13px; padding: 6px 10px; text-align: left; ${m.id === selectedMethod ? "border-color: #f1c40f;" : ""}" onclick="window.onModalPickMethod('${m.id}')">${m.label} — ${m.blurb}</button>
      `
        )
        .join("");

      this.body.innerHTML = `
        <div class="modal-title">Who Are You?</div>
        <p style="margin-bottom: 8px; color: #ccc;">Choose your class first. A few classes are tied to one home region; the rest let you pick where you're from.</p>
        <div style="margin-bottom: 12px;">
          <label style="font-weight: bold; color: #f1c40f; display: block; margin-bottom: 4px;">Class:</label>
          <div style="display: flex; flex-direction: column; gap: 6px;">${classButtons}</div>
        </div>
        <div style="margin-bottom: 12px;">
          <label style="font-weight: bold; color: #f1c40f; display: block; margin-bottom: 4px;">Home Region:</label>
          ${regionSection}
        </div>
        <div style="margin-bottom: 12px;">
          <label style="font-weight: bold; color: #f1c40f; display: block; margin-bottom: 4px;">Stat Generation:</label>
          <div style="display: flex; flex-direction: column; gap: 6px;">${methodButtons}</div>
        </div>
        <div style="margin-bottom: 16px;">
          <label style="font-weight: bold; color: #f1c40f; display: block; margin-bottom: 4px;">Name:</label>
          <input id="char-name-input" type="text" value="${nameValue}" placeholder="Thorin" style="width: 100%; box-sizing: border-box; padding: 8px; font-family: inherit; font-size: 14px; background: #111; color: #f1c40f; border: 1px solid #4a3810;" />
        </div>
        <button class="cmd-btn" style="font-size: 18px; width: 100%; padding: 10px;" onclick="window.onModalCreateCharacter()">Begin the Journey</button>
      `;
    };

    (window as any).onModalPickClass = (className: string) => {
      selectedClass = className as ClassName;
      const locked = zoneLockedBiomeForClass(selectedClass);
      if (locked) selectedBiome = locked;
      render();
    };
    (window as any).onModalPickBiome = (biome: string) => {
      if (zoneLockedBiomeForClass(selectedClass)) return;
      selectedBiome = biome as MonsterBiome;
      render();
    };
    (window as any).onModalPickMethod = (method: string) => {
      selectedMethod = method as StatGenerationMethod;
      render();
    };
    (window as any).onModalCreateCharacter = () => {
      const input = document.getElementById("char-name-input") as HTMLInputElement | null;
      const name = input?.value?.trim() || "Thorin";
      this.blockDismiss = false;
      this.closeBtn.style.display = "";
      onCreate({ name, biome: selectedBiome, className: selectedClass, method: selectedMethod });
      this.hide();
    };

    render();
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

