"use server";

import { refresh } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { contactFieldsSchema, contactValues } from "@/lib/contact";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { MAX_NOTE_LENGTH, MAX_OBJECTIVES_LENGTH } from "@/lib/students/limits";
import { createClient } from "@/lib/supabase/server";

// The tutor keeps a student's file (DECISIONS.md, D-071): who she is, where she stands, what
// she aims for, and notes only the tutor reads.

const studentSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    // A class code may leave the level open: such a student is saved without one.
    levelCode: z.union([z.literal(""), z.string().regex(/^[0-9A-Z-]{2,12}$/)]),
    status: z.enum(["actif", "en_pause", "arrete"]),
    objectives: z.string().trim().max(MAX_OBJECTIVES_LENGTH),
    autoConfirm: z.enum(["true", "false"]),
  })
  .extend(contactFieldsSchema.shape);

export async function updateStudent(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.student"),
    getTranslations("forms"),
  ]);

  const id = z.uuid().safeParse(textField(formData, "id"));
  const values = {
    fullName: textField(formData, "fullName"),
    levelCode: textField(formData, "levelCode"),
    status: textField(formData, "status"),
    objectives: textField(formData, "objectives"),
    autoConfirm: textField(formData, "autoConfirm") || "false",
    ...contactValues(formData),
  };
  if (!id.success) return { status: "error", message: t("errors.gone"), values };

  const parsed = studentSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        fullName: t("errors.fullName"),
        levelCode: t("errors.level"),
        status: t("errors.status"),
        objectives: t("errors.objectives"),
        phone: tForms("phone"),
        guardianPhone: tForms("phone"),
        school: tForms("tooLong"),
        guardianName: tForms("tooLong"),
      }),
      values,
    };
  }

  const fields = parsed.data;
  const supabase = await createClient();
  const { data: updated, error } = await supabase
    .from("profiles")
    .update({
      full_name: fields.fullName,
      level_code: fields.levelCode || null,
      status: fields.status,
      phone: fields.phone || null,
      school: fields.school || null,
      guardian_name: fields.guardianName || null,
      guardian_phone: fields.guardianPhone || null,
    })
    .eq("id", id.data)
    .eq("role", "student")
    .select("id");
  if (error) {
    return {
      status: "error",
      // An unknown level is the only foreign key the form can break.
      message: error.code === "23503" ? t("errors.level") : t("errors.unknown"),
      values,
    };
  }
  if (updated.length === 0) return { status: "error", message: t("errors.gone"), values };

  const { error: settingsError } = await supabase.from("student_settings").upsert({
    student_id: id.data,
    objectives: fields.objectives || null,
    auto_confirm_bookings: fields.autoConfirm === "true",
  });
  if (settingsError) return { status: "error", message: t("errors.unknown"), values };

  refresh();
  return { status: "success", message: t("saved"), values };
}

export async function addNote(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.student");
  const values = { body: textField(formData, "body") };
  const studentId = z.uuid().safeParse(textField(formData, "studentId"));
  const body = values.body.trim();
  if (!studentId.success) return { status: "error", message: t("errors.gone"), values };
  if (body === "") return { status: "error", message: t("errors.noteRequired"), values };
  if (body.length > MAX_NOTE_LENGTH) {
    return { status: "error", message: t("errors.noteTooLong"), values };
  }

  const supabase = await createClient();
  const { data: student } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", studentId.data)
    .eq("role", "student")
    .maybeSingle();
  if (!student) return { status: "error", message: t("errors.gone"), values };
  const { error } = await supabase
    .from("student_notes")
    .insert({ student_id: studentId.data, body });
  if (error) return { status: "error", message: t("errors.unknown"), values };
  refresh();
  return { status: "success", message: "" };
}

export async function updateNote(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.student");
  const values = { body: textField(formData, "body") };
  const id = z.uuid().safeParse(textField(formData, "id"));
  const body = values.body.trim();
  if (!id.success) return { status: "error", message: t("errors.gone"), values };
  if (body === "") return { status: "error", message: t("errors.noteRequired"), values };
  if (body.length > MAX_NOTE_LENGTH) {
    return { status: "error", message: t("errors.noteTooLong"), values };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("student_notes")
    .update({ body })
    .eq("id", id.data)
    .select("id");
  if (error) return { status: "error", message: t("errors.unknown"), values };
  if (data.length === 0) return { status: "error", message: t("errors.noteGone"), values };
  refresh();
  return { status: "success", message: "" };
}

export async function deleteNote(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.student");
  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  const { error } = await supabase.from("student_notes").delete().eq("id", id.data);
  if (error) return { status: "error", message: t("errors.unknown") };
  refresh();
  return { status: "success", message: "" };
}
