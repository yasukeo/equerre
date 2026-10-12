import { isSubjectName } from "@/lib/storage-paths";

// A homework given as a PDF (DECISIONS.md, D-106): its subject lives in the private
// assignment-subjects bucket, readable by the tutor and by the students it is given to.

export const SUBJECT_BUCKET = "assignment-subjects";

/**
 * The app's address for a subject: /devoirs/sujet/<name> signs it at the click, through the
 * reader's session. A signed address written into the page would expire while the page stays
 * open (Next keeps it alive), and the link would then answer with an error. A name of any
 * other shape has no address (D-052).
 */
export function subjectHref(path: string | null): string | null {
  return path && isSubjectName(path) ? `/devoirs/sujet/${path}` : null;
}

/** The same subject, saved under the homework's name rather than opened. */
export function subjectDownloadHref(href: string): string {
  return `${href}?telecharger=1`;
}
