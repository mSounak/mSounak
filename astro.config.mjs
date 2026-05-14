import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://msounak.dev",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: "tokyo-night", wrap: true },
  },
});
