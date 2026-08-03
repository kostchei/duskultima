import urllib.request
import re

url = "https://www.wowhead.com/classic/sound=3341"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')

# Search for WH.Gatherer.addData in sound=3341
matches = re.findall(r'WH\.Gatherer\.addData\(19,\s*\d+,\s*({.*?})\);', html)
print("Sound 3341 gatherer matches:", len(matches))
if matches:
    print(matches[0])
