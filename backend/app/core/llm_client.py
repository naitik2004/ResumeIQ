import json
import httpx
from typing import AsyncGenerator
from fastapi import HTTPException
from ..config import settings

async def stream_analysis(prompt: str) -> AsyncGenerator[str, None]:
    """
    Calls Groq API with streaming and yields raw JSON tokens.
    """
    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": settings.GROQ_MODEL,
        "max_tokens": settings.MAX_TOKENS,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "stream": True
    }
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream("POST", "https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload) as response:
                if response.status_code != 200:
                    error_text = await response.aread()
                    raise HTTPException(status_code=502, detail=f"LLM API returned error: {error_text.decode('utf-8', errors='ignore')}")
                
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data_str = line[6:].strip()
                        if data_str == "[DONE]":
                            break
                        try:
                            event = json.loads(data_str)
                            choices = event.get("choices", [])
                            if choices:
                                delta = choices[0].get("delta", {})
                                if "content" in delta and delta["content"]:
                                    yield delta["content"]
                        except json.JSONDecodeError:
                            continue
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail="LLM API unreachable.")
