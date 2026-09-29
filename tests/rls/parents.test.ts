import { randomBytes } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { localDateKeyInDays, localDateTimeToUtc } from "@/lib/dates";
import {
  adminClient,
  anonymousClient,
  publishableKey,
  seedId,
  signedInAs,
  supabaseUrl,
  type Client,
} from "./clients";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// The parent view through the real API (DECISIONS.md, D-091): a parent account is made from a
// one-use invitation the tutor creates, reads its linked child's sessions, homework, account
// and payments, never more than the child reads, and nobody else's, and writes nothing. The
// accounts are created and deleted with the secret key, with passwords made for this run;
// without the key, this file is skipped.

const ids = {
  salma: seedId("00000000", 101),
  omar: seedId("00000000", 102),
  // Used by no other test that changes her standing while this file runs (phase-1 restores
  // her): a run that dies half-way cannot leave a student the suite depends on paused.
  nour: seedId("00000000", 106),
};

const admin = adminClient();
const run = randomBytes(4).toString("hex");
const address = (tag: string) => `parent-rls-${run}-${tag}@equerre.test`;
const password = () => randomBytes(18).toString("base64url");

/** A public sign-up carrying a parent invitation, which the sign-up trigger must refuse. */
async function refusedSignUp(email: string, invite: string) {
  const attempt = await anonymousClient().auth.signUp({
    email,
    password: password(),
    options: { data: { parent_invite: invite } },
  });
  expect(attempt.error?.message).toMatch(/database error/i);
  const { data: profiles } = await admin!.from("profiles").select("id").eq("email", email);
  expect(profiles).toEqual([]);
}

describe.skipIf(!admin)("parents", () => {
  let tutor: Client;
  let yassine: Client;
  let salma: Client;
  let parent: Client;
  let parentId = "";
  const email = address("a");
  const tokens: string[] = [];
  const users: string[] = [];
  let nourSession = "";

  const invite = async (to: string, studentId = ids.salma) => {
    const { data, error } = await tutor
      .from("parent_invites")
      .insert({ student_id: studentId, email: to, full_name: "Test RLS — parent" })
      .select("token")
      .single();
    if (error) throw error;
    tokens.push(data.token);
    return data.token;
  };
  const setNourStatus = async (status: "actif" | "en_pause" | "arrete") => {
    const { error } = await tutor.from("profiles").update({ status }).eq("id", ids.nour);
    if (error) throw new Error(`could not set ${status}: ${error.message}`);
  };

  beforeAll(async () => {
    [tutor, yassine, salma] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("yassine.bennani@equerre.test"),
      signedInAs("salma.alaoui@equerre.test"),
    ]);
    const token = await invite(email);
    const secret = password();
    const { data, error } = await admin!.auth.admin.createUser({
      email,
      password: secret,
      email_confirm: true,
      user_metadata: { parent_invite: token, full_name: "Test RLS — parent" },
    });
    if (error) throw error;
    parentId = data.user.id;
    users.push(parentId);
    parent = createClient<Database>(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const signIn = await parent.auth.signInWithPassword({ email, password: secret });
    if (signIn.error) throw signIn.error;
  });

  afterAll(async () => {
    await setNourStatus("actif");
    if (nourSession) await tutor.from("sessions").delete().eq("id", nourSession);
    for (const id of users) await admin!.auth.admin.deleteUser(id);
    if (tokens.length > 0) await admin!.from("parent_invites").delete().in("token", tokens);
  });

  it("makes a parent, linked to the child the invitation names, and uses it up", async () => {
    const { data: profile } = await parent
      .from("profiles")
      .select("role")
      .eq("id", parentId)
      .single();
    expect(profile?.role).toBe("parent");
    const { data: children } = await parent.rpc("my_children");
    expect(children?.map((child) => child.id)).toEqual([ids.salma]);
    const { data: used } = await admin!
      .from("parent_invites")
      .select("used_at")
      .eq("token", tokens[0]!)
      .single();
    expect(used?.used_at).not.toBeNull();
  });

  it("refuses an invitation used, expired or made up, even at its own address", async () => {
    // Used: its account made, then deleted; the invitation stays used.
    const usedAddress = address("used");
    const usedToken = await invite(usedAddress);
    const { data, error } = await admin!.auth.admin.createUser({
      email: usedAddress,
      email_confirm: true,
      user_metadata: { parent_invite: usedToken },
    });
    if (error) throw error;
    await admin!.auth.admin.deleteUser(data.user.id);
    await refusedSignUp(usedAddress, usedToken);

    // Expired: made two days ago, for a day.
    const expiredAddress = address("expired");
    const { data: expired, error: expiredError } = await admin!
      .from("parent_invites")
      .insert({
        student_id: ids.salma,
        email: expiredAddress,
        full_name: "Test RLS — parent",
        created_at: new Date(Date.now() - 2 * 86_400_000).toISOString(),
        expires_at: new Date(Date.now() - 86_400_000).toISOString(),
      })
      .select("token")
      .single();
    if (expiredError) throw expiredError;
    tokens.push(expired.token);
    await refusedSignUp(expiredAddress, expired.token);

    // Made up.
    await refusedSignUp(address("forged"), "a".repeat(64));

    // The tutor's session says who and for which student, never the token or the dates.
    const chosenToken = await tutor.from("parent_invites").insert({
      token: "b".repeat(64),
      student_id: ids.salma,
      email: address("chosen"),
      full_name: "Test RLS — parent",
    });
    expect(chosenToken.error).not.toBeNull();
    const chosenExpiry = await tutor.from("parent_invites").insert({
      student_id: ids.salma,
      email: address("chosen"),
      full_name: "Test RLS — parent",
      expires_at: new Date(Date.now() + 365 * 86_400_000).toISOString(),
    });
    expect(chosenExpiry.error).not.toBeNull();
  });

  it("shows the parent their child, never more than the child reads, and nobody else's", async () => {
    const sessions = await parent.rpc("child_sessions", { p_student_id: ids.salma });
    expect(sessions.data?.length).toBeGreaterThan(0);
    expect(Object.keys(sessions.data![0]!)).not.toContain("meeting_url");
    const { data: own } = await salma.from("sessions").select("id");
    const hers = new Set(own?.map((row) => row.id));
    expect(sessions.data!.filter((row) => !hers.has(row.id))).toEqual([]);
    const otherSessions = await parent.rpc("child_sessions", { p_student_id: ids.omar });
    expect(otherSessions.data).toEqual([]);

    const homework = await parent.rpc("child_homework", { p_student_id: ids.salma });
    const payload = homework.data as { assignments: { id: string }[] } | null;
    expect(payload).not.toBeNull();
    const { data: ownHomework } = await salma.from("assignments").select("id");
    const hersToDo = new Set(ownHomework?.map((row) => row.id));
    expect(payload!.assignments.filter((row) => !hersToDo.has(row.id))).toEqual([]);
    const otherHomework = await parent.rpc("child_homework", { p_student_id: ids.omar });
    expect(otherHomework.data).toBeNull();

    const account = await parent.rpc("student_accounts", { p_student_id: ids.salma });
    expect(account.data).toHaveLength(1);
    const otherAccount = await parent.rpc("student_accounts", { p_student_id: ids.omar });
    expect(otherAccount.data).toEqual([]);
    const otherStatement = await parent.rpc("account_statement", { p_student_id: ids.omar });
    expect(otherStatement.data).toEqual([]);

    const { data: payments } = await parent.from("payments").select("student_id");
    expect(new Set(payments?.map((row) => row.student_id))).toEqual(new Set([ids.salma]));

    const { data: profiles } = await parent.from("profiles").select("id");
    expect(profiles?.map((row) => row.id).sort()).toEqual([ids.salma, parentId].sort());

    // A student has no children, and reads no one else's through these doors.
    const yassineChildren = await yassine.rpc("my_children");
    expect(yassineChildren.data).toEqual([]);
    const fromStudent = await yassine.rpc("child_sessions", { p_student_id: ids.salma });
    expect(fromStudent.data).toEqual([]);
  });

  it("follows the child's standing: nothing to come when paused, nothing once stopped", async () => {
    const link = await tutor
      .from("guardian_links")
      .insert({ parent_id: parentId, student_id: ids.nour });
    if (link.error) throw link.error;
    const { data: type } = await tutor
      .from("session_types")
      .select("id, mode")
      .eq("is_group", false)
      .limit(1)
      .single();
    if (!type) throw new Error("no individual session type in the seed");
    // At 04:30 two days from now, a time no real session holds.
    const startsAt = localDateTimeToUtc(localDateKeyInDays(new Date(), 2), "04:30");
    const { data: session, error } = await tutor
      .from("sessions")
      .insert({
        session_type_id: type.id,
        mode: type.mode,
        starts_at: startsAt.toISOString(),
        ends_at: new Date(startsAt.getTime() + 3_600_000).toISOString(),
        student_id: ids.nour,
        status: "planifiee",
      })
      .select("id")
      .single();
    if (error) throw error;
    nourSession = session.id;

    const sessionIds = async () => {
      const { data } = await parent.rpc("child_sessions", { p_student_id: ids.nour });
      return data?.map((row) => row.id) ?? [];
    };
    expect(await sessionIds()).toContain(nourSession);

    await setNourStatus("en_pause");
    expect(await sessionIds()).not.toContain(nourSession);

    await setNourStatus("arrete");
    expect(await sessionIds()).toEqual([]);
    const { data } = await parent.rpc("child_homework", { p_student_id: ids.nour });
    const payload = data as {
      assignments: { id: string }[];
      submissions: { assignment_id: string }[];
    };
    const handedIn = new Set(payload.submissions.map((row) => row.assignment_id));
    expect(payload.assignments.filter((row) => !handedIn.has(row.id))).toEqual([]);

    await setNourStatus("actif");
  });

  it("lets the parent write nothing", async () => {
    const link = await parent
      .from("guardian_links")
      .insert({ parent_id: parentId, student_id: ids.omar });
    expect(link.error).not.toBeNull();
    const { data: invites } = await parent.from("parent_invites").select("token");
    expect(invites).toEqual([]);
    const selfInvite = await parent.from("parent_invites").insert({
      student_id: ids.omar,
      email: address("self"),
      full_name: "Test RLS — parent",
    });
    expect(selfInvite.error).not.toBeNull();
    const { data: changed } = await parent
      .from("profiles")
      .update({ full_name: "Changé" })
      .eq("id", ids.salma)
      .select("id");
    expect(changed ?? []).toEqual([]);
    const record = await parent.rpc("record_payment", {
      p_student_id: ids.salma,
      p_amount_mad: 1,
      p_method: "especes",
      p_paid_on: new Date().toISOString().slice(0, 10),
      p_label: "Test RLS",
    });
    expect(record.error?.message).toBe("not_tutor");
  });

  it("stops showing the child once the tutor unlinks the parent", async () => {
    const removed = await tutor
      .from("guardian_links")
      .delete()
      .eq("parent_id", parentId)
      .eq("student_id", ids.salma)
      .select("parent_id");
    expect(removed.data).toHaveLength(1);
    const { data: children } = await parent.rpc("my_children");
    expect(children?.map((child) => child.id)).not.toContain(ids.salma);
    const sessions = await parent.rpc("child_sessions", { p_student_id: ids.salma });
    expect(sessions.data).toEqual([]);
  });
});
