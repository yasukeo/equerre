import curriculum from "../../../supabase/curriculum/maths.json";

// The name a student knows her stream by, on the page of the programme it follows (D-094):
// « Sciences physiques (PC) » under « Sciences expérimentales et technologiques ». The file
// gives it; a stream it names `null` is not shown to visitors (the brief's « 1re bac SVT »).

const NAMES = new Map<string, string | null>(
  curriculum.programmes.flatMap((programme) =>
    programme.levels.map((level): [string, string | null] => [
      level.code,
      "name" in level ? level.name : programmeName(level.label),
    ]),
  ),
);

/**
 * A label without its cycle, for a page that already says it: « 2e bac Sciences physiques »
 * is « Sciences physiques » under « 2e année du bac ».
 */
export function programmeName(label: string): string {
  const name = label.replace(/^(1re bac|2e bac|Tronc commun)\s+/u, "");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * A stream by the name students use, or null for one visitors are not shown: named `null` in
 * the curriculum file, or no longer in it (the script keeps a dropped stream for its students).
 */
export function publicStreamName(level: { code: string }): string | null {
  return NAMES.get(level.code) ?? null;
}

/** The streams a visitor is shown, in school order, by the names students use. */
export function publicStreams(levels: { code: string; label: string; position: number }[]) {
  return [...levels]
    .sort((a, b) => a.position - b.position)
    .map(publicStreamName)
    .filter((name): name is string => name !== null);
}
