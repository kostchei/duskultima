import re

with open(r'src/data/tables/treasure.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

equipment_keywords = [
    'dagger', 'sword', 'greatsword', 'shortsword', 'bastard sword', 'blade',
    'axe', 'greataxe', 'mace', 'hammer', 'warhammer', 'spear', 'javelin',
    'bow', 'longbow', 'shortbow', 'crossbow', 'staff', 'shield', 'armor',
    'chainmail', 'plate', 'leather'
]

print("=== CHECKING ALL TREASURE ROWS IN CORE_ROWS ===")

for line_idx, line in enumerate(lines):
    if "row(" in line:
        # check if it contains equipment keyword
        line_lower = line.lower()
        matched_kw = [k for k in equipment_keywords if k in line_lower]
        if matched_kw:
            # check if baseItemId is provided (5th arg in row call or explicit)
            # row(min, max, text, valueGp, baseItemId, ...)
            parts = line.strip().split(',')
            # text is usually 3rd arg
            text_arg = parts[2] if len(parts) >= 3 else ""
            has_base = False
            if len(parts) >= 5:
                arg5 = parts[4].strip()
                if arg5 and arg5 != 'undefined' and not arg5.startswith('{') and not arg5.isdigit():
                    has_base = True
            
            status = "HAS base" if has_base else "MISSING base"
            print(f"Line {line_idx+1:3d} [{status:<12}] Keyword: {str(matched_kw):<20} Line: {line.strip()}")
