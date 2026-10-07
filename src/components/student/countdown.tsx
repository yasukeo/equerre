import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { formatLocalDate } from "@/lib/dates";
import type { ExamCountdown } from "@/lib/student/progress";
import { cn } from "@/lib/utils";

/**
 * The days left before her exam, on a highlighter stroke: the highlighter marks where she is,
 * and this is where she is in the year (DESIGN.md). Small on the home page, large on her
 * progress page.
 */
export async function Countdown({
  countdown,
  size = "sm",
  href,
}: {
  countdown: ExamCountdown;
  size?: "sm" | "lg";
  href?: string;
}) {
  const t = await getTranslations("student.progress");
  const exam = t(`exam.${countdown.kind}`);
  const date = formatLocalDate(`${countdown.date}T12:00:00Z`);

  if (size === "sm") {
    const chip = (
      <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-encre/15 bg-surligneur px-3 text-sm font-semibold text-encre-fixe">
        <span className="tabular">{t("daysShort", { days: countdown.daysLeft })}</span>
        <span className="font-normal">{t(`examChip.${countdown.kind}`)}</span>
      </span>
    );
    return href ? (
      <Link href={href} className="inline-flex min-h-11 items-center rounded-full">
        {chip}
        <span className="sr-only">{t("countdownDate", { date })}</span>
      </Link>
    ) : (
      chip
    );
  }

  return (
    <div className="grid gap-1">
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span
          className={cn(
            "relative isolate inline-block px-2 text-5xl leading-tight font-semibold text-encre-fixe tabular [font-variation-settings:'HEXP'_45]",
            "before:absolute before:inset-0 before:-z-10 before:-skew-x-6 before:rounded-md before:bg-surligneur",
          )}
        >
          {countdown.daysLeft}
        </span>
        <span className="text-lg font-medium">
          {t("daysBefore", { days: countdown.daysLeft, exam })}
        </span>
      </p>
      <p className="text-sm text-encre-douce">
        {countdown.confirmed ? t("dateSet", { date }) : t("dateIndicative", { date })}
      </p>
    </div>
  );
}
