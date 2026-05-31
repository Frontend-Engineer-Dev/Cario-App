import OpenAI from "openai";

//*  API KEY
const API_KEY = process.env.KIMI_API_KEY || "";
const BASE_URL = process.env.KIMI_BASE_URL || "";

export const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL,
});

export async function kimiChat(messages) {
  const response = await client.chat.completions.create({
    model: "kimi-k2.6",
    max_completion_tokens: 1024,
    messages,
  });

  return {
    reply: response.choices[0].message.content,
    usage: response.usage,
  };
}
