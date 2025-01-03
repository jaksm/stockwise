import {z} from 'zod';

export const AssetSchema = z.object({
  symbol: z.string(),
  type: z.string(),
  price: z.number(),
  change: z.number(),
  changePercent: z.number(),
  name: z.string(),
  currency: z.string(),
});

export type Asset = z.infer<typeof AssetSchema>;
