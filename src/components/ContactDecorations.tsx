'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactDecorations() {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(false);
          }, 1000);
          // Disconnect observer after triggering once
          if (ref.current) {
            observer.unobserve(ref.current);
          }
          return () => clearTimeout(timer);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl -z-10 transform -rotate-1"></div>
      <div className="absolute inset-0 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl -z-10 transform rotate-1"></div>
    </div>
  );
}

