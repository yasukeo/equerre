"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { handFocus } from "@/lib/focus";
import { MAX_REASON_LENGTH } from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { cancelMySession } from "../actions";

/** Withdraws a request, or cancels a confirmed session, after asking. */
export function CancelForm({ id, pending: isRequest }: { id: string; pending: boolean }) {
  const t = useTranslations("student.session");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [state, action, pending] = useFormAction(cancelMySession, t("errors.unknown"));
  const box = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    handFocus(
      open ? (field.current?.querySelector("textarea") ?? null) : start.current,
      box.current,
    );
  }, [open]);
  const toggle = (next: boolean) => {
    moved.current = true;
    setOpen(next);
  };
  const verb = isRequest ? t("withdraw") : t("cancel");

  return (
    <div ref={box} className="grid gap-3">
      {open ? (
        <form
          className="grid gap-3 rounded-md border border-stylo-rouge/40 bg-lavis-rouge p-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            sendFields(action, { id, reason });
          }}
        >
          <p>{isRequest ? t("withdrawConfirm") : t("cancelConfirm")}</p>
          <div ref={field}>
            <TextareaField
              id="cancel-reason"
              label={t("reasonLabel")}
              hint={t("reasonHint")}
              rows={2}
              maxLength={MAX_REASON_LENGTH}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </div>
          <FormMessage state={state} />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="outline" disabled={pending}>
              {verb}
            </Button>
            <Button type="button" variant="ghost" disabled={pending} onClick={() => toggle(false)}>
              {isRequest ? t("keepRequest") : t("keep")}
            </Button>
          </div>
        </form>
      ) : (
        <Button
          ref={start}
          type="button"
          variant="outline"
          className="justify-self-start"
          onClick={() => toggle(true)}
        >
          {verb}
        </Button>
      )}
    </div>
  );
}
