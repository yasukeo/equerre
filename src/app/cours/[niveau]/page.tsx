import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import {
  getProgrammeCourse,
  listProgrammes,
  programmeSlugForLevel,
  type ProgrammeChapter,
} from "@/lib/lesson/queries";

export async function generateStaticParams(): Promise<{ niveau: string }[]> {
  const programmes = await listProgrammes();
  return programmes.map((programme) => ({ niveau: programme.slug }));
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
  const { niveau } = await params;
  const [t, tKind, programme] = await Promise.all([
    getTranslations("programmePage"),
    getTranslations("documentKind"),
    getProgrammeCourse(niveau),
  ]);
  if (!programme) {
    // Before programmes, a course address named a stream: `/cours/2bac-pc`.
    const moved = await programmeSlugForLevel(niveau);
    if (moved) permanentRedirect(`/cours/${moved}`);
    notFound();
  }

  const list = new Intl.ListFormat("fr", { type: "conjunction" });
  const semesters = [1, 2, null] as const;
  const numbered = programme.chapters.map((chapter, index) => ({ ...chapter, number: index + 1 }));

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
          <p className="text-encre-douce">
            {t("streams", { list: list.format(programme.streams) })}
          </p>
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
                  numberLabel={t("chapter", { number: chapter.number })}
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
  numberLabel,
  pendingLabel,
  kindLabel,
}: {
  programmeSlug: string;
  chapter: ProgrammeChapter & { number: number };
  numberLabel: string;
  pendingLabel: string;
  kindLabel: (kind: ProgrammeChapter["documents"][number]["kind"]) => string;
}) {
  const ready = chapter.documents.length > 0;
  return (
    <li className="grid gap-2 bg-surface px-4 py-3">
      <p className="grid gap-0.5">
        <span className="text-sm text-encre-douce">{numberLabel}</span>
        {ready ? (
          <Link
            href={`/cours/${programmeSlug}/${chapter.slug}`}
            className="font-semibold underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {chapter.title}
          </Link>
        ) : (
          <span className="font-semibold">{chapter.title}</span>
        )}
      </p>
      {ready ? (
        <ul role="list" className="flex flex-wrap gap-x-4 gap-y-1">
          {chapter.documents.map((document) => (
            <li key={document.slug}>
              <Link
                href={`/cours/${programmeSlug}/${chapter.slug}/${document.slug}`}
                className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
              >
                {document.kind === "cours" ? kindLabel(document.kind) : document.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-encre-douce">{pendingLabel}</p>
      )}
    </li>
  );
}
