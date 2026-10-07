import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ChapterStateChip, DocumentRow, marksOf } from "@/components/student/course-cards";
import { Ruler } from "@/components/student/ruler";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { cycleHue } from "@/lib/design/colors";
import { DOCUMENT_KINDS } from "@/lib/lesson/kinds";
import { getStudentCourse } from "@/lib/student/progress";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/eleve/chapitres/[chapitre]">): Promise<Metadata> {
  const viewer = await requireViewer("student");
  const { chapitre } = await params;
  const course = await getStudentCourse(viewer);
  const chapter = course.chapters.find((entry) => entry.slug === chapitre);
  return chapter ? { title: chapter.title } : {};
}

export default async function StudentChapterPage({
  params,
}: PageProps<"/eleve/chapitres/[chapitre]">) {
  const t = await getTranslations("student.progress");
  return (
    <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-3xl gap-6">
      <Link
        href="/eleve/cours"
        className="inline-flex min-h-11 items-center gap-1.5 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {t("reviseTitle")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-2xl bg-sunken" />}>
        <Chapter params={params} />
      </Suspense>
    </div>
  );
}

async function Chapter({ params }: { params: Promise<{ chapitre: string }> }) {
  const viewer = await requireViewer("student");
  const [{ chapitre }, t, tKind] = await Promise.all([
    params,
    getTranslations("student.progress"),
    getTranslations("documentKind"),
  ]);
  const course = await getStudentCourse(viewer);
  const index = course.chapters.findIndex((entry) => entry.slug === chapitre);
  const chapter = course.chapters[index];
  if (!chapter || chapter.documents.length === 0) notFound();

  const next = chapter.documents.find((document) => !document.understood);
  const previous = course.chapters
    .slice(0, index)
    .reverse()
    .find((entry) => entry.documents.length > 0);
  const following = course.chapters
    .slice(index + 1)
    .find((entry) => entry.documents.length > 0);
  const groups = DOCUMENT_KINDS.flatMap((kind) => {
    const documents = chapter.documents.filter((document) => document.kind === kind);
    return documents.length > 0 ? [{ kind, documents }] : [];
  });

  return (
    <>
      <header
        className={cn(
          "relative grid gap-4 overflow-hidden rounded-2xl p-5 sm:p-6",
          cycleHue(course.programme?.cycle ?? "2bac").band,
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:20px_20px]"
        />
        <p className="relative text-sm font-medium tracking-[0.08em] uppercase opacity-90">
          {t("chapterNumber", { number: chapter.number })}
        </p>
        <h1 className="relative text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
          {frenchSpaces(chapter.title)}
        </h1>
        {chapter.description ? (
          <p className="relative max-w-prose text-white/90">{frenchSpaces(chapter.description)}</p>
        ) : null}
        <div className="relative grid gap-2 rounded-xl bg-surface p-3 text-encre">
          <Ruler marks={marksOf(chapter.documents)} />
          <span className="flex flex-wrap items-center gap-2 text-sm">
            <ChapterStateChip state={chapter.state} />
            <span className="text-encre-douce tabular">
              {t("understoodOf", {
                understood: chapter.understood,
                total: chapter.documents.length,
              })}
            </span>
          </span>
        </div>
        {next ? (
          <Link
            href={`/eleve/cours/${next.slug}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "relative justify-self-start bg-white text-encre-fixe hover:bg-white/90",
            )}
          >
            {next.opened ? t("continueWith") : t("startWith")}
            <span className="font-normal">{tKind(`one.${next.kind}`)}</span>
            <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
          </Link>
        ) : (
          <p className="relative inline-flex items-center gap-2 font-semibold">
            <Check aria-hidden="true" className="size-5" />
            {t("chapterDone")}
          </p>
        )}
      </header>

      {/* The chapter's documents in the order they are worked: course, summary, series, test. */}
      <ol role="list" className="grid gap-6">
        {groups.map(({ kind, documents }, step) => (
          <li key={kind} className="grid gap-3">
            <h2 className="flex items-center gap-3 font-semibold">
              <span
                aria-hidden="true"
                className="grid size-7 place-content-center rounded-full border-2 border-encre text-sm tabular"
              >
                {step + 1}
              </span>
              {tKind(`${documents.length > 1 ? "many" : "one"}.${kind}`)}
              <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
            </h2>
            <ul role="list" className="grid gap-2.5 ps-0 sm:ps-10">
              {documents.map((document) => (
                <li key={document.id}>
                  <DocumentRow document={document} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <nav aria-label={t("chapterNav")} className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/eleve/chapitres/${previous.slug}`}
            className="grid gap-0.5 rounded-2xl border border-quadrillage bg-surface p-4 hover:border-trait"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-encre-douce">
              <ArrowLeft aria-hidden="true" className="size-3.5 rtl:rotate-180" />
              {t("chapterNumber", { number: previous.number })}
            </span>
            <span className="font-medium">{frenchSpaces(previous.title)}</span>
          </Link>
        ) : (
          <span />
        )}
        {following ? (
          <Link
            href={`/eleve/chapitres/${following.slug}`}
            className="grid gap-0.5 rounded-2xl border border-quadrillage bg-surface p-4 text-end hover:border-trait"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs text-encre-douce">
              {t("chapterNumber", { number: following.number })}
              <ArrowRight aria-hidden="true" className="size-3.5 rtl:rotate-180" />
            </span>
            <span className="font-medium">{frenchSpaces(following.title)}</span>
          </Link>
        ) : null}
      </nav>
    </>
  );
}
