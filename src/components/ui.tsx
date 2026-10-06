import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Img } from "@/lib/content";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 10" className={className} aria-hidden="true" fill="none">
      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pillBase =
  "group inline-flex h-[42px] items-center gap-2.5 rounded-[27px] pl-[18px] pr-[7px] text-base font-semibold leading-none whitespace-nowrap transition-colors";
const pillTone = {
  dark: "bg-ink text-white",
  light: "bg-white text-ink",
  brand: "bg-brand text-white",
};

function PillInner({ children, tone }: { children: ReactNode; tone: keyof typeof pillTone }) {
  return (
    <>
      <span>{children}</span>
      <span
        className={`grid size-7 place-items-center rounded-full transition-colors ${
          tone === "brand"
            ? "bg-white text-brand group-hover:bg-ink group-hover:text-white"
            : tone === "light"
              ? "bg-brand text-white group-hover:bg-ink"
              : "bg-brand text-white group-hover:bg-white group-hover:text-ink"
        }`}
      >
        <Arrow className="w-3.5" />
      </span>
    </>
  );
}

export function PillLink({
  tone = "dark",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { tone?: keyof typeof pillTone }) {
  return (
    <Link {...props} className={`${pillBase} ${pillTone[tone]} ${className}`}>
      <PillInner tone={tone}>{children}</PillInner>
    </Link>
  );
}

export function PillButton({
  tone = "dark",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { tone?: keyof typeof pillTone }) {
  return (
    <button {...props} className={`${pillBase} ${pillTone[tone]} ${className}`}>
      <PillInner tone={tone}>{children}</PillInner>
    </button>
  );
}

/** Round 42px arrow control used in lists and carousels. */
export function ArrowDot({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <span
      className={`grid size-[42px] shrink-0 place-items-center rounded-full bg-brand text-white transition-colors group-hover:bg-ink ${className}`}
    >
      <Arrow className={`w-[18px] ${flip ? "rotate-180" : ""}`} />
    </span>
  );
}

/** Label in the left 4 columns, content in the right 8 — the prototype's main section grid. */
export function Section({
  label,
  children,
  className = "",
  id,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`wrap grid grid-cols-12 gap-x-6 gap-y-5 ${className}`}>
      <p className="t-label col-span-12 lg:col-span-4 lg:max-w-[220px] lg:pt-1.5">{label}</p>
      <div className="col-span-12 lg:col-span-8">{children}</div>
    </section>
  );
}

export function PageIntro({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <header className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-5 pt-10 lg:pt-[75px]">
      <h1 className="t-display col-span-12 uppercase lg:col-span-5">{title}</h1>
      {children ? <p className="t-lead col-span-12 lg:col-span-6 lg:col-start-7">{children}</p> : null}
    </header>
  );
}

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mask-icon ${className}`}
      style={{ ["--icon" as string]: `url(/art/${name}.svg)` }}
    />
  );
}

export function Pic({
  img,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  img: Img;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={img.src}
      width={img.w}
      height={img.h}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-full bg-ink px-2.5 text-xs font-bold text-mist ${className}`}
    >
      {children}
    </span>
  );
}

/** Closing band: small kicker, justified display line, button on the right. */
export function Cta({
  kicker,
  lines,
  href,
  action,
}: {
  kicker: string;
  lines: string[];
  href: string;
  action: string;
}) {
  return (
    <section className="wrap py-16 lg:py-[150px]">
      <p className="text-lg leading-none">{kicker}</p>
      <h2 className="t-display mt-2.5 uppercase lg:text-justify">{lines.join(" ")}</h2>
      <div className="mt-7 flex lg:justify-end">
        <PillLink href={href}>{action}</PillLink>
      </div>
    </section>
  );
}
