import { useState, useEffect } from 'react';
import SpaceBackground from './components/Background/SpaceBackground';
import { useScrollProgress } from './hooks/useScrollProgress';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './sections/Projects';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AskRishav from './components/AI/AskRishav';
import CommandPalette from './components/CommandPalette';
import { startAmbientSound, stopAmbientSound } from './utils/synthesizer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const scrollProgress = useScrollProgress();

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
Developer • AI Enthusiast • Creative Technologist
ghoshrishav184@gmail.com | Kolkata, West Bengal, India
Phone: 7439868702 | GitHub: github.com/000100R

PROFESSIONAL SUMMARY:
Dynamic Creative Technologist and Developer bridging the gap between high-end 
graphic design, mobile video curation, and modern front-end technologies. 
Combines advanced Canva curation, YouTube channel management, and structured 
prompt engineering with custom React layouts to build elegant, cinematic, 
and highly optimized digital experiences.

TECHNICAL CAPABILITIES:
- Web Design & Development: React, TypeScript, HTML5, CSS Columns, Tailwind CSS, Framer Motion
- Creative Suite: Canva Pro (Thumbnails, Brand Vectors, Logo Layouts), Video Production & Editing
- AI & Prompt Engineering: Custom Context Prompting, LLM research pipelines, Foundational ML/DL/CV
- Data & Productivity: MS Excel Analytics (Engagement index maps), MS Word, Remote Team Management

EDUCATION:
- Higher Secondary Certificate - Mukul Bose Memorial Institution (Kolkata, India)

CHRONOLOGICAL EXPERIENCE:
1. YouTube Content Creator & Channel Manager (2023 - Present)
   Self-Managed / Personal Channel & Social Pages | Kolkata, India / Remote
   - Scripted, filmed, edited, and published engaging video content end-to-end via YouTube Studio.
   - Designed high-impact thumbnails and branding layouts using Canva Pro to build cohesive aesthetics.
   - Built and managed digital reach and scheduling across Instagram and Facebook.
   
2. AI-Assisted Content Researcher & Tech Explorer (2024 - Present)
   Freelance & Learning Ecosystem | Kolkata, India
   - Developed custom prompt library to automate content briefs, scripts, and keyword research.
   - Maintained audience metrics, content calendars, and growth logs using advanced MS Excel formulas.
   - Explored foundational neural architectures, CNN layers, and computer vision models.

REAL PROJECTS PREVIEW:
- Project Eclipse (2026): A cinematic React + Three.js design system with touch-fallback cursors.
- Laya Sutra (2026): A multi-layered, interactive 4D parallax temple festival invitation.
- Shilpi Art (2026): A glassmorphic exhibition and visual portfolio curation site.

==================================================
Generated automatically from Rishav Ghosh Digital Space (2026).
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
      {/* Ambient Space Backdrop with performance tiers and scroll parallax */}
      <SpaceBackground scrollProgress={scrollProgress} />

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
          <AskRishav
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
