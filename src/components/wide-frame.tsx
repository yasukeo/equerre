"use client";

import { useSyncExternalStore } from "react";

const WIDE = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A document read in place, on a wide screen only. A frame merely hidden by CSS still loads its
 * document, and a subject can weigh 20 MB on a phone's data plan: here it is not drawn at all
 * until the screen is wide enough (D-106).
 */
export function WideFrame({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
  return wide ? <iframe src={src} title={title} className={className} /> : null;
}
