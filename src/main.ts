/**
 * Main application entry point for DuskUltima.
 * Links the Shadowdark OSR rules engine with the Ultima V style renderer, UI, ZoneHazards, and Web Audio API.
 */

import { Engine, applyCondition, groupInitiative, monsterAttackRoll, type ClassName, type ConditionKind, type MonsterBiome, type StatGenerationMethod, type TreasureQuality } from "./engine/index";
import { Character, type Stats } from "./engine/character";
import { classDef, createCharacter, registerTables } from "./data/index";
import { bestTreasureQuality, rollFabledItem, rollTreasureCache } from "./data/treasureGeneration";
import { MapGrid } from "./game/level/MapGrid";
import { MapRenderer } from "./game/renderer/MapRenderer";
import { UltimaFrame } from "./game/ui/UltimaFrame";
import { Modals } from "./game/ui/Modals";
import { InputHandler } from "./game/input/InputHandler";
import { TileType } from "./game/renderer/TileSet";
import { Adventure, goalUsesChest, SiteDef } from "./game/level/Adventure";
import { AdventureGenerator } from "./game/level/AdventureGenerator";
import { ZoneHazards } from "./engine/zoneHazards";
import { AudioEngine } from "./game/audio/AudioEngine";
import { groupCarouseCost, resolveGroupCarouse, type CarouseTier } from "./engine/downtime";
import { treasureQualityXp } from "./engine/treasureXp";
import { chooseAutoSupportAction, type LeaderIntent } from "./engine/partyAutomation";
import { gridDistance, movementTiles, RANGE_BAND_TILES } from "./engine/rangeBands";
import { spell } from "./data/spells";

class Game {
  private engine: Engine;
  private party: Character[] = [];
  private leaderIndex = 0;
  private adventureGenerator: AdventureGenerator;
  private currentAdventure!: Adventure;
  private grid: MapGrid;
  private renderer: MapRenderer;
  private frame: UltimaFrame;
  private modals: Modals;
  private audio: AudioEngine;
  private round = 1;
  private torchTimer = 3600; // 60 minutes
  private isTorchActive = true;
  private breathRoundsSubmerged = 0;
  private crtEnabled = true;
  private movementBandsRemaining: 0 | 1 | 2 = 2;
  private actionAvailable = true;
  private autoFollowerIds = new Set<string>();
  private pendingLevelUps: Character[] = [];
  private pendingLevelUpsAfter?: () => void;
  /** Standard Shadowdark: initiative is rolled once when an encounter begins. */
  private combatActive = false;
  private partyActsFirst = true;
  private playerTurnStarted = false;

  constructor() {
    this.engine = new Engine();
    registerTables(this.engine);
    this.adventureGenerator = new AdventureGenerator();
    this.grid = new MapGrid(28, 28);
    this.renderer = new MapRenderer("game-canvas");
    this.frame = new UltimaFrame();
    this.modals = new Modals();
    this.audio = new AudioEngine();
    this.setupInput();

    this.modals.showCharacterCreation(this.engine, ({ character, biome }) => {
      character.gold = 40;
      this.party = [character];
      this.leaderIndex = 0;
      this.startNewAdventure();

      this.grid.updateFov(this.isTorchActive ? 4 : 1);
      this.updateUi();
      this.render();

      this.frame.addLog(`DuskUltima initialized. You begin your journey as ${character.name} the ${character.ancestry.toUpperCase()} ${classDef(character.className).displayName.toUpperCase()}, of ${biome}!`, "system");
      this.frame.addLog("Use Arrow Keys to move. Press [A]ttack, [C]ast, [T]orch, [I]nventory.", "prompt");
      this.frame.addLog("Move near + act, or hold Shift to move double near and end the round.", "prompt");
    });
  }

  private get leader(): Character {
    return this.party[this.leaderIndex] ?? this.party[0]!;
  }

  private get currentSite(): SiteDef {
    return this.currentAdventure.sites[this.currentAdventure.currentSiteIndex]!;
  }

  /** Classes already spoken for by the party, so they never turn up again as a rescue target. */
  private recruitedClasses(): ClassName[] {
    return this.party.map((member) => member.className);
  }

  private startNewAdventure(): void {
    this.currentAdventure = this.adventureGenerator.generateAdventure(
      this.party.length,
      this.recruitedClasses()
    );
    this.loadCurrentSite();
  }

  private loadCurrentSite(): void {
    const site = this.currentSite;
    this.grid.generateSite(site);
    this.round = 1;
    this.movementBandsRemaining = 2;
    this.actionAvailable = true;
    this.breathRoundsSubmerged = 0;
    this.combatActive = false;
    this.partyActsFirst = true;
    this.playerTurnStarted = false;
    this.audio.updateBiomeAmbience(site.biome);
    this.frame.addLog(`Entered Site ${this.currentAdventure.currentSiteIndex + 1}: ${site.name} (${site.sizeCategory.toUpperCase()} ${site.siteType.toUpperCase()}, ${site.roomCount} Rooms, Biome: ${site.biome.toUpperCase()}).`, "system");
    this.frame.addLog(`Site Goal: ${site.goal.description}`, "prompt");
    this.syncPartyFormation();
  }

  private setupInput(): void {
    new InputHandler({
      onMove: (dx, dy, bands) => this.handleMove(dx, dy, bands ?? 1),
      onAttack: () => this.handleAttack(),
      onCast: () => this.handleCast(),
      onLook: () => this.handleLook(),
      onTorch: () => this.handleTorch(),
      onUseItem: () => this.handleUseItem(),
      onInventory: () => this.handleInventory(),
      onRest: () => this.handleRest(),
      onPass: () => this.handlePass(),
      onStats: () => this.handleStats(),
      onSelectLeader: (idx) => this.selectLeader(idx),
      onToggleAuto: (idx) => this.toggleAutoFollower(idx),
      onInteract: () => this.handleInteract(),
      onToggleCrt: () => this.handleToggleCrt(),
      onCustomPrompt: () => this.handleCustomPrompt(),
    });
  }

  private handleCustomPrompt(): void {
    this.modals.showCustomAdventureModal((promptText) => {
      this.currentAdventure = this.adventureGenerator.generateFromPrompt(
        promptText,
        this.party.length,
        this.recruitedClasses()
      );
      this.frame.addLog(`★ CUSTOM QUEST GENERATED: "${promptText}"`, "system");
      this.loadCurrentSite();
      this.grid.updateFov(this.isTorchActive ? 4 : 1);
      this.updateUi();
      this.render();
    });
  }

  private handleToggleCrt(): void {
    this.crtEnabled = !this.crtEnabled;
    document.body.classList.toggle("crt-off", !this.crtEnabled);
    this.frame.addLog(`CRT scanlines ${this.crtEnabled ? "enabled" : "disabled"}.`, "system");
  }

  private selectLeader(idx: number): void {
    if (idx >= 0 && idx < this.party.length) {
      const selected = this.party[idx];
      if (selected && selected.hp <= 0) {
        this.frame.addLog(`${selected.name} is fallen and cannot lead!`, "combat");
        return;
      }
      this.leaderIndex = idx;
      this.frame.addLog(`${this.leader.name} takes the lead.`, "system");
      this.updateUi();
    }
  }

  private toggleAutoFollower(idx: number): void {
    const follower = this.party[idx];
    if (!follower || idx === this.leaderIndex) return;
    if (this.autoFollowerIds.has(follower.id)) {
      this.autoFollowerIds.delete(follower.id);
      this.frame.addLog(`${follower.name} switches to manual control.`, "system");
    } else {
      this.autoFollowerIds.add(follower.id);
      this.frame.addLog(`${follower.name} will follow and support the leader automatically.`, "system");
    }
    this.updateUi();
  }

  private syncPartyFormation(): void {
    this.grid.setPartyMembers(this.party.map((member) => member.id));
    this.grid.moveAutoFollowers([...this.autoFollowerIds]);
  }

  private handleMove(dx: number, dy: number, requestedBands: 1 | 2): void {
    if (!this.beginPlayerTurn()) return;
    if (this.actionAvailable === false && this.movementBandsRemaining === 0) {
      this.frame.addLog("Your turn is complete. Choose an action after the round advances.", "prompt");
      return;
    }
    if (requestedBands > this.movementBandsRemaining) {
      this.frame.addLog("You have only one near movement left; hold Shift on the next round for double near.", "prompt");
      return;
    }

    const steps = movementTiles(requestedBands);
    let moved = 0;
    for (let step = 0; step < steps; step++) {
      const targetX = this.grid.playerPos.x + dx;
      const targetY = this.grid.playerPos.y + dy;
      const entityAtTarget = this.grid.getEntityAt(targetX, targetY);
      if (entityAtTarget?.goalInteraction === "rescue-companion" && entityAtTarget.rescueClass) {
        this.rescueHero(entityAtTarget);
        return;
      }
      if (entityAtTarget?.goalInteraction === "hostage" || entityAtTarget?.goalInteraction === "objective") {
        entityAtTarget.hp = 0;
        this.frame.addLog(`${this.leader.name} completes the objective: ${this.currentSite.goal.description}.`, "hit");
        this.completeSiteGoal(null);
        this.endTurn("move");
        return;
      }
      if (entityAtTarget?.isHostile && entityAtTarget.hp > 0) {
        if (requestedBands === 1 && this.actionAvailable) {
          this.attackMonsterAt(entityAtTarget);
          this.actionAvailable = false;
          this.endTurn("attack");
        } else {
          this.frame.addLog("A hostile blocks the double-near advance.", "combat");
          this.endTurn("move");
        }
        return;
      }
      const tileAtTarget = this.grid.getTile(targetX, targetY);
      if (tileAtTarget === TileType.DOOR_CLOSED) {
        this.grid.setTile(targetX, targetY, TileType.DOOR_OPEN);
        this.frame.addLog("You open the heavy wooden door.", "item");
        moved++;
        break;
      }
      if (!this.grid.isWalkable(targetX, targetY)) break;
      this.grid.playerPos.x = targetX;
      this.grid.playerPos.y = targetY;
      moved++;
      this.audio.playStepSfx();
      if (tileAtTarget === TileType.STAIRS_DOWN) {
        this.frame.addLog(this.currentSite.goal.isCompleted ? "Press [E]nter to descend to the next site." : "The stairs down are locked until you fulfill the Site Goal!", "prompt");
      } else if (tileAtTarget === TileType.CHEST_CLOSED) {
        this.grid.setTile(targetX, targetY, TileType.CHEST_OPEN);
        const goal = this.currentSite.goal;
        let rewardQuality: TreasureQuality = goal.treasureQuality ?? "normal";
        if (goal.kind === "fabled-item") {
          const fabledItem = rollFabledItem(this.engine.dice);
          this.leader.inventory.add(fabledItem.def, 1, true);
          this.frame.addLog(`${this.leader.name} recovers ${fabledItem.def.name}: ${fabledItem.def.benefits?.[0] ?? "a magical benefit"}${fabledItem.def.curses?.[0] ? `; disadvantage: ${fabledItem.def.curses[0]}` : ""}.`, "hit");
          rewardQuality = fabledItem.quality;
        } else if (goal.kind === "treasure-cache") {
          const cache = rollTreasureCache(this.engine.dice, this.leader.level);
          for (const finding of cache) this.leader.inventory.add(finding.def, finding.qty, true);
          rewardQuality = bestTreasureQuality(cache);
          this.frame.addLog(`${this.leader.name} opens the cache and finds ${cache.length} treasure items: ${cache.map((finding) => `${finding.qty > 1 ? `${finding.qty}x ` : ""}${finding.def.name}`).join(", ")}.`, "hit");
        } else if (goal.kind === "monster-eggs") {
          this.frame.addLog(`${this.leader.name} secures the monster eggs; the nesting mother still lurks nearby.`, "hit");
        } else if (goal.kind === "harvest-components" || goal.kind === "exotic-materials") {
          this.frame.addLog(`${this.leader.name} gathers ${goal.requiredQuantity ?? 1} ${goal.target}.`, "hit");
        } else {
          this.frame.addLog(`${this.leader.name} opens the cache and finds gold & treasure!`, "hit");
        }
        const xp = treasureQualityXp(rewardQuality);
        this.party.forEach((char) => this.engine.awardXp(char, xp));
        this.frame.addLog(`${xp} ${rewardQuality}-treasure XP awarded to each party member.`, "hit");
        this.queueLevelUps(this.party, () => {
          if (goalUsesChest(goal)) this.completeSiteGoal(null);
        });
      }
    }
    if (moved === 0) {
      this.frame.addLog("Path blocked.", "prompt");
      return;
    }
    this.movementBandsRemaining = (this.movementBandsRemaining - requestedBands) as 0 | 1;
    this.syncPartyFormation();
    if (requestedBands === 2 || this.movementBandsRemaining === 0) {
      this.endTurn("move");
    } else {
      this.frame.showMovementTooltip("Shift + direction moves double near and ends the round");
      this.frame.addLog("Moved near. Attack, cast, pass, or move near again.", "prompt");
      this.updateUi();
      this.render();
    }
  }

  private rescueHero(npcEntity: any): void {
    const rescueClass = npcEntity.rescueClass as ClassName;
    const heroName = (npcEntity.rescueHeroName as string) ?? npcEntity.name;
    const newHero = createCharacter(
      this.engine,
      `char-${heroName.toLowerCase()}`,
      heroName,
      rescueClass,
      undefined,
      undefined,
      this.currentSite.biome,
      this.party[0]?.method ?? "iron-man"
    );

    // Add to active party
    this.party.push(newHero);
    this.autoFollowerIds.add(newHero.id);
    this.syncPartyFormation();
    npcEntity.hp = 0; // Remove entity from grid

    this.audio.playVictoryJingle();
    const rescueClassLabel = classDef(rescueClass).displayName.toUpperCase();
    this.frame.addLog(`★ RESCUE ACCOMPLISHED! ${newHero.name} the ${rescueClassLabel} freed and joins your party!`, "hit");
    this.completeSiteGoal(`${newHero.name} the ${rescueClassLabel}`);
    this.endTurn();
  }

  private activeHostiles(): any[] {
    return this.grid.entities.filter((entity) => entity.isHostile && entity.hp > 0);
  }

  /** Start one standard Shadowdark encounter initiative roll when a threat enters far range. */
  private ensureCombatStarted(): void {
    if (this.combatActive) return;
    const enemy = this.activeHostiles()
      .filter((entity) => gridDistance(this.grid.playerPos, entity) <= RANGE_BAND_TILES.far)
      .sort((a, b) => gridDistance(this.grid.playerPos, a) - gridDistance(this.grid.playerPos, b))[0];
    if (!enemy) return;

    const initiative = groupInitiative(this.engine.dice, this.party, [{
      id: enemy.id,
      mod: () => enemy.initiativeDexModifier ?? 0,
    }]);
    this.combatActive = true;
    this.partyActsFirst = initiative.first === "party";
    this.frame.addLog(
      `Combat begins! Initiative: party ${initiative.party.total} vs enemies ${initiative.enemies.total}. ${initiative.first === "party" ? "Your group acts first." : "The enemies act first."}`,
      "combat",
    );
  }

  /** Resolve an enemy-first initiative before the player's next action. */
  private beginPlayerTurn(): boolean {
    if (this.playerTurnStarted) return !this.leader.dead && !this.leader.dying;
    this.playerTurnStarted = true;
    this.ensureCombatStarted();
    if (this.combatActive && !this.partyActsFirst) {
      this.monsterAiTurn();
      if (this.leader.dead || this.leader.dying) {
        this.frame.addLog(`${this.leader.name} cannot act while dying.`, "combat");
        return false;
      }
    }
    return !this.leader.dead && !this.leader.dying;
  }

  private findHostile(maxRange: number): any | undefined {
    return this.activeHostiles()
      .filter((entity) => gridDistance(this.grid.playerPos, entity) <= maxRange)
      .sort((a, b) => gridDistance(this.grid.playerPos, a) - gridDistance(this.grid.playerPos, b))[0];
  }

  private attackMonsterAt(monster: any, attacker: Character = this.leader): void {
    const weapon = attacker.wieldedWeapon;
    if (!weapon?.damage) {
      this.frame.addLog(`${attacker.name} has no usable weapon equipped.`, "combat");
      return;
    }
    const result = this.engine.attack({
      attacker,
      targetAc: monster.ac,
      damage: attacker.effectiveWeaponDamage ?? weapon.damage,
      weapon,
    });
    const sign = result.check.modifier >= 0 ? "+" : "";
    this.frame.addLog(
      `${attacker.name} attacks ${monster.name}! [d20 ${result.check.natural}${sign}${result.check.modifier}=${result.check.total} vs AC ${monster.ac}]`,
      "combat",
    );

    if (!result.check.success) {
      this.frame.addLog(result.check.fumble ? "Natural 1 — the attack fumbles." : "Miss!", "combat");
      return;
    }

    monster.hp = Math.max(0, monster.hp - result.damage);
    this.audio.playHitSfx();
    this.frame.addLog(`${result.check.crit ? "Critical hit! " : "Hit! "}Dealt ${result.damage} damage to ${monster.name}.`, "hit");
    if (monster.hp <= 0) {
      this.frame.addLog(`${monster.name} is slain!`, "hit");
      if ((this.currentSite.goal.kind === "assassinate-leader" || this.currentSite.goal.kind === "kill-boss")
        && monster.name === this.currentSite.goal.target) {
        this.completeSiteGoal(null);
      }
    }
  }

  private spellRangeTiles(range: string): number {
    if (range === "close") return RANGE_BAND_TILES.close;
    if (range === "near") return RANGE_BAND_TILES.near;
    if (range === "far") return RANGE_BAND_TILES.far;
    return 0;
  }

  /** Resolve a cast check and apply the small set of combat spell effects used by the browser game. */
  private resolveSpellEffect(caster: Character, spellId: string, allyTarget: Character = caster): void {
    const chosen = spell(spellId.replaceAll("_", "-"));
    const target = chosen.target === "enemy" ? this.findHostile(this.spellRangeTiles(chosen.range)) : undefined;
    const result = this.engine.cast(caster, chosen);
    if (result.outcome === "pendingMishap") {
      this.frame.addLog(`${caster.name} rolls a natural 1 on ${chosen.name}; the mishap is accepted: ${result.mishap?.entry.text ?? "arcane backlash"}`, "combat");
      this.engine.acceptMishap(caster, result, "known");
      return;
    }
    if (result.outcome === "fail") {
      this.frame.addLog(`${caster.name}'s ${chosen.name} fails and is lost until rest.`, "combat");
      return;
    }

    if (chosen.id === "light") {
      this.isTorchActive = true;
      this.torchTimer = 3600;
      this.frame.addLog(`${caster.name}'s Light spell illuminates the dungeon.`, "spell");
      return;
    }
    if (chosen.id === "cure-wounds") {
      const diceCount = result.doubled ? 2 : 1;
      let healing = 0;
      for (let i = 0; i < diceCount; i++) healing += this.engine.dice.roll(chosen.dice ?? "1d6");
      allyTarget.heal(healing);
      this.frame.addLog(`${caster.name} restores ${healing} HP to ${allyTarget.name}.`, "hit");
      return;
    }
    if (chosen.id === "bless") {
      allyTarget.gainLuckTokens(1, this.party.length);
      this.frame.addLog(`${caster.name} blesses ${allyTarget.name} with renewed luck.`, "spell");
      return;
    }
    if (chosen.dice && target) {
      const diceCount = result.doubled ? 2 : 1;
      let damage = 0;
      for (let i = 0; i < diceCount; i++) damage += this.engine.dice.roll(chosen.dice);
      target.hp = Math.max(0, target.hp - damage);
      this.audio.playHitSfx();
      this.frame.addLog(`${caster.name} hits ${target.name} with ${chosen.name} for ${damage} damage${result.doubled ? " (critical)" : ""}.`, "hit");
      if (target.hp <= 0) this.frame.addLog(`${target.name} is slain!`, "hit");
    } else {
      this.frame.addLog(`${caster.name} successfully casts ${chosen.name}.`, "spell");
    }
  }

  private completeSiteGoal(rescuedHeroName: string | null): void {
    if (this.currentSite.goal.isCompleted) return;
    this.currentSite.goal.isCompleted = true;

    this.audio.playVictoryJingle();
    // Shadowdark RAW: non-treasure achievements ("boons") award XP on the same
    // poor/normal/fabulous/legendary scale as treasure quality.
    const boonQuality: TreasureQuality = this.currentSite.goal.treasureQuality ?? "normal";
    const boonXp = treasureQualityXp(boonQuality);
    this.party.forEach((char) => this.engine.awardXp(char, boonXp));
    this.frame.addLog(`★ SITE GOAL COMPLETED: ${this.currentSite.goal.description}! +${boonXp} boon XP awarded to each party member.`, "hit");

    const isFinalSite = this.currentAdventure.currentSiteIndex >= this.currentAdventure.sites.length - 1;
    this.queueLevelUps(this.party, () => {
      this.modals.showSiteCompleteModal(
        this.currentSite.name,
        this.currentSite.goal.description,
        rescuedHeroName,
        isFinalSite,
        () => this.advanceSite()
      );
    });
  }

  private advanceSite(): void {
    if (this.currentAdventure.currentSiteIndex < this.currentAdventure.sites.length - 1) {
      this.currentAdventure.currentSiteIndex++;
      this.loadCurrentSite();
      this.grid.updateFov(this.isTorchActive ? 4 : 1);
      this.updateUi();
      this.render();
      return;
    }
    const boonXp = treasureQualityXp("legendary");
    this.party.forEach((char) => this.engine.awardXp(char, boonXp));
    this.frame.addLog(`★ ADVENTURE COMPLETED: ${this.currentAdventure.name}! +${boonXp} legendary boon XP awarded to each party member.`, "system");
    this.queueLevelUps(this.party, () => {
      this.frame.addLog("Generating next Adventure campaign...", "system");
      this.startNewAdventure();
      this.grid.updateFov(this.isTorchActive ? 4 : 1);
      this.updateUi();
      this.render();
    });
  }

  private handleAttack(): void {
    if (!this.beginPlayerTurn()) return;
    if (!this.actionAvailable) {
      this.frame.addLog("You have already taken an action this turn.", "prompt");
      return;
    }
    const maxRange = this.leader.wieldedWeapon?.tags.includes("ranged") ? RANGE_BAND_TILES.far : RANGE_BAND_TILES.close;
    const target = this.findHostile(maxRange);
    if (target) {
      this.attackMonsterAt(target);
      this.actionAvailable = false;
      this.movementBandsRemaining = Math.min(1, this.movementBandsRemaining) as 0 | 1;
      this.endTurn("attack");
    } else {
      this.frame.addLog(maxRange > RANGE_BAND_TILES.close ? "No hostile within far range." : "No enemy within close range.", "prompt");
    }
  }

  private handleCast(): void {
    if (!this.beginPlayerTurn()) return;
    if (!this.actionAvailable) {
      this.frame.addLog("You have already taken an action this turn.", "prompt");
      return;
    }
    this.modals.showSpellbook(this.leader, (spellId) => {
      this.actionAvailable = false;
      this.movementBandsRemaining = Math.min(1, this.movementBandsRemaining) as 0 | 1;
      this.audio.playSpellSfx();
      this.frame.addLog(`${this.leader.name} casts ${spellId.replace("_", " ")}!`, "spell");
      this.resolveSpellEffect(this.leader, spellId, this.leader);
      this.endTurn("cast");
    });
  }

  private handleLook(): void {
    const tile = this.grid.getTile(this.grid.playerPos.x, this.grid.playerPos.y);
    let desc = "You look around. You see stone floor and dark corridor walls.";
    if (tile === TileType.STAIRS_DOWN) desc = "You see stone stairs descending deeper into the crypts.";
    if (tile === TileType.CAMPFIRE) desc = "You see a cozy campfire crackling warmly.";
    this.frame.addLog(desc, "system");
  }

  private handleTorch(): void {
    this.isTorchActive = !this.isTorchActive;
    if (this.isTorchActive) {
      this.frame.addLog(`${this.leader.name} strikes a match and lights a torch!`, "item");
    } else {
      this.frame.addLog(`${this.leader.name} douses the torch. Darkness envelopes you.`, "prompt");
    }
    this.updateUi();
    this.render();
  }

  private handleUseItem(): void {
    this.modals.showInventory(this.leader, (defId) => {
      this.frame.addLog(`${this.leader.name} equips/uses ${defId}.`, "item");
      this.updateUi();
    });
  }

  private handleInventory(): void {
    this.modals.showInventory(this.leader);
  }

  private handleStats(): void {
    this.modals.showCharacterSheet(this.leader);
  }

  private handleRest(): void {
    const onConfirmRest = () => {
      this.party.forEach((char) => this.engine.freeRest(char));
      this.isTorchActive = true;
      this.torchTimer = 3600;
      this.frame.addLog("The party rests at camp. HP restored and torches renewed!", "system");
      this.endTurn();
    };

    const carouseOptions = {
      gold: this.leader.gold,
      partySize: this.livingParty().length,
      tavernName: this.currentAdventure.tavernName,
      onCarouse: (tier: CarouseTier) => this.handleCarouse(tier),
    };

    this.modals.showRestScreen(onConfirmRest, carouseOptions, () => this.handleShop());
  }

  private handleShop(): void {
    this.modals.showShopScreen(this.currentAdventure.shopName, this.leader, (itemId) => this.handleSellItem(itemId));
  }

  private handleSellItem(itemId: string): void {
    const stack = this.leader.inventory.all().find((s) => s.def.id === itemId);
    if (!stack) return;
    const price = this.leader.inventory.sellPrice(itemId);
    this.leader.inventory.remove(itemId, 1);
    this.leader.gold += price;
    this.frame.addLog(`${this.leader.name} sells ${stack.def.name} at ${this.currentAdventure.shopName} for ${price} gp.`, "item");
    this.updateUi();
  }

  /** Party members still on their feet — the only ones who can carouse or roll. */
  private livingParty(): Character[] {
    return this.party.filter((member) => !member.dead);
  }

  /**
   * XP resets to 0 on level-up, so a character can never carry excess XP into
   * the next threshold — each one that qualifies must clear its own level-up
   * screen before further game flow (e.g. the next modal) proceeds.
   */
  private queueLevelUps(candidates: Character[], after?: () => void): void {
    const eligible = candidates.filter((char) => !char.dead && this.engine.canLevelUp(char));
    if (eligible.length === 0) {
      after?.();
      return;
    }
    this.pendingLevelUps.push(...eligible);
    this.pendingLevelUpsAfter = after;
    this.processNextLevelUp();
  }

  private processNextLevelUp(): void {
    const char = this.pendingLevelUps.shift();
    if (!char) {
      const after = this.pendingLevelUpsAfter;
      this.pendingLevelUpsAfter = undefined;
      this.modals.hide();
      after?.();
      return;
    }
    if (!this.engine.canLevelUp(char)) {
      this.processNextLevelUp();
      return;
    }
    const def = classDef(char.className);
    const result = this.engine.levelUp(char, def.hitDie, def.talentTableId);
    this.frame.addLog(`★ ${char.name} reaches Level ${result.newLevel}! +${result.hpGained} HP.`, "system");
    this.modals.showLevelUpModal(char, result, () => {
      this.updateUi();
      this.processNextLevelUp();
    });
  }

  private handleCarouse(tier: CarouseTier): void {
    const participants = this.livingParty();
    const cost = groupCarouseCost(tier, participants.length);
    if (this.leader.gold < cost) {
      this.frame.addLog(`Not enough gold pooled to carouse at the ${tier} tier (needs ${cost} gp for ${participants.length}).`, "prompt");
      return;
    }
    const group = resolveGroupCarouse(this.engine.dice, this.engine.tables, tier, this.leader.gold, participants.length);
    this.leader.gold -= group.cost;

    this.frame.addLog(`★ CAROUSE (${tier.toUpperCase()}): the party pools ${group.cost} gp at ${this.currentAdventure.tavernName} — each reveler rolls their own night.`, "item");
    participants.forEach((char, i) => {
      const result = group.results[i]!;
      this.engine.awardXp(char, result.xp);
      this.frame.addLog(`${char.name} rolls ${result.total} on the Carousing Outcome table: +${result.xp} XP.`, "hit");
      for (const benefit of result.benefits) this.frame.addLog(`${char.name} — Benefit: ${benefit}`, "hit");
      for (const mishap of result.mishaps) this.frame.addLog(`${char.name} — Mishap: ${mishap}`, "combat");
    });
    this.audio.playVictoryJingle();
    this.updateUi();
    this.queueLevelUps(participants);
  }

  private handlePass(): void {
    if (!this.beginPlayerTurn()) return;
    this.frame.addLog(`${this.leader.name} passes turn.`, "prompt");
    this.endTurn("pass");
  }

  private handleInteract(): void {
    const tile = this.grid.getTile(this.grid.playerPos.x, this.grid.playerPos.y);
    if (tile === TileType.STAIRS_DOWN) {
      if (!this.currentSite.goal.isCompleted) {
        this.frame.addLog("Stairs are locked! Fulfill the Site Goal first.", "prompt");
      } else {
        this.frame.addLog("You descend to the next site!", "system");
        this.advanceSite();
      }
    } else {
      this.frame.addLog("Nothing here to interact with.", "prompt");
    }
  }

  private monsterAiTurn(): void {
    this.grid.entities.forEach((monster) => {
      if (!monster.isHostile || monster.hp <= 0) return;

      const dx = this.grid.playerPos.x - monster.x;
      const dy = this.grid.playerPos.y - monster.y;
      const dist = gridDistance(this.grid.playerPos, monster);

      if (dist <= RANGE_BAND_TILES.close) {
        const result = monsterAttackRoll(this.engine.dice, {
          attackBonus: monster.attackBonus ?? 1,
          damage: monster.damage ?? "1d4",
          specialAbility: monster.specialAbility,
        }, this.leader.ac);
        this.frame.addLog(`${monster.name} attacks ${this.leader.name}! [d20 ${result.natural}+${monster.attackBonus ?? 1}=${result.total} vs AC ${this.leader.ac}]`, "combat");
        if (result.hit) {
          this.engine.damageCharacter(this.leader, result.damage, { attack: true });
          this.audio.playHitSfx();
          this.frame.addLog(`${result.crit ? "Critical hit! " : "Hit! "}${monster.name} deals ${result.damage} damage.`, "combat");
          if (result.appliedCondition) {
            const condition = result.appliedCondition as ConditionKind;
            if (applyCondition(this.leader, condition, { unit: "rounds", remaining: 3 })) {
              this.frame.addLog(`${this.leader.name} is ${condition}.`, "combat");
            }
          }
          if (this.leader.dying) this.frame.addLog(`${this.leader.name} is dying!`, "combat");
        } else {
          this.frame.addLog(result.natural === 1 ? `${monster.name} fumbles its attack.` : `${monster.name}'s attack missed.`, "prompt");
        }
      } else if (dist <= 4) {
        const stepX = monster.x + Math.sign(dx);
        const stepY = monster.y + Math.sign(dy);
        if (this.grid.isWalkable(stepX, stepY) && !this.grid.getEntityAt(stepX, stepY)) {
          monster.x = stepX;
          monster.y = stepY;
        }
      }
    });
  }

  private resolveAutoSupport(intent: LeaderIntent): void {
    const threat = this.grid.entities.some((entity) => entity.isHostile && entity.hp > 0 && gridDistance(this.grid.playerPos, entity) <= RANGE_BAND_TILES.far);
    for (const follower of this.party) {
      if (follower.id === this.leader.id || !this.autoFollowerIds.has(follower.id)) continue;
      const action = chooseAutoSupportAction(follower, this.leader, {
        leaderIntent: intent,
        hasThreat: threat,
        leaderHpPercent: this.leader.hp / Math.max(1, this.leader.maxHp),
      });
      if (action.kind === "follow") {
        this.frame.addLog(`${follower.name} follows the leader.`, "system");
      } else if (action.kind === "cast") {
        this.audio.playSpellSfx();
        this.resolveSpellEffect(follower, action.spellId, this.leader);
      } else if (action.kind === "attack") {
        const target = this.grid.entities
          .filter((entity) => entity.isHostile && entity.hp > 0 && gridDistance(this.grid.playerPos, entity) <= RANGE_BAND_TILES.close)
          .sort((a, b) => gridDistance(this.grid.playerPos, a) - gridDistance(this.grid.playerPos, b))[0];
        if (target) this.attackMonsterAt(target, follower);
      }
    }
  }

  private endTurn(intent: LeaderIntent = "pass"): void {
    this.frame.hideMovementTooltip();
    this.resolveAutoSupport(intent);
    this.round++;
    // Advance the pure engine clock so round-based conditions, concentration,
    // poison, and Shadowdark death timers resolve in the live game too.
    this.engine.advance(this.engine.config.roundMs);
    if (this.isTorchActive && this.torchTimer > 0) {
      this.torchTimer -= 10;
      if (this.torchTimer <= 0) {
        this.isTorchActive = false;
        this.frame.addLog("Your torch burns out! Pitch darkness consumes the dungeon.", "combat");
      }
    }

    // Resolve environmental zone hazards tick
    if (this.currentSite.biome === "dwellers-in-the-deep") {
      this.breathRoundsSubmerged++;
    } else {
      this.breathRoundsSubmerged = 0;
    }
    const hazardRes = ZoneHazards.resolveEnvironmentalTick(
      this.leader,
      this.currentSite.biome,
      this.engine.dice,
      this.isTorchActive,
      this.breathRoundsSubmerged
    );
    if (hazardRes.triggered && hazardRes.message) {
      this.frame.addLog(hazardRes.message, hazardRes.success ? "system" : "combat");
    }

    if (!this.combatActive) {
      this.monsterAiTurn();
    } else if (this.partyActsFirst) {
      this.monsterAiTurn();
    }
    if (this.combatActive && !this.activeHostiles().some((entity) => gridDistance(this.grid.playerPos, entity) <= RANGE_BAND_TILES.far)) {
      this.combatActive = false;
      this.frame.addLog("The immediate threat is gone; combat ends.", "system");
    }
    this.movementBandsRemaining = 2;
    this.actionAvailable = true;
    this.playerTurnStarted = false;
    this.syncPartyFormation();
    this.grid.updateFov(this.isTorchActive ? 4 : 1);
    this.updateUi();
    this.render();
  }

  private updateUi(): void {
    const site = this.currentSite;
    this.frame.updateHeader(
      this.currentAdventure.name,
      site.name,
      this.currentAdventure.currentSiteIndex + 1,
      this.currentAdventure.sites.length,
      `${site.sizeCategory} ${site.siteType}`,
      site.roomCount,
      site.goal.description,
      this.round,
      this.torchTimer,
      this.isTorchActive,
      this.leader.gold,
      `Move: ${this.movementBandsRemaining}/2 near${this.actionAvailable ? " · Action ready" : " · Action spent"}`
    );
    this.frame.updateParty(
      this.party,
      this.leaderIndex,
      (idx) => this.selectLeader(idx),
      this.party.map((member) => member.id !== this.leader.id && this.autoFollowerIds.has(member.id)),
      (idx) => this.toggleAutoFollower(idx),
    );
  }

  private render(): void {
    this.renderer.render(this.grid, this.party, this.leaderIndex);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Game();
});
