import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { anonymousClient, signedInAs, type Client } from "./clients";

// The public site through the real API (DECISIONS.md, D-089): a visitor reads published posts
// and the tutor's profile, never a draft; only the tutor writes either. Every post made here
// is removed, and the profile is put back as it was.

describe("public site", () => {
  let tutor: Client;
  let student: Client;
  const posts: string[] = [];
  let profileBefore: {
    tagline: string | null;
    bio: string | null;
    city: string | null;
    areas: string | null;
    whatsapp: string | null;
  } | null = null;

  beforeAll(async () => {
    [tutor, student] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("yassine.bennani@equerre.test"),
    ]);
    const { data } = await tutor
      .from("site_profile")
      .select("tagline, bio, city, areas, whatsapp")
      .single();
    profileBefore = data;
  });

  afterAll(async () => {
    if (posts.length > 0) await tutor.from("posts").delete().in("id", posts);
    if (profileBefore) await tutor.from("site_profile").update(profileBefore).eq("id", true);
  });

  it("shows a visitor published posts, never a draft", async () => {
    const stamp = crypto.randomUUID().slice(0, 8);
    const { data, error } = await tutor
      .from("posts")
      .insert(
        [
          {
            title: "Test RLS — brouillon",
            slug: `test-rls-brouillon-${stamp}`,
            category: "methode",
          },
          {
            title: "Test RLS — publié",
            slug: `test-rls-publie-${stamp}`,
            category: "methode",
            status: "published",
            published_at: new Date().toISOString(),
          },
          // Rows with different columns: the ones a row leaves out take their defaults.
        ],
        { defaultToNull: false },
      )
      .select("id, status");
    expect(error).toBeNull();
    posts.push(...(data ?? []).map((row) => row.id));

    for (const reader of [anonymousClient(), student]) {
      const { data: seen } = await reader.from("posts").select("status").in("id", posts);
      expect(seen?.map((row) => row.status)).toEqual(["published"]);
    }
  });

  it("lets only the tutor write a post", async () => {
    const forged = await student.from("posts").insert({
      title: "Test RLS",
      slug: `test-rls-${crypto.randomUUID().slice(0, 8)}`,
      category: "examens",
    });
    expect(forged.error).not.toBeNull();
    const { data: changed } = await student
      .from("posts")
      .update({ title: "Changé" })
      .in("id", posts)
      .select("id");
    expect(changed ?? []).toEqual([]);
    const { data: removed } = await student.from("posts").delete().in("id", posts).select("id");
    expect(removed ?? []).toEqual([]);
    const anonymous = await anonymousClient()
      .from("posts")
      .insert({
        title: "Test RLS",
        slug: `test-rls-${crypto.randomUUID().slice(0, 8)}`,
        category: "examens",
      });
    expect(anonymous.error).not.toBeNull();
  });

  it("shows everyone the tutor's profile, and lets only her change it", async () => {
    const { data: visible } = await anonymousClient().from("site_profile").select("id");
    expect(visible).toHaveLength(1);

    const { data: byStudent } = await student
      .from("site_profile")
      .update({ tagline: "Changé" })
      .eq("id", true)
      .select("id");
    expect(byStudent ?? []).toEqual([]);
    const second = await tutor.from("site_profile").insert({ id: true });
    expect(second.error).not.toBeNull();

    const { error } = await tutor
      .from("site_profile")
      .update({ whatsapp: "pas un numéro" })
      .eq("id", true);
    expect(error).not.toBeNull();
    const { data: byTutor } = await tutor
      .from("site_profile")
      .update({ tagline: "Test RLS" })
      .eq("id", true)
      .select("tagline");
    expect(byTutor).toEqual([{ tagline: "Test RLS" }]);
  });
});
