import { Hero } from '@/components/portfolio/Hero';
import { ManifestoSection } from '@/components/portfolio/ManifestoSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
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
        <ManifestoSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </>
  );
}
