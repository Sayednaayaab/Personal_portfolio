import { useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, ExternalLink, Github, Lock, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/developer';
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll';

interface ProjectDetailsDialogProps {
  project: Project | null;
  onClose: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 28, staggerChildren: 0.07, delayChildren: 0.15 },
  },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.22, ease: 'easeIn' } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-px w-5 bg-gradient-to-r from-primary to-accent" />
      {children}
    </h4>
  );
}

export function ProjectDetailsDialog({ project, onClose }: ProjectDetailsDialogProps) {
  const isOpen = project !== null;

  // Pause Lenis so the wheel scrolls the dialog, not the page behind it
  useEffect(() => {
    if (!isOpen) return;
    stopSmoothScroll();
    return () => startSmoothScroll();
  }, [isOpen]);

  const points = project?.highlights ?? project?.challenges ?? [];
  const pointsLabel = project?.highlights ? 'Key Highlights' : 'Challenges Solved';
  const hasLinks = Boolean(project?.liveUrl || project?.githubUrl);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* reducedMotion="user" drops transform animations for visitors who prefer reduced motion */}
      <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {project && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
              <div className="fixed inset-0 z-[61] flex items-end justify-center p-0 outline-none sm:items-center sm:p-6">
                {/* Click-outside area */}
                <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

                <motion.article
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  data-lenis-prevent
                  className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border/80 bg-card shadow-2xl shadow-black/40 sm:rounded-3xl"
                >
                  {/* Gradient edge */}
                  <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

                  <div className="overflow-y-auto overscroll-contain">
                    {/* Cover */}
                    <div className="relative h-52 overflow-hidden sm:h-72">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: EASE }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                      <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                          {project.category}
                        </span>
                        {project.professional ? (
                          <span className="flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                            <Building2 className="size-3.5" />
                            Company Project
                          </span>
                        ) : (
                          project.featured && (
                            <span className="flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground shadow-md">
                              <Sparkles className="size-3" />
                              Featured
                            </span>
                          )
                        )}
                      </div>

                      <DialogPrimitive.Close
                        className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-background/70 text-foreground backdrop-blur-md transition-all hover:rotate-90 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label="Close project details"
                      >
                        <X className="size-4" />
                      </DialogPrimitive.Close>
                    </div>

                    {/* Body */}
                    <div className="relative -mt-10 space-y-8 px-5 pb-8 sm:px-8">
                      <motion.header variants={sectionVariants} className="space-y-2">
                        <DialogPrimitive.Title className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                          {project.title}
                        </DialogPrimitive.Title>
                        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                      </motion.header>

                      <motion.section variants={sectionVariants}>
                        <SectionLabel>Overview</SectionLabel>
                        <p className="text-[15px] leading-relaxed text-foreground/90">{project.longDescription}</p>
                      </motion.section>

                      {project.architecture && project.architecture.length > 0 && (
                        <motion.section variants={sectionVariants}>
                          <SectionLabel>System Overview</SectionLabel>
                          <motion.ol
                            variants={listVariants}
                            className="flex flex-wrap items-center gap-2"
                            aria-label="How the system's main parts connect"
                          >
                            {project.architecture.map((part, i) => (
                              <motion.li key={part} variants={itemVariants} className="flex items-center gap-2">
                                <span className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-foreground sm:text-sm">
                                  {part}
                                </span>
                                {i < project.architecture!.length - 1 && (
                                  <ArrowRight className="size-4 shrink-0 text-accent/70" aria-hidden="true" />
                                )}
                              </motion.li>
                            ))}
                          </motion.ol>
                        </motion.section>
                      )}

                      {points.length > 0 && (
                        <motion.section variants={sectionVariants}>
                          <SectionLabel>{pointsLabel}</SectionLabel>
                          <motion.ul variants={listVariants} className="grid gap-2.5 sm:grid-cols-2">
                            {points.map((point) => (
                              <motion.li
                                key={point}
                                variants={itemVariants}
                                className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-secondary/40 p-3 text-sm leading-snug text-foreground/90 transition-colors hover:border-primary/40"
                              >
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                                <span>{point}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.section>
                      )}

                      <motion.section variants={sectionVariants}>
                        <SectionLabel>Tech Stack</SectionLabel>
                        <motion.div variants={listVariants} className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <motion.span
                              key={tech}
                              variants={pillVariants}
                              className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.section>

                      <motion.footer variants={sectionVariants} className="border-t border-border/60 pt-6">
                        {hasLinks ? (
                          <div className="flex flex-col gap-3 sm:flex-row">
                            {project.liveUrl && (
                              <Button asChild className="flex-1 rounded-xl font-semibold">
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 size-4" />
                                  View Live Demo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button asChild variant="outline" className="flex-1 rounded-xl font-semibold">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 size-4" />
                                  Source Code
                                </a>
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                            <Lock className="mt-0.5 size-4 shrink-0 text-primary" />
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              <span className="font-semibold text-foreground">Private company project.</span> Source code
                              and live demo aren't publicly available. Happy to walk through the architecture and my role
                              in an interview.
                            </p>
                          </div>
                        )}
                      </motion.footer>
                    </div>
                  </div>
                </motion.article>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
      </MotionConfig>
    </DialogPrimitive.Root>
  );
}
