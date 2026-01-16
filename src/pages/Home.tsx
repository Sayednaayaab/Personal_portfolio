import { Hero } from '@/components/portfolio/Hero';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Sayed Mirchoni | Web developer"
        description="Web developer specializing in React, Python, and modern web technologies. Building impactful web experiences."
      />
      <div className="min-h-screen">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </>
  );
}
