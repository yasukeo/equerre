"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { fieldError, initialFormState, submittedValue } from "@/lib/form-state";
import { DOCUMENT_KINDS } from "@/lib/lesson/kinds";
import { createLesson } from "../actions";

type Props = {
  levels: { label: string; chapters: { id: string; title: string }[] }[];
};

export function NewLessonForm({ levels }: Props) {
  const t = useTranslations("tutor.newLesson");
  const [state, action, pending] = useActionState(createLesson, initialFormState);
  const submittedChapter = submittedValue(state, "chapterId") ?? "";
  const submittedKind = submittedValue(state, "kind") ?? "cours";
  const tKind = useTranslations("documentKind");

  return (
    <form action={action} className="grid gap-4" noValidate>
      {/* Keyed so React's post-action form reset keeps the submitted choice. */}
      <SelectField
        key={`chapter-${submittedChapter}`}
        id="lesson-chapter"
        name="chapterId"
        label={t("chapter")}
        defaultValue={submittedChapter}
        error={fieldError(state, "chapterId")}
        required
      >
        <option value="" disabled>
          {t("chapterPlaceholder")}
        </option>
        {levels.map((level) => (
          <optgroup key={level.label} label={level.label}>
            {level.chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </optgroup>
        ))}
      </SelectField>
      <SelectField
        key={`kind-${submittedKind}`}
        id="lesson-kind"
        name="kind"
        label={t("kind")}
        hint={t("kindHint")}
        defaultValue={submittedKind}
        error={fieldError(state, "kind")}
      >
        {DOCUMENT_KINDS.map((kind) => (
          <option key={kind} value={kind}>
            {tKind(`one.${kind}`)}
          </option>
        ))}
      </SelectField>
      <Field
        id="lesson-title"
        name="title"
        label={t("lessonTitle")}
        hint={t("lessonTitleHint")}
        maxLength={160}
        defaultValue={submittedValue(state, "title") ?? ""}
        error={fieldError(state, "title")}
        required
      />
      <FormMessage state={state} />
      <Button type="submit" size="lg" disabled={pending} className="justify-self-start">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
