import { CalendarPlus, ClipboardList, Download, MapPin, Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SessionStatusChip } from "@/components/session-status";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { formatLocal, localDateKey, localDateKeyInDays } from "@/lib/dates";
import { listMyHomework } from "@/lib/homework/queries";
import { listMySessions, type Session } from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.sessions");
  return { title: t("agendaTitle") };
}

export default function StudentAgendaPage() {
  return (
    <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-3xl gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Agenda />
      </Suspense>
    </div>
  );
}

/** The most recent past sessions shown at once; the rest fold away. */
const SHOWN = 6;

type Entry =
  | { kind: "session"; at: string; session: Session }
  | { kind: "homework"; at: string; id: string; title: string; left: number; total: number };

async function Agenda() {
  const viewer = await requireViewer("student");
  const [t, tSession, tHomework] = await Promise.all([
    getTranslations("student.sessions"),
    getTranslations("session"),
    getTranslations("student.homework"),
  ]);
  const now = new Date();
  const [{ upcoming, past }, homework] = await Promise.all([
    listMySessions(now),
    listMyHomework(now),
  ]);

  // Sessions and homework due, on one calendar: what her week holds, day by day.
  const open = viewer.status !== "arrete";
  const entries: Entry[] = [
    ...upcoming.map((session) => ({ kind: "session" as const, at: session.startsAt, session })),
    ...homework
      .filter((entry) => open && entry.progress.left > 0 && Date.parse(entry.dueAt) >= now.getTime())
      .map((entry) => ({
        kind: "homework" as const,
        at: entry.dueAt,
        id: entry.id,
        title: entry.title,
        left: entry.progress.left,
        total: entry.progress.total,
      })),
  ].sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  const days = new Map<string, Entry[]>();
  for (const entry of entries) {
    const key = localDateKey(entry.at);
    days.set(key, [...(days.get(key) ?? []), entry]);
  }
  const today = localDateKey(now);
  const tomorrow = localDateKeyInDays(now, 1);
  const dayLabel = (key: string, sample: string) =>
    key === today
      ? t("today")
      : key === tomorrow
        ? t("tomorrow")
        : formatLocal(sample, "EEEE d MMMM");

  const sessionRow = (session: Session, ahead: boolean) => {
    const label =
      session.status === "en_attente" && !ahead
        ? t("unanswered")
        : tSession(`status.${session.status}`);
    const chip = session.status !== "planifiee" && session.status !== "terminee";
    return (
      <Link
        href={`/eleve/seances/${session.id}`}
        className={cn(
          "grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-3 rounded-2xl border border-s-4 border-quadrillage bg-surface p-3 hover:border-trait",
          ahead ? "border-s-bleu hover:border-s-bleu" : "border-s-quadrillage",
        )}
      >
        <span className="grid text-sm tabular">
          <span className="font-semibold">{formatLocal(session.startsAt, "HH:mm")}</span>
          <span className="text-encre-douce">{formatLocal(session.endsAt, "HH:mm")}</span>
        </span>
        <span className="grid min-w-0 gap-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="min-w-0 font-medium">
              {session.type?.name ?? tSession(`mode.${session.mode}`)}
            </span>
            {chip ? <SessionStatusChip status={session.status} label={label} /> : null}
          </span>
          <span className="flex min-w-0 items-start gap-1.5 text-sm text-encre-douce">
            {session.mode === "en_ligne" ? (
              <Video aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            ) : (
              <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            )}
            <span className="min-w-0">
              {[
                tSession(`mode.${session.mode}`),
                session.group?.name,
                !ahead && session.chapterTitle ? session.chapterTitle : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </span>
        </span>
      </Link>
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
          {t("agendaTitle")}
        </h1>
        {viewer.status === "actif" ? (
          <Link href="/eleve/seances/reserver" className={buttonVariants()}>
            <CalendarPlus aria-hidden="true" />
            {t("book")}
          </Link>
        ) : null}
      </div>
      {viewer.status === "en_pause" ? (
        <p className="rounded-2xl border border-dashed border-trait px-4 py-3">{t("paused")}</p>
      ) : null}

      <section aria-labelledby="agenda-upcoming" className="grid gap-5">
        <h2 id="agenda-upcoming" className="sr-only">
          {t("upcoming")}
        </h2>
        {days.size === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-6 text-encre-douce">
            {t("agendaEmpty")}
          </p>
        ) : (
          [...days.entries()].map(([key, dayEntries]) => (
            <div key={key} className="grid gap-2.5">
              <h3
                className={cn(
                  "flex items-center gap-3 text-sm font-semibold first-letter:uppercase",
                  key === today ? "text-encre" : "text-encre-douce",
                )}
              >
                {key === today ? (
                  <span className="rounded-sm bg-surligneur px-1.5 text-encre-fixe">
                    {dayLabel(key, dayEntries[0]!.at)}
                  </span>
                ) : (
                  <span className="first-letter:uppercase">{dayLabel(key, dayEntries[0]!.at)}</span>
                )}
                <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
              </h3>
              <ul role="list" className="grid gap-2">
                {dayEntries.map((entry) => (
                  <li key={entry.kind === "session" ? entry.session.id : `devoir-${entry.id}`}>
                    {entry.kind === "session" ? (
                      sessionRow(entry.session, true)
                    ) : (
                      <Link
                        href={`/eleve/devoirs/${entry.id}`}
                        className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-3 rounded-2xl border border-s-4 border-quadrillage border-s-rouge bg-surface p-3 hover:border-trait hover:border-s-rouge"
                      >
                        <span className="grid text-sm tabular">
                          <span className="font-semibold">{formatLocal(entry.at, "HH:mm")}</span>
                          <span className="text-xs text-encre-douce">{t("dueShort")}</span>
                        </span>
                        <span className="grid min-w-0 gap-0.5">
                          <span className="flex items-center gap-1.5 font-medium">
                            <ClipboardList aria-hidden="true" className="size-4 shrink-0 text-rouge" />
                            <span className="truncate">{entry.title}</span>
                          </span>
                          <span className="text-sm text-encre-douce">
                            {tHomework("left", { left: entry.left, total: entry.total })}
                          </span>
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
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
      </section>

      <section aria-labelledby="sessions-past" className="grid gap-3">
        <h2 id="sessions-past" className="flex items-center gap-3 text-lg font-semibold">
          {t("past")}
          <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
        </h2>
        {past.length === 0 ? (
          <p className="text-encre-douce">{t("noPast")}</p>
        ) : (
          <>
            <ul role="list" className="grid gap-2">
              {past.slice(0, SHOWN).map((session) => (
                <li key={session.id} className="grid gap-1">
                  <span className="text-xs text-encre-douce first-letter:uppercase">
                    {formatLocal(session.startsAt, "EEEE d MMMM")}
                  </span>
                  {sessionRow(session, false)}
                </li>
              ))}
            </ul>
            {past.length > SHOWN ? (
              <details>
                <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre">
                  {t("older", { count: past.length - SHOWN })}
                </summary>
                <ul role="list" className="mt-2 grid gap-2">
                  {past.slice(SHOWN).map((session) => (
                    <li key={session.id} className="grid gap-1">
                      <span className="text-xs text-encre-douce first-letter:uppercase">
                        {formatLocal(session.startsAt, "EEEE d MMMM")}
                      </span>
                      {sessionRow(session, false)}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
