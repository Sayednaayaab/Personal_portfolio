import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Calendar, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { developerInfo } from '@/data/developer';
import { FuturisticContactForm } from '@/components/forms/FuturisticContactForm';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(developerInfo.email);
    setCopied(true);
    toast({ title: "Email copied!", description: developerInfo.email });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}  
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground text-lg">Have a project in mind? Let's discuss it.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 space-y-12 md:space-y-0">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: developerInfo.email },
                { icon: Phone, label: 'Phone', value: developerInfo.phone },
                { icon: MapPin, label: 'Location', value: developerInfo.location },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={copyEmail} className="flex-1">
                {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
                Copy Email
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 size-4" />
                  Book a Call
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left mb-6">Send a Message</h3>
            <FuturisticContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

