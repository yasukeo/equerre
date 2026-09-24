import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ContactFields } from "@/lib/contact";
import type { Database } from "@/types/database";

/** What the tutor types in « Créer le compte d'un élève ». `groupId` is "" for none. */
export type StudentEntry = ContactFields & {
  fullName: string;
  levelCode: string;
  groupId: string;
};

/**
 * Makes an account nobody has signed in to match what the tutor typed (DECISIONS.md, D-061).
 *
 * Anyone holding a class code can sign up with a real student's address before the tutor
 * invites her, choosing the level, the group and the guardian's number. The tutor's form
 * describes the student, so such an account takes her entries — exactly as when she re-sends
 * a lost link to an account she created herself.
 *
 * Takes a secret-key client: it writes another person's profile, groups and Auth record.
 * Kept out of the server actions file on purpose, where every export is callable.
 */
export async function adoptNeverUsedAccount(
  admin: SupabaseClient<Database>,
  userId: string,
  entry: StudentEntry,
): Promise<boolean> {
  const { error: profileError } = await admin
    .from("profiles")
    .update({
      full_name: entry.fullName,
      level_code: entry.levelCode,
      phone: entry.phone || null,
      school: entry.school || null,
      guardian_name: entry.guardianName || null,
      guardian_phone: entry.guardianPhone || null,
    })
    .eq("id", userId);
  if (profileError) return false;

  const { error: leaveError } = await admin.from("group_members").delete().eq("student_id", userId);
  if (leaveError) return false;

  if (entry.groupId) {
    const { error: joinError } = await admin
      .from("group_members")
      .insert({ group_id: entry.groupId, student_id: userId });
    if (joinError) return false;
  }

  // She proves the address by using the link, as with an account the tutor creates.
  const { error: confirmError } = await admin.auth.admin.updateUserById(userId, {
    email_confirm: true,
  });
  return !confirmError;
}
