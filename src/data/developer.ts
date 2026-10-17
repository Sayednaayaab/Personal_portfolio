/**
 * Developer portfolio data
 * Customize this file with your own information
 */

export const developerInfo = {
  name: "Sayed Mirchoni",
  profileImage: '/sayed.jpg',
  title: "Web developer",
  tagline: "Building impactful web experiences",
  heroSubtitle: "Crafting scalable solutions with React, Node.js, Android & modern technologies",
  email: "www.naayaab2004@gmail.com",
  phone: "+91 8618238048",
  location: "Banglore,Karnataka,India",
  timezone: "IST",
  yearsOfExperience: 0,
  projectsCompleted: 10,
  happyClients: 8,
  
  biography: `I'm a motivated Computer Science student and aspiring full-stack developer passionate about web and Android development. Currently pursuing my B.E. degree, I've built several personal projects including e-commerce platforms, gym management systems, and resume analyzers that showcase my skills.

I specialize in React.js for dynamic frontend experiences, Node.js for backend APIs and services,React native and Android studio for mobile apps. Through hands-on projects, I've created scalable web apps and intuitive mobile applications while continuously learning modern technologies.

When not coding, I research on technologies, observe what's going on in the market, and explore the latest in web and mobile development. I believe great software starts with understanding user needs and delivering clean, efficient solutions.`,

  funFacts: [
    "I've written over 500,000 lines of code",
    "My first program was a Gym mebership platform",
    "I can picturize clearly what is said",
    "Coffee consumption: ~2 cups per coding session",
  ],

  education: [
    {
      degree: "B.E in Computer Science",
      school: "Smt Kamala and Shri Venkappa M Agadi College of Engineering and Technology",
      year: "2026",
      focus: "Software Engineering & AI",
    },
  ],

  experiences: [
    {
      role: "Full-Stack Web & AI Developer",
      organization: "Independent Software Projects",
      period: "2024 - Present",
      location: "Bangalore, India",
      description: "Architected and delivered multiple production-grade web applications including Vivid Commerce, HealthBloom, and Resume Savvy. Implemented high-efficiency REST APIs, responsive glassmorphism interfaces, and integrated OpenAI API for natural language analysis.",
      skills: ["React.js", "Node.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Vercel"],
    },
    {
      role: "Android Application Developer",
      organization: "Mobile App Innovations",
      period: "2023 - 2024",
      location: "Bangalore, India",
      description: "Engineered performant native and cross-platform mobile apps with Java, Kotlin, and React Native. Focused on reactive state handling, offline caching, and responsive material layouts.",
      skills: ["Android Studio", "Java", "Kotlin", "React Native", "Firebase"],
    },
    {
      role: "Computer Science Engineering Student",
      organization: "SMT Kamala & Shri Venakppa M. Agadi Engineering College",
      period: "2022 - 2026",
      location: "Karnataka, India",
      description: "Specializing in Software Engineering, Distributed Systems, Data Structures, and Artificial Intelligence. Leading collaborative projects and mentoring junior engineering students.",
      skills: ["Data Structures", "Algorithms", "Python", "Database Systems", "System Design"],
    },
  ],

  socialLinks: {
    github: "https://github.com/Sayednaayaab",
    linkedin: "https://www.linkedin.com/in/sayed-mirchoni/",
    twitter: "https://x.com/NaayaabM74053?t=YTevlnX_FHVKampX9r-3TA&s=09",
    email: "mailto:www.naayaab2004@gmail.com",
  },

  resumeUrl: "/SAYED__RESUME.pdf",
};

export const skills = {
  frontend: [
    { name: "React.js", level: 95, icon: "react" },
    { name: "TypeScript", level: 90, icon: "typescript" },
    { name: "JavaScript", level: 95, icon: "javascript" },
    { name: "HTML/CSS", level: 95, icon: "html" },
    { name: "Tailwind CSS", level: 90, icon: "tailwind" },
    { name: "Next.js", level: 90, icon: "nextjs" },
  ],
  backend: [
    { name: "Python", level: 90, icon: "python" },
    { name: "Odoo", level: 88, icon: "odoo" },
    { name: "Express.js", level: 85, icon: "express" },
    { name: "Node.js", level: 85, icon: "nodejs" },
    { name: "Flask", level: 85, icon: "flask" },
    { name: "Django", level: 90, icon: "django" },
  ],
  mobile: [
    { name: "Android Development", level: 90, icon: "android" },
    { name: "Java", level: 85, icon: "java" },
    { name: "Kotlin", level: 80, icon: "kotlin" },
    { name: "React Native", level: 80, icon: "react-native" },
    { name: "Flutter", level: 95, icon: "flutter" },
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

export interface ServiceItem {
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  capabilities: string[];
  techStack: string[];
}

export const services: ServiceItem[] = [
  {
    title: "Custom Web Applications",
    description: "End-to-end full-stack web applications engineered for speed, high scalability, and seamless user experiences.",
    fullDescription: "I design and build enterprise-grade web applications from concept to deployment. Using modern frameworks like React.js and Next.js paired with robust Node.js/Express backends, every solution is architected with clean design patterns, modular state management, and responsive interfaces that load instantly across all devices.",
    icon: "code",
    capabilities: [
      "Component-driven Architecture with React & TypeScript",
      "Global State Management & Real-time Caching",
      "Responsive Glassmorphism & Micro-animations",
      "SEO Optimization & Web Core Vitals Excellence"
    ],
    techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Vite"]
  },
  {
    title: "E-commerce Solutions",
    description: "Custom storefronts with high-conversion checkout flows, real-time inventory management, and secure payments.",
    fullDescription: "Modern e-commerce platforms engineered to maximize conversions and deliver fluid shopping experiences. Features include high-speed product filtering, persistent carts, multi-currency payment gateway integrations (Stripe, Razorpay), automated order fulfillment webhooks, and intuitive administrative dashboards for inventory analytics.",
    icon: "shopping",
    capabilities: [
      "Secure Multi-Gateway Checkout (Stripe, Razorpay)",
      "Dynamic Product Catalog with Fast Search & Filters",
      "Admin Dashboard with Real-time Inventory Analytics",
      "Automated Email Receipts & Order Notifications"
    ],
    techStack: ["React.js", "Node.js", "Tailwind CSS", "REST APIs", "Stripe API", "MongoDB/SQL"]
  },
  {
    title: "Android App Development",
    description: "High-performance native and cross-platform mobile apps engineered with Java, Kotlin, and React Native.",
    fullDescription: "Crafting intuitive, responsive Android mobile experiences tailored to user needs. Utilizing Android Studio, Kotlin, and modern Material Design 3 guidelines, I build apps that handle complex background tasks, offline synchronization, secure local storage, and push notifications with zero lag and low battery consumption.",
    icon: "android",
    capabilities: [
      "Native Java & Kotlin Architecture",
      "Offline Data Sync & Room Database Caching",
      "Material Design 3 & Intuitive Mobile UX",
      "Push Notifications & Device Hardware Integrations"
    ],
    techStack: ["Android Studio", "Kotlin", "Java", "React Native", "Firebase", "Room DB"]
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews, performance audits, and technology strategy for scaling development workflows.",
    fullDescription: "Strategic technical guidance to help startups and engineering teams choose the right stack, optimize existing codebases, and eliminate bottlenecks. I conduct thorough code audits, database query profiling, security reviews, and advise on best practices for microservices, state machines, and CI/CD pipelines.",
    icon: "consulting",
    capabilities: [
      "Full-Stack Codebase & Performance Audits",
      "Frontend & Backend Architecture Blueprinting",
      "Security, CORS & Authentication Hardening",
      "Deployment & CI/CD Strategy"
    ],
    techStack: ["System Design", "Web Performance", "API Security", "Git & CI/CD", "Cloud Architecture"]
  },
  {
    title: "Flask Backend Development",
    description: "Lightweight, high-speed Python Flask APIs and microservices for data processing and AI backends.",
    fullDescription: "Specialized backend microservices built with Python and Flask for fast, lean execution. Ideal for AI model inference servers, data aggregation pipelines, RESTful endpoints, and asynchronous tasks. Engineered with proper token authentication, rate limiting, and database ORM integrations.",
    icon: "backend",
    capabilities: [
      "RESTful API Engineering & Swagger Documentation",
      "Python AI Model Serving & Inference Pipelines",
      "JWT Authentication & Role-based Authorization",
      "PostgreSQL & SQLite SQLAlchemy Integration"
    ],
    techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Docker", "Gunicorn"]
  },
  {
    title: "AI & LLM Integration",
    description: "Integrating Large Language Models and Retrieval-Augmented Generation (RAG) into intelligent web apps.",
    fullDescription: "Empower your web applications with artificial intelligence. I integrate cutting-edge OpenAI, Claude, and open-source LLM APIs to build automated document parsers, semantic search engines, resume analyzers, and conversational assistants with Retrieval-Augmented Generation (RAG) and vector databases.",
    icon: "ai",
    capabilities: [
      "Retrieval-Augmented Generation (RAG) Pipelines",
      "OpenAI & Anthropic API End-to-End Integration",
      "Vector Embeddings & Semantic Document Search",
      "Intelligent Content Generation & Resume Parsing"
    ],
    techStack: ["OpenAI API", "Python", "RAG Systems", "Vector DBs", "LangChain", "Node.js"]
  },
  {
    title: "Automation with N8N",
    description: "Custom workflow automation and multi-service integrations for effortless business operations.",
    fullDescription: "Streamline repetitive business processes and connect disparate platforms using N8N workflow automation. I create resilient webhook listeners, automated CRM synchronizations, automated notification pipelines (Slack, Discord, Email), and schedule automated scraping or sync jobs without costly custom maintenance.",
    icon: "automation",
    capabilities: [
      "Multi-Platform Webhook Integrations",
      "Automated CRM, Spreadsheet & Email Sync",
      "Error Handling & Fallback Notification Alerts",
      "Self-Hosted N8N Deployment & Maintenance"
    ],
    techStack: ["N8N", "Webhooks", "REST APIs", "Node.js", "Docker", "Cloud Cron"]
  },
  {
    title: "Vercel Deployment",
    description: "Zero-downtime edge deployments, custom domains, and serverless functions optimized for maximum speed.",
    fullDescription: "Production deployment setups ensuring maximum uptime, global CDN edge caching, and blazing-fast TTFB (Time to First Byte). I configure custom domains, SSL certificates, environment secrets, preview branch workflows, and serverless edge functions for resilient production launches.",
    icon: "deploy",
    capabilities: [
      "Edge Network CDN Configuration & Optimization",
      "Serverless API Functions & Middleware Routing",
      "Custom Domain, DNS & SSL Provisioning",
      "CI/CD Git Integrations with Preview Environments"
    ],
    techStack: ["Vercel", "Serverless Functions", "Edge Middleware", "DNS Management", "Git"]
  },
];

export const projects = [
  {
    id: "vivid-commerce",
    title: "Vivid Commerce Website",
    category: "E-commerce",
    description: "A vibrant e-commerce platform featuring dynamic product catalogs, seamless shopping cart experience, and modern checkout flow with integrated payment systems.",
    longDescription: "Built a scalable e-commerce solution with real-time inventory management, secure payment integration, order tracking, and a comprehensive admin panel with analytics.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","Vercel"],
    liveUrl: "https://gymbuddy-ai-your-smart-coach.vercel.app/",
    githubUrl: "https://github.com/Sayednaayaab/gymbuddy-ai-your-smart-coach.git",
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
    image: "/images/crop-field.jpg",
    techStack: ["React.js", "Node.js", "TailwindCSS","TypeScript","Vercel"],
    liveUrl: "https://farmwise-hub.vercel.app/",
    githubUrl: "https://github.com/Sayednaayaab/farmwise-hub.git",
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

