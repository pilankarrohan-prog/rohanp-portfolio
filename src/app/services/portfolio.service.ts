import { Injectable, signal } from '@angular/core';
import { Profile, SkillCategory, Project, Milestone, Education, Certification } from '../models/portfolio.model';

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
    bio: 'AI & Data Science student passionate about software development, web technologies, data analytics, and machine learning. Experienced in Java, C++, Python, Angular, Firebase, Linux, and modern web development. Actively building projects and exploring AI-driven solutions.',
    email: 'pilankarrohan@gmail.com',
    phone: '+91 8208545590',
    location: 'Pune, Maharashtra, India',
    github: 'https://github.com/pilankarrohan-prog',
    linkedin: 'https://www.linkedin.com/in/rohan-pilankar-0752a932b/'
  });

  // Categorized Skills
  private readonly _skills = signal<SkillCategory[]>([
    {
      category: 'Programming',
      icon: 'icon-code',
      skills: [
        { name: 'Java', value: '' },
        { name: 'C++', value: '' },
        { name: 'Python', value: '' },
        { name: 'TypeScript', value: '' }
      ]
    },
    {
      category: 'AI & Data Science',
      icon: 'icon-brain',
      skills: [
        { name: 'Machine Learning', value: '' },
        { name: 'Data Analytics', value: '' },
        { name: 'Statistical Modeling', value: '' }
      ]
    },
    {
      category: 'Web Development',
      icon: 'icon-globe',
      skills: [
        { name: 'Angular', value: '' },
        { name: 'Firebase', value: '' },
        { name: 'HTML5 & CSS3', value: '' },
        { name: 'Modern Responsive Design', value: '' }
      ]
    },
    {
      category: 'Systems & Tools',
      icon: 'icon-terminal',
      skills: [
        { name: 'Linux Command Line', value: '' },
        { name: 'Git & GitHub', value: '' },
        { name: 'SQL & Databases', value: '' }
      ]
    }
  ]);

  // Projects list
  private readonly _projects = signal<Project[]>([
    {
      title: 'LabourLink',
      description: 'LabourLink is a platform that connects workers and employers, helping users find jobs, hire workers, and manage labor-related opportunities efficiently.',
      imageUrl: 'assets/project-labourlink.png',
      tags: ['Angular', 'TypeScript', 'Firebase', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/pilankarrohan-prog',
      demoUrl: 'https://labourlink-9167a.web.app/',
      isFeatured: true
    }
  ]);

  // Milestones/Achievements list
  private readonly _milestones = signal<Milestone[]>([
    {
      date: 'IIT BOMBAY',
      title: 'College Ambassador at Techfest',
      description: 'Appointed as College Ambassador for Techfest, IIT Bombay. Spearheaded technical event campaigns and built a community of tech enthusiasts across local engineering hubs.',
      icon: 'icon-award'
    },
    {
      date: 'COMPETITIVE',
      title: 'Rank Under 6000',
      description: 'Secured an outstanding engineering entrance rank under 6000 among lakhs of participating candidates, validating a strong logical, mathematics, and science foundation.',
      icon: 'icon-award'
    },
    {
      date: 'HACKATHONS',
      title: 'Technical Event Participation',
      description: 'Regular competitor in national coding hackathons and technical project presentation symposiums, developing software prototypes under tight constraints.',
      icon: 'icon-code'
    },
    {
      date: 'CREDENTIALS',
      title: 'Certificates and Workshops',
      description: 'Completed professional training workshops on Machine Learning architectures, Cloud operations, and Object-Oriented software architectures in C++ & Java.',
      icon: 'icon-edu'
    }
  ]);

  // Education details
  private readonly _education = signal<Education>({
    degree: 'Bachelor of Engineering',
    specialization: 'Artificial Intelligence & Data Science Engineering',
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
  get milestones() { return this._milestones.asReadonly(); }
  get education() { return this._education.asReadonly(); }
  get certifications() { return this._certifications.asReadonly(); }
}
