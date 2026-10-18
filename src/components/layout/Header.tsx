import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { scrollToTarget } from '@/lib/smoothScroll';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
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

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      if (window.scrollY < 150) {
        setActiveSection('home');
        return;
      }

      for (let i = navLinks.length - 1; i >= 1; i--) {
        const section = document.getElementById(navLinks[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navLinks[i].id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm'
            : 'bg-transparent'
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
              <span className="font-bold tracking-tight">Sayed.dev</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-secondary/40 backdrop-blur-md border border-border/40">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      'relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer',
                      isActive ? 'text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                size="sm"
                onClick={() => handleNavClick('contact')}
                className="cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] transition-shadow"
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
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
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {link.name}
                      </button>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <Button onClick={() => handleNavClick('contact')} className="w-full">
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
