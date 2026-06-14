import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // Content Layer API (Astro 5+/6): a loader replaces the removed `type: 'content'`.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // One category per post, aligned to the positioning pillars (required = fail-fast).
    category: z.enum(['Data Platforms', 'MLOps & Forecasting', 'Agentic AI', 'Essays']),
    draft: z.boolean().default(true), // fail-safe: unpublished by default
    tags: z.array(z.string()).default([]),
    summary: z.string().default(''),
  }),
});

// MUST be `collections` (plural) — this is the registration export Astro reads.
export const collections = { posts };
