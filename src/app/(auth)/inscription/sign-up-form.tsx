"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { signUp } from "../actions";

export function SignUpForm() {
  const t = useTranslations("auth");
  const [state, action, pending] = useActionState(signUp, initialFormState);

  if (state.status === "success") {
    return (
      <div className="mt-6">
        <FormMessage state={state} />
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 grid gap-4" noValidate>
      <Field
        id="signup-code"
        name="inviteCode"
        label={t("signUp.inviteCode")}
        hint={t("signUp.inviteCodeHint")}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={8}
        required
        className="[&_input]:font-medium [&_input]:tracking-[0.2em] [&_input]:uppercase"
        defaultValue={submittedValue(state, "inviteCode")}
        error={fieldError(state, "inviteCode")}
      />
      <Field
        id="signup-name"
        name="fullName"
        label={t("signUp.fullName")}
        autoComplete="name"
        required
        defaultValue={submittedValue(state, "fullName")}
        error={fieldError(state, "fullName")}
      />
      <Field
        id="signup-email"
        name="email"
        type="email"
        label={t("common.email")}
        autoComplete="email"
        inputMode="email"
        required
        defaultValue={submittedValue(state, "email")}
        error={fieldError(state, "email")}
      />
      <Field
        id="signup-password"
        name="password"
        type="password"
        label={t("common.password")}
        hint={t("signUp.passwordHint")}
        autoComplete="new-password"
        minLength={8}
        required
        error={fieldError(state, "password")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending}>
        {pending ? t("signUp.submitting") : t("signUp.submit")}
      </Button>
    </form>
  );
}
