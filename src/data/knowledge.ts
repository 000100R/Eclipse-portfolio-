/**
 * knowledge.ts
 * Local knowledge base for the Ask Rishav AI assistant.
 * Single source of truth — update this file when portfolio content changes.
 * No API keys. No external calls. Fully offline.
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
    label: "Who is Rishav?",
    keywords: ["who", "about", "rishav", "introduce", "background", "person", "him"],
    answer:
      "Rishav Ghosh is a visual artist, filmmaker, and creative technologist based in India. He works at the intersection of cinema, design, and code — building experiences that feel cinematic and intentional. From branded digital invitations to full-stack web applications, his work is defined by a pursuit of craft over shortcuts.",
  },
  {
    id: "skills",
    label: "Skills & Stack",
    keywords: ["skill", "stack", "tech", "language", "framework", "tool", "code", "use", "know", "expertise"],
    answer:
      "Rishav's core stack spans creative and engineering disciplines:\n\n• **Creative** — Adobe Creative Suite, DaVinci Resolve, Blender, Figma\n• **Frontend** — React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js\n• **Backend** — Node.js, Python, REST APIs\n• **3D & Motion** — React Three Fiber, WebGL, GSAP ScrollTrigger\n• **Tools** — Git, Vite, Vercel, Notion\n\nHe's equally comfortable directing a shoot as he is architecting a component library.",
  },
  {
    id: "experience",
    label: "Experience",
    keywords: ["experience", "work", "job", "career", "company", "role", "position", "client"],
    answer:
      "Rishav has worked across film production, branded content, and digital product design. His professional work includes:\n\n• Directing and editing branded films and cultural event productions\n• Designing and developing premium web experiences for clients\n• Creating digital invitations and interactive event campaigns\n• Visual direction for music, theatre, and live performance events\n\nHe operates as a multi-disciplinary creative — directing, designing, and building end-to-end.",
  },
  {
    id: "education",
    label: "Education",
    keywords: ["education", "study", "degree", "university", "college", "school", "qualification"],
    answer:
      "Rishav's education spans formal and self-directed learning. His technical and creative skills are built from a combination of institutional training in film and visual arts, and extensive self-study in software engineering, 3D design, and interactive media.",
  },
  {
    id: "projects",
    label: "Projects",
    keywords: ["project", "built", "made", "portfolio", "work", "product", "app", "website", "create"],
    answer:
      "Notable works include:\n\n• **Project Eclipse** — This portfolio itself. A cinematic React + TypeScript experience with Three.js particle effects, GSAP animations, and glassmorphism UI\n• **Laya-Sutra: The Pulse of Tradition** — A luxury digital invitation for the Manjistha Utsav with temple aesthetics, Nataraja imagery, and 4D mouse-parallax effects\n• **Interactive Event Campaigns** — Multiple branded HTML/CSS/JS experiences for cultural and artistic events\n• **Creative Web Experiments** — Ongoing explorations in WebGL, Lenis scroll, and motion design",
    links: [{ label: "View Projects", href: "#projects" }],
  },
  {
    id: "creative",
    label: "Creative Works",
    keywords: ["film", "cinema", "creative", "video", "direct", "art", "visual", "photograph", "design", "motion"],
    answer:
      "Rishav's creative output spans several mediums:\n\n• **Film & Video** — Short films, branded documentaries, event coverage\n• **Motion Design** — Titles, transitions, animated brand identities\n• **Photography** — Cinematic black and white portraiture, event stills\n• **Digital Art** — Interactive 3D experiences, generative visual work\n• **Event Design** — Full visual direction for cultural performances and exhibitions\n\nHis aesthetic language is consistent across mediums: cinematic depth, cultural richness, minimal luxury.",
  },
  {
    id: "youtube",
    label: "YouTube",
    keywords: ["youtube", "video", "channel", "watch", "content", "upload"],
    answer:
      "Rishav shares creative process videos, filmmaking insights, and technical explorations on YouTube. His channel features behind-the-scenes content from productions, web development experiments, and commentary on craft.",
    links: [{ label: "YouTube Channel", href: "https://youtube.com/@rishavghosh" }],
  },
  {
    id: "github",
    label: "GitHub",
    keywords: ["github", "code", "repo", "repository", "open source", "source"],
    answer:
      "Rishav's GitHub hosts his development projects, including this portfolio (Project Eclipse), web experiments, and open explorations in creative coding. Most repositories reflect his interest in cinematic UI and motion-forward web experiences.",
    links: [{ label: "GitHub Profile", href: "https://github.com/rishavghosh" }],
  },
  {
    id: "contact",
    label: "Contact",
    keywords: ["contact", "email", "reach", "hire", "message", "talk", "connect", "linkedin", "social"],
    answer:
      "The best way to reach Rishav is through the contact section of this portfolio or directly via email. He's also active on LinkedIn and Instagram for professional and creative connections.\n\nFor project inquiries, include a brief description of the work and timeline — he responds within 24–48 hours.",
    links: [{ label: "Go to Contact", href: "#contact" }],
  },
  {
    id: "resume",
    label: "Resume",
    keywords: ["resume", "cv", "download", "pdf", "qualification", "hire"],
    answer:
      "Rishav's resume covers his full creative and technical background — film direction, digital design, and frontend engineering. You can download the latest PDF from the Contact section.",
    links: [{ label: "Download Resume", href: "#contact" }],
  },
  {
    id: "availability",
    label: "Availability",
    keywords: ["available", "availability", "hire", "freelance", "work together", "open", "project", "collaborate"],
    answer:
      "Rishav is currently **open to select collaborations**. He takes on:\n\n• Premium web design & development\n• Creative direction for brands and events\n• Film and video production\n• Motion design and interactive experiences\n\nReach out through the contact section with a brief and he'll get back to you quickly.",
    links: [{ label: "Let's Talk", href: "#contact" }],
  },
];

export const QUICK_SUGGESTIONS = [
  "Who is Rishav?",
  "Skills & Stack",
  "Projects",
  "Creative Works",
  "Availability",
  "Contact",
  "Resume",
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
      if (q.includes(kw)) score += kw.length; // longer keyword = higher confidence
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

export const FALLBACK_RESPONSE =
  "I'm not sure about that — try asking about Rishav's skills, projects, experience, availability, or how to contact him.";
