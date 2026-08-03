import json

with open('tmp/parsed_music_tracks.json', 'r', encoding='utf-8') as f:
    tracks = json.load(f)

print("--- ZONE MUSIC TRACKS ---")
for t in sorted(tracks.get("Music\\ZoneMusic", [])):
    print("  ", t)

print("\n--- CITY MUSIC TRACKS ---")
for t in sorted(tracks.get("Music\\CityMusic", [])):
    print("  ", t)

print("\n--- ZONE AMBIENCE TRACKS ---")
for t in sorted(tracks.get("Ambience\\ZoneAmbience", [])):
    print("  ", t)

print("\n--- WMO (DUNGEON / BUILDING) AMBIENCE TRACKS ---")
for t in sorted(tracks.get("Ambience\\WMOAmbience", [])):
    print("  ", t)
