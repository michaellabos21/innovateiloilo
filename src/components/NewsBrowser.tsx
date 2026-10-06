"use client";

import { useState } from "react";
import type { Post } from "@/lib/content";
import { PostCard } from "./cards";
import { LiveMark } from "./LiveMark";
import { Reveal } from "./Reveal";

const filters = ["All", "News", "Blogs"] as const;
const PAGE = 4;

export function NewsBrowser({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [latest, setLatest] = useState(true);
  const [shown, setShown] = useState(PAGE);

  const q = query.trim().toLowerCase();
  const list = posts
    .filter((p) => filter === "All" || p.tag === filter.replace(/s$/, ""))
    .filter((p) => !q || p.title.toLowerCase().includes(q));
  if (!latest) list.reverse();

  return (
    <section className="wrap relative isolate pb-16 pt-12 lg:pb-[150px] lg:pt-[100px]" aria-label="All posts">
      <LiveMark className="pointer-events-none absolute -left-10 top-6 -z-10 hidden h-[620px] w-auto opacity-[0.08] lg:block" />
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <label className="relative block w-full sm:w-[193px]">
          <span className="sr-only">Search posts</span>
          <svg viewBox="0 0 12 12" className="absolute left-[22px] top-1/2 w-3 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <circle cx="5" cy="5" r="4" />
            <path d="M8 8l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search here"
            className="h-[42px] w-full rounded-[27px] border border-ink pl-[49px] pr-4 text-base placeholder:text-[#5f5f5f]"
          />
        </label>
        <div className="flex gap-3 sm:gap-6" role="group" aria-label="Filter posts">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setShown(PAGE);
              }}
              className={`h-[42px] rounded-[27px] px-6 text-base font-bold text-white transition-colors ${
                filter === f ? "bg-brand" : "bg-ink hover:bg-brand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLatest((v) => !v)}
          className="inline-flex h-[42px] items-center justify-between gap-5 rounded-[27px] border border-ink px-[22px] text-base text-[#3d3d3d] whitespace-nowrap hover:bg-ink hover:text-white lg:justify-self-end"
        >
          {latest ? "Latest posts" : "Oldest posts"}
          <svg viewBox="0 0 24 24" className={`w-5 transition-transform ${latest ? "" : "rotate-180"}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {list.length ? (
        <ul className="grid gap-6 pt-10 lg:grid-cols-2 lg:pt-[100px]">
          {list.slice(0, shown).map((p, i) => (
            <Reveal as="li" delay={(i % 2) * 110} key={p.slug}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="t-lead pt-10 lg:pt-[100px]" role="status">
          No posts match that search.
        </p>
      )}

      {list.length > shown ? (
        <div className="flex justify-center pt-12">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="h-[42px] rounded-[27px] bg-ink px-8 text-base font-bold text-white hover:bg-brand"
          >
            load more
          </button>
        </div>
      ) : null}
    </section>
  );
}
