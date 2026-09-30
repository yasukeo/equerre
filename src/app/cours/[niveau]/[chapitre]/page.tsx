import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PdfLinks } from "@/components/pdf-links";
import { DOCUMENT_KINDS, getProgrammeCourse, listChapterParams } from "@/lib/lesson/queries";
import { frenchSpaces } from "@/lib/typography";

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
    <main id="contenu" className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8">
      <Suspense
        fallback={<div aria-hidden="true" className="h-72 animate-pulse rounded-md bg-sunken" />}
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
  const link =
    "inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre";

  return (
    <article className="grid gap-8">
      <header className="grid gap-3">
        <nav aria-label={tLesson("breadcrumb")} className="text-sm text-encre-douce print:hidden">
          <ol role="list" className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/cours" className={link}>
                {tLesson("courses")}
              </Link>
            </li>
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">›</span>
              <Link href={`/cours/${programme.slug}`} className={link}>
                {programme.label}
              </Link>
            </li>
          </ol>
        </nav>
        {chapter.semester ? (
          <p className="text-sm text-encre-douce">
            {tProgramme("semester", { semester: String(chapter.semester) })}
          </p>
        ) : null}
        <h1 className="text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_90]">
          {frenchSpaces(chapter.title)}
        </h1>
        {chapter.description ? (
          <p className="text-encre-douce">{frenchSpaces(chapter.description)}</p>
        ) : null}
      </header>

      {chapter.documents.length === 0 ? (
        <div className="grid gap-1 rounded-md border border-dashed border-trait px-4 py-4">
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
              <h2 id={`documents-${kind}`} className="text-lg font-semibold">
                {documents.length === 1 ? tKind(`one.${kind}`) : tKind(`many.${kind}`)}
              </h2>
              <ul
                role="list"
                className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
              >
                {documents.map((document) => (
                  <li key={document.slug} className="grid bg-surface px-4 py-2">
                    <Link
                      href={`${base}/${document.slug}`}
                      className={`${link} justify-self-start font-semibold`}
                    >
                      {frenchSpaces(document.title)}
                    </Link>
                    {document.summary ? (
                      <p className="text-sm text-encre-douce">{frenchSpaces(document.summary)}</p>
                    ) : null}
                    <PdfLinks
                      id={document.id}
                      version={document.version}
                      kind={document.kind}
                      title={document.title}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}
    </article>
  );
}
