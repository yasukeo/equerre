"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { escapeHtml, sendEmail } from "@/lib/email";
import { publicEnv } from "@/lib/env";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { generateInviteCode } from "@/lib/invite-code";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const levelCode = z.string().regex(/^[0-9A-Z-]{2,12}$/);
const optionalId = z.union([z.uuid(), z.literal("")]);

// ─────────────────────────────────────────────────────────────── tutor creates the account

const inviteStudentSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  levelCode,
  groupId: optionalId,
});

export async function inviteStudent(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms, tEmail] = await Promise.all([
    getTranslations("tutor.invite"),
    getTranslations("forms"),
    getTranslations("email.invite"),
  ]);

  const values = {
    fullName: textField(formData, "fullName"),
    email: textField(formData, "email"),
    levelCode: textField(formData, "levelCode"),
    groupId: textField(formData, "groupId"),
  };

  const parsed = inviteStudentSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        fullName: t("errors.fullName"),
        email: t("errors.email"),
        levelCode: t("errors.level"),
      }),
      values,
    };
  }

  // Secret key use #1 (DECISIONS.md): creating someone else's account.
  const admin = createAdminClient();
  if (!admin) {
    return { status: "error", message: t("errors.secretKeyMissing"), values };
  }

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: parsed.data.email,
    email_confirm: true,
    app_metadata: { provisioned_by: "tutor", level_code: parsed.data.levelCode },
    user_metadata: { full_name: parsed.data.fullName },
  });

  if (createError) {
    const message =
      createError.code === "email_exists" ? t("errors.emailExists") : t("errors.unknown");
    return { status: "error", message, values };
  }

  if (parsed.data.groupId) {
    // Written as the tutor, through RLS.
    const supabase = await createClient();
    await supabase
      .from("group_members")
      .insert({ group_id: parsed.data.groupId, student_id: created.user.id });
  }

  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: parsed.data.email,
  });
  if (linkError) {
    return { status: "error", message: t("errors.linkFailed") };
  }

  const setPasswordUrl = new URL("/auth/confirm", publicEnv.NEXT_PUBLIC_SITE_URL);
  setPasswordUrl.searchParams.set("token_hash", link.properties.hashed_token);
  setPasswordUrl.searchParams.set("type", "recovery");

  const brand = siteConfig.brand;
  const greeting = tEmail("greeting", { name: parsed.data.fullName });
  const body = tEmail("body", { brand });
  const url = setPasswordUrl.toString();

  const { delivered } = await sendEmail({
    to: parsed.data.email,
    subject: tEmail("subject", { brand }),
    text: `${greeting}\n\n${body}\n${url}\n\n${tEmail("expiry")}`,
    html: `<p>${escapeHtml(greeting)}</p><p>${escapeHtml(body)}</p><p><a href="${escapeHtml(url)}">${escapeHtml(tEmail("button"))}</a></p><p>${escapeHtml(tEmail("expiry"))}</p>`,
  });

  revalidatePath("/prof");

  return delivered
    ? {
        status: "success",
        message: t("sent", { name: parsed.data.fullName, email: parsed.data.email }),
      }
    : {
        status: "success",
        message: t("notSent", { name: parsed.data.fullName }),
        detail: url,
      };
}

// ─────────────────────────────────────────────────────────────── invite code for self sign-up

const inviteCodeSchema = z.object({
  levelCode: z.union([levelCode, z.literal("")]),
  groupId: optionalId,
  maxUses: z.coerce.number().int().min(1).max(200),
  validDays: z.coerce.number().int().min(1).max(90),
});

export async function createInviteCode(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.invite"),
    getTranslations("forms"),
  ]);

  const values = {
    levelCode: textField(formData, "levelCode"),
    groupId: textField(formData, "groupId"),
    maxUses: textField(formData, "maxUses"),
    validDays: textField(formData, "validDays"),
  };

  const parsed = inviteCodeSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        maxUses: t("errors.maxUses"),
        validDays: t("errors.validDays"),
      }),
      values,
    };
  }

  const supabase = await createClient();
  const expiresAt = new Date(
    Date.now() + parsed.data.validDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  // A collision in a 32⁸ space is vanishingly rare, but retry rather than fail on one.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const code = generateInviteCode();
    const { error } = await supabase.from("invite_codes").insert({
      code,
      level_code: parsed.data.levelCode || null,
      group_id: parsed.data.groupId || null,
      max_uses: parsed.data.maxUses,
      expires_at: expiresAt,
    });

    if (!error) {
      revalidatePath("/prof/eleves/inviter");
      return { status: "success", message: t("codeCreated", { code }), detail: code };
    }
    if (error.code !== "23505") {
      break;
    }
  }

  return { status: "error", message: t("errors.unknown"), values };
}
