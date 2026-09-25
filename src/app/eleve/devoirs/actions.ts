"use server";

import { refresh } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { parseDecimal } from "@/lib/decimal";
import { CHOICE_ID, MAX_CHOICES } from "@/lib/exercise/exercise";
import { textField, type FormState } from "@/lib/form-state";
import { MAX_PAGES } from "@/lib/homework/pages";
import { draftReference } from "@/lib/homework/queries";
import { isSubmissionPageName } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

// A student hands work in, or opens a solution. The grading and every rule about what may be
// handed in live in the database (submit_exercise_answer, the reveal policy); these actions
// only shape the request and say in French what the database refused (DECISIONS.md, D-046).

/** Codes submit_exercise_answer raises, and the key of the message each one means. */
const REFUSALS: Record<string, string> = {
  account_not_active: "paused",
  not_assigned: "gone",
  unknown_exercise: "gone",
  solution_already_revealed: "revealed",
  exercise_done_elsewhere: "doneElsewhere",
  exercise_not_ready: "notReady",
  answer_must_be_text: "number",
  answer_invalid: "number",
  answer_required: "answerRequired",
  pages_required: "pagesRequired",
  too_many_pages: "tooManyPages",
  page_not_uploaded: "pageLost",
  file_path_invalid: "pageLost",
  file_path_not_yours: "pageLost",
  submission_already_corrected: "alreadyCorrected",
};

function readJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export async function submitAnswer(_previous: FormState, formData: FormData): Promise<FormState> {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.homework.errors");

  const assignmentId = z.uuid().safeParse(textField(formData, "assignmentId"));
  const exerciseId = z.uuid().safeParse(textField(formData, "exerciseId"));
  if (!assignmentId.success || !exerciseId.success) return { status: "error", message: t("gone") };

  let answer: Json;
  let filePaths: string[] = [];
  const kind = textField(formData, "kind");
  if (kind === "numeric") {
    const raw = textField(formData, "value").trim();
    if (raw === "") return { status: "error", message: t("answerRequired") };
    const value = parseDecimal(raw);
    if (value === null) return { status: "error", message: t("number") };
    // The exact decimal travels as text: PostgREST would read a JSON number as a double.
    answer = { type: "numeric", raw: raw.slice(0, 60), value };
  } else if (kind === "mcq") {
    const choiceIds = z
      .array(z.string().regex(CHOICE_ID))
      .min(1)
      .max(MAX_CHOICES)
      .safeParse(readJson(textField(formData, "choiceIds")));
    if (!choiceIds.success) return { status: "error", message: t("answerRequired") };
    answer = { type: "mcq", choiceIds: choiceIds.data };
  } else if (kind === "upload") {
    const pages = z.array(z.string()).safeParse(readJson(textField(formData, "pages")));
    if (!pages.success || pages.data.length === 0) {
      return { status: "error", message: t("pagesRequired") };
    }
    if (pages.data.length > MAX_PAGES) return { status: "error", message: t("tooManyPages") };
    // Only names of the one shape the app writes, in her own folder (D-052).
    if (
      pages.data.some((path) => !isSubmissionPageName(path) || !path.startsWith(`${viewer.id}/`)) ||
      new Set(pages.data).size !== pages.data.length
    ) {
      return { status: "error", message: t("pageLost") };
    }
    answer = { type: "upload" };
    filePaths = pages.data;
  } else {
    return { status: "error", message: t("unknown") };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_exercise_answer", {
    p_assignment_id: assignmentId.data,
    p_exercise_id: exerciseId.data,
    p_answer: answer,
    p_file_paths: filePaths,
  });
  if (error) {
    const code = Object.keys(REFUSALS).find((key) => error.message.includes(key));
    return {
      status: "error",
      message: t((code ? REFUSALS[code] : "unknown") as Parameters<typeof t>[0]),
    };
  }

  // Pages uploaded for this exercise and left out of the list — replaced, or never handed in —
  // would count against her 40 waiting pages for good (D-052). The policy lets her delete only
  // what no submission holds, so the list just handed in is safe.
  if (kind === "upload") {
    await removeDrafts(supabase, viewer.id, assignmentId.data, exerciseId.data, filePaths);
  }

  // The page shows the grade, or the pages waiting for the tutor, from the database.
  refresh();
  return { status: "success", message: "" };
}

/** Deletes the pages waiting in this exercise's folder, except those named. */
async function removeDrafts(
  supabase: Awaited<ReturnType<typeof createClient>>,
  studentId: string,
  assignmentId: string,
  exerciseId: string,
  keep: string[],
) {
  const folder = `${studentId}/${draftReference(assignmentId, exerciseId)}`;
  const { data } = await supabase.storage.from("submissions").list(folder, { limit: 100 });
  const leftOver = (data ?? [])
    .map((object) => `${folder}/${object.name}`)
    .filter((path) => isSubmissionPageName(path) && !keep.includes(path));
  // Best effort: the work is handed in or the solution open either way.
  if (leftOver.length > 0) await supabase.storage.from("submissions").remove(leftOver);
}

export async function revealSolution(_previous: FormState, formData: FormData): Promise<FormState> {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.homework.errors");

  const assignmentId = z.uuid().safeParse(textField(formData, "assignmentId"));
  const exerciseId = z.uuid().safeParse(textField(formData, "exerciseId"));
  if (!assignmentId.success || !exerciseId.success) return { status: "error", message: t("gone") };

  const supabase = await createClient();
  // The policy admits a reveal only from an active student, on homework that reaches her; the
  // time is stamped by the database, not taken from here (D-060).
  const { error } = await supabase.from("exercise_reveals").insert({
    assignment_id: assignmentId.data,
    exercise_id: exerciseId.data,
    student_id: viewer.id,
  });
  // Already opened (two tabs, a double click): the solution is hers either way.
  if (error && error.code !== "23505") {
    return {
      status: "error",
      message: t(viewer.status === "actif" ? "unknown" : "paused"),
    };
  }

  // The exercise can no longer be handed in here, so pages waiting for it only fill her quota.
  await removeDrafts(supabase, viewer.id, assignmentId.data, exerciseId.data, []);

  refresh();
  return { status: "success", message: "" };
}
