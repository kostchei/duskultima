import json

with open('tmp/all_monsters.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

print(f"Total monsters loaded: {len(monsters)}")

# Print unique biomes and counts
biomes = {}
for m in monsters:
    b = m.get('biome', 'unknown')
    biomes[b] = biomes.get(b, 0) + 1

for b, c in biomes.items():
    print(f"Biome: {b:<25} Count: {c}")
