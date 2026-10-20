import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { lazy, Suspense, useEffect, useState } from 'react';

// Secondary UI loads after the page is interactive, keeping it out of the first paint
const CommandMenu = lazy(() => import('./CommandMenu').then((m) => ({ default: m.CommandMenu })));
const ChatWidget = lazy(() => import('@/components/chat/ChatWidget').then((m) => ({ default: m.ChatWidget })));
import { StarfieldBackground } from './StarfieldBackground';

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
  const [showExtras, setShowExtras] = useState(false);

  useEffect(() => {
    const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, o?: object) => number);
    const id = ric ? ric(() => setShowExtras(true), { timeout: 3000 }) : window.setTimeout(() => setShowExtras(true), 2000);
    return () => ((window as any).cancelIdleCallback ?? clearTimeout)(id);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <StarfieldBackground />
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 relative z-10 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      {showExtras && (
        <Suspense fallback={null}>
          <CommandMenu />
          <ChatWidget />
        </Suspense>
      )}
    </div>
  );
}
