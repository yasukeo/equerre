import {
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  Hourglass,
  MessageCircle,
  NotebookPen,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SessionStatusChip, type SessionStatus } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button";
import { requireViewer } from "@/lib/auth";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { countUnread } from "@/lib/chat/queries";
import { countCorrectionQueue } from "@/lib/correction/queries";
import { getAccounts } from "@/lib/payments/queries";
import { formatLocal, localDayBounds, localMinutesOfDay, localWeekBounds } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database";

const SESSION_FIELDS =
  "id, starts_at, ends_at, status, mode, location, student:profiles!sessions_student_id_fkey(full_name, level_code), group:groups(name), session_type:session_types(name)" as const;

type DaySession = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: SessionStatus;
  mode: Database["public"]["Enums"]["session_mode"];
  location: string | null;
  student: { full_name: string; level_code: string | null } | null;
  group: { name: string } | null;
  session_type: { name: string } | null;
};

const PX_PER_HOUR = 72;
const MIN_ITEM_HEIGHT = 48;

function whoFor(session: DaySession): string {
  return session.student?.full_name ?? session.group?.name ?? "";
}

export async function TodayView() {
  await requireViewer("tutor");
  const [t, tSession] = await Promise.all([
    getTranslations("tutor.today"),
    getTranslations("session"),
  ]);
  const supabase = await createClient();

  const now = new Date();
  const day = localDayBounds(now);
  const week = localWeekBounds(now);

  const [
    todayResult,
    nextResult,
    pendingResult,
    studentsResult,
    weekResult,
    toCorrect,
    toClose,
    unread,
    accounts,
  ] = await Promise.all([
    supabase
      .from("sessions")
      .select(SESSION_FIELDS)
      .gte("starts_at", day.start.toISOString())
      .lt("starts_at", day.end.toISOString())
      .in("status", ["en_attente", "planifiee", "terminee", "absent"])
      .order("starts_at"),
    supabase
      .from("sessions")
      .select(SESSION_FIELDS)
      .gte("starts_at", day.end.toISOString())
      .eq("status", "planifiee")
      .order("starts_at")
      .limit(1)
      .maybeSingle(),
    supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("status", "en_attente")
      .gte("starts_at", now.toISOString()),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "student")
      .eq("status", "actif"),
    supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .gte("starts_at", week.start.toISOString())
      .lt("starts_at", week.end.toISOString())
      .in("status", ["planifiee", "terminee", "absent"]),
    countCorrectionQueue(supabase),
    // Sessions that took place and that she has not said anything about yet.
    supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("status", "planifiee")
      .lt("starts_at", now.toISOString()),
    countUnread(),
    getAccounts(),
  ]);
  // Accounts that owe hours (D-087): the dashboard names how many, the payments page who.
  const overdue = [...accounts.values()].filter((account) => account.owes).length;

  const sessions: DaySession[] = todayResult.data ?? [];
  const next: DaySession | null = nextResult.data;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <RefreshOnReturn />
      <section aria-labelledby="today-sessions">
        <h2
          id="today-sessions"
          className="flex flex-wrap items-baseline gap-x-3 text-lg font-medium"
        >
          {t("sessionsHeading")}
          <span className="text-sm font-normal text-encre-douce">
            {formatLocal(now, "EEEE d MMMM")}
          </span>
        </h2>

        {sessions.length === 0 ? (
          <div className="mt-4 rounded-md border border-dashed border-trait px-4 py-6">
            <p>{t("empty")}</p>
            <p className="mt-1 text-sm text-encre-douce">
              {next
                ? t("nextSession", {
                    when: formatLocal(next.starts_at, "EEEE d MMMM 'à' HH:mm"),
                    who: whoFor(next),
                  })
                : t("noUpcoming")}
            </p>
          </div>
        ) : (
          <DayRuler
            sessions={sessions}
            label={t("rulerLabel", { date: formatLocal(now, "d MMMM") })}
            statusLabel={(status) => tSession(`status.${status}`)}
            modeLabel={(mode) => tSession(`mode.${mode}`)}
          />
        )}
      </section>

      <aside aria-labelledby="todo-heading">
        <h2 id="todo-heading" className="text-lg font-medium">
          {t("todoHeading")}
        </h2>
        <ul className="mt-4 divide-y divide-quadrillage border-y border-quadrillage" role="list">
          <li>
            <Link
              href="/prof/messages"
              className="flex min-h-11 items-center gap-3 py-2.5 underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              <MessageCircle aria-hidden="true" className="size-5 text-encre-douce" />
              {t("unreadMessages", { count: unread })}
            </Link>
          </li>
          <li>
            <Link
              href="/prof/devoirs/corrections"
              className="flex min-h-11 items-center gap-3 py-2.5 underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              <ClipboardCheck aria-hidden="true" className="size-5 text-encre-douce" />
              {t("toCorrect", { count: toCorrect })}
            </Link>
          </li>
          <li>
            <Link
              href="/prof/seances"
              className="flex min-h-11 items-center gap-3 py-2.5 underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              <Hourglass aria-hidden="true" className="size-5 text-encre-douce" />
              {t("pendingRequests", { count: pendingResult.count ?? 0 })}
            </Link>
          </li>
          <li>
            <Link
              href="/prof/paiements"
              className="flex min-h-11 items-center gap-3 py-2.5 underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              <Wallet aria-hidden="true" className="size-5 text-encre-douce" />
              {t("overdue", { count: overdue })}
            </Link>
          </li>
          {(toClose.count ?? 0) > 0 ? (
            <li>
              <Link
                href="/prof/seances"
                className="flex min-h-11 items-center gap-3 py-2.5 underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
              >
                <NotebookPen aria-hidden="true" className="size-5 text-encre-douce" />
                {t("toClose", { count: toClose.count ?? 0 })}
              </Link>
            </li>
          ) : null}
          <li>
            <Link
              href="/prof/seances"
              className="flex min-h-11 items-center gap-3 py-2.5 underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              <CalendarDays aria-hidden="true" className="size-5 text-encre-douce" />
              {t("weekSessions", { count: weekResult.count ?? 0 })}
            </Link>
          </li>
          <li className="flex min-h-11 items-center gap-3 py-2.5">
            <Users aria-hidden="true" className="size-5 text-encre-douce" />
            {t("activeStudents", { count: studentsResult.count ?? 0 })}
          </li>
        </ul>
        <Link href="/prof/seances/nouvelle" className={cn(buttonVariants(), "mt-6 w-full")}>
          <CalendarPlus aria-hidden="true" />
          {t("planAction")}
        </Link>
        <Link
          href="/prof/eleves/inviter"
          className={cn(buttonVariants({ variant: "outline" }), "mt-2 w-full")}
        >
          <UserPlus aria-hidden="true" />
          {t("inviteAction")}
        </Link>
      </aside>
    </div>
  );
}

type DayRulerProps = {
  sessions: DaySession[];
  label: string;
  statusLabel: (status: SessionStatus) => string;
  modeLabel: (mode: DaySession["mode"]) => string;
};

/**
 * The day as a graduated ruler: sessions hang off a time scale at their real length,
 * so a two-hour group takes twice the room of a one-hour lesson. The list underneath is
 * an ordinary ordered list, so assistive technology reads it in time order.
 */
function DayRuler({ sessions, label, statusLabel, modeLabel }: DayRulerProps) {
  const starts = sessions.map((session) => localMinutesOfDay(session.starts_at));
  const ends = sessions.map((session, index) => {
    const end = localMinutesOfDay(session.ends_at);
    return end > (starts[index] ?? 0) ? end : 24 * 60;
  });

  const firstHour = Math.floor(Math.min(...starts) / 60);
  const lastHour = Math.min(24, Math.max(Math.ceil(Math.max(...ends) / 60), firstHour + 3));
  const pxPerMinute = PX_PER_HOUR / 60;
  const height = (lastHour - firstHour) * PX_PER_HOUR;
  const halfHours = Array.from({ length: (lastHour - firstHour) * 2 + 1 }, (_, index) => index);

  return (
    <div className="mt-6 grid grid-cols-[3.25rem_1fr]">
      <div aria-hidden="true" className="relative" style={{ height }}>
        {halfHours
          .filter((index) => index % 2 === 0)
          .map((index) => (
            <span
              key={index}
              className="absolute end-3 -translate-y-1/2 text-xs text-encre-douce tabular"
              style={{ top: (index / 2) * PX_PER_HOUR }}
            >
              {String(firstHour + index / 2).padStart(2, "0")}:00
            </span>
          ))}
      </div>

      <div className="relative border-s border-trait" style={{ height }}>
        {halfHours.map((index) => (
          <span
            key={index}
            aria-hidden="true"
            className={cn("absolute start-0 h-px bg-trait", index % 2 === 0 ? "w-3" : "w-1.5")}
            style={{ top: (index / 2) * PX_PER_HOUR }}
          />
        ))}

        <ol aria-label={label} className="absolute inset-0" role="list">
          {sessions.map((session, index) => {
            const start = starts[index] ?? 0;
            const end = ends[index] ?? start + 60;
            const pending = session.status === "en_attente";
            const level = session.student?.level_code;

            return (
              <li
                key={session.id}
                className="absolute inset-x-0 ms-4"
                style={{
                  top: (start - firstHour * 60) * pxPerMinute,
                  height: Math.max((end - start) * pxPerMinute - 4, MIN_ITEM_HEIGHT),
                }}
              >
                <Link
                  href={`/prof/seances/${session.id}`}
                  className={cn(
                    "flex h-full flex-col justify-center gap-0.5 overflow-hidden rounded-md border border-s-[3px] border-quadrillage bg-surface ps-3 pe-2 hover:border-trait",
                    pending ? "border-dashed border-s-trait" : "border-s-encre",
                  )}
                >
                  <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                    <span className="font-medium tabular">
                      {formatLocal(session.starts_at, "HH:mm")} –{" "}
                      {formatLocal(session.ends_at, "HH:mm")}
                    </span>
                    <span className="font-medium">{whoFor(session)}</span>
                    {level ? <span className="text-encre-douce">{level}</span> : null}
                  </p>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-encre-douce">
                    <span>
                      {session.session_type?.name} · {modeLabel(session.mode)}
                    </span>
                    {session.status !== "planifiee" ? (
                      <SessionStatusChip
                        status={session.status}
                        label={statusLabel(session.status)}
                      />
                    ) : null}
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
