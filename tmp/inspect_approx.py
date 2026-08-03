import json

with open('tmp/mapped_monsters.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

approx = [m for m in monsters if m['match_qual'] == 'Approx']
print(f"Count of approx: {len(approx)}")

for m in approx:
    print(f"ID: {m['id']:<32} Name: {m['name']:<30} Biome: {m['biome']}")
