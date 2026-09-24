// A lesson's slug from its French title: "Théorème des valeurs intermédiaires" becomes
// "theoreme-des-valeurs-intermediaires". It must match the lessons_slug_check constraint,
// ^[a-z0-9]+(-[a-z0-9]+)*$, and stays readable in a shared link.

const LIGATURES: Record<string, string> = { œ: "oe", Œ: "oe", æ: "ae", Æ: "ae", ß: "ss" };

export function slugify(value: string, maxLength = 80): string {
  const ascii = value
    .replace(/[œŒæÆß]/g, (letter) => LIGATURES[letter] ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

  return ascii
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength)
    .replace(/-+$/g, "");
}
