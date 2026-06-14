export interface Skill {
  name: string;
  value: string; // e.g., '90%'
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
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: string; // symbol icon ID, e.g. 'icon-award'
}

export interface Education {
  degree: string;
  specialization: string;
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
