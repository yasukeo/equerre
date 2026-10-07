import { ArrowRight, BookOpen, ChevronDown, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  PublicationChip,
  VisibilityChip,
  type LessonVisibility,
  type PublicationStatus,
} from "@/components/lesson-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input, Select } from "@/components/ui/input";
import { requireViewer } from "@/lib/auth";
import { cycleHue, kindHue } from "@/lib/design/colors";
import { DOCUMENT_KINDS, listProgrammes } from "@/lib/lesson/queries";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

const FIELDS =
  "id, title, slug, status, visibility, position, kind, chapter:chapters!inner(title, slug, semester, position, programme:programmes!inner(code, slug, label, cycle, position))" as const;

/** PostgREST answers this many rows at most: the library is read in pages. */
const PAGE = 1000;
/** Past this many documents, a chapter opens only when asked. */
const OPEN_UP_TO = 60;

/** What the list shows: which documents, of which programme, matching which words. */
export type LessonFilter = {
  status: "all" | "draft" | "published";
  programme: string | null;
  q: string;
};

export function readLessonFilter(
  query: Record<string, string | string[] | undefined>,
): LessonFilter {
  const status =
    query.statut === "brouillon" ? "draft" : query.statut === "publie" ? "published" : "all";
  const programme =
    typeof query.programme === "string" && /^[0-9A-Z-]{2,12}$/.test(query.programme)
      ? query.programme
      : null;
  const q = typeof query.q === "string" ? query.q.trim().slice(0, 80) : "";
  return { status, programme, q };
}

/** « Équation » and « equation » are the same search. */
function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr");
}

/**
 * The tutor's library (D-104): her programmes first, each with what it holds; then a
 * programme's chapters, folded, in teaching order; a search reaches every document at once.
 * Documents imported from files arrive as drafts for her to read (D-098): « À relire » lists
 * exactly those.
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
  type Row = NonNullable<Awaited<ReturnType<typeof readPage>>["data"]>[number];
  const readPage = (from: number) => {
    let query = supabase.from("lessons").select(FIELDS);
    if (filter.programme) query = query.eq("chapter.programme.code", filter.programme);
    return query.order("id").range(from, from + PAGE - 1);
  };
  const all: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await readPage(from);
    if (error) throw new Error("Could not read the lessons", { cause: error });
    all.push(...data);
    if (data.length < PAGE) break;
  }
  const drafts = all.filter((lesson) => lesson.status === "draft").length;
  const words = fold(filter.q)
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const lessons = all
    .filter((lesson) => filter.status === "all" || lesson.status === filter.status)
    .filter((lesson) => {
      if (words.length === 0) return true;
      const text = fold(`${lesson.title} ${lesson.chapter.title}`);
      return words.every((word) => text.includes(word));
    })
    .sort(
      (a, b) =>
        a.chapter.programme.position - b.chapter.programme.position ||
        (a.chapter.semester ?? 3) - (b.chapter.semester ?? 3) ||
        a.chapter.position - b.chapter.position ||
        DOCUMENT_KINDS.indexOf(a.kind) - DOCUMENT_KINDS.indexOf(b.kind) ||
        a.position - b.position,
    );

  const href = (changes: Partial<LessonFilter>) => {
    const next = { ...filter, ...changes };
    const params = new URLSearchParams();
    if (next.status !== "all")
      params.set("statut", next.status === "draft" ? "brouillon" : "publie");
    if (next.programme) params.set("programme", next.programme);
    if (next.q) params.set("q", next.q);
    const search = params.toString();
    return search ? `/prof/lecons?${search}` : "/prof/lecons";
  };
  const tabs: { status: LessonFilter["status"]; label: string }[] = [
    { status: "all", label: t("filter.all") },
    { status: "draft", label: t("filter.drafts", { count: drafts }) },
    { status: "published", label: t("filter.published") },
  ];
  // The shelves: no programme chosen and nothing searched.
  const overview = !filter.programme && words.length === 0;
  const chosen = programmes.find((programme) => programme.code === filter.programme);

  const toolbar = (
    <div className="grid gap-3">
      {/* A plain GET form: the filter is the address, so it survives a reload and a link. */}
      <form
        action="/prof/lecons"
        role="search"
        className="grid gap-2 rounded-2xl border border-quadrillage bg-surface p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)_auto] sm:items-end"
      >
        {filter.status === "all" ? null : (
          <input
            type="hidden"
            name="statut"
            value={filter.status === "draft" ? "brouillon" : "publie"}
          />
        )}
        <label className="grid gap-1.5 text-sm font-medium">
          {t("filter.search")}
          <span className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-encre-douce"
            />
            <Input
              type="search"
              name="q"
              defaultValue={filter.q}
              placeholder={t("filter.searchPlaceholder")}
              className="ps-9"
            />
          </span>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          {t("filter.programme")}
          <Select name="programme" defaultValue={filter.programme ?? ""}>
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
      <nav aria-label={t("filter.label")}>
        <ul role="list" className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <li key={tab.status}>
              <Link
                href={href({ status: tab.status })}
                aria-current={filter.status === tab.status ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full border border-quadrillage bg-surface px-4 text-sm font-medium hover:border-trait aria-[current=page]:border-encre aria-[current=page]:bg-encre aria-[current=page]:text-papier"
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  if (all.length === 0 && !filter.programme) {
    return (
      <div className="grid justify-items-start gap-3 rounded-2xl border border-dashed border-trait bg-surface px-5 py-6">
        <p>{t("empty")}</p>
        <Link href="/prof/lecons/nouvelle" className={buttonVariants({ size: "sm" })}>
          {t("new")}
        </Link>
      </div>
    );
  }

  if (overview) {
    // Each programme with what it holds, under the current status filter.
    const shelves = programmes.map((programme) => {
      const of = lessons.filter((lesson) => lesson.chapter.programme.code === programme.code);
      return {
        programme,
        documents: of.length,
        drafts: of.filter((lesson) => lesson.status === "draft").length,
        chapters: new Set(of.map((lesson) => lesson.chapter.slug)).size,
      };
    });
    const shown = shelves.filter((shelf) => shelf.documents > 0);
    return (
      <div className="grid gap-6">
        {toolbar}
        <p className="text-sm text-encre-douce">
          {t("libraryCount", { count: lessons.length, programmes: shown.length })}
        </p>
        {shown.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5 text-encre-douce">
            {filter.status === "draft" ? t("filter.noDrafts") : t("filter.none")}
          </p>
        ) : (
          <ul role="list" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map(({ programme, documents, drafts: toRead, chapters }) => {
              const tone = cycleHue(programme.cycle);
              return (
                <li key={programme.code} className="grid">
                  <Link
                    href={href({ programme: programme.code })}
                    className={cn(
                      "grid content-start gap-3 overflow-hidden rounded-2xl border border-t-4 border-quadrillage bg-surface p-4 hover:border-trait",
                      tone.top,
                    )}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-semibold break-words">{programme.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-encre-douce rtl:rotate-180"
                      />
                    </span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-encre-douce">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen aria-hidden="true" className="size-4" />
                        {t("documents", { count: documents })}
                      </span>
                      <span>{t("chapters", { count: chapters })}</span>
                    </span>
                    {toRead > 0 ? (
                      <span className="justify-self-start rounded-full bg-jaune-fond px-2.5 py-0.5 text-xs font-semibold text-jaune-texte">
                        {t("toRead", { count: toRead })}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

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
  const openAll = words.length > 0 || filter.status === "draft" || lessons.length <= OPEN_UP_TO;

  return (
    <div className="grid gap-6">
      {toolbar}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-encre-douce" role="status">
          {chosen ? <span className="font-medium text-encre">{chosen.label} · </span> : null}
          {t("count", { count: lessons.length })}
        </p>
        {filter.programme || filter.q ? (
          <Link
            href={href({ programme: null, q: "" })}
            className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("backToLibrary")}
          </Link>
        ) : null}
      </div>

      {lessons.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5 text-encre-douce">
          {filter.status === "draft" && all.length > 0 ? t("filter.noDrafts") : t("filter.none")}
        </p>
      ) : (
        <div className="grid gap-3">
          {chapters.map((chapter) => {
            const toRead = chapter.lessons.filter((lesson) => lesson.status === "draft").length;
            return (
              <details
                key={chapter.key}
                open={openAll}
                className="group overflow-hidden rounded-2xl border border-quadrillage bg-surface"
              >
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-3 px-4 py-3 hover:bg-sunken">
                  <span className="grid min-w-0 gap-0.5">
                    {chosen ? null : (
                      <span className="text-xs text-encre-douce">{chapter.programme}</span>
                    )}
                    <span className="font-semibold break-words">{chapter.title}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-sm text-encre-douce">
                    {toRead > 0 ? (
                      <span className="rounded-full bg-jaune-fond px-2 py-0.5 text-xs font-semibold text-jaune-texte">
                        {t("toRead", { count: toRead })}
                      </span>
                    ) : null}
                    <span className="hidden sm:inline">
                      {t("documents", { count: chapter.lessons.length })}
                    </span>
                    <span className="tabular sm:hidden">{chapter.lessons.length}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 transition-transform group-open:rotate-180"
                    />
                  </span>
                </summary>
                <ul role="list" className="grid gap-px border-t border-quadrillage bg-quadrillage">
                  {chapter.lessons.map((lesson) => {
                    const status = lesson.status as PublicationStatus;
                    const visibility = lesson.visibility as LessonVisibility;
                    const isLive = status === "published" && visibility === "public";
                    return (
                      <li
                        key={lesson.id}
                        className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-surface px-4 py-3"
                      >
                        <span
                          aria-hidden="true"
                          className={cn("h-8 w-1 shrink-0 rounded-full", kindHue(lesson.kind).dot)}
                        />
                        <span className="grid min-w-0 flex-1 basis-48 gap-0.5">
                          <Link
                            href={`/prof/lecons/${lesson.id}`}
                            className="font-medium break-words underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                          >
                            {lesson.title}
                          </Link>
                          <span className={cn("text-sm", kindHue(lesson.kind).text)}>
                            {tKind(`one.${lesson.kind}`)}
                          </span>
                        </span>
                        <span className="flex flex-wrap items-center gap-2">
                          <PublicationChip status={status} label={t(`status.${status}`)} />
                          <VisibilityChip
                            visibility={visibility}
                            label={t(`visibility.${visibility}`)}
                            hint={t(`visibilityHint.${visibility}`)}
                          />
                          {isLive ? (
                            <Link
                              href={`/cours/${lesson.chapter.programme.slug}/${lesson.chapter.slug}/${lesson.slug}`}
                              className="inline-flex min-h-11 items-center gap-1 px-1 text-sm text-stylo-bleu underline underline-offset-2"
                            >
                              {t("open")}
                              <ExternalLink aria-hidden="true" className="size-3.5" />
                            </Link>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
