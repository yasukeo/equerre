"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { saveSelfScore } from "@/app/eleve/examens/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form-message";
import { initialFormState, submittedValue } from "@/lib/form-state";

/** Her own mark out of 20, given with the correction open: it feeds her progress page. */
export function SelfScoreForm({ attemptId, score }: { attemptId: string; score: number | null }) {
  const t = useTranslations("student.exam");
  const [state, action, pending] = useActionState(saveSelfScore, initialFormState);
  const value =
    submittedValue(state, "score") ?? (score === null ? "" : String(score).replace(".", ","));

  return (
    <form action={action} className="grid gap-3">
      <input type="hidden" name="attemptId" value={attemptId} />
      <div className="grid gap-1.5">
        <Label htmlFor={`score-${attemptId}`}>{t("scoreLabel")}</Label>
        <p id={`score-${attemptId}-hint`} className="text-sm text-encre-douce">
          {t("scoreHint")}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2">
            <Input
              id={`score-${attemptId}`}
              name="score"
              inputMode="decimal"
              defaultValue={value}
              key={value}
              aria-describedby={`score-${attemptId}-hint`}
              aria-invalid={state.status === "error" || undefined}
              className="w-24 text-center text-lg tabular"
            />
            <span className="text-lg text-encre-douce">/ 20</span>
          </span>
          <Button type="submit" disabled={pending}>
            {t("saveScore")}
          </Button>
        </div>
      </div>
      <FormMessage state={state} />
    </form>
  );
}
