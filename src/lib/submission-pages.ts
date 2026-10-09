import "server-only";
import { PAGES_BUCKET, PDF_BUCKET, bucketOf } from "@/lib/homework/pages";
import { isSubmissionPageName } from "@/lib/storage-paths";
import type { createClient } from "@/lib/supabase/server";

export type Page = { path: string; url: string | null };

/**
 * Signed addresses for handed-in pages, through the caller's own session: the storage policy
 * lets a student sign her own pages and the tutor everyone's. Photographed pages and PDF copies
 * live in two buckets (D-106), told apart by the name. A name of any other shape is never
 * signed (D-052) and shows as a page that cannot be opened.
 */
export async function signPages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  paths: readonly string[],
): Promise<Page[]> {
  const signable = paths.filter(isSubmissionPageName);
  if (signable.length === 0) return paths.map((path) => ({ path, url: null }));
  const signed = new Map<string, string>();
  await Promise.all(
    [PAGES_BUCKET, PDF_BUCKET].map(async (bucket) => {
      const names = signable.filter((path) => bucketOf(path) === bucket);
      if (names.length === 0) return;
      const { data } = await supabase.storage.from(bucket).createSignedUrls(names, 3600);
      for (const entry of data ?? []) {
        if (entry.path && entry.signedUrl) signed.set(entry.path, entry.signedUrl);
      }
    }),
  );
  return paths.map((path) => ({ path, url: signed.get(path) ?? null }));
}
