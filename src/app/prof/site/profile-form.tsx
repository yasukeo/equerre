"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError } from "@/lib/form-state";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { saveSiteProfile } from "./actions";

type Values = { tagline: string; bio: string; city: string; areas: string; whatsapp: string };

/** Her presentation on the public site: what parents read before they write to her. */
export function ProfileForm({ initial }: { initial: Values }) {
  const t = useTranslations("siteAdmin");
  const [values, setValues] = useState(initial);
  const [state, action, pending] = useFormAction(saveSiteProfile, t("errors.unknown"));
  const set = (key: keyof Values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, values);
      }}
    >
      <Field
        id="site-tagline"
        label={t("tagline")}
        hint={t("taglineHint")}
        maxLength={160}
        autoComplete="off"
        value={values.tagline}
        onChange={set("tagline")}
        error={fieldError(state, "tagline")}
      />
      <TextareaField
        id="site-bio"
        label={t("bio")}
        hint={t("bioHint")}
        rows={6}
        maxLength={1500}
        value={values.bio}
        onChange={set("bio")}
        error={fieldError(state, "bio")}
      />
      <Field
        id="site-city"
        label={t("city")}
        maxLength={80}
        autoComplete="address-level2"
        value={values.city}
        onChange={set("city")}
        error={fieldError(state, "city")}
      />
      <Field
        id="site-whatsapp"
        type="tel"
        inputMode="tel"
        label={t("whatsapp")}
        hint={t("whatsappHint")}
        autoComplete="tel"
        value={values.whatsapp}
        onChange={set("whatsapp")}
        error={fieldError(state, "whatsapp")}
      />
      <Field
        id="site-areas"
        label={t("areas")}
        hint={t("areasHint")}
        maxLength={200}
        autoComplete="off"
        value={values.areas}
        onChange={set("areas")}
        error={fieldError(state, "areas")}
      />
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("saving") : t("save")}
      </Button>
    </form>
  );
}
