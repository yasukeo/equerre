import Link from "next/link";
import { SessionStatusChip } from "@/components/session-status";
import { formatLocal, localMinutesOfDay } from "@/lib/dates";
import { whoFor, type Session } from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";

const PX_PER_HOUR = 52;
const MIN_BLOCK = 30;

/** A calendar date, read at noon so no offset can move it to another day. */
function day(date: string, pattern: string): string {
  return formatLocal(`${date}T12:00:00Z`, pattern);
}

type Placed = { session: Session; start: number; end: number; lane: number; lanes: number };

/**
 * Sessions of one day side by side when they overlap: each takes the first free lane, and a
 * run of overlapping sessions shares the width between its lanes.
 */
function place(sessions: Session[]): Placed[] {
  const sorted = [...sessions].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const placed: Placed[] = [];
  let run: Placed[] = [];
  let runEnd = -1;
  const close = () => {
    const lanes = Math.max(...run.map((entry) => entry.lane)) + 1;
    for (const entry of run) entry.lanes = lanes;
    run = [];
  };
  for (const session of sorted) {
    const start = localMinutesOfDay(session.startsAt);
    const rawEnd = localMinutesOfDay(session.endsAt);
    // A session past midnight is drawn to the end of its first day.
    const end = rawEnd > start ? rawEnd : 24 * 60;
    if (run.length > 0 && start >= runEnd) close();
    const taken = new Set(run.filter((entry) => entry.end > start).map((entry) => entry.lane));
    let lane = 0;
    while (taken.has(lane)) lane++;
    const entry = { session, start, end, lane, lanes: 1 };
    run.push(entry);
    placed.push(entry);
    runEnd = Math.max(runEnd, end);
  }
  if (run.length > 0) close();
  return placed;
}

/**
 * The week as seven columns on one graduated ruler of hours (D-104): a session sits at its
 * hour and takes the room of its length. Each day is an ordinary list underneath, in time
 * order, so assistive technology reads it as one.
 */
export function WeekGrid({
  days,
  today,
  now,
  byDay,
  todayMark,
  statusLabel,
  dayHref,
}: {
  days: string[];
  today: string;
  now: Date;
  byDay: Map<string, Session[]>;
  todayMark: string;
  statusLabel: (session: Session) => string;
  dayHref: (key: string) => string;
}) {
  const all = days.flatMap((key) => byDay.get(key) ?? []);
  const starts = all.map((session) => localMinutesOfDay(session.startsAt));
  const ends = all.map((session) => {
    const end = localMinutesOfDay(session.endsAt);
    return end > localMinutesOfDay(session.startsAt) ? end : 24 * 60;
  });
  // Her working day at least, stretched to whatever the week holds.
  const firstHour = Math.min(8, ...starts.map((minutes) => Math.floor(minutes / 60)));
  const lastHour = Math.min(24, Math.max(20, ...ends.map((minutes) => Math.ceil(minutes / 60))));
  const hours = Array.from({ length: lastHour - firstHour + 1 }, (_, index) => firstHour + index);
  const height = (lastHour - firstHour) * PX_PER_HOUR;
  const y = (minutes: number) => ((minutes - firstHour * 60) / 60) * PX_PER_HOUR;
  const nowMinutes = localMinutesOfDay(now);
  const showNow =
    days.includes(today) && nowMinutes >= firstHour * 60 && nowMinutes <= lastHour * 60;

  return (
    <div className="overflow-hidden rounded-2xl border border-quadrillage bg-surface">
      <div className="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] border-b border-quadrillage">
        <span aria-hidden="true" />
        {days.map((key) => (
          <Link
            key={key}
            href={dayHref(key)}
            className="grid min-h-14 content-center justify-items-center gap-0.5 border-s border-quadrillage px-1 py-2 hover:bg-sunken"
          >
            <span className="text-xs text-encre-douce capitalize">{day(key, "EEE")}</span>
            <span
              className={cn(
                "text-lg leading-none font-semibold tabular",
                // The highlighter marks where she is, under the figure: it never carries text.
                key === today && "underline decoration-surligneur decoration-4 underline-offset-4",
              )}
            >
              {day(key, "d")}
            </span>
            <span className="sr-only">
              {day(key, "EEEE d MMMM")}
              {key === today ? `, ${todayMark}` : ""}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))]" style={{ height }}>
        <div aria-hidden="true" className="relative">
          {hours.slice(0, -1).map((hour) => (
            <span
              key={hour}
              className="absolute end-2 -translate-y-1/2 text-xs text-encre-douce tabular first:translate-y-0"
              style={{ top: y(hour * 60) }}
            >
              {String(hour).padStart(2, "0")}:00
            </span>
          ))}
        </div>
        {days.map((key) => {
          const placed = place(byDay.get(key) ?? []);
          return (
            <div
              key={key}
              className={cn(
                "relative border-s border-quadrillage",
                key === today && "bg-lavis-bleu/40",
              )}
            >
              {hours.slice(1, -1).map((hour) => (
                <span
                  key={hour}
                  aria-hidden="true"
                  className="absolute inset-x-0 h-px bg-quadrillage/70"
                  style={{ top: y(hour * 60) }}
                />
              ))}
              {key === today && showNow ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 z-10 h-0.5 bg-stylo-rouge before:absolute before:-start-1 before:-top-[3px] before:size-2 before:rounded-full before:bg-stylo-rouge"
                  style={{ top: y(nowMinutes) }}
                />
              ) : null}
              <ol role="list" aria-label={day(key, "EEEE d MMMM")} className="absolute inset-0">
                {placed.map(({ session, start, end, lane, lanes }) => {
                  const pending = session.status === "en_attente";
                  const done = session.status === "terminee" || session.status === "absent";
                  return (
                    <li
                      key={session.id}
                      className="absolute px-0.5"
                      style={{
                        top: y(start) + 1,
                        height: Math.max(((end - start) / 60) * PX_PER_HOUR - 2, MIN_BLOCK),
                        insetInlineStart: `${(lane / lanes) * 100}%`,
                        width: `${100 / lanes}%`,
                      }}
                    >
                      <Link
                        href={`/prof/seances/${session.id}`}
                        className={cn(
                          "flex h-full flex-col gap-0.5 overflow-hidden rounded-md border border-s-[3px] px-1.5 py-1 text-xs hover:z-20 hover:shadow-sm",
                          pending
                            ? "border-dashed border-trait border-s-trait bg-surface"
                            : done
                              ? "border-quadrillage border-s-trait bg-sunken text-encre-douce"
                              : "border-quadrillage border-s-encre bg-surface",
                        )}
                      >
                        <span className="font-semibold tabular">
                          {formatLocal(session.startsAt, "HH:mm")}
                          <span className="sr-only"> – {formatLocal(session.endsAt, "HH:mm")}</span>
                        </span>
                        <span className="truncate font-medium">{whoFor(session)}</span>
                        {session.type ? (
                          <span className="truncate text-encre-douce">{session.type.name}</span>
                        ) : null}
                        {session.status !== "planifiee" ? (
                          <span className="mt-auto">
                            <SessionStatusChip
                              status={session.status}
                              label={statusLabel(session)}
                            />
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
