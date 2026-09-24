import { getSchema } from "@tiptap/core";
import { wrapInList } from "@tiptap/pm/schema-list";
import { EditorState, NodeSelection, TextSelection } from "@tiptap/pm/state";
import { describe, expect, it } from "vitest";
import { CALLOUT_KINDS, lessonDocumentSchema } from "./document";
import { liftOutOfCallout, wrapInCallout } from "./callout-extension";
import { lessonExtensions } from "./editor-schema";
import { blockInsertionRange } from "./insert-block";

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
      "fileAttachment",
      "hardBreak",
      "heading",
      "image",
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

// ── Images and documents ──────────────────────────────────────────────────────────────

const LESSON = "0b6f1c3e-8d2a-4f7b-9c1e-5a4d3b2c1f00";
const LIBRARY_IMAGE = `https://abc.supabase.co/storage/v1/object/public/lesson-assets/${LESSON}/7d1e2f3a-4b5c-4d6e-8f9a-0b1c2d3e4f50.webp`;
const LESSON_FILE = `${LESSON}/2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f.pdf`;

const image = {
  type: "image",
  attrs: { src: LIBRARY_IMAGE, alt: "Un triangle", width: 640, height: 480 },
};
const attachment = {
  type: "fileAttachment",
  attrs: { path: LESSON_FILE, name: "Fiche d’exercices", size: 245_760 },
};

/** Reads an element's attributes the way a parse rule does, without a DOM. */
function element(attributes: Record<string, string>) {
  return { getAttribute: (name: string) => attributes[name] ?? null } as unknown as HTMLElement;
}

describe("images and documents in the editor", () => {
  it("writes them as saving accepts them, an image inside an encadré included", () => {
    const lesson = fromEditor({
      type: "doc",
      content: [
        image,
        { type: "callout", attrs: { kind: "exemple" }, content: [paragraph(text("vu")), image] },
        attachment,
      ],
    });
    expect(lessonDocumentSchema.safeParse(lesson).error?.issues ?? []).toEqual([]);
    // No title: the vocabulary has none.
    expect(JSON.stringify(lesson)).not.toContain("title");
  });

  it("keeps a document out of encadrés and lists", () => {
    const inCallout = {
      type: "doc",
      content: [{ type: "callout", attrs: { kind: "exemple" }, content: [attachment] }],
    };
    const inList = {
      type: "doc",
      content: [{ type: "bulletList", content: [item(paragraph(text("a")), attachment)] }],
    };
    expect(() => fromEditor(inCallout)).toThrow();
    expect(() => fromEditor(inList)).toThrow();
  });

  it("takes in a pasted image only from the lesson library", () => {
    const rule = schema.nodes.image!.spec.parseDOM![0]!;
    expect(rule.getAttrs!(element({ src: "https://x.test/figure.png" }))).toBe(false);
    expect(rule.getAttrs!(element({ src: "data:image/png;base64,iVBORw0KGgo=" }))).toBe(false);
    expect(rule.getAttrs!(element({ src: LIBRARY_IMAGE, alt: "Un triangle" }))).toMatchObject({
      src: LIBRARY_IMAGE,
      alt: "Un triangle",
    });
  });

  it("reads a pasted image's attributes as the save expects them", () => {
    const rule = schema.nodes.image!.spec.parseDOM![0]!;
    // Tiptap would read « 3 » as a number and « 640.5 » as a fraction; saving refuses both.
    const attrs = rule.getAttrs!(
      element({ src: LIBRARY_IMAGE, alt: "3", width: "640.5", height: "480" }),
    );
    expect(attrs).toEqual({ src: LIBRARY_IMAGE, alt: "3", height: 480 });
  });

  it("takes in a pasted document only under the name the editor gave it", () => {
    const rule = schema.nodes.fileAttachment!.spec.parseDOM![0]!;
    expect(rule.getAttrs!(element({ "data-path": "../../auth/v1/logout" }))).toBe(false);
    expect(
      rule.getAttrs!(element({ "data-path": LESSON_FILE, "data-name": "2024", "data-size": "12" })),
    ).toEqual({ path: LESSON_FILE, name: "2024", size: 12 });
  });
});

describe("where a new image or document goes", () => {
  const insert = (state: EditorState, type: "image" | "fileAttachment") => {
    const range = blockInsertionRange(state, schema.nodes[type]!);
    if (!range) throw new Error("nowhere to insert");
    const tr = state.tr.replaceRangeWith(
      range.from,
      range.to,
      schema.nodeFromJSON(type === "image" ? image : attachment),
    );
    tr.doc.check();
    return tr.doc.toJSON() as { content: { type: string; content?: { type: string }[] }[] };
  };
  const types = (nodes: { type: string }[] | undefined) => (nodes ?? []).map((node) => node.type);

  it("goes after the paragraph the cursor is in", () => {
    const state = stateOf(
      { type: "doc", content: [paragraph(text("avant")), paragraph(text("après"))] },
      "avant",
    );
    expect(types(insert(state, "image").content)).toEqual(["paragraph", "image", "paragraph"]);
  });

  it("takes over an empty paragraph", () => {
    const doc = schema.nodeFromJSON({
      type: "doc",
      content: [paragraph(text("avant")), paragraph(), paragraph(text("après"))],
    });
    const state = EditorState.create({ schema, doc, selection: TextSelection.create(doc, 8) });
    expect(types(insert(state, "fileAttachment").content)).toEqual([
      "paragraph",
      "fileAttachment",
      "paragraph",
    ]);
  });

  it("keeps an image inside its encadré and puts a document after it", () => {
    const json = {
      type: "doc",
      content: [
        {
          type: "callout",
          attrs: { kind: "exemple" },
          content: [paragraph(text("dedans")), paragraph(text("fin"))],
        },
      ],
    };
    const withImage = insert(stateOf(json, "dedans"), "image");
    expect(types(withImage.content)).toEqual(["callout"]);
    expect(types(withImage.content[0]?.content)).toEqual(["paragraph", "image", "paragraph"]);

    const withFile = insert(stateOf(json, "dedans"), "fileAttachment");
    expect(types(withFile.content)).toEqual(["callout", "fileAttachment"]);
  });

  it("does not split a list in two", () => {
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
      "un",
    );
    expect(types(insert(state, "image").content)).toEqual(["bulletList", "image"]);
  });

  it("goes right after a selected image", () => {
    const doc = schema.nodeFromJSON({
      type: "doc",
      content: [paragraph(text("a")), image, paragraph(text("b"))],
    });
    const state = EditorState.create({ schema, doc, selection: NodeSelection.create(doc, 3) });
    expect(types(insert(state, "fileAttachment").content)).toEqual([
      "paragraph",
      "image",
      "fileAttachment",
      "paragraph",
    ]);
  });
});
