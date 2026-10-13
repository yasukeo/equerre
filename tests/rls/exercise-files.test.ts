import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, seedId, signedInAs, type Client } from "./clients";

// PDFs attached to an exercise (D-107). They sit in the exercise's folder of lesson-files and
// open for whoever may read the part of the exercise that names them: the statement for the
// students it is given to, the corrigé once a student's copy is corrected or she asked for the
// solution. A file in the folder that neither part names opens for the tutor alone.

const ids = {
  salma: seedId("00000000", 101),
};

const pdf = () => new Blob(["%PDF-1.4\n%test\n"], { type: "application/pdf" });

describe("exercise attachments", () => {
  let tutor: Client;
  let salma: Client;
  let nour: Client;
  const made = { exercise: "", assignment: "" };
  const files = { statement: "", solution: "", stray: "" };

  const card = (path: string, name: string) => ({
    type: "doc",
    content: [{ type: "fileAttachment", attrs: { path, name } }],
  });

  /** True when `client` gets a signed address for `path`. */
  const opens = async (client: Client, path: string) => {
    const { data } = await client.storage.from("lesson-files").createSignedUrl(path, 60);
    return Boolean(data?.signedUrl);
  };

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    salma = await signedInAs("salma.alaoui@equerre.test");
    nour = await signedInAs("nour.fassi@equerre.test");

    const { data: chapter } = await tutor.from("chapters").select("id").limit(1).single();
    if (!chapter) throw new Error("no chapter to hang the test exercise on");

    const { data: exercise, error } = await tutor
      .from("exercises")
      .insert({
        chapter_id: chapter.id,
        title: "Test RLS — exercice avec PDF",
        statement: { type: "doc", content: [] },
        difficulty: 1,
        answer_type: "upload",
      })
      .select("id")
      .single();
    if (error || !exercise) throw new Error(`could not create the exercise: ${error?.message}`);
    made.exercise = exercise.id;

    files.statement = `${made.exercise}/${crypto.randomUUID()}.pdf`;
    files.solution = `${made.exercise}/${crypto.randomUUID()}.pdf`;
    files.stray = `${made.exercise}/${crypto.randomUUID()}.pdf`;
    for (const path of Object.values(files)) {
      const { error: uploadError } = await tutor.storage
        .from("lesson-files")
        .upload(path, pdf(), { contentType: "application/pdf" });
      if (uploadError) throw new Error(`could not upload ${path}: ${uploadError.message}`);
    }

    const { error: statementError } = await tutor
      .from("exercises")
      .update({ statement: card(files.statement, "Annexe") })
      .eq("id", made.exercise);
    if (statementError) throw new Error(statementError.message);
    const { error: solutionError } = await tutor
      .from("exercise_solutions")
      .insert({ exercise_id: made.exercise, solution: card(files.solution, "Corrigé détaillé") });
    if (solutionError) throw new Error(solutionError.message);

    const { data: assignment } = await tutor
      .from("assignments")
      .insert({
        title: "Test RLS — devoir avec PDF",
        due_at: new Date(Date.now() + 86_400_000).toISOString(),
        student_id: ids.salma,
        created_by: seedId("00000000", 1),
      })
      .select("id")
      .single();
    if (!assignment) throw new Error("could not create the assignment");
    made.assignment = assignment.id;
    const { error: itemError } = await tutor
      .from("assignment_items")
      .insert({ assignment_id: made.assignment, exercise_id: made.exercise, position: 0 });
    if (itemError) throw new Error(itemError.message);
  });

  afterAll(async () => {
    // Deleting the assignment takes its items and reveals with it.
    if (made.assignment) await tutor.from("assignments").delete().eq("id", made.assignment);
    const paths = Object.values(files).filter(Boolean);
    if (paths.length) await tutor.storage.from("lesson-files").remove(paths);
    if (made.exercise) await tutor.from("exercises").delete().eq("id", made.exercise);
  });

  it("opens every file of the folder for the tutor, named or not", async () => {
    expect(await opens(tutor, files.statement)).toBe(true);
    expect(await opens(tutor, files.solution)).toBe(true);
    expect(await opens(tutor, files.stray)).toBe(true);
  });

  it("opens the statement's PDF for the student it is given to, and nothing else yet", async () => {
    expect(await opens(salma, files.statement)).toBe(true);
    expect(await opens(salma, files.solution)).toBe(false);
    expect(await opens(salma, files.stray)).toBe(false);
  });

  it("opens nothing for a student it is not given to, nor for a visitor", async () => {
    for (const path of Object.values(files)) {
      expect(await opens(nour, path)).toBe(false);
      expect(await opens(anonymousClient(), path)).toBe(false);
    }
  });

  it("does not list the folder to a student beyond what she may open", async () => {
    const { data } = await salma.storage.from("lesson-files").list(made.exercise);
    const listed = (data ?? []).map((object) => `${made.exercise}/${object.name}`);
    expect(listed).not.toContain(files.solution);
    expect(listed).not.toContain(files.stray);
  });

  it("opens the corrigé's PDF once she asks for the solution", async () => {
    const { error } = await salma.from("exercise_reveals").insert({
      assignment_id: made.assignment,
      exercise_id: made.exercise,
      student_id: ids.salma,
    });
    expect(error).toBeNull();

    expect(await opens(salma, files.solution)).toBe(true);
    // A file neither part names stays the tutor's.
    expect(await opens(salma, files.stray)).toBe(false);
    expect(await opens(nour, files.solution)).toBe(false);
  });
});
