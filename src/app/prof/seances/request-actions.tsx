"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { handFocus } from "@/lib/focus";
import { initialFormState, type FormState } from "@/lib/form-state";
import { MAX_REASON_LENGTH } from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { confirmRequest, declineRequest } from "./actions";

/** Where an answered request says so: the list outlives the line that leaves it. */
const Announce = createContext<((state: FormState) => void) | null>(null);

/**
 * The list of requests, with its heading and a live line under it for the last answer given.
 * Once a request is answered it leaves the list; what happened is said here, where the focus
 * lands.
 */
export function RequestsSection({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  const [last, setLast] = useState<FormState>(initialFormState);
  return (
    <Announce value={setLast}>
      {heading}
      <FormMessage state={last} />
      {children}
    </Announce>
  );
}

/**
 * « Confirmer » or « Refuser » a student's request. In the list, the focus then goes to
 * `headingId` and the section says what was done; on the session's own page (`back`), the
 * action returns to that page with the answer at its top.
 */
export function RequestActions({
  id,
  who,
  headingId,
  back,
}: {
  id: string;
  who: string;
  headingId: string;
  back?: "session";
}) {
  const t = useTranslations("tutor.sessions");
  const announce = useContext(Announce);
  const box = useRef<HTMLDivElement>(null);
  const answered = (state: FormState) => {
    announce?.(state);
    handFocus(document.getElementById(headingId), box.current);
  };
  const [confirmState, confirm, confirming] = useFormAction(
    confirmRequest,
    t("errors.unknown"),
    answered,
  );
  const [declineState, decline, declining] = useFormAction(
    declineRequest,
    t("errors.unknown"),
    answered,
  );
  // The error shown is the one of the last thing she tried.
  const [tried, setTried] = useState<"confirm" | "decline">("confirm");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const field = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLButtonElement>(null);
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
  const busy = confirming || declining;
  const shown = tried === "confirm" ? confirmState : declineState;
  const extra: Record<string, string> = back ? { back } : {};

  return (
    <div ref={box} className="grid gap-2">
      {open ? (
        <form
          className="grid gap-3 rounded-md border border-quadrillage bg-sunken p-3"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setTried("decline");
            sendFields(decline, { id, reason, ...extra });
          }}
        >
          <div ref={field}>
            <TextareaField
              id={`decline-${id}`}
              label={t("declineReason")}
              hint={t("declineHint")}
              rows={2}
              maxLength={MAX_REASON_LENGTH}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="outline" size="sm" disabled={busy}>
              {t("declineConfirm")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={busy}
              onClick={() => toggle(false)}
            >
              {t("keepRequest")}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            disabled={busy}
            aria-label={t("confirmLabel", { who })}
            onClick={() => {
              setTried("confirm");
              sendFields(confirm, { id, ...extra });
            }}
          >
            <Check aria-hidden="true" />
            {confirming ? t("confirming") : t("confirm")}
          </Button>
          <Button
            ref={start}
            type="button"
            size="sm"
            variant="outline"
            disabled={busy}
            aria-label={t("declineLabel", { who })}
            onClick={() => toggle(true)}
          >
            {t("decline")}
          </Button>
        </div>
      )}
      <FormMessage state={shown.status === "error" ? shown : initialFormState} />
    </div>
  );
}
