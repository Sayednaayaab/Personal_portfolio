import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { developerInfo } from '@/data/developer';

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            Trajectory
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Key milestones, engineering projects, and technical foundations that define my career.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-primary via-accent to-purple-500/20 -translate-x-1/2" />

          <div className="space-y-12">
            {developerInfo.experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-75" />
                    <div className="w-2 h-2 rounded-full bg-accent absolute" />
                  </div>

                  {/* Card Content */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8 w-full">
                    <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/80 hover:border-primary/50 shadow-md hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 space-y-4 group">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                            {exp.period}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                            <MapPin className="size-3 text-primary" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>

                        <p className="text-sm font-medium text-accent flex items-center gap-1.5">
                          <Briefcase className="size-3.5" />
                          {exp.organization}
                        </p>
                      </div>

                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-secondary/80 text-secondary-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

