import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Download, MapPin, GraduationCap, Code2, Sparkles, Coffee, Clock, CheckCircle2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { developerInfo } from '@/data/developer';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Passionate full-stack & mobile developer dedicated to writing clean code and crafting impactful digital experiences.
          </p>
        </motion.div>

        {/* Modern Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Tile 1: Biography & Core Narrative (Col Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 rounded-3xl p-8 bg-card border border-border/80 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-mono font-medium text-primary">
                <Terminal className="size-3.5" />
                Developer Story
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Architecting scalable web solutions and intuitive mobile experiences.
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                I'm a Computer Science student and full-stack software engineer based in Bangalore. With hands-on experience across modern React, Node.js, and Android development, I focus on turning complex challenges into high-performance, user-friendly digital products.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                When I'm not developing, I study cutting-edge AI workflows, explore RAG systems, and continuously expand my software engineering foundations.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span>{developerInfo.location}</span>
              </div>
              <Button asChild size="sm" className="rounded-xl">
                <a href={developerInfo.resumeUrl} download="Sayed_Mirchoni_Resume.pdf">
                  <Download className="mr-2 size-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Tile 2: Live Local Time & Availability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl p-6 bg-card border border-border/80 shadow-md flex flex-col justify-between space-y-4 group hover:border-accent/50 transition-all duration-300"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Local Time (IST)
                </span>
                <Clock className="size-4 text-accent" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight font-mono text-foreground">
                {currentTime || '12:00:00 PM'}
              </div>
              <p className="text-xs text-muted-foreground">Bangalore, India (UTC+5:30)</p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/60 border border-border/50 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-500">Available to Hire</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open to full-stack, frontend, or mobile engineering roles.
              </p>
            </div>
          </motion.div>

          {/* Tile 3: Stats Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl p-6 bg-card border border-border/80 shadow-md flex flex-col justify-between space-y-4 group hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <Code2 className="size-4 text-primary" />
                Engineering Metrics
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/40 text-center">
                <div className="text-2xl font-bold gradient-text">{developerInfo.projectsCompleted}+</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Projects Built</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/40 text-center">
                <div className="text-2xl font-bold text-accent">500K+</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Lines of Code</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/40 text-center">
                <div className="text-2xl font-bold text-emerald-500">{developerInfo.happyClients}+</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Clients Served</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/40 text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Commitment</div>
              </div>
            </div>
          </motion.div>

          {/* Tile 4: Education & Foundation (Col Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2 rounded-3xl p-6 md:p-8 bg-card border border-border/80 shadow-md space-y-4 group hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <GraduationCap className="size-4 text-primary" />
              Academic Background
            </div>
            {developerInfo.education.map((edu, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-bold">{edu.degree}</h4>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono font-medium">
                    Class of {edu.year}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 font-medium">{edu.school}</p>
                <p className="text-xs text-muted-foreground">Focus Area: {edu.focus}</p>
              </div>
            ))}
          </motion.div>

          {/* Tile 5: Fun Facts & Mindset (Col Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2 lg:col-span-2 rounded-3xl p-6 md:p-8 bg-card border border-border/80 shadow-md space-y-4 group hover:border-accent/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <Coffee className="size-4 text-accent" />
              Quick Facts & Mindset
            </div>
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              {developerInfo.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
