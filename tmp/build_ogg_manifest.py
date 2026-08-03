import json
import os

with open('tmp/mapped_monsters.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

# Define standard WoW Classic audio sound file prefixes & fallback sound IDs/names for each creature type
# Format per key: (Aggro_Title, Aggro_URL, Attack_Title, Attack_URL, Wound_Title, Wound_URL)

sound_templates = {
    # Crypt Fiend / Carrion Crawler
    "carrion-crawler": (
        "CryptFiendAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/40/546599/CryptFiendAggroA.ogg",
        "CryptFiendAttackB", "https://wow.zamimg.com/sound-ids/classic/enus/40/546600/CryptFiendAttackB.ogg",
        "CryptFiendWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/40/546609/CryptFiendWoundA.ogg"
    ),
    # Quillboar
    "quillboar": (
        "QuillBoarAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/12/548236/QuillBoarAggroA.ogg",
        "QuillBoarAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/12/548237/QuillBoarAttackA.ogg",
        "QuillBoarWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/12/548243/QuillBoarWoundA.ogg"
    ),
    # Ogre
    "ogre": (
        "OgreAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/02/547778/OgreAggroA.ogg",
        "OgreAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/02/547780/OgreAttackA.ogg",
        "OgreWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/02/547787/OgreWoundA.ogg"
    ),
    # Goblin
    "goblin": (
        "GoblinMaleAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/50/547218/GoblinMaleAggroA.ogg",
        "GoblinMaleAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/50/547220/GoblinMaleAttackA.ogg",
        "GoblinMaleWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/50/547229/GoblinMaleWoundA.ogg"
    ),
    # Spider
    "spider": (
        "SpiderAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/15/548655/SpiderAggroA.ogg",
        "SpiderAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/15/548656/SpiderAttackA.ogg",
        "SpiderWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/15/548662/SpiderWoundA.ogg"
    ),
    # Ghoul
    "ghoul": (
        "GhoulAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/18/547058/GhoulAggroA.ogg",
        "GhoulAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/18/547060/GhoulAttackA.ogg",
        "GhoulWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/18/547067/GhoulWoundA.ogg"
    ),
    # Skeleton
    "skeleton": (
        "SkeletonAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/06/548518/SkeletonAggroA.ogg",
        "SkeletonAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/06/548520/SkeletonAttackA.ogg",
        "SkeletonWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/06/548527/SkeletonWoundA.ogg"
    ),
    # Worgen / Wolf
    "wolf": (
        "WolfAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/11/549163/WolfAggroA.ogg",
        "WolfAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/11/549165/WolfAttackA.ogg",
        "WolfWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/11/549171/WolfWoundA.ogg"
    ),
    # Slime / Ooze
    "ooze": (
        "SlimeAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/10/548586/SlimeAggroA.ogg",
        "SlimeAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/10/548588/SlimeAttackA.ogg",
        "SlimeWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/10/548595/SlimeWoundA.ogg"
    ),
    # Hyena
    "hyena": (
        "HyenaAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/32/547360/HyenaAggroA.ogg",
        "HyenaAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/32/547362/HyenaAttackA.ogg",
        "HyenaWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/32/547368/HyenaWoundA.ogg"
    ),
    # Scorpid
    "scorpid": (
        "ScorpidAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/18/548466/ScorpidAggroA.ogg",
        "ScorpidAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/18/548468/ScorpidAttackA.ogg",
        "ScorpidWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/18/548474/ScorpidWoundA.ogg"
    ),
    # Bandit / Humanoid
    "humanoid": (
        "HumanMaleAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/22/547326/HumanMaleAggroA.ogg",
        "HumanMaleAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/22/547328/HumanMaleAttackA.ogg",
        "HumanMaleWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/22/547337/HumanMaleWoundA.ogg"
    ),
    # Caster Female
    "caster_female": (
        "HumanFemaleAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/15/547285/HumanFemaleAggroA.ogg",
        "HumanFemaleAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/15/547287/HumanFemaleAttackA.ogg",
        "HumanFemaleWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/15/547294/HumanFemaleWoundA.ogg"
    ),
    # Yeti
    "yeti": (
        "YetiAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/19/549195/YetiAggroA.ogg",
        "YetiAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/19/549197/YetiAttackA.ogg",
        "YetiWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/19/549203/YetiWoundA.ogg"
    ),
    # Giant
    "giant": (
        "GiantsAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/19/547184/GiantsAggroA.ogg",
        "GiantsAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/19/547186/GiantsAttackA.ogg",
        "GiantsWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/19/547192/GiantsWoundA.ogg"
    ),
    # Crocodile
    "crocodile": (
        "CrocodileAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/32/546574/CrocodileAggroA.ogg",
        "CrocodileAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/32/546576/CrocodileAttackA.ogg",
        "CrocodileWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/32/546582/CrocodileWoundA.ogg"
    ),
    # Naga
    "naga": (
        "NagaMaleAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/50/547690/NagaMaleAggroA.ogg",
        "NagaMaleAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/50/547692/NagaMaleAttackA.ogg",
        "NagaMaleWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/50/547699/NagaMaleWoundA.ogg"
    ),
    # Murloc
    "murloc": (
        "MurlocAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/45/547661/MurlocAggroA.ogg",
        "MurlocAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/45/547663/MurlocAttackA.ogg",
        "MurlocWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/45/547669/MurlocWoundA.ogg"
    ),
    # Bear
    "bear": (
        "BearAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/10/546410/BearAggroA.ogg",
        "BearAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/10/546412/BearAttackA.ogg",
        "BearWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/10/546418/BearWoundA.ogg"
    ),
    # Boar
    "boar": (
        "BoarAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/30/546445/BoarAggroA.ogg",
        "BoarAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/30/546447/BoarAttackA.ogg",
        "BoarWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/30/546453/BoarWoundA.ogg"
    ),
    # Bat / Flying Insect
    "bat": (
        "BatAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/40/546380/BatAggroA.ogg",
        "BatAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/40/546382/BatAttackA.ogg",
        "BatWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/40/546388/BatWoundA.ogg"
    ),
    # Plant
    "plant": (
        "TreantAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/20/548842/TreantAggroA.ogg",
        "TreantAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/20/548844/TreantAttackA.ogg",
        "TreantWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/20/548850/TreantWoundA.ogg"
    ),
    # Demon / Imp
    "demon": (
        "ImpAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/30/547400/ImpAggroA.ogg",
        "ImpAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/30/547402/ImpAttackA.ogg",
        "ImpWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/30/547408/ImpWoundA.ogg"
    ),
    # Elemental / Shadow
    "elemental": (
        "FireElementalAggroA", "https://wow.zamimg.com/sound-ids/classic/enus/50/546890/FireElementalAggroA.ogg",
        "FireElementalAttackA", "https://wow.zamimg.com/sound-ids/classic/enus/50/546892/FireElementalAttackA.ogg",
        "FireElementalWoundA", "https://wow.zamimg.com/sound-ids/classic/enus/50/546898/FireElementalWoundA.ogg"
    )
}

def get_template_for_monster(m):
    m_id = m['id']
    arch = m['archetype']
    
    if "carrion-crawler" in m_id or "rotgrub" in m_id or "maggot" in m_id:
        return sound_templates["carrion-crawler"]
    elif "quillboar" in m_id or "razormane" in m_id or "bristleback" in m_id:
        return sound_templates["quillboar"]
    elif "ogre" in m_id or "brute" in m_id or "golem" in m_id:
        return sound_templates["ogre"]
    elif "goblin" in m_id or "leprechaun" in m_id:
        return sound_templates["goblin"]
    elif arch == "spider" or "spider" in m_id or "arach" in m_id or "scarab" in m_id:
        return sound_templates["spider"]
    elif "ghoul" in m_id or "flesh" in m_id or "zombie" in m_id:
        return sound_templates["ghoul"]
    elif "skeleton" in m_id or "bone" in m_id or "lich" in m_id:
        return sound_templates["skeleton"]
    elif arch == "boar" or "boar" in m_id:
        return sound_templates["boar"]
    elif "wolf" in m_id or "werewolf" in m_id or "jackal" in m_id or "dog" in m_id:
        return sound_templates["wolf"]
    elif arch == "ooze" or "sludge" in m_id or "mold" in m_id or "slime" in m_id or "mimic" in m_id:
        return sound_templates["ooze"]
    elif "hyena" in m_id:
        return sound_templates["hyena"]
    elif "scorpid" in m_id or "scorpion" in m_id:
        return sound_templates["scorpid"]
    elif "yeti" in m_id or "ape" in m_id or "gorilla" in m_id:
        return sound_templates["yeti"]
    elif "giant" in m_id or "mammoth" in m_id or "rhino" in m_id:
        return sound_templates["giant"]
    elif "crocodile" in m_id or "basilisk" in m_id or "snake" in m_id or "serpent" in m_id:
        return sound_templates["crocodile"]
    elif "naga" in m_id or "viperian" in m_id or "siren" in m_id:
        return sound_templates["naga"]
    elif "deep" in m_id or "murloc" in m_id or "merfolk" in m_id:
        return sound_templates["murloc"]
    elif "bear" in m_id:
        return sound_templates["bear"]
    elif arch == "flyer" or "bat" in m_id or "pterodactyl" in m_id or "bird" in m_id:
        return sound_templates["bat"]
    elif arch == "plant" or "bog" in m_id or "tree" in m_id or "flower" in m_id or "shroom" in m_id:
        return sound_templates["plant"]
    elif "demon" in m_id or "imp" in m_id or "devil" in m_id or "hag" in m_id:
        return sound_templates["demon"]
    elif arch == "elemental" or "shadow" in m_id or "wraith" in m_id or "spectre" in m_id:
        return sound_templates["elemental"]
    elif "witch" in m_id or "oracle" in m_id or "conjurer" in m_id:
        return sound_templates["caster_female"]
    else:
        return sound_templates["humanoid"]

full_ogg_manifest = []

for m in monsters:
    ag_title, ag_url, at_title, at_url, wo_title, wo_url = get_template_for_monster(m)
    
    full_ogg_manifest.append({
        "id": m["id"],
        "name": m["name"],
        "biome": m["biome"],
        "archetype": m["archetype"],
        "npc_id": m["npc_id"],
        "npc_name": m["npc_name"],
        "sounds": {
            "aggro": {
                "title": ag_title,
                "url": ag_url
            },
            "attack": {
                "title": at_title,
                "url": at_url
            },
            "wound": {
                "title": wo_title,
                "url": wo_url
            }
        }
    })

print(f"Generated complete OGG manifest for {len(full_ogg_manifest)} monsters.")

os.makedirs('public/assets/sounds/monsters', exist_ok=True)
with open('public/assets/sounds/monsters/manifest.json', 'w', encoding='utf-8') as f:
    json.dump(full_ogg_manifest, f, indent=2)

print("Saved public/assets/sounds/monsters/manifest.json")
