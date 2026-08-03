import re

with open(r'C:\Users\Admin\.gemini\antigravity\brain\1af56f1b-e93e-4789-bcce-984db3433014\.system_generated\steps\91\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

scripts = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
print(f"Found {len(scripts)} script tags")
for i, s in enumerate(scripts):
    if "files" in s or "sound" in s or "mainsound" in s or "WH.ge" in s or "g_sound" in s or "3341" in s:
        print(f"--- Script {i} ---")
        print(s[:1000])
