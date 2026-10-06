"use client";

import Image from "next/image";
import { useState } from "react";

const targets = [
  { key: "fb", label: "Facebook", url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { key: "x", label: "X", url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { key: "linked", label: "LinkedIn", url: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
];

export function Share({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const go = (make: (u: string, t: string) => string) =>
    window.open(make(encodeURIComponent(location.href), encodeURIComponent(title)), "_blank", "noopener,noreferrer");
  return (
    <div className="flex items-center gap-[15px]">
      <span className="mr-[15px] text-base opacity-70">{copied ? "Link copied" : "Share this on"}</span>
      {targets.map((t) => (
        <button key={t.key} type="button" aria-label={`Share on ${t.label}`} onClick={() => go(t.url)} className="hover:opacity-70">
          <Image src={`/art/share-${t.key}.svg`} width={26} height={26} alt="" />
        </button>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        className="hover:opacity-70"
        onClick={async () => {
          await navigator.clipboard.writeText(location.href);
          setCopied(true);
        }}
      >
        <Image src="/art/share-link.svg" width={26} height={26} alt="" />
      </button>
    </div>
  );
}
