import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  X,
  Layers,
  Box,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'Bipedal & Isaac Lab' | 'VLA & Manipulation' | 'AMR & SLAM';
  simEngine: string;
  middleware: string;
  hardware: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  repoUrl?: string;
  quickCommand?: string;
  architectureSteps: string[];
  bodyHtml: string;
}

interface Props {
  projects: ProjectItem[];
}

const CATEGORIES = [
  'All Systems',
  'Bipedal & Isaac Lab',
  'VLA & Manipulation',
  'AMR & SLAM',
] as const;

export default function ProjectExplorer({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All Systems');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === 'All Systems'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openProjectDrawer = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    // RequestAnimationFrame ensures @starting-style / transition triggers smoothly
    requestAnimationFrame(() => {
      setIsDrawerOpen(true);
    });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      setSelectedProject(null);
    }, 320);
  }, []);

  // Listen for Command Menu selection events
  useEffect(() => {
    const handleOpenFromCmd = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string }>;
      const match = projects.find((p) => p.slug === customEvent.detail.slug);
      if (match) openProjectDrawer(match);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeProjectDrawer();
      }
    };

    window.addEventListener('open-project-drawer', handleOpenFromCmd);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-project-drawer', handleOpenFromCmd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects, isDrawerOpen, openProjectDrawer, closeProjectDrawer]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2200);
  };

  return (
    <div className="relative">
      {/* Category Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-surface-900/90 p-1.5">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`tactile-btn rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-surface-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-400" />
          <span>Click any module to open Technical Inspector</span>
        </div>
      </div>

      {/* Project Bento Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            onClick={() => openProjectDrawer(project)}
            className="project-card group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.08] bg-surface-900/75 p-6 backdrop-blur-sm"
          >
            <div>
              {/* Top Telemetry Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 transition-colors group-hover:text-white">
                  <span>Inspect</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {project.subtitle}
              </p>

              {/* Key Telemetry Metrics Grid */}
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-surface-950/70 p-3">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="block font-mono text-[10px] uppercase text-zinc-500">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs font-medium text-zinc-200">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Hardware / Sim Stack Tags */}
            <div className="mt-6 border-t border-white/[0.06] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/[0.07] bg-surface-800/70 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Vaul-Style Origin-Aware Technical Inspector Drawer */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          {/* Backdrop */}
          <div
            onClick={closeProjectDrawer}
            className={`drawer-backdrop fixed inset-0 bg-black/70 backdrop-blur-xs ${
              isDrawerOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Slide-over Sheet Panel */}
          <div
            className={`drawer-panel relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-white/10 bg-surface-900 shadow-2xl ${
              isDrawerOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-95'
            }`}
          >
            {/* Sticky Drawer Topbar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                  {selectedProject.category}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  // SYSTEM SPEC
                </span>
              </div>

              <button
                onClick={closeProjectDrawer}
                className="tactile-btn inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-800 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-white/20 hover:text-white"
              >
                <span>Close</span>
                <kbd className="rounded bg-surface-950 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  ESC
                </kbd>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div>
                <h2 id="drawer-title" className="text-2xl font-semibold text-white">
                  {selectedProject.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Environment & Hardware Spec Bar */}
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-white/[0.08] bg-surface-950 p-4 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <Box className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-500">
                      Simulation Engine
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-200">
                      {selectedProject.simEngine}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Layers className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-500">
                      Middleware & AI
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-200">
                      {selectedProject.middleware}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-500">
                      Robot Platform
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-200">
                      {selectedProject.hardware}
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Pipeline Diagram */}
              <div className="rounded-xl border border-white/[0.08] bg-surface-950/60 p-4">
                <div className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-400">
                  System Pipeline Architecture
                </div>
                <div className="space-y-2">
                  {selectedProject.architectureSteps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-surface-900 px-3.5 py-2.5 text-xs text-zinc-200"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-500/15 font-mono text-[11px] font-semibold text-emerald-300">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launch Command Snippet (with 1-click Copy) */}
              {selectedProject.quickCommand && (
                <div className="rounded-xl border border-white/[0.08] bg-surface-950 p-4">
                  <div className="flex items-center justify-between pb-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                      <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                      Launch / Training Command
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(selectedProject.quickCommand!, 'Command copied to clipboard')
                      }
                      className="tactile-btn inline-flex items-center gap-1.5 rounded border border-white/10 bg-surface-800 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-white/20 hover:text-white"
                    >
                      {copiedText === 'Command copied to clipboard' ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy CLI</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-surface-900 p-3 font-mono text-xs text-emerald-300">
                    <code>$ {selectedProject.quickCommand}</code>
                  </pre>
                </div>
              )}

              {/* Markdown Content Rendered from src/content/projects/*.md */}
              <div
                className="prose prose-invert max-w-none space-y-3 text-sm leading-relaxed text-zinc-300 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: selectedProject.bodyHtml }}
              />
            </div>

            {/* Sticky Drawer Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-surface-950 px-6 py-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/10 bg-surface-900 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-surface-950 hover:bg-zinc-200"
                >
                  <span>View Source / Repo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sonner-Style Crisp Floating Toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-white/15 bg-surface-900 px-4 py-3 text-xs font-medium text-white shadow-xl transition-all duration-200 ${
          copiedText
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-95 opacity-0'
        }`}
      >
        <Check className="h-4 w-4 text-emerald-400" />
        <span>{copiedText}</span>
      </div>
    </div>
  );
}