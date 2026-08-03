import json

with open('tmp/vanilla_sounds.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print(f"Total lines in CSV: {len(lines)}")

music_tracks = {}

for line in lines:
    line = line.strip()
    if "Sound\\Music\\" in line or "Sound\\Ambience\\" in line:
        parts = line.split('\\')
        if len(parts) >= 3:
            cat = parts[1] # Music or Ambience
            subcat = parts[2] if len(parts) >= 4 else "General"
            f_name = parts[-1]
            key = f"{cat}\\{subcat}"
            if key not in music_tracks:
                music_tracks[key] = []
            music_tracks[key].append(f_name)

print(f"Found {len(music_tracks)} music & ambience categories!")
for k in sorted(music_tracks.keys()):
    print(f"  {k:<35} Count: {len(music_tracks[k])}")

with open('tmp/parsed_music_tracks.json', 'w', encoding='utf-8') as f:
    json.dump(music_tracks, f, indent=2)

print("Saved parsed music tracks to tmp/parsed_music_tracks.json")
