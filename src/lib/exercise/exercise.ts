// An exercise of the bank, as the tutor writes it (DECISIONS.md, D-044): a statement, a
// worked solution, and one of three ways for the student to answer — a photographed page the
// tutor corrects, a number graded against a tolerance, or a multiple-choice question.
// Everything here is pure, so the editor, the server action and the tests share it.

import type { JSONContent } from "@tiptap/core";
import { z } from "zod";
import {
  absDecimal,
  addDecimal,
  movePoint,
  multiplyDecimal,
  parseDecimal,
  subtractDecimal,
} from "@/lib/decimal";
import type { Database } from "@/types/database";

export type AnswerType = Database["public"]["Enums"]["answer_type"];
export type ChoiceMode = Database["public"]["Enums"]["choice_mode"];
export type ToleranceKind = Database["public"]["Enums"]["tolerance_kind"];

export const ANSWER_TYPES: AnswerType[] = ["upload", "numeric", "mcq"];
export const CHOICE_MODES: ChoiceMode[] = ["unique", "multiple"];
export const TOLERANCE_KINDS: ToleranceKind[] = ["absolue", "relative"];
export const DIFFICULTIES = [1, 2, 3, 4, 5] as const;

export const MIN_CHOICES = 2;
export const MAX_CHOICES = 8;
export const MAX_TAGS = 10;

/** A choice's id outlives edits to its wording: a student's answer names choices by id. */
export const CHOICE_ID = /^[a-z0-9]{1,12}$/;

export const choiceSchema = z.object({
  id: z.string().regex(CHOICE_ID),
  label: z.string().trim().min(1).max(300),
});
export type Choice = z.infer<typeof choiceSchema>;

/** The choices column as stored, trusted only as far as it parses. */
export function readChoices(value: unknown): Choice[] {
  const parsed = z.array(choiceSchema).safeParse(value);
  return parsed.success ? parsed.data : [];
}

/**
 * An id for a new choice. Never a letter freed by a deleted choice: a student's past answer
 * names choices by id, and would then point at the new choice's words.
 */
export function newChoiceId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

/** « limites, TVI, limites » → ["limites", "TVI"]. */
export function parseTags(input: string): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const raw of input.split(",")) {
    const tag = raw.trim().replace(/\s+/g, " ");
    const key = tag.toLocaleLowerCase("fr");
    if (tag && !seen.has(key)) {
      seen.add(key);
      tags.push(tag);
    }
  }
  return tags;
}

/** True when a document holds nothing a student could read: no words, formula or image. */
export function isDocumentEmpty(doc: JSONContent | null | undefined): boolean {
  const visit = (node: JSONContent): boolean => {
    if (node.type === "text") return !node.text?.trim();
    if (node.type === "inlineMath" || node.type === "blockMath" || node.type === "image") {
      return false;
    }
    return (node.content ?? []).every(visit);
  };
  return !doc || visit(doc);
}

export type Readiness = { statement: boolean; answer: boolean };

/**
 * What an exercise still lacks before it can be given. The grading function refuses a numeric
 * or multiple-choice exercise with no expected answer (`exercise_not_ready`), and an empty
 * statement would give the student nothing to do.
 */
export function readiness(exercise: {
  statementEmpty: boolean;
  answerType: AnswerType;
  correctNumeric: string | null;
  correctChoiceIds: readonly string[] | null;
}): Readiness {
  const answer =
    exercise.answerType === "upload" ||
    (exercise.answerType === "numeric" && exercise.correctNumeric !== null) ||
    (exercise.answerType === "mcq" && (exercise.correctChoiceIds?.length ?? 0) > 0);
  return { statement: !exercise.statementEmpty, answer };
}

export function isReady(state: Readiness): boolean {
  return state.statement && state.answer;
}

/** Tolerances above this share of the answer are more likely a typo than a choice. */
const MAX_RELATIVE_PERCENT = 100;

export type ToleranceError = "tolerance" | "toleranceTooLarge" | "tolerancePercent";

/**
 * The tolerance as the tutor types it — « 0,05 », or « 1 » or « 1 % » in percent — as the
 * decimal the grading function reads: an absolute margin, or the fraction of the answer.
 */
export function readTolerance(
  input: string,
  kind: ToleranceKind,
): { value: string } | { error: ToleranceError } {
  const trimmed = input.trim();
  const percent = trimmed.endsWith("%");
  if (percent && kind !== "relative") return { error: "tolerancePercent" };
  const number = percent ? trimmed.slice(0, -1).trim() : trimmed;
  const typed = number === "" ? "0" : parseDecimal(number);
  if (typed === null || typed.startsWith("-")) return { error: "tolerance" };
  if (kind === "absolue") return { value: typed };
  if (Number(typed) > MAX_RELATIVE_PERCENT) return { error: "toleranceTooLarge" };
  return { value: movePoint(typed, -2) };
}

export type AcceptedRange =
  { kind: "exact"; value: string } | { kind: "range"; low: string; high: string };

/**
 * What submit_exercise_answer will accept, computed as it computes it — exactly, in decimals —
 * so the bounds the editor shows are never refused by the grading.
 */
export function acceptedRange(
  correctInput: string,
  toleranceInput: string,
  kind: ToleranceKind,
): AcceptedRange | null {
  const value = parseDecimal(correctInput);
  const tolerance = readTolerance(toleranceInput, kind);
  if (value === null || "error" in tolerance) return null;
  const margin =
    kind === "relative" ? multiplyDecimal(absDecimal(value), tolerance.value) : tolerance.value;
  return margin === "0"
    ? { kind: "exact", value }
    : { kind: "range", low: subtractDecimal(value, margin), high: addDecimal(value, margin) };
}
