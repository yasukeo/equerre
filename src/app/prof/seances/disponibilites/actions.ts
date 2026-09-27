"use server";

import { refresh } from "next/cache";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { isDateKey } from "@/lib/sessions/calendar-views";
import { minutesOf } from "@/lib/booking/slots";
import { localDateKey, localDateTimeToUtc } from "@/lib/dates";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import { MAX_EXCEPTION_NOTE_LENGTH } from "@/lib/sessions/limits";
import { createClient } from "@/lib/supabase/server";

// The tutor's hours, exceptions and booking rules (DECISIONS.md, D-073). Times are Casablanca
// wall-clock times, stored as such and converted date by date.

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
const date = z.string().refine(isDateKey);
const typeId = z.union([z.literal(""), z.uuid()]);

const windowSchema = z
  .object({ weekday: z.coerce.number().int().min(1).max(7), start: time, end: time, typeId })
  .refine((value) => minutesOf(value.start) < minutesOf(value.end), { path: ["end"] });

export async function addWindow(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.availability"),
    getTranslations("forms"),
  ]);
  const values = {
    weekday: textField(formData, "weekday"),
    start: textField(formData, "start"),
    end: textField(formData, "end"),
    typeId: textField(formData, "typeId"),
  };
  const parsed = windowSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        weekday: t("errors.weekday"),
        start: t("errors.time"),
        end: t("errors.endAfterStart"),
        typeId: t("errors.type"),
      }),
      values,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("availability").insert({
    weekday: parsed.data.weekday,
    start_time: parsed.data.start,
    end_time: parsed.data.end,
    session_type_id: parsed.data.typeId || null,
  });
  if (error) {
    return {
      status: "error",
      message: error.code === "23503" ? t("errors.type") : t("errors.unknown"),
      values,
    };
  }
  refresh();
  return { status: "success", message: t("windowAdded"), values };
}

export async function removeWindow(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.availability");
  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  const { error } = await supabase.from("availability").delete().eq("id", id.data);
  if (error) return { status: "error", message: t("errors.unknown") };
  refresh();
  return { status: "success", message: t("windowRemoved") };
}

const exceptionSchema = z
  .object({
    kind: z.enum(["days", "hours", "opening"]),
    startsOn: date,
    endsOn: z.union([z.literal(""), date]),
    start: z.union([z.literal(""), time]),
    end: z.union([z.literal(""), time]),
    typeId,
    note: z.string().trim().max(MAX_EXCEPTION_NOTE_LENGTH),
  })
  .transform((value) => ({
    ...value,
    // An opening is one date; blocked days may run over several.
    endsOn: value.kind === "opening" || value.endsOn === "" ? value.startsOn : value.endsOn,
  }))
  .refine((value) => value.kind === "days" || value.start !== "", { path: ["start"] })
  .refine(
    (value) =>
      value.kind === "days" ||
      (value.end !== "" && value.start !== "" && minutesOf(value.start) < minutesOf(value.end)),
    { path: ["end"] },
  )
  .refine((value) => value.endsOn >= value.startsOn, { path: ["endsOn"] })
  .refine(
    (value) =>
      Date.parse(`${value.endsOn}T12:00:00Z`) - Date.parse(`${value.startsOn}T12:00:00Z`) <=
      366 * 24 * 3_600_000,
    { path: ["endsOn"] },
  );

export async function addException(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.availability"),
    getTranslations("forms"),
  ]);
  const values = {
    kind: textField(formData, "kind"),
    startsOn: textField(formData, "startsOn"),
    endsOn: textField(formData, "endsOn"),
    start: textField(formData, "start"),
    end: textField(formData, "end"),
    typeId: textField(formData, "typeId"),
    note: textField(formData, "note"),
  };
  const parsed = exceptionSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        kind: t("errors.kind"),
        startsOn: t("errors.date"),
        endsOn: t("errors.endsOn"),
        start: t("errors.time"),
        end: t("errors.endAfterStart"),
        typeId: t("errors.type"),
        note: t("errors.note"),
      }),
      values,
    };
  }
  const exception = parsed.data;
  if (exception.endsOn < localDateKey(new Date())) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: { [exception.kind === "days" ? "endsOn" : "startsOn"]: t("errors.past") },
      values,
    };
  }

  const supabase = await createClient();
  const blocked = exception.kind !== "opening";
  const { error } = await supabase.from("availability_exceptions").insert({
    starts_on: exception.startsOn,
    ends_on: exception.endsOn,
    is_blocked: blocked,
    start_time: exception.kind === "days" ? null : exception.start,
    end_time: exception.kind === "days" ? null : exception.end,
    session_type_id: blocked ? null : exception.typeId || null,
    note: exception.note || null,
  });
  if (error) {
    return {
      status: "error",
      message: error.code === "23503" ? t("errors.type") : t("errors.unknown"),
      values,
    };
  }

  // Blocking a period leaves the sessions already in it where they are: she is told how many.
  let inside = 0;
  if (blocked) {
    const from = localDateTimeToUtc(
      exception.startsOn,
      exception.kind === "days" ? "00:00" : exception.start,
    );
    const to =
      exception.kind === "days"
        ? new Date(localDateTimeToUtc(exception.endsOn, "23:59").getTime() + 60_000)
        : localDateTimeToUtc(exception.endsOn, exception.end);
    // Only what is still to come: a session of this week already held is closed, not moved.
    const { data } = await supabase
      .from("sessions")
      .select("starts_at, ends_at")
      .in("status", ["planifiee", "en_attente"])
      .lt("starts_at", to.toISOString())
      .gt("ends_at", from.toISOString())
      .gt("starts_at", new Date().toISOString());
    // Blocked hours repeat on each day of the range: count what meets them on its own day.
    inside = (data ?? []).filter((session) => {
      if (exception.kind === "days") return true;
      const day = localDateKey(session.starts_at);
      const blockStart = localDateTimeToUtc(day, exception.start).getTime();
      const blockEnd = localDateTimeToUtc(day, exception.end).getTime();
      return Date.parse(session.starts_at) < blockEnd && blockStart < Date.parse(session.ends_at);
    }).length;
  }

  refresh();
  return {
    status: "success",
    message: blocked ? t("blockAdded", { count: inside }) : t("openingAdded"),
  };
}

export async function removeException(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.availability");
  const id = z.uuid().safeParse(textField(formData, "id"));
  if (!id.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  const { error } = await supabase.from("availability_exceptions").delete().eq("id", id.data);
  if (error) return { status: "error", message: t("errors.unknown") };
  refresh();
  return { status: "success", message: t("exceptionRemoved") };
}

const hours = z.coerce.number().int().min(0).max(168);
const rulesSchema = z.object({
  minNoticeHours: hours,
  horizonDays: z.coerce.number().int().min(1).max(120),
  cancellationWindowHours: hours,
});

export async function saveRules(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.availability"),
    getTranslations("forms"),
  ]);
  const values = {
    minNoticeHours: textField(formData, "minNoticeHours"),
    horizonDays: textField(formData, "horizonDays"),
    cancellationWindowHours: textField(formData, "cancellationWindowHours"),
  };
  const parsed = rulesSchema.safeParse(
    Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim() || "x"])),
  );
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        minNoticeHours: t("errors.hours"),
        horizonDays: t("errors.days"),
        cancellationWindowHours: t("errors.hours"),
      }),
      values,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("booking_settings")
    .update({
      min_notice_hours: parsed.data.minNoticeHours,
      horizon_days: parsed.data.horizonDays,
      cancellation_window_hours: parsed.data.cancellationWindowHours,
    })
    .eq("id", true)
    .select("id");
  if (error || data.length === 0) {
    return { status: "error", message: t("errors.unknown"), values };
  }
  refresh();
  return { status: "success", message: t("rulesSaved"), values };
}
