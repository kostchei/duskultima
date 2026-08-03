import os
import shutil

SRC_DIR = "public/assets/monsters/tiny-creatures/tiny-creatures/Tiles"
DEST_DIR = "public/assets/monsters"

# Mapping monster IDs to Kenney Tiny Creatures tile files (16x16)
MAPPINGS = {
    "spider": "tile_0110.png",
    "rat": "tile_0111.png",
    "scorpion": "tile_0112.png",
    "giant-centipede": "tile_0113.png",
    "stingbat": "tile_0120.png",
    "tar-bat": "tile_0120.png",
    "large-bat": "tile_0120.png",
    "wolf": "tile_0121.png",
    "timber-wolf": "tile_0121.png",
    "winter-wolf": "tile_0122.png",
    "snake": "tile_0123.png",
    "cobra-snake": "tile_0123.png",
    "giant-snake": "tile_0124.png",
    "goblin": "tile_0108.png",
    "skeleton": "tile_0109.png",
    "giant-crab": "tile_0114.png",
    "rime-crab": "tile_0114.png",
    "giant-frog": "tile_0115.png",
}

for monster_id, tile_file in MAPPINGS.items():
    src = os.path.join(SRC_DIR, tile_file)
    dest = os.path.join(DEST_DIR, f"{monster_id}.png")
    if os.path.exists(src):
        shutil.copyfile(src, dest)
        print(f"Mapped {tile_file} -> {dest}")
    else:
        print(f"Warning: {src} not found")
