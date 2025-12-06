import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { developerInfo } from '@/data/developer';
import { TypewriterEffect } from './TypewriterEffect';
import { ParticleBackground } from './ParticleBackground';
import { TechStackIcons } from './TechStackIcons';

const socialLinks = [
  { icon: Github, href: developerInfo.socialLinks.github, label: 'GitHub' },
  { icon: Linkedin, href: developerInfo.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: developerInfo.socialLinks.twitter, label: 'Twitter' },
  { icon: Mail, href: developerInfo.socialLinks.email, label: 'Email' },
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm font-medium text-primary">Available for new projects</span>
          </motion.div>

          {/* Name & Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="gradient-text">{developerInfo.name}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground"
            >
              {developerInfo.title} | {developerInfo.tagline}
            </motion.p>
          </div>

          {/* Typewriter Skills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-8"
          >
            <TypewriterEffect
              words={['React.js', 'Python', 'JavaScript','Express.js', 'Tailwind', 'Android dev', '']}
              className="text-lg md:text-xl font-mono text-accent"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="group px-8 py-6 text-lg rounded-xl gradient-animated hover:scale-105 transition-transform"
            >
              View Projects
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToContact}
              className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-primary/5 hover:border-primary transition-all"
            >
              Hire Me
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost"
              asChild
              className="px-8 py-6 text-lg rounded-xl hover:bg-secondary"
            >
              <a href={developerInfo.resumeUrl} download>
                <Download className="mr-2 size-5" />
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="p-3 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                aria-label={link.label}
              >
                <link.icon className="size-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pt-12"
          >
            <TechStackIcons />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="size-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
