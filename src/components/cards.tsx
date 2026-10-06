import Image from "next/image";
import Link from "next/link";
import type { Activity, Post } from "@/lib/content";
import { ArrowDot, Tag } from "./ui";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug}`} className="group flex min-h-[160px] bg-white sm:min-h-[250px]">
      <div className="relative w-2/5 shrink-0 overflow-hidden sm:w-[52%]">
        <Image
          src={post.image.src}
          fill
          alt=""
          sizes="(min-width: 1024px) 326px, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 px-4 py-4 font-roboto sm:px-[22px]">
        <Tag className="self-start font-sans">{post.tag}</Tag>
        <h3 className="text-base font-bold leading-none group-hover:text-brand sm:text-xl">{post.title}</h3>
        <p className="text-xs opacity-70 sm:mt-2">{post.date}</p>
      </div>
    </Link>
  );
}

export function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group flex items-start justify-between gap-6 border-t border-ink/15 py-8 lg:py-[51px]"
    >
      <div>
        <h3 className="t-title max-w-[1087px] group-hover:text-brand">{activity.title}</h3>
        <p className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-lg">
          {activity.upcoming ? (
            <span className="inline-flex h-[27px] items-center rounded-full bg-ink px-3.5 text-sm font-semibold text-white">
              UPCOMING
            </span>
          ) : null}
          {activity.shortDate}
        </p>
      </div>
      <ArrowDot />
    </Link>
  );
}
