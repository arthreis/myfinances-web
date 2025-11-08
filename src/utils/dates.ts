import { formatInTimeZone } from 'date-fns-tz';

export function formatUTCDate(date: Date | string | number, pattern = 'dd/MM/yyyy HH:mm:ss') {
  return formatInTimeZone(date, 'UTC', pattern);
}
