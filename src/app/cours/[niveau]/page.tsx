import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ChapterFolder } from "@/components/course/chapter-folder";
import { BandStats, PageBand } from "@/components/course/page-band";
import { cycleHue } from "@/lib/design/colors";
import { listExamProgrammes } from "@/lib/exams/queries";
import { getProgrammeCourse, listProgrammes } from "@/lib/lesson/queries";
import { programmeName } from "@/lib/lesson/streams";

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
    <main id="contenu">
      <Suspense
        fallback={
          <div aria-hidden="true" className="grid gap-6">
            <div className="h-64 animate-pulse bg-sunken" />
            <div className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-2xl bg-sunken" />
          </div>
        }
      >
        <Programme params={params} />
      </Suspense>
    </main>
  );
}

async function Programme({ params }: { params: Promise<{ niveau: string }> }) {
  // A stream's old address (`/cours/2bac-pc`) never gets here: next.config.ts redirects it.
  const { niveau } = await params;
  const [t, tIndex, programme, withExams] = await Promise.all([
    getTranslations("programmePage"),
    getTranslations("coursesIndex"),
    getProgrammeCourse(niveau),
    listExamProgrammes(),
  ]);
  if (!programme) notFound();

  const exams = withExams.find((candidate) => candidate.code === programme.code);
  const level = cycleHue(programme.cycle);
  const semesters = [1, 2, null] as const;
  const numbered = programme.chapters.map((chapter, index) => ({ ...chapter, number: index + 1 }));
  const documents = programme.chapters.reduce((sum, chapter) => sum + chapter.documents.length, 0);
  const ready = programme.chapters.filter((chapter) => chapter.documents.length > 0);
  // The first chapter with something to read opens by itself: the page shows what it holds.
  const firstReady = ready[0]?.slug;

  const stats = [
    {
      value: programme.chapters.length,
      label: t("statChapters", { count: programme.chapters.length }),
    },
    { value: documents, label: t("statDocuments", { count: documents }) },
    ...(exams
      ? [{ value: exams.paperCount, label: t("statExams", { count: exams.paperCount }) }]
      : []),
  ];

  return (
    <>
      {/* The programme's band, in its level's colour. */}
      <PageBand colour={level.band}>
        <nav aria-label={t("breadcrumb")} className="text-sm">
          <ol role="list" className="flex flex-wrap items-center gap-x-2 text-white">
            <li>
              <Link
                href="/cours"
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                {t("back")}
              </Link>
            </li>
            {/* The separator goes with the item after it, so a wrapped line never ends on it. */}
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">›</span>
              {tIndex(`cycle.${programme.cycle}`)}
            </li>
          </ol>
        </nav>
        <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3.25rem)] leading-[1.05] font-semibold text-balance [font-variation-settings:'HEXP'_45]">
          {programmeName(programme.label)}
        </h1>
        {programme.streams.length > 1 ? (
          <ul role="list" aria-label={t("streamsLabel")} className="flex flex-wrap gap-2">
            {programme.streams.map((stream) => (
              <li key={stream} className="rounded-full border border-white/80 px-3 py-1 text-sm">
                {stream}
              </li>
            ))}
          </ul>
        ) : null}
        <BandStats stats={stats} colour={level.text} />
      </PageBand>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-8">
        <nav aria-label={t("sections")} className="flex flex-wrap gap-2">
          <span
            aria-current="page"
            className="inline-flex min-h-11 items-center rounded-full bg-encre px-4 text-sm font-medium text-papier"
          >
            {t("tabChapters")}
          </span>
          {exams ? (
            <Link
              href={`/examens/${programme.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-trait bg-surface px-4 text-sm font-medium hover:border-encre"
            >
              {t("tabExams")}
              <span className="rounded-full bg-violet-fond px-2 py-0.5 text-xs text-violet-texte">
                {exams.paperCount}
              </span>
            </Link>
          ) : null}
        </nav>

        <p className="text-encre-douce">
          {t("progress", {
            ready: ready.length,
            total: programme.chapters.length,
            complete: ready.length === programme.chapters.length ? "yes" : "no",
          })}
        </p>

        {semesters.map((semester) => {
          const chapters = numbered.filter((chapter) => chapter.semester === semester);
          if (chapters.length === 0) return null;
          const id = `semestre-${semester ?? "autre"}`;
          return (
            <section key={id} aria-labelledby={id} className="grid gap-3">
              <h2
                id={id}
                className="text-sm font-semibold tracking-[0.08em] text-encre-douce uppercase"
              >
                {t("semester", { semester: String(semester ?? "none") })}
              </h2>
              <ol role="list" className="grid gap-2.5">
                {chapters.map((chapter) => (
                  <ChapterFolder
                    key={chapter.slug}
                    programmeSlug={programme.slug}
                    cycle={programme.cycle}
                    chapter={chapter}
                    open={chapter.slug === firstReady}
                  />
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </>
  );
}
