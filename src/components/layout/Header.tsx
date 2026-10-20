import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Briefcase, Search } from 'lucide-react';
import { OPEN_COMMAND_MENU } from './CommandMenu';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { scrollToTarget } from '@/lib/smoothScroll';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section on scroll
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    // The browser reports which section crosses a band near the top of the viewport,
    // so nothing is measured on each scroll frame (no forced layout while animating).
    const visible = new Set<string>();
    const pick = () => {
      // Last nav section (in page order) inside the band wins. Between sections
      // (e.g. "How I build", which isn't in the nav) keep the previous one.
      const active = [...navLinks].reverse().find((link) => visible.has(link.id));
      if (active) setActiveSection(active.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        pick();
      },
      // Band from 200px below the top to 55% down the screen
      { rootMargin: '-200px 0px -45% 0px' }
    );

    // Sections mount lazily after the splash; retry briefly until they exist
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    const observeSections = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
      if (sections.length < navLinks.length && attempts++ < 20) {
        timer = setTimeout(observeSections, 250);
      }
      sections.forEach((section) => observer.observe(section));
    };
    observeSections();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToId(id);
      }, 150);
      return;
    }

    scrollToId(id);
  };

  const scrollToId = (id: string) => {
    if (id === 'home') {
      scrollToTarget(0);
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      scrollToTarget(element);
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-emerald-400 z-[100] origin-left shadow-[0_0_12px_rgba(59,130,246,0.6)]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500',
          isScrolled
            ? 'bg-background/75 backdrop-blur-xl border-white/[0.06] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => scrollToId('home')}
              className="inline-flex items-center gap-2.5 text-xl font-bold gradient-text h-full group"
            >
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                <Briefcase className="size-5" />
              </div>
              {/* Neon tube light: flickers on after the splash, then glows with the odd flicker */}
              <span className="neon-tube font-bold tracking-tight" data-text="Sayed.dev">
                Sayed.dev
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      'relative px-3 lg:px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer',
                      isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/90 to-primary/70 ring-1 ring-inset ring-white/15 shadow-[0_0_18px_rgba(59,130,246,0.35)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer"
                aria-label="Open quick menu (Ctrl+K)"
              >
                <Search className="size-3.5" />
                <kbd className="font-mono text-[10px]">Ctrl K</kbd>
              </button>
              <Button
                size="sm"
                onClick={() => handleNavClick('contact')}
                className="cursor-pointer rounded-full px-5 text-white font-semibold bg-gradient-to-b from-primary to-primary/80 ring-1 ring-inset ring-white/15 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] transition-shadow"
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full border border-white/[0.08] bg-white/[0.03]">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 backdrop-blur-xl bg-background/95">
                  <nav className="flex flex-col gap-5 mt-10">
                    {navLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={cn(
                          'text-xl font-medium text-left py-2 px-3 rounded-lg transition-colors cursor-pointer',
                          activeSection === link.id
                            ? 'bg-primary/15 text-white font-semibold ring-1 ring-inset ring-primary/30'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {link.name}
                      </button>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <Button onClick={() => handleNavClick('contact')} className="w-full text-white font-semibold">
                        Hire Me
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
