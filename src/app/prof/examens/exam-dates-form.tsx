"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Input, Label } from "@/components/ui/input";
import { initialFormState, submittedValue } from "@/lib/form-state";
import { saveExamDates } from "./actions";

/** When each exam begins: her students count down to it and plan their revision on it. */
export function ExamDatesForm({
  programmes,
}: {
  programmes: { code: string; label: string; date: string }[];
}) {
  const t = useTranslations("tutor.exams.dates");
  const [state, action, pending] = useActionState(saveExamDates, initialFormState);

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((programme) => {
          const name = `date-${programme.code}`;
          return (
            <div key={programme.code} className="grid gap-1.5">
              <Label htmlFor={name}>{programme.label}</Label>
              <Input
                id={name}
                name={name}
                type="date"
                defaultValue={submittedValue(state, name) ?? programme.date}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="outline" disabled={pending}>
          {t("save")}
        </Button>
        <p className="text-sm text-encre-douce">{t("hint")}</p>
      </div>
      <FormMessage state={state} />
    </form>
  );
}
