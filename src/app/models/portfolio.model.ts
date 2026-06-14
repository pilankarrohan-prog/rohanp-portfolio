export interface Skill {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Familiar With';
}

export interface SkillCategory {
  category: string;
  icon: string; // symbol icon ID, e.g. 'icon-code'
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  isFeatured?: boolean;
  problemStatement?: string;
  features?: string[];
  techStackGrouped?: { category: string; items: string[] }[];
  timeline?: string;
  gallery?: string[];
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: string; // symbol icon ID, e.g. 'icon-award'
}

export interface Achievement {
  title: string;
  description: string;
  icon: string; // e.g. 'icon-award'
  badge?: string; // e.g. 'IIT Bombay', 'Rank', 'Symposium'
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Education {
  degree: string;
  status: string;
  institution: string;
  desc: string;
  highlights: { title: string; val: string }[];
}

export interface Profile {
  name: string;
  role: string;
  titles: string[];
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  pdfUrl: string;
  previewUrl: string;
}
