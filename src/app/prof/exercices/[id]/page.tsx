import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { listChapterOptions } from "@/lib/chapters";
import { readChoices } from "@/lib/exercise/exercise";
import { CALLOUT_KINDS, type CalloutKind, readStoredLesson } from "@/lib/lesson/document";
import { createClient } from "@/lib/supabase/server";
import { ExerciseEditor } from "./exercise-editor";
// The editor draws the statement as students will see it: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.exerciseEditor");
  return { title: t("title") };
}

export default async function EditExercisePage({ params }: PageProps<"/prof/exercices/[id]">) {
  const t = await getTranslations("tutor.exerciseEditor");

  return (
    <div className="grid max-w-4xl gap-6">
      {/* The title is a field of the form below: the page's heading says what the page is. */}
      <h1 className="sr-only">{t("title")}</h1>
      <Link
        href="/prof/exercices"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <EditExercise params={params} />
      </Suspense>
    </div>
  );
}

async function EditExercise({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const supabase = await createClient();
  const [{ data }, submissions, reveals, assignments, levels] = await Promise.all([
    supabase
      .from("exercises")
      .select(
        // Numbers are read as text: PostgREST hands `numeric` over as a JSON number, and a
        // double cannot hold every decimal the tutor may have typed (D-044).
        "id, title, chapter_id, difficulty, tags, answer_type, choices, choice_mode, statement, chapter:chapters!inner(title, programme:programmes!inner(label)), solution:exercise_solutions(solution, correct_numeric::text, tolerance::text, tolerance_kind, correct_choice_ids)",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("submissions").select("student_id").eq("exercise_id", id),
    supabase.from("exercise_reveals").select("student_id").eq("exercise_id", id),
    supabase
      .from("assignment_items")
      .select("exercise_id", { count: "exact", head: true })
      .eq("exercise_id", id),
    listChapterOptions(),
  ]);
  // A homework's PDF subject is not in the bank, and has nothing to edit here (D-106).
  if (!data || !data.chapter_id) notFound();

  const t = await getTranslations("lesson");
  const calloutLabels = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, t(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;

  return (
    <ExerciseEditor
      calloutLabels={calloutLabels}
      levels={levels}
      exercise={{
        id: data.id,
        title: data.title,
        chapterId: data.chapter_id,
        context: `${data.chapter.programme.label} · ${data.chapter.title}`,
        difficulty: data.difficulty,
        tags: data.tags,
        answerType: data.answer_type,
        choices: readChoices(data.choices),
        choiceMode: data.choice_mode ?? "unique",
        statement: readStoredLesson(data.statement),
        solution: readStoredLesson(data.solution?.solution),
        correctNumeric: data.solution?.correct_numeric ?? null,
        tolerance: data.solution?.tolerance ?? null,
        toleranceKind: data.solution?.tolerance_kind ?? "absolue",
        correctChoiceIds: data.solution?.correct_choice_ids ?? [],
        // A student's answer or a reveal fixes the kind of answer (save_exercise). Counted by
        // student: one may hold the exercise in two assignments, or answer and reveal.
        answered: new Set(
          [...(submissions.data ?? []), ...(reveals.data ?? [])].map((row) => row.student_id),
        ).size,
        assigned: (assignments.count ?? 0) > 0,
      }}
    />
  );
}
