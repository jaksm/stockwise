import {z} from 'zod';

export const AssetSearchResultTypeSchema = z.union([
  z.literal('Equity'),
  z.literal('ETF'),
  z.literal('Mutual Fund'),
  z.literal('Currency'),
  z.literal('Crypto'),
  z.literal('Commodity'),
  z.literal('Index'),
]);

export type AssetSearchResultType = z.infer<typeof AssetSearchResultTypeSchema>;

export const AssetSearchResultSchema = z.object({
  currency: z.string(),
  name: z.string(),
  region: z.string(),
  symbol: z.string(),
  type: AssetSearchResultTypeSchema,
});

export type AssetSearchResult = z.infer<typeof AssetSearchResultSchema>;
