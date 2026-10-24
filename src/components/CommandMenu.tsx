import { useState, useEffect, useRef } from 'react';
import { Search, Cpu, Mail, ArrowRight, Sun, Moon, Layers, Box } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface CmdProject {
  slug: string;
  title: string;
  category: string;
}

interface Props {
  projects: CmdProject[];
}

export default function CommandMenu({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const onToggleEvent = () => setOpen((prev) => !prev);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('toggle-cmd-menu', onToggleEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('toggle-cmd-menu', onToggleEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const selectProject = (slug: string) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('open-project-drawer', { detail: { slug } }));
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      window.dispatchEvent(
        new CustomEvent('show-toast', { detail: { message: 'Switched to Light Theme' } })
      );
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      window.dispatchEvent(
        new CustomEvent('show-toast', { detail: { message: 'Switched to Dark Theme' } })
      );
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 dark:bg-black/70 pt-[14vh] px-4">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={() => setOpen(false)} />

      {/* Instant 0ms Command Palette Container */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/15 bg-surface-900 text-zinc-900 dark:text-zinc-100 shadow-2xl">
        <div className="flex items-center border-b border-black/[0.06] dark:border-white/[0.08] px-4 py-3">
          <Search className="mr-3 h-4 w-4 text-zinc-400 dark:text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to robotics project, toggle theme, copy email..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 dark:text-white dark:placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="rounded border border-black/[0.06] dark:border-white/10 bg-surface-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Engineering Projects
          </div>
          {filtered.map((p) => (
            <button
              key={p.slug}
              onClick={() => selectProject(p.slug)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Cpu className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">{p.title}</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-400">{p.category}</span>
            </button>
          ))}

          <div className="mt-2 border-t border-black/[0.06] dark:border-white/[0.06] pt-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Direct Actions
          </div>
          <button
            onClick={() => {
              setOpen(false);
              window.location.hash = '#experience';
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Jump to Research & Journey</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          </button>
          <button
            onClick={() => {
              setOpen(false);
              window.location.hash = '#rig';
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Box className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Jump to Lab Rig & Hardware Setup</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          </button>
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Sun className="h-3.5 w-3.5 text-emerald-600 dark:hidden" />
              <Moon className="h-3.5 w-3.5 text-emerald-400 hidden dark:block" />
              <span>Toggle Visual Theme (Light / Dark)</span>
            </span>
            <span className="font-mono text-[10px] text-zinc-400">Toggle</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(SITE_CONFIG.email);
              setOpen(false);
              window.dispatchEvent(
                new CustomEvent('show-toast', {
                  detail: { message: `Email copied: ${SITE_CONFIG.email}` },
                })
              );
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Copy Email ({SITE_CONFIG.email})</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          </button>
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <svg className="h-3.5 w-3.5 fill-current text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Open GitHub Profile ({SITE_CONFIG.socials.github.replace('https://github.com/', '@')})</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          </a>
          <a
            href={SITE_CONFIG.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <svg className="h-3.5 w-3.5 fill-current text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Open LinkedIn Profile</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          </a>
          <a
            href={SITE_CONFIG.socials.youtube}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-200 hover:bg-surface-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <svg className="h-3.5 w-3.5 fill-current text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Open YouTube Channel (Mechatronics Archive)</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          </a>
        </div>
      </div>
    </div>
  );
}