import {formatDistanceToNowStrict} from 'date-fns';
import {TimeSeriesInterval, TimeSeriesPointsResponse} from '../api/types';
import {TimeSeriesPointSchema, TimeSeriesSchema} from '../models/TimeSeries';

export function formatTimeAgo(isoString: string): string {
  return formatDistanceToNowStrict(new Date(isoString), {addSuffix: true});
}

/**
 * Parses a compact date-time string in the format 'YYYYMMDDThhmmss' and returns a Date object.
 *
 * @param dateTimeString - The compact date-time string to parse.
 * @returns A Date object representing the parsed date and time.
 *
 * @example
 * const compactDateTime = '20250104T123219';
 * const date = parseCompactDateTime(compactDateTime);
 */
export function parseCompactDateTime(dateTimeString: string): Date {
  const year = parseInt(dateTimeString.slice(0, 4), 10);
  const month = parseInt(dateTimeString.slice(4, 6), 10) - 1; // Months are zero-based
  const day = parseInt(dateTimeString.slice(6, 8), 10);
  const hour = parseInt(dateTimeString.slice(9, 11), 10);
  const minute = parseInt(dateTimeString.slice(11, 13), 10);
  const second = parseInt(dateTimeString.slice(13, 15), 10);

  return new Date(year, month, day, hour, minute, second);
}

export function formatTimeSeriesResponse(
  series: TimeSeriesPointsResponse,
  interval: TimeSeriesInterval,
) {
  const timeSeriesPoints = Object.entries(series)
    .map(([dateString, point]) => {
      const date = dateString.includes(' ')
        ? new Date(dateString)
        : new Date(`${dateString} 00:00:00`);

      const timeSeriesPoint = {
        open: Number(point['1. open']),
        high: Number(point['2. high']),
        low: Number(point['3. low']),
        close: Number(point['4. close']),
        volume: Number(point['5. volume']),
        timestamp: date.getTime(),
      };

      TimeSeriesPointSchema.parse(timeSeriesPoint);

      return timeSeriesPoint;
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  let filteredPoints = timeSeriesPoints;

  if (interval === 'week') {
    // Get last 7 days
    filteredPoints = timeSeriesPoints.slice(-7);
  } else if (interval === 'month') {
    // Get points for current month
    const lastPoint = timeSeriesPoints[timeSeriesPoints.length - 1];
    const lastDate = new Date(lastPoint.timestamp);
    const daysInMonth = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth() + 1,
      0,
    ).getDate();
    filteredPoints = timeSeriesPoints.slice(-daysInMonth);
  } else if (interval === 'year') {
    // Get 12 monthly points
    filteredPoints = timeSeriesPoints.slice(-12);
  }

  return TimeSeriesSchema.parse(filteredPoints);
}
