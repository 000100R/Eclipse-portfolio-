import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { SkillItem } from '../types';
import * as LucideIcons from 'lucide-react';

// Dynamic icon resolver helper to select correct lucide icons without heavy dependencies
function SkillIcon({ name, className }: { name: string; className?: string }) {
  // Fallback to Code if icon doesn't exist
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Code;
  return <IconComponent className={className} />;
}

export default function Skills() {
  const { skillsData } = portfolioData;
  const [activeCategory, setActiveCategory] = useState(skillsData[0].id);

  const selectedCategory = skillsData.find((cat) => cat.id === activeCategory) || skillsData[0];

  return (
    <section id="skills" className="py-24 w-full relative overflow-hidden px-6 md:px-12 bg-matte-black select-none">
      {/* Light highlights */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-electric-blue/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-gold-warm/5 blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
              04 // CAPABILITIES MATRIX
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mt-2">
              TECHNICAL <span className="font-medium text-gradient-gold">STRENGTHS</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-sm md:text-right">
            Categorized capabilities. No arbitrary progress bars. Measured in system performance.
          </p>
        </div>

        {/* Categories Tab Selector & Skills Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Category Selection Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/5 pr-0 lg:pr-8">
            {skillsData.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl border font-sans text-xs font-medium tracking-widest uppercase cursor-none transition-all duration-300 flex items-center justify-between min-w-[200px] md:min-w-0 ${
                    isActive
                      ? 'bg-glass border-gold-soft text-white glow-gold shadow-md'
                      : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.01]'
                  }`}
                  data-cursor={isActive ? 'ACTIVE' : 'SELECT'}
                >
                  <span>{category.title}</span>
                  {isActive && (
                    <motion.span
                      layoutId="category-dot"
                      className="w-1.5 h-1.5 rounded-full bg-gold-warm hidden lg:inline-block"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Skills Grid (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {selectedCategory.skills.map((skill, index) => {
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-5 rounded-xl border border-white/5 bg-glass hover:border-electric-blue/30 hover:glow-blue transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Glowing dynamic Icon box */}
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-electric-light group-hover:border-electric-blue/30 transition-all">
                          <SkillIcon name={skill.icon} className="w-5 h-5" />
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-sm font-sans font-medium text-white tracking-wide group-hover:text-electric-light transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                            Standard: {skill.level}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs font-sans text-zinc-400 mt-4 leading-relaxed">
                        {skill.description}
                      </p>

                      <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-[8px] font-mono text-zinc-500">
                        <span>SYSTEM MODULE ACTIVE</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-blue group-hover:animate-ping" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
