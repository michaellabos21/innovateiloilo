"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "li" | "p" | "h2" | "section" | "span";

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Content that is already on screen at load is left alone, so nothing is hidden without JS.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
}: {
  as?: Tag;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = as as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
