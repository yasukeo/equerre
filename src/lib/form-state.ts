import type { ZodError } from "zod";

/** The typed result every form action returns. Passwords are never echoed back in `values`. */
export type FormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<string, string>>;
      values?: Record<string, string>;
    }
  | {
      status: "success";
      message: string;
      /** Extra content to show with the message, such as a link or a code. */
      detail?: string;
      values?: Record<string, string>;
    };

export const initialFormState: FormState = { status: "idle" };

/** Maps zod issues to one translated message per field, keeping the first issue for each. */
export function fieldErrorsFor(
  error: ZodError,
  messages: Record<string, string>,
): Partial<Record<string, string>> {
  const result: Partial<Record<string, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && field in messages && result[field] === undefined) {
      result[field] = messages[field];
    }
  }
  return result;
}

export function submittedValue(state: FormState, field: string): string | undefined {
  return state.status === "idle" ? undefined : state.values?.[field];
}

export function fieldError(state: FormState, field: string): string | undefined {
  return state.status === "error" ? state.fieldErrors?.[field] : undefined;
}

/** Reads a text field from FormData; files and missing fields become "". */
export function textField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
