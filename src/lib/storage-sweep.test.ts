import { getSchema } from "@tiptap/core";
import { describe, expect, it } from "vitest";
import { lessonExtensions } from "@/lib/lesson/editor-schema";
import {
  collectReferences,
  emptyReferences,
  imageObjectName,
  isDeletion,
  planSweep,
  SWEEP_SAFETY_WINDOW_MS,
  type StoredObject,
  type StorageReferences,
} from "./storage-sweep";

// The JSON the editor really writes, unset attributes as null included.
const schema = getSchema(lessonExtensions());
const fromEditor = (json: object): unknown => {
  const node = schema.nodeFromJSON(json);
  node.check();
  return node.toJSON();
};

const LESSON = "0b6f1c3e-8d2a-4f7b-9c1e-5a4d3b2c1f00";
const OTHER_LESSON = "5e4d3c2b-1a09-4f8e-8d7c-6b5a4f3e2d1c";
const EXERCISE = "3a2b1c0d-9e8f-4a7b-8c6d-5e4f3a2b1c0d";
const GONE = "7f6e5d4c-3b2a-4190-8f7e-6d5c4b3a2f10";

const imageName = (owner: string, id: string) => `${owner}/${id}.webp`;
const IMAGE = imageName(LESSON, "7d1e2f3a-4b5c-4d6e-8f9a-0b1c2d3e4f50");
const CALLOUT_IMAGE = imageName(LESSON, "8e2f3a4b-5c6d-4e7f-9a0b-1c2d3e4f5061");
const FILE = `${LESSON}/2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f.pdf`;
const library = (name: string) =>
  `https://abc.supabase.co/storage/v1/object/public/lesson-assets/${name}`;

const text = (value: string) => ({ type: "text", text: value });
const paragraph = (...content: object[]) => ({ type: "paragraph", content });
const image = (name: string) => ({ type: "image", attrs: { src: library(name), alt: "Figure" } });

describe("collectReferences", () => {
  it("finds images and documents at the top level and inside an encadré", () => {
    const lesson = fromEditor({
      type: "doc",
      content: [
        paragraph(text("Soit f une fonction.")),
        image(IMAGE),
        {
          type: "callout",
          attrs: { kind: "definition" },
          content: [paragraph(text("La courbe :")), image(CALLOUT_IMAGE)],
        },
        { type: "fileAttachment", attrs: { path: FILE, name: "Fiche", size: 1200 } },
      ],
    });

    const references = collectReferences(lesson);
    expect([...references.images].sort()).toEqual([IMAGE, CALLOUT_IMAGE].sort());
    expect([...references.files]).toEqual([FILE]);
  });

  it("finds a node wherever the stored JSON puts it, known node or not", () => {
    // Stored lessons are trusted only in their envelope (D-040): a node type the vocabulary
    // has dropped, or one nested where the editor would not put it, still keeps its object.
    const stored = {
      type: "doc",
      content: [
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [image(IMAGE)] }],
            },
          ],
        },
        { type: "twoColumns", content: [{ type: "column", content: [image(CALLOUT_IMAGE)] }] },
        { type: "future", attrs: { inner: { type: "fileAttachment", attrs: { path: FILE } } } },
      ],
    };

    const references = collectReferences(stored);
    expect(references.images).toEqual(new Set([IMAGE, CALLOUT_IMAGE]));
    expect(references.files).toEqual(new Set([FILE]));
  });

  it("accumulates across documents, so drafts, statements and solutions all count", () => {
    const references = emptyReferences();
    collectReferences({ type: "doc", content: [image(IMAGE)] }, references);
    collectReferences(
      {
        type: "doc",
        content: [image(imageName(EXERCISE, "1b2c3d4e-5f6a-4b7c-8d9e-0f1a2b3c4d5e"))],
      },
      references,
    );
    expect(references.images.size).toBe(2);
  });

  it("ignores what does not point into a lesson bucket", () => {
    const references = collectReferences({
      type: "doc",
      content: [
        { type: "image", attrs: { src: "https://x.test/figure.webp" } },
        { type: "image", attrs: { src: null } },
        { type: "image", attrs: { src: 42 } },
        { type: "image" },
        { type: "fileAttachment", attrs: { path: "" } },
        paragraph(text(library(IMAGE))),
      ],
    });
    expect(references).toEqual(emptyReferences());
  });

  it.each([null, undefined, "doc", 42, [], { type: "doc", content: "x" }])(
    "reads %j as referring to nothing, without throwing",
    (value) => {
      expect(collectReferences(value)).toEqual(emptyReferences());
    },
  );

  it("survives a document nested far deeper than a call stack would", () => {
    let node: object = image(IMAGE);
    for (let depth = 0; depth < 50_000; depth += 1) node = { type: "callout", content: [node] };
    expect(collectReferences({ type: "doc", content: [node] }).images).toEqual(new Set([IMAGE]));
  });
});

describe("imageObjectName", () => {
  it.each([
    [library(IMAGE), IMAGE],
    // Another project's host, a stray query or fragment: the page would still draw it.
    [`https://other.supabase.co/storage/v1/object/public/lesson-assets/${IMAGE}`, IMAGE],
    [`${library(IMAGE)}?v=2`, IMAGE],
    [`${library(IMAGE)}#x`, IMAGE],
    [
      `https://abc.supabase.co/storage/v1/render/image/public/lesson-assets/${IMAGE}?width=400`,
      IMAGE,
    ],
    [library(IMAGE.replace("/", "%2F")), IMAGE],
  ])("reads %j as %j", (src, name) => {
    expect(imageObjectName(src)).toBe(name);
  });

  it.each([
    "https://x.test/figure.webp",
    `https://abc.supabase.co/storage/v1/object/public/submissions/${IMAGE}`,
    IMAGE,
  ])("finds no lesson-assets name in %j", (src) => {
    expect(imageObjectName(src)).toBeNull();
  });
});

describe("planSweep", () => {
  const now = new Date("2026-09-24T12:00:00Z");
  const daysAgo = (days: number) =>
    new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

  const object = (
    name: string,
    createdAt: string | null = daysAgo(30),
    bucket: StoredObject["bucket"] = name.endsWith(".pdf") ? "lesson-files" : "lesson-assets",
  ): StoredObject => ({ bucket, name, createdAt, size: 1000 });

  const owners = new Map([
    [LESSON, daysAgo(30)],
    [OTHER_LESSON, daysAgo(1)],
    [EXERCISE, daysAgo(30)],
  ]);

  const verdictOf = (stored: StoredObject, references: StorageReferences = emptyReferences()) =>
    planSweep({ objects: [stored], references, owners, now })[0]?.verdict;

  it("keeps an object a document refers to, however old", () => {
    const references = collectReferences({ type: "doc", content: [image(IMAGE)] });
    expect(verdictOf(object(IMAGE, daysAgo(400)), references)).toBe("referenced");
  });

  it("keeps an image pasted into another lesson after its own lesson was deleted", () => {
    const pasted = imageName(GONE, "4d5e6f7a-8b9c-4d0e-9f1a-2b3c4d5e6f7a");
    const references = collectReferences({ type: "doc", content: [image(pasted)] });
    expect(verdictOf(object(pasted), references)).toBe("referenced");
  });

  it("deletes an old object its lesson no longer refers to", () => {
    const verdict = verdictOf(object(IMAGE));
    expect(verdict).toBe("unreferenced");
    expect(isDeletion(verdict!)).toBe(true);
  });

  it("deletes an old PDF its lesson no longer refers to", () => {
    expect(verdictOf(object(FILE))).toBe("unreferenced");
  });

  it("keeps an object uploaded within the window, since its lesson may not be saved yet", () => {
    expect(verdictOf(object(IMAGE, daysAgo(6.9)))).toBe("uploaded-recently");
    expect(verdictOf(object(IMAGE, daysAgo(7)))).toBe("unreferenced");
  });

  it("keeps an object whose upload date it cannot read", () => {
    expect(verdictOf(object(IMAGE, null))).toBe("uploaded-recently");
    expect(verdictOf(object(IMAGE, "hier"))).toBe("uploaded-recently");
    expect(verdictOf(object(IMAGE, daysAgo(-1)))).toBe("uploaded-recently");
  });

  it("keeps an old object while its lesson was saved within the window, since undo may bring it back", () => {
    const stale = imageName(OTHER_LESSON, "6f7a8b9c-0d1e-4f2a-8b3c-4d5e6f7a8b9c");
    expect(verdictOf(object(stale))).toBe("owner-saved-recently");
  });

  it("keeps an exercise's figures: a folder named after an exercise is not an orphan", () => {
    const figure = imageName(EXERCISE, "9c0d1e2f-3a4b-4c5d-8e6f-7a8b9c0d1e2f");
    const references = collectReferences({ type: "doc", content: [image(figure)] });
    expect(verdictOf(object(figure), references)).toBe("referenced");
    expect(verdictOf(object(figure))).toBe("unreferenced");
  });

  it("deletes the objects of a lesson that no longer exists", () => {
    const verdict = verdictOf(object(imageName(GONE, "0a1b2c3d-4e5f-4a6b-9c7d-8e9f0a1b2c3d")));
    expect(verdict).toBe("owner-deleted");
    expect(isDeletion(verdict!)).toBe(true);
  });

  it("does not let an image name keep a PDF, or the reverse", () => {
    const references = emptyReferences();
    references.files.add(IMAGE);
    references.images.add(FILE);
    expect(verdictOf(object(IMAGE), references)).toBe("unreferenced");
    expect(verdictOf(object(FILE), references)).toBe("unreferenced");
  });

  it.each([
    [".emptyFolderPlaceholder", "lesson-assets"],
    [`${LESSON}/.emptyFolderPlaceholder`, "lesson-assets"],
    [`${LESSON}/figure.png`, "lesson-assets"],
    [`${LESSON}/${LESSON}/${LESSON}.png`, "lesson-assets"],
    [`${LESSON}/${LESSON}.svg`, "lesson-assets"],
    [`${LESSON}/${LESSON}.webp`, "lesson-files"],
    [`${LESSON}/${LESSON}.pdf`, "lesson-assets"],
    [`notes/${LESSON}.pdf`, "lesson-files"],
  ] as const)("leaves %j in %s alone: the app never writes such a name", (name, bucket) => {
    const verdict = verdictOf(object(name, daysAgo(400), bucket));
    expect(verdict).toBe("unexpected-name");
    expect(isDeletion(verdict!)).toBe(false);
  });

  it("honours a longer window", () => {
    const result = planSweep({
      objects: [object(IMAGE, daysAgo(20))],
      references: emptyReferences(),
      owners,
      now,
      windowMs: 4 * SWEEP_SAFETY_WINDOW_MS,
    });
    expect(result[0]?.verdict).toBe("uploaded-recently");
  });
});
