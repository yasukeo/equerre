"use client";

import { useTranslations } from "next-intl";
import { useActionState, useId } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Input, Label } from "@/components/ui/input";
import { initialFormState, submittedValue } from "@/lib/form-state";
import { saveExamDates } from "./actions";

/** When each exam begins: her students count down to it and plan their revision on it. */
export function ExamDatesForm({
  programmes,
  indicative,
}: {
  programmes: { code: string; label: string; date: string }[];
  /** What a student sees without a date: « Sans date : 7 juin 2027 (indicative) ». */
  indicative: string;
}) {
  const t = useTranslations("tutor.exams.dates");
  const [state, action, pending] = useActionState(saveExamDates, initialFormState);
  const hintId = useId();
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <form action={action} className="grid gap-4" aria-describedby={hintId}>
      <p id={hintId} className="text-sm text-encre-douce">
        {t("hint")}
      </p>
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((programme) => {
          const name = `date-${programme.code}`;
          const value = submittedValue(state, name) ?? programme.date;
          const error = errors[name];
          return (
            // Label above, field at the bottom: fields line up even when a label wraps.
            <div key={programme.code} className="grid grid-rows-[1fr_auto_auto] gap-1.5">
              <Label htmlFor={name} className="self-end">
                {programme.label}
              </Label>
              <Input
                id={name}
                name={name}
                type="date"
                defaultValue={value}
                aria-invalid={error ? true : undefined}
                aria-describedby={`${name}-note`}
              />
              <p
                id={`${name}-note`}
                className={error ? "text-sm text-stylo-rouge" : "text-xs text-encre-douce"}
              >
                {error ?? (value === "" ? indicative : " ")}
              </p>
            </div>
          );
        })}
      </div>
      <Button type="submit" variant="outline" disabled={pending} className="justify-self-start">
        {t("save")}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
