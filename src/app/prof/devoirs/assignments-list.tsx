import { ArrowRight, Check, ClipboardCheck, Clock, User, Users } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Ruler } from "@/components/student/ruler";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { listCorrectionQueue } from "@/lib/correction/queries";
import { calendarDaysBetween, formatLocal } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

const FIELDS =
  "id, title, due_at, student:profiles!assignments_student_id_fkey(full_name), group:groups(name, members:group_members(joined_at, left_at)), items:assignment_items(count)" as const;

const VIEWS = ["en-cours", "passes"] as const;
type View = (typeof VIEWS)[number];

export async function AssignmentsList({
  searchParams,
}: {
  searchParams: PageProps<"/prof/devoirs">["searchParams"];
}) {
  await requireViewer("tutor");
  const [t, params] = await Promise.all([getTranslations("tutor.assignments"), searchParams]);
  const supabase = await createClient();

  const [{ data }, { data: counts }, queue] = await Promise.all([
    supabase.from("assignments").select(FIELDS),
    // Counted by the database: reading every submission would stop at PostgREST's max_rows.
    supabase.from("assignment_hand_in_counts").select("assignment_id, students"),
    listCorrectionQueue(),
  ]);
  const assignments = data ?? [];

  // Students who handed in at least one exercise, per assignment.
  const handedIn = new Map<string, number>();
  for (const row of counts ?? []) {
    if (row.assignment_id) handedIn.set(row.assignment_id, row.students ?? 0);
  }
  // Copies waiting for her, per assignment.
  const waiting = new Map<string, number>();
  for (const entry of queue) {
    waiting.set(entry.homeworkId, (waiting.get(entry.homeworkId) ?? 0) + 1);
  }

  const now = new Date();
  const groups: Record<View, typeof assignments> = {
    "en-cours": assignments
      .filter((assignment) => Date.parse(assignment.due_at) >= now.getTime())
      .sort((a, b) => Date.parse(a.due_at) - Date.parse(b.due_at)),
    passes: assignments
      .filter((assignment) => Date.parse(assignment.due_at) < now.getTime())
      .sort((a, b) => Date.parse(b.due_at) - Date.parse(a.due_at)),
  };
  const asked = VIEWS.find((view) => view === params.vue);
  const view: View = asked ?? (groups["en-cours"].length > 0 ? "en-cours" : "passes");
  const rows = groups[view];

  return (
    <div className="grid gap-6">
      <CorrectionsBanner
        count={queue.length}
        firstId={queue[0]?.id ?? null}
        oldest={queue[0]?.submittedAt ?? null}
        now={now}
      />

      {assignments.length === 0 ? (
        <div className="grid justify-items-start gap-3 rounded-2xl border border-dashed border-trait bg-surface px-5 py-6">
          <p>{t("empty")}</p>
          <Link href="/prof/devoirs/nouveau" className={buttonVariants({ size: "sm" })}>
            {t("new")}
          </Link>
        </div>
      ) : (
        <section aria-labelledby="assignments-heading" className="grid gap-4">
          <h2 id="assignments-heading" className="sr-only">
            {t("listHeading")}
          </h2>
          <nav aria-label={t("views")}>
            <ul role="list" className="flex flex-wrap gap-2">
              {VIEWS.map((entry) => {
                const current = entry === view;
                return (
                  <li key={entry}>
                    <Link
                      href={`/prof/devoirs?vue=${entry}`}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium",
                        current
                          ? "border-encre bg-encre text-papier"
                          : "border-quadrillage bg-surface hover:border-trait",
                      )}
                    >
                      {t(`view.${entry}`)}
                      <span
                        className={cn(
                          "rounded-full px-1.5 text-xs tabular",
                          current ? "bg-papier/20" : "bg-sunken text-encre-douce",
                        )}
                      >
                        {groups[entry].length}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {rows.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-6 text-encre-douce">
              {t(`emptyView.${view}`)}
            </p>
          ) : (
            <ul role="list" className="grid gap-3 lg:grid-cols-2">
              {rows.map((assignment) => {
                // The group's members when it fell due (D-070).
                const due = Date.parse(assignment.due_at);
                const total = assignment.student
                  ? 1
                  : (assignment.group?.members.filter(
                      (member) =>
                        Date.parse(member.joined_at) <= due &&
                        (member.left_at === null || due <= Date.parse(member.left_at)),
                    ).length ?? 0);
                const done = Math.min(handedIn.get(assignment.id) ?? 0, Math.max(total, 0));
                const toCorrect = waiting.get(assignment.id) ?? 0;
                const days = calendarDaysBetween(now, assignment.due_at);
                const RecipientIcon = assignment.student ? User : Users;
                return (
                  <li key={assignment.id} className="grid">
                    <Link
                      href={`/prof/devoirs/${assignment.id}`}
                      className={cn(
                        "grid content-start gap-3 rounded-2xl border border-s-4 border-quadrillage bg-surface p-4 hover:border-trait",
                        toCorrect > 0
                          ? "border-s-rouge hover:border-s-rouge"
                          : view === "en-cours"
                            ? "border-s-stylo-bleu hover:border-s-stylo-bleu"
                            : "border-s-trait hover:border-s-trait",
                      )}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0 font-semibold break-words">
                          {assignment.title}
                        </span>
                        {toCorrect > 0 ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-rouge-fond px-2 py-0.5 text-xs font-semibold text-rouge-texte">
                            <ClipboardCheck aria-hidden="true" className="size-3.5" />
                            {t("toCorrectShort", { count: toCorrect })}
                          </span>
                        ) : null}
                      </span>
                      <span className="grid gap-1 text-sm text-encre-douce">
                        <span className="inline-flex min-w-0 items-center gap-1.5">
                          <RecipientIcon aria-hidden="true" className="size-4 shrink-0" />
                          <span className="truncate">
                            {assignment.student
                              ? assignment.student.full_name
                              : (assignment.group?.name ?? "")}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="shrink-0">
                            {t("exercises", { count: assignment.items[0]?.count ?? 0 })}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock aria-hidden="true" className="size-4 shrink-0" />
                          <span className="first-letter:uppercase">
                            {formatLocal(assignment.due_at, "EEEE d MMMM 'à' HH:mm")}
                          </span>
                          <span
                            className={cn(
                              "font-medium",
                              view === "en-cours" && days <= 1 ? "text-encre" : "",
                            )}
                          >
                            ·{" "}
                            {days >= 0
                              ? t("dueIn", { count: days })
                              : t("dueAgo", { count: -days })}
                          </span>
                        </span>
                      </span>
                      <span className="grid gap-1.5">
                        {total > 1 ? (
                          <Ruler
                            marks={Array.from({ length: total }, (_, index) =>
                              index < done ? "understood" : "new",
                            )}
                          />
                        ) : null}
                        <span className="text-sm">
                          {total === 0
                            ? t("nobody")
                            : assignment.student
                              ? done > 0
                                ? t("soloHandedIn")
                                : t("soloNotYet")
                              : t("handedIn", { done, total })}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

/** What waits for her first: the copies to correct, and a way straight into the oldest. */
async function CorrectionsBanner({
  count,
  firstId,
  oldest,
  now,
}: {
  count: number;
  firstId: string | null;
  oldest: string | null;
  now: Date;
}) {
  const t = await getTranslations("tutor.assignments");

  if (count === 0 || !firstId || !oldest) {
    return (
      <p className="flex min-h-11 items-center gap-2 justify-self-start rounded-full border border-quadrillage bg-surface px-4 text-sm">
        <Check aria-hidden="true" className="size-4" />
        {t("toCorrect", { count: 0 })}
      </p>
    );
  }

  const days = Math.max(calendarDaysBetween(oldest, now), 0);
  return (
    <section
      aria-labelledby="corrections-banner"
      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-rouge-fond p-4 text-rouge-texte sm:p-5"
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="text-4xl leading-none font-semibold tabular [font-variation-settings:'HEXP'_45]"
        >
          {count}
        </span>
        <div className="grid gap-0.5">
          <h2 id="corrections-banner" className="font-semibold">
            <span className="sr-only">{count} </span>
            {t("toCorrectBanner", { count })}
          </h2>
          <p className="text-sm">{t("oldestWaiting", { days })}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/prof/devoirs/corrections/${firstId}`}
          className={buttonVariants({ size: "sm" })}
        >
          {t("startCorrecting")}
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>
        <Link
          href="/prof/devoirs/corrections"
          className={buttonVariants({ size: "sm", variant: "outline" })}
        >
          {t("seeQueue")}
        </Link>
      </div>
    </section>
  );
}
