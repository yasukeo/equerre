"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError } from "@/lib/form-state";
import { MAX_SESSION_TYPE_NAME_LENGTH } from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { createType, updateType } from "./actions";

type Values = {
  name: string;
  durationMin: string;
  mode: string;
  price: string;
  isActive: boolean;
  isGroup: boolean;
};

const EMPTY: Values = {
  name: "",
  durationMin: "60",
  mode: "chez_prof",
  price: "",
  isActive: true,
  isGroup: false,
};

/** A session type: to create one, or change it. Individual or group is fixed once created. */
export function TypeForm({ id, initial = EMPTY }: { id?: string; initial?: Values }) {
  const t = useTranslations("tutor.sessionTypes");
  const tMode = useTranslations("session.mode");
  const [values, setValues] = useState(initial);
  const [state, action, pending] = useFormAction(
    id ? updateType : createType,
    t("errors.unknown"),
    () => {
      if (!id) setValues(EMPTY);
    },
  );
  const set =
    (key: "name" | "durationMin" | "mode" | "price") => (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));
  const prefix = id ? `type-${id}` : "new-type";

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, {
          ...(id ? { id } : {}),
          name: values.name,
          durationMin: values.durationMin,
          mode: values.mode,
          price: values.price,
          isActive: String(values.isActive),
          isGroup: String(values.isGroup),
        });
      }}
    >
      <Field
        id={`${prefix}-name`}
        label={t("name")}
        autoComplete="off"
        maxLength={MAX_SESSION_TYPE_NAME_LENGTH}
        value={values.name}
        onChange={set("name")}
        error={fieldError(state, "name")}
      />
      <div className="grid gap-3 sm:grid-cols-3 [&>*]:min-w-0">
        <Field
          id={`${prefix}-duration`}
          type="number"
          inputMode="numeric"
          min={15}
          max={480}
          step={15}
          label={t("duration")}
          value={values.durationMin}
          onChange={set("durationMin")}
          error={fieldError(state, "durationMin")}
        />
        <Field
          id={`${prefix}-price`}
          inputMode="decimal"
          autoComplete="off"
          label={t("price")}
          value={values.price}
          onChange={set("price")}
          error={fieldError(state, "price")}
        />
        <SelectField
          id={`${prefix}-mode`}
          label={t("mode")}
          value={values.mode}
          onChange={set("mode")}
          error={fieldError(state, "mode")}
        >
          {(["chez_prof", "domicile", "en_ligne"] as const).map((mode) => (
            <option key={mode} value={mode}>
              {tMode(mode)}
            </option>
          ))}
        </SelectField>
      </div>
      {id ? null : (
        <label className="flex min-h-11 items-start gap-3">
          <input
            type="checkbox"
            checked={values.isGroup}
            onChange={(event) =>
              setValues((current) => ({ ...current, isGroup: event.target.checked }))
            }
            className="mt-1 size-5 accent-encre"
          />
          <span className="grid gap-0.5">
            <span>{t("isGroup")}</span>
            <span className="text-sm text-encre-douce">{t("isGroupHint")}</span>
          </span>
        </label>
      )}
      <label className="flex min-h-11 items-start gap-3">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(event) =>
            setValues((current) => ({ ...current, isActive: event.target.checked }))
          }
          className="mt-1 size-5 accent-encre"
        />
        <span className="grid gap-0.5">
          <span>{t("isActive")}</span>
          <span className="text-sm text-encre-douce">{t("isActiveHint")}</span>
        </span>
      </label>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {id ? (pending ? t("saving") : t("save")) : pending ? t("creating") : t("create")}
      </Button>
    </form>
  );
}
