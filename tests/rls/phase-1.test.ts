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
  const made = {
    assignment: "",
    second: "",
    numeric: "",
    upload: "",
    revealed: "",
    unready: "",
    oracle: "",
  };
  const pages: string[] = [];
  let handedIn = "";

  const webp = (marker: string) => new Blob([`RIFF${marker}WEBPVP8 `], { type: "image/webp" });

  async function uploadPage(marker: string): Promise<string> {
    const path = `${ids.salma}/${crypto.randomUUID()}/${crypto.randomUUID()}.webp`;
    const { error } = await salma.storage
      .from("submissions")
      .upload(path, webp(marker), { contentType: "image/webp" });
    if (error) throw new Error(`could not upload a test page: ${error.message}`);
    pages.push(path);
    return path;
  }

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
    made.oracle = await exercise("réponse 3", "numeric");

    const { error: solutionsError } = await tutor.from("exercise_solutions").insert([
      { exercise_id: made.numeric, solution: { type: "doc" }, correct_numeric: 2, tolerance: 0 },
      { exercise_id: made.upload, solution: { type: "doc" } },
      { exercise_id: made.revealed, solution: { type: "doc" }, correct_numeric: 7, tolerance: 0 },
      { exercise_id: made.oracle, solution: { type: "doc" }, correct_numeric: 3, tolerance: 0 },
      // made.unready deliberately gets no solution row.
    ]);
    if (solutionsError) throw new Error(solutionsError.message);

    const assignment = async (title: string, exercises: string[]) => {
      const { data } = await tutor
        .from("assignments")
        .insert({
          title: `Test RLS — ${title}`,
          due_at: new Date(Date.now() + 86_400_000).toISOString(),
          student_id: ids.salma,
          created_by: seedId("00000000", 1),
        })
        .select("id")
        .single();
      if (!data) throw new Error(`could not create ${title}`);
      const { error } = await tutor.from("assignment_items").insert(
        exercises.map((exercise_id, position) => ({
          assignment_id: data.id,
          exercise_id,
          position,
        })),
      );
      if (error) throw new Error(error.message);
      return data.id;
    };

    made.assignment = await assignment("devoir", [
      made.numeric,
      made.upload,
      made.revealed,
      made.unready,
      made.oracle,
    ]);
    // The same exercise again, in a second assignment.
    made.second = await assignment("second devoir", [made.numeric]);
  });

  afterAll(async () => {
    // Deleting an assignment cascades to its items, submissions and reveals, which also
    // frees its pages: a student may remove a page only while no submission holds it.
    for (const id of [made.assignment, made.second].filter(Boolean)) {
      await tutor.from("assignments").delete().eq("id", id);
    }
    if (pages.length) await salma.storage.from("submissions").remove(pages);
    const exercises = [made.numeric, made.upload, made.revealed, made.unready, made.oracle];
    await tutor.from("exercises").delete().in("id", exercises.filter(Boolean));
  });

  const submit = (
    exercise: string,
    answer: Json,
    filePaths: string[] | null = [],
    assignment: string = made.assignment,
  ) =>
    salma.rpc("submit_exercise_answer", {
      p_assignment_id: assignment,
      p_exercise_id: exercise,
      p_answer: answer,
      // A raw HTTP call can send null here even though the generated types cannot.
      p_file_paths: filePaths as string[],
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

  it("refuses a page that was never uploaded", async () => {
    const { error } = await submit(made.upload, { type: "upload" }, [
      `${ids.salma}/${crypto.randomUUID()}/${crypto.randomUUID()}.webp`,
    ]);
    expect(error?.message).toBe("page_not_uploaded");
  });

  it("refuses a page name that could carry a signing request somewhere else", async () => {
    const { error } = await submit(made.upload, { type: "upload" }, [
      `${ids.salma}/${crypto.randomUUID()}/../../../../../auth/v1/logout?scope=global`,
    ]);
    expect(error?.message).toBe("file_path_invalid");
  });

  it("cannot store a page under any name but the one the app writes", async () => {
    const { error } = await salma.storage
      .from("submissions")
      .upload(`${ids.salma}/ref/page-1.webp`, webp("odd"), { contentType: "image/webp" });
    expect(error).not.toBeNull();
  });

  it("keeps a photographed page's solution closed until it is corrected", async () => {
    handedIn = await uploadPage("original");
    const { data, error } = await submit(made.upload, { type: "upload" }, [handedIn]);
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
    expect(data?.file_paths).toEqual([handedIn]);
  });

  it("cannot overwrite or delete a page she has handed in", async () => {
    const overwrite = await salma.storage
      .from("submissions")
      .upload(handedIn, webp("swapped"), { contentType: "image/webp", upsert: true });
    expect(overwrite.error).not.toBeNull();

    const removal = await salma.storage.from("submissions").remove([handedIn]);
    expect(removal.data ?? []).toEqual([]);

    const { data } = await salma.storage.from("submissions").download(handedIn);
    expect(await data?.text()).toContain("original");
  });

  it("may still remove a page she never handed in", async () => {
    const spare = await uploadPage("spare");
    const { data, error } = await salma.storage.from("submissions").remove([spare]);
    expect(error).toBeNull();
    expect(data?.map((object) => object.name)).toEqual([spare]);
    pages.splice(pages.indexOf(spare), 1);
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

  it("cannot copy an answer she has seen into another assignment", async () => {
    const { error } = await submit(
      made.numeric,
      { type: "numeric", raw: "2", value: "2" },
      [],
      made.second,
    );
    expect(error?.message).toBe("exercise_done_elsewhere");
  });

  it("forfeits an exercise once she asks to see its solution, on the database's clock", async () => {
    const reveal = await salma.from("exercise_reveals").insert({
      assignment_id: made.assignment,
      exercise_id: made.revealed,
      student_id: ids.salma,
      revealed_at: "2000-01-01T00:00:00Z",
    });
    expect(reveal.error).toBeNull();

    const { data: stamped } = await salma
      .from("exercise_reveals")
      .select("revealed_at")
      .eq("exercise_id", made.revealed)
      .single();
    expect(new Date(stamped?.revealed_at ?? 0).getFullYear()).toBeGreaterThan(2000);

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

  it("gives no second chance, and no glimpse of the grade, through a missing page list", async () => {
    // A null page list used to fail the INSERT after grading, printing the would-be row,
    // grade included, in the error details before rolling back. Guessing was free.
    const wrong = await submit(made.oracle, { type: "numeric", raw: "4", value: "4" }, null);
    expect(wrong.error).toBeNull();
    expect(Number(wrong.data?.grade)).toBe(0);

    const right = await submit(made.oracle, { type: "numeric", raw: "3", value: "3" }, null);
    expect(right.error?.message).toBe("submission_already_corrected");
    expect(JSON.stringify(right.error)).not.toContain("20.00");
  });
});

describe("lesson attachments", () => {
  let tutor: Client;
  const files: string[] = [];
  let publicFile = "";
  let enrolledFile = "";

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    const { data: lessons } = await tutor
      .from("lessons")
      .select("id, visibility")
      .eq("status", "published");
    const open = lessons?.find((lesson) => lesson.visibility === "public");
    const enrolled = lessons?.find((lesson) => lesson.visibility === "enrolled");
    if (!open || !enrolled) {
      throw new Error("the seed should publish a public and an enrolled lesson");
    }

    publicFile = `${open.id}/${crypto.randomUUID()}.pdf`;
    enrolledFile = `${enrolled.id}/${crypto.randomUUID()}.pdf`;
    for (const path of [publicFile, enrolledFile]) {
      const { error } = await tutor.storage
        .from("lesson-files")
        .upload(path, new Blob(["%PDF-1.4\n%test\n"], { type: "application/pdf" }), {
          contentType: "application/pdf",
        });
      if (error) throw new Error(`could not upload a test attachment: ${error.message}`);
      files.push(path);
    }
  });

  afterAll(async () => {
    if (files.length) await tutor.storage.from("lesson-files").remove(files);
  });

  it("lets a visitor who is not signed in open an attachment of a public lesson", async () => {
    const { data, error } = await anonymousClient()
      .storage.from("lesson-files")
      .createSignedUrl(publicFile, 60);
    expect(error).toBeNull();
    expect(data?.signedUrl).toContain("lesson-files");
  });

  it("keeps an enrolled lesson's attachment from that same visitor", async () => {
    const { data, error } = await anonymousClient()
      .storage.from("lesson-files")
      .createSignedUrl(enrolledFile, 60);
    expect(error).not.toBeNull();
    expect(data?.signedUrl ?? null).toBeNull();
  });
});

describe("a student's own profile", () => {
  let tutor: Client;
  let salma: Client;
  let guardianName: string | null = null;

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    salma = await signedInAs("salma.alaoui@equerre.test");
    const { data } = await tutor
      .from("profiles")
      .select("guardian_name")
      .eq("id", ids.salma)
      .single();
    guardianName = data?.guardian_name ?? null;
  });

  afterAll(async () => {
    await tutor.from("profiles").update({ guardian_name: guardianName }).eq("id", ids.salma);
  });

  it("cannot replace her guardian's phone, her name or her creation date", async () => {
    for (const change of [
      { guardian_phone: "+212 611111111" },
      { full_name: "Omar El Idrissi" },
      { created_at: "2000-01-01T00:00:00Z" },
    ]) {
      const { error } = await salma.from("profiles").update(change).eq("id", ids.salma);
      expect(error?.message).toBe("profile_field_not_editable");
    }
  });

  it("is still edited by the tutor", async () => {
    const { error } = await tutor
      .from("profiles")
      .update({ guardian_name: "Test RLS — tuteur" })
      .eq("id", ids.salma);
    expect(error).toBeNull();
  });
});

describe("pages waiting to be handed in", () => {
  let salma: Client;
  const uploaded: string[] = [];
  const page = () => new Blob(["RIFFdraftWEBPVP8 "], { type: "image/webp" });

  beforeAll(async () => {
    salma = await signedInAs("salma.alaoui@equerre.test");
  });

  afterAll(async () => {
    if (uploaded.length) await salma.storage.from("submissions").remove(uploaded);
  });

  it("are capped at forty, so one account cannot fill the project's storage", async () => {
    // One at a time, as the cap is counted against what is already stored.
    for (let i = 0; i < 40; i++) {
      const name = `${ids.salma}/${crypto.randomUUID()}/${crypto.randomUUID()}.webp`;
      const { error } = await salma.storage.from("submissions").upload(name, page(), {
        contentType: "image/webp",
      });
      expect(error).toBeNull();
      uploaded.push(name);
    }

    const extra = `${ids.salma}/${crypto.randomUUID()}/${crypto.randomUUID()}.webp`;
    const { error } = await salma.storage.from("submissions").upload(extra, page(), {
      contentType: "image/webp",
    });
    expect(error).not.toBeNull();
  });
});

describe("a student the tutor has paused or stopped", () => {
  // Nour is used by no other test, so a run that dies half-way cannot leave a student that
  // the rest of the suite depends on paused or stopped.
  const nourId = seedId("00000000", 106);
  let tutor: Client;
  let nour: Client;
  const made = { upcoming: "", exercise: "", open: "", done: "" };

  const setStatus = async (status: "actif" | "en_pause" | "arrete") => {
    const { error } = await tutor.from("profiles").update({ status }).eq("id", nourId);
    if (error) throw new Error(`could not set ${status}: ${error.message}`);
  };

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    nour = await signedInAs("nour.fassi@equerre.test");

    // The seeded sessions are all in the past; add one still to come, with its link.
    const { data: type } = await tutor
      .from("session_types")
      .select("id, mode")
      .eq("is_group", false)
      .limit(1)
      .single();
    if (!type) throw new Error("no individual session type in the seed");
    const startsAt = new Date(Date.now() + 2 * 86_400_000);
    const { data: session, error: sessionError } = await tutor
      .from("sessions")
      .insert({
        session_type_id: type.id,
        mode: type.mode,
        starts_at: startsAt.toISOString(),
        ends_at: new Date(startsAt.getTime() + 3_600_000).toISOString(),
        student_id: nourId,
        status: "planifiee",
        meeting_url: "https://meet.example/test-rls",
      })
      .select("id")
      .single();
    if (!session) throw new Error(`could not create the session: ${sessionError?.message}`);
    made.upcoming = session.id;

    const { data: chapter } = await tutor.from("chapters").select("id").limit(1).single();
    if (!chapter) throw new Error("no chapter");
    const { data: exercise } = await tutor
      .from("exercises")
      .insert({
        chapter_id: chapter.id,
        title: "Test RLS — statut",
        statement: { type: "doc", content: [] },
        difficulty: 1,
        answer_type: "numeric",
      })
      .select("id")
      .single();
    if (!exercise) throw new Error("could not create the exercise");
    made.exercise = exercise.id;
    await tutor.from("exercise_solutions").insert({
      exercise_id: made.exercise,
      solution: { type: "doc" },
      correct_numeric: 2,
      tolerance: 0,
    });

    const assignment = async (title: string) => {
      const { data } = await tutor
        .from("assignments")
        .insert({
          title: `Test RLS — ${title}`,
          due_at: new Date(Date.now() + 86_400_000).toISOString(),
          student_id: nourId,
          created_by: seedId("00000000", 1),
        })
        .select("id")
        .single();
      if (!data) throw new Error(`could not create ${title}`);
      await tutor
        .from("assignment_items")
        .insert({ assignment_id: data.id, exercise_id: made.exercise, position: 0 });
      return data.id;
    };
    made.done = await assignment("rendu avant la pause");
    made.open = await assignment("pas encore rendu");

    // Work handed in while she was still active.
    const { error } = await nour.rpc("submit_exercise_answer", {
      p_assignment_id: made.done,
      p_exercise_id: made.exercise,
      p_answer: { type: "numeric", raw: "5", value: "5" },
    });
    if (error) throw new Error(`could not hand in: ${error.message}`);
  });

  afterAll(async () => {
    await setStatus("actif");
    if (made.upcoming) await tutor.from("sessions").delete().eq("id", made.upcoming);
    for (const id of [made.open, made.done].filter(Boolean)) {
      await tutor.from("assignments").delete().eq("id", id);
    }
    if (made.exercise) await tutor.from("exercises").delete().eq("id", made.exercise);
  });

  it("while active, sees what is to come", async () => {
    const { data } = await nour.from("sessions").select("meeting_url").eq("id", made.upcoming);
    expect(data?.[0]?.meeting_url).toBe("https://meet.example/test-rls");
  });

  it("paused: keeps her lessons and her past, loses what is to come, cannot hand in", async () => {
    await setStatus("en_pause");

    const upcoming = await nour.from("sessions").select("id").eq("id", made.upcoming);
    expect(upcoming.data).toEqual([]);
    const past = await nour.from("sessions").select("id");
    expect(past.data?.length).toBeGreaterThan(0);

    const enrolled = await nour.from("lessons").select("id").eq("visibility", "enrolled");
    expect(enrolled.data?.length).toBeGreaterThan(0);

    const open = await nour.from("assignments").select("id").eq("id", made.open);
    expect(open.data?.length).toBe(1);

    const { error } = await nour.rpc("submit_exercise_answer", {
      p_assignment_id: made.open,
      p_exercise_id: made.exercise,
      p_answer: { type: "numeric", raw: "2", value: "2" },
    });
    expect(error?.message).toBe("account_not_active");
  });

  it("stopped: keeps only her own past work and the public lessons", async () => {
    await setStatus("arrete");

    expect((await nour.from("sessions").select("id")).data).toEqual([]);
    expect((await nour.from("groups").select("id")).data).toEqual([]);

    const lessons = await nour.from("lessons").select("visibility");
    expect(lessons.data?.length).toBeGreaterThan(0);
    expect(lessons.data?.every((lesson) => lesson.visibility === "public")).toBe(true);

    expect((await nour.from("assignments").select("id").eq("id", made.open)).data).toEqual([]);
    expect((await nour.from("assignments").select("id").eq("id", made.done)).data?.length).toBe(1);

    const work = await nour.from("submissions").select("grade").eq("assignment_id", made.done);
    expect(work.data?.length).toBe(1);
  });
});
