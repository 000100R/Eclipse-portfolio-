import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { portfolioData } from '../data';
import { Bookmark, Compass, Award, Cpu } from 'lucide-react';

// Simple Counting hook/component for high-fidelity performance and 0 third-party bugs
function AnimatedCounter({ value, label }: { value: string; label: string; key?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Parse the numeric part
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const end = parseInt(match[1], 10);
    const suffix = match[2];

    let start = 0;
    const duration = 1500; // 1.5s
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isInView, value]);

  const displaySuffix = value.replace(/^\d+/, '');

  return (
    <div ref={ref} className="flex flex-col p-6 rounded-2xl bg-glass border border-white/5 glow-blue hover:border-white/10 transition-colors">
      <span className="text-4xl md:text-5xl font-display font-light text-zinc-100 tracking-tight flex items-baseline">
        {count}
        <span className="text-gold-warm font-medium ml-0.5">{displaySuffix}</span>
      </span>
      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const { personalInfo, statistics } = portfolioData;

  return (
    <section id="about" className="py-24 w-full relative overflow-hidden px-6 md:px-12 bg-black select-none">
      {/* Dynamic light halos */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gold-warm/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] rounded-full bg-electric-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
              01 // BIOGRAPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mt-2">
              THE STORY OF <span className="font-medium text-gradient-silver">RISHAV GHOSH</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-sm md:text-right">
            Aligning computational precision with high-end aesthetic value. Built to persist.
          </p>
        </div>

        {/* Story Intro & Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Portrait with color overlay */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-glass p-3 glow-gold group">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
                  alt="Rishav Ghosh Color portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center saturate-75 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/20 to-transparent opacity-80" />
                
                {/* Visual Label overlay */}
                <div className="absolute top-4 right-4 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                  <span className="text-[9px] font-mono text-gold-warm tracking-wider uppercase">
                    STUDIO 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Story block */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-gold-warm shrink-0" />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Systems &amp; Aesthetic Synthesis
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-display text-zinc-200 tracking-wide font-light leading-relaxed">
              &ldquo;I build digital interfaces with a deep reverence for structural symmetry, micro-tactile responsive feedbacks, and absolute operational efficiency.&rdquo;
            </h3>

            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              My path in software was forged at the intersection of deep visual artistry and meticulous computer science. Over the last 8+ years, I have collaborated with and built frameworks for top-tier developer organizations including <strong className="text-white font-medium">Vercel</strong>, <strong className="text-white font-medium">Stripe</strong>, and <strong className="text-white font-medium">Apple</strong>.
            </p>

            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              Rather than assembling static interfaces from generic design templates, I approach web rendering like luxury industrial design. This means designing custom WebGL/shaders, maximizing CPU idle periods, locking layouts into the hardware rasterizer, and optimizing memory usage to maintain a constant 120 FPS frame flow.
            </p>

            {/* Micro quote card */}
            <div className="p-4 bg-zinc-950/60 border-l-2 border-gold-warm rounded-r-xl">
              <p className="text-xs font-mono text-zinc-500 italic">
                &ldquo;Luxury on the web is not about adding heavy animation layers. It is about removing every pixel of friction until the system feels as weightless and reactive as breathing.&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* Statistics Cards Block */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {statistics.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Glass Card */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-warm/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-gold-warm" />
              </div>
              <h4 className="text-lg font-display font-medium text-white tracking-wide">
                THE MISSION
              </h4>
            </div>
            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              {personalInfo.mission}
            </p>
          </div>

          {/* Vision Glass Card */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-electric-light" />
              </div>
              <h4 className="text-lg font-display font-medium text-white tracking-wide">
                THE VISION
              </h4>
            </div>
            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              {personalInfo.vision}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
