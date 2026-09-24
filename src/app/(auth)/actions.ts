"use server";

import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { homePathFor } from "@/lib/auth";
import { contactFieldsSchema, contactMetadata, contactValues } from "@/lib/contact";
import { destinationAfterEmailLink, emailOtpType } from "@/lib/email-link";
import { publicEnv } from "@/lib/env";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { INVITE_CODE_PATTERN } from "@/lib/invite-code";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { createClient } from "@/lib/supabase/server";

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());
const newPasswordSchema = z.string().min(8).max(72);

/** Where email links land. `/auth/confirm` sends them on to be confirmed with a click. */
function confirmUrl(next = ""): string {
  const url = new URL("/auth/confirm", publicEnv.NEXT_PUBLIC_SITE_URL);
  if (next) {
    url.searchParams.set("suite", next);
  }
  return url.toString();
}

function isRateLimited(code: string | undefined): boolean {
  return code === "over_request_rate_limit" || code === "over_email_send_rate_limit";
}

// ─────────────────────────────────────────────────────────────── sign in

const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
  suite: z.string(),
});

export async function signInWithPassword(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = await getTranslations("auth.signIn.errors");
  const values = { email: textField(formData, "email") };

  const parsed = signInSchema.safeParse({
    email: values.email,
    password: textField(formData, "password"),
    suite: textField(formData, "suite"),
  });
  if (!parsed.success) {
    return { status: "error", message: t("invalidInput"), values };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    const message =
      error.code === "invalid_credentials"
        ? t("invalidCredentials")
        : error.code === "email_not_confirmed"
          ? t("emailNotConfirmed")
          : isRateLimited(error.code)
            ? t("rateLimited")
            : t("unknown");
    return { status: "error", message, values };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  redirect(safeRedirectPath(parsed.data.suite, homePathFor(profile?.role ?? "student")));
}

export async function sendMagicLink(_previous: FormState, formData: FormData): Promise<FormState> {
  const t = await getTranslations("auth.signIn");
  const values = { email: textField(formData, "email") };

  const parsed = z
    .object({ email: emailSchema, suite: z.string() })
    .safeParse({ email: values.email, suite: textField(formData, "suite") });
  if (!parsed.success) {
    return { status: "error", message: t("errors.invalidInput"), values };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      // Magic links sign existing people in; they never create accounts (DECISIONS.md, D-023).
      shouldCreateUser: false,
      emailRedirectTo: confirmUrl(safeRedirectPath(parsed.data.suite, "")),
    },
  });

  if (isRateLimited(error?.code)) {
    return { status: "error", message: t("errors.rateLimited"), values };
  }

  // Unknown addresses get the same answer, so this form can't reveal who has an account.
  return { status: "success", message: t("magicLinkSent", { email: parsed.data.email }), values };
}

// ─────────────────────────────────────────────────────────────── sign up

const signUpSchema = z
  .object({
    inviteCode: z.string().trim().toUpperCase().regex(INVITE_CODE_PATTERN),
    fullName: z.string().trim().min(2).max(120),
    email: emailSchema,
    password: newPasswordSchema,
  })
  .extend(contactFieldsSchema.shape);

export async function signUp(_previous: FormState, formData: FormData): Promise<FormState> {
  const t = await getTranslations("auth.signUp");
  const tForms = await getTranslations("forms");
  const values = {
    inviteCode: textField(formData, "inviteCode"),
    fullName: textField(formData, "fullName"),
    email: textField(formData, "email"),
    ...contactValues(formData),
  };

  const parsed = signUpSchema.safeParse({ ...values, password: textField(formData, "password") });
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        inviteCode: t("errors.inviteCode"),
        fullName: t("errors.fullName"),
        email: t("errors.email"),
        password: t("errors.password"),
        phone: tForms("phone"),
        guardianPhone: tForms("phone"),
        school: tForms("tooLong"),
        guardianName: tForms("tooLong"),
      }),
      values,
    };
  }

  const supabase = await createClient();

  // A friendly early answer. The auth trigger checks the code again, atomically.
  const { data: codeIsValid } = await supabase.rpc("invite_code_is_valid", {
    p_code: parsed.data.inviteCode,
  });
  if (!codeIsValid) {
    return {
      status: "error",
      message: t("errors.inviteCode"),
      fieldErrors: { inviteCode: t("errors.inviteCode") },
      values,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        invite_code: parsed.data.inviteCode,
        full_name: parsed.data.fullName,
        ...contactMetadata(parsed.data),
      },
      emailRedirectTo: confirmUrl("/eleve"),
    },
  });

  if (error) {
    const message =
      error.code === "weak_password"
        ? t("errors.weakPassword")
        : isRateLimited(error.code)
          ? t("errors.rateLimited")
          : t("errors.unknown");
    return { status: "error", message, values };
  }

  if (data.session) {
    redirect("/eleve");
  }

  return { status: "success", message: t("checkEmail", { email: parsed.data.email }) };
}

// ─────────────────────────────────────────────────────────────── passwords

export async function requestPasswordReset(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = await getTranslations("auth.forgotPassword");
  const values = { email: textField(formData, "email") };

  const parsed = emailSchema.safeParse(values.email);
  if (!parsed.success) {
    return {
      status: "error",
      message: t("errors.email"),
      fieldErrors: { email: t("errors.email") },
      values,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: confirmUrl("/nouveau-mot-de-passe"),
  });

  if (isRateLimited(error?.code)) {
    return { status: "error", message: t("errors.rateLimited"), values };
  }

  return { status: "success", message: t("sent", { email: parsed.data }), values };
}

const setPasswordSchema = z
  .object({ password: newPasswordSchema, confirm: z.string() })
  .refine((input) => input.password === input.confirm, { path: ["confirm"] });

export async function setNewPassword(_previous: FormState, formData: FormData): Promise<FormState> {
  const t = await getTranslations("auth.newPassword");
  const tForms = await getTranslations("forms");

  const parsed = setPasswordSchema.safeParse({
    password: textField(formData, "password"),
    confirm: textField(formData, "confirm"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        password: t("errors.password"),
        confirm: t("errors.mismatch"),
      }),
    };
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;
  if (!userId) {
    return { status: "error", message: t("errors.sessionMissing") };
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    const message =
      error.code === "same_password"
        ? t("errors.samePassword")
        : error.code === "weak_password"
          ? t("errors.weakPassword")
          : t("errors.unknown");
    return { status: "error", message };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  redirect(homePathFor(profile?.role ?? "student"));
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/connexion");
}

/**
 * Spends an email link's token_hash, from the « Continuer » button on /connexion/confirmer.
 * Verifying on GET let mail scanners, which open links to inspect them, spend the token
 * before the person could (DECISIONS.md, D-062).
 */
export async function confirmEmailLink(formData: FormData): Promise<void> {
  const tokenHash = formData.get("token_hash");
  const type = emailOtpType.safeParse(formData.get("type"));
  const suite = formData.get("suite");
  if (typeof tokenHash !== "string" || tokenHash === "" || !type.success) {
    redirect("/connexion?erreur=lien");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type: type.data, token_hash: tokenHash });
  if (error) {
    redirect("/connexion?erreur=lien");
  }

  redirect(
    await destinationAfterEmailLink(supabase, type.data, typeof suite === "string" ? suite : null),
  );
}
