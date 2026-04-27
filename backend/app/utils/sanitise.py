import re

def truncate_text(text: str, max_chars: int = 6000) -> str:
    """
    Truncates text to a maximum number of characters.
    Appends a truncation note if text was shortened.
    """
    if len(text) > max_chars:
        return text[:max_chars] + "\n...[TRUNCATED FOR LENGTH]"
    return text

def clean_whitespace(text: str) -> str:
    """
    Strips excessive blank lines (max 2 consecutive).
    """
    return re.sub(r'\n{3,}', '\n\n', text).strip()
