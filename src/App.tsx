import { useState, useEffect } from 'react';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingAssistant from './components/FloatingAssistant';
import CommandPalette from './components/CommandPalette';
import { startAmbientSound, stopAmbientSound } from './utils/synthesizer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Toggle synthesized ambient music using Web Audio API
  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopAmbientSound();
      setIsMusicPlaying(false);
    } else {
      startAmbientSound();
      setIsMusicPlaying(true);
    }
  };

  // Keyboard shortcut listener for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle resume download directly from the command palette
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
    <>
      {/* Ambient Constellation Network Backdrop */}
      <CanvasBackground />

      {/* Screen Interactive Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Preloader */}
      <PageLoader onComplete={() => setIsLoading(false)} />

      {/* Main Content Layout Wrapper */}
      {!isLoading && (
        <div id="portfolio-app-root" className="relative z-10 select-none animate-fade-in duration-1000">
          
          {/* Glass Navbar */}
          <Navbar
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onToggleMusic={toggleMusic}
            isMusicPlaying={isMusicPlaying}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />

          {/* Core Visual Sections */}
          <main>
            {/* Hero Banner Area */}
            <Hero
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onOpenAssistant={() => setIsAssistantOpen(true)}
            />

            {/* About / Story / Biography Area */}
            <About />

            {/* Experience timeline */}
            <Experience />

            {/* Selected Projects Showcase */}
            <Projects />

            {/* Skills / Matrices Category Grid */}
            <Skills />

            {/* Visual Workspace Gallery */}
            <Gallery />

            {/* Contact Portal and Socials Form */}
            <Contact />
          </main>

          {/* Minimalist Footer bar */}
          <Footer />

          {/* Floating Neural Chatbot Assistant */}
          <FloatingAssistant
            isOpen={isAssistantOpen}
            onClose={() => setIsAssistantOpen(false)}
            onOpen={() => setIsAssistantOpen(true)}
          />

          {/* Keyboard-triggered Search Spotlight Command Console */}
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onToggleMusic={toggleMusic}
            isMusicPlaying={isMusicPlaying}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onDownloadResume={handleDownloadResume}
          />

        </div>
      )}
    </>
  );
}
