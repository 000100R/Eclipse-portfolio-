import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { Project } from '../types';
import { Github, ExternalLink, X, HelpCircle, CheckCircle2, Award } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 w-full relative overflow-hidden px-6 md:px-12 bg-black select-none">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-gold-warm/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-electric-blue/5 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
              03 // DIGITAL ENGINEERING
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mt-2">
              SELECTED <span className="font-medium text-gradient-gold">CREATIONS</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-sm md:text-right">
            Movie-poster inspired engineering logs. Click any card to inspect full case-study matrices.
          </p>
        </div>

        {/* Movie Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {projects.map((proj, idx) => {
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                onClick={() => setSelectedProject(proj)}
                className="relative aspect-[3/4.2] rounded-2xl overflow-hidden border border-white/5 bg-luxury-gray cursor-none group hover:border-gold-warm/30 hover:glow-gold transition-all duration-500 flex flex-col justify-between p-5"
                data-cursor="INSPECT"
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-50"
                  />
                  {/* Glass / Shadow gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                </div>

                {/* Top Poster Meta */}
                <div className="z-10 flex justify-between items-start">
                  <span className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-1 rounded border border-white/10 backdrop-blur-md uppercase">
                    RG {proj.stats[0]?.value || 'SYS'}
                  </span>
                  <span className="text-[8px] font-mono text-gold-warm tracking-widest uppercase">
                    CINEMATIC CASE // 0{idx + 1}
                  </span>
                </div>

                {/* Bottom Poster Info */}
                <div className="z-10 flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-gold-warm tracking-wider uppercase mb-1">
                      {proj.tagline}
                    </span>
                    <h3 className="text-xl font-display font-medium text-white tracking-wide leading-tight group-hover:text-gold-warm transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-xs font-sans text-zinc-400 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Badges and Call to action */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {proj.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-mono text-zinc-400 bg-black/50 border border-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Micro label */}
                  <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">
                      INSPECT DOSSIER
                    </span>
                    <span className="text-xs text-gold-warm group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>

                {/* Border Hover FX */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold-warm to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Case-Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl bg-luxury-gray border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col glow-blue"
              >
                {/* Modal Header banner image */}
                <div className="h-48 md:h-64 w-full relative shrink-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-gray to-transparent" />
                  
                  {/* Floating Action Close */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-none"
                    data-cursor="CLOSE"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-6 md:left-10 flex flex-col">
                    <span className="text-[10px] font-mono text-gold-warm tracking-widest uppercase">
                      {selectedProject.tagline}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-medium text-white tracking-wide mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Core Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                  
                  {/* Left Column: Long description and outcomes (8 cols) */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex flex-col">
                      <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                        THE CHALLENGE ARCHITECTURE
                      </h4>
                      <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Challenge list */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                        <HelpCircle className="w-4 h-4 text-amber-500" />
                        <h5 className="text-xs font-mono text-zinc-300 font-medium tracking-wide uppercase">
                          CRITICAL BOTTLENECK
                        </h5>
                      </div>
                      <div className="flex flex-col gap-2">
                        {selectedProject.challenges.map((challenge, i) => (
                          <div key={i} className="flex items-start gap-3 bg-zinc-950/40 border border-white/5 p-3 rounded-lg">
                            <span className="text-xs font-mono text-amber-500 mt-0.5">0{i+1}</span>
                            <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                              {challenge}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes list */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <h5 className="text-xs font-mono text-zinc-300 font-medium tracking-wide uppercase">
                          ENGINEERED RESOLUTIONS
                        </h5>
                      </div>
                      <div className="flex flex-col gap-2">
                        {selectedProject.outcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start gap-3 bg-zinc-950/40 border border-white/5 p-3 rounded-lg">
                            <span className="text-xs font-mono text-emerald-500 mt-0.5">✓</span>
                            <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                              {outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Stats panel, Tech badging, Links (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Metrics Panel */}
                    <div className="p-5 rounded-xl bg-black/60 border border-white/5 flex flex-col gap-4">
                      <h4 className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase border-b border-white/5 pb-2">
                        QUANTITATIVE METRICS
                      </h4>
                      <div className="flex flex-col gap-3">
                        {selectedProject.stats.map((stat) => (
                          <div key={stat.label} className="flex justify-between items-baseline">
                            <span className="text-[10px] font-mono text-zinc-400">{stat.label}</span>
                            <span className="text-xs font-mono text-gold-warm font-medium">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges Panel */}
                    <div className="flex flex-col gap-2.5">
                      <h4 className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                        TECHNOLOGIES DEPLOYED
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono text-white bg-white/5 px-2.5 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-gold-warm hover:bg-gold-light text-matte-black font-sans font-medium text-xs tracking-widest uppercase rounded-xl transition-all duration-300 hover:glow-gold cursor-none"
                        data-cursor="GO LIVE"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-sans font-medium text-xs tracking-widest uppercase rounded-xl border border-white/10 transition-all duration-300 cursor-none"
                        data-cursor="SOURCE"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    </div>
                  </div>

                </div>

                {/* Footer status line */}
                <div className="px-6 py-3 bg-matte-black border-t border-white/5 shrink-0 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                  <span>SECURE CASE STUDY ARCHIVE // {selectedProject.id.toUpperCase()}</span>
                  <span>RISHAV GHOSH ENGINEERING LABS</span>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
