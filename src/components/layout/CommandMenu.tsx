import { useEffect, useState } from 'react';
import { Bot, Briefcase, Code2, Copy, FileDown, FolderGit2, Github, Home, Linkedin, Mail, Sparkles, User } from 'lucide-react';
import { OPEN_CHAT_EVENT, OPEN_PROJECT_EVENT } from '@/lib/events';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useToast } from '@/hooks/use-toast';
import { developerInfo, projects } from '@/data/developer';
import { scrollToId, scrollToTarget } from '@/lib/smoothScroll';

/** Fired by the header button to open the menu. */
export const OPEN_COMMAND_MENU = 'open-command-menu';
/** Fired by the menu to open a project's details panel (handled in ProjectsSection). */
export { OPEN_PROJECT_EVENT };

const sections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills & services', icon: Code2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

/**
 * Ctrl/⌘ + K quick menu: jump to sections, open projects, grab the resume or email.
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpenRequest = () => setOpen(true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_COMMAND_MENU, onOpenRequest);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpenRequest);
    };
  }, []);

  // Close first, then act, so the dialog's focus/scroll lock doesn't fight the action
  const run = (action: () => void) => {
    setOpen(false);
    setTimeout(action, 120);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(developerInfo.email);
      toast({ title: 'Email copied', description: developerInfo.email });
    } catch {
      toast({ title: 'Copy failed', description: `Email: ${developerInfo.email}` });
    }
  };

  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, projects and actions…" />
      <CommandList data-lenis-prevent>
        <CommandEmpty>No results. Try “projects”, “resume” or “email”.</CommandEmpty>

        <CommandGroup heading="Go to">
          {sections.map(({ id, label, icon: Icon }) => (
            <CommandItem
              key={id}
              value={`go ${label}`}
              onSelect={() => run(() => (id === 'home' ? scrollToTarget(0) : scrollToId(id)))}
            >
              <Icon className="mr-2 size-4" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              value={`project ${project.title} ${project.category} ${project.techStack.join(' ')}`}
              onSelect={() =>
                run(() => {
                  scrollToId('projects');
                  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: project.id }));
                })
              }
            >
              <Sparkles className="mr-2 size-4" />
              <span className="truncate">{project.title}</span>
              <CommandShortcut>{project.professional ? 'Company' : project.category}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="ask ai assistant chat question bot"
            onSelect={() => run(() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT)))}
          >
            <Bot className="mr-2 size-4" />
            Ask the AI assistant
          </CommandItem>
          <CommandItem
            value="download resume cv"
            onSelect={() => run(() => openUrl(developerInfo.resumeUrl))}
          >
            <FileDown className="mr-2 size-4" />
            Open resume (PDF)
          </CommandItem>
          <CommandItem value="copy email address contact" onSelect={() => run(copyEmail)}>
            <Copy className="mr-2 size-4" />
            Copy email address
          </CommandItem>
          <CommandItem value="github code repositories" onSelect={() => run(() => openUrl(developerInfo.socialLinks.github))}>
            <Github className="mr-2 size-4" />
            GitHub
          </CommandItem>
          <CommandItem value="linkedin profile" onSelect={() => run(() => openUrl(developerInfo.socialLinks.linkedin))}>
            <Linkedin className="mr-2 size-4" />
            LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
