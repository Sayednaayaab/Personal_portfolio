import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data/developer';
import { ProjectCard3D } from './ProjectCard3D';
import { ProjectDetailsDialog } from './ProjectDetailsDialog';
import { OPEN_PROJECT_EVENT } from '@/lib/events';
import { cn } from '@/lib/utils';

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // The command menu can open a project's details directly
  useEffect(() => {
    const onOpenProject = (e: Event) => {
      const project = projects.find((p) => p.id === (e as CustomEvent<string>).detail);
      if (project) setTimeout(() => setSelectedProject(project), 450);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpenProject);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpenProject);
  }, []);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A curated collection of web apps, platforms, and mobile applications engineered with modern technologies.
          </p>
        </motion.div>

        {/* Filter Tabs with Shared Layout Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 rounded-full bg-secondary/55 border border-border/40 max-w-fit mx-auto"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'relative px-5 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer',
                  isActive ? 'text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid with Smooth AnimatePresence */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard3D key={project.id} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectDetailsDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
