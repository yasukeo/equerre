import { getSchema } from "@tiptap/core";
import { describe, expect, it } from "vitest";
import { CALLOUT_KINDS, lessonDocumentSchema } from "./document";
import { lessonExtensions } from "./editor-schema";

const schema = getSchema(lessonExtensions());

/** Builds a document through the editor's own schema, refusing what the editor would. */
function fromEditor(json: object): unknown {
  const node = schema.nodeFromJSON(json);
  node.check();
  return node.toJSON();
}

const text = (value: string) => ({ type: "text", text: value });
const paragraph = (...content: object[]) => ({ type: "paragraph", content });
const item = (...content: object[]) => ({ type: "listItem", content });

describe("the lesson editor's schema", () => {
  it("offers nothing outside the lesson vocabulary", () => {
    expect(Object.keys(schema.nodes).sort()).toEqual([
      "blockMath",
      "bulletList",
      "callout",
      "doc",
      "hardBreak",
      "heading",
      "inlineMath",
      "listItem",
      "orderedList",
      "paragraph",
      "text",
    ]);
    expect(Object.keys(schema.marks).sort()).toEqual(["bold", "italic"]);
  });

  it("produces only documents that saving accepts", () => {
    const lesson = fromEditor({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [text("Limite")] },
        { type: "heading", attrs: { level: 3 }, content: [text("En un point")] },
        paragraph(
          { type: "text", text: "Soit ", marks: [{ type: "bold" }, { type: "italic" }] },
          { type: "inlineMath", attrs: { latex: "f" } },
          { type: "hardBreak" },
          text("une fonction."),
        ),
        { type: "blockMath", attrs: { latex: "\\lim_{x \\to a} f(x) = \\ell" } },
        {
          type: "bulletList",
          content: [
            item(paragraph(text("premier")), {
              type: "orderedList",
              content: [item(paragraph(text("imbriqué")))],
            }),
          ],
        },
        ...CALLOUT_KINDS.map((kind) => ({
          type: "callout",
          attrs: { kind },
          content: [
            paragraph(text(kind)),
            { type: "blockMath", attrs: { latex: "x^2" } },
            { type: "bulletList", content: [item(paragraph(text("point")))] },
          ],
        })),
      ],
    });

    const result = lessonDocumentSchema.safeParse(lesson);
    expect(result.error?.issues ?? []).toEqual([]);
  });

  it("keeps headings and encadrés out of list items", () => {
    const withHeading = {
      type: "doc",
      content: [
        {
          type: "bulletList",
          content: [item(paragraph(text("a")), { type: "heading", attrs: { level: 2 } })],
        },
      ],
    };
    expect(() => fromEditor(withHeading)).toThrow();
  });

  it("does not nest one encadré inside another", () => {
    const nested = {
      type: "doc",
      content: [
        {
          type: "callout",
          attrs: { kind: "exemple" },
          content: [{ type: "callout", attrs: { kind: "attention" }, content: [paragraph()] }],
        },
      ],
    };
    expect(() => fromEditor(nested)).toThrow();
  });
});
