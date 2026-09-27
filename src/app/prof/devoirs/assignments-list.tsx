import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { requireViewer } from "@/lib/auth";
import { countCorrectionQueue } from "@/lib/correction/queries";
import { formatLocal } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";

const FIELDS =
  "id, title, due_at, student:profiles!assignments_student_id_fkey(full_name), group:groups(name, members:group_members(joined_at, left_at)), items:assignment_items(count)" as const;

export async function AssignmentsList() {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.assignments");
  const supabase = await createClient();

  const [{ data }, { data: counts }, toCorrect] = await Promise.all([
    supabase.from("assignments").select(FIELDS),
    // Counted by the database: reading every submission would stop at PostgREST's max_rows.
    supabase.from("assignment_hand_in_counts").select("assignment_id, students"),
    countCorrectionQueue(supabase),
  ]);
  const assignments = data ?? [];
  if (assignments.length === 0) {
    return <p className="text-encre-douce">{t("empty")}</p>;
  }

  // Students who handed in at least one exercise, per assignment.
  const handedIn = new Map<string, number>();
  for (const row of counts ?? []) {
    if (row.assignment_id) handedIn.set(row.assignment_id, row.students ?? 0);
  }

  const now = Date.now();
  const upcoming = assignments
    .filter((assignment) => Date.parse(assignment.due_at) >= now)
    .sort((a, b) => Date.parse(a.due_at) - Date.parse(b.due_at));
  const past = assignments
    .filter((assignment) => Date.parse(assignment.due_at) < now)
    .sort((a, b) => Date.parse(b.due_at) - Date.parse(a.due_at));

  const section = (id: string, heading: string, rows: typeof assignments) =>
    rows.length === 0 ? null : (
      <section aria-labelledby={id} className="grid gap-3">
        <h2 id={id} className="text-sm font-semibold text-encre-douce">
          {heading}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
          {rows.map((assignment) => {
            const recipient = assignment.student
              ? assignment.student.full_name
              : t("group", { name: assignment.group?.name ?? "" });
            // The group's members when it fell due (D-070).
            const due = Date.parse(assignment.due_at);
            const total = assignment.student
              ? 1
              : (assignment.group?.members.filter(
                  (member) =>
                    Date.parse(member.joined_at) <= due &&
                    (member.left_at === null || due <= Date.parse(member.left_at)),
                ).length ?? 0);
            const done = handedIn.get(assignment.id) ?? 0;
            return (
              <li key={assignment.id} className="grid gap-1 bg-surface px-4 py-3">
                <Link
                  href={`/prof/devoirs/${assignment.id}`}
                  className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                >
                  {assignment.title}
                </Link>
                <p className="text-sm text-encre-douce">
                  {recipient} ·{" "}
                  {t("due", { date: formatLocal(assignment.due_at, "EEEE d MMMM 'à' HH:mm") })}
                </p>
                <p className="text-sm text-encre-douce">
                  {t("exercises", { count: assignment.items[0]?.count ?? 0 })} ·{" "}
                  {t("handedIn", { done, total })}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    );

  return (
    <div className="grid gap-8">
      <Link
        href="/prof/devoirs/corrections"
        className="flex min-h-11 items-center gap-2 justify-self-start font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
      >
        <ClipboardCheck aria-hidden="true" className="size-5" />
        {t("toCorrect", { count: toCorrect })}
      </Link>
      {section("assignments-upcoming", t("upcoming"), upcoming)}
      {section("assignments-past", t("past"), past)}
    </div>
  );
}
