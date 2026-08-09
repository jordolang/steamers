"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Adds `.is-visible` once the element scrolls into view, then stops observing.
 * One-shot by design — content that re-animates every time you scroll past it
 * gets tiring on a long page.
 *
 * The animation itself lives in CSS (`.reveal` / `.reveal-stagger`), so
 * `prefers-reduced-motion` is honoured there in one place.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
  threshold = 0.15,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: boolean;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = window.setTimeout(() => el.classList.add("is-visible"), delay);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay, threshold]);

  return (
    <Tag ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}>
      {children}
    </Tag>
  );
}
