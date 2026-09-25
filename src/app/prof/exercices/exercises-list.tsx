import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AnswerTypeChip, IncompleteChip } from "@/components/exercise-status";
import { requireViewer } from "@/lib/auth";
import { isRowReady } from "@/lib/exercise/exercise";
import { createClient } from "@/lib/supabase/server";

const FIELDS =
  "id, title, difficulty, answer_type, tags, statement, chapter:chapters!inner(title, slug, position, level:levels!inner(code, label, position)), solution:exercise_solutions(correct_numeric, correct_choice_ids)" as const;

export async function ExercisesList() {
  await requireViewer("tutor");

  const t = await getTranslations("tutor.exercises");
  const supabase = await createClient();
  const { data } = await supabase.from("exercises").select(FIELDS);

  const exercises = [...(data ?? [])].sort(
    (a, b) =>
      a.chapter.level.position - b.chapter.level.position ||
      a.chapter.position - b.chapter.position ||
      a.title.localeCompare(b.title, "fr"),
  );

  if (exercises.length === 0) {
    return <p className="text-encre-douce">{t("empty")}</p>;
  }

  // Grouped by chapter, in the order the tutor teaches them.
  const chapters: { key: string; level: string; title: string; exercises: typeof exercises }[] = [];
  for (const exercise of exercises) {
    const key = `${exercise.chapter.level.code}/${exercise.chapter.slug}`;
    const last = chapters.at(-1);
    if (last?.key === key) {
      last.exercises.push(exercise);
    } else {
      chapters.push({
        key,
        level: exercise.chapter.level.label,
        title: exercise.chapter.title,
        exercises: [exercise],
      });
    }
  }

  return (
    <div className="grid gap-8">
      <p className="text-sm text-encre-douce">{t("count", { count: exercises.length })}</p>

      {chapters.map((chapter) => (
        <section key={chapter.key} className="grid gap-3">
          <h2 className="text-sm font-semibold text-encre-douce">
            {chapter.level} · {chapter.title}
          </h2>

          <ul className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
            {chapter.exercises.map((exercise) => {
              const ready = isRowReady(exercise);

              return (
                <li
                  key={exercise.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-surface px-4 py-3"
                >
                  <Link
                    href={`/prof/exercices/${exercise.id}`}
                    className="min-w-0 flex-1 font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                  >
                    {exercise.title}
                  </Link>

                  <AnswerTypeChip
                    type={exercise.answer_type}
                    label={t(`answerType.${exercise.answer_type}`)}
                  />
                  <span className="text-xs text-encre-douce">
                    {t("difficulty", { level: exercise.difficulty })}
                  </span>
                  {ready ? null : (
                    <IncompleteChip label={t("incomplete")} hint={t("incompleteHint")} />
                  )}
                  {exercise.tags.length > 0 ? (
                    <p className="basis-full text-xs text-encre-douce">
                      {exercise.tags.join(" · ")}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
