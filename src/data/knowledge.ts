/**
 * knowledge.ts
 * Local knowledge base for the Ask Rishav AI assistant.
 * Single source of truth — updated with Rishav Ghosh's authentic profile.
 * Fully offline, NLP keyword-scored matching engine.
 */

export interface KnowledgeEntry {
  id: string;
  label: string;
  keywords: string[];
  answer: string;
  links?: { label: string; href: string }[];
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "about",
    label: "Who is Rishav Ghosh?",
    keywords: ["who", "about", "rishav", "ghosh", "profile", "background", "introduce", "whois", "bio"],
    answer:
      "Rishav Ghosh is a Developer, AI Enthusiast, and Creative Technologist based in Kolkata, West Bengal, India. He bridges the gap between modern web development, eye-catching visual design, and cinematic digital storytelling. By pairing hands-on platform curation with a strong understanding of artificial intelligence, Rishav builds highly immersive web experiences that feel deliberate, fluid, and premium.",
    links: [{ label: "Read Story", href: "#about" }],
  },
  {
    id: "skills",
    label: "Skills & Stack",
    keywords: ["skill", "stack", "tech", "technology", "language", "framework", "tool", "use", "know", "expertise", "canva", "excel", "react"],
    answer:
      "Rishav has developed a versatile cross-disciplinary skill set spanning creative production, web interface design, and AI workflows:\n\n• **Creative & Graphic Design** — Canva Graphic Design (expert thumbnails, banners, custom vectors), mobile & desktop video editors (audio synchronization, color grading, pacing), and platform content branding.\n• **Web Development** — React, TypeScript, Tailwind CSS, Framer Motion, HTML5, CSS columns/layouts, and responsive interface building.\n• **AI & Prompt Engineering** — Context-aware structured prompt engineering, AI-assisted content research, large language model automation, and foundational concepts of Machine Learning, Deep Learning, and Computer Vision (CNNs, neural perception).\n• **Office & Data Analytics** — Advanced Microsoft Excel (audience retention tracking, record sorting, formulas) and structured MS Word script formatting.\n• **Productivity** — Remote work coordination, rapid turnarounds, and structured file architecture.",
    links: [{ label: "View Skills", href: "#skills" }],
  },
  {
    id: "experience",
    label: "Experience",
    keywords: ["experience", "work", "job", "career", "company", "role", "position", "chronicle", "history", "timeline"],
    answer:
      "Rishav operates as a self-managed creative and remote tech explorer. His core experience covers:\n\n• **YouTube Content Creator & Channel Manager (2023 - Present)**: Scripting, filming, editing, metadata SEO, and thumbnail curation. Designed professional brand identities in Canva and built an organic community.\n• **AI Content Researcher & Explorer (2024 - Present)**: Integrating generative AI into digital content pipelines, automating research documentation, and organizing structured logs/audience analytics in MS Excel.\n• **Creative Web Interface Curation**: Directing and developing customized client visual portfolios and invitations, like Shilpi Art and Laya Sutra, using modern front-end layout strategies.",
    links: [{ label: "Explore Timeline", href: "#experience" }],
  },
  {
    id: "education",
    label: "Education",
    keywords: ["education", "study", "degree", "university", "college", "school", "qualification", "high school", "credential"],
    answer:
      "Rishav holds a Higher Secondary Certificate from the Mukul Bose Memorial Institution in Kolkata, India. He reinforces his academic baseline with continuous, self-directed deep dives into software engineering, advanced UI motion physics, graphic design layout rules, and modern artificial intelligence architectures.",
  },
  {
    id: "projects",
    label: "Projects Overview",
    keywords: ["projects", "built", "made", "portfolio", "work", "apps", "websites", "curation", "case study", "shilpi", "laya", "eclipse"],
    answer:
      "Rishav has created several high-impact creative and technical projects in 2026:\n\n• **Project Eclipse** — A cinematic portfolio operating system built with React, TypeScript, and Three.js canvas backgrounds.\n• **Laya Sutra** — An immersive, luxury digital classical dance invitation featuring golden particle drift, volumetric lighting, and mouse-reactive 4D parallax scrolls.\n• **Shilpi Art** — A premium online illustration and artwork exhibition space with smooth glassmorphic cards and elegant typography.\n• **AI-Assisted Workflow Optimizer** — An advanced prompt engineering framework that speeds up creative scripting and metadata research by 2x.",
    links: [{ label: "Browse Projects", href: "#projects" }],
  },
  {
    id: "project-eclipse",
    label: "Project Eclipse",
    keywords: ["eclipse", "project-eclipse", "portfolio-os", "three.js", "particles", "loader", "webgl"],
    answer:
      "Project Eclipse is Rishav's own digital workspace and portfolio. Built in 2026 using React, TypeScript, and Framer Motion, it features a fluid WebGL particle assembly as a background, a custom performance-optimized mouse trail custom cursor (with automatic touch fallback), and beautiful, choreographed scrolling. It serves as both his hub and a testament to his engineering standards.",
    links: [{ label: "View Case Study", href: "#projects" }],
  },
  {
    id: "laya-sutra",
    label: "Laya Sutra",
    keywords: ["laya", "sutra", "laya-sutra", "invitation", "manjistha", "utsav", "temple", "nataraja"],
    answer:
      "Laya Sutra is an immersive, luxury digital invitation designed in 2026 for the 2nd Annual Manjistha Utsav (a classical Indian dance festival). It features rich temple aesthetics, golden dust particle drifts simulating burning incense smoke, custom radial oil-lamp glow animations, and a smooth, multi-layered 4D mouse-parallax scrolling experience.",
    links: [{ label: "Check Laya Sutra", href: "#projects" }],
  },
  {
    id: "shilpi-art",
    label: "Shilpi Art",
    keywords: ["shilpi", "art", "shilpi-art", "gallery", "illustration", "vector", "exhibition"],
    answer:
      "Shilpi Art is a custom-curated, premium exhibition gallery designed to display artistic portfolios, vector layouts, and illustrations. Developed with a high-contrast cinematic layout, glassmorphic cards, and zero layout shift, it lets digital artists present their work under a highly polished, museum-grade light.",
    links: [{ label: "Launch Shilpi Art", href: "https://000100r.github.io/shilpi-art/" }],
  },
  {
    id: "github",
    label: "GitHub Profile",
    keywords: ["github", "code", "repo", "repository", "source", "000100R"],
    answer:
      "Rishav's open-source projects, web layout experiments, and creative structures are hosted on GitHub under the username **000100R**. His repositories highlight clean, reusable styling, modular TypeScript logic, and custom WebGL explorations.",
    links: [{ label: "GitHub Profile", href: "https://github.com/000100R" }],
  },
  {
    id: "youtube",
    label: "YouTube Channel",
    keywords: ["youtube", "video", "channel", "content", "subscribe", "subscribers", "upload", "vlog", "rawentity"],
    answer:
      "Rishav manages a professional, self-branded YouTube channel called **@rawentity-202**. On his channel, he publishes creative process logs, video editing breakdowns, and technical explanations of AI and design methodologies. He curates the entire channel pipeline, from scripting and video pacing to Canva thumbnail design.",
    links: [{ label: "Visit YouTube", href: "https://youtube.com/@rawentity-202" }],
  },
  {
    id: "creative-works",
    label: "Creative Works",
    keywords: ["creative", "works", "video editing", "graphic design", "editing", "facebook", "content", "creation", "design"],
    answer:
      "Rishav's creative portfolio is highly active across several platforms:\n\n• **Web Development**: Creating smooth, responsive interfaces (Shilpi Art, Project Eclipse) styled with glassmorphism and custom animation trails.\n• **Graphic Design**: Custom branded banners, professional YouTube thumbnails, and high-conversion vector assets created in Canva Pro.\n• **Video Editing**: High-impact storytelling, seamless pacing, and audio synchronization on mobile and desktop editors.\n• **Social Media Curation**: Designing and scheduling content across Facebook and Instagram to drive organic engagement, backed by data logs maintained in MS Excel.",
    links: [{ label: "Browse Gallery", href: "#gallery" }],
  },
  {
    id: "resume",
    label: "Resume",
    keywords: ["resume", "cv", "download", "pdf", "hiring", "credentials"],
    answer:
      "Rishav Ghosh's official, formatted resume details his creative and technical credentials. You can trigger a direct PDF download of his resume in the Contact section of this portfolio, or by opening the Command Palette (⌘K) and selecting the download option.",
    links: [{ label: "Go to Contact & Resume", href: "#contact" }],
  },
  {
    id: "contact",
    label: "Contact & Location",
    keywords: ["contact", "email", "phone", "location", "hire", "talk", "message", "connect", "reach", "gmail", "mail", "number"],
    answer:
      "You can connect with Rishav Ghosh instantly through the following channels:\n\n• **Email**: ghoshrishav184@gmail.com\n• **Phone**: 7439868702\n• **Location**: Kolkata, West Bengal, India\n\nYou can also submit a secure message through the stylized contact form at the bottom of this website. He is highly responsive and typically replies within 24 hours.",
    links: [{ label: "Go to Contact Form", href: "#contact" }],
  },
  {
    id: "career-goals",
    label: "Career Goals & Vision",
    keywords: ["goals", "career", "vision", "future", "aim", "ambition", "learning", "growth"],
    answer:
      "Rishav envisions a future where digital media is highly dynamic, personalized, and AI-optimized. His objective is to continue mastering advanced prompt engineering pipelines, high-end design layouts, and modern front-end technologies to construct immersive, cinematic spaces that captivate audiences and optimize creative turnaround times.",
  },
];

export const QUICK_SUGGESTIONS = [
  "Who is Rishav Ghosh?",
  "Skills & Stack",
  "Projects Overview",
  "Creative Works",
  "Contact & Location",
  "Download Resume",
];

/** Score-based matcher — returns the best matching entry or null. */
export function matchKnowledge(query: string): KnowledgeEntry | null {
  if (!query.trim()) return null;
  const q = query.toLowerCase();

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        score += kw.length; // longer keyword = higher confidence weight
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

export const FALLBACK_RESPONSE =
  "I'm not completely sure about that — try asking me about Rishav's projects (like Project Eclipse, Shilpi Art, or Laya Sutra), his design and AI skills, his YouTube channel, or how to contact him!";
