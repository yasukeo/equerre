import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { AnswerTypeChip } from "@/components/exercise-status";
import { requireViewer } from "@/lib/auth";
import { formatLocal, localDateKey } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import { AssignmentDetailsForm, DeleteAssignment } from "./assignment-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.assignment");
  return { title: t("title") };
}

export default async function AssignmentPage({ params }: PageProps<"/prof/devoirs/[id]">) {
  const t = await getTranslations("tutor.assignment");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/devoirs"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
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
      "id, title, instructions, due_at, student_id, group_id, student:profiles!assignments_student_id_fkey(id, full_name), group:groups(name), items:assignment_items(position, exercise:exercises(id, title, answer_type))",
    )
    .eq("id", id)
    .maybeSingle();
  if (!assignment) notFound();

  const [members, submissions, reveals] = await Promise.all([
    assignment.group_id
      ? supabase
          .from("group_members")
          .select("student:profiles(id, full_name)")
          .eq("group_id", assignment.group_id)
      : Promise.resolve({ data: [] as { student: { id: string; full_name: string } | null }[] }),
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

  // Everyone the homework reaches, and anyone who answered it even if they have since left the
  // group: their work is still here.
  const students = new Map<string, string>();
  if (assignment.student) students.set(assignment.student.id, assignment.student.full_name);
  for (const row of [
    ...(members.data ?? []),
    ...(submissions.data ?? []),
    ...(reveals.data ?? []),
  ]) {
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
  const hasWork = (submissions.data?.length ?? 0) + (reveals.data?.length ?? 0) > 0;

  const recipient = assignment.student
    ? assignment.student.full_name
    : t("group", { name: assignment.group?.name ?? "" });
  const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

  return (
    <div className="grid gap-8">
      <header className="grid gap-2">
        <h1 className="text-xl font-semibold">{assignment.title}</h1>
        <p className="text-encre-douce">
          {t("recipient", { recipient })} ·{" "}
          {t("due", { date: formatLocal(assignment.due_at, "EEEE d MMMM yyyy 'à' HH:mm") })}
        </p>
        {assignment.instructions ? (
          <p className="whitespace-pre-line">{assignment.instructions}</p>
        ) : null}
      </header>

      <section aria-labelledby="assignment-exercises" className="grid gap-3">
        <h2 id="assignment-exercises" className="text-base font-semibold">
          {t("exercises", { count: items.length })}
        </h2>
        <ol className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
          {items.map((exercise, index) => (
            <li
              key={exercise.id}
              className="flex flex-wrap items-center gap-2 bg-surface px-4 py-3"
            >
              <span className="w-6 text-sm text-encre-douce">{index + 1}.</span>
              <Link
                href={`/prof/exercices/${exercise.id}`}
                className="min-w-0 flex-1 font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
              >
                {exercise.title}
              </Link>
              <AnswerTypeChip type={exercise.answer_type} label={tTypes(exercise.answer_type)} />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="assignment-progress" className="grid gap-3">
        <h2 id="assignment-progress" className="text-base font-semibold">
          {t("progress")}
        </h2>
        {rows.length === 0 ? (
          <p className="text-sm text-encre-douce">{t("noStudents")}</p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-quadrillage">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">{t("progressCaption")}</caption>
              <thead className="bg-sunken">
                <tr>
                  <th scope="col" className="px-3 py-2 text-start font-medium">
                    {t("student")}
                  </th>
                  {items.map((exercise, index) => (
                    <th key={exercise.id} scope="col" className="px-3 py-2 text-center font-medium">
                      <abbr title={exercise.title} className="no-underline">
                        {t("exerciseColumn", { number: index + 1 })}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([studentId, name]) => (
                  <tr key={studentId} className="border-t border-quadrillage">
                    <th scope="row" className="px-3 py-2 text-start font-medium">
                      {name}
                    </th>
                    {items.map((exercise) => {
                      const cell = cells.get(`${studentId}/${exercise.id}`) ?? { kind: "none" };
                      return (
                        <td key={exercise.id} className="px-3 py-2 text-center whitespace-nowrap">
                          {cell.kind === "graded" ? (
                            // Opens the correction: to read it again, or change it.
                            <Link
                              href={`/prof/devoirs/corrections/${cell.submissionId}`}
                              className="inline-flex min-h-11 items-center font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                            >
                              {t("cell.graded", { grade: gradeFormat.format(cell.grade) })}
                            </Link>
                          ) : cell.kind === "handedIn" ? (
                            <Link
                              href={`/prof/devoirs/corrections/${cell.submissionId}`}
                              className="inline-flex min-h-11 items-center text-stylo-bleu underline decoration-stylo-bleu/40 underline-offset-4 hover:decoration-stylo-bleu"
                            >
                              {t("cell.handedIn")}
                            </Link>
                          ) : cell.kind === "revealed" ? (
                            <span className="text-encre-douce">{t("cell.revealed")}</span>
                          ) : cell.kind === "doneElsewhere" ? (
                            <span className="text-encre-douce">{t("cell.doneElsewhere")}</span>
                          ) : (
                            <span className="text-encre-douce">
                              <span aria-hidden="true">—</span>
                              <span className="sr-only">{t("cell.none")}</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
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

      <AssignmentDetailsForm
        id={assignment.id}
        title={assignment.title}
        instructions={assignment.instructions ?? ""}
        dueDate={localDateKey(assignment.due_at)}
        dueTime={formatLocal(assignment.due_at, "HH:mm")}
      />

      <DeleteAssignment id={assignment.id} hasWork={hasWork} />
    </div>
  );
}
