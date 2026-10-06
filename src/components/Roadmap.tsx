"use client";

import { useEffect, useRef, useState } from "react";
import { roadmap } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Icon } from "./ui";

// The ribbon is rebuilt from the prototype as one thick stroked line per colour, on a
// 1440 × 2700 canvas, so each stretch can be drawn in step with the scroll position.
const W = 1440;
const H = 2700;
const STROKE = 140;
const R = 95; // centre-line radius of the turns
const XL = 150;
const XR = 1290;
const yc = (i: number) => 256 + 337 * i; // centre line of band i

const cap = { color: "#b50000", d: `M994 76H1200A90 90 0 0 1 1200 256H1150`, from: 20, to: 200 };

const segments = roadmap.map((r, i) => {
  const y = yc(i);
  const next = yc(i + 1);
  const last = i === roadmap.length - 1;
  const d =
    i % 2 === 0
      ? `M1142 ${y}H${XL + R}A${R} ${R} 0 0 0 ${XL} ${y + R}V${next - R}A${R} ${R} 0 0 0 ${XL + R} ${next}H${last ? 1147 : 300}`
      : `M298 ${y}H${XR - R}A${R} ${R} 0 0 1 ${XR} ${y + R}V${next - R}A${R} ${R} 0 0 1 ${XR - R} ${next}H1140`;
  return { color: r.color, d, from: y - 60, to: next - 60 + (last ? 100 : 0) };
});

const lines = [cap, ...segments];
const pct = (y: number) => `${(y / H) * 100}%`;
const cq = (px: number) => `${(px / W) * 100}cqw`;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function Roadmap() {
  const box = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  // Rows start visible so the roadmap is complete without JS or with reduced motion.
  const [shown, setShown] = useState<boolean[]>(() => roadmap.map(() => true));

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      if (!rect.width) return; // hidden below the lg breakpoint
      // The drawing head sits about 70% down the viewport, in canvas units.
      const head = ((window.innerHeight * 0.7 - rect.top) / rect.width) * W;
      const next: boolean[] = [];
      lines.forEach((line, i) => {
        const p = clamp((head - line.from) / (line.to - line.from));
        const path = paths.current[i];
        if (path) {
          path.style.strokeDashoffset = String(1 - p);
          path.style.opacity = p > 0 ? "1" : "0";
        }
        if (i > 0) next.push(p > 0.68);
      });
      setShown((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop: the ribbon draws itself as the page scrolls */}
      <div ref={box} className="@container mx-auto hidden w-full max-w-[1440px] lg:block">
        <ol className="relative aspect-[1440/2700]">
          <li aria-hidden="true" className="absolute inset-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="size-full" fill="none">
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
          </li>
          {roadmap.map((r, i) => {
            const left = i % 2 === 0;
            const top = 238 + i * 337;
            const on = shown[i];
            const fade = `transition-[opacity,transform] duration-700 ease-out ${on ? "opacity-100" : "opacity-0"}`;
            return (
              <li key={r.n}>
                <span
                  aria-hidden="true"
                  className={`absolute font-bold leading-[0.8] ${fade} ${on ? "" : "scale-75"}`}
                  style={{ top: pct(top - 3), left: cq(left ? 234 : 1100), fontSize: cq(180), color: r.color }}
                >
                  {r.n}
                  <span className="absolute inset-x-0 top-0 overflow-hidden text-white" style={{ height: cq(91) }}>
                    {r.n}
                  </span>
                </span>
                <div
                  className={`absolute flex flex-col ${left ? "items-start text-left" : "items-end text-right"}`}
                  style={left ? { top: pct(top), left: cq(350) } : { top: pct(top), right: cq(355) }}
                >
                  <h3
                    className={`flex items-center font-bold uppercase leading-[0.8] text-white ${fade} ${
                      left ? "" : "flex-row-reverse"
                    } ${on ? "" : left ? "translate-x-10" : "-translate-x-10"}`}
                    style={{ fontSize: cq(40), gap: cq(15), height: cq(32) }}
                  >
                    {r.title}
                    <span className="flex shrink-0" style={{ width: cq(32), height: cq(32) }}>
                      <Icon name={`icon-${r.key}`} className="size-full" />
                    </span>
                  </h3>
                  <p
                    className={`leading-[1.5] delay-200 ${fade} ${on ? "" : "translate-y-4"}`}
                    style={{ marginTop: cq(121), width: cq(600), fontSize: `max(12px, ${cq(14)})` }}
                  >
                    {r.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile and tablet: stacked bands that slide in */}
      <ol className="wrap space-y-6 lg:hidden">
        {roadmap.map((r) => (
          <Reveal as="li" key={r.n}>
            <div className="flex items-center gap-4 rounded-full px-6 py-4 text-white" style={{ background: r.color }}>
              <span className="text-5xl font-bold leading-none">{r.n}</span>
              <h3 className="flex-1 text-xl font-bold uppercase leading-none">{r.title}</h3>
              <Icon name={`icon-${r.key}`} className="size-8 shrink-0" />
            </div>
            <p className="mt-3 px-2 text-sm leading-normal">{r.text}</p>
          </Reveal>
        ))}
      </ol>
    </>
  );
}
