import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { DocumentCard } from "@/components/course/document-card";
import { cycleHue, kindHue } from "@/lib/design/colors";
import type { DocumentKind } from "@/lib/lesson/kinds";
import type { ProgrammeChapter } from "@/lib/lesson/queries";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

/** Where each kind goes in an opened chapter: learn, practise, test yourself. */
const COLUMNS: { key: "learn" | "practice" | "assess"; kinds: DocumentKind[] }[] = [
  { key: "learn", kinds: ["cours", "resume"] },
  { key: "practice", kinds: ["serie"] },
  { key: "assess", kinds: ["devoir"] },
];

type Props = {
  programmeSlug: string;
  cycle: string;
  chapter: ProgrammeChapter & { number: number };
  open?: boolean;
};

/**
 * A chapter as a binder divider (D-100): its number on a tab in its level's colour, its title,
 * what it holds, and, opened, its documents in three columns. A native <details>: it opens
 * with a tap or the keyboard, with no script. A chapter not written yet is shown, dimmed, so
 * the whole year is there.
 */
export async function ChapterFolder({ programmeSlug, cycle, chapter, open = false }: Props) {
  const [t, tKind] = await Promise.all([
    getTranslations("programmePage"),
    getTranslations("documentKind"),
  ]);
  const level = cycleHue(cycle);
  const count = (kinds: DocumentKind[]) =>
    chapter.documents.filter((document) => kinds.includes(document.kind)).length;
  const counts = (["cours", "resume", "serie", "devoir"] as const)
    .map((kind) => ({ kind, n: count([kind]) }))
    .filter((entry) => entry.n > 0);
  const base = `/cours/${programmeSlug}/${chapter.slug}`;

  const tab = (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl text-xl font-semibold [font-variation-settings:'HEXP'_45] sm:size-14",
        level.band,
      )}
    >
      {chapter.number}
    </span>
  );
  const title = (
    <>
      <span className="sr-only">{t("chapter", { number: chapter.number })} </span>
      {frenchSpaces(chapter.title)}
    </>
  );
  const description = chapter.description ? frenchSpaces(chapter.description) : null;

  if (chapter.documents.length === 0) {
    return (
      <li className="flex items-center gap-3 rounded-2xl border border-dashed border-trait bg-surface/60 p-2.5 pe-4">
        {tab}
        <div className="grid min-w-0 flex-1 gap-0.5">
          <h3 className="text-base font-medium sm:text-[1.0625rem]">{title}</h3>
          {description ? (
            <p className="line-clamp-1 text-sm text-encre-douce">{description}</p>
          ) : null}
          <p className="text-sm text-encre-douce">{t("inPreparation")}</p>
        </div>
      </li>
    );
  }

  return (
    <li>
      <details
        open={open}
        className="group rounded-2xl border border-quadrillage bg-surface open:border-trait open:shadow-[0_0_0_3px_var(--sunken)]"
      >
        {/* A summary holds only phrasing content and headings: the layout is the summary's
            own grid, with no wrapper around the heading. */}
        <summary className="grid cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 rounded-2xl p-2.5 pe-3 hover:bg-sunken/60 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] [&::-webkit-details-marker]:hidden">
          <span className="row-span-2 self-center">{tab}</span>
          <h3
            className={cn(
              "col-start-2 text-base font-medium sm:text-[1.0625rem]",
              description ? "row-start-1 self-end" : "row-span-2 self-center",
            )}
          >
            {title}
          </h3>
          {description ? (
            <span className="col-start-2 row-start-2 line-clamp-1 self-start text-sm text-encre-douce">
              {description}
            </span>
          ) : null}
          <span className="col-start-3 row-span-2 row-start-1 hidden flex-wrap justify-end gap-1.5 self-center sm:flex">
            {counts.map(({ kind, n }) => (
              <span
                key={kind}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
                  kindHue(kind).chip,
                )}
              >
                {t("kindCount", { kind, count: n })}
              </span>
            ))}
          </span>
          <span
            aria-hidden="true"
            className="col-start-3 row-span-2 row-start-1 flex size-9 shrink-0 items-center justify-center self-center rounded-full bg-sunken transition-transform duration-200 group-open:rotate-180 group-open:bg-encre group-open:text-papier sm:col-start-4"
          >
            <ChevronDown className="size-5" />
          </span>
        </summary>
        <div className="grid gap-5 border-t border-dashed border-quadrillage p-4 md:grid-cols-3">
          {COLUMNS.map((column) => {
            const documents = chapter.documents.filter((document) =>
              column.kinds.includes(document.kind),
            );
            return (
              <section key={column.key} className="grid content-start gap-2">
                <h4 className="flex items-center gap-2 text-sm font-medium">
                  <span
                    aria-hidden="true"
                    className={cn("size-2.5 rounded-sm", kindHue(column.kinds[0]!).dot)}
                  />
                  {t(`columns.${column.key}`)}
                </h4>
                {documents.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-quadrillage px-3 py-3 text-sm text-encre-douce">
                    {t("columnSoon")}
                  </p>
                ) : (
                  documents.map((document) => (
                    <DocumentCard
                      key={document.slug}
                      href={`${base}/${document.slug}`}
                      id={document.id}
                      version={document.version}
                      kind={document.kind}
                      kindLabel={tKind(`one.${document.kind}`)}
                      title={document.title}
                      summary={document.summary}
                      context={chapter.title}
                    />
                  ))
                )}
              </section>
            );
          })}
          <Link
            href={base}
            className="inline-flex min-h-11 items-center justify-self-start text-sm font-medium underline decoration-trait underline-offset-4 hover:decoration-encre md:col-span-3"
          >
            {t("openChapter")}
            <span className="sr-only"> {chapter.title}</span>
          </Link>
        </div>
      </details>
    </li>
  );
}
