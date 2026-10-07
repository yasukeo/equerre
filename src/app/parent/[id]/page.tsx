import { ArrowLeft, CalendarDays, ClipboardList, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { z } from "zod";
import { GradeMark } from "@/components/grade-mark";
import { Initials } from "@/components/initials";
import { LateBadge } from "@/components/late-badge";
import { AccountPanel, AccountStatusChip, overdueDays } from "@/components/payments/account-panel";
import { SessionStatusChip } from "@/components/session-status";
import { WorkChip } from "@/components/work-status";
import { requireViewer } from "@/lib/auth";
import { formatLocal, localDateKey, withFirst } from "@/lib/dates";
import type { ExerciseWork } from "@/lib/homework/work";
import {
  getChildHomework,
  getChildSessions,
  listMyChildren,
  type ChildHomework,
  type ChildSession,
} from "@/lib/parents/queries";
import { formatHours } from "@/lib/payments/format";
import { getAccounts, getStatement, listPayments } from "@/lib/payments/queries";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("parent.child");
  return { title: t("title") };
}

export default function ChildPage({ params }: PageProps<"/parent/[id]">) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Child params={params} />
      </Suspense>
    </div>
  );
}

/** Sessions to come shown before « voir plus »: the next few matter most. */
const NEXT = 3;
/** Past sessions and homework shown before « voir plus ». */
const RECENT = 6;
const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 1 });

/**
 * One child as their parent follows them (D-091): what comes next, what happened, their
 * homework and grades, and their account with its receipts. Read only, and never more than
 * the child reads about themselves.
 */
async function Child({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("parent");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const children = await listMyChildren();
  const child = children.find((candidate) => candidate.id === id);
  if (!child) notFound();

  const now = new Date();
  const today = localDateKey(now);
  const [t, tStatus, tSession, tWork, tAccount, sessions, homework, accounts, payments] =
    await Promise.all([
      getTranslations("parent.child"),
      getTranslations("studentStatus"),
      getTranslations("session"),
      getTranslations("student.homework.work"),
      getTranslations("account"),
      getChildSessions(id),
      getChildHomework(id, now),
      getAccounts(id),
      listPayments({ studentId: id }),
    ]);
  const statement = await getStatement(id, payments);
  const account = accounts.get(id);
  const stopped = child.status === "arrete";

  // The same split as the child's own list: a session to come that was cancelled stays with
  // those to come, marked so, until its date; one that ended stays, closed or not.
  const upcoming = sessions.filter((session) =>
    session.status === "planifiee" || session.status === "en_attente"
      ? Date.parse(session.endsAt) >= now.getTime()
      : session.status === "annulee" && Date.parse(session.startsAt) > now.getTime(),
  );
  const past = sessions.filter((session) => !upcoming.includes(session)).reverse();
  const next = upcoming.find((session) => session.status !== "annulee");

  // What is left to do first, soonest due first; then the rest, latest first.
  const open = (item: ChildHomework) => !stopped && item.progress.left > 0;
  const orderedHomework = [
    ...homework.filter(open).sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt)),
    ...homework.filter((item) => !open(item)),
  ];
  const late = stopped ? 0 : homework.filter((item) => item.progress.late).length;
  // Every corrected exercise, in every homework: the one figure a parent asks for first.
  const grades = homework.flatMap((item) =>
    item.exercises.flatMap((exercise) =>
      exercise.work.kind === "graded" ? [exercise.work.grade] : [],
    ),
  );
  const average = grades.length
    ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
    : null;

  const day = (value: string, pattern: string) => withFirst(formatLocal(value, pattern));
  const workLabel = (work: ExerciseWork) =>
    work.kind === "graded"
      ? tWork("graded", { grade: gradeFormat.format(work.grade) })
      : tWork(work.kind);

  const sessionLine = (session: ChildSession, ahead: boolean) => {
    const chip = session.status !== "planifiee" && session.status !== "terminee";
    const label =
      session.status === "en_attente" && !ahead
        ? t("unanswered")
        : tSession(`status.${session.status}`);
    const what = session.groupName ? t("group", { name: session.groupName }) : session.typeName;
    // « Cours particulier chez la professeure » already says where.
    const place = session.location ?? tSession(`mode.${session.mode}`);
    const where = what?.toLocaleLowerCase("fr").includes(place.toLocaleLowerCase("fr"))
      ? null
      : place;
    return (
      <li key={session.id} className="grid gap-1 bg-surface px-4 py-3">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-medium first-letter:uppercase">
            {day(session.startsAt, "EEEE d MMMM")}
            <span className="ms-2 font-normal text-encre-douce tabular">
              {formatLocal(session.startsAt, "HH:mm")} – {formatLocal(session.endsAt, "HH:mm")}
            </span>
          </span>
          {session.attendance ? (
            <span className="text-sm">{t(`attendance.${session.attendance}`)}</span>
          ) : chip ? (
            <SessionStatusChip status={session.status} label={label} />
          ) : null}
        </p>
        <p className="text-sm text-encre-douce">{[what, where].filter(Boolean).join(" · ")}</p>
        {session.chapterTitle ? (
          <p className="text-sm">{t("covered", { chapter: session.chapterTitle })}</p>
        ) : null}
        {session.homework ? (
          <p className="text-sm whitespace-pre-line">
            {t("sessionHomework", { text: session.homework })}
          </p>
        ) : null}
      </li>
    );
  };

  return (
    <article className="grid gap-8">
      <header className="grid gap-4">
        {children.length > 1 ? (
          <Link
            href="/parent"
            className="-ms-1 inline-flex min-h-11 items-center gap-1.5 justify-self-start rounded-full ps-1 pe-3 text-sm text-encre-douce hover:text-encre"
          >
            <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
            {t("back")}
          </Link>
        ) : null}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl bg-encre-fixe p-5 text-white sm:p-6">
          <Initials
            name={child.name}
            className="size-16 bg-white/15 text-xl text-white sm:size-20 sm:text-2xl"
          />
          <div className="grid min-w-0 gap-1">
            <h1 className="text-2xl leading-tight font-semibold break-words">{child.name}</h1>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
              {child.levelLabel ? <span>{child.levelLabel}</span> : null}
              {child.status === "actif" ? null : (
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium text-white">
                  {tStatus(child.status)}
                </span>
              )}
            </p>
          </div>
        </div>
        {child.status === "actif" ? null : (
          <p className="text-sm text-encre-douce">
            {t(stopped ? "stoppedNote" : "pausedNote", { name: child.name })}
          </p>
        )}
        <nav aria-label={t("sectionsLabel")}>
          <ul role="list" className="flex flex-wrap gap-2">
            {[
              { href: "#seances", icon: CalendarDays, label: t("sessionsHeading") },
              { href: "#devoirs", icon: ClipboardList, label: t("homeworkHeading") },
              { href: "#paiements", icon: Wallet, label: t("accountHeading") },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-quadrillage bg-surface px-4 text-sm font-medium hover:border-trait"
                >
                  <link.icon aria-hidden="true" className="size-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="col-span-2 grid content-start gap-1 rounded-2xl border border-quadrillage bg-surface p-4 sm:col-span-1">
          <dt className="text-sm text-encre-douce">{t("nextHeading")}</dt>
          <dd className="font-semibold first-letter:uppercase">
            {next
              ? `${day(next.startsAt, "EEEE d MMMM")}, ${formatLocal(next.startsAt, "HH:mm")}`
              : t("noNext")}
          </dd>
        </div>
        <div
          className={cn(
            "grid content-start gap-1 rounded-2xl border p-4",
            late > 0
              ? "border-stylo-rouge bg-lavis-rouge text-stylo-rouge"
              : "border-quadrillage bg-surface",
          )}
        >
          <dt className={cn("text-sm", late > 0 ? "" : "text-encre-douce")}>{t("lateHeading")}</dt>
          <dd className="font-semibold">
            <a
              href="#devoirs"
              className="underline decoration-current/30 underline-offset-4 hover:decoration-current"
            >
              {t("lateValue", { count: late })}
            </a>
          </dd>
        </div>
        <div className="grid content-start gap-1 rounded-2xl border border-quadrillage bg-surface p-4">
          <dt className="text-sm text-encre-douce">{t("averageHeading")}</dt>
          <dd>
            {average === null ? (
              <span className="font-semibold">{t("noAverage")}</span>
            ) : (
              <GradeMark grade={gradeFormat.format(average)} label={t("averageHeading")} />
            )}
          </dd>
        </div>
        <div className="col-span-2 grid content-start gap-1 rounded-2xl border border-quadrillage bg-surface p-4 sm:col-span-1">
          <dt className="text-sm text-encre-douce">{tAccount("balance")}</dt>
          <dd className="font-semibold tabular">
            <a
              href="#paiements"
              className="underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              {formatHours(account?.balance ?? 0)}
            </a>
          </dd>
          <dd>
            <AccountStatusChip days={overdueDays(account, today)} />
          </dd>
        </div>
      </dl>

      <section id="seances" aria-labelledby="child-sessions" className="grid scroll-mt-6 gap-4">
        <h2 id="child-sessions" className="text-lg font-semibold">
          {t("sessionsHeading")}
        </h2>
        <Group
          heading={t("upcomingHeading")}
          empty={t("noUpcoming")}
          shown={NEXT}
          more={(count) => t("laterSessions", { count })}
        >
          {upcoming.map((session) => sessionLine(session, true))}
        </Group>
        <Group
          heading={t("pastHeading")}
          empty={t("noPast")}
          shown={RECENT}
          more={(count) => t("olderSessions", { count })}
        >
          {past.map((session) => sessionLine(session, false))}
        </Group>
      </section>

      <section id="devoirs" aria-labelledby="child-homework" className="grid scroll-mt-6 gap-4">
        <h2 id="child-homework" className="text-lg font-semibold">
          {t("homeworkHeading")}
        </h2>
        <Group
          empty={t("noHomework")}
          shown={RECENT}
          more={(count) => t("otherHomework", { count })}
        >
          {orderedHomework.map((item) => (
            <li key={item.id} className="grid gap-2 bg-surface px-4 py-3">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium">{item.title}</span>
                {!stopped && item.progress.late ? <LateBadge label={t("late")} /> : null}
              </p>
              <p className="text-sm text-encre-douce">
                {[
                  item.groupName ? t("group", { name: item.groupName }) : null,
                  t("due", { date: day(item.dueAt, "d MMMM 'à' HH:mm") }),
                  stopped
                    ? null
                    : t("left", { left: item.progress.left, total: item.progress.total }),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <ul className="flex flex-wrap gap-1.5" aria-label={item.title} role="list">
                {item.exercises.map((exercise) => (
                  <li key={exercise.id} title={exercise.title}>
                    <span className="sr-only">{exercise.title} : </span>
                    <WorkChip work={exercise.work} label={workLabel(exercise.work)} />
                  </li>
                ))}
              </ul>
              {item.average !== null ? (
                <p className="text-sm font-medium">
                  {t("average", { average: gradeFormat.format(item.average) })}
                </p>
              ) : null}
            </li>
          ))}
        </Group>
      </section>

      <section id="paiements" aria-labelledby="child-account" className="grid scroll-mt-6 gap-4">
        <div className="grid gap-1">
          <h2 id="child-account" className="text-lg font-semibold">
            {t("accountHeading")}
          </h2>
          <p className="text-sm text-encre-douce">{t("accountLead")}</p>
        </div>
        {account?.owes ? <p>{t("owes", { hours: formatHours(-account.balance) })}</p> : null}
        <AccountPanel
          account={account}
          payments={payments}
          statement={statement}
          today={today}
          audience="parent"
        />
      </section>
    </article>
  );
}

/** A list with its heading, the first few items, then the rest folded away. */
function Group({
  heading,
  empty,
  shown,
  more,
  children,
}: {
  heading?: string;
  empty: string;
  shown: number;
  more: (hidden: number) => string;
  children: ReactNode[];
}) {
  const list = "grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage";
  return (
    <div className="grid gap-2">
      {heading ? <h3 className="text-sm font-semibold text-encre-douce">{heading}</h3> : null}
      {children.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-sm text-encre-douce">
          {empty}
        </p>
      ) : (
        <>
          <ul className={list} role="list">
            {children.slice(0, shown)}
          </ul>
          {children.length > shown ? (
            <details className="grid gap-2">
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4">
                {more(children.length - shown)}
              </summary>
              <ul className={cn(list, "mt-2")} role="list">
                {children.slice(shown)}
              </ul>
            </details>
          ) : null}
        </>
      )}
    </div>
  );
}
