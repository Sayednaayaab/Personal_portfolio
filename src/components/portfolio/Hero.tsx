import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { developerInfo } from '@/data/developer';
import { TypewriterEffect } from './TypewriterEffect';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroPortal3D } from './HeroPortal3D';
import { scrollToId } from '@/lib/smoothScroll';

const socialLinks = [
  { icon: Github, href: developerInfo.socialLinks.github, label: 'GitHub' },
  { icon: Linkedin, href: developerInfo.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: developerInfo.socialLinks.twitter, label: 'Twitter' },
  { icon: Mail, href: developerInfo.socialLinks.email, label: 'Email' },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const scrollToProjects = () => scrollToId('projects');

  const scrollToContact = () => scrollToId('contact');

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:py-28"
    >
      {/* Ambient background mesh lighting */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 dark:opacity-25"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />

      {/* Interactive cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 sm:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(750px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.08), transparent 75%)`
          ),
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content & Typography (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-secondary/80 border border-border/80 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-foreground/90">{developerInfo.availability.label}</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]"
              >
                Building <span className="gradient-text">web &amp; mobile</span> <br className="hidden sm:inline" />
                products with React, <br className="hidden sm:inline" />
                Flutter &amp; Odoo.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-lg sm:text-xl text-muted-foreground font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                I'm <strong className="text-foreground font-semibold">{developerInfo.name}</strong>, a full-stack and mobile developer. I build Odoo-backed apps for aviation and logistics teams, from Flutter mobile apps to React portals.
              </motion.p>
            </div>

            {/* Typewriter Skill Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="h-8 flex items-center justify-center lg:justify-start gap-2.5"
            >
              <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">Tech Focus:</span>
              <TypewriterEffect
                words={[
                  'React & Next.js',
                  'Flutter & Dart',
                  'Odoo & Python',
                  'FastAPI',
                  'Firebase',
                  'TypeScript',
                ]}
                className="text-sm sm:text-base font-mono text-accent font-semibold"
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <MagneticButton strength={20}>
                <Button
                  size="lg"
                  onClick={scrollToProjects}
                  className="group px-7 py-6 text-sm sm:text-base rounded-xl font-semibold shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
                >
                  Explore My Work
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>

              <MagneticButton strength={20}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="px-7 py-6 text-sm sm:text-base rounded-xl border-border/80 hover:bg-secondary/70 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Contact Me
                </Button>
              </MagneticButton>

              <MagneticButton strength={15}>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="px-5 py-6 text-sm sm:text-base rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <a href={developerInfo.resumeUrl} download="Sayed_Mirchoni_Resume.pdf">
                    <Download className="mr-2 size-4" />
                    Resume
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 pt-2"
            >
              {socialLinks.map((link) => (
                <MagneticButton key={link.label} strength={12}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center justify-center border border-border/50 hover:border-transparent hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                    aria-label={link.label}
                  >
                    <link.icon className="size-4" />
                  </a>
                </MagneticButton>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Holographic Picture Showcase (Span 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <HeroPortal3D />
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <button
          onClick={() => scrollToId('about')}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer animate-bounce"
          aria-label="Scroll down to about"
        >
          <ChevronDown className="size-5" />
        </button>
      </motion.div>
    </section>
  );
}
