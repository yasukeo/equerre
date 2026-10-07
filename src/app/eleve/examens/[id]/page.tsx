import { ArrowLeft, ExternalLink, FileText, Flag, Play, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import { ExamTimer } from "@/components/student/exam-timer";
import { SelfScoreForm } from "@/components/student/self-score-form";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { requireViewer, type Viewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { examPaperSlug } from "@/lib/exams/files";
import { getExamCorrection, getProgrammeExams, type ExamPaper } from "@/lib/exams/queries";
import { listProgrammes } from "@/lib/lesson/queries";
import { listMyExamAttempts, PAPER_MINUTES } from "@/lib/student/progress";
import { cn } from "@/lib/utils";
import { EXAM_HUE, hue } from "@/lib/design/colors";
import { correctionTitle } from "@/lib/exams/titles";
import { finishExam, startExam } from "../actions";
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
    ? { title: `${tExams("nationalExam", { year: found.paper.year })} · ${tExams(`session.${found.paper.session}`)}` }
    : {};
}

export default async function StudentExamPage({ params }: PageProps<"/eleve/examens/[id]">) {
  const t = await getTranslations("student.exam");
  return (
    <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-3xl gap-6">
      <Link
        href="/eleve/examens"
        className="inline-flex min-h-11 items-center gap-1.5 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {t("title")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-80 rounded-2xl bg-sunken" />}>
        <Exam params={params} />
      </Suspense>
    </div>
  );
}

async function Exam({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer("student");
  const [{ id }, t, tExams] = await Promise.all([
    params,
    getTranslations("student.exam"),
    getTranslations("exams"),
  ]);
  const found = await findPaper(viewer, id);
  if (!found) notFound();
  const { programme, paper } = found;
  const attempts = (await listMyExamAttempts(viewer)).filter((attempt) => attempt.examId === id);
  const ongoing = attempts.find((attempt) => !attempt.finishedAt);
  const lastFinished = attempts.find((attempt) => attempt.finishedAt);
  const minutes = PAPER_MINUTES[programme.code] ?? 180;
  const canStart = viewer.status !== "arrete";

  return (
    <>
      <header className="relative grid gap-2 overflow-hidden rounded-2xl bg-violet-bande p-5 text-white sm:p-6">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:20px_20px]"
        />
        <p className="relative text-sm font-medium tracking-[0.08em] uppercase opacity-90">
          {tExams("nationalExam", { year: paper.year })}
        </p>
        <h1 className="relative text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
          {tExams(`session.${paper.session}`)}
          {paper.track ? <span className="font-normal"> · {paper.track}</span> : null}
        </h1>
        {paper.language === "ar" ? (
          <p className="relative text-sm text-white/90">{tExams("arabicSubject")}</p>
        ) : null}
      </header>

      {ongoing ? (
        <section aria-labelledby="exam-running" className="grid gap-5 rounded-2xl border-2 border-encre bg-surface p-5">
          <h2 id="exam-running" className="text-lg font-semibold">
            {t("running")}
          </h2>
          <ExamTimer startedAt={ongoing.startedAt} minutes={ongoing.durationMinutes} />
          <SubjectLink href={paper.subjectUrl} label={t("openSubject")} />
          <p className="text-sm text-encre-douce">{t("runningHint")}</p>
          <form action={finishExam}>
            <input type="hidden" name="attemptId" value={ongoing.id} />
            <Button type="submit" size="lg">
              <Flag aria-hidden="true" />
              {t("finish")}
            </Button>
          </form>
        </section>
      ) : (
        <section aria-labelledby="exam-start" className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5">
          <h2 id="exam-start" className="text-lg font-semibold">
            {lastFinished ? t("again") : t("conditions")}
          </h2>
          <ul className="grid gap-1.5 text-sm text-encre-douce">
            <li>{t("ruleTime", { hours: minutes / 60 })}</li>
            <li>{t("ruleCalculator")}</li>
            <li>{t("ruleCorrection")}</li>
          </ul>
          {canStart ? (
            <form action={startExam} className="flex flex-wrap items-end gap-3">
              <input type="hidden" name="examId" value={paper.id} />
              <label className="grid gap-1.5 text-sm font-medium">
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
              <Button type="submit" size="lg">
                <Play aria-hidden="true" />
                {t("start")}
              </Button>
            </form>
          ) : null}
          <details className="group">
            <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4">
              {t("withoutClock")}
            </summary>
            <div className="mt-2 grid gap-3">
              <SubjectLink href={paper.subjectUrl} label={t("openSubject")} />
            </div>
          </details>
        </section>
      )}

      {lastFinished && !ongoing ? (
        <>
          <section aria-labelledby="self-score" className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5">
            <h2 id="self-score" className="text-lg font-semibold">
              {t("scoreTitle")}
            </h2>
            <p className="text-sm text-encre-douce">
              {t("finishedOn", {
                date: formatLocal(lastFinished.finishedAt ?? lastFinished.startedAt, "EEEE d MMMM 'à' HH:mm"),
              })}
            </p>
            <SelfScoreForm attemptId={lastFinished.id} score={lastFinished.selfScore} />
          </section>
          <Correction paper={paper} programmeSlug={programme.slug} />
        </>
      ) : null}

      {attempts.filter((attempt) => attempt.finishedAt).length > 1 ? (
        <section aria-labelledby="history" className="grid gap-3">
          <h2 id="history" className="font-semibold">
            {t("history")}
          </h2>
          <ul role="list" className="divide-y divide-quadrillage rounded-2xl border border-quadrillage bg-surface">
            {attempts
              .filter((attempt) => attempt.finishedAt)
              .map((attempt) => (
                <li key={attempt.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <span>{formatLocal(attempt.finishedAt ?? attempt.startedAt, "d MMMM yyyy")}</span>
                  <span className="font-semibold tabular">
                    {attempt.selfScore === null ? "—" : `${String(attempt.selfScore).replace(".", ",")}/20`}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ) : null}
    </>
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
      <section aria-labelledby="correction" className="grid gap-4">
        <h2 id="correction" className="text-lg font-semibold">
          {t("correction")}
        </h2>
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
        />
      </section>
    );
  }

  return (
    <section aria-labelledby="correction" className="grid gap-3 rounded-2xl border border-quadrillage bg-surface p-5">
      <h2 id="correction" className="text-lg font-semibold">
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

/** « 4 h », « 1 h 30 »: a duration as the paper's cover writes it. */
function durationLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${String(rest).padStart(2, "0")}`;
}
