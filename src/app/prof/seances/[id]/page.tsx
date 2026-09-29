import { CalendarPlus, Check, Download, MapPin, Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { listChapterOptions } from "@/lib/chapters";
import { formatLocal, localDateKey } from "@/lib/dates";
import { googleCalendarUrl } from "@/lib/ics";
import { eventFor } from "@/lib/sessions/calendar-event";
import { getSessionForTutor, whoFor } from "@/lib/sessions/queries";
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
    <div className="grid max-w-3xl gap-6">
      <Link
        href="/prof/seances"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
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

  return (
    <article className="grid gap-8">
      {banner ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-md border border-quadrillage bg-sunken px-3 py-2.5"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {banner}
        </p>
      ) : null}

      <header className="grid gap-2">
        <h1 className="text-xl font-semibold">
          {session.student ? (
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
          )}
        </h1>
        <p className="text-2xl font-semibold tabular">
          {formatLocal(session.startsAt, "HH:mm")} – {formatLocal(session.endsAt, "HH:mm")}
        </p>
        <p className="text-lg first-letter:uppercase">
          {formatLocal(session.startsAt, "EEEE d MMMM yyyy")}
        </p>
        <div className="justify-self-start">
          <SessionStatusChip status={session.status} label={tSession(`status.${session.status}`)} />
        </div>
      </header>

      <dl className="grid gap-3 border-y border-quadrillage py-4 sm:grid-cols-[10rem_1fr]">
        <dt className="text-sm text-encre-douce">{t("type")}</dt>
        <dd>{session.type?.name}</dd>
        <dt className="text-sm text-encre-douce">{t("where")}</dt>
        <dd className="flex items-start gap-2">
          {session.mode === "en_ligne" ? (
            <Video aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          ) : (
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          )}
          <span>
            {place}
            {session.mode === "en_ligne" && session.meetingUrl ? (
              <>
                {" · "}
                <a
                  href={session.meetingUrl}
                  className="break-all underline decoration-trait underline-offset-4 hover:decoration-encre"
                >
                  {session.meetingUrl}
                </a>
              </>
            ) : null}
          </span>
        </dd>
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
        <section aria-labelledby="answer" className="grid gap-3">
          <h2 id="answer" tabIndex={-1} className="text-lg font-medium">
            {t("answerHeading")}
          </h2>
          <RequestActions id={session.id} who={whoFor(session)} headingId="answer" back="session" />
        </section>
      ) : null}

      {closable ? (
        <section aria-labelledby="compte-rendu" className="grid gap-3">
          <h2 id="compte-rendu" className="scroll-mt-4 text-lg font-medium">
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

      {session.status === "planifiee" && !started ? (
        <section aria-labelledby="change" className="grid gap-3">
          <h2 id="change" className="text-lg font-medium">
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
        <section aria-labelledby="diary" className="grid gap-3">
          <h2 id="diary" className="text-lg font-medium">
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

      {session.status === "planifiee" ? (
        <section aria-labelledby="cancel" className="grid gap-3">
          <h2 id="cancel" className="text-lg font-medium">
            {t("cancelHeading")}
          </h2>
          <CancelSessionForm id={session.id} laterInSeries={session.laterInSeries} />
        </section>
      ) : null}
    </article>
  );
}
