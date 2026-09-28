import { tz, TZDate } from "@date-fns/tz";
import { addDays, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Every date a person sees is rendered in this zone. Never hardcode its offset:
 * Morocco is UTC+1 most of the year and UTC+0 during Ramadan.
 */
export const APP_TIME_ZONE = "Africa/Casablanca";

const inAppZone = tz(APP_TIME_ZONE);

const longDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: APP_TIME_ZONE,
});

type DateInput = Date | string | number;

/** Formats a UTC instant as Casablanca wall-clock time, in French. */
export function formatLocal(value: DateInput, pattern: string): string {
  return format(value, pattern, { in: inAppZone, locale: fr });
}

/**
 * A stored date as "1 septembre 2026", without ever reading the clock.
 *
 * `formatLocal` goes through TZDate, whose constructor calls `new Date()` with no
 * arguments internally. Next refuses an unstable value like that while prerendering, so
 * anything a static page shows has to come through here instead. Intl resolves the zone
 * itself, Ramadan's two shifts included.
 */
export function formatLocalDate(value: DateInput): string {
  return longDate.format(new Date(value));
}

const FIRST =
  /(^|[^0-9])1 (janv\.|janvier|févr\.|février|mars|avr\.|avril|mai|juin|juil\.|juillet|août|sept\.|septembre|oct\.|octobre|nov\.|novembre|déc\.|décembre)/g;

/** « 1 octobre » → « 1er octobre »: French writes the first of the month so. */
export function withFirst(text: string): string {
  return text.replace(FIRST, "$11er $2");
}

/** The Casablanca calendar day (`yyyy-MM-dd`) an instant falls on. */
export function localDateKey(value: DateInput): string {
  return formatLocal(value, "yyyy-MM-dd");
}

/**
 * The Casablanca calendar day `days` days after the one an instant falls on. Counted on the
 * calendar, not in 24-hour steps: the week before Ramadan's change of offset has a day of 23
 * or 25 hours, and a week of hours would land on the wrong day near midnight.
 */
export function localDateKeyInDays(value: DateInput, days: number): string {
  return formatLocal(addDays(value, days, { in: inAppZone }), "yyyy-MM-dd");
}

/**
 * The UTC instant for a wall-clock date and time in Casablanca.
 * `date` is `yyyy-MM-dd`, `time` is `HH:mm`.
 */
export function localDateTimeToUtc(date: string, time: string): Date {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!dateMatch || !timeMatch) {
    throw new RangeError(`Expected yyyy-MM-dd and HH:mm, received "${date}" and "${time}".`);
  }

  const [year, month, day] = [Number(dateMatch[1]), Number(dateMatch[2]), Number(dateMatch[3])];
  const local = new TZDate(
    year,
    month - 1,
    day,
    Number(timeMatch[1]),
    Number(timeMatch[2]),
    0,
    0,
    APP_TIME_ZONE,
  );
  // 30 February would roll over to 2 March: a date that does not exist is refused.
  if (local.getFullYear() !== year || local.getMonth() !== month - 1 || local.getDate() !== day) {
    throw new RangeError(`"${date}" is not a date.`);
  }
  return new Date(local.getTime());
}

/** Start (inclusive) and end (exclusive) of the Casablanca day containing an instant. */
export function localDayBounds(value: DateInput): { start: Date; end: Date } {
  const start = localDateTimeToUtc(localDateKey(value), "00:00");
  const end = addDays(start, 1, { in: inAppZone });
  return { start, end: new Date(end.getTime()) };
}

/** Monday 00:00 (inclusive) to the next Monday 00:00 (exclusive), in Casablanca. */
export function localWeekBounds(value: DateInput): { start: Date; end: Date } {
  const monday = startOfWeek(value, { weekStartsOn: 1, in: inAppZone });
  return {
    start: new Date(monday.getTime()),
    end: new Date(addDays(monday, 7, { in: inAppZone }).getTime()),
  };
}

/** Minutes since local midnight in Casablanca — the position of an instant on a day ruler. */
export function localMinutesOfDay(value: DateInput): number {
  return Number(formatLocal(value, "H")) * 60 + Number(formatLocal(value, "m"));
}

/** Casablanca's offset from UTC, in minutes, at a given instant. */
export function appUtcOffsetMinutes(value: DateInput): number {
  return -new TZDate(new Date(value).getTime(), APP_TIME_ZONE).getTimezoneOffset();
}
