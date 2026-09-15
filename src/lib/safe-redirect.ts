const BASE_ORIGIN = "http://equerre.invalid";

/** Browsers strip tabs and newlines from URLs and read `\` as `/`, so "/\t/evil.test" is "//evil.test". */
function hasControlCharacterOrBackslash(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x20 || code === 0x7f || code === 0x5c) {
      return true;
    }
  }
  return false;
}

/**
 * Keeps a post-sign-in redirect on this site. The value must start with a slash and contain no
 * control characters or backslashes; it is then parsed against a fixed origin, and anything that
 * resolves to another origin (`//evil.test`, `https://…`) falls back.
 *
 * Parsing removes dot segments, which can turn "/.//evil.test" into "//evil.test". That result
 * would be protocol-relative once used as a Location, so any path that starts with "//" after
 * normalisation falls back too.
 */
export function safeRedirectPath(value: unknown, fallback: string): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    hasControlCharacterOrBackslash(value)
  ) {
    return fallback;
  }

  let url: URL;
  try {
    url = new URL(value, BASE_ORIGIN);
  } catch {
    return fallback;
  }

  if (url.origin !== BASE_ORIGIN || url.pathname.startsWith("//")) {
    return fallback;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
