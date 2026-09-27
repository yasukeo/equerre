// @tiptap/extension-mathematics draws nothing outside a live editor: its renderHTML
// emits an empty span and the KaTeX call lives in addNodeView(), which needs a real
// DOM. So every formula on a served page is rendered here instead.

import katex from "katex";

export function renderMath(latex: string, displayMode: boolean): string {
  try {
    return renderOrThrow(latex, displayMode);
  } catch {
    // Past KaTeX's own error handling (a stack overflow on deep nesting): the formula stays
    // as it was written, escaped, rather than taking the page down.
    return `<code>${latex.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</code>`;
  }
}

function renderOrThrow(latex: string, displayMode: boolean): string {
  return katex.renderToString(latex, {
    displayMode,
    // A mistyped formula shows in red where it stands; it does not take the page down.
    throwOnError: false,
    // This HTML is injected with dangerouslySetInnerHTML. With trust on, KaTeX would
    // honour \href{javascript:…} and \htmlStyle{position:fixed} from the document.
    trust: false,
    // French prose inside \text{} warns on every render otherwise.
    strict: false,
    // MathML alongside the HTML is what a screen reader reads.
    output: "htmlAndMathml",
  });
}
