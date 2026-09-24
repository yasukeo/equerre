"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChapterSelect } from "@/components/chapter-select";
import { DocumentEditor } from "@/components/editor/document-editor";
import { AnswerTypeChip, IncompleteChip } from "@/components/exercise-status";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import type { ChapterOptions } from "@/lib/chapters";
import { formatDecimal, movePoint, parseDecimal } from "@/lib/decimal";
import {
  acceptedRange,
  ANSWER_TYPES,
  DIFFICULTIES,
  isDocumentEmpty,
  isReady,
  MAX_CHOICES,
  MIN_CHOICES,
  newChoiceId,
  readiness,
  type AnswerType,
  type Choice,
  type ChoiceMode,
  type ToleranceKind,
} from "@/lib/exercise/exercise";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import type { CalloutKind, StoredLesson } from "@/lib/lesson/document";
import { renderMathText } from "@/lib/lesson/math-text";
import { deleteExercise, saveExercise } from "../actions";

type Props = {
  calloutLabels: Record<CalloutKind, string>;
  levels: ChapterOptions;
  exercise: {
    id: string;
    title: string;
    chapterId: string;
    context: string;
    difficulty: number;
    tags: string[];
    answerType: AnswerType;
    choices: Choice[];
    choiceMode: ChoiceMode;
    statement: StoredLesson;
    solution: StoredLesson;
    /** Decimal text as Postgres wrote it, or null when none was written. */
    correctNumeric: string | null;
    /** A fraction when relative, as the grading function reads it. */
    tolerance: string | null;
    toleranceKind: ToleranceKind;
    correctChoiceIds: string[];
    /** Students who answered it or asked for its solution. */
    answered: number;
    /** Given as homework at least once: it can no longer be deleted. */
    assigned: boolean;
  };
};

type Fields = {
  title: string;
  chapterId: string;
  difficulty: string;
  tags: string;
  answerType: AnswerType;
  correctNumeric: string;
  tolerance: string;
  toleranceKind: ToleranceKind;
  choiceMode: ChoiceMode;
  choices: Choice[];
  correctChoiceIds: string[];
};

function fieldsOf(exercise: Props["exercise"]): Fields {
  const tolerance =
    exercise.tolerance === null
      ? ""
      : exercise.toleranceKind === "relative"
        ? movePoint(exercise.tolerance, 2)
        : exercise.tolerance;
  return {
    title: exercise.title,
    chapterId: exercise.chapterId,
    difficulty: String(exercise.difficulty),
    tags: exercise.tags.join(", "),
    answerType: exercise.answerType,
    correctNumeric: exercise.correctNumeric === null ? "" : formatDecimal(exercise.correctNumeric),
    tolerance: tolerance === "" ? "" : formatDecimal(movePoint(tolerance, 0)),
    toleranceKind: exercise.toleranceKind,
    choiceMode: exercise.choiceMode,
    // A new question starts with two empty choices to fill in.
    choices: exercise.choices.length
      ? exercise.choices
      : [
          { id: newChoiceId(), label: "" },
          { id: newChoiceId(), label: "" },
        ],
    correctChoiceIds: exercise.correctChoiceIds,
  };
}

function snapshotOf(fields: Fields, statement: string, solution: string) {
  return JSON.stringify([fields, statement, solution]);
}

/** « 2e bac Sciences physiques · Limites et continuité », for the chapter last saved. */
function contextOf(levels: ChapterOptions, chapterId: string): string | null {
  for (const level of levels) {
    const chapter = level.chapters.find((candidate) => candidate.id === chapterId);
    if (chapter) return `${level.label} · ${chapter.title}`;
  }
  return null;
}

export function ExerciseEditor({ calloutLabels, levels, exercise }: Props) {
  const t = useTranslations("tutor.exerciseEditor");
  const tTypes = useTranslations("tutor.exercises.answerType");
  const tEditor = useTranslations("editor");

  const [initial] = useState(() => fieldsOf(exercise));
  const [fields, setFields] = useState(initial);
  const [statement, setStatement] = useState("");
  const [solution, setSolution] = useState("");
  const set = <K extends keyof Fields>(key: K, value: Fields[K]) =>
    setFields((current) => ({ ...current, [key]: value }));

  // The exercise as last saved, in the editors' own form. Both documents come back from jsonb
  // with their keys reordered, so the baseline waits for each editor to write its own.
  const [baselineDocs, setBaselineDocs] = useState<{ statement?: string; solution?: string }>({});
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);
  const ready = baselineDocs.statement !== undefined && baselineDocs.solution !== undefined;
  const reference =
    savedSnapshot ??
    (ready ? snapshotOf(initial, baselineDocs.statement ?? "", baselineDocs.solution ?? "") : null);
  const snapshot = snapshotOf(fields, statement, solution);
  const dirty = reference !== null && snapshot !== reference;
  const submittedSnapshot = useRef(snapshot);
  const submittedChapter = useRef(exercise.chapterId);
  const [savedChapterId, setSavedChapterId] = useState(exercise.chapterId);

  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        const result = await saveExercise(previous, formData);
        if (result.status === "success") {
          setSavedSnapshot(submittedSnapshot.current);
          setSavedChapterId(submittedChapter.current);
        }
        return result;
      } catch (error) {
        // A failed request (a new deployment, the server down) would otherwise reach the
        // error boundary and take everything typed with it. Next's own redirects go through.
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );

  // Leaving with unsaved changes asks first.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const statementEmpty = useMemo(() => {
    try {
      return isDocumentEmpty(statement ? JSON.parse(statement) : exercise.statement);
    } catch {
      return true;
    }
  }, [statement, exercise.statement]);
  const complete = isReady(
    readiness({
      statementEmpty,
      answerType: fields.answerType,
      correctNumeric: parseDecimal(fields.correctNumeric),
      correctChoiceIds: fields.correctChoiceIds.filter((id) =>
        fields.choices.some((choice) => choice.id === id),
      ),
    }),
  );

  const locked = exercise.answered > 0;
  const radios = fields.choiceMode === "unique";
  const tooManyRight = radios && fields.correctChoiceIds.length > 1;
  const range = acceptedRange(fields.correctNumeric, fields.tolerance, fields.toleranceKind);

  // A choice's buttons and field, by choice id, so focus can follow a choice that moved to an
  // end of the list (its button turns disabled) or land on a neighbour when one is removed.
  const choiceControls = useRef(new Map<string, HTMLElement>());
  const pendingFocus = useRef<string | null>(null);
  const control = (key: string) => (element: HTMLElement | null) => {
    if (element) choiceControls.current.set(key, element);
    else choiceControls.current.delete(key);
  };
  useEffect(() => {
    if (pendingFocus.current === null) return;
    choiceControls.current.get(pendingFocus.current)?.focus();
    pendingFocus.current = null;
  }, [fields.choices]);

  const updateChoices = (next: Choice[]) => set("choices", next);
  const moveChoice = (index: number, by: -1 | 1) => {
    const next = [...fields.choices];
    const [moved] = next.splice(index, 1);
    if (!moved) return;
    next.splice(index + by, 0, moved);
    // React keeps focus on a button it moves, but not on one that becomes disabled.
    if (index + by === 0) pendingFocus.current = `${moved.id}:down`;
    if (index + by === next.length - 1) pendingFocus.current = `${moved.id}:up`;
    updateChoices(next);
  };
  const removeChoice = (index: number) => {
    const removed = fields.choices[index];
    if (!removed) return;
    const neighbour = fields.choices[index + 1] ?? fields.choices[index - 1];
    if (neighbour) pendingFocus.current = `${neighbour.id}:label`;
    setFields((current) => ({
      ...current,
      choices: current.choices.filter((choice) => choice.id !== removed.id),
      correctChoiceIds: current.correctChoiceIds.filter((id) => id !== removed.id),
    }));
  };
  const toggleRight = (id: string, checked: boolean) => {
    if (radios) set("correctChoiceIds", checked ? [id] : []);
    else {
      set(
        "correctChoiceIds",
        checked
          ? [...fields.correctChoiceIds.filter((other) => other !== id), id]
          : fields.correctChoiceIds.filter((other) => other !== id),
      );
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          // Built from state rather than from the form's inputs: the choices and both documents
          // live in React, and React would reset the form after its action succeeded.
          event.preventDefault();
          if (!ready) return;
          submittedSnapshot.current = snapshot;
          submittedChapter.current = fields.chapterId;
          const formData = new FormData();
          formData.set("id", exercise.id);
          formData.set("chapterId", fields.chapterId);
          formData.set("title", fields.title);
          formData.set("difficulty", fields.difficulty);
          formData.set("tags", fields.tags);
          formData.set("answerType", fields.answerType);
          formData.set("statement", statement);
          formData.set("solution", solution);
          formData.set("correctNumeric", fields.correctNumeric);
          formData.set("tolerance", fields.tolerance);
          formData.set("toleranceKind", fields.toleranceKind);
          formData.set("choiceMode", fields.choiceMode);
          formData.set("choices", JSON.stringify(fields.choices));
          formData.set("correctChoiceIds", JSON.stringify(fields.correctChoiceIds));
          startTransition(() => formAction(formData));
        }}
        className="grid gap-6"
        noValidate
      >
        <div className="grid gap-2">
          <p className="text-sm text-encre-douce">
            {contextOf(levels, savedChapterId) ?? exercise.context}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <AnswerTypeChip type={fields.answerType} label={tTypes(fields.answerType)} />
            {complete ? null : (
              <IncompleteChip label={t("incomplete")} hint={t("incompleteHint")} />
            )}
            {dirty ? <span className="text-sm text-encre-douce">{t("unsaved")}</span> : null}
          </div>
          {locked ? (
            <p className="text-sm text-encre-douce">
              {t("answered", { count: exercise.answered })}
            </p>
          ) : null}
        </div>

        <Field
          id="exercise-title"
          label={t("fields.title")}
          value={fields.title}
          onChange={(event) => set("title", event.target.value)}
          maxLength={160}
          error={fieldError(state, "title")}
          required
        />

        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <ChapterSelect
            id="exercise-chapter"
            label={t("fields.chapter")}
            levels={levels}
            value={fields.chapterId}
            onChange={(event) => set("chapterId", event.target.value)}
            error={fieldError(state, "chapterId")}
          />
          <SelectField
            id="exercise-difficulty"
            label={t("fields.difficulty")}
            value={fields.difficulty}
            onChange={(event) => set("difficulty", event.target.value)}
            error={fieldError(state, "difficulty")}
          >
            {DIFFICULTIES.map((level) => (
              <option key={level} value={level}>
                {t(`difficulty.${level}`)}
              </option>
            ))}
          </SelectField>
        </div>

        <Field
          id="exercise-tags"
          label={t("fields.tags")}
          hint={t("fields.tagsHint")}
          value={fields.tags}
          onChange={(event) => set("tags", event.target.value)}
          error={fieldError(state, "tags")}
        />

        <div className="grid gap-1.5">
          <span id="exercise-statement-label" className="text-sm font-medium">
            {t("fields.statement")}
          </span>
          <DocumentEditor
            labelledBy="exercise-statement-label"
            label={t("fields.statement")}
            initialContent={exercise.statement}
            folderId={exercise.id}
            attachments={false}
            calloutLabels={calloutLabels}
            size="field"
            onReady={(written) => {
              setStatement(written);
              setBaselineDocs((docs) => ({ ...docs, statement: written }));
            }}
            onChange={setStatement}
          />
          <p className="text-sm text-encre-douce">{tEditor("mathShortcut")}</p>
          {fieldError(state, "statement") ? (
            <p className="text-sm text-stylo-rouge">{fieldError(state, "statement")}</p>
          ) : null}
        </div>

        <fieldset className="grid gap-4 rounded-md border border-quadrillage p-4">
          <legend className="px-1 text-sm font-medium">{t("fields.answerType")}</legend>
          {locked ? (
            <p id="exercise-type-locked" className="text-sm text-encre-douce">
              {t("answerTypeLocked")}
            </p>
          ) : null}
          <div className="grid gap-1 sm:grid-cols-3">
            {ANSWER_TYPES.map((type) => (
              <label key={type} className="flex min-h-11 items-center gap-2">
                <input
                  type="radio"
                  name="ui-answer-type"
                  value={type}
                  checked={fields.answerType === type}
                  disabled={locked && type !== fields.answerType}
                  aria-describedby={locked ? "exercise-type-locked" : undefined}
                  onChange={() => set("answerType", type)}
                  className="size-4 accent-stylo-bleu"
                />
                {tTypes(type)}
              </label>
            ))}
          </div>

          {fields.answerType === "upload" ? (
            <p className="text-sm text-encre-douce">{t("upload.hint")}</p>
          ) : null}

          {fields.answerType === "numeric" ? (
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  id="exercise-correct-numeric"
                  label={t("numeric.correct")}
                  hint={t("numeric.correctHint")}
                  autoComplete="off"
                  spellCheck={false}
                  value={fields.correctNumeric}
                  onChange={(event) => set("correctNumeric", event.target.value)}
                  error={fieldError(state, "correctNumeric")}
                />
                <div className="grid grid-cols-[1fr_auto] items-start gap-2">
                  <Field
                    id="exercise-tolerance"
                    label={t("numeric.tolerance")}
                    hint={t("numeric.toleranceHint")}
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    value={fields.tolerance}
                    onChange={(event) => set("tolerance", event.target.value)}
                    error={fieldError(state, "tolerance")}
                  />
                  <SelectField
                    id="exercise-tolerance-kind"
                    label={t("numeric.toleranceKind")}
                    value={fields.toleranceKind}
                    onChange={(event) => set("toleranceKind", event.target.value as ToleranceKind)}
                  >
                    <option value="absolue">{t("numeric.absolue")}</option>
                    <option value="relative">{t("numeric.relative")}</option>
                  </SelectField>
                </div>
              </div>
              <p className="text-sm text-encre-douce" aria-live="polite">
                {fields.correctNumeric.trim() === ""
                  ? t("numeric.missing")
                  : range === null
                    ? null
                    : range.kind === "exact"
                      ? t("numeric.exact", { value: formatDecimal(range.value) })
                      : t("numeric.range", {
                          low: formatDecimal(range.low),
                          high: formatDecimal(range.high),
                        })}
              </p>
            </div>
          ) : null}

          {fields.answerType === "mcq" ? (
            <div className="grid gap-4">
              <SelectField
                id="exercise-choice-mode"
                label={t("mcq.mode")}
                hint={t("mcq.modeHint")}
                value={fields.choiceMode}
                aria-describedby={tooManyRight ? "exercise-one-right-error" : undefined}
                onChange={(event) => {
                  const mode = event.target.value as ChoiceMode;
                  // Radio buttons show one right answer: the one ticked last is kept, so what
                  // the tutor sees checked is what gets saved.
                  setFields((current) => ({
                    ...current,
                    choiceMode: mode,
                    correctChoiceIds:
                      mode === "unique"
                        ? current.correctChoiceIds.slice(-1)
                        : current.correctChoiceIds,
                  }));
                }}
              >
                <option value="unique">{t("mcq.unique")}</option>
                <option value="multiple">{t("mcq.multiple")}</option>
              </SelectField>

              <p className="text-sm text-encre-douce">{t("mcq.hint")}</p>

              <ol className="grid gap-3">
                {fields.choices.map((choice, index) => {
                  const number = index + 1;
                  const right = fields.correctChoiceIds.includes(choice.id);
                  const emptyLabel =
                    Boolean(fieldError(state, "choices")) && choice.label.trim() === "";
                  return (
                    <li
                      key={choice.id}
                      className="grid gap-2 rounded-md border border-quadrillage p-3"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <label htmlFor={`exercise-choice-${index}`} className="text-sm font-medium">
                          {t("mcq.choice", { number })}
                        </label>
                        <label className="ms-auto flex min-h-11 items-center gap-2 text-sm">
                          <input
                            type={radios ? "radio" : "checkbox"}
                            name="ui-right-choice"
                            aria-label={t("mcq.rightFor", { number })}
                            checked={right}
                            onChange={(event) => toggleRight(choice.id, event.target.checked)}
                            className="size-4 accent-stylo-bleu"
                          />
                          {t("mcq.right")}
                        </label>
                        <span className="flex">
                          <IconButton
                            buttonRef={control(`${choice.id}:up`)}
                            label={t("mcq.up", { number })}
                            disabled={index === 0}
                            onClick={() => moveChoice(index, -1)}
                          >
                            <ArrowUp aria-hidden="true" className="size-4" />
                          </IconButton>
                          <IconButton
                            buttonRef={control(`${choice.id}:down`)}
                            label={t("mcq.down", { number })}
                            disabled={index === fields.choices.length - 1}
                            onClick={() => moveChoice(index, 1)}
                          >
                            <ArrowDown aria-hidden="true" className="size-4" />
                          </IconButton>
                          <IconButton
                            label={t("mcq.remove", { number })}
                            disabled={fields.choices.length <= MIN_CHOICES}
                            onClick={() => removeChoice(index)}
                          >
                            <Trash2 aria-hidden="true" className="size-4" />
                          </IconButton>
                        </span>
                      </div>
                      <Input
                        id={`exercise-choice-${index}`}
                        ref={control(`${choice.id}:label`)}
                        aria-invalid={emptyLabel || undefined}
                        aria-describedby={emptyLabel ? "exercise-choices-error" : undefined}
                        value={choice.label}
                        maxLength={300}
                        autoComplete="off"
                        onChange={(event) =>
                          updateChoices(
                            fields.choices.map((other) =>
                              other === choice ? { ...other, label: event.target.value } : other,
                            ),
                          )
                        }
                      />
                      {choice.label.includes("$") ? (
                        <p className="lecon-corps text-base" aria-hidden="true">
                          {renderMathText(choice.label)}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>

              <Button
                type="button"
                variant="outline"
                className="justify-self-start"
                disabled={fields.choices.length >= MAX_CHOICES}
                onClick={() => updateChoices([...fields.choices, { id: newChoiceId(), label: "" }])}
              >
                {t("mcq.add")}
              </Button>

              {tooManyRight || fieldError(state, "correctChoiceIds") ? (
                <p id="exercise-one-right-error" role="alert" className="text-sm text-stylo-rouge">
                  {t("errors.oneRight")}
                </p>
              ) : null}
              {fieldError(state, "choices") ? (
                <p id="exercise-choices-error" className="text-sm text-stylo-rouge">
                  {fieldError(state, "choices")}
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>

        <div className="grid gap-1.5">
          <span id="exercise-solution-label" className="text-sm font-medium">
            {t("fields.solution")}
          </span>
          <p className="text-sm text-encre-douce">{t("fields.solutionHint")}</p>
          <DocumentEditor
            labelledBy="exercise-solution-label"
            label={t("fields.solution")}
            initialContent={exercise.solution}
            folderId={exercise.id}
            attachments={false}
            calloutLabels={calloutLabels}
            size="field"
            onReady={(written) => {
              setSolution(written);
              setBaselineDocs((docs) => ({ ...docs, solution: written }));
            }}
            onChange={setSolution}
          />
          {fieldError(state, "solution") ? (
            <p className="text-sm text-stylo-rouge">{fieldError(state, "solution")}</p>
          ) : null}
        </div>

        <FormMessage state={state} />

        <Button type="submit" size="lg" disabled={pending || !ready} className="justify-self-start">
          {pending ? t("saving") : t("save")}
        </Button>
      </form>

      <DeleteExercise id={exercise.id} assigned={exercise.assigned} />
    </>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  buttonRef,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  buttonRef?: (element: HTMLButtonElement | null) => void;
  children: ReactNode;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-grid size-11 place-items-center rounded-md text-encre hover:bg-sunken disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** Outside the editor's form: a form may not contain another. */
function DeleteExercise({ id, assigned }: { id: string; assigned: boolean }) {
  const t = useTranslations("tutor.exerciseEditor.delete");
  const [state, action, pending] = useActionState(deleteExercise, initialFormState);
  const [confirming, setConfirming] = useState(false);
  // The button pressed disappears in both directions, which would leave focus on <body>:
  // it goes to the question when it opens, and back to the button when it is cancelled.
  const toggled = useRef(false);
  const startRef = useRef<HTMLButtonElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!toggled.current) return;
    (confirming ? questionRef.current : startRef.current)?.focus();
  }, [confirming]);
  const toggle = (next: boolean) => {
    toggled.current = true;
    setConfirming(next);
  };

  return (
    <section
      aria-labelledby="exercise-delete-title"
      className="grid gap-3 border-t border-quadrillage pt-6"
    >
      <h2 id="exercise-delete-title" className="text-sm font-semibold">
        {t("title")}
      </h2>
      {assigned ? (
        <p className="text-sm text-encre-douce">{t("assigned")}</p>
      ) : confirming ? (
        <form action={action} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={id} />
          <p ref={questionRef} tabIndex={-1} className="basis-full text-sm">
            {t("confirmQuestion")}
          </p>
          <Button type="submit" variant="outline" className="text-stylo-rouge" disabled={pending}>
            {t("confirm")}
          </Button>
          <Button type="button" variant="ghost" onClick={() => toggle(false)}>
            {t("cancel")}
          </Button>
        </form>
      ) : (
        <Button
          ref={startRef}
          type="button"
          variant="outline"
          className="justify-self-start"
          onClick={() => toggle(true)}
        >
          {t("start")}
        </Button>
      )}
      <FormMessage state={state} />
    </section>
  );
}
