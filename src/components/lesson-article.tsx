import { getTranslations } from "next-intl/server";
import { formatLocalDate, withFirst } from "@/lib/dates";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "@/lib/lesson/document";
import { renderLesson } from "@/lib/lesson/render";
import { frenchSpaces } from "@/lib/typography";

type Props = {
  title: string;
  summary: string | null;
  publishedAt: string | null;
  /** « Tronc commun · Arithmétique dans ℕ » */
  context: string;
  content: StoredLesson;
};

/**
 * A lesson as a reader sees it: the public site and a signed-in student get the same page,
 * so what the tutor checks in one is what the other shows. Pages that use it import
 * katex.min.css and src/app/cours/lecon.css.
 */
export async function LessonArticle({ title, summary, publishedAt, context, content }: Props) {
  const t = await getTranslations("lesson");
  const callout = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, t(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;

  return (
    <article>
      <p className="text-sm text-encre-douce">{context}</p>

      <h1 className="mt-2 text-[clamp(1.875rem,1.5rem+1.6vw,2.75rem)] leading-tight font-semibold text-balance [font-variation-settings:'HEXP'_100]">
        {frenchSpaces(title)}
      </h1>

      {summary === null ? null : (
        <p className="mt-4 text-lg text-encre-douce">{frenchSpaces(summary)}</p>
      )}

      {publishedAt === null ? null : (
        <p className="mt-4 text-sm text-encre-douce">
          {t("publishedOn", { date: withFirst(formatLocalDate(publishedAt)) })}
        </p>
      )}

      <div className="lecon-corps mt-10">
        {renderLesson(content, {
          calloutLabel: (kind) => callout[kind],
          fileHref: (path) => `/cours/fichiers/${path}`,
        })}
      </div>
    </article>
  );
}
