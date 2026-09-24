// What the storage sweep keeps and what it deletes (DECISIONS.md, D-054). Pure, so the tests
// can run it over lesson JSON and a made-up bucket listing; scripts/sweep-lesson-storage.mts
// does the listing, the reading and the deleting.
//
// The editors never delete an object: undo can bring an image back, and the document may not
// be saved yet (D-053). Images and PDFs nothing points to any more therefore stay in their
// folders until this decides they can go. Every doubt resolves towards keeping: a reference
// counts wherever it sits in a document, whatever the address's host, and an object whose
// name the app could not have written is left alone.

import { LESSON_FILE_NAME, LESSON_IMAGE_NAME } from "@/lib/storage-paths";

export const SWEPT_BUCKETS = ["lesson-assets", "lesson-files"] as const;
export type SweptBucket = (typeof SWEPT_BUCKETS)[number];

/**
 * An object is deleted only once it has been in storage this long, and only if its lesson or
 * exercise has not been saved for as long. The first protects an upload whose document was
 * never saved; the second, an image taken out, saved, then brought back by undo.
 */
export const SWEEP_SAFETY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

export type StorageReferences = {
  /** Names in lesson-assets. */
  images: Set<string>;
  /** Names in lesson-files. */
  files: Set<string>;
};

export function emptyReferences(): StorageReferences {
  return { images: new Set(), files: new Set() };
}

const IN_IMAGE_BUCKET = /\/lesson-assets\/([^?#]+)/;

/**
 * The lesson-assets name an image address points to, or null when it points elsewhere. Any
 * host and any route that serves the object counts: the question is whether a page would
 * draw it, and the renderer draws whatever address the document holds.
 */
export function imageObjectName(src: string): string | null {
  const name = IN_IMAGE_BUCKET.exec(src)?.[1];
  if (name === undefined) return null;
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
}

function stringAttr(node: Record<string, unknown>, key: string): string | null {
  const attrs = node.attrs;
  if (typeof attrs !== "object" || attrs === null) return null;
  const value = (attrs as Record<string, unknown>)[key];
  return typeof value === "string" && value !== "" ? value : null;
}

/**
 * Adds every object a stored Tiptap document refers to: the `src` of its `image` nodes and the
 * `path` of its `fileAttachment` nodes. The whole value is walked, not only `content`, and
 * nothing about its shape is trusted (D-040): a node inside an encadré, a list, or a node type
 * the vocabulary has since dropped still keeps its object.
 */
export function collectReferences(
  document: unknown,
  into: StorageReferences = emptyReferences(),
): StorageReferences {
  // A stack rather than recursion: the shape of stored JSON is not something to bet the stack on.
  const pending: unknown[] = [document];
  while (pending.length > 0) {
    const value = pending.pop();
    if (typeof value !== "object" || value === null) continue;
    if (Array.isArray(value)) {
      pending.push(...value);
      continue;
    }

    const node = value as Record<string, unknown>;
    if (node.type === "image") {
      const src = stringAttr(node, "src");
      const name = src === null ? null : imageObjectName(src);
      if (name !== null) into.images.add(name);
    } else if (node.type === "fileAttachment") {
      const path = stringAttr(node, "path");
      if (path !== null) into.files.add(path);
    }
    pending.push(...Object.values(node));
  }
  return into;
}

export type StoredObject = {
  bucket: SweptBucket;
  /** The full object name, `<owner_id>/<uuid>.<ext>` for everything the app writes. */
  name: string;
  createdAt: string | null;
  size: number | null;
};

export type Verdict =
  /** Not a name the app writes (D-052): someone put it there by hand, so it is left alone. */
  | "unexpected-name"
  | "referenced"
  | "uploaded-recently"
  /** Its lesson or exercise was saved within the window: undo may still bring it back. */
  | "owner-saved-recently"
  /** Its lesson or exercise exists and no longer refers to it. */
  | "unreferenced"
  /** No lesson or exercise has its folder's id any more. */
  | "owner-deleted";

const DELETED: ReadonlySet<Verdict> = new Set<Verdict>(["unreferenced", "owner-deleted"]);

export function isDeletion(verdict: Verdict): boolean {
  return DELETED.has(verdict);
}

export type SweepInput = {
  objects: readonly StoredObject[];
  /** Collected from every lesson and exercise, drafts included. */
  references: StorageReferences;
  /** The id of every lesson and exercise, with the last time it was saved. */
  owners: ReadonlyMap<string, string>;
  now: Date;
  windowMs?: number;
};

const EXPECTED_NAME: Record<SweptBucket, RegExp> = {
  "lesson-assets": LESSON_IMAGE_NAME,
  "lesson-files": LESSON_FILE_NAME,
};

/** True when `timestamp` is at least `windowMs` before `now`. A date it cannot read is recent. */
function olderThan(timestamp: string | null, now: Date, windowMs: number): boolean {
  if (timestamp === null) return false;
  const time = Date.parse(timestamp);
  return Number.isFinite(time) && now.getTime() - time >= windowMs;
}

export function judgeObject(
  object: StoredObject,
  { references, owners, now, windowMs = SWEEP_SAFETY_WINDOW_MS }: Omit<SweepInput, "objects">,
): Verdict {
  if (!EXPECTED_NAME[object.bucket].test(object.name)) return "unexpected-name";

  // A reference counts across folders: an image copied from one lesson and pasted into
  // another keeps the first lesson's folder in its address.
  const referenced = object.bucket === "lesson-assets" ? references.images : references.files;
  if (referenced.has(object.name)) return "referenced";

  if (!olderThan(object.createdAt, now, windowMs)) return "uploaded-recently";

  const ownerId = object.name.slice(0, object.name.indexOf("/"));
  const savedAt = owners.get(ownerId);
  if (savedAt === undefined) return "owner-deleted";
  return olderThan(savedAt, now, windowMs) ? "unreferenced" : "owner-saved-recently";
}

export function planSweep({ objects, ...context }: SweepInput) {
  return objects.map((object) => ({ ...object, verdict: judgeObject(object, context) }));
}
