"use client";

import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import { MAX_OBJECTIVES_LENGTH } from "@/lib/students/limits";
import { updateStudent } from "./actions";

type Status = "actif" | "en_pause" | "arrete";
const STATUSES: Status[] = ["actif", "en_pause", "arrete"];

type Values = {
  fullName: string;
  levelCode: string;
  status: Status;
  phone: string;
  school: string;
  guardianName: string;
  guardianPhone: string;
  objectives: string;
  autoConfirm: boolean;
};

/** Her file as the tutor keeps it: identity, level, standing, contacts, objectives. */
export function StudentForm({
  id,
  levels,
  initial,
}: {
  id: string;
  levels: { code: string; label: string }[];
  initial: Values;
}) {
  const t = useTranslations("tutor.student");
  const tStatus = useTranslations("studentStatus");
  const [values, setValues] = useState(initial);
  const [state, action, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        return await updateStudent(previous, formData);
      } catch (error) {
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );
  const set =
    (key: Exclude<keyof Values, "autoConfirm">) => (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.set("id", id);
        for (const [key, value] of Object.entries(values)) formData.set(key, String(value));
        startTransition(() => action(formData));
      }}
    >
      <Field
        id="student-name"
        label={t("fullName")}
        autoComplete="off"
        value={values.fullName}
        onChange={set("fullName")}
        error={fieldError(state, "fullName")}
      />
      <SelectField
        id="student-level"
        label={t("level")}
        value={values.levelCode}
        onChange={set("levelCode")}
        error={fieldError(state, "levelCode")}
      >
        {values.levelCode === "" ? <option value="">—</option> : null}
        {levels.map((level) => (
          <option key={level.code} value={level.code}>
            {level.label}
          </option>
        ))}
      </SelectField>
      <SelectField
        id="student-status"
        label={t("status")}
        // What the chosen standing leaves her, read out with the field (D-060).
        hint={t(`statusHelp.${values.status}`)}
        value={values.status}
        onChange={set("status")}
        error={fieldError(state, "status")}
      >
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {tStatus(status)}
          </option>
        ))}
      </SelectField>
      <Field
        id="student-phone"
        label={t("phone")}
        type="tel"
        autoComplete="off"
        value={values.phone}
        onChange={set("phone")}
        error={fieldError(state, "phone")}
      />
      <Field
        id="student-school"
        label={t("school")}
        autoComplete="off"
        value={values.school}
        onChange={set("school")}
        error={fieldError(state, "school")}
      />
      <Field
        id="student-guardian"
        label={t("guardianName")}
        autoComplete="off"
        value={values.guardianName}
        onChange={set("guardianName")}
        error={fieldError(state, "guardianName")}
      />
      <Field
        id="student-guardian-phone"
        label={t("guardianPhone")}
        type="tel"
        autoComplete="off"
        value={values.guardianPhone}
        onChange={set("guardianPhone")}
        error={fieldError(state, "guardianPhone")}
      />
      <TextareaField
        id="student-objectives"
        label={t("objectives")}
        hint={t("objectivesHint")}
        rows={4}
        maxLength={MAX_OBJECTIVES_LENGTH}
        value={values.objectives}
        onChange={set("objectives")}
        error={fieldError(state, "objectives")}
      />
      <label className="flex min-h-11 items-start gap-3">
        <input
          type="checkbox"
          checked={values.autoConfirm}
          onChange={(event) =>
            setValues((current) => ({ ...current, autoConfirm: event.target.checked }))
          }
          className="mt-1 size-5 accent-encre"
        />
        <span className="grid gap-0.5">
          <span>{t("autoConfirm")}</span>
          <span className="text-sm text-encre-douce">{t("autoConfirmHint")}</span>
        </span>
      </label>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? t("saving") : t("save")}
      </Button>
    </form>
  );
}
