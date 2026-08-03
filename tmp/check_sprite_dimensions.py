import os
import re
import struct

ASSETS_DIR = "public/assets/monsters"

# Size bounds in engine
SIZE_PX = {
    "tiny": (18, 14),
    "small": (24, 24),
    "medium": (30, 32),
    "large": (42, 40),
    "huge": (58, 54),
    "gargantuan": (76, 68),
}

# Load monster size specs from rosters
roster_files = [
    "src/data/rosters/diablerie.ts",
    "src/data/rosters/red-sands.ts",
    "src/data/rosters/midnight-sun.ts",
    "src/data/rosters/river-of-night.ts",
    "src/data/rosters/dwellers-in-the-deep.ts",
    "src/data/rosters/city-of-masks.ts",
]

monster_sizes = {}
for path in roster_files:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            matches = re.findall(r'd\("([^"]+)"[^{]+\{[^}]*size:\s*"([^"]+)"', content)
            for m_id, sz in matches:
                monster_sizes[m_id] = sz

def get_png_dimensions(filepath):
    try:
        with open(filepath, "rb") as f:
            header = f.read(24)
            if header.startswith(b'\x89PNG\r\n\x1a\n'):
                width, height = struct.unpack(">II", header[16:24])
                return width, height
    except Exception:
        pass
    return None, None

results = []
by_size = {"tiny": 0, "small": 0, "medium": 0, "large": 0, "huge": 0, "gargantuan": 0}

for m_id, sz in monster_sizes.items():
    png_path = os.path.join(ASSETS_DIR, f"{m_id}.png")
    w, h = get_png_dimensions(png_path)
    target_w, target_h = SIZE_PX.get(sz, (30, 32))
    by_size[sz] = by_size.get(sz, 0) + 1
    results.append((m_id, sz, w, h, target_w, target_h))

print("=== MONSTER SIZE DISTRIBUTION ===")
for sz, count in by_size.items():
    target_w, target_h = SIZE_PX[sz]
    print(f"  {sz:10s} ({count:3d} monsters) -> Target Canvas: {target_w}x{target_h}px")

print("\n=== SAMPLE MONSTER SPRITE DIMENSIONS ===")
for m_id, sz, w, h, tw, th in results[:20]:
    print(f"  {m_id:25s} [{sz:10s}] -> File PNG: {w}x{h}px | Engine Footprint: {tw}x{th}px")
