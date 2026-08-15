"""Completeness and boundary checks for the generated database artifacts."""

import json
import sqlite3
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class TableDatabaseCompletenessTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.db = sqlite3.connect(ROOT / "shadowdork.db")
        cls.db.row_factory = sqlite3.Row
        cls.bundle = json.loads((ROOT / "src/data/db/master_tables.json").read_text(encoding="utf-8"))
        cls.manifest = json.loads((ROOT / "src/data/db/source_manifest.json").read_text(encoding="utf-8"))

    @classmethod
    def tearDownClass(cls):
        cls.db.close()

    def test_bundle_counts_match_sqlite(self):
        for table in ("tables_meta", "roll_tables", "ancestry_names", "backgrounds", "trinkets", "items", "monsters", "spells", "rules_catalog", "structured_rows"):
            self.assertEqual(len(self.bundle[table]), self.db.execute(f"SELECT count(*) FROM {table}").fetchone()[0], table)

    def test_manifest_has_required_shape(self):
        self.assertGreaterEqual(len(self.manifest), 100)
        required = {"document", "extracted_page_min", "printed_page_min", "heading", "die_expression", "expected_rows", "schema_shape", "adapter"}
        for entry in self.manifest:
            self.assertTrue(required.issubset(entry), entry)
            self.assertGreaterEqual(entry["expected_rows"], 0)

    def test_manifest_roll_expectations_match_pdf_rows(self):
        for document, source, adapters in (
            ("shadow-dark.pdf.json", "Shadowdark Core", {"roll", "backgrounds"}),
            ("Shadowdark RPG - V4-8.pdf.json", "Shadowdark RPG V4-8", {"roll", "backgrounds"}),
            ("Player_s_Guide_to_the_Western_Reaches_V1.pdf.json", "Player's Guide", {"roll", "raw", "backgrounds", "trinkets"}),
        ):
            expected = sum(row["expected_rows"] for row in self.manifest if row["document"] == document and row["adapter"] in adapters and row["adapter"] != "backgrounds" and row["adapter"] != "trinkets")
            actual = self.db.execute("SELECT count(*) FROM roll_tables WHERE source=?", (source,)).fetchone()[0]
            if document.startswith("shadow"):
                self.assertEqual(expected, actual)
            else:
                self.assertEqual(expected, actual)
        self.assertEqual(sum(row["expected_rows"] for row in self.manifest if row["adapter"] == "trinkets"), self.db.execute("SELECT count(*) FROM trinkets").fetchone()[0])
        self.assertEqual(sum(row["expected_rows"] for row in self.manifest if row["adapter"] == "backgrounds"), self.db.execute("SELECT count(*) FROM backgrounds").fetchone()[0])

    def test_project_constraints(self):
        classes = {row["name"] for row in self.db.execute("SELECT name FROM project_classes")}
        self.assertEqual(len(classes), 17)
        ancestries = {row["name"] for row in self.db.execute("SELECT name FROM project_ancestries")}
        self.assertEqual(ancestries, {"Human", "Dwarf", "Elf", "Half-Orc", "Gnome", "Tiefling/Deva"})

    def test_boundary_rolls_are_preserved(self):
        self.assertEqual(self.db.execute("SELECT count(*) FROM backgrounds WHERE roll_val=100 AND name='Lost'").fetchone()[0], 1)
        for ancestry in ("Dwarf", "Elf", "Goblin", "Half-Elf", "Half-Orc", "Halfling", "Human", "Kobold"):
            rows = self.db.execute("SELECT roll_min,roll_max,result_text FROM trinkets WHERE ancestry=? ORDER BY roll_min", (ancestry,)).fetchall()
            self.assertEqual(len(rows), 50, ancestry)
            self.assertEqual(rows[0][0], 1, ancestry)
            self.assertEqual(rows[-1][1], 100, ancestry)
            self.assertTrue(all(row[2] not in ("Details", "Details d") for row in rows), ancestry)

    def test_structured_equipment_is_complete(self):
        categories = {row[0]: row[1] for row in self.db.execute("SELECT category,count(*) FROM items GROUP BY category")}
        self.assertGreaterEqual(categories.get("Weapon", 0), 30)
        self.assertGreaterEqual(categories.get("Armor", 0), 9)
        self.assertGreaterEqual(categories.get("Mount", 0), 15)
        self.assertGreaterEqual(categories.get("Boat", 0), 8)
        self.assertGreaterEqual(categories.get("Siege Weapon", 0), 4)


if __name__ == "__main__":
    unittest.main()
