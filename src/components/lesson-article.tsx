import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { formatLocalDate, withFirst } from "@/lib/dates";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "@/lib/lesson/document";
import { kindHue } from "@/lib/design/colors";
import type { DocumentKind } from "@/lib/lesson/kinds";
import { renderLesson } from "@/lib/lesson/render";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  summary: string | null;
  publishedAt: string | null;
  /** « Tronc commun · Arithmétique dans ℕ », or the same as links back up the course. */
  context: ReactNode;
  /** Its PDF, under the title (D-096). */
  downloads?: ReactNode;
  /** What it is, in its colour above the title (D-100): « Cours », « Série d’exercices »… */
  kind?: { kind: DocumentKind; label: string };
  /** Beside the text on a wide screen: the chapter's other documents. */
  aside?: ReactNode;
  /** After the text: the document before and after it in the chapter. */
  pager?: ReactNode;
  content: StoredLesson;
};

/**
 * A lesson as a reader sees it: the public site and a signed-in student get the same page,
 * so what the tutor checks in one is what the other shows. Pages that use it import
 * katex.min.css and src/app/cours/lecon.css.
 */
export async function LessonArticle({
  title,
  summary,
  publishedAt,
  context,
  downloads,
  kind,
  aside,
  pager,
  content,
}: Props) {
  const t = await getTranslations("lesson");
  const callout = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, t(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;

  const colour = kind ? kindHue(kind.kind) : null;
  const body = (
    <article className="min-w-0">
      {/* The document's card: where it sits, what it is, its PDF. */}
      <header
        className={cn(
          "rounded-2xl border border-quadrillage bg-surface p-5 sm:p-6",
          colour ? "border-t-4" : null,
          colour ? colour.top : null,
        )}
      >
        <div className="text-sm text-encre-douce">{context}</div>

        {kind && colour ? (
          <p
            className={cn(
              "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
              colour.chip,
            )}
          >
            {kind.label}
          </p>
        ) : null}

        <h1 className="mt-3 text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-semibold text-balance [font-variation-settings:'HEXP'_45]">
          {frenchSpaces(title)}
        </h1>

        {summary === null ? null : (
          <p className="mt-3 text-lg text-encre-douce">{frenchSpaces(summary)}</p>
        )}

        {publishedAt === null ? null : (
          <p className="mt-3 text-sm text-encre-douce">
            {t("publishedOn", { date: withFirst(formatLocalDate(publishedAt)) })}
          </p>
        )}

        {downloads ? <div className="mt-4">{downloads}</div> : null}
      </header>

      <div className="lecon-corps mt-10">
        {renderLesson(content, {
          calloutLabel: (kind) => callout[kind],
          fileHref: (path) => `/cours/fichiers/${path}`,
          exerciseLabels: {
            exercise: (number) => t("exercise", { number }),
            solution: t("solution"),
            show: t("showSolution"),
            hide: t("hideSolution"),
            of: (number) => t("solutionOf", { number }),
          },
        })}
      </div>

      {pager}
    </article>
  );

  return aside ? (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
      {body}
      <aside className="lg:sticky lg:top-24 print:hidden">{aside}</aside>
    </div>
  ) : (
    // Alone, the text keeps a reading measure on a wide page.
    <div className="mx-auto w-full max-w-3xl">{body}</div>
  );
}
