import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safe file read
let data;
try {
  const filePath = path.join(__dirname, "../data/cars.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  data = JSON.parse(raw);
} catch (err) {
  throw new Error(`Failed to load cars.json: ${err.message}`);
}

//* System Prompt : JSON format
const systemPrompt = `You are a car buying assistant for the Indian market. Your job is to help a confused buyer arrive at a confident shortlist of 3 cars.

Dataset: ${JSON.stringify(data, null, 2)}

Conversation flow:
1. When the user describes their needs, identify what's missing: budget, use case, fuel preference, seating needs.
2. Ask one clarifying question at a time. Max 3 follow-ups.
3. Once you have enough context, respond with SHORTLIST_READY and return exactly 3 cars.

SHORTLIST FORMAT - Return response as JSON only, no extra text:
{
  "type": "shortlist",
  "cars": [
    {
      "name": "...",
      "match_score": 92,
      "why_this_fits_you": "...",
      "price_range": "...",
      "pros": ["...", "..."],
      "cons": ["...", "..."]
    }
  ]
}

Be conversational, not salesy. Be specific about WHY each car fits this person's stated needs.`;

// Message builder
function buildMessages(userMessage, history = []) {
  if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
    throw new Error("User Message is required and must be a non-empty string.");
  }

  return [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage.trim() },
  ];
}

export default buildMessages;
