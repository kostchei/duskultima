import os

ASSETS_DIR = "public/assets/monsters"

# Exact semantically verified PNG assets
VERIFIED_ASSETS = {
    "spider.png",
    "rat.png",
    "scorpion.png",
    "giant-centipede.png",
    "stingbat.png",
    "tar-bat.png",
    "large-bat.png",
    "wolf.png",
    "timber-wolf.png",
    "winter-wolf.png",
    "snake.png",
    "cobra-snake.png",
    "giant-snake.png",
    "goblin.png",
    "skeleton.png",
    "giant-crab.png",
    "rime-crab.png",
    "giant-frog.png",
    "ghost.png",
    "slime.png",
}

removed = 0
for f in os.listdir(ASSETS_DIR):
    if f.endswith(".png") and not os.path.isdir(os.path.join(ASSETS_DIR, f)):
        if f not in VERIFIED_ASSETS and not f.startswith("50_") and not f.startswith("creatures") and not f.startswith("tiny_") and not f.startswith("title_") and not f.startswith("preview_"):
            os.remove(os.path.join(ASSETS_DIR, f))
            removed += 1

print(f"Cleaned up {removed} generic/mismatched fallback PNG assets from {ASSETS_DIR}.")
