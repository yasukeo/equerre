import { FileText } from "lucide-react";
import { isPdfPage } from "@/lib/storage-paths";

// A student's photographed pages, each opening full size, and a copy handed in as a PDF, opening
// in the reader's own viewer (D-106). No client code: the pages that show them may be server
// components, and a label function cannot cross into a client one.

export function PageGrid({
  pages,
  label,
  pdfLabel = label,
}: {
  pages: { path: string | null; url: string | null }[];
  label: (number: number) => string;
  pdfLabel?: (number: number) => string;
}) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {pages.map((page, index) => (
        <li key={page.path ?? index} className="grid gap-1">
          {page.path && isPdfPage(page.path) ? (
            <a
              href={page.url ?? undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={page.url ? undefined : true}
              className="grid aspect-[3/4] w-full place-content-center justify-items-center gap-2 rounded border border-quadrillage bg-rouge-fond text-rouge-texte"
            >
              <FileText aria-hidden="true" className="size-8" />
              <span className="text-sm font-semibold">PDF</span>
            </a>
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
          <span className="text-xs text-encre-douce">
            {page.path && isPdfPage(page.path) ? pdfLabel(index + 1) : label(index + 1)}
          </span>
        </li>
      ))}
    </ol>
  );
}
