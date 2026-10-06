"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Img } from "@/lib/content";
import { Arrow } from "./ui";

function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return ref;
}

function Shell({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const ref = useDialog(open);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/90 p-0 text-white backdrop:bg-transparent"
    >
      {open ? (
        <div className="pointer-events-none flex h-full items-center justify-center p-4 sm:p-12 [&>*]:pointer-events-auto">
          {children}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-[42px] place-items-center rounded-full bg-white text-ink hover:bg-brand hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

/** Image viewer with previous/next, used for galleries and policy pages. */
export function useImageViewer(images: Img[], label: string) {
  const [index, setIndex] = useState<number | null>(null);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const img = index === null ? null : images[index];
  const viewer = (
    <Shell open={index !== null} onClose={() => setIndex(null)} label={label}>
      {img ? (
        <>
          <Image
            key={img.src}
            src={img.src}
            width={img.w}
            height={img.h}
            alt={`${label} — image ${index! + 1} of ${images.length}`}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
          {images.length > 1 ? (
            <>
              <button type="button" aria-label="Previous image" onClick={() => step(-1)}
                className="absolute left-4 top-1/2 grid size-[42px] -translate-y-1/2 place-items-center rounded-full bg-brand hover:bg-white hover:text-ink">
                <Arrow className="w-[18px] rotate-180" />
              </button>
              <button type="button" aria-label="Next image" onClick={() => step(1)}
                className="absolute right-4 top-1/2 grid size-[42px] -translate-y-1/2 place-items-center rounded-full bg-brand hover:bg-white hover:text-ink">
                <Arrow className="w-[18px]" />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm">{index! + 1} / {images.length}</p>
            </>
          ) : null}
        </>
      ) : null}
    </Shell>
  );
  return { open: setIndex, viewer };
}

const Expand = () => (
  <svg viewBox="0 0 24 24" className="w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3h7v7M10 21H3v-7M21 3l-8 8M3 21l8-8" />
  </svg>
);

export function Gallery({
  images,
  label,
  className = "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6",
  thumbClass = "aspect-square",
  position = "object-center",
}: {
  images: Img[];
  label: string;
  className?: string;
  thumbClass?: string;
  position?: string;
}) {
  const { open, viewer } = useImageViewer(images, label);
  return (
    <>
      <ul className={className}>
        {images.map((img, i) => (
          <li key={img.src + i}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open image ${i + 1} of ${images.length}`}
              className={`group relative block w-full overflow-hidden bg-[#d9d9d9] ${thumbClass}`}
            >
              <Image
                src={img.src}
                width={img.w}
                height={img.h}
                alt=""
                sizes="(min-width: 768px) 33vw, 50vw"
                className={`size-full object-cover ${position}`}
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/30 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {viewer}
    </>
  );
}

export function VideoTrigger({
  src,
  label,
  className = "",
  children,
}: {
  src: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={label}>
        {children}
      </button>
      <Shell open={open} onClose={() => setOpen(false)} label={label}>
        <video src={src} controls autoPlay playsInline className="max-h-full w-full max-w-[1250px] bg-black" />
      </Shell>
    </>
  );
}
