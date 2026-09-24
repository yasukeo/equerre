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

const LESSON = "0b6f1c3e-8d2a-4f7b-9c1e-5a4d3b2c1f00";
const LIBRARY_IMAGE = `https://abc.supabase.co/storage/v1/object/public/lesson-assets/${LESSON}/7d1e2f3a-4b5c-4d6e-8f9a-0b1c2d3e4f50.webp`;
const LESSON_FILE = `${LESSON}/2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f.pdf`;

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
      content: [{ type: "image", attrs: { src: LIBRARY_IMAGE } }],
    });
    expect(lessonDocumentSchema.safeParse(image).success).toBe(true);
  });

  it("refuses an image from anywhere but the lesson library", () => {
    for (const src of [
      "https://x.test/figure.webp",
      "https://x.test/storage/v1/object/public/lesson-assets/figure.webp",
      `${LIBRARY_IMAGE}?v=2`,
      "data:image/png;base64,iVBORw0KGgo=",
      "javascript:alert(1)",
    ]) {
      const image = { type: "doc", content: [{ type: "image", attrs: { src } }] };
      expect(lessonDocumentSchema.safeParse(image).success, src).toBe(false);
    }
  });

  it("accepts a document only under the name the editor gives it", () => {
    const withFile = (path: string, name = "Fiche") => ({
      type: "doc",
      content: [{ type: "fileAttachment", attrs: { path, name, size: 1024 } }],
    });
    expect(lessonDocumentSchema.safeParse(withFile(LESSON_FILE)).success).toBe(true);
    for (const path of ["fiche.pdf", `../${LESSON_FILE}`, LESSON_FILE.replace(".pdf", ".html")]) {
      expect(lessonDocumentSchema.safeParse(withFile(path)).success, path).toBe(false);
    }
    // A document with no name would show as a bare link.
    expect(lessonDocumentSchema.safeParse(withFile(LESSON_FILE, "  ")).success).toBe(false);
  });
});
