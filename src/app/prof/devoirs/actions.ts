"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import {
  parseAssignmentDetails,
  parseAssignmentForm,
  type AssignmentFieldErrors,
} from "@/lib/assignment/form";
import { requireViewer } from "@/lib/auth";
import { textField, type FormState } from "@/lib/form-state";
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

  redirect("/prof/devoirs");
}
