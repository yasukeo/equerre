"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { ContactFields } from "@/components/contact-fields";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { signUp } from "../actions";

export function SignUpForm() {
  const t = useTranslations("auth");
  const tContact = useTranslations("contact");
  const [state, action, pending] = useActionState(signUp, initialFormState);
  const resultRef = useRef<HTMLDivElement>(null);
  const succeeded = state.status === "success";

  // On success the fields go away; move focus to the result so keyboard and screen-reader
  // users land on what happened instead of on the page body.
  useEffect(() => {
    if (succeeded) {
      resultRef.current?.focus();
    }
  }, [succeeded]);

  // The result region stays at the same place in the tree in every state, so its live
  // announcement isn't lost when the form is removed.
  return (
    <div className="mt-6 grid gap-4">
      {succeeded ? null : (
        <form id="signup-form" action={action} className="grid gap-4" noValidate>
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
          <ContactFields
            idPrefix="signup"
            heading={tContact("selfHeading")}
            state={state}
            labels={{
              phone: tContact("phone"),
              phoneHint: tContact("phoneHint"),
              school: tContact("school"),
              guardianName: tContact("guardianName"),
              guardianPhone: tContact("guardianPhone"),
            }}
          />
        </form>
      )}

      <div ref={resultRef} tabIndex={-1} className="rounded-md">
        <FormMessage state={state} />
      </div>

      {succeeded ? null : (
        <Button type="submit" form="signup-form" disabled={pending}>
          {pending ? t("signUp.submitting") : t("signUp.submit")}
        </Button>
      )}
    </div>
  );
}
