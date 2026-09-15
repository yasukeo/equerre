import { CircleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Input, Label, Select } from "./input";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

function FieldShell({ id, label, hint, error, className, children }: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {hint ? (
        <p id={hintId} className="text-sm text-encre-douce">
          {hint}
        </p>
      ) : null}
      {children(describedBy)}
      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm text-stylo-rouge">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function Field({ id, label, hint, error, className, ...inputProps }: FieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      {(describedBy) => (
        <Input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />
      )}
    </FieldShell>
  );
}

type SelectFieldProps = Omit<ComponentProps<"select">, "id"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function SelectField({
  id,
  label,
  hint,
  error,
  className,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      {(describedBy) => (
        <Select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...selectProps}
        >
          {children}
        </Select>
      )}
    </FieldShell>
  );
}
