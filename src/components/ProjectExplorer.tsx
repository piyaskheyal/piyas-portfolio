import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  }, [activeCategory]);

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
          {CATEGORIES.map((category) => {
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
              {project.slug === 'so101-vla' && (
                <div className="relative mb-5 h-36 w-full overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/10 bg-surface-950 p-3 font-mono text-[10px]">
                  <div className="absolute inset-0 bg-telemetry-grid opacity-60"></div>
                  <div className="relative flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>RGB-D CAMERA // 60FPS</span>
                    </span>
                    <span className="text-[9px] text-zinc-500">6-DOF + GRIPPER</span>
                  </div>
                  <div className="relative mt-2 flex items-center justify-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                      <div className="absolute inset-x-0 h-px bg-emerald-500/30"></div>
                      <div className="absolute inset-y-0 w-px bg-emerald-500/30"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[9px] text-zinc-400 border-t border-white/[0.06] pt-1.5">
                    <span>EE POSE: [0.24, -0.12, 0.38]</span>
                    <span className="text-emerald-400 font-semibold">ACT-VLA INFERENCE</span>
                  </div>
                </div>
              )}

              {project.slug === 'bipedal-isaaclab' && (
                <div className="relative mb-5 h-36 w-full overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/10 bg-surface-950 p-3 font-mono text-[10px]">
                  <div className="absolute inset-0 bg-telemetry-grid opacity-60"></div>
                  <div className="relative flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>ISAAC LAB // SIM-TO-REAL</span>
                    </span>
                    <span className="text-[9px] text-zinc-500">4,096 ENVS PARALLEL</span>
                  </div>
                  <div className="relative mt-3 flex items-center justify-center gap-1.5">
                    <div className="h-5 w-1 bg-emerald-500/40 rounded"></div>
                    <div className="h-9 w-1 bg-emerald-500/70 rounded"></div>
                    <div className="h-7 w-1 bg-emerald-400 rounded"></div>
                    <div className="h-12 w-1.5 bg-emerald-300 rounded shadow-xs shadow-emerald-400"></div>
                    <div className="h-6 w-1 bg-emerald-400 rounded"></div>
                    <div className="h-10 w-1 bg-emerald-500/70 rounded"></div>
                    <div className="h-4 w-1 bg-emerald-500/40 rounded"></div>
                    <div className="h-8 w-1 bg-emerald-500/60 rounded"></div>
                    <div className="h-11 w-1.5 bg-emerald-300 rounded"></div>
                  </div>
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[9px] text-zinc-400 border-t border-white/[0.06] pt-1.5">
                    <span>GAIT PHASE: DOUBLE SUPPORT</span>
                    <span className="text-emerald-400 font-semibold">PPO CONVERGED</span>
                  </div>
                </div>
              )}

              {project.slug === 'amr-slam-nav' && (
                <div className="relative mb-5 h-36 w-full overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/10 bg-surface-950 p-3 font-mono text-[10px]">
                  <div className="absolute inset-0 bg-telemetry-grid opacity-60"></div>
                  <div className="relative flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>LIDAR 360° // POINT CLOUD</span>
                    </span>
                    <span className="text-[9px] text-zinc-500">NAV2 C++ CONTROL</span>
                  </div>
                  <div className="relative mt-2 flex items-center justify-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-emerald-500/40">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                      <div className="absolute -top-1 left-2 h-1 w-1 rounded-full bg-emerald-300"></div>
                      <div className="absolute top-3 -right-1 h-1 w-1 rounded-full bg-emerald-300"></div>
                      <div className="absolute bottom-1 right-2 h-1 w-1 rounded-full bg-emerald-300"></div>
                      <div className="absolute -bottom-1 left-3 h-1 w-1 rounded-full bg-emerald-300"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[9px] text-zinc-400 border-t border-white/[0.06] pt-1.5">
                    <span>RES: 0.05m/pixel</span>
                    <span className="text-emerald-400 font-semibold">POSE LOCALIZED</span>
                  </div>
                </div>
              )}

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
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-zinc-950 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition-colors">
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

      {/* Origin-Aware Technical Inspector Drawer via Portal */}
      {mounted && selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[250] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          {/* Backdrop */}
          <div
            onClick={closeProjectDrawer}
            className={`fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
              isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Slide-over Sheet Panel */}
          <div
            className={`relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-stone-200 dark:border-white/10 bg-white dark:bg-[#161616] text-zinc-950 dark:text-white shadow-2xl transition-transform duration-300 ease-out ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Sticky Drawer Topbar */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/10 px-6 py-4 bg-stone-50/80 dark:bg-zinc-900/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md border border-[#EB4618]/25 bg-[#EB4618]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#EB4618]">
                  {selectedProject.category}
                </span>
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  // SYSTEM SPECIFICATION
                </span>
              </div>

              <button
                type="button"
                onClick={closeProjectDrawer}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 dark:border-white/20 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-[#EB4618] hover:text-white dark:text-zinc-200 dark:hover:bg-[#EB4618] dark:hover:text-white transition-all"
              >
                <span>CLOSE</span>
                <kbd className="rounded bg-stone-100 dark:bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                  ESC
                </kbd>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div>
                <h2 id="drawer-title" className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Environment & Hardware Spec Bar */}
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-surface-800/30 dark:bg-surface-950 p-4 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <Box className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                      Simulation Engine
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {selectedProject.simEngine}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Layers className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                      Middleware & AI
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {selectedProject.middleware}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                      Robot Platform
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {selectedProject.hardware}
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Pipeline Diagram */}
              <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-surface-800/20 dark:bg-surface-950/60 p-4">
                <div className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  System Pipeline Architecture
                </div>
                <div className="space-y-2">
                  {selectedProject.architectureSteps.map((step, index) => (
                    <div
                      key={step}
                      style={{ animationDelay: `${index * 45}ms` }}
                      className="drawer-step-enter flex items-center gap-3 rounded-lg border border-black/[0.04] dark:border-white/[0.05] bg-surface-900 px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-200"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-600/15 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 font-mono text-[11px] font-semibold">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launch Command Snippet (with 1-click Copy) */}
              {selectedProject.quickCommand && (
                <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-surface-800/30 dark:bg-surface-950 p-4">
                  <div className="flex items-center justify-between pb-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      Launch / Training Command
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(selectedProject.quickCommand!, 'Command copied to clipboard')
                      }
                      className="tactile-btn inline-flex items-center gap-1.5 rounded border border-black/[0.08] dark:border-white/10 bg-surface-800 px-2.5 py-1 font-mono text-[11px] text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
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
                  <pre className="overflow-x-auto rounded-lg bg-surface-800/60 dark:bg-surface-900 p-3 font-mono text-xs text-emerald-700 dark:text-emerald-300">
                    <code>$ {selectedProject.quickCommand}</code>
                  </pre>
                </div>
              )}

              {/* Markdown Content Rendered from src/content/projects/*.md */}
              <div
                className="prose dark:prose-invert max-w-none space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-900 dark:[&_h3]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_strong]:text-zinc-900 dark:[&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: selectedProject.bodyHtml }}
              />
            </div>

            {/* Sticky Drawer Footer */}
            <div className="flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.08] bg-surface-800/20 dark:bg-surface-950 px-6 py-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded border border-black/[0.06] dark:border-white/10 bg-surface-900 px-2 py-0.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400"
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
                  className="tactile-btn inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-surface-950 dark:hover:bg-zinc-200 shadow-sm"
                >
                  <span>View Source / Repo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
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