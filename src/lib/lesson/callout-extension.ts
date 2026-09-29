// The « encadré » of the lesson vocabulary (DECISIONS.md, D-040), as an editor node.
// Kept free of React so the tests can build the editor's schema in Node.

import { mergeAttributes, Node } from "@tiptap/core";
import type { NodeType } from "@tiptap/pm/model";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import { findWrapping } from "@tiptap/pm/transform";
import { CALLOUT_KINDS, type CalloutKind } from "./document";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      /** Wraps the top-level blocks the selection touches in an encadré of this kind. */
      setCallout: (kind: CalloutKind) => ReturnType;
      /** Changes the kind of the encadré around the selection. */
      setCalloutKind: (kind: CalloutKind) => ReturnType;
      /** Removes the encadré around the selection, keeping everything it held. */
      unsetCallout: () => ReturnType;
    };
  }
}

export type CalloutOptions = {
  /** « Définition », « Théorème »… shown above the encadré while editing. */
  labels: Partial<Record<CalloutKind, string>>;
};

function asKind(value: unknown): CalloutKind {
  return CALLOUT_KINDS.find((kind) => kind === value) ?? "definition";
}

/**
 * An encadré sits at the top level, so the range to wrap is widened to the top-level blocks
 * the selection touches. Wrapping the innermost range instead would try to put an encadré
 * inside a list item, which the schema refuses, and nothing would happen.
 * Changes `tr` only when `apply` is true, so it also answers `can()`.
 */
export function wrapInCallout(
  state: EditorState,
  tr: Transaction,
  type: NodeType,
  kind: CalloutKind,
  apply: boolean,
): boolean {
  const { $from, $to } = state.selection;
  if ($from.depth < 1 || $to.depth < 1) return false;

  const range = state.doc.resolve($from.before(1)).blockRange(state.doc.resolve($to.after(1)));
  if (!range) return false;

  const wrapping = findWrapping(range, type, { kind });
  if (!wrapping) return false;

  if (apply) tr.wrap(range, wrapping).scrollIntoView();
  return true;
}

/**
 * Lifts everything the nearest enclosing encadré holds out of it. ProseMirror's own lift works
 * on the innermost range: inside a list it would take one item out of the list and leave the
 * encadré in place.
 */
export function liftOutOfCallout(
  state: EditorState,
  tr: Transaction,
  type: NodeType,
  apply: boolean,
): boolean {
  const { $from } = state.selection;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    if ($from.node(depth).type !== type) continue;
    const range = state.doc
      .resolve($from.start(depth))
      .blockRange(state.doc.resolve($from.end(depth)));
    if (!range) return false;
    if (apply) tr.lift(range, depth - 1).scrollIntoView();
    return true;
  }
  return false;
}

export const Callout = Node.create<CalloutOptions>({
  name: "callout",
  group: "block",
  // The same content the renderer and the strict schema accept; encadrés do not nest.
  content: "(paragraph | blockMath | bulletList | orderedList | image)+",
  defining: true,

  addOptions() {
    return { labels: {} };
  },

  addAttributes() {
    return {
      kind: {
        default: "definition",
        parseHTML: (element) => asKind(element.getAttribute("data-kind")),
        renderHTML: (attributes) => ({ "data-kind": asKind(attributes.kind) }),
      },
    };
  },

  parseHTML() {
    // Pasted from an older copy of a lesson, an encadré may still be an <aside>.
    return [{ tag: "div[data-kind]" }, { tag: "aside[data-kind]" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const kind = asKind(node.attrs.kind);
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "lecon-encadre",
        "data-label": this.options.labels[kind] ?? kind,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCallout:
        (kind) =>
        ({ state, tr, dispatch }) =>
          wrapInCallout(state, tr, this.type, kind, dispatch !== undefined),
      setCalloutKind:
        (kind) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { kind }),
      unsetCallout:
        () =>
        ({ state, tr, dispatch }) =>
          liftOutOfCallout(state, tr, this.type, dispatch !== undefined),
    };
  },
});
