import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/cards";
import { Share } from "@/components/Share";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return { title: p?.title, description: p?.excerpt || undefined };
}

export default function PostPage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<"/news/[slug]">, "params">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);
  const body = Markdoc.renderers.react(Markdoc.transform(post.body), React);

  return (
    <>
      <article className="wrap pt-10 lg:pt-[75px]">
        <div className="relative aspect-[1280/552] overflow-hidden bg-[#d9d9d9]">
          {post.image ? (
            <Image src={post.image} fill alt="" priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
          ) : null}
        </div>
        <h1 className="mt-8 font-roboto text-[clamp(1.75rem,2.78vw,2.5rem)] font-bold leading-none lg:mt-[50px]">
          {post.title}
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:mt-[50px]">
          <p className="flex items-center gap-[25px] text-base">
            <span className="inline-flex h-[26px] items-center rounded-full bg-ink px-[11px] text-sm font-bold text-mist">
              {post.tag}
            </span>
            <time className="opacity-70">{post.date}</time>
          </p>
          <Share title={post.title} />
        </div>
        <div className="post-body mt-12 font-roboto text-lg leading-[1.3] lg:mt-[150px] lg:text-[25px] lg:leading-[1.15]">
          {body}
        </div>
      </article>

      <section className="wrap pb-16 pt-16 lg:pb-[150px] lg:pt-[200px]">
        <h2 className="font-roboto text-[clamp(1.75rem,2.78vw,2.5rem)] font-bold leading-none">RELATED POSTS</h2>
        <ul className="grid gap-6 pt-8 lg:grid-cols-2 lg:pt-[50px]">
          {related.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
