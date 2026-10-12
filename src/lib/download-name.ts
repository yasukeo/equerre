/**
 * « Fiche 3 — corrigé » → « Fiche 3 — corrigé.pdf »: a name any system accepts for a saved
 * file. Characters Windows refuses and control characters become spaces; the name is cut so
 * the whole stays well under the 255 bytes file systems allow.
 */
export function pdfFileName(name: string | null | undefined, fallback: string): string {
  const cleaned = (name ?? "")
    .toWellFormed()
    .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.pdf$/i, "")
    .trim();
  // By character: a cut through « 𝑓 » or an emoji would leave half of it, which no URL takes.
  const base = Array.from(cleaned).slice(0, 120).join("").trim();
  return `${base || fallback}.pdf`;
}

/**
 * `telecharger=1&nom=…`, the query that asks a file route for the file under `name`. A name
 * the editor let through with half of a character in it is mended rather than left to throw.
 */
export function downloadQuery(name: string): string {
  return `telecharger=1&nom=${encodeURIComponent(name.toWellFormed())}`;
}

/**
 * A signed storage address that saves the file under `name` (D-107).
 *
 * storage-js 2.116 puts the `download` option through URLSearchParams and then the whole
 * address through encodeURI, so the name arrives encoded twice: « Série » was saved as
 * « S%C3%A9rie ». The option is left out and the name added here, encoded once.
 */
export function withDownloadName(signedUrl: string, name: string): string {
  const separator = signedUrl.includes("?") ? "&" : "?";
  return `${signedUrl}${separator}download=${encodeURIComponent(name.toWellFormed())}`;
}
