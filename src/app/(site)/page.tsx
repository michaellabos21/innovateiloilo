import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PostCard } from "@/components/cards";
import { Letters, Year2030 } from "@/components/home";
import { LiveMark } from "@/components/LiveMark";
import { IloiloMap } from "@/components/IloiloMap";
import { HeroPointer, Parallax, Tilt } from "@/components/motion";
import { Heading, Reveal } from "@/components/Reveal";
import { VideoTrigger } from "@/components/Lightbox";
import { Arrow, Icon, PillLink, Section } from "@/components/ui";
import { contact, site, type Img } from "@/lib/content";
import { getPosts } from "@/lib/posts";

const tiles = [
  { icon: "leadership", lines: ["Visionary", "Leadership"], color: "#b50000", at: "lg:col-start-1 lg:row-start-1" },
  { icon: "smart", lines: ["Smart", "Cities &", "Communities"], color: "#6d02c7", at: "lg:col-start-2 lg:row-start-1" },
  { icon: "collab", lines: ["Collaborative", "R&D"], color: "#8c1e98", at: "lg:col-start-1 lg:row-start-2" },
  { icon: "human", lines: ["Innovative", "Human", "Capital"], color: "#0079ac", at: "lg:col-start-2 lg:row-start-2" },
  { icon: "startup", lines: ["Strong", "Startup", "Ecosystem"], color: "#376400", at: "lg:col-start-3 lg:row-start-2" },
  { icon: "economy", lines: ["Innovation", "Driven", "Economy"], color: "#e0b300", at: "lg:col-start-2 lg:row-start-3" },
  { icon: "creative", lines: ["Creative", "Industry"], color: "#d57c00", at: "lg:col-start-3 lg:row-start-3" },
];

const activityLinks = ["devcon-game-on", "startup-training-seminar", "fiestakucha-festival"];

function Chip({ img, tint, w }: { img: Img; tint: string; w: string }) {
  return (
    <span
      aria-hidden="true"
      className="chip relative -my-[0.14em] inline-block h-[1.5em] shrink-0 overflow-hidden align-middle"
      style={{ width: w }}
    >
      <Image src={img.src} fill alt="" sizes="160px" className="object-cover" />
      <span className="absolute inset-0" style={{ background: tint }} />
    </span>
  );
}

/** One row of the big statement: spread edge to edge on desktop, plain flowing text below that. */
function Line({ children }: { children: ReactNode }) {
  return <span className="lg:flex lg:items-center lg:justify-between lg:whitespace-nowrap">{children}</span>;
}

export default function Home() {
  const [c1, c2, c3, c4, c5] = site.home.chips;
  const posts = getPosts();
  return (
    <>
      {/* Hero */}
      <section className="hero relative -mt-[72px] overflow-hidden pt-[72px] lg:-mt-[94px] lg:pt-[94px]">
        <HeroPointer />
        <IloiloMap className="hero-map absolute -left-1 top-[-23vw] w-[70.5vw] max-w-[1016px] 2xl:top-[-330px]" />
        <div className="wrap pointer-events-none relative flex min-h-[62vw] flex-col justify-end gap-8 pb-12 pt-16 lg:min-h-0 lg:flex-row lg:items-end lg:justify-between lg:pb-[131px] lg:pt-[120px]">
          <h1 className="-ml-[0.04em] text-[clamp(4rem,12.5vw,11.25rem)] font-bold leading-[0.84] tracking-[-0.01em]">
            <span className="hero-line"><Letters>innovate</Letters></span>
            <span className="hero-line"><Letters start={3}>iloilo</Letters> <Year2030 /></span>
          </h1>
          <p className="hero-fade t-lead max-w-[339px] lg:pb-1">{site.home.intro}</p>
        </div>
      </section>

      {/* Statement */}
      <section className="hero-fade wrap pt-10 lg:pt-[88px]">
        <h2 className="text-[clamp(1.75rem,4vw,3.75rem)] font-bold uppercase leading-[1.23]">
          <Line>
            <span>Building</span> <Chip img={c1} tint="rgb(0 121 172 / 0.9)" w="2.6em" />{" "}
            <span>A brighter future for Iloilo</span>
          </Line>{" "}
          <Line>
            <span>through collaborative efforts</span> <Chip img={c2} tint="rgb(224 179 0 / 0.7)" w="2.1em" />{" "}
            <span>fresh</span>
          </Line>{" "}
          <Line>
            <span>cutting-edge ideas</span> <Chip img={c3} tint="rgb(159 37 173 / 0.9)" w="2.2em" />{" "}
            <span>and key solutions.</span>
          </Line>
        </h2>
      </section>

      {/* Video */}
      <section className="wrap pt-12 lg:pt-[150px]">
        <Reveal className="relative lg:aspect-[1280/727]">
          <Parallax speed={0.14} className="hidden lg:absolute lg:left-[28.75%] lg:top-[38%] lg:block lg:h-[62%] lg:w-[62.7%]">
            <Image src={site.home.videoBack.src} fill alt="" sizes="63vw" className="object-cover" />
          </Parallax>
          <VideoTrigger
            src="/videos/innovate-iloilo.mp4"
            label="Watch the video: See how Iloilo innovates"
            className="group relative block aspect-[803/459] w-full overflow-hidden lg:absolute lg:left-0 lg:top-0 lg:w-[62.7%]"
          >
            <Image
              src={site.home.videoPoster.src}
              fill
              alt=""
              sizes="(min-width: 1024px) 63vw, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-[#121212]/20" />
            <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[20px] bg-ink text-white transition-colors group-hover:bg-brand lg:size-[115px]">
              <svg viewBox="0 0 24 24" className="w-8 lg:w-11" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </VideoTrigger>
          <Parallax speed={-0.08} className="relative bg-ink px-[50px] py-10 text-white lg:absolute lg:right-0 lg:top-[20.4%] lg:w-[32.1%]">
            <p className="t-lead">See How Iloilo Innovates</p>
            <VideoTrigger
              src="/videos/innovate-iloilo.mp4"
              label="Watch the video"
              className="group mt-5 inline-flex h-[42px] items-center gap-2.5 rounded-[27px] bg-white pl-[18px] pr-[7px] font-semibold text-ink"
            >
              <span>Watch the video</span>
              <span className="grid size-7 place-items-center rounded-full bg-brand text-white group-hover:bg-ink">
                <Arrow className="w-3.5" />
              </span>
            </VideoTrigger>
          </Parallax>
        </Reveal>
      </section>

      {/* Vision */}
      <Section label="Vision" className="pt-16 lg:pt-[150px]">
        <Heading>Iloilo: a premier innovation ecosystem by 2030.</Heading>
        <p className="t-lead mt-5">{site.home.vision}</p>
        <PillLink href="/about" className="mt-8 lg:mt-[50px]">Learn more</PillLink>
      </Section>

      {/* Components */}
      <div className="relative">
        <LiveMark className="pointer-events-none absolute left-4 top-[150px] hidden h-[calc(100%-150px)] max-h-[900px] w-auto opacity-[0.16] lg:block xl:left-12" />
        <Section label="Innovate Iloilo components" className="relative pt-16 lg:pt-[200px]">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-[42px]">
            {tiles.map((t, i) => (
              <Reveal as="li" delay={i * 70} key={t.icon} className={t.at}>
                <Tilt>
                <Link
                  href={`/about#roadmap`}
                  style={{ ["--tile" as string]: t.color }}
                  className="group flex aspect-[254/261] flex-col justify-between bg-ink p-5 text-white transition-colors hover:bg-(--tile) focus-visible:bg-(--tile) lg:px-[30px] lg:py-[25px]"
                >
                  <span className="text-lg font-bold leading-none sm:text-[25px]">
                    {t.lines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </span>
                  <Icon name={`icon-${t.icon}`} className="size-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 lg:size-[50px]" />
                </Link>
                </Tilt>
              </Reveal>
            ))}
            <li className="col-span-full flex items-end lg:col-span-1 lg:col-start-1 lg:row-start-3">
              <PillLink href="/about#roadmap">See roadmap</PillLink>
            </li>
          </ul>
        </Section>
      </div>

      {/* Policies */}
      <Section label={<>Ordinance and<br />executive orders</>} className="pt-16 lg:pt-[200px]">
        <Heading>Policies guiding startup development in Iloilo.</Heading>
        <p className="t-lead mt-5">
          Executive Orders, Regulations, and Resolutions for Provincial and City Governance.
        </p>
        <PillLink href="/policies" className="mt-8 lg:mt-[50px]">View details</PillLink>
      </Section>

      {/* Activities */}
      <Section label="Activities" className="pt-16 lg:pt-[150px]">
        <Heading>Spot activities that inspire fresh ideas &amp; meaningful connection for growth.</Heading>
      </Section>
      <div className="wrap pt-10 lg:pt-[100px]">
        <ul className="grid gap-6 sm:grid-cols-3">
          {site.home.activityCards.map((a, i) => (
            <Reveal as="li" kind="wipe" delay={i * 130} key={a.title}>
              <Link href={`/activities/${activityLinks[i]}`} className="group block">
                <span className="block aspect-[411/401] overflow-hidden bg-[#d9d9d9]">
                  <Image
                    src={a.image.src}
                    width={a.image.w}
                    height={a.image.h}
                    alt=""
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="mt-5 block text-lg font-semibold leading-none group-hover:text-brand">{a.title}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <MoreRow href="/activities" action="View all activities">
          Explore events, activities, meetings, and accomplishments designed to inspire fresh ideas, foster
          meaningful connections, and drive growth within the project management landscape.
        </MoreRow>
      </div>

      {/* News */}
      <Section label="News & Blogs" className="pt-16 lg:pt-[206px]">
        <Heading>Keep updated with fresh news and industry updates.</Heading>
      </Section>
      <div className="wrap pt-10 lg:pt-[100px]">
        <ul className="grid gap-6 lg:grid-cols-2">
          {posts.slice(0, 4).map((p, i) => (
            <Reveal as="li" delay={(i % 2) * 110} key={p.slug}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
        <MoreRow href="/news" action="View all articles">
          Remain in the loop with current news, detailed industry updates, and thought-provoking articles on key
          trends and innovations.
        </MoreRow>
      </div>

      {/* Contact */}
      <section className="wrap pt-16 lg:pt-[214px]">
        <Reveal as="h2" className="text-[clamp(1.75rem,4vw,3.75rem)] font-bold uppercase leading-[1.23]">
          <Line>
            <span>Got</span> <Chip img={c4} tint="rgb(56 100 0 / 0.8)" w="2.73em" />{" "}
            <span>ideas or questions? Contact us &amp;</span>
          </Line>{" "}
          <Line>
            <span>let’s impact Iloilo’s future</span> <Chip img={c5} tint="rgb(213 124 0 / 0.8)" w="2.48em" />{" "}
            <span>together.</span>
          </Line>
        </Reveal>
      </section>
      <Reveal className="wrap grid grid-cols-12 gap-x-6 gap-y-6 pb-16 pt-12 lg:pb-[150px] lg:pt-[156px]">
        <p className="t-label col-span-12 lg:col-span-4">Get in touch!</p>
        <address className="t-lead col-span-12 space-y-3.5 not-italic lg:col-span-4">
          <a className="block hover:text-brand" href={`mailto:${contact.email}`}>{contact.email}</a>
          <a className="block hover:text-brand" href={contact.phoneHref}>{contact.phone}</a>
          <span className="block max-w-[272px]">{contact.address}</span>
        </address>
        <div className="col-span-12 bg-ink px-[50px] py-10 text-white lg:col-span-4">
          <p className="t-lead">Got a Message for Us?</p>
          <PillLink href="/contact" tone="light" className="mt-5">Drop a message</PillLink>
        </div>
      </Reveal>
    </>
  );
}

function MoreRow({ href, action, children }: { href: string; action: string; children: ReactNode }) {
  return (
    <Reveal className="grid grid-cols-12 items-center gap-x-6 gap-y-5 pt-10 lg:pt-[168px]">
      <div className="col-span-12 lg:col-span-3 lg:col-start-5">
        <PillLink href={href}>{action}</PillLink>
      </div>
      <p className="col-span-12 text-lg leading-none lg:col-span-5 lg:col-start-8 lg:max-w-[473px] lg:justify-self-end">
        {children}
      </p>
    </Reveal>
  );
}
