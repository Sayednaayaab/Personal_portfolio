/**
 * Developer portfolio data
 * Customize this file with your own information
 */

export const developerInfo = {
  name: "Sayed Mirchoni",
  profileImage: '/sayed-hd.webp',
  title: "Full-Stack & Mobile Developer",
  tagline: "Building web and mobile products with React, Flutter and Odoo",
  heroSubtitle: "Building web and mobile products with React, Flutter, Odoo and Python",
  email: "www.naayaab2004@gmail.com",
  phone: "+91 8618238048",
  location: "Savanur, Karnataka, India",
  timezone: "IST",
  // Used to calculate "experience" automatically, so the site stays accurate over time
  careerStart: "2026-04-01",
  graduationYear: 2026,
  projectsCompleted: 10,
  // Edit this when your job-search status changes
  availability: {
    open: true,
    label: "Open to new opportunities",
    note: "Open to full-stack, frontend and mobile engineering roles, and freelance projects.",
  },

  biography: `I'm a Software Developer in Hubli, Karnataka, and a 2026 Computer Science graduate. I build web and mobile products on top of Odoo, from Flutter apps to React portals, for teams in aviation, logistics and business communication.

At Geelani Consultancy and Solutions I've shipped a Flutter messaging app integrated with Odoo and Firebase push notifications, an IRROPS passenger management system for Air India and Air India Express, and a B2B transport and fleet platform with agency and vendor portals. Before that, I built and deployed full-stack personal projects in e-commerce, healthcare, fitness and agriculture.

I care about understanding the user's problem first, then delivering clean, reliable software that solves it.`,

  funFacts: [
    "Shipped 10+ projects across web, mobile, and Odoo, from first commit to production",
    "My first real project was a gym membership platform",
    "I can visualize a product from a conversation and turn requirements into a clear UI before writing code",
    "Fueled by ~2 cups of coffee per coding session",
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
      role: "Software Developer",
      organization: "Geelani Consultancy and Solutions",
      period: "Apr 2026 – Present",
      current: true,
      location: "Hubli, India",
      description: "Building web and mobile products on Odoo: a Flutter communication app with Firebase push notifications, an IRROPS passenger management system for Air India and Air India Express, and a B2B transport and fleet platform with agency and vendor portals.",
      skills: ["Flutter", "Dart", "React.js","Next.js", "Odoo", "Django", "Python", "FastAPI", "Firebase", "Traccar"],
    },
    {
      role: "B.E. in Computer Science",
      organization: "Smt Kamala and Shri Venkappa M Agadi College of Engineering and Technology",
      period: "2022 – 2026",
      current: false,
      location: "Karnataka, India",
      description: "Graduated in early 2026 with a focus on software engineering and AI. Alongside coursework, built and deployed full-stack projects including Vivid Commerce, HealthBloom, Resume Savvy, Gym Buddy and FarmWise Hub.",
      skills: ["Data Structures", "Algorithms", "DBMS", "Python", "Software Engineering"],
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
    { name: "FastAPI", level: 80, icon: "fastapi" },
    { name: "Firebase", level: 80, icon: "firebase" },
  ],
  mobile: [
    { name: "Java", level: 85, icon: "java" },
    { name: "Kotlin", level: 80, icon: "kotlin" },
    { name: "React Native", level: 80, icon: "react-native" },
    { name: "Flutter", level: 95, icon: "flutter" },
    { name: "Dart", level: 85, icon: "dart" },
  ],
  tools: [
    { name: "GitHub", level: 92 },
    { name: "Figma", level: 70 },
    { name: "n8n", level: 80 },
    { name: "LLMs", level: 85 },
    { name: "RAG", level: 80 },
    { name: "Docker", level: 75 },
    { name: "Vercel", level: 88 },
    { name: "Traccar", level: 75 },
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
    techStack: ["n8n", "Webhooks", "REST APIs", "Node.js", "Docker", "Cloud Cron"]
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

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  /** Omitted for private company projects */
  liveUrl?: string;
  /** Omitted for private company projects */
  githubUrl?: string;
  featured: boolean;
  /** Built as part of company work; shown with a "Company Project" badge instead of links */
  professional?: boolean;
  challenges?: string[];
  highlights?: string[];
  /** Main building blocks in order, shown as a system overview in the project details panel */
  architecture?: string[];
}

export const projects: Project[] = [
  // Professional company projects (private: no public repo or demo)
  {
    id: "geelo-odoo-communication",
    title: "GeeLo — Odoo Communication App",
    category: "Mobile App",
    description: "Mobile messaging app that improves on Odoo's web-based communication, with a Flutter frontend integrated with the Odoo backend and Firebase push notifications.",
    longDescription: "Developed a user-friendly mobile communication application to improve the messaging experience of Odoo's web-based communication system, which had usability limitations. Built the frontend using Flutter and integrated it with the Odoo backend. Implemented Firebase push notifications to improve message delivery awareness and user engagement.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=85",
    techStack: ["Flutter", "Dart", "Odoo", "Python", "Firebase Cloud Messaging", "JSON-RPC API"],
    featured: true,
    professional: true,
    architecture: ["Flutter app (Dart)", "JSON-RPC API", "Odoo backend (Python)", "Firebase Cloud Messaging", "Push notifications"],
    highlights: [
      "Improved the user experience of Odoo communication on mobile",
      "Integrated Flutter with the Odoo backend",
      "Implemented Firebase push notifications",
      "Built a mobile-first messaging experience",
    ],
  },
  {
    id: "airline-irrops-passenger-management",
    title: "Airline IRROPS Passenger Management",
    category: "Aviation",
    description: "Passenger management system for Air India and Air India Express disruptions: scan-based data capture, centralized records, and coordination of transport, hotels and meals.",
    longDescription: "Developed a system to help manage airline passengers during irregular operations (IRROPS), addressing the operational challenges of maintaining passenger data and coordinating essential services during disruptions for Air India and Air India Express. Implemented passenger data capture through scanning, centralized passenger records, and a management portal to coordinate transportation, hotel accommodation, and passenger meal information.",
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=85",
    techStack: ["React", "Odoo"],
    featured: true,
    professional: true,
    architecture: ["Passenger scanning", "React management portal", "Odoo backend", "Transport, hotels & meals"],
    highlights: [
      "Passenger data capture through scanning",
      "Centralized passenger record management",
      "Coordination of transportation and hotel accommodation",
      "Passenger meal tracking and operational data management",
      "Streamlined disruption-management workflows",
    ],
  },
  {
    id: "b2b-transport-fleet-management",
    title: "B2B Transport & Fleet Management",
    category: "Logistics",
    description: "B2B transport platform for airline IRROPS and corporate clients, with bulk and roster-based bookings, per-km and hourly rentals, plus agency and vendor portals.",
    longDescription: "Developed a B2B transportation management platform for airline IRROPS operations and corporate clients. The system supports manual trip generation on client requests, bulk transportation bookings, per-kilometre and hourly vehicle rentals, and roster-based corporate transportation. Built an agency portal for managing organizations and vendor fleet records, along with a vendor portal for receiving and accepting trip requests.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=85",
    techStack: ["React", "FastAPI", "Odoo", "Traccar"],
    featured: true,
    professional: true,
    architecture: ["Client & roster requests", "React agency portal", "FastAPI + Odoo backend", "Vendor portal", "Traccar fleet tracking"],
    highlights: [
      "Manual trip creation and bulk transport management",
      "Per-kilometre and hourly vehicle rental workflows",
      "Roster-based corporate transportation",
      "Agency portal for organization and fleet management",
      "Vendor portal for trip request handling and acceptance",
    ],
  },

  // Personal & college projects
  {
    id: "vivid-commerce",
    title: "Vivid Commerce Website",
    category: "E-commerce",
    description: "A vibrant e-commerce platform featuring dynamic product catalogs, seamless shopping cart experience, and modern checkout flow with integrated payment systems.",
    longDescription: "Built a scalable e-commerce solution with real-time inventory management, secure payment integration, order tracking, and a comprehensive admin panel with analytics.",
    image: "/images/projects/vivid-commerce.webp",
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
    image: "/images/projects/healthbloom.webp",
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
    image: "/images/projects/resume-builder.webp",
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
    image: "/images/projects/gymbuddy.webp",
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
    id: "mm-rentals",
    title: "MM Rentals — Real Estate & Rental Portal",
    category: "Real Estate",
    description: "Real estate and rental platform for an external client, listing land for sale and shops, houses and apartments for lease or rent. Ads posted from an admin portal appear on the main portal.",
    longDescription: "Built a real estate and rental platform for an external client. The main portal lists land for sale and shops, houses and apartments available for lease or rent. Listings are managed by the client through a separate admin portal: when an admin posts a property, the ad is created automatically on the main portal. Built with React and Supabase.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
    techStack: ["React", "Supabase"],
    liveUrl: "https://mmrentals.vercel.app/",
    featured: true,
    professional: true,
    architecture: ["Admin portal", "Supabase backend", "Main portal (React)", "Property ads"],
    highlights: [
      "Built for an external real estate and rental client",
      "Listings for land for sale, shops, houses and apartments for lease or rent",
      "Admin portal for posting and managing properties",
      "Ads posted by the admin are created on the main portal",
    ],
  },
  {
    id: "gym-management-app",
    title: "Gym Management App",
    category: "Mobile App",
    description: "React Native app for an external gym client to register members, manage memberships, track expiries and renew or reassign plans, with each member's personal details stored securely in Firebase.",
    longDescription: "Built a gym management mobile app for an external client with React Native and Firebase. Staff register new members with their personal details and assign a membership plan. The app tracks each membership's expiry, flags members whose plans are about to run out, and lets staff renew the same plan or reassign a different one, keeping the member's full history. Member data lives in Firebase, so it stays in sync across the gym's devices.",
    image: "/images/projects/gym-management.webp",
    techStack: ["React Native", "Firebase"],
    featured: true,
    professional: true,
    architecture: ["React Native app", "Firebase Auth", "Firestore (members & plans)", "Expiry tracking", "Renew / reassign"],
    highlights: [
      "Built for an external gym client",
      "Member registration with personal details",
      "Membership plans with expiry tracking",
      "Renew a plan or reassign a new one on expiry",
      "Data synced across devices with Firebase",
    ],
  },
  {
    id: "farmers-friend-website",
    title: "Farmers Friend Website",
    category: "Agriculture",
    description: "Empowering farmers with a digital marketplace to sell produce directly, access real-time market analytics, and connect with buyers in their communities.",
    longDescription: "Built a platform for farmers to showcase produce, manage listings, connect with buyers, and access farming resources, market analytics, and weather forecasts.",
    image: "/images/crop-field.webp",
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

