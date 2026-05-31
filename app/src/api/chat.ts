export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ShortlistCar = {
  name: string;
  match_score: number;
  why_this_fits_you: string;
  price_range: string;
  pros: string[];
  cons: string[];
};

export type ChatResponse = {
  type: "shortlist" | "message";
  content: string | { type: string; cars: ShortlistCar[] };
  usage?: unknown;
};

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
): Promise<ChatResponse> {
  const response = await fetch("https://api-cario-app.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error || `Chat API error ${response.status}`);
  }

  return response.json();
}
