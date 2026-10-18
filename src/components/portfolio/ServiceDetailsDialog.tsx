import { useEffect, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'framer-motion';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ServiceItem } from '@/data/developer';
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll';

interface ServiceDetailsDialogProps {
  service: ServiceItem | null;
  icon: ReactNode;
  onClose: () => void;
  onInquire: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 26, staggerChildren: 0.07, delayChildren: 0.12 },
  },
  exit: { opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE } },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <h5 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-px w-5 bg-gradient-to-r from-accent to-primary" />
      {children}
    </h5>
  );
}

/** Animated detail panel for a service card in the Skills section. */
export function ServiceDetailsDialog({ service, icon, onClose, onInquire }: ServiceDetailsDialogProps) {
  const isOpen = service !== null;

  // Pause Lenis so the wheel scrolls the dialog, not the page behind it
  useEffect(() => {
    if (!isOpen) return;
    stopSmoothScroll();
    return () => startSmoothScroll();
  }, [isOpen]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {service && (
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

              <DialogPrimitive.Content asChild forceMount>
                <div className="fixed inset-0 z-[61] flex items-end justify-center outline-none sm:items-center sm:p-6">
                  <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

                  <motion.div
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    data-lenis-prevent
                    className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-3xl border border-border/80 bg-card p-6 shadow-2xl shadow-black/40 sm:rounded-3xl sm:p-8"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

                    <DialogPrimitive.Close
                      className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary/60 text-muted-foreground transition-all hover:rotate-90 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Close service details"
                    >
                      <X className="size-4" />
                    </DialogPrimitive.Close>

                    <div className="space-y-6">
                      {/* Header */}
                      <motion.header variants={sectionVariants} className="space-y-3 pr-10">
                        <div className="flex items-center gap-3">
                          <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
                            className="rounded-2xl border border-accent/20 bg-accent/10 p-3 text-accent"
                          >
                            {icon}
                          </motion.div>
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                              Service Specification
                            </span>
                            <DialogPrimitive.Title className="text-2xl font-bold tracking-tight">
                              {service.title}
                            </DialogPrimitive.Title>
                          </div>
                        </div>
                        <DialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </DialogPrimitive.Description>
                      </motion.header>

                      {/* Full description */}
                      <motion.div
                        variants={sectionVariants}
                        className="rounded-2xl border border-border/60 bg-secondary/40 p-4 text-xs leading-relaxed text-foreground/90 sm:text-sm"
                      >
                        {service.fullDescription}
                      </motion.div>

                      {/* Capabilities */}
                      <motion.section variants={sectionVariants}>
                        <SectionLabel>Core Deliverables</SectionLabel>
                        <motion.ul variants={listVariants} className="grid gap-2">
                          {service.capabilities.map((cap) => (
                            <motion.li
                              key={cap}
                              variants={itemVariants}
                              className="flex items-start gap-2.5 text-xs text-foreground/85 sm:text-sm"
                            >
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                              <span>{cap}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.section>

                      {/* Tech stack */}
                      <motion.section variants={sectionVariants}>
                        <SectionLabel>Technologies Used</SectionLabel>
                        <motion.div variants={listVariants} className="flex flex-wrap gap-1.5">
                          {service.techStack.map((tech) => (
                            <motion.span
                              key={tech}
                              variants={pillVariants}
                              className="rounded-lg border border-border/50 bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.section>

                      {/* Actions */}
                      <motion.div variants={sectionVariants} className="flex items-center gap-3 border-t border-border/60 pt-5">
                        <Button onClick={onInquire} className="flex-1 cursor-pointer rounded-xl">
                          <Sparkles className="mr-2 size-4" />
                          Discuss This Project
                        </Button>
                        <Button variant="outline" onClick={onClose} className="cursor-pointer rounded-xl">
                          Close
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </MotionConfig>
    </DialogPrimitive.Root>
  );
}
