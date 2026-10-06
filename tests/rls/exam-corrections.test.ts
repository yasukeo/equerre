import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, signedInAs, type Client } from "./clients";

// Équerre's corrections of the national exams through the real API (DECISIONS.md, D-103):
// everyone reads a published correction of a published paper, only the tutor sees the others,
// and only she writes them. Their PDF is counted like a public lesson's only when it is public.

describe("exam corrections", () => {
  let tutor: Client;
  let student: Client;
  // A published paper with a published correction, one whose correction is a draft, a draft
  // paper whose correction is published, and a paper that has a correction file of its own:
  // only the first is anyone's to read.
  const open = randomUUID();
  const draftCorrection = randomUUID();
  const draftPaper = randomUUID();
  const withSolution = randomUUID();
  const papers = [open, draftCorrection, draftPaper, withSolution];
  const content = { type: "doc", content: [{ type: "paragraph" }] };
  const hash = "0".repeat(64);

  beforeAll(async () => {
    [tutor, student] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("salma.alaoui@equerre.test"),
    ]);
    const exams = await tutor.from("national_exams").insert(
      papers.map((id, index) => ({
        id,
        programme_code: "2BAC-SM",
        year: 2001 + index,
        session: "normale" as const,
        subject_path: `${id}/${randomUUID()}.pdf`,
        subject_size: 1000,
        solution_path: id === withSolution ? `${id}/${randomUUID()}.pdf` : null,
        solution_size: id === withSolution ? 1000 : null,
        status: id === draftPaper ? ("draft" as const) : ("published" as const),
      })),
    );
    if (exams.error) throw exams.error;
    const corrections = await tutor.from("exam_corrections").insert(
      papers.map((id) => ({
        exam_id: id,
        summary: "Résumé",
        content,
        status: id === draftCorrection ? ("draft" as const) : ("published" as const),
        published_at: id === draftCorrection ? null : new Date().toISOString(),
        source: `corriges/2bac-sciences-maths/test-${id.slice(0, 8)}.md`,
        source_hash: hash,
      })),
    );
    if (corrections.error) throw corrections.error;
  });

  afterAll(async () => {
    // The corrections go with their papers.
    await tutor.from("national_exams").delete().in("id", papers);
  });

  it("shows visitors and students a published correction of a published paper without one of its own", async () => {
    for (const client of [anonymousClient(), student]) {
      const { data } = await client
        .from("exam_corrections")
        .select("exam_id")
        .in("exam_id", papers);
      expect(data?.map((row) => row.exam_id)).toEqual([open]);
    }
    const { data } = await tutor.from("exam_corrections").select("exam_id").in("exam_id", papers);
    expect(data).toHaveLength(4);
  });

  it("lets nobody but the tutor write a correction", async () => {
    const insert = await student.from("exam_corrections").insert({
      exam_id: draftPaper,
      summary: "Résumé",
      content,
      source: "corriges/2bac-sciences-maths/autre.md",
      source_hash: hash,
    });
    expect(insert.error).not.toBeNull();

    for (const client of [anonymousClient(), student]) {
      const update = await client
        .from("exam_corrections")
        .update({ summary: "Changé" })
        .eq("exam_id", open)
        .select("exam_id");
      expect(update.data ?? []).toEqual([]);
      const remove = await client
        .from("exam_corrections")
        .delete()
        .eq("exam_id", open)
        .select("exam_id");
      expect(remove.data ?? []).toEqual([]);
    }

    const { data } = await tutor
      .from("exam_corrections")
      .select("summary")
      .eq("exam_id", open)
      .single();
    expect(data?.summary).toBe("Résumé");
  });

  it("counts a public PDF only for a published correction of a published paper", async () => {
    const visitor = anonymousClient();
    const quota = async (id: string) =>
      (await visitor.rpc("take_public_print_quota", { p_lesson_id: id })).data;
    expect(await quota(open)).toBe(true);
    expect(await quota(draftCorrection)).toBe(false);
    expect(await quota(draftPaper)).toBe(false);
    expect(await quota(withSolution)).toBe(false);
  });
});
