import type { JSONContent } from "@tiptap/core";

// How long a post takes to read (DECISIONS.md, D-089), counted from its text when the page is
// drawn: 200 words a minute, a little slower than adult prose because students read with a
// pencil. A formula counts as three words.

const WORDS_PER_MINUTE = 200;
const WORDS_PER_FORMULA = 3;

function wordsIn(node: JSONContent): number {
  if (node.type === "text") return (node.text ?? "").split(/\s+/).filter(Boolean).length;
  if (node.type === "inlineMath" || node.type === "blockMath") return WORDS_PER_FORMULA;
  return (node.content ?? []).reduce((sum, child) => sum + wordsIn(child), 0);
}

/** Whole minutes, one at least. */
export function readingMinutes(content: JSONContent): number {
  return Math.max(1, Math.round(wordsIn(content) / WORDS_PER_MINUTE));
}
