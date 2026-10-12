/**
 * « Fiche 3 — corrigé » → « Fiche 3 — corrigé.pdf »: a name any system accepts for a saved
 * file. Characters Windows refuses and control characters become spaces; the name is cut so
 * the whole stays well under the 255 bytes file systems allow.
 */
export function pdfFileName(name: string | null | undefined, fallback: string): string {
  const base = (name ?? "")
    .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120)
    .trim();
  return `${base || fallback}.pdf`;
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
  return `${signedUrl}${separator}download=${encodeURIComponent(name)}`;
}
