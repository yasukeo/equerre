// Where a new image or document goes. Left to ProseMirror, a block inserted inside a list
// splits the list in two around it, and a document inserted inside an encadré splits the
// encadré. It goes instead after the block the cursor is in, at the first level up that
// accepts it: an image inside an encadré stays in it, a PDF lands after it.

import type { NodeType } from "@tiptap/pm/model";
import type { EditorState } from "@tiptap/pm/state";

export type BlockRange = { from: number; to: number };

export function blockInsertionRange(state: EditorState, type: NodeType): BlockRange | null {
  const { selection } = state;
  const { $to } = selection;

  // An empty paragraph the cursor sits in is taken over rather than left behind.
  const { $from } = selection;
  if (
    selection.empty &&
    $from.depth > 0 &&
    $from.parent.type.name === "paragraph" &&
    $from.parent.content.size === 0
  ) {
    const depth = $from.depth - 1;
    const index = $from.index(depth);
    if ($from.node(depth).canReplaceWith(index, index + 1, type)) {
      return { from: $from.before(), to: $from.after() };
    }
  }

  // Right after a selected image or document, when its container takes the new block.
  if (!$to.parent.isTextblock) {
    const index = $to.index();
    if ($to.parent.canReplaceWith(index, index, type)) return { from: $to.pos, to: $to.pos };
  }

  for (let depth = $to.depth - 1; depth >= 0; depth -= 1) {
    const index = $to.indexAfter(depth);
    if ($to.node(depth).canReplaceWith(index, index, type)) {
      const pos = $to.after(depth + 1);
      return { from: pos, to: pos };
    }
  }
  return null;
}
