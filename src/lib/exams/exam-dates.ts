// The programmes that end in an exam with maths (D-104): the bac's national, the 3e année
// régional. One list for the tutor's form, its action, and the students' countdown.

export const EXAM_PROGRAMMES = {
  "2BAC-SM": "national",
  "2BAC-SEXP": "national",
  "2BAC-ECO": "national",
  "2BAC-LSH": "national",
  "3AC": "regional",
} as const satisfies Record<string, "national" | "regional">;

export type DatedProgramme = keyof typeof EXAM_PROGRAMMES;

export const DATED_PROGRAMMES = Object.keys(EXAM_PROGRAMMES) as DatedProgramme[];

/** How far ahead a date may be set: a later one is a typo, not a plan. */
export const MAX_YEARS_AHEAD = 2;
