"use server";

import { refresh } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { escapeHtml, sendEmail } from "@/lib/email";
import { publicEnv } from "@/lib/env";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// Parents (DECISIONS.md, D-091). The tutor gives a student's parent an account from the
// student's file: a one-use invitation for that address, which the sign-up trigger turns into
// a parent linked to that student, then a link to choose a password, as for students (D-030).
// A parent who already has an account is linked to one more child instead, once the tutor has
// seen whose account it is.

type AdminClient = NonNullable<ReturnType<typeof createAdminClient>>;
type ServerClient = Awaited<ReturnType<typeof createClient>>;

const inviteSchema = z.object({
  studentId: z.uuid(),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().pipe(z.email()),
});

const listFormat = new Intl.ListFormat("fr", { type: "conjunction" });

export async function inviteParent(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("parentsAdmin"),
    getTranslations("forms"),
  ]);
  const values = {
    studentId: textField(formData, "studentId"),
    fullName: textField(formData, "fullName"),
    email: textField(formData, "email"),
  };
  const confirmed = textField(formData, "confirm") === "yes";
  const parsed = inviteSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        fullName: t("errors.fullName"),
        email: t("errors.email"),
      }),
      values,
    };
  }
  const input = parsed.data;
  const unknown: FormState = { status: "error", message: t("errors.unknown"), values };

  // Secret key use (DECISIONS.md): creating someone else's account.
  const admin = createAdminClient();
  if (!admin) return { status: "error", message: t("errors.secretKeyMissing"), values };

  const supabase = await createClient();
  const { data: student, error: studentError } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", input.studentId)
    .maybeSingle();
  if (studentError) return unknown;
  if (student?.role !== "student") return { status: "error", message: t("errors.gone"), values };
  const target = { id: student.id, name: student.full_name };

  const existing = await accountFor(supabase, input.email);
  if (existing === "failed") return unknown;
  if (existing) return linkExisting(supabase, admin, existing, target, values, confirmed);

  const { data: invite, error: inviteError } = await supabase
    .from("parent_invites")
    .insert({ student_id: student.id, email: input.email, full_name: input.fullName })
    .select("token")
    .single();
  if (inviteError) return unknown;

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: input.email,
    email_confirm: true,
    user_metadata: { parent_invite: invite.token, full_name: input.fullName },
  });
  if (createError) {
    await supabase.from("parent_invites").delete().eq("token", invite.token);
    if (createError.code !== "email_exists") return unknown;
    // Someone made that account in the meantime: whose it is decides, as above.
    const again = await accountFor(supabase, input.email);
    if (again && again !== "failed") {
      return linkExisting(supabase, admin, again, target, values, confirmed);
    }
    return { status: "error", message: t("errors.notParent"), values };
  }
  // The invitation is used up; its token has no business staying in the account's metadata.
  await admin.auth.admin.updateUserById(created.user.id, {
    user_metadata: { parent_invite: null },
  });

  refresh();
  return sendSetPasswordLink(admin, "created", {
    email: input.email,
    name: input.fullName,
    student: student.full_name,
    values,
  });
}

type Account = { id: string; role: string; full_name: string };

async function accountFor(
  supabase: ServerClient,
  email: string,
): Promise<Account | null | "failed"> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("email", email)
    .maybeSingle();
  return error ? "failed" : data;
}

/**
 * An address that already has an account. A student's or the tutor's never becomes a
 * parent's. A parent's is linked to this student too, but only once the tutor has confirmed,
 * having read whose account it is and whom they already follow: a mistyped address would
 * otherwise hand this child's file to another family.
 */
async function linkExisting(
  supabase: ServerClient,
  admin: AdminClient,
  parent: Account,
  student: { id: string; name: string },
  values: Record<string, string>,
  confirmed: boolean,
): Promise<FormState> {
  const t = await getTranslations("parentsAdmin");
  const unknown: FormState = { status: "error", message: t("errors.unknown"), values };
  if (parent.role !== "parent") return { status: "error", message: t("errors.notParent"), values };

  const { data: links, error: linksError } = await supabase
    .from("guardian_links")
    .select("student_id, student:profiles!guardian_links_student_id_fkey(full_name)")
    .eq("parent_id", parent.id);
  if (linksError) return unknown;
  if (links.some((link) => link.student_id === student.id)) {
    return {
      status: "success",
      message: t("alreadyLinked", { name: parent.full_name, student: student.name }),
    };
  }

  if (!confirmed) {
    const children = links.flatMap((link) => (link.student ? [link.student.full_name] : []));
    return {
      status: "error",
      message:
        children.length > 0
          ? t("confirmExisting", {
              name: parent.full_name,
              children: listFormat.format(children),
              student: student.name,
            })
          : t("confirmExistingNone", { name: parent.full_name, student: student.name }),
      values: { ...values, confirm: "needed" },
    };
  }

  const { error: linkError } = await supabase
    .from("guardian_links")
    .insert({ parent_id: parent.id, student_id: student.id });
  // Linked in the meantime: that is what she asked for.
  if (linkError && linkError.code !== "23505") return unknown;
  refresh();

  // Never signed in: the link they were sent may be lost, so a fresh one goes out.
  const { data: authUser } = await admin.auth.admin.getUserById(parent.id);
  if (authUser.user && !authUser.user.last_sign_in_at && authUser.user.email) {
    return sendSetPasswordLink(admin, "resent", {
      email: authUser.user.email,
      name: parent.full_name,
      student: student.name,
      values,
    });
  }
  return {
    status: "success",
    message: t("linked", { name: parent.full_name, student: student.name }),
  };
}

/**
 * A link to choose a password, emailed to the parent. When no email can leave, the tutor gets
 * the link on her screen to pass on herself, as for students (D-030).
 */
async function sendSetPasswordLink(
  admin: AdminClient,
  kind: "created" | "resent",
  parent: { email: string; name: string; student: string; values: Record<string, string> },
): Promise<FormState> {
  const [t, tEmail] = await Promise.all([
    getTranslations("parentsAdmin"),
    getTranslations("email.parentInvite"),
  ]);
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: parent.email,
  });
  if (linkError) return { status: "error", message: t("errors.linkFailed"), values: parent.values };

  const setPasswordUrl = new URL("/auth/confirm", publicEnv.NEXT_PUBLIC_SITE_URL);
  setPasswordUrl.searchParams.set("token_hash", link.properties.hashed_token);
  setPasswordUrl.searchParams.set("type", "recovery");
  const url = setPasswordUrl.toString();

  const brand = siteConfig.brand;
  const greeting = tEmail("greeting", { name: parent.name });
  const body = tEmail("body", { brand, student: parent.student, tutor: siteConfig.tutorName });
  let delivered = false;
  try {
    ({ delivered } = await sendEmail({
      to: parent.email,
      subject: tEmail("subject", { brand, student: parent.student }),
      text: `${greeting}\n\n${body}\n${url}\n\n${tEmail("expiry")}`,
      html: `<p>${escapeHtml(greeting)}</p><p>${escapeHtml(body)}</p><p><a href="${escapeHtml(url)}">${escapeHtml(tEmail("button"))}</a></p><p>${escapeHtml(tEmail("expiry"))}</p>`,
    }));
  } catch (error) {
    // Never log the link itself: it signs the parent in.
    console.error(
      "[parents] The set-password email could not be sent:",
      error instanceof Error ? error.message : error,
    );
  }

  const names = { name: parent.name, email: parent.email, student: parent.student };
  if (delivered) {
    return { status: "success", message: t(kind === "created" ? "sent" : "resent", names) };
  }
  return {
    status: "success",
    message: t(kind === "created" ? "notSent" : "resentNotSent", names),
    detail: url,
  };
}

export async function unlinkParent(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("parentsAdmin");
  const parentId = z.uuid().safeParse(textField(formData, "parentId"));
  const studentId = z.uuid().safeParse(textField(formData, "studentId"));
  if (!parentId.success || !studentId.success)
    return { status: "error", message: t("errors.gone") };
  const supabase = await createClient();
  const { data: people } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", [parentId.data, studentId.data]);
  const nameOf = (id: string) => people?.find((person) => person.id === id)?.full_name ?? "";
  const { data, error } = await supabase
    .from("guardian_links")
    .delete()
    .eq("parent_id", parentId.data)
    .eq("student_id", studentId.data)
    .select("parent_id");
  if (error) return { status: "error", message: t("errors.unknown") };
  if (data.length === 0) return { status: "error", message: t("errors.alreadyUnlinked") };
  refresh();
  return {
    status: "success",
    message: t("unlinked", { name: nameOf(parentId.data), student: nameOf(studentId.data) }),
  };
}
