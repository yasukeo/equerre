"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { textField, type FormState } from "@/lib/form-state";
import { MAX_REASON_LENGTH, MAX_REQUEST_NOTE_LENGTH } from "@/lib/sessions/limits";
import { sendSessionEmail, tutorRecipient, type NoticeSession } from "@/lib/sessions/notify";
import { createClient } from "@/lib/supabase/server";

// A student requests a session and cancels one (DECISIONS.md, D-075). Every rule is checked by
// public.request_session and public.cancel_my_session; this only turns their answers into
// sentences and sends the emails.

const REQUEST_ERRORS = [
  "not_allowed",
  "type_invalid",
  "too_soon",
  "too_far",
  "slot_closed",
  "slot_taken",
  "too_many_requests",
  "too_many_bookings",
  "too_many_today",
] as const;

/** Answers that mean the times on her page are out of date: it is drawn again. */
const STALE = ["too_soon", "too_far", "slot_closed", "slot_taken", "type_invalid"];

const CANCEL_ERRORS = ["not_allowed", "session_not_found", "not_cancellable", "too_late"] as const;

function known<Code extends string>(codes: readonly Code[], message: string | undefined) {
  return codes.find((code) => code === message) ?? null;
}

async function noticeFor(id: string, who: string): Promise<NoticeSession | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sessions")
    .select(
      "id, starts_at, ends_at, status, mode, location, meeting_url, session_type:session_types(name)",
    )
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  return {
    id: data.id,
    startsAt: data.starts_at,
    endsAt: data.ends_at,
    typeName: data.session_type?.name ?? "",
    mode: data.mode,
    location: data.location,
    meetingUrl: data.meeting_url,
    who,
  };
}

export async function requestSession(_previous: FormState, formData: FormData): Promise<FormState> {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.booking");
  const typeId = z.uuid().safeParse(textField(formData, "typeId"));
  const startsAt = z.iso.datetime({ offset: true }).safeParse(textField(formData, "startsAt"));
  const note = textField(formData, "note").trim();
  if (!typeId.success) return { status: "error", message: t("errors.type_invalid") };
  if (!startsAt.success) return { status: "error", message: t("errors.pickSlot") };
  if (note.length > MAX_REQUEST_NOTE_LENGTH) {
    return { status: "error", message: t("errors.noteTooLong"), values: { note } };
  }

  const supabase = await createClient();
  const { data: id, error } = await supabase.rpc("request_session", {
    p_session_type_id: typeId.data,
    p_starts_at: startsAt.data,
    p_note: note,
  });
  if (error || !id) {
    // A confirmed booking racing the tutor's own planning meets the exclusion constraint.
    const code = error?.code === "23P01" ? "slot_taken" : known(REQUEST_ERRORS, error?.message);
    if (code && STALE.includes(code)) refresh();
    return {
      status: "error",
      message: code ? t(`errors.${code}`) : t("errors.unknown"),
      values: { note },
    };
  }

  const { data: created } = await supabase.from("sessions").select("status").eq("id", id).single();
  const booked = created?.status === "planifiee";
  const [session, tutor] = await Promise.all([noticeFor(id, viewer.fullName), tutorRecipient()]);
  if (session) {
    const { data: me } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", viewer.id)
      .single();
    await Promise.all([
      tutor
        ? sendSessionEmail({ kind: booked ? "booked" : "requested", to: tutor, session, note })
        : null,
      booked && me?.email
        ? sendSessionEmail({
            kind: "confirmed",
            to: { email: me.email, name: viewer.fullName },
            session,
          })
        : null,
    ]);
  }

  refresh();
  redirect(`/eleve/seances/${id}?${booked ? "reservee" : "demandee"}=1`);
}

export async function cancelMySession(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.session");
  const id = z.uuid().safeParse(textField(formData, "id"));
  const reason = textField(formData, "reason").trim();
  if (!id.success) return { status: "error", message: t("errors.session_not_found") };
  if (reason.length > MAX_REASON_LENGTH) {
    return { status: "error", message: t("errors.reasonTooLong"), values: { reason } };
  }

  const supabase = await createClient();
  // What it cancelled, as the database found it under lock: a request the tutor confirmed a
  // moment ago is a confirmed session, and she hears of it.
  const { data: was, error } = await supabase.rpc("cancel_my_session", {
    p_session_id: id.data,
    p_reason: reason,
  });
  if (error) {
    const code = known(CANCEL_ERRORS, error.message);
    if (code === "not_cancellable" || code === "too_late") refresh();
    return {
      status: "error",
      message: code ? t(`errors.${code}`) : t("errors.unknown"),
      values: { reason },
    };
  }

  // A request withdrawn simply leaves her list; a confirmed session was in her diary.
  if (was === "planifiee") {
    const [session, tutor] = await Promise.all([
      noticeFor(id.data, viewer.fullName),
      tutorRecipient(),
    ]);
    if (session && tutor) {
      await sendSessionEmail({
        kind: "cancelledByStudent",
        to: tutor,
        session,
        reason: reason || null,
      });
    }
  }

  // The page comes back with the session cancelled and says so where she will read it.
  refresh();
  redirect(`/eleve/seances/${id.data}?${was === "en_attente" ? "retiree" : "annulee"}=1`);
}
