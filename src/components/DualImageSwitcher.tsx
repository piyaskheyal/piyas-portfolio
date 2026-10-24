import React, { useState } from 'react';

interface DualImageSwitcherProps {
  imageA: string;
  imageB: string;
  alt: string;
  labelA?: string;
  labelB?: string;
}

export const DualImageSwitcher: React.FC<DualImageSwitcherProps> = ({
  imageA,
  imageB,
  alt,
  labelA = 'SIMULATION',
  labelB = 'HARDWARE',
}) => {
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');

  return (
    <div className="group relative h-48 sm:h-56 w-full overflow-hidden rounded-lg border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-zinc-900">
      {/* Corner crosshairs */}
      <span className="crosshair-corner crosshair-tl">+</span>
      <span className="crosshair-corner crosshair-tr">+</span>
      <span className="crosshair-corner crosshair-bl">+</span>
      <span className="crosshair-corner crosshair-br">+</span>

      {/* Image A */}
      <img
        src={imageA}
        alt={`${alt} - ${labelA}`}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          activeTab === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      />

      {/* Image B */}
      <img
        src={imageB}
        alt={`${alt} - ${labelB}`}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          activeTab === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      />

      {/* Bottom Center Pill Control [ ■ • ] */}
      <div className="absolute bottom-2.5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-stone-300 dark:border-white/20 bg-white/90 dark:bg-black/80 px-2 py-1 shadow-md backdrop-blur-md">
        <button
          type="button"
          onClick={() => setActiveTab('A')}
          aria-label={`Show ${labelA}`}
          className={`flex h-4 w-4 items-center justify-center rounded-sm transition-all ${
            activeTab === 'A'
              ? 'bg-[#EB4618] text-white'
              : 'bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300'
          }`}
        >
          <span className="block h-1.5 w-1.5 rounded-xs bg-current"></span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('B')}
          aria-label={`Show ${labelB}`}
          className={`flex h-4 w-4 items-center justify-center rounded-sm transition-all ${
            activeTab === 'B'
              ? 'bg-[#EB4618] text-white'
              : 'bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300'
          }`}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-current"></span>
        </button>
      </div>

      {/* Small top-left mode tag */}
      <div className="absolute top-2 left-2 z-20 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white backdrop-blur-sm">
        {activeTab === 'A' ? labelA : labelB}
      </div>
    </div>
  );
};

export default DualImageSwitcher;
