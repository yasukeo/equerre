import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { LessonDocument, StoredLesson } from "./document";
import { renderLesson } from "./render";

const options = {
  calloutLabel: (kind: string) =>
    ({ definition: "Définition", theoreme: "Théorème" })[kind] ?? kind,
  fileHref: (path: string) => `/cours/fichiers/${path}`,
};

function html(content: StoredLesson): string {
  return renderToStaticMarkup(renderLesson(content, options));
}

const lesson: LessonDocument = {
  type: "doc",
  content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Limite finie" }] },
    {
      type: "callout",
      attrs: { kind: "definition" },
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Soit ", marks: [{ type: "bold" }] },
            { type: "inlineMath", attrs: { latex: "f(x)" } },
            { type: "text", text: " une fonction." },
          ],
        },
        { type: "blockMath", attrs: { latex: "\\lim_{x \\to a} f(x) = \\ell" } },
      ],
    },
  ],
};

describe("renderLesson", () => {
  it("draws the formulas instead of leaving empty boxes", () => {
    const output = html(lesson);
    // The Tiptap mathematics extension renders nothing outside a live editor, so
    // this is the assertion that catches a regression back to its renderHTML.
    expect(output).toContain('class="katex"');
    expect(output).toContain("f(x)");
    // MathML rides along for screen readers.
    expect(output).toContain("<math");
    expect(output).toContain("\\lim_{x \\to a} f(x) = \\ell");
  });

  it("separates an inline formula from a displayed one", () => {
    const output = html(lesson);
    expect(output).toContain("katex-display");
    expect(output.match(/class="katex"/g)?.length).toBe(2);
  });

  it("names the callout and keeps its marks", () => {
    const output = html(lesson);
    expect(output).toContain("Définition");
    expect(output).toContain('data-kind="definition"');
    expect(output).toContain("<strong>Soit </strong>");
    expect(output).toContain("<h2>Limite finie</h2>");
  });

  it("refuses a formula that tries to smuggle a script", () => {
    const attack: LessonDocument = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "inlineMath", attrs: { latex: "\\href{javascript:alert(1)}{x}" } }],
        },
      ],
    };
    const output = html(attack);
    // The formula really does carry the command: one backslash at runtime.
    expect("\\href{javascript:alert(1)}{x}".startsWith("\\href")).toBe(true);
    // With trust off KaTeX refuses \href and sets the characters as ordinary
    // symbols, so the payload survives only as inert text. No link may appear.
    expect(output).not.toContain("<a ");
    expect(output).not.toMatch(/href\s*=/);
  });

  it("refuses inline styling smuggled through htmlStyle", () => {
    const attack: LessonDocument = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "inlineMath", attrs: { latex: "\\htmlStyle{position:fixed;inset:0}{x}" } },
          ],
        },
      ],
    };
    const output = html(attack);
    // With trust off KaTeX refuses the htmlStyle command, so nothing it names ever
    // reaches an attribute. The text survives only inside the MathML annotation,
    // which is the formula’s own source and is inert.
    expect(output).not.toMatch(/style="[^"]*position/);
    expect(output).toContain("<annotation");
  });

  it("shows a broken formula in place rather than failing the page", () => {
    const broken: LessonDocument = {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "inlineMath", attrs: { latex: "\\frac{1}{" } }] },
      ],
    };
    expect(() => html(broken)).not.toThrow();
    expect(html(broken)).toContain("katex-error");
  });

  it("skips a node it does not know without blanking the lesson", () => {
    const unknown = {
      type: "doc",
      content: [
        { type: "videoEmbed", attrs: { src: "https://example.test" } },
        { type: "paragraph", content: [{ type: "text", text: "La suite." }] },
      ],
    } as unknown as LessonDocument;
    const output = html(unknown);
    expect(output).toContain("La suite.");
    expect(output).not.toContain("example.test");
  });

  it("links an attachment through the route it was given", () => {
    const withFile: LessonDocument = {
      type: "doc",
      content: [
        {
          type: "fileAttachment",
          attrs: { path: "abc/def.pdf", name: "Fiche de révision", size: 2_411_724 },
        },
      ],
    };
    const output = html(withFile);
    expect(output).toContain('href="/cours/fichiers/abc/def.pdf"');
    expect(output).toContain("Fiche de révision");
    expect(output).toContain("2,3 Mo");
  });
  it("keeps the words inside a node it does not know", () => {
    const quoted: StoredLesson = {
      type: "doc",
      content: [
        {
          type: "blockquote",
          content: [{ type: "paragraph", content: [{ type: "text", text: "Citation gardée." }] }],
        },
      ],
    };
    expect(html(quoted)).toContain("<p>Citation gardée.</p>");
  });

  it("breaks the line where the tutor pressed Maj+Entrée", () => {
    const broken: StoredLesson = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Ligne 1" },
            { type: "hardBreak" },
            { type: "text", text: "Ligne 2" },
          ],
        },
      ],
    };
    expect(html(broken)).toContain("Ligne 1<br/>Ligne 2");
  });
  it("starts a numbered list where the tutor numbered it", () => {
    const numbered: StoredLesson = {
      type: "doc",
      content: [
        {
          type: "orderedList",
          attrs: { start: 2 },
          content: [
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "suite" }] }],
            },
          ],
        },
      ],
    };
    expect(html(numbered)).toContain('<ol start="2">');
  });
});
