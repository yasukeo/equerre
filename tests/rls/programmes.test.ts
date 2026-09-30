import { beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, signedInAs, type Client } from "./clients";

// Programmes through the real API (DECISIONS.md, D-094): a student reads the « enrolled »
// lessons of her stream's programme, whichever stream of it she is in, and no other
// programme's. Nobody but migrations writes programmes, and no student repoints a stream.

describe("programmes", () => {
  let tutor: Client;
  let rayane: Client; // 2BAC-SVT: the programme of 2e bac experimental streams
  let imane: Client; // 2BAC-SMA: 2e bac sciences maths
  let enrolledSexp = ""; // an enrolled lesson of 2BAC-SEXP, written for 2BAC-PC
  let enrolledSm = ""; // an enrolled lesson of 2BAC-SM

  beforeAll(async () => {
    [tutor, rayane, imane] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("rayane.amrani@equerre.test"),
      signedInAs("imane.chraibi@equerre.test"),
    ]);
    const { data, error } = await tutor
      .from("lessons")
      .select("id, chapter:chapters!inner(programme_code)")
      .eq("status", "published")
      .eq("visibility", "enrolled");
    if (error) throw error;
    enrolledSexp = data.find((row) => row.chapter.programme_code === "2BAC-SEXP")?.id ?? "";
    enrolledSm = data.find((row) => row.chapter.programme_code === "2BAC-SM")?.id ?? "";
    if (!enrolledSexp || !enrolledSm) throw new Error("the seed has no enrolled lesson to test");
  });

  it("gives an SVT student the enrolled lessons written for her programme", async () => {
    const { data } = await rayane.from("lessons").select("id").eq("id", enrolledSexp);
    expect(data?.map((row) => row.id)).toEqual([enrolledSexp]);
  });

  it("keeps another programme's enrolled lessons from her", async () => {
    const fromSvt = await rayane.from("lessons").select("id").eq("id", enrolledSm);
    expect(fromSvt.data).toEqual([]);
    const fromSm = await imane.from("lessons").select("id").eq("id", enrolledSexp);
    expect(fromSm.data).toEqual([]);
    const own = await imane.from("lessons").select("id").eq("id", enrolledSm);
    expect(own.data?.map((row) => row.id)).toEqual([enrolledSm]);
  });

  it("lets nobody but migrations write programmes, and no student repoint a stream", async () => {
    const insert = await rayane
      .from("programmes")
      .insert({ code: "XX", slug: "xx", label: "Pirate", cycle: "2bac", position: 1 });
    expect(insert.error).not.toBeNull();
    const repoint = await rayane
      .from("levels")
      .update({ programme_code: "2BAC-SM" })
      .eq("code", "2BAC-SVT")
      .select("code");
    expect(repoint.data ?? []).toEqual([]);
    const { data: level } = await anonymousClient()
      .from("levels")
      .select("programme_code")
      .eq("code", "2BAC-SVT")
      .single();
    expect(level?.programme_code).toBe("2BAC-SEXP");
  });

  it("shows every visitor the programmes and their chapters", async () => {
    const programmes = await anonymousClient().from("programmes").select("code");
    expect(programmes.data?.length).toBe(13);
    const chapters = await anonymousClient()
      .from("chapters")
      .select("id", { count: "exact", head: true });
    expect(chapters.count).toBeGreaterThanOrEqual(166);
  });
});
