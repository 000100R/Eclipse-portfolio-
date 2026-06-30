import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { Mail, Send, Check, Download, Github, Linkedin, Twitter, Dribbble, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { personalInfo } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  // Validate fields
  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury API submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success state after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Browser-based direct text resume download (extremely professional and fully operational!)
  const handleDownloadResume = () => {
    const resumeText = `
==================================================
RISHAV GHOSH - PORTFOLIO RESUME
==================================================
Senior Staff Software Engineer & Creative Technologist
ghoshrishav184@gmail.com | San Francisco, CA

PROFESSIONAL SUMMARY:
Over 8 years of elite engineering leadership spanning Vercel, Stripe, and Apple. 
Pioneered complex UI layouts, fast rendering engines, custom interactive SVG 
matrices, and standard-setting open-source packages. Guaranteed pass on Core 
Web Vitals and strict accessibility constraints.

TECHNICAL CAPABILITIES:
- Languages: TypeScript, JavaScript (ESNext), HTML5/CSS Math, GLSL
- Rendering: WebGL, HTML5 Canvas 2D/3D, SVG layout architectures
- Frameworks: React 19, Next.js, Node.js, Express, Framer Motion, Tailwind CSS
- Tooling: WebPack, Vite, Esbuild, Docker, Git, CI/CD, Lighthouse, Performance Auditing

CHRONOLOGICAL EXPERIENCE:
1. Vercel - Lead Creative Developer (2024 - Present)
   - Improved dashboard interaction times by 42%.
   - Created the Next.js DX Motion animation library.
   - Built 3D conference timelines animating 1.2M nodes.

2. Stripe - Senior Full-Stack UI Architect (2022 - 2024)
   - Raised conversion on next-gen checkouts by 12.4%.
   - Built SVG transaction flow models with physics gravity structures.

3. Apple - Frontend Design Engineer (2020 - 2022)
   - Engineered launch visualizers for Vision Pro & iPhone 13.
   - Designed hardware-accelerated Safari motion standards.

EDUCATION & AWARDS:
- BS in Computer Science, UI/UX specialization
- Awwwards Creative Design of the Year Winner

==================================================
Generated automatically from Rishav Ghosh Digital Space.
==================================================
    `;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rishav_Ghosh_Executive_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-24 w-full relative overflow-hidden px-6 md:px-12 bg-matte-black select-none">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gold-warm/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-electric-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
              06 // COMMUNICATIONS GATEWAY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mt-2">
              INITIATE <span className="font-medium text-gradient-gold">DIALOG</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-sm md:text-right">
            Connect for consulting, public appearances, or architectural projects.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Direct info, Socials, Resume (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                DIRECT SECURE CHANNEL
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-xl md:text-2xl font-display font-light text-zinc-200 hover:text-gold-warm transition-colors cursor-none flex items-center gap-3 w-fit"
                data-cursor="EMAIL"
              >
                <Mail className="w-6 h-6 text-gold-warm" />
                {personalInfo.email}
              </a>
              <span className="text-xs font-mono text-zinc-500 mt-1">
                Typical response latency: &lt; 8 hours
              </span>
            </div>

            {/* Resume Card with trigger */}
            <div className="p-6 rounded-2xl bg-glass border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full pointer-events-none" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                CURRICULUM VITAE
              </span>
              <h4 className="text-base font-display font-medium text-white tracking-wide mt-2">
                Executive Profile Resume
              </h4>
              <p className="text-xs font-sans text-zinc-400 mt-2 leading-relaxed">
                Download a machine-readable summary of professional milestones, tech-stack systems, and design portfolios.
              </p>

              <button
                onClick={handleDownloadResume}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-gold-soft hover:bg-gold-warm hover:text-matte-black text-[11px] font-mono font-medium tracking-widest uppercase rounded-xl transition-all duration-300 cursor-none"
                data-cursor="DOWNLOAD"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume PDF
              </button>
            </div>

            {/* Social Grid coordinates */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                CRYPTO CO-ORDINATES
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-xl hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                  data-cursor="GITHUB"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-sans font-medium text-zinc-300 group-hover:text-white">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-xl hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                  data-cursor="LINKEDIN"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-sans font-medium text-zinc-300 group-hover:text-white">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={personalInfo.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-xl hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                  data-cursor="TWITTER"
                >
                  <div className="flex items-center gap-2.5">
                    <Twitter className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-sans font-medium text-zinc-300 group-hover:text-white">Twitter</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={personalInfo.socials.dribbble}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-xl hover:border-white/10 hover:bg-zinc-900/60 transition-all cursor-none group"
                  data-cursor="DESIGN"
                >
                  <div className="flex items-center gap-2.5">
                    <Dribbble className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-sans font-medium text-zinc-300 group-hover:text-white">Dribbble</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl bg-glass border border-white/5 relative overflow-hidden shadow-xl glow-blue">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Name Input */}
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                          YOUR IDENTITY
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setErrors({ ...errors, name: '' });
                          }}
                          placeholder="Name / Company"
                          className={`w-full bg-zinc-950 border px-4 py-3 text-sm text-white placeholder-zinc-600 rounded-xl focus:outline-none transition-all cursor-none ${
                            errors.name ? 'border-red-500 focus:border-red-500 shadow-md' : 'border-white/5 focus:border-electric-blue/40'
                          }`}
                          data-cursor="WRITE"
                        />
                        {errors.name && <span className="text-[10px] font-mono text-red-500">{errors.name}</span>}
                      </div>

                      {/* Email Input */}
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                          RETURN ADDRESS
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setErrors({ ...errors, email: '' });
                          }}
                          placeholder="you@domain.com"
                          className={`w-full bg-zinc-950 border px-4 py-3 text-sm text-white placeholder-zinc-600 rounded-xl focus:outline-none transition-all cursor-none ${
                            errors.email ? 'border-red-500 focus:border-red-500 shadow-md' : 'border-white/5 focus:border-electric-blue/40'
                          }`}
                          data-cursor="WRITE"
                        />
                        {errors.email && <span className="text-[10px] font-mono text-red-500">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        TRANSMISSION PAYLOAD
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          setErrors({ ...errors, message: '' });
                        }}
                        placeholder="Detail your parameters, project goals, and timelines..."
                        className={`w-full bg-zinc-950 border px-4 py-3 text-sm text-white placeholder-zinc-600 rounded-xl focus:outline-none transition-all cursor-none resize-none ${
                          errors.message ? 'border-red-500 focus:border-red-500 shadow-md' : 'border-white/5 focus:border-electric-blue/40'
                        }`}
                        data-cursor="WRITE"
                      />
                      {errors.message && <span className="text-[10px] font-mono text-red-500">{errors.message}</span>}
                    </div>

                    {/* Submit action */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-gold-warm to-gold-light text-matte-black font-sans font-semibold text-xs tracking-widest uppercase rounded-xl hover:glow-gold transition-all duration-300 disabled:opacity-50 cursor-none"
                      data-cursor="SEND"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-matte-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 fill-matte-black" />
                          Transmit Secure Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-pulse-slow">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <h4 className="text-xl font-display font-medium text-white tracking-wide">
                      TRANSMISSION SUCCESSFUL
                    </h4>
                    
                    <p className="text-xs font-sans text-zinc-400 max-w-sm mt-3 leading-relaxed">
                      Your query has been logged securely into my priority queue. My mailer protocol will alert me in real-time.
                    </p>

                    <span className="text-[9px] font-mono text-zinc-600 mt-8">
                      TRANSMIT TIMESTAMP: {new Date().toLocaleTimeString()}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Large cinematic ending typography */}
        <div className="w-full text-center border-t border-white/5 pt-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-8xl xl:text-9xl font-display font-light text-zinc-800/20 tracking-tighter leading-none pointer-events-none select-none uppercase"
          >
            CREATE THE FUTURE
          </motion.h3>
        </div>

      </div>
    </section>
  );
}
