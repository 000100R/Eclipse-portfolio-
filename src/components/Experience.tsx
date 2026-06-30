import { motion } from 'motion/react';
import { portfolioData } from '../data';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-24 w-full relative overflow-hidden px-6 md:px-12 bg-matte-black select-none">
      {/* Background radial gradient halos */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-electric-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-gold-warm/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-electric-light uppercase">
              02 // PROFESSIONAL CHRONICLE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mt-2">
              TIMELINE OF <span className="font-medium text-gradient-blue">LEADERSHIP</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-sm md:text-right">
            A chronological timeline of building organic audiences, premium brands, and exploring AI.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-6 md:pl-16 flex flex-col gap-16">
          
          {experiences.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connecting Dot/Logo indicator */}
                <div className="absolute -left-[31px] md:-left-[85px] top-0 w-12 h-12 rounded-xl bg-luxury-gray border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-electric-blue group-hover:glow-blue">
                  <span className="text-sm font-display text-white select-none">
                    {exp.logoText}
                  </span>
                </div>

                {/* Main Experience Glass Card */}
                <div className="p-6 md:p-8 rounded-2xl bg-glass border border-white/5 group-hover:border-white/10 transition-all duration-300 relative overflow-hidden">
                  
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-bl-full pointer-events-none" />

                  {/* Top Meta info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-col">
                      <h3 className="text-xl md:text-2xl font-display font-light text-white tracking-wide">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono text-gold-warm font-medium tracking-widest uppercase mt-1">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-col md:items-end gap-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 md:justify-end">
                        <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Accomplishment lists */}
                  <div className="flex flex-col gap-3 mb-8">
                    {exp.description.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-electric-light shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm font-sans text-zinc-400 leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Experience tech-badges */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-mono font-medium tracking-widest text-zinc-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-md uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
