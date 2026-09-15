"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { requireViewer } from "@/lib/auth";
import { contactFieldsSchema, contactMetadata, contactValues } from "@/lib/contact";
import { escapeHtml, sendEmail } from "@/lib/email";
import { publicEnv } from "@/lib/env";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { generateInviteCode } from "@/lib/invite-code";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type ServerClient = Awaited<ReturnType<typeof createClient>>;
type AdminClient = NonNullable<ReturnType<typeof createAdminClient>>;

const DAY_MS = 24 * 60 * 60 * 1000;
const levelCode = z.string().regex(/^[0-9A-Z-]{2,12}$/);
const optionalId = z.union([z.uuid(), z.literal("")]);

/**
 * Inserts an invite code as the tutor, through RLS. A collision in a 32⁸ space is vanishingly
 * rare, but it is retried rather than reported. Returns null on any other failure.
 */
async function insertInviteCode(
  supabase: ServerClient,
  fields: { levelCode: string | null; groupId: string | null; maxUses: number; expiresAt: string },
): Promise<string | null> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const code = generateInviteCode();
    const { error } = await supabase.from("invite_codes").insert({
      code,
      level_code: fields.levelCode,
      group_id: fields.groupId,
      max_uses: fields.maxUses,
      expires_at: fields.expiresAt,
    });
    if (!error) {
      return code;
    }
    if (error.code !== "23505") {
      return null;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────── tutor creates the account

const inviteStudentSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().toLowerCase().pipe(z.email()),
    levelCode,
    groupId: optionalId,
  })
  .extend(contactFieldsSchema.shape);

export async function inviteStudent(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.invite"),
    getTranslations("forms"),
  ]);

  const values = {
    fullName: textField(formData, "fullName"),
    email: textField(formData, "email"),
    levelCode: textField(formData, "levelCode"),
    groupId: textField(formData, "groupId"),
    ...contactValues(formData),
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
        phone: tForms("phone"),
        guardianPhone: tForms("phone"),
        school: tForms("tooLong"),
        guardianName: tForms("tooLong"),
      }),
      values,
    };
  }
  const input = parsed.data;

  // Secret key use #1 (DECISIONS.md): creating someone else's account.
  const admin = createAdminClient();
  if (!admin) {
    return { status: "error", message: t("errors.secretKeyMissing"), values };
  }

  const supabase = await createClient();

  // Inviting the same address again sends a fresh link, as long as nobody has signed in with it.
  const { data: existing } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("email", input.email)
    .maybeSingle();
  if (existing) {
    // Fail closed: a fresh link only goes to an account proven never to have been used, and
    // whose Auth address is the one typed (the link is generated for that address).
    const { data: authUser, error: lookupError } = await admin.auth.admin.getUserById(existing.id);
    if (lookupError || !authUser.user) {
      return { status: "error", message: t("errors.unknown"), values };
    }
    const sameAddress = authUser.user.email?.toLowerCase() === input.email;
    if (existing.role !== "student" || !sameAddress || authUser.user.last_sign_in_at) {
      return { status: "error", message: t("errors.emailExists"), values };
    }
    return sendSetPasswordLink(admin, {
      email: input.email,
      name: existing.full_name || input.fullName,
      resent: true,
      values,
    });
  }

  // Proof that the tutor created this account has to be part of the auth.users INSERT, and
  // Supabase Auth writes app_metadata only after it. A one-use invite code in user_metadata is
  // present at INSERT, and the trigger turns it into the level and group (DECISIONS.md, D-025).
  const code = await insertInviteCode(supabase, {
    levelCode: input.levelCode,
    groupId: input.groupId || null,
    maxUses: 1,
    expiresAt: new Date(Date.now() + DAY_MS).toISOString(),
  });
  if (!code) {
    return { status: "error", message: t("errors.unknown"), values };
  }

  const { error: createError } = await admin.auth.admin.createUser({
    email: input.email,
    email_confirm: true,
    user_metadata: { invite_code: code, full_name: input.fullName, ...contactMetadata(input) },
  });

  if (createError) {
    await supabase.from("invite_codes").delete().eq("code", code);
    const message =
      createError.code === "email_exists" ? t("errors.emailExists") : t("errors.unknown");
    return { status: "error", message, values };
  }

  return sendSetPasswordLink(admin, {
    email: input.email,
    name: input.fullName,
    resent: false,
    values,
  });
}

/**
 * Generates a set-password link and emails it. Whether or not the email goes out, the tutor gets
 * a result she can act on: when delivery isn't possible, the link is returned to her screen.
 */
async function sendSetPasswordLink(
  admin: AdminClient,
  /** `values` are what the tutor typed, returned only on failure so her form isn't wiped. */
  student: { email: string; name: string; resent: boolean; values: Record<string, string> },
): Promise<FormState> {
  const [t, tEmail] = await Promise.all([
    getTranslations("tutor.invite"),
    getTranslations("email.invite"),
  ]);

  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: student.email,
  });
  if (linkError) {
    return { status: "error", message: t("errors.linkFailed"), values: student.values };
  }

  const setPasswordUrl = new URL("/auth/confirm", publicEnv.NEXT_PUBLIC_SITE_URL);
  setPasswordUrl.searchParams.set("token_hash", link.properties.hashed_token);
  setPasswordUrl.searchParams.set("type", "recovery");
  const url = setPasswordUrl.toString();

  const brand = siteConfig.brand;
  const greeting = tEmail("greeting", { name: student.name });
  const body = tEmail("body", { brand });

  let delivered = false;
  try {
    ({ delivered } = await sendEmail({
      to: student.email,
      subject: tEmail("subject", { brand }),
      text: `${greeting}\n\n${body}\n${url}\n\n${tEmail("expiry")}`,
      html: `<p>${escapeHtml(greeting)}</p><p>${escapeHtml(body)}</p><p><a href="${escapeHtml(url)}">${escapeHtml(tEmail("button"))}</a></p><p>${escapeHtml(tEmail("expiry"))}</p>`,
    }));
  } catch (error) {
    // Never log the link itself: it signs the student in.
    console.error(
      "[invite] The set-password email could not be sent:",
      error instanceof Error ? error.message : error,
    );
  }

  revalidatePath("/prof");

  const name = student.name;
  if (delivered) {
    return {
      status: "success",
      message: student.resent
        ? t("resent", { name, email: student.email })
        : t("sent", { name, email: student.email }),
    };
  }
  return {
    status: "success",
    message: student.resent ? t("resentNotSent", { name }) : t("notSent", { name }),
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
  const code = await insertInviteCode(supabase, {
    levelCode: parsed.data.levelCode || null,
    groupId: parsed.data.groupId || null,
    maxUses: parsed.data.maxUses,
    expiresAt: new Date(Date.now() + parsed.data.validDays * DAY_MS).toISOString(),
  });
  if (!code) {
    return { status: "error", message: t("errors.unknown"), values };
  }

  revalidatePath("/prof/eleves/inviter");
  return { status: "success", message: t("codeCreated", { code }), detail: code };
}
