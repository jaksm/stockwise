import {z} from 'zod';

export const SearchResultSchema = z.object({
  currency: z.string(),
  name: z.string(),
  region: z.string(),
  symbol: z.string(),
  type: z.string(),
});

export type SearchResult = z.infer<typeof SearchResultSchema>;
