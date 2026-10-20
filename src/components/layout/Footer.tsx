import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { scrollToId, scrollToTarget } from '@/lib/smoothScroll';

const socialLinks = [
  { icon: Github, href: developerInfo.socialLinks.github, label: 'GitHub' },
  { icon: Linkedin, href: developerInfo.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: developerInfo.socialLinks.twitter, label: 'Twitter' },
  { icon: Mail, href: developerInfo.socialLinks.email, label: 'Email' },
];

const quickLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    if (id === 'home') scrollToTarget(0);
    else scrollToId(id);
  };

  return (
    <footer className="border-t border-border/80 bg-card/75">
      <div className="container-custom py-14">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text">{developerInfo.name}</h3>
            <p className="text-xs text-muted-foreground">{developerInfo.heroSubtitle}</p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center flex-wrap gap-6">
            {quickLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.id)}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social media Links */}
          <div className="flex justify-center md:justify-end items-center gap-3">
            {socialLinks.map((link) => (
              <MagneticButton key={link.label} strength={15}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center justify-center border border-border/40 hover:border-transparent"
                  aria-label={link.label}
                >
                  <link.icon className="size-4" />
                </a>
              </MagneticButton>
            ))}
            <MagneticButton strength={15}>
              <button
                onClick={() => handleScrollTo('home')}
                className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center justify-center cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="size-4" />
              </button>
            </MagneticButton>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} {developerInfo.name}. All rights reserved.</p>
          <p className="font-mono">Engineered with React, TypeScript & Tailwind CSS</p>
          <p className="text-[11px] opacity-70">
            Splash character: "Male Character in Suit" by{' '}
            <a
              href="https://sketchfab.com/3d-models/male-character-in-suit-14d3dd2000cf46cca34a4f5fc621ce74"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              sthaarpit
            </a>{' '}
            (
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
              CC BY 4.0
            </a>
            )
          </p>
        </div>
      </div>
    </footer>
  );
}
