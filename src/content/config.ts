import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tag: z.enum(['技术', '随笔', '设计']),
    excerpt: z.string(),
    readingTime: z.string(),
  }),
});

export const collections = { articles };
