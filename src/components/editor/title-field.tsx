"use client";

import { CircleAlert } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A document's title, written where the page's title would be (D-108): large, on a ruled line
 * rather than in a box, as on the first line of a sheet. The rule is the control's edge, in the
 * colour every input's edge has (3:1, WCAG 1.4.11), and darkens under the pointer.
 *
 * A text area one line high that grows with its text, so a long title wraps on a phone instead
 * of running out of sight; a title is one line, so Entrée and pasted line breaks become spaces.
 */
export function TitleField({
  id,
  label,
  error,
  className,
  onChange,
  ...props
}: Omit<ComponentProps<"textarea">, "id" | "rows"> & {
  id: string;
  label: string;
  error?: string;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("grid gap-1", className)}>
      <label htmlFor={id} className="text-sm font-medium text-encre-douce">
        {label}
      </label>
      <textarea
        id={id}
        rows={1}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        onChange={(event) => {
          if (/[\r\n]/.test(event.target.value)) {
            event.target.value = event.target.value.replace(/\s*[\r\n]+\s*/g, " ");
          }
          onChange?.(event);
        }}
        className="[field-sizing:content] min-h-14 w-full resize-none border-0 border-b-2 border-trait bg-transparent px-0 py-2 text-[clamp(1.5rem,1.25rem+1.1vw,2rem)] leading-tight font-semibold text-encre [font-variation-settings:'HEXP'_45] placeholder:text-encre-douce hover:border-encre aria-invalid:border-stylo-rouge"
        {...props}
      />
      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm text-stylo-rouge">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
