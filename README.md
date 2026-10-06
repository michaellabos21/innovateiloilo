# Innovate Iloilo

Website for Innovate Iloilo, built from the Figma prototype with Next.js (App Router), TypeScript and Tailwind CSS.

## Run

```bash
npm install
npm run dev
```

## Where things live

- `src/app` — pages: Home, About (+ inventory), Policies & Governance, Activities (+ detail), News & Blogs (+ detail), Contact, Startup
- `src/components` — shared UI (header, footer, buttons, cards, lightbox, roadmap)
- `src/content/*.json` — activities, posts, policies and page copy extracted from the prototype
- `src/lib/content.ts` — typed access to the content, navigation and roadmap data
- `public/images`, `public/art`, `public/videos` — photos, vector artwork and the home video exported from the prototype

## Not connected yet

- The contact form opens the visitor's mail app; the newsletter field only acknowledges the address.
- Social links in the footer are placeholders.
- "Download Schedule" is hidden until a schedule file exists.
- The Startup page and two inventory pages are holding pages (no design in the prototype).
