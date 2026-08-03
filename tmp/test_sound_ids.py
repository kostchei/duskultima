import urllib.request
import re
import json

sound_ids = [3340, 3341, 3342]

for sid in sound_ids:
    url = f"https://www.wowhead.com/classic/sound={sid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
    matches = re.findall(r'WH\.Gatherer\.addData\(19,\s*\d+,\s*({.*?})\);', html)
    if matches:
        data = json.loads(matches[0])
        s_obj = data.get(str(sid), {})
        name = s_obj.get("name")
        files = s_obj.get("files", [])
        print(f"Sound ID {sid} ({name}):")
        for f in files:
            print(f"  - Title: {f.get('title')}, URL: {f.get('url')}")
