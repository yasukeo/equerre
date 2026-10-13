import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { BackLink } from "@/components/shell/page-header";
import { requireViewer } from "@/lib/auth";
import { CALLOUT_KINDS, type CalloutKind, readStoredLesson } from "@/lib/lesson/document";
import { documentVersion } from "@/lib/pdf/links";
import { createClient } from "@/lib/supabase/server";
import { LessonEditor } from "./lesson-editor";
// The editor draws the lesson as the page will: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.lessonEditor");
  return { title: t("title") };
}

export default async function EditLessonPage({ params }: PageProps<"/prof/lecons/[id]">) {
  const t = await getTranslations("tutor.lessonEditor");

  return (
    <div className="grid max-w-6xl gap-4">
      {/* The title is a field of the form below: the page's heading says what the page is. */}
      <h1 className="sr-only">{t("title")}</h1>
      <BackLink href="/prof/lecons" label={t("back")} />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <EditLesson params={params} />
      </Suspense>
    </div>
  );
}

async function EditLesson({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select(
      "id, title, summary, slug, kind, status, visibility, content, updated_at, chapter:chapters!inner(title, slug, updated_at, programme:programmes!inner(slug, label))",
    )
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  const t = await getTranslations("lesson");
  const calloutLabels = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, t(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;

  return (
    <LessonEditor
      calloutLabels={calloutLabels}
      lesson={{
        id: data.id,
        title: data.title,
        summary: data.summary ?? "",
        status: data.status,
        kind: data.kind,
        visibility: data.visibility,
        content: readStoredLesson(data.content),
        context: `${data.chapter.programme.label} · ${data.chapter.title}`,
        publicPath: `/cours/${data.chapter.programme.slug}/${data.chapter.slug}/${data.slug}`,
        version: documentVersion(
          data.updated_at,
          data.chapter.updated_at,
          data.chapter.programme.label,
        ),
      }}
    />
  );
}
