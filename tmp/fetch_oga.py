import os
import re
import urllib.request

ASSETS_DIR = "public/assets/monsters"
os.makedirs(ASSETS_DIR, exist_ok=True)

OGA_PAGES = [
    ("50-monsters-pack-2d", "https://opengameart.org/content/50-monsters-pack-2d"),
    ("32x32-pixel-art-creatures-volume-3", "https://opengameart.org/content/32x32-pixel-art-creatures-volume-3"),
    ("assorted-32x32-creatures", "https://opengameart.org/content/assorted-32x32-creatures"),
    ("tiny-creatures", "https://opengameart.org/content/tiny-creatures"),
    ("16x16-animated-slimes", "https://opengameart.org/content/16x16-animated-slimes"),
]

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

for name, url in OGA_PAGES:
    print(f"Fetching page {name}: {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
        
        # Find file links
        files = re.findall(r'href="([^"]+\.(?:png|zip))"', html)
        for furl in set(files):
            if not furl.startswith('http'):
                furl = 'https://opengameart.org' + furl
            filename = os.path.basename(furl)
            dest = os.path.join(ASSETS_DIR, filename)
            print(f"  Downloading {filename} from {furl}...")
            try:
                r_file = urllib.request.Request(furl, headers=headers)
                with urllib.request.urlopen(r_file) as r_resp, open(dest, "wb") as out:
                    out.write(r_resp.read())
                print(f"    Saved {dest}")
            except Exception as e:
                print(f"    Failed download {filename}: {e}")
    except Exception as e:
        print(f"Failed page {url}: {e}")
