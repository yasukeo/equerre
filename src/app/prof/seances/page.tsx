import {
  CalendarClock,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Download,
  Tags,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button";
import { requireViewer } from "@/lib/auth";
import { formatLocal, localDateKey, localDateTimeToUtc } from "@/lib/dates";
import {
  addDays,
  addMonths,
  isDateKey,
  monthGridOf,
  sameMonth,
  weekOf,
} from "@/lib/sessions/calendar-views";
import {
  listPendingRequests,
  listSessionsBetween,
  listToClose,
  whoFor,
  type Session,
} from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";
import { RequestActions, RequestsSection } from "./request-actions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.sessions");
  return { title: t("title") };
}

export default async function TutorSessionsPage({ searchParams }: PageProps<"/prof/seances">) {
  const t = await getTranslations("tutor.sessions");

  return (
    <div className="grid max-w-6xl gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/prof/seances/disponibilites"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <CalendarClock aria-hidden="true" />
            {t("availability")}
          </Link>
          <Link
            href="/prof/seances/types"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Tags aria-hidden="true" />
            {t("types")}
          </Link>
          <Link href="/prof/seances/nouvelle" className={buttonVariants()}>
            <CalendarPlus aria-hidden="true" />
            {t("plan")}
          </Link>
        </div>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <TutorSessions searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const VIEWS = ["semaine", "mois", "liste"] as const;
type View = (typeof VIEWS)[number];
/** How many past sessions to close are listed before the rest fold away. */
const TO_CLOSE_SHOWN = 5;
/** The list view runs this many days from its date. */
const LIST_DAYS = 30;

function one(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

/** A calendar date, read at noon so no offset can move it to another day. */
function day(date: string, pattern: string): string {
  return formatLocal(`${date}T12:00:00Z`, pattern);
}

async function TutorSessions({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [t, tSession, params] = await Promise.all([
    getTranslations("tutor.sessions"),
    getTranslations("session"),
    searchParams,
  ]);
  const now = new Date();
  const today = localDateKey(now);
  const view: View = VIEWS.includes(one(params.vue) as View)
    ? (one(params.vue) as View)
    : "semaine";
  const date = isDateKey(one(params.date)) ? one(params.date) : today;

  const days =
    view === "semaine"
      ? weekOf(date)
      : view === "mois"
        ? monthGridOf(date)
        : Array.from({ length: LIST_DAYS }, (_, index) => addDays(date, index));
  const first = days[0]!;
  const last = days.at(-1)!;
  const [requests, toClose, sessions] = await Promise.all([
    listPendingRequests(now),
    listToClose(now),
    listSessionsBetween(
      localDateTimeToUtc(first, "00:00"),
      localDateTimeToUtc(addDays(last, 1), "00:00"),
    ),
  ]);
  const byDay = new Map<string, Session[]>();
  for (const session of sessions) {
    // The week and month views leave cancellations out; the list keeps them, crossed through.
    if (view !== "liste" && session.status === "annulee") continue;
    const key = localDateKey(session.startsAt);
    byDay.set(key, [...(byDay.get(key) ?? []), session]);
  }

  const step = (direction: 1 | -1) =>
    view === "semaine"
      ? addDays(date, 7 * direction)
      : view === "mois"
        ? addMonths(date, direction)
        : addDays(date, LIST_DAYS * direction);
  const href = (nextView: View, nextDate: string) =>
    `/prof/seances?vue=${nextView}&date=${nextDate}`;
  const heading =
    view === "semaine"
      ? t("weekOf", { from: day(first, "d MMMM"), to: day(last, "d MMMM yyyy") })
      : view === "mois"
        ? day(date, "MMMM yyyy")
        : t("listFrom", { from: day(first, "d MMMM"), to: day(last, "d MMMM yyyy") });

  const statusLabel = (session: Session) => tSession(`status.${session.status}`);
  const time = (session: Session) =>
    `${formatLocal(session.startsAt, "HH:mm")} – ${formatLocal(session.endsAt, "HH:mm")}`;

  const toCloseItem = (session: Session) => (
    <li key={session.id}>
      <Link
        href={`/prof/seances/${session.id}#compte-rendu`}
        className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 hover:bg-sunken"
      >
        <span>
          <span className="first-letter:uppercase">
            {formatLocal(session.startsAt, "EEE d MMM, HH:mm")}
          </span>
          <span className="font-medium"> · {whoFor(session)}</span>
        </span>
        <span className="text-sm underline decoration-trait underline-offset-4">{t("close")}</span>
      </Link>
    </li>
  );

  return (
    <div className="grid gap-10">
      {/* Always there: once the last request is answered, the focus lands on its heading. */}
      <section aria-labelledby="requests" className="grid gap-3">
        <RequestsSection
          heading={
            <h2 id="requests" tabIndex={-1} className="text-lg font-medium">
              {t("requestsHeading", { count: requests.length })}
            </h2>
          }
        >
          {requests.length === 0 ? (
            <p className="text-encre-douce">{t("noRequests")}</p>
          ) : (
            <ul
              role="list"
              className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
            >
              {requests.map((request) => (
                <li
                  key={request.id}
                  className="grid gap-3 bg-surface px-4 py-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
                >
                  <div className="grid gap-0.5">
                    <Link
                      href={`/prof/seances/${request.id}`}
                      className="font-medium underline decoration-quadrillage underline-offset-4 first-letter:uppercase hover:decoration-encre"
                    >
                      {formatLocal(request.startsAt, "EEEE d MMMM")}, {time(request)}
                    </Link>
                    <p className="text-sm">
                      {whoFor(request)}
                      <span className="text-encre-douce">
                        {" "}
                        ·{" "}
                        {[request.type?.name, request.student?.levelCode]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </p>
                    {request.requestNote ? (
                      <p className="text-sm text-encre-douce">« {request.requestNote} »</p>
                    ) : null}
                  </div>
                  <RequestActions id={request.id} who={whoFor(request)} headingId="requests" />
                </li>
              ))}
            </ul>
          )}
        </RequestsSection>
      </section>

      {toClose.length > 0 ? (
        <section aria-labelledby="to-close" className="grid gap-3">
          <div className="grid gap-0.5">
            <h2 id="to-close" className="text-lg font-medium">
              {t("toCloseHeading", { count: toClose.length })}
            </h2>
            <p className="text-sm text-encre-douce">{t("toCloseLead")}</p>
          </div>
          <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
            {toClose.slice(0, TO_CLOSE_SHOWN).map(toCloseItem)}
          </ul>
          {toClose.length > TO_CLOSE_SHOWN ? (
            <details>
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre">
                {t("toCloseMore", { count: toClose.length - TO_CLOSE_SHOWN })}
              </summary>
              <ul role="list" className="divide-y divide-quadrillage border-b border-quadrillage">
                {toClose.slice(TO_CLOSE_SHOWN).map(toCloseItem)}
              </ul>
            </details>
          ) : null}
        </section>
      ) : null}

      <section aria-labelledby="calendar" className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="calendar" className="text-lg font-medium first-letter:uppercase">
            {heading}
          </h2>
          <nav aria-label={t("viewsLabel")} className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-hidden rounded-md border border-trait">
              {VIEWS.map((option) => (
                <Link
                  key={option}
                  href={href(option, date)}
                  aria-current={option === view ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center px-3 text-sm",
                    option === view ? "bg-encre font-medium text-papier" : "hover:bg-sunken",
                  )}
                >
                  {t(`views.${option}`)}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={href(view, step(-1))}
                aria-label={t("previous")}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
              </Link>
              <Link
                href={href(view, today)}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {t("today")}
              </Link>
              <Link
                href={href(view, step(1))}
                aria-label={t("next")}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </div>
          </nav>
        </div>

        {view === "mois" ? (
          <MonthGrid
            days={days}
            date={date}
            today={today}
            byDay={byDay}
            weekdays={([1, 2, 3, 4, 5, 6, 7] as const).map((index) => t(`weekdaysShort.${index}`))}
            dayLink={(key) => href("semaine", key)}
            more={(count) => t("more", { count })}
            countLabel={(count) => t("sessionCount", { count })}
          />
        ) : (
          <ol
            role="list"
            className={cn(
              "grid gap-4",
              view === "semaine" &&
                "lg:grid-cols-7 lg:gap-px lg:overflow-hidden lg:rounded-md lg:border lg:border-quadrillage lg:bg-quadrillage",
            )}
          >
            {days
              .filter((key) => view === "semaine" || (byDay.get(key)?.length ?? 0) > 0)
              .map((key) => {
                const ofDay = byDay.get(key) ?? [];
                return (
                  <li
                    key={key}
                    className={cn(
                      "grid content-start gap-2",
                      view === "semaine" && "lg:min-h-48 lg:bg-surface lg:p-2",
                    )}
                  >
                    <h3
                      className={cn(
                        "flex items-baseline gap-2 border-b-[3px] pb-1 text-sm font-medium first-letter:uppercase",
                        key === today ? "border-surligneur" : "border-transparent",
                      )}
                    >
                      {day(key, view === "semaine" ? "EEEE d" : "EEEE d MMMM")}
                      {key === today ? (
                        <span className="text-xs font-normal text-encre-douce">
                          {t("todayMark")}
                        </span>
                      ) : null}
                    </h3>
                    {ofDay.length === 0 ? (
                      <p className="text-sm text-encre-douce lg:sr-only">{t("free")}</p>
                    ) : (
                      <ul role="list" className="grid gap-1.5">
                        {ofDay.map((session) => (
                          <li key={session.id}>
                            <Link
                              href={`/prof/seances/${session.id}`}
                              className={cn(
                                "grid gap-0.5 rounded-md border border-s-[3px] border-quadrillage bg-surface px-2.5 py-2 text-sm hover:border-trait",
                                session.status === "en_attente"
                                  ? "border-dashed border-s-trait"
                                  : session.status === "annulee"
                                    ? "border-s-quadrillage text-encre-douce"
                                    : "border-s-encre",
                              )}
                            >
                              <span
                                className={cn(
                                  "font-medium tabular",
                                  session.status === "annulee" && "line-through",
                                )}
                              >
                                {time(session)}
                              </span>
                              <span className="font-medium">{whoFor(session)}</span>
                              <span className="text-xs text-encre-douce">{session.type?.name}</span>
                              {session.status !== "planifiee" ? (
                                <span className="justify-self-start">
                                  <SessionStatusChip
                                    status={session.status}
                                    label={statusLabel(session)}
                                  />
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ol>
        )}
        {view === "liste" && sessions.length === 0 ? (
          <p className="text-encre-douce">{t("emptyList")}</p>
        ) : null}
        {view === "semaine" && sessions.length === 0 ? (
          <p className="text-encre-douce">{t("emptyWeek")}</p>
        ) : null}
        {/* A file from a route handler, not a page: a plain link downloads it. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/agenda/a-venir"
          className="inline-flex min-h-11 items-center gap-2 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          <Download aria-hidden="true" className="size-4" />
          {t("exportAll")}
        </a>
      </section>
    </div>
  );
}

function MonthGrid({
  days,
  date,
  today,
  byDay,
  weekdays,
  dayLink,
  more,
  countLabel,
}: {
  days: string[];
  date: string;
  today: string;
  byDay: Map<string, Session[]>;
  weekdays: string[];
  dayLink: (key: string) => string;
  more: (count: number) => string;
  countLabel: (count: number) => string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-quadrillage">
      <div aria-hidden="true" className="grid grid-cols-7 border-b border-quadrillage bg-sunken">
        {weekdays.map((label) => (
          <span
            key={label}
            className="px-1 py-1.5 text-center text-xs font-medium text-encre-douce"
          >
            {label}
          </span>
        ))}
      </div>
      <ol role="list" className="grid grid-cols-7 gap-px bg-quadrillage">
        {days.map((key) => {
          const ofDay = byDay.get(key) ?? [];
          const inMonth = sameMonth(key, date);
          return (
            <li
              key={key}
              className={cn("min-h-16 bg-surface sm:min-h-24", !inMonth && "bg-papier")}
            >
              <Link
                href={dayLink(key)}
                aria-label={`${day(key, "EEEE d MMMM")}${ofDay.length > 0 ? `, ${countLabel(ofDay.length)}` : ""}`}
                className="grid h-full content-start gap-1 p-1 hover:bg-sunken sm:p-1.5"
              >
                <span
                  className={cn(
                    "inline-flex size-7 items-center justify-center justify-self-start rounded-full text-sm tabular",
                    // The highlighter marks where you are, under the figure: it never carries text.
                    key === today &&
                      "font-semibold underline decoration-surligneur decoration-[3px] underline-offset-4",
                    !inMonth && "text-encre-douce",
                  )}
                >
                  {Number(key.slice(8))}
                </span>
                {ofDay.length > 0 ? (
                  <>
                    <span className="text-xs font-medium sm:hidden">{ofDay.length}</span>
                    <span className="hidden gap-0.5 sm:grid">
                      {ofDay.slice(0, 3).map((session) => (
                        <span
                          key={session.id}
                          className={cn(
                            "truncate text-xs",
                            session.status === "en_attente" && "text-encre-douce italic",
                          )}
                        >
                          <span className="tabular">{formatLocal(session.startsAt, "HH:mm")}</span>{" "}
                          {whoFor(session)}
                        </span>
                      ))}
                      {ofDay.length > 3 ? (
                        <span className="text-xs text-encre-douce">{more(ofDay.length - 3)}</span>
                      ) : null}
                    </span>
                  </>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
