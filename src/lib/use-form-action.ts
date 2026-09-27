"use client";

import { unstable_rethrow } from "next/navigation";
import { startTransition, useActionState } from "react";
import { initialFormState, type FormState } from "@/lib/form-state";

/**
 * A server action behind a form. A thrown error (the network, a crash) becomes `failed`
 * instead of the error page; Next's own redirects still go through. `onSuccess` runs once the
 * action has succeeded, before the new state shows.
 */
export function useFormAction(
  action: (previous: FormState, formData: FormData) => Promise<FormState>,
  failed: string,
  onSuccess?: (state: FormState) => void,
) {
  return useActionState(async (previous: FormState, formData: FormData): Promise<FormState> => {
    try {
      const result = await action(previous, formData);
      if (result.status === "success") onSuccess?.(result);
      return result;
    } catch (error) {
      unstable_rethrow(error);
      return { status: "error", message: failed };
    }
  }, initialFormState);
}

/** Sends fields to an action from an event handler, as a transition. */
export function sendFields(action: (formData: FormData) => void, fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  startTransition(() => action(formData));
}
