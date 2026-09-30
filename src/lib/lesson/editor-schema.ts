// What the lesson editor is built from. Everything StarterKit offers beyond the lesson
// vocabulary (DECISIONS.md, D-040) is switched off here, so the editor cannot produce a
// document that saving would refuse. editor-schema.test.ts holds it to that.

import type { Extensions } from "@tiptap/core";
import ListItem from "@tiptap/extension-list-item";
import { Mathematics } from "@tiptap/extension-mathematics";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import StarterKit from "@tiptap/starter-kit";
import { Callout } from "./callout-extension";
import type { CalloutKind } from "./document";
import { Exercise, Solution } from "./exercise-extension";
import { FileAttachment, LessonImage } from "./media-extensions";

export type LessonEditorOptions = {
  /** Called when a formula is clicked, to reopen it for editing. */
  onMathClick?: (kind: "inline" | "block", node: ProseMirrorNode, pos: number) => void;
  calloutLabels?: Partial<Record<CalloutKind, string>>;
  /** Attached PDFs: lessons only, since the lesson-files bucket follows lesson visibility. */
  attachments?: boolean;
  /**
   * Exercises and their corrections (D-095): lessons only, for series and practice tests. Their
   * labels while editing; absent, the editor has neither.
   */
  exercises?: { exercise: string; solution: string };
};

export function lessonExtensions(options: LessonEditorOptions = {}): Extensions {
  return [
    StarterKit.configure({
      // Outside the vocabulary: the renderer would drop them.
      blockquote: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      link: false,
      strike: false,
      underline: false,
      // Replaced below: StarterKit's item accepts any block, headings and encadrés included.
      listItem: false,
      // The lesson title is the page's h1, so the body starts at h2.
      heading: { levels: [2, 3] },
    }),
    // Paragraphs and lists only, after a first paragraph. Room for several paragraphs
    // is what lets a list be made from a selection spanning more than one block.
    ListItem.extend({ content: "paragraph (paragraph | bulletList | orderedList)*" }),
    Mathematics.configure({
      inlineOptions: { onClick: (node, pos) => options.onMathClick?.("inline", node, pos) },
      blockOptions: { onClick: (node, pos) => options.onMathClick?.("block", node, pos) },
      // As on the page (src/lib/lesson/math.ts): no \href, no \htmlStyle, nothing thrown.
      katexOptions: { throwOnError: false, trust: false, strict: false },
    }),
    Callout.configure({ labels: options.calloutLabels ?? {} }),
    LessonImage,
    ...(options.attachments === false ? [] : [FileAttachment]),
    ...(options.exercises
      ? [
          Exercise.configure({ labels: options.exercises }),
          Solution.configure({ labels: options.exercises }),
        ]
      : []),
  ];
}
