import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, signedInAs, type Client } from "./clients";

// Past national exams through the real API (DECISIONS.md, D-097): everyone reads the published
// papers, only the tutor sees drafts, and only she writes papers or their files.

describe("national exams", () => {
  let tutor: Client;
  let student: Client;
  const published = randomUUID();
  const draft = randomUUID();
  const file = (id: string) => `${id}/${randomUUID()}.pdf`;
  const uploaded: string[] = [];

  beforeAll(async () => {
    [tutor, student] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("salma.alaoui@equerre.test"),
    ]);
    const { error } = await tutor.from("national_exams").insert([
      {
        id: published,
        programme_code: "2BAC-SM",
        year: 2001,
        session: "normale",
        subject_path: file(published),
        subject_size: 1000,
        status: "published",
      },
      {
        id: draft,
        programme_code: "2BAC-SM",
        year: 2001,
        session: "rattrapage",
        subject_path: file(draft),
        subject_size: 1000,
        status: "draft",
      },
    ]);
    if (error) throw error;
  });

  afterAll(async () => {
    await tutor.from("national_exams").delete().in("id", [published, draft]);
    if (uploaded.length > 0) await tutor.storage.from("national-exams").remove(uploaded);
  });

  it("shows visitors and students the published papers only", async () => {
    for (const client of [anonymousClient(), student]) {
      const { data } = await client
        .from("national_exams")
        .select("id")
        .in("id", [published, draft]);
      expect(data?.map((row) => row.id)).toEqual([published]);
    }
    const { data } = await tutor.from("national_exams").select("id").in("id", [published, draft]);
    expect(data).toHaveLength(2);
  });

  it("lets nobody but the tutor write a paper", async () => {
    const id = randomUUID();
    const insert = await student.from("national_exams").insert({
      id,
      programme_code: "2BAC-SM",
      year: 2002,
      session: "normale",
      subject_path: file(id),
      subject_size: 1000,
    });
    expect(insert.error?.code).toBe("42501");

    const update = await student
      .from("national_exams")
      .update({ year: 2003 })
      .eq("id", published)
      .select("id");
    expect(update.data ?? []).toEqual([]);

    const remove = await anonymousClient()
      .from("national_exams")
      .delete()
      .eq("id", published)
      .select("id");
    expect(remove.data ?? []).toEqual([]);
  });

  it("keeps a file in its own paper's folder, and one paper per session", async () => {
    const id = randomUUID();
    const elsewhere = await tutor.from("national_exams").insert({
      id,
      programme_code: "2BAC-SM",
      year: 2002,
      session: "normale",
      subject_path: file(randomUUID()),
      subject_size: 1000,
    });
    expect(elsewhere.error?.code).toBe("23514");

    const twice = await tutor.from("national_exams").insert({
      id,
      programme_code: "2BAC-SM",
      year: 2001,
      session: "normale",
      subject_path: file(id),
      subject_size: 1000,
    });
    expect(twice.error?.code).toBe("23505");
  });

  it("takes PDFs from the tutor only", async () => {
    const pdf = new Blob(["%PDF-1.4\n%%EOF\n"], { type: "application/pdf" });
    for (const client of [anonymousClient(), student]) {
      const { error } = await client.storage.from("national-exams").upload(file(published), pdf, {
        contentType: "application/pdf",
      });
      expect(error).not.toBeNull();
    }
    const name = file(published);
    const { error } = await tutor.storage
      .from("national-exams")
      .upload(name, pdf, { contentType: "application/pdf" });
    expect(error).toBeNull();
    uploaded.push(name);

    const text = new Blob(["hello"], { type: "text/plain" });
    const refused = await tutor.storage
      .from("national-exams")
      .upload(file(published), text, { contentType: "text/plain" });
    expect(refused.error).not.toBeNull();
  });
});
