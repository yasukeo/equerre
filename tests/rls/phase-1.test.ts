import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Json } from "@/types/database";
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

describe("homework submissions", () => {
  let tutor: Client;
  let salma: Client;
  const made = { assignment: "", numeric: "", upload: "", revealed: "", unready: "" };

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    salma = await signedInAs("salma.alaoui@equerre.test");

    const { data: chapter } = await tutor.from("chapters").select("id").limit(1).single();
    if (!chapter) throw new Error("no chapter to hang the test exercises on");

    const exercise = async (title: string, answerType: "numeric" | "upload") => {
      const { data, error } = await tutor
        .from("exercises")
        .insert({
          chapter_id: chapter.id,
          title: `Test RLS — ${title}`,
          statement: { type: "doc", content: [] },
          difficulty: 1,
          answer_type: answerType,
        })
        .select("id")
        .single();
      if (error || !data) throw new Error(`could not create ${title}: ${error?.message}`);
      return data.id;
    };

    made.numeric = await exercise("réponse 2", "numeric");
    made.upload = await exercise("photo", "upload");
    made.revealed = await exercise("réponse 7", "numeric");
    made.unready = await exercise("sans réponse attendue", "numeric");

    const { error: solutionsError } = await tutor.from("exercise_solutions").insert([
      { exercise_id: made.numeric, solution: { type: "doc" }, correct_numeric: 2, tolerance: 0 },
      { exercise_id: made.upload, solution: { type: "doc" } },
      { exercise_id: made.revealed, solution: { type: "doc" }, correct_numeric: 7, tolerance: 0 },
      // made.unready deliberately gets no solution row.
    ]);
    if (solutionsError) throw new Error(solutionsError.message);

    const { data: assignment } = await tutor
      .from("assignments")
      .insert({
        title: "Test RLS — devoir",
        due_at: new Date(Date.now() + 86_400_000).toISOString(),
        student_id: ids.salma,
        created_by: seedId("00000000", 1),
      })
      .select("id")
      .single();
    if (!assignment) throw new Error("could not create the assignment");
    made.assignment = assignment.id;

    const { error: itemsError } = await tutor.from("assignment_items").insert(
      [made.numeric, made.upload, made.revealed, made.unready].map((exercise_id, position) => ({
        assignment_id: made.assignment,
        exercise_id,
        position,
      })),
    );
    if (itemsError) throw new Error(itemsError.message);
  });

  afterAll(async () => {
    // Deleting the assignment cascades to its items, submissions and reveals.
    if (made.assignment) await tutor.from("assignments").delete().eq("id", made.assignment);
    const exercises = [made.numeric, made.upload, made.revealed, made.unready].filter(Boolean);
    if (exercises.length) await tutor.from("exercises").delete().in("id", exercises);
  });

  const submit = (exercise: string, answer: Json, filePaths: string[] = []) =>
    salma.rpc("submit_exercise_answer", {
      p_assignment_id: made.assignment,
      p_exercise_id: exercise,
      p_answer: answer,
      p_file_paths: filePaths,
    });

  it("cannot write a submission row directly, so she cannot unlock the answer first", async () => {
    const { error } = await salma.from("submissions").insert({
      assignment_id: made.assignment,
      exercise_id: made.numeric,
      student_id: ids.salma,
      answer: { type: "numeric", value: "999" },
    });
    expect(error).not.toBeNull();

    const { data } = await salma
      .from("exercise_solutions")
      .select("exercise_id")
      .eq("exercise_id", made.numeric);
    expect(data).toEqual([]);
  });

  it("keeps a photographed page's solution closed until it is corrected", async () => {
    const { data, error } = await submit(made.upload, { type: "upload" }, [
      `${ids.salma}/ref/page-1.webp`,
    ]);
    expect(error).toBeNull();
    expect(data?.status).toBe("rendu");

    const solutions = await salma
      .from("exercise_solutions")
      .select("exercise_id")
      .eq("exercise_id", made.upload);
    expect(solutions.data).toEqual([]);
  });

  it("cannot move her pages onto another student's objects", async () => {
    await salma
      .from("submissions")
      .update({ file_paths: [`${seedId("00000000", 102)}/stolen/page-1.webp`] })
      .eq("exercise_id", made.upload);

    const { data } = await salma
      .from("submissions")
      .select("file_paths")
      .eq("exercise_id", made.upload)
      .single();
    expect(data?.file_paths).toEqual([`${ids.salma}/ref/page-1.webp`]);
  });

  it("opens the solution once her answer is corrected, and not before", async () => {
    const { data, error } = await submit(made.numeric, { type: "numeric", raw: "2", value: "2" });
    expect(error).toBeNull();
    expect(data?.status).toBe("corrige");
    expect(Number(data?.grade)).toBe(20);

    const solutions = await salma
      .from("exercise_solutions")
      .select("correct_numeric")
      .eq("exercise_id", made.numeric);
    expect(solutions.data?.[0]?.correct_numeric).toBe(2);
  });

  it("forfeits an exercise once she asks to see its solution", async () => {
    const reveal = await salma.from("exercise_reveals").insert({
      assignment_id: made.assignment,
      exercise_id: made.revealed,
      student_id: ids.salma,
    });
    expect(reveal.error).toBeNull();

    const solutions = await salma
      .from("exercise_solutions")
      .select("correct_numeric")
      .eq("exercise_id", made.revealed);
    expect(solutions.data?.[0]?.correct_numeric).toBe(7);

    const { error } = await submit(made.revealed, { type: "numeric", raw: "7", value: "7" });
    expect(error?.message).toBe("solution_already_revealed");
  });

  it("refuses an exercise whose expected answer was never written, rather than marking 0/20", async () => {
    const { error } = await submit(made.unready, { type: "numeric", raw: "1", value: "1" });
    expect(error?.message).toBe("exercise_not_ready");

    const { data } = await salma.from("submissions").select("id").eq("exercise_id", made.unready);
    expect(data).toEqual([]);
  });
});
