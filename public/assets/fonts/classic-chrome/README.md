# Classic Chrome Display

Classic Chrome is an original, ultra-bold geometric display face inspired by
1970s–80s airbrush lettering. It includes A–Z, unicase a–z, numerals, and common
display punctuation.

Files:

- `ClassicChrome-Display.ttf` — desktop and design-app font
- `ClassicChrome-Display.woff2` — compressed web font
- Source generator: `tools/classic_chrome/generate_font.py`
- Interactive chrome treatment: `public/classic-chrome.html`

The font contains monochrome outlines. The cyan/copper chrome, gold keyline,
blue extrusion, and glints are layered in CSS in the specimen page.

Regenerate from the project root with:

```powershell
python tools/classic_chrome/generate_font.py
```
