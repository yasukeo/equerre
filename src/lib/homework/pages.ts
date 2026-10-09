// Photographed pages of a student's work (DECISIONS.md, D-051, D-052).

/** submit_exercise_answer refuses more (too_many_pages). */
export const MAX_PAGES = 20;

/** A photographed page, once reduced on the phone. */
export const PAGE_MAX_BYTES = 8 * 1024 * 1024;

/** A copy handed in as a PDF: the submission-pdfs bucket's limit (pdf_copies_bucket). */
export const PDF_MAX_BYTES = 20 * 1024 * 1024;

/** Photographed pages: images of 8 MB at most. */
export const PAGES_BUCKET = "submissions";
/** Copies written as PDFs: 20 MB at most, three waiting at a time (D-106). */
export const PDF_BUCKET = "submission-pdfs";

/** The bucket a handed-in name lives in, told by its extension. */
export function bucketOf(path: string): typeof PAGES_BUCKET | typeof PDF_BUCKET {
  return path.endsWith(".pdf") ? PDF_BUCKET : PAGES_BUCKET;
}

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
