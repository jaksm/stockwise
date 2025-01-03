import {z} from 'zod';

export const AssetSearchResultSchema = z.object({
  currency: z.string(),
  name: z.string(),
  region: z.string(),
  symbol: z.string(),
  type: z.string(),
});

export type AssetSearchResult = z.infer<typeof AssetSearchResultSchema>;
