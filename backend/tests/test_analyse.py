import pytest
from unittest.mock import patch
from app.api.v1.analyse import router

@pytest.mark.asyncio
async def test_health_check(async_client):
    response = await async_client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

@pytest.mark.asyncio
@patch("app.api.v1.analyse.stream_analysis")
@patch("app.api.v1.analyse.extract_text")
async def test_analyse_valid_pdf(mock_extract, mock_stream, async_client, valid_pdf_bytes):
    mock_extract.return_value = "This is a valid resume text with lots of skills and experience."
    # Mock the streaming response generator
    async def mock_generator():
        yield '{"ats_score": 85}'
    
    mock_stream.return_value = mock_generator()
    
    files = {"resume": ("resume.pdf", valid_pdf_bytes, "application/pdf")}
    data = {"job_description": "Looking for a software engineer."}
    
    response = await async_client.post("/api/v1/analyse", data=data, files=files)
    assert response.status_code == 200
    assert '{"ats_score": 85}' in response.text

@pytest.mark.asyncio
async def test_analyse_invalid_file_type(async_client):
    files = {"resume": ("resume.txt", b"this is text", "text/plain")}
    response = await async_client.post("/api/v1/analyse", files=files)
    assert response.status_code == 400
    assert "Only PDF files are supported" in response.text

@pytest.mark.asyncio
async def test_analyse_large_file(async_client):
    # Mocking a large file by sending more than 5MB of random bytes
    large_file = b"0" * (6 * 1024 * 1024)
    files = {"resume": ("resume.pdf", large_file, "application/pdf")}
    response = await async_client.post("/api/v1/analyse", files=files)
    assert response.status_code == 400
    assert "File too large" in response.text
