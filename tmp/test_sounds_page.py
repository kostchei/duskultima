import urllib.request
import json
import re

url = "https://www.wowhead.com/classic/sounds/npc-combat-sounds"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
    
    print("Fetched sounds page length:", len(html))
    
    # search for _sound or g_sounds data or listview data
    sound_data = re.findall(r'WH\.Gatherer\.addData\(19,\s*\d+,\s*({.*?})\);', html)
    print("Found Gatherer sound data count:", len(sound_data))
    if sound_data:
        print("Sample gatherer sound data:", sound_data[0][:500])
    
    # Search for listview data array
    lv_data = re.findall(r'data:\s*(\[\{.*?\}\])', html, re.DOTALL)
    print("Found listview arrays:", len(lv_data))
    for d in lv_data[:3]:
        print("Listview data sample:", d[:300])
except Exception as e:
    print("Error:", e)
