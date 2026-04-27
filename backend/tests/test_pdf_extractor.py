import pytest
from unittest.mock import patch, MagicMock
from fastapi import HTTPException
from app.core.pdf_extractor import extract_text

@patch("app.core.pdf_extractor.fitz.open")
def test_extract_text_valid(mock_fitz_open):
    mock_doc = MagicMock()
    mock_page = MagicMock()
    mock_page.get_text.return_value = "This is a test resume with more than 50 characters to pass validation test."
    mock_doc.__iter__.return_value = [mock_page]
    mock_fitz_open.return_value = mock_doc
    
    text = extract_text(b"fakebytes")
    assert "This is a test resume with more than 50 characters to pass validation test." in text

def test_extract_text_empty(empty_pdf_bytes):
    with pytest.raises(HTTPException) as excinfo:
        extract_text(empty_pdf_bytes)
    assert excinfo.value.status_code == 400
    assert "Could not extract enough text" in excinfo.value.detail

def test_extract_text_corrupt():
    corrupt_bytes = b"This is not a pdf file"
    with pytest.raises(HTTPException) as excinfo:
        extract_text(corrupt_bytes)
    assert excinfo.value.status_code == 400
    assert "Could not open PDF file" in excinfo.value.detail
