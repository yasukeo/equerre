import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { isoWeekday, openSlots, type WeeklyWindow } from "@/lib/booking/slots";
import { localDateKeyInDays, localDateTimeToUtc } from "@/lib/dates";
import { seedId, signedInAs, type Client } from "./clients";

// Bookings through the real API (DECISIONS.md, D-073 to D-075): what a student may read and
// ask for, checked by the database rather than by the page. Rayane and Yassine book, Imane's
// bookings are confirmed at once (seed), Adam is paused. Every row made here is removed.

const ids = {
  rayane: seedId("00000000", 103),
  imane: seedId("00000000", 104),
  yassine: seedId("00000000", 105),
  chezProf: seedId("50000000", 1),
  group: seedId("50000000", 4),
};

type Calendar = {
  settings: { cancellationWindowHours: number; minNoticeHours: number; horizonDays: number };
  windows: WeeklyWindow[];
  exceptions: Record<string, unknown>[];
  busy: { startsAt: string; endsAt: string }[];
};

async function calendarOf(client: Client): Promise<Calendar> {
  const now = new Date();
  const { data, error } = await client.rpc("booking_calendar", {
    p_from: now.toISOString(),
    p_to: new Date(now.getTime() + 60 * 86_400_000).toISOString(),
  });
  if (error) throw error;
  return data as unknown as Calendar;
}

/** The free slots of a 90-minute individual session, as the booking page offers them. */
function freeSlots(calendar: Calendar) {
  return openSlots({
    sessionTypeId: ids.chezProf,
    durationMin: 90,
    windows: calendar.windows,
    exceptions: calendar.exceptions as never,
    busy: calendar.busy.map((range) => ({
      startsAt: new Date(range.startsAt),
      endsAt: new Date(range.endsAt),
    })),
    rules: calendar.settings,
    now: new Date(),
  }).flatMap((day) => day.slots);
}

describe("bookings", () => {
  let tutor: Client;
  let rayane: Client;
  let yassine: Client;
  let imane: Client;
  let adam: Client;
  const made: string[] = [];
  let holiday = "";
  let blockedStart = "";
  let originalWindow = 24;

  beforeAll(async () => {
    [tutor, rayane, yassine, imane, adam] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("rayane.amrani@equerre.test"),
      signedInAs("yassine.bennani@equerre.test"),
      signedInAs("imane.chraibi@equerre.test"),
      signedInAs("adam.berrada@equerre.test"),
    ]);

    // Holidays two weeks from now, a whole week of them, and the booking horizon beyond.
    const from = localDateKeyInDays(new Date(), 14);
    const to = localDateKeyInDays(new Date(), 20);
    const { data, error } = await tutor
      .from("availability_exceptions")
      .insert({ starts_on: from, ends_on: to, note: "Test RLS — congés" })
      .select("id")
      .single();
    if (error || !data) throw error ?? new Error("could not block the week");
    holiday = data.id;

    // A time inside those holidays that the weekly hours would otherwise offer.
    const { data: windows } = await tutor
      .from("availability")
      .select("weekday, start_time")
      .is("session_type_id", null);
    for (let day = 14; day <= 20 && !blockedStart; day++) {
      const date = localDateKeyInDays(new Date(), day);
      const window = windows?.find((entry) => entry.weekday === isoWeekday(date));
      if (window)
        blockedStart = localDateTimeToUtc(date, window.start_time.slice(0, 5)).toISOString();
    }

    const { data: settings } = await tutor
      .from("booking_settings")
      .select("cancellation_window_hours")
      .single();
    originalWindow = settings?.cancellation_window_hours ?? 24;
  });

  afterAll(async () => {
    if (made.length > 0) await tutor.from("sessions").delete().in("id", made);
    if (holiday) await tutor.from("availability_exceptions").delete().eq("id", holiday);
    await tutor
      .from("booking_settings")
      .update({ cancellation_window_hours: originalWindow })
      .eq("id", true);
  });

  it("keeps the tutor's hours and notes from students, and gives them only times", async () => {
    const { data: windows } = await rayane.from("availability").select("id");
    const { data: exceptions } = await rayane.from("availability_exceptions").select("id, note");
    expect(windows).toEqual([]);
    expect(exceptions).toEqual([]);

    const calendar = await calendarOf(rayane);
    expect(calendar.windows.length).toBeGreaterThan(0);
    expect(calendar.exceptions.some((exception) => "note" in exception)).toBe(false);
    for (const range of calendar.busy)
      expect(Object.keys(range).sort()).toEqual(["endsAt", "startsAt"]);
  });

  it("refuses a slot inside the holidays, and takes one the week after", async () => {
    expect(blockedStart).not.toBe("");
    const refused = await rayane.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: blockedStart,
    });
    expect(refused.error?.message).toBe("slot_closed");

    const after = freeSlots(await calendarOf(rayane)).find(
      (slot) => slot.startsAt.getTime() > Date.parse(blockedStart) + 7 * 86_400_000,
    );
    expect(after).toBeDefined();
    const { data: id, error } = await rayane.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: after!.startsAt.toISOString(),
      p_note: "Test RLS — demande",
    });
    expect(error).toBeNull();
    made.push(id!);
    const { data: row } = await rayane
      .from("sessions")
      .select("status, request_note")
      .eq("id", id!)
      .single();
    expect(row).toEqual({ status: "en_attente", request_note: "Test RLS — demande" });

    // Another student cannot take the same time, nor see whose it is.
    const clash = await yassine.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: after!.startsAt.toISOString(),
    });
    expect(clash.error?.message).toBe("slot_taken");
    const { data: seen } = await yassine.from("sessions").select("id").eq("id", id!);
    expect(seen).toEqual([]);

    // She cannot confirm it herself, nor cancel someone else's.
    const { data: confirmed } = await rayane
      .from("sessions")
      .update({ status: "planifiee" })
      .eq("id", id!)
      .select("id");
    expect(confirmed ?? []).toEqual([]);
    const foreign = await yassine.rpc("cancel_my_session", { p_session_id: id! });
    expect(foreign.error?.message).toBe("session_not_found");

    // Withdrawing her own request works any time before it starts, and says what it was.
    const withdrawn = await rayane.rpc("cancel_my_session", { p_session_id: id! });
    expect(withdrawn.error).toBeNull();
    expect(withdrawn.data).toBe("en_attente");
    const { data: after2 } = await rayane.from("sessions").select("status").eq("id", id!).single();
    expect(after2?.status).toBe("annulee");
  });

  it("takes only the half-hour starts the page offers", async () => {
    const slot = freeSlots(await calendarOf(yassine))[0];
    expect(slot).toBeDefined();
    for (const offset of [15 * 60_000, 500]) {
      const off = await yassine.rpc("request_session", {
        p_session_type_id: ids.chezProf,
        p_starts_at: new Date(slot!.startsAt.getTime() + offset).toISOString(),
      });
      expect(off.error?.message).toBe("slot_closed");
    }
  });

  it("refuses what the rules forbid", async () => {
    const soon = await rayane.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: new Date(Date.now() + 3_600_000).toISOString(),
    });
    expect(soon.error?.message).toBe("too_soon");
    const far = await rayane.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: new Date(Date.now() + 200 * 86_400_000).toISOString(),
    });
    expect(far.error?.message).toBe("too_far");
    const groupType = await rayane.rpc("request_session", {
      p_session_type_id: ids.group,
      p_starts_at: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    });
    expect(groupType.error?.message).toBe("type_invalid");

    // Nobody promotes herself to confirmed bookings, or changes the rules.
    const { data: settings } = await rayane
      .from("student_settings")
      .update({ auto_confirm_bookings: true })
      .eq("student_id", ids.rayane)
      .select("student_id");
    expect(settings ?? []).toEqual([]);
    const { data: rules } = await rayane
      .from("booking_settings")
      .update({ min_notice_hours: 0 })
      .eq("id", true)
      .select("id");
    expect(rules ?? []).toEqual([]);
    const direct = await rayane.from("sessions").insert({
      student_id: ids.rayane,
      session_type_id: ids.chezProf,
      starts_at: new Date(Date.now() + 5 * 86_400_000).toISOString(),
      ends_at: new Date(Date.now() + 5 * 86_400_000 + 5_400_000).toISOString(),
      status: "planifiee",
      mode: "chez_prof",
    });
    expect(direct.error).not.toBeNull();
  });

  it("lets only an active student book", async () => {
    const calendar = await adam.rpc("booking_calendar", {
      p_from: new Date().toISOString(),
      p_to: new Date(Date.now() + 86_400_000).toISOString(),
    });
    expect(calendar.error?.message).toBe("not_allowed");
    const request = await adam.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    });
    expect(request.error?.message).toBe("not_allowed");
  });

  it("confirms a trusted student at once, and holds her to the cancellation window", async () => {
    const slot = freeSlots(await calendarOf(imane))[0];
    expect(slot).toBeDefined();
    const { data: id, error } = await imane.rpc("request_session", {
      p_session_type_id: ids.chezProf,
      p_starts_at: slot!.startsAt.toISOString(),
    });
    expect(error).toBeNull();
    made.push(id!);
    const { data: row } = await imane.from("sessions").select("status").eq("id", id!).single();
    expect(row?.status).toBe("planifiee");

    // With a window longer than the time left, she can no longer cancel it herself.
    await tutor.from("booking_settings").update({ cancellation_window_hours: 168 }).eq("id", true);
    const tooLate = await imane.rpc("cancel_my_session", { p_session_id: id! });
    if (slot!.startsAt.getTime() - Date.now() < 168 * 3_600_000) {
      expect(tooLate.error?.message).toBe("too_late");
    }
    await tutor
      .from("booking_settings")
      .update({ cancellation_window_hours: originalWindow })
      .eq("id", true);

    // A confirmed session holds its time against the tutor's own planning too.
    const planned = await tutor.rpc("plan_sessions", {
      p_starts_at: [slot!.startsAt.toISOString()],
      p_session_type_id: ids.chezProf,
      p_student_id: ids.yassine,
    });
    expect(planned.error?.message).toBe("overlap");
  });

  it("keeps planning and closing to the tutor", async () => {
    const plan = await rayane.rpc("plan_sessions", {
      p_starts_at: [new Date(Date.now() + 40 * 86_400_000).toISOString()],
      p_session_type_id: ids.chezProf,
      p_student_id: ids.rayane,
    });
    expect(plan.error?.message).toBe("not_tutor");
    const { data: past } = await rayane
      .from("sessions")
      .select("id")
      .lt("starts_at", new Date().toISOString())
      .limit(1)
      .single();
    const close = await rayane.rpc("close_session", {
      p_session_id: past!.id,
      p_status: "terminee",
    });
    expect(close.error?.message).toBe("not_tutor");
  });
});
