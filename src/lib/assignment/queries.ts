import "server-only";
import { isRowReady, type AnswerType } from "@/lib/exercise/exercise";
import { createClient } from "@/lib/supabase/server";

export type RecipientOptions = {
  groups: { id: string; name: string; programmeCode: string | null; members: number }[];
  students: {
    id: string;
    name: string;
    /** The maths programme her stream follows (D-094), to narrow the exercises to. */
    programmeCode: string | null;
    levelLabel: string | null;
  }[];
};

/** Whom homework can go to: every group, and every student whose account is active (D-060). */
export async function listRecipients(): Promise<RecipientOptions> {
  const supabase = await createClient();
  const [groups, students] = await Promise.all([
    // Members today: those who left keep what fell due before, not what is given now (D-070).
    supabase
      .from("groups")
      .select("id, name, level:levels(programme_code), members:group_members(left_at)"),
    supabase
      .from("profiles")
      .select("id, full_name, level:levels(label, position, programme_code)")
      .eq("role", "student")
      .eq("status", "actif"),
  ]);

  return {
    groups: [...(groups.data ?? [])]
      .map((group) => ({
        id: group.id,
        name: group.name,
        programmeCode: group.level?.programme_code ?? null,
        members: group.members.filter((member) => member.left_at === null).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr")),
    students: [...(students.data ?? [])]
      .sort(
        (a, b) =>
          (a.level?.position ?? 99) - (b.level?.position ?? 99) ||
          a.full_name.localeCompare(b.full_name, "fr"),
      )
      .map((student) => ({
        id: student.id,
        name: student.full_name,
        programmeCode: student.level?.programme_code ?? null,
        levelLabel: student.level?.label ?? null,
      })),
  };
}

export type AssignableExercise = {
  id: string;
  title: string;
  difficulty: number;
  answerType: AnswerType;
  tags: string[];
  chapterTitle: string;
  programmeCode: string;
  programmeLabel: string;
};

/**
 * The bank's exercises that can be given now, in teaching order. One without a statement or an
 * expected answer is left out: public.create_assignment would refuse it anyway.
 */
export async function listAssignableExercises(): Promise<AssignableExercise[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exercises")
    .select(
      "id, title, difficulty, answer_type, tags, statement, chapter:chapters!inner(title, semester, position, programme:programmes!inner(code, label, position)), solution:exercise_solutions(correct_numeric, correct_choice_ids)",
    );

  return [...(data ?? [])]
    .filter(isRowReady)
    .sort(
      (a, b) =>
        a.chapter.programme.position - b.chapter.programme.position ||
        (a.chapter.semester ?? 3) - (b.chapter.semester ?? 3) ||
        a.chapter.position - b.chapter.position ||
        a.title.localeCompare(b.title, "fr"),
    )
    .map((exercise) => ({
      id: exercise.id,
      title: exercise.title,
      difficulty: exercise.difficulty,
      answerType: exercise.answer_type,
      tags: exercise.tags,
      chapterTitle: exercise.chapter.title,
      programmeCode: exercise.chapter.programme.code,
      programmeLabel: exercise.chapter.programme.label,
    }));
}
