import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    featured?: boolean;
    metrics?: { label: string; value: string }[];
  };
  index: number;
}

export function ProjectCard3D({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative h-full flex flex-col bg-card rounded-2xl border border-border/70 hover:border-primary/50 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Cursor glare effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(350px circle at ${gx} ${gy}, rgba(255, 255, 255, 0.08), transparent 80%)`
            ),
          }}
        />

        {/* Thumbnail Image Container */}
        <div className="relative h-52 overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Quick Action Buttons on Hover */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
            {project.featured && (
              <Badge className="bg-primary/90 text-primary-foreground text-xs shadow-md backdrop-blur-sm border-0 font-medium flex items-center gap-1">
                <Sparkles className="size-3" />
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 left-3 z-20">
            <span className="text-xs px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-foreground font-medium border border-border/50">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
          <div className="space-y-2.5">
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary/80 text-secondary-foreground font-mono transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 border-t border-border/60">
              <Button
                asChild
                size="sm"
                className="flex-1 rounded-lg text-xs font-semibold shadow-sm hover:shadow-primary/30 transition-shadow"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 size-3.5" />
                  Live Demo
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-lg text-xs font-semibold border-border/80 hover:bg-secondary"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Github className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
