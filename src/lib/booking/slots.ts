import { localDateKey, localDateKeyInDays, localDateTimeToUtc } from "@/lib/dates";

// The slots a student may request, computed from the tutor's weekly hours, her exceptions and
// the times already taken (DECISIONS.md, D-073). Hours are Casablanca wall-clock times and are
// converted date by date, so a Tuesday 18:00 window gives 18:00 on both sides of Ramadan's
// change of offset. public.request_session applies the same rules again in Postgres: this
// only decides what the page offers.

export type WeeklyWindow = {
  /** ISO weekday: 1 = lundi … 7 = dimanche. */
  weekday: number;
  /** `HH:mm`, Casablanca wall-clock time. */
  start: string;
  end: string;
  /** Null: every individual session type. */
  sessionTypeId: string | null;
};

export type AvailabilityException = {
  /** `yyyy-MM-dd`, inclusive. */
  startsOn: string;
  endsOn: string;
  isBlocked: boolean;
  /** Null for a whole day. */
  start: string | null;
  end: string | null;
  sessionTypeId: string | null;
};

export type TimeRange = { startsAt: Date; endsAt: Date };

export type BookingRules = {
  cancellationWindowHours: number;
  minNoticeHours: number;
  horizonDays: number;
};

export type DaySlots = {
  date: string;
  /**
   * Something could be booked that day, but for sessions already there: false when it has no
   * hours, when blocked hours or the notice leave none, or past the horizon. A day open with
   * no slot is full.
   */
  open: boolean;
  slots: TimeRange[];
};

/** Requests start on the half hour of a window: 18:00, 18:30, 19:00… */
export const SLOT_STEP_MINUTES = 30;

const HOUR = 3_600_000;
const MINUTE = 60_000;

/** `HH:mm` → minutes since midnight. */
export function minutesOf(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** Minutes since midnight → `HH:mm`. */
export function timeOf(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** The ISO weekday (1 = lundi … 7 = dimanche) of a `yyyy-MM-dd` calendar date. */
export function isoWeekday(date: string): number {
  const [year = 0, month = 1, day = 1] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return weekday === 0 ? 7 : weekday;
}

function overlaps(a: TimeRange, b: TimeRange): boolean {
  return a.startsAt < b.endsAt && b.startsAt < a.endsAt;
}

function covers(exception: AvailabilityException, date: string): boolean {
  return exception.startsOn <= date && date <= exception.endsOn;
}

function fitsType(sessionTypeId: string | null, wanted: string): boolean {
  return sessionTypeId === null || sessionTypeId === wanted;
}

/**
 * Every date from today (Casablanca) to the end of the booking horizon, each with the slots
 * a student may request for a session of `durationMin` minutes. A date with no slot is kept,
 * so the page can say the day is taken or closed rather than skip it.
 */
export function openSlots({
  sessionTypeId,
  durationMin,
  windows,
  exceptions,
  busy,
  rules,
  now,
}: {
  sessionTypeId: string;
  durationMin: number;
  windows: WeeklyWindow[];
  exceptions: AvailabilityException[];
  busy: TimeRange[];
  rules: BookingRules;
  now: Date;
}): DaySlots[] {
  const earliest = now.getTime() + rules.minNoticeHours * HOUR;
  const latest = now.getTime() + rules.horizonDays * 24 * HOUR;
  const days: DaySlots[] = [];

  for (let offset = 0; offset <= rules.horizonDays; offset++) {
    const date = offset === 0 ? localDateKey(now) : localDateKeyInDays(now, offset);
    const onDate = exceptions.filter((exception) => covers(exception, date));

    const blocks = onDate.filter((exception) => exception.isBlocked);
    if (blocks.some((block) => block.start === null)) {
      days.push({ date, open: false, slots: [] });
      continue;
    }
    const blockedMinutes = blocks.map((block) => ({
      start: minutesOf(block.start ?? "00:00"),
      end: minutesOf(block.end ?? "23:59"),
    }));

    const weekday = isoWeekday(date);
    const hours = [
      ...windows.filter(
        (window) => window.weekday === weekday && fitsType(window.sessionTypeId, sessionTypeId),
      ),
      ...onDate.filter(
        (exception) =>
          !exception.isBlocked &&
          exception.start !== null &&
          exception.end !== null &&
          fitsType(exception.sessionTypeId, sessionTypeId),
      ),
    ].map((window) => ({ start: minutesOf(window.start ?? ""), end: minutesOf(window.end ?? "") }));

    const starts = new Set<number>();
    for (const window of hours) {
      for (
        let start = window.start;
        start + durationMin <= window.end;
        start += SLOT_STEP_MINUTES
      ) {
        const end = start + durationMin;
        if (blockedMinutes.some((block) => start < block.end && block.start < end)) continue;
        starts.add(start);
      }
    }

    const bookable = [...starts]
      .sort((a, b) => a - b)
      .map((start) => {
        const startsAt = localDateTimeToUtc(date, timeOf(start));
        return { startsAt, endsAt: new Date(startsAt.getTime() + durationMin * MINUTE) };
      })
      .filter((slot) => slot.startsAt.getTime() >= earliest && slot.startsAt.getTime() <= latest);
    const slots = bookable.filter((slot) => !busy.some((taken) => overlaps(slot, taken)));

    days.push({ date, open: bookable.length > 0, slots });
  }

  return days;
}
