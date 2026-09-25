// Photographed pages of a student's work (DECISIONS.md, D-051, D-052).

/** submit_exercise_answer refuses more (too_many_pages). */
export const MAX_PAGES = 20;

/** The submissions bucket's limit, in step with supabase/migrations (storage_buckets). */
export const PAGE_MAX_BYTES = 8 * 1024 * 1024;

/**
 * Every page is drawn again in the browser before it leaves the phone: about 2,000 pixels on
 * its long side is enough to read handwriting, a page weighs a few hundred kilobytes instead of
 * several megabytes, and the new file carries none of the photo's metadata — a phone's picture
 * says where it was taken.
 */
export const PAGE_PREPARATION = {
  maxSide: 2000,
  keepUnder: 0,
  maxBytes: PAGE_MAX_BYTES,
  quality: 0.8,
} as const;

/** `<student_id>/<submission_ref>/<page_id>.<ext>`, the only name the storage policy accepts. */
export function pagePath(studentId: string, reference: string, extension: string): string {
  return `${studentId}/${reference}/${crypto.randomUUID()}.${extension}`;
}
