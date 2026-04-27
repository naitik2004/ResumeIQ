import asyncio
import httpx
from app.config import settings
from app.core.llm_client import stream_analysis

async def main():
    print(f"Key: {settings.GROQ_API_KEY}")
    prompt = "Test prompt"
    try:
        async for chunk in stream_analysis(prompt):
            print(chunk, end="", flush=True)
    except Exception as e:
        print(f"Exception: {repr(e)}")

if __name__ == "__main__":
    asyncio.run(main())
