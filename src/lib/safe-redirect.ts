/**
 * Keeps a post-sign-in redirect on this site: a path starting with a single slash.
 * Anything else (`//evil.test`, `https://…`, `/\evil.test`) falls back.
 */
export function safeRedirectPath(value: unknown, fallback: string): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/\\")
  ) {
    return fallback;
  }
  return value;
}
