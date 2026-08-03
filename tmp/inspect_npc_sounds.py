import re

with open(r'C:\Users\Admin\.gemini\antigravity\brain\1af56f1b-e93e-4789-bcce-984db3433014\.system_generated\steps\109\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

scripts = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
for i, s in enumerate(scripts):
    if "sound" in s.lower() or "template: 'sound'" in s.lower() or "type: 19" in s or "type:19" in s:
        print(f"--- Script {i} ---")
        print(s[:2000])
