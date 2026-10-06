import type { getTranslations } from "next-intl/server";
import type { ExamSession } from "./files";

type ExamsTranslator = Awaited<ReturnType<typeof getTranslations<"exams">>>;

/**
 * « Corrigé de l’examen national 2021, session normale », with the streams that sat the paper
 * when they were not the whole programme: the page, its metadata and its PDF say the same.
 */
export function correctionTitle(
  t: ExamsTranslator,
  paper: { year: number; session: ExamSession; track: string | null },
): string {
  const title = t("correctionTitle", {
    year: paper.year,
    session: t(`sessionInTitle.${paper.session}`),
  });
  return paper.track ? `${title} (${paper.track})` : title;
}
