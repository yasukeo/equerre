import { afterEach, describe, expect, it } from "vitest";
import { generateInviteCode } from "@/lib/invite-code";
import { adoptNeverUsedAccount } from "@/lib/provisioning";
import { adminClient, seedId, signedInAs, type Client } from "./clients";

// Exercises the tutor's "Créer le compte d'un élève" path end to end against the real
// Auth server: the one-use invite code must reach the auth.users INSERT trigger, because
// Supabase Auth only writes app_metadata after that INSERT (DECISIONS.md, D-025).
// Needs SUPABASE_SECRET_KEY; skipped without it.

const admin = adminClient();
const saturdayGroup = seedId("10000000", 2);
const tuesdayGroup = seedId("10000000", 1);

describe.skipIf(!admin)("tutor provisioning through the admin API", () => {
  // Supabase query builders are thenables rather than Promises.
  const cleanups: Array<() => PromiseLike<unknown>> = [];

  afterEach(async () => {
    while (cleanups.length > 0) {
      await cleanups.pop()?.();
    }
  });

  async function oneUseCode(tutor: Client): Promise<string> {
    const code = generateInviteCode();
    const { error } = await tutor.from("invite_codes").insert({
      code,
      level_code: "1BAC-SM",
      group_id: saturdayGroup,
      max_uses: 1,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    expect(error).toBeNull();
    cleanups.push(() => tutor.from("invite_codes").delete().eq("code", code));
    return code;
  }

  it("creates a student with the code's level and group, and consumes the code", async () => {
    if (!admin) return;
    const tutor = await signedInAs("prof@equerre.test");
    const code = await oneUseCode(tutor);
    const email = `provisioning-${Date.now()}@equerre.test`;

    const { data, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        invite_code: code,
        full_name: "Élève Provisionné",
        phone: "+212 600 000 999",
        school: "Lycée d’essai",
        guardian_phone: "pas-un-numéro",
      },
    });
    expect(error).toBeNull();
    const userId = data.user?.id;
    expect(userId).toBeDefined();
    if (!userId) return;
    cleanups.push(() => admin.auth.admin.deleteUser(userId));

    const profile = await tutor
      .from("profiles")
      .select("role, level_code, full_name, email, phone, school, guardian_phone")
      .eq("id", userId)
      .single();
    expect(profile.data).toEqual({
      role: "student",
      level_code: "1BAC-SM",
      full_name: "Élève Provisionné",
      email,
      phone: "+212 600 000 999",
      school: "Lycée d’essai",
      // A malformed number is dropped instead of failing the sign-up.
      guardian_phone: null,
    });

    const membership = await tutor
      .from("group_members")
      .select("group_id")
      .eq("student_id", userId);
    expect(membership.data).toEqual([{ group_id: saturdayGroup }]);

    const stillValid = await tutor.rpc("invite_code_is_valid", { p_code: code });
    expect(stillValid.data).toBe(false);

    const link = await admin.auth.admin.generateLink({ type: "recovery", email });
    expect(link.error).toBeNull();
    expect(link.data.properties?.hashed_token).toBeTruthy();
  });

  it("refuses an admin-created account that carries no invite code", async () => {
    if (!admin) return;
    const { data, error } = await admin.auth.admin.createUser({
      email: `no-code-admin-${Date.now()}@equerre.test`,
      email_confirm: true,
      user_metadata: { full_name: "Sans code" },
      // "seed" is the one value the trigger honours. Auth writes app_metadata only after the
      // INSERT, so even that can't be smuggled in through the admin API.
      app_metadata: { provisioned_by: "seed" },
    });
    const userId = data.user?.id;
    if (userId) {
      cleanups.push(() => admin.auth.admin.deleteUser(userId));
    }
    expect(error).not.toBeNull();
  });
  it("gives the tutor's entries to an account someone else created and nobody used", async () => {
    if (!admin) return;
    const tutor = await signedInAs("prof@equerre.test");

    // A class code of the squatter's choosing: another level, another group.
    const code = generateInviteCode();
    const { error: codeError } = await tutor.from("invite_codes").insert({
      code,
      level_code: "TC",
      group_id: tuesdayGroup,
      max_uses: 1,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    expect(codeError).toBeNull();
    cleanups.push(() => tutor.from("invite_codes").delete().eq("code", code));

    const email = `squat-${Date.now()}@equerre.test`;
    const { data, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: false,
      user_metadata: {
        invite_code: code,
        full_name: "Pas la bonne personne",
        guardian_name: "Imposteur",
        guardian_phone: "+212 699 999 999",
      },
    });
    expect(error).toBeNull();
    const userId = data.user?.id;
    if (!userId) return;
    cleanups.push(() => admin.auth.admin.deleteUser(userId));

    const adopted = await adoptNeverUsedAccount(admin, userId, {
      fullName: "Vraie Élève",
      levelCode: "1BAC-SM",
      groupId: saturdayGroup,
      phone: "",
      school: "",
      guardianName: "",
      guardianPhone: "",
    });
    expect(adopted).toBe(true);

    const profile = await tutor
      .from("profiles")
      .select("full_name, level_code, guardian_name, guardian_phone")
      .eq("id", userId)
      .single();
    expect(profile.data).toEqual({
      full_name: "Vraie Élève",
      level_code: "1BAC-SM",
      guardian_name: null,
      guardian_phone: null,
    });

    const groups = await tutor.from("group_members").select("group_id").eq("student_id", userId);
    expect(groups.data).toEqual([{ group_id: saturdayGroup }]);

    const { data: authUser } = await admin.auth.admin.getUserById(userId);
    expect(authUser.user?.email_confirmed_at).toBeTruthy();
  });
});
