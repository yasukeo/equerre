// The « encadré » of the lesson vocabulary (DECISIONS.md, D-040), as an editor node.
// Kept free of React so the tests can build the editor's schema in Node.

import { mergeAttributes, Node } from "@tiptap/core";
import { CALLOUT_KINDS, type CalloutKind } from "./document";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      /** Wraps the selected blocks in an encadré of this kind. */
      setCallout: (kind: CalloutKind) => ReturnType;
      /** Changes the kind of the encadré around the selection. */
      setCalloutKind: (kind: CalloutKind) => ReturnType;
      /** Lifts the selection out of its encadré. */
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

export const Callout = Node.create<CalloutOptions>({
  name: "callout",
  group: "block",
  // The same content the renderer and the strict schema accept; encadrés do not nest.
  content: "(paragraph | blockMath | bulletList | orderedList)+",
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
    return [{ tag: "aside[data-kind]" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const kind = asKind(node.attrs.kind);
    return [
      "aside",
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
        ({ commands }) =>
          commands.wrapIn(this.name, { kind }),
      setCalloutKind:
        (kind) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { kind }),
      unsetCallout:
        () =>
        ({ commands }) =>
          commands.lift(this.name),
    };
  },
});
