import type { ReactNode } from 'react';
import { MotionConfig, motion, type Variants } from 'framer-motion';
import { CheckCircle2, GitCommitHorizontal, Globe, Lock, Palette, Rocket, GitBranch, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// Pipeline reveal order: node 0, connector 0, stage 1, connector 1, ...
const STEP = 0.28;

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * STEP, type: 'spring', stiffness: 260, damping: 20 },
  }),
};

const connectorVariants: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    scaleY: 1,
    transition: { delay: i * STEP, duration: 0.45, ease: EASE },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * STEP, duration: 0.55, ease: EASE },
  }),
};

/** Connector between pipeline nodes: horizontal on desktop, vertical on mobile, with a travelling packet. */
function Connector({ order, packetDelay }: { order: number; packetDelay: number }) {
  return (
    <div className="relative mx-auto h-10 w-px lg:mx-0 lg:h-px lg:w-auto lg:flex-1" aria-hidden="true">
      <div className="absolute inset-0 bg-border/70" />
      <motion.div
        custom={order}
        variants={connectorVariants}
        className="absolute inset-0 origin-top bg-gradient-to-b from-primary to-accent lg:origin-left lg:bg-gradient-to-r"
      />
      <span className="pipeline-packet" style={{ animationDelay: `${packetDelay}s` }} />
    </div>
  );
}

function Terminal({ order, icon: Icon, label, tone }: { order: number; icon: LucideIcon; label: string; tone: 'start' | 'end' }) {
  return (
    <motion.div custom={order} variants={nodeVariants} className="flex shrink-0 flex-col items-center gap-2">
      <div
        className={cn(
          'relative flex size-12 items-center justify-center rounded-full border bg-card',
          tone === 'end' ? 'border-emerald-400/50 text-emerald-400' : 'border-primary/50 text-primary'
        )}
      >
        {tone === 'end' && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />}
        <Icon className="relative size-5" />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
    </motion.div>
  );
}

interface StageProps {
  order: number;
  index: string;
  verb: string;
  icon: LucideIcon;
  from: ReactNode;
  to: ReactNode;
  caption: string;
}

function Stage({ order, index, verb, icon: Icon, from, to, caption }: StageProps) {
  return (
    <motion.article
      custom={order}
      variants={cardVariants}
      className="group relative w-full rounded-2xl border border-border/70 bg-card/95 p-5 transition-colors duration-300 hover:border-primary/50 lg:w-[270px] lg:shrink-0 xl:w-[300px]"
    >
      {/* Top glow line */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">STAGE {index}</div>
            <div className="text-sm font-bold tracking-tight">{verb}</div>
          </div>
        </div>
        <CheckCircle2 className="size-4 text-emerald-400" aria-hidden="true" />
      </header>

      {/* Mini from → to diagram */}
      <div className="flex items-center gap-2" aria-hidden="true">
        <div className="flex h-12 flex-1 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/40 px-2 text-muted-foreground">
          {from}
        </div>
        <svg viewBox="0 0 32 12" className="w-7 shrink-0 text-accent" fill="none">
          <path d="M0 6h28M23 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex h-12 flex-1 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 px-2 shadow-[0_0_24px_-8px] shadow-primary/60">
          {to}
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{caption}</p>
    </motion.article>
  );
}

/**
 * Personal engineering philosophy drawn as a CI/CD-style pipeline:
 * commit → iterate → design → deploy → live.
 */
export function ManifestoSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="manifesto-heading" className="relative py-20 md:py-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-14 space-y-4 text-center"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
              {'// how I build'}
            </div>
            <h2 id="manifesto-heading" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              From first commit to <span className="gradient-text">secure production</span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Iterating from v1.0 to vNext. Designing from minimalism to maximalism. Deploying from HTTP to HTTPS.
            </p>
          </motion.div>

          {/* Pipeline diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="flex flex-col items-stretch lg:flex-row lg:items-center"
          >
            <Terminal order={0} icon={GitCommitHorizontal} label="commit" tone="start" />
            <Connector order={1} packetDelay={0} />
            <div className="contents">
              <Stage
                order={2}
                index="01"
                verb="Iterate"
                icon={GitBranch}
                from={<span className="font-mono text-lg font-medium">v1.0</span>}
                to={<span className="gradient-text font-mono text-lg font-extrabold">vNext</span>}
                caption="Small, frequent releases that keep improving with every version."
              />
            </div>
            <Connector order={3} packetDelay={0.6} />
            <div className="contents">
              <Stage
                order={4}
                index="02"
                verb="Design"
                icon={Palette}
                from={<span className="text-lg font-extralight tracking-wide">minimal</span>}
                to={<span className="gradient-text text-lg font-black uppercase tracking-tight">maximal</span>}
                caption="From clean, minimal layouts to bold, expressive interfaces."
              />
            </div>
            <Connector order={5} packetDelay={1.2} />
            <div className="contents">
              <Stage
                order={6}
                index="03"
                verb="Deploy"
                icon={Rocket}
                from={<span className="font-mono text-base font-medium">http://</span>}
                to={
                  <span className="flex items-center gap-1.5 font-mono text-base font-bold text-foreground">
                    <span>
                      http<span className="text-emerald-400">s</span>://
                    </span>
                    <Lock className="size-3.5 text-emerald-400" />
                  </span>
                }
                caption="Shipped to production over HTTPS, secure by default."
              />
            </div>
            <Connector order={7} packetDelay={1.8} />
            <Terminal order={8} icon={Globe} label="live" tone="end" />
          </motion.div>

          {/* CI-style status strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 9 * STEP, duration: 0.5 }}
            className="mx-auto mt-12 flex max-w-fit flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-border/60 bg-card/75 px-5 py-2.5 font-mono text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />
              pipeline passed
            </span>
            <span className="hidden text-border sm:inline">|</span>
            <span>iterate ✓</span>
            <span>design ✓</span>
            <span>deploy ✓</span>
            <span className="hidden text-border sm:inline">|</span>
            <span className="text-emerald-400">https://live</span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
