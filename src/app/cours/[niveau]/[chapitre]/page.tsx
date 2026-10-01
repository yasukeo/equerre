import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DocumentCard } from "@/components/course/document-card";
import { PageBand } from "@/components/course/page-band";
import { cycleHue, kindHue } from "@/lib/design/colors";
import { DOCUMENT_KINDS, getProgrammeCourse, listChapterParams } from "@/lib/lesson/queries";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

type ChapterParams = { niveau: string; chapitre: string };

export async function generateStaticParams(): Promise<ChapterParams[]> {
  const chapters = await listChapterParams();
  return chapters.length > 0 ? chapters : [{ niveau: "tronc-commun-sciences", chapitre: "-" }];
}

async function findChapter({ niveau, chapitre }: ChapterParams) {
  const programme = await getProgrammeCourse(niveau);
  const chapter = programme?.chapters.find((candidate) => candidate.slug === chapitre);
  return programme && chapter ? { programme, chapter } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/cours/[niveau]/[chapitre]">): Promise<Metadata> {
  const [t, found] = await Promise.all([getTranslations("chapterPage"), params.then(findChapter)]);
  if (!found) return {};
  return {
    title: `${found.chapter.title} · ${found.programme.label}`,
    description: t("metaDescription", {
      chapter: found.chapter.title,
      programme: found.programme.label,
    }),
    alternates: { canonical: `/cours/${found.programme.slug}/${found.chapter.slug}` },
  };
}

export default function ChapterPage({ params }: PageProps<"/cours/[niveau]/[chapitre]">) {
  return (
    <main id="contenu">
      <Suspense
        fallback={
          <div aria-hidden="true" className="grid gap-6">
            <div className="h-48 animate-pulse bg-sunken" />
            <div className="mx-auto h-72 w-full max-w-4xl animate-pulse rounded-2xl bg-sunken" />
          </div>
        }
      >
        <Chapter params={params} />
      </Suspense>
    </main>
  );
}

/** A chapter and its documents, by kind: the course, its summary, the series, the tests. */
async function Chapter({ params }: { params: Promise<ChapterParams> }) {
  // A stream's old address (`/cours/2bac-pc/…`) never gets here: next.config.ts redirects it.
  const [t, tProgramme, tKind, tLesson, found] = await Promise.all([
    getTranslations("chapterPage"),
    getTranslations("programmePage"),
    getTranslations("documentKind"),
    getTranslations("lesson"),
    params.then(findChapter),
  ]);
  if (!found) notFound();
  const { programme, chapter } = found;
  const base = `/cours/${programme.slug}/${chapter.slug}`;
  const level = cycleHue(programme.cycle);
  const index = programme.chapters.findIndex((candidate) => candidate.slug === chapter.slug);
  const previous = programme.chapters[index - 1];
  const next = programme.chapters[index + 1];
  const link =
    "inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre";

  return (
    <article>
      <PageBand colour={level.band} width="max-w-4xl">
        <nav aria-label={tLesson("breadcrumb")} className="text-sm print:hidden">
          <ol role="list" className="flex flex-wrap items-center gap-x-2 text-white">
            <li>
              <Link
                href="/cours"
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                {tLesson("courses")}
              </Link>
            </li>
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">›</span>
              <Link
                href={`/cours/${programme.slug}`}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                {programme.label}
              </Link>
            </li>
          </ol>
        </nav>
        <p className="flex items-center gap-3 text-sm font-medium text-white">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white text-lg font-semibold text-encre-fixe">
            {index + 1}
          </span>
          <span>
            {tProgramme("chapter", { number: index + 1 })}
            {chapter.semester
              ? ` · ${tProgramme("semester", { semester: String(chapter.semester) })}`
              : null}
          </span>
        </p>
        <h1 className="text-[clamp(1.75rem,1.4rem+2vw,2.75rem)] leading-tight font-semibold text-balance [font-variation-settings:'HEXP'_45]">
          {frenchSpaces(chapter.title)}
        </h1>
        {chapter.description ? (
          <p className="max-w-2xl text-white">{frenchSpaces(chapter.description)}</p>
        ) : null}
      </PageBand>

      <div className="mx-auto grid max-w-4xl gap-8 px-4 py-8 sm:px-8">
        {chapter.documents.length === 0 ? (
          <div className="grid gap-1 rounded-2xl border border-dashed border-trait bg-surface px-5 py-5">
            <p>{t("empty")}</p>
            <Link href={`/cours/${programme.slug}`} className={`${link} justify-self-start`}>
              {t("emptyLink")}
            </Link>
          </div>
        ) : (
          DOCUMENT_KINDS.map((kind) => {
            const documents = chapter.documents.filter((document) => document.kind === kind);
            if (documents.length === 0) return null;
            return (
              <section key={kind} aria-labelledby={`documents-${kind}`} className="grid gap-3">
                <h2
                  id={`documents-${kind}`}
                  className="flex items-center gap-2.5 text-lg font-semibold"
                >
                  <span aria-hidden="true" className={cn("size-3 rounded", kindHue(kind).dot)} />
                  {documents.length === 1 ? tKind(`one.${kind}`) : tKind(`many.${kind}`)}
                </h2>
                <ul role="list" className="grid gap-2.5 sm:grid-cols-2">
                  {documents.map((document) => (
                    <li key={document.slug} className="grid">
                      <DocumentCard
                        href={`${base}/${document.slug}`}
                        id={document.id}
                        version={document.version}
                        kind={document.kind}
                        kindLabel={tKind(`one.${document.kind}`)}
                        title={document.title}
                        summary={document.summary}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}

        <nav
          aria-label={t("neighbours")}
          className="grid gap-3 border-t border-quadrillage pt-6 sm:grid-cols-2 print:hidden"
        >
          {previous ? (
            <Link
              href={`/cours/${programme.slug}/${previous.slug}`}
              className="grid min-h-16 content-center gap-0.5 rounded-2xl border border-quadrillage bg-surface px-4 py-3 hover:border-trait"
            >
              <span className="text-xs text-encre-douce">{t("previous")}</span>
              <span className="font-medium">{frenchSpaces(previous.title)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/cours/${programme.slug}/${next.slug}`}
              className="grid min-h-16 content-center gap-0.5 rounded-2xl border border-quadrillage bg-surface px-4 py-3 text-end hover:border-trait"
            >
              <span className="text-xs text-encre-douce">{t("next")}</span>
              <span className="font-medium">{frenchSpaces(next.title)}</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
