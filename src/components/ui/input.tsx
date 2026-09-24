import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const controlClasses =
  "min-h-11 w-full rounded-md border border-trait bg-surface px-3 text-base text-encre placeholder:text-encre-douce aria-invalid:border-stylo-rouge disabled:opacity-60";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input data-slot="input" className={cn(controlClasses, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(controlClasses, "py-2 leading-relaxed", className)}
      {...props}
    />
  );
}

/** A native select: the most reliable picker on low-end Android. */
export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select data-slot="select" className={cn(controlClasses, "pe-8", className)} {...props} />;
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium text-encre", className)} {...props} />;
}
