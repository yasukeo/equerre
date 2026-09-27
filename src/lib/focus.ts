/**
 * Hands focus to `target` when what held it goes away or changes — unless she has moved on
 * meanwhile. A slow answer from the server must not pull focus, and on a phone the page and
 * the keyboard with it, away from the field she is typing in now. Focus moves only if it is
 * nowhere (the body) or still inside `from`, the element that is going.
 */
export function handFocus(target: HTMLElement | null, from: HTMLElement | null) {
  const active = document.activeElement;
  if (active && active !== document.body && from && !from.contains(active)) return;
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ block: "nearest" });
}
