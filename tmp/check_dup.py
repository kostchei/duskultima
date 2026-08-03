import re
import glob

all_ids = {}

for filepath in glob.glob("src/data/rosters/*.ts"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # matches mon("biome", "id", ...) or d("id", ...)
    matches = re.findall(r'(?:mon\(\s*"[^"]+"\s*,\s*|d\(\s*)"([^"]+)"', content)
    for m_id in matches:
        all_ids.setdefault(m_id, []).append(filepath)

for m_id, sources in all_ids.items():
    if len(sources) > 1:
        print(f"DUPLICATE MONSTER ID '{m_id}': found in {sources}")
