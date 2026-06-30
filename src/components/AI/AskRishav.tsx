import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { MessageCircle, X, RotateCcw, Sparkles } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./ChatInput";
import { easing, duration, zIndex } from "../../lib/tokens";

/** Framer Motion variants for the chat panel */
const PANEL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 16,
    transformOrigin: "bottom right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: duration.base,
      ease: easing.eclipse,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 10,
    transition: {
      duration: duration.fast,
      ease: easing.eclipseIn,
    },
  },
};

/** FAB pulse ring variants */
const RING_VARIANTS: Variants = {
  pulse: {
    scale: [1, 1.6, 1],
    opacity: [0.35, 0, 0.35],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

interface AskRishavProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export function AskRishav({ isOpen: controlledIsOpen, onClose, onOpen }: AskRishavProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (value: boolean) => {
    if (isControlled) {
      if (value) {
        onOpen?.();
      } else {
        onClose?.();
      }
    } else {
      setInternalIsOpen(value);
    }
  };

  const { messages, status, input, setInput, send, reset } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll on mobile when panel is open.
  const isMobileOpen = isOpen && typeof window !== "undefined" && window.innerWidth < 640;
  useLockBodyScroll(isMobileOpen);

  // Auto-scroll to bottom whenever messages/typing state changes.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status, isOpen]);

  // Return focus to FAB when panel closes.
  useEffect(() => {
    if (!isOpen) fabRef.current?.focus();
  }, [isOpen]);

  // Trap focus inside panel when open.
  const handlePanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className="fixed bottom-6 right-5 z-overlay flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
      style={{ zIndex: zIndex.overlay }}
    >
      {/* ── Chat Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Ask Rishav — portfolio assistant"
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handlePanelKeyDown}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
            style={{
              width: "min(92vw, 380px)",
              height: "min(75vh, 560px)",
              background: "rgba(8, 9, 11, 0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-gold/40 bg-accent-gold/10">
                  <Sparkles size={16} className="text-accent-gold" aria-hidden />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-eclipse-ink bg-emerald-400" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold leading-tight text-eclipse-white">
                    Ask Rishav
                  </p>
                  <p className="text-[11px] leading-tight text-eclipse-faint">
                    Portfolio assistant · online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-eclipse-faint transition-colors duration-fast hover:bg-white/[0.06] hover:text-eclipse-muted focus-ring"
                >
                  <RotateCcw size={14} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-eclipse-faint transition-colors duration-fast hover:bg-white/[0.06] hover:text-eclipse-white focus-ring"
                >
                  <X size={16} aria-hidden />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
              aria-live="polite"
              aria-label="Conversation"
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
              <AnimatePresence>
                {status === "typing" && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: duration.fast, ease: easing.eclipse }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies */}
            <QuickReplies onSelect={send} disabled={status === "typing"} />

            {/* Input */}
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={send}
              status={status}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ──────────────────────────────────── */}
      <div className="relative flex items-center justify-center">
        {/* Idle pulse ring — only when closed */}
        {!isOpen && (
          <motion.span
            className="absolute h-14 w-14 rounded-full bg-accent-gold/30"
            variants={RING_VARIANTS}
            animate="pulse"
            aria-hidden
          />
        )}

        <motion.button
          ref={fabRef}
          type="button"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? "Close Ask Rishav" : "Open Ask Rishav — portfolio assistant"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: duration.fast, ease: easing.magnetic }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent-gold/40 bg-eclipse-ink shadow-[0_8px_32px_rgba(212,175,55,0.2)] transition-shadow duration-base hover:shadow-[0_8px_40px_rgba(212,175,55,0.35)] focus-ring"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: duration.fast, ease: easing.eclipse }}
              >
                <X size={20} className="text-eclipse-white" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                transition={{ duration: duration.fast, ease: easing.eclipse }}
              >
                <MessageCircle size={20} className="text-accent-gold" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

export default AskRishav;
