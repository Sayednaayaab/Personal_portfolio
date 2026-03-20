import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ParticleBackground } from '@/components/portfolio/ParticleBackground';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper component
 * Provides consistent header and footer across all pages
 * Homepage removes top padding to allow header overlay on hero
 */
export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <ParticleBackground />
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 relative z-10 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
