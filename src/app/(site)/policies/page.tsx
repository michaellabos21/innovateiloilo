import type { Metadata } from "next";
import { PolicyBlock } from "@/components/PolicyBlock";
import { Cta, PageIntro } from "@/components/ui";
import { policies } from "@/lib/content";

const lead =
  "See comprehensive details on Executive Orders, Regulations, and Resolutions that drive the Innovate Iloilo movement forward.";

export const metadata: Metadata = { title: "Policies & Governance", description: lead };

export default function Policies() {
  return (
    <>
      <PageIntro title={<>Policies &amp;<br />Governance</>}>{lead}</PageIntro>
      <div className="space-y-16 pt-10 lg:space-y-[150px] lg:pt-[150px]">
        {policies.map((p) => (
          <PolicyBlock key={p.id} policy={p} />
        ))}
      </div>
      <Cta
        kicker="Let’s Connect Today!"
        lines={["Join us in creating a supportive network", "for innovation and sustainable growth."]}
        href="/contact"
        action="Connect with us"
      />
    </>
  );
}
