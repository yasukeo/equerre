import {
  ArrowRight,
  BookmarkCheck,
  CalendarPlus,
  MapPin,
  MessageCircle,
  PencilLine,
  Play,
  Timer,
  Video,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { GradeMark } from "@/components/grade-mark";
import { LateBadge } from "@/components/late-badge";
import { SessionStatusChip } from "@/components/session-status";
import { Countdown } from "@/components/student/countdown";
import { Protractor } from "@/components/student/protractor";
import { ReadingRuler } from "@/components/student/ruler";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { countUnread } from "@/lib/chat/queries";
import { formatLocal } from "@/lib/dates";
import { kindHue } from "@/lib/design/colors";
import { getMyGrades, listMyHomework } from "@/lib/homework/queries";
import {
  getExamCountdown,
  listMyExamAttempts,
  getStudentCourse,
  resumePoint,
  revisionPlan,
} from "@/lib/student/progress";
import { createClient } from "@/lib/supabase/server";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav.student");
  return { title: t("home") };
}

export default function StudentHomePage() {
  return (
    <Suspense fallback={<StudentHomeSkeleton />}>
      <StudentHome />
    </Suspense>
  );
}

const DAY = 24 * 60 * 60 * 1000;

async function StudentHome() {
  const viewer = await requireViewer("student");
  const [t, tSession, tKind, tHomework, tProgress] = await Promise.all([
    getTranslations("student.home"),
    getTranslations("session"),
    getTranslations("documentKind"),
    getTranslations("student.homework"),
    getTranslations("student.progress"),
  ]);
  const supabase = await createClient();
  const now = new Date();
  const nowIso = now.toISOString();

  const [sessionsResult, homework, grades, unread, course, countdown, attempts, tExams] =
    await Promise.all([
      supabase
        .from("sessions")
        .select(
          "id, starts_at, ends_at, status, mode, location, meeting_url, group:groups(name), session_type:session_types(name)",
        )
        .gte("ends_at", nowIso)
        .in("status", ["en_attente", "planifiee"])
        .order("starts_at")
        .limit(3),
      listMyHomework(now),
      getMyGrades(3),
      countUnread(),
      getStudentCourse(viewer),
      getExamCountdown(viewer.programmeCode, now),
      listMyExamAttempts(viewer),
      getTranslations("exams"),
    ]);

  const [next, ...later] = sessionsResult.data ?? [];
  const firstName = viewer.fullName.split(" ")[0] || viewer.fullName;
  // Only an active or paused student has homework ahead of her (D-060); soonest due first.
  const toHandIn =
    viewer.status === "arrete"
      ? []
      : homework
          .filter((entry) => entry.progress.left > 0)
          .sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt))
          .slice(0, 3);
  // Homework late or due within two days comes before the session: it is tonight's job.
  const urgent = toHandIn.some(
    (entry) => entry.progress.late || Date.parse(entry.dueAt) - now.getTime() < 2 * DAY,
  );
  const resume = resumePoint(course);
  const running = attempts.find((attempt) => !attempt.finishedAt);
  const withDocuments = course.chapters.filter((chapter) => chapter.documents.length > 0);
  const week = countdown ? revisionPlan(course, countdown, now)[0] : undefined;
  const saved = [...course.chapters.flatMap((chapter) => chapter.documents), ...course.shared]
    .filter((document) => document.bookmarked)
    .slice(0, 4);
  const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

  const sectionTitle = "flex items-center gap-2.5 text-lg font-semibold";
  const quiet =
    "inline-flex min-h-11 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre";

  const homeworkBlock = (
    <section aria-labelledby="homework-due" className="grid gap-3">
      <h2 id="homework-due" className={sectionTitle}>
        <span aria-hidden="true" className="size-3 rounded bg-rouge" />
        {t("homework")}
      </h2>
      {toHandIn.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
          {t("noHomework")}
        </p>
      ) : (
        <ul role="list" className="grid gap-2.5">
          {toHandIn.map((entry) => {
            const done = entry.progress.total - entry.progress.left;
            return (
              <li
                key={entry.id}
                className="grid gap-3 rounded-2xl border border-s-4 border-quadrillage border-s-rouge bg-surface p-4"
              >
                <div className="grid gap-0.5">
                  <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                    {entry.title}
                    {entry.progress.late ? <LateBadge label={tHomework("late")} /> : null}
                  </h3>
                  <p className="text-sm text-encre-douce first-letter:uppercase">
                    {tHomework("due", {
                      date: formatLocal(entry.dueAt, "EEEE d MMMM 'à' HH:mm"),
                    })}
                  </p>
                </div>
                <div className="grid gap-1.5">
                  <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-sunken">
                    <span
                      className="block h-full rounded-full bg-rouge"
                      style={{
                        width: `${Math.round((done / Math.max(entry.progress.total, 1)) * 100)}%`,
                      }}
                    />
                  </span>
                  <span className="text-sm">
                    {entry.subject
                      ? tHomework("subject.copyToHandIn")
                      : tHomework("left", {
                          left: entry.progress.left,
                          total: entry.progress.total,
                        })}
                  </span>
                </div>
                <Link
                  href={`/eleve/devoirs/${entry.id}`}
                  className={cn(buttonVariants({ size: "sm" }), "justify-self-start")}
                >
                  <PencilLine aria-hidden="true" className="size-4" />
                  {done === 0 ? t("startHomework") : t("continueHomework")}
                  <span className="sr-only">{`: ${entry.title}`}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <Link href="/eleve/devoirs" className={cn(quiet, "justify-self-start")}>
        {t("allHomework")}
      </Link>
    </section>
  );

  const sessionBlock = (
    <section
      aria-labelledby="next-session"
      className="relative overflow-hidden rounded-2xl bg-bleu-bande p-5 text-white sm:p-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.09)_1px,transparent_1px)] bg-[size:22px_22px]"
      />
      <div className="relative grid gap-4">
        <h2
          id="next-session"
          className="text-sm font-medium tracking-[0.08em] text-white uppercase"
        >
          {t("nextSession")}
        </h2>
        {next ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-lg first-letter:uppercase">
                  {formatLocal(next.starts_at, "EEEE d MMMM")}
                </p>
                <p className="text-4xl font-semibold tabular">
                  {formatLocal(next.starts_at, "HH:mm")} – {formatLocal(next.ends_at, "HH:mm")}
                </p>
              </div>
              {next.status === "en_attente" ? (
                <span className="rounded-sm bg-surface">
                  <SessionStatusChip
                    status={next.status}
                    label={tSession(`status.${next.status}`)}
                  />
                </span>
              ) : null}
            </div>
            <p className="flex items-start gap-2 text-white">
              {next.mode === "en_ligne" ? (
                <Video aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              ) : (
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              )}
              <span>
                {[next.session_type?.name, tSession(`mode.${next.mode}`), next.group?.name]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </p>
          </>
        ) : (
          <p className="text-lg">{t("noNextSession")}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {next && next.mode === "en_ligne" && next.meeting_url ? (
            <a
              href={next.meeting_url}
              className={cn(buttonVariants(), "bg-white text-bleu-bande hover:bg-white/90")}
            >
              <Video aria-hidden="true" />
              {tSession("join")}
            </a>
          ) : null}
          {next ? (
            <Link
              href={`/eleve/seances/${next.id}`}
              className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-white/60 underline-offset-4 hover:decoration-white"
            >
              {t("sessionDetails")}
            </Link>
          ) : null}
          {viewer.status === "actif" ? (
            <Link
              href="/eleve/seances/reserver"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium underline decoration-white/60 underline-offset-4 hover:decoration-white"
            >
              <CalendarPlus aria-hidden="true" className="size-4" />
              {t("book")}
            </Link>
          ) : null}
        </div>
        {later.length > 0 ? (
          <ul role="list" className="grid gap-1 border-t border-white/25 pt-3 text-sm">
            {later.map((session) => (
              <li key={session.id}>
                <Link
                  href={`/eleve/seances/${session.id}`}
                  className="flex min-h-11 items-center justify-between gap-3 hover:underline"
                >
                  <span className="first-letter:uppercase">
                    {formatLocal(session.starts_at, "EEEE d MMMM")}
                  </span>
                  <span className="tabular">{formatLocal(session.starts_at, "HH:mm")}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-8">
      <RefreshOnReturn />
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="grid gap-1">
          <p className="text-sm text-encre-douce first-letter:uppercase">
            {formatLocal(now, "EEEE d MMMM")}
          </p>
          <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
            {t("greeting", { name: firstName })}
          </h1>
        </div>
        {countdown ? <Countdown countdown={countdown} href="/eleve/progression" /> : null}
      </header>

      {running ? (
        <Link
          href={`/eleve/examens/${running.examId}`}
          className="flex min-h-14 items-center gap-3 rounded-2xl border-2 border-encre bg-surface px-4 py-3 font-medium hover:bg-sunken"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-violet-bande text-white">
            <Timer aria-hidden="true" className="size-5" />
          </span>
          <span className="grid flex-1">
            <span>{tProgress("examRunning")}</span>
            {running.exam ? (
              <span className="text-sm font-normal text-encre-douce">
                {tExams("nationalExam", { year: running.exam.year })} ·{" "}
                {tExams(`session.${running.exam.session}`)}
              </span>
            ) : null}
          </span>
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>
      ) : null}

      {unread > 0 ? (
        <Link
          href="/eleve/messages"
          className="flex min-h-14 items-center gap-3 rounded-2xl bg-orange-fond px-4 py-3 font-medium text-orange-texte hover:brightness-95"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-orange-bande text-white">
            <MessageCircle aria-hidden="true" className="size-5" />
          </span>
          <span className="flex-1">{t("unreadMessages", { count: unread })}</span>
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
        <div className="grid gap-8">
          {urgent ? (
            <>
              {homeworkBlock}
              {sessionBlock}
            </>
          ) : (
            <>
              {sessionBlock}
              {homeworkBlock}
            </>
          )}

          {resume ? (
            <section aria-labelledby="resume-heading" className="grid gap-3">
              <h2 id="resume-heading" className={sectionTitle}>
                <span aria-hidden="true" className="size-3 rounded bg-stylo-bleu" />
                {resume.document.opened ? tProgress("resume") : tProgress("start")}
              </h2>
              <Link
                href={`/eleve/cours/${resume.document.slug}`}
                className="group grid gap-3 rounded-2xl bg-encre-fixe p-5 text-white"
              >
                <span className="text-xs font-semibold uppercase opacity-80">
                  {tKind(`one.${resume.document.kind}`)}
                  {resume.chapter
                    ? ` · ${tProgress("chapterNumber", { number: resume.chapter.number })} · ${resume.chapter.title}`
                    : null}
                </span>
                <span className="flex items-center justify-between gap-3 text-xl leading-snug font-semibold">
                  {frenchSpaces(resume.document.title)}
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-encre-fixe transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    <Play aria-hidden="true" className="size-5" />
                  </span>
                </span>
                {resume.document.opened && resume.document.position > 0.02 ? (
                  <span className="flex items-center gap-3 text-sm">
                    <ReadingRuler position={resume.document.position} onInk className="flex-1" />
                    <span className="tabular">
                      {tProgress("readPercent", {
                        percent: Math.round(resume.document.position * 100),
                      })}
                    </span>
                  </span>
                ) : null}
              </Link>
            </section>
          ) : null}
        </div>

        <aside className="grid gap-6">
          {withDocuments.length > 0 ? (
            <section
              aria-labelledby="my-progress"
              className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5"
            >
              <h2 id="my-progress" className="font-semibold">
                {tProgress("myProgress")}
              </h2>
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
              {week && week.chapters.length > 0 ? (
                <div className="grid gap-2 border-t border-quadrillage pt-3">
                  <p className="text-sm font-medium">{tProgress("rightNow")}</p>
                  <ul role="list" className="flex flex-wrap gap-1.5">
                    {week.chapters.map((chapter) => (
                      <li key={chapter.slug}>
                        <Link
                          href={`/eleve/chapitres/${chapter.slug}`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-quadrillage px-3 text-sm hover:border-trait"
                        >
                          <span className="font-semibold tabular">{chapter.number}</span>
                          {frenchSpaces(chapter.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <Link href="/eleve/progression" className={cn(quiet, "justify-self-start")}>
                {tProgress("seeProgress")}
                <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
              </Link>
            </section>
          ) : null}

          {saved.length > 0 ? (
            <section aria-labelledby="saved-home" className="grid gap-3">
              <h2 id="saved-home" className={sectionTitle}>
                <BookmarkCheck aria-hidden="true" className="size-5" />
                {tProgress("savedTitle")}
              </h2>
              <ul role="list" className="grid gap-2">
                {saved.map((document) => {
                  const hue = kindHue(document.kind);
                  return (
                    <li key={document.id}>
                      <Link
                        href={`/eleve/cours/${document.slug}`}
                        className={cn(
                          "grid gap-0.5 rounded-xl border border-s-4 border-quadrillage bg-surface px-3 py-2.5 hover:border-trait",
                          hue.edge,
                        )}
                      >
                        <span className={cn("text-xs font-semibold uppercase", hue.text)}>
                          {tKind(`one.${document.kind}`)}
                        </span>
                        <span className="text-sm font-medium">{frenchSpaces(document.title)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/eleve/cours#a-revoir" className={cn(quiet, "justify-self-start")}>
                {tProgress("savedAll")}
              </Link>
            </section>
          ) : null}

          <section aria-labelledby="my-grades" className="grid gap-3">
            <h2 id="my-grades" className={sectionTitle}>
              <span aria-hidden="true" className="size-3 rounded bg-violet" />
              {t("grades")}
            </h2>
            {grades.average === null ? (
              <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
                {t("noGrades")}
              </p>
            ) : (
              <div className="grid gap-3 rounded-2xl border border-quadrillage bg-surface p-4">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl font-semibold text-violet-texte tabular">
                    {t("averageValue", { average: gradeFormat.format(grades.average) })}
                  </span>
                  <span className="text-sm text-encre-douce">
                    {t("averageOver", { count: grades.count })}
                  </span>
                </p>
                <ul role="list" className="divide-y divide-quadrillage border-t border-quadrillage">
                  {grades.recent.map((entry) => (
                    <li key={`${entry.assignmentId}/${entry.exerciseId}`}>
                      <Link
                        href={`/eleve/devoirs/${entry.assignmentId}/${entry.exerciseId}`}
                        className="flex min-h-14 items-center justify-between gap-4 py-3 hover:bg-sunken"
                      >
                        <span className="min-w-0 font-medium">{entry.title}</span>
                        <GradeMark
                          grade={gradeFormat.format(entry.grade)}
                          label={t("gradeLabel")}
                          className="shrink-0"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/eleve/progression#grades-heading"
                  className={cn(quiet, "justify-self-start")}
                >
                  {tProgress("seeGrades")}
                </Link>
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

function StudentHomeSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-8">
      <div className="h-14 w-56 rounded-xl bg-sunken" />
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-6">
          <div className="h-48 rounded-2xl bg-sunken" />
          <div className="h-48 rounded-2xl bg-sunken" />
        </div>
        <div className="h-72 rounded-2xl bg-sunken" />
      </div>
    </div>
  );
}
