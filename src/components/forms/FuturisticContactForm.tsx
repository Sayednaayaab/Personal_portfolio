import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, User, Mail, MessageSquare, Send, Sparkles, AlertCircle, Phone, MapPin } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { developerInfo } from '@/data/developer';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }).max(255),
  subject: z.string().trim().min(2, { message: 'Subject must be at least 2 characters' }).max(200),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters' }).max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Futuristic cool contact form with Matrix effect, neon glows, glassmorphism
 * Sends to backend /api/contact
 */
export function FuturisticContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setServerResponse('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setServerResponse(result.message || result.error || 'Unknown error');

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 8000);
      }
    } catch (error) {
      setServerResponse('Network error. Please check backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="rounded-3xl p-12 lg:p-16 border-2 border-emerald-400/30 backdrop-blur-3xl shadow-2xl max-w-md mx-auto text-center space-y-8 overflow-hidden relative bg-black/20 glass"
        style={{
          boxShadow: '0 0 60px rgba(34, 197, 94, 0.4), 0 0 100px rgba(34, 197, 94, 0.2)',
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 250 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 animate-pulse" />
        <motion.div
          className="relative z-10 p-4 bg-white/10 backdrop-blur-xl rounded-2xl"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
        >
          <CheckCircle2 className="size-28 mx-auto text-emerald-400 drop-shadow-2xl" />
        </motion.div>
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold tracking-wide bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Message Sent Successfully!
        </motion.h2>
        <motion.p 
          className="text-xl text-emerald-100/90 font-medium leading-relaxed max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Thanks! Your message has been sent to {developerInfo.email}
        </motion.p>
        <div className="flex gap-3">
          <Sparkles className="size-8 text-emerald-300 animate-ping" />
          <Sparkles className="size-6 text-blue-300 animate-pulse delay-100" />
          <Sparkles className="size-8 text-emerald-300 animate-bounce delay-200" />
        </div>
        <p className="text-emerald-200/70 text-sm font-mono">
          Server: {serverResponse}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="group rounded-3xl p-8 lg:p-12 border-2 border-primary/30 backdrop-blur-3xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-500 relative overflow-hidden max-w-2xl mx-auto bg-gradient-to-br from-background/50 to-card/50 glass"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-pulse" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                  <User className="size-6 text-primary/70" />
                </div>
                <Input
                  {...field}
                  className="h-16 pl-14 pr-4 rounded-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-xl hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-400 font-light text-lg placeholder:text-muted-foreground/50"
                  placeholder="Your Name"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                  <Mail className="size-6 text-accent/70" />
                </div>
                <Input
                  type="email"
                  {...field}
                  className="h-16 pl-14 pr-4 rounded-2xl border-2 border-accent/20 bg-card/80 backdrop-blur-xl hover:border-accent/40 focus:border-accent focus:ring-4 focus:ring-accent/20 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-400 font-light text-lg placeholder:text-muted-foreground/50"
                  placeholder="Your Email"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                  <MessageSquare className="size-6 text-primary/70" />
                </div>
                <Input
                  {...field}
                  className="h-16 pl-14 pr-4 rounded-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-xl hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-400 font-light text-lg placeholder:text-muted-foreground/50"
                  placeholder="Subject"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="absolute top-5 left-4 pointer-events-none z-10">
                  <Send className="size-6 text-accent/70 rotate-12" />
                </div>
                <Textarea
                  {...field}
                  className="pt-12 pb-8 h-48 rounded-3xl border-2 border-accent/20 bg-card/80 backdrop-blur-xl hover:border-accent/40 focus:border-accent focus:ring-4 focus:ring-accent/20 focus:shadow-[0_0_30px_rgba(34,197,94,0.4)] resize-none transition-all duration-400 font-light text-lg placeholder:text-muted-foreground/50 min-h-[200px]"
                  placeholder="Tell me about your project..."
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {serverResponse && !isSuccess && (
            <motion.div 
              className="p-4 rounded-2xl bg-destructive/10 border-2 border-destructive/30 text-destructive font-medium backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle className="inline-block mr-2 size-5" />
              {serverResponse}
            </motion.div>
          )}
          <motion.div className="pt-4">
            <Button
              type="submit"
              className="w-full h-16 rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-accent font-semibold text-lg shadow-2xl hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-[1.02] hover:from-primary/90 hover:to-accent/90 border-0 relative overflow-hidden group"
              disabled={isSubmitting}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span key="loading">
                    <Loader2 className="mr-3 size-8 animate-spin" />
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span key="send" className="flex items-center">
                    <Send className="mr-3 size-8 group-hover:translate-x-2 transition-transform" />
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 origin-left" />
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}

