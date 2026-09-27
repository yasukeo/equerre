import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { seedId, signedInAs, type Client } from "./clients";

// What a group gives a student follows when she joined it and what she did (DECISIONS.md,
// D-070), checked through the real API. Omar is in group 1 from the seed; Imane is in no
// group, and no other test moves either of them.

const ids = {
  tutor: seedId("00000000", 1),
  omar: seedId("00000000", 102),
  imane: seedId("00000000", 104),
  group: seedId("10000000", 1),
};

describe("what a group gives a student, over time", () => {
  let tutor: Client;
  let omar: Client;
  let imane: Client;
  let exercise = "";
  let past = "";
  let open = "";
  let omarJoinedAt = "";

  beforeAll(async () => {
    tutor = await signedInAs("prof@equerre.test");
    omar = await signedInAs("omar.elidrissi@equerre.test");
    imane = await signedInAs("imane.chraibi@equerre.test");

    const { data: membership } = await tutor
      .from("group_members")
      .select("joined_at")
      .eq("group_id", ids.group)
      .eq("student_id", ids.omar)
      .single();
    if (!membership) throw new Error("Omar should be in group 1 (seed)");
    omarJoinedAt = membership.joined_at;

    const { data: chapter } = await tutor.from("chapters").select("id").limit(1).single();
    const { data: created } = await tutor
      .from("exercises")
      .insert({
        chapter_id: chapter?.id ?? "",
        title: "Test RLS — groupe",
        statement: { type: "doc", content: [] },
        difficulty: 1,
        answer_type: "numeric",
      })
      .select("id")
      .single();
    if (!created) throw new Error("could not create the exercise");
    exercise = created.id;
    await tutor.from("exercise_solutions").insert({
      exercise_id: exercise,
      solution: { type: "doc" },
      correct_numeric: 2,
      tolerance: 0,
    });

    const homework = async (title: string, dueAt: Date) => {
      const { data } = await tutor
        .from("assignments")
        .insert({
          title: `Test RLS — ${title}`,
          due_at: dueAt.toISOString(),
          group_id: ids.group,
          created_by: ids.tutor,
        })
        .select("id")
        .single();
      if (!data) throw new Error(`could not create ${title}`);
      await tutor
        .from("assignment_items")
        .insert({ assignment_id: data.id, exercise_id: exercise, position: 0 });
      return data.id;
    };
    past = await homework("échu", new Date(Date.now() - 2 * 86_400_000));
    open = await homework("à rendre", new Date(Date.now() + 2 * 86_400_000));
  });

  afterAll(async () => {
    // Back as the seed left them, whatever happened above.
    await tutor
      .from("group_members")
      .delete()
      .eq("group_id", ids.group)
      .eq("student_id", ids.imane);
    const { data: omarStill } = await tutor
      .from("group_members")
      .select("student_id")
      .eq("group_id", ids.group)
      .eq("student_id", ids.omar);
    if ((omarStill ?? []).length > 0) {
      await tutor
        .from("group_members")
        .update({ left_at: null })
        .eq("group_id", ids.group)
        .eq("student_id", ids.omar);
    } else if (omarJoinedAt) {
      await tutor
        .from("group_members")
        .insert({ group_id: ids.group, student_id: ids.omar, joined_at: omarJoinedAt });
    }
    for (const id of [past, open].filter(Boolean)) {
      await tutor.from("assignments").delete().eq("id", id);
    }
    if (exercise) await tutor.from("exercises").delete().eq("id", exercise);
  });

  const sees = async (client: Client, assignment: string) => {
    const { data } = await client.from("assignments").select("id").eq("id", assignment);
    return (data ?? []).length === 1;
  };

  it("reaches a newcomer with what is still due, not with what fell due before", async () => {
    const { error } = await tutor
      .from("group_members")
      .insert({ group_id: ids.group, student_id: ids.imane });
    expect(error).toBeNull();

    expect(await sees(imane, open)).toBe(true);
    expect(await sees(imane, past)).toBe(false);

    const { error: late } = await imane.rpc("submit_exercise_answer", {
      p_assignment_id: past,
      p_exercise_id: exercise,
      p_answer: { type: "numeric", raw: "2", value: "2" },
      p_file_paths: [],
    });
    expect(late?.message).toBe("not_assigned");
  });

  it("keeps, for a student who leaves, what the group gave her while she was in it", async () => {
    // A member long before it fell due, Omar may still hand it in.
    const { error } = await omar.rpc("submit_exercise_answer", {
      p_assignment_id: past,
      p_exercise_id: exercise,
      p_answer: { type: "numeric", raw: "2", value: "2" },
      p_file_paths: [],
    });
    expect(error).toBeNull();
    const { count: sessionsBefore } = await omar
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("group_id", ids.group)
      .lt("starts_at", new Date().toISOString());

    // Leaving stamps the day she left, as the tutor's screen does (D-070).
    await tutor
      .from("group_members")
      .update({ left_at: new Date().toISOString() })
      .eq("group_id", ids.group)
      .eq("student_id", ids.omar);

    expect(await sees(omar, past)).toBe(true);
    expect(await sees(omar, open)).toBe(false);
    const { data: graded } = await omar
      .from("submissions")
      .select("grade")
      .eq("assignment_id", past)
      .single();
    expect(graded?.grade).toBe(20);

    // The group's past sessions stay hers, attendance taken or not.
    const { count: sessionsAfter } = await omar
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("group_id", ids.group)
      .lt("starts_at", new Date().toISOString());
    expect(sessionsAfter).toBe(sessionsBefore);
    expect(sessionsAfter ?? 0).toBeGreaterThan(0);
  });

  it("gives everything back to a student added to the group again", async () => {
    await tutor
      .from("group_members")
      .update({ left_at: null })
      .eq("group_id", ids.group)
      .eq("student_id", ids.omar);

    expect(await sees(omar, open)).toBe(true);
    const { data } = await tutor
      .from("group_members")
      .select("joined_at")
      .eq("group_id", ids.group)
      .eq("student_id", ids.omar)
      .single();
    expect(data?.joined_at).toBe(omarJoinedAt);
  });

  it("cannot be deleted while it has homework, which would take the work with it", async () => {
    const { error } = await tutor.from("groups").delete().eq("id", ids.group);
    expect(error?.code).toBe("23503");

    const { data } = await tutor.from("groups").select("id").eq("id", ids.group);
    expect(data).toHaveLength(1);
  });
});
