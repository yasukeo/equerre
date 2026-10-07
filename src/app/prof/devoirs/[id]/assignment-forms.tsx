"use client";

import { unstable_rethrow } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { fieldError, initialFormState, type FormState } from "@/lib/form-state";
import { deleteAssignment, updateAssignment } from "../actions";

type DetailsProps = {
  id: string;
  title: string;
  instructions: string;
  dueDate: string;
  dueTime: string;
};

/** Title, instructions and due date. Who it is for and its exercises stay as given. */
export function AssignmentDetailsForm(props: DetailsProps) {
  const t = useTranslations("tutor.assignment.edit");
  const tFields = useTranslations("tutor.newAssignment.fields");
  const [title, setTitle] = useState(props.title);
  const [instructions, setInstructions] = useState(props.instructions);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const [dueTime, setDueTime] = useState(props.dueTime);

  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData): Promise<FormState> => {
      try {
        return await updateAssignment(previous, formData);
      } catch (error) {
        unstable_rethrow(error);
        return { status: "error", message: t("failed") };
      }
    },
    initialFormState,
  );

  const dueError = fieldError(state, "due");

  return (
    <section aria-labelledby="assignment-edit-title" className="grid gap-4">
      <h3 id="assignment-edit-title" className="font-semibold">
        {t("title")}
      </h3>
      <form
        className="grid gap-4"
        noValidate
        onSubmit={(event) => {
          // Controlled fields, dispatched by hand: React would reset them after the action.
          event.preventDefault();
          const formData = new FormData();
          formData.set("id", props.id);
          formData.set("title", title);
          formData.set("instructions", instructions);
          formData.set("dueDate", dueDate);
          formData.set("dueTime", dueTime);
          startTransition(() => formAction(formData));
        }}
      >
        <Field
          id="assignment-edit-name"
          label={tFields("title")}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          error={fieldError(state, "title")}
        />
        <fieldset className="grid gap-1.5">
          <legend className="text-sm font-medium">{tFields("due")}</legend>
          <p id="assignment-edit-due-hint" className="text-sm text-encre-douce">
            {t("dueHint")}
          </p>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Input
              id="assignment-edit-due-date"
              type="date"
              aria-label={tFields("dueDate")}
              aria-describedby={
                dueError
                  ? "assignment-edit-due-hint assignment-edit-due-error"
                  : "assignment-edit-due-hint"
              }
              aria-invalid={dueError ? true : undefined}
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
            <Input
              id="assignment-edit-due-time"
              type="time"
              aria-label={tFields("dueTime")}
              aria-describedby={
                dueError
                  ? "assignment-edit-due-hint assignment-edit-due-error"
                  : "assignment-edit-due-hint"
              }
              aria-invalid={dueError ? true : undefined}
              value={dueTime}
              onChange={(event) => setDueTime(event.target.value)}
            />
          </div>
          {dueError ? (
            <p id="assignment-edit-due-error" className="text-sm text-stylo-rouge">
              {dueError}
            </p>
          ) : null}
        </fieldset>
        <TextareaField
          id="assignment-edit-instructions"
          label={tFields("instructions")}
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          maxLength={2000}
          rows={3}
          error={fieldError(state, "instructions")}
        />
        <FormMessage state={state} />
        <Button type="submit" disabled={pending} className="justify-self-start">
          {pending ? t("saving") : t("save")}
        </Button>
      </form>
    </section>
  );
}

/** Refused once a student has answered: deleting would take their work with it (D-045). */
export function DeleteAssignment({ id, hasWork }: { id: string; hasWork: boolean }) {
  const t = useTranslations("tutor.assignment.delete");
  const [state, action, pending] = useActionState(deleteAssignment, initialFormState);
  const [confirming, setConfirming] = useState(false);
  // The button pressed disappears in both directions, which would leave focus on <body>.
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
      aria-labelledby="assignment-delete-title"
      className="grid gap-3 border-t border-quadrillage pt-6"
    >
      <h3 id="assignment-delete-title" className="text-sm font-semibold">
        {t("title")}
      </h3>
      {hasWork ? (
        <p className="text-sm text-encre-douce">{t("hasWork")}</p>
      ) : confirming ? (
        <form action={action} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={id} />
          <p ref={questionRef} tabIndex={-1} className="basis-full text-sm">
            {t("confirmQuestion")}
          </p>
          <Button type="submit" variant="destructive" disabled={pending}>
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
