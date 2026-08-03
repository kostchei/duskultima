import re

with open(r'C:\Users\Admin\.gemini\antigravity\brain\1af56f1b-e93e-4789-bcce-984db3433014\.system_generated\steps\275\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

print("Searching for music track names or sound IDs...")

scripts = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
for i, s in enumerate(scripts):
    if "music" in s.lower() or "zone" in s.lower() or "listview" in s.lower():
        print(f"--- Script {i} ---")
        lines = s.splitlines()
        for l in lines:
            if "name" in l or "files" in l or "listview" in l.lower():
                if len(l) < 300:
                    print(l.strip())
