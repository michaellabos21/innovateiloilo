import { collection, config, fields } from "@keystatic/core";

// Local mode edits the files on this machine (for development).
// GitHub mode commits to the repo, which is what the live site's /keystatic uses.
const useGithub = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

export default config({
  storage: useGithub ? { kind: "github", repo: "michaellabos21/innovateiloilo" } : { kind: "local" },
  ui: {
    brand: { name: "Innovate Iloilo" },
  },
  collections: {
    posts: collection({
      label: "News & Blogs",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "tag", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: { label: "URL slug", description: "The last part of the post's address. Changing it breaks old links." },
        }),
        tag: fields.select({
          label: "Type",
          options: [
            { label: "News", value: "News" },
            { label: "Blog", value: "Blog" },
          ],
          defaultValue: "News",
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        cover: fields.image({
          label: "Cover image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
          validation: { isRequired: true },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "One or two sentences shown on cards and in search results.",
          multiline: true,
        }),
        content: fields.markdoc({
          label: "Body",
          options: {
            image: { directory: "public/images/posts", publicPath: "/images/posts/" },
          },
        }),
      },
    }),
  },
});
