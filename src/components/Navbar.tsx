import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, VolumeX, Menu, X, ArrowUpRight, Github, Youtube, Linkedin } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
  onOpenAssistant: () => void;
}

interface MagneticWrapperProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
}

// Magnetic wrapper component to create exquisite interactive mouse magnet pull on premium elements
export function MagneticWrapper({ children, range = 35, strength = 0.35 }: MagneticWrapperProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (Math.abs(distanceX) < range && Math.abs(distanceY) < range) {
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

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
      const currentScrollY = window.scrollY;

      // Handle visibility of navbar based on scroll direction (Awwwards pattern)
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }

      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 20);

      // Determine active section based on scroll offset
      const offsets = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        return {
          id: link.id,
          offset: el ? el.offsetTop - 150 : 0,
        };
      });

      let currentSection = 'hero';
      for (let i = 0; i < offsets.length; i++) {
        if (currentScrollY >= offsets[i].offset) {
          currentSection = offsets[i].id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Micro-fine Scroll Progress Line with deep blue/sky-blue gradient matching Hero */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.header
        id="navbar-header"
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#050505]/75 border-b border-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
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
            <div className="w-10 h-10 rounded-xl border border-blue-500/10 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:glow-blue group-hover:border-blue-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                width="22"
                height="22"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                {/* Animated premium glowing modern RG */}
                <motion.path
                  d="M25 25H55C66.04 25 75 33.96 75 45C75 56.04 66.04 65 55 65H25V25Z"
                  stroke="#60a5fa"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M25 45H55"
                  stroke="#38bdf8"
                  strokeWidth="9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.path
                  d="M50 65L75 85"
                  stroke="#818cf8"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-sans font-black tracking-[0.2em] text-white uppercase group-hover:text-blue-400 transition-colors">
                Rishav Ghosh
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">
                Creative Designer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1 backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-[10px] font-mono tracking-widest uppercase px-4 py-2.5 rounded-full cursor-none transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  data-cursor="GO TO"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions Block */}
          <div className="hidden md:flex items-center gap-3">
            {/* Command Palette search button */}
            <MagneticWrapper>
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 bg-zinc-950/40 border border-white/5 rounded-full pl-3 pr-2 py-1.5 hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                data-cursor="SEARCH"
              >
                <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider group-hover:text-zinc-300 transition-colors">
                  SEARCH
                </span>
                <span className="text-[9px] font-mono bg-zinc-900 text-zinc-500 border border-white/5 px-1.5 py-0.5 rounded leading-none">
                  ⌘K
                </span>
              </button>
            </MagneticWrapper>

            {/* Equalizer / Music Player controls */}
            <MagneticWrapper>
              <button
                onClick={onToggleMusic}
                className="w-9 h-9 rounded-full border border-white/5 bg-zinc-950/40 flex items-center justify-center hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none relative group"
                data-cursor={isMusicPlaying ? 'MUTE SOUND' : 'PLAY SOUND'}
              >
                {isMusicPlaying ? (
                  <div className="flex gap-[2.5px] items-end justify-center h-4 w-4">
                    <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
                    <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
                    <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-4" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }} />
                    <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
                  </div>
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                )}
              </button>
            </MagneticWrapper>

            {/* GitHub Social Link */}
            <MagneticWrapper>
              <a
                href="https://github.com/000100R"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/5 bg-zinc-950/40 flex items-center justify-center hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                data-cursor="GITHUB"
              >
                <Github className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </MagneticWrapper>

            {/* YouTube Social Link */}
            <MagneticWrapper>
              <a
                href="https://youtube.com/@rawentity-202"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/5 bg-zinc-950/40 flex items-center justify-center hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                data-cursor="YOUTUBE"
              >
                <Youtube className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-500 transition-colors" />
              </a>
            </MagneticWrapper>

            {/* CTA Button: Let's Talk */}
            <MagneticWrapper>
              <button
                onClick={() => handleLinkClick('contact')}
                className="relative group overflow-hidden px-5 py-2.5 bg-white text-[#050505] font-sans font-bold text-xs tracking-wider rounded-full hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] cursor-none flex items-center gap-1.5"
                data-cursor="TALK"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </MagneticWrapper>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleMusic}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-950 border border-white/5"
            >
              {isMusicPlaying ? (
                <div className="flex gap-[2px] items-end justify-center h-4.5 w-4.5">
                  <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
                  <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
                  <span className="w-[1.5px] bg-blue-400 rounded-full animate-bounce h-4" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }} />
                </div>
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-950 border border-white/5"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full Screen Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden absolute inset-x-0 top-[71px] bg-[#050505]/95 border-b border-white/5 p-6 flex flex-col gap-6 backdrop-blur-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left text-xs font-mono tracking-widest uppercase py-3.5 border-b border-white/[0.02] flex justify-between items-center ${
                        isActive ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-3 pt-2"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center justify-center gap-2 py-3 bg-zinc-900/60 border border-white/5 rounded-full text-[11px] font-mono text-zinc-300 uppercase tracking-widest"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Command Console</span>
                </button>

                <button
                  onClick={() => handleLinkClick('contact')}
                  className="py-3 bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-500/30 rounded-full text-[11px] font-sans font-bold text-center uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1.5"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {/* Mobile Social Links Row */}
                <div className="flex justify-center gap-6 py-3 border-t border-white/[0.04] mt-2">
                  <a href="https://github.com/000100R" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com/@rawentity-202" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/rishav-ghosh-71a16840b" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
