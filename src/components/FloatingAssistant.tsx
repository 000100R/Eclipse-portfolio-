import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { Message } from '../types';
import { MessageSquare, X, Send, Sparkles, Terminal, ArrowUpRight, ArrowDown } from 'lucide-react';

interface FloatingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function FloatingAssistant({
  isOpen,
  onClose,
  onOpen,
}: FloatingAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { knowledgeBase } = portfolioData;

  // Setup initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greetings = knowledgeBase.greetings;
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        {
          id: 'greeting',
          sender: 'assistant',
          text: randomGreeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages, knowledgeBase]);

  // Scroll to bottom whenever messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Parse keywords locally to find match
    setTimeout(() => {
      let matchedAnswer = "I'm sorry, I couldn't find a direct match in Rishav's local parameters for that query. Try asking 'Who is Rishav?', 'Projects', 'Skills', or 'Contact'!";
      const queryLower = textToSend.toLowerCase();

      // Simple keyword matching against faqs
      for (const faq of knowledgeBase.faqs) {
        const matches = faq.keywords.some((keyword) => queryLower.includes(keyword));
        if (matches) {
          matchedAnswer = faq.answer;
          break;
        }
      }

      const botMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: matchedAnswer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000); // 1s organic compilation wait
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating launcher badge */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-gold-warm to-gold-light border border-gold-soft flex items-center justify-center text-matte-black shadow-2xl transition-all hover:scale-105 duration-300 cursor-none glow-gold z-45"
            data-cursor="CHAT AI"
          >
            <MessageSquare className="w-6 h-6 fill-matte-black" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-electric-blue rounded-full border-2 border-matte-black animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-6 right-6 w-[340px] md:w-[400px] h-[520px] bg-luxury-gray border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-45 glow-blue"
          >
            {/* Chat Header */}
            <div className="px-5 py-4 bg-matte-black border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-warm/10 border border-gold-soft flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gold-warm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-display font-medium text-white tracking-widest uppercase leading-none">
                    ASK RISHAV AI
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wide mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LOCAL NEURAL CORE
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-none"
                data-cursor="CLOSE"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message History area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-none">
              {messages.map((msg) => {
                const isBot = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      isBot ? 'self-start items-start' : 'self-end items-end'
                    }`}
                  >
                    {/* Timestamp / Sender Label */}
                    <span className="text-[8px] font-mono text-zinc-500 mb-1 uppercase">
                      {isBot ? 'Rishav Assistant' : 'Visitor Terminal'}
                    </span>

                    {/* Chat Bubble card */}
                    <div
                      className={`p-3.5 rounded-xl text-xs font-sans leading-relaxed ${
                        isBot
                          ? 'bg-zinc-900 border border-white/5 text-zinc-300'
                          : 'bg-gold-warm text-matte-black font-medium'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* Bot thinking loader */}
              {isTyping && (
                <div className="flex flex-col max-w-[80%] self-start items-start">
                  <span className="text-[8px] font-mono text-zinc-500 mb-1 uppercase">
                    Rishav Assistant
                  </span>
                  <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-400 text-xs flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gold-warm rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1.5 h-1.5 bg-gold-warm rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="w-1.5 h-1.5 bg-gold-warm rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-5 py-2.5 bg-zinc-950/60 border-t border-white/5 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {knowledgeBase.faqs.map((faq) => (
                <button
                  key={faq.question}
                  onClick={() => handleSuggestionClick(faq.question)}
                  className="px-3 py-1.5 bg-zinc-900 border border-white/5 hover:border-gold-soft rounded-lg text-[9px] font-mono text-zinc-400 hover:text-white transition-all shrink-0 cursor-none"
                  data-cursor="ASK CHIP"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Footer Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 bg-matte-black border-t border-white/5 flex gap-2 items-center shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, CV, credentials..."
                className="flex-1 bg-zinc-900 border border-white/5 px-4 py-2.5 text-xs text-white placeholder-zinc-500 rounded-xl focus:outline-none focus:border-electric-blue/40 cursor-none font-sans"
                data-cursor="WRITE"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-xl bg-gold-warm border border-gold-soft hover:glow-gold flex items-center justify-center text-matte-black transition-all duration-300 disabled:opacity-50 disabled:glow-none cursor-none shrink-0"
                data-cursor="SEND"
              >
                <Send className="w-4 h-4 fill-matte-black" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
