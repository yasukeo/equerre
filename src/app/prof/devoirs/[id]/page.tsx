import { ClipboardCheck, Clock, Eye, Pencil, Repeat, User, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { AnswerTypeChip } from "@/components/exercise-status";
import { GradeMark } from "@/components/grade-mark";
import { SubjectCard } from "@/components/subject-card";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { calendarDaysBetween, formatLocal, localDateKey } from "@/lib/dates";
import { signSubject } from "@/lib/homework/subject";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { AssignmentDetailsForm, DeleteAssignment } from "./assignment-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.assignment");
  return { title: t("title") };
}

export default async function AssignmentPage({ params }: PageProps<"/prof/devoirs/[id]">) {
  return (
    <div className="grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Assignment params={params} />
      </Suspense>
    </div>
  );
}

type Cell =
  | { kind: "none" }
  | { kind: "handedIn"; submissionId: string }
  | { kind: "graded"; grade: number; submissionId: string }
  | { kind: "revealed" }
  // Graded, or its solution opened, in another homework: submit_exercise_answer refuses the
  // exercise here for good (exercise_done_elsewhere, solution_already_revealed).
  | { kind: "doneElsewhere" };

async function Assignment({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const t = await getTranslations("tutor.assignment");
  const tTypes = await getTranslations("tutor.exercises.answerType");
  const supabase = await createClient();

  const { data: assignment } = await supabase
    .from("assignments")
    .select(
      "id, title, instructions, due_at, student_id, group_id, student:profiles!assignments_student_id_fkey(id, full_name), group:groups(name), items:assignment_items(position, exercise:exercises(id, title, answer_type, subject_path))",
    )
    .eq("id", id)
    .maybeSingle();
  if (!assignment) notFound();

  const [members, submissions, reveals] = await Promise.all([
    assignment.group_id
      ? supabase
          .from("group_members")
          .select("joined_at, left_at, student:profiles(id, full_name)")
          .eq("group_id", assignment.group_id)
      : Promise.resolve({
          data: [] as {
            joined_at: string;
            left_at: string | null;
            student: { id: string; full_name: string } | null;
          }[],
        }),
    supabase
      .from("submissions")
      .select(
        "id, student_id, exercise_id, status, grade, student:profiles!submissions_student_id_fkey(id, full_name)",
      )
      .eq("assignment_id", id),
    supabase
      .from("exercise_reveals")
      .select("student_id, exercise_id, student:profiles(id, full_name)")
      .eq("assignment_id", id),
  ]);

  const items = [...assignment.items]
    .sort((a, b) => a.position - b.position)
    .flatMap((item) => (item.exercise ? [item.exercise] : []));
  // Given as a PDF (D-106): one hidden exercise, the subject itself.
  const subjectPath = items.length === 1 ? (items[0]?.subject_path ?? null) : null;

  // Everyone the homework reaches — the group's members when it fell due (D-070) — and anyone
  // who answered it: their work is still here.
  const due = Date.parse(assignment.due_at);
  const reached = (members.data ?? []).filter(
    (member) =>
      Date.parse(member.joined_at) <= due &&
      (member.left_at === null || due <= Date.parse(member.left_at)),
  );
  const students = new Map<string, string>();
  if (assignment.student) students.set(assignment.student.id, assignment.student.full_name);
  for (const row of [...reached, ...(submissions.data ?? []), ...(reveals.data ?? [])]) {
    if (row.student) students.set(row.student.id, row.student.full_name);
  }
  const rows = [...students].sort((a, b) => a[1].localeCompare(b[1], "fr"));

  // Work on these exercises in other homework: it closes them here too, keyed by exercise.
  const exerciseIds = items.map((exercise) => exercise.id);
  const studentIds = [...students.keys()];
  const [otherGraded, otherRevealed] =
    exerciseIds.length && studentIds.length
      ? await Promise.all([
          supabase
            .from("submissions")
            .select("student_id, exercise_id")
            .in("exercise_id", exerciseIds)
            .in("student_id", studentIds)
            .neq("assignment_id", id)
            .eq("status", "corrige"),
          supabase
            .from("exercise_reveals")
            .select("student_id, exercise_id")
            .in("exercise_id", exerciseIds)
            .in("student_id", studentIds)
            .neq("assignment_id", id),
        ])
      : [{ data: [] }, { data: [] }];

  const cells = new Map<string, Cell>();
  for (const row of [...(otherGraded.data ?? []), ...(otherRevealed.data ?? [])]) {
    cells.set(`${row.student_id}/${row.exercise_id}`, { kind: "doneElsewhere" });
  }
  for (const reveal of reveals.data ?? []) {
    cells.set(`${reveal.student_id}/${reveal.exercise_id}`, { kind: "revealed" });
  }
  for (const submission of submissions.data ?? []) {
    cells.set(
      `${submission.student_id}/${submission.exercise_id}`,
      submission.status === "corrige" && submission.grade !== null
        ? { kind: "graded", grade: submission.grade, submissionId: submission.id }
        : { kind: "handedIn", submissionId: submission.id },
    );
  }
  const subjectUrl = subjectPath ? await signSubject(supabase, subjectPath) : null;
  const hasWork = (submissions.data?.length ?? 0) + (reveals.data?.length ?? 0) > 0;

  const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });
  const now = new Date();
  const days = calendarDaysBetween(now, assignment.due_at);
  const past = Date.parse(assignment.due_at) < now.getTime();

  // What the grid adds up to: who handed something in, what waits for her, how it went.
  const cellsOf = (studentId: string): Cell[] =>
    items.map((exercise) => cells.get(`${studentId}/${exercise.id}`) ?? { kind: "none" });
  const handedInCount = rows.filter(([studentId]) =>
    cellsOf(studentId).some((cell) => cell.kind === "handedIn" || cell.kind === "graded"),
  ).length;
  const toCorrect = [...cells.values()].flatMap((cell) =>
    cell.kind === "handedIn" ? [cell.submissionId] : [],
  );
  const grades = [...cells.values()].flatMap((cell) =>
    cell.kind === "graded" ? [cell.grade] : [],
  );
  const average = grades.length
    ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
    : null;
  const RecipientIcon = assignment.student ? User : Users;

  const stats = [
    {
      key: "handedIn",
      value: String(handedInCount),
      unit: `/${rows.length}`,
      label: t("stats.handedIn"),
      tone: "",
    },
    {
      key: "toCorrect",
      value: String(toCorrect.length),
      unit: null,
      label: t("stats.toCorrect"),
      tone: toCorrect.length > 0 ? "border-transparent bg-rouge-fond text-rouge-texte" : "",
    },
    {
      key: "average",
      value:
        average === null
          ? null
          : new Intl.NumberFormat("fr", { maximumFractionDigits: 1 }).format(average),
      unit: average === null ? null : "/20",
      label: t("stats.average"),
      tone: "",
    },
  ];

  return (
    <div className="grid gap-8">
      <PageHeader
        back={{ href: "/prof/devoirs", label: t("back") }}
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <RecipientIcon aria-hidden="true" className="size-4" />
            {assignment.student
              ? assignment.student.full_name
              : t("group", { name: assignment.group?.name ?? "" })}
          </span>
        }
        title={assignment.title}
        actions={
          toCorrect[0] ? (
            <Link href={`/prof/devoirs/corrections/${toCorrect[0]}`} className={buttonVariants()}>
              <ClipboardCheck aria-hidden="true" className="size-4" />
              {t("correctNow", { count: toCorrect.length })}
            </Link>
          ) : null
        }
      >
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium",
              past ? "border-quadrillage text-encre-douce" : "border-stylo-bleu/40 text-stylo-bleu",
            )}
          >
            <Clock aria-hidden="true" className="size-4 shrink-0" />
            <span className="first-letter:uppercase">
              {t("due", {
                date: formatLocal(assignment.due_at, "EEEE d MMMM yyyy 'à' HH:mm"),
              })}
            </span>
          </span>
          <span className="text-encre-douce">
            {days >= 0 ? t("dueIn", { count: days }) : t("dueAgo", { count: -days })}
          </span>
        </p>
      </PageHeader>

      <dl className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className={cn(
              "grid min-w-0 content-start gap-1 rounded-2xl border border-quadrillage bg-surface p-3 sm:p-4",
              stat.tone,
            )}
          >
            <dt className="text-xs font-medium sm:text-sm">{stat.label}</dt>
            <dd className="text-xl font-semibold tabular [font-variation-settings:'HEXP'_45] sm:text-3xl">
              {stat.value === null ? (
                <>
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">{t("stats.noAverage")}</span>
                </>
              ) : (
                <>
                  {stat.value}
                  {stat.unit ? (
                    <span className="text-sm font-medium sm:text-base">{stat.unit}</span>
                  ) : null}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <section aria-labelledby="assignment-progress" className="grid min-w-0 gap-3">
          <h2 id="assignment-progress" className="text-lg font-semibold">
            {t("progress")}
          </h2>
          {rows.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5 text-sm text-encre-douce">
              {t("noStudents")}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-quadrillage bg-surface">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">{t("progressCaption")}</caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky start-0 z-10 bg-surface px-4 py-3 text-start font-medium text-encre-douce"
                    >
                      {t("student")}
                    </th>
                    {items.map((exercise, index) => (
                      <th
                        key={exercise.id}
                        scope="col"
                        className="px-2 py-3 text-center font-medium text-encre-douce"
                      >
                        {subjectPath ? (
                          t("copyColumn")
                        ) : (
                          <abbr title={exercise.title} className="no-underline">
                            {t("exerciseColumn", { number: index + 1 })}
                          </abbr>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([studentId, name]) => (
                    <tr key={studentId} className="border-t border-quadrillage">
                      <th
                        scope="row"
                        className="sticky start-0 z-10 bg-surface px-4 py-1 text-start font-medium"
                      >
                        <Link
                          href={`/prof/eleves/${studentId}`}
                          className="inline-flex min-h-11 items-center whitespace-nowrap underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                        >
                          {name}
                        </Link>
                      </th>
                      {cellsOf(studentId).map((cell, index) => (
                        <td
                          key={items[index]?.id ?? index}
                          className="px-2 py-1 text-center whitespace-nowrap"
                        >
                          <MatrixCell cell={cell} t={t} gradeFormat={gradeFormat} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {[...cells.values()].some((cell) => cell.kind === "doneElsewhere") ? (
            <p className="text-sm text-encre-douce">{t("legendElsewhere")}</p>
          ) : null}
        </section>

        <aside className="grid gap-6">
          {assignment.instructions ? (
            <section aria-labelledby="assignment-instructions" className="grid gap-2">
              <h2 id="assignment-instructions" className="text-lg font-semibold">
                {t("instructions")}
              </h2>
              <p className="rounded-2xl border border-quadrillage bg-surface p-4 break-words whitespace-pre-line">
                {assignment.instructions}
              </p>
            </section>
          ) : null}

          {subjectPath ? (
            <SubjectCard
              url={subjectUrl}
              heading={t("subject.heading")}
              openLabel={t("subject.open")}
              downloadLabel={t("subject.download")}
              newTabLabel={t("subject.newTab")}
              unavailableLabel={t("subject.unavailable")}
            />
          ) : (
            <section aria-labelledby="assignment-exercises" className="grid gap-2">
              <h2 id="assignment-exercises" className="text-lg font-semibold">
                {t("exercises", { count: items.length })}
              </h2>
              <ol
                role="list"
                className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
              >
                {items.map((exercise, index) => (
                  <li
                    key={exercise.id}
                    className="grid justify-items-start gap-1.5 bg-surface px-4 py-3"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="shrink-0 text-sm text-encre-douce tabular">
                        {t("exerciseColumn", { number: index + 1 })}
                      </span>
                      <Link
                        href={`/prof/exercices/${exercise.id}`}
                        className="min-w-0 font-medium break-words underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                      >
                        {exercise.title}
                      </Link>
                    </span>
                    <AnswerTypeChip
                      type={exercise.answer_type}
                      label={tTypes(exercise.answer_type)}
                    />
                  </li>
                ))}
              </ol>
            </section>
          )}

          <details className="rounded-2xl border border-quadrillage bg-surface">
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 font-medium">
              <Pencil aria-hidden="true" className="size-4" />
              {t("manage")}
            </summary>
            <div className="grid gap-6 border-t border-quadrillage p-4">
              <AssignmentDetailsForm
                id={assignment.id}
                title={assignment.title}
                instructions={assignment.instructions ?? ""}
                dueDate={localDateKey(assignment.due_at)}
                dueTime={formatLocal(assignment.due_at, "HH:mm")}
              />

              <DeleteAssignment id={assignment.id} hasWork={hasWork} />
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
}

function MatrixCell({
  cell,
  t,
  gradeFormat,
}: {
  cell: Cell;
  t: Awaited<ReturnType<typeof getTranslations<"tutor.assignment">>>;
  gradeFormat: Intl.NumberFormat;
}) {
  switch (cell.kind) {
    case "graded":
      // Opens the correction: to read it again, or change it.
      return (
        <Link
          href={`/prof/devoirs/corrections/${cell.submissionId}`}
          className="inline-flex min-h-11 items-center rounded-md px-1.5 hover:bg-sunken"
        >
          <GradeMark
            grade={gradeFormat.format(cell.grade)}
            label={t("gradeLabel")}
            className="text-lg"
          />
        </Link>
      );
    case "handedIn":
      return (
        <Link
          href={`/prof/devoirs/corrections/${cell.submissionId}`}
          className="inline-flex min-h-11 items-center gap-1 rounded-full bg-rouge-fond px-2.5 text-xs font-semibold text-rouge-texte hover:brightness-95"
        >
          <ClipboardCheck aria-hidden="true" className="size-3.5" />
          {t("cell.handedIn")}
        </Link>
      );
    case "revealed":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-encre-douce">
          <Eye aria-hidden="true" className="size-3.5" />
          {t("cell.revealed")}
        </span>
      );
    case "doneElsewhere":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-encre-douce">
          <Repeat aria-hidden="true" className="size-3.5" />
          {t("cell.doneElsewhere")}
        </span>
      );
    case "none":
      return (
        <span className="text-trait">
          <span aria-hidden="true">—</span>
          <span className="sr-only">{t("cell.none")}</span>
        </span>
      );
  }
}
