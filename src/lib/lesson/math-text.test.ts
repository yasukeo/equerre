import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { renderMathText, splitMathText } from "./math-text";

const html = (source: string) =>
  renderToStaticMarkup(createElement("p", null, renderMathText(source)));

describe("splitMathText", () => {
  it("separates text from formulas written with one or two dollars", () => {
    expect(splitMathText("Si $a = 1$ alors $$b^2$$.")).toEqual([
      { kind: "text", text: "Si " },
      { kind: "math", latex: "a = 1" },
      { kind: "text", text: " alors " },
      { kind: "math", latex: "b^2" },
      { kind: "text", text: "." },
    ]);
  });

  it("keeps an escaped dollar and a lone one as text", () => {
    expect(splitMathText("Prix : 5 \\$ et $ seul")).toEqual([
      { kind: "text", text: "Prix : 5 $ et $ seul" },
    ]);
  });

  it("does not run a formula across a line break", () => {
    expect(splitMathText("$a\nb$")).toEqual([{ kind: "text", text: "$a\nb$" }]);
  });

  it("gives plain text back untouched", () => {
    expect(splitMathText("Aucune formule")).toEqual([{ kind: "text", text: "Aucune formule" }]);
    expect(splitMathText("")).toEqual([]);
  });
});

describe("renderMathText", () => {
  it("draws the formula and escapes the text around it", () => {
    const output = html("<img src=x onerror=alert(1)> $\\frac{1}{2}$");
    expect(output).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(output).toContain('class="katex"');
    expect(output).not.toContain("<img");
  });

  it("gives a formula no link and no style of its own", () => {
    const output = html("$\\href{javascript:alert(1)}{x}$ $\\htmlStyle{position:fixed}{y}$");
    expect(output).not.toContain("<a ");
    // The source stays readable in the MathML annotation; what matters is that no style
    // attribute carries it.
    expect(output).not.toMatch(/style="[^"]*position/);
  });
});
