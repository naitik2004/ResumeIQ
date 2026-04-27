export const parseStreamResult = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    // If it fails, try to strip markdown fences if Claude ignored instructions
    try {
      let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err2) {
      console.error("Failed to parse JSON from stream:", text);
      throw new Error("Could not parse the AI response. See console for details.");
    }
  }
};
