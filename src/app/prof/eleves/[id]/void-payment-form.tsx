"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { voidPayment } from "@/app/prof/paiements/actions";
import { fieldError } from "@/lib/form-state";
import { MAX_VOID_REASON_LENGTH } from "@/lib/payments/limits";
import { sendFields, useFormAction } from "@/lib/use-form-action";

/** Voids a payment, with the reason its receipt will carry. Folded until she needs it. */
export function VoidPaymentForm({ id }: { id: string }) {
  const t = useTranslations("account");
  const [reason, setReason] = useState("");
  const [state, action, pending] = useFormAction(voidPayment, t("errors.unknown"));

  return (
    <details className="text-sm">
      <summary className="inline-flex min-h-11 cursor-pointer items-center underline decoration-trait underline-offset-4 hover:decoration-encre">
        {t("void")}
      </summary>
      <form
        className="grid gap-3 pt-2"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          sendFields(action, { id, reason });
        }}
      >
        <TextareaField
          id={`void-${id}`}
          label={t("voidReason")}
          hint={t("voidHint")}
          rows={2}
          maxLength={MAX_VOID_REASON_LENGTH}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          error={fieldError(state, "reason")}
        />
        <FormMessage state={state} />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={pending}
          className="justify-self-start"
        >
          {pending ? t("voiding") : t("voidSubmit")}
        </Button>
      </form>
    </details>
  );
}
