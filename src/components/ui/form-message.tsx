import { Check, CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import type { FormState } from "@/lib/form-state";

/**
 * The live region is always in the DOM so screen readers announce the result
 * as soon as it appears.
 */
export function FormMessage({ state, children }: { state: FormState; children?: ReactNode }) {
  return (
    <div aria-live="polite" role="status">
      {state.status === "error" ? (
        <p className="flex items-start gap-2 rounded-md border border-stylo-rouge/40 bg-lavis-rouge px-3 py-2.5 text-sm text-stylo-rouge">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </p>
      ) : null}
      {state.status === "success" ? (
        <div className="grid gap-2 rounded-md border border-quadrillage bg-sunken px-3 py-2.5 text-sm text-encre">
          <p className="flex items-start gap-2">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{state.message}</span>
          </p>
          {children}
        </div>
      ) : null}
    </div>
  );
}
