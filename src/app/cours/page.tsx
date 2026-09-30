import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { listProgrammes, type Cycle, type ProgrammeSummary } from "@/lib/lesson/queries";
import { programmeName } from "@/lib/lesson/streams";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("coursesIndex");
  return { title: t("title"), description: t("lead"), alternates: { canonical: "/cours" } };
}

const CYCLES: readonly Cycle[] = ["college", "tronc_commun", "1bac", "2bac"];

/**
 * The course's front page (D-094): every maths programme of the Moroccan school, by cycle,
 * each with the streams that follow it, so a student finds hers by the name she knows.
 */
export default async function CoursesPage() {
  const [t, programmes] = await Promise.all([getTranslations("coursesIndex"), listProgrammes()]);

  return (
    <main id="contenu" className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8">
      <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_100]">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-encre-douce">{t("lead")}</p>

      {CYCLES.map((cycle) => {
        const inCycle = programmes.filter((programme) => programme.cycle === cycle);
        if (inCycle.length === 0) return null;
        return (
          <section key={cycle} aria-labelledby={`cycle-${cycle}`} className="mt-12 grid gap-4">
            <h2 id={`cycle-${cycle}`} className="text-xl font-semibold">
              {t(`cycle.${cycle}`)}
            </h2>
            <ul role="list" className="grid gap-3 sm:grid-cols-2">
              {inCycle.map((programme) => (
                <ProgrammeCard
                  key={programme.code}
                  programme={programme}
                  streams={
                    // A programme followed by one stream of the same name says nothing more.
                    programme.streams.length > 1
                      ? t("streams", { list: programme.streams.join("\u00a0· ") })
                      : null
                  }
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
  programme,
  streams,
  progress,
}: {
  programme: ProgrammeSummary;
  streams: string | null;
  progress: string;
}) {
  return (
    <li className="grid">
      <Link
        href={`/cours/${programme.slug}`}
        className="grid min-h-24 content-start gap-1 rounded-md border border-quadrillage bg-surface px-4 py-3 hover:border-encre"
      >
        {/* The cycle is the section's heading: the card leads with what sets it apart. */}
        <span className="font-semibold underline decoration-trait underline-offset-4">
          {programmeName(programme.label)}
        </span>
        {streams ? <span className="text-sm">{streams}</span> : null}
        <span className="text-sm text-encre-douce">{progress}</span>
      </Link>
    </li>
  );
}
