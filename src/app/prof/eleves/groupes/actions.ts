"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { MAX_GROUP_NAME_LENGTH, MAX_SCHEDULE_LABEL_LENGTH } from "@/lib/students/limits";
import { createClient } from "@/lib/supabase/server";

// Groups: who takes group sessions and group homework together (DECISIONS.md, D-072). What a
// group gives a student follows when she joined it and what she did (D-070).

const groupSchema = z.object({
  name: z.string().trim().min(1).max(MAX_GROUP_NAME_LENGTH),
  // A group may mix levels (« 3AC et tronc commun »).
  levelCode: z.union([z.literal(""), z.string().regex(/^[0-9A-Z-]{2,12}$/)]),
  scheduleLabel: z.string().trim().max(MAX_SCHEDULE_LABEL_LENGTH),
});

async function readGroup(formData: FormData) {
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.groups"),
    getTranslations("forms"),
  ]);
  const values = {
    name: textField(formData, "name"),
    levelCode: textField(formData, "levelCode"),
    scheduleLabel: textField(formData, "scheduleLabel"),
  };
  const parsed = groupSchema.safeParse(values);
  if (!parsed.success) {
    return {
      ok: false as const,
      state: {
        status: "error",
        message: tForms("checkFields"),
        fieldErrors: fieldErrorsFor(parsed.error, {
          name: t("errors.name"),
          levelCode: t("errors.level"),
          scheduleLabel: t("errors.scheduleLabel"),
        }),
        values,
      } satisfies FormState,
    };
  }
  return {
    ok: true as const,
    row: {
      name: parsed.data.name,
      level_code: parsed.data.levelCode || null,
      schedule_label: parsed.data.scheduleLabel || null,
    },
    values,
    t,
  };
}

export async function createGroup(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const read = await readGroup(formData);
  if (!read.ok) return read.state;

  const supabase = await createClient();
  const { data, error } = await supabase.from("groups").insert(read.row).select("id").single();
  if (error || !data) {
    return {
      status: "error",
      message: error?.code === "23503" ? read.t("errors.level") : read.t("errors.unknown"),
      values: read.values,
    };
  }
  // The list she may come back to shows the new group.
  refresh();
  redirect(`/prof/eleves/groupes/${data.id}`);
}

export async function updateGroup(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const id = z.uuid().safeParse(textField(formData, "id"));
  const read = await readGroup(formData);
  if (!read.ok) return read.state;
  if (!id.success) return { status: "error", message: read.t("errors.gone"), values: read.values };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("groups")
    .update(read.row)
    .eq("id", id.data)
    .select("id");
  if (error) {
    return {
      status: "error",
      message: error.code === "23503" ? read.t("errors.level") : read.t("errors.unknown"),
      values: read.values,
    };
  }
  if (data.length === 0) {
    return { status: "error", message: read.t("errors.gone"), values: read.values };
  }
  refresh();
  return { status: "success", message: read.t("saved"), values: read.values };
}

export async function deleteGroup(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.groups");
  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  const { error } = await supabase.from("groups").delete().eq("id", id.data);
  if (error) {
    // Its homework and sessions hold on to it (`on delete restrict`, D-070): deleting would
    // have taken the students' work with it.
    return {
      status: "error",
      message: error.code === "23503" ? t("errors.hasHistory") : t("errors.unknown"),
    };
  }
  refresh();
  redirect("/prof/eleves/groupes");
}

export async function addMember(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.groups");
  const groupId = z.uuid().safeParse(textField(formData, "groupId"));
  const studentId = z.uuid().safeParse(textField(formData, "studentId"));
  if (!groupId.success) return { status: "error", message: t("errors.gone") };
  if (!studentId.success) return { status: "error", message: t("errors.pickStudent") };

  const supabase = await createClient();
  // A student, and one whose lessons go on: a stopped one takes part in nothing (D-060).
  const { data: student } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", studentId.data)
    .eq("role", "student")
    .neq("status", "arrete")
    .maybeSingle();
  if (!student) return { status: "error", message: t("errors.pickStudent") };

  const { data: membership } = await supabase
    .from("group_members")
    .select("left_at")
    .eq("group_id", groupId.data)
    .eq("student_id", studentId.data)
    .maybeSingle();
  if (membership && membership.left_at === null) {
    return { status: "error", message: t("errors.alreadyMember") };
  }

  // Back in a group she left: the period goes on as if she had never gone, so a removal made
  // by mistake undoes itself (D-070).
  const { error } = membership
    ? await supabase
        .from("group_members")
        .update({ left_at: null })
        .eq("group_id", groupId.data)
        .eq("student_id", studentId.data)
    : await supabase
        .from("group_members")
        .insert({ group_id: groupId.data, student_id: studentId.data });
  if (error) {
    return {
      status: "error",
      message: error.code === "23505" ? t("errors.alreadyMember") : t("errors.unknown"),
    };
  }
  refresh();
  return { status: "success", message: membership ? t("readded") : t("added") };
}

export async function removeMember(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.groups");
  const groupId = z.uuid().safeParse(textField(formData, "groupId"));
  const studentId = z.uuid().safeParse(textField(formData, "studentId"));
  if (!groupId.success || !studentId.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  // She leaves on this day; what the group gave her until now stays hers (D-070).
  const { error } = await supabase
    .from("group_members")
    .update({ left_at: new Date().toISOString() })
    .eq("group_id", groupId.data)
    .eq("student_id", studentId.data)
    .is("left_at", null);
  if (error) return { status: "error", message: t("errors.unknown") };
  refresh();
  return { status: "success", message: t("removed") };
}
