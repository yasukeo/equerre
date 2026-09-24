"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { renderMath } from "@/lib/lesson/math";

export type MathTarget = {
  display: boolean;
  latex: string;
  /** Where the formula already sits, or null to insert a new one. */
  pos: number | null;
};

type Props = {
  target: MathTarget;
  onSubmit: (latex: string) => void;
  onRemove: () => void;
  onClose: () => void;
};

/**
 * A native <dialog>: focus is trapped and Échap closes it without any library. Its caller
 * renders it only while a formula is being edited, and a modal cannot be left for another
 * formula without closing, so each opening mounts it afresh with that formula's LaTeX.
 */
export function MathDialog({ target, onSubmit, onRemove, onClose }: Props) {
  const t = useTranslations("tutor.lessonEditor.math");
  const ref = useRef<HTMLDialogElement>(null);
  const [latex, setLatex] = useState(target.latex);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // The same options as the page (trust off), so the preview is what readers will see.
  const preview = useMemo(
    () => (latex.trim() === "" ? "" : renderMath(latex, target.display)),
    [latex, target.display],
  );

  const editing = target.pos !== null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="math-dialog-title"
      className="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-lg border border-quadrillage bg-surface p-0 text-encre backdrop:bg-encre/40"
    >
      <form
        className="grid gap-4 p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (latex.trim() !== "") onSubmit(latex.trim());
        }}
      >
        <h2 id="math-dialog-title" className="text-lg font-semibold">
          {target.display ? t("titleBlock") : t("titleInline")}
        </h2>

        <div className="grid gap-1.5">
          <label htmlFor="math-latex" className="text-sm font-medium">
            {t("latex")}
          </label>
          <textarea
            id="math-latex"
            value={latex}
            onChange={(event) => setLatex(event.target.value)}
            rows={3}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            dir="ltr"
            className="min-h-11 w-full rounded-md border border-trait bg-surface px-3 py-2 font-mono text-base text-encre"
            aria-describedby="math-hint"
          />
          <p id="math-hint" className="text-sm text-encre-douce">
            {t("hint")}
          </p>
        </div>

        <div className="grid gap-1.5">
          <p className="text-sm font-medium">{t("preview")}</p>
          <div
            className="lecon-corps min-h-12 overflow-x-auto rounded-md border border-quadrillage bg-papier px-3 py-2"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={latex.trim() === ""}>
            {editing ? t("update") : t("insert")}
          </Button>
          <Button type="button" variant="outline" onClick={() => ref.current?.close()}>
            {t("cancel")}
          </Button>
          {editing ? (
            <Button
              type="button"
              variant="ghost"
              className="ms-auto text-stylo-rouge"
              onClick={onRemove}
            >
              {t("remove")}
            </Button>
          ) : null}
        </div>
      </form>
    </dialog>
  );
}
