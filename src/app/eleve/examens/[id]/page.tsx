import { ArrowLeft, ExternalLink, FileText, Flag, Play, TriangleAlert, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import { ConfirmForm } from "@/components/student/confirm-form";
import { ExamTimer } from "@/components/student/exam-timer";
import { SelfScoreForm } from "@/components/student/self-score-form";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer, type Viewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { EXAM_HUE, hue } from "@/lib/design/colors";
import { examPaperSlug } from "@/lib/exams/files";
import { getExamCorrection, getProgrammeExams, type ExamPaper } from "@/lib/exams/queries";
import { correctionTitle } from "@/lib/exams/titles";
import { listProgrammes } from "@/lib/lesson/queries";
import { listMyExamAttempts, PAPER_MINUTES } from "@/lib/student/progress";
import { cn } from "@/lib/utils";
import { abandonExam, finishExam, startExam } from "../actions";
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

async function findPaper(viewer: Viewer, id: string) {
  const programmes = await listProgrammes();
  const programme = programmes.find((entry) => entry.code === viewer.programmeCode);
  if (!programme) return null;
  const exams = await getProgrammeExams(programme.slug);
  const paper = exams?.years.flatMap((year) => year.papers).find((entry) => entry.id === id);
  return paper ? { programme, paper } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/eleve/examens/[id]">): Promise<Metadata> {
  const viewer = await requireViewer("student");
  const [{ id }, tExams] = await Promise.all([params, getTranslations("exams")]);
  const found = await findPaper(viewer, id);
  return found
    ? {
        title: `${tExams("nationalExam", { year: found.paper.year })} · ${tExams(`session.${found.paper.session}`)}`,
      }
    : {};
}

export default async function StudentExamPage({
  params,
  searchParams,
}: PageProps<"/eleve/examens/[id]">) {
  const t = await getTranslations("student.exam");
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-6">
      <Link
        href="/eleve/examens"
        className="inline-flex min-h-11 items-center gap-1.5 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {t("title")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-80 rounded-2xl bg-sunken" />}>
        <Exam params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

/** « 4 h », « 1 h 30 »: a duration as the paper's cover writes it. */
function durationLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${String(rest).padStart(2, "0")}`;
}

async function Exam({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: PageProps<"/eleve/examens/[id]">["searchParams"];
}) {
  const viewer = await requireViewer("student");
  const [{ id }, query, t, tExams] = await Promise.all([
    params,
    searchParams,
    getTranslations("student.exam"),
    getTranslations("exams"),
  ]);
  const found = await findPaper(viewer, id);
  if (!found) notFound();
  const { programme, paper } = found;
  const attempts = (await listMyExamAttempts(viewer)).filter((attempt) => attempt.examId === id);
  const ongoing = attempts.find((attempt) => !attempt.finishedAt);
  const finished = attempts.filter((attempt) => attempt.finishedAt);
  const lastFinished = finished[0];
  const minutes = PAPER_MINUTES[programme.code] ?? 180;
  const canStart = viewer.status !== "arrete";
  // She asked for the correction without sitting the paper: shown, not recorded.
  const peek = query.corrige === "1" && !ongoing;
  const format = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

  const startForm = canStart ? (
    <ConfirmForm
      action={startExam}
      fields={{ examId: paper.id }}
      trigger={t("start")}
      icon={<Play aria-hidden="true" className="size-5" />}
      question={t("startConfirm")}
      confirm={t("startYes")}
      cancel={t("notNow")}
    >
      <label className="grid gap-1.5 justify-self-start text-sm font-medium">
        {t("durationLabel")}
        <select
          name="minutes"
          defaultValue={String(minutes)}
          className="min-h-11 rounded-md border border-trait bg-surface px-3 text-base"
        >
          {[...new Set([60, 90, 120, 180, 240, minutes])]
            .sort((a, b) => a - b)
            .map((value) => (
              <option key={value} value={value}>
                {durationLabel(value)}
                {value === minutes ? ` · ${t("official")}` : ""}
              </option>
            ))}
        </select>
      </label>
    </ConfirmForm>
  ) : null;

  return (
    <>
      <header className="relative grid gap-2 overflow-hidden rounded-2xl bg-violet-bande p-5 text-white sm:p-6">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:20px_20px]"
        />
        <p className="relative text-sm font-medium tracking-[0.08em] uppercase">
          {tExams("nationalExam", { year: paper.year })}
        </p>
        <h1 className="relative text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
          {tExams(`session.${paper.session}`)}
          {paper.track ? <span className="font-normal"> · {paper.track}</span> : null}
        </h1>
        {paper.language === "ar" ? (
          <p className="relative text-sm">{tExams("arabicSubject")}</p>
        ) : null}
      </header>

      {query.erreur === "1" ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-stylo-rouge/40 bg-lavis-rouge px-4 py-3 text-sm text-stylo-rouge"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {t("startFailed")}
        </p>
      ) : null}

      {ongoing ? (
        <section
          aria-labelledby="exam-running"
          className="grid gap-5 rounded-2xl border-2 border-encre bg-surface p-5"
        >
          <h2 id="exam-running" className="text-lg font-semibold">
            {t("running")}
          </h2>
          <ExamTimer startedAt={ongoing.startedAt} minutes={ongoing.durationMinutes} />
          <SubjectLink href={paper.subjectUrl} label={t("openSubject")} />
          <p className="text-sm text-encre-douce">{t("runningHint")}</p>
          <ConfirmForm
            action={finishExam}
            fields={{ attemptId: ongoing.id }}
            trigger={t("finish")}
            icon={<Flag aria-hidden="true" className="size-5" />}
            question={t("finishConfirm")}
            confirm={t("finishYes")}
            cancel={t("keepGoing")}
          />
          <ConfirmForm
            action={abandonExam}
            fields={{ attemptId: ongoing.id }}
            trigger={t("abandon")}
            icon={<X aria-hidden="true" className="size-4" />}
            question={t("abandonConfirm")}
            confirm={t("abandonYes")}
            cancel={t("keepGoing")}
            tone="quiet"
          />
        </section>
      ) : lastFinished ? (
        <>
          <section
            aria-labelledby="self-score"
            className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5"
          >
            <h2 id="self-score" className="text-lg font-semibold">
              {t("scoreTitle")}
            </h2>
            <p className="text-sm text-encre-douce">
              {t("finishedOn", {
                date: formatLocal(
                  lastFinished.finishedAt ?? lastFinished.startedAt,
                  "EEEE d MMMM 'à' HH:mm",
                ),
              })}
            </p>
            <SelfScoreForm attemptId={lastFinished.id} score={lastFinished.selfScore} />
            <SubjectLink href={paper.subjectUrl} label={t("openSubject")} />
          </section>
          <Correction paper={paper} programmeSlug={programme.slug} />
          {finished.length > 1 ? (
            <section aria-labelledby="history" className="grid gap-3">
              <h2 id="history" className="font-semibold">
                {t("history")}
              </h2>
              <ul
                role="list"
                className="divide-y divide-quadrillage rounded-2xl border border-quadrillage bg-surface"
              >
                {finished.map((attempt) => (
                  <li
                    key={attempt.id}
                    className="flex min-h-11 items-center justify-between gap-3 px-4 py-2 text-sm"
                  >
                    <span>
                      {formatLocal(attempt.finishedAt ?? attempt.startedAt, "d MMMM yyyy")}
                    </span>
                    <span className="font-semibold tabular">
                      {attempt.selfScore === null ? "—" : `${format.format(attempt.selfScore)}/20`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {startForm ? (
            <section
              aria-labelledby="exam-again"
              className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5"
            >
              <h2 id="exam-again" className="font-semibold">
                {t("again")}
              </h2>
              {startForm}
            </section>
          ) : null}
        </>
      ) : (
        <>
          <section
            aria-labelledby="exam-start"
            className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5"
          >
            <h2 id="exam-start" className="text-lg font-semibold">
              {t("conditions")}
            </h2>
            <ul className="grid list-disc gap-1.5 ps-5 text-sm text-encre-douce">
              <li>{t("ruleTime", { hours: durationLabel(minutes) })}</li>
              <li>{t("ruleCalculator")}</li>
              <li>{t("ruleCorrection")}</li>
            </ul>
            {startForm}
          </section>
          <section
            aria-labelledby="no-clock"
            className="grid gap-3 rounded-2xl border border-dashed border-trait p-5"
          >
            <h2 id="no-clock" className="font-semibold">
              {t("withoutClock")}
            </h2>
            <p className="text-sm text-encre-douce">{t("withoutClockHint")}</p>
            <div className="flex flex-wrap gap-3">
              <SubjectLink href={paper.subjectUrl} label={t("openSubject")} />
              {peek ? null : (
                <Link
                  href={`/eleve/examens/${paper.id}?corrige=1#correction`}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {t("peekCorrection")}
                </Link>
              )}
            </div>
          </section>
          {peek ? <Correction paper={paper} programmeSlug={programme.slug} /> : null}
        </>
      )}
    </>
  );
}

function SubjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(buttonVariants({ variant: "outline" }), "justify-self-start")}
    >
      <FileText aria-hidden="true" />
      {label}
      <ExternalLink aria-hidden="true" className="size-4" />
    </a>
  );
}

/** After the clock: the correction, Équerre's on the page, or the ministry's PDF. */
async function Correction({ paper, programmeSlug }: { paper: ExamPaper; programmeSlug: string }) {
  const [t, tExams] = await Promise.all([
    getTranslations("student.exam"),
    getTranslations("exams"),
  ]);
  const ours = paper.correctionHref
    ? await getExamCorrection(programmeSlug, examPaperSlug(paper))
    : null;

  if (ours) {
    return (
      <section id="correction" aria-label={t("correction")} className="grid scroll-mt-6 gap-4">
        <p className="flex items-start gap-2 rounded-xl bg-lavis-rouge px-4 py-3 text-sm text-stylo-rouge">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {tExams("notOfficial")}
        </p>
        <LessonArticle
          title={correctionTitle(tExams, ours)}
          summary={ours.summary}
          publishedAt={ours.publishedAt}
          context={tExams("nationalExam", { year: paper.year })}
          content={ours.content}
          badge={{ label: tExams("correctionKind"), colour: hue(EXAM_HUE) }}
          titleAs="h2"
        />
      </section>
    );
  }

  return (
    <section
      id="correction"
      aria-labelledby="correction-heading"
      className="grid scroll-mt-6 gap-3 rounded-2xl border border-quadrillage bg-surface p-5"
    >
      <h2 id="correction-heading" className="text-lg font-semibold">
        {t("correction")}
      </h2>
      {paper.solutionUrl ? (
        <a
          href={paper.solutionUrl}
          target="_blank"
          rel="noopener"
          className={cn(buttonVariants(), "justify-self-start")}
        >
          <FileText aria-hidden="true" />
          {paper.official ? tExams("officialAnswers") : tExams("solution")}
          <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      ) : (
        <p className="text-encre-douce">{tExams("noSolution")}</p>
      )}
    </section>
  );
}
