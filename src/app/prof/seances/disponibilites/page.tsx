import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { formatLocal, localDateKey } from "@/lib/dates";
import { getBookingRules } from "@/lib/sessions/queries";
import { createClient } from "@/lib/supabase/server";
import { AddExceptionForm, AddWindowForm, RemoveButton, RulesForm } from "./availability-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.availability");
  return { title: t("title") };
}

export default async function AvailabilityPage() {
  const t = await getTranslations("tutor.availability");

  return (
    <div className="grid max-w-5xl gap-6">
      <Link
        href="/prof/seances"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="max-w-prose text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Availability />
      </Suspense>
    </div>
  );
}

/** A calendar date, read at noon so no offset can move it to another day. */
function dateLabel(date: string, pattern: string): string {
  return formatLocal(`${date}T12:00:00Z`, pattern);
}

async function Availability() {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.availability");
  const supabase = await createClient();
  const today = localDateKey(new Date());

  const [windowsResult, exceptionsResult, typesResult, rules] = await Promise.all([
    supabase
      .from("availability")
      .select("id, weekday, start_time, end_time, session_type_id")
      .order("weekday")
      .order("start_time"),
    supabase
      .from("availability_exceptions")
      .select("id, starts_on, ends_on, is_blocked, start_time, end_time, session_type_id, note")
      .gte("ends_on", today)
      .order("starts_on")
      .order("start_time"),
    supabase
      .from("session_types")
      .select("id, name")
      .eq("is_active", true)
      .eq("is_group", false)
      .order("name"),
    getBookingRules(supabase),
  ]);
  if (windowsResult.error || exceptionsResult.error || typesResult.error) {
    throw new Error("Could not read the availability", {
      cause: windowsResult.error ?? exceptionsResult.error ?? typesResult.error,
    });
  }

  const types = typesResult.data;
  const typeName = (id: string | null) =>
    id ? (types.find((type) => type.id === id)?.name ?? t("inactiveType")) : t("allTypes");
  const hhmm = (value: string | null) => (value ?? "").slice(0, 5);
  const windows = windowsResult.data;
  const exceptions = exceptionsResult.data;

  return (
    <div className="grid gap-12">
      <section
        aria-labelledby="weekly-hours"
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"
      >
        <div className="grid gap-3">
          <h2 id="weekly-hours" tabIndex={-1} className="text-lg font-medium">
            {t("weeklyHeading")}
          </h2>
          {windows.length === 0 ? (
            <p className="rounded-md border border-dashed border-trait px-4 py-4">
              {t("noWindows")}
            </p>
          ) : null}
          <dl className="divide-y divide-quadrillage border-y border-quadrillage">
            {([1, 2, 3, 4, 5, 6, 7] as const).map((day) => {
              const ofDay = windows.filter((window) => window.weekday === day);
              return (
                <div key={day} className="grid gap-1 py-2 sm:grid-cols-[8rem_1fr] sm:items-start">
                  <dt className="min-h-11 content-center font-medium">{t(`days.${day}`)}</dt>
                  <dd>
                    {ofDay.length === 0 ? (
                      <p className="min-h-11 content-center text-sm text-encre-douce">
                        {t("closedDay")}
                      </p>
                    ) : (
                      <ul role="list" className="grid gap-1">
                        {ofDay.map((window) => {
                          const range = `${hhmm(window.start_time)} – ${hhmm(window.end_time)}`;
                          return (
                            <li
                              key={window.id}
                              className="flex flex-wrap items-center justify-between gap-x-3"
                            >
                              <span>
                                <span className="font-medium tabular">{range}</span>
                                <span className="text-sm text-encre-douce">
                                  {" "}
                                  · {typeName(window.session_type_id)}
                                </span>
                              </span>
                              <RemoveButton
                                id={window.id}
                                kind="window"
                                headingId="weekly-hours"
                                label={t("removeWindowLabel", {
                                  day: t(`days.${day}`).toLowerCase(),
                                  range,
                                })}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
        <section
          aria-labelledby="add-window"
          className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
        >
          <h3 id="add-window" className="text-base font-semibold">
            {t("addWindowHeading")}
          </h3>
          <AddWindowForm types={types} />
        </section>
      </section>

      <section
        aria-labelledby="exceptions"
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"
      >
        <div className="grid gap-3">
          <h2 id="exceptions" tabIndex={-1} className="text-lg font-medium">
            {t("exceptionsHeading")}
          </h2>
          {exceptions.length === 0 ? (
            <p className="text-encre-douce">{t("noExceptions")}</p>
          ) : (
            <ul role="list" className="divide-y divide-quadrillage border-y border-quadrillage">
              {exceptions.map((exception) => {
                const days =
                  exception.starts_on === exception.ends_on
                    ? dateLabel(exception.starts_on, "EEEE d MMMM")
                    : t("dateRange", {
                        from: dateLabel(exception.starts_on, "EEEE d MMMM"),
                        to: dateLabel(exception.ends_on, "EEEE d MMMM"),
                      });
                const hours = exception.start_time
                  ? `${hhmm(exception.start_time)} – ${hhmm(exception.end_time)}`
                  : t("allDay");
                const what = exception.is_blocked
                  ? t("blocked")
                  : t("opening", { type: typeName(exception.session_type_id) });
                return (
                  <li
                    key={exception.id}
                    className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3"
                  >
                    <div className="grid gap-0.5">
                      <p className="font-medium first-letter:uppercase">{days}</p>
                      <p className="text-sm text-encre-douce">
                        {[hours, what, exception.note].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <RemoveButton
                      id={exception.id}
                      kind="exception"
                      headingId="exceptions"
                      label={t("removeExceptionLabel", { days })}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <section
          aria-labelledby="add-exception"
          className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
        >
          <h3 id="add-exception" className="text-base font-semibold">
            {t("addExceptionHeading")}
          </h3>
          <AddExceptionForm types={types} today={today} />
        </section>
      </section>

      <section aria-labelledby="booking-rules" className="grid max-w-md gap-4">
        <h2 id="booking-rules" className="text-lg font-medium">
          {t("rulesHeading")}
        </h2>
        <RulesForm rules={rules} />
      </section>
    </div>
  );
}
