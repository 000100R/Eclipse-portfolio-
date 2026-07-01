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
      "A cinematic portfolio experience and custom-built design system with fluid WebGL canvas particles, parallax scrolls, and touch-sensitive custom cursor mechanics.",
    category: "Web Development",
    year: "2026",
    tech: ["React", "TypeScript", "Framer Motion", "WebGL", "GSAP ScrollTrigger", "Tailwind"],
    color: "#d4af37",
    gradient: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: true,
    githubUrl: "https://github.com/000100R",
    liveUrl: "https://github.com/000100R",
    imageAlt: "Project Eclipse portfolio ecosystem",
    caseStudy: {
      overview:
        "Project Eclipse is a bespoke creative developer workspace and portfolio engineered with precise motion choreography and responsive canvas background layers.",
      challenge:
        "Making a high-performance interactive experience that renders consistently across both responsive touchpoints and high-end desktop displays.",
      solution:
        "Designed with a custom event-loop for smooth scrolling, active viewport-tracked animations, and pointer-fallback logic for touch-screen mobile devices.",
      outcome:
        "Buttery-smooth 60fps animations, fully responsive, and zero-error TypeScript compiled outputs.",
    },
  },
  {
    id: "laya-sutra",
    title: "Laya Sutra",
    subtitle: "The Pulse of Tradition",
    description:
      "A luxury immersive digital invitation showcasing classical temple arts. Integrated golden dust particle fields, volumetric lighting glows, and layered 4D parallax scrolling.",
    category: "Creative",
    year: "2026",
    tech: ["HTML5", "CSS Math", "JavaScript", "Three.js", "GSAP", "Canvas API"],
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: true,
    githubUrl: "https://github.com/000100R",
    liveUrl: "https://github.com/000100R",
    imageAlt: "Laya Sutra classic invitation portal",
    caseStudy: {
      overview:
        "A premium cultural digital workspace capturing the depth of physical paper and oil-lamp glows in a browser format.",
      challenge:
        "Recreating delicate ceremonial aesthetics like incense drifting smoke without clogging the browser main thread.",
      solution:
        "Utilized lightweight 2D HTML Canvas particle pools and mathematical radial gradients instead of heavy asset textures.",
      outcome:
        "An evocative, zero-dependency digital artifact that functions instantly on all modern smartphones and browsers.",
    },
  },
  {
    id: "shilpi-art",
    title: "Shilpi Art",
    subtitle: "Premium Illustration Portal",
    description:
      "A custom-crafted digital exhibition venue displaying design portfolios under modern, minimal typography and fluid glassmorphic structures.",
    category: "Web Development",
    year: "2026",
    tech: ["HTML5", "CSS Grid", "JavaScript", "Canva Pro", "Responsive Layouts"],
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: true,
    githubUrl: "https://github.com/000100R",
    liveUrl: "https://000100r.github.io/shilpi-art/",
    imageAlt: "Shilpi Art presentation portal",
    caseStudy: {
      overview:
        "Shilpi Art functions as a sleek gallery environment designed to highlight digital illustration and vectors with complete fidelity.",
      challenge:
        "Achieving pixel-perfect alignment of diverse aspect-ratio art boards while keeping the site's scrolling experience weightless.",
      solution:
        "Constructed with modern responsive CSS columns and custom media targets to eliminate layout shift or jitter.",
      outcome:
        "Adopted as the definitive presentation hub for a series of high-impact creative vectors.",
    },
  },
  {
    id: "ask-rishav-ai",
    title: "Ask Rishav AI",
    subtitle: "Intelligent Assistant",
    description:
      "An intelligent AI assistant integrated into my portfolio that answers questions about my skills, education, projects, experience, resume and contact information using a local knowledge base.",
    category: "AI",
    year: "2026",
    tech: ["React", "TypeScript", "Framer Motion", "Local AI Knowledge Base"],
    color: "#a855f7",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: true,
    imageAlt: "Ask Rishav AI Assistant Interface",
    caseStudy: {
      overview:
        "Ask Rishav AI is a custom conversational assistant integrated directly into the portfolio's core ecosystem (Project Eclipse). It enables visitors to explore Rishav's professional and creative path in real-time.",
      challenge:
        "Developing a responsive, conversational-style assistant with zero remote server dependency, avoiding network latency or loading failures.",
      solution:
        "Built a glassmorphic floating widget using a local weighted keyword NLP matching engine with beautiful typing animations and rapid suggested queries.",
      outcome:
        "Delivered ultra-fast local responses, standard-setting mobile responsiveness, and high engagement through interactive suggestions.",
    },
  },
  {
    id: "workflow-optimizer",
    title: "AI-Assisted Workflow Optimizer",
    subtitle: "Generative Prompt System",
    description:
      "An advanced prompt engineering toolkit designed to automate video scriptwriting, brand metadata, and creative content briefs with strict context parameters.",
    category: "AI",
    year: "2026",
    tech: ["Prompt Engineering", "Large Language Models", "Metadata SEO", "MS Excel Tracking"],
    color: "#818cf8",
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: false,
    githubUrl: "https://github.com/000100R",
    imageAlt: "AI Prompt workflow optimizer",
    caseStudy: {
      overview:
        "A structured prompt framework designed to turn standard chat-based LLMs into precise content research and metadata scripting assistants.",
      challenge:
        "Preventing generic and cliché model outputs to ensure the generated scripting captures genuine creator identity and pacing.",
      solution:
        "Introduced strict formatting patterns, detailed role-playing directives, and structured data-logging templates.",
      outcome:
        "Slashed scripting research time by over 50% while maintaining absolute personal tone consistency.",
    },
  },
  {
    id: "brand-curation",
    title: "YouTube & Brand Curation",
    subtitle: "Digital Platform Growth",
    description:
      "A comprehensive showcase in organic community growth, covering thumbnail graphic design in Canva, mobile video editing, and Excel-driven engagement analysis.",
    category: "Social Media",
    year: "2026",
    tech: ["YouTube Studio", "Canva Pro", "Video Editing", "Excel Data Tracking"],
    color: "#ef4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(8,9,11,0) 60%)",
    featured: false,
    liveUrl: "https://youtube.com/@rawentity-202",
    imageAlt: "YouTube Channel and Brand Growth",
    caseStudy: {
      overview:
        "A professional, systematic approach to platform growth, visual assets branding, and audience retention tracking across multiple platforms.",
      challenge:
        "Consistently producing high-impact visuals and optimized metadata while maintaining active community outreach timelines.",
      solution:
        "Developed modular Figma and Canva layouts with locked brand grids, combined with structured scheduling files.",
      outcome:
        "Achieved steady organic growth metrics, cohesive visual style consistency, and seamless publishing pipelines.",
    },
  },
];

export const CATEGORIES: ProjectCategory[] = [
  "Web Development",
  "AI",
  "Creative",
  "Social Media",
];
