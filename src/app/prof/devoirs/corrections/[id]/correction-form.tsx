"use client";

import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { MAX_FEEDBACK_LENGTH } from "@/lib/correction/correction";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import { cn } from "@/lib/utils";
import { saveCorrection } from "../actions";

/** The grade out of 20 and a word for the student; the first save marks the copy corrected. */
export function CorrectionForm({
  id,
  submittedAt,
  submittedAtLabel,
  corrected,
  grade,
  feedback,
  nextHref,
}: {
  id: string;
  /** The copy's latest version, as the page last read it. */
  submittedAt: string;
  /** The same moment, written for her. */
  submittedAtLabel: string;
  corrected: boolean;
  grade: string;
  feedback: string;
  nextHref: string | null;
}) {
  const t = useTranslations("tutor.correction");
  const [gradeValue, setGrade] = useState(grade);
  const [feedbackValue, setFeedback] = useState(feedback);
  // The version she is correcting. A remark she adds reloads the page with the copy's latest
  // version, so this is held here and moves on only when she says she has read the new one:
  // otherwise a grade could land, unchecked, on pages she never saw (D-047).
  const [seen, setSeen] = useState(submittedAt);
  const newer = submittedAt !== seen;
  const [state, action, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        return await saveCorrection(previous, formData);
      } catch (error) {
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.set("id", id);
        formData.set("submittedAt", seen);
        formData.set("grade", gradeValue);
        formData.set("feedback", feedbackValue);
        startTransition(() => action(formData));
      }}
    >
      {newer ? (
        <div
          role="alert"
          className="grid gap-2 rounded-md border border-stylo-rouge/40 bg-lavis-rouge px-3 py-2.5 text-sm"
        >
          <p>{t("newVersion", { date: submittedAtLabel })}</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="justify-self-start"
            onClick={() => setSeen(submittedAt)}
          >
            {t("newVersionRead")}
          </Button>
        </div>
      ) : null}
      <Field
        id="correction-grade"
        label={t("grade")}
        hint={t("gradeHint")}
        inputMode="decimal"
        autoComplete="off"
        value={gradeValue}
        onChange={(event) => setGrade(event.target.value)}
        error={fieldError(state, "grade")}
        className="max-w-48"
      />
      <TextareaField
        id="correction-feedback"
        label={t("feedback")}
        hint={t("feedbackHint")}
        rows={5}
        maxLength={MAX_FEEDBACK_LENGTH}
        value={feedbackValue}
        onChange={(event) => setFeedback(event.target.value)}
        error={fieldError(state, "feedback")}
      />
      <FormMessage state={state}>
        {state.status === "success" && nextHref ? (
          <Link
            href={nextHref}
            className={cn(buttonVariants({ size: "sm" }), "justify-self-start")}
          >
            {t("next")}
          </Link>
        ) : null}
      </FormMessage>
      <Button type="submit" size="lg" disabled={pending} className="justify-self-start">
        {pending ? t("saving") : corrected ? t("save") : t("markCorrected")}
      </Button>
    </form>
  );
}
