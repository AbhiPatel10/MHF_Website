"use client";

import { useState, useEffect, useRef, type FC } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
}

export const AnimatedCounter: FC<AnimatedCounterProps> = ({ targetValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = targetValue;
          if (start === end) return;

          const totalFrames = Math.round(duration / (1000 / 60));
          const increment = Math.max(end / totalFrames, 1);

          const counter = () => {
            start += increment;
            if (start < end) {
              setCount(Math.ceil(start));
              requestAnimationFrame(counter);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(counter);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetValue, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};
