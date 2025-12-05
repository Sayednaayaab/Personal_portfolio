import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { developerInfo } from '@/data/developer';

const socialLinks = [
  { icon: Github, href: developerInfo.socialLinks.github, label: 'GitHub' },
  { icon: Linkedin, href: developerInfo.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: developerInfo.socialLinks.twitter, label: 'Twitter' },
  { icon: Mail, href: developerInfo.socialLinks.email, label: 'Email' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-2">{developerInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{developerInfo.title}</p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-6">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-end gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label={link.label}
              >
                <link.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {developerInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="size-4 text-destructive fill-destructive" /> using React + TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
}
