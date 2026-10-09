import { House, Info, MapPin, Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { requireViewer } from "@/lib/auth";
import { openSlots } from "@/lib/booking/slots";
import { formatLocal } from "@/lib/dates";
import { getBookingCalendar, listBookableTypes, type SessionMode } from "@/lib/sessions/queries";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { BookingForm } from "./booking-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.booking");
  return { title: t("title") };
}

export default async function BookingPage({ searchParams }: PageProps<"/eleve/seances/reserver">) {
  const t = await getTranslations("student.booking");

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-6">
      <PageHeader
        back={{ href: "/eleve/seances", label: t("back") }}
        title={t("title")}
        lead={t("lead")}
      />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Booking searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function one(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

/** A calendar date, read at noon so no offset can move it to another day. */
function day(date: string, pattern: string): string {
  return formatLocal(`${date}T12:00:00Z`, pattern);
}

const MODE_ICONS: Record<SessionMode, typeof House> = {
  domicile: House,
  chez_prof: MapPin,
  en_ligne: Video,
};

/** One step of the booking, numbered: the order is the one she follows. */
function Step({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="grid gap-3">
      <h2 id={id} className="flex items-center gap-3 text-lg font-semibold">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-encre text-sm text-papier tabular"
        >
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

async function Booking({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const viewer = await requireViewer("student");
  const [t, tMode, params] = await Promise.all([
    getTranslations("student.booking"),
    getTranslations("session.mode"),
    searchParams,
  ]);

  // Only an active student books (D-060); the database says the same.
  if (viewer.status !== "actif") {
    return (
      <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
        {t("paused")}
      </p>
    );
  }

  const now = new Date();
  const supabase = await createClient();
  const [types, calendar, settings] = await Promise.all([
    listBookableTypes(),
    getBookingCalendar(now),
    supabase
      .from("student_settings")
      .select("auto_confirm_bookings")
      .eq("student_id", viewer.id)
      .maybeSingle(),
  ]);
  const autoConfirm = settings.data?.auto_confirm_bookings ?? false;

  if (types.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
        {t("noTypes")}
      </p>
    );
  }
  const type = types.find((option) => option.id === one(params.type)) ?? types[0]!;
  const days = openSlots({
    sessionTypeId: type.id,
    durationMin: type.durationMin,
    windows: calendar.windows,
    exceptions: calendar.exceptions,
    busy: calendar.busy,
    rules: calendar.rules,
    now,
  });
  const open = days.filter((entry) => entry.slots.length > 0);
  const chosen =
    days.find((entry) => entry.date === one(params.jour) && entry.slots.length > 0) ?? open[0];
  const href = (typeId: string, date?: string) =>
    `/eleve/seances/reserver?type=${typeId}${date ? `&jour=${date}` : ""}`;

  // The days laid out as a month calendar, Monday first: blanks before the first day so each
  // date falls under its weekday.
  const weekday = (date: string) => (Number(day(date, "i")) + 6) % 7;
  const lead = days.length > 0 ? weekday(days[0]!.date) : 0;
  const weekdays = ["L", "M", "M", "J", "V", "S", "D"];
  const price = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

  return (
    <div className="grid gap-8">
      <p className="flex items-start gap-2 rounded-2xl bg-sunken px-4 py-3 text-sm">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {t("rules", {
          notice: calendar.rules.minNoticeHours,
          horizon: calendar.rules.horizonDays,
          window: calendar.rules.cancellationWindowHours,
        })}
      </p>

      <Step id="booking-type" number={1} title={t("typeHeading")}>
        <ul role="list" className="grid gap-2 sm:grid-cols-2">
          {types.map((option) => {
            const current = option.id === type.id;
            const Icon = MODE_ICONS[option.mode];
            return (
              <li key={option.id} className="grid">
                <Link
                  href={href(option.id)}
                  scroll={false}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border bg-surface p-4",
                    current
                      ? "border-encre ring-1 ring-encre"
                      : "border-quadrillage hover:border-trait",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      current ? "bg-encre text-papier" : "bg-sunken",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="grid min-w-0 gap-0.5">
                    <span className="font-medium break-words">{option.name}</span>
                    <span className="text-sm text-encre-douce tabular">
                      {t("typeDetails", {
                        duration: option.durationMin,
                        mode: tMode(option.mode),
                        price: price.format(option.price),
                      })}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Step>

      <Step id="booking-day" number={2} title={t("dayHeading")}>
        {open.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-5">
            {t("noSlotsAtAll", { days: calendar.rules.horizonDays })}
          </p>
        ) : (
          <div className="grid gap-2 sm:rounded-2xl sm:border sm:border-quadrillage sm:bg-surface sm:p-4">
            <p className="text-sm font-medium first-letter:uppercase">
              {t("range", {
                from: day(days[0]!.date, "d MMMM"),
                to: day(days[days.length - 1]!.date, "d MMMM"),
              })}
            </p>
            <div aria-hidden="true" className="grid grid-cols-7 gap-0.5 text-center sm:gap-1">
              {weekdays.map((letter, index) => (
                <span key={index} className="text-xs font-medium text-encre-douce">
                  {letter}
                </span>
              ))}
            </div>
            <ol role="list" className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {days.map((entry, index) => {
                const current = entry.date === chosen?.date;
                const count = entry.slots.length;
                const number = day(entry.date, "d");
                const firstOfMonth = number === "1";
                const full = day(entry.date, "EEEE d MMMM");
                // The month is written over its first day, never beside the figure.
                const month = firstOfMonth ? (
                  <span aria-hidden="true" className="text-[0.6rem] leading-none uppercase">
                    {day(entry.date, "MMM")}
                  </span>
                ) : null;
                return (
                  <li
                    key={entry.date}
                    className="grid"
                    style={index === 0 ? { gridColumnStart: lead + 1 } : undefined}
                  >
                    {count === 0 ? (
                      <span className="grid min-h-12 place-content-center gap-0.5 rounded-lg text-center text-encre-douce">
                        {month}
                        <span aria-hidden="true" className="text-sm tabular line-through">
                          {number}
                        </span>
                        <span className="sr-only">
                          {full}, {entry.open ? t("closed") : t("closedDay")}
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={href(type.id, entry.date)}
                        scroll={false}
                        aria-current={current ? "date" : undefined}
                        className={cn(
                          "grid min-h-12 min-w-11 place-content-center gap-0.5 rounded-lg border text-center",
                          current
                            ? "border-encre bg-encre text-papier"
                            : "border-trait bg-surface hover:border-encre",
                        )}
                      >
                        {month}
                        <span
                          aria-hidden="true"
                          className="text-sm leading-none font-semibold tabular"
                        >
                          {number}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "text-xs leading-none tabular",
                            current ? "" : "text-encre-douce",
                          )}
                        >
                          {count}
                        </span>
                        <span className="sr-only">
                          {full}, {t("slotCount", { count })}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="text-xs text-encre-douce">{t("calendarLegend")}</p>
          </div>
        )}
      </Step>

      {chosen ? (
        <Step id="booking-day-chosen" number={3} title={t("slotHeading")}>
          <p className="-mt-1 text-encre-douce first-letter:uppercase">
            {day(chosen.date, "EEEE d MMMM")}
          </p>
          <BookingForm
            key={`${type.id}/${chosen.date}`}
            typeId={type.id}
            autoConfirm={autoConfirm}
            slots={chosen.slots.map((slot) => ({
              startsAt: slot.startsAt.toISOString(),
              endsAt: slot.endsAt.toISOString(),
            }))}
          />
        </Step>
      ) : null}
    </div>
  );
}
