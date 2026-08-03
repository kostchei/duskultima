import urllib.request
import re

url = "https://www.wowhead.com/classic/sounds/npc-combat-sounds"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')

print("Searching for sound list items...")
for line in html.splitlines():
    if "CryptFiend" in line or "Razormane" in line or "Ogre" in line or "new Listview" in line:
        if len(line) < 300:
            print(line.strip())
