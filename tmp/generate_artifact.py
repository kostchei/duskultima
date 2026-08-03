import json

with open('tmp/mapped_monsters.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

artifact_path = r"C:\Users\Admin\.gemini\antigravity\brain\1af56f1b-e93e-4789-bcce-984db3433014\wow_classic_npc_monster_mapping.md"

biomes = {}
for m in monsters:
    b = m['biome']
    if b not in biomes:
        biomes[b] = []
    biomes[b].append(m)

biome_titles = {
    "diablerie": "1. Diablerie (Black Forests, Thorn Mazes, Barrow Dead & Lichs)",
    "red-sands": "2. Red Sands (Deserts, Mummies, Scorpions & Sandstorm Fiends)",
    "midnight-sun": "3. Midnight Sun (Frozen Wastes, Yetis, Ice Spiders & Frost Giants)",
    "river-of-night": "4. River of Night (Jungle Swamps, Serpent Naga, Dinosaurs & Druids)",
    "dwellers-in-the-deep": "5. Dwellers in the Deep (Underdark, Deep Ones, Void Spiders & Eldritch Fiends)",
    "city-of-masks": "6. City of Masks (Urban Alleyways, Thugs, Animated Armor & Flesh Golems)"
}

lines = []
lines.append("# WoW Classic NPC Sound & Character Mapping for Shadowdork Bestiary")
lines.append("")
lines.append("> [!NOTE]")
lines.append("> Below is the complete mapping of Shadowdork's **248 Core Monsters** across all 6 biomes to World of Warcraft Classic NPCs (`npc=number`). Every entry includes a direct Wowhead `#sounds;mode:normal` URL for listening to sound kits (Aggro, Wound, Death, Attack, and Ambient effects).")
lines.append("")
lines.append("## Overview Stats")
lines.append("")
lines.append("| Biome | Core Monster Count | Primary WoW NPC Families Matched |")
lines.append("| :--- | :---: | :--- |")
for b_key, b_title in biome_titles.items():
    count = len(biomes.get(b_key, []))
    if b_key == "diablerie":
        m_types = "Quillboars (Razormane/Bristleback), Ghouls, Skeletons, Spiders, Goblins, Ogres, Worgen, Vampires, Liches"
    elif b_key == "red-sands":
        m_types = "Wastewander Bandits, Hyenas, Scorpids, Dust Devils, Sandfury Mummies, Anubisath Sentinels, Silithids"
    elif b_key == "midnight-sun":
        m_types = "Winterwolves, Frostsabers, Bears, Ice Spiders, Yetis, Frostmane Trolls, Frost Giants, Valkyries"
    elif b_key == "river-of-night":
        m_types = "Viperian Naga, Jungle Gorillas/Spiders, Crocolisks, Basilisks, Sea Hags, Ogremages, Druids, Couatls"
    elif b_key == "dwellers-in-the-deep":
        m_types = "Cave Rats, Murkdeep Murlocs, Myconids, Void Spiders, Sludges/Mimics, Faceless Void Spawn, Pit Lords"
    else:
        m_types = "Defias Thugs, Animated Armors, High Elves, Dalaran Conjurers, Owlbears, Flesh Golems, Horned Devils"
    lines.append(f"| **{b_key.replace('-', ' ').title()}** | **{count}** | {m_types} |")

lines.append("")

for b_key, b_title in biome_titles.items():
    lines.append(f"## {b_title}")
    lines.append("")
    lines.append("| Shadowdork Monster | Archetype | WoW Classic NPC (`npc=ID`) | Match Quality | Sound & Character Profile |")
    lines.append("| :--- | :--- | :--- | :---: | :--- |")
    
    for m in biomes.get(b_key, []):
        name = m['name']
        m_id = m['id']
        arch = m['archetype']
        npc_id = m['npc_id']
        npc_name = m['npc_name']
        match_q = m['match_qual']
        rat = m['rationale']
        url = f"https://www.wowhead.com/classic/npc={npc_id}/#sounds;mode:normal"
        
        lines.append(f"| **{name}** (`{m_id}`) | `{arch}` | [{npc_name} (`npc={npc_id}`)](<{url}>) | `{match_q}` | {rat} |")
    
    lines.append("")

lines.append("## Usage in Sound Synthesis & Audio Pipeline")
lines.append("")
lines.append("> [!TIP]")
lines.append("> Use the extracted WoW Classic NPC sound kit IDs to power procedural sound triggers (Aggro, Attack, Hit, Death) and pair them with your DSP synthesis generator (`sound on the fly from primiati.md`).")
lines.append("")

with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print("Artifact created successfully at:", artifact_path)
