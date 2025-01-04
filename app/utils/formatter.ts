import {formatDistanceToNowStrict} from 'date-fns';

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
