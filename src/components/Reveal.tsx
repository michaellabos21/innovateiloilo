"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "li" | "p" | "h2" | "section" | "span";

/**
 * Animates its children into place the first time they scroll into view.
 * `up` fades and lifts, `words` raises each `.word` from behind a mask (see <Words>),
 * `wipe` uncovers the box from the top while the image inside settles.
 * Content already on screen at load is left alone, so nothing is hidden without JS.
 */
export function Reveal({
  as = "div",
  kind = "up",
  delay = 0,
  className,
  style,
  children,
}: {
  as?: Tag;
  kind?: "up" | "words" | "wipe";
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
      data-kind={kind}
      className={className}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/** Splits text into masked words for the `words` reveal. */
export function Words({ children }: { children: string }) {
  return children
    .trim()
    .split(/\s+/)
    .map((w, i) => (
      <span key={i}>
        <span className="word">
          <span style={{ ["--i" as string]: i }}>{w}</span>
        </span>{" "}
      </span>
    ));
}

/** Display heading whose words rise into place on scroll. */
export function Heading({ children, className = "t-display uppercase" }: { children: string; className?: string }) {
  return (
    <Reveal as="h2" kind="words" className={className}>
      <Words>{children}</Words>
    </Reveal>
  );
}
