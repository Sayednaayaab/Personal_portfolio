import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Bot, MessageCircle, RotateCcw, X } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { cn } from '@/lib/utils';

/** Fired by the command menu to open the assistant. */
export const OPEN_CHAT_EVENT = 'open-chat';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'portfolio-chat';
const MAX_INPUT = 500;
const firstName = developerInfo.name.split(' ')[0];

const GREETING: ChatMessage = {
  role: 'assistant',
  content: `Hi! I'm ${firstName}'s AI assistant. Ask me about his experience, projects, skills, or how to get in touch.`,
};

const SUGGESTIONS = [
  `What does ${firstName} work on?`,
  'Tell me about his company projects',
  "What's his tech stack?",
  'Is he open to new roles?',
  'How can I contact him?',
];

/** Context-aware follow-ups: picked from the topic of the last exchange, skipping questions already asked. */
const FOLLOW_UPS: { match: RegExp; questions: string[] }[] = [
  { match: /\b(open|hire|hiring|role|roles|available|availability|opportunit\w*|job)\b/i, questions: ['What kind of roles suit him best?', 'Does he take freelance projects?', 'How can I contact him?'] },
  { match: /\b(contact|email|phone|reach|linkedin)\b/i, questions: ['Can I download his resume?', 'Is he open to new roles?'] },
  { match: /\b(irrops|geelo|fleet|company|geelani|current role|at work)\b/i, questions: ['What tech stack does he use at work?', 'Tell me about the B2B fleet platform', 'Is he a good fit for a full-stack role?'] },
  { match: /\b(skill|skills|stack|tech|technolog\w*|framework|language)\b/i, questions: ['Has he used Flutter in production?', 'Which projects show his backend skills?', 'Is he a good fit for a full-stack role?'] },
  { match: /\b(project|projects|built|demo|github)\b/i, questions: ['Tell me about his company projects', 'Which personal projects have live demos?', 'What tech did he use for GeeLo?'] },
  { match: /\b(study|studied|education|college|degree|graduat\w*)\b/i, questions: ['What did he build during college?', 'What is he working on now?'] },
  { match: /\b(freelance|service|services|ecommerce|e-commerce|website for)\b/i, questions: ['What e-commerce work has he done?', 'How can I contact him?'] },
];
const DEFAULT_FOLLOW_UPS = ['Tell me about his company projects', "What's his tech stack?", 'Is he open to new roles?'];

function followUpsFor(messages: ChatMessage[]): string[] {
  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => m.content.toLowerCase().trim()));
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const lastAnswer = messages[messages.length - 1]?.content || '';
  const rule = FOLLOW_UPS.find((r) => r.match.test(lastUser)) || FOLLOW_UPS.find((r) => r.match.test(lastAnswer));
  return [...(rule?.questions || []), ...DEFAULT_FOLLOW_UPS]
    .filter((q, i, all) => all.indexOf(q) === i && !asked.has(q.toLowerCase()))
    .slice(0, 3);
}

function loadMessages(): ChatMessage[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch {
    // Storage unavailable or corrupted: start fresh
  }
  return [GREETING];
}

/** Bold (**text**) and bare URLs, rendered as React nodes (no HTML injection). */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={match.index} className="font-semibold text-foreground">{token.slice(2, -2)}</strong>);
    } else {
      const url = token.replace(/[.,;:]+$/, '');
      parts.push(
        <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 break-all">
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>
      );
      if (url.length < token.length) parts.push(token.slice(url.length));
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Paragraphs and "- " bullet lists. */
function MessageBody({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="ml-4 list-disc space-y-1">
          {bullets.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
        </ul>
      );
      bullets = [];
    }
  };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)/);
    if (bullet) {
      bullets.push(bullet[1]);
    } else {
      flush();
      if (line) blocks.push(<p key={`p-${blocks.length}`}>{renderInline(line)}</p>);
    }
  }
  flush();
  return <div className="space-y-2">{blocks}</div>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // True once the first words of an answer have arrived (hides the typing dots)
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Remember the conversation for this browser session
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Keep the newest message in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const send = async (text: string, history: ChatMessage[] = messages) => {
    const question = text.trim().slice(0, MAX_INPUT);
    if (!question || loading) return;

    const next: ChatMessage[] = [...history, { role: 'user', content: question }];
    setMessages(next);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The greeting is UI-only; don't send it as model context
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING && m.content !== GREETING.content) }),
      });
      const type = response.headers.get('content-type') || '';
      if (!response.ok || type.includes('application/json')) {
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.reply) {
          setMessages([...next, { role: 'assistant', content: data.reply }]);
          return;
        }
        throw new Error(data.message || `Server error (${response.status})`);
      }

      // Stream the answer in as it's generated
      const reader = response.body?.getReader();
      if (!reader) throw new Error('The assistant could not answer right now. Please try again.');
      const decoder = new TextDecoder();
      let answer = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        if (!answer.trim()) continue;
        setStreaming(true);
        const content = answer;
        setMessages([...next, { role: 'assistant', content }]);
      }
      answer += decoder.decode();
      if (!answer.trim()) throw new Error('The assistant could not answer right now. Please try again.');
      setMessages([...next, { role: 'assistant', content: answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  const retry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    const idx = messages.lastIndexOf(lastUser);
    send(lastUser.content, messages.slice(0, idx));
  };

  const reset = () => {
    setMessages([GREETING]);
    setError('');
    setInput('');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const showSuggestions = !messages.some((m) => m.role === 'user');
  const lastIsAnswer = messages.length > 1 && messages[messages.length - 1].role === 'assistant';
  const followUps = !loading && !error && lastIsAnswer ? followUpsFor(messages) : [];

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group fixed z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              right: 'max(20px, env(safe-area-inset-right, 0px))',
              bottom: 'max(20px, env(safe-area-inset-bottom, 0px))',
            }}
            aria-label={`Ask ${firstName}'s AI assistant`}
          >
            <MessageCircle className="size-5 transition-transform group-hover:-rotate-12" />
            <span className="hidden sm:inline">Ask about {firstName}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={`${firstName}'s AI assistant`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed z-50 flex flex-col overflow-hidden border border-border/80 bg-card/95 shadow-2xl shadow-black/40 backdrop-blur-xl inset-x-0 bottom-0 h-[85vh] rounded-t-3xl sm:inset-x-auto sm:h-[600px] sm:max-h-[calc(100vh-40px)] sm:w-[400px] sm:rounded-3xl sm:right-5 sm:bottom-5 origin-bottom-right"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

            {/* Header */}
            <header className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <div className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Bot className="size-5" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold leading-tight">Ask about {firstName}</h2>
                <p className="text-xs text-muted-foreground">AI assistant · answers from his portfolio</p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="size-4" />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={listRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'rounded-br-md bg-primary text-primary-foreground'
                        : 'rounded-bl-md border border-border/60 bg-secondary/60 text-foreground/90'
                    )}
                  >
                    {m.role === 'assistant' ? <MessageBody text={m.content} /> : m.content}
                  </div>
                </motion.div>
              ))}

              {loading && !streaming && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-border/60 bg-secondary/60 px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="size-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs">
                  <p className="font-medium text-foreground">{error}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={retry} className="font-semibold text-accent hover:underline cursor-pointer">
                      Try again
                    </button>
                    <span className="text-muted-foreground">or email {developerInfo.email}</span>
                  </div>
                </div>
              )}

              {followUps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 pt-1"
                  aria-label="Suggested follow-up questions"
                >
                  {followUps.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs text-foreground/80 hover:border-accent/60 hover:text-foreground transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {showSuggestions && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border/80 bg-background/40 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/50 hover:text-foreground transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-border/60 p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-border/80 bg-background/60 p-1.5 focus-within:border-primary transition-colors">
                <label htmlFor="chat-input" className="sr-only">
                  Your question
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder={`Ask anything about ${firstName}…`}
                  className="max-h-28 min-h-[38px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground disabled:opacity-40 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Send question"
                >
                  <ArrowUp className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/70">
                AI answers can be imperfect. For anything important, use the contact form.
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
