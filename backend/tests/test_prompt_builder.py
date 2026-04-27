from app.core.prompt_builder import build_prompt

def test_build_prompt_with_jd():
    resume = "My name is John. I know Python."
    jd = "Need someone who knows Python and React."
    
    prompt = build_prompt(resume, jd)
    
    assert "My name is John. I know Python." in prompt
    assert "Need someone who knows Python and React." in prompt
    assert "JOB DESCRIPTION" in prompt

def test_build_prompt_without_jd():
    resume = "My name is John. I know Python."
    
    prompt = build_prompt(resume)
    
    assert "My name is John. I know Python." in prompt
    assert "JOB DESCRIPTION" not in prompt

def test_build_prompt_truncation():
    # Create a resume longer than 6000 characters
    long_resume = "A" * 6500
    
    prompt = build_prompt(long_resume)
    
    # 6000 A's should be in the prompt, plus the truncation message
    assert "A" * 6000 in prompt
    assert "A" * 6001 not in prompt
    assert "[TRUNCATED FOR LENGTH]" in prompt
