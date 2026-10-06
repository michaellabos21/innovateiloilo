import Image from "next/image";
import { roadmap } from "@/lib/content";
import { Icon } from "./ui";

// Positions come from the prototype: the ribbon artwork is 1440 × 2700 and each
// band sits 337px below the previous one. Sizes are in cqw so the whole figure scales.
const H = 2700;
const pct = (y: number) => `${(y / H) * 100}%`;
const cq = (px: number) => `${(px / 1440) * 100}cqw`;

export function Roadmap() {
  return (
    <>
      {/* Desktop: the ribbon */}
      <div className="@container mx-auto hidden w-full max-w-[1440px] lg:block">
        <ol className="relative aspect-[1440/2700]">
          <li aria-hidden="true" className="absolute inset-0">
            <Image src="/art/roadmap.svg" fill alt="" sizes="100vw" />
          </li>
          {roadmap.map((r, i) => {
            const left = i % 2 === 0;
            const top = 238 + i * 337;
            return (
              <li key={r.n}>
                <span
                  aria-hidden="true"
                  className="absolute font-bold leading-[0.8]"
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
                    className={`flex items-center font-bold uppercase leading-[0.8] text-white ${left ? "" : "flex-row-reverse"}`}
                    style={{ fontSize: cq(40), gap: cq(15), height: cq(32) }}
                  >
                    {r.title}
                    <span className="flex shrink-0" style={{ width: cq(32), height: cq(32) }}>
                      <Icon name={`icon-${r.key}`} className="size-full" />
                    </span>
                  </h3>
                  <p
                    className="leading-[1.5]"
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

      {/* Mobile and tablet: stacked bands */}
      <ol className="wrap space-y-6 lg:hidden">
        {roadmap.map((r) => (
          <li key={r.n}>
            <div className="flex items-center gap-4 rounded-full px-6 py-4 text-white" style={{ background: r.color }}>
              <span className="text-5xl font-bold leading-none">{r.n}</span>
              <h3 className="flex-1 text-xl font-bold uppercase leading-none">{r.title}</h3>
              <Icon name={`icon-${r.key}`} className="size-8 shrink-0" />
            </div>
            <p className="mt-3 px-2 text-sm leading-normal">{r.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
