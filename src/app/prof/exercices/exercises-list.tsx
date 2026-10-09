import { Search } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AnswerTypeChip, IncompleteChip } from "@/components/exercise-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { requireViewer } from "@/lib/auth";
import { isRowReady, type AnswerType } from "@/lib/exercise/exercise";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

const FIELDS =
  "id, title, difficulty, answer_type, tags, statement, chapter:chapters!inner(title, slug, semester, position, programme:programmes!inner(code, label, position)), solution:exercise_solutions(correct_numeric, correct_choice_ids)" as const;

const TYPES = ["upload", "numeric", "mcq"] as const satisfies readonly AnswerType[];
/** PostgREST answers this many rows at most. */
const PAGE = 1000;

export type ExerciseFilter = { q: string; type: AnswerType | null };

export function readExerciseFilter(
  query: Record<string, string | string[] | undefined>,
): ExerciseFilter {
  const q = typeof query.q === "string" ? query.q.trim().slice(0, 80) : "";
  const type = TYPES.find((entry) => entry === query.type) ?? null;
  return { q, type };
}

/** « Équation » and « equation » are the same search. */
function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr");
}

/** Difficulty as five graduations, the filled ones in ink: read as a word as well. */
function Difficulty({ level, label }: { level: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-encre-douce">
      <span aria-hidden="true" className="flex items-end gap-0.5">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={cn("w-1 rounded-full", step <= level ? "bg-encre" : "bg-quadrillage")}
            style={{ height: 4 + step * 2 }}
          />
        ))}
      </span>
      {label}
    </span>
  );
}

export async function ExercisesList({ filter }: { filter: ExerciseFilter }) {
  await requireViewer("tutor");

  const t = await getTranslations("tutor.exercises");
  const supabase = await createClient();
  // PostgREST answers 1000 rows at most: the bank is read in pages.
  type Row = NonNullable<Awaited<ReturnType<typeof readPage>>["data"]>[number];
  const readPage = (from: number) =>
    supabase
      .from("exercises")
      .select(FIELDS)
      .order("id")
      .range(from, from + PAGE - 1);
  const bank: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await readPage(from);
    if (error) throw new Error("Could not read the exercises", { cause: error });
    bank.push(...data);
    if (data.length < PAGE) break;
  }
  const words = fold(filter.q)
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const exercises = bank
    .filter((exercise) => !filter.type || exercise.answer_type === filter.type)
    .filter((exercise) => {
      if (words.length === 0) return true;
      const text = fold(`${exercise.title} ${exercise.tags.join(" ")} ${exercise.chapter.title}`);
      return words.every((word) => text.includes(word));
    })
    .sort(
      (a, b) =>
        a.chapter.programme.position - b.chapter.programme.position ||
        (a.chapter.semester ?? 3) - (b.chapter.semester ?? 3) ||
        a.chapter.position - b.chapter.position ||
        a.title.localeCompare(b.title, "fr"),
    );

  if (bank.length === 0) {
    return (
      <div className="grid justify-items-start gap-3 rounded-2xl border border-dashed border-trait bg-surface px-5 py-6">
        <p>{t("empty")}</p>
        <Link href="/prof/exercices/nouveau" className={buttonVariants({ size: "sm" })}>
          {t("new")}
        </Link>
      </div>
    );
  }

  // Grouped by chapter, in the order the tutor teaches them.
  const chapters: {
    key: string;
    programme: string;
    title: string;
    exercises: typeof exercises;
  }[] = [];
  for (const exercise of exercises) {
    const key = `${exercise.chapter.programme.code}/${exercise.chapter.slug}`;
    const last = chapters.at(-1);
    if (last?.key === key) {
      last.exercises.push(exercise);
    } else {
      chapters.push({
        key,
        programme: exercise.chapter.programme.label,
        title: exercise.chapter.title,
        exercises: [exercise],
      });
    }
  }

  const href = (type: AnswerType | null) => {
    const params = new URLSearchParams();
    if (filter.q) params.set("q", filter.q);
    if (type) params.set("type", type);
    const search = params.toString();
    return search ? `/prof/exercices?${search}` : "/prof/exercices";
  };
  // Each type's count under the current search, as the list will show it once chosen.
  const searched = bank.filter((exercise) => {
    if (words.length === 0) return true;
    const text = fold(`${exercise.title} ${exercise.tags.join(" ")} ${exercise.chapter.title}`);
    return words.every((word) => text.includes(word));
  });
  const counts = new Map(TYPES.map((type) => [type, 0]));
  for (const exercise of searched) {
    counts.set(exercise.answer_type, (counts.get(exercise.answer_type) ?? 0) + 1);
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <form
          action="/prof/exercices"
          role="search"
          className="grid gap-2 rounded-2xl border border-quadrillage bg-surface p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
        >
          {filter.type ? <input type="hidden" name="type" value={filter.type} /> : null}
          <label className="grid gap-1.5 text-sm font-medium">
            {t("search")}
            <span className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-encre-douce"
              />
              <Input
                type="search"
                name="q"
                defaultValue={filter.q}
                placeholder={t("searchPlaceholder")}
                className="ps-9"
              />
            </span>
          </label>
          <button type="submit" className={buttonVariants({ variant: "outline" })}>
            {t("searchApply")}
          </button>
        </form>
        <nav aria-label={t("typeFilter")}>
          <ul role="list" className="flex flex-wrap gap-2">
            {[null, ...TYPES].map((type) => (
              <li key={type ?? "all"}>
                <Link
                  href={href(type)}
                  aria-current={filter.type === type ? "page" : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-quadrillage bg-surface px-4 text-sm font-medium hover:border-trait aria-[current=page]:border-encre aria-[current=page]:bg-encre aria-[current=page]:text-papier"
                >
                  {type ? t(`answerType.${type}`) : t("allTypes")}
                  <span className="text-xs tabular opacity-70">
                    {type ? counts.get(type) : searched.length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="text-sm text-encre-douce" role="status">
        {t("count", { count: exercises.length })}
      </p>

      {exercises.length === 0 ? (
        <div className="grid justify-items-start gap-2 rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
          <p className="text-encre-douce">{t("none")}</p>
          <Link
            href="/prof/exercices"
            className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("showAll")}
          </Link>
        </div>
      ) : (
        chapters.map((chapter) => (
          <section key={chapter.key} className="grid gap-2">
            <h2 className="grid gap-0.5">
              <span className="text-xs text-encre-douce">{chapter.programme}</span>
              <span className="font-semibold">{chapter.title}</span>
            </h2>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage">
              {chapter.exercises.map((exercise) => {
                const ready = isRowReady(exercise);
                return (
                  <li
                    key={exercise.id}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-surface px-4 py-3"
                  >
                    <span className="grid min-w-0 flex-1 basis-56 gap-1">
                      <Link
                        href={`/prof/exercices/${exercise.id}`}
                        className="font-medium break-words underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                      >
                        {exercise.title}
                      </Link>
                      {exercise.tags.length > 0 ? (
                        <span className="flex flex-wrap gap-1">
                          {exercise.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-sunken px-2 py-0.5 text-xs text-encre-douce"
                            >
                              {tag}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </span>
                    <span className="flex flex-wrap items-center gap-3">
                      <AnswerTypeChip
                        type={exercise.answer_type}
                        label={t(`answerType.${exercise.answer_type}`)}
                      />
                      <Difficulty
                        level={exercise.difficulty}
                        label={t("difficulty", { level: exercise.difficulty })}
                      />
                      {ready ? null : (
                        <IncompleteChip label={t("incomplete")} hint={t("incompleteHint")} />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
