import os
import zipfile

ASSETS_DIR = "public/assets/monsters"

for item in os.listdir(ASSETS_DIR):
    if item.endswith(".zip"):
        zip_path = os.path.join(ASSETS_DIR, item)
        extract_folder = os.path.join(ASSETS_DIR, item[:-4])
        print(f"Unzipping {item} -> {extract_folder}")
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_folder)
            print(f"  Extracted successfully.")
        except Exception as e:
            print(f"  Error extracting {item}: {e}")
