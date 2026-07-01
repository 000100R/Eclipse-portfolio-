import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Elegant, varying ticks to take ~2.2 seconds to reach 100%, plus 800ms pause = 3 seconds total
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Average increment is ~2.45% per tick. 100/2.45 = 41 ticks. 41 * 55ms = ~2.25s.
      const increment = Math.random() * 2.5 + 1.2;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.floor(currentProgress));

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShouldRender(false);
          onComplete();
        }, 800); // Elegant pause at 100% (totaling 3 seconds)
      }
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          id="page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 w-full h-full bg-matte-black z-50 flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Top Info */}
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              Rishav Ghosh © 2026
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACTIVE SESSION</span>
            </div>
          </div>

          {/* Center Monogram Logo */}
          <div className="flex flex-col items-center justify-center gap-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-24 h-24 flex items-center justify-center rounded-2xl border border-gold-soft bg-glass glow-gold"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Gold Monogram RG */}
                <path
                  d="M25 25H55C66.0457 25 75 33.9543 75 45C75 56.0457 66.0457 65 55 65H25V25Z"
                  stroke="#d4af37"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25 45H55"
                  stroke="#d4af37"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M50 65L75 85"
                  stroke="#d4af37"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Electric Blue Accent Core */}
                <circle cx="25" cy="25" r="4" fill="#0072f5" />
                <circle cx="25" cy="45" r="4" fill="#0072f5" />
                <circle cx="25" cy="65" r="4" fill="#0072f5" />
                <circle cx="50" cy="65" r="4" fill="#0072f5" />
              </svg>

              {/* Glowing Ambient Light Backdrops */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-warm to-electric-blue opacity-10 blur-xl pointer-events-none" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-xl font-display font-medium tracking-widest uppercase text-white">
                Rishav Ghosh
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                Creative Portfolio
              </p>
            </motion.div>
          </div>

          {/* Bottom Loading Progress */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  INITIALIZING MATRIX ENGINE
                </span>
                <span className="text-xs font-sans text-zinc-400 mt-1 max-w-xs truncate">
                  {progress < 30 && "Gathering WebGL shaders..."}
                  {progress >= 30 && progress < 60 && "Injecting fluid-motion gravity constraints..."}
                  {progress >= 60 && progress < 90 && "Booting local Ask Rishav local neural base..."}
                  {progress >= 90 && "Rendering luxury interfaces..."}
                </span>
              </div>
              <span className="text-4xl md:text-6xl font-display font-light text-zinc-100 tracking-tight select-none">
                {progress}%
              </span>
            </div>

            {/* Loading Bar */}
            <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-warm via-white to-electric-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
