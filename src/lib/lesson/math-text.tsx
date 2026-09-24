// A line of text with formulas between dollars, as a multiple-choice answer is written:
// « $a = 1$ », or « $$a = 1$$ » as in the editor. Text stays text, React escapes it; a
// formula goes through KaTeX with the page's options (src/lib/lesson/math.ts). « \$ » is a
// dollar sign, and a lone « $ » is left as it is typed.

import type { ReactNode } from "react";
import { renderMath } from "./math";

const TOKEN = /\\\$|\$\$([^$\n]+?)\$\$|\$([^$\n]+?)\$/g;

export type MathTextPart = { kind: "text"; text: string } | { kind: "math"; latex: string };

export function splitMathText(source: string): MathTextPart[] {
  const parts: MathTextPart[] = [];
  let text = "";
  let last = 0;
  for (const match of source.matchAll(TOKEN)) {
    text += source.slice(last, match.index);
    last = match.index + match[0].length;
    const latex = match[1] ?? match[2];
    if (latex === undefined) {
      text += "$";
      continue;
    }
    if (text) parts.push({ kind: "text", text });
    text = "";
    parts.push({ kind: "math", latex: latex.trim() });
  }
  text += source.slice(last);
  if (text) parts.push({ kind: "text", text });
  return parts;
}

export function renderMathText(source: string): ReactNode {
  return splitMathText(source).map((part, index) =>
    part.kind === "text" ? (
      part.text
    ) : (
      <span
        key={index}
        className="lecon-math"
        dangerouslySetInnerHTML={{ __html: renderMath(part.latex, false) }}
      />
    ),
  );
}
