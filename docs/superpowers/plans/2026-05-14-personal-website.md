# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a minimalist personal website (literary/serif aesthetic) with a landing page, projects index, and writing index — deployable to Cloudflare Pages.

**Architecture:** Astro 4 SSG with two content collections (`writing`, `projects`). System serif stack, single global stylesheet, zero web fonts, zero client JS beyond Astro defaults. Site source lives at the root of this repo; the existing `README.md` is left untouched (it's the GitHub profile README and not part of the build).

**Tech Stack:** Astro 4, MDX, `@astrojs/rss`, `@astrojs/sitemap`, Shiki (`github-light`), TypeScript, pnpm.

Reference spec: `docs/superpowers/specs/2026-05-14-personal-website-design.md`.

---

## File Structure

```
mSounak/
├── README.md                       # untouched
├── package.json
├── pnpm-lock.yaml
├── astro.config.mjs
├── tsconfig.json
├── .gitignore                      # update
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── writing/
│   │   │   └── building-nexus.mdx
│   │   └── projects/
│   │       ├── nexus.md
│   │       ├── galaxy-pipeline.md
│   │       ├── staple-mcp.md
│   │       ├── kleur-gan.md
│   │       └── machine-translation.md
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── Post.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostList.astro
│   │   └── ProjectList.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects.astro
│   │   └── writing/
│   │       ├── index.astro
│   │       ├── [...slug].astro
│   │       └── rss.xml.ts
│   └── styles/
│       └── global.css
```

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore` (update)
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize package.json**

Create `package.json`:

```json
{
  "name": "msounak-site",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/mdx": "^3.1.0",
    "@astrojs/rss": "^4.0.0",
    "@astrojs/sitemap": "^3.2.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 2: Create astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://msounak.dev", // placeholder; update when domain is decided
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: "github-light", wrap: true },
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{ "extends": "astro/tsconfigs/strict" }
```

- [ ] **Step 4: Update .gitignore**

Append to the existing `.gitignore`:

```
node_modules/
dist/
.astro/
.DS_Store
.env
.env.production
```

- [ ] **Step 5: Add favicon**

Create `public/favicon.svg` — a simple "S" in the literary serif on warm background:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#faf7f2"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Iowan Old Style, Charter, Georgia, serif"
        font-size="44" font-weight="500" fill="#1a1a1a">S</text>
</svg>
```

- [ ] **Step 6: Install and verify**

Run: `pnpm install && pnpm build`
Expected: build succeeds with "no pages to build" warning (we haven't added pages yet — that's fine; if it errors instead, fix before continuing).

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs tsconfig.json .gitignore public/favicon.svg
git commit -m "chore: scaffold astro project"
```

---

### Task 2: Global styles (literary palette)

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write global.css**

```css
:root {
  --bg: #faf7f2;
  --fg: #1a1a1a;
  --muted: #4a4a4a;
  --subtle: #8a7f6f;
  --accent: #7a4a2a;
  --rule: #e8e0d2;
  --code-bg: #f3eee3;

  --serif: "Iowan Old Style", "Charter", "Georgia", serif;
  --mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;

  --content-w: 640px;
}

* { box-sizing: border-box; }

html, body { margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.container {
  max-width: var(--content-w);
  margin: 0 auto;
  padding: 56px 24px 96px;
}

nav.site-nav {
  display: flex;
  gap: 24px;
  font-size: 15px;
  color: var(--subtle);
  margin-bottom: 56px;
}
nav.site-nav a { color: var(--subtle); text-decoration: none; }
nav.site-nav a:hover { color: var(--accent); text-decoration: underline; text-underline-offset: 4px; }
nav.site-nav .home { color: var(--fg); font-weight: 500; }

a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
a:hover { text-decoration-thickness: 2px; }

h1, h2, h3, h4 { font-weight: 600; line-height: 1.25; margin: 1.8em 0 0.5em; letter-spacing: -0.005em; }
h1 { font-size: 1.9rem; margin-top: 0; }
h2 { font-size: 1.4rem; }
h3 { font-size: 1.15rem; }

p { margin: 1em 0; color: var(--fg); }
p.muted { color: var(--muted); }

hr { border: 0; border-top: 1px solid var(--rule); margin: 3em 0; }

code { font-family: var(--mono); font-size: 0.92em; background: var(--code-bg); padding: 1px 5px; border-radius: 3px; }
pre { font-family: var(--mono); font-size: 0.88em; background: var(--code-bg); padding: 16px 18px; border-radius: 4px; overflow-x: auto; line-height: 1.5; }
pre code { background: transparent; padding: 0; }

blockquote { border-left: 2px solid var(--subtle); margin: 1.4em 0; padding: 0.2em 0 0.2em 1em; color: var(--muted); font-style: italic; }

ul, ol { padding-left: 1.4em; }
li { margin: 0.3em 0; }

img { max-width: 100%; height: auto; }

.post-meta { color: var(--subtle); font-size: 14px; margin-top: -0.3em; }

.post-list { list-style: none; padding: 0; }
.post-list li { margin: 1.4em 0; }
.post-list .date { color: var(--subtle); font-size: 14px; display: block; }
.post-list .title { font-size: 1.1rem; font-weight: 500; }
.post-list .summary { color: var(--muted); margin-top: 0.2em; }

.project { margin: 2em 0; }
.project .name { font-weight: 600; font-size: 1.1rem; }
.project .tag { color: var(--subtle); font-size: 14px; }
.project .stack { color: var(--subtle); font-size: 14px; font-style: italic; margin-top: 0.3em; }

footer.site-footer {
  margin-top: 80px;
  padding-top: 24px;
  border-top: 1px solid var(--rule);
  color: var(--subtle);
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
footer.site-footer a { color: var(--subtle); }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add literary palette global styles"
```

---

### Task 3: Layouts and components (Nav, Footer, Base, Post)

**Files:**
- Create: `src/components/Nav.astro`, `src/components/Footer.astro`
- Create: `src/layouts/Base.astro`, `src/layouts/Post.astro`

- [ ] **Step 1: Create Nav.astro**

```astro
---
const { current } = Astro.props as { current?: "home" | "writing" | "projects" };
---
<nav class="site-nav">
  <a href="/" class={current === "home" ? "home" : ""}>Sounak</a>
  <a href="/writing">Writing</a>
  <a href="/projects">Projects</a>
</nav>
```

- [ ] **Step 2: Create Footer.astro**

```astro
---
---
<footer class="site-footer">
  <span>Bengaluru</span>
  <a href="https://github.com/mSounak">GitHub</a>
  <a href="https://www.linkedin.com/in/msounak">LinkedIn</a>
  <a href="https://twitter.com/mSounak2000">Twitter</a>
  <a href="mailto:sounak.mukherjee2000@gmail.com">Email</a>
</footer>
```

- [ ] **Step 3: Create Base.astro**

```astro
---
import "../styles/global.css";
import Nav from "../components/Nav.astro";
import Footer from "../components/Footer.astro";

interface Props {
  title: string;
  description?: string;
  current?: "home" | "writing" | "projects";
}
const { title, description, current } = Astro.props;
const desc = description ?? "Sounak Mukherjee — backend & infrastructure engineer building AI document systems at Staple.";
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    <meta property="og:type" content="website" />
    <link rel="alternate" type="application/rss+xml" title="Sounak — Writing" href="/writing/rss.xml" />
  </head>
  <body>
    <div class="container">
      <Nav current={current} />
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </body>
</html>
```

- [ ] **Step 4: Create Post.astro**

```astro
---
import Base from "./Base.astro";

interface Props {
  title: string;
  description: string;
  pubDate: Date;
}
const { title, description, pubDate } = Astro.props;
const dateStr = pubDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
---
<Base title={`${title} — Sounak`} description={description} current="writing">
  <h1>{title}</h1>
  <p class="post-meta">{dateStr}</p>
  <article>
    <slot />
  </article>
</Base>
```

- [ ] **Step 5: Commit**

```bash
git add src/components src/layouts
git commit -m "feat: add nav, footer, base and post layouts"
```

---

### Task 4: Content collections (schema + project entries)

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/*.md` (5 files)

- [ ] **Step 1: Define collections**

Create `src/content/config.ts`:

```ts
import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    kind: z.enum(["personal", "work"]),
    stack: z.array(z.string()),
    repo: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { writing, projects };
```

- [ ] **Step 2: Create project entries**

`src/content/projects/nexus.md`:

```md
---
name: Nexus
kind: personal
stack: ["Go", "MCP", "Claude"]
order: 1
---

A Telegram MCP server written in Go that exposes a personal Telegram account as tools for AI assistants. Ships **Nexus Control**, a background forwarder that routes incoming messages to a control group, generates Claude-powered reply suggestions with per-contact memory (via Haiku), and produces a morning brief from Jira, Google Calendar, Slack, and the web.

Source is private.
```

`src/content/projects/galaxy-pipeline.md`:

```md
---
name: Galaxy scanning pipeline overhaul
kind: work
stack: ["Python", "Flask", "Temporal"]
order: 2
---

Production rewrite of Staple's document scanning service. Distributed ingestion and AI-driven extraction at scale.
```

`src/content/projects/staple-mcp.md`:

```md
---
name: Staple MCP server
kind: work
stack: ["Python", "MCP"]
order: 3
---

Wraps Staple's document APIs as MCP tools so LLMs can drive extraction workflows directly.
```

`src/content/projects/kleur-gan.md`:

```md
---
name: kleur-GAN
kind: personal
stack: ["PyTorch"]
repo: "https://github.com/mSounak/kleur-GAN"
order: 4
---

A GAN that colorizes black-and-white images.
```

`src/content/projects/machine-translation.md`:

```md
---
name: Machine Translation Transformer
kind: personal
stack: ["TensorFlow"]
repo: "https://github.com/mSounak/Machine-translation"
order: 5
---

A seq2seq transformer for machine translation, built from scratch to learn the architecture.
```

- [ ] **Step 3: Commit**

```bash
git add src/content
git commit -m "feat: add content collections and project entries"
```

---

### Task 5: Landing page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Write the landing page**

```astro
---
import { getCollection } from "astro:content";
import Base from "../layouts/Base.astro";

const posts = (await getCollection("writing", ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
const latest = posts[0];
---
<Base title="Sounak Mukherjee" current="home">
  <h1>Sounak Mukherjee</h1>

  <p>
    Backend &amp; infrastructure engineer at <a href="https://www.staple.ai/">Staple AI</a>, based in Bengaluru.
    I build AI-powered document intelligence — high-throughput scanning pipelines and LLM-integrated backends.
  </p>

  <p class="muted">
    Previously a data scientist at Pratilipi. Lately I&rsquo;ve been writing Go on the side and building MCP servers for things I use every day.
  </p>

  {latest && (
    <>
      <hr />
      <p class="muted">Latest writing</p>
      <p>
        <a href={`/writing/${latest.slug}/`}>{latest.data.title}</a><br />
        <span class="post-meta">{latest.data.pubDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
      </p>
    </>
  )}
</Base>
```

- [ ] **Step 2: Run dev server and visually verify**

Run: `pnpm dev`
Open: `http://localhost:4321`
Expected: warm off-white background, serif text, nav at top, landing copy reads correctly, footer at bottom. The "Latest writing" block won't appear yet (no post). Stop the dev server (Ctrl+C).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add landing page"
```

---

### Task 6: Projects index page

**Files:**
- Create: `src/components/ProjectList.astro`
- Create: `src/pages/projects.astro`

- [ ] **Step 1: Write ProjectList.astro**

```astro
---
import type { CollectionEntry } from "astro:content";
interface Props { items: CollectionEntry<"projects">[]; }
const { items } = Astro.props;
---
{items.map(async (item) => {
  const { Content } = await item.render();
  return (
    <div class="project">
      <div class="name">
        {item.data.repo
          ? <a href={item.data.repo}>{item.data.name}</a>
          : item.data.name}
        <span class="tag"> · {item.data.kind}</span>
      </div>
      <Content />
      <div class="stack">{item.data.stack.join(" · ")}</div>
    </div>
  );
})}
```

- [ ] **Step 2: Write projects.astro**

```astro
---
import { getCollection } from "astro:content";
import Base from "../layouts/Base.astro";
import ProjectList from "../components/ProjectList.astro";

const items = (await getCollection("projects"))
  .sort((a, b) => a.data.order - b.data.order);
---
<Base title="Projects — Sounak" current="projects">
  <h1>Projects</h1>
  <p class="muted">A short list of work and personal projects.</p>
  <ProjectList items={items} />
</Base>
```

- [ ] **Step 3: Verify in dev**

Run: `pnpm dev`
Open: `http://localhost:4321/projects`
Expected: Five projects listed in order; Nexus has no repo link (plain text name), kleur-GAN and Machine Translation have linked names. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectList.astro src/pages/projects.astro
git commit -m "feat: add projects index page"
```

---

### Task 7: Writing index, post route, and a launch post

**Files:**
- Create: `src/components/PostList.astro`
- Create: `src/pages/writing/index.astro`
- Create: `src/pages/writing/[...slug].astro`
- Create: `src/content/writing/building-nexus.mdx`

- [ ] **Step 1: Write PostList.astro**

```astro
---
import type { CollectionEntry } from "astro:content";
interface Props { posts: CollectionEntry<"writing">[]; }
const { posts } = Astro.props;
const fmt = (d: Date) => d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
---
<ul class="post-list">
  {posts.map((p) => (
    <li>
      <span class="date">{fmt(p.data.pubDate)}</span>
      <a class="title" href={`/writing/${p.slug}/`}>{p.data.title}</a>
      <div class="summary">{p.data.description}</div>
    </li>
  ))}
</ul>
```

- [ ] **Step 2: Write writing/index.astro**

```astro
---
import { getCollection } from "astro:content";
import Base from "../../layouts/Base.astro";
import PostList from "../../components/PostList.astro";

const posts = (await getCollection("writing", ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
---
<Base title="Writing — Sounak" current="writing">
  <h1>Writing</h1>
  <p class="muted">Occasional notes on backend, infra, and the things I build.</p>
  <PostList posts={posts} />
</Base>
```

- [ ] **Step 3: Write writing/[...slug].astro**

```astro
---
import { getCollection } from "astro:content";
import Post from "../../layouts/Post.astro";

export async function getStaticPaths() {
  const posts = await getCollection("writing", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<Post title={post.data.title} description={post.data.description} pubDate={post.data.pubDate}>
  <Content />
</Post>
```

- [ ] **Step 4: Write the launch post (Nexus)**

`src/content/writing/building-nexus.mdx`:

```mdx
---
title: "Building Nexus: a Telegram MCP server with an AI control layer"
description: "Design notes from wrapping my Telegram account as MCP tools and adding an AI suggestion loop on top."
pubDate: 2026-05-14
draft: false
---

I wanted my Telegram account to be a first-class tool surface for AI assistants — something Claude could read from, write to, and reason about without me babysitting it. The result is **Nexus**, a Go MCP server that exposes Telegram as a small set of tools, plus a control layer called **Nexus Control** that turns it into a real assistant for incoming messages.

This post is a design tour, not a tutorial.

## The MCP surface

The tool list stays small on purpose. Anything larger turns into a maze for the model.

- `list_chats` — recent dialogs
- `search_chats` — contacts and groups
- `get_messages` — history from any chat
- `send_message` — outbound
- `get_updates` — drain buffered incoming
- `resolve_username` — `@handle` → chat ID
- `get_message_media` — download photos

Auth is MTProto via [`gotd/td`](https://github.com/gotd/td). A one-time `--auth` flow writes a session to `~/.telegram-mcp/session.json`; everything after is silent.

## The control loop

Nexus Control is the part that earns the name. It runs in the background and routes every incoming DM and non-channel group message to a private "control group" via a bot. For each message, Claude drafts a reply suggestion and posts it as a reply to the original.

I drive it with reactions:

- 👍 sends the suggestion
- 👎 rejects it
- `> custom text` (as a reply) sends my own message in the right chat
- `> s` sends the suggestion without reacting
- `SKIP` / `NO` ignores
- `BRIEF` triggers a morning brief on demand

The reaction-as-interface bit is the thing that made this actually usable. Typing yes/no in a chat felt heavy; reacting is one tap.

## Memory

Two layers:

1. **Profile** — `~/.telegram-mcp/memory/profile.md`, written by hand. Identity, friends, texting style. Injected into every new suggestion session.
2. **Per-contact** — `~/.telegram-mcp/memory/contacts/<name>.md`, written by Claude Haiku after every approved send. Cheap, async, and means the next conversation starts with context.

Per-chat Claude sessions persist across restarts (`chat-sessions.json`), so suggestion quality grows within a conversation and stays isolated from other chats. This was the single biggest quality jump.

## Morning brief

At 8am (or on demand with `BRIEF`), Nexus pulls:

- Jira — assigned tickets, recent mentions
- Google Calendar — today's schedule
- Slack — alert channels, DMs needing response
- Web — top tech news, local weather
- Telegram — last 24h of conversation and channel feeds

Then Claude collapses it into a one-screen summary. It's not magic — it's the same data I'd open six tabs for, just stitched together.

## What I'd do differently

A few things I'd change with hindsight:

- Start with the reaction interface, not a chat-style command parser. I burned a weekend on the wrong abstraction.
- Treat memory as the product, not the tools. The tools are commodity; the memory layer is what makes suggestions feel like *yours*.
- Don't ship a "general purpose chat" mode early. It dilutes the loop. The thing earns its keep when it's good at one job — drafting replies — not when it tries to be everything.

Source is private for now. Happy to talk about specifics if you're building something similar.
```

- [ ] **Step 5: Verify in dev**

Run: `pnpm dev`
Open: `http://localhost:4321/writing` — should show the Nexus post listed.
Open: `http://localhost:4321/writing/building-nexus/` — should render the full post with date, headings, and code-style emphasis as expected.
Open: `http://localhost:4321/` — landing should now show the "Latest writing" block linking to the Nexus post.
Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add src/components/PostList.astro src/pages/writing src/content/writing
git commit -m "feat: add writing index, post route, and launch post"
```

---

### Task 8: RSS feed

**Files:**
- Create: `src/pages/writing/rss.xml.ts`

- [ ] **Step 1: Write the RSS endpoint**

```ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("writing", ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: "Sounak Mukherjee — Writing",
    description: "Occasional notes on backend, infra, and the things I build.",
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/writing/${p.slug}/`,
    })),
  });
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build && pnpm preview`
Open: `http://localhost:4321/writing/rss.xml`
Expected: Valid XML with the Nexus post as an item. Stop preview server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/writing/rss.xml.ts
git commit -m "feat: add rss feed for writing"
```

---

### Task 9: Build verification + deploy config

**Files:**
- Create: `wrangler.toml` *(optional, for Cloudflare Pages — only if Sounak wants config-as-code; the dashboard works fine too)*

- [ ] **Step 1: Run full production build**

Run: `pnpm build`
Expected output should include:
- `dist/index.html`
- `dist/projects/index.html`
- `dist/writing/index.html`
- `dist/writing/building-nexus/index.html`
- `dist/writing/rss.xml`
- `dist/sitemap-index.xml`

If any are missing, stop and fix before continuing.

- [ ] **Step 2: Preview the build locally**

Run: `pnpm preview`
Walk through every page in the browser. Verify nothing 404s, RSS validates, post renders with correct typography.

- [ ] **Step 3: Lighthouse spot-check (optional but recommended)**

In Chrome DevTools, run Lighthouse on the landing page in incognito.
Expected: Performance, Accessibility, Best Practices ≥ 95. SEO ≥ 90.
If any are below threshold, capture the failing audits and fix or note them — don't gold-plate.

- [ ] **Step 4: Commit**

```bash
git commit --allow-empty -m "chore: site verified for production build"
```

- [ ] **Step 5: Deploy notes (for the user, not automated)**

Deploy on Cloudflare Pages:

1. Push the repo to GitHub (already there: `github.com/mSounak/mSounak`).
2. In the Cloudflare dashboard → Pages → Create project → Connect to Git → select `mSounak`.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION=20`
4. Save and deploy. Cloudflare provides a `*.pages.dev` URL automatically.
5. When a custom domain is decided, add it under the project's Custom Domains tab and update `site:` in `astro.config.mjs`.

---

## Self-Review

- **Spec coverage:** Landing, projects, writing index, post route, RSS, sitemap, content collections, literary palette, system serif stack, zero web fonts, no dark mode (deferred), favicon, footer links. ✅
- **Out-of-scope items:** None added (dark mode, images, comments, analytics, search, tags all deferred per spec §8). ✅
- **Open questions remaining:** Custom domain (still TBD, placeholder in config); repo split (deferred — site lives in this repo at root, README.md untouched). Noted in Task 1 and Task 9.
- **Placeholders:** None.
- **Type consistency:** `CollectionEntry<"writing">`, `CollectionEntry<"projects">`, schema fields, and slugs match across tasks. ✅
