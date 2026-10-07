"use client";

import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { parseDecimal } from "@/lib/decimal";
import type { Choice, ChoiceMode } from "@/lib/exercise/exercise";
import { initialFormState, type FormState } from "@/lib/form-state";
import { renderMathText } from "@/lib/lesson/math-text";
import { revealSolution, submitAnswer } from "../../actions";

type Target = { assignmentId: string; exerciseId: string };

/**
 * A server action run from a controlled form. A failed request (a new deployment, no network)
 * becomes a message instead of reaching the error boundary with the student's answer.
 */
function useStudentAction(
  action: (previous: FormState, formData: FormData) => Promise<FormState>,
  failed: string,
) {
  return useActionState(async (previous: FormState, formData: FormData): Promise<FormState> => {
    try {
      return await action(previous, formData);
    } catch (error) {
      unstable_rethrow(error);
      return { status: "error", message: failed };
    }
  }, initialFormState);
}

function dispatch(
  action: (formData: FormData) => void,
  target: Target,
  fields: Record<string, string>,
) {
  const formData = new FormData();
  formData.set("assignmentId", target.assignmentId);
  formData.set("exerciseId", target.exerciseId);
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  startTransition(() => action(formData));
}

// ─────────────────────────────────────────────────────────────── a number

export function NumericAnswer(target: Target) {
  const t = useTranslations("student.homework");
  const [value, setValue] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [state, action, pending] = useStudentAction(submitAnswer, t("errors.unknown"));
  const error = localError ?? (state.status === "error" ? state.message : undefined);

  return (
    <form
      className="grid gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        // Read here as the grading will read it, so a typo is caught before it costs a grade.
        if (value.trim() === "") return setLocalError(t("errors.answerRequired"));
        if (parseDecimal(value) === null) return setLocalError(t("errors.number"));
        setLocalError(null);
        dispatch(action, target, { kind: "numeric", value });
      }}
    >
      <Field
        id="answer-numeric"
        label={t("numeric.label")}
        hint={t("numeric.hint")}
        // The full keyboard: a phone's decimal pad has no minus sign.
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setLocalError(null);
        }}
        error={error}
        className="max-w-xs"
      />
      <Button type="submit" size="lg" disabled={pending} className="justify-self-start">
        {pending ? t("numeric.sending") : t("numeric.submit")}
      </Button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────── multiple choice

export function ChoiceAnswer({
  choices,
  mode,
  ...target
}: Target & { choices: Choice[]; mode: ChoiceMode }) {
  const t = useTranslations("student.homework");
  const [picked, setPicked] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);
  const [state, action, pending] = useStudentAction(submitAnswer, t("errors.unknown"));
  const error = localError ?? (state.status === "error" ? state.message : null);
  // Radio buttons or checkboxes, as the tutor chose: never read off how many are right.
  const radios = mode === "unique";

  return (
    <form
      className="grid gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (picked.length === 0) return setLocalError(t("errors.answerRequired"));
        setLocalError(null);
        dispatch(action, target, { kind: "mcq", choiceIds: JSON.stringify(picked) });
      }}
    >
      <fieldset
        className="grid gap-2"
        aria-describedby={error ? "answer-choices-error" : undefined}
      >
        <legend className="mb-1 text-sm font-medium">
          {radios ? t("mcq.unique") : t("mcq.multiple")}
        </legend>
        {choices.map((choice) => (
          <label
            key={choice.id}
            className="flex min-h-11 items-center gap-3 rounded-md border border-quadrillage px-3 py-2 has-[:checked]:border-stylo-bleu has-[:checked]:bg-lavis-bleu"
          >
            <input
              type={radios ? "radio" : "checkbox"}
              name="answer-choice"
              value={choice.id}
              checked={picked.includes(choice.id)}
              onChange={(event) => {
                setLocalError(null);
                setPicked((current) =>
                  radios
                    ? [choice.id]
                    : event.target.checked
                      ? [...current, choice.id]
                      : current.filter((id) => id !== choice.id),
                );
              }}
              className="size-4 shrink-0 accent-stylo-bleu"
            />
            <span className="lecon-corps text-base">{renderMathText(choice.label)}</span>
          </label>
        ))}
      </fieldset>
      {/* Announced by the answer's live region on the exercise page. */}
      {error ? (
        <p id="answer-choices-error" className="text-sm text-stylo-rouge">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending} className="justify-self-start">
        {pending ? t("mcq.sending") : t("mcq.submit")}
      </Button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────── the solution, on request

/** Opening the solution forfeits the exercise, here and in any other homework (D-046). */
export function RevealSolution(target: Target) {
  const t = useTranslations("student.homework");
  const [state, action, pending] = useStudentAction(revealSolution, t("errors.unknown"));
  const [confirming, setConfirming] = useState(false);
  // The button pressed disappears in both directions, which would leave focus on <body>.
  const toggled = useRef(false);
  const startRef = useRef<HTMLButtonElement>(null);
  const warningRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!toggled.current) return;
    (confirming ? warningRef.current : startRef.current)?.focus();
  }, [confirming]);
  const toggle = (next: boolean) => {
    toggled.current = true;
    setConfirming(next);
  };

  return (
    <section
      aria-labelledby="reveal-title"
      className="grid gap-3 rounded-2xl border border-dashed border-trait p-4 sm:p-5"
    >
      <h2 id="reveal-title" className="text-sm font-semibold">
        {t("reveal.title")}
      </h2>
      {confirming ? (
        <div className="grid gap-3">
          <p ref={warningRef} tabIndex={-1} className="text-sm">
            {t("reveal.warning")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => dispatch(action, target, {})}
            >
              {t("reveal.confirm")}
            </Button>
            {/* Once sent, the solution is opened whatever she presses: no going back. */}
            <Button type="button" variant="ghost" disabled={pending} onClick={() => toggle(false)}>
              {t("reveal.cancel")}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          ref={startRef}
          type="button"
          variant="outline"
          className="justify-self-start"
          onClick={() => toggle(true)}
        >
          {t("reveal.start")}
        </Button>
      )}
      <FormMessage state={state.status === "error" ? state : initialFormState} />
    </section>
  );
}
