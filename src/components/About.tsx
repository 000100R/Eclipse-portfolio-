import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';
import { portfolioData } from '../data';
import aboutImage from '@/assets/about.jpg';

interface StatCardProps {
  value: string;
  label: string;
  index: number;
  key?: string;
}

// Highly performant animated counter card using viewport-triggered smooth interpolation
function StatCard({ value, label, index }: StatCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const endValue = parseInt(match[1], 10);
    const duration = 1800; // 1.8 seconds of smooth accumulation
    const frameRate = 1000 / 60; // 60fps target
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Beautiful ease-out quad timing function
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.round(easeProgress * endValue);

      setCount(currentVal);

      if (currentFrame >= totalFrames) {
        setCount(endValue);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const suffix = value.replace(/^\d+/, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group p-6 rounded-2xl bg-glass border-glass overflow-hidden transition-all duration-300 hover:border-blue-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
    >
      {/* Subtle Card Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-gold-warm/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative vector accent line */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent group-hover:via-blue-400/40 transition-all duration-500" />

      <span className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-white flex items-baseline">
        {count}
        <span className="text-blue-400 font-extrabold ml-0.5 group-hover:text-gold-light transition-colors duration-300">
          {suffix}
        </span>
      </span>
      <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mt-2.5 block leading-relaxed">
        {label}
      </span>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  // Mouse tilt 3D perspective effect for the large portrait
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const box = imageContainerRef.current.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate elegant tilt degrees (maximum 10 degrees tilt)
    const degX = (mouseY / (box.height / 2)) * -8;
    const degY = (mouseX / (box.width / 2)) * 8;

    setRotateX(degX);
    setRotateY(degY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Parallax scroll effect for the portrait image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  // Real Statistics data from profile config
  const stats = portfolioData.statistics;

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 w-full relative overflow-hidden bg-[#050505] px-6 md:px-12 select-none"
    >
      {/* Decorative Background Accents: Gold and Blue ambient radial halos */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-gold-warm/[0.025] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Core Narrative Grid: Two-Column layout on desktop, Single-column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-24">
          
          {/* Left Column: Premium Interactive Portrait Frame with Tilt and Parallax */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: 1000,
              }}
              className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl cursor-none"
              data-cursor="GLANCE"
            >
              {/* Animated 3D tilted card */}
              <motion.div
                animate={{
                  rotateX: isHovered ? rotateX : 0,
                  rotateY: isHovered ? rotateY : 0,
                  scale: isHovered ? 1.03 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: isHovered ? 200 : 150,
                  damping: 18,
                }}
                className="w-full h-full rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 p-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group"
              >
                {/* Thin, elegant, highly-precise glowing neon border overlay */}
                <div className="absolute inset-0 rounded-3xl border border-blue-500/10 group-hover:border-blue-400/30 transition-colors duration-500 pointer-events-none z-20" />
                
                {/* Embedded soft radial gradient glow within the frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-gold-warm/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                {/* Parallax moving portrait picture */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <motion.img
                    style={{ y: yParallax, scale: 1.15 }}
                    src={aboutImage}
                    alt="Rishav Ghosh Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center saturate-50 brightness-75 group-hover:saturate-100 group-hover:brightness-95 transition-all duration-500"
                  />
                  
                  {/* Subtle fade-out overlay at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/10 to-transparent opacity-90 z-10" />
                </div>

                {/* Text and Info overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">
                    RISHAV GHOSH
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400 font-mono">
                      CREATOR • DESIGNER • AI ENTHUSIAST
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600 border border-white/5 px-2.5 py-1 rounded-full bg-black/40">
                      STUDIO 2026
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Content & Quote Card */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Label & Dynamic Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
                  01 // NARRATIVE BIOGRAPHY
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white leading-tight mt-2">
                CRAFTING WITH <span className="font-medium text-gradient-gold">CREATIVITY &amp; PRECISION</span>
              </h3>
            </motion.div>

            {/* Narrative Story (3-4 paragraphs about developer, designer & AI enthusiast) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 text-sm sm:text-base font-sans text-zinc-400 leading-relaxed"
            >
              <p>
                I am <strong className="text-white font-semibold">Rishav Ghosh</strong>, a creative visual designer, YouTube content creator, and AI enthusiast based in Kolkata, India. With a deep passion for digital media and emerging technologies, I operate at the intersection of cinematic content creation, visual design, and software interactivity.
              </p>

              <p>
                As a self-taught digital builder, I have spent years mastering tools like <strong className="text-white font-semibold">Canva</strong>, <strong className="text-white font-semibold">YouTube Studio</strong>, and mobile video editors to curate engaging experiences for audiences. My hands-on experience managing digital platforms has instilled in me a rigorous standard for visual communication, thumb-stopping graphic layouts, and high-performance storytelling.
              </p>

              <p>
                My tech journey bridges creative design with interactive web architectures. I leverage React and modern frameworks to construct sleek, responsive, and tactile web experiences, like my custom curated art exhibition portal <strong className="text-white font-semibold">Shilpi Art</strong>. I focus heavily on motion physics and responsive usability to make every interface feel weightless.
              </p>

              <p>
                Deeply fascinated by artificial intelligence, I actively study Machine Learning, Deep Learning, and Computer Vision fundamentals. I integrate AI-assisted workflows and precise prompt engineering into my creative processes, transforming AI from a passive text box into an active co-creator for next-generation content channels and interfaces.
              </p>
            </motion.div>

            {/* Premium Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="p-6 md:p-8 rounded-2xl bg-glass border-glass relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/[0.015] rounded-br-full pointer-events-none" />
              <Quote className="w-10 h-10 text-blue-400/10 absolute top-4 right-6 group-hover:text-blue-400/20 transition-colors duration-300" />
              
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <p className="text-sm md:text-base font-mono text-zinc-300 italic tracking-wide leading-relaxed">
                    &ldquo;Great design is not decoration. It is how technology tells a story.&rdquo;
                  </p>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                    — RISHAV GHOSH, CREATIVE STATEMENT
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Statistics Cards Block */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
