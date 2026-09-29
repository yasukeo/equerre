import { CalendarPlus, Check, Download, MapPin, Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { googleCalendarUrl } from "@/lib/ics";
import { eventFor } from "@/lib/sessions/calendar-event";
import { getBookingRules, getSession } from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";
import { CancelForm } from "./cancel-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.session");
  return { title: t("title") };
}

export default async function StudentSessionPage({
  params,
  searchParams,
}: PageProps<"/eleve/seances/[id]">) {
  const t = await getTranslations("student.session");

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Link
        href="/eleve/seances"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-80 rounded-md bg-sunken" />}>
        <StudentSession params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function StudentSession({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const viewer = await requireViewer("student");
  const [{ id }, query, t, tSession] = await Promise.all([
    params,
    searchParams,
    getTranslations("student.session"),
    getTranslations("session"),
  ]);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [session, rules] = await Promise.all([getSession(id), getBookingRules()]);
  if (!session) notFound();

  const now = new Date().getTime();
  const starts = Date.parse(session.startsAt);
  const ahead = Date.parse(session.endsAt) >= now;
  const live = session.status === "planifiee" || session.status === "en_attente";
  const mine = session.student?.id === viewer.id;
  const deadline = starts - rules.cancellationWindowHours * 3_600_000;
  const cancellable =
    viewer.status === "actif" &&
    mine &&
    starts > now &&
    (session.status === "en_attente" || (session.status === "planifiee" && deadline > now));
  const event = eventFor(session, "student", (mode) => tSession(`mode.${mode}`));
  const place = session.location ?? tSession(`mode.${session.mode}`);
  const statusLabel =
    session.status === "en_attente" && !ahead
      ? t("unanswered")
      : tSession(`status.${session.status}`);

  return (
    <article className="grid gap-6">
      {query.demandee === "1" && session.status === "en_attente" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-md border border-quadrillage bg-sunken px-3 py-2.5"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {t("requestSent")}
        </p>
      ) : null}
      {query.reservee === "1" && session.status === "planifiee" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-md border border-quadrillage bg-sunken px-3 py-2.5"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {t("booked")}
        </p>
      ) : null}

      {query.annulee === "1" || query.retiree === "1" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-md border border-quadrillage bg-sunken px-3 py-2.5"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {query.retiree === "1" ? t("withdrawn") : t("cancelled")}
        </p>
      ) : null}

      <header className="grid gap-2">
        <h1 className="text-xl font-semibold">{session.type?.name ?? t("title")}</h1>
        <p className="text-2xl font-semibold tabular">
          {formatLocal(session.startsAt, "HH:mm")} – {formatLocal(session.endsAt, "HH:mm")}
        </p>
        <p className="text-lg first-letter:uppercase">
          {formatLocal(session.startsAt, "EEEE d MMMM yyyy")}
        </p>
        <div className="justify-self-start">
          <SessionStatusChip status={session.status} label={statusLabel} />
        </div>
      </header>

      <dl className="grid gap-3 border-y border-quadrillage py-4 sm:grid-cols-[9rem_1fr]">
        <dt className="text-sm text-encre-douce">{t("where")}</dt>
        <dd className="flex items-start gap-2">
          {session.mode === "en_ligne" ? (
            <Video aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          ) : (
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          )}
          {place}
        </dd>
        {session.group ? (
          <>
            <dt className="text-sm text-encre-douce">{t("group")}</dt>
            <dd>{session.group.name}</dd>
          </>
        ) : null}
        {session.requestNote ? (
          <>
            <dt className="text-sm text-encre-douce">{t("yourNote")}</dt>
            <dd className="whitespace-pre-line">{session.requestNote}</dd>
          </>
        ) : null}
      </dl>

      {session.status === "en_attente" && ahead ? <p>{t("waiting")}</p> : null}
      {session.status === "refusee" ? (
        <p>
          {t("declined")}
          {session.cancellationReason
            ? ` ${t("reason", { reason: session.cancellationReason })}`
            : ""}
        </p>
      ) : null}
      {session.status === "annulee" ? (
        <p>
          {session.cancelledByStudent ? t("cancelledByYou") : t("cancelledByTutor")}
          {session.cancellationReason
            ? ` ${t("reason", { reason: session.cancellationReason })}`
            : ""}
        </p>
      ) : null}

      {session.status === "planifiee" &&
      ahead &&
      session.mode === "en_ligne" &&
      session.meetingUrl ? (
        <a href={session.meetingUrl} className={cn(buttonVariants(), "justify-self-start")}>
          <Video aria-hidden="true" />
          {tSession("join")}
        </a>
      ) : null}

      {session.status === "terminee" &&
      (session.chapterTitle || session.homework || session.recap) ? (
        <section aria-labelledby="recap" className="grid gap-3">
          <h2 id="recap" className="text-lg font-medium">
            {t("recapHeading")}
          </h2>
          {session.chapterTitle ? <p>{t("chapter", { title: session.chapterTitle })}</p> : null}
          {session.recap ? <p className="whitespace-pre-line">{session.recap}</p> : null}
          {session.homework ? (
            <p className="whitespace-pre-line">
              <span className="font-medium">{t("homework")}</span> {session.homework}
            </p>
          ) : null}
        </section>
      ) : null}

      {session.status === "planifiee" && ahead ? (
        <section aria-labelledby="in-my-diary" className="grid gap-3">
          <h2 id="in-my-diary" className="text-lg font-medium">
            {t("calendarHeading")}
          </h2>
          <div className="flex flex-wrap gap-2">
            <a href={`/agenda/${session.id}`} className={buttonVariants({ variant: "outline" })}>
              <Download aria-hidden="true" />
              {t("ics")}
            </a>
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <CalendarPlus aria-hidden="true" />
              {t("google")}
              <span className="sr-only"> {tSession("newTab")}</span>
            </a>
          </div>
        </section>
      ) : null}

      {/* Started, or her follow-up is not active: nothing is hers to cancel here any more. */}
      {live && mine && starts > now && viewer.status === "actif" ? (
        <section aria-labelledby="cancel-heading" className="grid gap-3">
          <h2 id="cancel-heading" className="text-lg font-medium">
            {session.status === "en_attente" ? t("withdrawHeading") : t("cancelHeading")}
          </h2>
          {session.status === "planifiee" ? (
            <p className="text-sm text-encre-douce">
              {cancellable
                ? t("cancelUntil", {
                    hours: rules.cancellationWindowHours,
                    deadline: formatLocal(deadline, "EEEE d MMMM 'à' HH:mm"),
                  })
                : t("tooLate", { hours: rules.cancellationWindowHours })}
            </p>
          ) : null}
          {cancellable ? (
            <CancelForm id={session.id} pending={session.status === "en_attente"} />
          ) : null}
        </section>
      ) : null}
      {live && starts > now && session.group && viewer.status === "actif" ? (
        <p className="text-sm text-encre-douce">{t("groupNoCancel")}</p>
      ) : null}
      {live && ahead && viewer.status !== "actif" ? (
        <p className="text-sm text-encre-douce">{t("paused")}</p>
      ) : null}
    </article>
  );
}
