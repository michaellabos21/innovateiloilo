import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Lightbox";
import { PillLink } from "@/components/ui";
import { inventory, site } from "@/lib/content";

export function generateStaticParams() {
  return inventory.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/about/inventory/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: inventory.find((i) => i.slug === slug)?.title };
}

export default function InventoryPage({ params }: PageProps<"/about/inventory/[slug]">) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<"/about/inventory/[slug]">, "params">) {
  const { slug } = await params;
  const item = inventory.find((i) => i.slug === slug);
  if (!item) notFound();
  const [lead, ...rest] = slug === "ppas" ? site.ppa : [];

  return (
    <div className="wrap pb-16 pt-10 lg:pb-[150px] lg:pt-[75px]">
      <h1 className="t-display max-w-[581px] uppercase">{item.title}</h1>
      {lead ? (
        <>
          <Image
            src={lead.src}
            width={lead.w}
            height={lead.h}
            alt={item.title}
            priority
            sizes="(min-width: 1440px) 1280px, 100vw"
            className="mt-10 w-full lg:mt-[100px]"
          />
          <div className="mt-[30px]">
            <Gallery
              images={[lead, ...rest]}
              label={item.title}
              className="grid grid-cols-2 gap-6 md:grid-cols-4"
              thumbClass="aspect-[302/170]"
            />
          </div>
        </>
      ) : (
        <div className="mt-10 max-w-[845px] lg:mt-[100px]">
          <p className="t-lead">This part of the inventory is being prepared and will be published here soon.</p>
          <PillLink href="/about" className="mt-8">Back to About</PillLink>
        </div>
      )}
    </div>
  );
}
