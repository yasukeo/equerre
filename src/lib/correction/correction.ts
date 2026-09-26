// The tutor's correction of a copy (DECISIONS.md, D-047): a grade out of 20, and remarks
// pinned to the pages. Pure, so the correction view, the student's page, the server action
// and the tests read them the same way.

import { z } from "zod";
import { parseDecimal, subtractDecimal } from "@/lib/decimal";

export const MAX_REMARK_LENGTH = 2000;
export const MAX_FEEDBACK_LENGTH = 4000;

export type GradeError = "gradeRequired" | "grade" | "gradeRange" | "gradePrecision";

/**
 * The grade as the tutor types it — « 15,5 », « 15.5 », « 15,5/20 » — as the decimal
 * `submissions.grade` stores. Refused rather than rounded: numeric(4,2) would quietly turn
 * 15,555 into 15,56.
 */
export function readGrade(input: string): { value: string } | { error: GradeError } {
  const typed = input
    .trim()
    .replace(/\s*\/\s*20$/, "")
    .trim();
  if (typed === "") return { error: "gradeRequired" };
  const value = parseDecimal(typed);
  if (value === null) return { error: "grade" };
  if (value.startsWith("-") || subtractDecimal("20", value).startsWith("-")) {
    return { error: "gradeRange" };
  }
  if ((value.split(".")[1] ?? "").length > 2) return { error: "gradePrecision" };
  return { value };
}

/**
 * Where a remark sits: on one page, named by its storage path so it stays with that page
 * whatever the order, and at a point given as a share of the page's width and height — or
 * nowhere in particular, when it was added from the keyboard.
 */
export type Anchor = { path: string; x: number | null; y: number | null };

const share = z.number().min(0).max(1);
const anchorSchema = z.union([
  z.object({ path: z.string().min(1), x: share, y: share }),
  // Strict, so a point off the page is refused rather than read as no point at all.
  z.strictObject({ path: z.string().min(1) }),
]);

/** The anchor column as stored, trusted only as far as it parses. */
export function readAnchor(value: unknown): Anchor | null {
  const parsed = anchorSchema.safeParse(value);
  if (!parsed.success) return null;
  return "x" in parsed.data
    ? { path: parsed.data.path, x: parsed.data.x, y: parsed.data.y }
    : { path: parsed.data.path, x: null, y: null };
}

export type Remark = { id: string; body: string; anchor: unknown; createdAt: string };
export type NumberedRemark = {
  id: string;
  body: string;
  number: number;
  anchor: Anchor | null;
};

/**
 * The remarks page by page, in the order the pages were handed in, and numbered as they are
 * read: down each page, then those without a point. Remarks on a page no longer in the copy
 * come last, so none is ever lost.
 */
export function arrangeRemarks(
  paths: readonly string[],
  remarks: readonly Remark[],
): { pages: { path: string; remarks: NumberedRemark[] }[]; elsewhere: NumberedRemark[] } {
  const read = remarks.map((remark) => ({ ...remark, anchor: readAnchor(remark.anchor) }));
  const byReadingOrder = (a: (typeof read)[number], b: (typeof read)[number]) =>
    (a.anchor?.y ?? 2) - (b.anchor?.y ?? 2) ||
    (a.anchor?.x ?? 2) - (b.anchor?.x ?? 2) ||
    a.createdAt.localeCompare(b.createdAt);

  let number = 0;
  const numbered = (remark: (typeof read)[number]): NumberedRemark => ({
    id: remark.id,
    body: remark.body,
    anchor: remark.anchor,
    number: ++number,
  });

  const pages = paths.map((path) => ({
    path,
    remarks: read
      .filter((remark) => remark.anchor?.path === path)
      .sort(byReadingOrder)
      .map(numbered),
  }));
  const elsewhere = read
    .filter((remark) => !remark.anchor || !paths.includes(remark.anchor.path))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(numbered);
  return { pages, elsewhere };
}
