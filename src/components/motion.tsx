"use client";

import { useEffect, useRef, type ReactNode } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Runs `fn` on scroll and resize, at most once per frame. */
function useScrollFrame(fn: () => void) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  });
  useEffect(() => {
    if (reduced()) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      saved.current();
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);
}

/** Thin bar across the top of the page that fills with the seven component colours. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max) : 0})`;
  });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
      style={{
        transform: "scaleX(0)",
        background: "linear-gradient(90deg,#6d02c7,#9f25ad,#0079ac,#376400,#e0b300,#d57c00,#b50000)",
      }}
    />
  );
}

/** Drifts its content against the scroll; positive speeds lag behind, negative ones run ahead. */
export function Parallax({
  speed = 0.12,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shift = useRef(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    // Stacked mobile layouts have no room to drift without overlapping their neighbours.
    if (window.innerWidth < 1024) {
      shift.current = 0;
      el.style.transform = "";
      return;
    }
    const rect = el.getBoundingClientRect();
    if (!rect.height) return;
    const centre = rect.top - shift.current + rect.height / 2;
    shift.current = (centre - window.innerHeight / 2) * -speed;
    el.style.transform = `translate3d(0, ${shift.current.toFixed(1)}px, 0)`;
  });
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/** Text that inks in word by word as it travels up the viewport. */
export function ScrubText({
  as: Comp = "h2",
  children,
  className,
}: {
  as?: "h2" | "p";
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = children.trim().split(/\s+/);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = clamp((vh * 0.9 - rect.top) / (vh * 0.55 + rect.height));
    const spans = el.children;
    for (let i = 0; i < spans.length; i++) {
      const on = clamp(progress * (spans.length + 2) - i);
      (spans[i] as HTMLElement).style.opacity = String(0.14 + 0.86 * on);
    }
  });
  return (
    <Comp ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="transition-opacity duration-300">
          {w}{" "}
        </span>
      ))}
    </Comp>
  );
}

/** Tilts its content toward the pointer, with a soft highlight that follows it. */
export function Tilt({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className={className}
      style={{ perspective: "700px" }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || reduced()) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.transition = "transform 0.08s linear";
        el.style.transform = `rotateX(${((0.5 - y) * 14).toFixed(2)}deg) rotateY(${((x - 0.5) * 14).toFixed(2)}deg) scale(1.03)`;
        el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
        el.style.transform = "";
      }}
    >
      <div ref={ref} className="tilt-face relative h-full">
        {children}
      </div>
    </div>
  );
}

/** Feeds a smoothed pointer position (-1…1) to the nearest `.hero` as --mx / --my. */
export function HeroPointer() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const hero = ref.current?.closest<HTMLElement>(".hero");
    if (!hero || reduced()) return;
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      hero.style.setProperty("--mx", now.x.toFixed(3));
      hero.style.setProperty("--my", now.y.toFixed(3));
      frame = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return <span ref={ref} hidden />;
}
