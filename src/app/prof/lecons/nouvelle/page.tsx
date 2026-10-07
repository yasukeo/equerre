import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listChapterOptions } from "@/lib/chapters";
import { NewLessonForm } from "./new-lesson-form";
import { PageHeader } from "@/components/shell/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.newLesson");
  return { title: t("title") };
}

export default async function NewLessonPage() {
  const t = await getTranslations("tutor.newLesson");

  return (
    <div className="grid max-w-xl gap-6">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Suspense fallback={<div aria-hidden="true" className="h-40 rounded-2xl bg-sunken" />}>
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
