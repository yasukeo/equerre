import { Download, ExternalLink, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

/**
 * A homework's subject given as a PDF (D-106): opened in a new tab, downloaded, and on a wide
 * screen read in place. Phones read a PDF better in their own viewer, so no frame there.
 */
export function SubjectCard({
  url,
  heading,
  openLabel,
  downloadLabel,
  newTabLabel,
  unavailableLabel,
  previewLabel,
  preview = false,
  className,
}: {
  url: string | null;
  heading: string;
  openLabel: string;
  downloadLabel: string;
  /** Said after « Ouvrir » to a screen reader: « (nouvel onglet) ». */
  newTabLabel: string;
  unavailableLabel: string;
  /** The frame's title, for a screen reader. */
  previewLabel: string;
  preview?: boolean;
  className?: string;
}) {
  return (
    <section
      aria-label={heading}
      className={cn(
        "grid gap-3 rounded-2xl border border-s-4 border-quadrillage border-s-rouge bg-surface p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rouge-fond text-rouge-texte"
        >
          <FileText className="size-5" />
        </span>
        <p className="min-w-0 flex-1 basis-40 font-semibold">{heading}</p>
        {url ? (
          <span className="flex flex-wrap gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              {openLabel}
              <span className="sr-only"> {newTabLabel}</span>
            </a>
            <a
              href={`${url}${url.includes("?") ? "&" : "?"}download=`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Download aria-hidden="true" className="size-4" />
              {downloadLabel}
            </a>
          </span>
        ) : (
          <span className="text-sm text-encre-douce">{unavailableLabel}</span>
        )}
      </div>
      {url && preview ? (
        <iframe
          src={url}
          title={previewLabel}
          className="hidden h-[75vh] w-full rounded-xl border border-quadrillage bg-white lg:block"
        />
      ) : null}
    </section>
  );
}
