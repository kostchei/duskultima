import os
import json
import pypdf

RAW_SOURCE_DIR = r"d:\Code\DuskUltima\docs\raw_source"
OUTPUT_DIR = r"d:\Code\DuskUltima\docs\extracted\raw"

def extract_all_pdfs():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    pdf_files = [f for f in os.listdir(RAW_SOURCE_DIR) if f.endswith(".pdf")]
    
    extracted_summary = []
    
    for filename in sorted(pdf_files):
        pdf_path = os.path.join(RAW_SOURCE_DIR, filename)
        print(f"Extracting: {filename}...")
        try:
            reader = pypdf.PdfReader(pdf_path)
            pages_data = []
            for idx, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                pages_data.append({
                    "page_number": idx + 1,
                    "text": text.strip()
                })
            
            output_file = os.path.join(OUTPUT_DIR, f"{filename}.json")
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump({
                    "filename": filename,
                    "total_pages": len(reader.pages),
                    "pages": pages_data
                }, f, indent=2, ensure_ascii=False)
                
            extracted_summary.append({
                "filename": filename,
                "pages": len(reader.pages),
                "output": output_file
            })
            print(f"  Done ({len(reader.pages)} pages)")
        except Exception as e:
            print(f"  Error extracting {filename}: {e}")
            
    return extracted_summary

if __name__ == "__main__":
    extract_all_pdfs()
