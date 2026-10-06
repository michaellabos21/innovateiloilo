"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Activity } from "@/lib/content";
import { ActivityRow } from "./cards";
import { Arrow } from "./ui";

export function FeaturedCarousel({ items, label }: { items: Activity[]; label: string }) {
  const [i, setI] = useState(0);
  const step = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const current = items[i];
  return (
    <section className="wrap pt-10 lg:pt-[150px]" aria-roledescription="carousel" aria-label={label}>
      <div className="flex items-end justify-between">
        <h2 className="t-label pb-5">{label}</h2>
        <div className={`relative z-10 -mb-[21px] gap-2 ${items.length > 1 ? "flex" : "hidden"}`}>
          <button type="button" aria-label="Previous" onClick={() => step(-1)}
            className="grid size-[42px] place-items-center rounded-full bg-ink text-white hover:bg-brand">
            <Arrow className="w-[18px] rotate-180" />
          </button>
          <button type="button" aria-label="Next" onClick={() => step(1)}
            className="grid size-[42px] place-items-center rounded-full bg-brand text-white hover:bg-ink">
            <Arrow className="w-[18px]" />
          </button>
        </div>
      </div>
      <Link
        href={`/activities/${current.slug}`}
        className="relative block aspect-[4/3] bg-ink sm:aspect-[1280/613]"
        aria-label={current.title}
      >
        {current.cover ? (
          <Image
            key={current.slug}
            src={current.cover.src}
            fill
            alt=""
            sizes="(min-width: 1440px) 845px, 100vw"
            className="object-contain"
          />
        ) : null}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent px-6 pb-9 pt-16 text-center text-lg font-semibold text-white">
          {current.title}
        </span>
      </Link>
      <div className={`-mt-6 justify-center gap-2.5 pb-4 ${items.length > 1 ? "flex" : "hidden"}`} aria-hidden="true">
        {items.map((it, n) => (
          <span key={it.slug} className={`relative size-[5px] rounded-full bg-white ${n === i ? "" : "opacity-50"}`} />
        ))}
      </div>
    </section>
  );
}

export function ActivityList({ items }: { items: Activity[] }) {
  const [newest, setNewest] = useState(true);
  const sorted = newest ? items : [...items].reverse();
  return (
    <section className="wrap pb-16 pt-16 lg:pb-[150px] lg:pt-[150px]">
      <div className="flex items-center justify-between gap-4 pb-8 lg:pb-[100px]">
        <h2 className="t-label">List of activities</h2>
        <button
          type="button"
          onClick={() => setNewest((v) => !v)}
          aria-label={`Sorted by activity date, ${newest ? "newest" : "oldest"} first. Change order`}
          className="inline-flex h-[42px] items-center gap-5 rounded-[27px] border border-ink px-[22px] text-base text-[#3d3d3d] hover:bg-ink hover:text-white"
        >
          Activity date
          <svg viewBox="0 0 24 24" className={`w-5 transition-transform ${newest ? "" : "rotate-180"}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      <ul className="border-b border-ink/15">
        {sorted.map((a) => (
          <li key={a.slug}>
            <ActivityRow activity={a} />
          </li>
        ))}
      </ul>
    </section>
  );
}
