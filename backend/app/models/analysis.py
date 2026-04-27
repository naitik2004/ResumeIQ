from typing import Literal, List
from pydantic import BaseModel

class Improvement(BaseModel):
    section: str
    suggestion: str

class AnalysisResult(BaseModel):
    ats_score: int  # 0-100
    summary: str  # 2-sentence overview
    strengths: List[str]  # exactly 3 items
    weaknesses: List[str]  # exactly 3 items
    missing_keywords: List[str]  # 4-6 items
    skill_gaps: List[str]  # 3 items
    improvements: List[Improvement]  # exactly 3 items
    verdict: Literal['STRONG HIRE', 'INTERVIEW', 'MAYBE', 'PASS']
    verdict_reason: str  # one sentence
