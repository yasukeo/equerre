import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listChapterOptions } from "@/lib/chapters";
import { NewLessonForm } from "./new-lesson-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.newLesson");
  return { title: t("title") };
}

export default async function NewLessonPage() {
  const t = await getTranslations("tutor.newLesson");

  return (
    <div className="grid max-w-xl gap-6">
      <div>
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="mt-1 text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-40 rounded-md bg-sunken" />}>
        <NewLesson />
      </Suspense>
    </div>
  );
}

async function NewLesson() {
  await requireViewer("tutor");
  // Grouped by programme, in teaching order, for the chapter picker (D-094).
  return <NewLessonForm levels={await listChapterOptions()} />;
}
