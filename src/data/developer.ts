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
    email: "www.naayaab2004@gmail.com",
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
  ],
  backend: [
    { name: "Python", level: 90, icon: "python" },
    { name: "Express.js", level: 85, icon: "express" },
    { name: "Node.js", level: 85, icon: "nodejs" },
  ],
  mobile: [
    { name: "Android Development", level: 90, icon: "android" },
    { name: "Java", level: 85, icon: "java" },
    { name: "Kotlin", level: 80, icon: "kotlin" },
  ],
  tools: [
    { name: "Git", level: 92 },
    { name: "Android Studio", level: 95 },
    { name: "Figma", level: 70 },
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
    name: "Rahul Sharma",
    role: "CEO",
    company: "InnovateTech Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80&fm=jpg&crop=faces",
    content: "Sayed's expertise in full-stack development transformed our business operations. The Android app he developed has over 50,000 downloads and excellent user reviews. His understanding of Indian market needs was invaluable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Marketing Director",
    company: "DigitalWave India",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80&fm=jpg&crop=faces",
    content: "Working with Sayed was a pleasure. He delivered our e-commerce website with stunning UI/UX design and robust backend. The site handles high traffic seamlessly and our sales have increased significantly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    role: "Technical Lead",
    company: "FinTech Innovations",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80&fm=jpg&crop=faces",
    content: "Sayed's Python and React skills are top-notch. He built our financial dashboard with complex data visualizations and real-time updates. The code is maintainable and the performance is outstanding.",
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
