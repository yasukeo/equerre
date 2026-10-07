import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import { PdfLinks } from "@/components/pdf-links";
import { BookmarkToggle } from "@/components/student/bookmark-toggle";
import { ReadingTracker } from "@/components/student/reading-tracker";
import { UnderstoodToggle } from "@/components/student/understood-toggle";
import { requireViewer } from "@/lib/auth";
import { kindHue } from "@/lib/design/colors";
import { getReadableLesson } from "@/lib/lesson/readable";
import { getStudentCourse } from "@/lib/student/progress";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";
// The same page as the public site: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

// The lesson is read through her own session, so this page defers to request time anyway;
// the title streams with it (node_modules/next/dist/docs, generateMetadata, Cache Components).
export async function generateMetadata({
  params,
}: PageProps<"/eleve/cours/[slug]">): Promise<Metadata> {
  // Her session is read before anything else: the auth client reads the clock, which Cache
  // Components allows only once the render belongs to a request.
  await connection();
  const lesson = await getReadableLesson((await params).slug);
  return lesson ? { title: lesson.title, description: lesson.summary ?? undefined } : {};
}

export default function StudentLessonPage({ params }: PageProps<"/eleve/cours/[slug]">) {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<ReaderSkeleton />}>
        <Reader params={params} />
      </Suspense>
    </div>
  );
}

async function Reader({ params }: { params: Promise<{ slug: string }> }) {
  const viewer = await requireViewer("student");
  const [t, tKind, lesson, course] = await Promise.all([
    getTranslations("student.progress"),
    getTranslations("documentKind"),
    params.then(({ slug }) => getReadableLesson(slug)),
    getStudentCourse(viewer),
  ]);
  if (!lesson) notFound();

  // Where it sits in her programme, if it is one of hers: the chapter, and what comes next.
  const chapter = course.chapters.find((entry) =>
    entry.documents.some((document) => document.id === lesson.id),
  );
  const documents = chapter?.documents ?? [];
  const index = documents.findIndex((document) => document.id === lesson.id);
  const mine =
    documents[index] ?? course.shared.find((document) => document.id === lesson.id) ?? null;
  const next = index >= 0 ? documents[index + 1] : undefined;
  const nextHue = next ? kindHue(next.kind) : null;

  return (
    <>
      <ReadingTracker
        lessonId={lesson.id}
        initialPosition={mine?.position ?? 0}
        understood={mine?.understood ?? false}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={chapter ? `/eleve/chapitres/${chapter.slug}` : "/eleve/cours"}
          className="inline-flex min-h-11 min-w-0 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0 rtl:rotate-180" />
          <span className="truncate">
            {chapter ? t("backToChapter", { number: chapter.number }) : t("reviseTitle")}
          </span>
        </Link>
        <BookmarkToggle
          lessonId={lesson.id}
          saved={mine?.bookmarked ?? false}
          title={lesson.title}
        />
      </div>

      <LessonArticle
        title={lesson.title}
        summary={lesson.summary}
        publishedAt={lesson.publishedAt}
        context={lesson.context}
        content={lesson.content}
        kind={{ kind: lesson.kind, label: tKind(`one.${lesson.kind}`) }}
        downloads={<PdfLinks id={lesson.id} version={lesson.version} kind={lesson.kind} />}
      />

      {/* The end of the page: say it is understood, then go on. */}
      <section
        aria-labelledby="end-of-document"
        className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5 print:hidden"
      >
        <h2 id="end-of-document" className="text-lg font-semibold">
          {t(lesson.kind === "serie" || lesson.kind === "devoir" ? "endPractice" : "endLesson")}
        </h2>
        <UnderstoodToggle
          lessonId={lesson.id}
          understood={mine?.understood ?? false}
          kind={lesson.kind}
        />
        {next && nextHue ? (
          <Link
            href={`/eleve/cours/${next.slug}`}
            className={cn(
              "group grid gap-0.5 rounded-xl border border-s-4 border-quadrillage p-4 hover:border-trait",
              nextHue.edge,
            )}
          >
            <span className="flex items-center gap-2 text-xs">
              <span className="text-encre-douce">{t("next")}</span>
              <span className={cn("font-semibold uppercase", nextHue.text)}>
                {tKind(`one.${next.kind}`)}
              </span>
            </span>
            <span className="flex items-center justify-between gap-3 font-medium">
              {frenchSpaces(next.title)}
              <ArrowRight aria-hidden="true" className="size-5 shrink-0 rtl:rotate-180" />
            </span>
          </Link>
        ) : chapter ? (
          <Link
            href={`/eleve/chapitres/${chapter.slug}`}
            className="inline-flex min-h-11 items-center gap-1.5 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("backToChapter", { number: chapter.number })}
          </Link>
        ) : null}
      </section>
    </>
  );
}

function ReaderSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="h-4 w-40 rounded bg-quadrillage" />
      <div className="mt-4 h-10 w-3/4 rounded bg-quadrillage" />
      <div className="mt-10 space-y-3">
        <div className="h-4 w-full rounded bg-quadrillage" />
        <div className="h-4 w-11/12 rounded bg-quadrillage" />
        <div className="h-4 w-4/5 rounded bg-quadrillage" />
      </div>
    </div>
  );
}
