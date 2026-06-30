import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, BookOpen, Terminal, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenCommandPalette: () => void;
  onOpenAssistant: () => void;
}

// Pre-calculate stable high-fidelity particle configurations to maximize performance
const PARTICLES = Array.from({ length: 28 }).map((_, i) => {
  const left = `${(i * 3.5) + (Math.random() * 2)}%`;
  const delay = `${Math.random() * -20}s`; // Negative delay so particles are pre-distributed on load
  const duration = `${15 + Math.random() * 15}s`;
  const size = `${Math.random() * 2 + 1}px`;
  const drift = `${(Math.random() - 0.5) * 50}px`;
  return { id: i, left, delay, duration, size, drift };
});

export default function Hero({ onOpenCommandPalette, onOpenAssistant }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parallax scrolling effects for that high-end Awwwards depth feel
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050505] px-6 md:px-12 select-none"
    >
      {/* Self-contained custom styles for performant animations */}
      <style>{`
        @keyframes radial-glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.18; }
          50% { transform: translate(-50%, -50%) scale(1.15) translate(3%, 3%); opacity: 0.28; }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-105vh) translateX(var(--x-drift, 20px)) scale(0.3); opacity: 0; }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-radial-glow {
          background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(59, 130, 246, 0.08) 45%, rgba(5, 5, 5, 0) 70%);
          filter: blur(60px);
          animation: radial-glow 14s infinite ease-in-out;
        }
        .text-gradient-animated {
          background-image: linear-gradient(to right, #60a5fa, #38bdf8, #818cf8, #a78bfa, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 6s infinite linear;
        }
      `}</style>

      {/* Premium Blue Radial Glow behind the content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] max-w-[1100px] aspect-square rounded-full bg-radial-glow pointer-events-none z-0" />

      {/* Subtle Floating Particles using CSS Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full bg-blue-400/25 pointer-events-none"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `float-particle ${p.duration} infinite linear`,
              animationDelay: p.delay,
              '--x-drift': p.drift,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        style={{ y: yContent, opacity: opacityFade }}
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center px-4"
      >
        {/* Available Pill Capsule */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.02] border border-white/5 rounded-full w-fit mb-8 shadow-[0_0_15px_rgba(255,255,255,0.01)] backdrop-blur-md"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase leading-none">
            AVAILABLE FOR ELITE PROJECTS & CONSULTING
          </span>
        </motion.div>

        {/* The Main Name Target: Bold and Cinematic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-blue-400/90 uppercase mb-4 font-semibold">
            CREATIVE ENGINEER & ARCHITECT
          </span>
          
          <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-sans font-black tracking-tighter text-white leading-[0.85] mb-8">
            Rishav Ghosh
          </h1>

          {/* Large Bold Headline with Animated Gradient on Important Words */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-zinc-400 max-w-3xl leading-relaxed">
            Architecting high-fidelity, ultra-premium{' '}
            <span className="text-gradient-animated font-extrabold">
              digital ecosystems
            </span>{' '}
            for global scale.
          </h2>
        </motion.div>

        {/* Short credentials subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-mono text-zinc-500 max-w-xl text-center mt-6 leading-relaxed"
        >
          Specializing in performant interactive rendering, WebGL/shaders, 
          and bespoke frontend systems. Ex-Vercel, Ex-Stripe, and Ex-Apple.
        </motion.p>

        {/* Two Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full max-w-md sm:max-w-none"
        >
          <button
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto group relative px-8 py-4 bg-white text-[#050505] font-sans font-semibold text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_35px_rgba(56,189,248,0.22)] flex items-center justify-center gap-2.5 overflow-hidden cursor-none"
            data-cursor="EXPLORE"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto group relative px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-white font-sans font-semibold text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white/[0.02] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 overflow-hidden cursor-none"
            data-cursor="ABOUT"
          >
            <span>Read My Story</span>
            <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle floating keyboard console trigger */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        onClick={onOpenCommandPalette}
        className="absolute top-28 right-8 hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/5 bg-zinc-950/40 text-[10px] font-mono text-zinc-400 cursor-none hover:opacity-100 hover:border-white/10 transition-all z-10"
        data-cursor="CONSOLE"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span>PRESS ⌘K FOR CONSOLE</span>
      </motion.div>

      {/* Smooth Scroll Indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-zinc-500 hover:text-white transition-colors cursor-none z-10"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        data-cursor="SCROLL"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400">
          EXPLORE DOSSIER
        </span>
        <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center p-1.5 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
