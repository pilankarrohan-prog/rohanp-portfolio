import { Injectable, signal } from '@angular/core';
import { Profile, SkillCategory, Project, Achievement, TimelineItem, Education, Certification } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Profile information
  private readonly _profile = signal<Profile>({
    name: 'Rohan Pilankar',
    role: 'AI & Data Science Student',
    titles: [
      'AI & Data Science Student',
      'Java & C++ Developer',
      'Software Engineering Specialist',
      'Full-Stack Developer'
    ],
    bio: 'Passionate B.Tech Artificial Intelligence & Data Science student focused on software development, web technologies, Angular applications, Firebase solutions, and emerging AI technologies. Actively building real-world projects and continuously improving problem-solving skills.',
    email: 'pilankarrohan@gmail.com',
    phone: '+91 8208545590',
    location: 'Pune, Maharashtra, India',
    github: 'https://github.com/pilankarrohan-prog',
    linkedin: 'https://www.linkedin.com/in/rohan-pilankar-0752a932b/'
  });

  // Categorized Skills
  private readonly _skills = signal<SkillCategory[]>([
    {
      category: 'Programming Languages',
      icon: 'icon-code',
      skills: [
        { name: 'Java', level: 'Advanced' },
        { name: 'C++', level: 'Advanced' },
        { name: 'Python', level: 'Advanced' },
        { name: 'TypeScript', level: 'Intermediate' }
      ]
    },
    {
      category: 'Web Development',
      icon: 'icon-globe',
      skills: [
        { name: 'Angular', level: 'Advanced' },
        { name: 'HTML5 & CSS3', level: 'Advanced' },
        { name: 'Modern Responsive Design', level: 'Advanced' },
        { name: 'Firebase', level: 'Intermediate' }
      ]
    },
    {
      category: 'AI & Data Science',
      icon: 'icon-brain',
      skills: [
        { name: 'Machine Learning', level: 'Intermediate' },
        { name: 'Data Analytics', level: 'Intermediate' },
        { name: 'Statistical Modeling', level: 'Intermediate' }
      ]
    },
    {
      category: 'Databases',
      icon: 'icon-database',
      skills: [
        { name: 'SQL & Databases', level: 'Intermediate' },
        { name: 'RDBMS PostgreSQL', level: 'Intermediate' }
      ]
    },
    {
      category: 'Tools & Platforms',
      icon: 'icon-terminal',
      skills: [
        { name: 'Linux Command Line', level: 'Advanced' },
        { name: 'Git & GitHub', level: 'Advanced' }
      ]
    }
  ]);

  // Projects list
  private readonly _projects = signal<Project[]>([
    {
      title: 'LabourLink',
      description: 'LabourLink is a professional digital network connecting daily wage workers and local employers directly, facilitating commission-free job placements and secure handshakes.',
      imageUrl: 'assets/project-labourlink.png',
      tags: ['Angular', 'TypeScript', 'Firebase', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/pilankarrohan-prog/LabourLink',
      demoUrl: 'https://labourlink-9167a.web.app/',
      isFeatured: true,
      problemStatement: 'Finding reliable, short-term skilled labor in India remains highly fragmented. Daily wage workers suffer from massive underemployment due to lack of a centralized platform, while local employers face security issues, pricing volatility, and steep intermediary commissions when trying to find trusted help.',
      features: [
        'Dual Interface Portals: Separate custom dashboards tailored for worker registration and employer posting.',
        'Real-Time Job Feeds: Immediate placement matching using real-time posting boards with wage transparent parameters.',
        'Zero Brokerage Commission: Direct digital handshake between workers and employers eliminating middlemen.',
        'Firebase Engine: Leverages real-time sync via Firestore database, secure OTP auth flows, and CDN web hosting.'
      ],
      techStackGrouped: [
        {
          category: 'Frontend & UI',
          items: ['Angular', 'TypeScript', 'Responsive SCSS / CSS Grid', 'HTML5 Semantic Engine']
        },
        {
          category: 'Backend & Cloud Services',
          items: ['Cloud Firestore (NoSQL)', 'Firebase Authentication', 'Firebase Web Hosting CDN']
        }
      ],
      timeline: 'Jan 2025 - Mar 2025',
      gallery: [
        'assets/project-labourlink.png',
        'assets/project-analytics.png',
        'assets/project-neural.png'
      ]
    }
  ]);

  // Achievements/Milestones list
  private readonly _achievements = signal<Achievement[]>([
    {
      title: 'College Ambassador – Techfest IIT Bombay',
      description: 'Appointed as College Ambassador for Techfest, IIT Bombay. Spearheaded technical event campaigns and built a community of tech enthusiasts across local engineering hubs.',
      icon: 'icon-award',
      badge: 'IIT Bombay'
    },
    {
      title: 'Rank Under 6000',
      description: 'Secured an outstanding engineering entrance rank under 6000 among lakhs of participating candidates, validating a strong logical, mathematics, and science foundation.',
      icon: 'icon-award',
      badge: 'Rank'
    },
    {
      title: 'Technical Workshops',
      description: 'Organized and participated in professional training workshops covering Machine Learning architectures, Cloud operations, and Object-Oriented software architectures in C++ & Java.',
      icon: 'icon-code',
      badge: 'Workshops'
    },
    {
      title: 'Certifications',
      description: 'Earned 14+ verified credentials in C++, Python, Data Analytics, Databases, and IoT from Cisco Networking Academy, Coursera, and IIT Bombay SINE.',
      icon: 'icon-edu',
      badge: 'Credentials'
    },
    {
      title: 'Events and Competitions',
      description: 'Competed in multiple national level coding hackathons, logic challenges, and prototype presentation events, solving engineering problems under strict constraints.',
      icon: 'icon-award',
      badge: 'Competitions'
    }
  ]);

  // Journey Timeline items
  private readonly _timeline = signal<TimelineItem[]>([
    {
      year: '2022',
      title: 'Started Programming',
      description: 'Began writing code, learning algorithmic logic, and building foundational problem-solving frameworks.',
      icon: 'icon-code'
    },
    {
      year: '2023',
      title: 'Learned Java & C++',
      description: 'Mastered core Object-Oriented Programming principles, memory layouts, standard template libraries, and algorithmic performance structures.',
      icon: 'icon-terminal'
    },
    {
      year: '2024',
      title: 'Web Development Journey',
      description: 'Explored core web technologies, responsive styles, state management, and modern DOM architectures.',
      icon: 'icon-globe'
    },
    {
      year: '2024',
      title: 'Angular Development',
      description: 'Adopted Angular single-page architectures, TypeScript-based layouts, responsive components, and reactive signal workflows.',
      icon: 'icon-code'
    },
    {
      year: '2025',
      title: 'B.Tech AI & Data Science',
      description: 'Enrolled in specialized B.Tech AI & DS coursework covering Data Structures & Algorithms, Web Development, Angular Development, Database Management Systems, and Artificial Intelligence Fundamentals.',
      icon: 'icon-brain'
    },
    {
      year: '2025',
      title: 'LabourLink Project',
      description: 'Designed, built, and launched LabourLink, connecting workers and employers using Angular & Firebase.',
      icon: 'icon-award'
    },
    {
      year: '2026',
      title: 'Current Learning Goals',
      description: 'Deepening skill matrices in advanced Angular services, machine learning models, database query tuning, and complex algorithm designs.',
      icon: 'icon-edu'
    }
  ]);

  // Currently Learning Goals
  private readonly _currentlyLearning = signal<string[]>([
    'Advanced Angular',
    'Machine Learning',
    'Data Analytics',
    'Firebase',
    'Artificial Intelligence',
    'Data Structures & Algorithms'
  ]);

  // Education details
  private readonly _education = signal<Education>({
    degree: 'B.Tech – Artificial Intelligence & Data Science',
    status: 'Currently Pursuing',
    institution: "Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering and Technology (VPKBIET), Baramati",
    desc: 'Rigorous curriculum covering Machine Learning Algorithms, Deep Learning, Statistical Analytics, Advanced Algorithms in Java and C++, DBMS structures, and Web Architectures. Maintained top-tier academic grades.',
    highlights: [
      { title: 'Focus areas:', val: 'Deep Learning, Algorithms, Data Structures' },
      { title: 'Specialization:', val: 'AI Models & Predictive Analytics' }
    ]
  });

  // Certifications list
  private readonly _certifications = signal<Certification[]>([
    {
      id: 'cpp-essentials-2',
      title: 'C++ Essentials 2',
      issuer: 'Cisco Networking Academy',
      date: 'Oct 15, 2025',
      category: 'Programming',
      pdfUrl: 'certificates/c--_essentials_2_certificate_rohan-pilankar-aids-2024-vpkbiet-org_ebac5e93-bd8e-4cf6-8ba9-b400c7169820.pdf',
      previewUrl: 'assets/preview_c--_essentials_2_certificate_rohan-pilankar-aids-2024-vpkbiet-org_ebac5e93-bd8e-4cf6-8ba9-b400c7169820.png'
    },
    {
      id: 'cpp-essentials-1',
      title: 'C++ Essentials 1',
      issuer: 'Cisco Networking Academy',
      date: 'Apr 14, 2025',
      category: 'Programming',
      pdfUrl: 'certificates/_certificate_rohan-pilankar-aids-2024-vpkbiet-org_ab3a0fee-668c-4c15-a233-b5d966cd4559.pdf',
      previewUrl: 'assets/preview__certificate_rohan-pilankar-aids-2024-vpkbiet-org_ab3a0fee-668c-4c15-a233-b5d966cd4559.png'
    },
    {
      id: 'intro-iot',
      title: 'Introduction to IoT & Digital Transformation',
      issuer: 'Cisco Networking Academy',
      date: 'Oct 20, 2025',
      category: 'IoT',
      pdfUrl: 'certificates/introduction_to_iot_certificate_rohan-pilankar-aids-2024-vpkbiet-org_e6e56474-214a-4dfb-8947-4c03c3983d52.pdf',
      previewUrl: 'assets/preview_introduction_to_iot_certificate_rohan-pilankar-aids-2024-vpkbiet-org_e6e56474-214a-4dfb-8947-4c03c3983d52.png'
    },
    {
      id: 'python-coursera',
      title: 'Python Programming',
      issuer: 'University of Michigan (Coursera)',
      date: 'Apr 01, 2026',
      category: 'Programming',
      pdfUrl: 'certificates/certificate_2.pdf',
      previewUrl: 'assets/preview_certificate_2.png'
    },
    {
      id: 'data-analytics-iitb',
      title: 'Data Analytics Workshop',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Apr 01, 2026',
      category: 'Data Science',
      pdfUrl: 'certificates/certificate_3.pdf',
      previewUrl: 'assets/preview_certificate_3.png'
    },
    {
      id: 'ml-stanford',
      title: 'Machine Learning Fundamentals',
      issuer: 'Stanford University (Coursera)',
      date: 'Apr 01, 2026',
      category: 'Machine Learning',
      pdfUrl: 'certificates/certificate_4.pdf',
      previewUrl: 'assets/preview_certificate_4.png'
    },
    {
      id: 'rdbms-postgres-iitb',
      title: 'RDBMS PostgreSQL Training',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Mar 30, 2026',
      category: 'Databases',
      pdfUrl: 'certificates/rohan-pilankar-participant-certificate_1.pdf',
      previewUrl: 'assets/preview_rohan-pilankar-participant-certificate_1.png'
    },
    {
      id: 'html-iitb',
      title: 'HTML Training',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Mar 30, 2026',
      category: 'Web Development',
      pdfUrl: 'certificates/rohan-pilankar-participant-certificate_2.pdf',
      previewUrl: 'assets/preview_rohan-pilankar-participant-certificate_2.png'
    },
    {
      id: 'css-iitb',
      title: 'CSS Training',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Mar 30, 2026',
      category: 'Web Development',
      pdfUrl: 'certificates/rohan-pilankar-participant-certificate.pdf',
      previewUrl: 'assets/preview_rohan-pilankar-participant-certificate.png'
    },
    {
      id: 'arduino-iitb',
      title: 'Arduino Training',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Nov 01, 2025',
      category: 'IoT',
      pdfUrl: 'certificates/rohan-pilankar-participant-certificate_3.pdf',
      previewUrl: 'assets/preview_rohan-pilankar-participant-certificate_3.png'
    },
    {
      id: 'adv-cpp-iitb',
      title: 'Advanced C++ Training',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Nov 01, 2025',
      category: 'Programming',
      pdfUrl: 'certificates/rohan-pilankar-participant-certificate_4.pdf',
      previewUrl: 'assets/preview_rohan-pilankar-participant-certificate_4.png'
    },
    {
      id: 'python-iitb',
      title: 'Python 3.4.3 Training',
      issuer: 'EduPyramids / SINE, IIT Bombay',
      date: 'Nov 01, 2025',
      category: 'Programming',
      pdfUrl: 'certificates/rohan-pilankar-participant-certificate5.pdf',
      previewUrl: 'assets/preview_rohan-pilankar-participant-certificate5.png'
    },
    {
      id: 'gdg-vpkbiet',
      title: 'GDG VPKBIET Active Contribution',
      issuer: 'Google Developer Groups VPKBIET',
      date: 'Feb 07, 2026',
      category: 'Community',
      pdfUrl: 'certificates/gdg_vpkbiet_certificate_rohan_ranjit_pilankar.pdf',
      previewUrl: 'assets/preview_gdg_vpkbiet_certificate_rohan_ranjit_pilankar.png'
    },
    {
      id: 'techfest-iitb',
      title: 'Techfest College Ambassador',
      issuer: 'Techfest, IIT Bombay',
      date: 'Dec 18, 2025',
      category: 'Community',
      pdfUrl: 'certificates/1781262661065.pdf',
      previewUrl: 'assets/preview_1781262661065.png'
    }
  ]);

  // Getters (Exposed as Signals)
  get profile() { return this._profile.asReadonly(); }
  get skills() { return this._skills.asReadonly(); }
  get projects() { return this._projects.asReadonly(); }
  get achievements() { return this._achievements.asReadonly(); }
  get timeline() { return this._timeline.asReadonly(); }
  get currentlyLearning() { return this._currentlyLearning.asReadonly(); }
  get education() { return this._education.asReadonly(); }
  get certifications() { return this._certifications.asReadonly(); }
}
