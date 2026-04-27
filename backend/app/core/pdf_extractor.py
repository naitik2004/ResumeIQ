import fitz  # PyMuPDF
from fastapi import HTTPException
from ..utils.sanitise import clean_whitespace

def extract_text(file_bytes: bytes) -> str:
    """
    Extracts raw text from a PDF file using PyMuPDF.
    Raises HTTPException(400) if the text is empty or < 50 characters.
    """
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Could not open PDF file. It may be corrupt or invalid.")
    
    pages_text = []
    for page in doc:
        pages_text.append(page.get_text("text"))
        
    raw_text = "\n".join(pages_text)
    cleaned_text = clean_whitespace(raw_text)
    
    if not cleaned_text or len(cleaned_text) < 50:
        raise HTTPException(status_code=400, detail="Could not extract enough text from PDF. Ensure it is a text-based PDF.")
        
    return cleaned_text
