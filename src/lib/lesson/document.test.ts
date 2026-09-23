import { getSchema } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { Mathematics } from "@tiptap/extension-mathematics";
import StarterKit from "@tiptap/starter-kit";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EMPTY_LESSON, lessonDocumentSchema, readStoredLesson } from "./document";
import { renderLesson } from "./render";

// The JSON the pinned editor really writes, rather than JSON written by hand to match
// the schema — the gap through which a single image used to blank a whole lesson.
const editorSchema = getSchema([StarterKit, Image, Mathematics]);
const fromEditor = (json: object): unknown => editorSchema.nodeFromJSON(json).toJSON();

const options = {
  calloutLabel: (kind: string) => kind,
  fileHref: (path: string) => `/cours/fichiers/${path}`,
};

describe("readStoredLesson", () => {
  it("falls back to an empty lesson only when the envelope itself is wrong", () => {
    for (const value of [null, "doc", 42, { type: "paragraph" }, { type: "doc", content: "x" }]) {
      expect(readStoredLesson(value)).toBe(EMPTY_LESSON);
    }
  });

  it("keeps a lesson that holds nodes and marks outside the vocabulary", () => {
    const stored = fromEditor({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Avant" },
            { type: "hardBreak" },
            {
              type: "text",
              text: "souligné",
              marks: [
                { type: "underline" },
                { type: "link", attrs: { href: "https://x.test/lien" } },
              ],
            },
          ],
        },
        { type: "horizontalRule" },
        { type: "image", attrs: { src: "https://x.test/figure.webp" } },
        { type: "paragraph", content: [{ type: "inlineMath", attrs: { latex: "x^2" } }] },
      ],
    });

    const lesson = readStoredLesson(stored);
    expect(lesson).not.toBe(EMPTY_LESSON);

    const html = renderToStaticMarkup(renderLesson(lesson, options));
    expect(html).toContain("Avant<br/>souligné");
    expect(html).toContain('src="https://x.test/figure.webp"');
    expect(html).toContain('class="katex"');
    // A link is not in the vocabulary: its words stay, its destination does not.
    expect(html).not.toContain("https://x.test/lien");
  });
});

describe("lessonDocumentSchema", () => {
  it("accepts the image the pinned editor writes, nulls and all", () => {
    const image = fromEditor({
      type: "doc",
      content: [{ type: "image", attrs: { src: "https://x.test/figure.webp" } }],
    });
    expect(lessonDocumentSchema.safeParse(image).success).toBe(true);
  });
});
