import { Link, useLocation } from 'react-router-dom';
import { Menu, Briefcase } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '#' },
  { name: 'About', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Skills', path: '#skills' },
  { name: 'Contact', path: '#contact' },
];

export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isHomepage = location.pathname === '/';

  const handleNavClick = (path: string) => {
    if (path === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('#')) {
      const element = document.getElementById(path.slice(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-bold gradient-text h-full">
            <Briefcase className="size-7 flex-shrink-0" />
            <span className="font-bold leading-none">Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer inline-flex items-center gap-1 group"
              >
                {link.name}
                <motion.div 
                  className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: link.path === '#' ? '100%' : 0 }}
                />
              </motion.button>
            ))}
            <ThemeToggle />
            <Button size="sm" onClick={() => handleNavClick('#contact')} className="cursor-pointer">
              Hire Me
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className="text-lg font-medium text-left cursor-pointer"
                    >
                      {link.name}
                    </button>
                  ))}
                  <Button onClick={() => handleNavClick('#contact')}>Hire Me</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
