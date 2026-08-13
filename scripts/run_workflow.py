import os
import json
from extract_pdf_text import extract_all_pdfs
from classify_text import classify_all

REVIEW_MD_PATH = r"d:\Code\DuskUltima\docs\extracted\CATEGORIZATION_REVIEW.md"

def generate_review_markdown(classified_data):
    tables = classified_data["tables"]
    rules = classified_data["rules"]
    fluff = classified_data["fluff"]

    md_content = []
    md_content.append("# PDF Categorization Review Report\n")
    md_content.append("This document organizes extracted PDF contents from `docs/raw_source/` into 3 groups for user review:\n")
    md_content.append(f"- **Tables**: {len(tables)} pages/sections (stat blocks, roll tables, catalogs)")
    md_content.append(f"- **Rules**: {len(rules)} pages/sections (mechanics, action checks, game rules)")
    md_content.append(f"- **Fluff**: {len(fluff)} pages/sections (setting lore, world narrative, flavor text)\n")
    md_content.append("---\n")

    # Group by PDF source
    def by_source(items):
        grouped = {}
        for item in items:
            src = item["source"]
            if src not in grouped:
                grouped[src] = []
            grouped[src].append(item)
        return grouped

    tables_by_src = by_source(tables)
    rules_by_src = by_source(rules)
    fluff_by_src = by_source(fluff)

    all_sources = sorted(list(set(list(tables_by_src.keys()) + list(rules_by_src.keys()) + list(fluff_by_src.keys()))))

    md_content.append("## Summary per PDF Document\n")
    md_content.append("| PDF Source Document | Tables | Rules | Fluff | Total Pages |")
    md_content.append("|---|---|---|---|---|")

    for src in all_sources:
        t_cnt = len(tables_by_src.get(src, []))
        r_cnt = len(rules_by_src.get(src, []))
        f_cnt = len(fluff_by_src.get(src, []))
        md_content.append(f"| `{src}` | {t_cnt} | {r_cnt} | {f_cnt} | {t_cnt + r_cnt + f_cnt} |")

    md_content.append("\n---\n")

    md_content.append("## Group 1: Tables (For SQL Database Population)\n")
    md_content.append("Key dice tables, monster stat blocks, price lists, and random tables extracted:\n")
    for src in all_sources:
        src_tables = tables_by_src.get(src, [])
        if not src_tables:
            continue
        md_content.append(f"\n### `{src}` ({len(src_tables)} table pages)\n")
        for item in src_tables[:10]: # Top 10 samples
            md_content.append(f"- **Page {item['page']}**: `{item['snippet'][:120]}...`")
        if len(src_tables) > 10:
            md_content.append(f"- *...and {len(src_tables) - 10} more table pages.*")

    md_content.append("\n---\n")

    md_content.append("## Group 2: Rules (For Rules Engine Implementation)\n")
    md_content.append("Gameplay instructions, check procedures, combat rules, light burn rules, and class/ancestry mechanics:\n")
    for src in all_sources:
        src_rules = rules_by_src.get(src, [])
        if not src_rules:
            continue
        md_content.append(f"\n### `{src}` ({len(src_rules)} rules pages)\n")
        for item in src_rules[:10]: # Top 10 samples
            md_content.append(f"- **Page {item['page']}**: `{item['snippet'][:120]}...`")
        if len(src_rules) > 10:
            md_content.append(f"- *...and {len(src_rules) - 10} more rules pages.*")

    md_content.append("\n---\n")

    md_content.append("## Group 3: Fluff (Discarded / Setting Lore)\n")
    md_content.append("World lore, flavor descriptions, narrative vignettes:\n")
    for src in all_sources:
        src_fluff = fluff_by_src.get(src, [])
        if not src_fluff:
            continue
        md_content.append(f"\n### `{src}` ({len(src_fluff)} fluff pages)\n")
        for item in src_fluff[:5]:
            md_content.append(f"- **Page {item['page']}**: `{item['snippet'][:120]}...`")

    with open(REVIEW_MD_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(md_content))

    print(f"\nReport generated at: {REVIEW_MD_PATH}")

def main():
    print("=== Step 1: Extracting raw text from PDFs ===")
    extract_all_pdfs()

    print("\n=== Step 2: Classifying content into Tables, Rules, Fluff ===")
    classified = classify_all()

    print("\n=== Step 3: Generating Markdown Review Report ===")
    generate_review_markdown(classified)
    print("\nWorkflow completed successfully!")

if __name__ == "__main__":
    main()
