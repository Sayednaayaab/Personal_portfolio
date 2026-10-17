import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Calendar, Copy, Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { developerInfo } from '@/data/developer';
import { FuturisticContactForm } from '@/components/forms/FuturisticContactForm';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(developerInfo.email);
    setCopied(true);
    toast({ title: 'Email copied to clipboard!', description: developerInfo.email });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind, want to collaborate, or looking to recruit? Drop me a message.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-card border border-border/80 shadow-md space-y-8"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">Contact Information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Feel free to reach out via email, phone, or connect through social media. I respond within 24 hours.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: developerInfo.email, href: `mailto:${developerInfo.email}` },
                { icon: Phone, label: 'Phone', value: developerInfo.phone, href: `tel:${developerInfo.phone}` },
                { icon: MapPin, label: 'Location', value: developerInfo.location, href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-2xl bg-secondary/80 border border-border/50 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm md:text-base font-semibold hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm md:text-base font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
              <MagneticButton strength={15} className="flex-1">
                <Button variant="outline" onClick={copyEmail} className="w-full rounded-xl cursor-pointer">
                  {copied ? <Check className="mr-2 size-4 text-emerald-500" /> : <Copy className="mr-2 size-4" />}
                  {copied ? 'Copied!' : 'Copy Email'}
                </Button>
              </MagneticButton>

              <MagneticButton strength={15} className="flex-1">
                <Button variant="secondary" asChild className="w-full rounded-xl cursor-pointer">
                  <a href={`mailto:${developerInfo.email}`}>
                    <Calendar className="mr-2 size-4" />
                    Direct Email
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Futuristic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="p-1 rounded-3xl bg-gradient-to-b from-primary/30 via-border/40 to-transparent">
              <div className="p-6 md:p-8 rounded-[23px] bg-card/90 backdrop-blur-xl border border-border/60 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="size-5 text-primary" />
                  <h3 className="text-xl font-bold tracking-tight">Send a Direct Message</h3>
                </div>
                <FuturisticContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
