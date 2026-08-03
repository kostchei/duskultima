import os

FIFTY_DIR = "public/assets/monsters/50_monsters_pack_2d_version_1.0_0/50+ Monsters Pack 2D/Monsters/Normal Colors"
TINY_DIR = "public/assets/monsters/tiny-creatures/tiny-creatures/Tiles"

fifty_files = [f for f in os.listdir(FIFTY_DIR) if "Front" in f]
tiny_files = os.listdir(TINY_DIR)

print(f"50 Monsters Pack files ({len(fifty_files)}):")
for f in fifty_files[:15]:
    print(" ", f)

print(f"\nTiny Creatures tile sample ({len(tiny_files)}):")
for f in tiny_files[:15]:
    print(" ", f)
