import React, { useEffect, useState } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface NavigationDrawerProps {
  currentPath?: string;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ currentPath = '/' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    setIsDark(document.documentElement.classList.contains('dark'));

    // Global listener for opening drawer from any button with data-open-drawer
    const handleTrigger = () => setIsOpen(true);
    const triggerButtons = document.querySelectorAll('[data-open-drawer]');
    triggerButtons.forEach((btn) => btn.addEventListener('click', handleTrigger));

    // Handle escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      triggerButtons.forEach((btn) => btn.removeEventListener('click', handleTrigger));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { label: 'HOME', href: '/', num: '01' },
    { label: 'ABOUT', href: '/about', num: '02' },
    { label: 'SERVICES', href: '/service', num: '03' },
    { label: 'BLOGS', href: '/blog', num: '04' },
    { label: 'CONTACT', href: '/contact', num: '05' },
  ];

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-[#140E0C]/98 backdrop-blur-2xl text-white transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex h-14 sm:h-16 w-full items-center justify-between border-b border-white/10 px-4 sm:px-8">
            <a
              href="/"
              className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold tracking-wider text-white hover:text-[#EB4618] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span>{SITE_CONFIG.brandName}</span>
              <span className="text-[10px] text-white/50 tracking-normal font-sans">
                // ROBOTICS & PHYSICAL AI
              </span>
            </a>

            <div className="flex items-center gap-3">
              {/* Theme Toggle inside drawer */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Color Theme"
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-orange-300" />}
                <span className="uppercase text-[10px] tracking-wider">{isDark ? 'Light' : 'Dark'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation drawer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-[#EB4618] hover:border-[#EB4618] transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Drawer Grid Body */}
          <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
            {/* Left 8 Cols: Large Navigation Links */}
            <div className="flex flex-col justify-center border-b border-white/10 px-6 py-8 sm:px-12 sm:py-12 lg:col-span-8 lg:border-b-0 lg:border-r lg:border-white/10">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40 mb-6">
                Navigation Architecture // 05 Routes
              </span>
              <nav className="flex flex-col divide-y divide-white/10">
                {navLinks.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group relative flex items-center justify-between py-4 sm:py-6 transition-colors"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-xs sm:text-sm text-[#EB4618] font-bold">
                          {item.num}
                        </span>
                        <span className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] transition-transform duration-200 group-hover:translate-x-2 ${
                          isActive ? 'text-[#EB4618]' : 'text-white group-hover:text-[#EB4618]'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      <span className="font-mono text-lg text-white/30 transition-transform duration-200 group-hover:scale-125 group-hover:text-[#EB4618]">
                        +
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Right 4 Cols: Contact Details & Socials */}
            <div className="flex flex-col justify-between bg-black/40 p-6 sm:p-10 lg:col-span-4">
              <div className="space-y-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#EB4618] font-semibold">
                  Engineering Contact // Direct
                </span>

                <div className="space-y-4 text-sm text-white/80">
                  <div className="border-b border-white/10 pb-3">
                    <span className="block font-mono text-[10px] uppercase text-white/40">Contact Email</span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="mt-1 block font-mono text-xs sm:text-sm font-semibold text-white hover:text-[#EB4618] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <span className="block font-mono text-[10px] uppercase text-white/40">Lab & Rig Location</span>
                    <span className="mt-1 block font-mono text-xs sm:text-sm text-white/90">
                      {SITE_CONFIG.location}
                    </span>
                  </div>

                  <div className="border-b border-white/10 pb-3">
                    <span className="block font-mono text-[10px] uppercase text-white/40">Operating Hours</span>
                    <span className="mt-1 block font-mono text-xs text-white/70">
                      {SITE_CONFIG.officeHours}
                    </span>
                  </div>

                  <div>
                    <span className="block font-mono text-[10px] uppercase text-white/40">Discipline Focus</span>
                    <span className="mt-1 block text-xs font-medium text-white/90">
                      Physical AI • NVIDIA Isaac Lab • Vision-Language-Action • Embedded RTOS
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Icon Grid at Bottom */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-3">
                  Connect & Inspect
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={SITE_CONFIG.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 py-3 text-white hover:border-[#EB4618] hover:bg-[#EB4618] hover:text-white transition-all text-xs font-mono"
                  >
                    <svg className="h-4 w-4 mb-1 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    <span>GitHub</span>
                  </a>
                  <a
                    href={SITE_CONFIG.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 py-3 text-white hover:border-[#EB4618] hover:bg-[#EB4618] hover:text-white transition-all text-xs font-mono"
                  >
                    <svg className="h-4 w-4 mb-1 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={SITE_CONFIG.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 py-3 text-white hover:border-[#EB4618] hover:bg-[#EB4618] hover:text-white transition-all text-xs font-mono"
                  >
                    <svg className="h-4 w-4 mb-1 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationDrawer;
