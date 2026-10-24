import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Cpu,
  Terminal,
  Copy,
  Check,
  X,
  Layers,
  Box,
  ArrowUpRight,
  Play,
} from 'lucide-react';

const GithubIcon = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  simEngine: string;
  middleware: string;
  hardware: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  repoUrl?: string;
  quickCommand?: string;
  youtubeId?: string;
  architectureSteps: string[];
  bodyHtml: string;
}

interface Props {
  projects: ProjectItem[];
}

export default function ProjectExplorer({ projects }: Props) {
  const availableCategories = [
    'All Systems',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All Systems');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null);

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects =
    activeCategory === 'All Systems'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Measure and align sliding tab indicator
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = tabRefs.current[activeCategory];
      const container = tabsContainerRef.current;
      if (activeEl && container) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeCategory, availableCategories.length]);

  const openProjectDrawer = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeProjectDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    setTimeout(() => {
      setSelectedProject(null);
    }, 280);
  }, []);

  // Listen for Command Menu selection and Toast trigger events
  useEffect(() => {
    const handleOpenFromCmd = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string }>;
      const match = projects.find((p) => p.slug === customEvent.detail.slug);
      if (match) openProjectDrawer(match);
    };

    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      if (customEvent.detail?.message) {
        setCopiedText(customEvent.detail.message);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => {
          setCopiedText(null);
        }, 2200);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeProjectDrawer();
      }
    };

    window.addEventListener('open-project-drawer', handleOpenFromCmd);
    window.addEventListener('show-toast', handleToastEvent);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-project-drawer', handleOpenFromCmd);
      window.removeEventListener('show-toast', handleToastEvent);
      window.removeEventListener('keydown', handleKeyDown);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [projects, isDrawerOpen, openProjectDrawer, closeProjectDrawer]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setCopiedText(null), 2200);
  };

  return (
    <div className="relative">
      {/* Category Filter Bar with Sliding Pill Indicator */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div
          ref={tabsContainerRef}
          className="relative flex flex-wrap items-center gap-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-surface-800/60 dark:bg-surface-900/90 p-1.5 shadow-xs dark:shadow-none"
        >
          {indicatorStyle && (
            <div
              className="pointer-events-none absolute bottom-1.5 top-1.5 rounded-lg bg-white dark:bg-white text-zinc-950 dark:text-surface-950 shadow-sm border border-black/[0.04] dark:border-transparent"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                transition: 'transform 220ms var(--ease-out-strong), width 220ms var(--ease-out-strong)',
                willChange: 'transform, width',
              }}
            />
          )}
          {availableCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                ref={(el) => {
                  tabRefs.current[category] = el;
                }}
                onClick={() => setActiveCategory(category)}
                className={`tactile-btn relative z-10 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-zinc-950 font-semibold dark:text-surface-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <span className="text-[#EB4618] font-bold">✦</span>
          <span>Click any card to open Technical Inspector</span>
        </div>
      </div>

      {/* Project Bento Grid with Staggered Entrance on Filter */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <article
            key={`${activeCategory}-${project.slug}`}
            onClick={() => openProjectDrawer(project)}
            style={{ animationDelay: `${Math.min(index * 40, 160)}ms` }}
            className="card-filter-enter group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-stone-300 dark:border-white/10 bg-white dark:bg-[#161616] p-6 shadow-sm hover:border-[#EB4618] hover:-translate-y-1 transition-all"
          >
            {/* Corner Crosshairs */}
            <span className="crosshair-corner crosshair-tl text-zinc-400">+</span>
            <span className="crosshair-corner crosshair-tr text-zinc-400">+</span>
            <span className="crosshair-corner crosshair-bl text-zinc-400">+</span>
            <span className="crosshair-corner crosshair-br text-zinc-400">+</span>
            <div>
              {/* Visual Robotics Telemetry Preview Slot */}
              <div className="relative mb-5 h-36 w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 bg-[#0F0F0F] p-3 font-mono text-[10px] text-white">
                <div className="absolute inset-0 bg-telemetry-grid opacity-60"></div>
                <div className="relative flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5 text-[#EB4618] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EB4618] animate-ping"></span>
                    <span>2D PLANAR LIDAR // 360° SCAN</span>
                  </span>
                  <span className="text-[9px] text-zinc-400 font-semibold">ISAAC SIM 6.1.0 • JAZZY</span>
                </div>
                <div className="relative mt-2 flex items-center justify-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-[#EB4618]/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#EB4618]"></div>
                    <div className="absolute -top-1 left-2 h-1 w-1 rounded-full bg-orange-300"></div>
                    <div className="absolute top-3 -right-1 h-1 w-1 rounded-full bg-orange-300"></div>
                    <div className="absolute bottom-1 right-2 h-1 w-1 rounded-full bg-orange-300"></div>
                    <div className="absolute -bottom-1 left-3 h-1 w-1 rounded-full bg-orange-300"></div>
                  </div>
                </div>
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[9px] text-zinc-400 border-t border-white/[0.08] pt-1.5">
                  <span>RES: 0.05m/pixel</span>
                  <span className="text-emerald-400 font-semibold">NAV2 POSE LOCALIZED</span>
                </div>
              </div>

              {/* Top Telemetry Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#EB4618]/25 bg-[#EB4618]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#EB4618]">
                  {project.category}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProjectDrawer(project);
                  }}
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-zinc-600 hover:text-[#EB4618] dark:text-zinc-400 dark:hover:text-[#EB4618] transition-colors"
                >
                  <span>INSPECT SPEC</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Title & Subtitle with Apple Display Typography */}
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-zinc-950 group-hover:text-[#EB4618] dark:text-white dark:group-hover:text-[#EB4618] transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.subtitle}
              </p>

              {/* Key Telemetry Metrics Grid */}
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-surface-800/40 dark:bg-surface-950/70 p-3.5">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.04em] text-zinc-400 dark:text-zinc-500">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Hardware / Sim Stack Tags */}
            <div className="mt-6 border-t border-black/[0.05] dark:border-white/[0.06] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-chip rounded-lg px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Origin-Aware Centered Technical Inspector Modal Dialog via Portal */}
      {mounted && selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with Blur */}
          <div
            onClick={closeProjectDrawer}
            className={`fixed inset-0 bg-black/65 dark:bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
              isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Centered Modal Card */}
          <div
            className={`relative z-10 flex w-full max-w-4xl max-h-[90vh] flex-col rounded-2xl sm:rounded-3xl border border-stone-300 dark:border-white/15 bg-white dark:bg-[#161616] text-zinc-950 dark:text-white shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
              isDrawerOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            {/* Swiss Corner Crosshairs */}
            <span className="crosshair-corner crosshair-tl text-zinc-400 z-20">+</span>
            <span className="crosshair-corner crosshair-tr text-zinc-400 z-20">+</span>
            <span className="crosshair-corner crosshair-bl text-zinc-400 z-20">+</span>
            <span className="crosshair-corner crosshair-br text-zinc-400 z-20">+</span>

            {/* Sticky Modal Topbar */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/10 px-5 sm:px-8 py-4 bg-stone-50/90 dark:bg-zinc-900/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md border border-[#EB4618]/25 bg-[#EB4618]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#EB4618]">
                  {selectedProject.category}
                </span>
                <span className="hidden sm:inline font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  // TECHNICAL INSPECTOR
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 dark:border-white/20 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-[#EB4618] hover:text-white dark:text-zinc-200 dark:hover:bg-[#EB4618] dark:hover:text-white transition-all shadow-xs"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">REPO</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={closeProjectDrawer}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 dark:border-white/20 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-[#EB4618] hover:text-white dark:text-zinc-200 dark:hover:bg-[#EB4618] dark:hover:text-white transition-all"
                >
                  <span>CLOSE</span>
                  <kbd className="hidden sm:inline rounded bg-stone-100 dark:bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                    ESC
                  </kbd>
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
              {/* Title & Subtitle */}
              <div>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* YouTube Video or Clean Placeholder */}
              {selectedProject.youtubeId ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 bg-black shadow-lg">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?rel=0`}
                    title={`${selectedProject.title} Demonstration`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dashed border-stone-300 dark:border-white/15 bg-stone-50/80 dark:bg-zinc-900/60 p-6 flex flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#EB4618]/10 text-[#EB4618] border border-[#EB4618]/25 mb-3 shadow-inner">
                    <Play className="h-6 w-6 fill-[#EB4618] translate-x-0.5" />
                  </div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    DEMONSTRATION VIDEO FEED
                  </div>
                  <p className="mt-1 max-w-md text-xs text-zinc-500 dark:text-zinc-400">
                    Embedded YouTube demonstration will stream here once simulation recordings are uploaded.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-stone-200 dark:border-white/10 bg-white dark:bg-zinc-800 px-3 py-1 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Awaiting Video Link</span>
                  </div>
                </div>
              )}

              {/* Environment & Hardware Spec Bar */}
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50/70 dark:bg-zinc-900/50 p-4 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <Box className="mt-0.5 h-4 w-4 shrink-0 text-[#EB4618]" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                      Simulation Engine
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {selectedProject.simEngine}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[#EB4618]" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                      Middleware & AI
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {selectedProject.middleware}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-[#EB4618]" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                      Robot Platform
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {selectedProject.hardware}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Telemetry Metrics Grid */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50/70 dark:bg-zinc-900/50 p-3">
                      <div className="font-mono text-[10px] uppercase text-zinc-500 dark:text-zinc-400">{m.label}</div>
                      <div className="mt-1 font-mono text-xs font-bold text-zinc-900 dark:text-white">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Execution Pipeline Diagram */}
              {selectedProject.architectureSteps && selectedProject.architectureSteps.length > 0 && (
                <div className="rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50/70 dark:bg-zinc-900/50 p-4">
                  <div className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    System Pipeline Architecture
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedProject.architectureSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 rounded-lg border border-stone-200/80 dark:border-white/5 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 shadow-xs"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#EB4618]/15 text-[#EB4618] font-mono text-[11px] font-bold">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Launch Command Snippet (with 1-click Copy) */}
              {selectedProject.quickCommand && (
                <div className="rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50/70 dark:bg-zinc-900/50 p-4">
                  <div className="flex items-center justify-between pb-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      <Terminal className="h-3.5 w-3.5 text-[#EB4618]" />
                      Launch / Training Command
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(selectedProject.quickCommand!, 'Command copied to clipboard')
                      }
                      className="tactile-btn inline-flex items-center gap-1.5 rounded border border-stone-300 dark:border-white/10 bg-white dark:bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    >
                      {copiedText === 'Command copied to clipboard' ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy CLI</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-stone-100 dark:bg-zinc-950 p-3 font-mono text-xs text-zinc-900 dark:text-zinc-200">
                    <code>$ {selectedProject.quickCommand}</code>
                  </pre>
                </div>
              )}

              {/* Markdown Content Rendered from src/content/projects/*.md */}
              <div
                className="prose dark:prose-invert max-w-none space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-zinc-900 dark:[&_h3]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_strong]:text-zinc-900 dark:[&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: selectedProject.bodyHtml }}
              />
            </div>

            {/* Sticky Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 dark:border-white/10 bg-stone-50/90 dark:bg-zinc-900/90 px-5 sm:px-8 py-4 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded border border-stone-200 dark:border-white/10 bg-white dark:bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400"
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
                  className="tactile-btn inline-flex items-center gap-2 rounded-xl bg-[#EB4618] px-4 py-2 text-xs font-bold text-white hover:bg-[#d03d14] shadow-md transition-all ml-auto"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>VIEW REPO ON GITHUB</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Sonner-Style Crisp Floating Toast */}
      <div
        aria-live="polite"
        data-visible={copiedText ? 'true' : 'false'}
        className="toast-surface pointer-events-none fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-surface-900 px-4 py-3 text-xs font-medium text-zinc-900 dark:text-white shadow-xl"
      >
        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span>{copiedText}</span>
      </div>
    </div>
  );
}