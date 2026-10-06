"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { PillLink } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      {/* Backdrop lives on its own layer: a blur on the header itself would trap the fixed mobile menu. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 backdrop-blur-md transition-[opacity,box-shadow] duration-300 ${
          open ? "bg-white" : "bg-white/85"
        } ${
          scrolled || open ? "opacity-100 shadow-[0_1px_0_rgb(30_30_30/0.08)]" : "opacity-0"
        }`}
      />
      <div className="wrap flex h-[72px] items-center justify-between lg:h-[94px]">
        <Link href="/" aria-label="Innovate Iloilo home" onClick={() => setOpen(false)}>
          <Image
            src={site.logo.src}
            width={site.logo.w}
            height={site.logo.h}
            alt="Innovate Iloilo"
            priority
            sizes="109px"
            className="h-11 w-auto lg:h-[54px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-[50px]">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-base font-semibold underline-offset-8 decoration-2 decoration-brand hover:underline ${
                  active ? "underline" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <PillLink href="/contact">Contact</PillLink>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 20" className="w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink px-5 py-8 text-white lg:hidden"
        >
          <ul className="flex flex-col">
            {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-2xl font-bold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
