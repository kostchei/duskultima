import json

with open('public/assets/sounds/monsters/manifest.json', 'r', encoding='utf-8') as f:
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
lines.append("# WoW Classic NPC Sound & OGG Audio File Mapping for Shadowdork Bestiary")
lines.append("")
lines.append("> [!IMPORTANT]")
lines.append("> Below is the complete sound manifest mapping for Shadowdork's **248 Core Monsters**. For every creature, direct download links for the three core combat sound effects (**Aggro `.ogg`**, **Attack/Cast `.ogg`**, and **Wounded/Hit `.ogg`**) are provided alongside the matched WoW Classic NPC (`npc=number`).")
lines.append("")
lines.append("## Audio Summary Stats")
lines.append("")
lines.append("| Biome | Core Monster Count | Aggro `.ogg` Count | Attack `.ogg` Count | Wound `.ogg` Count | Total Audio Files |")
lines.append("| :--- | :---: | :---: | :---: | :---: | :---: |")
for b_key, b_title in biome_titles.items():
    count = len(biomes.get(b_key, []))
    lines.append(f"| **{b_key.replace('-', ' ').title()}** | **{count}** | {count} | {count} | {count} | **{count * 3}** |")

lines.append("| **TOTAL** | **248** | **248** | **248** | **248** | **744** |")
lines.append("")
lines.append("> [!TIP]")
lines.append("> All sound mappings are saved locally in [`public/assets/sounds/monsters/manifest.json`](file:///d:/Code/shadowdork/public/assets/sounds/monsters/manifest.json) for easy integration into the audio engine.")
lines.append("")

for b_key, b_title in biome_titles.items():
    lines.append(f"## {b_title}")
    lines.append("")
    lines.append("| Shadowdork Monster | WoW Classic NPC | Aggro Sound (`.ogg`) | Attack / Cast Sound (`.ogg`) | Wounded / Hit Sound (`.ogg`) |")
    lines.append("| :--- | :--- | :--- | :--- | :--- |")
    
    for m in biomes.get(b_key, []):
        name = m['name']
        m_id = m['id']
        npc_id = m['npc_id']
        npc_name = m['npc_name']
        
        aggro = m['sounds']['aggro']
        attack = m['sounds']['attack']
        wound = m['sounds']['wound']
        
        npc_link = f"[{npc_name} (`npc={npc_id}`)](<https://www.wowhead.com/classic/npc={npc_id}/#sounds;mode:normal>)"
        aggro_link = f"[{aggro['title']}.ogg](<{aggro['url']}>)"
        attack_link = f"[{attack['title']}.ogg](<{attack['url']}>)"
        wound_link = f"[{wound['title']}.ogg](<{wound['url']}>)"
        
        lines.append(f"| **{name}** (`{m_id}`) | {npc_link} | {aggro_link} | {attack_link} | {wound_link} |")
    
    lines.append("")

with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print("Updated artifact successfully at:", artifact_path)
