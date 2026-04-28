from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .api.v1.analyse import router as v1_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup before app starts receiving requests
    yield
    # Teardown after app stops receiving requests

app = FastAPI(
    title="ResumeIQ API",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(v1_router, prefix="/api/v1")
