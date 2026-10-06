import Image from "next/image";
import Link from "next/link";
import { contact, site } from "@/lib/content";
import { Icon } from "./ui";
import { NewsletterForm } from "./forms";

const socials = [
  { icon: "soc-fb", label: "Facebook", href: "#" },
  { icon: "soc-insta", label: "Instagram", href: "#" },
  { icon: "soc-linked", label: "LinkedIn", href: "#" },
  { icon: "soc-X", label: "X", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="wrap">
        <div className="grid border-b border-rule lg:grid-cols-2">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 py-8 lg:border-r lg:border-rule lg:py-[31px]">
            <h2 className="text-[25px] font-bold leading-none">Stay connected</h2>
            <ul className="flex gap-10">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} className="block hover:text-brand">
                    <Icon name={s.icon} className="size-[25px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-rule py-8 lg:border-t-0 lg:py-[31px] lg:pl-12">
            <h2 className="text-[25px] font-bold leading-none">Stay Informed</h2>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 border-b border-rule py-12 md:grid-cols-[minmax(0,2.4fr)_repeat(3,minmax(0,1.2fr))]">
          <Link href="/" aria-label="Innovate Iloilo home">
            <Image
              src={site.logoFooter.src}
              width={site.logoFooter.w}
              height={site.logoFooter.h}
              alt="Innovate Iloilo"
              sizes="193px"
              className="h-24 w-auto"
            />
          </Link>
          <ul className="space-y-1.5 md:pt-2">
            <li><Link className="hover:underline" href="/about">About</Link></li>
            <li><Link className="hover:underline" href="/policies">Policies &amp; Governance</Link></li>
            <li><Link className="hover:underline" href="/activities">Activities</Link></li>
          </ul>
          <ul className="space-y-1.5 md:pt-2">
            <li><Link className="hover:underline" href="/news">News &amp; Blogs</Link></li>
            <li><Link className="hover:underline" href="/startup">Startup</Link></li>
          </ul>
          <ul className="space-y-1.5 md:pt-2">
            <li><Link className="hover:underline" href="/contact">Contact</Link></li>
            <li><a className="hover:underline" href={contact.phoneHref}>{contact.phone}</a></li>
            <li><a className="hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-between gap-2 py-5 text-sm text-[#a4a4a4]">
          <p>© 2024 Innovate Iloilo. All rights reserved.</p>
          <p>
            Website made with <span className="text-[#dd2e44]" aria-label="love">♥</span> Mulave Studios
          </p>
        </div>
      </div>
    </footer>
  );
}
