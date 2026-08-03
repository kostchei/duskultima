import json

with open('tmp/all_monsters.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

print(f"Total core monsters count: {len(monsters)}\n")
for i, m in enumerate(monsters):
    print(f"{i+1:3d}. ID: {m['id']:<30} Name: {m['name']:<30} Biome: {m.get('biome',''):<22} Arch: {m.get('archetype','')}")
