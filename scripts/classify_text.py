import os
import json
import re

RAW_JSON_DIR = r"d:\Code\DuskUltima\docs\extracted\raw"
OUTPUT_DIR = r"d:\Code\DuskUltima\docs\extracted"

# Regex & Pattern definitions
DICE_TABLE_PATTERN = re.compile(r"\b(d4|d6|d8|d10|d12|d20|d100)\b|\b\d{1,2}-\d{1,2}\b", re.IGNORECASE)
STAT_BLOCK_PATTERN = re.compile(r"\b(AC|HP|ATK|LV|MV|AL)\s+\d+|\b(STR|DEX|CON|INT|WIS|CHA)\s+[+\-]?\d+", re.IGNORECASE)
TABLE_HEADER_PATTERN = re.compile(r"\b(table|mishap|talent|carouse|encounter|shop|price|cost|gear|weapon|armor|spell list|d20|d6|d100)\b", re.IGNORECASE)

RULES_KEYWORDS = [
    r"\bdc\s+\d+\b", r"\badvantage\b", r"\bdisadvantage\b", r"\bcheck\b", r"\broll\b",
    r"\btorch\b", r"\blight\b", r"\bdarkness\b", r"\bcrawling round\b", r"\bround\b",
    r"\battack\b", r"\bdamage\b", r"\bhit points\b", r"\bdying\b", r"\bstabilize\b",
    r"\bmorale\b", r"\bgear slot\b", r"\binventory\b", r"\brest\b", r"\bcarouse\b",
    r"\bspell check\b", r"\bmishap\b", r"\batonement\b", r"\bancestry\b", r"\bclass\b",
    r"\bturn\b", r"\bsaving throw\b", r"\blevel\b", r"\bxp\b", r"\bgold\b"
]
RULES_REGEX = re.compile("|".join(RULES_KEYWORDS), re.IGNORECASE)

def classify_page(text, filename, page_num):
    if not text or len(text.strip()) == 0:
        return None

    lines = text.split("\n")
    first_few = " ".join(lines[:3])

    dice_matches = len(DICE_TABLE_PATTERN.findall(text))
    stat_matches = len(STAT_BLOCK_PATTERN.findall(text))
    table_header = bool(TABLE_HEADER_PATTERN.search(first_few))
    rules_matches = len(RULES_REGEX.findall(text))

    # Decision tree:
    # 1. Table: high density of dice ranges/stat blocks or explicit table headers
    if dice_matches >= 4 or stat_matches >= 2 or (table_header and dice_matches >= 2):
        category = "Table"
    # 2. Rules: strong rules keywords density or mechanics instructions
    elif rules_matches >= 3 or ("how to" in text.lower() or "must make" in text.lower() or "on a success" in text.lower()):
        category = "Rule"
    # 3. Fluff: lore, narrative, descriptions
    else:
        category = "Fluff"

    return {
        "source": filename,
        "page": page_num,
        "category": category,
        "snippet": text[:300].replace("\n", " "),
        "full_text": text
    }

def classify_all():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    raw_files = [f for f in os.listdir(RAW_JSON_DIR) if f.endswith(".json")]

    classified_data = {
        "tables": [],
        "rules": [],
        "fluff": []
    }

    total_pages = 0

    for filename in sorted(raw_files):
        filepath = os.path.join(RAW_JSON_DIR, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            pdf_doc = json.load(f)

        source_pdf = pdf_doc["filename"]
        for page in pdf_doc["pages"]:
            total_pages += 1
            res = classify_page(page["text"], source_pdf, page["page_number"])
            if not res:
                continue
            
            if res["category"] == "Table":
                classified_data["tables"].append(res)
            elif res["category"] == "Rule":
                classified_data["rules"].append(res)
            else:
                classified_data["fluff"].append(res)

    output_json = os.path.join(OUTPUT_DIR, "classified_data.json")
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(classified_data, f, indent=2, ensure_ascii=False)

    print(f"Classification complete over {total_pages} pages:")
    print(f"  - Tables: {len(classified_data['tables'])} entries")
    print(f"  - Rules:  {len(classified_data['rules'])} entries")
    print(f"  - Fluff:  {len(classified_data['fluff'])} entries")

    return classified_data

if __name__ == "__main__":
    classify_all()
