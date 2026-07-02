import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress() {
  const progress = useScrollProgress(); // Normalised value [0, 1]
  const percent = Math.round(progress * 100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show circular floating tracker only after scrolling past 100px
    const handleScrollVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    // Run once initially
    handleScrollVisibility();

    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG Circle Parameters for 40px diameter ring
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <>
      {/* 1. Global Micro-fine Glowing Scroll Progress Bar at the top of viewport */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 z-[9999] transition-all duration-75 shadow-[0_1px_8px_rgba(56,189,248,0.5)]"
        style={{ width: `${percent}%` }}
      />

      {/* 2. Global Circular Glassmorphic Scroll Progress Ring & Quick Jump Back to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-50 hidden sm:flex items-center gap-3"
          >
            <button
              onClick={handleScrollToTop}
              className="relative group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md hover:border-sky-400/50 hover:bg-black/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 cursor-none"
              title="Return to Apex"
              aria-label="Scroll back to top"
              data-cursor="GO TOP"
            >
              {/* Circular SVG Progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
                <circle
                  className="stroke-white/5"
                  cx="22"
                  cy="22"
                  r={radius}
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  className="stroke-sky-400 transition-all duration-150"
                  cx="22"
                  cy="22"
                  r={radius}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Icon/Number toggle on hover */}
              <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-medium text-zinc-400 group-hover:translate-y-8 transition-transform duration-300">
                  {percent}%
                </span>
                <ArrowUp className="absolute w-3.5 h-3.5 text-sky-400 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
              </div>
            </button>

            {/* Micro-label explaining tracker */}
            <div className="hidden lg:flex flex-col text-[8px] font-mono tracking-widest text-zinc-500 uppercase leading-none">
              <span>Apex Scroll</span>
              <span className="text-zinc-700 mt-1">Status: {percent}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
