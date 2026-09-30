import { describe, expect, it } from "vitest";
import { anonymousClient, seedId } from "./clients";

// The PDF quotas (DECISIONS.md, D-096) through the real API. Only what costs no quota is
// checked here: a test that spent it would stop the next run's PDFs for a minute.

describe("print quotas", () => {
  it("keeps the reader's quota from signed-out visitors", async () => {
    const { data, error } = await anonymousClient().rpc("take_print_quota");
    expect(data).toBeNull();
    expect(error?.code).toBe("42501");
  });

  it("counts public prints only for a published public document", async () => {
    const anonymous = anonymousClient();
    // An enrolled lesson of the seed (30000000-…-0001) and an id that is no lesson at all.
    for (const id of [seedId("30000000", 1), "00000000-0000-4000-8000-00000000abcd"]) {
      const { data, error } = await anonymous.rpc("take_public_print_quota", { p_lesson_id: id });
      expect(error).toBeNull();
      expect(data).toBe(false);
    }
  });
});
