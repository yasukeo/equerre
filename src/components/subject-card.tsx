import { Download, ExternalLink, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { WideFrame } from "@/components/wide-frame";
import { cn } from "@/lib/utils";

/**
 * A homework's subject given as a PDF (D-106): opened in a new tab, downloaded, and on a wide
 * screen read in place. Phones read a PDF better in their own viewer, so no frame there. The
 * subject is the tutor's own file: it alone is ever framed, never a student's copy.
 */
export function SubjectCard({
  url,
  heading,
  openLabel,
  downloadLabel,
  newTabLabel,
  unavailableLabel,
  preview = false,
  primary = false,
  className,
}: {
  url: string | null;
  heading: string;
  openLabel: string;
  downloadLabel: string;
  /** Said after « Ouvrir » to a screen reader: « (nouvel onglet) ». */
  newTabLabel: string;
  unavailableLabel: string;
  preview?: boolean;
  /** « Ouvrir » in blue when opening the subject is what the page is for. */
  primary?: boolean;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="subject-heading"
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
        <h2 id="subject-heading" className="min-w-0 flex-1 basis-40 font-semibold">
          {heading}
        </h2>
        {url ? (
          <span className="flex flex-wrap gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: primary ? "default" : "outline", size: "sm" })}
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
        <WideFrame
          src={url}
          title={heading}
          className="h-[75vh] w-full rounded-xl border border-quadrillage bg-white"
        />
      ) : null}
    </section>
  );
}
