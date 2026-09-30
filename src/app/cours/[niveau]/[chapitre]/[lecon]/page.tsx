import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import {
  getPublicLesson,
  listPublicLessons,
  programmeSlugForLevel,
  type LessonParams,
} from "@/lib/lesson/queries";

export async function generateStaticParams(): Promise<LessonParams[]> {
  const lessons = await listPublicLessons();

  // Cache Components fails the build on an empty list, because it cannot then prove the
  // route yields a static shell. A project whose first lesson is still a draft needs the
  // route all the same, so one placeholder stands in and the page 404s it like any
  // unknown slug.
  return lessons.length > 0
    ? lessons
    : [{ niveau: "tronc-commun-sciences", chapitre: "-", lecon: "-" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/cours/[niveau]/[chapitre]/[lecon]">): Promise<Metadata> {
  const lesson = await getPublicLesson(await params);
  if (!lesson) return {};

  return {
    title: lesson.title,
    description: lesson.summary ?? undefined,
    alternates: {
      canonical: `/cours/${lesson.programmeSlug}/${lesson.chapterSlug}/${(await params).lecon}`,
    },
  };
}

export default function LessonPage({ params }: PageProps<"/cours/[niveau]/[chapitre]/[lecon]">) {
  // `params` is awaited inside the boundary on purpose. Awaiting it out here would tie
  // this segment's App Shell to a single URL, and partial prefetching would lose it.
  return (
    <main id="contenu" className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-8">
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson params={params} />
      </Suspense>
    </main>
  );
}

async function Lesson({ params }: { params: Promise<LessonParams> }) {
  const resolved = await params;
  const lesson = await getPublicLesson(resolved);
  if (!lesson) {
    // Before programmes, a course address named a stream: `/cours/2bac-pc/…`.
    const moved = await programmeSlugForLevel(resolved.niveau);
    if (moved) permanentRedirect(`/cours/${moved}/${resolved.chapitre}/${resolved.lecon}`);
    notFound();
  }

  const crumb = "underline decoration-trait underline-offset-4 hover:decoration-encre";
  return (
    <LessonArticle
      title={lesson.title}
      summary={lesson.summary}
      publishedAt={lesson.publishedAt}
      context={
        <nav aria-label={lesson.chapterTitle} className="flex flex-wrap gap-x-2">
          <Link href={`/cours/${lesson.programmeSlug}`} className={crumb}>
            {lesson.programmeLabel}
          </Link>
          <span aria-hidden="true">·</span>
          <Link href={`/cours/${lesson.programmeSlug}/${lesson.chapterSlug}`} className={crumb}>
            {lesson.chapterTitle}
          </Link>
        </nav>
      }
      content={lesson.content}
    />
  );
}

function LessonSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
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
