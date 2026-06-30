import { Project, Experience, SkillCategory, GalleryImage } from './types';

export const portfolioData = {
  personalInfo: {
    name: "Rishav Ghosh",
    title: "Senior Staff Software Engineer & Creative Technologist",
    subtitle: "Bridging the gap between visual artistry and hard-core systems engineering.",
    email: "ghoshrishav184@gmail.com",
    location: "San Francisco, CA",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      dribbble: "https://dribbble.com",
    },
    mission: "To create digital experiences that transcend the screen. I build systems that are light on the CPU, rich in interactive feedback, and visually unforgettable. I believe luxury is in the sub-pixel alignment, the fluid micro-gestures, and the story told in silence.",
    vision: "The future of the web isn't flat. It's multi-dimensional, performant, and contextual. By combining mathematical design principles with cutting-edge rendering engines, we can build digital spaces that feel as physical and reactive as premium Swiss watches.",
    resumeUrl: "#", // Direct download trigger
  },

  statistics: [
    { label: "Years of Experience", value: "8+" },
    { label: "Global Developers Impacted", value: "500K+" },
    { label: "Core Web Vitals Pass Rate", value: "100%" },
    { label: "Open Source Stars", value: "24K+" }
  ],

  experiences: [
    {
      id: "exp1",
      role: "Lead Creative Developer & DX Engineer",
      company: "Vercel",
      period: "2024 - Present",
      location: "San Francisco, CA",
      logoText: "▲",
      description: [
        "Pioneered high-performance interface architectures for Next.js and Vercel dashboards, improving user interaction latency by 42%.",
        "Created the Next.js DX Motion Suite, a standard-setting fluid animation design language deployed across all web-facing customer channels.",
        "Engineered the 3D interactive deployment visualizers for Vercel Ship conference, animating millions of particle coordinates at 120fps."
      ],
      skills: ["React 19", "Next.js", "WebGL", "Framer Motion", "Rust", "Tailwind CSS"]
    },
    {
      id: "exp2",
      role: "Senior Full-Stack UI Architect",
      company: "Stripe",
      period: "2022 - 2024",
      location: "San Francisco, CA / Remote",
      logoText: "💳",
      description: [
        "Architected Next-Generation checkout experiences, implementing high-conversion layouts that raised customer conversion ratios by 12.4% globally.",
        "Designed and implemented Stripe Ledger's global real-time SVG canvas flows, visualising billions of multi-currency nodes dynamically.",
        "Maintained strict layout system compliance with accessibility guidelines (WCAG AA), reaching flawless Lighthouse scores."
      ],
      skills: ["TypeScript", "SVG Engine", "Node.js", "D3.js", "React", "Docker"]
    },
    {
      id: "exp3",
      role: "Frontend Design Engineer",
      company: "Apple",
      period: "2020 - 2022",
      location: "Cupertino, CA",
      logoText: "",
      description: [
        "Engineered ultra-premium interactive web visualizers for major product launches, including Apple Vision Pro and iPhone 13 Pro.",
        "Crafted custom performance-focused motion layers and mathematical grid layouts prioritizing Safari's hardware acceleration.",
        "Co-developed internal UI standards for motion layout transitions, integrating gesture control physics."
      ],
      skills: ["Vanilla JS", "WebGL", "CSS Math", "Haptic APIs", "Keynote-grade Web"]
    }
  ] as Experience[],

  projects: [
    {
      id: "proj1",
      title: "AetherEngine 3D",
      tagline: "Interactive WebGL Core",
      description: "A lightweight, hardware-accelerated 3D matrix-physics engine built in pure WebGL and TypeScript.",
      longDescription: "AetherEngine represents the frontier of WebGL capabilities without the overhead of massive engine packages. Designed for Swiss-style minimalist interfaces, it translates cursor physics, screen inertia, and viewport scrolling into gorgeous volumetric vector flows and interactive particles, running stably at 120Hz.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["WebGL", "TypeScript", "Math Matrix", "GLSL Shaders"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      stats: [
        { label: "Frame Rate", value: "120 FPS" },
        { label: "Engine Size", value: "14.2 KB" },
        { label: "Core Engine", value: "Pure Canvas GL" }
      ],
      challenges: [
        "Handling math transform calculations without relying on external libraries.",
        "Ensuring seamless touch interaction and physical inertial scroll decay on mobile browsers."
      ],
      outcomes: [
        "Rendered up to 250,000 interactive nodes on an average iPhone with zero frame drops.",
        "Acquired 4,200 Github stars in the first week of publication."
      ]
    },
    {
      id: "proj2",
      title: "Vercel Ship Interactive",
      tagline: "Volumetric Particle Visualizer",
      description: "Immersive real-time timeline displaying million-point dynamic data streams at 120 FPS.",
      longDescription: "Created to visualize Vercel's global delivery node streams, this interface renders network latency, global hops, and deployment pulses. Users can scrub, rotate, and query real-time data using physics-enabled floating vectors and volumetric grids.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
      tags: ["Canvas 2D", "React", "WebSockets", "Data Sharding"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      stats: [
        { label: "Conventions", value: "60-120Hz Adaptive" },
        { label: "Max Particle Pool", value: "1.2 Million" },
        { label: "Network Latency", value: "<15ms" }
      ],
      challenges: [
        "Dynamic sharding and garbage collection for over 1M particle instances.",
        "Integrating responsive touch panning alongside default web vertical scrolls."
      ],
      outcomes: [
        "Used as the flagship interactive showcase at the Vercel Ship global keynote.",
        "Praised by Awwwards as one of the year's top developer visualizer tools."
      ]
    },
    {
      id: "proj3",
      title: "Stripe Ledger Canvas",
      tagline: "Dynamic Vector Payment Flow",
      description: "An elegant, interactive vector topology mapper tracking financial flows and ledger states.",
      longDescription: "Stripe Ledger Canvas is a financial topology tool that visualizes bank-node relationships and transaction paths. Built using high-precision SVG and physics-anchored nodes, it allows risk compliance teams to visual-search multi-layered transaction roots instantly.",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
      tags: ["React 19", "SVG Canvas", "Physics Forces", "TypeScript"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      stats: [
        { label: "Max Node Depth", value: "24 Levels" },
        { label: "Query Time", value: "3.2ms" },
        { label: "Accessibility Status", value: "100% WCAG" }
      ],
      challenges: [
        "Developing a custom non-overlapping spring physics layout engine for thousands of node clusters.",
        "Rendering complex node labels cleanly with optimal contrast across multiple screen modes."
      ],
      outcomes: [
        "Replaced Stripe's legacy JSON transaction viewer, increasing analyst research speed by 40%.",
        "Adopted internally by Stripe Risk and Compliance teams worldwide."
      ]
    },
    {
      id: "proj4",
      title: "Fluid Motion SDK",
      tagline: "Declarative React Physics Animations",
      description: "A declarative, physics-based UI motion toolkit optimized for high-density web dashboards.",
      longDescription: "An open-source library that empowers React developers to write production-grade, tactile micro-interactions with single-line declarations. Unlike standard spring tools, Fluid Motion utilizes a custom haptic spring equation that aligns perfectly with luxury tactile designs.",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
      tags: ["TypeScript", "NPM Library", "React 19 Hooks", "CSS Custom"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      stats: [
        { label: "NPM Downloads", value: "450K / month" },
        { label: "Library Size", value: "4.8 KB" },
        { label: "GitHub Stars", value: "18.4K" }
      ],
      challenges: [
        "Designing a robust, zero-configuration SSR-friendly react mounting flow.",
        "Adapting physics-based frame calculations during heavy browser layout shifts."
      ],
      outcomes: [
        "Currently used in standard production templates by Vercel, Stripe, and Linear.",
        "Active open-source community with over 150 contributors."
      ]
    }
  ] as Project[],

  skillsData: [
    {
      id: "sk-core",
      title: "Systems & WebGL Architecture",
      skills: [
        { name: "TypeScript & ESNext", level: "Expert", icon: "Code", description: "Strict static compilation, custom type guards, advanced TS design patterns." },
        { name: "WebGL & GLSL Shaders", level: "Expert", icon: "Tv", description: "Hardware-accelerated rendering, math transforms, custom fragment shaders." },
        { name: "Canvas Rendering 2D/3D", level: "Expert", icon: "Layers", description: "Direct bit-manipulation, physics-based vector trails, custom frame animation loops." },
        { name: "Performance Engineering", level: "Expert", icon: "Zap", description: "Frame-rate locking, GPU layout isolation, strict garbage collection management." }
      ]
    },
    {
      id: "sk-frameworks",
      title: "Frameworks & Interface Layers",
      skills: [
        { name: "React 19 & Next.js Core", level: "Expert", icon: "Atom", description: "Server components, state transitions, stable memoization pipelines." },
        { name: "Tailwind CSS & Utility Design", level: "Expert", icon: "LayoutGrid", description: "Fluid grid structures, responsive layout, dark theme accents, strict UI rhythm." },
        { name: "Framer Motion (motion/react)", level: "Expert", icon: "Activity", description: "Fluid springs, keyframe orchestrations, layout migrations, staggered triggers." },
        { name: "Node.js & Edge Serverless", level: "Proficient", icon: "Cpu", description: "Express middleware, custom endpoint routing, and asset serving strategies." }
      ]
    },
    {
      id: "sk-ux",
      title: "Design Systems & Product Design",
      skills: [
        { name: "Apple Visual Guidelines", level: "Expert", icon: "Laptop", description: "Uncompromising Swiss layout, precise margin alignment, sleek typographic curves." },
        { name: "High-Tactility Interaction", level: "Expert", icon: "Sparkles", description: "Micro-feedback loops, magnetic cursors, organic physics inertia transitions." },
        { name: "Digital Storytelling", level: "Expert", icon: "BookOpen", description: "Guiding the user scroll path via subtle viewport-reactive animations." },
        { name: "WCAG AA Accessibility", level: "Expert", icon: "ShieldAlert", description: "Perfect screen-reader layouts, strict keyboard focus trapping, dynamic color ratios." }
      ]
    }
  ] as SkillCategory[],

  galleryImages: [
    {
      id: "gal1",
      title: "Minimalist Workspace",
      category: "Creative Space",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      description: "My personal engineering workspace: matte black hardware, warm desk lighting, focused solely on the terminal."
    },
    {
      id: "gal2",
      title: "Swiss Typographical Geometry",
      category: "Visual Design",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      description: "Exploring mathematical proportions and grids. Finding the rhythm between negative space and typography."
    },
    {
      id: "gal3",
      title: "Concrete & Light Dynamics",
      category: "Inspiration",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "Brutalist architecture in Tokyo. Capturing how sharp-angled concrete splits sunlight into soft volumetric gradients."
    },
    {
      id: "gal4",
      title: "Refracted Silicon Nodes",
      category: "Abstract",
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      description: "A macro photographic study of glass refraction, illustrating data transit flows within dense logical chips."
    },
    {
      id: "gal5",
      title: "Tokyo Digital Horizon",
      category: "Inspiration",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
      description: "Cyberpunk cyberpunk night cityscape, a visual study on electric blue and warm neon light dynamics."
    }
  ] as GalleryImage[],

  knowledgeBase: {
    greetings: [
      "Hello! I am Rishav's digital assistant. Ask me anything about his projects, experience, skills, or booking his services.",
      "Greetings! Welcome to my premium portfolio space. How can I help you navigate my work and philosophy today?"
    ],
    faqs: [
      {
        question: "Who is Rishav?",
        keywords: ["who", "about", "rishav", "ghosh", "profile", "background"],
        answer: "Rishav Ghosh is a Senior Staff Software Engineer and Creative Technologist. He is known for bridging visual artistry with hard-core systems engineering. With over 8 years of experience, he has worked at premium organizations like Vercel (Lead Creative Dev), Stripe (Senior UI Architect), and Apple (Frontend Design Eng)."
      },
      {
        question: "Tell me about his Projects",
        keywords: ["projects", "work", "portfolio", "builds", "aetherengine", "ship", "canvas", "ledger"],
        answer: "Rishav's projects demonstrate high performance and premium design: \n1. AetherEngine 3D: A lightweight, custom WebGL physics core.\n2. Vercel Ship: A volumetric particle visualization processing millions of elements at 120 FPS.\n3. Stripe Ledger Canvas: An interactive real-time vector payment network visualizer.\n4. Fluid Motion SDK: An open-source declarative React physics motion toolkit with over 450k downloads."
      },
      {
        question: "What are his Skills?",
        keywords: ["skills", "stack", "languages", "frameworks", "tech", "react", "webgl", "typescript"],
        answer: "Rishav's core expertise lies in three categories:\n- Systems & WebGL: TypeScript, WebGL/GLSL, HTML5 Canvas, Performance Engineering (garbage collection, GPU rendering).\n- Frameworks: React 19, Next.js, Framer Motion, Tailwind CSS, Node.js.\n- Design Systems: Apple UI Guidelines, high-tactility interactions, digital storytelling, WCAG AA Accessibility."
      },
      {
        question: "Can I download his Resume?",
        keywords: ["resume", "cv", "download", "pdf", "career", "history"],
        answer: "Absolutely! You can download his premium formatted resume directly from the floating contact card, or press Cmd+K to open the Command Palette and select 'Download Resume'."
      },
      {
        question: "How do I Contact Rishav?",
        keywords: ["contact", "email", "hire", "book", "meeting", "message", "socials"],
        answer: "You can send an email directly to ghoshrishav184@gmail.com, use the luxury contact form at the bottom of the page, or schedule a call. Connect on GitHub (github.com), LinkedIn (linkedin.com), and Twitter (twitter.com)."
      },
      {
        question: "What Services does he offer?",
        keywords: ["services", "consulting", "freelance", "contract", "hire him", "expert", "agencies"],
        answer: "Rishav offers specialized consulting services:\n- Interactive 3D/WebGL Development for product launches.\n- UI/UX Performance Auditing (100% Lighthouse guarantee).\n- Bespoke Design Systems & micro-interaction library creation.\n- Senior architectural leadership for high-end web products."
      }
    ]
  }
};
