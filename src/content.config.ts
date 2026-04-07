import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writeUps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/write-ups' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { 'write-ups': writeUps };
