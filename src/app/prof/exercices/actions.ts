"use server";

import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { ANSWER_TYPES } from "@/lib/exercise/exercise";
import { parseExerciseForm, type ExerciseFormValues } from "@/lib/exercise/form";
import { textField, type FormState } from "@/lib/form-state";
import type { LessonDocument } from "@/lib/lesson/document";
import { createClient } from "@/lib/supabase/server";

// ─────────────────────────────────────────────────────────────── create

const newExerciseSchema = z.object({
  chapterId: z.uuid(),
  title: z.string().trim().min(1).max(160),
  answerType: z.enum(ANSWER_TYPES as ["upload", "numeric", "mcq"]),
});

// The editor needs a block to put the cursor in.
const FIRST_PARAGRAPH: LessonDocument = { type: "doc", content: [{ type: "paragraph" }] };

export async function createExercise(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.newExercise");

  const values = {
    chapterId: textField(formData, "chapterId"),
    title: textField(formData, "title"),
    answerType: textField(formData, "answerType"),
  };
  const parsed = newExerciseSchema.safeParse(values);
  if (!parsed.success) {
    const fields = new Set(parsed.error.issues.map((issue) => String(issue.path[0])));
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: {
        chapterId: fields.has("chapterId") ? t("errors.chapter") : undefined,
        title: fields.has("title") ? t("errors.title") : undefined,
        answerType: fields.has("answerType") ? t("errors.answerType") : undefined,
      },
      values,
    };
  }

  const mcq = parsed.data.answerType === "mcq";
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exercises")
    .insert({
      chapter_id: parsed.data.chapterId,
      title: parsed.data.title,
      statement: FIRST_PARAGRAPH,
      difficulty: 2,
      answer_type: parsed.data.answerType,
      // The table ties choices and their display to multiple choice; they are written in the
      // editor, so a new question starts with none.
      choices: mcq ? [] : null,
      choice_mode: mcq ? "unique" : null,
    })
    .select("id")
    .single();
  if (error || !data) {
    return { status: "error", message: t("errors.unknown"), values };
  }

  redirect(`/prof/exercices/${data.id}`);
}

// ─────────────────────────────────────────────────────────────── save

const FORM_FIELDS: (keyof ExerciseFormValues)[] = [
  "id",
  "chapterId",
  "title",
  "difficulty",
  "tags",
  "answerType",
  "statement",
  "solution",
  "correctNumeric",
  "tolerance",
  "toleranceKind",
  "choiceMode",
  "choices",
  "correctChoiceIds",
];

export async function saveExercise(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.exerciseEditor");

  const values = Object.fromEntries(
    FORM_FIELDS.map((field) => [field, textField(formData, field)]),
  ) as ExerciseFormValues;
  const parsed = parseExerciseForm(values);
  if (!parsed.ok) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const [field, key] of Object.entries(parsed.errors)) {
      fieldErrors[field] = t(`errors.${key}` as Parameters<typeof t>[0]);
    }
    return { status: "error", message: t("errors.fields"), fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("save_exercise", parsed.args);
  if (error) {
    const known = [
      "answer_type_locked",
      "exercise_assigned_needs_answer",
      "choices_invalid",
      "number_invalid",
      "exercise_not_found",
    ];
    const reason = known.find((code) => error.message.includes(code));
    const message =
      reason === "answer_type_locked"
        ? t("errors.answerTypeLocked")
        : reason === "exercise_assigned_needs_answer"
          ? t("errors.assignedNeedsAnswer")
          : reason === "exercise_not_found"
            ? t("errors.notFound")
            : reason
              ? t("errors.fields")
              : t("errors.unknown");
    return { status: "error", message };
  }

  return { status: "success", message: t("saved") };
}

// ─────────────────────────────────────────────────────────────── delete

export async function deleteExercise(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.exerciseEditor");

  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.notFound") };

  const supabase = await createClient();
  const { data, error } = await supabase.from("exercises").delete().eq("id", id.data).select("id");
  if (error?.code === "23503") {
    // Given as homework: the students' answers keep it (assignment_items, on delete restrict).
    return { status: "error", message: t("errors.deleteAssigned") };
  }
  if (error || !data?.length) {
    return { status: "error", message: t("errors.unknown") };
  }

  redirect("/prof/exercices");
}
