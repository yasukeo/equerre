import { BookmarkCheck, GraduationCap } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChapterStateChip, marksOf } from "@/components/student/course-cards";
import { Protractor } from "@/components/student/protractor";
import { Ruler } from "@/components/student/ruler";
import { formatLocal } from "@/lib/dates";
import { kindHue } from "@/lib/design/colors";
import { listRecentActivity, type ActivityItem } from "@/lib/student/activity";
import { getStudentCourse } from "@/lib/student/progress";
import { createClient } from "@/lib/supabase/server";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

const format = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

/**
 * How a student works between sessions (D-104), on her file: where she is in her programme,
 * what she keeps « à revoir » (what she finds hard), the past papers she sat and her own
 * marks, and what she did lately.
 */
export async function ProgressPanel({
  studentId,
  levelCode,
}: {
  studentId: string;
  levelCode: string | null;
}) {
  const [t, tProgress, tKind, tExams, tToday] = await Promise.all([
    getTranslations("tutor.student.progress"),
    getTranslations("student.progress"),
    getTranslations("documentKind"),
    getTranslations("exams"),
    getTranslations("tutor.today"),
  ]);
  const supabase = await createClient();
  const { data: level } = levelCode
    ? await supabase.from("levels").select("programme_code").eq("code", levelCode).maybeSingle()
    : { data: null };
  const [course, activity, attempts] = await Promise.all([
    getStudentCourse({ id: studentId, programmeCode: level?.programme_code ?? null }, true),
    listRecentActivity({ studentId, limit: 6 }),
    supabase
      .from("exam_attempts")
      .select("id, finished_at, self_score, exam:national_exams(year, session, track)")
      .eq("student_id", studentId)
      .not("finished_at", "is", null)
      .order("finished_at", { ascending: false })
      .limit(6),
  ]);

  const describe = (item: ActivityItem) => {
    switch (item.kind) {
      case "understood":
      case "opened":
        return tToday(item.kind === "understood" ? "didUnderstand" : "didOpen", {
          kind: item.lesson.kind,
          title: item.lesson.title,
        });
      case "handedIn":
        return tToday("didHandIn", { title: item.exercise });
      case "exam":
        return tToday("didExam", {
          year: item.year,
          session: tExams(`sessionInTitle.${item.session}`),
          score: item.score === null ? "none" : format.format(item.score),
        });
    }
  };

  const withDocuments = course.chapters.filter((chapter) => chapter.documents.length > 0);
  const started = withDocuments.filter((chapter) => chapter.state !== "a_commencer");
  const saved = [
    ...course.chapters.flatMap((chapter) => chapter.documents),
    ...course.shared,
  ].filter((document) => document.bookmarked);
  const sat = attempts.data ?? [];

  if (!course.programme) {
    return <p className="text-sm text-encre-douce">{t("noProgramme")}</p>;
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-4 sm:grid-cols-[13rem_1fr] sm:items-center">
        <Protractor
          className="justify-self-center"
          states={withDocuments.map((chapter) => chapter.state)}
          value={`${course.totals.chaptersDone}/${withDocuments.length}`}
          caption={tProgress("chaptersUnderstood")}
          label={tProgress("protractorLabel", {
            done: course.totals.chaptersDone,
            total: withDocuments.length,
          })}
        />
        <dl className="grid grid-cols-3 gap-3 text-center sm:text-start">
          <div>
            <dt className="text-xs text-encre-douce">{t("opened")}</dt>
            <dd className="text-2xl font-semibold tabular">
              {course.totals.opened}
              <span className="text-sm font-normal text-encre-douce">
                /{course.totals.documents}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-encre-douce">{t("understood")}</dt>
            <dd className="text-2xl font-semibold tabular">{course.totals.understood}</dd>
          </div>
          <div>
            <dt className="text-xs text-encre-douce">{t("saved")}</dt>
            <dd className="text-2xl font-semibold tabular">{saved.length}</dd>
          </div>
        </dl>
      </div>

      {started.length > 0 ? (
        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-encre-douce">{t("chaptersStarted")}</h3>
          <ul
            role="list"
            className="divide-y divide-quadrillage rounded-2xl border border-quadrillage bg-surface"
          >
            {started.map((chapter) => (
              <li
                key={chapter.id}
                className="grid gap-2 px-4 py-3 sm:grid-cols-[1.5rem_1fr_9rem_auto] sm:items-center sm:gap-3"
              >
                <span className="text-sm font-semibold text-encre-douce tabular">
                  {chapter.number}
                </span>
                <span className="text-sm font-medium">{frenchSpaces(chapter.title)}</span>
                <Ruler
                  marks={marksOf(chapter.documents)}
                  label={t("rulerLabel", {
                    understood: chapter.understood,
                    total: chapter.documents.length,
                  })}
                />
                <ChapterStateChip state={chapter.state} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-encre-douce">{t("nothingStarted")}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid content-start gap-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-encre-douce">
            <BookmarkCheck aria-hidden="true" className="size-4" />
            {t("savedHeading")}
          </h3>
          {saved.length === 0 ? (
            <p className="text-sm text-encre-douce">{t("savedEmpty")}</p>
          ) : (
            <ul role="list" className="grid gap-1.5">
              {saved.slice(0, 8).map((document) => {
                const hue = kindHue(document.kind);
                return (
                  <li key={document.id}>
                    <Link
                      href={`/prof/lecons/${document.id}`}
                      className={cn(
                        "block rounded-xl border border-s-4 border-quadrillage bg-surface px-3 py-2 text-sm hover:border-trait",
                        hue.edge,
                      )}
                    >
                      <span className={cn("me-2 text-xs font-semibold uppercase", hue.text)}>
                        {tKind(`one.${document.kind}`)}
                      </span>
                      {frenchSpaces(document.title)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="grid content-start gap-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-encre-douce">
            <GraduationCap aria-hidden="true" className="size-4" />
            {t("papersHeading")}
          </h3>
          {sat.length === 0 ? (
            <p className="text-sm text-encre-douce">{t("papersEmpty")}</p>
          ) : (
            <ul
              role="list"
              className="divide-y divide-quadrillage rounded-xl border border-quadrillage bg-surface"
            >
              {sat.map((attempt) => (
                <li
                  key={attempt.id}
                  className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                >
                  <span className="grid">
                    <span className="font-medium">
                      {attempt.exam
                        ? `${tExams("nationalExam", { year: attempt.exam.year })} · ${tExams(`session.${attempt.exam.session}`)}`
                        : null}
                    </span>
                    <span className="text-xs text-encre-douce">
                      {formatLocal(attempt.finished_at ?? "", "d MMMM")}
                    </span>
                  </span>
                  <span className="font-semibold text-violet-texte tabular">
                    {attempt.self_score === null ? "—" : `${format.format(attempt.self_score)}/20`}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {sat.length > 0 ? <p className="text-xs text-encre-douce">{t("selfScoreNote")}</p> : null}
        </div>
      </div>

      {activity.length > 0 ? (
        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-encre-douce">{t("activityHeading")}</h3>
          <ol role="list" className="grid gap-1.5">
            {activity.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <span className="w-24 shrink-0 text-xs text-encre-douce tabular">
                  {formatLocal(item.at, "d MMM, HH:mm")}
                </span>
                <span className="min-w-0">{describe(item)}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
