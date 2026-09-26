import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

// One photographed page with the tutor's numbered marks on it (DECISIONS.md, D-047). No
// hooks: the student's page draws it on the server, the correction view in the browser.

export type Mark = { key: string; label: string; x: number; y: number; pending?: boolean };

export function AnnotatedPage({
  url,
  alt,
  marks,
  onPoint,
  openLabel,
}: {
  url: string | null;
  alt: string;
  marks: Mark[];
  /** Given only by the correction view: a click on the page places a remark there. */
  onPoint?: (x: number, y: number) => void;
  openLabel: string;
}) {
  const place = onPoint
    ? (event: MouseEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect();
        const share = (value: number) => Math.min(1, Math.max(0, value));
        onPoint(
          share((event.clientX - box.left) / box.width),
          share((event.clientY - box.top) / box.height),
        );
      }
    : undefined;

  return (
    <figure className="grid gap-1.5">
      {/* The keyboard way in is the « remarque sur cette page » button beside each page. */}
      <div
        onClick={place}
        className={cn(
          "relative overflow-hidden rounded border border-quadrillage bg-white",
          onPoint && "cursor-crosshair",
        )}
      >
        {url ? (
          // A signed address in the submissions bucket: never through the image optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={alt} className="block h-auto w-full select-none" draggable={false} />
        ) : (
          <div aria-hidden="true" className="aspect-[3/4] w-full bg-sunken" />
        )}
        {marks.map((mark) => (
          <span
            key={mark.key}
            aria-hidden="true"
            // Kept a half-mark inside the frame, so a remark in the margin is never cut in two.
            style={{
              left: `clamp(0.875rem, ${mark.x * 100}%, calc(100% - 0.875rem))`,
              top: `clamp(0.875rem, ${mark.y * 100}%, calc(100% - 0.875rem))`,
            }}
            className={cn(
              "pointer-events-none absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-semibold shadow-sm ring-2 ring-white",
              mark.pending
                ? "border-2 border-dashed border-correction bg-white text-correction"
                : "bg-correction text-white",
            )}
          >
            {mark.label}
          </span>
        ))}
      </div>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {openLabel}
        </a>
      ) : null}
    </figure>
  );
}

/** A remark's number, as it appears on the page. */
export function RemarkNumber({ number }: { number: number }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-correction text-xs font-semibold text-white">
      {number}
    </span>
  );
}
