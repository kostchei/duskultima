import os
import re
import urllib.request

ASSETS_DIR = "public/assets/monsters"
os.makedirs(ASSETS_DIR, exist_ok=True)

# List of CC0 OpenGameArt / Kenney direct image asset URLs to download
ASSET_DOWNLOADS = {
    # 50+ Monsters Pack 2D / 32x32 Pixel Art Monsters
    "goblin": "https://opengameart.org/sites/default/files/goblin_walk.png",
    "skeleton": "https://opengameart.org/sites/default/files/skeleton_v2.png",
    "ghost": "https://opengameart.org/sites/default/files/ghost_0.png",
    "slime": "https://opengameart.org/sites/default/files/slime_idle.png",
}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

for monster_id, url in ASSET_DOWNLOADS.items():
    dest_path = os.path.join(ASSETS_DIR, f"{monster_id}.png")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest_path, "wb") as f:
            f.write(resp.read())
        print(f"Downloaded {monster_id}.png -> {dest_path}")
    except Exception as e:
        print(f"Failed to download {monster_id}: {e}")
