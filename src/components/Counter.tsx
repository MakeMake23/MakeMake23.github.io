"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

type CounterProps = {
  from?: number;
  to: number;
  prefix?: string;
  postfix?: string;
};

export default function Counter({ from = 0, to, prefix = "", postfix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = prefix + Math.round(value).toLocaleString() + postfix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, prefix, postfix]);

  return <span ref={ref} />;
}
