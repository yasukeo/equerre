import katex from "katex";
import type { ReactNode } from "react";
import { splitMathText } from "@/lib/lesson/math-text";

// A message's text: words as React escapes them, formulas between dollars through KaTeX
// (DECISIONS.md, D-081, D-083). Anyone in a conversation writes here, so a formula is held to
// bounds a lesson does not need: KaTeX recurses on nesting and throws past the stack on a few
// thousand braces, which throwOnError does not catch. Past the bounds, or on any error, the
// formula stays as it was typed.

const MAX_FORMULA_LENGTH = 300;
const MAX_NESTING = 12;

function nesting(latex: string): number {
  let depth = 0;
  let deepest = 0;
  for (const character of latex) {
    if (character === "{") deepest = Math.max(deepest, ++depth);
    else if (character === "}") depth = Math.max(0, depth - 1);
  }
  return deepest;
}

function renderFormula(latex: string): string | null {
  if (latex.length > MAX_FORMULA_LENGTH || nesting(latex) > MAX_NESTING) return null;
  try {
    return katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false,
      // Injected as HTML: no \href{javascript:…}, no \htmlStyle (D-040).
      trust: false,
      strict: false,
      output: "htmlAndMathml",
      // No size or macro expansion large enough to paint over the rest of the thread.
      maxSize: 4,
      maxExpand: 100,
    });
  } catch {
    return null;
  }
}

export function renderChatText(source: string): ReactNode {
  return splitMathText(source).map((part, index) => {
    if (part.kind === "text") return part.text;
    const html = renderFormula(part.latex);
    return html === null ? (
      `$${part.latex}$`
    ) : (
      <span key={index} className="chat-math" dangerouslySetInnerHTML={{ __html: html }} />
    );
  });
}
