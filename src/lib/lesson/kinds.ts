import type { Database } from "@/types/database";

/** What part of a chapter a document fills (D-094): its course, a summary, a series, a test. */
export type DocumentKind = Database["public"]["Enums"]["document_kind"];

/** The order a chapter's documents are listed in: the course first, the tests last. */
export const DOCUMENT_KINDS: readonly DocumentKind[] = ["cours", "resume", "serie", "devoir"];
