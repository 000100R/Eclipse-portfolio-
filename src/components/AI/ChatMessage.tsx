import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Message } from "../../types/chat";
import { easing, duration } from "../../lib/tokens";

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
  key?: React.Key;
}

/** Converts **bold** markers to <strong> and \n to <br>. */
function renderText(text: string): React.ReactNode[] {
  return text.split("\n").flatMap((line, lineIdx, arr) => {
    const parts: React.ReactNode[] = [];
    const segments = line.split(/(\*\*[^*]+\*\*)/g);
    segments.forEach((seg, i) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        parts.push(
          <strong key={`${lineIdx}-b-${i}`} className="font-semibold text-eclipse-white">
            {seg.slice(2, -2)}
          </strong>
        );
      } else if (seg.startsWith("•")) {
        parts.push(
          <span key={`${lineIdx}-bullet-${i}`} className="block pl-0">
            <span className="text-accent-gold mr-1.5">·</span>
            {seg.slice(1).trim()}
          </span>
        );
      } else {
        parts.push(<span key={`${lineIdx}-t-${i}`}>{seg}</span>);
      }
    });
    if (lineIdx < arr.length - 1) parts.push(<br key={`${lineIdx}-br`} />);
    return parts;
  });
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      initial={isLatest ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: easing.eclipse }}
    >
      {!isUser && (
        <div className="mr-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/20 border border-accent-gold/30">
          <span className="font-display text-[10px] font-semibold text-accent-gold">R</span>
        </div>
      )}

      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-accent-gold/15 border border-accent-gold/25 text-eclipse-white"
            : "rounded-tl-sm bg-white/[0.04] border border-white/[0.07] text-eclipse-muted"
        }`}
      >
        <p className="m-0">{renderText(message.text)}</p>

        {message.links && message.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-pill border border-accent-blue/30 bg-accent-blue/10 px-3 py-1.5 text-[12px] font-medium text-accent-blue transition-colors duration-fast hover:bg-accent-blue/20 focus-ring"
              >
                {link.label}
                <ExternalLink size={11} aria-hidden />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
