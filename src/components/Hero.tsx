import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Terminal, Sparkles, ExternalLink } from 'lucide-react';

interface HeroProps {
  onOpenCommandPalette: () => void;
  onOpenAssistant: () => void;
}

export default function Hero({ onOpenCommandPalette, onOpenAssistant }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Magnetic effect for buttons
  const githubButtonRef = useRef<HTMLButtonElement | null>(null);
  const aiButtonRef = useRef<HTMLButtonElement | null>(null);
  const [githubCoords, setGithubCoords] = useState({ x: 0, y: 0 });
  const [aiCoords, setAiCoords] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>, ref: React.RefObject<HTMLButtonElement | null>, setCoords: (c: {x: number, y: number}) => void) => {
    const button = ref.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from cursor to button center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Pull factor (maximum distance shift is 12px)
    setCoords({ x: distanceX * 0.25, y: distanceY * 0.25 });
  };

  const handleMagneticReset = (setCoords: (c: {x: number, y: number}) => void) => {
    setCoords({ x: 0, y: 0 });
  };

  // Parallax effects on scroll
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 150]);
  const yCard = useTransform(scrollY, [0, 600], [0, -50]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6 md:px-12 select-none"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-electric-blue/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-gold-warm/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Large cinematic typography */}
        <motion.div
          style={{ y: yText, opacity: opacityFade }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Status Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full w-fit mb-6 animate-float">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              Available for Elite Consulting
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-display font-light text-zinc-100 tracking-tight leading-[0.95]">
            RISHAV <br />
            <span className="text-gradient-gold font-medium">GHOSH</span>
          </h1>

          <h3 className="text-lg md:text-xl font-display text-zinc-400 mt-6 tracking-wide max-w-xl">
            Senior Staff Software Engineer &amp; Creative Technologist. Architecting ultra-premium high-fidelity digital platforms.
          </h3>

          <p className="text-xs md:text-sm font-mono text-zinc-500 mt-4 max-w-lg leading-relaxed">
            Specializing in lightweight matrix engine shaders, custom reactive canvas designs, and elegant React systems for global-scale products. Ex-Vercel, Ex-Stripe, Ex-Apple.
          </p>

          {/* Interactive Magnetic Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              ref={aiButtonRef}
              onMouseMove={(e) => handleMagneticMove(e, aiButtonRef, setAiCoords)}
              onMouseLeave={() => handleMagneticReset(setAiCoords)}
              onClick={onOpenAssistant}
              style={{ transform: `translate3d(${aiCoords.x}px, ${aiCoords.y}px, 0)` }}
              className="px-6 py-3 bg-gradient-to-r from-gold-warm to-gold-light text-matte-black font-sans font-medium text-xs tracking-widest uppercase rounded-xl transition-all duration-300 hover:glow-gold cursor-none flex items-center gap-2"
              data-cursor="CHAT AI"
            >
              <Sparkles className="w-3.5 h-3.5 fill-matte-black" />
              Ask Rishav AI
            </button>

            <button
              ref={githubButtonRef}
              onMouseMove={(e) => handleMagneticMove(e, githubButtonRef, setGithubCoords)}
              onMouseLeave={() => handleMagneticReset(setGithubCoords)}
              onClick={onOpenCommandPalette}
              style={{ transform: `translate3d(${githubCoords.x}px, ${githubCoords.y}px, 0)` }}
              className="px-6 py-3 bg-zinc-900/80 border border-white/10 text-white font-sans font-medium text-xs tracking-widest uppercase rounded-xl hover:bg-zinc-800 hover:border-white/20 transition-all cursor-none flex items-center gap-2"
              data-cursor="SEARCH"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              Launch Console
              <span className="text-[10px] font-mono text-zinc-500 bg-black/40 px-1 py-0.5 rounded leading-none border border-white/5">
                ⌘K
              </span>
            </button>
          </div>

          {/* Core Stack logos row */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/5">
            <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase">
              Current Core Core Stack
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 font-medium">
              <span className="hover:text-white transition-colors">React 19</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">TypeScript</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">WebGL Shaders</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">Framer Motion</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Black-and-white portrait */}
        <motion.div
          style={{ y: yCard }}
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Framed Card Wrapper */}
          <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-glass p-3 glow-blue group">
            
            {/* The main picture with high-end luxury filters */}
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
                alt="Rishav Ghosh Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center grayscale contrast-125 saturate-0 brightness-90 transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Dynamic Overlay Layers */}
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent opacity-60" />

              {/* Sub-label over image */}
              <div className="absolute bottom-4 left-4 flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  PHOTOGRAPHED 2026
                </span>
                <span className="text-xs font-sans text-zinc-300 font-medium tracking-wide">
                  San Francisco Studio Room
                </span>
              </div>
            </div>

            {/* Glowing borders */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-warm to-electric-blue opacity-0 group-hover:opacity-10 blur-lg transition-all duration-500 pointer-events-none" />
          </div>

          {/* Floaters */}
          <div className="absolute -top-6 -right-6 px-4 py-3 bg-glass border border-white/10 rounded-xl flex items-center gap-3 shadow-xl pointer-events-none animate-float">
            <div className="w-2 h-2 rounded-full bg-gold-warm animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">LATEST STABLE</span>
              <span className="text-xs font-sans text-zinc-300 font-medium">AetherEngine v4.2</span>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 px-4 py-3 bg-glass border border-white/10 rounded-xl flex items-center gap-3 shadow-xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">FPS LOCKED</span>
              <span className="text-xs font-sans text-zinc-300 font-medium">120 Hz Matrix</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors cursor-none"
        onClick={() => {
          const ab = document.getElementById('about');
          if (ab) ab.scrollIntoView({ behavior: 'smooth' });
        }}
        data-cursor="SCROLL"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase">
          EXPLORE DOSSIER
        </span>
        <div className="w-5 h-9 rounded-full border border-zinc-700 flex justify-center p-1.5">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-1.5 bg-gold-warm rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
