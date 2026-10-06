"use client";

import { useEffect, useState } from "react";

const colors = ["#b50000", "#6d02c7", "#8c1e98", "#0079ac", "#376400", "#e0b300", "#d57c00"];

/** The hero's "2030", stepping through the seven component colours. */
export function Year2030() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % colors.length), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="transition-colors duration-700" style={{ color: colors[i] }}>
      2030
    </span>
  );
}
