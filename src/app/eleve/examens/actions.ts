"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { parseDecimal } from "@/lib/decimal";
import { textField, type FormState } from "@/lib/form-state";
import { createClient } from "@/lib/supabase/server";

// Exam mode (DECISIONS.md, D-104): she sits a past paper against the clock, then marks herself
// with the correction in front of her. The database records the attempt and checks the paper
// is published (start_exam_attempt, finish_exam_attempt).

export async function startExam(formData: FormData): Promise<void> {
  await requireViewer("student");
  const examId = z.uuid().safeParse(textField(formData, "examId"));
  const minutes = z.coerce
    .number()
    .int()
    .min(15)
    .max(300)
    .safeParse(textField(formData, "minutes"));
  if (!examId.success || !minutes.success) return;
  const supabase = await createClient();
  const { error } = await supabase.rpc("start_exam_attempt", {
    p_exam_id: examId.data,
    p_minutes: minutes.data,
  });
  redirect(`/eleve/examens/${examId.data}${error ? "?erreur=1" : ""}`);
}

/** Gives up an exam started by mistake: no trace, no correction shown. */
export async function abandonExam(formData: FormData): Promise<void> {
  await requireViewer("student");
  const attemptId = z.uuid().safeParse(textField(formData, "attemptId"));
  if (!attemptId.success) return;
  const supabase = await createClient();
  await supabase.rpc("abandon_exam_attempt", { p_attempt_id: attemptId.data });
  refresh();
}

export async function finishExam(formData: FormData): Promise<void> {
  await requireViewer("student");
  const attemptId = z.uuid().safeParse(textField(formData, "attemptId"));
  if (!attemptId.success) return;
  const supabase = await createClient();
  await supabase.rpc("finish_exam_attempt", { p_attempt_id: attemptId.data });
  refresh();
}

export async function saveSelfScore(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("student");
  const t = await getTranslations("student.exam");
  const attemptId = z.uuid().safeParse(textField(formData, "attemptId"));
  const raw = textField(formData, "score");
  const parsed = parseDecimal(raw);
  const score = parsed === null ? Number.NaN : Number(parsed);
  if (!attemptId.success) return { status: "error", message: t("scoreFailed") };
  if (!Number.isFinite(score) || score < 0 || score > 20) {
    return { status: "error", message: t("scoreInvalid"), values: { score: raw } };
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("finish_exam_attempt", {
    p_attempt_id: attemptId.data,
    p_self_score: score,
  });
  if (error) return { status: "error", message: t("scoreFailed"), values: { score: raw } };
  refresh();
  return { status: "success", message: t("scoreSaved") };
}
