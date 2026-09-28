"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError } from "@/lib/form-state";
import { MAX_PLAN_NAME_LENGTH } from "@/lib/payments/limits";
import type { PlanKind, PlanScope } from "@/lib/payments/queries";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { createPlan, updatePlan } from "../actions";

type Values = {
  kind: PlanKind;
  name: string;
  price: string;
  hours: string;
  months: string;
  scope: PlanScope;
  isActive: boolean;
};

const EMPTY: Values = {
  kind: "hour_pack",
  name: "",
  price: "",
  hours: "10",
  months: "1",
  scope: "tous",
  isActive: true,
};

/** A plan: to create one, or change it. Pack or subscription is fixed once created. */
export function PlanForm({ id, initial = EMPTY }: { id?: string; initial?: Values }) {
  const t = useTranslations("plans");
  const tKind = useTranslations("payments.kind");
  const [values, setValues] = useState(initial);
  const [state, action, pending] = useFormAction(
    id ? updatePlan : createPlan,
    t("errors.unknown"),
    () => {
      if (!id) setValues(EMPTY);
    },
  );
  const set =
    (key: "name" | "price" | "hours" | "months" | "scope") =>
    (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));
  const prefix = id ? `plan-${id}` : "new-plan";
  const pack = values.kind === "hour_pack";

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, {
          ...(id ? { id } : {}),
          kind: values.kind,
          name: values.name,
          price: values.price,
          hours: values.hours,
          months: values.months,
          scope: values.scope,
          isActive: String(values.isActive),
        });
      }}
    >
      {id ? null : (
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">{t("kind")}</legend>
          <div className="flex flex-wrap gap-x-6">
            {(["hour_pack", "subscription"] as const).map((kind) => (
              <label key={kind} className="flex min-h-11 items-center gap-2">
                <input
                  type="radio"
                  name={`${prefix}-kind`}
                  value={kind}
                  checked={values.kind === kind}
                  onChange={() => setValues((current) => ({ ...current, kind }))}
                  className="size-5 accent-encre"
                />
                {tKind(kind)}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <Field
        id={`${prefix}-name`}
        label={t("name")}
        autoComplete="off"
        maxLength={MAX_PLAN_NAME_LENGTH}
        value={values.name}
        onChange={set("name")}
        error={fieldError(state, "name")}
      />
      <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
        <Field
          id={`${prefix}-price`}
          inputMode="decimal"
          autoComplete="off"
          label={t("price")}
          value={values.price}
          onChange={set("price")}
          error={fieldError(state, "price")}
        />
        {pack ? (
          <Field
            id={`${prefix}-hours`}
            inputMode="decimal"
            autoComplete="off"
            label={t("hours")}
            value={values.hours}
            onChange={set("hours")}
            error={fieldError(state, "hours")}
          />
        ) : (
          <Field
            id={`${prefix}-months`}
            type="number"
            inputMode="numeric"
            min={1}
            max={12}
            label={t("months")}
            value={values.months}
            onChange={set("months")}
            error={fieldError(state, "months")}
          />
        )}
      </div>
      {pack ? null : (
        <SelectField
          id={`${prefix}-scope`}
          label={t("scope")}
          value={values.scope}
          onChange={set("scope")}
          error={fieldError(state, "scope")}
        >
          {(["tous", "groupe", "individuel"] as const).map((scope) => (
            <option key={scope} value={scope}>
              {t(`scopeOption.${scope}`)}
            </option>
          ))}
        </SelectField>
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
