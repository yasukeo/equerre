"use client";

import { Check, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOptimistic, useTransition } from "react";
import { setUnderstood } from "@/app/eleve/cours/actions";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { cn } from "@/lib/utils";

/**
 * « J’ai compris » at the end of a lesson, « Série faite » at the end of exercises: the mark
 * that moves her ruler. Once given it reads as done, in ink, and can be taken back.
 */
export function UnderstoodToggle({
  lessonId,
  understood,
  kind,
}: {
  lessonId: string;
  understood: boolean;
  kind: DocumentKind;
}) {
  const t = useTranslations("student.progress");
  const [optimistic, setOptimistic] = useOptimistic(understood);
  const [pending, startTransition] = useTransition();
  const practice = kind === "serie" || kind === "devoir";

  const toggle = (value: boolean) =>
    startTransition(async () => {
      setOptimistic(value);
      await setUnderstood(lessonId, value);
    });

  if (optimistic) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2" data-pending={pending || undefined}>
        <p className="inline-flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-full bg-encre text-papier">
            <Check aria-hidden="true" className="size-5" />
          </span>
          {t(practice ? "doneDone" : "understoodDone")}
        </p>
        <button
          type="button"
          onClick={() => toggle(false)}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-encre-douce underline decoration-trait underline-offset-4 hover:text-encre"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          {t("undo")}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(true)}
      data-pending={pending || undefined}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-encre px-5 text-lg font-medium text-papier transition-colors hover:bg-encre/90",
      )}
    >
      <Check aria-hidden="true" className="size-5" />
      {t(practice ? "markDone" : "markUnderstood")}
    </button>
  );
}
