import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsBrowser } from "@/components/NewsBrowser";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News & Blogs",
  description: "Current news, industry updates and articles from Innovate Iloilo.",
};

const pill = "inline-flex h-5 items-center rounded-full bg-mist/20 px-2 text-[10px] font-bold";

export default function News() {
  const posts = getPosts();
  const [lead, ...rest] = posts;
  if (!lead) {
    return (
      <div className="wrap py-24">
        <h1 className="t-display uppercase">News &amp; Blogs</h1>
        <p className="t-lead mt-6">No posts have been published yet.</p>
      </div>
    );
  }
  return (
    <>
      <h1 className="sr-only">News &amp; Blogs</h1>
      <section className="wrap pt-10 lg:pt-[75px]" aria-label="Latest posts">
        <div className="grid grid-cols-[minmax(0,1fr)] bg-ink font-roboto text-mist lg:grid-cols-[minmax(0,900fr)_minmax(0,380fr)]">
          <Link href={`/news/${lead.slug}`} className="group relative flex min-h-[320px] items-end justify-center lg:min-h-[525px]">
            {lead.image ? (
              <Image src={lead.image} fill alt="" priority sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
            ) : null}
            <span className="absolute inset-0 bg-ink/60" />
            <span className="relative block max-w-[554px] px-5 pb-10 text-center">
              <span className="flex items-center justify-center gap-2.5 text-xs font-bold">
                {lead.date} <span className={pill}>{lead.tag}</span>
              </span>
              <span className="mt-5 block text-xl font-bold leading-none group-hover:underline sm:text-[26px]">{lead.title}</span>
              <span className="mx-auto mt-3 block max-w-[396px] text-base leading-none">{lead.excerpt}</span>
            </span>
          </Link>
          <ul className="flex flex-col justify-center divide-y divide-mist/15 px-6 lg:px-0 lg:pl-[107px] lg:pr-[27px]">
            {rest.slice(0, 3).map((p) => (
              <li key={p.slug} className="py-[19px]">
                <Link href={`/news/${p.slug}`} className="group block">
                  <span className="flex items-center gap-6 text-xs font-bold">
                    {p.date} <span className={pill}>{p.tag}</span>
                  </span>
                  <span className="mt-2 block text-base font-bold leading-[1.2] group-hover:underline">{p.title}</span>
                  <span className="mt-1.5 block truncate text-sm">{p.excerpt}</span>
                  <span className="mt-4 block text-xs font-bold">Read more</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NewsBrowser posts={posts} />
    </>
  );
}
