import {z} from 'zod';

export const ArticleSchema = z.object({
  source: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  publishedAt: z.string(),
  symbol: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;
