// What the national exams' files are called (D-097). Client-safe: the tutor's form uses it
// before uploading, the server before saving, the public pages to name a download.

export type ExamSession = "normale" | "rattrapage";
export const EXAM_SESSIONS: readonly ExamSession[] = ["normale", "rattrapage"];

/** The national-exams bucket's limit, in step with its migration. */
export const EXAM_FILE_MAX_BYTES = 20 * 1024 * 1024;

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

/** `<exam_id>/<file_id>.pdf`: a file lives in its own paper's folder. */
export function isExamFileName(examId: string, name: string): boolean {
  return new RegExp(`^${UUID}/${UUID}\\.pdf$`).test(name) && name.startsWith(`${examId}/`);
}

/** A new file's name in a paper's folder. Never reused, so the CDN may keep it for good. */
export function newExamFileName(examId: string): string {
  return `${examId}/${crypto.randomUUID()}.pdf`;
}

/** What a download is saved as: `examen-2024-normale-2bac-sciences-maths-sujet.pdf`. */
export function examFileName(
  programmeSlug: string,
  exam: { year: number; session: ExamSession; track: string | null; language?: string },
  part: "sujet" | "corrige" | "elements-de-reponse" | "corrige-equerre",
): string {
  const track = exam.track ? `-${slugify(exam.track)}` : "";
  const language = exam.language === "ar" ? "-arabe" : "";
  return `examen-${exam.year}-${exam.session}-${programmeSlug}${track}-${part}${language}.pdf`;
}

/**
 * A paper's address within its programme (D-103): `2021-normale`, or with the streams that sat
 * it, `2019-normale-pc-svt-et-sciences-agronomiques`. One programme has one paper per year,
 * session and track, so the address names one paper. Also the name of its correction's file
 * in content/corriges/<programme>/.
 */
export function examPaperSlug(exam: {
  year: number;
  session: ExamSession;
  track: string | null;
}): string {
  // A track with no Latin letter (written in Arabic) adds nothing rather than a dangling dash.
  const track = exam.track ? slugify(exam.track) : "";
  return `${exam.year}-${exam.session}${track ? `-${track}` : ""}`;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40)
    .replace(/^-+|-+$/g, "");
}
