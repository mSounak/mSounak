# Personal Website — Design Spec

**Date:** 2026-05-14
**Owner:** Sounak Mukherjee
**Repo:** `mSounak` (this repo will host the site source; the existing README stays as the GitHub profile README and is unrelated to deploy)

## 1. Goal

A minimalist personal website that serves three purposes at once:

1. **Hiring signal** — recruiters and engineering managers landing from LinkedIn get a clear picture of who Sounak is and what he builds.
2. **Writing surface** — a place to publish a small number of technical posts (1–5/year, not a high-cadence blog).
3. **Project hub** — short writeups of work and personal projects, with Nexus as the headline.

Reference sites for tone and scope: [amanverma.dev](https://amanverma.dev/), [rohan.foo](https://rohan.foo/).

## 2. Visual Direction

**Literary.** Warm off-white background, serif body type, generous line height, restrained accents. The page should read like an essay, not a dashboard.

| Token | Value |
|---|---|
| Background | `#faf7f2` (warm off-white) |
| Foreground | `#1a1a1a` |
| Muted | `#4a4a4a` |
| Subtle | `#8a7f6f` (warm grey-brown) |
| Accent (links) | `#7a4a2a` (warm brown, underline on hover) |
| Body font | Iowan Old Style → Charter → Georgia (system serif stack, no web font download) |
| Heading font | Same as body, weight 500–600 |
| Mono font | JetBrains Mono → SF Mono → Menlo (only for code blocks / inline `code`) |
| Max content width | 640px |
| Base font size | 17–18px, line-height 1.6–1.7 |

**Dark mode:** Not in v1. Add later only if requested.

## 3. Information Architecture

Four pages total. Single-column, centered, no nav bar on the landing — text-only nav at the top.

```
/                  Landing (bio, links, latest writing teaser)
/projects          Projects index → one paragraph per project
/writing           Blog index → date + title + 1-line summary
/writing/[slug]    Individual blog post (MDX)
```

Top nav (text links, no logo): `Sounak · Writing · Projects` on every page, pointing back to `/`, `/writing`, `/projects`.

Footer on every page: `Bengaluru · GitHub · LinkedIn · Twitter · Email`.

## 4. Content

### 4.1 Landing copy

> **Sounak Mukherjee**
>
> Backend & infrastructure engineer at [Staple AI](https://www.staple.ai/), based in Bengaluru. I build AI-powered document intelligence — high-throughput scanning pipelines and LLM-integrated backends.
>
> Previously a data scientist at Pratilipi. Lately I've been writing Go on the side and building MCP servers for things I use every day.
>
> [Read what I'm writing →](/writing)

### 4.2 Projects

In order of prominence:

1. **Nexus** *(personal, private repo)* — A Telegram MCP server written in Go that exposes a personal Telegram account as tools for AI assistants. Ships **Nexus Control**, a background forwarder that routes incoming messages to a control group, generates Claude-powered reply suggestions with per-contact memory (via Haiku), and produces a morning brief from Jira, Google Calendar, Slack, and the web. *Go, MCP, Claude.*
2. **Galaxy scanning pipeline overhaul** *(work, Staple AI)* — Production rewrite of the document scanning service. Distributed ingestion and AI-driven extraction at scale. *Python, Flask, Temporal-style workflows.*
3. **Staple MCP server** *(work, Staple AI)* — Wraps Staple's document APIs as MCP tools so LLMs can drive extraction workflows directly. *Python, MCP.*
4. **kleur-GAN** *(personal, [GitHub](https://github.com/mSounak/kleur-GAN))* — A GAN that colorizes black-and-white images. *PyTorch.*
5. **Machine Translation Transformer** *(personal, [GitHub](https://github.com/mSounak/Machine-translation))* — A seq2seq transformer for machine translation, built from scratch to learn the architecture. *TensorFlow.*

Each entry is 2–4 sentences. No images in v1.

### 4.3 Blog posts (drafts to ship at launch)

Three drafts written at launch, ~500–700 words each. Drafts to be written *after* the site is up — launch with at most one published, the others as `draft: true`.

1. **"Building Nexus: a Telegram MCP server with an AI control layer"** — design notes: MTProto auth, the MCP tool surface, the suggestion loop driven by emoji reactions, per-contact memory updates via Haiku.
2. **"From data science to backend infra"** — the Pratilipi → Staple arc and what changed in how I work.
3. **"Overhauling a document scanning pipeline in production"** — what broke at scale, the migration plan, the numbers after.

## 5. Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Astro 4+** (content-first SSG) |
| Content | **MDX** for blog posts, frontmatter via Astro's content collections |
| Styling | Plain CSS in a single global stylesheet — no Tailwind, no CSS-in-JS. The site is small enough. |
| Syntax highlighting | Astro's built-in Shiki, single theme (`github-light` to match the warm palette) |
| Fonts | System serif stack — **no web font download** to keep the site fast and offline-friendly |
| RSS | Astro RSS integration on `/writing/rss.xml` |
| Sitemap | `@astrojs/sitemap` |
| Deploy | **Cloudflare Pages** (free tier, fast, no cold start). Custom domain TBD by Sounak. |
| Analytics | None in v1. (Plausible/Umami can be added later if useful.) |

## 6. Project Structure

```
mSounak/
├── README.md                       # untouched, this is the GitHub profile README
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts               # content collection schemas
│   │   ├── writing/                # MDX blog posts
│   │   │   └── *.mdx
│   │   └── projects/               # MD project entries
│   │       └── *.md
│   ├── layouts/
│   │   ├── Base.astro              # html shell, nav, footer
│   │   └── Post.astro              # blog post wrapper, frontmatter rendering
│   ├── pages/
│   │   ├── index.astro             # landing
│   │   ├── projects.astro          # projects index
│   │   ├── writing/
│   │   │   ├── index.astro         # blog index
│   │   │   ├── [...slug].astro     # blog post route
│   │   │   └── rss.xml.ts
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostList.astro
│   │   └── ProjectList.astro
│   └── styles/
│       └── global.css              # all styling lives here
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-14-personal-website-design.md
```

Boundaries:

- **`layouts/`** owns the page shell (head, nav, footer, global CSS link). Pages decide nothing about chrome.
- **`pages/`** owns the route and the content fetch. No styling beyond per-page layout overrides.
- **`components/`** are presentational only — no data fetching.
- **`content/`** is the single source of truth for projects and writing. Adding a project = adding a file, no code change.
- **`styles/global.css`** holds everything. If it grows past ~300 lines, split by concern (typography, layout, prose).

## 7. Content Collections

**`src/content/config.ts`** defines two collections:

```ts
writing: z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  draft: z.boolean().default(false),
})

projects: z.object({
  name: z.string(),
  kind: z.enum(["personal", "work"]),
  stack: z.array(z.string()),
  repo: z.string().url().optional(),     // omitted for private projects
  order: z.number(),                      // controls display order
})
```

Listing pages filter `draft: true` in production builds only (drafts visible in dev).

## 8. Out of Scope (v1)

- Dark mode
- Web fonts / custom typography
- Project images, screenshots, or demos
- Comments on posts
- Newsletter signup
- Analytics
- Search
- Tags / categories on writing
- An "Uses" page, "Now" page, or any other extras

Each of these can be added later behind its own small spec.

## 9. Success Criteria

1. Lighthouse performance, accessibility, best-practices ≥ 95 on the landing page.
2. Total page weight on landing ≤ 50 KB (no fonts, no JS bundle beyond Astro's defaults).
3. Adding a new blog post = create one `.mdx` file with frontmatter, `git push`, deploy. No code change.
4. Adding a project = create one `.md` file in `content/projects/`. No code change.
5. Site renders correctly with JavaScript disabled.

## 10. Open Questions

- **Custom domain:** Sounak to decide (`msounak.dev`? `sounak.dev`? `mSounak.com`?). Cloudflare Pages auto-provides a `*.pages.dev` subdomain in the meantime.
- **GitHub repo for the site:** This repo (`mSounak`) is currently the profile README repo. Site source can live here in a `site/` subdirectory, or in a new repo. Recommend a new repo (`mSounak.dev` or similar) so the profile README isn't entangled with the site build. Confirm before scaffolding.
