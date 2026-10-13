import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A form that makes something, in two columns from 1024 px: its fields, then its preview. */
export const FORM_WITH_PREVIEW = "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]";

/**
 * The aside of a form that makes something (D-108): the thing as the person it is for will see
 * it, drawn with the pieces of the page that will show it, and under it the button that makes
 * it. Beside the fields on a wide screen, where it stays in view while they scroll; after them
 * on a phone, where the button ends the form.
 */
export function FormPreview({
  id,
  title,
  caption,
  children,
  footer,
  className,
}: {
  id: string;
  /** « Aperçu ». */
  title: string;
  /** Whose eyes it is drawn for: « Ce que Salma verra dans son agenda. » */
  caption?: ReactNode;
  children: ReactNode;
  /** The message of the last attempt and the button. */
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn("grid min-w-0 content-start gap-4 lg:sticky lg:top-24", className)}
    >
      <div className="grid gap-0.5">
        <h2
          id={`${id}-title`}
          className="text-xs font-semibold tracking-wide text-encre-douce uppercase"
        >
          {title}
        </h2>
        {caption ? <p className="text-sm text-encre-douce">{caption}</p> : null}
      </div>
      {children}
      {footer ? <div className="grid gap-3">{footer}</div> : null}
    </section>
  );
}

/** What stands in for the preview until the fields it needs are filled. */
export function PreviewPlaceholder({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-trait bg-surface p-6 text-sm text-encre-douce">
      {children}
    </p>
  );
}
