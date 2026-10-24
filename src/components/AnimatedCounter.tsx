import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g., "12+", "500+", "99.2%", "7+", "160"
  className?: string;
  duration?: number; // ms
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = '',
  duration = 1600,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Parse the numeric part and non-numeric suffix/prefix
    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const rawNumStr = match[1].replace(/,/g, '');
    const suffix = match[2] || '';
    const targetNumber = parseFloat(rawNumStr);
    const isDecimal = rawNumStr.includes('.');
    const decimalPlaces = isDecimal ? rawNumStr.split('.')[1].length : 0;

    const triggerAnimation = () => {
      setHasAnimated(true);
      let startTime: number | null = null;
      const startNumber = Math.max(0, targetNumber * 0.1);

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = startNumber + (targetNumber - startNumber) * easeOutProgress;

        if (isDecimal) {
          setDisplayValue(currentVal.toFixed(decimalPlaces) + suffix);
        } else {
          setDisplayValue(Math.floor(currentVal).toLocaleString() + suffix);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(targetNumber.toFixed(decimalPlaces) + suffix);
        }
      };

      requestAnimationFrame(animate);
    };

    // Check if node is already visible on mount
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggerAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          triggerAnimation();
          observer.unobserve(node);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={containerRef} className={className}>
      {hasAnimated ? displayValue : '0' + (value.replace(/[\d.,]/g, '') || '')}
    </span>
  );
};

export default AnimatedCounter;
