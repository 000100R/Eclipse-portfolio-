import { motion, type Variants } from "framer-motion";

const DOT_VARIANTS: Variants = {
  bounce: (i: number) => ({
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.15,
    },
  }),
};

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/20 border border-accent-gold/30">
        <span className="font-display text-[10px] font-semibold text-accent-gold">R</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/[0.07] bg-white/[0.04] px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-accent-gold"
            animate="bounce"
            variants={DOT_VARIANTS}
            custom={i}
          />
        ))}
      </div>
    </div>
  );
}
