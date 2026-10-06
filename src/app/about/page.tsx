import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax, ScrubText, Tilt } from "@/components/motion";
import { Heading, Reveal } from "@/components/Reveal";
import { Roadmap } from "@/components/Roadmap";
import { Cta, PageIntro, Section } from "@/components/ui";
import { inventory, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: site.about.lead,
};

export default function About() {
  return (
    <>
      <PageIntro title="About Innovate Iloilo">{site.about.lead}</PageIntro>

      <div className="wrap pt-10 lg:pt-[150px]">
        <Reveal kind="wipe" className="aspect-[1280/622] overflow-hidden">
          <Parallax speed={-0.1} className="-mt-[6%] h-[112%]">
            <Image
              src={site.about.hero.src}
              width={site.about.hero.w}
              height={site.about.hero.h}
              alt="Innovate Iloilo stakeholders gathered at a workshop"
              priority
              sizes="(min-width: 1440px) 1280px, 100vw"
              className="size-full object-cover"
            />
          </Parallax>
        </Reveal>
      </div>

      <Section label="Background" className="pt-16 lg:pt-[150px]">
        <p className="t-lead">{site.about.background}</p>
      </Section>

      <Section
        label={<span aria-hidden="true" className="block text-[clamp(6rem,12.5vw,11.25rem)] leading-[0.75]">“</span>}
        className="pt-16 lg:pt-[150px]"
      >
        <figure>
          <blockquote>
            <ScrubText as="p" className="t-display uppercase">
              Innovation is the creation of new ideas that results in development of new or improved policies, products, processes or services which are then spread or transferred across the market.
            </ScrubText>
          </blockquote>
          <figcaption className="t-lead mt-5">
            Definition from the Philippine Republic Act No. 11293 or the “Philippine Innovation Act”
          </figcaption>
        </figure>
      </Section>

      <Section id="roadmap" label="Roadmap" className="scroll-mt-10 pt-16 lg:pt-[150px]">
        <Heading>Workshops with groups shaped seven components of Innovate Iloilo roadmap.</Heading>
      </Section>
      <div className="pt-10 lg:pt-[94px]">
        <Roadmap />
      </div>

      <Section label="Inventory" className="pt-16 lg:pt-[136px]">
        <Heading>Navigate through local talent, projects, and investment-ready outputs.</Heading>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-[42px]">
          {inventory.map((item, i) => (
            <Reveal as="li" delay={i * 90} key={item.slug}>
              <Tilt>
              <Link
                href={`/about/inventory/${item.slug}`}
                className="block aspect-[254/261] bg-ink p-5 text-lg font-bold uppercase leading-none text-white transition-colors hover:bg-brand sm:text-[25px] lg:px-[30px] lg:py-[25px]"
              >
                {item.title}
              </Link>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section label="TBIs in Iloilo" className="pt-16 lg:pt-[150px]">
        <Heading>Leading incubators transforming Iloilo’s tech ecosystem.</Heading>
      </Section>
      <ul className="wrap grid grid-cols-2 gap-6 pt-10 md:grid-cols-4 lg:pt-[100px]">
        {site.about.tbis.map((t, i) => (
          <Reveal as="li" delay={i * 90} key={t.name} className="text-center">
            <span className="grid h-[120px] place-items-center bg-white">
              <Image
                src={t.image.src}
                width={t.image.w}
                height={t.image.h}
                alt=""
                sizes="120px"
                className="max-h-[108px] w-auto object-contain"
              />
            </span>
            <span className="mx-auto mt-5 block max-w-[193px] text-sm font-semibold leading-none text-[#121212]">
              {t.name}
            </span>
          </Reveal>
        ))}
      </ul>

      <Cta
        kicker="See what's happening!"
        lines={["Browse upcoming activities and", "events, fusing Iloilo’s future through creativity."]}
        href="/activities"
        action="View upcoming activities"
      />
    </>
  );
}
