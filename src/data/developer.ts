/**
 * Developer portfolio data
 * Customize this file with your own information
 */

export const developerInfo = {
  name: "Sayed Mirchoni",
  title: "Web developer",
  tagline: "Building impactful web experiences",
  heroSubtitle: "Crafting scalable solutions with React, Python, Android & modern technologies",
  email: "www.naayaab2004@gmail.com",
  phone: "+91 8618238048",
  location: "Banglore,Karnataka,India",
  timezone: "IST",
  yearsOfExperience: 0,
  projectsCompleted: 10,
  happyClients: 8,
  
  biography: `I'm a passionate full-stack developer with experience in web and Android development.
My journey started with a Computer Science degree, and I've built impactful solutions
from e-commerce platforms to gym membership systems and resume analyzers.

I specialize in React.js for frontend development, Python for backend services, and Android
development for mobile applications. I've created scalable web apps handling thousands of
transactions and intuitive Android apps that users love.

When I'm not coding, you'll find me contributing to open-source projects, writing
technical blog posts, or exploring the latest in mobile and web technologies. I believe
great software is built with empathy—understanding user needs and translating them
into elegant, performant solutions.`,

  funFacts: [
    "I've written over 500,000 lines of code",
    "My first program was a Gym mebership platform",
    "I can picturize clearly what is said",
    "Coffee consumption: ~2 cups per coding session",
  ],

  education: [
    {
      degree: "B.E in Computer Science",
      school: "Smt Kamala and Shri Venkappa M Agadi Collge of Engineering and Technology",
      year: "2026",
      focus: "Software Engineering & AI",
    },
  ],

  experience: [
    {
      title: "Senior Web Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Leading frontend architecture and API development for enterprise SaaS platform.",
    },
    {
      title: "Web Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built e-commerce solutions and integrated payment systems serving 10K+ users.",
    },
    {
      title: "Junior Developer",
      company: "WebAgency",
      period: "2019 - 2020",
      description: "Developed responsive websites and RESTful APIs for various clients.",
    },
  ],

  socialLinks: {
    github: "https://github.com/Sayednaayaab",
    linkedin: "https://www.linkedin.com/in/sayed-mirchoni/",
    twitter: "https://x.com/NaayaabM74053?t=YTevlnX_FHVKampX9r-3TA&s=09",
    email: "mailto:www.naayaab2004@gmail.com",
  },

  resumeUrl: "/2KA22CS042-SAYED MIRCHONI.pdf",
};

export const skills = {
  frontend: [
    { name: "React.js", level: 95, icon: "react" },
    { name: "TypeScript", level: 90, icon: "typescript" },
    { name: "JavaScript", level: 95, icon: "javascript" },
    { name: "HTML/CSS", level: 95, icon: "html" },
    { name: "Tailwind CSS", level: 90, icon: "tailwind" },
  ],
  backend: [
    { name: "Python", level: 90, icon: "python" },
    { name: "Express.js", level: 85, icon: "express" },
    { name: "Node.js", level: 85, icon: "nodejs" },
    { name: "Flask", level: 85, icon: "flask" },
  ],
  mobile: [
    { name: "Android Development", level: 90, icon: "android" },
    { name: "Java", level: 85, icon: "java" },
    { name: "Kotlin", level: 80, icon: "kotlin" },
  ],
  tools: [
    { name: "Github", level: 92 },
    { name: "Android Studio", level: 95 },
    { name: "Figma", level: 70 },
    { name: "N8N", level: 80 },
    { name: "LLM", level: 85 },
    { name: "RAGs", level: 80 },
    { name: "Vercel", level: 88 },
  ],
};

export const services = [
  {
    title: "Custom Web Applications",
    description: "Web apps built with React and modern backend technologies. Scalable, secure, and user-friendly.",
    icon: "code",
  },
  {
    title: "E-commerce Solutions",
    description: "Custom online stores with secure checkout, inventory management, and analytics dashboards.",
    icon: "shopping",
  },
  {
    title: "Android App Development",
    description: "Native Android applications built with Java and Kotlin. Feature-rich, performant, and user-centric mobile solutions.",
    icon: "android",
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews, performance optimization, and technical strategy for your development team.",
    icon: "consulting",
  },
  {
    title: "Flask Backend Development",
    description: "Lightweight and powerful Python Flask applications for APIs, microservices, and backend solutions.",
    icon: "backend",
  },
  {
    title: "AI & LLM Integration",
    description: "Integrate Large Language Models and RAG systems into your applications for intelligent features.",
    icon: "ai",
  },
  {
    title: "Automation with N8N",
    description: "Build powerful workflow automation and integrations using N8N for seamless business processes.",
    icon: "automation",
  },
  {
    title: "Vercel Deployment",
    description: "Deploy and optimize your applications on Vercel for best performance and scalability.",
    icon: "deploy",
  },
];

export const projects = [
  {
    id: "vivid-commerce",
    title: "Vivid Commerce Website",
    category: "E-commerce",
    description: "A vibrant e-commerce platform featuring dynamic product catalogs, seamless shopping cart experience, and modern checkout flow with integrated payment systems.",
    longDescription: "Built a scalable e-commerce solution with real-time inventory management, secure payment integration, order tracking, and a comprehensive admin panel with analytics.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","Vercel"],
    liveUrl: "https://vivid-commerce.vercel.app/",
    githubUrl: "https://github.com/Sayednaayaab/vivid-commerce.git",
    featured: true,
   
    challenges: [
      "Implementing real-time inventory sync across multiple warehouses",
      "Optimizing database queries for high-traffic periods",
      "Building a responsive checkout flow with minimal friction",
    ],
  },
  {
    id: "health-care-website",
    title: "Health Care Website",
    category: "Healthcare",
    description: "Comprehensive healthcare platform connecting patients with providers, featuring appointment scheduling, telemedicine capabilities, and secure health records management.",
    longDescription: "Developed a patient-focused healthcare platform with appointment booking, practitioner profiles, telehealth integration, and secure patient portal for managing health records.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","OpenApi","Vercel"],
    liveUrl: "https://healthbloom-care-cpjv.vercel.app/",
    githubUrl: "https://github.com/Sayednaayaab/healthbloom-care.git",
    featured: true,
  
    challenges: [
      "HIPAA compliance and data security",
      "Real-time telemedicine implementation",
      "Patient data privacy and encryption",
    ],
  },
  {
    id: "resume-builder-analyzer",
    title: "Resume Builder & Analyzer Website",
    category: "Productivity",
    description: "Advanced resume creation tool with AI-powered analysis, professional templates, skill matching, and real-time suggestions to improve your job prospects.",
    longDescription: "Developed an intelligent resume builder with NLP-based analysis that parses documents, extracts key information, and provides actionable feedback for job seekers using OpenAI API.",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&auto=format&fit=crop",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","Vercel"],
    liveUrl: "https://resume-savvy-dxhq.vercel.app/",
    githubUrl: "https://github.com/Sayednaayaab/resume-savvy.git",
    featured: true,
    
    challenges: [
      "Training NLP models on diverse resume formats",
      "Handling PDF parsing with varying structures",
      "Real-time feedback generation without latency",
    ],
  },
  {
    id: "gym-guide-website",
    title: "Gym Guide Website",
    category: "Fitness",
    description: "Complete fitness solution providing personalized workout plans, live class scheduling, trainer connections, and progress tracking for gym enthusiasts.",
    longDescription: "Created a comprehensive gym platform with personalized workout plans, class scheduling, trainer profiles, progress tracking dashboards, and fitness analytics.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
   
    challenges: [
      "Real-time class scheduling and notifications",
      "Integration with wearable devices",
      "Personalized workout plan generation",
    ],
  },
  {
    id: "farmers-friend-website",
    title: "Farmers Friend Website",
    category: "Agriculture",
    description: "Empowering farmers with a digital marketplace to sell produce directly, access real-time market analytics, and connect with buyers in their communities.",
    longDescription: "Built a platform for farmers to showcase produce, manage listings, connect with buyers, and access farming resources, market analytics, and weather forecasts.",
    image: "https://images.unsplash.com/photo-1500595046891-90c22e7b2c26?w=800&auto=format&fit=crop",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    
    challenges: [
      "Building marketplace matching algorithms",
      "Real-time price updates and notifications",
      "Supporting multiple payment methods for farmers",
    ],
  },
]

export const blogPosts = [
  {
    id: 1,
    title: "Mastering React Hooks: A Complete Guide",
    excerpt: "Deep dive into useState, useEffect, useContext, and custom hooks with practical examples.",
    date: "2024-01-15",
    readTime: "8 min",
    category: "React",
    url: "#",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Flask",
    excerpt: "Best practices for structuring Flask applications that can handle millions of requests.",
    date: "2024-01-08",
    readTime: "12 min",
    category: "Backend",
    url: "#",
  },
  {
    id: 3,
    title: "The Art of Clean Code",
    excerpt: "Principles and patterns for writing maintainable, readable code that stands the test of time.",
    date: "2023-12-20",
    readTime: "6 min",
    category: "Best Practices",
    url: "#",
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getAllProjects = () => projects;
export const getProjectById = (id: string) => projects.find(p => p.id === id);
