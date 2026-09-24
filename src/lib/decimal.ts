// Numbers as the tutor and her students type them, kept as decimal text from the keyboard to
// Postgres. A JavaScript number would read « 4,8 » as 4 (parseFloat stops at the comma) and
// turn 0,1 + 0,2 into 0,30000000000000004; `numeric` compares exactly, and PostgREST only
// hands it an exact value when that value travels as a string (DECISIONS.md, D-044).

/** Longest decimal accepted, digits on both sides of the point together. */
const MAX_DIGITS = 40;
/** Largest power of ten accepted in « 3e8 » or « 3×10^8 ». */
const MAX_EXPONENT = 30;

type Decimal = { negative: boolean; int: string; frac: string };

function canonical({ negative, int, frac }: Decimal): string {
  const whole = int.replace(/^0+/, "") || "0";
  const fraction = frac.replace(/0+$/, "");
  const zero = whole === "0" && fraction === "";
  return `${negative && !zero ? "-" : ""}${whole}${fraction ? `.${fraction}` : ""}`;
}

function shift(value: Decimal, places: number): Decimal {
  const digits = value.int + value.frac;
  const point = value.int.length + places;
  if (point <= 0) return { ...value, int: "0", frac: "0".repeat(-point) + digits };
  if (point >= digits.length) {
    return { ...value, int: digits + "0".repeat(point - digits.length), frac: "" };
  }
  return { ...value, int: digits.slice(0, point), frac: digits.slice(point) };
}

// The caret is required after « ×10 »: without it « 7×100 » read as 7 × 10⁰, a product
// taken for a power of ten, where refusing is the only safe answer.
const NUMBER = /^([+-])?(\d*)(?:[.,](\d*))?(?:(?:e|[x×*·]10\^)([+-]?\d{1,3}))?$/i;

/**
 * « 4,8 », « -1 500,25 », « .5 », « 3e8 », « 3×10^8 » → "4.8", "-1500.25", "0.5",
 * "300000000", "300000000". Anything else, including « 1,234.5 », gives null.
 */
export function parseDecimal(input: string): string | null {
  const compact = input
    // Spaces group thousands in French: « 1 500 » is fifteen hundred.
    .replace(/[\s  ]/g, "")
    .replace(/−/g, "-");
  const match = NUMBER.exec(compact);
  if (!match) return null;
  const [, sign, int = "", frac = "", exponent] = match;
  if (int === "" && frac === "") return null;

  const power = exponent === undefined ? 0 : Number(exponent);
  if (Math.abs(power) > MAX_EXPONENT) return null;

  const result = canonical(shift({ negative: sign === "-", int, frac }, power));
  return result.replace(/[-.]/g, "").length > MAX_DIGITS ? null : result;
}

/** Moves the point of a decimal written by parseDecimal: movePoint("1.5", -2) is "0.015". */
export function movePoint(decimal: string, places: number): string {
  const negative = decimal.startsWith("-");
  const [int = "", frac = ""] = (negative ? decimal.slice(1) : decimal).split(".");
  return canonical(shift({ negative, int, frac }, places));
}

// Exact arithmetic on decimals written by parseDecimal, for showing what a tolerance accepts:
// the grading function compares in `numeric`, and a bound shown in doubles could name a value
// it refuses.

function scale(decimal: string): number {
  return decimal.split(".")[1]?.length ?? 0;
}

function toScaled(decimal: string, places: number): bigint {
  return BigInt(movePoint(decimal, places).replace(".", ""));
}

function fromScaled(value: bigint, places: number): string {
  return movePoint(value.toString(), -places);
}

export function addDecimal(a: string, b: string): string {
  const places = Math.max(scale(a), scale(b));
  return fromScaled(toScaled(a, places) + toScaled(b, places), places);
}

export function subtractDecimal(a: string, b: string): string {
  const places = Math.max(scale(a), scale(b));
  return fromScaled(toScaled(a, places) - toScaled(b, places), places);
}

export function multiplyDecimal(a: string, b: string): string {
  return fromScaled(toScaled(a, scale(a)) * toScaled(b, scale(b)), scale(a) + scale(b));
}

export function absDecimal(decimal: string): string {
  return decimal.startsWith("-") ? decimal.slice(1) : decimal;
}

/** "-4.8" → « -4,8 »: how a decimal reads, and can be typed back, in French. */
export function formatDecimal(decimal: string): string {
  return decimal.replace(".", ",");
}
