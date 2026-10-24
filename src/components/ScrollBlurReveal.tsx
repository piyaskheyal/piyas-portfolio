import React, { useEffect, useRef, useState } from 'react';

interface ScrollBlurRevealProps {
  primaryText: string;
  blurredText: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'div';
}

export const ScrollBlurReveal: React.FC<ScrollBlurRevealProps> = ({
  primaryText,
  blurredText,
  className = '',
  tag: Tag = 'h2',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={headingRef as any}
      className={`section-heading-split tracking-[-0.03em] ${className}`}
    >
      <span className="block text-zinc-950 dark:text-white transition-colors duration-300">
        {primaryText}
      </span>
      <span
        className={`block text-stone-400 dark:text-zinc-500 transition-all duration-700 ease-out will-change-[filter,opacity] ${
          isRevealed
            ? 'filter-none opacity-100'
            : 'filter blur-[10px] opacity-35'
        }`}
      >
        {blurredText}
      </span>
    </Tag>
  );
};

export default ScrollBlurReveal;
