import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Gallery } from "@/components/Lightbox";
import { PillLink, Section } from "@/components/ui";
import { activities } from "@/lib/content";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/activities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = activities.find((x) => x.slug === slug);
  return { title: a?.title, description: a?.summary[0] };
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-lg">{label}</dt>
      <dd className="t-lead">{children}</dd>
    </div>
  );
}

export default function ActivityPage({ params }: PageProps<"/activities/[slug]">) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<"/activities/[slug]">, "params">) {
  const { slug } = await params;
  const a = activities.find((x) => x.slug === slug);
  if (!a) notFound();
  const isEvent = a.kind === "event";
  const open = a.status?.includes("Open");
  const date = a.date ?? a.shortDate;

  return (
    <article className="pb-16 lg:pb-[150px]">
      {isEvent ? (
        <header className="wrap grid grid-cols-12 gap-x-6 gap-y-8 pt-10 lg:pt-[75px]">
          {a.cover ? (
            <Image
              src={a.cover.src}
              width={a.cover.w}
              height={a.cover.h}
              alt=""
              priority
              sizes="(min-width: 1024px) 475px, 100vw"
              className="col-span-12 w-full lg:col-span-5 lg:max-w-[475px]"
            />
          ) : null}
          <div className="col-span-12 lg:col-span-7">
            {a.upcoming ? (
              <span className="mb-2.5 inline-flex h-[27px] items-center rounded-full bg-ink px-3.5 text-sm font-semibold text-white">
                UPCOMING
              </span>
            ) : null}
            <h1 className="t-display">{a.title}</h1>
            <dl className="mt-9 flex flex-wrap gap-x-[110px] gap-y-5">
              <Fact label="Date:">{date}</Fact>
              {a.time ? <Fact label="Time:">{a.time}</Fact> : null}
            </dl>
          </div>
        </header>
      ) : (
        <header className="wrap pt-10 lg:pt-[75px]">
          <h1 className="max-w-[1087px] text-[clamp(2rem,3.82vw,3.4375rem)] font-bold leading-none">{a.title}</h1>
        </header>
      )}

      <Section label="Activity summary" className="pt-16 lg:pt-[150px]">
        {a.summary.length ? (
          <div className="t-lead space-y-5">
            {a.summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ) : (
          <p className="t-lead">A full write-up of this activity will be published here soon.</p>
        )}
        {isEvent ? (
          <dl className="mt-[65px] space-y-[35px]">
            {a.venue ? <Fact label="Venue/Location:">{a.venue}</Fact> : null}
            {a.who ? <Fact label="Who can attend?">{a.who}</Fact> : null}
          </dl>
        ) : null}
      </Section>

      {!isEvent ? (
        <Section label="Activity details" className="pt-16 lg:pt-[150px]">
          <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <Fact label="Date:">{date}</Fact>
            {a.venue ? <Fact label="Venue/Location:">{a.venue}</Fact> : null}
            {a.time ? <Fact label="Time:">{a.time}</Fact> : null}
          </dl>
        </Section>
      ) : null}

      {a.gallery.length ? (
        <section className="wrap pt-16 lg:pt-[150px]">
          <h2 className="t-label pb-8 lg:pb-[50px]">Gallery</h2>
          <Gallery images={a.gallery} label={`${a.title} gallery`} />
        </section>
      ) : null}

      {a.status ? (
        <Section label="Status" className="pt-16 lg:pt-[150px]">
          <p
            className={`inline-flex h-[52px] items-center rounded-[27px] px-[26px] text-xl font-semibold text-white sm:text-[25px] ${
              open ? "bg-[#72b61e]" : "bg-c7"
            }`}
          >
            {a.status}
          </p>
          {a.statusNote ? <p className="mt-[30px] max-w-[845px] whitespace-pre-line text-lg leading-none">{a.statusNote}</p> : null}
          {open && a.canSignUp ? (
            <PillLink href="/contact" className="mt-8 lg:mt-[100px]">Sign up to event</PillLink>
          ) : null}
        </Section>
      ) : null}
    </article>
  );
}
