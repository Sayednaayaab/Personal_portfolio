import { forwardRef, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Code, Cpu, Layers, Server, Smartphone, type LucideIcon } from 'lucide-react';
import { skills } from '@/data/developer';
import { cn } from '@/lib/utils';
import { skillIcons } from './skillIcons';

type CategoryId = 'all' | keyof typeof skills;

interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  /** Tailwind gradient stops, e.g. "from-blue-500 to-cyan-400" */
  gradient: string;
}

interface Skill {
  name: string;
  level: number;
  category: Exclude<CategoryId, 'all'>;
}

const categories: Category[] = [
  { id: 'all', label: 'All', icon: Layers, gradient: 'from-primary to-accent' },
  { id: 'frontend', label: 'Frontend', icon: Code, gradient: 'from-blue-500 to-cyan-400' },
  { id: 'backend', label: 'Backend', icon: Server, gradient: 'from-emerald-500 to-teal-400' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, gradient: 'from-purple-500 to-indigo-400' },
  { id: 'tools', label: 'AI & Tools', icon: Cpu, gradient: 'from-amber-500 to-orange-400' },
];

const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>;

const allSkills: Skill[] = (Object.keys(skills) as Array<keyof typeof skills>).flatMap((category) =>
  skills[category].map((s) => ({ name: s.name, level: s.level, category }))
);

function proficiency(level: number) {
  if (level >= 90) return 'Advanced';
  if (level >= 80) return 'Proficient';
  return 'Working';
}

function initials(name: string) {
  const parts = name.replace(/[^A-Za-z0-9 ]/g, ' ').split(' ').filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}

/** Skill card with a cursor-following spotlight and an animated proficiency bar. */
// forwardRef: AnimatePresence mode="popLayout" needs a ref to measure cards as they leave
const SkillCard = forwardRef<HTMLDivElement, { skill: Skill; index: number; animate: boolean }>(function SkillCard(
  { skill, index, animate },
  ref
) {
  const cat = categoryById[skill.category];
  const brand = skillIcons[skill.name];
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      layout={!reduceMotion}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.4) }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-4 transition-colors duration-300 hover:border-primary/50"
    >
      {/* Spotlight that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)',
        }}
      />

      <div className="relative flex items-center gap-3">
        {brand ? (
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/60 shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            style={{
              background: brand.color
                ? `color-mix(in oklab, ${brand.color} 14%, var(--secondary))`
                : 'var(--secondary)',
            }}
          >
            <brand.icon className="size-6 text-foreground" style={brand.color ? { color: brand.color } : undefined} />
          </div>
        ) : (
          <div
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110',
              cat.gradient
            )}
          >
            {initials(skill.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">{skill.name}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <cat.icon className="size-3" />
            {cat.label}
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {proficiency(skill.level)}
        </span>
      </div>

      {/* Proficiency bar */}
      <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', cat.gradient)}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${skill.level}%` : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.2 + Math.min(index * 0.04, 0.6), ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
});

function MarqueeRow({ items, reverse }: { items: Skill[]; reverse?: boolean }) {
  // Duplicated so the -50% translate loops seamlessly
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={cn('flex w-max gap-3 py-1.5', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}>
        {loop.map((skill, i) => {
          const cat = categoryById[skill.category];
          return (
            <div
              key={`${skill.name}-${i}`}
              aria-hidden={i >= items.length}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur"
            >
              <span className={cn('size-2 rounded-full bg-gradient-to-r', cat.gradient)} />
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SkillsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<CategoryId>('all');

  const visible = active === 'all' ? allSkills : allSkills.filter((s) => s.category === active);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <div ref={ref} className="mb-24 space-y-10">
      {/* Scrolling tech ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="space-y-3"
      >
        <MarqueeRow items={allSkills.slice(0, half)} />
        <MarqueeRow items={allSkills.slice(half)} reverse />
      </motion.div>

      {/* Category tabs with a sliding indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-border/80 bg-card/70 p-1.5 backdrop-blur">
          {categories.map((cat) => {
            const count = cat.id === 'all' ? allSkills.length : skills[cat.id].length;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                className={cn(
                  'relative flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors sm:px-4',
                  isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-indicator"
                    className={cn('absolute inset-0 rounded-xl bg-gradient-to-r shadow-lg', cat.gradient)}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <cat.icon className="relative size-4" />
                <span className="relative">{cat.label}</span>
                <span
                  className={cn(
                    'relative rounded-md px-1.5 font-mono text-[10px]',
                    isActive ? 'bg-white/20' : 'bg-secondary'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Filterable skill grid */}
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((skill, i) => (
            <SkillCard key={`${skill.category}-${skill.name}`} skill={skill} index={i} animate={isInView} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
