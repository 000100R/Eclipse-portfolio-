export type ProjectCategory = "Web Development" | "AI" | "Creative" | "Social Media";

export interface CaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  year: string;
  tech: string[];
  color: string;           // accent for poster tint
  gradient: string;        // card background gradient
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageAlt: string;
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    id: "project-eclipse",
    title: "Project Eclipse",
    subtitle: "Portfolio OS",
    description:
      "A cinematic portfolio experience built as a full-stack design system. Three.js particle assembly, GSAP scroll choreography, glassmorphism UI — engineered to feel like an Awwwards winner.",
    category: "Web Development",
    year: "2025",
    tech: ["React", "TypeScript", "Three.js", "GSAP", "Framer Motion", "Tailwind"],
    color: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: true,
    githubUrl: "https://github.com/rishavghosh/project-eclipse",
    liveUrl: "#",
    imageAlt: "Project Eclipse portfolio website",
    caseStudy: {
      overview:
        "Project Eclipse is a full-scale portfolio operating system — not a template. Every component, every animation, every token was designed from scratch to express a singular cinematic aesthetic.",
      challenge:
        "Portfolios are commoditised. The brief was to create something that reads as an art direction piece, not a developer CV — while still being fast, accessible, and genuinely useful.",
      solution:
        "Built on a custom design system (Eclipse Design Language) with a two-accent constraint (electric blue + gold), Fraunces display type, and a component architecture mirroring Linear's engineering standards. Three.js particle portrait as the hero loader doubles as the brand statement.",
      outcome:
        "95+ Lighthouse score. Sub-2s FCP. WCAG AA compliant. An experience that functions as both a portfolio and a proof of capability.",
    },
  },
  {
    id: "laya-sutra",
    title: "Laya-Sutra",
    subtitle: "The Pulse of Tradition",
    description:
      "A luxury digital invitation for the 2nd Annual Manjistha Utsav. Temple hall aesthetics, Nataraja imagery, golden particles, volumetric oil lamp lighting, and 4D mouse-driven parallax — assembled as a single HTML file.",
    category: "Creative",
    year: "2024",
    tech: ["HTML", "CSS", "JavaScript", "Three.js", "GSAP", "Canvas API"],
    color: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.10) 0%, rgba(180,100,20,0.06) 60%)",
    featured: true,
    liveUrl: "#",
    imageAlt: "Laya-Sutra digital invitation with temple aesthetics",
    caseStudy: {
      overview:
        "A digital event invitation for Manjistha Utsav, a classical Indian dance and music festival. The brief demanded the weight and reverence of a printed programme — in a browser.",
      challenge:
        "Classical Indian cultural aesthetics are rich, layered, and easy to reduce to kitsch. The challenge was to translate temple architecture, sacred geometry, and warm ceremonial light into a web medium without losing their gravitas.",
      solution:
        "A full-bleed immersive experience: SVG Nataraja silhouette on a CSS-animated radial backdrop, a Three.js golden particle field drifting like incense smoke, and a mouse-reactive 4D parallax system with six depth layers. Oil lamp glows rendered as radial gradients with animated opacity.",
      outcome:
        "Delivered as a zero-dependency single HTML file deployable as an email attachment or hosted link. Viewed on mobile and desktop equally — fully responsive with touch parallax fallback.",
    },
  },
  {
    id: "ask-rishav",
    title: "Ask Rishav",
    subtitle: "AI Portfolio Assistant",
    description:
      "An offline-first AI assistant with local knowledge base, score-based semantic matching, typing simulation, and a glassmorphic chat panel. No API keys. No external calls.",
    category: "AI",
    year: "2025",
    tech: ["React", "TypeScript", "Framer Motion", "NLP (local)", "Tailwind"],
    color: "#3b82ff",
    gradient: "linear-gradient(135deg, rgba(59,130,255,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: false,
    githubUrl: "https://github.com/rishavghosh/ask-rishav",
    imageAlt: "Ask Rishav AI chat assistant interface",
    caseStudy: {
      overview:
        "Most portfolio contact forms go unanswered for days. Ask Rishav is an always-on assistant that answers recruiter and client questions instantly — without any backend or API costs.",
      challenge:
        "Building a convincingly intelligent assistant without LLM APIs. The system needs to handle natural language questions across 11 knowledge domains reliably.",
      solution:
        "Keyword-scored matching engine where each knowledge entry carries a weighted keyword list. Longer, more specific keyword matches score higher — preventing short stopwords from misfiring. Responses include deep links back into relevant portfolio sections.",
      outcome:
        "Zero runtime cost. Fully offline. Handles 95% of recruiter questions (who, skills, projects, availability, contact) with human-quality responses. Ships as 4KB of TS.",
    },
  },
  {
    id: "creative-reel",
    title: "Creative Reel",
    subtitle: "Motion & Film Direction",
    description:
      "A curated body of film direction, motion design, and branded content. Event coverage, short-form documentary, title sequences, and visual identity in motion.",
    category: "Creative",
    year: "2024",
    tech: ["DaVinci Resolve", "After Effects", "Premiere Pro", "Blender", "Cinema 4D"],
    color: "#8a8f98",
    gradient: "linear-gradient(135deg, rgba(138,143,152,0.10) 0%, rgba(8,9,11,0) 60%)",
    featured: false,
    liveUrl: "https://youtube.com/@rishavghosh",
    imageAlt: "Creative direction reel thumbnail",
    caseStudy: {
      overview:
        "A compiled body of motion and film work spanning branded event coverage, short documentary, and motion-design identity work for cultural organisations.",
      challenge:
        "Cinematic quality on production budgets that are a fraction of commercial rates — requiring creative economy in every department.",
      solution:
        "Developed a personal visual grammar: high-contrast black & white for archival weight, shallow depth of field for intimacy, and a warm grade for cultural events. Post-production in DaVinci Resolve with custom LUTs.",
      outcome:
        "Work featured across event communications for established cultural institutions. Building toward a standalone director's reel.",
    },
  },
  {
    id: "brand-social",
    title: "Brand Content System",
    subtitle: "Social Media Direction",
    description:
      "A systematic visual identity and content architecture for a brand's social presence. Templates, motion graphics, and a repeatable production pipeline.",
    category: "Social Media",
    year: "2024",
    tech: ["Figma", "After Effects", "Photoshop", "Illustrator", "Canva Pro"],
    color: "#3b82ff",
    gradient: "linear-gradient(135deg, rgba(59,130,255,0.08) 0%, rgba(8,9,11,0) 60%)",
    featured: false,
    imageAlt: "Brand social media content system",
    caseStudy: {
      overview:
        "A cohesive content architecture for a brand's multi-platform social presence — Instagram, YouTube, and LinkedIn. Covers static posts, Reels/Shorts, and Stories.",
      challenge:
        "Maintaining visual consistency across formats and team members without sacrificing the spontaneity that performs on social media.",
      solution:
        "A modular Figma template system with locked brand elements and unlocked content zones. Motion graphic components built as After Effects presets for the production team.",
      outcome:
        "Reduced per-post production time by 60%. Visual consistency score improved significantly in monthly brand audits.",
    },
  },
  {
    id: "ai-workflow",
    title: "AI Dev Tooling",
    subtitle: "Workflow Automation",
    description:
      "A suite of AI-assisted development tools: CLI utilities, prompt engineering templates, and LLM integration patterns for frontend workflows.",
    category: "AI",
    year: "2025",
    tech: ["Python", "Node.js", "OpenAI API", "Anthropic SDK", "Shell", "TypeScript"],
    color: "#3b82ff",
    gradient: "linear-gradient(135deg, rgba(59,130,255,0.10) 0%, rgba(30,58,110,0.06) 60%)",
    featured: false,
    githubUrl: "https://github.com/rishavghosh",
    imageAlt: "AI development workflow tooling",
    caseStudy: {
      overview:
        "A personal toolkit of AI-assisted utilities built to reduce friction in daily development and creative workflows.",
      challenge:
        "LLM integrations often add complexity rather than removing it — brittle prompts, inconsistent output, and slow iteration loops.",
      solution:
        "Built opinionated wrappers around API clients with structured output schemas, retry logic, and prompt versioning. CLI-first design so tools compose with existing shell workflows.",
      outcome:
        "50%+ reduction in time spent on repetitive development tasks. Patterns documented and open-sourced on GitHub.",
    },
  },
];

export const CATEGORIES: ProjectCategory[] = [
  "Web Development",
  "AI",
  "Creative",
  "Social Media",
];
