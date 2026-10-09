// The homework form, read into the arguments of public.create_assignment (DECISIONS.md, D-045).
// The due date is typed as a Casablanca wall-clock date and time and stored as an instant, so
// Ramadan's change of offset is Intl's business rather than ours (src/lib/dates.ts).

import { z } from "zod";
import { formatLocal, localDateTimeToUtc } from "@/lib/dates";
import { isSubjectName } from "@/lib/storage-paths";

export const MAX_ASSIGNMENT_EXERCISES = 30;

export type AssignmentFormValues = {
  title: string;
  instructions: string;
  dueDate: string;
  dueTime: string;
  /** « student:<id> » or « group:<id> », as the recipient picker writes it. */
  recipient: string;
  /** The chosen exercises, in order, as a JSON array of ids. */
  exerciseIds: string;
};

/** Field → the key of its message under `tutor.newAssignment.errors`. */
export type AssignmentFieldErrors = Partial<Record<keyof AssignmentFormValues | "due", string>>;

export type Recipient = { kind: "student" | "group"; id: string };

export function readRecipient(value: string): Recipient | null {
  const match = /^(student|group):(.+)$/.exec(value);
  if (!match || !z.uuid().safeParse(match[2]).success) return null;
  return { kind: match[1] as Recipient["kind"], id: match[2] as string };
}

/** A due date this far from today is a slip of the keyboard, not a plan. */
const DUE_YEARS = { min: 2000, max: 2100 };

/**
 * The instant a Casablanca date and time stand for. "skipped" when the clocks jump over that
 * time (the end of Ramadan skips an hour, which would silently become the next one); null when
 * the input is malformed or names no real day: « 2027-02-31 » would otherwise roll over into
 * March, and a year typed halfway as « 0027 » would become 1927.
 */
export function readDue(date: string, time: string): Date | "skipped" | null {
  let instant: Date;
  try {
    instant = localDateTimeToUtc(date, time);
  } catch {
    return null;
  }
  const year = Number(date.slice(0, 4));
  if (year < DUE_YEARS.min || year > DUE_YEARS.max) return null;
  if (formatLocal(instant, "yyyy-MM-dd") !== date) return null;
  if (formatLocal(instant, "HH:mm") !== time) return "skipped";
  return instant;
}

function readIds(raw: string): string[] | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  const parsed = z.array(z.uuid()).min(1).max(MAX_ASSIGNMENT_EXERCISES).safeParse(value);
  if (!parsed.success || new Set(parsed.data).size !== parsed.data.length) return null;
  return parsed.data;
}

export type AssignmentArgs = {
  title: string;
  instructions: string;
  dueAt: Date;
  recipient: Recipient;
  exerciseIds: string[];
};

type Common = Omit<AssignmentArgs, "exerciseIds">;

/** The fields every homework has: its title, instructions, due date and recipient. */
function readCommon(
  values: Omit<AssignmentFormValues, "exerciseIds">,
  now: Date,
  errors: AssignmentFieldErrors,
): Common | null {
  const title = values.title.trim();
  if (title.length < 1 || title.length > 160) errors.title = "title";

  const instructions = values.instructions.trim();
  if (instructions.length > 2000) errors.instructions = "instructions";

  const due = readDue(values.dueDate, values.dueTime);
  const dueAt = due instanceof Date ? due : null;
  if (due === null) errors.due = "due";
  else if (due === "skipped") errors.due = "dueSkipped";
  else if (due.getTime() <= now.getTime()) errors.due = "dueInPast";

  const recipient = readRecipient(values.recipient);
  if (!recipient) errors.recipient = "recipient";

  return dueAt && recipient ? { title, instructions, dueAt, recipient } : null;
}

/** Reads the whole form, or says which fields are wrong. `now` is passed in, never read here. */
export function parseAssignmentForm(
  values: AssignmentFormValues,
  now: Date,
): { ok: true; value: AssignmentArgs } | { ok: false; errors: AssignmentFieldErrors } {
  const errors: AssignmentFieldErrors = {};
  const common = readCommon(values, now, errors);

  const exerciseIds = readIds(values.exerciseIds);
  if (!exerciseIds) errors.exerciseIds = "exercises";

  if (Object.keys(errors).length > 0 || !common || !exerciseIds) {
    return { ok: false, errors };
  }
  return { ok: true, value: { ...common, exerciseIds } };
}

export type SubjectAssignmentArgs = Common & { subjectPath: string };

/**
 * The form when the work is a PDF the tutor uploaded (D-106): the same fields, and the file's
 * name in place of the exercises.
 */
export function parseSubjectAssignmentForm(
  values: Omit<AssignmentFormValues, "exerciseIds"> & { subjectPath: string },
  now: Date,
):
  | { ok: true; value: SubjectAssignmentArgs }
  | { ok: false; errors: AssignmentFieldErrors & { subject?: string } } {
  const errors: AssignmentFieldErrors & { subject?: string } = {};
  const common = readCommon(values, now, errors);
  const subjectPath = isSubjectName(values.subjectPath) ? values.subjectPath : null;
  if (!subjectPath) errors.subject = "subject";
  if (Object.keys(errors).length > 0 || !common || !subjectPath) return { ok: false, errors };
  return { ok: true, value: { ...common, subjectPath } };
}

/** For editing: the same fields without the recipient and exercises, which stay as they are. */
export function parseAssignmentDetails(
  values: Pick<AssignmentFormValues, "title" | "instructions" | "dueDate" | "dueTime">,
):
  | { ok: true; value: Omit<AssignmentArgs, "recipient" | "exerciseIds"> }
  | { ok: false; errors: AssignmentFieldErrors } {
  const errors: AssignmentFieldErrors = {};
  const title = values.title.trim();
  if (title.length < 1 || title.length > 160) errors.title = "title";
  const instructions = values.instructions.trim();
  if (instructions.length > 2000) errors.instructions = "instructions";
  // A due date already passed is allowed here: the tutor may set right a date after the fact.
  const due = readDue(values.dueDate, values.dueTime);
  const dueAt = due instanceof Date ? due : null;
  if (due === null) errors.due = "due";
  else if (due === "skipped") errors.due = "dueSkipped";
  if (Object.keys(errors).length > 0 || !dueAt) return { ok: false, errors };
  return { ok: true, value: { title, instructions, dueAt } };
}
