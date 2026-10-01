import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cycleHue } from "@/lib/design/colors";
import { listProgrammes, type Cycle, type ProgrammeSummary } from "@/lib/lesson/queries";
import { programmeName } from "@/lib/lesson/streams";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("coursesIndex");
  return { title: t("title"), description: t("lead"), alternates: { canonical: "/cours" } };
}

const CYCLES: readonly Cycle[] = ["college", "tronc_commun", "1bac", "2bac"];

/**
 * The course's front page (D-094, D-100): every maths programme of the Moroccan school, by
 * level, each level in the colour of its notebook cover, so a student finds hers at a glance
 * and by the name she knows.
 */
export default async function CoursesPage() {
  const [t, programmes] = await Promise.all([getTranslations("coursesIndex"), listProgrammes()]);

  return (
    <main id="contenu" className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
      <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-encre-douce">{t("lead")}</p>

      {/* The four levels, to jump to one. */}
      <nav aria-label={t("levels")} className="mt-6 flex flex-wrap gap-2">
        {CYCLES.map((cycle) => (
          <a
            key={cycle}
            href={`#cycle-${cycle}`}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium",
              cycleHue(cycle).band,
            )}
          >
            {t(`cycle.${cycle}`)}
          </a>
        ))}
      </nav>

      {CYCLES.map((cycle) => {
        const inCycle = programmes.filter((programme) => programme.cycle === cycle);
        if (inCycle.length === 0) return null;
        const colour = cycleHue(cycle);
        return (
          <section
            key={cycle}
            aria-labelledby={`cycle-${cycle}-titre`}
            className="mt-12 grid gap-4"
            id={`cycle-${cycle}`}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <span aria-hidden="true" className={cn("h-7 w-2 rounded-full", colour.dot)} />
              <span id={`cycle-${cycle}-titre`}>{t(`cycle.${cycle}`)}</span>
            </h2>
            <ul role="list" className="grid gap-3 sm:grid-cols-2">
              {inCycle.map((programme) => (
                <ProgrammeCard
                  key={programme.code}
                  cycle={cycle}
                  programme={programme}
                  progress={t("progress", {
                    ready: programme.readyCount,
                    total: programme.chapterCount,
                  })}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}

function ProgrammeCard({
  cycle,
  programme,
  progress,
}: {
  cycle: Cycle;
  programme: ProgrammeSummary;
  progress: string;
}) {
  const colour = cycleHue(cycle);
  const share = programme.chapterCount > 0 ? programme.readyCount / programme.chapterCount : 0;
  return (
    <li className="grid">
      <Link
        href={`/cours/${programme.slug}`}
        className="group grid min-h-36 content-between gap-4 overflow-hidden rounded-2xl border border-quadrillage bg-surface p-5 transition-colors hover:border-trait"
      >
        <span className="grid gap-2">
          {/* The cycle is the section's heading: the card leads with what sets it apart. */}
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
          {/* A programme followed by one stream of the same name says nothing more. */}
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
        <span className="grid gap-1.5">
          {share > 0 ? (
            <span aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-sunken">
              <span
                className={cn("block h-full rounded-full", colour.dot)}
                style={{ width: `${Math.round(share * 100)}%` }}
              />
            </span>
          ) : null}
          <span className="text-sm text-encre-douce">{progress}</span>
        </span>
      </Link>
    </li>
  );
}
