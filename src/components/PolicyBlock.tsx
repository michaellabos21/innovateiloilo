"use client";

import Image from "next/image";
import type { Policy } from "@/lib/content";
import { useImageViewer } from "./Lightbox";
import { Reveal } from "./Reveal";
import { PillButton } from "./ui";

export function PolicyBlock({ policy }: { policy: Policy }) {
  const { open, viewer } = useImageViewer(policy.pages, policy.title);
  return (
    <section className="wrap grid grid-cols-12 gap-x-6 gap-y-5">
      <h2 className="t-label col-span-12 lg:col-span-4 lg:max-w-[220px]">{policy.title}</h2>
      <div className="col-span-12 lg:col-span-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
          {policy.pages.map((img, i) => (
            <Reveal as="li" kind="wipe" delay={(i % 3) * 110} key={img.src}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Open page ${i + 1} of ${policy.title}`}
                className="group relative block aspect-[265/250] w-full overflow-hidden bg-[#d9d9d9]"
              >
                <Image
                  src={img.src}
                  width={img.w}
                  height={img.h}
                  alt=""
                  sizes="(min-width: 1024px) 265px, 33vw"
                  className="size-full object-cover object-top"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <svg viewBox="0 0 24 24" className="w-6 text-ink" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 3h7v7M10 21H3v-7M21 3l-8 8M3 21l8-8" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
        <PillButton type="button" onClick={() => open(0)} className="mt-8 lg:mt-[50px]">
          View policy
        </PillButton>
      </div>
      {viewer}
    </section>
  );
}
