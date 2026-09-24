// The exercise editor's form, read into the arguments of public.save_exercise. Numbers stay
// decimal text (src/lib/decimal.ts); a relative tolerance is typed in percent and stored as a
// fraction, as the grading function multiplies by it.

import { z } from "zod";
import { parseDecimal } from "@/lib/decimal";
import { exerciseDocumentSchema, type ExerciseDocument } from "@/lib/lesson/document";
import type { Json } from "@/types/database";
import {
  ANSWER_TYPES,
  CHOICE_MODES,
  choiceSchema,
  DIFFICULTIES,
  MAX_CHOICES,
  MAX_TAGS,
  MIN_CHOICES,
  parseTags,
  readTolerance,
  TOLERANCE_KINDS,
  type AnswerType,
  type Choice,
  type ChoiceMode,
  type ToleranceKind,
} from "./exercise";

export type ExerciseFormValues = {
  id: string;
  chapterId: string;
  title: string;
  difficulty: string;
  tags: string;
  answerType: string;
  statement: string;
  solution: string;
  correctNumeric: string;
  tolerance: string;
  toleranceKind: string;
  choiceMode: string;
  choices: string;
  correctChoiceIds: string;
};

/** Field → the key of its message under `tutor.exerciseEditor.errors`. */
export type ExerciseFieldErrors = Partial<Record<keyof ExerciseFormValues, string>>;

export type SaveExerciseArgs = {
  p_id: string;
  p_chapter_id: string;
  p_title: string;
  p_statement: Json;
  p_difficulty: number;
  p_tags: string[];
  p_answer_type: AnswerType;
  p_choices: Json;
  p_choice_mode: ChoiceMode;
  p_solution: Json;
  p_correct_numeric: string;
  p_tolerance: string;
  p_tolerance_kind: ToleranceKind;
  p_correct_choice_ids: string[];
};

function json(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function document(raw: string): ExerciseDocument | null {
  const parsed = exerciseDocumentSchema.safeParse(json(raw));
  return parsed.success ? parsed.data : null;
}

function oneOf<T extends string>(values: readonly T[], raw: string): T | null {
  return (values as readonly string[]).includes(raw) ? (raw as T) : null;
}

export function parseExerciseForm(
  values: ExerciseFormValues,
): { ok: true; args: SaveExerciseArgs } | { ok: false; errors: ExerciseFieldErrors } {
  const errors: ExerciseFieldErrors = {};

  const id = z.uuid().safeParse(values.id);
  const chapterId = z.uuid().safeParse(values.chapterId);
  if (!id.success) errors.id = "unknown";
  if (!chapterId.success) errors.chapterId = "chapter";

  const title = values.title.trim();
  if (title.length < 1 || title.length > 160) errors.title = "title";

  const difficulty = Number(values.difficulty);
  if (!(DIFFICULTIES as readonly number[]).includes(difficulty)) errors.difficulty = "difficulty";

  const tags = parseTags(values.tags);
  if (tags.length > MAX_TAGS || tags.some((tag) => tag.length > 40)) errors.tags = "tags";

  const answerType = oneOf(ANSWER_TYPES, values.answerType);
  if (!answerType) errors.answerType = "answerType";

  const statement = document(values.statement);
  const solution = document(values.solution);
  if (!statement) errors.statement = "document";
  if (!solution) errors.solution = "document";

  // Every argument gets a value, whatever the type: the function ignores those that do not
  // apply to it, and PostgREST's generated signature has no room for null.
  let correctNumeric = "";
  let tolerance = "";
  let toleranceKind: ToleranceKind = "absolue";
  let choices: Choice[] = [];
  let choiceMode: ChoiceMode = "unique";
  let correctChoiceIds: string[] = [];

  if (answerType === "numeric") {
    toleranceKind = oneOf(TOLERANCE_KINDS, values.toleranceKind) ?? "absolue";
    if (values.correctNumeric.trim() !== "") {
      const parsed = parseDecimal(values.correctNumeric);
      if (parsed === null) errors.correctNumeric = "number";
      else correctNumeric = parsed;
    }
    const read = readTolerance(values.tolerance, toleranceKind);
    if ("error" in read) errors.tolerance = read.error;
    else tolerance = read.value;
  }

  if (answerType === "mcq") {
    choiceMode = oneOf(CHOICE_MODES, values.choiceMode) ?? "unique";
    const parsedChoices = z
      .array(choiceSchema)
      .min(MIN_CHOICES)
      .max(MAX_CHOICES)
      .safeParse(json(values.choices));
    if (!parsedChoices.success) {
      errors.choices = "choices";
    } else if (
      new Set(parsedChoices.data.map((choice) => choice.id)).size !== parsedChoices.data.length
    ) {
      errors.choices = "choices";
    } else {
      choices = parsedChoices.data;
    }

    const parsedCorrect = z.array(z.string()).safeParse(json(values.correctChoiceIds));
    const ids = new Set(choices.map((choice) => choice.id));
    correctChoiceIds = [...new Set(parsedCorrect.success ? parsedCorrect.data : [])].filter(
      (choiceId) => ids.has(choiceId),
    );
    if (choiceMode === "unique" && correctChoiceIds.length > 1) {
      errors.correctChoiceIds = "oneRight";
    }
  }

  if (Object.keys(errors).length > 0 || !id.success || !chapterId.success || !answerType) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    args: {
      p_id: id.data,
      p_chapter_id: chapterId.data,
      p_title: title,
      p_statement: statement as Json,
      p_difficulty: difficulty,
      p_tags: tags,
      p_answer_type: answerType,
      p_choices: choices as Json,
      p_choice_mode: choiceMode,
      p_solution: solution as Json,
      p_correct_numeric: correctNumeric,
      p_tolerance: tolerance,
      p_tolerance_kind: toleranceKind,
      p_correct_choice_ids: correctChoiceIds,
    },
  };
}
