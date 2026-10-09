import "server-only";
import { isSubjectName } from "@/lib/storage-paths";
import type { createClient } from "@/lib/supabase/server";

// A homework given as a PDF (DECISIONS.md, D-106): its subject lives in the private
// assignment-subjects bucket, readable by the tutor and by the students it is given to.

export const SUBJECT_BUCKET = "assignment-subjects";

/** How long an address to the subject stays good: about the time it takes to sit it. */
const SIGNED_FOR = 4 * 3600;

/**
 * A signed address to open the subject, through the caller's own session: the storage policy
 * decides who may. A name of any other shape is never signed (D-052).
 */
export async function signSubject(
  supabase: Awaited<ReturnType<typeof createClient>>,
  path: string | null,
): Promise<string | null> {
  if (!path || !isSubjectName(path)) return null;
  const { data } = await supabase.storage.from(SUBJECT_BUCKET).createSignedUrl(path, SIGNED_FOR);
  return data?.signedUrl ?? null;
}
