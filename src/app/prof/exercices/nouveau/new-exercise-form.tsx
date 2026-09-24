"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { ChapterSelect } from "@/components/chapter-select";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import type { ChapterOptions } from "@/lib/chapters";
import { ANSWER_TYPES } from "@/lib/exercise/exercise";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { createExercise } from "../actions";

export function NewExerciseForm({ levels }: { levels: ChapterOptions }) {
  const t = useTranslations("tutor.newExercise");
  const tTypes = useTranslations("tutor.exercises.answerType");
  const [state, action, pending] = useActionState(createExercise, initialFormState);
  const submittedChapter = submittedValue(state, "chapterId") ?? "";
  const submittedType = submittedValue(state, "answerType") ?? "upload";
  const typeError = fieldError(state, "answerType");

  return (
    <form action={action} className="grid gap-4" noValidate>
      {/* Keyed so React's post-action form reset keeps the submitted choice. */}
      <ChapterSelect
        key={`chapter-${submittedChapter}`}
        id="exercise-chapter"
        name="chapterId"
        label={t("chapter")}
        placeholder={t("chapterPlaceholder")}
        levels={levels}
        defaultValue={submittedChapter}
        error={fieldError(state, "chapterId")}
        required
      />
      <Field
        id="exercise-title"
        name="title"
        label={t("exerciseTitle")}
        maxLength={160}
        defaultValue={submittedValue(state, "title") ?? ""}
        error={fieldError(state, "title")}
        required
      />
      <fieldset
        key={`type-${submittedType}`}
        className="grid gap-2"
        aria-describedby={typeError ? "exercise-type-error" : "exercise-type-hint"}
      >
        <legend className="text-sm font-medium">{t("answerType")}</legend>
        <p id="exercise-type-hint" className="text-sm text-encre-douce">
          {t("answerTypeHint")}
        </p>
        {ANSWER_TYPES.map((type) => (
          <label key={type} className="flex min-h-11 items-start gap-3 py-1">
            <input
              type="radio"
              name="answerType"
              value={type}
              defaultChecked={submittedType === type}
              className="mt-1 size-4 accent-stylo-bleu"
            />
            <span className="grid">
              <span className="font-medium">{tTypes(type)}</span>
              <span className="text-sm text-encre-douce">{t(`answerTypeDetail.${type}`)}</span>
            </span>
          </label>
        ))}
        {typeError ? (
          <p id="exercise-type-error" className="text-sm text-stylo-rouge">
            {typeError}
          </p>
        ) : null}
      </fieldset>
      <FormMessage state={state} />
      <Button type="submit" size="lg" disabled={pending} className="justify-self-start">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
