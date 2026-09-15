"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { initialFormState, submittedValue } from "@/lib/form-state";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { sendMagicLink, signInWithPassword } from "../actions";

/** Where to go after signing in, read from `?suite=`. Only this input waits for the URL. */
function RedirectTarget() {
  const searchParams = useSearchParams();
  return (
    <input type="hidden" name="suite" value={safeRedirectPath(searchParams.get("suite"), "")} />
  );
}

function LinkExpiredAlert() {
  const t = useTranslations("auth.signIn.errors");
  const searchParams = useSearchParams();
  if (searchParams.get("erreur") !== "lien") {
    return null;
  }
  return (
    <p
      role="alert"
      className="rounded-md border border-stylo-rouge/40 bg-lavis-rouge px-3 py-2.5 text-sm text-stylo-rouge"
    >
      {t("linkExpired")}
    </p>
  );
}

export function SignInForms() {
  const t = useTranslations("auth");
  const [passwordState, passwordAction, passwordPending] = useActionState(
    signInWithPassword,
    initialFormState,
  );
  const [linkState, linkAction, linkPending] = useActionState(sendMagicLink, initialFormState);

  return (
    <div className="mt-6 grid gap-8">
      <Suspense fallback={null}>
        <LinkExpiredAlert />
      </Suspense>

      <form action={passwordAction} className="grid gap-4" noValidate>
        <Suspense fallback={null}>
          <RedirectTarget />
        </Suspense>
        <Field
          id="signin-email"
          name="email"
          type="email"
          label={t("common.email")}
          autoComplete="email"
          inputMode="email"
          required
          defaultValue={submittedValue(passwordState, "email")}
        />
        <div className="grid gap-1">
          <Field
            id="signin-password"
            name="password"
            type="password"
            label={t("common.password")}
            autoComplete="current-password"
            required
          />
          <Link
            href="/mot-de-passe-oublie"
            className="inline-flex min-h-11 items-center justify-self-end text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("signIn.forgotPassword")}
          </Link>
        </div>
        <FormMessage state={passwordState} />
        <Button type="submit" disabled={passwordPending}>
          {passwordPending ? t("signIn.submitting") : t("signIn.submit")}
        </Button>
      </form>

      <section
        aria-labelledby="magic-link-title"
        className="grid gap-4 border-t border-quadrillage pt-6"
      >
        <div>
          <h2 id="magic-link-title" className="font-medium">
            {t("signIn.magicLinkTitle")}
          </h2>
          <p className="text-sm text-encre-douce">{t("signIn.magicLinkHint")}</p>
        </div>
        <form action={linkAction} className="grid gap-4" noValidate>
          <Suspense fallback={null}>
            <RedirectTarget />
          </Suspense>
          <Field
            id="magic-link-email"
            name="email"
            type="email"
            label={t("common.email")}
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={submittedValue(linkState, "email")}
          />
          <FormMessage state={linkState} />
          <Button type="submit" variant="outline" disabled={linkPending}>
            {linkPending ? t("signIn.magicLinkSubmitting") : t("signIn.magicLinkSubmit")}
          </Button>
        </form>
      </section>
    </div>
  );
}
