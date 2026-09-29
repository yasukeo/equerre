"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Field } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { handFocus } from "@/lib/focus";
import { fieldError, initialFormState } from "@/lib/form-state";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { inviteParent, unlinkParent } from "./parent-actions";

export type LinkedParent = { id: string; name: string; email: string | null };

/**
 * The student's parents on her file (D-091): who can follow her, how to give a parent an
 * account, and how to take one off. A parent reads; they change nothing.
 */
export function ParentsPanel({
  studentId,
  studentName,
  parents,
  guardianName,
}: {
  studentId: string;
  studentName: string;
  parents: LinkedParent[];
  /** The parent named on the file, to fill the form with. */
  guardianName: string;
}) {
  const t = useTranslations("parentsAdmin");
  const [fullName, setFullName] = useState(guardianName);
  const [email, setEmail] = useState("");
  const [state, action, pending] = useFormAction(inviteParent, t("errors.unknown"), () => {
    setFullName("");
    setEmail("");
  });
  // Taking a parent off drops their row, its message and the focus: the panel says it and its
  // heading takes the focus.
  const heading = useRef<HTMLHeadingElement>(null);
  const [removed, setRemoved] = useState<string | null>(null);
  // The address is already a parent's: whose account it is, and a second click to link it.
  const [dismissed, setDismissed] = useState(false);
  const askedToConfirm = state.status === "error" && state.values?.confirm === "needed";
  const confirming = askedToConfirm && !dismissed ? state : null;
  const submit = (confirm?: "yes") => {
    setRemoved(null);
    setDismissed(false);
    sendFields(action, { studentId, fullName, email, ...(confirm ? { confirm } : {}) });
  };

  return (
    <section aria-labelledby="student-parents" className="grid gap-3">
      <h2 ref={heading} id="student-parents" tabIndex={-1} className="text-lg font-medium">
        {t("heading")}
      </h2>
      <p className="text-sm text-encre-douce">{t("lead")}</p>
      <div aria-live="polite" role="status">
        {removed ? (
          <p className="flex items-start gap-2 rounded-md border border-quadrillage bg-sunken px-3 py-2.5 text-sm">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{removed}</span>
          </p>
        ) : null}
      </div>
      {parents.length === 0 ? (
        <p className="text-sm text-encre-douce">{t("none")}</p>
      ) : (
        <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
          {parents.map((parent) => (
            <ParentRow
              key={parent.id}
              studentId={studentId}
              studentName={studentName}
              parent={parent}
              onRemoved={(message, from) => {
                setRemoved(message);
                handFocus(heading.current, from);
              }}
            />
          ))}
        </ul>
      )}
      <details className="rounded-md border border-quadrillage p-4">
        <summary className="cursor-pointer py-2.5 font-medium">{t("invite")}</summary>
        <form
          className="mt-3 grid gap-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Field
            id="parent-name"
            label={t("fullName")}
            autoComplete="off"
            required
            maxLength={120}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            error={fieldError(state, "fullName")}
          />
          <Field
            id="parent-email"
            type="email"
            inputMode="email"
            label={t("email")}
            hint={t("emailHint")}
            autoComplete="off"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setDismissed(true);
            }}
            error={fieldError(state, "email")}
          />
          {confirming ? (
            <div
              role="alert"
              className="grid gap-2 rounded-md border border-stylo-bleu/40 bg-lavis-bleu p-3 text-sm"
            >
              <p>{confirming.message}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={pending}
                  onClick={() => submit("yes")}
                >
                  {t("confirmLink", { student: studentName })}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => setDismissed(true)}
                >
                  {t("cancel")}
                </Button>
              </div>
            </div>
          ) : null}
          <FormMessage state={askedToConfirm ? initialFormState : state}>
            {state.status === "success" && state.detail ? (
              <div className="flex flex-wrap items-center gap-2">
                {/* Sized to the room left, never to the link: a whole link would stretch the
                    side column it sits in. */}
                <code className="w-0 min-w-0 flex-1 basis-40 truncate rounded-sm border border-quadrillage bg-surface px-2 py-1.5 text-xs">
                  {state.detail}
                </code>
                <CopyButton value={state.detail} label={t("copyLink")} />
              </div>
            ) : null}
          </FormMessage>
          <Button type="submit" disabled={pending} className="justify-self-start">
            {pending ? t("inviting") : t("send")}
          </Button>
        </form>
      </details>
    </section>
  );
}

/** One parent; taking their access away asks first and says what stays (their account). */
function ParentRow({
  studentId,
  studentName,
  parent,
  onRemoved,
}: {
  studentId: string;
  studentName: string;
  parent: LinkedParent;
  onRemoved: (message: string, from: HTMLElement | null) => void;
}) {
  const t = useTranslations("parentsAdmin");
  const item = useRef<HTMLLIElement>(null);
  const [confirming, setConfirming] = useState(false);
  const [state, action, pending] = useFormAction(unlinkParent, t("errors.unknown"), (result) =>
    onRemoved(result.status === "success" ? result.message : "", item.current),
  );
  const confirmButton = useRef<HTMLButtonElement>(null);
  const removeButton = useRef<HTMLButtonElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    handFocus(confirming ? confirmButton.current : removeButton.current, item.current);
  }, [confirming]);
  const toggle = (next: boolean) => {
    moved.current = true;
    setConfirming(next);
  };

  return (
    <li ref={item} className="grid gap-2 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="grid min-w-0 gap-0.5">
          <p className="font-medium">{parent.name}</p>
          {parent.email ? (
            <p className="text-sm break-all text-encre-douce">{parent.email}</p>
          ) : null}
        </div>
        {confirming ? null : (
          <Button
            ref={removeButton}
            type="button"
            variant="ghost"
            size="sm"
            aria-label={t("unlinkLabel", { name: parent.name })}
            onClick={() => toggle(true)}
          >
            {t("unlink")}
          </Button>
        )}
      </div>
      {confirming ? (
        <div className="grid gap-2 rounded-md border border-stylo-rouge/40 bg-lavis-rouge p-3 text-sm">
          <p>{t("unlinkConfirm", { name: parent.name, student: studentName })}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              ref={confirmButton}
              type="button"
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => sendFields(action, { parentId: parent.id, studentId })}
            >
              {t("unlink")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={pending}
              onClick={() => toggle(false)}
            >
              {t("keep")}
            </Button>
          </div>
        </div>
      ) : null}
      {state.status === "error" ? (
        <p role="alert" className="text-sm text-stylo-rouge">
          {state.message}
        </p>
      ) : null}
    </li>
  );
}
