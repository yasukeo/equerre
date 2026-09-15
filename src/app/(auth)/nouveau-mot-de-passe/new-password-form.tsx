"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState } from "@/lib/form-state";
import { setNewPassword } from "../actions";

export function NewPasswordForm() {
  const t = useTranslations("auth.newPassword");
  const tSignUp = useTranslations("auth.signUp");
  const [state, action, pending] = useActionState(setNewPassword, initialFormState);

  return (
    <form action={action} className="mt-6 grid gap-4" noValidate>
      <Field
        id="new-password"
        name="password"
        type="password"
        label={t("password")}
        hint={tSignUp("passwordHint")}
        autoComplete="new-password"
        minLength={8}
        required
        error={fieldError(state, "password")}
      />
      <Field
        id="new-password-confirm"
        name="confirm"
        type="password"
        label={t("confirm")}
        autoComplete="new-password"
        required
        error={fieldError(state, "confirm")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending}>
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
