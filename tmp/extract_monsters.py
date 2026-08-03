import re
import glob

roster_files = sorted(glob.glob("src/data/rosters/*.ts"))
monsters = []

for fpath in roster_files:
    if "build.ts" in fpath:
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # helper d(...) parser or object parser
    # In shadowdork, monster definitions use helper functions like d("id", "name", ...) or objects
    # Let's inspect raw lines
    for line in content.splitlines():
        if "id:" in line or "d(" in line:
            pass

# Let's import node or typescript or inspect how rosters are defined
with open("src/data/rosters/diablerie.ts", "r", encoding="utf-8") as f:
    print("DIABLERIE HEAD:")
    print("\n".join(f.readlines()[:40]))
