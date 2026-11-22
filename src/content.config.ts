import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    date: z.coerce.date(),
    category: z.enum(["生活", "想法", "省思"]),
    excerpt: z.string(),
    excerptEn: z.string(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

const diary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/diary" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string().optional(),
    titleEn: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
  }),
});

export const collections = { posts, diary };
