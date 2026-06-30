import { QUICK_SUGGESTIONS } from "../../data/knowledge";

interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled: boolean;
}

export function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-2.5 border-t border-white/[0.06]"
      style={{ scrollbarWidth: "none" }}
      aria-label="Suggested questions"
    >
      {QUICK_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="whitespace-nowrap shrink-0 rounded-pill border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] text-eclipse-muted transition-all duration-fast hover:border-accent-gold/40 hover:text-accent-gold disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
