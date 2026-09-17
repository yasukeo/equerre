import { beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, seedId, signedInAs, type Client } from "./clients";

// The lesson library, seen through the public API by each kind of visitor. The tutor's
// lesson list and the public /cours pages both lean on these rules; if a policy slips,
// a test here fails rather than a page quietly showing too much.

const ids = {
  salma: seedId("00000000", 101),
};

// The same embedded select the tutor's lesson list issues.
const LIST_FIELDS =
  "id, title, slug, status, visibility, position, chapter:chapters!inner(title, slug, position, level:levels!inner(code, label, position))";

describe("the lesson library", () => {
  let tutor: Client;
  let salma: Client;

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    salma = await signedInAs("salma.alaoui@equerre.test");
  });

  it("shows the tutor every lesson, drafts included", async () => {
    const { data, error } = await tutor.from("lessons").select("id, status, visibility");
    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
    expect(data?.some((row) => row.status === "draft")).toBe(true);
    expect(new Set(data?.map((row) => row.visibility))).toContain("enrolled");
  });

  it("resolves the chapter and level the tutor's list draws from", async () => {
    const { data, error } = await tutor.from("lessons").select(LIST_FIELDS).limit(1);
    expect(error).toBeNull();
    const lesson = data?.[0];
    expect(lesson?.chapter.title).toBeTruthy();
    expect(lesson?.chapter.level.label).toBeTruthy();
    expect(typeof lesson?.chapter.level.position).toBe("number");
  });

  it("hides every draft from a student", async () => {
    const { data } = await salma.from("lessons").select("id, status");
    expect(data?.length).toBeGreaterThan(0);
    expect(data?.every((row) => row.status === "published")).toBe(true);
  });

  it("gives a student her own level's lessons and no other level's", async () => {
    const { data: profile } = await salma
      .from("profiles")
      .select("level_code")
      .eq("id", ids.salma)
      .single();

    const { data } = await salma
      .from("lessons")
      .select("visibility, chapter:chapters!inner(level_code)");

    for (const row of data ?? []) {
      // Anything beyond her level has to be public, or granted to her by name.
      if (row.chapter.level_code !== profile?.level_code) {
        expect(["public", "specific"]).toContain(row.visibility);
      }
    }
    expect(data?.some((row) => row.visibility === "enrolled")).toBe(true);
  });

  it("shows a visitor who is not signed in only published public lessons", async () => {
    const { data, error } = await anonymousClient().from("lessons").select("status, visibility");
    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
    for (const row of data ?? []) {
      expect(row.status).toBe("published");
      expect(row.visibility).toBe("public");
    }
  });

  it("never lets a solution reach a student through a lesson join", async () => {
    // exercises and exercise_solutions are tutor-only; an embed must not smuggle them out.
    const { data, error } = await salma
      .from("exercises")
      .select("id, solution:exercise_solutions(*)");
    expect(data ?? []).toEqual([]);
    expect(error === null || error.code === "PGRST200" || error.code === "42501").toBe(true);
  });
});
