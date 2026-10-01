import Link from "next/link";
import { PdfLinks } from "@/components/pdf-links";
import { kindHue } from "@/lib/design/colors";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  id: string;
  version: string;
  kind: DocumentKind;
  kindLabel: string;
  title: string;
  summary: string | null;
  /** Read after the title by a screen reader where documents of several chapters sit together. */
  context?: string;
};

/**
 * One document in a list (D-100): its kind in its colour on the leading edge and above the
 * title, the title to open it, its PDF beside it.
 */
export function DocumentCard({
  href,
  id,
  version,
  kind,
  kindLabel,
  title,
  summary,
  context,
}: Props) {
  const colour = kindHue(kind);
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-s-4 border-quadrillage bg-surface py-2 ps-3 pe-2",
        colour.edge,
      )}
    >
      <Link href={href} className="group grid min-h-11 min-w-0 flex-1 content-center gap-0.5">
        <span className={cn("text-[0.6875rem] font-semibold tracking-wide uppercase", colour.text)}>
          {kindLabel}
        </span>
        <span className="font-medium group-hover:underline group-hover:underline-offset-4">
          {frenchSpaces(title)}
          {context ? <span className="sr-only">, {context}</span> : null}
        </span>
        {summary ? (
          <span className="line-clamp-2 text-sm text-encre-douce">{frenchSpaces(summary)}</span>
        ) : null}
      </Link>
      <PdfLinks id={id} version={version} kind={kind} title={title} variant="compact" />
    </div>
  );
}
