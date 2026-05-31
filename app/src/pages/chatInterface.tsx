import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Message from "../components/message";
import Recommendation from "../components/recommendation";
import {
  sendChatMessage,
  type ChatMessage,
  type ShortlistCar,
} from "../api/chat";

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi, welcome to the interface! How can I help you?",
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [recommendations, setRecommendations] = useState<ShortlistCar[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmedInput },
    ];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await sendChatMessage(trimmedInput, nextMessages);
      const assistantContent =
        response.type === "shortlist" && typeof response.content !== "string"
          ? "I found a shortlist of cars for you. Check the recommendations panel for details."
          : typeof response.content === "string"
            ? response.content
            : JSON.stringify(response.content, null, 2);

      setMessages((current) => [
        ...current,
        { role: "assistant", content: assistantContent },
      ]);

      if (
        response.type === "shortlist" &&
        typeof response.content !== "string"
      ) {
        setRecommendations(response.content.cars);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to send chat request.";
      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Sorry, I couldn't process that request. Please try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="flex h-screen overflow-hidden bg-white">
      <section className="flex flex-col flex-1 border-r border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h1 className="text-sm font-medium text-gray-800">Chat</h1>
          <p className="text-xs text-gray-400">Ask about cars related</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((message, index) => (
            <Message
              key={`${message.role}-${index}`}
              role={message.role}
              content={message.content}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="px-4 py-3 border-t border-gray-200"
          onSubmit={handleSend}
        >
          <div className="flex gap-2 items-center border border-gray-200 rounded-lg px-3 py-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending}
              className="text-xs text-white bg-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </form>
      </section>

      <aside className="w-96 shrink-0 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-800">Recommendations</h2>
          <p className="text-xs text-gray-400">Based on your conversation</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Recommendation cars={recommendations} />
        </div>
      </aside>
    </main>
  );
}
