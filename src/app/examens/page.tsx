import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { listExamProgrammes } from "@/lib/exams/queries";
import { programmeName } from "@/lib/lesson/streams";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("exams");
  return { title: t("title"), description: t("lead"), alternates: { canonical: "/examens" } };
}

/** The past national exams, by programme (D-097): the papers and their corrections as PDFs. */
export default async function ExamsPage() {
  const [t, tCycle, programmes] = await Promise.all([
    getTranslations("exams"),
    getTranslations("coursesIndex.cycle"),
    listExamProgrammes(),
  ]);

  return (
    <main id="contenu" className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8">
      <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_100]">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-encre-douce">{t("lead")}</p>

      {programmes.length === 0 ? (
        <div className="mt-10 grid gap-1 rounded-md border border-dashed border-trait px-4 py-4">
          <p>{t("empty")}</p>
          <Link
            href="/cours"
            className="inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("toCourses")}
          </Link>
        </div>
      ) : (
        <ul role="list" className="mt-10 grid gap-3 sm:grid-cols-2">
          {programmes.map((programme) => (
            <li key={programme.code} className="grid">
              <Link
                href={`/examens/${programme.slug}`}
                className="grid min-h-24 content-start gap-1 rounded-md border border-quadrillage bg-surface px-4 py-3 hover:border-encre"
              >
                <span className="text-sm text-encre-douce">
                  {tCycle(programme.cycle as "college" | "tronc_commun" | "1bac" | "2bac")}
                </span>
                <span className="font-semibold underline decoration-trait underline-offset-4">
                  {programmeName(programme.label)}
                </span>
                {programme.streams.length > 1 ? (
                  <span className="text-sm">
                    {t("streams", { list: programme.streams.join("\u00a0· ") })}
                  </span>
                ) : null}
                <span className="text-sm text-encre-douce">
                  {t("count", { count: programme.paperCount, latest: programme.latestYear })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
