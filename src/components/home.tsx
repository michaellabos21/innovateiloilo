"use client";

import { useEffect, useState } from "react";

const colors = ["#b50000", "#6d02c7", "#8c1e98", "#0079ac", "#376400", "#e0b300", "#d57c00"];

/** The hero's "2030": each digit rolls in again as it steps through the seven component colours. */
export function Year2030() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % colors.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span aria-label="2030" style={{ color: colors[i] }}>
      {"2030".split("").map((d, n) => (
        <span key={`${i}-${n}`} aria-hidden="true" className="hero-char" style={{ ["--i" as string]: i === 0 ? n + 7 : n }}>
          {d}
        </span>
      ))}
    </span>
  );
}

/** Letters that rise one after another from behind the line's mask. */
export function Letters({ children, start = 0 }: { children: string; start?: number }) {
  return (
    <span aria-label={children}>
      {children.split("").map((c, n) => (
        <span key={n} aria-hidden="true" className="hero-char" style={{ ["--i" as string]: start + n }}>
          {c}
        </span>
      ))}
    </span>
  );
}
