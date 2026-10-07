"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOptimistic, useTransition } from "react";
import { setBookmark } from "@/app/eleve/cours/actions";
import { cn } from "@/lib/utils";

/** Keeps a document « à revoir », or lets it go: a toggle that answers at once. */
export function BookmarkToggle({
  lessonId,
  saved,
  title,
  compact = false,
}: {
  lessonId: string;
  saved: boolean;
  /** The document's title, so a screen reader knows which one the button is for. */
  title: string;
  compact?: boolean;
}) {
  const t = useTranslations("student.progress");
  const [optimistic, setOptimistic] = useOptimistic(saved);
  const [pending, startTransition] = useTransition();

  const toggle = () =>
    startTransition(async () => {
      setOptimistic(!optimistic);
      await setBookmark(lessonId, !optimistic);
    });

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={optimistic}
      aria-label={compact ? t("saveFor", { title }) : undefined}
      data-pending={pending || undefined}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors",
        compact ? "size-11" : "px-3",
        optimistic
          ? // Kept to revise is what a highlighter is for (DESIGN.md).
            "border-encre-fixe/30 bg-surligneur text-encre-fixe hover:brightness-95"
          : "border-trait bg-surface text-encre hover:bg-sunken",
      )}
    >
      {optimistic ? (
        <BookmarkCheck aria-hidden="true" className="size-5" />
      ) : (
        <Bookmark aria-hidden="true" className="size-5" />
      )}
      {compact ? null : <span>{t("save")}</span>}
    </button>
  );
}
