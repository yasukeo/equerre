// The only object names this app writes are ids (DECISIONS.md, D-052), and only names of
// that shape are ever signed.
//
// This is not tidiness. Next decodes each segment of a catch-all route after splitting the
// path on "/", so "%2F" and "%3F" arrive as "/" and "?" inside a segment; storage-js then
// puts the path into a URL without encoding it, and URL parsing resolves "..". A path of
// "../../../../../auth/v1/logout?scope=global" turned a signing request into a POST to
// Supabase Auth carrying the visitor's token. Anything that is not an id-shaped name is
// refused before it reaches a URL.

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

/** `<lesson_id>/<file_id>.pdf` in the lesson-files bucket. */
export const LESSON_FILE_NAME = new RegExp(`^${UUID}/${UUID}\\.pdf$`);

/** `<lesson_id>/<image_id>.<ext>` in the lesson-assets bucket. */
export const LESSON_IMAGE_NAME = new RegExp(`^${UUID}/${UUID}\\.(?:webp|jpg|png)$`);

/**
 * A lesson image's public address. The host is left open so this stays free of configuration;
 * what matters is that a lesson never draws an image from anywhere but its own library, which
 * every reader's browser would otherwise fetch from a stranger's server.
 */
export const LESSON_IMAGE_URL = new RegExp(
  `^https?://[^/?#\\s]+/storage/v1/object/public/lesson-assets/${UUID}/${UUID}\\.(?:webp|jpg|png)$`,
);

/** `<student_id>/<submission_ref>/<page_id>.<ext>` in the submissions bucket. */
export const SUBMISSION_PAGE_NAME = new RegExp(
  `^${UUID}/${UUID}/${UUID}\\.(?:webp|jpe?g|png|heic|heif)$`,
);

export function isLessonFileName(name: string): boolean {
  return LESSON_FILE_NAME.test(name);
}

export function isLessonImageName(name: string): boolean {
  return LESSON_IMAGE_NAME.test(name);
}

export function isLessonImageUrl(src: string): boolean {
  return LESSON_IMAGE_URL.test(src);
}

export function isSubmissionPageName(name: string): boolean {
  return SUBMISSION_PAGE_NAME.test(name);
}
