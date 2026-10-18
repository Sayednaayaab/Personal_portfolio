import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollToId } from '@/lib/smoothScroll';
import {
  Code,
  Server,
  Smartphone,
  Briefcase,
  ArrowUpRight,
  Layers,
  ShoppingBag,
  Bot,
  Zap,
  Cloud,
} from 'lucide-react';
import { services, ServiceItem } from '@/data/developer';
import { SkillsShowcase } from './SkillsShowcase';
import { ServiceDetailsDialog } from './ServiceDetailsDialog';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

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

        <SkillsShowcase />

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
      <ServiceDetailsDialog
        service={selectedService}
        icon={selectedService ? getServiceIcon(selectedService.icon) : null}
        onClose={() => setSelectedService(null)}
        onInquire={handleInquire}
      />
    </section>
  );
}
