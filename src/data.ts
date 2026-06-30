import { Project, Experience, SkillCategory, GalleryImage } from './types';

export const portfolioData = {
  personalInfo: {
    name: "Rishav Ghosh",
    title: "YouTube Creator, Creative Designer & AI Enthusiast",
    subtitle: "Bridging the gap between cinematic storytelling, high-end graphic design, and interactive technology.",
    email: "ghoshrishav184@gmail.com",
    location: "Kolkata, West Bengal, India",
    socials: {
      github: "https://github.com/000100R",
      linkedin: "https://linkedin.com/in/rishav-ghosh-71a16840b",
      youtube: "https://youtube.com/@rawentity-202",
    },
    mission: "To construct digital spaces that blend stunning visual narratives with high-performance interactions. I combine creative content creation and Canva design with foundational knowledge of artificial intelligence to build memorable user experiences that tell a story.",
    vision: "The future of visual media is highly dynamic, automated, and deeply interactive. By integrating design tools, video pipelines, and prompt engineering with modern front-end technologies, we can shape immersive spaces that captivate and inspire.",
    resumeUrl: "assets/resume.pdf", // Direct download trigger
  },

  statistics: [
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies Learned", value: "12+" },
    { label: "Years Learning", value: "3+" },
    { label: "Open Source Contributions", value: "50+" }
  ],

  experiences: [
    {
      id: "exp1",
      role: "YouTube Content Creator & Channel Manager",
      company: "Self-Managed / Personal Channel & Social Pages",
      period: "2023 - Present",
      location: "Kolkata, West Bengal, India / Remote",
      logoText: "📺",
      description: [
        "Independently manage an active YouTube channel end-to-end: scripting, filming, video editing, metadata optimization, and publishing via YouTube Studio, growing organic engagement consistently.",
        "Design high-impact thumbnails, channel banners, and branded visual assets using Canva to establish and maintain a professional, cohesive identity.",
        "Create, schedule, and optimize original content (videos, reels, stories) across Instagram and Facebook to grow organic community engagement."
      ],
      skills: ["YouTube Studio", "Canva Pro", "Video Editing", "Instagram & Facebook", "Community Growth", "Metadata Optimization"]
    },
    {
      id: "exp2",
      role: "AI-Assisted Content Researcher & Tech Explorer",
      company: "Freelance & Learning Ecosystem",
      period: "2024 - Present",
      location: "Kolkata, West Bengal, India",
      logoText: "🧠",
      description: [
        "Explore and integrate generative AI tools to automate digital content workflows, creative brainstorming, and research documentation.",
        "Study foundational Machine Learning, Deep Learning, and Computer Vision concepts to build an understanding of intelligent software design.",
        "Maintain structured progress logs and audience performance metrics using Microsoft Excel to identify content trends and optimize release schedules."
      ],
      skills: ["Prompt Engineering", "AI Research Tools", "Machine Learning (Foundational)", "Deep Learning Basics", "Excel Analytics"]
    }
  ] as Experience[],

  projects: [
    {
      id: "proj1",
      title: "Shilpi Art",
      tagline: "Premium Art & Exhibition Portal",
      description: "A custom curated art exhibition website displaying creative visual portfolios with smooth cinematic interactions.",
      longDescription: "Shilpi Art is a bespoke digital gallery created to present art and illustrations under a premium light. It translates user scroll gestures into dynamic transitions and glassmorphic card scales, delivering a highly tactile, physical feel to digital visual art curation.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
      tags: ["HTML5", "CSS Math", "JavaScript", "Responsive Design", "Cinematic UI"],
      liveUrl: "https://000100r.github.io/shilpi-art/",
      githubUrl: "https://github.com/000100R",
      stats: [
        { label: "Design Tool", value: "Canva Pro" },
        { label: "Art Collections", value: "Multiple" },
        { label: "Performance Score", value: "98/100" }
      ],
      challenges: [
        "Maintaining sharp vector asset resolutions across mobile, tablet, and wide desktop displays without layout jitter.",
        "Optimizing high-resolution art canvases to achieve rapid content load times and buttery smooth scrolling."
      ],
      outcomes: [
        "Successfully launched as a premium visual gallery presenting elegant layouts and cinematic typography pairings.",
        "Adopted as the cornerstone presentation portal for physical and digital illustrations."
      ]
    },
    {
      id: "proj2",
      title: "YouTube Channel & Brand Curation",
      tagline: "End-to-End Brand Development",
      description: "A complete personal brand built from scratch across YouTube, Instagram, and Facebook, covering production and analytics.",
      longDescription: "A comprehensive case study in digital brand curation. Spanned end-to-end content pipeline orchestration, from scripting and filming to mobile video editing, custom banner design in Canva, and deep analytics tracking with Microsoft Excel.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["YouTube Studio", "Canva", "Video Editing", "Excel Analytics"],
      liveUrl: "https://youtube.com/@rawentity-202",
      githubUrl: "https://github.com/000100R",
      stats: [
        { label: "Platforms", value: "YouTube/IG/FB" },
        { label: "Asset Creator", value: "Canva" },
        { label: "Data Tracker", value: "MS Excel" }
      ],
      challenges: [
        "Structuring a highly consistent posting and publishing schedule while managing asset design and filming workflows.",
        "Interpreting organic platform reach and optimizing keywords using AI tools."
      ],
      outcomes: [
        "Consistently grew community engagement metrics across multiple video playlists and posts.",
        "Created a professional visual style guide utilizing modern brand identities."
      ]
    },
    {
      id: "proj3",
      title: "AI-Assisted Workflow Optimizer",
      tagline: "Generative AI Creative Assistant",
      description: "Automating content ideation, metadata generation, and caption research through advanced prompt engineering.",
      longDescription: "This system uses advanced prompt engineering techniques to generate creative content briefs, metadata logs, video scripts, and high-conversion social media captions. By automating research, the system cuts down content production timelines dramatically.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
      tags: ["Prompt Engineering", "AI Research", "Workflow Automation", "Excel logs"],
      liveUrl: "https://github.com/000100R",
      githubUrl: "https://github.com/000100R",
      stats: [
        { label: "Workflow Boost", value: "2x Speed" },
        { label: "Scripting Model", value: "LLM Prompting" },
        { label: "Notes System", value: "MS Word logs" }
      ],
      challenges: [
        "Refining contextual prompts to avoid generic outputs and capture specific content creator tone.",
        "Structuring and documenting prompt templates in Microsoft Word for easy retrieval."
      ],
      outcomes: [
        "Developed a reliable prompt library currently used to generate high-quality outlines and descriptions in seconds.",
        "Acquired advanced self-taught foundational concepts in ML, Deep Learning, and Computer Vision."
      ]
    }
  ] as Project[],

  skillsData: [
    {
      id: "sk-creative",
      title: "Creative & Content Design",
      skills: [
        { name: "Canva Graphic Design", level: "Expert", icon: "LayoutGrid", description: "Designing high-impact thumbnails, channel banners, logos, and custom branded vectors." },
        { name: "Video Editing & Production", level: "Expert", icon: "Tv", description: "Mobile and desktop video editors, audio sync, color correction, and pacing." },
        { name: "YouTube Channel Curation", level: "Expert", icon: "Activity", description: "SEO, keywords, meta optimization, thumbnails strategy, and audience growth analytics." },
        { name: "Brand Visuals", level: "Expert", icon: "Sparkles", description: "Styling layout assets, establishing cohesive brand palettes, and thumbnail visual communication." }
      ]
    },
    {
      id: "sk-ai-tech",
      title: "AI & Emerging Technology",
      skills: [
        { name: "Prompt Engineering", level: "Expert", icon: "Cpu", description: "Crafting structured, high-context prompt templates to automate scripts and outlines." },
        { name: "AI Research Tools", level: "Expert", icon: "Code", description: "Using large language models for deep niche research, keyword maps, and SEO workflows." },
        { name: "Machine Learning Concepts", level: "Foundational", icon: "Layers", description: "Understanding neural networks, supervise/unsupervised learning, and feature weights." },
        { name: "Deep Learning & CV", level: "Foundational", icon: "Zap", description: "Basic structures of CNNs, neural perception layers, and modern computer vision fundamentals." }
      ]
    },
    {
      id: "sk-office",
      title: "Office, Code & Data Skills",
      skills: [
        { name: "MS Excel Analytics", level: "Expert", icon: "Laptop", description: "Audience performance tracking, record keeping, data sorting, and cell logic." },
        { name: "MS Word Documentation", level: "Expert", icon: "BookOpen", description: "Structured record formatting, documentation pipelines, and script organization." },
        { name: "React & Web Interfaces", level: "Proficient", icon: "Atom", description: "Creating responsive structures, clean glassmorphism layouts, and interactive elements." },
        { name: "Remote Workflow Mgmt", level: "Expert", icon: "ShieldAlert", description: "Remote communication, fast turnaround, structured file organization, and active listening." }
      ]
    }
  ] as SkillCategory[],

  galleryImages: [
    {
      id: "gal1",
      title: "Personal Portfolio Workspace",
      category: "Creative Space",
      image: "assets/hero.jpg",
      description: "My workspace focused on visual creation, scripting, and studying AI architectures."
    },
    {
      id: "gal2",
      title: "Creative Visual Branding",
      category: "Graphic Design",
      image: "assets/about.jpg",
      description: "Visual thumbnail layouts and brand vectors produced using modern layout software."
    },
    {
      id: "gal3",
      title: "Interactive Shilpi Art Portal",
      category: "UI Development",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      description: "Designing the custom glassmorphic art exhibition space."
    },
    {
      id: "gal4",
      title: "Data and Performance Ledger",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      description: "Analyzing audience growth metrics and engagement indexes in Microsoft Excel."
    }
  ] as GalleryImage[],

  knowledgeBase: {
    greetings: [
      "Hello! I am Rishav Ghosh's digital assistant. Ask me anything about his projects, experience, skills, or download his resume.",
      "Greetings! Welcome to Rishav's digital space. How can I help you explore his content creation, design, or AI workflows today?"
    ],
    faqs: [
      {
        question: "Who is Rishav Ghosh?",
        keywords: ["who", "about", "rishav", "ghosh", "profile", "background", "education"],
        answer: "Rishav Ghosh is an AI-ready creative professional, YouTube Content Creator, and Graphic Designer based in Kolkata, India. He holds a Higher Secondary Certificate from Mukul Bose Memorial Institution and has built a diverse skill set spanning Canva design, video editing, MS Excel analytics, prompt engineering, and foundational Machine Learning concepts."
      },
      {
        question: "Tell me about his Projects",
        keywords: ["projects", "work", "portfolio", "builds", "shilpi art", "shilpi", "youtube", "optimizer"],
        answer: "Rishav has built several notable creative and technical projects: \n1. Shilpi Art: A premium custom art exhibition portal designed with clean cinematic layouts.\n2. YouTube Content Channel: End-to-end management from scripting and editing to thumbnail design and organic growth strategy.\n3. AI-Assisted Workflow Optimizer: A custom prompt engineering setup that reduces content brief development time by 2x."
      },
      {
        question: "What are his Skills?",
        keywords: ["skills", "stack", "languages", "frameworks", "tech", "react", "canva", "excel"],
        answer: "Rishav's core expertise lies in three categories:\n- Creative & Content: Canva design, Video Editing, YouTube SEO/Studio, Instagram/Facebook brand management.\n- AI & Emerging Tech: Prompt Engineering, AI content research, foundational concepts of Machine Learning, Deep Learning, and Computer Vision.\n- Office & Code: MS Excel data entry/analytics, MS Word documentation, React & Web Interface design, and Remote Work management."
      },
      {
        question: "Can I download his Resume?",
        keywords: ["resume", "cv", "download", "pdf", "career", "history"],
        answer: "Absolutely! Rishav's real formatted resume PDF is available for download on this site. Click the 'Download Resume PDF' button in the contact section or type Cmd+K to download it."
      },
      {
        question: "How do I Contact Rishav?",
        keywords: ["contact", "email", "phone", "location", "hire", "book", "message", "socials"],
        answer: "You can reach Rishav via email at ghoshrishav184@gmail.com, call him at 7439868702, or send a message via the elegant contact form at the bottom of the page. Connect with him on GitHub (https://github.com/000100R), LinkedIn (linkedin.com/in/rishav-ghosh-71a16840b), and YouTube (@rawentity-202)."
      },
      {
        question: "What Services does he offer?",
        keywords: ["services", "consulting", "freelance", "contract", "hire him", "expert", "creator"],
        answer: "Rishav offers professional services in:\n- High-Quality Graphic & Thumbnail Design (Canva).\n- YouTube Channel Optimization & End-to-End Content Management.\n- AI-assisted writing, research, and custom Prompt Engineering.\n- Data entry, record-keeping, and spreadsheet management (Excel)."
      }
    ]
  }
};
