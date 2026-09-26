import "server-only";
import { isSubmissionPageName } from "@/lib/storage-paths";
import type { createClient } from "@/lib/supabase/server";

export type Page = { path: string; url: string | null };

/**
 * Signed addresses for photographed pages, through the caller's own session: the storage
 * policy lets a student sign her own pages and the tutor everyone's. A name of any other
 * shape is never signed (D-052) and shows as a page that cannot be opened.
 */
export async function signPages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  paths: readonly string[],
): Promise<Page[]> {
  const signable = paths.filter(isSubmissionPageName);
  if (signable.length === 0) return paths.map((path) => ({ path, url: null }));
  const { data } = await supabase.storage.from("submissions").createSignedUrls(signable, 3600);
  return paths.map((path) => ({
    path,
    url: data?.find((entry) => entry.path === path)?.signedUrl ?? null,
  }));
}
