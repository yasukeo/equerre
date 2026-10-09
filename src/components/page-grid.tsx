import { FileText } from "lucide-react";
import { isPdfPage } from "@/lib/storage-paths";

const isPdfName = (path: string | null | undefined) => Boolean(path && isPdfPage(path));

// A student's photographed pages, each opening full size, and a copy handed in as a PDF, opening
// in the reader's own viewer (D-106). No client code: the pages that show them may be server
// components, and a label function cannot cross into a client one.

export function PageGrid({
  pages,
  label,
  pdfLabel = label,
  newTabLabel,
}: {
  pages: { path: string | null; url: string | null }[];
  label: (number: number) => string;
  pdfLabel?: (number: number) => string;
  /** Said after a PDF's name: « (nouvel onglet) ». */
  newTabLabel?: string;
}) {
  // Pages and PDF copies are each counted among their own kind.
  const numberOf = (index: number) => {
    const pdf = isPdfName(pages[index]?.path);
    return pages.slice(0, index + 1).filter((page) => isPdfName(page.path) === pdf).length;
  };
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {pages.map((page, index) => (
        <li key={page.path ?? index} className="grid gap-1">
          {isPdfName(page.path) ? (
            page.url ? (
              <a
                href={page.url}
                target="_blank"
                rel="noreferrer"
                className="grid aspect-[3/4] w-full place-content-center justify-items-center gap-2 rounded border border-quadrillage bg-lavis-bleu text-stylo-bleu"
              >
                <FileText aria-hidden="true" className="size-8" />
                <span aria-hidden="true" className="text-sm font-semibold">
                  PDF
                </span>
                <span className="sr-only">
                  {pdfLabel(numberOf(index))}
                  {newTabLabel ? ` ${newTabLabel}` : ""}
                </span>
              </a>
            ) : (
              <span
                aria-hidden="true"
                className="grid aspect-[3/4] w-full place-content-center rounded border border-quadrillage bg-sunken"
              >
                <FileText className="size-8 text-encre-douce" />
              </span>
            )
          ) : page.url ? (
            <a href={page.url} target="_blank" rel="noreferrer" className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.url}
                alt={label(index + 1)}
                className="aspect-[3/4] w-full rounded border border-quadrillage bg-white object-cover"
              />
            </a>
          ) : (
            <span
              aria-hidden="true"
              className="aspect-[3/4] w-full rounded border border-quadrillage bg-sunken"
            />
          )}
          <span
            aria-hidden={isPdfName(page.path) && page.url ? true : undefined}
            className="text-xs text-encre-douce"
          >
            {isPdfName(page.path) ? pdfLabel(numberOf(index)) : label(numberOf(index))}
          </span>
        </li>
      ))}
    </ol>
  );
}
