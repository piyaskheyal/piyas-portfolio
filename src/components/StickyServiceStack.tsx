import React from 'react';
import DualImageSwitcher from './DualImageSwitcher';

interface ServiceItem {
  index: string;
  title: string;
  subtitle: string;
  tags: readonly string[];
  description: string;
  imageA: string;
  imageB: string;
}

interface StickyServiceStackProps {
  services: readonly ServiceItem[];
}

export const StickyServiceStack: React.FC<StickyServiceStackProps> = ({ services }) => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {services.map((service, idx) => {
        const isOdd = idx % 2 === 1;
        return (
          <div
            key={service.index}
            className="sticky-card-item rounded-2xl border-2 border-[#EB4618]/30 bg-white dark:bg-[#161616] p-6 sm:p-10 shadow-xl transition-all"
            style={{ top: `${5 + idx * 1.5}rem` }}
          >
            {/* Top Row: Index + Title on left, Summary + Action on right */}
            <div className="grid grid-cols-1 gap-6 border-b border-stone-200 dark:border-white/10 pb-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2">
                  <span className="text-[#EB4618] font-bold">✦</span>
                  <span className="font-mono text-sm font-semibold text-[#EB4618]">
                    {service.index}
                  </span>
                </div>
                <h3
                  className={`mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight ${
                    isOdd ? 'text-[#EB4618]' : 'text-zinc-950 dark:text-white'
                  }`}
                >
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-col justify-between items-start lg:items-end lg:col-span-5">
                <p className="text-sm sm:text-base font-semibold uppercase tracking-tight text-zinc-700 dark:text-zinc-300">
                  {service.subtitle}
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-stone-300 dark:border-white/20 bg-stone-100 dark:bg-zinc-800 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:bg-[#EB4618] hover:border-[#EB4618] hover:text-white transition-all"
                >
                  <span>REQUEST SPEC</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Bottom Row: Left Dual Image Switcher, Right Capabilities */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <DualImageSwitcher
                  imageA={service.imageA}
                  imageB={service.imageB}
                  alt={service.title}
                  labelA="SIM LAB"
                  labelB="REAL RIG"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-zinc-800/80 px-3 py-1 font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StickyServiceStack;
