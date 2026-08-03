import urllib.request
import re
import json

def get_npc_sounds(npc_id):
    url = f"https://www.wowhead.com/classic/npc={npc_id}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
        
        # Search for WH.Gatherer.addData calls or sound objects
        sound_matches = re.findall(r'WH\.Gatherer\.addData\(19,\s*\d+,\s*({.*?})\);', html)
        if not sound_matches:
            # try to search for any .ogg links directly in javascript or json
            ogg_links = re.findall(r'https://wow\.zamimg\.com/sound-ids/[^\s"\'\\]+\.ogg', html)
            return ogg_links
        
        results = []
        for match in sound_matches:
            try:
                data = json.loads(match)
                for s_id, s_info in data.items():
                    for f in s_info.get('files', []):
                        results.append((s_info.get('name'), f.get('title'), f.get('url')))
            except Exception as e:
                pass
        return results
    except Exception as e:
        print(f"Error fetching npc={npc_id}: {e}")
        return []

print("Testing npc=7351 (Tomb Reaver)...")
sounds_7351 = get_npc_sounds(7351)
print("Sounds found for 7351:", sounds_7351[:10])

print("\nTesting npc=4420 (Razormane Hunter)...")
sounds_4420 = get_npc_sounds(4420)
print("Sounds found for 4420:", sounds_4420[:10])
