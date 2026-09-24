// What the editor sends to storage, straight from the tutor's browser under her own session:
// the storage policies let only the tutor write to either lesson bucket. Every name is an id
// (DECISIONS.md, D-052); what the tutor called the file lives in the lesson itself.

import type { PreparedImage } from "@/lib/images/prepare-image";
import { isLessonImageUrl } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/client";

/** The lesson-assets bucket's limit, in step with supabase/migrations (storage_buckets). */
export const LESSON_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
/** The lesson-files bucket's limit. */
export const LESSON_FILE_MAX_BYTES = 20 * 1024 * 1024;

export const LESSON_IMAGE_PREPARATION = {
  maxSide: 2000,
  keepUnder: 1.5 * 1024 * 1024,
  maxBytes: LESSON_IMAGE_MAX_BYTES,
  quality: 0.85,
} as const;

/**
 * Stores an image in the folder of the lesson or exercise that shows it, and returns its
 * public address. A name is never reused, so it is cached for a year.
 */
export async function uploadLessonImage(folderId: string, image: PreparedImage): Promise<string> {
  const name = `${folderId}/${crypto.randomUUID()}.${image.extension}`;
  const bucket = createClient().storage.from("lesson-assets");
  const { error } = await bucket.upload(name, image.blob, {
    contentType: image.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  const src = bucket.getPublicUrl(name).data.publicUrl;
  // Saving refuses any other address: better to know now than when the tutor saves.
  if (!isLessonImageUrl(src)) throw new Error(`unexpected public address: ${src}`);
  return src;
}

/** Stores a PDF and returns its name in the private lesson-files bucket. */
export async function uploadLessonFile(lessonId: string, file: File): Promise<string> {
  const name = `${lessonId}/${crypto.randomUUID()}.pdf`;
  const { error } = await createClient()
    .storage.from("lesson-files")
    .upload(name, file, { contentType: "application/pdf", upsert: false });
  if (error) throw error;
  return name;
}
