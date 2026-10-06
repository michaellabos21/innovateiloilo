import type { Metadata } from "next";
import { Cta, PageIntro, PillLink, Section } from "@/components/ui";
import { roadmap } from "@/lib/content";

export const metadata: Metadata = { title: "Startup" };

// The prototype has a Startup link but no page design; this is a holding page built from existing content.
export default function Startup() {
  const pillar = roadmap.find((r) => r.key === "startup")!;
  return (
    <>
      <PageIntro title="Strong startup ecosystem">{pillar.text}</PageIntro>
      <Section label="Startup ordinance" className="pt-16 lg:pt-[150px]">
        <h2 className="t-display uppercase">Policies guiding startup development in Iloilo.</h2>
        <p className="t-lead mt-5">
          Regulation Ordinance No. 2023-126 sets out how Iloilo supports its startups. Read it alongside the
          executive orders and resolutions behind the movement.
        </p>
        <PillLink href="/policies" className="mt-8 lg:mt-[50px]">View policy</PillLink>
      </Section>
      <Section label="Incubators" className="pt-16 lg:pt-[150px]">
        <h2 className="t-display uppercase">Leading incubators transforming Iloilo’s tech ecosystem.</h2>
        <PillLink href="/about" className="mt-8 lg:mt-[50px]">Learn more</PillLink>
      </Section>
      <Cta
        kicker="Welcome, Start-up Founders and Investors!"
        lines={["Got ideas or questions? Contact us &", "let’s impact Iloilo’s future together."]}
        href="/contact"
        action="Connect with us"
      />
    </>
  );
}
