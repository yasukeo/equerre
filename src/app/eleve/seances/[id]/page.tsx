import { CalendarPlus, Check, Download, MessageSquareText, Video } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionTicket } from "@/components/session-ticket";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { calendarDaysBetween, formatLocal } from "@/lib/dates";
import { googleCalendarUrl } from "@/lib/ics";
import { eventFor } from "@/lib/sessions/calendar-event";
import { getBookingRules, getSession } from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";
import { CancelForm } from "./cancel-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.session");
  return { title: t("title") };
}

export default function StudentSessionPage({
  params,
  searchParams,
}: PageProps<"/eleve/seances/[id]">) {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-80 rounded-2xl bg-sunken" />}>
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
  const days = calendarDaysBetween(new Date(now), session.startsAt);
  const when = live && starts > now ? t("when", { count: days }) : null;

  return (
    <article className="grid gap-6">
      {query.demandee === "1" && session.status === "en_attente" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-2xl border border-quadrillage bg-surface px-4 py-3"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {t("requestSent")}
        </p>
      ) : null}
      {query.reservee === "1" && session.status === "planifiee" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-2xl border border-quadrillage bg-surface px-4 py-3"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {t("booked")}
        </p>
      ) : null}

      {query.annulee === "1" || query.retiree === "1" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-2xl border border-quadrillage bg-surface px-4 py-3"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {query.retiree === "1" ? t("withdrawn") : t("cancelled")}
        </p>
      ) : null}

      <PageHeader
        back={{ href: "/eleve/seances", label: t("back") }}
        title={session.type?.name ?? t("title")}
      />

      <SessionTicket
        startsAt={session.startsAt}
        endsAt={session.endsAt}
        status={session.status}
        statusLabel={statusLabel}
        mode={session.mode}
        place={place}
        group={session.group?.name}
        when={when}
        past={!ahead}
      >
        {session.status === "planifiee" &&
        ahead &&
        session.mode === "en_ligne" &&
        session.meetingUrl ? (
          <a href={session.meetingUrl} className={cn(buttonVariants(), "mt-1 justify-self-start")}>
            <Video aria-hidden="true" />
            {tSession("join")}
          </a>
        ) : null}
      </SessionTicket>

      {session.requestNote ? (
        <section
          aria-labelledby="your-note"
          className="grid gap-1 rounded-2xl border border-quadrillage bg-surface p-4"
        >
          <h2 id="your-note" className="inline-flex items-center gap-2 text-sm font-semibold">
            <MessageSquareText aria-hidden="true" className="size-4" />
            {t("yourNote")}
          </h2>
          <p className="break-words whitespace-pre-line">{session.requestNote}</p>
        </section>
      ) : null}

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

      {session.status === "terminee" &&
      (session.chapterTitle || session.homework || session.recap) ? (
        <section
          aria-labelledby="recap"
          className="grid gap-3 rounded-2xl border border-s-4 border-quadrillage border-s-stylo-bleu bg-surface p-4 sm:p-5"
        >
          <h2 id="recap" className="text-lg font-semibold">
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
          <h2 id="in-my-diary" className="text-lg font-semibold">
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
        <section
          aria-labelledby="cancel-heading"
          className="grid gap-3 border-t border-quadrillage pt-6"
        >
          <h2 id="cancel-heading" className="text-lg font-semibold">
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
