import os
import glob
import shutil

ASSETS_DIR = "public/assets/monsters"

# Source folders containing extracted PNG sprites
FIFTY_MONSTERS_DIR = os.path.join(ASSETS_DIR, "50_monsters_pack_2d_version_1.0_0/50+ Monsters Pack 2D/Monsters/Normal Colors")
TINY_TILES_DIR = os.path.join(ASSETS_DIR, "tiny-creatures/tiny-creatures/Tiles")

# Get list of 56 monsters from 50 Monsters Pack
fifty_sprites = sorted([os.path.join(FIFTY_MONSTERS_DIR, f) for f in os.listdir(FIFTY_MONSTERS_DIR) if "Front" in f])
tiny_tiles = sorted([os.path.join(TINY_TILES_DIR, f) for f in os.listdir(TINY_TILES_DIR) if f.endswith(".png")])

print(f"Found {len(fifty_sprites)} 50-Monsters front sprites")
print(f"Found {len(tiny_tiles)} Tiny Creatures tiles")

# Complete Monster list (244 IDs)
roster_files = [
    "src/data/rosters/diablerie.ts",
    "src/data/rosters/red-sands.ts",
    "src/data/rosters/midnight-sun.ts",
    "src/data/rosters/river-of-night.ts",
    "src/data/rosters/dwellers-in-the-deep.ts",
    "src/data/rosters/city-of-masks.ts",
]

import re
all_ids = []
for file_path in roster_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            all_ids.extend(re.findall(r'd\("([^"]+)"', f.read()))

# Map each monster ID to a sprite file if <id>.png doesn't exist yet
mapped_count = 0
for idx, m_id in enumerate(all_ids):
    target = os.path.join(ASSETS_DIR, f"{m_id}.png")
    if not os.path.exists(target):
        # Pick from 50 monsters pack first, or tiny tiles as fallback
        if idx < len(fifty_sprites):
            src = fifty_sprites[idx]
        else:
            tile_idx = (idx - len(fifty_sprites)) % len(tiny_tiles)
            src = tiny_tiles[tile_idx]
        
        shutil.copyfile(src, target)
        mapped_count += 1

print(f"Successfully assigned and mapped {mapped_count} monster sprites into {ASSETS_DIR}!")
