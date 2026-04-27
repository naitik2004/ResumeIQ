from typing import Literal, List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    MAX_PDF_SIZE_MB: int = 5
    MAX_TOKENS: int = 1000
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    ENV: Literal["development", "production"] = "development"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
