"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { formatLocal } from "@/lib/dates";
import { MAX_REQUEST_NOTE_LENGTH } from "@/lib/sessions/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { requestSession } from "../actions";

type Slot = { startsAt: string; endsAt: string };

/** The day's free times, the one she picks, a word for the tutor, and the request itself. */
export function BookingForm({
  typeId,
  slots,
  autoConfirm,
}: {
  typeId: string;
  slots: Slot[];
  autoConfirm: boolean;
}) {
  const t = useTranslations("student.booking");
  const [startsAt, setStartsAt] = useState("");
  const [state, action, pending] = useFormAction(requestSession, t("errors.unknown"));
  const [note, setNote] = useState("");
  const chosen = slots.find((slot) => slot.startsAt === startsAt);

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, { typeId, startsAt, note });
      }}
    >
      <fieldset className="grid gap-3">
        <legend className="mb-2 text-lg font-medium">{t("slotHeading")}</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((slot) => (
            <label
              key={slot.startsAt}
              className="relative flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-trait bg-surface text-base font-medium tabular has-checked:border-encre has-checked:bg-encre has-checked:text-papier has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-encre"
            >
              <input
                type="radio"
                name="slot"
                value={slot.startsAt}
                checked={startsAt === slot.startsAt}
                onChange={() => setStartsAt(slot.startsAt)}
                className="sr-only"
              />
              {formatLocal(slot.startsAt, "HH:mm")}
            </label>
          ))}
        </div>
      </fieldset>

      {chosen ? (
        <p className="rounded-md border border-quadrillage bg-sunken px-3 py-2.5 first-letter:uppercase">
          {t("summary", {
            date: formatLocal(chosen.startsAt, "EEEE d MMMM"),
            start: formatLocal(chosen.startsAt, "HH:mm"),
            end: formatLocal(chosen.endsAt, "HH:mm"),
          })}
        </p>
      ) : null}

      <TextareaField
        id="booking-note"
        label={t("noteLabel")}
        hint={t("noteHint")}
        rows={3}
        maxLength={MAX_REQUEST_NOTE_LENGTH}
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <p className="text-sm text-encre-douce">{autoConfirm ? t("autoHint") : t("pendingHint")}</p>
      <FormMessage state={state} />
      <Button
        type="submit"
        disabled={pending}
        aria-disabled={!chosen || undefined}
        className="justify-self-start"
        onClick={(event) => {
          if (!chosen) {
            event.preventDefault();
            document.querySelector<HTMLInputElement>('input[name="slot"]')?.focus();
          }
        }}
      >
        {pending ? t("sending") : autoConfirm ? t("submitBook") : t("submitRequest")}
      </Button>
      {!chosen ? <p className="-mt-3 text-sm text-encre-douce">{t("pickSlot")}</p> : null}
    </form>
  );
}
