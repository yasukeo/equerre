import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// The RLS tests give homework, plan and book sessions: the database writes notifications for
// them (D-084), which nobody signed in may delete. With the secret key, the seed accounts'
// notifications that were not there when the run began are removed at its end, so their
// notification centres stay as they were; nobody else's is touched (D-086).
export default async function setup() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return;
  const admin = createClient<Database>(url, key, { auth: { persistSession: false } });

  const { data: seed, error } = await admin
    .from("profiles")
    .select("id")
    .like("email", "%@equerre.test");
  if (error) throw new Error("Could not read the seed accounts", { cause: error });
  const profiles = seed.map((profile) => profile.id);
  const before = await notificationIds(admin, profiles);

  return async () => {
    const after = await notificationIds(admin, profiles);
    const made = [...after].filter((id) => !before.has(id));
    for (let i = 0; i < made.length; i += 200) {
      await admin
        .from("notifications")
        .delete()
        .in("id", made.slice(i, i + 200));
    }
  };
}

async function notificationIds(
  admin: SupabaseClient<Database>,
  profiles: string[],
): Promise<Set<string>> {
  const ids = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await admin
      .from("notifications")
      .select("id")
      .in("profile_id", profiles)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error("Could not read the notifications", { cause: error });
    for (const row of data) ids.add(row.id);
    if (data.length < 1000) return ids;
  }
}
