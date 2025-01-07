import {z} from 'zod';

export const TimeSeriesPointSchema = z.object({
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
  timestamp: z.number(),
});

export type TimeSeriesPoint = z.infer<typeof TimeSeriesPointSchema>;

export const TimeSeriesSchema = z.array(TimeSeriesPointSchema);

export type TimeSeries = z.infer<typeof TimeSeriesSchema>;
