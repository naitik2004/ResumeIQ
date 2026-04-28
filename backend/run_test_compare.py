import httpx
import os
from dotenv import load_dotenv

load_dotenv()

async def test_comparison():
    url = "http://localhost:8000/api/v1/compare"
    
    # Create two dummy PDF files for testing (using real ones if available is better)
    # For now, we'll just mock the files if we were running a real test suite.
    # But this is a manual check script.
    
    files = {
        'resume_a': ('resume1.pdf', b'%PDF-1.4 content', 'application/pdf'),
        'resume_b': ('resume2.pdf', b'%PDF-1.4 content', 'application/pdf')
    }
    data = {
        'job_description': 'Looking for a Senior Software Engineer with Python experience.'
    }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream("POST", url, data=data, files=files) as response:
                if response.status_code != 200:
                    print(f"Error: {response.status_code}")
                    print(await response.aread())
                    return

                print("Streaming response:")
                async for chunk in response.aiter_text():
                    print(chunk, end="", flush=True)
                print("\n\nTest Complete.")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_comparison())
