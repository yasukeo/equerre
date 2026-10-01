import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BandStats, PageBand } from "@/components/course/page-band";
import { EXAM_HUE, hue } from "@/lib/design/colors";
import { listExamProgrammes, type ExamProgramme } from "@/lib/exams/queries";
import { programmeName } from "@/lib/lesson/streams";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("exams");
  return { title: t("title"), description: t("lead"), alternates: { canonical: "/examens" } };
}

/**
 * The past national exams, by programme (D-097, D-100): in violet, the exams' colour across
 * the site, each programme a card that says how many papers it holds and from when.
 */
export default async function ExamsPage() {
  const [t, programmes] = await Promise.all([getTranslations("exams"), listExamProgrammes()]);
  const colour = hue(EXAM_HUE);
  const papers = programmes.reduce((sum, programme) => sum + programme.paperCount, 0);
  const first = Math.min(...programmes.map((programme) => programme.firstYear));
  const latest = Math.max(...programmes.map((programme) => programme.latestYear));

  return (
    <main id="contenu">
      <PageBand colour={colour.band}>
        <p className="text-sm font-medium tracking-[0.08em] text-white uppercase">{t("eyebrow")}</p>
        <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3.25rem)] leading-[1.05] font-semibold text-balance [font-variation-settings:'HEXP'_45]">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-lg text-white">{t("lead")}</p>
        {programmes.length > 0 ? (
          <BandStats
            colour={colour.text}
            stats={[
              { value: papers, label: t("statPapers", { count: papers }) },
              {
                value: programmes.length,
                label: t("statProgrammes", { count: programmes.length }),
              },
              { value: first === latest ? latest : `${first}–${latest}`, label: t("statYears") },
            ]}
          />
        ) : null}
      </PageBand>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-8 sm:py-10">
        {programmes.length === 0 ? (
          <div className="grid gap-1 rounded-2xl border border-dashed border-trait bg-surface px-5 py-5">
            <p>{t("empty")}</p>
            <Link
              href="/cours"
              className="inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre"
            >
              {t("toCourses")}
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{t("choose")}</h2>
            <ul role="list" className="grid gap-3 sm:grid-cols-2">
              {programmes.map((programme) => (
                <ProgrammeCard
                  key={programme.code}
                  programme={programme}
                  count={
                    programme.firstYear === programme.latestYear
                      ? t("countOneYear", {
                          count: programme.paperCount,
                          year: programme.latestYear,
                        })
                      : t("count", {
                          count: programme.paperCount,
                          first: programme.firstYear,
                          latest: programme.latestYear,
                        })
                  }
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}

function ProgrammeCard({ programme, count }: { programme: ExamProgramme; count: string }) {
  const colour = hue(EXAM_HUE);
  return (
    <li className="grid">
      <Link
        href={`/examens/${programme.slug}`}
        className={cn(
          "group grid min-h-32 content-between gap-4 rounded-2xl border border-t-4 border-quadrillage bg-surface p-5 transition-colors hover:border-trait",
          colour.top,
        )}
      >
        <span className="grid gap-2">
          <span className="flex items-start justify-between gap-3">
            <span className="text-lg leading-snug font-semibold">
              {programmeName(programme.label)}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5",
                colour.chip,
              )}
            >
              <ArrowRight className="size-4" />
            </span>
          </span>
          {programme.streams.length > 1 ? (
            <span className="flex flex-wrap gap-1.5">
              {programme.streams.map((stream) => (
                <span
                  key={stream}
                  className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", colour.chip)}
                >
                  {stream}
                </span>
              ))}
            </span>
          ) : null}
        </span>
        <span className="text-sm text-encre-douce">{count}</span>
      </Link>
    </li>
  );
}
