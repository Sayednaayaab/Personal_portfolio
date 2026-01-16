import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Vivid Commerce Website',
    category: 'e-commerce',
    year: '2026',
    slug: 'vivid-commerce-website',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    description: 'A vibrant e-commerce platform featuring dynamic product catalogs, seamless shopping cart experience, and modern checkout flow with integrated payment systems.',
    client: 'Vivid Retail',
    location: 'Remote',
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
        alt: 'Vivid product showcase',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1555529771-94b4f0b9be3b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Checkout experience',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '2',
    title: 'Health Care Website',
    category: 'healthcare',
    year: '2026',
    slug: 'health-care-website',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    description: 'Comprehensive healthcare platform connecting patients with providers, featuring appointment scheduling, telemedicine capabilities, and secure health records management.',
    client: 'Health Plus Clinic',
    location: 'Multiple Locations',
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Healthcare dashboard',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '3',
    title: 'Resume Builder & Analyzer Website',
    category: 'resume-builder',
    year: '2026',
    slug: 'resume-builder-analyzer-website',
    coverImage: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=1400&q=80',
    description: 'Advanced resume creation tool with AI-powered analysis, professional templates, skill matching, and real-time suggestions to improve your job prospects.',
    client: 'Career Advance Inc',
    location: 'Remote',
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        alt: 'Resume editor interface',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'Gym Guide Website',
    category: 'gym-guide',
    year: '2026',
    slug: 'gym-guide-website',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    description: 'Complete fitness solution providing personalized workout plans, live class scheduling, trainer connections, and progress tracking for gym enthusiasts.',
    client: 'FitLife Network',
    location: 'National',
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=1200&q=80',
        alt: 'Fitness tracking dashboard',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '5',
    title: 'Farmers Friend Website',
    category: 'farmers',
    year: '2026',
    slug: 'farmers-friend-website',
    coverImage: 'https://images.unsplash.com/photo-1500595046891-90c22e7b2c26?auto=format&fit=crop&w=1400&q=80',
    description: 'Empowering farmers with a digital marketplace to sell produce directly, access real-time market analytics, and connect with buyers in their communities.',
    client: 'FarmersCoop',
    location: 'Rural Communities',
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-1488551557933-47db882dd6a3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Farmers marketplace platform',
        aspectRatio: 'landscape'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
