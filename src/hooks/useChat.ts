import { useCallback, useState } from "react";
import type { Message, ChatStatus } from "../types/chat";
import { matchKnowledge, FALLBACK_RESPONSE } from "../data/knowledge";

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  text: "Hey — I'm Rishav's portfolio assistant. Ask me anything about his work, skills, projects, or how to get in touch.",
  timestamp: new Date(),
};

/** Simulated typing delay: scales with response length, feels natural. */
function typingDelay(text: string): number {
  return Math.min(400 + text.length * 1.2, 1800);
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [input, setInput] = useState("");

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status === "typing") return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStatus("typing");

    const match = matchKnowledge(trimmed);
    const responseText = match?.answer ?? FALLBACK_RESPONSE;
    const responseLinks = match?.links;

    window.setTimeout(() => {
      const assistantMsg: Message = {
        id: uid(),
        role: "assistant",
        text: responseText,
        links: responseLinks,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStatus("idle");
    }, typingDelay(responseText));
  }, [status]);

  const reset = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setStatus("idle");
    setInput("");
  }, []);

  return { messages, status, input, setInput, send, reset };
}
