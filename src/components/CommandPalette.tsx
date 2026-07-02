import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Music, MessageSquare, Download, X, Laptop } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
  onOpenAssistant: () => void;
  onDownloadResume: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleMusic,
  isMusicPlaying,
  onOpenAssistant,
  onDownloadResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const commands = [
    {
      id: 'sec-hero',
      title: 'Navigate to Hero',
      description: 'Go back to top dynamic entrance',
      icon: Compass,
      action: () => scrollToSection('hero'),
    },
    {
      id: 'sec-about',
      title: 'Navigate to About & Story',
      description: 'Timeline, mission, and statistics',
      icon: Compass,
      action: () => scrollToSection('about'),
    },
    {
      id: 'sec-experience',
      title: 'Navigate to Experience',
      description: 'Rishav\'s structural professional timeline',
      icon: Compass,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'sec-projects',
      title: 'Navigate to Selected Projects',
      description: 'Movie-poster layout with case studies',
      icon: Compass,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'sec-skills',
      title: 'Navigate to Technical Skills',
      description: 'Interactive matrices categorized',
      icon: Compass,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'sec-gallery',
      title: 'Navigate to Gallery Space',
      description: 'Horizontal scroll dynamic lightboxes',
      icon: Compass,
      action: () => scrollToSection('gallery'),
    },
    {
      id: 'sec-contact',
      title: 'Navigate to Contact',
      description: 'Secure form, coordinates, and socials',
      icon: Compass,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'cmd-music',
      title: isMusicPlaying ? 'Mute Ambient Soundscape' : 'Unmute Ambient Soundscape',
      description: 'Synthesized 5th chord procedural ambient pad',
      icon: Music,
      action: () => {
        onToggleMusic();
        onClose();
      },
    },
    {
      id: 'cmd-assistant',
      title: 'Launch "Ask Rishav" AI',
      description: 'Local neural bot answering your custom questions',
      icon: MessageSquare,
      action: () => {
        onOpenAssistant();
        onClose();
      },
    },
    {
      id: 'cmd-resume',
      title: 'Download Premium Resume',
      description: 'Direct system download for printable PDF portfolio',
      icon: Download,
      action: () => {
        onDownloadResume();
        onClose();
      },
    },
  ];

  // Filter commands by query
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  // Set up hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // Controlled by parent
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  // Close when clicking overlay backdrop
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="command-palette-backdrop"
          onClick={handleOverlayClick}
          className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-start justify-center p-4 md:p-24"
        >
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-luxury-gray border border-white/10 rounded-2xl overflow-hidden shadow-2xl mt-12 relative glow-blue"
          >
            {/* Input box */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-matte-black">
              <Search className="w-5 h-5 text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or navigate..."
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none font-sans"
              />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 text-zinc-400 bg-white/5">
                  ESC
                </span>
                <button
                  onClick={onClose}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggestions list */}
            <div className="max-h-64 sm:max-h-80 overflow-y-auto py-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-4 py-3 cursor-none transition-colors ${
                        isSelected ? 'bg-zinc-800/60 text-white' : 'text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isSelected ? 'bg-electric-blue/20 text-electric-light' : 'bg-white/5 text-zinc-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-xs font-sans font-medium ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                            {cmd.title}
                          </span>
                          <span className="text-[10px] font-sans text-zinc-500">
                            {cmd.description}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 font-mono text-[9px] text-zinc-500">
                          <span>ENTER</span>
                          <span className="text-zinc-600">↵</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                  <Laptop className="w-8 h-8 text-zinc-600 mb-2" />
                  <span className="text-xs font-sans">No commands found for "{query}"</span>
                </div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="px-4 py-2 bg-matte-black border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <div className="flex gap-4">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
              <div>
                <span>Press </span>
                <span className="text-zinc-400">⌘K</span>
                <span> to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
