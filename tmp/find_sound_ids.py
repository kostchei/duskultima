import urllib.request
import re
import json

sound_queries = [
    "CryptFiend", "QuillBoar", "Ogre", "Goblin", "Spider", "Ghoul", 
    "Skeleton", "Wolf", "Slime", "Hyena", "Scorpid", "HumanMale", 
    "HumanFemale", "Yeti", "Giant", "Crocodile", "Naga", "Murloc", 
    "Bear", "Boar", "Bat", "Treant", "Imp", "FireElemental"
]

results = {}

for q in sound_queries:
    url = f"https://www.wowhead.com/classic/sounds/npc-combat-sounds?filter=na={q};cr=4;crs=0"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
        
        # search for listview data
        # WH.Gatherer.addData(19, ...)
        gatherer_matches = re.findall(r'WH\.Gatherer\.addData\(19,\s*\d+,\s*({.*?})\);', html)
        found_sounds = []
        for gm in gatherer_matches:
            try:
                data = json.loads(gm)
                for sid, obj in data.items():
                    s_name = obj.get("name")
                    files = obj.get("files", [])
                    found_sounds.append((sid, s_name, files))
            except Exception:
                pass
        
        results[q] = found_sounds
        print(f"Query '{q}': found {len(found_sounds)} sound entries")
    except Exception as e:
        print(f"Error querying '{q}': {e}")

with open('tmp/sound_query_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("Saved sound query results to tmp/sound_query_results.json")
