import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import { PdfLinks } from "@/components/pdf-links";
import { requireViewer } from "@/lib/auth";
import { getReadableLesson } from "@/lib/lesson/readable";
// The same page as the public site: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

// The lesson is read through her own session, so this page defers to request time anyway;
// the title streams with it (node_modules/next/dist/docs, generateMetadata, Cache Components).
export async function generateMetadata({
  params,
}: PageProps<"/eleve/cours/[slug]">): Promise<Metadata> {
  const lesson = await getReadableLesson((await params).slug);
  return lesson ? { title: lesson.title, description: lesson.summary ?? undefined } : {};
}

export default async function StudentLessonPage({ params }: PageProps<"/eleve/cours/[slug]">) {
  const t = await getTranslations("student.lessons");

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Link
        href="/eleve/cours"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<ReaderSkeleton />}>
        <Reader params={params} />
      </Suspense>
    </div>
  );
}

async function Reader({ params }: { params: Promise<{ slug: string }> }) {
  await requireViewer("student");
  const lesson = await getReadableLesson((await params).slug);
  if (!lesson) notFound();

  return (
    <LessonArticle
      {...lesson}
      downloads={<PdfLinks id={lesson.id} version={lesson.version} kind={lesson.kind} />}
    />
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
