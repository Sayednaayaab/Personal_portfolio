import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollToId } from '@/lib/smoothScroll';
import {
  Code,
  Server,
  Smartphone,
  Cpu,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Wrench,
  Globe,
  Layers,
  ShoppingBag,
  Bot,
  Zap,
  Cloud,
} from 'lucide-react';
import { skills, services, ServiceItem } from '@/data/developer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      icon: Code,
      accentColor: 'from-blue-500 to-cyan-400',
      description: 'Building reactive, component-driven, ultra-fast web interfaces.',
      skills: skills.frontend,
    },
    {
      id: 'backend',
      title: 'Backend & Cloud APIs',
      icon: Server,
      accentColor: 'from-emerald-500 to-teal-400',
      description: 'RESTful architectures, microservices, and database optimization.',
      skills: skills.backend,
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: Smartphone,
      accentColor: 'from-purple-500 to-indigo-400',
      description: 'Native Android and cross-platform mobile application engineering.',
      skills: skills.mobile,
    },
    {
      id: 'tools',
      title: 'AI, LLMs & Dev Tools',
      icon: Cpu,
      accentColor: 'from-amber-500 to-orange-400',
      description: 'Workflow automation, RAG pipelines, and cloud deployment pipelines.',
      skills: skills.tools,
    },
  ];

  const getProficiencyLabel = (level?: number) => {
    if (!level || level >= 90) return { label: 'Advanced', color: 'bg-primary/10 text-primary border-primary/30' };
    if (level >= 80) return { label: 'Proficient', color: 'bg-accent/10 text-accent border-accent/30' };
    return { label: 'Working', color: 'bg-secondary text-muted-foreground border-border/50' };
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="size-5" />;
      case 'shopping':
        return <ShoppingBag className="size-5" />;
      case 'android':
        return <Smartphone className="size-5" />;
      case 'consulting':
        return <Layers className="size-5" />;
      case 'backend':
        return <Server className="size-5" />;
      case 'ai':
        return <Bot className="size-5" />;
      case 'automation':
        return <Zap className="size-5" />;
      case 'deploy':
        return <Cloud className="size-5" />;
      default:
        return <Briefcase className="size-5" />;
    }
  };

  const handleInquire = () => {
    setSelectedService(null);
    setTimeout(() => scrollToId('contact'), 150);
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Technical <span className="gradient-text">Constellation</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive matrix of technologies, frameworks, and engineering competencies I leverage to build scalable products.
          </p>
        </motion.div>

        {/* 4 Interactive Category Matrix Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 md:p-7 rounded-3xl bg-card border border-border/80 hover:border-primary/50 shadow-md hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/80 border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <cat.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground tracking-tight">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">{cat.description}</p>
                  </div>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                  {cat.skills.map((skill) => {
                    const prof = getProficiencyLabel(skill.level);
                    return (
                      <div
                        key={skill.name}
                        className="px-3 py-1.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/60 hover:border-primary/40 transition-all flex items-center gap-2 group/item cursor-default"
                      >
                        <span className="text-xs font-semibold text-foreground/90">{skill.name}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${prof.color}`}>
                          {prof.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services & Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
            Solutions
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Specialized Engineering Services
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Click on any card to view detailed specifications, capabilities, and tech stack.
          </p>
        </motion.div>

        {/* Services Grid with Interactive Click Modals */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              onClick={() => setSelectedService(service)}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.07, duration: 0.5 }}
              className="p-6 rounded-3xl bg-card border border-border/80 hover:border-accent/60 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/80 border border-border/50 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  {getServiceIcon(service.icon)}
                </div>
                <h4 className="font-bold text-base tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-border/40 flex items-center justify-between text-xs font-medium text-accent">
                <span className="font-mono">View Details</span>
                <div className="p-1.5 rounded-full bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <ArrowUpRight className="size-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Service Specification Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-xl p-6 sm:p-8 rounded-3xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl">
          {selectedService && (
            <div className="space-y-6">
              {/* Header */}
              <DialogHeader className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-accent/10 text-accent border border-accent/20">
                    {getServiceIcon(selectedService.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                      Service Specification
                    </span>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                      {selectedService.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              {/* Full In-Depth Description */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60">
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {selectedService.fullDescription}
                </p>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Core Architectural Deliverables
                </h5>
                <div className="grid gap-2">
                  {selectedService.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2.5 text-xs text-foreground/80">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2.5 pt-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Technologies Utilized
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <Button onClick={handleInquire} className="flex-1 rounded-xl cursor-pointer">
                  <Sparkles className="mr-2 size-4" />
                  Discuss This Project
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedService(null)}
                  className="rounded-xl cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
