import {
  ArrowRight,
  CalendarPlus,
  Check,
  ClipboardCheck,
  ClipboardList,
  Hourglass,
  MessageCircle,
  NotebookPen,
  TriangleAlert,
  UserPlus,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SessionStatusChip, type SessionStatus } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { countUnread } from "@/lib/chat/queries";
import { countCorrectionQueue } from "@/lib/correction/queries";
import { getAccounts } from "@/lib/payments/queries";
import {
  formatLocal,
  localDateKey,
  localDateKeyInDays,
  localDayBounds,
  localMinutesOfDay,
  localWeekBounds,
} from "@/lib/dates";
import { listQuietStudents, listRecentActivity, type ActivityItem } from "@/lib/student/activity";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database";
import { initialsOf } from "@/components/initials";

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
const MIN_ITEM_HEIGHT = 64;

function whoFor(session: DaySession): string {
  return session.student?.full_name ?? session.group?.name ?? "";
}

export async function TodayView() {
  const viewer = await requireViewer("tutor");
  const [t, tSession, tExams] = await Promise.all([
    getTranslations("tutor.today"),
    getTranslations("session"),
    getTranslations("exams"),
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
    activity,
    quiet,
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
      .select("id, starts_at, status")
      .gte("starts_at", week.start.toISOString())
      .lt("starts_at", week.end.toISOString())
      .in("status", ["en_attente", "planifiee", "terminee", "absent"])
      .order("starts_at"),
    countCorrectionQueue(supabase),
    // Sessions that took place and that she has not said anything about yet.
    supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("status", "planifiee")
      .lt("starts_at", now.toISOString()),
    countUnread(),
    getAccounts(),
    listRecentActivity({ limit: 10 }),
    listQuietStudents(now),
  ]);
  // Accounts that owe hours (D-087): the dashboard names how many, the payments page who.
  const overdue = [...accounts.values()].filter((account) => account.owes).length;

  const sessions: DaySession[] = todayResult.data ?? [];
  const next: DaySession | null = nextResult.data;
  const firstName = viewer.fullName.split(" ")[0] || viewer.fullName;

  // The week as seven days: how many sessions each holds, today marked.
  const todayKey = localDateKey(now);
  const weekSessions = weekResult.data ?? [];
  const days = Array.from({ length: 7 }, (_, index) => {
    const key = localDateKeyInDays(week.start, index);
    const count = weekSessions.filter((session) => localDateKey(session.starts_at) === key).length;
    return { key, count };
  });
  const weekdayFormat = new Intl.DateTimeFormat("fr-FR", { weekday: "short", timeZone: "UTC" });

  // What waits for her, in the order she usually deals with it.
  const tiles = [
    {
      key: "messages",
      href: "/prof/messages",
      icon: MessageCircle,
      count: unread,
      label: t("tileMessages", { count: unread }),
      tone: "border-transparent bg-orange-fond text-orange-texte",
    },
    {
      key: "corrections",
      href: "/prof/devoirs/corrections",
      icon: ClipboardCheck,
      count: toCorrect,
      label: t("tileCorrections", { count: toCorrect }),
      tone: "border-transparent bg-rouge-fond text-rouge-texte",
    },
    {
      key: "requests",
      href: "/prof/seances#requests",
      icon: Hourglass,
      count: pendingResult.count ?? 0,
      label: t("tileRequests", { count: pendingResult.count ?? 0 }),
      tone: "border-encre bg-surface text-encre",
    },
    {
      key: "close",
      href: "/prof/seances#to-close",
      icon: NotebookPen,
      count: toClose.count ?? 0,
      label: t("toCloseTile", { count: toClose.count ?? 0 }),
      tone: "border-encre bg-surface text-encre",
    },
    {
      key: "payments",
      href: "/prof/paiements",
      icon: TriangleAlert,
      count: overdue,
      label: t("tileOverdue", { count: overdue }),
      tone: "border-stylo-rouge bg-lavis-rouge text-stylo-rouge",
    },
  ];

  const quick = [
    { href: "/prof/seances/nouvelle", icon: CalendarPlus, label: t("planAction") },
    { href: "/prof/devoirs/nouveau", icon: ClipboardList, label: t("assignAction") },
    { href: "/prof/paiements/nouveau", icon: Wallet, label: t("paymentAction") },
    { href: "/prof/eleves/inviter", icon: UserPlus, label: t("inviteAction") },
  ];

  const activityText = (item: ActivityItem) => {
    switch (item.kind) {
      case "understood":
        return t("didUnderstand", { kind: item.lesson.kind, title: item.lesson.title });
      case "opened":
        return t("didOpen", { kind: item.lesson.kind, title: item.lesson.title });
      case "handedIn":
        return t("didHandIn", { title: item.exercise });
      case "exam":
        return t("didExam", {
          year: item.year,
          session: tExams(`sessionInTitle.${item.session}`),
          score: item.score === null ? "none" : String(item.score).replace(".", ","),
        });
    }
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
      <RefreshOnReturn />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <p className="text-sm text-encre-douce first-letter:uppercase">
            {formatLocal(now, "EEEE d MMMM")}
          </p>
          <h1 className="text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
            {t("greeting", { name: firstName })}
          </h1>
        </div>
        <nav
          aria-label={t("quickActions")}
          className="-mx-4 flex w-[calc(100%+2rem)] min-w-0 gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {quick.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={buttonVariants({
                variant: index === 0 ? "default" : "outline",
                size: "sm",
              })}
            >
              <action.icon aria-hidden="true" className="size-4" />
              {action.label}
            </Link>
          ))}
        </nav>
      </header>

      <section aria-labelledby="todo-heading">
        <h2 id="todo-heading" className="sr-only">
          {t("todoHeading")}
        </h2>
        {tiles.every((tile) => tile.count === 0) ? (
          <p className="flex min-h-11 items-center gap-2 rounded-2xl border border-quadrillage bg-surface px-4 text-sm sm:hidden">
            <Check aria-hidden="true" className="size-4" />
            {t("allClear")}
          </p>
        ) : null}
        <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tiles.map((tile) => (
            <li key={tile.key} className={cn("grid", tile.count === 0 && "hidden sm:grid")}>
              <Link
                href={tile.href}
                className={cn(
                  "grid content-between gap-3 rounded-2xl border p-4 transition-colors",
                  tile.count > 0
                    ? cn("hover:brightness-95", tile.tone)
                    : "border-quadrillage bg-surface text-encre-douce hover:border-trait",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <tile.icon aria-hidden="true" className="size-5" />
                  {tile.count === 0 ? <Check aria-hidden="true" className="size-4" /> : null}
                </span>
                <span className="grid gap-0.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-3xl font-semibold tabular [font-variation-settings:'HEXP'_45]",
                      tile.count === 0 && "text-trait",
                    )}
                  >
                    {tile.count}
                  </span>
                  <span className="text-sm font-medium">
                    <span className="sr-only">{tile.count} </span>
                    {tile.label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section aria-labelledby="week-heading" className="grid min-w-0 gap-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="week-heading" className="text-lg font-semibold">
              {t("weekHeading")}
            </h2>
            <Link
              href="/prof/seances"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
            >
              {t("fullCalendar")}
              <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
            </Link>
          </div>
          <ol role="list" className="grid grid-cols-7 gap-1.5">
            {days.map((entry) => {
              const isToday = entry.key === todayKey;
              const past = entry.key < todayKey;
              return (
                <li key={entry.key} className="grid">
                  <Link
                    href={`/prof/seances?vue=liste&date=${entry.key}`}
                    aria-current={isToday ? "date" : undefined}
                    className={cn(
                      "grid min-h-16 content-center justify-items-center gap-0.5 rounded-xl border px-1 py-2 text-center hover:border-trait",
                      isToday
                        ? "border-encre-fixe bg-surligneur text-encre-fixe"
                        : "border-quadrillage bg-surface",
                      past && !isToday && "text-encre-douce",
                    )}
                  >
                    <span className="text-xs capitalize">
                      {weekdayFormat.format(new Date(`${entry.key}T12:00:00Z`)).replace(".", "")}
                    </span>
                    <span className="text-lg leading-tight font-semibold tabular">
                      {Number(entry.key.slice(8, 10))}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "min-h-4 text-xs font-semibold tabular",
                        isToday ? "text-encre-fixe" : "text-bleu-texte",
                      )}
                    >
                      {entry.count > 0 ? t("dayCount", { count: entry.count }) : ""}
                    </span>
                    <span className="sr-only">{t("daySessions", { count: entry.count })}</span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="grid gap-3 rounded-2xl border border-quadrillage bg-surface p-4 sm:p-5">
            <h3 className="flex flex-wrap items-baseline gap-x-3 font-semibold">
              {t("sessionsHeading")}
              <span className="text-sm font-normal text-encre-douce">
                {t("sessionsCount", { count: sessions.length })}
              </span>
            </h3>
            {sessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-trait px-4 py-5">
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
          </div>
          <p className="text-sm text-encre-douce">
            {t("weekSessions", { count: weekSessions.length })} ·{" "}
            {t("activeStudents", { count: studentsResult.count ?? 0 })}
          </p>
        </section>

        <aside className="grid gap-6">
          <section aria-labelledby="activity-heading" className="grid gap-3">
            <h2 id="activity-heading" className="text-lg font-semibold">
              {t("activityHeading")}
            </h2>
            {activity.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-sm text-encre-douce">
                {t("activityEmpty")}
              </p>
            ) : (
              <ol
                role="list"
                className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
              >
                {activity.map((item, index) => (
                  <li key={index} className="flex gap-3 bg-surface px-4 py-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        item.kind === "understood"
                          ? "bg-encre"
                          : item.kind === "opened"
                            ? "bg-stylo-bleu"
                            : item.kind === "handedIn"
                              ? "bg-rouge"
                              : "bg-violet",
                      )}
                    />
                    <span className="grid min-w-0 gap-0.5 text-sm">
                      <span>
                        <Link
                          href={`/prof/eleves/${item.student.id}`}
                          className="font-semibold underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                        >
                          {item.student.name}
                        </Link>{" "}
                        {item.kind === "handedIn" ? (
                          <Link
                            href={`/prof/devoirs/${item.assignmentId}`}
                            className="underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                          >
                            {activityText(item)}
                          </Link>
                        ) : (
                          activityText(item)
                        )}
                      </span>
                      <span className="text-xs text-encre-douce">{ago(item.at, now, t)}</span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {quiet.length > 0 ? (
            <section aria-labelledby="quiet-heading" className="grid gap-3">
              <div className="grid gap-0.5">
                <h2 id="quiet-heading" className="text-lg font-semibold">
                  {t("quietHeading")}
                </h2>
                <p className="text-sm text-encre-douce">{t("quietHint")}</p>
              </div>
              <ul role="list" className="flex flex-wrap gap-2">
                {quiet.slice(0, 8).map((student) => (
                  <li key={student.id}>
                    <Link
                      href={`/prof/eleves/${student.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-quadrillage bg-surface ps-1 pe-3 text-sm hover:border-trait"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center rounded-full bg-sunken text-xs font-semibold"
                      >
                        {initialsOf(student.name)}
                      </span>
                      {student.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

/** « il y a 5 min », « il y a 3 h » the same day, then calendar days in Casablanca. */
function ago(
  at: string,
  now: Date,
  t: (key: "agoMinutes" | "agoHours" | "agoDays", values: { count: number }) => string,
) {
  const minutes = Math.max(Math.round((now.getTime() - Date.parse(at)) / 60_000), 0);
  if (minutes < 60) return t("agoMinutes", { count: Math.max(minutes, 1) });
  if (localDateKey(at) === localDateKey(now)) {
    return t("agoHours", { count: Math.floor(minutes / 60) });
  }
  const days = Math.round(
    (Date.parse(`${localDateKey(now)}T00:00:00Z`) - Date.parse(`${localDateKey(at)}T00:00:00Z`)) /
      86_400_000,
  );
  return t("agoDays", { count: Math.max(days, 1) });
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
