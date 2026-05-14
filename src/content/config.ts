import { defineCollection, z } from "astro:content";

const posts = defineCollection({
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

export const collections = { posts, projects };
