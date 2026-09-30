import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import {
  DOCUMENT_KINDS,
  getProgrammeCourse,
  listChapterParams,
  programmeSlugForLevel,
} from "@/lib/lesson/queries";

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
  const resolved = await params;
  const [t, tProgramme, tKind, found] = await Promise.all([
    getTranslations("chapterPage"),
    getTranslations("programmePage"),
    getTranslations("documentKind"),
    findChapter(resolved),
  ]);
  if (!found) {
    const moved = await programmeSlugForLevel(resolved.niveau);
    if (moved) permanentRedirect(`/cours/${moved}/${resolved.chapitre}`);
    notFound();
  }
  const { programme, chapter } = found;
  const base = `/cours/${programme.slug}/${chapter.slug}`;

  return (
    <article className="grid gap-8">
      <header className="grid gap-3">
        <Link
          href={`/cours/${programme.slug}`}
          className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {programme.label}
        </Link>
        {chapter.semester ? (
          <p className="text-sm text-encre-douce">
            {tProgramme("semester", { semester: String(chapter.semester) })}
          </p>
        ) : null}
        <h1 className="text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_90]">
          {chapter.title}
        </h1>
        {chapter.description ? <p className="text-encre-douce">{chapter.description}</p> : null}
      </header>

      {chapter.documents.length === 0 ? (
        <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("empty")}</p>
      ) : (
        DOCUMENT_KINDS.map((kind) => {
          const documents = chapter.documents.filter((document) => document.kind === kind);
          if (documents.length === 0) return null;
          return (
            <section key={kind} aria-labelledby={`documents-${kind}`} className="grid gap-3">
              <h2 id={`documents-${kind}`} className="text-lg font-semibold">
                {tKind(`many.${kind}`)}
              </h2>
              <ul
                role="list"
                className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
              >
                {documents.map((document) => (
                  <li key={document.slug} className="grid gap-1 bg-surface px-4 py-3">
                    <Link
                      href={`${base}/${document.slug}`}
                      className="font-semibold underline decoration-trait underline-offset-4 hover:decoration-encre"
                    >
                      {document.title}
                    </Link>
                    {document.summary ? (
                      <p className="text-sm text-encre-douce">{document.summary}</p>
                    ) : null}
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
