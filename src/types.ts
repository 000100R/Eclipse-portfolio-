export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  stats: { label: string; value: string }[];
  challenges: string[];
  outcomes: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  logoText: string;
}

export interface SkillItem {
  name: string;
  level: string; // e.g., "Expert", "Proficient"
  icon: string; // Lucide icon name
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
