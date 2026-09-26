"use server";

import { refresh } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { MAX_FEEDBACK_LENGTH, MAX_REMARK_LENGTH, readGrade } from "@/lib/correction/correction";
import { parseDecimal } from "@/lib/decimal";
import { textField, type FormState } from "@/lib/form-state";
import { createClient } from "@/lib/supabase/server";

// The tutor corrects a copy: remarks pinned to its pages, a grade out of 20, a word for the
// student (DECISIONS.md, D-047). The student sees them once the copy is marked corrected.

export async function saveCorrection(_previous: FormState, formData: FormData): Promise<FormState> {
  const viewer = await requireViewer("tutor");
  const t = await getTranslations("tutor.correction.errors");
  const values = {
    grade: textField(formData, "grade"),
    feedback: textField(formData, "feedback"),
  };

  const id = z.uuid().safeParse(textField(formData, "id"));
  // The version of the copy she was looking at: a student may hand in a new list until the
  // copy is corrected, and a grade must go to the pages it was given for.
  const seen = textField(formData, "submittedAt");
  if (!id.success || seen === "") return { status: "error", message: t("gone"), values };

  const grade = readGrade(values.grade);
  const feedback = values.feedback.trim();
  const fieldErrors: Record<string, string> = {};
  if ("error" in grade) fieldErrors.grade = t(grade.error);
  if (feedback.length > MAX_FEEDBACK_LENGTH) fieldErrors.feedback = t("feedbackTooLong");
  if ("error" in grade || Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: t("fix"), fieldErrors, values };
  }

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("submissions")
    .select("status, grade::text")
    .eq("id", id.data)
    .maybeSingle();
  if (!current) return { status: "error", message: t("gone"), values };

  const first = current.status === "rendu";
  // A grade she changes is hers from now on: a number or a choice the database graded stops
  // reading as « noté automatiquement », on her page and on the student's (D-047).
  const changed = current.grade === null || parseDecimal(current.grade) !== grade.value;
  const { data, error } = await supabase
    .from("submissions")
    .update({
      // Two decimals at most and 20 at most (readGrade), so the double carries it exactly.
      grade: Number(grade.value),
      feedback: feedback || null,
      status: "corrige",
      corrected_by: viewer.id,
      ...(first || changed ? { corrected_at: new Date().toISOString() } : {}),
      ...(changed ? { auto_graded: false } : {}),
    })
    .eq("id", id.data)
    .eq("status", current.status)
    // The version she corrected, on the first save and on every later one: a grade typed for
    // pages since replaced never lands on the new ones.
    .eq("submitted_at", seen)
    .select("id");
  if (error) return { status: "error", message: t("unknown"), values };

  const tSaved = await getTranslations("tutor.correction");
  if (data.length === 0) {
    // Say why: the copy went, was handed in again, or was corrected elsewhere meanwhile.
    const { data: now } = await supabase
      .from("submissions")
      .select("status, submitted_at")
      .eq("id", id.data)
      .maybeSingle();
    refresh();
    const reason = !now
      ? "gone"
      : now.submitted_at !== seen
        ? "changed"
        : now.status !== current.status
          ? "correctedMeanwhile"
          : "unknown";
    return { status: "error", message: t(reason), values };
  }

  refresh();
  return { status: "success", message: tSaved(first ? "corrected" : "updated"), values };
}

const share = z.coerce.number().min(0).max(1);

export async function addRemark(_previous: FormState, formData: FormData): Promise<FormState> {
  const viewer = await requireViewer("tutor");
  const t = await getTranslations("tutor.correction.errors");
  const values = { body: textField(formData, "body") };

  const id = z.uuid().safeParse(textField(formData, "submissionId"));
  const path = textField(formData, "path");
  const body = values.body.trim();
  if (!id.success || path === "") return { status: "error", message: t("gone"), values };
  if (body === "") return { status: "error", message: t("remarkRequired"), values };
  if (body.length > MAX_REMARK_LENGTH) {
    return { status: "error", message: t("remarkTooLong"), values };
  }

  // A point is optional: a remark added from the keyboard sits on the page, not on a spot.
  const x = textField(formData, "x");
  const y = textField(formData, "y");
  const point = x !== "" && y !== "" ? z.object({ x: share, y: share }).safeParse({ x, y }) : null;
  if (point && !point.success) return { status: "error", message: t("unknown"), values };

  const supabase = await createClient();
  const { data: submission } = await supabase
    .from("submissions")
    .select("file_paths")
    .eq("id", id.data)
    .maybeSingle();
  // Only on a page of this copy: the student's view places each remark by its page.
  if (!submission?.file_paths.includes(path)) {
    refresh();
    return { status: "error", message: t("pageGone"), values };
  }

  const { error } = await supabase.from("submission_comments").insert({
    submission_id: id.data,
    author_id: viewer.id,
    body,
    anchor: point?.success ? { path, x: point.data.x, y: point.data.y } : { path },
  });
  if (error) return { status: "error", message: t("unknown"), values };
  refresh();
  return { status: "success", message: "" };
}

export async function updateRemark(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.correction.errors");
  const values = { body: textField(formData, "body") };

  const id = z.uuid().safeParse(textField(formData, "id"));
  const body = values.body.trim();
  if (!id.success) return { status: "error", message: t("gone"), values };
  if (body === "") return { status: "error", message: t("remarkRequired"), values };
  if (body.length > MAX_REMARK_LENGTH) {
    return { status: "error", message: t("remarkTooLong"), values };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("submission_comments").update({ body }).eq("id", id.data);
  if (error) return { status: "error", message: t("unknown"), values };
  refresh();
  return { status: "success", message: "" };
}

export async function deleteRemark(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.correction.errors");

  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("gone") };

  const supabase = await createClient();
  const { error } = await supabase.from("submission_comments").delete().eq("id", id.data);
  if (error) return { status: "error", message: t("unknown") };
  refresh();
  return { status: "success", message: "" };
}
