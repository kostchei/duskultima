import re
import json

with open('tmp/vanilla_sounds.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print(f"Total lines in CSV: {len(lines)}")

creature_sounds = {}

for line in lines:
    line = line.strip()
    if "Sound\\Creature\\" in line:
        # e.g. Sound\Creature\CryptFiend\CryptFiendAttackA.wav
        parts = line.split('\\')
        if len(parts) >= 4:
            c_name = parts[2]
            f_name = parts[-1]
            if c_name not in creature_sounds:
                creature_sounds[c_name] = []
            creature_sounds[c_name].append(f_name)

print(f"Found {len(creature_sounds)} creature sound folders!")
for c in sorted(creature_sounds.keys())[:30]:
    print(f"Creature: {c:<25} File count: {len(creature_sounds[c])}")

with open('tmp/parsed_creature_sounds.json', 'w', encoding='utf-8') as f:
    json.dump(creature_sounds, f, indent=2)

print("Saved creature sounds to tmp/parsed_creature_sounds.json")
