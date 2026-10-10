
import { GoogleGenAI } from "@google/genai";

export async function generateSnippetAI(
  title: string,
  language: string,
  code: string,
  notes: string
) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env.local");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are a developer documentation assistant.
Analyze the following code and generate useful documentation.

Title: ${title}
Language: ${language}
Notes: ${notes || "None"}

Code:
${code}

Return JSON with this exact structure:
{
  "tags": ["tag1", "tag2", "tag3"],
  "summary": "One sentence explaining what the code does."
}

Rules:
- Generate 3 to 5 relevant tags.
- Tags must be short, lowercase, and contain no # symbol.
- Include the programming language and relevant concepts.
- The summary must be one clear sentence.
- Describe the actual code, not a generic snippet.
- Return only JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const responseText = response.text?.trim();

  if (!responseText) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsed: { tags?: unknown; summary?: unknown };

  try {
    parsed = JSON.parse(responseText);
  } catch {
    console.error("Invalid Gemini JSON response:", responseText);
    throw new Error("Gemini returned an invalid JSON response.");
  }

  const tags = Array.isArray(parsed.tags)
    ? [
        ...new Set(
          parsed.tags
            .filter((tag): tag is string => typeof tag === "string")
            .map((tag) => tag.replace(/^#/, "").trim().toLowerCase())
            .filter(Boolean)
        ),
      ].slice(0, 5)
    : [];

  const summary =
    typeof parsed.summary === "string"
      ? parsed.summary.trim()
      : "";

  if (tags.length < 3 || !summary) {
    throw new Error("Gemini did not return enough tags or a summary.");
  }

  return { tags, summary };
}