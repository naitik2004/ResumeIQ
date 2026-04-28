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
      "candidate_name": "string",
      "ats_score": integer (0-100) (e.g. 85, NOT 8.5),
      "summary": "string (4-5 sentences of high-density technical analysis)",
      "strengths": ["string", "string", "string"] (detailed points with specific examples from text),
      "weaknesses": ["string", "string", "string"] (blunt, specific critiques),
      "missing_keywords": ["string", "string", "string", "string"],
      "skill_gaps": ["string", "string", "string"] (specific missing technologies or concepts),
      "improvements": [
        { "section": "string", "suggestion": "string (step-by-step actionable advice)" },
        { "section": "string", "suggestion": "string" },
        { "section": "string", "suggestion": "string" }
      ],
      "verdict": "STRONG HIRE" | "INTERVIEW" | "MAYBE" | "REJECT",
      "verdict_reason": "string (detailed rationale)"
    }
    """

    prompt = f"""You are an expert ATS system and a brutally honest, extremely strict senior technical recruiter.
Your task is to provide a high-density, rigorous technical audit of this resume.

CRITICAL REQUIREMENTS:
- BE SPECIFIC: Do not use generic phrases. Reference specific projects, technologies, and metrics from the resume.
- BE DEPTH-ORIENTED: Explain WHY a skill is considered strong or why a section is weak.
- BRUTAL HONESTY: If the projects are "tutorial-level", say so. If metrics are missing, call it out as a major red flag.
- SCORING: Use a 0-100 integer scale. 
    * 0-40: Poor / Missing core requirements.
    * 41-60: Average / Needs improvement.
    * 61-75: Strong candidate.
    * 76-90: Exceptional / Elite.
    * 91-100: Top 0.1% globally.
- NO INFLATION: Most resumes should score between 40-70.

{jd_section}

{schema_instruction}

RESUME:
{truncated_resume}
END RESUME
"""
    return prompt

def build_comparison_prompt(resume_a_text: str, resume_b_text: str, job_description: str = '') -> str:
    """
    Builds a prompt to compare two resumes with deep technical nuance.
    """
    truncated_a = truncate_text(resume_a_text, max_chars=4000)
    truncated_b = truncate_text(resume_b_text, max_chars=4000)
    
    jd_section = ""
    if job_description.strip():
        jd_section = f"\n\nJOB DESCRIPTION:\n{job_description.strip()}\nUse this for exact keyword and requirement matching."

    schema_instruction = """
    Return ONLY a raw JSON object. No markdown.
    
    Structure:
    {
      "analysis_a": { 
        "candidate_name": "string",
        "ats_score": integer (0-100), 
        "summary": "string (detailed 3-sentence technical profile)", 
        "verdict": "STRONG HIRE" | "INTERVIEW" | "MAYBE" | "REJECT",
        "top_skills": ["string", "string"],
        "critical_gap": "string (specific and blunt)"
      },
      "analysis_b": { 
        "candidate_name": "string",
        "ats_score": integer (0-100), 
        "summary": "string (detailed 3-sentence technical profile)", 
        "verdict": "STRONG HIRE" | "INTERVIEW" | "MAYBE" | "REJECT",
        "top_skills": ["string", "string"],
        "critical_gap": "string (specific and blunt)"
      },
      "comparison": {
        "winner": "string (candidate name)",
        "rationale": "string (long, detailed paragraph comparing specific achievements)",
        "technical_comparison": "string (detailed analysis of tech stack depth)",
        "project_comparison": "string (detailed comparison of project complexity and scale)",
        "differences": ["string", "string", "string"] (specific, high-value differentiators)
      }
    }
    """

    prompt = f"""You are a senior headhunter comparing two elite technical profiles.
Your analysis must be high-density, specific, and technically grounded.

SCORING RULES:
- Use a 0-100 integer scale. 
- A score above 80 requires exceptional, specialized expertise and massive impact.
- Do NOT use a 0-10 scale.

AUDIT CRITERIA:
1. Technical Nuance: Distinguish between "using a library" and "understanding the architecture."
2. Scale & Complexity: Compare the actual business or technical impact of their projects.
3. JD Alignment: Be ruthless about how well they actually fit the requirements.

{jd_section}

{schema_instruction}

RESUME A:
{truncated_a}

RESUME B:
{truncated_b}
"""
    return prompt
