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
- `src/content/posts/*.mdoc` — News & Blogs posts, managed through the CMS (see below)
- `src/content/*.json` — activities, policies and page copy extracted from the prototype
- `src/lib/content.ts` — typed access to the content, navigation and roadmap data
- `public/images`, `public/art`, `public/videos` — photos, vector artwork and the home video exported from the prototype

## Not connected yet

- The contact form opens the visitor's mail app; the newsletter field only acknowledges the address.
- Social links in the footer are placeholders.
- "Download Schedule" is hidden until a schedule file exists.
- The Startup page and two inventory pages are holding pages (no design in the prototype).

## Managing News & Blogs (Keystatic CMS)

Posts are files in `src/content/posts`, with cover images in `public/images/posts`. They are edited through the Keystatic admin at `/keystatic`.

**On your computer:** run `npm run dev` and open `http://localhost:3210/keystatic` (or whichever port dev is on). Saving writes the files directly; commit and push to publish.

**On the live site:** the admin commits to this GitHub repo, and the host rebuilds the site from that commit. One-time setup:

1. Create `.env.local` containing `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`, run `npm run dev`, and open `/keystatic`.
2. Follow the prompt to create the GitHub App and install it on this repo. Keystatic writes the generated values to `.env`.
3. On the host, set these environment variables, using the values from step 2, and set the GitHub App's callback URL to `https://YOUR-DOMAIN/api/keystatic/github/oauth/callback`:
   - `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

Without those variables the admin is switched off in production. Editors sign in with a GitHub account that has write access to this repo.
