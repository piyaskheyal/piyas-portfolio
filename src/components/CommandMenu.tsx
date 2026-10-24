import React, { useState, useEffect, useRef } from 'react';
import { Search, Cpu, Mail, Github, ArrowRight } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-[14vh] px-4">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={() => setOpen(false)} />

      {/* Instant 0ms Command Palette Container */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-surface-900 shadow-2xl">
        <div className="flex items-center border-b border-white/[0.08] px-4 py-3">
          <Search className="mr-3 h-4 w-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to robotics project, stack, or copy email..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-surface-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Engineering Projects
          </div>
          {filtered.map((p) => (
            <button
              key={p.slug}
              onClick={() => selectProject(p.slug)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-200 hover:bg-surface-800 hover:text-white"
            >
              <span className="flex items-center gap-2.5">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-medium">{p.title}</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400">{p.category}</span>
            </button>
          ))}

          <div className="mt-2 border-t border-white/[0.06] pt-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Direct Actions
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(SITE_CONFIG.email);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-200 hover:bg-surface-800 hover:text-white"
          >
            <span className="flex items-center gap-2.5">
              <Mail className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copy Email ({SITE_CONFIG.email})</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
          </button>
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-zinc-200 hover:bg-surface-800 hover:text-white"
          >
            <span className="flex items-center gap-2.5">
              <Github className="h-3.5 w-3.5 text-emerald-400" />
              <span>Open GitHub Profile</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
          </a>
        </div>
      </div>
    </div>
  );
}