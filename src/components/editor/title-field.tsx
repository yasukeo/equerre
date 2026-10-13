"use client";

import { CircleAlert } from "lucide-react";
import { useLayoutEffect, useRef, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A document's title, written where the page's title would be (D-108): large, on a ruled line
 * rather than in a box, as on the first line of a sheet. The rule is the control's edge, in the
 * colour every input's edge has (3:1, WCAG 1.4.11), and darkens under the pointer.
 *
 * A text area one line high that grows with its text, so a long title wraps on a phone instead
 * of running out of sight. A title is one line: pasted line breaks become spaces, and Entrée
 * saves, as in any one-line field.
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
  // Where the browser cannot size a field to its text (`field-sizing`), it is grown by hand.
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const field = ref.current;
    if (!field || CSS.supports("field-sizing", "content")) return;
    field.style.height = "auto";
    field.style.height = `${field.scrollHeight + field.offsetHeight - field.clientHeight}px`;
  }, [props.value]);
  return (
    <div className={cn("grid gap-1", className)}>
      <label htmlFor={id} className="text-sm font-medium text-encre-douce">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        rows={1}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onKeyDown={(event) => {
          if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
          event.preventDefault();
          // What Entrée does in a one-line field: submit with the form's first button, which
          // may sit outside the form and join it by its `form` attribute.
          const form = event.currentTarget.form;
          const first = Array.from(form?.elements ?? []).find(
            (element): element is HTMLButtonElement =>
              element instanceof HTMLButtonElement &&
              element.type === "submit" &&
              !element.disabled,
          );
          if (form && first) form.requestSubmit(first);
        }}
        onPaste={(event) => {
          const text = event.clipboardData.getData("text");
          if (!/[\r\n]/.test(text)) return;
          // Its line breaks become spaces, and the caret stays after what was pasted.
          event.preventDefault();
          const field = event.currentTarget;
          field.setRangeText(
            text.replace(/\s*[\r\n]+\s*/g, " "),
            field.selectionStart,
            field.selectionEnd,
            "end",
          );
          onChange?.({ target: field, currentTarget: field } as ChangeEvent<HTMLTextAreaElement>);
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
