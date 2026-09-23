// The lesson vocabulary, as recorded in DECISIONS.md, D-040. It is deliberately
// small: everything the tutor can write, and nothing the renderer cannot draw.
//
// Callouts do not nest and a list item holds only paragraphs, so the schema needs
// no recursion — which keeps both the zod parse and the inferred types simple.

import type { JSONContent } from "@tiptap/core";
import { z } from "zod";

export const CALLOUT_KINDS = [
  "definition",
  "theoreme",
  "propriete",
  "exemple",
  "attention",
] as const;
export type CalloutKind = (typeof CALLOUT_KINDS)[number];

const markSchema = z.object({ type: z.enum(["bold", "italic"]) });

const textSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  marks: z.array(markSchema).optional(),
});

const inlineMathSchema = z.object({
  type: z.literal("inlineMath"),
  attrs: z.object({ latex: z.string() }),
});

const inlineSchema = z.discriminatedUnion("type", [textSchema, inlineMathSchema]);

const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(inlineSchema).optional(),
});

const headingSchema = z.object({
  type: z.literal("heading"),
  // The lesson title is the page's h1, so the body starts at h2.
  attrs: z.object({ level: z.union([z.literal(2), z.literal(3)]) }),
  content: z.array(inlineSchema).optional(),
});

const blockMathSchema = z.object({
  type: z.literal("blockMath"),
  attrs: z.object({ latex: z.string() }),
});

const imageSchema = z.object({
  type: z.literal("image"),
  // The drawn size is stored with the image so the page does not jump while it loads.
  // ProseMirror writes every attribute it was not given as null, hence nullish.
  attrs: z.object({
    src: z.string(),
    alt: z.string().nullish(),
    width: z.number().int().positive().nullish(),
    height: z.number().int().positive().nullish(),
  }),
});

const fileAttachmentSchema = z.object({
  type: z.literal("fileAttachment"),
  attrs: z.object({
    path: z.string(),
    name: z.string(),
    size: z.number().int().nonnegative().nullish(),
  }),
});

const listItemSchema = z.object({
  type: z.literal("listItem"),
  content: z.array(paragraphSchema).min(1),
});

const bulletListSchema = z.object({
  type: z.literal("bulletList"),
  content: z.array(listItemSchema).min(1),
});

const orderedListSchema = z.object({
  type: z.literal("orderedList"),
  content: z.array(listItemSchema).min(1),
});

const calloutContentSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  blockMathSchema,
  bulletListSchema,
  orderedListSchema,
  imageSchema,
]);

const calloutSchema = z.object({
  type: z.literal("callout"),
  attrs: z.object({ kind: z.enum(CALLOUT_KINDS) }),
  content: z.array(calloutContentSchema).min(1),
});

export const lessonBlockSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  headingSchema,
  blockMathSchema,
  bulletListSchema,
  orderedListSchema,
  calloutSchema,
  imageSchema,
  fileAttachmentSchema,
]);

export const lessonDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(lessonBlockSchema),
});

export type LessonDocument = z.infer<typeof lessonDocumentSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;

/**
 * A lesson as the database holds it: a Tiptap document, trusted only in its envelope.
 *
 * The strict schema above belongs on the way in, where refusing a node can tell the
 * tutor what to change. On the way out it must not be used: one node or mark outside
 * the vocabulary (a line break, an underline, an attribute the editor wrote as null)
 * would replace the whole body with nothing, silently, and the cache would keep that
 * for a month. The renderer draws what it knows and unwraps what it does not.
 */
export type StoredLesson = JSONContent & { type: "doc" };

export const EMPTY_LESSON: StoredLesson = { type: "doc", content: [] };

export function readStoredLesson(value: unknown): StoredLesson {
  if (typeof value !== "object" || value === null) return EMPTY_LESSON;
  const { type, content } = value as { type?: unknown; content?: unknown };
  return type === "doc" && (content === undefined || Array.isArray(content))
    ? (value as StoredLesson)
    : EMPTY_LESSON;
}
