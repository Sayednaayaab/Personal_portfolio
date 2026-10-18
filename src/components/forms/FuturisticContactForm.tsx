import { useState, type KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Mail, RotateCcw, Send, User, MessageSquare } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { developerInfo } from '@/data/developer';
import { cn } from '@/lib/utils';

const MESSAGE_MAX = 1000;

const contactFormSchema = z.object({
  name: z.string().trim().min(2, { message: 'Please enter at least 2 characters' }).max(100),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }).max(255),
  subject: z.string().trim().min(2, { message: 'Please add a short subject' }).max(200),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Tell me a little more (at least 10 characters)' })
    .max(MESSAGE_MAX, { message: `Please keep it under ${MESSAGE_MAX} characters` }),
  // Honeypot: hidden from people, often filled in by bots
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const inquiryTypes = [
  { label: 'Job opportunity', subject: 'Job opportunity' },
  { label: 'Freelance project', subject: 'Freelance project inquiry' },
  { label: 'Collaboration', subject: 'Collaboration idea' },
  { label: 'Just saying hi', subject: 'Hello!' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'h-12 rounded-xl border-border/80 bg-background/60 pl-10 text-[15px] transition-colors placeholder:text-muted-foreground/50 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive/70';

const fieldMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Contact form posting to /api/contact (Vercel function, or the local backend via the Vite proxy).
 */
export function FuturisticContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [activeType, setActiveType] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  });

  const messageLength = form.watch('message')?.length ?? 0;

  const selectType = (type: (typeof inquiryTypes)[number]) => {
    const currentSubject = form.getValues('subject');
    const isPrefilled = !currentSubject || inquiryTypes.some((t) => t.subject === currentSubject);
    setActiveType(type.label);
    // Only replace the subject if the visitor hasn't typed their own
    if (isPrefilled) form.setValue('subject', type.subject, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSentTo(data.email);
        setStatus('success');
        setActiveType(null);
        form.reset();
      } else {
        setErrorMessage(result.message || `Server error (${response.status}). Please try again later.`);
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  // Ctrl/Cmd + Enter sends from anywhere in the form
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center px-2 py-10 text-center"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            className="relative mb-6 flex size-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/10 [animation-iteration-count:2]" />
            <CheckCircle2 className="size-10 text-emerald-400" />
          </motion.div>
          <h4 className="text-2xl font-bold tracking-tight">Message sent!</h4>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Thanks for reaching out. I'll get back to you at{' '}
            <span className="font-medium text-foreground">{sentTo}</span> within 24 hours.
          </p>
          <Button variant="outline" onClick={() => setStatus('idle')} className="mt-8 cursor-pointer rounded-xl">
            <RotateCcw className="mr-2 size-4" />
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="relative space-y-5" noValidate>
              {/* Inquiry type */}
              <motion.div {...fieldMotion} transition={{ delay: 0.05 }} className="space-y-2.5">
                <p id="inquiry-label" className="text-sm font-medium">
                  What's this about?
                </p>
                <div role="radiogroup" aria-labelledby="inquiry-label" className="flex flex-wrap gap-2">
                  {inquiryTypes.map((type) => {
                    const active = activeType === type.label;
                    return (
                      <button
                        key={type.label}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => selectType(type)}
                        className={cn(
                          'relative cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                          active
                            ? 'border-primary text-primary-foreground'
                            : 'border-border/80 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="inquiry-pill"
                            className="absolute inset-0 rounded-full bg-primary"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <div className="grid gap-5 sm:grid-cols-2">
                <motion.div {...fieldMotion} transition={{ delay: 0.1 }}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <FormControl>
                            <Input {...field} autoComplete="name" placeholder="Jane Doe" className={inputClass} />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div {...fieldMotion} transition={{ delay: 0.15 }}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              placeholder="jane@company.com"
                              className={inputClass}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <motion.div {...fieldMotion} transition={{ delay: 0.2 }}>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <div className="relative">
                        <MessageSquare className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input {...field} placeholder="What would you like to discuss?" className={inputClass} />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...fieldMotion} transition={{ delay: 0.25 }}>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-baseline justify-between">
                        <FormLabel>Message</FormLabel>
                        <span
                          className={cn(
                            'font-mono text-[11px] tabular-nums transition-colors',
                            messageLength > MESSAGE_MAX
                              ? 'text-destructive'
                              : messageLength > MESSAGE_MAX * 0.9
                                ? 'text-amber-400'
                                : 'text-muted-foreground'
                          )}
                        >
                          {messageLength}/{MESSAGE_MAX}
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={6}
                          placeholder="Tell me about your project, role, or idea: goals, timeline, anything useful."
                          className={cn(inputClass, 'h-auto min-h-[150px] resize-y py-3 pl-4 leading-relaxed')}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Honeypot: visually hidden and skipped by keyboard and screen readers */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  Website
                  <input type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
                </label>
              </div>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                    role="alert"
                  >
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm">
                      <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                      <div>
                        <p className="font-medium text-foreground">{errorMessage}</p>
                        <p className="mt-1 text-muted-foreground">
                          You can also email me directly at{' '}
                          <a href={`mailto:${developerInfo.email}`} className="text-primary underline-offset-2 hover:underline">
                            {developerInfo.email}
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div {...fieldMotion} transition={{ delay: 0.3 }} className="space-y-3 pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative h-12 w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-shadow hover:shadow-primary/40 disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isSubmitting ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Sending…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center"
                      >
                        {status === 'error' ? 'Try again' : 'Send message'}
                        <Send className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Button>
                <p className="hidden text-center text-[11px] text-muted-foreground sm:block">
                  Press <kbd className="rounded border border-border bg-secondary px-1 font-mono">Ctrl</kbd> +{' '}
                  <kbd className="rounded border border-border bg-secondary px-1 font-mono">Enter</kbd> to send · I reply
                  within 24 hours
                </p>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
