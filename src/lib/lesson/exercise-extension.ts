// Exercises and their corrections inside a document (DECISIONS.md, D-095): what a « série »
// or a « devoir » is made of. An exercise is numbered where it is drawn, not stored; its
// correction, when it has one, is its last part, folded on the page and printed or left out
// in the PDF. Kept free of React so the tests can build the editor's schema in Node.

import { mergeAttributes, Node } from "@tiptap/core";
import type { Node as ProseMirrorNode, NodeType } from "@tiptap/pm/model";
import { TextSelection, type EditorState, type Transaction } from "@tiptap/pm/state";
import { findWrapping } from "@tiptap/pm/transform";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    exercise: {
      /** Wraps the top-level blocks the selection touches in an exercise. */
      setExercise: () => ReturnType;
      /** Removes the exercise around the selection, keeping its statement and correction. */
      unsetExercise: () => ReturnType;
      /** Opens the correction of the exercise around the selection, adding it if it has none. */
      addSolution: () => ReturnType;
    };
  }
}

export type ExerciseOptions = {
  /** « Exercice » and « Corrigé », shown above each while editing. */
  labels: { exercise?: string; solution?: string };
};

/** What an exercise's statement and its correction are made of: no headings, no documents. */
export const EXERCISE_BODY =
  "(paragraph | blockMath | bulletList | orderedList | callout | image)+";

/**
 * An exercise sits at the top level, so the range to wrap is widened to the top-level blocks
 * the selection touches, as for an encadré. Changes `tr` only when `apply` is true, so it also
 * answers `can()`.
 */
export function wrapInExercise(
  state: EditorState,
  tr: Transaction,
  type: NodeType,
  apply: boolean,
): boolean {
  const { $from, $to } = state.selection;
  if ($from.depth < 1 || $to.depth < 1) return false;
  if ($from.node(1).type === type) return false;
  const range = state.doc.resolve($from.before(1)).blockRange(state.doc.resolve($to.after(1)));
  if (!range) return false;
  const wrapping = findWrapping(range, type);
  if (!wrapping) return false;
  if (apply) tr.wrap(range, wrapping).scrollIntoView();
  return true;
}

/** Depth of the exercise around the selection, or null. */
function exerciseDepth(state: EditorState, type: NodeType): number | null {
  const { $from } = state.selection;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    if ($from.node(depth).type === type) return depth;
  }
  return null;
}

/**
 * Lifts the exercise's statement out of it, and its correction's content after it: nothing
 * written is lost.
 */
export function liftOutOfExercise(
  state: EditorState,
  tr: Transaction,
  type: NodeType,
  solution: NodeType,
  apply: boolean,
): boolean {
  const depth = exerciseDepth(state, type);
  if (depth === null) return false;
  if (!apply) return true;
  const { $from } = state.selection;
  const exercise = $from.node(depth);
  const start = $from.before(depth);
  const blocks: ProseMirrorNode[] = [];
  exercise.forEach((child) => {
    if (child.type === solution) child.forEach((part) => blocks.push(part));
    else blocks.push(child);
  });
  tr.replaceWith(start, start + exercise.nodeSize, blocks).scrollIntoView();
  return true;
}

/**
 * Puts the cursor in the exercise's correction, adding an empty one at its end first when it
 * has none.
 */
export function openSolution(
  state: EditorState,
  tr: Transaction,
  type: NodeType,
  solution: NodeType,
  apply: boolean,
): boolean {
  const depth = exerciseDepth(state, type);
  if (depth === null) return false;
  if (!apply) return true;
  const { $from } = state.selection;
  const exercise = $from.node(depth);
  const end = $from.end(depth);
  if (exercise.lastChild?.type === solution) {
    // Inside it already, or at its last paragraph's end.
    tr.setSelection(TextSelection.near(tr.doc.resolve(end - 2), -1)).scrollIntoView();
    return true;
  }
  const paragraph = state.schema.nodes.paragraph!;
  tr.insert(end, solution.create(null, paragraph.create()));
  tr.setSelection(TextSelection.create(tr.doc, end + 2)).scrollIntoView();
  return true;
}

export const Solution = Node.create<ExerciseOptions>({
  name: "solution",
  // Only inside an exercise, as its last part: no group puts it anywhere else.
  content: EXERCISE_BODY,
  defining: true,

  addOptions() {
    return { labels: {} };
  },

  parseHTML() {
    return [{ tag: "div[data-solution]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-solution": "",
        class: "lecon-corrige",
        "data-label": this.options.labels.solution ?? "Corrigé",
      }),
      0,
    ];
  },
});

export const Exercise = Node.create<ExerciseOptions>({
  name: "exercise",
  group: "block",
  content: `${EXERCISE_BODY} solution?`,
  defining: true,

  addOptions() {
    return { labels: {} };
  },

  addAttributes() {
    return {
      // « Suites et récurrence »: shown after « Exercice 3 ». Optional.
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-title") || null,
        renderHTML: (attributes) =>
          typeof attributes.title === "string" && attributes.title
            ? { "data-title": attributes.title }
            : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "section[data-exercise]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "section",
      mergeAttributes(HTMLAttributes, {
        "data-exercise": "",
        class: "lecon-exercice",
        "data-label": this.options.labels.exercise ?? "Exercice",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setExercise:
        () =>
        ({ state, tr, dispatch }) =>
          wrapInExercise(state, tr, this.type, dispatch !== undefined),
      unsetExercise:
        () =>
        ({ state, tr, dispatch }) =>
          liftOutOfExercise(
            state,
            tr,
            this.type,
            state.schema.nodes.solution!,
            dispatch !== undefined,
          ),
      addSolution:
        () =>
        ({ state, tr, dispatch }) =>
          openSolution(state, tr, this.type, state.schema.nodes.solution!, dispatch !== undefined),
    };
  },
});
