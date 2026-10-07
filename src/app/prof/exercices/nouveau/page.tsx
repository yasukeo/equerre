import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listChapterOptions } from "@/lib/chapters";
import { NewExerciseForm } from "./new-exercise-form";
import { PageHeader } from "@/components/shell/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.newExercise");
  return { title: t("title") };
}

export default async function NewExercisePage() {
  const t = await getTranslations("tutor.newExercise");

  return (
    <div className="grid max-w-xl gap-6">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Suspense fallback={<div aria-hidden="true" className="h-56 rounded-2xl bg-sunken" />}>
        <NewExercise />
      </Suspense>
    </div>
  );
}

async function NewExercise() {
  await requireViewer("tutor");
  return <NewExerciseForm levels={await listChapterOptions()} />;
}
