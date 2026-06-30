import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Music, Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
  onOpenAssistant: () => void;
}

export default function Navbar({
  onOpenCommandPalette,
  onToggleMusic,
  isMusicPlaying,
  onOpenAssistant,
}: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check if scrolled past threshold
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll offset
      const offsets = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        return {
          id: link.id,
          offset: el ? el.offsetTop - 120 : 0,
        };
      });

      const currentScroll = window.scrollY;
      let currentSection = 'hero';

      for (let i = 0; i < offsets.length; i++) {
        if (currentScroll >= offsets[i].offset) {
          currentSection = offsets[i].id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Micro-fine Scroll Progress Line */}
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-gold-warm via-white to-electric-blue z-50 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-4 bg-glass border-b border-white/10 shadow-lg'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group cursor-none"
            data-cursor="HOME"
          >
            <div className="w-10 h-10 rounded-xl border border-gold-soft bg-glass flex items-center justify-center transition-all duration-300 group-hover:glow-gold group-hover:border-gold-warm/40">
              <svg
                width="24"
                height="24"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Gold Monogram RG */}
                <path
                  d="M25 25H55C66.0457 25 75 33.9543 75 45C75 56.0457 66.0457 65 55 65H25V25Z"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25 45H55"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M50 65L75 85"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-display font-medium tracking-widest text-white uppercase group-hover:text-gold-warm transition-colors">
                Rishav Ghosh
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">
                Staff UI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-1 py-1 backdrop-blur-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-[11px] font-sans font-medium tracking-widest uppercase px-4 py-2 rounded-full cursor-none transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-white/10 text-white shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                }`}
                data-cursor="GO TO"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions Block */}
          <div className="hidden md:flex items-center gap-3">
            {/* Command Palette search button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 bg-zinc-900 border border-white/5 rounded-full pl-3 pr-2 py-1.5 hover:border-white/20 transition-all cursor-none group"
              data-cursor="SEARCH"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-sans text-zinc-500 font-medium tracking-wider group-hover:text-zinc-300 transition-colors">
                Quick Search
              </span>
              <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 border border-white/5 px-1.5 py-0.5 rounded leading-none">
                ⌘K
              </span>
            </button>

            {/* AI Floating Assistant quick launch button */}
            <button
              onClick={onOpenAssistant}
              className="px-4 py-2 bg-gradient-to-r from-electric-blue/10 to-electric-light/10 border border-blue-soft rounded-full text-[10px] font-mono font-medium tracking-widest text-electric-light hover:text-white hover:glow-blue transition-all cursor-none"
              data-cursor="ASK ME"
            >
              ASK AI
            </button>

            {/* Equalizer / Music Player controls */}
            <button
              onClick={onToggleMusic}
              className="w-10 h-10 rounded-full border border-white/5 bg-zinc-900 flex items-center justify-center hover:border-white/20 transition-all cursor-none relative group"
              data-cursor={isMusicPlaying ? 'MUTE SOUND' : 'PLAY SOUND'}
            >
              {isMusicPlaying ? (
                <div className="flex gap-[2px] items-center justify-center h-4 w-4">
                  <span className="w-[2px] bg-gold-warm rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
                  <span className="w-[2px] bg-gold-warm rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
                  <span className="w-[2px] bg-gold-warm rounded-full animate-bounce h-4" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }} />
                  <span className="w-[2px] bg-gold-warm rounded-full animate-bounce h-2" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
                </div>
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              )}
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleMusic}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-white/5"
            >
              {isMusicPlaying ? <Volume2 className="w-4 h-4 text-gold-warm animate-pulse" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-white/5"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full Screen Menu Panel */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[73px] bg-glass border-b border-white/10 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-sm font-sans font-medium tracking-widest uppercase py-2 border-b border-white/5 ${
                    activeSection === link.id ? 'text-gold-warm' : 'text-zinc-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-2 py-3 bg-zinc-900 border border-white/10 rounded-full text-xs font-sans text-zinc-300 uppercase tracking-widest"
              >
                <Search className="w-4 h-4" />
                Quick Command Search
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAssistant();
                }}
                className="py-3 bg-gradient-to-r from-electric-blue/20 to-electric-light/20 border border-blue-soft rounded-full text-xs font-mono text-center uppercase tracking-widest text-electric-light"
              >
                Ask Rishav Assistant
              </button>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
