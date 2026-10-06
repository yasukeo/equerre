// What the two content imports share (D-098, D-103): finding the Markdown files, checking every
// formula the way the site draws it, and hashing a document whatever the order of its keys.

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import katex from "katex";

/** Every `.md` file under a folder, its README aside. */
export async function markdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? markdownFiles(join(dir, entry.name))
        : entry.name.endsWith(".md") && entry.name !== "README.md"
          ? [join(dir, entry.name)]
          : [],
    ),
  );
  return nested.flat();
}

function formulas(node: unknown): { latex: string; display: boolean }[] {
  if (Array.isArray(node)) return node.flatMap(formulas);
  if (typeof node !== "object" || node === null) return [];
  const { type, attrs, content } = node as {
    type?: string;
    attrs?: { latex?: unknown };
    content?: unknown;
  };
  const own =
    (type === "inlineMath" || type === "blockMath") && typeof attrs?.latex === "string"
      ? [{ latex: attrs.latex, display: type === "blockMath" }]
      : [];
  return [...own, ...formulas(content)];
}

/** Every formula as the site draws it, refusing what KaTeX would show in red. */
export function formulaProblems(content: unknown): string[] {
  const problems: string[] = [];
  for (const { latex, display } of formulas(content)) {
    try {
      katex.renderToString(latex, { displayMode: display, throwOnError: true, strict: false });
    } catch (error) {
      problems.push(`formule « ${latex} » : ${(error as Error).message}`);
    }
  }
  return problems;
}

/** The same JSON whatever the order of its keys: the database gives them back reordered. */
export function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonical((value as Record<string, unknown>)[key])]),
  );
}
