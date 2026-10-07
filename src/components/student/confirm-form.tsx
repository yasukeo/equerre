"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type Tone = "primary" | "outline" | "quiet";

const TONES: Record<Tone, string> = {
  primary: "bg-bleu-bande text-white hover:bg-bleu-bande/90",
  outline: "border border-trait bg-surface text-encre hover:bg-sunken",
  quiet: "text-encre underline decoration-trait underline-offset-4 hover:decoration-encre",
};

/**
 * An action that cannot be taken back, asked twice (D-104): the first tap shows the question
 * and its consequence beside the button; only the second sends the form. Focus moves to the
 * confirmation, and back to the button if she changes her mind.
 */
export function ConfirmForm({
  action,
  fields = {},
  children,
  trigger,
  icon,
  question,
  confirm,
  cancel,
  tone = "primary",
  className,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields?: Record<string, string>;
  /** Form controls shown before asking: the exam's duration. */
  children?: ReactNode;
  trigger: string;
  icon?: ReactNode;
  question: string;
  confirm: string;
  cancel: string;
  tone?: Tone;
  className?: string;
}) {
  const [asking, setAsking] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const questionId = useId();
  const wasAsking = useRef(false);

  useEffect(() => {
    if (asking) confirmRef.current?.focus();
    else if (wasAsking.current) triggerRef.current?.focus();
    wasAsking.current = asking;
  }, [asking]);

  const button =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 font-medium";

  return (
    <form action={action} className={cn("grid gap-3", className)}>
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children}
      {asking ? (
        <div
          role="group"
          aria-labelledby={questionId}
          className="grid gap-3 rounded-xl border-2 border-encre bg-sunken p-4"
        >
          <p id={questionId} className="font-medium">
            {question}
          </p>
          <div className="flex flex-wrap gap-2">
            <ConfirmButton
              ref={confirmRef}
              className={cn(button, "bg-encre text-papier hover:bg-encre/90")}
            >
              {confirm}
            </ConfirmButton>
            <button
              type="button"
              onClick={() => setAsking(false)}
              className={cn(button, "border border-trait bg-surface text-encre hover:bg-papier")}
            >
              {cancel}
            </button>
          </div>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setAsking(true)}
          className={cn(
            tone === "quiet"
              ? "inline-flex min-h-11 items-center gap-2 justify-self-start text-sm"
              : button,
            "justify-self-start",
            TONES[tone],
          )}
        >
          {icon}
          {trigger}
        </button>
      )}
    </form>
  );
}

function ConfirmButton({
  ref,
  className,
  children,
}: {
  ref: React.Ref<HTMLButtonElement>;
  className: string;
  children: ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(className, "disabled:opacity-60")}
    >
      {children}
    </button>
  );
}
