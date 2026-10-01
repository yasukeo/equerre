import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { kindHue } from "@/lib/design/colors";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

type Item = { slug: string; title: string; kind: DocumentKind };

type Props = {
  /** The chapter's page: each document's address is under it. */
  base: string;
  chapterTitle: string;
  documents: Item[];
  current: string;
};

/**
 * The chapter around a document (D-100): its documents in order, the one open marked, so a
 * student goes from the course's first part to its second, then to the series, without
 * going back up.
 */
export async function ChapterDocuments({ base, chapterTitle, documents, current }: Props) {
  const [t, tKind] = await Promise.all([
    getTranslations("lesson"),
    getTranslations("documentKind"),
  ]);
  return (
    <nav
      aria-label={t("inChapter")}
      className="rounded-2xl border border-quadrillage bg-surface p-4"
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-encre-douce uppercase">
        {t("inChapter")}
      </p>
      <Link
        href={base}
        className="mt-1 inline-flex min-h-11 items-center font-medium underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {frenchSpaces(chapterTitle)}
      </Link>
      <ol role="list" className="mt-2 grid gap-1">
        {documents.map((document) => {
          const here = document.slug === current;
          return (
            <li key={document.slug}>
              <Link
                href={`${base}/${document.slug}`}
                aria-current={here ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-sm hover:bg-sunken",
                  here ? cn("font-medium", kindHue(document.kind).chip) : null,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("size-2.5 shrink-0 rounded-sm", kindHue(document.kind).dot)}
                />
                <span className="grid">
                  <span className="text-[0.6875rem] tracking-wide text-encre-douce uppercase">
                    {tKind(`one.${document.kind}`)}
                  </span>
                  <span>{frenchSpaces(document.title)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** The documents before and after this one in its chapter, as two big buttons. */
export async function DocumentPager({ base, documents, current }: Omit<Props, "chapterTitle">) {
  const t = await getTranslations("lesson");
  const index = documents.findIndex((document) => document.slug === current);
  const previous = index > 0 ? documents[index - 1] : undefined;
  const next = index >= 0 ? documents[index + 1] : undefined;
  if (!previous && !next) return null;

  const card =
    "grid min-h-16 content-center gap-0.5 rounded-2xl border border-quadrillage bg-surface px-4 py-3 hover:border-trait";
  return (
    <nav aria-label={t("pager")} className="mt-12 grid gap-3 sm:grid-cols-2 print:hidden">
      {previous ? (
        <Link href={`${base}/${previous.slug}`} className={card}>
          <span className="flex items-center gap-1.5 text-xs text-encre-douce">
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            {t("previousDocument")}
          </span>
          <span className="font-medium">{frenchSpaces(previous.title)}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`${base}/${next.slug}`} className={cn(card, "text-end")}>
          <span className="flex items-center justify-end gap-1.5 text-xs text-encre-douce">
            {t("nextDocument")}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </span>
          <span className="font-medium">{frenchSpaces(next.title)}</span>
        </Link>
      ) : null}
    </nav>
  );
}
