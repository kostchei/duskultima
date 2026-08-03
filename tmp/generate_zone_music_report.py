import os

artifact_path = r"C:\Users\Admin\.gemini\antigravity\brain\1af56f1b-e93e-4789-bcce-984db3433014\wow_classic_zone_music_recommendations.md"

content = """# WoW Classic Zone Music & Ambience Recommendations for Shadowdork Biomes

> [!NOTE]
> World of Warcraft Classic contains over **120 Zone Music tracks**, **37 City Music tracks**, and **90+ Ambient Sound Beds**. Below is the curated match mapping for Shadowdork's **6 Biomes**, detailing which WoW Classic music tracks and ambient sound loops fit each zone's mood and theme.

---

## 1. Diablerie (Black Forests, Thorn Mazes, Barrow Dead & Liches)
* **Atmosphere**: Dark, oppressive woods, creaking boughs, ancient tombs, necromancy, and skeletal horrors.

### Recommended WoW Classic Music Tracks
* `DayEvilForest01.mp3` – `DayEvilForest03.mp3` *(Duskwood / Black Forest day theme)*
* `NightEvilForest01.mp3` – `NightEvilForest03.mp3` *(Spooky night woods & whispering wind)*
* `CursedLand01.mp3` – `CursedLand02.mp3` *(Blasted Lands / Cursed soil theme)*
* `NaxxramasPlagueWing1.mp3` & `NaxxramasSpiderWing1.mp3` *(Barrow dead & Lich chamber theme)*

### Recommended Ambient Sound Loops
* `ForestScaryDay.wav` / `ForestScaryNight.wav` *(Creaking boughs, distant howls, rustling thorns)*
* `DungeonCrypt.wav` / `Stratholme.wav` *(Barrow crypt reverberation & dripping moisture)*

---

## 2. Red Sands (Sun-Bleached Dunes, Tomb Guardians, Mummies & Scorpions)
* **Atmosphere**: Arid, blistering heat, windswept dunes, ancient sand-buried ruins, and desert predators.

### Recommended WoW Classic Music Tracks
* `DayDesert01.mp3` – `DayDesert03.mp3` *(Tanaris & Silithus sun-bleached desert theme)*
* `NightDesert01.mp3` – `NightDesert03.mp3` *(Chilling desert night skies & starlight)*
* `DayBarrenDry01.mp3` / `NightBarrenDry01.mp3` *(The Barrens / Arid sun-scorched plains)*
* `AhnQirajExteriorWalking1.mp3` / `AhnQirajInterior1.mp3` *(Pharaoh tomb & Anubisath monolith theme)*

### Recommended Ambient Sound Loops
* `CanyonDesertDay.wav` / `CanyonDesertNight.wav` *(Swirling sand wind, sifting dunes)*
* `SaltFlatsDay.wav` / `PlainsDesertDay.wav` *(Dry wind howling across flat alkaline sands)*

---

## 3. Midnight Sun (Frozen Wastes, Frost Giants, Glaciers & Yetis)
* **Atmosphere**: Sub-zero blizzards, icy mountain crags, ancient frost ruins, and howling wolves.

### Recommended WoW Classic Music Tracks
* `DayMountain01.mp3` – `DayMountain03.mp3` *(Winterspring / Dun Morogh mountain theme)*
* `NightMountain01.mp3` – `NightMountain04.mp3` *(Icy peak night ambience & frozen silence)*
* `NaxxramasFrostwyrm1.mp3` – `NaxxramasFrostwyrm2.mp3` *(Glacial frost dragon theme)*

### Recommended Ambient Sound Loops
* `ForestSnowDay.wav` / `ForestSnowNight.wav` *(Blizzard gusts, freezing snow crunch)*
* `NaxxramasFrostWyrm.wav` *(Chilling sub-zero wind draft & ice cracking)*

---

## 4. River of Night (Jungle Swamps, Serpent Naga, Dinosaurs & Druids)
* **Atmosphere**: Dense tropical canopy, stagnant mist, rivers, serpent cults, and primordial beasts.

### Recommended WoW Classic Music Tracks
* `DayJungle01.mp3` – `DayJungle03.mp3` *(Stranglethorn Vale jungle exploration)*
* `NightJungle01.mp3` – `NightJungle03.mp3` *(Nocturnal jungle drums & insect chorus)*
* `soggyplace-zone1.mp3` – `soggyplace-zone4.mp3` *(Swamp of Sorrows / Wetland marsh theme)*
* `Druid Grove.mp3` *(Ancient druidic sanctuary theme)*

### Recommended Ambient Sound Loops
* `JungleDay.wav` / `JungleNight.wav` *(Tropical cicadas, water drips, distant bird shrieks)*
* `MarshDay.wav` / `MarshNight.wav` *(Swamp bubbling, bullfrogs, stagnant water)*

---

## 5. Dwellers in the Deep (Underdark, Deep Ones, Void Spiders & Eldritch Fiends)
* **Atmosphere**: Subterranean abysses, pitch-black caverns, bioluminescent fungi, and void aberrations.

### Recommended WoW Classic Music Tracks
* `AhnQirajInterior2.mp3` / `AhnQirajKingRoom.mp3` *(Subterranean eldritch temple theme)*
* `NaxxramasSpiderBoss1.mp3` / `NaxxramasHubBase1.mp3` *(Underdark horror & spider hive music)*
* `GhostMusic03.mp3` *(Subconscious void whispers & disembodied moans)*

### Recommended Ambient Sound Loops
* `MineStandardDungeon.wav` *(Subterranean echo, dripping stalactites, stone groan)*
* `WailingCaverns.wav` / `Blackfathom.wav` *(Abyssal cavern, subterranean water echoes)*
* `AhnQirajCthunStomach.wav` / `mini-hive.wav` *(Eldritch organic squelching & void hum)*

---

## 6. City of Masks (Urban Alleyways, Thugs, High Elves, Animated Armor & Flesh Golems)
* **Atmosphere**: Cobblestone streets, shadowy alleyways, masked guild houses, taverns, and urban intrigue.

### Recommended WoW Classic Music Tracks
* `undercity01-zone.mp3` – `undercity03-zone.mp3` *(Undercity / Masked shadow city theme)*
* `stormwind04-zone.mp3` – `stormwind08-zone.mp3` *(Cobblestone streets & urban intrigue)*
* `Darnassus Walking 1.mp3` / `IronForge Walking 01.mp3` *(High elf duelists & guild halls)*
* `TavernAlliance01.mp3` / `TavernHorde01.mp3` *(Masked tavern & crime syndicate music)*

### Recommended Ambient Sound Loops
* `Undercity.wav` / `UnderCityCrowd.wav` *(Urban echoes, distant murmurs, sewer drips)*
* `DungeonCatheadral.wav` / `StormWindJail.wav` *(Vaulted stone arches, iron gate clinks)*
"""

with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write(content.strip())

print("Zone music recommendations artifact generated at:", artifact_path)
