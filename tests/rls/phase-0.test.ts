import { beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, seedId, signedInAs, type Client } from "./clients";

// These go through the public API with the publishable key, exactly like a browser would.
// If a policy is missing or too loose, a test here fails — the UI is not involved.

const ids = {
  tutor: seedId("00000000", 1),
  salma: seedId("00000000", 101),
  omar: seedId("00000000", 102),
  tuesdayGroup: seedId("10000000", 1),
  draftLesson: seedId("30000000", 4),
  salmaOnlyLesson: seedId("30000000", 6),
  otherLevelLesson: seedId("30000000", 7),
};

describe("a student", () => {
  let salma: Client;

  beforeAll(async () => {
    salma = await signedInAs("salma.alaoui@equerre.test");
  });

  it("reads only her own profile", async () => {
    const { data, error } = await salma.from("profiles").select("id");
    expect(error).toBeNull();
    expect(data?.map((row) => row.id)).toEqual([ids.salma]);
  });

  it("cannot read any tutor note, including notes about herself", async () => {
    const { data } = await salma.from("student_notes").select("id, student_id");
    expect(data).toEqual([]);
  });

  it("reads her own sessions and her group's, and nobody else's", async () => {
    const { data } = await salma.from("sessions").select("student_id, group_id");
    expect(data?.length).toBeGreaterThan(0);
    for (const row of data ?? []) {
      expect(row.student_id === ids.salma || row.group_id === ids.tuesdayGroup).toBe(true);
    }
  });

  it("cannot read another student's group memberships or attendance", async () => {
    const memberships = await salma.from("group_members").select("student_id");
    expect(new Set(memberships.data?.map((row) => row.student_id))).toEqual(new Set([ids.salma]));

    const attendance = await salma.from("session_attendance").select("student_id");
    for (const row of attendance.data ?? []) {
      expect(row.student_id).toBe(ids.salma);
    }
  });

  it("cannot read exercises or their solutions directly", async () => {
    expect((await salma.from("exercise_solutions").select("exercise_id")).data).toEqual([]);
    expect((await salma.from("exercises").select("id")).data).toEqual([]);
  });

  it("cannot promote herself or change her level", async () => {
    const promote = await salma.from("profiles").update({ role: "tutor" }).eq("id", ids.salma);
    expect(promote.error?.message).toContain("profile_field_not_editable");

    const relevel = await salma
      .from("profiles")
      .update({ level_code: "2BAC-SMA" })
      .eq("id", ids.salma);
    expect(relevel.error?.message).toContain("profile_field_not_editable");
  });

  it("cannot edit another student's profile", async () => {
    const { data } = await salma
      .from("profiles")
      .update({ school: "Piraté" })
      .eq("id", ids.omar)
      .select("id");
    expect(data).toEqual([]);
  });

  it("sees her level's lessons and the one shared with her, never drafts or other levels", async () => {
    const { data } = await salma
      .from("lessons")
      .select("id, visibility, status, chapter:chapters(level_code)");
    const visible = new Set(data?.map((row) => row.id));

    expect(visible.has(ids.salmaOnlyLesson)).toBe(true);
    expect(visible.has(ids.draftLesson)).toBe(false);
    expect(visible.has(ids.otherLevelLesson)).toBe(false);
    for (const row of data ?? []) {
      expect(row.status).toBe("published");
      if (row.visibility === "enrolled") {
        expect(row.chapter?.level_code).toBe("2BAC-PC");
      }
    }
  });

  it("cannot create invite codes or sessions", async () => {
    const code = await salma.from("invite_codes").insert({ code: "HACKED22" });
    expect(code.error).not.toBeNull();

    const session = await salma.from("sessions").insert({
      student_id: ids.salma,
      session_type_id: seedId("50000000", 1),
      starts_at: "2030-01-01T10:00:00Z",
      ends_at: "2030-01-01T11:00:00Z",
      mode: "chez_prof",
    });
    expect(session.error).not.toBeNull();
  });
});

describe("another student of the same level", () => {
  it("does not see a lesson shared only with Salma", async () => {
    const omar = await signedInAs("omar.elidrissi@equerre.test");
    const { data } = await omar.from("lessons").select("id");
    expect(data?.map((row) => row.id)).not.toContain(ids.salmaOnlyLesson);
    expect((await omar.from("profiles").select("id")).data?.map((row) => row.id)).toEqual([
      ids.omar,
    ]);
  });
});

describe("a signed-out visitor", () => {
  const anon = anonymousClient();

  it("reads no people, sessions or invite codes", async () => {
    expect((await anon.from("profiles").select("id")).data).toEqual([]);
    expect((await anon.from("sessions").select("id")).data).toEqual([]);
    expect((await anon.from("invite_codes").select("code")).data).toEqual([]);
    expect((await anon.from("student_notes").select("id")).data).toEqual([]);
  });

  it("reads only public, published lessons", async () => {
    const { data } = await anon.from("lessons").select("visibility, status");
    expect(data?.length).toBeGreaterThan(0);
    for (const row of data ?? []) {
      expect(row).toEqual({ visibility: "public", status: "published" });
    }
  });

  it("can check an invite code without seeing the table", async () => {
    expect((await anon.rpc("invite_code_is_valid", { p_code: "BACPC2K7" })).data).toBe(true);
    expect((await anon.rpc("invite_code_is_valid", { p_code: "ZZZZZZZZ" })).data).toBe(false);
  });

  it("cannot create an account without an invite code", async () => {
    const { error } = await anon.auth.signUp({
      email: `no-code-${Date.now()}@equerre.test`,
      password: "Sans-code-2026",
    });
    expect(error).not.toBeNull();
  });
});

describe("the tutor", () => {
  it("reads every profile and her private notes", async () => {
    const tutor = await signedInAs("prof@equerre.test");
    const profiles = await tutor.from("profiles").select("id");
    expect(profiles.data?.length).toBeGreaterThanOrEqual(9);

    const notes = await tutor.from("student_notes").select("id");
    expect(notes.data?.length).toBeGreaterThanOrEqual(2);
  });
});
