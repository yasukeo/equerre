import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { openSlots } from "@/lib/booking/slots";
import { formatLocal } from "@/lib/dates";
import { getBookingCalendar, listBookableTypes } from "@/lib/sessions/queries";
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
    <div className="mx-auto grid max-w-2xl gap-6 [&>*]:min-w-0">
      <Link
        href="/eleve/seances"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
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
    return <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("paused")}</p>;
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
    return <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("noTypes")}</p>;
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

  return (
    <div className="grid gap-8 [&>*]:min-w-0">
      <p className="text-sm text-encre-douce">
        {t("rules", {
          notice: calendar.rules.minNoticeHours,
          horizon: calendar.rules.horizonDays,
          window: calendar.rules.cancellationWindowHours,
        })}
      </p>

      <section aria-labelledby="booking-type" className="grid gap-3">
        <h2 id="booking-type" className="text-lg font-medium">
          {t("typeHeading")}
        </h2>
        <ul role="list" className="grid gap-2">
          {types.map((option) => {
            const current = option.id === type.id;
            return (
              <li key={option.id}>
                <Link
                  href={href(option.id)}
                  scroll={false}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "grid min-h-16 gap-0.5 rounded-md border px-4 py-3",
                    current
                      ? "border-encre bg-surface ring-1 ring-encre"
                      : "border-quadrillage bg-surface hover:border-trait",
                  )}
                >
                  <span className="font-medium">{option.name}</span>
                  <span className="text-sm text-encre-douce tabular">
                    {t("typeDetails", {
                      duration: option.durationMin,
                      mode: tMode(option.mode),
                      price: new Intl.NumberFormat("fr", { maximumFractionDigits: 2 }).format(
                        option.price,
                      ),
                    })}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="booking-day" className="grid gap-3">
        <h2 id="booking-day" className="text-lg font-medium">
          {t("dayHeading")}
        </h2>
        {open.length === 0 ? (
          <p className="rounded-md border border-dashed border-trait px-4 py-5">
            {t("noSlotsAtAll", { days: calendar.rules.horizonDays })}
          </p>
        ) : (
          <ul
            role="list"
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {days.map((entry) => {
              const current = entry.date === chosen?.date;
              const label = day(entry.date, "EEE d MMM");
              const count = entry.slots.length;
              return (
                <li key={entry.date} className="snap-start">
                  {count === 0 ? (
                    <span className="grid min-h-16 w-20 content-center rounded-md border border-dashed border-quadrillage px-2 py-2 text-center text-encre-douce">
                      <span className="text-sm first-letter:uppercase">{label}</span>
                      <span className="text-xs">{entry.open ? t("closed") : t("closedDay")}</span>
                    </span>
                  ) : (
                    <Link
                      href={href(type.id, entry.date)}
                      scroll={false}
                      aria-current={current ? "date" : undefined}
                      className={cn(
                        "grid min-h-16 w-20 content-center rounded-md border px-2 py-2 text-center",
                        current
                          ? "border-encre bg-encre text-papier"
                          : "border-trait bg-surface hover:border-encre",
                      )}
                    >
                      <span className="text-sm font-medium first-letter:uppercase">{label}</span>
                      <span className={cn("text-xs", current ? "" : "text-encre-douce")}>
                        {t("slotCount", { count })}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {chosen ? (
        <section aria-labelledby="booking-day-chosen" className="grid gap-4">
          <h2 id="booking-day-chosen" className="text-base font-semibold first-letter:uppercase">
            {day(chosen.date, "EEEE d MMMM")}
          </h2>
          <BookingForm
            key={`${type.id}/${chosen.date}`}
            typeId={type.id}
            autoConfirm={autoConfirm}
            slots={chosen.slots.map((slot) => ({
              startsAt: slot.startsAt.toISOString(),
              endsAt: slot.endsAt.toISOString(),
            }))}
          />
        </section>
      ) : null}
    </div>
  );
}
