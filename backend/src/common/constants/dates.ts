export const oneDay = 1;
export const oneWeek = 7;
export const oneMonth = 30;

export function getDaysBetween(date1: Date, date2: Date) {
  const oneDayMs = 1000 * 60 * 60 * 24;

  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();

  const difference_ms = date1_ms - date2_ms;

  return Math.round(difference_ms / oneDayMs);
}
