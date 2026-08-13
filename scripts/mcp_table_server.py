#!/usr/bin/env python3
"""
Model Context Protocol (MCP) Server for DuskUltima / Shadowdark Master Tables.
Provides JSON-RPC stdio tool interface for AI agents to query and roll on Shadowdark & Western Reaches tables.
"""

import sys
import json
import sqlite3
import os
import random

DB_PATH = r"d:\Code\DuskUltima\shadowdork.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

TOOLS = [
    {
        "name": "list_tables",
        "description": "List all roll tables available in the Shadowdark & Western Reaches database.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "category": {"type": "string", "description": "Optional category filter (e.g. Generator, Shops, Misc, Class Talents, Treasure)"},
                "source": {"type": "string", "description": "Optional source filter (e.g. SDtools, Player's Guide, Shadowdark Core)"}
            }
        }
    },
    {
        "name": "roll_table",
        "description": "Roll on a specified table by name or lookup a specific roll value.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "table_name": {"type": "string", "description": "Exact or partial name of the table"},
                "roll_val": {"type": "integer", "description": "Optional specific roll number (e.g. 15 for d20 roll)"}
            },
            "required": ["table_name"]
        }
    },
    {
        "name": "generate_name",
        "description": "Generate a lore-accurate character name for an ancestry (Dwarf, Elf, Goblin, Half-Elf, Half-Orc, Halfling, Human, Kobold).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "ancestry": {"type": "string", "description": "Target ancestry"}
            },
            "required": ["ancestry"]
        }
    },
    {
        "name": "get_background",
        "description": "Roll or fetch a character background.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "roll_val": {"type": "integer", "description": "Optional background roll value (1 to 100)"}
            }
        }
    },
    {
        "name": "get_trinket",
        "description": "Roll an ancestry trinket.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "ancestry": {"type": "string", "description": "Target ancestry (e.g. Dwarf, Elf, Goblin)"},
                "roll_val": {"type": "integer", "description": "Optional trinket roll value (1 to 100)"}
            },
            "required": ["ancestry"]
        }
    },
    {
        "name": "get_item",
        "description": "Query weapons, armor, gear, poisons, and mounts from the equipment database.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Item name keyword (e.g. Dagger, Chainmail, Backpack)"},
                "category": {"type": "string", "description": "Category filter (e.g. Weapon, Armor, Gear, Mount)"}
            }
        }
    },
    {
        "name": "get_talent",
        "description": "Roll or lookup a class talent.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "class_name": {"type": "string", "description": "Target class (e.g. Fighter, Thief, Priest, Wizard, Bard, Ranger)"},
                "roll_val": {"type": "integer", "description": "Optional 2d6 roll value (2 to 12)"}
            },
            "required": ["class_name"]
        }
    },
    {
        "name": "get_treasure",
        "description": "Roll on level treasure tables.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "tier": {"type": "integer", "description": "Level tier (0 to 10)"},
                "roll_val": {"type": "integer", "description": "Optional d100 roll value (1 to 100)"}
            }
        }
    },
    {
        "name": "search_database",
        "description": "Universal keyword search across tables, monsters, spells, trinkets, backgrounds, and items.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query keyword"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "query_sql",
        "description": "Execute a read-only SELECT SQL query directly on the shadowdork.db SQLite database.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "sql": {"type": "string", "description": "SELECT SQL query"}
            },
            "required": ["sql"]
        }
    }
]

def handle_call_tool(name, args):
    conn = get_db()
    cursor = conn.cursor()

    if name == "list_tables":
        category = args.get("category")
        source = args.get("source")
        query = "SELECT name, die_type, category, description, source FROM tables_meta WHERE 1=1"
        params = []
        if category:
            query += " AND LOWER(category) = LOWER(?)"
            params.append(category)
        if source:
            query += " AND LOWER(source) LIKE LOWER(?)"
            params.append(f"%{source}%")
        cursor.execute(query, params)
        rows = [dict(r) for r in cursor.fetchall()]
        return {"tables": rows, "count": len(rows)}

    elif name == "roll_table":
        table_name = args.get("table_name", "")
        roll_val = args.get("roll_val")
        cursor.execute(
            "SELECT * FROM roll_tables WHERE LOWER(table_name) LIKE LOWER(?) ORDER BY roll_min ASC",
            (f"%{table_name}%",)
        )
        rows = [dict(r) for r in cursor.fetchall()]
        if not rows:
            return {"error": f"No entries found for table '{table_name}'"}
        
        max_r = max(r["roll_max"] for r in rows)
        rolled = roll_val if roll_val is not None else random.randint(1, max_r)
        matched = next((r for r in rows if r["roll_min"] <= rolled <= r["roll_max"]), rows[0])
        return {
            "table_name": matched["table_name"],
            "die_type": matched["die_type"],
            "roll": rolled,
            "result": matched["result_text"],
            "source": matched["source"]
        }

    elif name == "generate_name":
        ancestry = args.get("ancestry", "Human")
        cursor.execute("SELECT type, name_part FROM ancestry_names WHERE LOWER(ancestry) = LOWER(?)", (ancestry,))
        parts = [dict(r) for r in cursor.fetchall()]
        
        p1s = [p["name_part"] for p in parts if p["type"] == "part1"]
        p2s = [p["name_part"] for p in parts if p["type"] == "part2"]

        if p1s and p2s:
            p1 = random.choice(p1s).rstrip("-")
            p2 = random.choice(p2s).lstrip("-")
            gen_name = (p1 + p2).capitalize()
            return {"name": gen_name, "ancestry": ancestry, "method": "2-part compound generator"}
        
        standalones = [p["name_part"] for p in parts if p["type"] == "standalone"]
        if standalones:
            return {"name": random.choice(standalones), "ancestry": ancestry, "method": "standalone list"}
        
        return {"name": "Thorin", "ancestry": ancestry, "method": "fallback"}

    elif name == "get_background":
        roll_val = args.get("roll_val")
        cursor.execute("SELECT * FROM backgrounds")
        bgs = [dict(r) for r in cursor.fetchall()]
        if not bgs:
            return {"name": "Adventurer", "description": "Seeking fortune and glory.", "source": "Fallback"}
        rolled = roll_val if roll_val is not None else random.randint(1, len(bgs))
        match = next((b for b in bgs if b["roll_val"] == rolled), random.choice(bgs))
        return dict(match)

    elif name == "get_trinket":
        ancestry = args.get("ancestry", "Generic")
        roll_val = args.get("roll_val")
        cursor.execute("SELECT * FROM trinkets WHERE LOWER(ancestry) = LOWER(?)", (ancestry,))
        trinkets = [dict(r) for r in cursor.fetchall()]
        if not trinkets:
            cursor.execute("SELECT * FROM trinkets")
            trinkets = [dict(r) for r in cursor.fetchall()]
        rolled = roll_val if roll_val is not None else random.randint(1, 100)
        match = next((t for t in trinkets if t["roll_min"] <= rolled <= t["roll_max"]), trinkets[0])
        return {"ancestry": ancestry, "roll": rolled, "result": match["result_text"], "source": match["source"]}

    elif name == "get_item":
        item_name = args.get("name")
        category = args.get("category")
        query = "SELECT * FROM items WHERE 1=1"
        params = []
        if item_name:
            query += " AND LOWER(name) LIKE LOWER(?)"
            params.append(f"%{item_name}%")
        if category:
            query += " AND LOWER(category) LIKE LOWER(?)"
            params.append(f"%{category}%")
        cursor.execute(query, params)
        rows = [dict(r) for r in cursor.fetchall()]
        return {"items": rows, "count": len(rows)}

    elif name == "get_talent":
        cname = args.get("class_name", "Fighter")
        roll_val = args.get("roll_val")
        cursor.execute(
            "SELECT * FROM roll_tables WHERE category = 'Class Talents' AND LOWER(table_name) LIKE LOWER(?)",
            (f"%{cname}%",)
        )
        rows = [dict(r) for r in cursor.fetchall()]
        if not rows:
            return {"class": cname, "roll": 7, "talent": "+1 to melee or ranged attack rolls"}
        rolled = roll_val if roll_val is not None else random.randint(2, 12)
        match = next((r for r in rows if r["roll_min"] <= rolled <= r["roll_max"]), rows[0])
        return {"class": cname, "roll": rolled, "talent": match["result_text"]}

    elif name == "get_treasure":
        roll_val = args.get("roll_val")
        cursor.execute("SELECT * FROM roll_tables WHERE category = 'Treasure'")
        rows = [dict(r) for r in cursor.fetchall()]
        if not rows:
            return {"roll": 50, "result": "10 gp and a polished silver ring (25 gp)"}
        rolled = roll_val if roll_val is not None else random.randint(1, 100)
        match = next((r for r in rows if r["roll_min"] <= rolled <= r["roll_max"]), rows[0])
        return {"roll": rolled, "result": match["result_text"]}

    elif name == "search_database":
        q = f"%{args.get('query', '')}%"
        cursor.execute("SELECT name, cost, slot_cost, category, properties FROM items WHERE LOWER(name) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?) LIMIT 10", (q, q))
        items = [dict(r) for r in cursor.fetchall()]
        cursor.execute("SELECT name, ac, hp, attack, mv, tier, description FROM monsters WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?) LIMIT 10", (q, q))
        monsters = [dict(r) for r in cursor.fetchall()]
        cursor.execute("SELECT name, class_name, tier, range, duration, description FROM spells WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?) LIMIT 10", (q, q))
        spells = [dict(r) for r in cursor.fetchall()]
        cursor.execute("SELECT table_name, roll_min, roll_max, result_text FROM roll_tables WHERE LOWER(result_text) LIKE LOWER(?) LIMIT 10", (q,))
        roll_entries = [dict(r) for r in cursor.fetchall()]
        return {"items": items, "monsters": monsters, "spells": spells, "roll_entries": roll_entries}

    elif name == "query_sql":
        sql = args.get("sql", "").strip()
        if not sql.lower().startswith("select"):
            return {"error": "Only SELECT queries are allowed."}
        cursor.execute(sql)
        rows = [dict(r) for r in cursor.fetchall()]
        return {"rows": rows, "count": len(rows)}

    conn.close()
    return {"error": f"Unknown tool: {name}"}

def process_request(request):
    method = request.get("method")
    req_id = request.get("id")

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "shadowdork-tables-mcp", "version": "1.0.0"}
            }
        }
    elif method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {"tools": TOOLS}
        }
    elif method == "tools/call":
        params = request.get("params", {})
        tool_name = params.get("name")
        args = params.get("arguments", {})
        try:
            tool_res = handle_call_tool(tool_name, args)
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": json.dumps(tool_res, indent=2)}]
                }
            }
        except Exception as e:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32603, "message": str(e)}
            }
    else:
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32601, "message": f"Method {method} not found"}
        }

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
            res = process_request(req)
            sys.stdout.write(json.dumps(res) + "\n")
            sys.stdout.flush()
        except Exception as e:
            err_res = {"jsonrpc": "2.0", "error": {"code": -32700, "message": f"Parse error: {str(e)}"}}
            sys.stdout.write(json.dumps(err_res) + "\n")
            sys.stdout.flush()

if __name__ == "__main__":
    main()
