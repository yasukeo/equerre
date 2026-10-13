"use client";

import { ArrowDown, ArrowUp, Circle, CircleCheck, FileText, ListChecks, X } from "lucide-react";
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
import { AnswerTypeChip } from "@/components/exercise-status";
import { FORM_WITH_PREVIEW, FormPreview } from "@/components/shell/form-preview";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Input, Label } from "@/components/ui/input";
import { MAX_ASSIGNMENT_EXERCISES, readRecipient } from "@/lib/assignment/form";
import type { AssignableExercise, RecipientOptions } from "@/lib/assignment/queries";
import { formatLocal, localDateTimeToUtc } from "@/lib/dates";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import { cn } from "@/lib/utils";
import { createAssignment, createSubjectAssignment } from "../actions";
import { SubjectPicker, discardSubject, type Subject } from "./subject-picker";

export type AssignmentMode = "bank" | "subject";

/** The error Next throws for a redirect: the action succeeded. */
function isRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")
  );
}

type Props = {
  recipients: RecipientOptions;
  exercises: AssignableExercise[];
  preselected: string[];
  defaultDue: { date: string; time: string };
  initialMode: AssignmentMode;
};

/** `yyyy-MM-dd` and `HH:mm` as an instant in Casablanca, or null while either is incomplete. */
function instantOf(date: string, time: string): Date | null {
  try {
    return localDateTimeToUtc(date, time);
  } catch {
    return null;
  }
}

/** « Équation » finds « équations »: lower case, accents dropped. */
function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr");
}

export function NewAssignmentForm({
  recipients,
  exercises,
  preselected,
  defaultDue,
  initialMode,
}: Props) {
  const t = useTranslations("tutor.newAssignment");
  const [mode, setMode] = useState<AssignmentMode>(initialMode);
  const [subject, setSubject] = useState<Subject>({ status: "empty" });
  const tTypes = useTranslations("tutor.exercises.answerType");

  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState(defaultDue.date);
  const [dueTime, setDueTime] = useState(defaultDue.time);
  const [recipient, setRecipient] = useState("");
  const [selected, setSelected] = useState<string[]>(preselected);
  const [level, setLevel] = useState("");
  const [levelChosen, setLevelChosen] = useState(false);
  const [search, setSearch] = useState("");

  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        if (formData.get("mode") !== "subject") return await createAssignment(previous, formData);
        const result = await createSubjectAssignment(previous, formData);
        // The file is gone, or already a homework's: forget it here, delete nothing.
        if (result.status === "error" && result.values?.subject === "again") {
          setSubject({ status: "empty" });
        }
        return result;
      } catch (error) {
        // Given: the page may keep this form alive and show it again on « retour ». It must come
        // back empty, or « Changer de fichier » would reach for the subject just given.
        if (isRedirect(error)) {
          setSubject({ status: "empty" });
          setTitle("");
          setInstructions("");
          setSelected([]);
        }
        // The success path is a redirect, which must go through; anything else keeps the form.
        unstable_rethrow(error);
        return { status: "error", message: t("errors.unknown") };
      }
    },
    initialFormState,
  );

  const byId = useMemo(
    () => new Map(exercises.map((exercise) => [exercise.id, exercise])),
    [exercises],
  );
  const levels = useMemo(() => {
    const seen = new Map<string, string>();
    for (const exercise of exercises) seen.set(exercise.programmeCode, exercise.programmeLabel);
    return [...seen].map(([code, label]) => ({ code, label }));
  }, [exercises]);

  // Choosing a recipient narrows the list to their programme, until the tutor picks one herself.
  const chooseRecipient = (value: string) => {
    setRecipient(value);
    if (levelChosen) return;
    const parsed = readRecipient(value);
    const code =
      parsed?.kind === "student"
        ? recipients.students.find((student) => student.id === parsed.id)?.programmeCode
        : recipients.groups.find((group) => group.id === parsed?.id)?.programmeCode;
    setLevel(code && levels.some((option) => option.code === code) ? code : "");
  };

  const query = fold(search.trim());
  const visible = exercises.filter(
    (exercise) =>
      (level === "" || exercise.programmeCode === level) &&
      (query === "" ||
        fold([exercise.title, exercise.chapterTitle, ...exercise.tags].join(" ")).includes(query)),
  );
  const chapters: { key: string; heading: string; exercises: AssignableExercise[] }[] = [];
  for (const exercise of visible) {
    const key = `${exercise.programmeCode}/${exercise.chapterTitle}`;
    const last = chapters.at(-1);
    if (last?.key === key) last.exercises.push(exercise);
    else {
      chapters.push({
        key,
        heading: `${exercise.programmeLabel} · ${exercise.chapterTitle}`,
        exercises: [exercise],
      });
    }
  }

  const toggle = (id: string, checked: boolean) =>
    setSelected((current) =>
      checked
        ? current.includes(id) || current.length >= MAX_ASSIGNMENT_EXERCISES
          ? current
          : [...current, id]
        : current.filter((other) => other !== id),
    );
  // Focus follows an exercise moved to an end of the list, whose button then turns disabled,
  // and lands on a neighbour when one is taken out; otherwise it would fall to <body>.
  const [controls] = useState(() => new Map<string, HTMLElement>());
  const pendingFocus = useRef<string | null>(null);
  const control = (key: string) => (element: HTMLElement | null) => {
    if (element) controls.set(key, element);
    else controls.delete(key);
  };
  useEffect(() => {
    if (pendingFocus.current === null) return;
    (controls.get(pendingFocus.current) ?? controls.get("heading"))?.focus();
    pendingFocus.current = null;
  }, [selected, controls]);

  const move = (index: number, by: -1 | 1) => {
    const id = selected[index];
    if (!id) return;
    if (index + by === 0) pendingFocus.current = `${id}:down`;
    if (index + by === selected.length - 1) pendingFocus.current = `${id}:up`;
    setSelected((current) => {
      const next = [...current];
      const [moved] = next.splice(index, 1);
      if (moved) next.splice(index + by, 0, moved);
      return next;
    });
  };
  const removeAt = (index: number) => {
    const id = selected[index];
    if (!id) return;
    const neighbour = selected[index + 1] ?? selected[index - 1];
    pendingFocus.current = neighbour ? `${neighbour}:remove` : "heading";
    toggle(id, false);
  };

  const exercisesError = fieldError(state, "exerciseIds");

  // The homework as the student will find it in her list (D-108).
  const chosen = readRecipient(recipient);
  const recipientName =
    chosen?.kind === "student"
      ? recipients.students.find((student) => student.id === chosen.id)?.name
      : chosen?.kind === "group"
        ? recipients.groups.find((group) => group.id === chosen.id)?.name
        : undefined;
  const dueAt = instantOf(dueDate, dueTime);
  const parts = mode === "subject" ? 1 : selected.length;

  return (
    <form
      onSubmit={(event) => {
        // Built from state: the order of the chosen exercises lives in React.
        event.preventDefault();
        const formData = new FormData();
        formData.set("title", title);
        formData.set("instructions", instructions);
        formData.set("dueDate", dueDate);
        formData.set("dueTime", dueTime);
        formData.set("recipient", recipient);
        formData.set("mode", mode);
        if (mode === "subject") {
          formData.set("subjectPath", subject.status === "ready" ? subject.path : "");
        } else {
          formData.set("exerciseIds", JSON.stringify(selected));
        }
        startTransition(() => formAction(formData));
      }}
      className={`${FORM_WITH_PREVIEW} lg:grid-rows-[auto_1fr]`}
      noValidate
    >
      <div className="grid min-w-0 gap-6 lg:col-start-1 lg:row-start-1">
        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-medium">{t("mode.label")}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                {
                  value: "bank",
                  icon: ListChecks,
                  label: t("mode.bank"),
                  hint: t("mode.bankHint"),
                },
                {
                  value: "subject",
                  icon: FileText,
                  label: t("mode.subject"),
                  hint: t("mode.subjectHint"),
                },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer items-start gap-3 rounded-2xl border bg-surface p-4 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-encre",
                  mode === option.value ? "border-encre ring-1 ring-encre" : "border-trait",
                )}
              >
                <input
                  type="radio"
                  name="assignment-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => {
                    // Back to the bank: a subject uploaded for nothing is taken back at once.
                    if (option.value === "bank" && subject.status === "ready") {
                      discardSubject(subject.path);
                      setSubject({ status: "empty" });
                    }
                    setMode(option.value);
                  }}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    mode === option.value ? "bg-encre text-papier" : "bg-sunken",
                  )}
                >
                  <option.icon className="size-5" />
                </span>
                <span className="grid gap-0.5 pe-6">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-sm text-encre-douce">{option.hint}</span>
                </span>
                {/* The choice made, as a sign as well as an outline (D-104: never colour alone). */}
                <span aria-hidden="true" className="absolute end-3 top-3">
                  {mode === option.value ? (
                    <CircleCheck className="size-5" />
                  ) : (
                    <Circle className="size-5 text-trait" />
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field
          id="assignment-title"
          label={t("fields.title")}
          hint={t("fields.titleHint")}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          error={fieldError(state, "title")}
          required
        />

        <SelectField
          id="assignment-recipient"
          label={t("fields.recipient")}
          value={recipient}
          onChange={(event) => chooseRecipient(event.target.value)}
          error={fieldError(state, "recipient")}
          required
        >
          <option value="" disabled>
            {t("fields.recipientPlaceholder")}
          </option>
          {recipients.groups.length > 0 ? (
            <optgroup label={t("fields.groups")}>
              {recipients.groups.map((group) => (
                <option key={group.id} value={`group:${group.id}`}>
                  {t("fields.groupOption", { name: group.name, count: group.members })}
                </option>
              ))}
            </optgroup>
          ) : null}
          <optgroup label={t("fields.students")}>
            {recipients.students.map((student) => (
              <option key={student.id} value={`student:${student.id}`}>
                {student.levelLabel ? `${student.name} · ${student.levelLabel}` : student.name}
              </option>
            ))}
          </optgroup>
        </SelectField>

        <fieldset className="grid gap-1.5">
          <legend className="text-sm font-medium">{t("fields.due")}</legend>
          <p id="assignment-due-hint" className="text-sm text-encre-douce">
            {t("fields.dueHint")}
          </p>
          <div className="grid grid-cols-[1fr_auto] gap-2 sm:max-w-sm">
            <Input
              id="assignment-due-date"
              type="date"
              aria-label={t("fields.dueDate")}
              aria-describedby={
                fieldError(state, "due")
                  ? "assignment-due-hint assignment-due-error"
                  : "assignment-due-hint"
              }
              aria-invalid={fieldError(state, "due") ? true : undefined}
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
            />
            <Input
              id="assignment-due-time"
              type="time"
              aria-label={t("fields.dueTime")}
              aria-describedby={
                fieldError(state, "due")
                  ? "assignment-due-hint assignment-due-error"
                  : "assignment-due-hint"
              }
              aria-invalid={fieldError(state, "due") ? true : undefined}
              value={dueTime}
              onChange={(event) => setDueTime(event.target.value)}
              required
            />
          </div>
          {fieldError(state, "due") ? (
            <p id="assignment-due-error" className="text-sm text-stylo-rouge">
              {fieldError(state, "due")}
            </p>
          ) : null}
        </fieldset>

        <TextareaField
          id="assignment-instructions"
          label={t("fields.instructions")}
          hint={t("fields.instructionsHint")}
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          maxLength={2000}
          rows={3}
          error={fieldError(state, "instructions")}
        />

        {mode === "subject" ? (
          <section aria-labelledby="assignment-subject-title" className="grid gap-3">
            <h2 id="assignment-subject-title" className="text-base font-semibold">
              {t("subject.heading")}
            </h2>
            <SubjectPicker
              subject={subject}
              onChange={setSubject}
              error={fieldError(state, "subject")}
              disabled={pending}
            />
          </section>
        ) : null}
      </div>

      <FormPreview
        id="assignment-preview"
        title={t("preview.title")}
        caption={
          recipientName
            ? t("preview.caption", {
                name:
                  chosen?.kind === "group"
                    ? recipientName
                    : (recipientName.split(" ")[0] ?? recipientName),
                kind: chosen?.kind ?? "student",
              })
            : t("preview.captionNobody")
        }
        className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:p-2"
        footerClassName="lg:sticky lg:bottom-0 lg:bg-papier lg:pt-3"
        footer={
          <>
            <FormMessage state={state} />
            {mode === "subject" && subject.status === "uploading" ? (
              <p className="text-sm text-encre-douce">{t("subject.waiting")}</p>
            ) : null}
            <Button
              type="submit"
              size="lg"
              disabled={pending || (mode === "subject" && subject.status === "uploading")}
              className="w-full"
            >
              {pending ? t("submitting") : t("submit")}
            </Button>
          </>
        }
      >
        {/* The card of her homework list: a red edge, the title, the day, what is left. */}
        <div className="grid gap-3 rounded-2xl border border-s-4 border-quadrillage border-s-rouge bg-surface p-4">
          <div className="grid min-w-0 gap-0.5">
            <p
              className={
                title.trim() ? "font-semibold break-words" : "font-semibold text-encre-douce italic"
              }
            >
              {title.trim() || t("preview.untitled")}
            </p>
            <p className="text-sm text-encre-douce first-letter:uppercase">
              {dueAt
                ? t("preview.due", { date: formatLocal(dueAt, "EEEE d MMMM 'à' HH:mm") })
                : t("preview.noDue")}
            </p>
          </div>
          <div className="grid gap-1.5">
            <span aria-hidden="true" className="h-2 rounded-full bg-sunken" />
            <span className="text-sm">
              {mode === "subject" ? t("preview.copy") : t("preview.left", { count: parts })}
            </span>
          </div>
        </div>

        {mode === "subject" ? (
          <p className="text-sm break-words text-encre-douce">
            {subject.status === "ready" || subject.status === "uploading"
              ? t("preview.subjectFile", { name: subject.name })
              : t("preview.noSubject")}
          </p>
        ) : (
          <section aria-labelledby="assignment-chosen-title" className="grid gap-3">
            <h3
              id="assignment-chosen-title"
              ref={control("heading")}
              tabIndex={-1}
              className="text-base font-semibold"
            >
              {t("exercises.chosen", { count: selected.length })}
            </h3>
            {/* Always in the page, so reaching the limit is announced as it happens. */}
            <p
              id="assignment-exercises-full"
              aria-live="polite"
              className="text-sm text-encre-douce"
            >
              {selected.length >= MAX_ASSIGNMENT_EXERCISES
                ? t("exercises.full", { max: MAX_ASSIGNMENT_EXERCISES })
                : null}
            </p>
            {selected.length === 0 ? (
              <p className="text-sm text-encre-douce">{t("exercises.chosenEmpty")}</p>
            ) : (
              <ol className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
                {selected.map((id, index) => {
                  const exercise = byId.get(id);
                  if (!exercise) return null;
                  return (
                    <li
                      key={id}
                      className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-1 bg-surface ps-3 pe-1 pt-2 pb-1"
                    >
                      <span className="text-sm leading-6 text-encre-douce">{index + 1}.</span>
                      <span className="font-medium break-words">{exercise.title}</span>
                      {/* Its kind of answer, then the buttons that place it, on the next line. */}
                      <span className="col-start-2 flex flex-wrap items-center justify-between gap-x-2">
                        <AnswerTypeChip
                          type={exercise.answerType}
                          label={tTypes(exercise.answerType)}
                        />
                        <span className="flex">
                          <IconButton
                            buttonRef={control(`${id}:up`)}
                            label={t("exercises.up", { title: exercise.title })}
                            disabled={index === 0}
                            onClick={() => move(index, -1)}
                          >
                            <ArrowUp aria-hidden="true" className="size-4" />
                          </IconButton>
                          <IconButton
                            buttonRef={control(`${id}:down`)}
                            label={t("exercises.down", { title: exercise.title })}
                            disabled={index === selected.length - 1}
                            onClick={() => move(index, 1)}
                          >
                            <ArrowDown aria-hidden="true" className="size-4" />
                          </IconButton>
                          <IconButton
                            buttonRef={control(`${id}:remove`)}
                            label={t("exercises.remove", { title: exercise.title })}
                            onClick={() => removeAt(index)}
                          >
                            <X aria-hidden="true" className="size-4" />
                          </IconButton>
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
            {exercisesError ? (
              <p role="alert" className="text-sm text-stylo-rouge">
                {exercisesError}
              </p>
            ) : null}
          </section>
        )}
      </FormPreview>

      {/* The bank under the fields; beside them on a wide screen, the preview spans both. */}
      {mode === "subject" ? null : (
        <div className="grid min-w-0 gap-6 lg:col-start-1 lg:row-start-2">
          <section aria-labelledby="assignment-bank-title" className="grid gap-3">
            <div>
              <h2 id="assignment-bank-title" className="text-base font-semibold">
                {t("exercises.bank")}
              </h2>
              <p className="text-sm text-encre-douce">{t("exercises.bankHint")}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <SelectField
                id="assignment-level"
                label={t("exercises.level")}
                value={level}
                onChange={(event) => {
                  setLevel(event.target.value);
                  setLevelChosen(true);
                }}
              >
                <option value="">{t("exercises.allLevels")}</option>
                {levels.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
              <div className="grid content-start gap-1.5">
                <Label htmlFor="assignment-search">{t("exercises.search")}</Label>
                <Input
                  id="assignment-search"
                  type="search"
                  value={search}
                  placeholder={t("exercises.searchPlaceholder")}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            {chapters.length === 0 ? (
              <p className="text-sm text-encre-douce" aria-live="polite">
                {t("exercises.none")}
              </p>
            ) : (
              <div className="grid gap-5">
                {chapters.map((chapter) => (
                  <fieldset key={chapter.key} className="grid gap-2">
                    <legend className="text-sm font-semibold text-encre-douce">
                      {chapter.heading}
                    </legend>
                    <ul className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
                      {chapter.exercises.map((exercise) => {
                        const checked = selected.includes(exercise.id);
                        return (
                          <li key={exercise.id} className="bg-surface">
                            <label className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2">
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={!checked && selected.length >= MAX_ASSIGNMENT_EXERCISES}
                                onChange={(event) => toggle(exercise.id, event.target.checked)}
                                // Named by the title alone; the kind of answer and the difficulty
                                // are read after it rather than glued to it.
                                aria-labelledby={`bank-${exercise.id}-title`}
                                aria-describedby={
                                  !checked && selected.length >= MAX_ASSIGNMENT_EXERCISES
                                    ? `bank-${exercise.id}-meta assignment-exercises-full`
                                    : `bank-${exercise.id}-meta`
                                }
                                className="size-4 accent-stylo-bleu"
                              />
                              <span
                                id={`bank-${exercise.id}-title`}
                                className="min-w-0 grow basis-40"
                              >
                                {exercise.title}
                              </span>
                              <span
                                id={`bank-${exercise.id}-meta`}
                                className="flex items-center gap-3"
                              >
                                <AnswerTypeChip
                                  type={exercise.answerType}
                                  label={tTypes(exercise.answerType)}
                                />
                                <span className="text-xs text-encre-douce">
                                  {t("exercises.difficulty", { level: exercise.difficulty })}
                                </span>
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </form>
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
