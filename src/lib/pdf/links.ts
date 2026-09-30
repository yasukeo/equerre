/**
 * Where a document's PDF is downloaded from (D-096). The version is its last change, so a
 * public PDF can be cached for good under this address and an edit gives a new one.
 */
export function pdfHref(id: string, version: string, withSolutions = false): string {
  return `/pdf/${id}?v=${version}${withSolutions ? "&corriges=1" : ""}`;
}

/**
 * A document's version, as its PDF prints it: the last change to the document or to its
 * chapter (whose title heads the sheet), and the programme's name, which a migration may
 * correct without touching either.
 */
export function documentVersion(
  lessonUpdatedAt: string,
  chapterUpdatedAt: string,
  programmeLabel: string,
): string {
  const changed = Math.max(Date.parse(lessonUpdatedAt), Date.parse(chapterUpdatedAt));
  // FNV-1a: a few characters that change with the name.
  let hash = 0x811c9dc5;
  for (const char of programmeLabel) {
    hash ^= char.codePointAt(0)!;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `${changed}-${hash.toString(36)}`;
}
