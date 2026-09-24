import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
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
  const supabase = await createClient();
  const { data } = await supabase
    .from("chapters")
    .select("id, title, position, level:levels!inner(code, label, position)");

  // Grouped by level, in teaching order, for the chapter picker.
  const chapters = [...(data ?? [])].sort(
    (a, b) => a.level.position - b.level.position || a.position - b.position,
  );
  const levels: { label: string; chapters: { id: string; title: string }[] }[] = [];
  for (const chapter of chapters) {
    const last = levels.at(-1);
    const entry = { id: chapter.id, title: chapter.title };
    if (last?.label === chapter.level.label) {
      last.chapters.push(entry);
    } else {
      levels.push({ label: chapter.level.label, chapters: [entry] });
    }
  }

  return <NewLessonForm levels={levels} />;
}
