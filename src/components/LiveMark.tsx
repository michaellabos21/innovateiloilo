"use client";

import { useEffect, useRef } from "react";

// The Innovate Iloilo mark, rebuilt as one thick stroked line per colour on its
// original 909 × 1347 canvas so it can draw itself as the section scrolls in.
const STROKE = 100;
const HALF = STROKE / 2;
const PITCH = 155; // distance between band centre lines
const R = PITCH / 2; // the turns are plain half circles

// Each band: colour, left and right edge, and the side it turns back on.
const bands = [
  { color: "#6d02c7", xl: 59, xr: 497, turn: "left" },
  { color: "#8c1e98", xl: 309, xr: 910, turn: "right" },
  { color: "#0079ac", xl: 0, xr: 620, turn: "left" },
  { color: "#386400", xl: 227, xr: 765, turn: "right" },
  { color: "#e0b300", xl: 105, xr: 455, turn: "left" },
  { color: "#d57c00", xl: 237, xr: 656, turn: "right" },
  { color: "#b50000", xl: 247, xr: 664, turn: "left" },
] as const;

const y = (i: number) => 192 + PITCH * i;

const lines = [
  // Red tail at the top, curling round into the first band.
  { color: "#b50000", d: `M309 50H549A71 71 0 0 1 549 192H430` },
  ...bands.map((b, i) => {
    const next = bands[i + 1];
    if (b.turn === "left") {
      const x = b.xl + HALF + R;
      // Run back under the start of the next band, or out to the end on the last one.
      const end = next ? next.xl + HALF + 20 : b.xr - HALF;
      return { color: b.color, d: `M${b.xr - HALF} ${y(i)}H${x}A${R} ${R} 0 0 0 ${x} ${y(i + 1)}H${end}` };
    }
    const x = b.xr - HALF - R;
    return { color: b.color, d: `M${b.xl + HALF} ${y(i)}H${x}A${R} ${R} 0 0 1 ${x} ${y(i + 1)}H${next.xr - HALF - 20}` };
  }),
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** `scroll` draws with the scroll position; `load` draws once, on its own, for pages too short to scroll. */
export function LiveMark({ className = "", mode = "scroll" }: { className?: string; mode?: "scroll" | "load" }) {
  const svg = useRef<SVGSVGElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const el = svg.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const draw = (t: number) =>
      paths.current.forEach((path, i) => {
        if (!path) return;
        const p = clamp(t - i);
        path.style.strokeDashoffset = String(1 - p);
        path.style.opacity = p > 0 ? "1" : "0";
      });

    if (mode === "load") {
      const started = performance.now();
      const tick = (now: number) => {
        const t = clamp((now - started - 300) / 2600);
        draw(t * lines.length);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      if (!rect.height) return;
      const vh = window.innerHeight;
      // Starts as the mark enters the viewport, finished once its lower part is in view.
      draw(clamp((vh * 0.95 - rect.top) / (rect.height * 0.9 + vh * 0.25)) * lines.length);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Start empty, then let the first update draw up to the current scroll position.
    paths.current.forEach((path) => {
      if (!path) return;
      path.style.strokeDashoffset = "1";
      path.style.opacity = "0";
    });
    frame = requestAnimationFrame(() => {
      paths.current.forEach((path) => {
        if (path) path.style.transition = "stroke-dashoffset 0.45s ease-out";
      });
      update();
    });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [mode]);

  return (
    <svg ref={svg} viewBox="-60 -10 1030 1410" fill="none" aria-hidden="true" className={className}>
      {lines.map((line, i) => (
        <path
          key={i}
          ref={(node) => {
            paths.current[i] = node;
          }}
          d={line.d}
          pathLength={1}
          stroke={line.color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray="1 1"
        />
      ))}
    </svg>
  );
}
