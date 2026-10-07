import { CalendarPlus, Check, Download, Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionTicket } from "@/components/session-ticket";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { listChapterOptions } from "@/lib/chapters";
import { calendarDaysBetween, formatLocal, localDateKey } from "@/lib/dates";
import { googleCalendarUrl } from "@/lib/ics";
import { eventFor } from "@/lib/sessions/calendar-event";
import { getSessionForTutor, whoFor } from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";
import { RequestActions } from "../request-actions";
import { CancelSessionForm, CloseForm, MoveForm } from "./session-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.session");
  return { title: t("title") };
}

export default async function TutorSessionPage({
  params,
  searchParams,
}: PageProps<"/prof/seances/[id]">) {
  const t = await getTranslations("tutor.session");

  return (
    <div className="grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6">
      <PageHeader back={{ href: "/prof/seances", label: t("back") }} title={t("title")} />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <TutorSession params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function TutorSession({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireViewer("tutor");
  const [{ id }, query, t, tSession] = await Promise.all([
    params,
    searchParams,
    getTranslations("tutor.session"),
    getTranslations("session"),
  ]);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const now = new Date();
  const session = await getSessionForTutor(id, now);
  if (!session) notFound();

  const started = Date.parse(session.startsAt) <= now.getTime();
  const ahead = Date.parse(session.endsAt) >= now.getTime();
  const closable = started && ["planifiee", "terminee", "absent"].includes(session.status);
  const chapters = closable ? await listChapterOptions() : [];
  const event = eventFor(session, "tutor", (mode) => tSession(`mode.${mode}`));
  const place = session.location ?? tSession(`mode.${session.mode}`);
  // What the action that brought her here did, said once at the top of the page.
  const planned = Number(query.planifiee);
  const cancelledLater = Number(query.annulee);
  const banner =
    planned > 0
      ? t("planned", { count: planned })
      : query.reponse === "confirmee" && session.status === "planifiee"
        ? t("answeredConfirmed")
        : query.reponse === "refusee" && session.status === "refusee"
          ? t("answeredDeclined")
          : query.annulee !== undefined && session.status === "annulee"
            ? t("cancelled", { count: Number.isInteger(cancelledLater) ? cancelledLater : 0 })
            : null;
  const live = session.status === "planifiee" || session.status === "en_attente";
  const when =
    live && !started ? t("when", { count: calendarDaysBetween(now, session.startsAt) }) : null;
  const card = "grid gap-3 rounded-2xl border border-quadrillage bg-surface p-4 sm:p-5";

  return (
    <article className="grid gap-8">
      {banner ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-2xl bg-vert-fond px-4 py-3 text-vert-texte"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {banner}
        </p>
      ) : null}

      <SessionTicket
        startsAt={session.startsAt}
        endsAt={session.endsAt}
        status={session.status}
        statusLabel={tSession(`status.${session.status}`)}
        title={
          session.student ? (
            <Link
              href={`/prof/eleves/${session.student.id}`}
              className="underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              {session.student.name}
            </Link>
          ) : session.group ? (
            <Link
              href={`/prof/eleves/groupes/${session.group.id}`}
              className="underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
            >
              {session.group.name}
            </Link>
          ) : (
            whoFor(session)
          )
        }
        mode={session.mode}
        place={place}
        when={when}
        past={!ahead}
      >
        {session.mode === "en_ligne" && session.meetingUrl && ahead ? (
          <a
            href={session.meetingUrl}
            className={cn(buttonVariants({ size: "sm" }), "mt-1 justify-self-start")}
          >
            <Video aria-hidden="true" />
            {tSession("join")}
          </a>
        ) : null}
      </SessionTicket>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="grid min-w-0 gap-8">
          <dl className="grid gap-x-4 gap-y-2 rounded-2xl border border-quadrillage bg-surface p-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:p-5">
            <dt className="text-sm text-encre-douce">{t("type")}</dt>
            <dd>{session.type?.name}</dd>
            {session.mode === "en_ligne" && session.meetingUrl ? (
              <>
                <dt className="text-sm text-encre-douce">{t("where")}</dt>
                <dd>
                  <a
                    href={session.meetingUrl}
                    className="break-all underline decoration-trait underline-offset-4 hover:decoration-encre"
                  >
                    {session.meetingUrl}
                  </a>
                </dd>
              </>
            ) : null}
            {session.requested ? (
              <>
                <dt className="text-sm text-encre-douce">{t("requestedHeading")}</dt>
                <dd>{session.requestNote ? `« ${session.requestNote} »` : t("requestedNoNote")}</dd>
              </>
            ) : null}
            {session.seriesId ? (
              <>
                <dt className="text-sm text-encre-douce">{t("seriesHeading")}</dt>
                <dd>{t("series", { count: session.laterInSeries })}</dd>
              </>
            ) : null}
            {session.cancellationReason ? (
              <>
                <dt className="text-sm text-encre-douce">
                  {session.status === "refusee" ? t("declineReason") : t("cancelReason")}
                </dt>
                <dd>{session.cancellationReason}</dd>
              </>
            ) : null}
            {session.status === "annulee" ? (
              <>
                <dt className="text-sm text-encre-douce">{t("cancelledBy")}</dt>
                <dd>{session.cancelledByStudent ? t("byStudent") : t("byYou")}</dd>
              </>
            ) : null}
          </dl>

          {session.status === "en_attente" && !started ? (
            <section aria-labelledby="answer" className={cn(card, "border-encre")}>
              <h2 id="answer" tabIndex={-1} className="text-lg font-semibold">
                {t("answerHeading")}
              </h2>
              <RequestActions
                id={session.id}
                who={whoFor(session)}
                headingId="answer"
                back="session"
              />
            </section>
          ) : null}

          {closable ? (
            <section aria-labelledby="compte-rendu" className={card}>
              <h2 id="compte-rendu" className="scroll-mt-4 text-lg font-semibold">
                {session.status === "planifiee" ? t("closeHeading") : t("closedHeading")}
              </h2>
              <CloseForm
                id={session.id}
                isGroup={session.group !== null}
                chapters={chapters}
                members={session.attendance}
                initial={{
                  status: session.status === "absent" ? "absent" : "terminee",
                  chapterId: session.chapterId ?? "",
                  homework: session.homework ?? "",
                  recap: session.recap ?? "",
                }}
              />
            </section>
          ) : null}
        </div>

        <aside className="grid gap-6">
          {session.status === "planifiee" && !started ? (
            <section aria-labelledby="change" className={card}>
              <h2 id="change" className="text-lg font-semibold">
                {t("changeHeading")}
              </h2>
              <MoveForm
                id={session.id}
                initial={{
                  date: localDateKey(session.startsAt),
                  time: formatLocal(session.startsAt, "HH:mm"),
                  mode: session.mode,
                  location: session.location ?? "",
                  meetingUrl: session.meetingUrl ?? "",
                }}
              />
            </section>
          ) : null}

          {session.status === "planifiee" && ahead ? (
            <section aria-labelledby="diary" className={card}>
              <h2 id="diary" className="text-lg font-semibold">
                {t("calendarHeading")}
              </h2>
              <div className="grid gap-2">
                <a
                  href={`/agenda/${session.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
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

          {session.status === "planifiee" ? (
            <section aria-labelledby="cancel" className="grid gap-3 px-1">
              <h2 id="cancel" className="text-base font-semibold">
                {t("cancelHeading")}
              </h2>
              <CancelSessionForm id={session.id} laterInSeries={session.laterInSeries} />
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
