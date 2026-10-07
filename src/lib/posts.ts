import fs from "node:fs";
import path from "node:path";
import Markdoc, { type Node } from "@markdoc/markdoc";
import { load as loadYaml } from "js-yaml";
import type { Post } from "./content";

// Posts are the files Keystatic writes to src/content/posts (YAML front matter + Markdoc body).
// They are read synchronously so pages stay fully static: a new post goes live with the next build.
const dir = path.join(process.cwd(), "src/content/posts");

const longDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

function read(file: string): Post & { body: Node } {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = (match ? loadYaml(match[1]) : {}) as Record<string, unknown>;
  const day = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  const parsed = new Date(`${day}T00:00:00Z`);
  return {
    slug: file.replace(/\.mdoc$/, ""),
    title: String(data.title ?? ""),
    tag: data.tag === "Blog" ? "Blog" : "News",
    date: Number.isNaN(parsed.getTime()) ? day : longDate.format(parsed),
    sortDate: day,
    image: String(data.cover ?? ""),
    excerpt: String(data.excerpt ?? ""),
    body: Markdoc.parse(match ? match[2] : raw),
  };
}

function files() {
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".mdoc")) : [];
}

/** All posts, newest first, without their bodies (safe to pass to client components). */
export function getPosts(): Post[] {
  return files()
    .map(read)
    .map(({ slug, title, tag, date, sortDate, image, excerpt }) => ({ slug, title, tag, date, sortDate, image, excerpt }))
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

export function getPost(slug: string) {
  const file = `${slug}.mdoc`;
  return files().includes(file) ? read(file) : null;
}
