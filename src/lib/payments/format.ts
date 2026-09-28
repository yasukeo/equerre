import { formatLocal, withFirst } from "@/lib/dates";

export { withFirst };

// How money and hours read in French (DECISIONS.md, D-087): « 1 500 MAD », « 1 500,50 MAD »,
// « 2,5 h », « −3 h ». Times of day never come in here; dates are Casablanca calendar days.

const whole = new Intl.NumberFormat("fr", { maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const hours = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

/** An amount in dirhams: no centimes when there are none. */
export function formatMad(amount: number): string {
  const value = Math.round(amount * 100) / 100;
  return `${(Number.isInteger(value) ? whole : cents).format(value)} MAD`;
}

/** Hours, signed when asked: « +10 h », « −1,5 h », « 0 h ». */
export function formatHours(value: number, { signed = false } = {}): string {
  const rounded = Math.round(value * 100) / 100;
  const text = hours.format(Math.abs(rounded));
  const sign = rounded < 0 ? "−" : signed && rounded > 0 ? "+" : "";
  return `${sign}${text} h`;
}

function dayNumber(key: string): number {
  const [year = 0, month = 1, day = 1] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

/** Whole days from one calendar day (`yyyy-MM-dd`) to another. */
export function daysBetween(from: string, to: string): number {
  return Math.round(dayNumber(to) - dayNumber(from));
}

/** A calendar day as an instant at noon UTC: any formatter shows the same day in Casablanca. */
export function dayInstant(key: string): Date {
  return new Date(`${key}T12:00:00Z`);
}

/** The day after another, `yyyy-MM-dd`. */
export function nextDay(key: string): string {
  return new Date(dayInstant(key).getTime() + 86_400_000).toISOString().slice(0, 10);
}

/**
 * The last day a subscription starting on `from` covers, as the database counts it
 * (public.record_payment): `months` later, the day before. A month too short for the day
 * ends on its last day, as Postgres adds months: 31 January + 1 month is 28 February.
 */
export function coverageEnd(from: string, months: number): string {
  const [year = 2000, month = 1, day = 1] = from.split("-").map(Number);
  const target = new Date(Date.UTC(year, month - 1 + months, 1));
  const lastDay = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();
  target.setUTCDate(Math.min(day, lastDay));
  target.setUTCDate(target.getUTCDate() - 1);
  return target.toISOString().slice(0, 10);
}

/** A calendar day (`yyyy-MM-dd`) in words: « 1er octobre 2026 ». */
export function formatDay(key: string, pattern = "d MMMM yyyy"): string {
  return withFirst(formatLocal(dayInstant(key), pattern));
}

/** An instant's Casablanca day in words: « 1er octobre 2026 ». */
export function formatDate(value: Date | string, pattern = "d MMMM yyyy"): string {
  return withFirst(formatLocal(value, pattern));
}

const UNITS = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
];
const TENS = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];

function belowHundred(n: number): string {
  if (n < 17) return UNITS[n]!;
  if (n < 20) return `dix-${UNITS[n - 10]}`;
  const ten = Math.floor(n / 10);
  const unit = n % 10;
  if (ten <= 6) {
    if (unit === 0) return TENS[ten]!;
    return unit === 1 ? `${TENS[ten]} et un` : `${TENS[ten]}-${UNITS[unit]}`;
  }
  if (ten === 7) return unit === 1 ? "soixante et onze" : `soixante-${belowHundred(10 + unit)}`;
  if (ten === 8) return unit === 0 ? "quatre-vingts" : `quatre-vingt-${UNITS[unit]}`;
  return `quatre-vingt-${belowHundred(10 + unit)}`;
}

function belowThousand(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  const tail = rest === 0 ? "" : ` ${belowHundred(rest)}`;
  if (hundreds === 0) return belowHundred(rest);
  if (hundreds === 1) return `cent${tail}`;
  return `${UNITS[hundreds]} cent${rest === 0 ? "s" : tail}`;
}

/** A whole number in French words, as a receipt writes it: « mille cinq cents ». */
export function numberInWords(value: number): string {
  const n = Math.floor(Math.abs(value));
  if (n === 0) return "zéro";
  const millions = Math.floor(n / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (millions > 0) {
    parts.push(millions === 1 ? "un million" : `${belowThousand(millions)} millions`);
  }
  if (thousands > 0) {
    // « Cent » and « vingt » lose their s before « mille »: deux cent mille, quatre-vingt mille.
    parts.push(
      thousands === 1
        ? "mille"
        : `${belowThousand(thousands).replace(/(cent|vingt)s$/, "$1")} mille`,
    );
  }
  if (rest > 0) parts.push(belowThousand(rest));
  return parts.join(" ");
}

/** An amount in dirhams and centimes, in words: « mille cinq cents dirhams et cinquante centimes ». */
export function amountInWords(amount: number): string {
  const cents = Math.round(amount * 100);
  const dirhams = Math.floor(cents / 100);
  const centimes = cents % 100;
  // « Un million de dirhams », but « deux millions trois cents dirhams ».
  const unit =
    dirhams >= 1_000_000 && dirhams % 1_000_000 === 0
      ? "de dirhams"
      : dirhams === 1
        ? "dirham"
        : "dirhams";
  const words = `${numberInWords(dirhams)} ${unit}`;
  return centimes === 0
    ? words
    : `${words} et ${numberInWords(centimes)} ${centimes === 1 ? "centime" : "centimes"}`;
}
