import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { localDateKeyInDays, localDateTimeToUtc } from "@/lib/dates";
import { adminClient, seedId, signedInAs, type Client } from "./clients";

// The notification centre through the real API (DECISIONS.md, D-084, D-086): the database
// writes the notifications, each person reads and marks her own, and the job's functions answer
// only the secret key. Nobody signed in can delete a notification, so the secret key cleans up;
// without it, this file is skipped.

const ids = {
  yassine: seedId("00000000", 105),
  nour: seedId("00000000", 106),
  chezProf: seedId("50000000", 1),
};

const admin = adminClient();

describe.skipIf(!admin)("notifications", () => {
  let tutor: Client;
  let yassine: Client;
  let nour: Client;
  const sessions: string[] = [];
  // Notifications are found by the sessions they are about, not by the time: this machine's
  // clock and the database's may differ by a second or more.

  beforeAll(async () => {
    [tutor, yassine, nour] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("yassine.bennani@equerre.test"),
      signedInAs("nour.fassi@equerre.test"),
    ]);
  });

  // The notifications made here go at the end of the run (tests/rls/global-setup.ts).
  afterAll(async () => {
    if (sessions.length > 0) await tutor.from("sessions").delete().in("id", sessions);
  });

  it("tells a student once of a weekly series the tutor planned", async () => {
    // At 03:00, weeks ahead: a time no real session holds.
    const starts = [40, 47].map((days) =>
      localDateTimeToUtc(localDateKeyInDays(new Date(), days), "03:00").toISOString(),
    );
    const { data: first, error } = await tutor.rpc("plan_sessions", {
      p_starts_at: starts,
      p_session_type_id: ids.chezProf,
      p_student_id: ids.yassine,
    });
    expect(error).toBeNull();
    const { data: planned } = await tutor
      .from("sessions")
      .select("id")
      .eq("student_id", ids.yassine)
      .in("starts_at", starts);
    sessions.push(...(planned ?? []).map((row) => row.id));

    const { data } = await yassine
      .from("notifications")
      .select("type, payload")
      .eq("type", "session_planned")
      .in("payload->>session_id", sessions);
    expect(data).toHaveLength(1);
    expect(data?.[0]?.payload).toMatchObject({ count: 2, session_id: first });
  });

  it("keeps each person's notifications to her", async () => {
    const { data: others } = await nour
      .from("notifications")
      .select("id")
      .in("payload->>session_id", sessions);
    expect(others).toEqual([]);

    const forged = await nour
      .from("notifications")
      .insert({ profile_id: ids.nour, type: "correction_ready", payload: { grade: 20 } });
    expect(forged.error).not.toBeNull();

    const { data: mine } = await yassine
      .from("notifications")
      .select("id")
      .in("payload->>session_id", sessions);
    const target = mine?.[0]?.id ?? "";
    const { data: changed } = await yassine
      .from("notifications")
      .update({ payload: { grade: 20 } })
      .eq("id", target)
      .select("id");
    expect(changed ?? []).toEqual([]);

    // Nour marking everything read reaches only hers; Yassine's stays unread.
    const later = new Date(Date.now() + 3_600_000).toISOString();
    await nour.rpc("mark_notifications_read", { p_up_to: later });
    const { data: still } = await yassine.from("notifications").select("read_at").eq("id", target);
    expect(still?.[0]?.read_at).toBeNull();
    await yassine.rpc("mark_notifications_read", { p_up_to: later });
    const { data: read } = await yassine.from("notifications").select("read_at").eq("id", target);
    expect(read?.[0]?.read_at).not.toBeNull();
  });

  it("tells a student when the place of her session changes", async () => {
    const { error } = await tutor
      .from("sessions")
      .update({ location: "Test RLS — salle B" })
      .eq("id", sessions[0]!);
    expect(error).toBeNull();
    const { data } = await yassine
      .from("notifications")
      .select("payload")
      .eq("type", "session_moved")
      .in("payload->>session_id", sessions);
    expect(data).toHaveLength(1);
    expect(data?.[0]?.payload).toMatchObject({ session_id: sessions[0], what: "place" });
  });

  it("tells the students once when the tutor cancels a session and the following ones", async () => {
    const { data: planned } = await tutor
      .from("sessions")
      .select("id")
      .in("id", sessions)
      .order("starts_at");
    const earliest = planned![0]!.id;

    // A student cannot cancel through it, her own sessions or anyone's.
    const refused = await yassine.rpc("cancel_sessions", {
      p_session_id: earliest,
      p_following: true,
    });
    expect(refused.data ?? []).toEqual([]);

    const { data: cancelled, error } = await tutor.rpc("cancel_sessions", {
      p_session_id: earliest,
      p_reason: "  Test RLS  ",
      p_following: true,
    });
    expect(error).toBeNull();
    expect([...(cancelled ?? [])].sort()).toEqual([...sessions].sort());
    const { data } = await yassine
      .from("notifications")
      .select("payload")
      .eq("type", "session_cancelled")
      .in("payload->>session_id", sessions);
    expect(data).toHaveLength(1);
    expect(data?.[0]?.payload).toMatchObject({ count: 2, reason: "Test RLS" });
  });

  it("answers the job's questions to the secret key only", async () => {
    const asStudent = await yassine.rpc("message_digests_due");
    expect(asStudent.error).not.toBeNull();
    const asTutor = await tutor.rpc("notifications_to_email", { p_limit: 10 });
    expect(asTutor.error).not.toBeNull();
    for (const client of [yassine, tutor]) {
      const claim = await client.rpc("claim_notification_email", { p_id: sessions[0]! });
      expect(claim.error).not.toBeNull();
      const digest = await client.rpc("claim_message_digest", {
        p_profile_id: ids.yassine,
        p_up_to: new Date().toISOString(),
      });
      expect(digest.error).not.toBeNull();
      const reminder = await client.rpc("add_session_reminder", { p_session_id: sessions[0]! });
      expect(reminder.error).not.toBeNull();
    }
    const asJob = await admin!.rpc("notifications_to_email", { p_limit: 10 });
    expect(asJob.error).toBeNull();
  });
});
