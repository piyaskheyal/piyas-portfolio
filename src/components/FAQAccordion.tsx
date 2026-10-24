import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: readonly FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-stone-200 dark:divide-white/10 border-y border-stone-200 dark:border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const num = (index + 1).toString().padStart(2, '0');
        return (
          <div key={index} className="group transition-colors">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between py-5 text-left transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-4 sm:gap-6 pr-4">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#EB4618]">
                  {num}
                </span>
                <span className="text-base sm:text-xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white group-hover:text-[#EB4618] transition-colors">
                  {item.q}
                </span>
              </div>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                isOpen
                  ? 'border-[#EB4618] bg-[#EB4618] text-white'
                  : 'border-stone-300 dark:border-white/20 bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
              }`}>
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </div>
            </button>

            {isOpen && (
              <div className="pb-6 pl-8 sm:pl-12 pr-4 sm:pr-8 animate-fadeIn">
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
