import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Server, Wrench, Briefcase } from 'lucide-react';
import { skills, services } from '@/data/developer';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Services</h2>
          <p className="text-muted-foreground text-lg">Technologies I work with and services I offer</p>
        </motion.div>

        {/* Skills */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Frontend', icon: Code, skills: skills.frontend },
            { title: 'Backend', icon: Server, skills: skills.backend },
            { title: 'Tools', icon: Wrench, skills: skills.tools },
          ].map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, j) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: i * 0.2 + j * 0.1, duration: 0.8 }}
                        className="h-full progress-fill rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-2xl font-bold text-center mb-8"
        >
          Services I Offer
        </motion.h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border card-hover text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="size-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{service.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <p className="text-sm font-medium text-primary">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
