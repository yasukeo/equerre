"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { requestPasswordReset } from "../actions";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [state, action, pending] = useActionState(requestPasswordReset, initialFormState);

  return (
    <form action={action} className="mt-6 grid gap-4" noValidate>
      <Field
        id="reset-email"
        name="email"
        type="email"
        label={t("common.email")}
        autoComplete="email"
        inputMode="email"
        required
        defaultValue={submittedValue(state, "email")}
        error={fieldError(state, "email")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending}>
        {pending ? t("forgotPassword.submitting") : t("forgotPassword.submit")}
      </Button>
    </form>
  );
}
