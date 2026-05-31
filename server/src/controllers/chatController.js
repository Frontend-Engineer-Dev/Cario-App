import { kimiChat } from "../lib/kimi.config.js";
import buildMessages from "../utils/messages.js";

export async function chatController(req, res) {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required." });
  }

  try {
    const messages = buildMessages(message, history);
    const { reply, usage } = await kimiChat(messages);

    let parsed = null;
    try {
      parsed = JSON.parse(reply);
    } catch {
      /* not JSON */
    }

    return res.status(200).json({
      type: parsed?.type === "shortlist" ? "shortlist" : "message",
      content: parsed ?? reply,
      usage,
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}
