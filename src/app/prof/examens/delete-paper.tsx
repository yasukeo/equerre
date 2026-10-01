"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { initialFormState } from "@/lib/form-state";
import { deletePaper } from "./actions";

/** Takes a paper off the site, with its PDFs, after a second press. */
export function DeletePaper({ id, hasSolution }: { id: string; hasSolution: boolean }) {
  const t = useTranslations("tutor.exams.delete");
  const [state, action, pending] = useActionState(deletePaper, initialFormState);
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
      aria-labelledby="paper-delete-title"
      className="grid max-w-xl gap-3 border-t border-quadrillage pt-6"
    >
      <h2 id="paper-delete-title" className="text-sm font-semibold">
        {t("title")}
      </h2>
      {confirming ? (
        <form action={action} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={id} />
          <p ref={questionRef} tabIndex={-1} className="basis-full text-sm">
            {t("confirmQuestion", { solution: hasSolution ? "yes" : "no" })}
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
