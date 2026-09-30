// The lesson vocabulary, as recorded in DECISIONS.md, D-040 and D-095. It is deliberately
// small: everything the tutor can write, and nothing the renderer cannot draw.
//
// Callouts do not nest. A list item opens with a paragraph and may hold lists of its
// own, which is the only recursion: the editor (src/lib/lesson/editor-schema.ts) is
// configured so that it cannot produce anything this schema refuses.

import type { JSONContent } from "@tiptap/core";
import { z } from "zod";
import { LESSON_FILE_NAME, LESSON_IMAGE_URL } from "@/lib/storage-paths";

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

// Maj+Entrée: a line break inside a paragraph.
const hardBreakSchema = z.object({ type: z.literal("hardBreak") });

const inlineSchema = z.discriminatedUnion("type", [textSchema, inlineMathSchema, hardBreakSchema]);

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

// Images come from the lesson library and documents from the private lesson-files bucket,
// both under id-shaped names (D-052, D-053): nothing is fetched from anywhere else.
const imageSchema = z.object({
  type: z.literal("image"),
  // The drawn size is stored with the image so the page does not jump while it loads.
  // ProseMirror writes every attribute it was not given as null, hence nullish.
  attrs: z.object({
    src: z.string().regex(LESSON_IMAGE_URL),
    alt: z.string().max(500).nullish(),
    width: z.number().int().positive().max(20_000).nullish(),
    height: z.number().int().positive().max(20_000).nullish(),
  }),
});

const fileAttachmentSchema = z.object({
  type: z.literal("fileAttachment"),
  attrs: z.object({
    path: z.string().regex(LESSON_FILE_NAME),
    name: z.string().trim().min(1).max(200),
    size: z.number().int().nonnegative().nullish(),
  }),
});

const listItemSchema = z.object({
  type: z.literal("listItem"),
  get content() {
    return z.array(listItemContentSchema).min(1);
  },
});

const bulletListSchema = z.object({
  type: z.literal("bulletList"),
  content: z.array(listItemSchema).min(1),
});

const orderedListSchema = z.object({
  type: z.literal("orderedList"),
  // A numbered procedure broken by a displayed formula carries on with « 2. ».
  attrs: z.object({ start: z.number().int().nonnegative().optional() }).optional(),
  content: z.array(listItemSchema).min(1),
});

const listItemContentSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  bulletListSchema,
  orderedListSchema,
]);

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

// An exercise of a series or a practice test (D-095): its statement, then at most one
// correction, last. No headings (its number and title are its heading), no attached
// documents, no exercise inside an exercise.
const exercisePartSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  blockMathSchema,
  bulletListSchema,
  orderedListSchema,
  calloutSchema,
  imageSchema,
]);

const solutionSchema = z.object({
  type: z.literal("solution"),
  content: z.array(exercisePartSchema).min(1),
});

const exerciseSchema = z.object({
  type: z.literal("exercise"),
  attrs: z.object({ title: z.string().trim().max(160).nullish() }).optional(),
  content: z
    .array(z.union([exercisePartSchema, solutionSchema]))
    .min(1)
    .refine(
      (parts) =>
        parts.every((part, index) => part.type !== "solution" || index === parts.length - 1) &&
        parts[0]?.type !== "solution",
      { message: "exercise_solution_last" },
    ),
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
  exerciseSchema,
]);

export const lessonDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(lessonBlockSchema),
});

export type LessonDocument = z.infer<typeof lessonDocumentSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;

/**
 * An exercise's statement and its worked solution: the lesson vocabulary without attached
 * documents. The lesson-files bucket lets a reader open a PDF only when the lesson in its
 * folder name is hers to read, and an exercise is not a lesson (D-050, D-044).
 */
export const exerciseBlockSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  headingSchema,
  blockMathSchema,
  bulletListSchema,
  orderedListSchema,
  calloutSchema,
  imageSchema,
]);

export const exerciseDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(exerciseBlockSchema),
});

export type ExerciseDocument = z.infer<typeof exerciseDocumentSchema>;

/**
 * A blog post: the lesson vocabulary without images or attached documents, in an encadré or
 * out of one. Both buckets are keyed by lesson (D-052), and a post is not a lesson (D-089).
 */
const postCalloutSchema = z.object({
  type: z.literal("callout"),
  attrs: z.object({ kind: z.enum(CALLOUT_KINDS) }),
  content: z
    .array(
      z.discriminatedUnion("type", [
        paragraphSchema,
        blockMathSchema,
        bulletListSchema,
        orderedListSchema,
      ]),
    )
    .min(1),
});

export const postDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(
    z.discriminatedUnion("type", [
      paragraphSchema,
      headingSchema,
      blockMathSchema,
      bulletListSchema,
      orderedListSchema,
      postCalloutSchema,
    ]),
  ),
});

export type PostDocument = z.infer<typeof postDocumentSchema>;

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
