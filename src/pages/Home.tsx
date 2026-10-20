import { Hero } from '@/components/portfolio/Hero';
import { lazy, Suspense } from 'react';

// Everything below the hero is split out so the first paint only ships the hero
const ProjectsSection = lazy(() => import('@/components/portfolio/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const ExperienceSection = lazy(() => import('@/components/portfolio/ExperienceSection').then((m) => ({ default: m.ExperienceSection })));
const ManifestoSection = lazy(() => import('@/components/portfolio/ManifestoSection').then((m) => ({ default: m.ManifestoSection })));
const SkillsSection = lazy(() => import('@/components/portfolio/SkillsSection').then((m) => ({ default: m.SkillsSection })));
const AboutSection = lazy(() => import('@/components/portfolio/AboutSection').then((m) => ({ default: m.AboutSection })));
const ContactSection = lazy(() => import('@/components/portfolio/ContactSection').then((m) => ({ default: m.ContactSection })));
import { SEOHead } from '@/components/seo/SEOHead';
import { developerInfo } from '@/data/developer';

export default function Home() {
  return (
    <>
      <SEOHead
        title={`${developerInfo.name} | ${developerInfo.title}`}
        description={`${developerInfo.title} specializing in React, Node.js, Android, and modern web architectures. ${developerInfo.tagline}.`}
      />
      <div className="min-h-screen">
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ProjectsSection />
          <ExperienceSection />
          <ManifestoSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </div>
    </>
  );
}
