import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  PublicationChip,
  VisibilityChip,
  type LessonVisibility,
  type PublicationStatus,
} from "@/components/lesson-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { Select } from "@/components/ui/input";
import { requireViewer } from "@/lib/auth";
import { DOCUMENT_KINDS, listProgrammes } from "@/lib/lesson/queries";
import { createClient } from "@/lib/supabase/server";

const FIELDS =
  "id, title, slug, status, visibility, position, kind, chapter:chapters!inner(title, slug, semester, position, programme:programmes!inner(code, slug, label, position))" as const;

/** What the list shows: every document, those to read over (drafts), or those published. */
export type LessonFilter = { status: "all" | "draft" | "published"; programme: string | null };

export function readLessonFilter(
  query: Record<string, string | string[] | undefined>,
): LessonFilter {
  const status =
    query.statut === "brouillon" ? "draft" : query.statut === "publie" ? "published" : "all";
  const programme =
    typeof query.programme === "string" && /^[0-9A-Z-]{2,12}$/.test(query.programme)
      ? query.programme
      : null;
  return { status, programme };
}

/**
 * The tutor's documents, chapter by chapter in teaching order. Documents imported from files
 * arrive as drafts for her to read (D-098): « À relire » lists exactly those, and a programme
 * narrows the list to one year of one stream group.
 */
export async function LessonsList({ filter }: { filter: LessonFilter }) {
  await requireViewer("tutor");

  const [t, tKind, programmes] = await Promise.all([
    getTranslations("tutor.lessons"),
    getTranslations("documentKind"),
    listProgrammes(),
  ]);
  const supabase = await createClient();

  // The tutor's policy lets her see drafts and every visibility; a student's would not.
  let query = supabase.from("lessons").select(FIELDS);
  if (filter.programme) query = query.eq("chapter.programme.code", filter.programme);
  const { data } = await query;
  const all = data ?? [];
  const drafts = all.filter((lesson) => lesson.status === "draft").length;

  const lessons = all
    .filter((lesson) => filter.status === "all" || lesson.status === filter.status)
    .sort(
      (a, b) =>
        a.chapter.programme.position - b.chapter.programme.position ||
        (a.chapter.semester ?? 3) - (b.chapter.semester ?? 3) ||
        a.chapter.position - b.chapter.position ||
        DOCUMENT_KINDS.indexOf(a.kind) - DOCUMENT_KINDS.indexOf(b.kind) ||
        a.position - b.position,
    );

  // Grouped by chapter, in the order the tutor teaches them.
  const chapters: { key: string; programme: string; title: string; lessons: typeof lessons }[] = [];
  for (const lesson of lessons) {
    const key = `${lesson.chapter.programme.code}/${lesson.chapter.slug}`;
    const last = chapters.at(-1);
    if (last?.key === key) {
      last.lessons.push(lesson);
    } else {
      chapters.push({
        key,
        programme: lesson.chapter.programme.label,
        title: lesson.chapter.title,
        lessons: [lesson],
      });
    }
  }

  const href = (status: LessonFilter["status"]) => {
    const params = new URLSearchParams();
    if (status !== "all") params.set("statut", status === "draft" ? "brouillon" : "publie");
    if (filter.programme) params.set("programme", filter.programme);
    const search = params.toString();
    return search ? `/prof/lecons?${search}` : "/prof/lecons";
  };
  const tabs: { status: LessonFilter["status"]; label: string }[] = [
    { status: "all", label: t("filter.all") },
    { status: "draft", label: t("filter.drafts", { count: drafts }) },
    { status: "published", label: t("filter.published") },
  ];

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <nav aria-label={t("filter.label")}>
          <ul role="list" className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <li key={tab.status}>
                <Link
                  href={href(tab.status)}
                  aria-current={filter.status === tab.status ? "page" : undefined}
                  className="inline-flex min-h-11 items-center rounded-md border border-trait px-3 text-sm hover:border-encre aria-[current=page]:border-encre aria-[current=page]:bg-encre aria-[current=page]:text-papier"
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* A plain GET form: the filter is the address, so it survives a reload and a link. */}
        <form action="/prof/lecons" className="flex flex-wrap items-end gap-2">
          {filter.status === "all" ? null : (
            <input
              type="hidden"
              name="statut"
              value={filter.status === "draft" ? "brouillon" : "publie"}
            />
          )}
          <label className="grid gap-1.5 text-sm">
            <span>{t("filter.programme")}</span>
            <Select name="programme" defaultValue={filter.programme ?? ""} className="min-w-64">
              <option value="">{t("filter.allProgrammes")}</option>
              {programmes.map((programme) => (
                <option key={programme.code} value={programme.code}>
                  {programme.label}
                </option>
              ))}
            </Select>
          </label>
          <button type="submit" className={buttonVariants({ variant: "outline" })}>
            {t("filter.apply")}
          </button>
        </form>
      </div>

      {all.length === 0 && !filter.programme ? (
        <p className="text-encre-douce">{t("empty")}</p>
      ) : lessons.length === 0 ? (
        <div className="grid gap-1">
          <p className="text-encre-douce">
            {filter.status === "draft" && all.length > 0 ? t("filter.noDrafts") : t("filter.none")}
          </p>
          <Link
            href="/prof/lecons"
            className="inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("filter.showAll")}
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-encre-douce">{t("count", { count: lessons.length })}</p>

          {chapters.map((chapter) => (
            <section key={chapter.key} className="grid gap-3">
              <h2 className="text-sm font-semibold text-encre-douce">
                {chapter.programme} · {chapter.title}
              </h2>

              <ul className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
                {chapter.lessons.map((lesson) => {
                  const status = lesson.status as PublicationStatus;
                  const visibility = lesson.visibility as LessonVisibility;
                  const isLive = status === "published" && visibility === "public";

                  return (
                    <li
                      key={lesson.id}
                      className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-surface px-4 py-3"
                    >
                      <span className="grid min-w-0 flex-1 gap-0.5">
                        <Link
                          href={`/prof/lecons/${lesson.id}`}
                          className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                        >
                          {lesson.title}
                        </Link>
                        <span className="text-sm text-encre-douce">
                          {tKind(`one.${lesson.kind}`)}
                        </span>
                      </span>

                      <PublicationChip status={status} label={t(`status.${status}`)} />
                      <VisibilityChip
                        visibility={visibility}
                        label={t(`visibility.${visibility}`)}
                        hint={t(`visibilityHint.${visibility}`)}
                      />

                      {isLive ? (
                        <Link
                          href={`/cours/${lesson.chapter.programme.slug}/${lesson.chapter.slug}/${lesson.slug}`}
                          className="text-sm text-stylo-bleu underline underline-offset-2"
                        >
                          {t("open")}
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
