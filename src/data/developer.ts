/**
 * Developer portfolio data
 * Customize this file with your own information
 */

export const developerInfo = {
  name: "Alex Chen",
  title: "Full-Stack Developer",
  tagline: "Building Impactful Web Experiences",
  heroSubtitle: "Crafting scalable solutions with React, Python & modern web technologies",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  timezone: "PST",
  yearsOfExperience: 5,
  projectsCompleted: 50,
  happyClients: 30,
  
  biography: `I'm a passionate full-stack developer with 5+ years of experience building 
scalable web applications and APIs. My journey started with a Computer Science degree, 
but my true education came from countless late nights debugging code and shipping products 
that users love.

I specialize in React.js for frontend development and Python/Flask for backend services. 
I've built everything from e-commerce platforms handling thousands of transactions to 
resume analyzers using NLP and weather apps with real-time data.

When I'm not coding, you'll find me contributing to open-source projects, writing 
technical blog posts, or exploring the latest in AI and machine learning. I believe 
great software is built with empathy—understanding user needs and translating them 
into elegant, performant solutions.`,

  funFacts: [
    "I've written over 500,000 lines of code",
    "My first program was a text-based adventure game in Python",
    "I can solve a Rubik's cube in under 2 minutes",
    "Coffee consumption: ~4 cups per coding session",
  ],

  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California, Berkeley",
      year: "2019",
      focus: "Software Engineering & AI",
    },
  ],

  experience: [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Leading frontend architecture and API development for enterprise SaaS platform.",
    },
    {
      title: "Full-Stack Developer",
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
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:alex@example.com",
  },

  resumeUrl: "/resume.pdf",
};

export const skills = {
  frontend: [
    { name: "React.js", level: 95, icon: "react" },
    { name: "TypeScript", level: 90, icon: "typescript" },
    { name: "JavaScript", level: 95, icon: "javascript" },
    { name: "HTML/CSS", level: 95, icon: "html" },
    { name: "Tailwind CSS", level: 90, icon: "tailwind" },
    { name: "Next.js", level: 85, icon: "nextjs" },
  ],
  backend: [
    { name: "Python", level: 90, icon: "python" },
    { name: "Flask", level: 88, icon: "flask" },
    { name: "Express.js", level: 85, icon: "express" },
    { name: "Node.js", level: 85, icon: "nodejs" },
    { name: "PostgreSQL", level: 82, icon: "postgresql" },
    { name: "MongoDB", level: 80, icon: "mongodb" },
  ],
  tools: [
    { name: "Git", level: 92 },
    { name: "Docker", level: 78 },
    { name: "AWS", level: 75 },
    { name: "Linux", level: 85 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 70 },
  ],
};

export const services = [
  {
    title: "Custom Web Applications",
    description: "Full-stack web apps built with React, Next.js, and modern backend technologies. Scalable, secure, and user-friendly.",
    icon: "code",
    price: "Starting at $3,000",
  },
  {
    title: "API Development & Integration",
    description: "RESTful and GraphQL APIs, third-party integrations, payment gateways, and real-time data services.",
    icon: "api",
    price: "Starting at $1,500",
  },
  {
    title: "E-commerce Solutions",
    description: "Custom online stores with secure checkout, inventory management, and analytics dashboards.",
    icon: "shopping",
    price: "Starting at $5,000",
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews, performance optimization, and technical strategy for your development team.",
    icon: "consulting",
    price: "$150/hour",
  },
];

export const projects = [
  {
    id: "ecommerce-platform",
    title: "ShopSmart E-commerce",
    category: "E-commerce",
    description: "A full-featured e-commerce platform with real-time inventory, secure payments via Stripe, and an admin dashboard.",
    longDescription: "Built a scalable e-commerce solution handling 10,000+ daily transactions. Features include real-time inventory management, Stripe payment integration, order tracking, and a comprehensive admin panel with analytics.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    metrics: [
      { label: "Load Time Reduction", value: "40%" },
      { label: "Daily Transactions", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
    challenges: [
      "Implementing real-time inventory sync across multiple warehouses",
      "Optimizing database queries for high-traffic periods",
      "Building a responsive checkout flow with minimal friction",
    ],
  },
  {
    id: "resume-analyzer",
    title: "ResumeIQ Analyzer",
    category: "AI/ML",
    description: "An AI-powered resume analyzer that provides feedback, keyword optimization, and ATS compatibility scores.",
    longDescription: "Developed an NLP-based resume analysis tool that parses documents, extracts key information, and provides actionable feedback for job seekers. Integrated with OpenAI API for intelligent suggestions.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop",
    techStack: ["Python", "Flask", "OpenAI API", "React", "spaCy"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    metrics: [
      { label: "Accuracy Rate", value: "94%" },
      { label: "Users Helped", value: "5K+" },
      { label: "Avg. Score Improvement", value: "35%" },
    ],
    challenges: [
      "Training NLP models on diverse resume formats",
      "Handling PDF parsing with varying structures",
      "Real-time feedback generation without latency",
    ],
  },
  {
    id: "weather-dashboard",
    title: "WeatherWise App",
    category: "API Integration",
    description: "A beautiful weather dashboard with 7-day forecasts, radar maps, and severe weather alerts.",
    longDescription: "Created a responsive weather application that aggregates data from multiple APIs. Features include location-based forecasts, interactive radar maps, and push notifications for severe weather.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop",
    techStack: ["React", "OpenWeather API", "Mapbox", "PWA", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    metrics: [
      { label: "API Response Time", value: "<100ms" },
      { label: "Daily Users", value: "2K+" },
      { label: "PWA Score", value: "98/100" },
    ],
    challenges: [
      "Caching strategies for optimal API usage",
      "Implementing offline-first PWA functionality",
      "Real-time updates without battery drain on mobile",
    ],
  },
  {
    id: "encryption-tool",
    title: "CryptoSafe",
    category: "Security",
    description: "End-to-end encryption toolkit for secure file sharing and message encryption.",
    longDescription: "Built a comprehensive encryption suite supporting AES-256, RSA, and modern cryptographic algorithms. Features secure file sharing, encrypted messaging, and key management.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop",
    techStack: ["Python", "Cryptography", "React", "WebCrypto API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    metrics: [
      { label: "Encryption Speed", value: "500MB/s" },
      { label: "Security Audit", value: "Passed" },
    ],
    challenges: [
      "Implementing client-side encryption without compromising UX",
      "Key exchange protocol design",
    ],
  },
  {
    id: "task-manager",
    title: "TaskFlow Pro",
    category: "Productivity",
    description: "A collaborative task management app with Kanban boards, time tracking, and team analytics.",
    longDescription: "Developed a full-featured project management tool with drag-and-drop Kanban boards, Gantt charts, time tracking, and real-time collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop",
    techStack: ["React", "Express.js", "MongoDB", "Socket.io", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    metrics: [
      { label: "Active Teams", value: "200+" },
      { label: "Tasks Completed", value: "50K+" },
    ],
    challenges: [
      "Real-time sync across multiple clients",
      "Optimistic UI updates for smooth UX",
    ],
  },
  {
    id: "portfolio-generator",
    title: "DevFolio Builder",
    category: "Tools",
    description: "A drag-and-drop portfolio website builder for developers with custom themes and GitHub integration.",
    longDescription: "Created a no-code portfolio builder specifically for developers. Features include GitHub repo integration, customizable themes, blog support, and one-click deployment.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Vercel", "GitHub API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    metrics: [
      { label: "Portfolios Created", value: "1K+" },
      { label: "Avg Build Time", value: "<5min" },
    ],
    challenges: [
      "Drag-and-drop builder with mobile responsiveness",
      "Dynamic theme generation",
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechStartup Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    content: "Alex delivered our e-commerce platform ahead of schedule and exceeded all expectations. The attention to detail and code quality was exceptional. Our conversion rate increased by 35% after launch.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
    content: "Working with Alex on our API infrastructure was a game-changer. The documentation was thorough, the code was clean, and performance improved by 60%. Highly recommend for any backend work.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "CreativeHub",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop",
    content: "Alex built our portfolio platform from scratch and it's beautiful. The user experience is seamless, and our clients love it. Communication throughout the project was excellent.",
    rating: 5,
  },
];

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
