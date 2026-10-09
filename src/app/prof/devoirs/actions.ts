"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import {
  parseAssignmentDetails,
  parseAssignmentForm,
  parseSubjectAssignmentForm,
  type AssignmentFieldErrors,
} from "@/lib/assignment/form";
import { requireViewer } from "@/lib/auth";
import { textField, type FormState } from "@/lib/form-state";
import { SUBJECT_BUCKET } from "@/lib/homework/subject";
import { isSubjectName } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/server";

const FIELDS = ["title", "instructions", "dueDate", "dueTime", "recipient", "exerciseIds"] as const;

/** The codes public.create_assignment raises, and the message each one means. */
const RPC_ERRORS = {
  recipient_invalid: "recipientGone",
  due_in_past: "dueInPast",
  exercises_invalid: "exercises",
  exercise_not_ready: "exerciseNotReady",
} as const;

// ─────────────────────────────────────────────────────────────── create

export async function createAssignment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.newAssignment");

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, textField(formData, field)]),
  ) as Record<(typeof FIELDS)[number], string>;
  const parsed = parseAssignmentForm(values, new Date());
  if (!parsed.ok) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: messages((key) => t(key as Parameters<typeof t>[0]), parsed.errors),
    };
  }

  const { title, instructions, dueAt, recipient, exerciseIds } = parsed.value;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_assignment", {
    p_title: title,
    p_due_at: dueAt.toISOString(),
    p_exercise_ids: exerciseIds,
    ...(instructions ? { p_instructions: instructions } : {}),
    ...(recipient.kind === "student"
      ? { p_student_id: recipient.id }
      : { p_group_id: recipient.id }),
  });
  if (error || !data) {
    const code = Object.keys(RPC_ERRORS).find((key) => error?.message.includes(key)) as
      keyof typeof RPC_ERRORS | undefined;
    return { status: "error", message: t(`errors.${code ? RPC_ERRORS[code] : "unknown"}`) };
  }

  redirect(`/prof/devoirs/${data}`);
}

/** The codes public.create_subject_assignment raises beyond create_assignment's. */
const SUBJECT_RPC_ERRORS = {
  ...RPC_ERRORS,
  subject_invalid: "subject",
  subject_not_uploaded: "subjectLost",
  subject_used: "subjectUsed",
  title_invalid: "title",
} as const;

/** Refusals after which the form forgets its file, without deleting it, and asks for it again. */
const ASK_FOR_FILE_AGAIN = new Set(["subject_not_uploaded", "subject_used"]);

/**
 * A homework given as a PDF (D-106). The tutor's browser has already put the file in the
 * subjects bucket under an id-shaped name; the database checks it is there, writes the subject
 * as the homework's one exercise and gives it, or refuses the whole.
 */
export async function createSubjectAssignment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.newAssignment");

  const parsed = parseSubjectAssignmentForm(
    {
      title: textField(formData, "title"),
      instructions: textField(formData, "instructions"),
      dueDate: textField(formData, "dueDate"),
      dueTime: textField(formData, "dueTime"),
      recipient: textField(formData, "recipient"),
      subjectPath: textField(formData, "subjectPath"),
    },
    new Date(),
  );
  if (!parsed.ok) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: messages((key) => t(key as Parameters<typeof t>[0]), parsed.errors),
    };
  }

  const { title, instructions, dueAt, recipient, subjectPath } = parsed.value;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_subject_assignment", {
    p_title: title,
    p_due_at: dueAt.toISOString(),
    p_subject_path: subjectPath,
    ...(instructions ? { p_instructions: instructions } : {}),
    ...(recipient.kind === "student"
      ? { p_student_id: recipient.id }
      : { p_group_id: recipient.id }),
  });
  if (error || !data) {
    const code = Object.keys(SUBJECT_RPC_ERRORS).find((key) => error?.message.includes(key)) as
      keyof typeof SUBJECT_RPC_ERRORS | undefined;
    const message = t(`errors.${code ? SUBJECT_RPC_ERRORS[code] : "unknown"}`);
    return code && ASK_FOR_FILE_AGAIN.has(code)
      ? {
          status: "error",
          message,
          fieldErrors: { subject: message },
          values: { subject: "again" },
        }
      : { status: "error", message };
  }

  redirect(`/prof/devoirs/${data}`);
}

/** Field → its message, from the keys parseAssignmentForm returns. */
function messages(
  t: (key: string) => string,
  errors: AssignmentFieldErrors,
): Partial<Record<string, string>> {
  return Object.fromEntries(
    Object.entries(errors).map(([field, key]) => [field, t(`errors.${key}`)]),
  );
}

// ─────────────────────────────────────────────────────────────── edit

export async function updateAssignment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.newAssignment");
  const tDetails = await getTranslations("tutor.assignment");

  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: tDetails("errors.notFound") };

  const parsed = parseAssignmentDetails({
    title: textField(formData, "title"),
    instructions: textField(formData, "instructions"),
    dueDate: textField(formData, "dueDate"),
    dueTime: textField(formData, "dueTime"),
  });
  if (!parsed.ok) {
    return {
      status: "error",
      message: t("errors.fields"),
      fieldErrors: messages((key) => t(key as Parameters<typeof t>[0]), parsed.errors),
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assignments")
    .update({
      title: parsed.value.title,
      instructions: parsed.value.instructions || null,
      due_at: parsed.value.dueAt.toISOString(),
    })
    .eq("id", id.data)
    .select("id");
  if (error || !data?.length) {
    return { status: "error", message: tDetails(error ? "errors.unknown" : "errors.notFound") };
  }
  // The header above the form shows the title and due date: it is redrawn from the server.
  refresh();
  return { status: "success", message: tDetails("saved") };
}

// ─────────────────────────────────────────────────────────────── delete

export async function deleteAssignment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.assignment");

  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.notFound") };

  const supabase = await createClient();
  // Read before it goes: a homework given as a PDF takes its file with it (D-106).
  const { data: subjects } = await supabase
    .from("assignment_items")
    .select("exercise:exercises(subject_path)")
    .eq("assignment_id", id.data);
  const { error } = await supabase.rpc("delete_assignment", { p_id: id.data });
  if (error) {
    // Deleting would take the students' answers with it (D-045). The page is redrawn so the
    // delete button it still offered gives way to the reason.
    if (error.message.includes("assignment_has_work")) refresh();
    const message = error.message.includes("assignment_has_work")
      ? t("errors.hasWork")
      : error.message.includes("assignment_not_found")
        ? t("errors.notFound")
        : t("errors.unknown");
    return { status: "error", message };
  }

  const files = (subjects ?? []).flatMap((item) =>
    item.exercise?.subject_path && isSubjectName(item.exercise.subject_path)
      ? [item.exercise.subject_path]
      : [],
  );
  if (files.length > 0) {
    // Only a file whose subject went with the homework: one still held elsewhere stays.
    const { data: kept } = await supabase
      .from("exercises")
      .select("subject_path")
      .in("subject_path", files);
    const held = new Set((kept ?? []).map((row) => row.subject_path));
    const orphans = files.filter((file) => !held.has(file));
    // Best effort: the homework is gone either way, and an orphan file only takes room.
    if (orphans.length > 0) await supabase.storage.from(SUBJECT_BUCKET).remove(orphans);
  }

  redirect("/prof/devoirs");
}
