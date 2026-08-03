import json

with open('tmp/all_monsters.json', 'r', encoding='utf-8') as f:
    monsters = json.load(f)

print(f"Total monsters: {len(monsters)}")

biomes = {}
for m in monsters:
    b = m.get('biome', 'unknown')
    biomes[b] = biomes.get(b, 0) + 1

print("\nMonsters per biome:")
for b, count in biomes.items():
    print(f"  {b}: {count}")

print("\nSample 25 monsters:")
for m in monsters[:25]:
    print(f"  ID: {m['id']:<25} Name: {m['name']:<25} Biome: {m.get('biome'):<20} Arch: {m.get('archetype'):<12} Role: {m.get('role')}")
