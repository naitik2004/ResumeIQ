from ..utils.sanitise import truncate_text

def build_prompt(resume_text: str, job_description: str = '') -> str:
    """
    Builds the prompt instructing Claude to analyze the resume as an ATS system
    and return ONLY raw JSON matching AnalysisResult schema.
    """
    truncated_resume = truncate_text(resume_text, max_chars=6000)
    
    jd_section = ""
    if job_description.strip():
        jd_section = f"\n\nJOB DESCRIPTION:\n{job_description.strip()}\nUse the above job description for context and keyword matching."

    schema_instruction = """
    Return ONLY a raw JSON object. No markdown fences. No preamble. No explanation.
    The JSON must be parseable by JSON.parse() immediately.
    
    The JSON must match this structure exactly:
    {
      "ats_score": number (0-100),
      "summary": "string (2-sentence overview)",
      "strengths": ["string", "string", "string"] (exactly 3 items),
      "weaknesses": ["string", "string", "string"] (exactly 3 items),
      "missing_keywords": ["string", "string", "string", "string"] (4-6 items),
      "skill_gaps": ["string", "string", "string"] (3 items),
      "improvements": [
        { "section": "string", "suggestion": "string" },
        { "section": "string", "suggestion": "string" },
        { "section": "string", "suggestion": "string" }
      ] (exactly 3 items),
      "verdict": "STRONG HIRE" | "INTERVIEW" | "MAYBE" | "PASS",
      "verdict_reason": "string (one sentence)"
    }
    """

    prompt = f"""You are an expert ATS system and a brutally honest, extremely strict senior technical recruiter with 15 years of experience.
Your task is to analyze the provided resume. You MUST be unforgiving and rigorously critical. 
- Do NOT inflate the ATS score. Most resumes are average (40-60). Only truly exceptional resumes should score above 75.
- Point out the harsh reality of their skill gaps, weak bullet points, or lack of measurable impact.
- Do not hallucinate skills or experience. Base your analysis strictly on what is explicitly written.
{jd_section}

{schema_instruction}

RESUME:
{truncated_resume}
END RESUME
"""
    return prompt

def build_comparison_prompt(resume_a_text: str, resume_b_text: str, job_description: str = '') -> str:
    """
    Builds a prompt to compare two resumes against a job description.
    """
    truncated_a = truncate_text(resume_a_text, max_chars=4000)
    truncated_b = truncate_text(resume_b_text, max_chars=4000)
    
    jd_section = ""
    if job_description.strip():
        jd_section = f"\n\nJOB DESCRIPTION:\n{job_description.strip()}\n"

    schema_instruction = """
    Return ONLY a raw JSON object. No markdown fences.
    
    Structure:
    {
      "analysis_a": { 
        "ats_score": number, "summary": "string", "verdict": "string"
      },
      "analysis_b": { 
        "ats_score": number, "summary": "string", "verdict": "string"
      },
      "comparison": {
        "winner": "RESUME A" | "RESUME B" | "DRAW",
        "rationale": "string",
        "differences": ["string", "string", "string"]
      }
    }
    """

    prompt = f"""You are a brutally honest senior recruiter. Compare these two resumes side-by-side.
{jd_section}
You must analyze both individually AND compare them. 

{schema_instruction}

RESUME A:
{truncated_a}

RESUME B:
{truncated_b}
"""
    return prompt
