"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOptimistic, useState, useTransition } from "react";
import { setUnderstood } from "@/app/eleve/cours/actions";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { cn } from "@/lib/utils";

/**
 * « J’ai compris » at the end of a lesson, « J’ai fini » at the end of exercises: the mark that
 * moves her ruler. One button that stays where it is, pressed once given, so focus never drops;
 * pressing it again takes the mark back. What happened is said in a status line.
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
  const [failed, setFailed] = useState(false);
  const practice = kind === "serie" || kind === "devoir";

  const toggle = () =>
    startTransition(async () => {
      const next = !optimistic;
      setOptimistic(next);
      const result = await setUnderstood(lessonId, next);
      setFailed(!result.ok);
    });

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={optimistic}
        data-pending={pending || undefined}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 justify-self-start rounded-md border-2 px-5 text-lg font-medium transition-colors",
          optimistic
            ? "border-encre bg-surface text-encre hover:bg-sunken"
            : "border-encre bg-encre text-papier hover:bg-encre/90",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex size-6 items-center justify-center rounded-full",
            optimistic ? "bg-encre text-papier" : "border-2 border-papier/70",
          )}
        >
          {optimistic ? <Check className="size-4" /> : null}
        </span>
        {t(practice ? "markDone" : "markUnderstood")}
      </button>
      <p role="status" className="text-sm text-encre-douce">
        {failed ? t("notSaved") : optimistic ? t(practice ? "doneDone" : "understoodDone") : null}
      </p>
    </div>
  );
}
