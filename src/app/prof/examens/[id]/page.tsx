import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { listProgrammes } from "@/lib/lesson/queries";
import { createClient } from "@/lib/supabase/server";
import { DeletePaper } from "../delete-paper";
import { PaperForm } from "../paper-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.exams");
  return { title: t("editTitle") };
}

export default async function EditPaperPage({ params }: PageProps<"/prof/examens/[id]">) {
  const t = await getTranslations("tutor.exams");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/examens"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <EditPaper params={params} />
      </Suspense>
    </div>
  );
}

async function EditPaper({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const supabase = await createClient();
  const [{ data: paper }, programmes, t] = await Promise.all([
    supabase
      .from("national_exams")
      .select(
        "id, programme_code, year, session, track, language, official, status, subject_path, solution_path, subject_source_url",
      )
      .eq("id", id)
      .maybeSingle(),
    listProgrammes(),
    getTranslations("tutor.exams"),
  ]);
  if (!paper) notFound();

  const bucket = supabase.storage.from("national-exams");
  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <h1 className="text-xl font-semibold">
          {t("paperTitle", { year: paper.year, session: paper.session })}
          {paper.track ? ` · ${paper.track}` : null}
        </h1>
        {paper.official ? (
          <p className="max-w-prose text-sm text-encre-douce">{t("officialHint")}</p>
        ) : null}
        <ul role="list" className="flex flex-wrap gap-x-5">
          <li>
            <a
              href={bucket.getPublicUrl(paper.subject_path).data.publicUrl}
              className="inline-flex min-h-11 items-center text-sm text-stylo-bleu underline underline-offset-4"
            >
              {t("openSubject")}
            </a>
          </li>
          {paper.solution_path ? (
            <li>
              <a
                href={bucket.getPublicUrl(paper.solution_path).data.publicUrl}
                className="inline-flex min-h-11 items-center text-sm text-stylo-bleu underline underline-offset-4"
              >
                {t("openSolution")}
              </a>
            </li>
          ) : null}
        </ul>
      </div>
      <PaperForm
        id={paper.id}
        editing
        hasSolution={paper.solution_path !== null}
        programmes={programmes.map(({ code, label }) => ({ code, label }))}
        initial={{
          programme: paper.programme_code,
          year: String(paper.year),
          session: paper.session,
          track: paper.track ?? "",
          language: paper.language,
          published: paper.status === "published",
        }}
      />
      <DeletePaper id={paper.id} hasSolution={paper.solution_path !== null} />
    </div>
  );
}
