import { CalendarPlus, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { listMySessions, type Session } from "@/lib/sessions/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.sessions");
  return { title: t("title") };
}

export default function StudentSessionsPage() {
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <StudentSessions />
      </Suspense>
    </div>
  );
}

/** The most recent past sessions shown at once; the rest fold away. */
const SHOWN = 8;

async function StudentSessions() {
  const viewer = await requireViewer("student");
  const [t, tSession] = await Promise.all([
    getTranslations("student.sessions"),
    getTranslations("session"),
  ]);
  const now = new Date();
  const { upcoming, past } = await listMySessions(now);

  const item = (session: Session, ahead: boolean) => {
    const label =
      session.status === "en_attente" && !ahead
        ? t("unanswered")
        : tSession(`status.${session.status}`);
    const chip = session.status !== "planifiee" && session.status !== "terminee";
    return (
      <li key={session.id}>
        <Link
          href={`/eleve/seances/${session.id}`}
          className="grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 py-3 hover:bg-sunken"
        >
          <span className="grid gap-0.5">
            <span className="font-medium first-letter:uppercase">
              {formatLocal(session.startsAt, "EEEE d MMMM")}
              <span className="ms-2 font-normal text-encre-douce tabular">
                {formatLocal(session.startsAt, "HH:mm")} – {formatLocal(session.endsAt, "HH:mm")}
              </span>
            </span>
            <span className="text-sm text-encre-douce">
              {[
                session.type?.name,
                session.group?.name,
                !ahead && session.chapterTitle ? session.chapterTitle : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </span>
          {chip ? <SessionStatusChip status={session.status} label={label} /> : <span />}
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        {viewer.status === "actif" ? (
          <Link href="/eleve/seances/reserver" className={buttonVariants()}>
            <CalendarPlus aria-hidden="true" />
            {t("book")}
          </Link>
        ) : null}
      </div>
      {viewer.status === "en_pause" ? (
        <p className="rounded-md border border-dashed border-trait px-4 py-3">{t("paused")}</p>
      ) : null}

      <section aria-labelledby="sessions-upcoming" className="grid gap-3">
        <h2 id="sessions-upcoming" className="text-lg font-medium">
          {t("upcoming")}
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-encre-douce">{t("noUpcoming")}</p>
        ) : (
          <>
            <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
              {upcoming.map((session) => item(session, true))}
            </ul>
            {/* A file from a route handler, not a page: a plain link downloads it. */}
            {upcoming.some((session) => session.status === "planifiee") ? (
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              <a
                href="/agenda/a-venir"
                className="inline-flex min-h-11 items-center gap-2 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
              >
                <Download aria-hidden="true" className="size-4" />
                {t("exportAll")}
              </a>
            ) : null}
          </>
        )}
      </section>

      <section aria-labelledby="sessions-past" className="grid gap-3">
        <h2 id="sessions-past" className="text-lg font-medium">
          {t("past")}
        </h2>
        {past.length === 0 ? (
          <p className="text-encre-douce">{t("noPast")}</p>
        ) : (
          <>
            <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
              {past.slice(0, SHOWN).map((session) => item(session, false))}
            </ul>
            {past.length > SHOWN ? (
              <details>
                <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre">
                  {t("older", { count: past.length - SHOWN })}
                </summary>
                <ul role="list" className="divide-y divide-quadrillage border-b border-quadrillage">
                  {past.slice(SHOWN).map((session) => item(session, false))}
                </ul>
              </details>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
