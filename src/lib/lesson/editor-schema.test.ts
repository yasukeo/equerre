import { getSchema } from "@tiptap/core";
import { wrapInList } from "@tiptap/pm/schema-list";
import { EditorState, TextSelection } from "@tiptap/pm/state";
import { describe, expect, it } from "vitest";
import { CALLOUT_KINDS, lessonDocumentSchema } from "./document";
import { liftOutOfCallout, wrapInCallout } from "./callout-extension";
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

// ── What a tutor actually does with the toolbar, through ProseMirror's own transforms ──

function stateOf(json: object, from: string, to = from) {
  const doc = schema.nodeFromJSON(json);
  const position = (needle: string) => {
    let found = -1;
    doc.descendants((node, pos) => {
      // A text node's first character sits at the position descendants() reports.
      if (found === -1 && node.isText && node.text?.includes(needle)) {
        found = pos + (node.text?.indexOf(needle) ?? 0);
      }
    });
    if (found === -1) throw new Error(`text not found: ${needle}`);
    return found;
  };
  return EditorState.create({
    schema,
    doc,
    selection: TextSelection.create(doc, position(from), position(to) + to.length),
  });
}

describe("the toolbar's transforms", () => {
  it("makes a list from several paragraphs, at the top level and inside an encadré", () => {
    for (const json of [
      { type: "doc", content: [paragraph(text("l1")), paragraph(text("l2"))] },
      {
        type: "doc",
        content: [
          {
            type: "callout",
            attrs: { kind: "exemple" },
            content: [paragraph(text("aa")), paragraph(text("bb"))],
          },
        ],
      },
    ]) {
      const first = json.content[0]?.type === "callout" ? "aa" : "l1";
      const last = first === "aa" ? "bb" : "l2";
      const state = stateOf(json, first, last);
      let next = state;
      const made = wrapInList(schema.nodes.bulletList!)(state, (tr) => {
        next = state.apply(tr);
      });
      expect(made).toBe(true);
      expect(lessonDocumentSchema.safeParse(next.doc.toJSON()).success).toBe(true);
    }
  });

  it("wraps a whole list in an encadré, not one of its items", () => {
    const state = stateOf(
      {
        type: "doc",
        content: [
          {
            type: "bulletList",
            content: [item(paragraph(text("un"))), item(paragraph(text("deux")))],
          },
        ],
      },
      "deux",
    );
    const tr = state.tr;
    expect(wrapInCallout(state, tr, schema.nodes.callout!, "exemple", true)).toBe(true);
    const doc = tr.doc.toJSON() as { content: { type: string; content: { type: string }[] }[] };
    expect(doc.content.map((node) => node.type)).toEqual(["callout"]);
    expect(doc.content[0]?.content.map((node) => node.type)).toEqual(["bulletList"]);
  });

  it("removes an encadré whole, keeping its list in one piece", () => {
    const state = stateOf(
      {
        type: "doc",
        content: [
          {
            type: "callout",
            attrs: { kind: "theoreme" },
            content: [
              paragraph(text("intro")),
              {
                type: "bulletList",
                content: [
                  item(paragraph(text("un"))),
                  item(paragraph(text("deux"))),
                  item(paragraph(text("trois"))),
                ],
              },
              paragraph(text("fin")),
            ],
          },
        ],
      },
      "deux",
    );
    const tr = state.tr;
    expect(liftOutOfCallout(state, tr, schema.nodes.callout!, true)).toBe(true);
    const doc = tr.doc.toJSON() as { content: { type: string; content?: unknown[] }[] };
    expect(doc.content.map((node) => node.type)).toEqual(["paragraph", "bulletList", "paragraph"]);
    expect(doc.content[1]?.content).toHaveLength(3);
  });

  it("keeps the number a numbered list starts from", () => {
    const lesson = fromEditor({
      type: "doc",
      content: [
        { type: "orderedList", attrs: { start: 2 }, content: [item(paragraph(text("suite")))] },
      ],
    });
    const parsed = lessonDocumentSchema.parse(lesson);
    expect(parsed.content[0]).toMatchObject({ type: "orderedList", attrs: { start: 2 } });
  });
});
