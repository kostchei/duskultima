import json
import os
import urllib.request
import time

with open('public/assets/sounds/monsters/manifest.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

base_dir = 'public/assets/sounds/monsters'

print(f"Starting batch audio download for {len(monsters)} monsters (744 total .ogg files)...")
downloaded = 0
failed = 0

for m in monsters:
    m_dir = os.path.join(base_dir, m['id'])
    os.makedirs(m_dir, exist_ok=True)
    
    for s_type, s_data in m['sounds'].items():
        title = s_data['title']
        url = s_data['url']
        out_file = os.path.join(m_dir, f"{s_type}.ogg")
        
        if not os.path.exists(out_file):
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as resp, open(out_file, 'wb') as out:
                    out.write(resp.read())
                downloaded += 1
            except Exception as e:
                print(f"Failed to download {url} for {m['id']}: {e}")
                failed += 1

print(f"Download task finished! Downloaded: {downloaded}, Failed: {failed}")
