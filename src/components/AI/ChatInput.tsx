import React, { useRef, type KeyboardEvent, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import type { ChatStatus } from "../../types/chat";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  status: ChatStatus;
}

export function ChatInput({ value, onChange, onSend, status }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && status !== "typing";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend(value);
    }
  };

  // Auto-resize textarea up to 3 lines.
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-white/[0.06] px-4 py-3"
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Rishav's work..."
        rows={1}
        aria-label="Chat input"
        className="flex-1 resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[13.5px] text-eclipse-white placeholder-eclipse-faint outline-none transition-colors duration-fast focus:border-accent-gold/40 focus:bg-white/[0.06] leading-relaxed"
        style={{ minHeight: "40px", maxHeight: "80px" }}
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all duration-fast hover:bg-accent-gold/20 disabled:cursor-not-allowed disabled:opacity-30 focus-ring"
      >
        <ArrowUp size={16} aria-hidden />
      </button>
    </form>
  );
}
