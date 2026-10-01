import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { listExamProgrammes } from "@/lib/exams/queries";
import {
  getProgrammeCourse,
  listProgrammes,
  type ProgrammeChapter,
  type PublicDocument,
} from "@/lib/lesson/queries";
import { frenchSpaces } from "@/lib/typography";

export async function generateStaticParams(): Promise<{ niveau: string }[]> {
  const programmes = await listProgrammes();
  // As on the pages below: Cache Components fails the build on an empty list.
  return programmes.length > 0
    ? programmes.map((programme) => ({ niveau: programme.slug }))
    : [{ niveau: "tronc-commun-sciences" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/cours/[niveau]">): Promise<Metadata> {
  const { niveau } = await params;
  const [t, programme] = await Promise.all([
    getTranslations("programmePage"),
    getProgrammeCourse(niveau),
  ]);
  if (!programme) return {};
  return {
    title: programme.label,
    description: t("metaDescription", { programme: programme.label }),
    alternates: { canonical: `/cours/${programme.slug}` },
  };
}

export default function ProgrammePage({ params }: PageProps<"/cours/[niveau]">) {
  // `params` is awaited inside the boundary, as on the lesson page: partial prefetching keeps
  // one shell for every programme.
  return (
    <main id="contenu" className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-8">
      <Suspense
        fallback={<div aria-hidden="true" className="h-96 animate-pulse rounded-md bg-sunken" />}
      >
        <Programme params={params} />
      </Suspense>
    </main>
  );
}

async function Programme({ params }: { params: Promise<{ niveau: string }> }) {
  // A stream's old address (`/cours/2bac-pc`) never gets here: next.config.ts redirects it.
  const { niveau } = await params;
  const [t, tKind, programme, withExams] = await Promise.all([
    getTranslations("programmePage"),
    getTranslations("documentKind"),
    getProgrammeCourse(niveau),
    listExamProgrammes(),
  ]);
  if (!programme) notFound();

  const exams = withExams.find((candidate) => candidate.code === programme.code);
  const semesters = [1, 2, null] as const;
  const numbered = programme.chapters.map((chapter, index) => ({ ...chapter, number: index + 1 }));
  const ready = programme.chapters.filter((chapter) => chapter.documents.length > 0).length;

  return (
    <article className="grid gap-10">
      <header className="grid gap-3">
        <Link
          href="/cours"
          className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {t("back")}
        </Link>
        <h1 className="text-[clamp(1.75rem,1.4rem+2vw,2.75rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_90]">
          {programme.label}
        </h1>
        {programme.streams.length > 1 ? (
          <p>{t("streams", { list: programme.streams.join("\u00a0· ") })}</p>
        ) : null}
        <p className="text-encre-douce">
          {t("progress", {
            ready,
            total: programme.chapters.length,
            complete: ready === programme.chapters.length ? "yes" : "no",
          })}
        </p>
        {exams ? (
          <Link
            href={`/examens/${programme.slug}`}
            className="inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("exams", { count: exams.paperCount })}
          </Link>
        ) : null}
      </header>

      {semesters.map((semester) => {
        const chapters = numbered.filter((chapter) => chapter.semester === semester);
        if (chapters.length === 0) return null;
        const id = `semestre-${semester ?? "autre"}`;
        return (
          <section key={id} aria-labelledby={id} className="grid gap-3">
            <h2 id={id} className="text-xl font-semibold">
              {t("semester", { semester: String(semester ?? "none") })}
            </h2>
            <ol
              role="list"
              className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
            >
              {chapters.map((chapter) => (
                <ChapterRow
                  key={chapter.slug}
                  programmeSlug={programme.slug}
                  chapter={chapter}
                  pendingLabel={t("inPreparation")}
                  kindLabel={(kind) => tKind(`one.${kind}`)}
                />
              ))}
            </ol>
          </section>
        );
      })}
    </article>
  );
}

function ChapterRow({
  programmeSlug,
  chapter,
  pendingLabel,
  kindLabel,
}: {
  programmeSlug: string;
  chapter: ProgrammeChapter & { number: number };
  pendingLabel: string;
  kindLabel: (kind: PublicDocument["kind"]) => string;
}) {
  const ready = chapter.documents.length > 0;
  // A document alone of its kind is named by its kind (« Cours », « Résumé »); two of a kind
  // are told apart by their titles.
  const named = (document: PublicDocument) =>
    chapter.documents.filter((other) => other.kind === document.kind).length === 1
      ? kindLabel(document.kind)
      : frenchSpaces(document.title);

  return (
    <li className="grid gap-1 bg-surface px-4 py-2">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="font-semibold">
          {ready ? (
            <Link
              href={`/cours/${programmeSlug}/${chapter.slug}`}
              className="inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre"
            >
              {chapter.number}. {frenchSpaces(chapter.title)}
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center">
              {chapter.number}. {frenchSpaces(chapter.title)}
            </span>
          )}
        </h3>
        {ready ? null : <span className="text-sm text-encre-douce">{pendingLabel}</span>}
      </div>
      {ready ? (
        <ul role="list" className="flex flex-wrap gap-x-4">
          {chapter.documents.map((document) => (
            <li key={document.slug}>
              <Link
                href={`/cours/${programmeSlug}/${chapter.slug}/${document.slug}`}
                className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
              >
                {named(document)}
                <span className="sr-only">, {chapter.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
