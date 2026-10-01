import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PublicationChip } from "@/components/lesson-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { Flash } from "@/components/ui/flash";
import { requireViewer } from "@/lib/auth";
import { formatFileSize } from "@/lib/lesson/file-size";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.exams");
  return { title: t("title") };
}

export default async function ExamsAdminPage({ searchParams }: PageProps<"/prof/examens">) {
  const t = await getTranslations("tutor.exams");

  return (
    <div className="grid max-w-4xl gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="max-w-prose text-encre-douce">{t("lead")}</p>
        </div>
        <Link href="/prof/examens/nouveau" className={buttonVariants()}>
          {t("add")}
        </Link>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-72 rounded-md bg-sunken" />}>
        <Papers searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

/** Every paper, by programme then year: drafts included, marked. */
async function Papers({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [t, tLessons, query] = await Promise.all([
    getTranslations("tutor.exams"),
    getTranslations("tutor.lessons"),
    searchParams,
  ]);
  // What the last action did, said on the list it came back to (D-088).
  const done = query.supprime === "1" ? t("deleted") : query.ajoute === "1" ? t("created") : null;
  const deleted = done ? (
    <Flash>
      <p className="font-medium">{done}</p>
    </Flash>
  ) : null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("national_exams")
    .select(
      "id, year, session, track, language, official, status, subject_size, solution_size, programme:programmes!inner(code, slug, label, position)",
    )
    .order("year", { ascending: false })
    .order("session")
    .order("track", { nullsFirst: true });
  if (error) throw new Error("Could not read the national exams", { cause: error });

  if (data.length === 0) {
    return (
      <div className="grid gap-4">
        {deleted}
        <div className="grid gap-2 rounded-md border border-dashed border-trait px-4 py-5">
          <p>{t("empty")}</p>
          <p className="text-sm text-encre-douce">{t("emptyHint")}</p>
        </div>
      </div>
    );
  }

  const byProgramme = new Map<string, { label: string; position: number; papers: typeof data }>();
  for (const paper of data) {
    const group = byProgramme.get(paper.programme.code) ?? {
      label: paper.programme.label,
      position: paper.programme.position,
      papers: [],
    };
    group.papers.push(paper);
    byProgramme.set(paper.programme.code, group);
  }
  const groups = [...byProgramme.entries()].sort(([, a], [, b]) => a.position - b.position);

  return (
    <div className="grid gap-8">
      {deleted}
      {groups.map(([code, group]) => (
        <section key={code} aria-labelledby={`examens-${code}`} className="grid gap-3">
          <h2 id={`examens-${code}`} className="text-lg font-semibold">
            {group.label}
          </h2>
          <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
            {group.papers.map((paper) => (
              <li key={paper.id}>
                <Link
                  href={`/prof/examens/${paper.id}`}
                  className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium">
                      {t("paperTitle", { year: paper.year, session: paper.session })}
                      {paper.track ? ` · ${paper.track}` : null}
                    </span>
                    {paper.status === "draft" ? (
                      <PublicationChip status="draft" label={tLessons("status.draft")} />
                    ) : null}
                    {paper.official ? (
                      <span className="rounded-sm border border-trait px-1.5 py-0.5 text-xs text-encre-douce">
                        {t("officialChip")}
                      </span>
                    ) : null}
                    {paper.language === "ar" ? (
                      <span className="rounded-sm border border-trait px-1.5 py-0.5 text-xs text-encre-douce">
                        {t("languages.ar")}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm text-encre-douce">
                    {[
                      t("subjectSize", { size: formatFileSize(paper.subject_size) }),
                      paper.solution_size === null
                        ? t("noSolution")
                        : t("solutionSize", { size: formatFileSize(paper.solution_size) }),
                    ].join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
