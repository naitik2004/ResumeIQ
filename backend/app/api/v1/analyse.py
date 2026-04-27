from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from ...config import settings
from ...core.pdf_extractor import extract_text
from ...core.prompt_builder import build_prompt
from ...core.llm_client import stream_analysis

router = APIRouter()

@router.post("/analyse")
async def analyse_resume(
    resume: UploadFile = File(...),
    job_description: str = Form("")
):
    """
    Receives a PDF resume and optional job description.
    Streams an ATS analysis response in JSON format.
    """
    # Validate MIME type
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    file_bytes = await resume.read()
    
    # Validate file size
    size_mb = len(file_bytes) / (1024 * 1024)
    if size_mb > settings.MAX_PDF_SIZE_MB:
        raise HTTPException(status_code=400, detail=f"File too large. Max {settings.MAX_PDF_SIZE_MB}MB.")
        
    # Extract text and build prompt
    extracted_text = extract_text(file_bytes)
    prompt = build_prompt(extracted_text, job_description)
    
    # Return streaming response
    return StreamingResponse(
        stream_analysis(prompt),
        media_type='text/plain'
    )

@router.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok", "model": settings.GROQ_MODEL}
