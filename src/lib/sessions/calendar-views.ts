// Calendar arithmetic on `yyyy-MM-dd` dates for the tutor's week and month views. A calendar
// date has no zone: these count days on the calendar, and only turning a date into an instant
// (localDateTimeToUtc) involves Casablanca's offset.

function parts(date: string): [number, number, number] {
  const [year = 1970, month = 1, day = 1] = date.split("-").map(Number);
  return [year, month, day];
}

function key(value: Date): string {
  return value.toISOString().slice(0, 10);
}

/** A real calendar date, between 2000 and 2099: an address cannot send the views to year 9999. */
export function isDateKey(value: string): boolean {
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = parts(value);
  return key(new Date(Date.UTC(year, month - 1, day))) === value;
}

export function addDays(date: string, days: number): string {
  const [year, month, day] = parts(date);
  return key(new Date(Date.UTC(year, month - 1, day + days)));
}

/** The first day of the month `months` months away. */
export function addMonths(date: string, months: number): string {
  const [year, month] = parts(date);
  return key(new Date(Date.UTC(year, month - 1 + months, 1)));
}

/** ISO weekday, 1 = lundi … 7 = dimanche. */
function weekday(date: string): number {
  const [year, month, day] = parts(date);
  const value = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return value === 0 ? 7 : value;
}

/** Monday to Sunday of the week a date falls in. */
export function weekOf(date: string): string[] {
  const monday = addDays(date, 1 - weekday(date));
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

/** Whole weeks, Monday to Sunday, covering the month a date falls in. */
export function monthGridOf(date: string): string[] {
  const first = addMonths(date, 0);
  const last = addDays(addMonths(date, 1), -1);
  const start = addDays(first, 1 - weekday(first));
  const end = addDays(last, 7 - weekday(last));
  const days: string[] = [];
  for (let day = start; day <= end; day = addDays(day, 1)) days.push(day);
  return days;
}

export function sameMonth(a: string, b: string): boolean {
  return a.slice(0, 7) === b.slice(0, 7);
}
