import type { Metadata } from "next";
import { ActivityList, FeaturedCarousel } from "@/components/ActivitiesBrowser";
import { PageIntro } from "@/components/ui";
import { activities } from "@/lib/content";

const lead = "Events, meetings, activities and accomplishments of the project management.";

export const metadata: Metadata = { title: "Activities", description: lead };

export default function Activities() {
  const upcoming = activities.filter((a) => a.upcoming && a.cover);
  const featured = upcoming.length ? upcoming : activities.filter((a) => a.cover);
  return (
    <>
      <PageIntro title={<>Innovate Iloilo<br />PMO Activities</>}>{lead}</PageIntro>
      <FeaturedCarousel items={featured} label={upcoming.length ? "Upcoming activities" : "Featured activities"} />
      <ActivityList items={activities} />
    </>
  );
}
